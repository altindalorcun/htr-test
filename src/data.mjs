// Single source of truth for site content (sourced from htr.com.tr/tr).

export const company = {
  name: 'Havelsan Teknoloji Radar',
  legal: 'Havelsan Teknoloji Radar San. ve Tic. A.Ş.',
  short: 'HTR',
  address: 'Çınar Mah. Çankırı Blv. No: 98, Akyurt / Ankara',
  phone: '+90 312 847 51 30',
  phoneHref: '+903128475130',
  fax: '+90 312 847 51 38',
  email: 'htr@htr.com.tr',
  press: 'kurumsaliletisim@htr.com.tr',
  kvkk: 'https://htr.com.tr/uploads/docs/1780313141_htr-kvkk-aydinlatma-metni.pdf',
  maps: 'https://www.google.com/maps/search/?api=1&query=Havelsan+Teknoloji+Radar+Akyurt+Ankara',
  socials: [
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/havelsanteknolojiradar', icon: 'linkedin' },
    { name: 'Instagram', href: 'https://www.instagram.com/havelsanteknolojiradar/', icon: 'instagram' },
    { name: 'X', href: 'https://twitter.com/htrresmi', icon: 'x' },
    { name: 'YouTube', href: 'https://www.youtube.com/@HavelsanTeknolojiRadar', icon: 'youtube' },
    { name: 'NSosyal', href: 'https://nsosyal.com/havelsanteknolojiradar', icon: 'nsosyal' },
  ],
};

export const milestones = [
  { year: '1990', date: '9 Kasım 1990', title: 'Teknoloji yolculuğunun başlangıcı', text: 'Uzun menzilli mobil hava arama radarlarının teknoloji transferi kapsamında Türkiye’de üretilmesi amacıyla, Türk-Fransız ortaklığıyla Thomson Tekfen Radar San. ve Tic. A.Ş. kuruldu.' },
  { year: '2001', title: 'Hisselerin HAVELSAN’a devri', text: 'Thales hisselerinin HAVELSAN A.Ş.’ye devredilmesiyle şirket yerli bir yapıya kavuşarak Havelsan Teknoloji Radar (HTR) unvanını aldı.' },
  { year: '2003', title: 'Ağ Destekli Güvenlik Sistemleri', text: 'Kritik tesislerin güvenlik ihtiyaçlarını karşılamak amacıyla Ağ Destekli Güvenlik Sistemleri Direktörlüğü hayata geçirildi.' },
  { year: '2007', title: 'Üretim Direktörlüğü genişlemesi', text: 'Kablaj ve elektromekanik montaj üretim hatları devreye alınarak seri üretim kabiliyeti ve yerli üretim altyapısı güçlendirildi.' },
  { year: '2017', title: 'Ar-Ge Merkezi statüsü', text: 'Bakanlık onayıyla Ar-Ge Merkezi unvanı alınarak yenilikçi mühendislik yaklaşımı kurumsal bir kimliğe kavuştu.' },
  { year: '2017', title: 'Yeni üretim alanı · 6.000 m²', text: 'Artan üretim kapasitesi doğrultusunda Haziran ayında 6.000 m² kapalı alana geçildi.' },
  { year: '2018', title: 'Kart Dizgi Üretim Atölyesi', text: 'Elektronik kart üretimi ve dizgi süreçlerini desteklemek amacıyla Kart Dizgi Üretim Atölyesi kuruldu.' },
  { year: '2021', title: 'Yeni tesis · 15.500 m² kapalı alan', text: 'Tamamlanan yeni bina yatırımıyla 15.500 m² kapalı alana geçilerek üretim ve mühendislik kapasitesi önemli ölçüde genişletildi.' },
];

export const leadership = {
  board: [
    { name: 'Fatih Mehmet Bayar', role: 'Yönetim Kurulu Başkanı' },
    { name: 'Savaş Yanık', role: 'Yönetim Kurulu Başkan Vekili' },
    { name: 'Yusuf Bora Kartal', role: 'Yönetim Kurulu Üyesi' },
  ],
  executive: [{ name: 'Mustafa Özçelik', role: 'Genel Müdür' }],
  partners: ['HAVELSAN', 'Kartal Vakfı', 'Türk Hava Kurumu'],
};

export const vision = 'Savunma ve teknoloji faaliyet alanlarında, milli ve özgün çözümler üreterek, dışa bağımlılığı en aza indiren, ülkemizin savunma projelerinde çözüm ortağı olarak yer alan, Türkiye’nin en büyük 10 savunma şirketinden biri olmak.';
export const mission = 'Türkiye’nin savunma ve güvenlik ihtiyaçlarının azami yerli katkı ile karşılanması için ulusal ve uluslararası işbirlikleri içinde en yüksek oranda katma değer üreten rekabetçi çözüm ortağı olmak.';

