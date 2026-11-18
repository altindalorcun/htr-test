import * as THREE from 'three';
import { createStage, Spring, reduceMotion, radarFan, blip } from '../three/core.js';
import { BUILDERS, buildSezgi } from '../three/models.js';

/* ---------------- Hero: SEZGİ scanning a dark terrain ---------------- */
function hero() {
  const canvas = document.querySelector('.hero-canvas');
  if (!canvas) return;
  const stage = createStage(canvas, { controls: false, cameraPos: [-0.6, 1.25, 6.2], target: [0.9, 0.85, 0.6], fov: 34, exposure: 0.95, envIntensity: 0.55 });
  const { scene, camera } = stage;
  scene.fog = new THREE.Fog(0x02040a, 7, 18);
  stage.key.intensity = 1.6;

  // Infinite-looking grid floor
  const grid = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), new THREE.ShaderMaterial({
    transparent: true, depthWrite: false,
    uniforms: { uColor: { value: new THREE.Color(0x3d5bd9) } },
    vertexShader: `varying vec3 vW; void main(){ vec4 w = modelMatrix * vec4(position,1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`,
    fragmentShader: `uniform vec3 uColor; varying vec3 vW;
      float line(float c, float w){ float d = abs(fract(c - 0.5) - 0.5) / fwidth(c); return 1.0 - min(d / w, 1.0); }
      void main(){
        float g = max(line(vW.x * 2.0, 1.0), line(vW.z * 2.0, 1.0)) * 0.35 + max(line(vW.x * 0.5, 1.2), line(vW.z * 0.5, 1.2)) * 0.5;
        float fade = 1.0 - smoothstep(2.0, 13.0, length(vW.xz - vec2(1.0, 1.0)));
        gl_FragColor = vec4(uColor, g * fade * 0.55);
      }`,
  }));
  grid.rotation.x = -Math.PI / 2; grid.position.y = 0.001;
  scene.add(grid);

  const sezgi = buildSezgi({ fan: false });
  const rig = new THREE.Group();
  rig.add(sezgi.object);
  rig.position.set(1.9, 0, -0.2);
  rig.rotation.y = -0.95;
  rig.scale.setScalar(1.05);
  scene.add(rig);
  if (scene.userData.contact) scene.userData.contact.position.set(1.9, 0.002, -0.4);

  const fan = radarFan({ radius: 6.5, halfAngle: Math.PI / 3.6, color: 0x4fd88c });
  fan.material.uniforms.uIntensity.value = 0.55;
  fan.position.z = 0.15;
  sezgi.object.add(fan);
  const blips = [];
  for (let i = 0; i < 7; i++) {
    const b = blip(i < 2 ? 0xffb340 : 0x7cf0a0);
    b.scale.setScalar(1.2);
    b.userData.track = { r: 1.6 + Math.random() * 4.2, a: (Math.random() - 0.5) * 1.5, vr: (Math.random() - 0.5) * 0.25, va: (Math.random() - 0.5) * 0.06, last: 0 };
    sezgi.object.add(b); blips.push(b);
  }

  // Pointer parallax with critically damped springs (camera drifts, never snaps)
  const px = new Spring(0, { damping: 1, response: 1.2 });
  const py = new Spring(0, { damping: 1, response: 1.2 });
  if (!reduceMotion) {
    addEventListener('pointermove', (e) => {
      px.target = (e.clientX / innerWidth - 0.5) * 2;
      py.target = (e.clientY / innerHeight - 0.5) * 2;
    }, { passive: true });
  }
  const base = new THREE.Vector3(-0.6, 1.25, 6.2);
  const look = new THREE.Vector3(0.9, 0.85, 0.6);
  const narrow = () => innerWidth / innerHeight < 0.9;

  const detEl = document.querySelector('[data-hero="det"]');
  const trkEl = document.querySelector('[data-hero="trk"]');
  let detections = 0;
  if (trkEl) trkEl.textContent = String(blips.length).padStart(2, '0');

  stage.onTick((dt, t) => {
    fan.userData.update(dt, t);
    const sweep = fan.userData.sweep();
    blips.forEach((b) => {
      const tr = b.userData.track;
      tr.r += tr.vr * dt; tr.a += tr.va * dt;
      if (tr.r < 1.4 || tr.r > 5.8) tr.vr *= -1;
      if (Math.abs(tr.a) > 0.8) tr.va *= -1;
      b.position.set(Math.sin(tr.a) * tr.r, 0, 0.15 + Math.cos(tr.a) * tr.r);
      if (Math.abs(sweep - tr.a) < 0.03 && t - tr.last > 0.5) { tr.last = t; b.userData.ping(); detections++; }
      b.userData.update(dt);
    });
    if (detEl) detEl.textContent = String(detections).padStart(4, '0');
    const n = narrow();
    camera.position.set(
      base.x + px.step(dt) * 0.35 + (n ? 1.6 : 0),
      base.y - py.step(dt) * 0.18 + (n ? 0.5 : 0),
      base.z + (n ? 2.8 : 0) + Math.sin(t * 0.1) * 0.08
    );
    camera.lookAt(look.x + (n ? 0.6 : 0), look.y, look.z);
  });
}

