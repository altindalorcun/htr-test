import { company, milestones, leadership, vision, mission, areas, products, certificates, policies, news, career } from './data.mjs';
import { icons } from './layout.mjs';

const P = Object.fromEntries(products.map((p) => [p.id, p]));
const fmtDate = (iso) => new Date(iso + 'T12:00:00').toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
const initials = (n) => n.split(' ').filter(Boolean).map((w) => w[0]).slice(0, 2).join('');
const list = (items, cls = 'features') => `<ul class="${cls}">${items.map((i) => `<li>${i}</li>`).join('')}</ul>`;
const stat = (s) => `<div><div class="stat-value">${s.v}${s.unit ? `<small>${s.unit}</small>` : ''}</div><div class="stat-label">${s.label}</div></div>`;

const ctaBand = (title = 'Projeniz için doğru çözümü birlikte belirleyelim.', text = 'Ürünlerimiz, entegrasyon ve iş birliği talepleriniz için ekibimizle iletişime geçin.') => `
    <section class="section section--alt cta-band">
      <div class="container container--narrow reveal">
        <h2 class="headline">${title}</h2>
        <p class="lead" style="margin-inline:auto;max-width:40ch">${text}</p>
        <div class="btn-row"><a class="btn btn-primary" href="iletisim.html">Bize ulaşın</a><a class="link-arrow" href="urunler.html">Tüm ürünler</a></div>
      </div>
    </section>`;

const newsCard = (n) => `
        <a class="card card-link news-card reveal" href="haber-${n.slug}.html">
          <div class="card-media"><img src="${n.img}" alt="" loading="lazy" width="640" height="400"></div>
          <div class="news-date"><time datetime="${n.date}">${fmtDate(n.date)}</time> · ${n.tag}</div>
          <h3 class="subtitle">${n.title}</h3>
        </a>`;

/* ================================================================== */
export function home() {
  const tabs = products.map((p, i) => `<button type="button" data-tab="${p.id}" aria-pressed="${i === 0}">${p.name}</button>`).join('');
  const panels = products.map((p, i) => `
          <div data-panel="${p.id}" class="${i === 0 ? 'is-active' : ''}">
            <div><p class="eyebrow">${p.family}</p><h3 class="headline" style="margin-bottom:.4rem">${p.tagline}</h3></div>
            <div><p class="lead" style="margin-bottom:1rem">${p.short}</p><div class="btn-row"><a class="btn btn-primary" href="${p.id}.html">${p.name}’yi keşfedin</a></div></div>
          </div>`).join('');
  return {
    file: 'index.html', active: '', three: true, script: 'js/pages/home.js',
    title: '', description: 'Havelsan Teknoloji Radar (HTR): radar, elektronik sistemler, ağ destekli güvenlik sistemleri ve üretim alanlarında yenilikçi teknolojiler ve milli çözümler.',
    body: `
    <section class="hero" data-nav="ink" aria-label="Giriş">
      <canvas class="hero-canvas" aria-hidden="true"></canvas>
      <div class="container">
        <div class="hero-copy on-ink" style="background:none">
          <p class="eyebrow">Havelsan Teknoloji Radar</p>
          <h1 class="display">Yenilikçi teknolojiler.<br><span class="gradient-text">Milli çözümler.</span></h1>
          <p class="lead" style="margin-top:1.4rem">1990’dan bu yana radar, elektronik sistemler ve kritik tesis güvenliğinde Türkiye’nin savunma gücünü ileri teknolojilerle buluşturuyoruz.</p>
          <div class="btn-row"><a class="btn btn-primary" href="#urunler">Ürünleri keşfedin</a><a class="link-arrow" href="hakkimizda.html">Hakkımızda</a></div>
        </div>
      </div>
      <div class="hero-meta" aria-hidden="true">
        <span>SEZGİ · ELEKTRONİK TARAMA <b>●</b></span>
        <span>TAKİP <b data-hero="trk">07</b> HEDEF</span>
        <span>TESPİT <b data-hero="det">0000</b></span>
      </div>
      <span class="scroll-cue" aria-hidden="true"></span>
    </section>

    <section class="section">
      <div class="container">
        <p class="statement reveal" style="max-width:24ch">Otuz beş yılı aşkın mühendislik birikimiyle <strong>tasarlıyor, üretiyor ve sahada koruyoruz.</strong></p>
        <div class="stats reveal" style="margin-top:clamp(48px,7vw,88px)">
          <div><div class="stat-value" data-count="1990" data-raw="true">1990</div><div class="stat-label">Kuruluş yılı</div></div>
          <div><div class="stat-value"><span data-count="35500">35.500</span><small>m²</small></div><div class="stat-label">Ankara Akyurt yerleşkesi</div></div>
          <div><div class="stat-value">Ar-Ge</div><div class="stat-label">2017’den bu yana bakanlık onaylı Ar-Ge Merkezi</div></div>
          <div><div class="stat-value"><span data-count="500">500</span></div><div class="stat-label">Ar-Ge harcamalarında Türkiye’nin en büyük 500 şirketi arasında</div></div>
        </div>
      </div>
    </section>

    <section class="section section--ink" id="urunler" data-nav="ink">
      <div class="container" data-explorer>
        <div class="section-head center reveal">
          <p class="eyebrow">Ürünler</p>
          <h2 class="headline">Sahada kanıtlanmış.<br>Burada keşfedin.</h2>
          <p class="lead" style="margin-inline:auto;max-width:44ch">Her ürün gerçek zamanlı 3B olarak çalışıyor. Seçin, sürükleyin, inceleyin.</p>
        </div>
        <div class="explorer-tabs"><div class="seg" role="group" aria-label="Ürün seçimi">${tabs}</div></div>
        <div class="stage stage-wide reveal">
          <canvas aria-label="Seçili ürünün etkileşimli 3B modeli"></canvas>
          <div class="stage-loading">3B sahne yükleniyor…</div>
          <div class="stage-hint">Sürükleyerek döndürün</div>
        </div>
        <div class="explorer-info">${panels}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head reveal">
          <p class="eyebrow">Faaliyet alanlarımız</p>
          <h2 class="headline">Tasarımdan sahaya, tek çatı altında.</h2>
          <p class="lead">Türkiye’nin savunma gücünü ileri teknolojilerle buluşturuyor, ulusal güvenliğimize stratejik katkılar sunuyoruz.</p>
        </div>
        <div class="grid grid-3">
          ${areas.map((a, i) => `
          <a class="card card-link reveal reveal-d${i}" href="faaliyet-alanlari.html#${a.id}">
            <div class="card-media"><img src="${a.img}" alt="" loading="lazy" width="640" height="400"></div>
            <h3 class="title">${a.name}</h3>
            <p class="muted">${a.summary}</p>
            <span class="link-arrow">Daha fazla bilgi</span>
          </a>`).join('')}
        </div>
      </div>
    </section>

    <section class="section section--alt">
      <div class="container split">
        <div class="reveal">
          <p class="eyebrow">Kalite ve güvenlik</p>
          <h2 class="headline">Uluslararası standartlarda. NATO düzeyinde güven.</h2>
          <p class="lead">AQAP 2110’dan AS9100’e, ISO 27001’den NATO Gizli Tesis Güvenlik Belgesi’ne; her süreç belgelendirilmiş ve denetlenmiştir.</p>
          <a class="link-arrow" href="kalite.html">Belgelerimiz ve politikalarımız</a>
        </div>
        <ul class="chips reveal reveal-d1">
          ${certificates.map((c) => `<li>${c.name}</li>`).join('')}
        </ul>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head reveal" style="display:flex;justify-content:space-between;align-items:end;gap:24px;flex-wrap:wrap;max-width:none">
          <div><p class="eyebrow">Haberler ve duyurular</p><h2 class="headline" style="margin:0">Son gelişmeler</h2></div>
          <a class="link-arrow" href="haberler.html">Tüm haberler</a>
        </div>
        <div class="grid grid-3">${news.slice(0, 3).map(newsCard).join('')}</div>
      </div>
    </section>

    <section class="section section--ink" data-nav="ink">
      <div class="container split">
        <div class="reveal">
          <p class="eyebrow">Kariyer</p>
          <h2 class="headline">Kariyerinde iz bırak.</h2>
          <p class="lead">Savunma sanayinin kalbinde unutulmaz işlere imza atarak geleceğe yön ver.</p>
          <div class="btn-row"><a class="btn btn-primary" href="kariyer.html">HTR’de yaşam</a><a class="link-arrow" href="kariyer.html#staj">Staj programı</a></div>
        </div>
        <div class="media-frame reveal reveal-d1" style="aspect-ratio:4/3"><img src="assets/img/about/yasam.webp" alt="HTR çalışanları" loading="lazy"></div>
      </div>
    </section>`,
  };
}

