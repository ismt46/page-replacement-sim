/**
 * types.js — Projenin çekirdek veri yapıları
 * ------------------------------------------------------------
 * Bu dosya tüm ekip için "sözleşme"dir: algoritmalar (Üye A) bu
 * yapıları ÜRETİR, arayüz/animasyon (Üye B) ve testler/grafikler
 * (Üye C) bu yapıları TÜKETİR. Alan eklemek serbesttir, mevcut
 * alanları değiştirmeden önce ekiple konuşun.
 *
 * Tarayıcıda <script> ile, Node.js'te require() ile çalışır.
 * Tüm modüller tek bir global isim alanını paylaşır: PageSim
 */
var PageSim = (globalThis.PageSim = globalThis.PageSim || {});

/**
 * @typedef {Object} SimulationInput   Kullanıcı girdisi
 * @property {number[]} reference      Sayfa referans dizisi, örn. [7,0,1,2,0,3]
 * @property {number}   frameCount     Fiziksel bellekteki çerçeve (frame) sayısı
 */

/**
 * @typedef {Object} Step              Simülasyonun TEK bir adımı
 * @property {number}        index     Adım numarası (0'dan başlar)
 * @property {number}        page      Bu adımda istenen sayfa
 * @property {(number|null)[]} frames  Adım SONRASI bellek durumu; boş çerçeve = null
 * @property {boolean}       fault     Sayfa hatası (page fault) oldu mu?
 * @property {number|null}   evicted   Bellekten çıkarılan sayfa (yoksa null)
 * @property {number|null}   frameIndex Sayfanın yazıldığı / bulunduğu çerçeve
 * @property {string}        note      İnsan okuyabilir açıklama (animasyon altyazısı)
 */

/**
 * @typedef {Object} SimulationResult  Bir algoritmanın tam çıktısı
 * @property {string}   algorithm      "FIFO" | "LRU" | "OPT" | ...
 * @property {number[]} reference
 * @property {number}   frameCount
 * @property {Step[]}   steps
 * @property {number}   faults         Toplam sayfa hatası
 * @property {number}   hits           Toplam isabet (hit)
 * @property {number}   faultRate      faults / reference.length (0..1)
 */

/** Yeni bir Step nesnesi oluşturur. frames dizisi kopyalanır (değişmezlik). */
PageSim.createStep = function (index, page, frames, fault, evicted, frameIndex, note) {
  return {
    index: index,
    page: page,
    frames: frames.slice(),
    fault: fault,
    evicted: evicted === undefined ? null : evicted,
    frameIndex: frameIndex === undefined ? null : frameIndex,
    note: note || "",
  };
};

/** Adım listesinden toplamları hesaplayıp SimulationResult döndürür. */
PageSim.createResult = function (algorithm, reference, frameCount, steps) {
  var faults = steps.filter(function (s) { return s.fault; }).length;
  return {
    algorithm: algorithm,
    reference: reference.slice(),
    frameCount: frameCount,
    steps: steps,
    faults: faults,
    hits: steps.length - faults,
    faultRate: reference.length ? faults / reference.length : 0,
  };
};

/** Boş bellek: [null, null, ...] */
PageSim.emptyFrames = function (frameCount) {
  var f = [];
  for (var i = 0; i < frameCount; i++) f.push(null);
  return f;
};

if (typeof module !== "undefined") module.exports = PageSim;
