# Sayfa Değiştirme Algoritmaları Simülatörü

BİM 361 İşletim Sistemleri dönem projesi. Kullanıcı bir **sayfa referans dizisi** ve **çerçeve (frame) sayısı** girer; uygulama her adımda bellekte hangi sayfaların bulunduğunu gösterir, **sayfa hatalarını (page fault)** kırmızıyla işaretler ve toplam hata sayısını verir.

| Algoritma | Kural | Durum |
|---|---|---|
| FIFO | Belleğe ilk giren sayfa ilk çıkar | ✅ Sprint 1 |
| LRU | En uzun süredir kullanılmayan sayfa çıkar | ⏳ Sprint 2 |
| Optimal (OPT) | Gelecekte en geç kullanılacak sayfa çıkar | ⏳ Sprint 2 |
| Clock, LFU | İsteğe bağlı ekler | ⏳ Sprint 3 |

İlgili İS kavramları: bellek yönetimi, sanal bellek, sayfalama (paging), sayfa değiştirme, Belady anomalisi.

---

## Gereksinimler

- Herhangi bir modern tarayıcı (Chrome, Firefox, Edge) — **kurulum gerekmez**
- Konsol demosu ve testler için: [Node.js](https://nodejs.org) 18 veya üzeri

Projede derleme adımı yoktur; saf HTML + CSS + JavaScript'tir. Harici kütüphane kullanılmaz (Sprint 3'te grafik için Chart.js eklenecek).

## Çalıştırma

### 1) Web arayüzü
```bash
git clone https://github.com/ismt46/page-replacement-sim.git
cd page-replacement-sim
```
`index.html` dosyasına çift tıklayın — tarayıcıda açılır.

İsterseniz yerel sunucu ile:
```bash
npx serve .          # veya: python -m http.server 8000
```

### 2) Konsol demosu
```bash
node cli.js                                  # ders kitabı örneği, 3 çerçeve, FIFO
node cli.js "1 2 3 4 1 2 5 1 2 3 4 5" 3      # Belady dizisi, 3 çerçeve → 9 hata
node cli.js "1 2 3 4 1 2 5 1 2 3 4 5" 4      # aynı dizi, 4 çerçeve → 10 hata (!)
node cli.js --random 4                       # rastgele dizi
```
veya `npm run demo`.

### 3) Testler
```bash
node run-tests.js      # veya: npm test
```
Henüz yazılmamış algoritmaların testleri "ATLANDI" olarak görünür.

---

## Proje yapısı

```
page-replacement-sim/
├── index.html          Web arayüzü giriş noktası
├── style.css           Stil (hata = kırmızı, isabet = yeşil)
├── types.js            Çekirdek veri yapıları: Step, SimulationResult
├── parser.js           Girdinin okunması, doğrulanması, rastgele dizi
├── simulator.js        Simülasyon motoru: run(), runAll(), Belady taraması
├── fifo.js             FIFO          (tamam)
├── lru.js              LRU           (iskelet, Sprint 2)
├── optimal.js          Optimal       (iskelet, Sprint 2)
├── table.js            Adım adım tablo görünümü
├── app.js              Arayüz ↔ motor bağlantısı
├── node-loader.js      Modülleri Node.js'te yükler (test/CLI için)
├── cli.js              Konsol demosu
├── run-tests.js        Test çalıştırıcı
├── GOREV_DAGILIMI.md   Ekip görev paylaşımı ve sprint planı
└── GITHUB_KURULUM.md   Depo kurulum notları
```

## Veri akışı ve adım verisi formatı

```
Kullanıcı metni ──parser──▶ SimulationInput ──algoritma──▶ SimulationResult ──▶ tablo / animasyon / grafik
```

Her algoritma aynı formatta çıktı üretir; arayüz hangi algoritmanın çalıştığını bilmek zorunda değildir.

```js
// SimulationInput
{ reference: [7, 0, 1, 2, 0, 3], frameCount: 3 }

// Step  (her referans için bir tane)
{ index: 3, page: 2, frames: [2, 0, 1], fault: true, evicted: 7, frameIndex: 0,
  note: "7 çıkarıldı (en eski), yerine 2 geldi" }

// SimulationResult
{ algorithm: "FIFO", reference: [...], frameCount: 3, steps: [Step, ...],
  faults: 15, hits: 5, faultRate: 0.75 }
```

Ayrıntılar: `types.js`.

## Yeni algoritma eklemek

1. `<ad>.js` oluşturun, `PageSim.algorithms.<AD> = function (input) { ... }` tanımlayın ve `PageSim.createResult(...)` döndürün.
2. `index.html` ve `node-loader.js` içine dosyayı ekleyin.
3. `run-tests.js` içine ders kitabından en az bir elle çözülmüş örnek ekleyin.

## Çalışma kuralları

- Her özellik ayrı dalda geliştirilir: `feature/lru`, `feature/animation` …
- `main` dalına doğrudan push yapılmaz; Pull Request açılır, **başka bir üye** inceleyip onaylar.
- PR açmadan önce `npm test` geçmelidir.

## Ekip

| Üye | Rol |
|---|---|
| İsmet Karsız | Algoritma ve simülasyon motoru |
| Birsu Güler | Arayüz ve animasyon |
| Tuğba Ölmez | Test, analiz, grafik ve dokümantasyon |

## Kaynak

A. Silberschatz, P. B. Galvin, G. Gagne — *Operating System Concepts*, Bölüm 10: Virtual Memory (sayfa değiştirme örnekleri).
