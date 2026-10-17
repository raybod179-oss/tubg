// API مدیریت: /api/admin/*  — ورود با ایمیل + شماره + رمز (هر سه)، قفل بعد از ۵ تلاش اشتباه
import crypto from "node:crypto";
import { secret, sign, verify, getCookie, setCookie, safeEq, normPhone, newCode, CODE_RE, FREE, clientIp, lockedUntil, addFail, clearFails, sleep, json } from "../lib/auth.mjs";
import { stores } from "../lib/store.mjs";
import { contentRoot, listDir } from "../lib/content.mjs";

export const config = { path: "/api/admin/*" };
const AP = "/api/admin";
const HOURS = 12;

export default async (req, context) => {
  const url = new URL(req.url);
  const route = url.pathname.replace(/\/+$/, "").slice(AP.length + 1);
  const key = secret();
  if (!key) return json({ error: "SESSION_SECRET تنظیم نشده یا کوتاه است (حداقل ۲۴ حرف)." }, 500);
  const { codes, claims, locks } = stores();
  const ip = clientIp(req, context);

  if (route === "login") return login(req, key, locks, ip);

  // بقیه‌ی مسیرها: فقط مدیر
  const sess = verify(getCookie(req, "rv_admin"), key);
  if (!sess || sess.role !== "admin") return json({ error: "نیاز به ورود" }, 401);
  if (req.method !== "GET" && req.headers.get("x-rv") !== "1") return json({ error: "درخواست نامعتبر" }, 400);

  let body = {};
  if (req.method === "POST") { try { body = await req.json(); } catch {} }
  const code = String(body.code || "").toUpperCase();
  const needCode = () => (CODE_RE.test(code) ? null : json({ error: "کد نامعتبر" }, 400));

  switch (route) {
    case "logout":
      return json({ ok: true }, 200, { "Set-Cookie": setCookie("rv_admin", "", { maxAge: 0, path: AP, sameSite: "Strict" }) });

    case "list": {
      const [cl, ml] = await Promise.all([codes.list(), claims.list()]);
      const bound = new Map();
      await Promise.all(ml.blobs.map(async (b) => { const c = await claims.get(b.key, { type: "json" }); if (c) bound.set(b.key, c.at || 0); }));
      const rows = (await Promise.all(cl.blobs.map(async (b) => {
        const r = await codes.get(b.key, { type: "json" });
        return r ? { code: b.key, name: r.name, phone: r.phone || "", active: !!r.active, createdAt: r.createdAt || 0, used: bound.has(b.key), usedAt: bound.get(b.key) || 0 } : null;
      }))).filter(Boolean).sort((a, b) => b.createdAt - a.createdAt);
      return json({ students: rows });
    }

    case "create": {
      const name = String(body.name || "").trim().slice(0, 80);
      if (!name) return json({ error: "نام را بنویس" }, 400);
      const ph = normPhone(body.phone);
      const phone = ph.length >= 10 && ph.length <= 13 ? ph : String(body.phone || "").trim().slice(0, 20);
      for (let i = 0; i < 6; i++) {
        const c = newCode();
        const rec = { name, phone, active: true, createdAt: Date.now() };
        const r = await codes.setJSON(c, rec, { onlyIfNew: true });
        if (r && r.modified !== false) return json({ ok: true, student: { code: c, ...rec, used: false, usedAt: 0 } });
      }
      return json({ error: "ساخت کد انجام نشد؛ دوباره امتحان کن" }, 500);
    }

    case "toggle": {
      const bad = needCode(); if (bad) return bad;
      const r = await codes.get(code, { type: "json" });
      if (!r) return json({ error: "پیدا نشد" }, 404);
      r.active = !!body.active;
      await codes.setJSON(code, r);
      return json({ ok: true, active: r.active });
    }

    case "reset": {
      const bad = needCode(); if (bad) return bad;
      await claims.delete(code);
      return json({ ok: true });
    }

    case "regen": {
      const bad = needCode(); if (bad) return bad;
      const r = await codes.get(code, { type: "json" });
      if (!r) return json({ error: "پیدا نشد" }, 404);
      for (let i = 0; i < 6; i++) {
        const c = newCode();
        const w = await codes.setJSON(c, r, { onlyIfNew: true });
        if (w && w.modified !== false) {
          await codes.delete(code);
          await claims.delete(code);
          return json({ ok: true, code: c });
        }
      }
      return json({ error: "ساخت کد انجام نشد" }, 500);
    }

    case "delete": {
      const bad = needCode(); if (bad) return bad;
      await codes.delete(code);
      await claims.delete(code);
      return json({ ok: true });
    }

    case "status":
      return json({ checks: await status(key, codes, claims) });

    default:
      return json({ error: "Not Found" }, 404);
  }
};

