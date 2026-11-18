# HTR Kurumsal Web Sitesi

Havelsan Teknoloji Radar (HTR) kurumsal sitesinin yeniden tasarımı. Ürünler (SEZGİ, GÖRSEN, PTP, TANI, ERİSİS) three.js ile gerçek zamanlı, etkileşimli 3B olarak sunulur.

## Geliştirme

Bağımlılık yoktur; yalnızca Node 18+ gerekir.

```bash
node build.mjs                      # dist/ klasörüne derler
cd dist && python3 -m http.server   # http://localhost:8000
```

## Yapı

| Yol | İçerik |
| --- | --- |
| `src/data.mjs` | Tüm site içeriği (ürünler, tarihçe, haberler, kariyer…) — içerik güncellemeleri buradan yapılır |
| `src/layout.mjs` | Ortak `<head>`, navigasyon, mobil menü, footer |
| `src/pages.mjs` | Sayfa şablonları |
| `css/styles.css` | Tasarım sistemi (Apple HIG prensipleri: sistem fontu, boyuta göre tracking, translucent materyaller, reduced-motion/transparency desteği) |
| `js/three/core.js` | Sahne altyapısı, spring fiziği (damping + response), shader'lar |
| `js/three/models.js` | Prosedürel ürün modelleri ve etkileşimleri |
| `js/pages/*.js` | Ana sayfa hero/keşif modülü ve ürün sayfası kontrolleri |

`main` dalına her push'ta GitHub Actions siteyi derleyip GitHub Pages'e yayınlar.