export const areas = [
  {
    id: 'elektronik', name: 'Elektronik Sistemler', img: 'assets/img/areas/elektronik.webp', icon: 'chip',
    summary: 'TSK envanterindeki radar sistemleri başta olmak üzere elektronik ve mekanik sistemlerde tasarımdan modernizasyona uçtan uca mühendislik.',
    intro: [
      'Havelsan Teknoloji Radar (HTR), kuruluşundan bu yana Türk Silahlı Kuvvetleri envanterindeki radar sistemleri başta olmak üzere çeşitli elektronik ve mekanik sistemlerde öncü mühendislik çözümleri sunmaktadır.',
      'Tasarım ve prototip geliştirmeden seri üretime, kurulum ve entegrasyondan modernizasyon ve modifikasyona kadar uçtan uca yetkinlik sağlar. Farklı radar ve elektronik sistemlere ait kartların sahada ve tesiste bakım/onarımı ile teknik eğitim hizmetlerini de uzman kadrosuyla yürütür.',
    ],
    capabilities: ['Sayısal, RF, güç elektroniği ve donanım tasarım çözümleri', 'Mekanik tasarımlar', 'Şelter, araç vb. platform tasarımları', 'Modernizasyon ve modifikasyon hizmetleri', 'Anahtar teslim altyapı ve mühendislik çözümleri', 'Radar sistemleri ve alt sistemlerin kurulum hizmetleri', 'Elektronik ve mekanik entegrasyon çözümleri', 'Test, devreye alma ve kabul faaliyetleri', 'Entegre Lojistik Destek (ELD) hizmetleri'],
    strengths: ['35 yılı aşkın deneyim ile radar, elektronik ve mekanik sistemlerde derin uzmanlık', 'Yerli ve milli mühendislik kabiliyeti ile bağımsız teknoloji geliştirme gücü', 'Saha ve tesis seviyesinde bakım, onarım ve modernizasyon yetkinliği', 'TSK ve kritik kurumlar için güvenilir teknoloji sağlayıcısı', 'Proje ömrü boyunca sürdürülebilir destek sunan güçlü ELD altyapısı'],
  },
  {
    id: 'guvenlik', name: 'Ağ Destekli Güvenlik Sistemleri', img: 'assets/img/areas/guvenlik.webp', icon: 'shield',
    summary: '2003’ten bu yana kritik tesisler için anahtar teslim, yerli ve milli entegre güvenlik çözümleri.',
    intro: [
      'HTR bünyesinde faaliyet gösteren Ağ Destekli Güvenlik Sistemleri Direktörlüğü, 2003 yılından bu yana Türk Silahlı Kuvvetleri başta olmak üzere kamu ve özel sektör kurumlarının kritik tesislerinin korunmasına yönelik anahtar teslim entegre güvenlik çözümleri geliştirmektedir.',
      'Yerli ve milli teknolojilerle oluşturulmuş ürün portföyü, deneyimli mühendislik kadrosu ve Türkiye geneline yayılan bakım-destek ağı ile güvenlik ihtiyaçlarını uçtan uca ve sürdürülebilir şekilde karşılar.',
    ],
    solutions: [
      { t: 'Kışla ve Karargâh Güvenliği', d: 'Askeri tesislerin çevre ve iç güvenliğine yönelik entegre çözümler.' },
      { t: 'Kritik Tesis Güvenliği', d: 'Enerji, ulaşım, iletişim ve savunma altyapılarının özgün ihtiyaçlarına uyarlanmış güvenlik sistemleri.' },
      { t: 'Geçiş Kontrol Sistemleri', d: 'Akıllı kart, biyometrik ve çok faktörlü doğrulama destekli, esnek mimarili çözümler.' },
      { t: 'Bina Yönetim Sistemleri', d: 'Güvenlik altyapısının tüm bina otomasyon sistemleriyle entegre edilmesi.' },
      { t: 'Yerli ve Milli Güvenlik Yönetim Platformu', d: 'Farklı güvenlik bileşenlerinin tek merkezden yönetilmesini sağlayan bütünleşik yazılım altyapısı.' },
      { t: 'Entegre Lojistik Destek (ELD)', d: 'Yalnızca sistem kurulumu değil; proje ömrü boyunca kesintisiz destek.' },
    ],
    base: {
      t: 'Üs Bölgesi Yakın Emniyet Sistemi',
      d: [
        'Askerî üs bölgeleri ve kritik alanların çevresinde, doğrudan görüş hattı dışında kalan ölü bölgelerde oluşabilecek hareketliliğin tespiti için geliştirilen; radar, elektro-optik (EO), termal ve akustik sensörleri entegre eden modüler ve taşınabilir güvenlik çözümü.',
        'Çok katmanlı algılama mimarisi erken uyarı ve yüksek durumsal farkındalık sağlar; filtreleme kabiliyetine sahip radar altyapısı yanlış alarm oranlarını minimize eder. Görsel ve akustik doğrulama ile tehdit niteliği sahada hızla analiz edilir.',
        'Taşınabilir güç altyapısı, kablolu/kablosuz veri aktarımı ve ölçeklenebilir mimarisi sayesinde sahada hızlı kurulum ve esnek konfigürasyon imkânı sunar.',
      ],
    },
    supported: ['Kapalı Devre Televizyon (CCTV)', 'Geçiş Kontrol Sistemleri', 'Araç Altı Görüntüleme ve Plaka Tanıma', 'Bekçi Tur Kontrol Sistemleri', 'Blok Yol Bariyerleri', 'Çevre Güvenlik ve Sızma Tespit', 'Evrak/Paket Kontrol Cihazları'],
  },
  {
    id: 'uretim', name: 'Üretim', img: 'assets/img/areas/uretim.webp', icon: 'factory',
    summary: 'Kablaj, elektronik kart, elektromekanik montaj ve sistem seviyesinde tasarım, üretim ve test.',
    intro: [
      'HTR, savunma sanayinin kablaj, elektronik kart, elektromekanik montaj ve sistem seviyesindeki ihtiyaçlarına yönelik tasarım, üretim ve test hizmetleri sunmaktadır.',
      'Hava, kara ve deniz platformlarına uygun askeri tip kablo takımlarından radar alt sistemlerine kadar geniş bir yelpazede çözümler sağlar. Modern üretim hatları, ileri teknoloji test altyapısı ve deneyimli mühendis kadrosu ile tasarımları seri üretime dönüştürür; kalite kontrol, çevresel dayanım ve entegrasyon süreçlerini uluslararası standartlarda yürütür.',
    ],
    capabilities: ['IPC standartlarına uygun üretim', 'Üretim jig, tool tasarımları ve üretimleri', 'Birim içi ve birim dışı standart kablo/harness üretimi', 'Elektronik kart ve kablaj takımları tasarımı ve üretimi', 'Elektromekanik montaj ve entegrasyon', 'Elektronik kart dizgi ve otomatik montaj hatları', 'Arıza arama, bakım ve onarım hizmetleri', 'Fonksiyonel ve çevresel dayanım testleri (MIL-STD 810 vb.)', 'Ambar ve lojistik hizmetler', 'CAD tabanlı 3 boyutlu harness tasarımı'],
    production: ['Krem Lehim Baskı', 'Krem Lehim Denetleme (SPI)', 'Otomatik Dizgi', 'Reflow Fırınları', 'Buhar Fazlı Fırın', 'Otomatik Optik Denetleme (AOI)', 'X-Ray (AXI)', 'Bölgesel Lehimleme', 'Panelden Ayırma', 'Tam Otomatik Yıkama', 'Otomatik Kablo Kesme ve Sıyırma'],
    test: ['Gezer Prob (Flying Probe)', 'Titreşim ve Şok', 'İklimlendirme Kabinleri (ESS)', 'Network Analizör', 'Spektrum Analizör', 'Sinyal Üreteç', 'Güç Kaynakları', 'Güç Sensörleri', 'Güç Metreler', 'Veri Toplama', 'Kolimatör'],
  },
];