/* ================================================================== */
export function about() {
  return {
    file: 'hakkimizda.html', active: 'hakkimizda', title: 'Hakkımızda',
    description: '1990’da kurulan, 2001’den bu yana HAVELSAN iştiraki olan HTR’nin tarihçesi, vizyonu, misyonu ve yönetimi.',
    body: `
    <section class="page-hero">
      <div class="container">
        <p class="eyebrow">Hakkımızda</p>
        <h1 class="display">Radar ile başlayan bir mühendislik hikâyesi.</h1>
        <p class="lead">Havelsan Teknoloji Radar (HTR), uzun menzilli erken ihbar radarı üretmek amacıyla 1990 yılında kuruldu; 2001’de HAVELSAN’ın ana hissedar olmasıyla çalışmalarını güçlendirerek sürdürdü.</p>
      </div>
    </section>

    <section class="section--tight">
      <div class="container"><div class="media-frame reveal" style="aspect-ratio:21/9"><img src="assets/img/about/campus.webp" alt="HTR yerleşkesi" width="1600" height="686"></div></div>
    </section>

    <section class="section">
      <div class="container split split--top">
        <p class="statement reveal">Radar, elektronik sistemler, ağ destekli güvenlik, kart, kablaj, birim sistem, montaj ve test faaliyetleri — <strong>tek bir yerleşkede, 35.500 m² üzerinde.</strong></p>
        <div class="reveal reveal-d1">
          <p class="lead" style="color:var(--text)">2017 yılında bakanlık onaylı Ar-Ge Merkezi unvanını alan HTR, öz kaynaklarıyla yaptığı yatırımlar sayesinde özgün ve milli ürünler tasarlayıp üreterek büyümesini sürdürmektedir.</p>
          <p class="muted">HTR, yenilikçi teknolojileri ve milli çözümleri ile geleceğe güvenle ilerlemeye devam ediyor.</p>
          <div class="stats" style="grid-template-columns:repeat(2,1fr);margin-top:36px">
            <div><div class="stat-value" data-count="1990" data-raw="true">1990</div><div class="stat-label">Kuruluş</div></div>
            <div><div class="stat-value"><span data-count="35500">35.500</span><small>m²</small></div><div class="stat-label">Üretim tesisi</div></div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--alt" id="tarihce">
      <div class="container" data-scroller>
        <div class="section-head reveal"><p class="eyebrow">Kilometre taşları</p><h2 class="headline">35 yılın izinde.</h2></div>
        <div class="timeline" tabindex="0" aria-label="Tarihçe">
          ${milestones.map((m) => `
          <article class="card">
            <div class="tl-year">${m.year}</div>
            <h3 class="subtitle">${m.title}</h3>
            <p class="muted small">${m.date ? m.date + ' · ' : ''}${m.text}</p>
          </article>`).join('')}
        </div>
        <div class="timeline-nav">
          <button class="round-btn" type="button" data-dir="-1" aria-label="Önceki">${icons.left}</button>
          <button class="round-btn" type="button" data-dir="1" aria-label="Sonraki">${icons.right}</button>
        </div>
      </div>
    </section>

    <section class="section section--ink" data-nav="ink">
      <div class="container grid grid-2">
        <div class="card card--ink reveal"><p class="eyebrow">Vizyon</p><p class="title" style="font-weight:600">${vision}</p></div>
        <div class="card card--ink reveal reveal-d1"><p class="eyebrow">Misyon</p><p class="title" style="font-weight:600">${mission}</p></div>
      </div>
    </section>

    <section class="section" id="yonetim">
      <div class="container">
        <div class="section-head reveal"><p class="eyebrow">Yönetim</p><h2 class="headline">Yönetim Kurulu ve Üst Yönetim</h2></div>
        <div class="grid grid-4">
          ${[...leadership.board, ...leadership.executive].map((p, i) => `
          <div class="card person reveal reveal-d${i % 4}">
            <div class="avatar" aria-hidden="true">${initials(p.name)}</div>
            <b class="subtitle" style="margin:0">${p.name}</b>
            <span class="muted small">${p.role}</span>
          </div>`).join('')}
        </div>
      </div>
    </section>

    <section class="section section--alt" id="organizasyon-yapisi">
      <div class="container split">
        <div class="reveal">
          <p class="eyebrow">Ortaklık yapısı</p>
          <h2 class="headline">Güçlü ortaklar, milli sermaye.</h2>
          <p class="lead">HTR, ana hissedarı HAVELSAN ile birlikte Kartal Vakfı ve Türk Hava Kurumu ortaklığında faaliyet göstermektedir.</p>
        </div>
        <div class="grid reveal reveal-d1">
          ${leadership.partners.map((p) => `<div class="card" style="background:var(--surface);display:flex;justify-content:space-between;align-items:center"><b class="subtitle" style="margin:0">${p}</b>${p === 'HAVELSAN' ? '<span class="muted small">Ana hissedar</span>' : '<span class="muted small">Ortak</span>'}</div>`).join('')}
        </div>
      </div>
    </section>
    ${ctaBand('Geleceğe güvenle ilerliyoruz.', 'Çözümlerimiz ve iş birliği fırsatları hakkında bilgi almak için bize ulaşın.')}`,
  };
}

