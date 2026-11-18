// Shared 3D core: renderer/stage, springs (Apple damping+response model), helper materials & textures.
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ------------------------------------------------------------------ */
/* Spring — parameterised like Apple: damping ratio + response (s).    */
/* Always animates from the current value and keeps velocity on        */
/* re-target, so every motion is interruptible.                         */
/* ------------------------------------------------------------------ */
export class Spring {
  constructor(value = 0, { damping = 1, response = 0.4 } = {}) {
    this.value = value; this.target = value; this.velocity = 0;
    this.configure({ damping, response });
  }
  configure({ damping = this.damping, response = this.response }) {
    this.damping = damping; this.response = response;
    const w = (2 * Math.PI) / response;
    this.k = w * w; this.c = 2 * damping * w;
  }
  set(v) { this.value = this.target = v; this.velocity = 0; }
  step(dt) {
    const n = Math.max(1, Math.ceil(dt * 240));
    const h = dt / n;
    for (let i = 0; i < n; i++) {
      const a = -this.k * (this.value - this.target) - this.c * this.velocity;
      this.velocity += a * h;
      this.value += this.velocity * h;
    }
    return this.value;
  }
  get settled() { return Math.abs(this.value - this.target) < 1e-4 && Math.abs(this.velocity) < 1e-4; }
}

export class Spring3 {
  constructor(v = new THREE.Vector3(), opts) {
    this.x = new Spring(v.x, opts); this.y = new Spring(v.y, opts); this.z = new Spring(v.z, opts);
    this.value = v.clone();
  }
  setTarget(v) { this.x.target = v.x; this.y.target = v.y; this.z.target = v.z; }
  set(v) { this.x.set(v.x); this.y.set(v.y); this.z.set(v.z); this.value.copy(v); }
  step(dt) { this.value.set(this.x.step(dt), this.y.step(dt), this.z.step(dt)); return this.value; }
  get settled() { return this.x.settled && this.y.settled && this.z.settled; }
}

