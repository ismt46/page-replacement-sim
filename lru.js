/**
 * lru.js — Least Recently Used  [Sprint 2 — Sorumlu: Üye A]
 * ------------------------------------------------------------
 * Bellek doluyken, EN UZUN SÜREDİR KULLANILMAYAN sayfa çıkarılır.
 *
 * Uygulama ipucu:
 *   - lastUsed[frameIndex] = sayfanın en son kullanıldığı adım (i)
 *   - HIT olduğunda da lastUsed güncellenir (FIFO'dan farkı budur!)
 *   - Kurban: lastUsed değeri EN KÜÇÜK olan çerçeve
 *
 * Kabul testi (tests/run-tests.js):
 *   7 0 1 2 0 3 0 4 2 3 0 3 2 1 2 0 1 7 0 1, 3 çerçeve → 12 hata
 */
var PageSim = (globalThis.PageSim = globalThis.PageSim || {});
PageSim.algorithms = PageSim.algorithms || {};

PageSim.algorithms.LRU = function lru(input) {
  // TODO (Sprint 2): FIFO ile aynı Step formatını üretecek şekilde yazılacak.
  throw new PageSim.NotImplementedError("LRU");
};

if (typeof module !== "undefined") module.exports = PageSim;
