/**
 * node-loader.js — Tarayıcıdaki <script> sırasını Node.js için taklit eder.
 * Testler ve konsol demosu bu dosyayı require eder.
 */
require("./types.js");
require("./parser.js");
require("./simulator.js");
require("./fifo.js");
require("./lru.js");
require("./optimal.js");
module.exports = globalThis.PageSim;
