// بررسی جلسه‌ی دانشجو: امضا + کد هنوز فعال + هنوز به همین مرورگر قفل است
import { getCookie, verify, secret, CODE_RE } from "./auth.mjs";
import { stores } from "./store.mjs";

export async function studentSession(req) {
  const key = secret();
  if (!key) return null;
  const d = verify(getCookie(req, "rv_session"), key);
  if (!d || !CODE_RE.test(d.c || "") || !d.s) return null;
  const { codes, claims } = stores();
  const [rec, claim] = await Promise.all([codes.get(d.c, { type: "json" }), claims.get(d.c, { type: "json" })]);
  if (!rec || !rec.active || !claim || claim.sid !== d.s) return null;
  return { name: rec.name, code: d.c, sid: d.s };
}
