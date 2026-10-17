// پیدا کردن پوشه‌ی content کنار توابع (محتوای پولی داخل پوشه‌ی منتشرشده نیست)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

let cache = null;
export function contentRoot() {
  if (cache) return cache;
  const here = path.dirname(fileURLToPath(import.meta.url));
  const cands = [process.env.LAMBDA_TASK_ROOT, process.cwd(), "/var/task", here, path.join(here, ".."), path.join(here, "..", ".."), path.join(here, "..", "..", "..")].filter(Boolean);
  for (const c of cands) {
    const p = path.join(c, "content");
    try { if (fs.statSync(path.join(p, "lessons")).isDirectory()) { cache = p; return p; } } catch {}
  }
  return "";
}

// نام فایل (نرمال‌شده) -> نام واقعی روی دیسک. ورودی کاربر هرگز مستقیم وارد مسیر نمی‌شود.
export function listDir(section) {
  const root = contentRoot();
  if (!root) return null;
  try {
    const m = new Map();
    for (const f of fs.readdirSync(path.join(root, section))) m.set(f.normalize("NFC"), f);
    return m;
  } catch { return null; }
}
export function readFile(section, real) { return fs.readFileSync(path.join(contentRoot(), section, real)); }