/* ------------------------------------------------------------------ */
/* Stage                                                               */
/* ------------------------------------------------------------------ */
export function createStage(canvas, opts = {}) {
  const {
    cameraPos = [3.2, 2.0, 4.2], target = [0, 0.7, 0], fov = 32,
    autoRotate = true, controls: useControls = true, minDistance = 2, maxDistance = 12,
    exposure = 1.0, shadows = true, ground = true, envIntensity = 1, zoom = true,
    minPolar = 0.2, maxPolar = Math.PI / 2 - 0.04,
  } = opts;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = exposure;
  renderer.shadowMap.enabled = shadows;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = envIntensity;

  const camera = new THREE.PerspectiveCamera(fov, 1, 0.05, 200);
  camera.position.set(...cameraPos);

  // Lighting: soft key with shadow, cool rim, warm fill
  const key = new THREE.DirectionalLight(0xffffff, 2.2);
  key.position.set(3, 6, 4);
  key.castShadow = shadows;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.left = -4; key.shadow.camera.right = 4;
  key.shadow.camera.top = 4; key.shadow.camera.bottom = -4;
  key.shadow.camera.near = 0.5; key.shadow.camera.far = 20;
  key.shadow.bias = -0.0004; key.shadow.normalBias = 0.02;
  key.shadow.radius = 6;
  const rim = new THREE.DirectionalLight(0x8fb3ff, 1.4); rim.position.set(-4, 3, -4);
  const fill = new THREE.HemisphereLight(0xdfe6ff, 0x1a1712, 0.35);
  scene.add(key, rim, fill);

  if (ground) {
    const shadowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(30, 30),
      new THREE.ShadowMaterial({ opacity: 0.38 })
    );
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);
    // Contact shadow (soft radial) for grounding even without shadow maps
    const contact = new THREE.Mesh(
      new THREE.PlaneGeometry(3.2, 3.2),
      new THREE.MeshBasicMaterial({ map: radialTexture('rgba(0,0,0,0.55)'), transparent: true, depthWrite: false })
    );
    contact.rotation.x = -Math.PI / 2; contact.position.y = 0.002;
    scene.add(contact);
    scene.userData.contact = contact;
  }

  let controls = null;
  if (useControls) {
    controls = new OrbitControls(camera, canvas);
    controls.target.set(...target);
    controls.enableDamping = true;
    controls.dampingFactor = 0.075;
    controls.enablePan = false;
    controls.enableZoom = zoom;
    controls.zoomToCursor = false;
    controls.minDistance = minDistance; controls.maxDistance = maxDistance;
    controls.minPolarAngle = minPolar; controls.maxPolarAngle = maxPolar;
    controls.rotateSpeed = 0.7;
    controls.autoRotate = autoRotate && !reduceMotion;
    controls.autoRotateSpeed = 0.55;
    // Don't hijack page scroll with the wheel unless the user is deliberately zooming (ctrl/pinch)
    canvas.addEventListener('wheel', (e) => { if (!e.ctrlKey && !e.metaKey) e.stopImmediatePropagation(); }, { capture: true });
    let idle;
    controls.addEventListener('start', () => {
      clearTimeout(idle);
      controls.autoRotate = false;
      canvas.closest('.stage')?.classList.add('is-touched');
      cameraSpring = null; // user grabs the camera → cancel any camera animation (interruptible)
    });
    controls.addEventListener('end', () => {
      if (!autoRotate || reduceMotion) return;
      idle = setTimeout(() => { controls.autoRotate = true; }, 5000);
    });
  } else {
    camera.lookAt(...target);
  }

  // Camera animation via springs (interruptible by grabbing)
  let cameraSpring = null;
  function flyTo(pos, tgt, { response = 0.9 } = {}) {
    if (!controls) { camera.position.set(...pos); camera.lookAt(...tgt); return; }
    if (reduceMotion) {
      camera.position.set(...pos); controls.target.set(...tgt); controls.update(); return;
    }
    const p = new Spring3(camera.position.clone(), { damping: 1, response });
    p.setTarget(new THREE.Vector3(...pos));
    const t = new Spring3(controls.target.clone(), { damping: 1, response });
    t.setTarget(new THREE.Vector3(...tgt));
    cameraSpring = { p, t };
  }

  // Render loop — only when on screen and tab visible
  const ticks = new Set();
  const clock = new THREE.Clock();
  let visible = true, running = false, elapsed = 0, rafId = 0;
  const loop = () => {
    rafId = requestAnimationFrame(loop);
    const dt = Math.min(clock.getDelta(), 1 / 20);
    elapsed += dt;
    if (cameraSpring) {
      camera.position.copy(cameraSpring.p.step(dt));
      controls.target.copy(cameraSpring.t.step(dt));
      if (cameraSpring.p.settled && cameraSpring.t.settled) cameraSpring = null;
    }
    ticks.forEach((fn) => fn(dt, elapsed));
    controls?.update(dt);
    renderer.render(scene, camera);
  };
  const start = () => { if (running) return; running = true; clock.getDelta(); loop(); };
  const stop = () => { running = false; cancelAnimationFrame(rafId); };
  const sync = () => (visible && !document.hidden ? start() : stop());

  new IntersectionObserver(([e]) => { visible = e.isIntersecting; sync(); }, { rootMargin: '100px' }).observe(canvas);
  document.addEventListener('visibilitychange', sync);

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas.parentElement;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // Keep products framed on narrow screens
    camera.fov = w / h < 0.85 ? fov * 1.3 : fov;
    camera.updateProjectionMatrix();
  };
  new ResizeObserver(resize).observe(canvas.parentElement);
  resize();

  requestAnimationFrame(() => canvas.closest('.stage')?.classList.add('is-ready'));

  return {
    THREE, scene, camera, renderer, controls, key,
    onTick: (fn) => { ticks.add(fn); return () => ticks.delete(fn); },
    flyTo, start, stop,
  };
}