/* ================================================================== */
export function areasPage() {
  const [es, ag, ur] = areas;
  return {
    file: 'faaliyet-alanlari.html', active: 'faaliyet', title: 'Faaliyet Alanları',
    description: 'HTR’nin elektronik sistemler, ağ destekli güvenlik sistemleri ve üretim alanlarındaki yetenekleri ve hizmetleri.',
    body: `
    <section class="page-hero">
      <div class="container">
        <p class="eyebrow">Neler yapıyoruz</p>
        <h1 class="display">Üç uzmanlık. Tek mühendislik kültürü.</h1>
        <p class="lead">Radar ve elektronik sistemlerden kritik tesis güvenliğine, kart dizgiden sistem entegrasyonuna kadar uçtan uca yetkinlik.</p>
        <div class="btn-row" style="margin-top:28px">${areas.map((a) => `<a class="btn btn-ghost" href="#${a.id}">${a.name}</a>`).join('')}</div>
      </div>
    </section>

    <section class="section section--alt" id="${es.id}">
      <div class="container">
        <div class="split">
          <div class="reveal">
            <div class="card-icon">${icons[es.icon]}</div>
            <h2 class="headline">${es.name}</h2>
            ${es.intro.map((t, i) => `<p class="${i ? 'muted' : 'lead'}">${t}</p>`).join('')}
          </div>
          <div class="media-frame reveal reveal-d1" style="aspect-ratio:4/3"><img src="assets/img/areas/es1.webp" alt="Elektronik sistemler hizmet alanları" loading="lazy"></div>
        </div>
        <div class="grid grid-2" style="margin-top:clamp(40px,6vw,72px)">
          <div class="card reveal" style="background:var(--surface)"><h3 class="title">Yetenek ve hizmet alanlarımız</h3>${list(es.capabilities, 'features single')}</div>
          <div class="card reveal reveal-d1" style="background:var(--surface)"><h3 class="title">Güçlü yönlerimiz</h3>${list(es.strengths, 'features single')}</div>
        </div>
      </div>
    </section>

    <section class="section" id="${ag.id}">
      <div class="container">
        <div class="split">
          <div class="media-frame reveal" style="aspect-ratio:4/3"><img src="${ag.img}" alt="Ağ destekli güvenlik sistemleri" loading="lazy"></div>
          <div class="reveal reveal-d1">
            <div class="card-icon">${icons[ag.icon]}</div>
            <h2 class="headline">${ag.name}</h2>
            ${ag.intro.map((t, i) => `<p class="${i ? 'muted' : 'lead'}">${t}</p>`).join('')}
            <div class="btn-row"><a class="link-arrow" href="erisis.html">ERİSİS</a><a class="link-arrow" href="sezgi.html">SEZGİ</a><a class="link-arrow" href="tani.html">TANI</a></div>
          </div>
        </div>
        <h3 class="title reveal" style="margin-top:clamp(56px,8vw,96px)">Çözümler ve yetkinlikler</h3>
        <div class="grid grid-3" style="margin-top:20px">
          ${ag.solutions.map((s, i) => `<div class="card reveal reveal-d${i % 3}"><h4 class="subtitle">${s.t}</h4><p class="muted small">${s.d}</p></div>`).join('')}
        </div>
        <div class="card card--ink reveal" style="margin-top:22px">
          <div class="split split--top" style="gap:32px">
            <div><p class="eyebrow">Öne çıkan çözüm</p><h3 class="headline" style="font-size:clamp(1.75rem,3.4vw,2.5rem)">${ag.base.t}</h3></div>
            <div>${ag.base.d.map((t) => `<p class="muted">${t}</p>`).join('')}</div>
          </div>
        </div>
        <div class="reveal" style="margin-top:40px">
          <h3 class="subtitle">Destek verilen başlıca sistemler</h3>
          <ul class="chips" style="margin-top:14px">${ag.supported.map((s) => `<li>${s}</li>`).join('')}</ul>
        </div>
      </div>
    </section>

    <section class="section section--alt" id="${ur.id}">
      <div class="container">
        <div class="split">
          <div class="reveal">
            <div class="card-icon">${icons[ur.icon]}</div>
            <h2 class="headline">${ur.name}</h2>
            ${ur.intro.map((t, i) => `<p class="${i ? 'muted' : 'lead'}">${t}</p>`).join('')}
          </div>
          <div class="media-frame reveal reveal-d1" style="aspect-ratio:4/3"><img src="${ur.img}" alt="HTR üretim hattı" loading="lazy"></div>
        </div>
        <div class="card reveal" style="background:var(--surface);margin-top:clamp(40px,6vw,72px)"><h3 class="title">Yetenek ve hizmet alanlarımız</h3>${list(ur.capabilities)}</div>
        <div class="grid grid-2" style="margin-top:22px">
          <div class="card reveal" style="background:var(--surface)"><h3 class="subtitle">Üretim altyapısı</h3><ul class="chips" style="margin-top:14px">${ur.production.map((s) => `<li style="background:var(--bg-alt)">${s}</li>`).join('')}</ul></div>
          <div class="card reveal reveal-d1" style="background:var(--surface)"><h3 class="subtitle">Test altyapısı</h3><ul class="chips" style="margin-top:14px">${ur.test.map((s) => `<li style="background:var(--bg-alt)">${s}</li>`).join('')}</ul></div>
        </div>
      </div>
    </section>
    ${ctaBand()}`,
  };
}