/* ---------------- Product explorer: one stage, five products ---------------- */
function explorer() {
  const root = document.querySelector('[data-explorer]');
  if (!root) return;
  const canvas = root.querySelector('canvas');
  const stage = createStage(canvas, { cameraPos: [2.6, 1.9, 4.2], target: [0, 0.8, 0], minDistance: 2, maxDistance: 9 });
  const cache = {};
  let current = null;
  const tabs = [...root.querySelectorAll('[data-tab]')];
  const panels = [...root.querySelectorAll('[data-panel]')];

  // Each product runs a gentle demo of its signature behaviour
  const demos = {
    sezgi: () => {},
    gorsen: (m) => { m.api.setLaser(true); let z = 1; let dir = 1; return setInterval(() => { z += dir * 6.5; if (z >= 14 || z <= 1) dir *= -1; z = Math.min(14, Math.max(1, z)); m.api.setZoom(z); }, 2600); },
    ptp: () => {},
    tani: (m) => { m.api.tap(); return setInterval(() => m.api.tap(), 5200); },
    erisis: (m) => { const run = () => m.api.start(() => {}); run(); return setInterval(run, 19000); },
  };
  let demoTimer = null;

  function show(id) {
    tabs.forEach((t) => t.setAttribute('aria-pressed', String(t.dataset.tab === id)));
    panels.forEach((p) => {
      const on = p.dataset.panel === id;
      p.classList.toggle('is-active', on);
      p.querySelectorAll(':scope > *').forEach((c) => { c.classList.remove('fade-in'); if (on) { void c.offsetWidth; c.classList.add('fade-in'); } });
    });
    if (current) { current.wrap.visible = false; }
    clearInterval(demoTimer);
    if (!cache[id]) {
      const m = BUILDERS[id]();
      const wrap = new THREE.Group(); wrap.add(m.object);
      stage.scene.add(wrap);
      m.wrap = wrap;
      m.s = new Spring(0.86, { damping: 0.85, response: 0.5 });
      m.r = new Spring(-0.5, { damping: 1, response: 0.7 });
      stage.onTick((dt, t) => {
        if (!wrap.visible) return;
        m.update(dt, t);
        wrap.scale.setScalar(m.s.step(dt));
        wrap.rotation.y = m.r.step(dt);
      });
      cache[id] = m;
    }
    const m = cache[id];
    m.wrap.visible = true;
    if (!reduceMotion) { m.s.value = 0.86; m.r.value = -0.5; }
    m.s.target = 1; m.r.target = 0;
    if (m.api.reset) m.api.reset();
    demoTimer = demos[id]?.(m) ?? null;
    stage.flyTo(m.view.pos, m.view.target);
    if (stage.scene.userData.contact) stage.scene.userData.contact.visible = id !== 'erisis';
    current = m;
  }
  // Highlight is instant via :active; commit on release (click) so scrolling the tab strip never switches.
  tabs.forEach((t) => t.addEventListener('click', () => { if (t.getAttribute('aria-pressed') !== 'true') show(t.dataset.tab); }));
  show(tabs[0].dataset.tab);
}

hero();
explorer();
