import { company, products, areas } from './data.mjs';

const THREE_VERSION = '0.170.0';

export const icons = {
  chip: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9.5" y="9.5" width="5" height="5" rx="1"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 3v6c0 4.6-3.4 8.4-8 9-4.6-.6-8-4.4-8-9V6l8-3z"/><path d="M8.5 12l2.5 2.5 4.5-5"/></svg>',
  factory: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21V10l6 3.5V10l6 3.5V6h4v15H3z"/><path d="M7 17h2M12 17h2M17 17h0"/></svg>',
  camera: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="13" height="10" rx="2"/><path d="M16 11l5-3v8l-5-3"/></svg>',
  building: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="1.5"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M10 21v-3h4v3"/></svg>',
  key: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M15 8l2 2"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V4M4 20h16"/><path d="M8 16v-4M12 16V8M16 16v-6M20 16v-9"/></svg>',
  badge: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="6"/><path d="M8.5 13.8L7 22l5-3 5 3-1.5-8.2"/><path d="M9.5 9l1.7 1.7L14.5 7.4"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z"/></svg>',
  radar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><path d="M12 12l6-6"/></svg>',
  left: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 3L5 8l5 5"/></svg>',
  right: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3l5 5-5 5"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 11.02 5 2.5 2.5 0 01-.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21H9z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.7 3h3.1l-6.8 7.8L22 21h-6.3l-4.9-6.4L5.2 21H2.1l7.3-8.3L2 3h6.4l4.4 5.9L17.7 3zm-1.1 16.2h1.7L7.5 4.7H5.7l10.9 14.5z"/></svg>',
  youtube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 7.2a3 3 0 00-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 001 7.2 31 31 0 00.5 12a31 31 0 00.5 4.8 3 3 0 002.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 002.1-2.1 31 31 0 00.5-4.8 31 31 0 00-.5-4.8zM9.7 15.1V8.9L15.5 12l-5.8 3.1z"/></svg>',
  nsosyal: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 4h3.2l7.6 10.6V4H19v16h-3.2L8.2 9.4V20H5z"/></svg>',
};

const navItems = [
  { href: 'hakkimizda.html', label: 'Hakkımızda', key: 'hakkimizda' },
  { href: 'faaliyet-alanlari.html', label: 'Faaliyet Alanları', key: 'faaliyet' },
  { mega: true, href: 'urunler.html', label: 'Ürünler', key: 'urunler' },
  { href: 'kalite.html', label: 'Kalite', key: 'kalite' },
  { href: 'kariyer.html', label: 'Kariyer', key: 'kariyer' },
  { href: 'haberler.html', label: 'Haberler', key: 'haberler' },
];

function megaMenu() {
  return `
  <div class="mega" id="mega-urunler">
    <div class="container mega-inner">
      <div>
        <h3>Ürün aileleri</h3>
        <ul class="mega-list compact">
          <li><a href="urunler.html">Tüm ürünler</a></li>
          ${areas.map((a) => `<li><a href="faaliyet-alanlari.html#${a.id}">${a.name}</a></li>`).join('')}
        </ul>
      </div>
      <div>
        <h3>Ürünleri keşfedin</h3>
        <ul class="mega-list mega-products">
          ${products.map((p) => `<li><a href="${p.id}.html">${p.name}<small>${p.family}</small></a></li>`).join('')}
        </ul>
      </div>
    </div>
  </div>`;
}

function nav(active) {
  return `
<header class="nav" role="banner">
  <nav class="container nav-inner" aria-label="Ana menü">
    <a class="nav-brand" href="index.html" aria-label="HTR ana sayfa"><img src="assets/img/brand/htr-logo.svg" alt="HTR" width="47" height="26"></a>
    <ul class="nav-links">
      ${navItems.map((n) => n.mega
        ? `<li class="has-mega"><button class="nav-link" type="button" aria-expanded="false" aria-controls="mega-urunler" ${active === n.key ? 'aria-current="page"' : ''}>${n.label}</button>${megaMenu()}</li>`
        : `<li><a class="nav-link" href="${n.href}" ${active === n.key ? 'aria-current="page"' : ''}>${n.label}</a></li>`).join('')}
    </ul>
    <div class="nav-cta-wrap"><a class="btn btn-primary nav-cta" href="iletisim.html">İletişim</a></div>
    <button class="nav-toggle" type="button" aria-label="Menüyü aç" aria-expanded="false" aria-controls="sheet"><span></span></button>
  </nav>
</header>
<div class="sheet" id="sheet">
  <ul>
    <li><a href="index.html">Ana Sayfa</a></li>
    ${navItems.filter((n) => !n.mega).map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join('')}
    <li><a href="iletisim.html">İletişim</a></li>
  </ul>
  <h3>Ürünler</h3>
  <ul class="compact">
    <li><a href="urunler.html">Tüm ürünler</a></li>
    ${products.map((p) => `<li><a href="${p.id}.html">${p.name} · ${p.family}</a></li>`).join('')}
  </ul>
</div>`;
}