/* ================================================================== */
export function productsPage() {
  return {
    file: 'urunler.html', active: 'urunler', title: 'Ürünler',
    description: 'SEZGİ radar, GÖRSEN görüntüleme, PTP pan-tilt, TANI geçiş kontrol ve ERİSİS güvenlik yönetim yazılımı.',
    body: `
    <section class="page-hero">
      <div class="container">
        <p class="eyebrow">Ürünler</p>
        <h1 class="display">Algıla. Gör. Yönlendir. Yönet.</h1>
        <p class="lead">Birbiriyle tam uyumlu çalışan, yerli ve milli mühendislikle geliştirilmiş ürün aileleri. Her birini 3B olarak inceleyin.</p>
      </div>
    </section>
    <section class="section--tight" style="padding-top:0">
      <div class="container grid grid-2">
        ${products.map((p, i) => `
        <a class="card card-link variant reveal reveal-d${i % 2}" href="${p.id}.html" style="${p.id === 'erisis' ? 'grid-column:1/-1' : ''}">
          ${p.img ? `<div class="card-media contain"><img src="${p.img}" alt="${p.name}" loading="lazy"></div>` : `<div class="card-media" style="aspect-ratio:21/8;background:radial-gradient(80% 120% at 50% 0%,#1f2a52,#07090f);display:grid;place-items:center;color:#fff"><span style="font-size:clamp(2rem,6vw,4.5rem);font-weight:700;letter-spacing:-.04em">ERİSİS</span></div>`}
          <p class="eyebrow" style="margin-bottom:.4rem">${p.family}</p>
          <h2 class="title">${p.name} — ${p.tagline}</h2>
          <p class="muted">${p.short}</p>
          <span class="link-arrow">3B olarak keşfedin</span>
        </a>`).join('')}
      </div>
    </section>
    <section class="section section--ink" data-nav="ink">
      <div class="container">
        <div class="section-head reveal"><p class="eyebrow">Entegre ekosistem</p><h2 class="headline">Birlikte daha güçlü.</h2>
        <p class="lead">SEZGİ tespit eder, GÖRSEN doğrular, PTP yönlendirir, TANI erişimi denetler — ERİSİS hepsini tek ekranda birleştirir.</p></div>
        <div class="grid grid-4">
          ${['sezgi', 'gorsen', 'ptp', 'tani'].map((id, i) => `<a class="card card--ink card-link reveal reveal-d${i}" href="${id}.html"><p class="eyebrow">${['Tespit', 'Doğrulama', 'Yönlendirme', 'Erişim'][i]}</p><h3 class="subtitle">${P[id].name}</h3><p class="muted small">${P[id].short}</p></a>`).join('')}
        </div>
      </div>
    </section>
    ${ctaBand()}`,
  };
}

