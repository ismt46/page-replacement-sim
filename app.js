/**
 * app.js — Sayfa ile modülleri birbirine bağlar.
 */
(function () {
  var $ = function (id) { return document.getElementById(id); };

  // Algoritma seçim kutusunu kayıtlı algoritmalardan doldur
  PageSim.listAlgorithms().forEach(function (name) {
    var opt = document.createElement("option");
    opt.value = name;
    opt.textContent = name;
    $("algorithm").appendChild(opt);
  });

  function simulate() {
    $("error").textContent = "";
    $("output").innerHTML = "";
    $("summary").innerHTML = "";
    try {
      var input = PageSim.parseInput($("reference").value, $("frames").value);
      var result = PageSim.run($("algorithm").value, input);
      PageSim.ui.renderSummary($("summary"), result);
      PageSim.ui.renderTable($("output"), result);
      console.log("SimulationResult", result); // sunumda F12 ile veri yapısını göstermek için
    } catch (e) {
      $("error").textContent = e.message;
    }
  }

  $("run").addEventListener("click", simulate);
  $("random").addEventListener("click", function () {
    $("reference").value = PageSim.randomReference(15, 7).join(" ");
    simulate();
  });
  $("belady").addEventListener("click", function () {
    $("reference").value = "1 2 3 4 1 2 5 1 2 3 4 5";
    $("algorithm").value = "FIFO";
    simulate();
  });

  simulate();
})();
