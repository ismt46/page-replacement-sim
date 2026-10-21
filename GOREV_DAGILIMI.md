# Görev Paylaşımı ve Sprint Planı

> Hocaya "kim ne yaptı" sorusunun cevabı bu tablo + Git commit geçmişi olacak.

## Roller

| Üye | Rol | Ana sorumluluk |
|---|---|---|
| **Üye A** — İsmet Karsız | Algoritma geliştirici | FIFO, LRU, Optimal (+Clock/LFU), simülasyon motoru, adım verisi |
| **Üye B** — Birsu Güler | Arayüz ve animasyon | Sayfa tasarımı, tablo, animasyon, oynatma kontrolleri |
| **Üye C** — Tuğba Ölmez | Test, analiz, dokümantasyon | Test senaryoları, karşılaştırma grafiği, Belady demosu, rapor, sunum |

Herkes en az bir başka üyenin Pull Request'ini inceler.

## Sprint 1 (bugüne kadar) — ne yapıldı?

| Üye | Teslim edilen | Dosyalar |
|---|---|---|
| Üye A | Çekirdek veri yapıları (Step, SimulationResult), simülasyon motoru, **çalışan FIFO** | `src/core/types.js`, `src/engine/simulator.js`, `src/algorithms/fifo.js`, LRU/OPT iskeletleri |
| Üye B | Web sayfası iskeleti, giriş formu, **adım adım statik tablo** (hata kırmızı, isabet yeşil) | `index.html`, `css/style.css`, `src/ui/table.js`, `src/app.js` |
| Üye C | Git deposu ve README, girdi okuma/doğrulama, rastgele dizi, **test altyapısı** (14 test geçiyor), konsol demosu | `README.md`, `src/core/parser.js`, `tests/run-tests.js`, `demo/cli.js` |

**Mini demo (PoC):** Girdi dosyası/metni okunup `SimulationInput` olarak hafızaya alınıyor, FIFO çalıştırılıyor, adım adım tablo ve toplam hata sayısı gösteriliyor. Hem tarayıcıda (`index.html`) hem konsolda (`node demo/cli.js`) çalışıyor. Belady anomalisi FIFO ile şimdiden gösterilebiliyor (3 çerçeve → 9 hata, 4 çerçeve → 10 hata).

## Sprint 2 (bir sonraki ara teslimat) — kim neyi teslim edecek?

| Üye | Teslim edecek modül | Kabul ölçütü |
|---|---|---|
| Üye A | `lru.js` ve `optimal.js` | Ders kitabı dizisi, 3 çerçeve: LRU = 12, OPT = 9 hata; tüm testler geçer |
| Üye B | Adım adım **animasyon** + oynatma kontrolleri (başlat, duraklat, ileri, geri, hız) | Aynı `steps` dizisi ileri ve geri oynatılabiliyor |
| Üye C | LRU/OPT testleri, uç durum testleri (1 çerçeve, tekrar eden dizi, uzun dizi), **karşılaştırma ekranı taslağı** (`runAll` sonucu tablo) | Her algoritma için ≥ 3 elle çözülmüş örnek |

## Sprint 3 ve sonrası

| Üye | Modül |
|---|---|
| Üye A | Clock (Second Chance), LFU (isteğe bağlı); istatistik hesapları |
| Üye B | Üç algoritmanın yan yana görünümü, Belady ekranı, mobil uyum |
| Üye C | Chart.js ile hata sayısı / hata oranı grafiği, Belady grafiği (`faultsByFrameCount`), rapor ve sunum |

Son: GitHub Pages yayını → hoca uygulamayı linkten açabilir.
