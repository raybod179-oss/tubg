// GET /api/me -> { name, id } برای واترمارک؛ ۴۰۱ یعنی مهمان یا کد غیرفعال/ریست‌شده
import { json } from "../lib/auth.mjs";
import { studentSession } from "../lib/session.mjs";

export const config = { path: "/api/me" };

export default async (req) => {
  const s = await studentSession(req);
  if (!s) return json({}, 401);
  return json({ name: s.name, id: s.code.slice(-4) });
};
