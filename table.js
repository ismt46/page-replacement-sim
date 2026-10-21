/**
 * table.js — Adım adım tablo görünümü  [Sprint 1: statik tablo]
 * ------------------------------------------------------------
 * Satırlar = çerçeveler, sütunlar = adımlar. Sayfa hatası olan
 * sütun kırmızı, isabet yeşil işaretlenir. Sprint 2'de bu tablo
 * animasyonlu hale getirilecek (Üye B).
 */
var PageSim = (globalThis.PageSim = globalThis.PageSim || {});
PageSim.ui = PageSim.ui || {};

PageSim.ui.renderTable = function (container, result) {
  var html = ['<table class="sim-table"><thead><tr><th>Ref.</th>'];
  result.steps.forEach(function (s) {
    html.push('<th class="' + (s.fault ? "fault" : "hit") + '">' + s.page + "</th>");
  });
  html.push("</tr></thead><tbody>");

  for (var f = 0; f < result.frameCount; f++) {
    html.push("<tr><th>Çerçeve " + f + "</th>");
    result.steps.forEach(function (s) {
      var v = s.frames[f];
      var cls = s.frameIndex === f ? (s.fault ? "cell-new" : "cell-hit") : "";
      html.push('<td class="' + cls + '">' + (v === null ? "" : v) + "</td>");
    });
    html.push("</tr>");
  }

  html.push('<tr class="status-row"><th>Durum</th>');
  result.steps.forEach(function (s) {
    html.push('<td class="' + (s.fault ? "fault" : "hit") + '" title="' + s.note + '">' + (s.fault ? "F" : "✓") + "</td>");
  });
  html.push("</tr></tbody></table>");

  container.innerHTML = html.join("");
};

PageSim.ui.renderSummary = function (container, result) {
  container.innerHTML =
    "<strong>" + result.algorithm + "</strong> · " + result.frameCount + " çerçeve · " +
    '<span class="fault-text">' + result.faults + " sayfa hatası</span> · " +
    result.hits + " isabet · hata oranı %" + (result.faultRate * 100).toFixed(1);
};

if (typeof module !== "undefined") module.exports = PageSim;
