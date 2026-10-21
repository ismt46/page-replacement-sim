/**
 * parser.js — Girdinin okunup hafızaya alınması
 * ------------------------------------------------------------
 * Kullanıcının yazdığı metni ("7 0 1 2, 0 3") doğrulanmış bir
 * SimulationInput nesnesine çevirir. Hatalı girdide açıklayıcı
 * bir Error fırlatır; arayüz bu mesajı kullanıcıya gösterir.
 */
var PageSim = (globalThis.PageSim = globalThis.PageSim || {});

PageSim.LIMITS = { MAX_LENGTH: 100, MAX_PAGE: 99, MIN_FRAMES: 1, MAX_FRAMES: 10 };

/** "7 0 1, 2;0" -> [7,0,1,2,0]   (boşluk, virgül, noktalı virgül ayırıcı olabilir) */
PageSim.parseReference = function (text) {
  if (typeof text !== "string" || text.trim() === "") {
    throw new Error("Referans dizisi boş olamaz.");
  }
  var tokens = text.trim().split(/[\s,;]+/).filter(Boolean);
  var L = PageSim.LIMITS;
  var pages = tokens.map(function (t) {
    if (!/^\d+$/.test(t)) throw new Error('Geçersiz sayfa numarası: "' + t + '" (yalnızca 0 veya pozitif tam sayı)');
    var n = Number(t);
    if (n > L.MAX_PAGE) throw new Error("Sayfa numarası en fazla " + L.MAX_PAGE + " olabilir: " + n);
    return n;
  });
  if (pages.length > L.MAX_LENGTH) throw new Error("Dizi en fazla " + L.MAX_LENGTH + " eleman olabilir.");
  return pages;
};

PageSim.parseFrameCount = function (value) {
  var n = Number(value);
  var L = PageSim.LIMITS;
  if (!Number.isInteger(n) || n < L.MIN_FRAMES || n > L.MAX_FRAMES) {
    throw new Error("Çerçeve sayısı " + L.MIN_FRAMES + "–" + L.MAX_FRAMES + " arası tam sayı olmalı.");
  }
  return n;
};

/** Metin girdilerini tek bir SimulationInput nesnesine çevirir. */
PageSim.parseInput = function (referenceText, frameText) {
  return {
    reference: PageSim.parseReference(referenceText),
    frameCount: PageSim.parseFrameCount(frameText),
  };
};

/** Rastgele referans dizisi üretir (sayfalar 0..maxPage arası). */
PageSim.randomReference = function (length, maxPage) {
  length = length || 15;
  maxPage = maxPage === undefined ? 7 : maxPage;
  var out = [];
  for (var i = 0; i < length; i++) out.push(Math.floor(Math.random() * (maxPage + 1)));
  return out;
};

if (typeof module !== "undefined") module.exports = PageSim;