export const products = [
  {
    id: 'sezgi', name: 'SEZGİ', family: 'Radar Ürün Ailesi', img: 'assets/img/products/sezgi.webp',
    tagline: 'Görmeden önce sezer.',
    short: 'İnsan ve araç hedeflerini 1000 metreye kadar tespit ve takip eden yeni nesil hareket tespit radarı.',
    intro: [
      'SEZGİ, kritik tesislerin, sınır hatlarının ve stratejik bölgelerin güvenliği için insan ve araç hedeflerinin tespit ve takibini yapabilen yeni nesil hareket tespit sensörüdür.',
      'Zorlu çevre koşullarında bile insan ve araç hareketlerini yüksek doğrulukla algılayarak sahadaki güvenlik sistemlerine anlık durumsal farkındalık kazandırır. Akıllı sinyal işleme teknikleri, elektronik tarama kabiliyeti ve çoklu hedef izleme fonksiyonlarıyla çevresel güvenlik çözümlerinin merkezinde yer alır.',
    ],
    statement: 'Yağmurda, siste, rüzgârda. <strong>Yerli ve milli altyapısıyla geniş bir alanda 7/24 kesintisiz güvenlik.</strong>',
    stats: [
      { v: '1000', unit: 'm', label: 'İnsan ve araç tespit menzili' },
      { v: '7/24', label: 'Kesintisiz gözetleme' },
      { v: 'Çoklu', label: 'Eşzamanlı hedef takibi' },
      { v: 'E-Tarama', label: 'Elektronik tarama ile geniş kapsama' },
    ],
    features: ['1000 metreye kadar insan ve araç tespiti', 'Yağmur, sis ve rüzgârda yüksek başarıyla hedef takibi', 'Çoklu hedef tespiti ve eşzamanlı izleme', 'Akıllı sinyal işleme ile düşük hata oranı', 'Elektronik tarama ile geniş alan kapsaması', 'Üçüncü parti yazılım ve donanımlarla entegrasyon', 'Hızlı kurulum ve kolay bakım', 'Mobil / portatif kullanım seçenekleri'],
    hint: 'Elektronik taramayı izleyin · sürükleyerek döndürün',
    controls: `
      <div class="seg" role="group" aria-label="Radar modu">
        <button type="button" data-fan="on" aria-pressed="true">Tarama</button>
        <button type="button" data-fan="off" aria-pressed="false">Bekleme</button>
      </div>`,
    readout: [['MOD', 'mode', 'TARAMA'], ['TAKİP', 'trk', '04'], ['TESPİT', 'det', '0000'], ['MENZİL', null, '1000 m']],
    variants: [{ img: 'assets/img/products/sezgi.webp', name: 'SEZGİ Hareket Tespit Radarı', points: ['HTR mühendisleri tarafından geliştirildi', 'Ağ destekli güvenlik mimarisiyle entegre', 'Farklı platformlara entegre edilebilir'] }],
    specs: [['Hedef tipi', 'İnsan ve araç'], ['Menzil', '1000 m’ye kadar'], ['Tarama', 'Elektronik tarama'], ['İzleme', 'Çoklu hedef, eşzamanlı'], ['Çevre koşulları', 'Yağmur, sis, rüzgâr'], ['Entegrasyon', 'ERİSİS ve üçüncü parti yazılım/donanım'], ['Kullanım', 'Sabit, mobil / portatif']],
    related: ['erisis', 'gorsen'],
  },
  {
    id: 'gorsen', name: 'GÖRSEN', family: 'Görüntüleme Sistemleri Ürün Ailesi', img: 'assets/img/products/swir350.webp',
    tagline: 'Karanlığın ötesini görür.',
    short: 'VNIR ve SWIR bantlarında, lazer aydınlatma destekli milli görüntüleme teknolojisi.',
    intro: [
      'GÖRSEN Görüntüleme Sistemleri Ürün Ailesi; sınır güvenliği, kritik tesislerin korunması ve stratejik alanların sürekli gözetlenmesi gibi yüksek hassasiyet gerektiren görevler için geliştirilmiş ileri teknoloji bir sensör çözümüdür.',
      'VNIR ve SWIR bantlarında görüntüleme yeteneklerine sahip sensörler; izleme üniteleri, lazer aydınlatma birimleri ve diğer alt sistemlerle entegre edilerek gece-gündüz, düşük görüş ve zorlu hava şartlarında etkin performans sunar.',
    ],
    statement: 'İnsan gözünün algılayamadığı dalga boyunda. <strong>Gece, sis ve düşük ışıkta yüksek hassasiyetli tespit ve teşhis.</strong>',
    stats: [
      { v: '14', unit: '×', label: 'Motorize optik zoom (SWIR-350)' },
      { v: '350', unit: 'mm', label: 'Maksimum odak uzaklığı' },
      { v: '1550', unit: 'nm', label: 'Lazer aydınlatma dalga boyu' },
      { v: '4K', label: 'VNIR çözünürlüğü, HDR destekli' },
    ],
    features: ['VNIR ve SWIR bantlarında görüntüleme', 'Lazer aydınlatma ile desteklenebilir yapı', 'Zorlu çevresel koşullarda kesintisiz gözetleme', 'Modüler ve ölçeklenebilir ürün ailesi', 'Entegre güvenlik sistemleriyle birlikte çalışabilir mimari', 'Gündüz ve gece kesintisiz operasyon', 'ONVIF (Profile S), Unicast & Multicast', 'PELCO-D uyumlu PTZ entegrasyonu'],
    hint: 'Zoom’u kaydırın, lazeri açın',
    controls: `
      <div class="ctrl-range"><label for="zoom">Zoom</label><input id="zoom" type="range" min="1" max="14" step="0.1" value="1" data-zoom><output data-out="zoom">1.0×</output></div>
      <span class="ctrl-sep" aria-hidden="true"></span>
      <button type="button" class="ctrl-btn" data-laser aria-pressed="false">Lazer</button>
      <div class="seg" role="group" aria-label="Spektral bant">
        <button type="button" data-band="SWIR" aria-pressed="true">SWIR</button>
        <button type="button" data-band="VNIR" aria-pressed="false">VNIR</button>
      </div>
      <button type="button" class="ctrl-btn" data-scan aria-pressed="true">Tarama</button>`,
    readout: [['BANT', 'band', 'SWIR'], ['ÇÖZÜNÜRLÜK', 'res', '640×512'], ['ODAK', 'focal', '25 mm'], ['LAZER', 'laser', 'KAPALI']],
    variants: [
      { img: 'assets/img/products/swir350.webp', name: 'SWIR-350 Sistemi', points: ['350 mm maksimum odak uzaklığı', 'Motorize optik (14×)', '4W lazer aydınlatma desteği', 'Geniş alan ve uzun menzil'] },
      { img: 'assets/img/products/swir-sistem.webp', name: 'SWIR-180 Sistemi', points: ['180 mm odak uzaklığı', 'Motorize optik (12×)', '2W lazer aydınlatma desteği', 'Düşük görüşte etkin performans'] },
      { img: 'assets/img/products/dn-kamera.webp', name: 'D/N Kamera Sistemi', points: ['Motorize optik (45×)', '1000 m lazer aydınlatma', 'Modüler gündüz-gece görüş', 'Enerji hattı üzerinden haberleşme'] },
    ],
    family2: [
      { t: 'Lazer Aydınlatma', d: '2W (500 m) ve 4W (800 m) birimler; 1550 nm, –20°C / +50°C. SWIR kameralarla entegre çalışan SWIR lazer aydınlatıcı.' },
      { t: 'İzleme Üniteleri', d: 'Tak-çalıştır Kompakt ve Güçlü İzleme Üniteleri; otomatik odaklama, pozlama, kazanç kontrolü ve entegre görüntü işleme.' },
      { t: 'Objektif Ailesi', d: 'SWIR uyumlu, C-mount, 350 mm (14×) ve 180 mm (12×) motorize zoom lensler; uzaktan zoom/fokus/iris kontrolü.' },
    ],
    specs: [['SWIR çözünürlük', '640 × 512 piksel'], ['SWIR lens', '25–350 mm (14× optik zoom)'], ['VNIR çözünürlük', '4096 × 2160 (4K), HDR'], ['Lazer aydınlatma', '2W / 4W · 1550 nm · 500–800 m'], ['Çalışma sıcaklığı', '–20°C / +50°C (lazer birimleri)'], ['Protokoller', 'ONVIF Profile S, Unicast & Multicast, PELCO-D'], ['Entegrasyon', 'ERİSİS, radar, bariyer ve sensör sistemleri']],
    related: ['ptp', 'erisis'],
  },
  {
    id: 'ptp', name: 'PTP', family: 'Hassas Yönlendirme ve Stabilizasyon Sistemleri', img: 'assets/img/products/ptp025.webp',
    tagline: 'Her derecede hassas.',
    short: 'Radar, kamera, anten ve lazer sistemleri için 0,02° hassasiyetli pan-tilt platformları.',
    intro: [
      'PTP Hassas Yönlendirme Sistemleri Ürün Ailesi; radar, anten, kamera, sensör ve lazer aydınlatıcı sistemler için yan ve yükseliş eksenlerinde hassas yönlendirme sağlayan elektromekanik kontrol sistemidir.',
      'Askeri standartlara uygun tasarlanmış ve zorlu çevre koşullarına dayanıklıdır. Yüksek güç-ağırlık oranı ve kompakt boyutlarıyla sabit ve mobil çözümler için uygundur; yüksek pozisyon doğruluğu, tekrarlanabilirlik ve IP66 koruma sınıfı ile sahada üstün performans sağlar.',
    ],
    statement: '360° sürekli dönüş, 0,02° pozisyon hassasiyeti. <strong>5 kg’dan 50 kg’a kadar her görev yükü için.</strong>',
    stats: [
      { v: '0,02', unit: '°', label: 'Pozisyon hassasiyeti' },
      { v: '360', unit: '°', label: 'Yan eksende sürekli dönüş' },
      { v: '50', unit: 'kg', label: 'Azami yük kapasitesi' },
      { v: 'IP66', label: 'Koruma sınıfı' },
    ],
    features: ['5 / 10 / 25 / 50 kg taşıma kapasitesi seçenekleri', 'Hafif, sağlam ve kompakt tasarım', 'Yan eksende 360° sürekli dönüş', 'Yükseliş ekseninde ±45°, −90°/+45° ve ±90° hareket aralığı', '0,02° pozisyon hassasiyeti', '−30°C / +55°C çalışma, −40°C / +65°C depolama', 'IP66 koruma sınıfı', 'PELCO-D protokolü, GÖRSEN ile tam uyum'],
    hint: 'Model seçin, pan ve tilt’i kendiniz yönlendirin',
    controls: `
      <div class="seg" role="group" aria-label="Model">
        <button type="button" data-variant="PTP-005" aria-pressed="false">005</button>
        <button type="button" data-variant="PTP-010" aria-pressed="false">010</button>
        <button type="button" data-variant="PTP-025" aria-pressed="true">025</button>
        <button type="button" data-variant="PTP-035" aria-pressed="false">035</button>
        <button type="button" data-variant="PTP-050" aria-pressed="false">050</button>
      </div>
      <span class="ctrl-sep" aria-hidden="true"></span>
      <div class="ctrl-range"><label for="pan">Pan</label><input id="pan" type="range" min="0" max="360" step="0.5" value="0" data-pan></div>
      <div class="ctrl-range"><label for="tilt">Tilt</label><input id="tilt" type="range" min="-90" max="45" step="0.5" value="0" data-tilt></div>
      <button type="button" class="ctrl-btn" data-demo aria-pressed="true">Demo</button>`,
    readout: [['MODEL', 'variant', 'PTP-025'], ['YÜK', 'kg', '25 kg'], ['PAN', 'pan', '000.00°'], ['TILT', 'tilt', '+00.00°'], ['HASSASİYET', null, '0,02°']],
    variants: [
      { img: 'assets/img/products/ptp025.webp', name: 'PTP-025 / 025M / 025 ABS', points: ['25 kg yük kapasitesi', 'Zorlu çevresel koşullara uygun', 'Operasyonel sürekliliği destekleyen dayanıklı yapı'] },
      { img: 'assets/img/products/ptp050.webp', name: 'PTP-050', points: ['50 kg’a kadar ağır yük sınıfı', 'Yüksek tork', 'Üstün stabilizasyon kabiliyeti'] },
      { img: 'assets/img/products/klavye.webp', name: 'HTR Klavye Kontrol Ünitesi', points: ['3 yönlü (Pan / Tilt / Zoom) joystick', 'Darbe korumalı, ergonomik tasarım', 'ONVIF tabanlı çoklu protokol, 2× USB'] },
    ],
    family2: [
      { t: 'PTP-005', d: '5 kg yük kapasitesi; hafif sistem entegrasyonları ve kompakt platformlar için.' },
      { t: 'PTP-010 INC / ABS', d: '10 kg; elektro-optik ve sensör tabanlı sistemler için dengeli ve stabil performans.' },
      { t: 'PTP-035', d: '50 kg sınıfı yükler için yüksek dayanıklılık ve stabil çalışma.' },
    ],
    specs: [['Yük kapasitesi', '5 / 10 / 25 / 50 kg'], ['Yan eksen (pan)', '360° sürekli dönüş'], ['Yükseliş (tilt)', '90° (±45°), 135° (−90°/+45°), 180° (±90°)'], ['Pozisyon hassasiyeti', '0,02°'], ['Çalışma sıcaklığı', '−30°C / +55°C'], ['Depolama sıcaklığı', '−40°C / +65°C'], ['Koruma sınıfı', 'IP66'], ['Kontrol', 'PELCO-D, HTR Klavye Kontrol Ünitesi']],
    related: ['gorsen', 'sezgi'],
  },
  {
    id: 'tani', name: 'TANI', family: 'Akıllı Kart Okuyucu ve Geçiş Kontrol Sistemi', img: 'assets/img/products/tani-parmak.webp',
    tagline: 'Kimin geçtiğini bilir.',
    short: 'Personel, ziyaretçi ve araç geçişleri için yerli ve milli akıllı kart ve biyometrik geçiş kontrolü.',
    intro: [
      'TANI; askeri tesisler, kamu kurumları ve endüstriyel sahalarda personel, ziyaretçi ve araç geçişlerini güvenli biçimde yönetmek üzere geliştirilmiş yerli ve milli bir geçiş kontrol çözümüdür.',
      'TCP/IP tabanlı mimarisi, TÜBİTAK AKİS ve MIFARE uyumluluğu ve ERP entegrasyon kabiliyeti ile kurumsal ölçekte yüksek performanslı, ölçeklenebilir bir çözüm sunar. HTR’nin milli Geçiş Kontrol Yazılımı (GKS) ile entegre çalışır; yetkilendirme, personel ve ziyaretçi yönetimi, kapı erişim kontrolü ve raporlamayı tek platformda toplar.',
    ],
    statement: '1,5 saniyenin altında yetkilendirme. <strong>Kart, ekran ve parmak izi — tek bir milli platformda.</strong>',
    stats: [
      { v: '0–1,5', unit: 's', label: 'Kart okuma ve yetkilendirme' },
      { v: '−20/+50', unit: '°C', label: 'Çalışma sıcaklığı aralığı' },
      { v: 'ISO', label: '14443 ve 7816 uyumlu' },
      { v: 'RoHS', label: 'Ürün ve tüm alt sistemler' },
    ],
    features: ['Manyetik kapı, kayar kapı, turnike ve bariyerlerde kullanım', '−20 / +50 °C çalışma aralığı', 'ISO14443 ve ISO7816 standartlarına uygun', 'UTP/STP (RJ45) bağlantı', 'RTC entegrasyonu ve NTP ile saat güncelleme', 'Sesli ve görsel uyarı', '0–1,5 saniye arasında yetkilendirme', 'TÜBİTAK AKİS ve MIFARE uyumluluğu'],
    hint: 'Kartı okutun ve geçişi izleyin',
    controls: `
      <div class="seg" role="group" aria-label="Model">
        <button type="button" data-tvariant="ekransiz" aria-pressed="false">Ekransız</button>
        <button type="button" data-tvariant="ekranli" aria-pressed="false">Ekranlı</button>
        <button type="button" data-tvariant="parmak" aria-pressed="true">Parmak İzli</button>
      </div>
      <span class="ctrl-sep" aria-hidden="true"></span>
      <button type="button" class="ctrl-btn is-primary" data-tap>Kartı Okut</button>`,
    readout: [['DURUM', 'status', 'HAZIR'], ['KULLANICI', 'who', '—'], ['SÜRE', 'ms', '—'], ['STANDART', null, 'ISO14443']],
    variants: [
      { img: 'assets/img/products/tani-ekransiz.webp', name: 'Ekransız Kart Okuyucu', points: ['Çevrim içi / çevrim dışı çalışma', 'Işıklı ve sesli uyarı'] },
      { img: 'assets/img/products/tani-ekranli.webp', name: 'Ekranlı Kart Okuyucu', points: ['Resim gösterebilme', 'Görsel ve sesli uyarı', 'Online / offline çalışma'] },
      { img: 'assets/img/products/tani-parmak.webp', name: 'Parmak İzli Ekranlı Kart Okuyucu', points: ['Parmak izi doğrulama ile ekstra güvenlik', 'Resim gösterebilme, görsel ve sesli uyarı', 'Online / offline çalışma'] },
    ],
    specs: [['Kart standartları', 'ISO14443, ISO7816 · MIFARE, TÜBİTAK AKİS'], ['Yetkilendirme süresi', '0–1,5 s'], ['Bağlantı', 'UTP/STP (RJ45), TCP/IP'], ['Saat', 'RTC, NTP ile ağ üzerinden güncelleme'], ['Çalışma sıcaklığı', '−20°C / +50°C'], ['Uygulama', 'Manyetik/kayar kapı, boy ve bel turnike, bariyer'], ['Yazılım', 'ERİSİS GKS · ERP entegrasyonu'], ['Uygunluk', 'RoHS']],
    related: ['erisis', 'sezgi'],
  },
  {
    id: 'erisis', name: 'ERİSİS', family: 'Güvenlik Yönetim Yazılımı', img: null,
    tagline: 'Tüm sensörler. Tek bir resim.',
    short: 'Radar, kamera, fiber optik ve sismik sensörleri tek merkezde birleştiren yapay zekâ destekli güvenlik yönetim platformu.',
    intro: [
      'ERİSİS, kritik altyapılar ve yüksek güvenlik gerektiren tesislerde anlık durumsal farkındalık sağlayan, tam entegre bir güvenlik yönetim platformudur.',
      'Radar, kamera, fiber optik, sismik algılayıcı vb. sensörlerden elde edilen verileri tek merkezde toplayarak gerçek zamanlı analiz ve karar desteği sunar. Kullanıcı dostu arayüzü, yapay zekâ destekli alarm yönetimi ve modüler mimarisiyle sahadaki tüm güvenlik sistemlerini uçtan uca yönetir.',
    ],
    statement: 'Tespit, doğrulama, müdahale. <strong>Sahadaki her sensör tek bir karar ekranında.</strong>',
    stats: [
      { v: '4K', label: 'Canlı izleme · H.264 / H.265' },
      { v: '7/24', label: 'Kesintisiz izleme, yedekli yapı' },
      { v: 'AI', label: 'Akıllı alarm ve nesne sınıflandırma' },
      { v: 'GIS', label: 'Harita tabanlı gerçek zamanlı izleme' },
    ],
    features: ['Kamera ve kayıt platformundan bağımsız (ONVIF uyumlu)', 'Gerçek zamanlı sensör ve sistem takibi', 'Yapay zekâ tabanlı akıllı alarm ve arama', 'Nesne tabanlı sınıflandırma (kişi, araç, nesne)', 'Alan bazlı alarm yönetimi', 'Radar, fiber optik, sismik ve görüntüleme entegrasyonu', 'Coğrafi bilgi sistemi (GIS) üzerinden izleme', 'Modbus, SNMP, OPC vb. entegrasyon altyapısı'],
    hint: 'Bir çevre ihlali senaryosunu canlı izleyin',
    controls: `<button type="button" class="ctrl-btn is-primary" data-start>Senaryoyu Başlat</button>`,
    readout: [['SENSÖR', null, '5/5 ÇEVRİMİÇİ'], ['BÖLGE', 'zone', 'NORMAL'], ['ALARM', 'alarm', '0'], ['KAYIT', null, 'NVR · AKTİF']],
    log: true,
    modules: [
      { t: 'Kamera, Görüntü ve Alarm Yönetimi', d: 'Tüm IP kameralar üzerinden 4K, FHD ve HD canlı izleme, kayıt ve alarm entegrasyonu. ONVIF uyumlu yapısıyla farklı marka ve modellerle tam entegrasyon.', icon: 'camera' },
      { t: 'Tesis Yönetimi', d: 'Geçiş kontrol, yangın, iklimlendirme, enerji, anons ve bina yönetim sistemleriyle entegre merkezi izleme ve müdahale.', icon: 'building' },
      { t: 'Yetki ve Erişim Yönetimi', d: 'Rol tabanlı yetkilendirme ve özelleştirilebilir erişim seviyeleri; Active Directory desteği ile çoklu kullanıcı yönetimi.', icon: 'key' },
      { t: 'Raporlama ve Analiz', d: 'Gerçek zamanlı olay kayıtları, güvenlik ihlalleri ve sistem performans raporları üzerinden gelişmiş analiz.', icon: 'chart' },
    ],
    family2: [
      { t: 'ERİSİS VMS – BMS', d: 'Web tabanlı entegre güvenlik yönetim platformu; tarayıcı üzerinden her an, her yerden erişim.' },
      { t: 'ERİSİS Portatif', d: 'GÖRSEN İzleme Üniteleri için yapay zekâ destekli, sahada hızlı kurulan portatif izleme arayüzü.' },
      { t: 'ERİSİS Kesit', d: 'Görüntü işleme, kayıt ve analiz süreçlerini tek platformda birleştiren yönetim yazılımı.' },
      { t: 'ERİSİS GKS', d: 'Askeri ve sivil alanlarda giriş-çıkışların kontrolü, takibi ve raporlanması için merkezi geçiş kontrol yazılımı.' },
    ],
    specs: [['Kamera görüntü izleme', 'Tüm IP kameralarda 4K, FHD, HD; H.264 / H.265'], ['Kayıt ve geri oynatma', 'NVR / CVR entegre; eşzamanlı çoklu kamera oynatma'], ['Kamera yönetimi', 'ONVIF uyumlu, tam yetkilendirme'], ['Yetki yönetimi', 'Active Directory, çoklu kullanıcı, rol tabanlı erişim'], ['Akıllı alarm', 'Kural veya sensör verisine dayalı dinamik senaryolar'], ['Sensör durum izleme', 'Farklı tipte sensörlerin esnek entegrasyonu'], ['Coğrafi bilgi sistemi', 'Gerçek zamanlı harita tabanlı izleme ve konumlandırma'], ['Entegrasyon', 'Radar, fiber optik, sismik, geçiş kontrol'], ['Bina yönetimi', 'Aydınlatma, enerji ve iklimlendirme']],
    uses: ['Askeri tesisler, sınır ve üs bölgeleri', 'Enerji üretim ve iletim altyapıları', 'Havalimanı, liman, endüstriyel kompleksler', 'Kritik veri merkezleri ve kamu binaları', 'Akıllı şehir güvenlik altyapıları'],
    related: ['sezgi', 'tani'],
  },
];

