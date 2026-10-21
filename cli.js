#!/usr/bin/env node
/**
 * cli.js — Konsol demosu (Sprint 1 PoC)
 * Kullanım:
 *   node cli.js                          (varsayılan örnek)
 *   node cli.js "1 2 3 4 1 2 5 1 2 3 4 5" 3
 *   node cli.js "7 0 1 2 0 3" 3 FIFO
 *   node cli.js --random 3
 */
const PageSim = require("./node-loader.js");

const args = process.argv.slice(2);
let refText = args[0] || "7 0 1 2 0 3 0 4 2 3 0 3 2 1 2 0 1 7 0 1";
const frameText = args[1] || "3";
const algorithm = (args[2] || "FIFO").toUpperCase();
if (refText === "--random") refText = PageSim.randomReference(15, 7).join(" ");

const RED = "\x1b[31m", GREEN = "\x1b[32m", DIM = "\x1b[2m", RESET = "\x1b[0m";

try {
  const input = PageSim.parseInput(refText, frameText);
  console.log("Girdi hafızaya alındı:", JSON.stringify(input));
  const result = PageSim.run(algorithm, input);

  console.log(`\n${result.algorithm} — ${result.frameCount} çerçeve\n`);
  console.log("Adım  Sayfa  Bellek" + " ".repeat(result.frameCount * 4 - 6) + "  Durum   Açıklama");
  result.steps.forEach((s) => {
    const mem = s.frames.map((v) => (v === null ? " ." : String(v).padStart(2))).join(" |");
    const status = s.fault ? `${RED}FAULT${RESET}` : `${GREEN}HIT  ${RESET}`;
    console.log(`${String(s.index + 1).padStart(4)}  ${String(s.page).padStart(5)}  [${mem} ]  ${status}   ${DIM}${s.note}${RESET}`);
  });
  console.log(`\nToplam sayfa hatası: ${RED}${result.faults}${RESET}  |  isabet: ${result.hits}  |  hata oranı: %${(result.faultRate * 100).toFixed(1)}`);
} catch (e) {
  console.error(`${RED}Hata:${RESET} ${e.message}`);
  process.exit(1);
}