/* ================================================================== */
export function productPage(p) {
  const readout = `
          <div class="readout" aria-live="off">
            <div class="readout-title">${p.name} · Canlı</div>
            ${p.readout.map(([k, key, v]) => `<div class="row"><span class="k">${k}</span><span class="v"${key ? ` data-out="${key}"` : ''}>${v}</span></div>`).join('')}
          </div>`;
  const variants = p.variants ? `
    <section class="section section--alt">
      <div class="container">
        <div class="section-head reveal"><p class="eyebrow">Ürün ailesi</p><h2 class="headline">Göreve göre yapılandırılır.</h2></div>
        <div class="grid grid-${Math.min(3, p.variants.length) === 1 ? 2 : 3}">
          ${p.variants.map((v, i) => `
          <div class="card variant reveal reveal-d${i}" style="background:var(--surface)">
            <div class="card-media contain"><img src="${v.img}" alt="${v.name}" loading="lazy"></div>
            <h3 class="subtitle">${v.name}</h3>
            <ul>${v.points.map((x) => `<li>${x}</li>`).join('')}</ul>
          </div>`).join('')}
          ${p.variants.length === 1 ? `<div class="card reveal reveal-d1" style="background:var(--surface)"><h3 class="title">Entegre çalışacak şekilde tasarlandı.</h3><p class="muted">${p.name}, HTR’nin ağ destekli güvenlik mimarisi içinde mevcut sistemlerle entegre çalışır. ERİSİS üzerinden kamera ve diğer sensörlerle eşleşerek tespit edilen hedefleri otomatik doğrulamaya yönlendirir.</p><a class="link-arrow" href="erisis.html">ERİSİS ile entegrasyon</a></div>` : ''}
        </div>
        ${p.family2 ? `<div class="grid grid-${p.family2.length === 4 ? 4 : 3}" style="margin-top:22px">${p.family2.map((f, i) => `<div class="card reveal reveal-d${i % 3}" style="background:var(--surface)"><h3 class="subtitle">${f.t}</h3><p class="muted small">${f.d}</p></div>`).join('')}</div>` : ''}
      </div>
    </section>` : '';
  const modules = p.modules ? `
    <section class="section section--alt">
      <div class="container">
        <div class="section-head reveal"><p class="eyebrow">Ana modüller</p><h2 class="headline">Tek platform. Dört temel yetenek.</h2></div>
        <div class="grid grid-2">
          ${p.modules.map((m, i) => `<div class="card reveal reveal-d${i % 2}" style="background:var(--surface)"><div class="card-icon">${icons[m.icon]}</div><h3 class="title">${m.t}</h3><p class="muted">${m.d}</p></div>`).join('')}
        </div>
        <div class="grid grid-4" style="margin-top:22px">
          ${p.family2.map((f, i) => `<div class="card reveal reveal-d${i}" style="background:var(--surface)"><h3 class="subtitle">${f.t}</h3><p class="muted small">${f.d}</p></div>`).join('')}
        </div>
      </div>
    </section>` : '';
  const uses = p.uses ? `
    <section class="section--tight">
      <div class="container reveal"><h2 class="title">Kullanım alanları</h2><ul class="chips" style="margin-top:16px">${p.uses.map((u) => `<li>${u}</li>`).join('')}</ul></div>
    </section>` : '';
  return {
    file: `${p.id}.html`, active: 'urunler', title: `${p.name} · ${p.family}`, three: true, script: 'js/pages/product.js',
    description: `${p.name} — ${p.short}`,
    body: `
    <section class="section--ink" data-nav="ink" style="padding-top:calc(var(--nav-h) + clamp(40px,6vw,80px));padding-bottom:clamp(40px,6vw,72px)">
      <div class="container">
        <div class="crumbs"><a href="urunler.html">Ürünler</a> / ${p.name}</div>
        <div class="split" style="align-items:end;gap:24px 64px;margin-bottom:clamp(28px,4vw,48px)">
          <div><p class="eyebrow">${p.family}</p><h1 class="display">${p.name}</h1></div>
          <div><p class="title" style="color:var(--on-ink)">${p.tagline}</p><p class="muted" style="margin:0">${p.short}</p></div>
        </div>
        <div class="stage stage-tall" data-stage="${p.id}">
          <canvas aria-label="${p.name} etkileşimli 3B modeli"></canvas>
          <div class="stage-loading">3B model yükleniyor…</div>
          <div class="stage-hint">${p.hint}</div>
          ${readout}
          ${p.log ? '<div class="event-log" aria-live="polite"></div>' : ''}
          <div class="controls">${p.controls}</div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container split split--top">
        <p class="statement reveal">${p.statement}</p>
        <div class="reveal reveal-d1">${p.intro.map((t, i) => `<p class="${i ? 'muted' : 'lead'}" style="${i ? '' : 'color:var(--text)'}">${t}</p>`).join('')}</div>
      </div>
      <div class="container"><div class="stats reveal" style="margin-top:clamp(56px,8vw,96px)">${p.stats.map(stat).join('')}</div></div>
    </section>

    <section class="section section--ink2" data-nav="ink">
      <div class="container on-ink" style="background:none">
        <div class="section-head reveal"><p class="eyebrow">Öne çıkan özellikler</p><h2 class="headline">Göreve odaklı, her ayrıntıda.</h2></div>
        <div class="reveal">${list(p.features)}</div>
      </div>
    </section>
    ${modules}
    ${variants}
    ${uses}
    <section class="section">
      <div class="container split split--top">
        <div class="reveal"><p class="eyebrow">Teknik özellikler</p><h2 class="headline">Rakamlarla ${p.name}.</h2><p class="muted">Ayrıntılı teknik doküman ve proje bazlı konfigürasyon için ekibimizle iletişime geçin.</p><a class="btn btn-primary" href="iletisim.html" style="margin-top:12px">Teklif ve bilgi talebi</a></div>
        <table class="spec-table reveal reveal-d1"><tbody>${p.specs.map(([k, v]) => `<tr><th scope="row">${k}</th><td>${v}</td></tr>`).join('')}</tbody></table>
      </div>
    </section>
    <section class="section section--alt">
      <div class="container">
        <div class="section-head reveal"><p class="eyebrow">Birlikte çalışır</p><h2 class="headline">İlgili ürünler</h2></div>
        <div class="grid grid-2">
          ${p.related.map((id, i) => `<a class="card card-link reveal reveal-d${i}" href="${id}.html" style="background:var(--surface)"><p class="eyebrow">${P[id].family}</p><h3 class="title">${P[id].name}</h3><p class="muted">${P[id].short}</p><span class="link-arrow">Keşfedin</span></a>`).join('')}
        </div>
      </div>
    </section>`,
  };
}

