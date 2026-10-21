/**
 * simulator.js — Simülasyon motoru
 * ------------------------------------------------------------
 * Arayüz algoritmalara doğrudan değil, bu motor üzerinden erişir.
 * Böylece yeni algoritma (Clock, LFU) eklemek = algorithms/ altına
 * dosya ekleyip PageSim.algorithms'e kaydetmek kadar kolaydır.
 */
var PageSim = (globalThis.PageSim = globalThis.PageSim || {});
PageSim.algorithms = PageSim.algorithms || {};

PageSim.NotImplementedError = function (name) {
  this.name = "NotImplementedError";
  this.message = name + " henüz uygulanmadı (sonraki sprint).";
};
PageSim.NotImplementedError.prototype = Object.create(Error.prototype);

/** Kayıtlı algoritma adları: ["FIFO", "LRU", "OPT"] */
PageSim.listAlgorithms = function () {
  return Object.keys(PageSim.algorithms);
};

/** Tek bir algoritmayı çalıştırır → SimulationResult */
PageSim.run = function (algorithmName, input) {
  var algo = PageSim.algorithms[algorithmName];
  if (!algo) throw new Error("Bilinmeyen algoritma: " + algorithmName);
  return algo(input);
};

/**
 * Tüm algoritmaları çalıştırır (karşılaştırma ekranı ve grafik için).
 * Henüz yazılmamış olanlar { algorithm, error } olarak döner, uygulama çökmez.
 */
PageSim.runAll = function (input) {
  return PageSim.listAlgorithms().map(function (name) {
    try { return PageSim.run(name, input); }
    catch (e) { return { algorithm: name, error: e.message }; }
  });
};

/**
 * Belady anomalisi taraması: aynı dizi için 1..maxFrames çerçevede
 * hata sayılarını döndürür. [Sprint 3'te grafikle gösterilecek]
 */
PageSim.faultsByFrameCount = function (algorithmName, reference, maxFrames) {
  var out = [];
  for (var f = 1; f <= maxFrames; f++) {
    out.push({ frameCount: f, faults: PageSim.run(algorithmName, { reference: reference, frameCount: f }).faults });
  }
  return out;
};

if (typeof module !== "undefined") module.exports = PageSim;
