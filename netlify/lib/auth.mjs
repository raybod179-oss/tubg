// ابزارهای امضا، کوکی، قفل تلاش اشتباه
import crypto from "node:crypto";

export const FREE = ["00-فهرست.html", "intro.html", "setup-environment.html", "php-1-basics.html"].map((s) => s.normalize("NFC"));

export function secret() {
  const s = process.env.SESSION_SECRET || "";
  return s.length >= 24 ? s : "";
}

export function sign(obj, key) {
  const p = Buffer.from(JSON.stringify(obj)).toString("base64url");
  const s = crypto.createHmac("sha256", key).update(p).digest("base64url");
  return p + "." + s;
}

export function verify(token, key) {
  if (!token || !key || typeof token !== "string") return null;
  const i = token.indexOf(".");
  if (i < 1) return null;
  const p = token.slice(0, i), s = token.slice(i + 1);
  const good = crypto.createHmac("sha256", key).update(p).digest("base64url");
  const a = Buffer.from(s), b = Buffer.from(good);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const d = JSON.parse(Buffer.from(p, "base64url").toString("utf8"));
    return d && d.exp > Date.now() ? d : null;
  } catch { return null; }
}

export function getCookie(req, name) {
  const h = req.headers.get("cookie") || "";
  for (const part of h.split(";")) {
    const [k, ...v] = part.trim().split("=");
    if (k === name) return v.join("=");
  }
  return "";
}

export function setCookie(name, value, { maxAge, path = "/", sameSite = "Lax" }) {
  return `${name}=${value}; Path=${path}; Max-Age=${maxAge}; HttpOnly; Secure; SameSite=${sameSite}`;
}

// مقایسه‌ی امن (طول و محتوا هیچ‌چیز لو نمی‌دهد)
export function safeEq(a, b) {
  const ha = crypto.createHash("sha256").update(String(a)).digest();
  const hb = crypto.createHash("sha256").update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
}

const DIG = { "۰": "0", "۱": "1", "۲": "2", "۳": "3", "۴": "4", "۵": "5", "۶": "6", "۷": "7", "۸": "8", "۹": "9", "٠": "0", "١": "1", "٢": "2", "٣": "3", "٤": "4", "٥": "5", "٦": "6", "٧": "7", "٨": "8", "٩": "9" };
export function normPhone(s) {
  let d = String(s || "").replace(/[۰-۹٠-٩]/g, (c) => DIG[c]).replace(/\D/g, "");
  if (d.startsWith("0098")) d = d.slice(4);
  else if (d.startsWith("98") && d.length === 12) d = d.slice(2);
  if (d.length === 10 && d.startsWith("9")) d = "0" + d;
  return d;
}

const ALPHA = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
export function newCode() {
  const g = () => Array.from(crypto.randomBytes(4), (b) => ALPHA[b % ALPHA.length]).join("");
  return `RV-${g()}-${g()}-${g()}`;
}
// ورودی کاربر را به شکل استاندارد درمی‌آورد؛ اگر کد معتبر نباشد رشته‌ی خالی
export function cleanCode(input) {
  const raw = String(input || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (raw.length !== 14 || !raw.startsWith("RV")) return "";
  const b = raw.slice(2);
  return `RV-${b.slice(0, 4)}-${b.slice(4, 8)}-${b.slice(8, 12)}`;
}
export const CODE_RE = /^RV-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;

export function clientIp(req, context) {
  return (context && context.ip) || req.headers.get("x-nf-client-connection-ip") || (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
}
const ipKey = (prefix, ip) => prefix + "_" + String(ip).replace(/[^a-zA-Z0-9]/g, "_").slice(0, 60);

export async function lockedUntil(store, prefix, ip) {
  const r = await store.get(ipKey(prefix, ip), { type: "json" });
  return r && r.until && r.until > Date.now() ? r.until : 0;
}
export async function addFail(store, prefix, ip, max, lockMs) {
  const k = ipKey(prefix, ip);
  let r = (await store.get(k, { type: "json" })) || { n: 0, first: Date.now() };
  if ((r.until && r.until <= Date.now()) || Date.now() - r.first > 3600 * 1000) r = { n: 0, first: Date.now() };
  r.n++;
  if (r.n >= max) { r.until = Date.now() + lockMs; r.n = 0; }
  await store.setJSON(k, r);
}
export async function clearFails(store, prefix, ip) { await store.delete(ipKey(prefix, ip)); }

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
export const json = (obj, status = 200, headers = {}) =>
  new Response(JSON.stringify(obj), { status, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...headers } });