function footer() {
  const year = 2026;
  return `
<footer class="footer">
  <div class="container">
    <div class="footer-top">
      <div class="footer-logos">
        <img src="assets/img/brand/htr-logo.svg" alt="HTR" width="50" height="28">
        <img src="assets/img/brand/havelsan-logo.svg" alt="HAVELSAN" width="90" height="18">
      </div>
      <div class="socials">
        ${company.socials.map((s) => `<a href="${s.href}" target="_blank" rel="noopener" aria-label="${s.name}">${icons[s.icon]}</a>`).join('')}
      </div>
    </div>
    <div class="footer-cols">
      <div><h4>Kurumsal</h4><ul>
        <li><a href="hakkimizda.html">Hakkımızda</a></li>
        <li><a href="hakkimizda.html#yonetim">Yönetim</a></li>
        <li><a href="kalite.html">Kalite ve Politikalar</a></li>
        <li><a href="haberler.html">Haberler</a></li>
      </ul></div>
      <div><h4>Faaliyet Alanları</h4><ul>
        ${areas.map((a) => `<li><a href="faaliyet-alanlari.html#${a.id}">${a.name}</a></li>`).join('')}
      </ul></div>
      <div><h4>Ürünler</h4><ul>
        ${products.map((p) => `<li><a href="${p.id}.html">${p.name}</a></li>`).join('')}
      </ul></div>
      <div><h4>Kariyer</h4><ul>
        <li><a href="kariyer.html#yasam">HTR’de Yaşam</a></li>
        <li><a href="kariyer.html#staj">HTR’de Staj</a></li>
        <li><a href="kariyer.html#basvuru">Kariyer Başvuruları</a></li>
      </ul></div>
      <div><h4>İletişim</h4><ul>
        <li>${company.address}</li>
        <li><a href="tel:${company.phoneHref}">${company.phone}</a></li>
        <li><a href="mailto:${company.email}">${company.email}</a></li>
      </ul></div>
    </div>
    <div class="footer-bottom">
      <span>© ${year} ${company.legal}. Tüm hakları saklıdır.</span>
      <span><a href="${company.kvkk}" target="_blank" rel="noopener">KVKK Aydınlatma Metni</a> · <a href="kalite.html">Politikalarımız</a> · <a href="iletisim.html">Bize Ulaşın</a></span>
    </div>
  </div>
</footer>`;
}

export function layout({ title, description, active = '', body, three = false, script = '', bodyClass = '' }) {
  const fullTitle = title ? `${title} · HTR` : 'HTR · Havelsan Teknoloji Radar';
  const importMap = three ? `
  <script type="importmap">
  { "imports": {
      "three": "https://cdn.jsdelivr.net/npm/three@${THREE_VERSION}/build/three.module.js",
      "three/addons/": "https://cdn.jsdelivr.net/npm/three@${THREE_VERSION}/examples/jsm/"
  } }
  </script>
  <link rel="modulepreload" href="https://cdn.jsdelivr.net/npm/three@${THREE_VERSION}/build/three.module.js" crossorigin>` : '';
  return `<!doctype html>
<html lang="tr" class="no-js">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${fullTitle}</title>
  <meta name="description" content="${description}">
  <meta name="theme-color" content="#fbfbfd">
  <meta name="robots" content="noindex">
  <meta property="og:title" content="${fullTitle}">
  <meta property="og:description" content="${description}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="tr_TR">
  <link rel="icon" type="image/svg+xml" href="assets/img/brand/htr-logo.svg">
  <link rel="stylesheet" href="css/styles.css">
  ${importMap}
</head>
<body class="${bodyClass}">
  <a class="skip-link" href="#main">İçeriğe geç</a>
  ${nav(active)}
  <main id="main">
${body}
  </main>
  ${footer()}
  <script src="js/main.js" defer></script>
  ${script ? `<script type="module" src="${script}"></script>` : ''}
</body>
</html>
`;
}
