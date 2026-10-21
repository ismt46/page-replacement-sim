/**
 * fifo.js — First-In First-Out sayfa değiştirme  [Sprint 1: TAMAM]
 * ------------------------------------------------------------
 * Bellek doluyken sayfa hatası olursa, belleğe EN ÖNCE giren
 * sayfa çıkarılır. Sıra bir kuyruk (queue) ile tutulur; sayfaya
 * tekrar erişilmesi (hit) sırayı DEĞİŞTİRMEZ.
 *
 * Girdi : SimulationInput { reference, frameCount }
 * Çıktı : SimulationResult (bkz. src/core/types.js)
 */
var PageSim = (globalThis.PageSim = globalThis.PageSim || {});
PageSim.algorithms = PageSim.algorithms || {};

PageSim.algorithms.FIFO = function fifo(input) {
  var frames = PageSim.emptyFrames(input.frameCount);
  var queue = [];   // çerçeve indeksleri, giriş sırasına göre
  var steps = [];

  input.reference.forEach(function (page, i) {
    var where = frames.indexOf(page);

    if (where !== -1) {
      // HIT: sayfa zaten bellekte
      steps.push(PageSim.createStep(i, page, frames, false, null, where,
        page + " bellekte → isabet"));
      return;
    }

    // FAULT: boş çerçeve var mı?
    var empty = frames.indexOf(null);
    if (empty !== -1) {
      frames[empty] = page;
      queue.push(empty);
      steps.push(PageSim.createStep(i, page, frames, true, null, empty,
        page + " boş çerçeveye (#" + empty + ") yüklendi"));
      return;
    }

    // Bellek dolu: kuyruğun başındaki (en eski) çerçeveyi değiştir
    var victim = queue.shift();
    var evicted = frames[victim];
    frames[victim] = page;
    queue.push(victim);
    steps.push(PageSim.createStep(i, page, frames, true, evicted, victim,
      evicted + " çıkarıldı (en eski), yerine " + page + " geldi"));
  });

  return PageSim.createResult("FIFO", input.reference, input.frameCount, steps);
};

if (typeof module !== "undefined") module.exports = PageSim;