async function login(req, key, locks, ip) {
  if (req.method !== "POST") return json({ error: "Method Not Allowed" }, 405);
  const E = process.env.ADMIN_EMAIL, P = process.env.ADMIN_PHONE, W = process.env.ADMIN_PASSWORD;
  if (!E || !P || !W) return json({ error: "ADMIN_EMAIL و ADMIN_PHONE و ADMIN_PASSWORD در Netlify تنظیم نشده‌اند." }, 500);
  if (await lockedUntil(locks, "a", ip)) return json({ error: "به‌خاطر تلاش اشتباه، ۳۰ دقیقه قفل شده‌ای." }, 429);
  let b = {};
  try { b = await req.json(); } catch {}
  // هر سه مقایسه همیشه انجام می‌شود (بدون خروج زودهنگام)
  const okE = safeEq(String(b.email || "").trim().toLowerCase(), E.trim().toLowerCase());
  const okP = safeEq(normPhone(b.phone), normPhone(P));
  const okW = safeEq(String(b.password || ""), W);
  if (!(okE && okP && okW)) {
    await addFail(locks, "a", ip, 5, 30 * 60 * 1000);
    await sleep(900);
    return json({ error: "اطلاعات ورود درست نیست" }, 401);
  }
  await clearFails(locks, "a", ip);
  const exp = Date.now() + HOURS * 3600 * 1000;
  const tok = sign({ role: "admin", exp, j: crypto.randomBytes(6).toString("hex") }, key);
  return json({ ok: true }, 200, { "Set-Cookie": setCookie("rv_admin", tok, { maxAge: HOURS * 3600, path: AP, sameSite: "Strict" }) });
}

async function status(key, codes, claims) {
  const out = [];
  const add = (name, ok, detail = "") => out.push({ name, ok, detail });
  add("SESSION_SECRET", key.length >= 24, key.length >= 24 ? "تنظیم است" : "کوتاه است");
  add("ADMIN_EMAIL / PHONE / PASSWORD", !!(process.env.ADMIN_EMAIL && process.env.ADMIN_PHONE && process.env.ADMIN_PASSWORD), "");
  try {
    const k = "_selftest_" + Date.now();
    await codes.setJSON(k, { t: 1 });
    const back = await codes.get(k, { type: "json" });
    await codes.delete(k);
    add("Netlify Blobs (codes)", !!back && back.t === 1, "نوشتن/خواندن/حذف");
    const k2 = "_selftest2_" + Date.now();
    const w1 = await claims.setJSON(k2, { a: 1 }, { onlyIfNew: true });
    const w2 = await claims.setJSON(k2, { a: 2 }, { onlyIfNew: true });
    await claims.delete(k2);
    add("Blobs قفل یک‌بار مصرف", !!w1 && w1.modified !== false && w2 && w2.modified === false, "ساخت اتمیک");
  } catch (e) { add("Netlify Blobs", false, String(e && e.message || e).slice(0, 200)); }
  const root = contentRoot();
  add("پوشه‌ی content روی سرور", !!root, root || "پیدا نشد");
  const L = listDir("lessons"), D = listDir("downloads");
  add("درس‌ها", !!L && L.size > 10, L ? L.size + " فایل" : "خوانده نشد");
  add("zip پروژه‌ها", !!D && D.size >= 1, D ? D.size + " فایل" : "خوانده نشد");
  add("درس‌های رایگان", !!L && FREE.every((f) => L.has(f)), L ? FREE.filter((f) => !L.has(f)).join("، ") || "همه هستند" : "");
  return out;
}