export const certificates = [
  { name: 'AQAP 2110', d: 'Tasarım, geliştirme ve üretim için NATO kalite güvence gerekleri', since: 'Haziran 2009' },
  { name: 'AS9100 Rev D', d: 'Havacılık ve uzay kalite yönetim sistemleri', since: 'Ağustos 2012' },
  { name: 'ISO 9001:2015', d: 'Kalite yönetim sistemi', since: 'Haziran 1995' },
  { name: 'ISO 14001:2015', d: 'Çevre yönetim sistemi', since: 'Mayıs 2014' },
  { name: 'ISO 45001:2018', d: 'İş sağlığı ve güvenliği yönetim sistemi', since: 'Mayıs 2014' },
  { name: 'ISO 27001:2013', d: 'Bilgi güvenliği yönetim sistemi', since: 'Ekim 2020' },
  { name: 'EYDEP', d: 'Endüstriyel yetkinlik değerlendirme · Seviye A', since: 'Eylül 2022' },
  { name: 'Siber Hijyen Sertifikası', d: 'Siber güvenlik olgunluk belgesi', since: 'Temmuz 2024' },
  { name: 'Milli Gizli Tesis Güvenlik Belgesi', d: 'Gizlilik dereceli projeler için tesis güvenliği', since: 'Temmuz 2010' },
  { name: 'NATO Gizli Tesis Güvenlik Belgesi', d: 'NATO gizlilik dereceli projeler için tesis güvenliği', since: 'Temmuz 2010' },
];