/* ------------------------------------------------------------------ */
/* Textures & materials                                                */
/* ------------------------------------------------------------------ */
export function radialTexture(inner = 'rgba(0,0,0,0.6)', size = 256) {
  const c = document.createElement('canvas'); c.width = c.height = size;
  const g = c.getContext('2d');
  const grd = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grd.addColorStop(0, inner); grd.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = grd; g.fillRect(0, 0, size, size);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

let logoImg;
function loadLogo() {
  if (!logoImg) {
    logoImg = new Promise((res) => {
      const img = new Image();
      img.onload = () => res(img);
      img.onerror = () => res(null);
      img.src = new URL('../../assets/img/brand/htr-logo.svg', import.meta.url).href;
    });
  }
  return logoImg;
}

/** Badge texture with the HTR logo tinted to `color`, optional caption under it. */
export function logoTexture({ color = '#ffffff', bg = null, caption = '', w = 512, h = 256 } = {}) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const g = c.getContext('2d');
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
  const draw = (img) => {
    g.clearRect(0, 0, w, h);
    if (bg) { g.fillStyle = bg; g.fillRect(0, 0, w, h); }
    const lh = caption ? h * 0.5 : h * 0.7;
    const lw = lh * (125 / 70);
    const x = (w - lw) / 2, y = caption ? h * 0.1 : (h - lh) / 2;
    if (img) {
      const off = document.createElement('canvas'); off.width = lw; off.height = lh;
      const o = off.getContext('2d');
      o.drawImage(img, 0, 0, lw, lh);
      o.globalCompositeOperation = 'source-in'; o.fillStyle = color; o.fillRect(0, 0, lw, lh);
      g.drawImage(off, x, y);
    } else {
      g.fillStyle = color; g.font = `700 ${lh * 0.6}px -apple-system, Helvetica, Arial`; g.textAlign = 'center';
      g.fillText('HTR', w / 2, y + lh * 0.75);
    }
    if (caption) {
      g.fillStyle = color; g.textAlign = 'center';
      g.font = `700 ${h * 0.22}px -apple-system, Helvetica, Arial`;
      g.fillText(caption, w / 2, h * 0.88);
    }
    tex.needsUpdate = true;
  };
  draw(null);
  loadLogo().then(draw);
  return tex;
}

export const mat = {
  olive: () => new THREE.MeshStandardMaterial({ color: 0x6b664f, roughness: 0.72, metalness: 0.18 }),
  oliveDark: () => new THREE.MeshStandardMaterial({ color: 0x55513f, roughness: 0.78, metalness: 0.15 }),
  bronze: () => new THREE.MeshStandardMaterial({ color: 0x4d4740, roughness: 0.62, metalness: 0.25 }),
  bronzeDark: () => new THREE.MeshStandardMaterial({ color: 0x35312c, roughness: 0.7, metalness: 0.2 }),
  graphite: () => new THREE.MeshStandardMaterial({ color: 0x2b2c2f, roughness: 0.82, metalness: 0.12 }),
  slate: () => new THREE.MeshStandardMaterial({ color: 0x3a3b37, roughness: 0.95, metalness: 0.0 }),
  hood: () => new THREE.MeshStandardMaterial({ color: 0x8e938f, roughness: 0.55, metalness: 0.3 }),
  bolt: () => new THREE.MeshStandardMaterial({ color: 0x18181a, roughness: 0.35, metalness: 0.85 }),
  steel: () => new THREE.MeshStandardMaterial({ color: 0xb8bcc2, roughness: 0.3, metalness: 0.9 }),
  black: () => new THREE.MeshPhysicalMaterial({ color: 0x161618, roughness: 0.45, metalness: 0.1, clearcoat: 0.6, clearcoatRoughness: 0.35 }),
  glass: () => new THREE.MeshPhysicalMaterial({ color: 0x0a0b0d, roughness: 0.04, metalness: 0.0, clearcoat: 1, clearcoatRoughness: 0.02, reflectivity: 0.6 }),
  lens: () => new THREE.MeshPhysicalMaterial({
    color: 0x0d0f14, roughness: 0.03, metalness: 0.2, clearcoat: 1, clearcoatRoughness: 0,
    iridescence: 1, iridescenceIOR: 1.8, iridescenceThicknessRange: [180, 700],
  }),
};

/** Additive, view-friendly glow material for beams/cones. Alpha fades along uv.y. */
export function beamMaterial(color = 0x9bc1ff, opacity = 0.35, power = 1.6) {
  return new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
    uniforms: { uColor: { value: new THREE.Color(color) }, uOpacity: { value: opacity }, uPower: { value: power } },
    vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `uniform vec3 uColor; uniform float uOpacity; uniform float uPower; varying vec2 vUv;
      void main(){ float a = pow(vUv.y, uPower) * uOpacity; gl_FragColor = vec4(uColor * a, a); }`,
  });
}

