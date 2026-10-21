# GitHub Deposunu Kurma (bir kez, ~15 dk)

Amaç: Hoca commit geçmişinde **her üyenin kendi işini** görsün. Bu yüzden dosyaları tek kişi değil, sahibi yüklesin.

## 1. Depoyu oluştur (Üye C)
1. github.com → **New repository** → ad: `page-replacement-sim`, Public, README **eklemeden** oluştur.
2. Settings → Collaborators → Üye A ve Üye B'yi ekle.

## 2. İlk commit (Üye C)
```bash
cd page-replacement-sim
git init -b main
git add README.md package.json .gitignore docs/ src/core/parser.js tests/ demo/ src/node-loader.js
git commit -m "Depo, README, girdi okuyucu, test altyapısı ve konsol demosu"
git remote add origin https://github.com/ismt46/page-replacement-sim.git
git push -u origin main
```

## 3. Üye A
```bash
git clone https://github.com/ismt46/page-replacement-sim.git && cd page-replacement-sim
git checkout -b feature/core-fifo
# zip'teki şu dosyaları kopyala: src/core/types.js, src/engine/, src/algorithms/
git add src/core/types.js src/engine src/algorithms
git commit -m "Çekirdek veri yapıları, simülasyon motoru ve FIFO"
git push -u origin feature/core-fifo      # GitHub'da Pull Request aç → Üye C onaylar
```

## 4. Üye B
```bash
git checkout main && git pull
git checkout -b feature/ui-table
# kopyala: index.html, css/, src/ui/, src/app.js
git add index.html css src/ui src/app.js
git commit -m "Web arayüzü iskeleti ve adım adım tablo"
git push -u origin feature/ui-table       # Pull Request → Üye A onaylar
```

## 5. Kontrol (A ve B'nin PR'ları birleştirildikten sonra)
`main` dalında `npm test` → 14 geçti, 0 başarısız. `index.html` açılıyor.

## (İsteğe bağlı) GitHub Pages
Settings → Pages → Source: `main` / root → birkaç dakika sonra `https://ismt46.github.io/page-replacement-sim/` çalışır. Bu linki hocaya verin.
