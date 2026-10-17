// سه انبار کلید-مقدار در Netlify Blobs (با سازگاری «قوی» تا غیرفعال‌سازی فوراً اعمال شود)
import { getStore } from "@netlify/blobs";

export function stores() {
  if (globalThis.__rvTestStores) return globalThis.__rvTestStores; // فقط برای تست خودکار
  const mk = (name) => getStore({ name, consistency: "strong" });
  return { codes: mk("rv-codes"), claims: mk("rv-claims"), locks: mk("rv-locks") };
}