/* ================================================================== */
export function quality() {
  return {
    file: 'kalite.html', active: 'kalite', title: 'Kalite ve Politikalar',
    description: 'HTR kalite, çevre ve iş sağlığı ve güvenliği politikaları ile AQAP 2110, AS9100, ISO ve NATO tesis güvenlik belgeleri.',
    body: `
    <section class="page-hero">
      <div class="container">
        <p class="eyebrow">Politikalarımız</p>
        <h1 class="display">Kalite bir taahhüttür.</h1>
        <p class="lead">Ulusal ve uluslararası standartlara, yasal düzenlemelere ve etik ilkelere tam uyum; sürekli iyileştirmeyi kurum kültürümüzün parçası hâline getiriyoruz.</p>
      </div>
    </section>
    <section class="section section--alt">
      <div class="container">
        <div class="section-head reveal"><p class="eyebrow">Kalite belgelerimiz</p><h2 class="headline">Belgelendirilmiş güven.</h2></div>
        <div class="grid grid-3">
          ${certificates.map((c, i) => `
          <div class="card cert reveal reveal-d${i % 3}" style="background:var(--surface)">
            <div class="cert-badge" aria-hidden="true">${icons.badge}</div>
            <b>${c.name}</b>
            <span class="muted small">${c.d}</span>
            <span class="small" style="color:var(--text-3);margin-top:8px">İlk belgeleme: ${c.since}</span>
          </div>`).join('')}
        </div>
      </div>
    </section>
    ${policies.map((p, i) => `
    <section class="section ${i % 2 ? 'section--alt' : ''}">
      <div class="container split split--top">
        <div class="reveal"><p class="eyebrow">Havelsan Teknoloji Radar olarak</p><h2 class="headline">${p.t}</h2><p class="lead">${p.lead}</p></div>
        <div class="reveal reveal-d1"><p class="small muted" style="margin-top:0">Bu doğrultuda taahhüt ederiz:</p>${list(p.items, 'features single')}</div>
      </div>
    </section>`).join('')}
    <section class="section--tight section--alt">
      <div class="container reveal" style="display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap;align-items:center">
        <p class="subtitle" style="margin:0">Kişisel verilerin korunması</p>
        <a class="link-arrow" href="${company.kvkk}" target="_blank" rel="noopener">KVKK Aydınlatma Metni (PDF)</a>
      </div>
    </section>`,
  };
}