export const policies = [
  {
    t: 'Kalite Politikamız',
    lead: 'Savunma ve teknoloji alanlarında millî ve özgün çözümler sunarken müşteri memnuniyetini en üst düzeyde sağlamayı, sürdürülebilir büyümeyi ve kalite yönetim sistemimizin etkinliğini sürekli iyileştirmeyi amaçlıyoruz.',
    items: ['Ulusal ve uluslararası standartlara, yasal düzenlemelere ve etik ilkelere tam uyum', 'Müşteri beklentilerini doğru anlamak, zamanında geri bildirim vermek', 'Tüm paydaşlarla güvene dayalı ilişkiler ve maliyet etkin çözümler', 'Çalışanlarımızın gelişimini destekleyerek memnuniyetlerini yükseltmek', 'Risk temelli süreç yaklaşımı ve sürekli iyileştirme kültürü', 'Kalite hedeflerine göre performansı düzenli izlemek ve ölçmek'],
  },
  {
    t: 'Çevre Politikamız',
    lead: 'Faaliyetlerimizi çevresel sürdürülebilirlik ilkelerine uygun şekilde yürütmeyi ve doğal kaynakları verimli kullanmayı amaçlıyoruz.',
    items: ['Mevzuat, standart ve yasal düzenlemelere tam uyum', 'Çevresel etkileri sistematik olarak belirleyip riskleri azaltmak', 'Kirliliği önlemek ve iklim değişikliğinin etkilerini azaltmak', 'Çalışan, müşteri ve tedarikçilerde çevre bilincini artırmak', 'Çevre performansını izlemek, raporlamak ve iyileştirmek'],
  },
  {
    t: 'İş Sağlığı ve Güvenliği Politikamız',
    lead: 'Çalışanlarımızın sağlığını ve güvenliğini temel önceliğimiz kabul ediyor, iş kazalarını ve meslek hastalıklarını önlemeyi amaçlıyoruz.',
    items: ['Sıfır iş kazası ve sıfır meslek hastalığı hedefi', 'Eğitim ve bilgilendirme ile güçlü iş güvenliği kültürü', 'Olası acil durumlara hazırlık ve koruyucu önlemler', 'Riskleri önceden belirlemek, kontrol altına almak ve ortadan kaldırmak', 'İSG yönetim sistemini izleyerek sürekli iyileştirmek'],
  },
];

