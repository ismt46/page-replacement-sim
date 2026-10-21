/**
 * run-tests.js — Bağımlılıksız mini test çalıştırıcı  [Sorumlu: Üye C]
 * Çalıştırma:  node run-tests.js
 *
 * Beklenen değerler ders kitabındaki (Silberschatz, Operating System
 * Concepts, Bölüm 10) elle çözülmüş örneklerden alınmıştır.
 */
const PageSim = require("./node-loader.js");

let passed = 0, failed = 0, skipped = 0;
function test(name, fn) {
  try { fn(); passed++; console.log("  ✓ " + name); }
  catch (e) {
    if (e instanceof PageSim.NotImplementedError) { skipped++; console.log("  - ATLANDI: " + name + " (" + e.message + ")"); }
    else { failed++; console.log("  ✗ " + name + "\n      " + e.message); }
  }
}
function eq(actual, expected, msg) {
  const a = JSON.stringify(actual), b = JSON.stringify(expected);
  if (a !== b) throw new Error((msg || "") + " beklenen " + b + ", gelen " + a);
}
function throws(fn) { let ok = false; try { fn(); } catch (e) { ok = true; } if (!ok) throw new Error("Hata fırlatması bekleniyordu"); }

const TEXTBOOK = "7 0 1 2 0 3 0 4 2 3 0 3 2 1 2 0 1 7 0 1";
const BELADY = "1 2 3 4 1 2 5 1 2 3 4 5";
const run = (algo, ref, f) => PageSim.run(algo, PageSim.parseInput(ref, String(f)));

console.log("\nParser");
test("boşluk/virgül ile ayrılmış diziyi okur", () => eq(PageSim.parseReference("7, 0 1;2"), [7, 0, 1, 2]));
test("boş diziyi reddeder", () => throws(() => PageSim.parseReference("   ")));
test("harf içeren diziyi reddeder", () => throws(() => PageSim.parseReference("1 a 2")));
test("negatif sayıyı reddeder", () => throws(() => PageSim.parseReference("1 -2")));
test("0 çerçeveyi reddeder", () => throws(() => PageSim.parseFrameCount("0")));
test("rastgele dizi istenen uzunlukta", () => eq(PageSim.randomReference(12, 5).length, 12));

console.log("\nFIFO");
test("ders kitabı örneği, 3 çerçeve → 15 hata", () => eq(run("FIFO", TEXTBOOK, 3).faults, 15));
test("ilk 3 adım boş çerçevelere yüklenir", () => {
  const r = run("FIFO", TEXTBOOK, 3);
  eq(r.steps[2].frames, [7, 0, 1]);
  eq(r.steps.slice(0, 3).map((s) => s.evicted), [null, null, null]);
});
test("4. adımda en eski sayfa (7) çıkarılır", () => {
  const s = run("FIFO", TEXTBOOK, 3).steps[3];
  eq([s.fault, s.evicted, s.frames], [true, 7, [2, 0, 1]]);
});
test("isabet sırayı değiştirmez (5. adım 0 → hit)", () => eq(run("FIFO", TEXTBOOK, 3).steps[4].fault, false));
test("1 çerçeve: tekrar etmeyen her erişim hata", () => eq(run("FIFO", "1 1 2 2 1", 1).faults, 3));
test("hits + faults = dizi uzunluğu", () => { const r = run("FIFO", TEXTBOOK, 4); eq(r.hits + r.faults, 20); });

console.log("\nBelady anomalisi (FIFO)");
test("3 çerçeve → 9 hata", () => eq(run("FIFO", BELADY, 3).faults, 9));
test("4 çerçeve → 10 hata (çerçeve arttı, hata da arttı!)", () => eq(run("FIFO", BELADY, 4).faults, 10));

console.log("\nLRU (Sprint 2)");
test("ders kitabı örneği, 3 çerçeve → 12 hata", () => eq(run("LRU", TEXTBOOK, 3).faults, 12));
test("Belady dizisi: 4 çerçeve 3'ten kötü değil", () => {
  if (run("LRU", BELADY, 4).faults > run("LRU", BELADY, 3).faults) throw new Error("LRU'da anomali olmamalı");
});

console.log("\nOptimal (Sprint 2)");
test("ders kitabı örneği, 3 çerçeve → 9 hata", () => eq(run("OPT", TEXTBOOK, 3).faults, 9));

console.log(`\nSonuç: ${passed} geçti, ${failed} başarısız, ${skipped} atlandı\n`);
process.exit(failed ? 1 : 0);