/** Radar fan sector lying on the ground, facing +Z, with electronic-scan beam, range rings & edges. */
export function radarFan({ radius = 3, halfAngle = Math.PI / 4, color = 0x5cf29a } = {}) {
  const geo = new THREE.CircleGeometry(radius, 96, Math.PI / 2 - halfAngle, halfAngle * 2);
  const material = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
    uniforms: {
      uRadius: { value: radius }, uHalf: { value: halfAngle }, uSweep: { value: 0 }, uDir: { value: 1 },
      uColor: { value: new THREE.Color(color) }, uIntensity: { value: 1 }, uTime: { value: 0 },
    },
    vertexShader: `varying vec2 vPos; void main(){ vPos = position.xy; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `
      uniform float uRadius, uHalf, uSweep, uDir, uIntensity, uTime; uniform vec3 uColor; varying vec2 vPos;
      void main(){
        float r = length(vPos) / uRadius;
        float a = atan(vPos.x, vPos.y);
        float d = (a - uSweep) * uDir;              // >0 ahead of beam, <0 behind
        float beam = exp(-abs(d) * 26.0) * 0.8;
        float trail = d < 0.0 ? exp(d * 3.2) * 0.55 : 0.0;
        float rings = smoothstep(0.035, 0.0, abs(fract(r * 5.0) - 0.5) - 0.465) * 0.35;
        float edge = smoothstep(0.012, 0.0, uHalf - abs(a)) * 0.3;
        float base = 0.05;
        float fade = (1.0 - smoothstep(0.82, 1.0, r)) * smoothstep(0.0, 0.06, r);
        float v = (base + beam + trail + rings + edge) * fade * uIntensity;
        gl_FragColor = vec4(uColor * v, v);
      }`,
  });
  const mesh = new THREE.Mesh(geo, material);
  mesh.rotation.x = Math.PI / 2; // XY → XZ, +Y → +Z (forward)
  mesh.position.y = 0.006;
  mesh.renderOrder = 2;
  let sweep = -halfAngle, dir = 1;
  const speed = (halfAngle * 2) / 1.6; // full scan in 1.6s
  mesh.userData.update = (dt, t) => {
    sweep += dir * speed * dt;
    if (sweep > halfAngle) { sweep = halfAngle; dir = -1; }
    if (sweep < -halfAngle) { sweep = -halfAngle; dir = 1; }
    material.uniforms.uSweep.value = sweep;
    material.uniforms.uDir.value = dir;
    material.uniforms.uTime.value = t;
  };
  mesh.userData.sweep = () => sweep;
  return mesh;
}

/** Target blip with expanding ring; `ping()` flashes it. */
export function blip(color = 0x7cf0a0) {
  const g = new THREE.Group();
  const dot = new THREE.Mesh(new THREE.SphereGeometry(0.035, 16, 12), new THREE.MeshBasicMaterial({ color, transparent: true, fog: false }));
  dot.position.y = 0.04;
  const ringMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0, fog: false, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide });
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.06, 0.075, 40), ringMat);
  ring.rotation.x = -Math.PI / 2; ring.position.y = 0.01;
  g.add(dot, ring);
  let life = 1;
  g.userData.ping = () => { life = 0; };
  g.userData.setColor = (c) => { dot.material.color.set(c); ringMat.color.set(c); };
  g.userData.update = (dt) => {
    life = Math.min(1, life + dt / 1.2);
    const s = 1 + life * 4;
    ring.scale.set(s, s, s);
    ringMat.opacity = (1 - life) * 0.9;
    dot.material.opacity = 0.35 + (1 - life) * 0.65;
  };
  return g;
}

export function boltRing(mesh, { w, h, z, count = 10, r = 0.018, depth = 0.02, inset = 0 }) {
  // Place bolts along a rectangle perimeter (instanced)
  const pts = [];
  const per = 2 * (w + h);
  const n = Math.max(8, count);
  for (let i = 0; i < n; i++) {
    let s = (i / n) * per;
    let x, y;
    if (s < w) { x = -w / 2 + s; y = h / 2; }
    else if ((s -= w) < h) { x = w / 2; y = h / 2 - s; }
    else if ((s -= h) < w) { x = w / 2 - s; y = -h / 2; }
    else { s -= w; x = -w / 2; y = -h / 2 + s; }
    pts.push([x * (1 - inset), y * (1 - inset)]);
  }
  const geo = new THREE.CylinderGeometry(r, r, depth, 12);
  geo.rotateX(Math.PI / 2);
  const inst = new THREE.InstancedMesh(geo, mat.bolt(), pts.length);
  const m = new THREE.Matrix4();
  pts.forEach(([x, y], i) => { m.makeTranslation(x, y, z); inst.setMatrixAt(i, m); });
  inst.castShadow = false;
  mesh.add(inst);
  return inst;
}

export function enableShadows(obj) {
  obj.traverse((o) => { if (o.isMesh && !o.material.transparent && !(o.material instanceof THREE.ShaderMaterial)) { o.castShadow = true; o.receiveShadow = true; } });
  return obj;
}