export const news = [
  {
    slug: 'htr-en-buyuk-500-sirket-arasinda', date: '2026-10-08', title: 'HTR En Büyük 500 Şirket Arasında', img: 'assets/img/news/arge500.webp', tag: 'Kurumsal',
    body: ['Turkishtime Dergisi tarafından gerçekleştirilen 2025 yılı Ar-Ge Harcamaları Araştırması’nda Türkiye’nin en büyük 500 şirketi arasında yer almaktan gurur duyuyoruz.', 'HTR olarak, Ar-Ge ve mühendislik kabiliyetlerimizle yenilikçi teknolojiler geliştirmeye, yerli ve millî çözümlerimizle ülkemizin teknolojik gelişimine katkı sağlamaya devam ediyoruz.'],
  },
  {
    slug: 'adex-2026yi-tamamladik', date: '2026-10-05', title: 'ADEX 2026’yı Tamamladık', img: 'assets/img/news/adex-done.webp', tag: 'Fuar',
    body: ['ADEX 2026’yı tamamladık.', 'Standımızı ziyaret eden, çözümlerimize ilgi gösteren ve bizlerle bir araya gelen tüm ziyaretçilerimize teşekkür ederiz.'],
  },
  {
    slug: 'htr-adex-2026da-guvenlik-ve-gozetleme-cozumlerini-tanitacak', date: '2026-09-11', title: 'HTR, ADEX 2026’da Güvenlik ve Gözetleme Çözümlerini Tanıtacak', img: 'assets/img/news/adex.webp', tag: 'Fuar',
    body: [
      'HAVELSAN iştiraki Havelsan Teknoloji Radar (HTR), 30 Eylül–2 Ekim 2026 tarihleri arasında Baku Expo Center’da düzenlenecek 6. Azerbaycan Uluslararası Savunma Fuarı ADEX 2026’da, farklı görev ve saha ihtiyaçlarına yönelik güvenlik ve gözetleme çözümleriyle yer alacak.',
      'HTR, fuarda geçici üs bölgeleri ile kritik alanların yakın güvenliğini destekleyen Üs Bölgesi Yakın Emniyet Sistemi’ni, düşük ışık, sis ve zorlu hava koşullarında gözetleme imkânı sağlayan GÖRSEN Görüntüleme Sistemleri’ni ve kışla, karargâh ile kritik tesislerin fiziki güvenliğini bütüncül biçimde ele alan Kışla ve Karargâh Fiziki Güvenlik Sistemi’ni tanıtacak. Farklı güvenlik bileşenlerinden elde edilen verileri tek merkezde buluşturan ERİSİS güvenlik yazılımı da fuarda sergilenecek.',
      'Mobil Platform Çözümleri kapsamında ise radar ve elektro-optik sensörleri, haberleşme altyapısını ve operatör çalışma alanını 4x4 bir araç üzerinde bir araya getiren entegre platform da ziyaretçilerle buluşacak. Görev ihtiyaçlarına göre yapılandırılabilen araç, farklı bölgelerde güvenlik ve gözetleme faaliyetlerinin yürütülmesini; sahadan elde edilen görüntü ve tespit verilerinin tek noktadan izlenerek ilgili merkeze aktarılmasını destekleyecek.',
      'HTR, ADEX 2026 kapsamında Azerbaycan’daki karar vericiler ve sektör temsilcileriyle doğrudan temas kurarak yeni iş birliği imkânlarını değerlendirecek. Şirket, kısa vadede çözüm portföyünü bölgedeki paydaşlara daha yakından tanıtmayı; uzun vadede ise yerel ihtiyaçlara göre şekillenen, sürdürülebilir ve karşılıklı faydaya dayalı projeler geliştirmeyi amaçlıyor.',
    ],
  },
  {
    slug: 'efes-2026', date: '2026-05-21', title: 'EFES 2026', img: 'assets/img/news/efes.webp', tag: 'Tatbikat',
    body: ['Türk Silahlı Kuvvetleri’nin en büyük birleşik müşterek tatbikatlarından biri olan EFES 2026’yı başarıyla tamamladık.', 'Başta Millî Savunma Bakanlığımız ve Savunma Sanayii Başkanlığımız olmak üzere, EFES 2026’nın gerçekleştirilmesinde emeği geçen tüm paydaşlara şükranlarımızı sunarız.', 'Tatbikat süresince standımızı ziyaret eden değerli heyetlere, sektör temsilcilerine ve tüm misafirlerimize teşekkür ederiz.'],
  },
  {
    slug: 'saha-2026', date: '2026-05-09', title: 'SAHA 2026', img: 'assets/img/news/saha.webp', tag: 'Fuar',
    body: ['SAHA 2026 fuarını halkımızın yerli ve millî teknolojilerimize gösterdiği yoğun ilgiyle tamamladık.', 'Fuar boyunca standımızı ziyaret eden, soruları ve katkılarıyla bizlere destek olan tüm misafirlerimize ve emeği geçen herkese teşekkür ederiz.', 'Gelecek fuarlarda yeniden bir araya gelmek dileğiyle.'],
  },
];

