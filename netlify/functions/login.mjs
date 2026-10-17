// POST /api/login { code } -> کوکی امضاشده. اولین ورود، کد را به همین مرورگر قفل می‌کند.
import crypto from "node:crypto";
import { secret, sign, verify, getCookie, setCookie, cleanCode, clientIp, lockedUntil, addFail, clearFails, sleep, json } from "../lib/auth.mjs";
import { stores } from "../lib/store.mjs";

export const config = { path: "/api/login" };
const MONTH = 30 * 24 * 3600 * 1000;

export default async (req, context) => {
  if (req.method !== "POST") return json({ error: "Method Not Allowed" }, 405);
  const key = secret();
  if (!key) return json({ error: "سرور هنوز تنظیم نشده است (SESSION_SECRET)." }, 500);
  const { codes, claims, locks } = stores();
  const ip = clientIp(req, context);

  if (await lockedUntil(locks, "u", ip)) return json({ error: "تلاش‌های اشتباه زیاد بود؛ چند دقیقه بعد دوباره امتحان کن." }, 429);

  let body = {};
  try { body = await req.json(); } catch {}
  const code = cleanCode(body.code);
  const rec = code ? await codes.get(code, { type: "json" }) : null;
  if (!rec) {
    await addFail(locks, "u", ip, 15, 30 * 60 * 1000);
    await sleep(700);
    return json({ error: "کد معتبر نیست" }, 401);
  }
  if (!rec.active) return json({ error: "این کد غیرفعال شده است. با پشتیبانی تماس بگیر." }, 403);

  const issue = (sid) => {
    const exp = Date.now() + MONTH;
    const tok = sign({ c: code, s: sid, n: rec.name, exp }, key);
    return json({ ok: true }, 200, { "Set-Cookie": setCookie("rv_session", tok, { maxAge: MONTH / 1000, path: "/" }) });
  };

  const existing = await claims.get(code, { type: "json" });
  if (existing) {
    const mine = verify(getCookie(req, "rv_session"), key);
    if (mine && mine.c === code && mine.s === existing.sid) return issue(existing.sid); // همان مرورگر، ورود دوباره
    return json({ error: "این کد قبلاً روی یک مرورگر دیگر استفاده شده است. اگر دستگاهت عوض شده، به پشتیبانی پیام بده تا ریست شود." }, 409);
  }

  const sid = crypto.randomBytes(16).toString("base64url");
  const res = await claims.setJSON(code, { sid, at: Date.now(), ua: (req.headers.get("user-agent") || "").slice(0, 160) }, { onlyIfNew: true });
  if (!res || res.modified === false) {
    return json({ error: "این کد همین الان روی دستگاه دیگری استفاده شد." }, 409);
  }
  await clearFails(locks, "u", ip);
  return issue(sid);
};