/* ================================================================== */
export function careerPage() {
  return {
    file: 'kariyer.html', active: 'kariyer', title: 'Kariyer',
    description: 'HTR’de yaşam, ayrıcalıklar, “İz Bırak” staj programı ve işe alım süreci.',
    body: `
    <section class="section--ink" data-nav="ink" style="padding-top:calc(var(--nav-h) + clamp(56px,9vw,120px));padding-bottom:clamp(56px,8vw,96px)">
      <div class="container split">
        <div>
          <p class="eyebrow">Kariyer</p>
          <h1 class="display">HTR’de her proje, geleceğe bırakılan bir izdir.</h1>
          <p class="lead" style="margin-top:1.25rem">Teknoloji, mühendislik mükemmeliyeti ve güçlü bir ekip ruhuyla savunma sanayinin kalbinde yer alıyoruz.</p>
          <div class="btn-row"><a class="btn btn-primary" href="#basvuru">Açık pozisyonlar</a><a class="link-arrow" href="#staj">Staj programı</a></div>
        </div>
        <div class="media-frame" style="aspect-ratio:4/3"><img src="assets/img/about/yasam.webp" alt="HTR’de yaşam"></div>
      </div>
    </section>
    <section class="section" id="yasam">
      <div class="container split split--top">
        <p class="statement reveal">Çalışanlarımız yalnızca sistem ve ürün geliştirmiyor; <strong>ülkenin güvenliğine, bağımsızlığına ve teknolojik gücüne doğrudan katkı sunuyor.</strong></p>
        <div class="reveal reveal-d1">
          <p class="lead" style="color:var(--text)">HTR’nin etik değerlerine bağlı, yüksek motivasyon ve performans sahibi, alanında yetkin bir ekip oluşturmak temel önceliğimiz. Bu ekibi sürekli eğitim stratejileriyle geliştirerek kariyer fırsatları sunuyoruz.</p>
          <p class="muted">Sosyal etkinlikler, spor turnuvaları, bahar kahvaltıları, piknikler ve geleneksel iftar organizasyonlarıyla çalışan bağlılığını güçlendiriyor; sosyal sorumluluk projeleriyle topluma değer katıyoruz.</p>
        </div>
      </div>
    </section>
    <section class="section section--alt">
      <div class="container">
        <div class="section-head reveal"><p class="eyebrow">Ayrıcalıklarımız</p><h2 class="headline">Sizi önemseyen bir çalışma ortamı.</h2></div>
        <div class="grid grid-4">${career.perks.map((p, i) => `<div class="card reveal reveal-d${i % 4}" style="background:var(--surface)"><div class="card-icon">${icons.heart}</div><p class="subtitle" style="font-size:1.0625rem;margin:0">${p}</p></div>`).join('')}</div>
      </div>
    </section>
    <section class="section" id="staj">
      <div class="container">
        <div class="split split--top">
          <div class="reveal"><p class="eyebrow">HTR’de staj · “İz Bırak”</p><h2 class="headline">Gerçek projelerde, gerçek deneyim.</h2>
          <p class="lead">“İz Bırak” staj programı, savunma sanayinin geleceğini şekillendirecek genç yeteneklere gerçek proje deneyimi kazandırmak üzere tasarlandı.</p></div>
          <div class="reveal reveal-d1"><h3 class="subtitle">Sunduğumuz deneyimler</h3>${list(career.experiences, 'features single')}</div>
        </div>
        <div class="grid grid-3" style="margin-top:clamp(40px,6vw,72px)">
          ${career.internships.map((s, i) => `<div class="card reveal reveal-d${i}"><h3 class="title">${s.t}</h3><p class="muted">${s.who}${s.note ? `<br><span class="small">${s.note}</span>` : ''}</p><p class="small" style="color:var(--text-3);margin-bottom:2px">Gerekli ortalama</p><div class="stat-value" style="font-size:2.25rem">${s.gpa}</div></div>`).join('')}
        </div>
        <p class="muted reveal" style="margin-top:28px">Staj başvuruları her yıl belirlenen tarihler arasında Savunma Sanayii Başkanlığı’nın Savunma Kariyer Platformu aracılığıyla yapılabilmektedir.</p>
      </div>
    </section>
    <section class="section section--alt" id="basvuru">
      <div class="container">
        <div class="section-head reveal"><p class="eyebrow">Kariyer başvuruları</p><h2 class="headline">İşe alım süreci</h2>
        <p class="lead">Adaylarımızı teknik yetkinlikleri kadar, kurumsal değerlere ve takım kültürüne uyum açısından da değerlendiriyoruz.</p></div>
        <div class="grid grid-4 steps">${career.steps.map((s, i) => `<div class="card reveal reveal-d${i}" style="background:var(--surface)"><h3 class="subtitle">${s.t}</h3><p class="muted small">${s.d}</p></div>`).join('')}</div>
        <div class="card reveal" style="background:var(--surface);margin-top:22px;display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap;align-items:center">
          <div><h3 class="subtitle">Açık pozisyonlar</h3><p class="muted small" style="margin:0">Tüm ilanlarımız aşağıdaki platformlar üzerinden duyurulmaktadır.</p></div>
          <div class="btn-row">${career.platforms.map((p) => `<a class="btn btn-secondary" href="${p.href}" target="_blank" rel="noopener">${p.name}</a>`).join('')}</div>
        </div>
      </div>
    </section>`,
  };
}

/* ================================================================== */
export function newsPage() {
  const [first, ...rest] = news;
  return {
    file: 'haberler.html', active: 'haberler', title: 'Haberler',
    description: 'HTR’den haberler, fuarlar ve duyurular.',
    body: `
    <section class="page-hero">
      <div class="container"><p class="eyebrow">Haberler ve duyurular</p><h1 class="display">Haberler</h1></div>
    </section>
    <section class="section--tight" style="padding-top:0">
      <div class="container">
        <a class="card card-link reveal" href="haber-${first.slug}.html" style="display:grid;grid-template-columns:1.3fr 1fr;gap:0;padding:0">
          <div style="aspect-ratio:16/10;overflow:hidden"><img src="${first.img}" alt="" style="width:100%;height:100%;object-fit:cover"></div>
          <div style="padding:clamp(24px,4vw,48px);display:flex;flex-direction:column;justify-content:center">
            <div class="news-date"><time datetime="${first.date}">${fmtDate(first.date)}</time> · ${first.tag}</div>
            <h2 class="headline" style="font-size:clamp(1.75rem,3.2vw,2.5rem)">${first.title}</h2>
            <p class="muted">${first.body[0]}</p>
            <span class="link-arrow">Devamını okuyun</span>
          </div>
        </a>
        <div class="grid grid-2" style="margin-top:22px">${rest.map(newsCard).join('')}</div>
      </div>
    </section>
    <style>@media (max-width:760px){ .section--tight .card-link[style*="1.3fr"]{grid-template-columns:1fr !important} }</style>`,
  };
}

