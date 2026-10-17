// دروازه‌ی محتوا: /lessons/* و /downloads/*
// درس‌های رایگان برای همه؛ بقیه فقط با جلسه‌ی معتبر. فایل‌ها داخل پوشه‌ی content هستند و مستقیم سرو نمی‌شوند.
import { FREE } from "../lib/auth.mjs";
import { studentSession } from "../lib/session.mjs";
import { listDir, readFile } from "../lib/content.mjs";

export const config = { path: ["/lessons", "/lessons/*", "/downloads", "/downloads/*"] };

const HOME = "/lessons/" + encodeURIComponent("00-فهرست.html");
const TYPES = { ".html": "text/html; charset=utf-8", ".zip": "application/zip" };

export default async (req) => {
  if (req.method !== "GET" && req.method !== "HEAD") return new Response("Method Not Allowed", { status: 405 });
  const url = new URL(req.url);
  let segs;
  try { segs = url.pathname.split("/").filter(Boolean).map((s) => decodeURIComponent(s).normalize("NFC")); }
  catch { return new Response("Not Found", { status: 404 }); }

  const section = segs[0];
  if (section !== "lessons" && section !== "downloads") return new Response("Not Found", { status: 404 });
  if (segs.length === 1) {
    return section === "lessons" ? Response.redirect(new URL(HOME, url).toString(), 302) : new Response("Not Found", { status: 404 });
  }
  if (segs.length !== 2) return new Response("Not Found", { status: 404 });
  const name = segs[1];

  const free = section === "lessons" && FREE.includes(name);
  if (!free) {
    const s = await studentSession(req);
    if (!s) return Response.redirect(new URL("/login.html", url).toString(), 302);
  }

  const files = listDir(section);
  if (!files) return new Response("محتوا روی سرور پیدا نشد؛ در پنل مدیریت «وضعیت سیستم» را بزنید.", { status: 500 });
  const real = files.get(name);
  if (!real) return new Response("Not Found", { status: 404 });

  const ext = real.slice(real.lastIndexOf(".")).toLowerCase();
  const headers = {
    "Content-Type": TYPES[ext] || "application/octet-stream",
    "Cache-Control": free ? "public, max-age=0, must-revalidate" : "private, no-store",
    "X-Robots-Tag": "noindex",
    "X-Content-Type-Options": "nosniff",
  };
  if (ext === ".zip") headers["Content-Disposition"] = `attachment; filename="${encodeURIComponent(real)}"`;
  const body = readFile(section, real);
  headers["Content-Length"] = String(body.length);
  return new Response(req.method === "HEAD" ? null : body, { status: 200, headers });
};
