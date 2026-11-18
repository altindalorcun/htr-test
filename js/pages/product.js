// Product page: one interactive stage + controls bound via data attributes.
import * as THREE from 'three';
import { createStage, Spring, reduceMotion } from '../three/core.js';
import { BUILDERS, PTP_VARIANTS } from '../three/models.js';

const el = document.querySelector('[data-stage]');
if (el) {
  const id = el.dataset.stage;
  const canvas = el.querySelector('canvas');
  const m = BUILDERS[id]();
  const isErisis = id === 'erisis';
  const stage = createStage(canvas, {
    cameraPos: m.view.pos, target: m.view.target,
    minDistance: isErisis ? 3 : 1.6, maxDistance: isErisis ? 10 : 8,
    autoRotate: !isErisis && id !== 'tani',
    maxPolar: isErisis ? 1.25 : Math.PI / 2 - 0.04,
  });
  if (isErisis && stage.scene.userData.contact) stage.scene.userData.contact.visible = false;

  // Entrance: grows in from 92% with a critically damped spring
  const wrap = new THREE.Group(); wrap.add(m.object); stage.scene.add(wrap);
  const s = new Spring(reduceMotion ? 1 : 0.92, { damping: 1, response: 0.6 });
  s.target = 1;
  stage.onTick((dt, t) => { m.update(dt, t); wrap.scale.setScalar(s.step(dt)); });

  const $ = (sel) => el.querySelector(sel);
  const $$ = (sel) => [...el.querySelectorAll(sel)];
  const setText = (key, v) => { const n = el.querySelector(`[data-out="${key}"]`); if (n && n.textContent !== String(v)) n.textContent = v; };
  const pressGroup = (btns, active) => btns.forEach((b) => b.setAttribute('aria-pressed', String(b === active)));
  const log = $('.event-log');
  const clock = () => new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const pushEvent = (kind, text) => {
    if (!log) return;
    const div = document.createElement('div');
    div.className = `event ${kind}`;
    div.innerHTML = `<time>${clock()}</time>`;
    div.append(text);
    log.prepend(div);
    while (log.children.length > 4) log.lastElementChild.remove();
  };
  const markTouched = () => el.classList.add('is-touched');

  /* ---------- per-product wiring ---------- */
  if (id === 'sezgi') {
    const btns = $$('[data-fan]');
    btns.forEach((b) => b.addEventListener('click', () => { pressGroup(btns, b); m.api.setFan(b.dataset.fan === 'on'); markTouched(); }));
    stage.onTick(() => {
      setText('det', String(m.state.detections).padStart(4, '0'));
      setText('trk', m.state.fanOn ? String(m.state.tracks).padStart(2, '0') : '00');
      setText('mode', m.state.fanOn ? 'TARAMA' : 'BEKLEME');
    });
  }

  if (id === 'gorsen') {
    const zoom = $('[data-zoom]');
    zoom?.addEventListener('input', () => { m.api.setZoom(parseFloat(zoom.value)); markTouched(); });
    const laser = $('[data-laser]');
    laser?.addEventListener('click', () => {
      const on = laser.getAttribute('aria-pressed') !== 'true';
      laser.setAttribute('aria-pressed', String(on)); m.api.setLaser(on); markTouched();
    });
    const bands = $$('[data-band]');
    bands.forEach((b) => b.addEventListener('click', () => { pressGroup(bands, b); m.api.setBand(b.dataset.band); markTouched(); }));
    const scan = $('[data-scan]');
    scan?.addEventListener('click', () => {
      const on = scan.getAttribute('aria-pressed') !== 'true';
      scan.setAttribute('aria-pressed', String(on)); m.api.setScan(on);
    });
    stage.onTick(() => {
      const z = m.state.zoom;
      setText('zoom', `${z.toFixed(1)}×`);
      setText('focal', `${Math.round(25 * z)} mm`);
      setText('band', m.state.band);
      setText('res', m.state.band === 'SWIR' ? '640×512' : '4096×2160');
      setText('laser', m.state.laser ? 'AKTİF · 1550 nm' : 'KAPALI');
    });
  }

  if (id === 'ptp') {
    const variants = $$('[data-variant]');
    const pan = $('[data-pan]'), tilt = $('[data-tilt]'), demo = $('[data-demo]');
    const syncTiltRange = (name) => { const [lo, hi] = PTP_VARIANTS[name].tilt; tilt.min = lo; tilt.max = hi; };
    variants.forEach((b) => b.addEventListener('click', () => {
      pressGroup(variants, b); m.api.setVariant(b.dataset.variant); syncTiltRange(b.dataset.variant);
      setText('kg', `${PTP_VARIANTS[b.dataset.variant].kg} kg`); markTouched();
    }));
    const stopDemo = () => { demo?.setAttribute('aria-pressed', 'false'); };
    pan?.addEventListener('input', () => { stopDemo(); m.api.setPan(parseFloat(pan.value)); markTouched(); });
    tilt?.addEventListener('input', () => { stopDemo(); m.api.setTilt(parseFloat(tilt.value)); markTouched(); });
    demo?.addEventListener('click', () => {
      const on = demo.getAttribute('aria-pressed') !== 'true';
      demo.setAttribute('aria-pressed', String(on)); m.api.setDemo(on);
    });
    m.api.setVariant('PTP-025'); syncTiltRange('PTP-025');
    stage.onTick(() => {
      setText('pan', `${m.state.pan.toFixed(2).padStart(6, '0')}°`);
      setText('tilt', `${m.state.tilt >= 0 ? '+' : '−'}${Math.abs(m.state.tilt).toFixed(2).padStart(5, '0')}°`);
      setText('variant', m.state.variant);
      if (m.state.demo) {
        if (document.activeElement !== pan) pan.value = m.state.pan;
        if (document.activeElement !== tilt) tilt.value = m.state.tilt;
      }
    });
  }

  if (id === 'tani') {
    const variants = $$('[data-tvariant]');
    const tapBtn = $('[data-tap]');
    variants.forEach((b) => b.addEventListener('click', () => { pressGroup(variants, b); m.api.setVariant(b.dataset.tvariant); markTouched(); }));
    let t0 = 0;
    tapBtn?.addEventListener('click', () => {
      if (m.state.busy) return;
      markTouched();
      t0 = performance.now();
      setText('status', 'KART YAKLAŞTIRILDI');
      m.api.tap((ev, name) => {
        if (ev === 'read') setText('status', 'OKUNUYOR · ISO14443');
        if (ev === 'finger') setText('status', 'BİYOMETRİK DOĞRULAMA');
        if (ev === 'ok') { setText('status', 'ERİŞİM ONAYLANDI'); setText('who', name); setText('ms', `${((performance.now() - t0) / 1000).toFixed(2)} s`); }
        if (ev === 'deny') setText('status', 'ERİŞİM REDDEDİLDİ');
        if (ev === 'idle') setText('status', 'HAZIR');
      });
    });
    // Hint the interaction with one automatic tap when first visible
    let hinted = false;
    new IntersectionObserver(([e]) => { if (e.isIntersecting && !hinted) { hinted = true; setTimeout(() => tapBtn?.click(), 900); } }, { threshold: 0.5 }).observe(el);
  }

  if (id === 'erisis') {
    const startBtn = $('[data-start]');
    let running = false;
    const begin = () => {
      if (running) return;
      running = true; markTouched();
      startBtn.textContent = 'Senaryo çalışıyor…'; startBtn.disabled = true;
      setText('alarm', '0'); setText('zone', 'NORMAL');
      m.api.start((kind, text) => {
        if (kind === 'done') {
          running = false; startBtn.disabled = false; startBtn.textContent = 'Senaryoyu Tekrarla';
          setText('zone', 'NORMAL');
          pushEvent('ok', 'Senaryo tamamlandı · sistem normal');
          return;
        }
        if (kind === 'alert') { setText('alarm', String(m.state.alarms)); setText('zone', 'İHLAL'); }
        if (kind === 'warn') setText('zone', 'TAKİP');
        pushEvent(kind, text);
      });
    };
    startBtn?.addEventListener('click', begin);
    let auto = false;
    new IntersectionObserver(([e]) => { if (e.isIntersecting && !auto) { auto = true; setTimeout(begin, 1200); } }, { threshold: 0.5 }).observe(el);
  }
}
