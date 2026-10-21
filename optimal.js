/**
 * optimal.js — Optimal (OPT / Belady) algoritması  [Sprint 2 — Sorumlu: Üye A]
 * ------------------------------------------------------------
 * Bellek doluyken, GELECEKTE EN GEÇ kullanılacak (ya da hiç
 * kullanılmayacak) sayfa çıkarılır. Gerçek bir işletim sisteminde
 * uygulanamaz (geleceği bilmek gerekir) ama diğer algoritmalar için
 * alt sınır / referans noktasıdır.
 *
 * Uygulama ipucu:
 *   - Her çerçevedeki sayfa için reference.indexOf(sayfa, i + 1) bul
 *   - -1 (hiç kullanılmayacak) → hemen kurban
 *   - Aksi halde en büyük indekse sahip olan kurban
 *   - Eşitlikte en küçük çerçeve indeksini seç (deterministik test için)
 *
 * Kabul testi:
 *   7 0 1 2 0 3 0 4 2 3 0 3 2 1 2 0 1 7 0 1, 3 çerçeve → 9 hata
 */
var PageSim = (globalThis.PageSim = globalThis.PageSim || {});
PageSim.algorithms = PageSim.algorithms || {};

PageSim.algorithms.OPT = function optimal(input) {
  // TODO (Sprint 2)
  throw new PageSim.NotImplementedError("Optimal");
};

if (typeof module !== "undefined") module.exports = PageSim;