export function newsDetail(n) {
  const i = news.indexOf(n);
  const next = news[(i + 1) % news.length];
  return {
    file: `haber-${n.slug}.html`, active: 'haberler', title: n.title,
    description: n.body[0].slice(0, 155),
    body: `
    <article>
      <header class="page-hero" style="padding-bottom:40px">
        <div class="container container--narrow">
          <div class="crumbs"><a href="haberler.html">Haberler</a> / ${n.tag}</div>
          <div class="news-date"><time datetime="${n.date}">${fmtDate(n.date)}</time></div>
          <h1 class="headline" style="font-size:clamp(2.25rem,5vw,3.75rem)">${n.title}</h1>
        </div>
      </header>
      <div class="container container--narrow">
        <figure class="article-cover" style="margin-inline:0"><img src="${n.img}" alt="" width="1200" height="750"></figure>
        <div class="article">${n.body.map((t) => `<p>${t}</p>`).join('')}</div>
      </div>
    </article>
    <section class="section--tight">
      <div class="container container--narrow">
        <a class="card card-link" href="haber-${next.slug}.html"><p class="small muted" style="margin:0 0 6px">Sonraki haber</p><h2 class="subtitle" style="margin:0">${next.title}</h2></a>
        <p style="margin-top:24px"><a class="link-arrow" href="haberler.html">Tüm haberler</a></p>
      </div>
    </section>`,
  };
}

/* ================================================================== */
export function contact() {
  return {
    file: 'iletisim.html', active: 'iletisim', title: 'İletişim',
    description: 'HTR iletişim bilgileri: Çınar Mah. Çankırı Blv. No: 98 Akyurt / Ankara · +90 312 847 51 30 · htr@htr.com.tr',
    body: `
    <section class="page-hero">
      <div class="container"><p class="eyebrow">Bize ulaşın</p><h1 class="display">Konuşalım.</h1>
      <p class="lead">Ürünlerimiz, projeleriniz ve iş birliği fırsatları için ekibimiz bir mesaj uzaklıkta.</p></div>
    </section>
    <section class="section--tight" style="padding-top:0">
      <div class="container grid grid-2">
        <div class="card reveal">
          <h2 class="title">Genel Müdürlük ve Tesis</h2>
          <ul class="contact-list">
            <li><span>Adres</span><span>${company.address}</span></li>
            <li><span>Telefon</span><a href="tel:${company.phoneHref}">${company.phone}</a></li>
            <li><span>Faks</span><span>${company.fax}</span></li>
            <li><span>E-posta</span><a href="mailto:${company.email}">${company.email}</a></li>
          </ul>
          <div class="btn-row" style="margin-top:20px"><a class="btn btn-primary" href="${company.maps}" target="_blank" rel="noopener">Yol tarifi al</a><a class="link-arrow" href="mailto:${company.email}">E-posta gönderin</a></div>
        </div>
        <div class="grid">
          <div class="card card--ink reveal reveal-d1">
            <p class="eyebrow">Kurumsal iletişim</p>
            <h2 class="title">Basın ve medya</h2>
            <p class="muted">Basın ve medya talepleriniz ile kurumsal iletişim konuları için:</p>
            <a class="link-arrow" href="mailto:${company.press}">${company.press}</a>
          </div>
          <div class="card reveal reveal-d2">
            <h2 class="subtitle">Sosyal medya</h2>
            <div class="btn-row" style="gap:10px;margin-top:10px">${company.socials.map((s) => `<a class="btn btn-ghost" href="${s.href}" target="_blank" rel="noopener" style="min-height:38px;font-size:.9375rem">${s.name}</a>`).join('')}</div>
          </div>
          <div class="card reveal reveal-d3">
            <h2 class="subtitle">Kariyer</h2>
            <p class="muted small">Açık pozisyonlar ve staj programı için kariyer sayfamızı ziyaret edin.</p>
            <a class="link-arrow" href="kariyer.html">Kariyer</a>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container reveal">
        <div class="media-frame" style="aspect-ratio:21/9"><img src="assets/img/about/2021.webp" alt="HTR Akyurt tesisi" loading="lazy"></div>
        <p class="small muted" style="margin-top:12px">Akyurt yerleşkesi · 35.500 m² · Ankara</p>
      </div>
    </section>`,
  };
}

export function notFound() {
  return {
    file: '404.html', active: '', title: 'Sayfa bulunamadı', description: 'Aradığınız sayfa bulunamadı.',
    body: `
    <section class="page-hero" style="min-height:70vh">
      <div class="container"><p class="eyebrow">404</p><h1 class="display">Bu sayfa radarımızda yok.</h1>
      <p class="lead">Aradığınız sayfa taşınmış veya kaldırılmış olabilir.</p>
      <div class="btn-row"><a class="btn btn-primary" href="index.html">Ana sayfaya dön</a><a class="link-arrow" href="urunler.html">Ürünler</a></div></div>
    </section>`,
  };
}