export const career = {
  perks: ['Özel sağlık sigortası', 'Servisle ulaşım ağı', 'Lisansüstü eğitim desteği', 'Kurumsal indirimler', 'Sosyal yardımlar', 'Udemy Business ve Savunma Gelişim platformlarına ücretsiz erişim', 'Esnek mesai', 'Enerjik etkinlikler'],
  internships: [
    { t: 'Uzun Dönem Staj', who: '3. ve 4. sınıf lisans öğrencileri', note: 'Protokol yapılan okulları kapsar', gpa: '≥ 2.75' },
    { t: 'Yaz Dönemi (Zorunlu) Staj', who: '3. ve 4. sınıf lisans öğrencileri', note: '', gpa: '≥ 2.75' },
    { t: 'Meslek Lisesi Stajı', who: '12. sınıf öğrencileri', note: '', gpa: '≥ 70' },
  ],
  experiences: ['Gerçek projelerde aktif görev alma', 'Mentorluk desteği ve teknik atölye çalışmaları', 'Performans değerlendirme ve geri bildirim', 'Başarılı stajyerler için gelecekteki kariyer fırsatları'],
  steps: [
    { t: 'Başvuru', d: 'Başvurunuz ilgili pozisyon kapsamında değerlendirme sürecine alınır.' },
    { t: 'Ön Değerlendirme', d: 'Deneyim ve yetkinlikleriniz pozisyon kriterleri doğrultusunda incelenir.' },
    { t: 'Mülakat', d: 'Yetkinlik ve teknik değerlendirmeler kapsamında görüşmeler gerçekleştirilir.' },
    { t: 'Teklif', d: 'Uygun bulunan adaylara teklif süreci başlatılır.' },
  ],
  platforms: [
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/havelsanteknolojiradar' },
    { name: 'SavunmaKariyer', href: 'https://savunmakariyer.com/ilanlar?companyId=68af143b32ae3c57e36db07e' },
    { name: 'Kariyer.net', href: 'https://www.kariyer.net/firma-profil/havelsan-teknoloji-radar-htr-1969-10637' },
    { name: 'PİK Online', href: 'https://htrkariyer.pikonline.net/#/home/' },
  ],
};
