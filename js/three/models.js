// Procedural product models, built to resemble HTR's product photography.
// Each builder returns { object, update(dt, t), view: { pos, target }, api }.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { Spring, mat, logoTexture, radarFan, blip, boltRing, beamMaterial, enableShadows } from './core.js';

const RB = (w, h, d, r = 0.04, s = 4) => new RoundedBoxGeometry(w, h, d, s, r);
const TAU = Math.PI * 2;

/* ================================================================== */
/* SEZGİ — Radar                                                       */
/* ================================================================== */
export function buildSezgi({ fan = true, targets = 4, fanRadius = 2.1 } = {}) {
  const root = new THREE.Group();
  const unit = new THREE.Group();
  const olive = mat.olive(), oliveDark = mat.oliveDark();

  // Housing
  const body = new THREE.Mesh(RB(1.2, 1.0, 0.36, 0.09, 5), olive);
  unit.add(body);
  // Heat-sink ribs on sides
  for (let i = 0; i < 7; i++) {
    for (const sx of [-1, 1]) {
      const rib = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.62, 0.05), oliveDark);
      rib.position.set(sx * 0.61, 0.0, -0.13 + i * 0.045);
      unit.add(rib);
    }
  }
  // Front frame (raised) + radome
  const frame = new THREE.Mesh(RB(1.1, 0.92, 0.06, 0.05, 4), olive);
  frame.position.set(0, 0.02, 0.2);
  unit.add(frame);
  const radome = new THREE.Mesh(RB(0.96, 0.7, 0.04, 0.03, 3), mat.slate());
  radome.position.set(0, 0.08, 0.235);
  unit.add(radome);
  boltRing(unit, { w: 1.02, h: 0.78, z: 0.235, count: 34, r: 0.014, depth: 0.022 });
  unit.children.at(-1).position.y = 0.08;
  // Badge
  const badgeBase = new THREE.Mesh(RB(0.26, 0.11, 0.02, 0.012, 2), mat.graphite());
  badgeBase.position.set(0, -0.36, 0.236);
  const badge = new THREE.Mesh(new THREE.PlaneGeometry(0.22, 0.11), new THREE.MeshBasicMaterial({ map: logoTexture({ color: '#f2f2f2' }), transparent: true }));
  badge.position.set(0, -0.36, 0.2475);
  unit.add(badgeBase, badge);
  // Rear mount bracket
  const bracket = new THREE.Mesh(RB(0.34, 0.5, 0.12, 0.02, 2), oliveDark);
  bracket.position.set(0, -0.05, -0.23);
  unit.add(bracket);

  unit.position.y = 1.18;
  unit.rotation.x = 0.06;
  root.add(unit);

  // Mast + tripod-ish base
  const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.05, 0.75, 24), mat.bronzeDark());
  mast.position.set(0, 0.4, -0.3);
  const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.08, 24), mat.bronze());
  collar.position.set(0, 0.74, -0.3);
  const arm = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.12), mat.bronze());
  arm.position.set(0, 0.79, -0.27);
  root.add(mast, collar, arm);
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.26, 0.05, 32), mat.bronzeDark());
  base.position.set(0, 0.025, -0.3);
  root.add(base);
  for (let i = 0; i < 3; i++) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.03, 0.5), mat.bronzeDark());
    const a = (i / 3) * TAU + Math.PI / 6;
    leg.position.set(Math.sin(a) * 0.32, 0.015, -0.3 + Math.cos(a) * 0.32);
    leg.rotation.y = a;
    root.add(leg);
  }
  enableShadows(root);

  // Detection fan + targets
  let fanMesh = null; const blips = [];
  if (fan) {
    fanMesh = radarFan({ radius: fanRadius, halfAngle: Math.PI / 4 });
    fanMesh.position.z = 0.15;
    root.add(fanMesh);
    for (let i = 0; i < targets; i++) {
      const b = blip(i === 0 ? 0xffb340 : 0x7cf0a0);
      b.userData.track = {
        r: fanRadius * (0.35 + 0.5 * Math.random()),
        a: (Math.random() - 0.5) * (Math.PI / 2) * 0.8,
        vr: (Math.random() - 0.5) * 0.12,
        va: (Math.random() - 0.5) * 0.08,
        last: 0,
      };
      root.add(b); blips.push(b);
    }
  }

  const state = { detections: 0, tracks: blips.length, fanOn: !!fan };
  const fanIntensity = new Spring(fan ? 1 : 0, { damping: 1, response: 0.4 });

  function update(dt, t) {
    if (!fanMesh) return;
    fanMesh.userData.update(dt, t);
    fanMesh.material.uniforms.uIntensity.value = fanIntensity.step(dt);
    fanMesh.visible = fanIntensity.value > 0.01;
    const sweep = fanMesh.userData.sweep();
    blips.forEach((b) => {
      const tr = b.userData.track;
      tr.r += tr.vr * dt; tr.a += tr.va * dt;
      const maxA = (Math.PI / 4) * 0.85;
      if (tr.r < fanRadius * 0.25 || tr.r > fanRadius * 0.85) tr.vr *= -1;
      if (Math.abs(tr.a) > maxA) tr.va *= -1;
      b.position.set(Math.sin(tr.a) * tr.r, 0, 0.15 + Math.cos(tr.a) * tr.r);
      b.visible = fanMesh.visible;
      if (Math.abs(sweep - tr.a) < 0.035 && t - tr.last > 0.5) { tr.last = t; b.userData.ping(); state.detections++; }
      b.userData.update(dt);
      b.scale.setScalar(Math.max(0.001, fanIntensity.value));
    });
  }

  return {
    object: root, update, state,
    view: { pos: [2.6, 2.1, 4.4], target: [0, 0.85, 0.6] },
    api: {
      setFan(on) { fanIntensity.target = on ? 1 : 0; state.fanOn = on; },
      setRange(r) { if (fanMesh) { const s = r / fanRadius; fanMesh.scale.set(s, s, 1); } },
    },
  };
}

/* ================================================================== */
/* GÖRSEN — SWIR camera on pan-tilt                                    */
/* ================================================================== */
export function buildGorsen() {
  const root = new THREE.Group();
  const cam = new THREE.Group();
  const housing = mat.graphite();

  // Body
  const body = new THREE.Mesh(RB(0.56, 0.5, 0.9, 0.04, 4), housing);
  cam.add(body);
  // Curved sunshield
  const hoodGeo = new THREE.CylinderGeometry(0.62, 0.62, 1.04, 48, 1, true, -0.55, 1.1);
  hoodGeo.rotateX(-Math.PI / 2);
  const hood = new THREE.Mesh(hoodGeo, mat.hood());
  hood.material.side = THREE.DoubleSide;
  hood.position.set(0, -0.31, 0.03);
  cam.add(hood);
  for (const sx of [-1, 1]) {
    const flap = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.16, 1.0), mat.hood());
    flap.position.set(sx * 0.33, 0.2, 0.03);
    cam.add(flap);
  }
  // Window (octagon-ish) cut into a raised front plate, lens stack sits in the recess
  const ww = 0.36, wh = 0.3, c = 0.06, wy = -0.04;
  const octo = (path, oy) => {
    path.moveTo(-ww / 2, wh / 2 + oy); path.lineTo(ww / 2, wh / 2 + oy); path.lineTo(ww / 2, -wh / 2 + c + oy);
    path.lineTo(ww / 2 - c, -wh / 2 + oy); path.lineTo(-ww / 2 + c, -wh / 2 + oy); path.lineTo(-ww / 2, -wh / 2 + c + oy); path.closePath();
    return path;
  };
  const winShape = octo(new THREE.Shape(), 0);
  const fw = 0.54, fh = 0.48, fr = 0.03;
  const faceShape = new THREE.Shape();
  faceShape.moveTo(-fw / 2 + fr, -fh / 2); faceShape.lineTo(fw / 2 - fr, -fh / 2); faceShape.quadraticCurveTo(fw / 2, -fh / 2, fw / 2, -fh / 2 + fr);
  faceShape.lineTo(fw / 2, fh / 2 - fr); faceShape.quadraticCurveTo(fw / 2, fh / 2, fw / 2 - fr, fh / 2);
  faceShape.lineTo(-fw / 2 + fr, fh / 2); faceShape.quadraticCurveTo(-fw / 2, fh / 2, -fw / 2, fh / 2 - fr);
  faceShape.lineTo(-fw / 2, -fh / 2 + fr); faceShape.quadraticCurveTo(-fw / 2, -fh / 2, -fw / 2 + fr, -fh / 2);
  faceShape.holes.push(octo(new THREE.Path(), wy));
  const face = new THREE.Mesh(new THREE.ExtrudeGeometry(faceShape, { depth: 0.07, bevelEnabled: true, bevelThickness: 0.008, bevelSize: 0.008, bevelSegments: 2 }), mat.graphite());
  face.position.z = 0.452;
  cam.add(face);
  const win = new THREE.Mesh(new THREE.ShapeGeometry(winShape), new THREE.MeshStandardMaterial({ color: 0x050607, roughness: 0.4 }));
  win.position.set(0, wy, 0.452);
  cam.add(win);
  const lensGroup = new THREE.Group();
  lensGroup.position.set(0, wy, 0.47);
  const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.12, 40, 1, true), mat.bolt());
  barrel.rotation.x = Math.PI / 2;
  const lens = new THREE.Mesh(new THREE.SphereGeometry(0.115, 48, 24, 0, TAU, 0, 0.6), mat.lens());
  lens.rotation.x = Math.PI / 2; lens.position.z = -0.1;
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.012, 12, 48), mat.steel());
  ring.position.z = 0.06;
  const inner = new THREE.Mesh(new THREE.CircleGeometry(0.06, 32), mat.lens());
  inner.position.z = 0.0;
  lensGroup.add(barrel, lens, ring, inner);
  cam.add(lensGroup);
  // Front glass
  const glass = new THREE.Mesh(new THREE.ShapeGeometry(winShape), new THREE.MeshPhysicalMaterial({
    color: 0x223344, transparent: true, opacity: 0.18, roughness: 0, metalness: 0, clearcoat: 1,
  }));
  glass.position.set(0, -0.04, 0.531);
  cam.add(glass);
  // Laser illuminator slot (side)
  const slot = new THREE.Mesh(RB(0.03, 0.22, 0.02, 0.008, 2), mat.bolt());
  slot.position.set(0.225, -0.04, 0.536);
  cam.add(slot);
  // Badge
  const badge = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.1), new THREE.MeshBasicMaterial({ map: logoTexture({ color: '#e8e8e8', caption: 'SWIR' }), transparent: true }));
  badge.position.set(0, 0.17, 0.532);
  cam.add(badge);
  // Corner screws
  for (const [x, y] of [[-0.23, 0.19], [0.23, 0.19], [-0.23, -0.2], [0.23, -0.2]]) {
    const s = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.01, 12), mat.steel());
    s.rotation.x = Math.PI / 2; s.position.set(x, y, 0.532); cam.add(s);
  }

  // Pan-tilt yoke
  const pan = new THREE.Group();
  pan.position.y = 0.42;
  const yokeBase = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.22, 0.1, 40), mat.bronze());
  yokeBase.position.y = 0.05;
  pan.add(yokeBase);
  for (const sx of [-1, 1]) {
    const arm = new THREE.Mesh(RB(0.06, 0.5, 0.22, 0.02, 2), mat.bronze());
    arm.position.set(sx * 0.33, 0.33, 0); pan.add(arm);
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.04, 32), mat.bronzeDark());
    hub.rotation.z = Math.PI / 2; hub.position.set(sx * 0.37, 0.5, 0); pan.add(hub);
  }
  const bridge = new THREE.Mesh(RB(0.72, 0.06, 0.22, 0.02, 2), mat.bronze());
  bridge.position.y = 0.11; pan.add(bridge);
  const tilt = new THREE.Group();
  tilt.position.y = 0.5;
  tilt.add(cam);
  pan.add(tilt);
  root.add(pan);
  // Pedestal
  const ped = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.2, 0.36, 40), mat.bronzeDark());
  ped.position.y = 0.2;
  const plate = new THREE.Mesh(RB(0.6, 0.05, 0.6, 0.02, 2), mat.bronzeDark());
  plate.position.y = 0.025;
  root.add(ped, plate);
  enableShadows(root);

  // Field-of-view frustum (zoom-driven) — apex at lens, opening forward
  const fovGroup = new THREE.Group();
  fovGroup.position.set(0, -0.04, 0.535);
  const fovLen = 3.2;
  const pyr = new THREE.ConeGeometry(1, 1, 4, 1, true);
  pyr.rotateY(Math.PI / 4);
  pyr.translate(0, -0.5, 0);
  pyr.rotateX(-Math.PI / 2);
  const fovMat = beamMaterial(0x6aa8ff, 0.16, 0.7);
  const fovMesh = new THREE.Mesh(pyr, fovMat);
  const edges = new THREE.LineSegments(new THREE.EdgesGeometry(pyr), new THREE.LineBasicMaterial({ color: 0x8fbaff, transparent: true, opacity: 0.35 }));
  fovGroup.add(fovMesh, edges);
  tilt.add(fovGroup);

  // Laser illumination beam
  const laserGeo = new THREE.ConeGeometry(1, 1, 40, 1, true);
  laserGeo.translate(0, -0.5, 0); laserGeo.rotateX(-Math.PI / 2);
  const laser = new THREE.Mesh(laserGeo, beamMaterial(0xc9a6ff, 0.55, 2.2));
  laser.position.set(0.225, -0.04, 0.54);
  tilt.add(laser);

  const zoom = new Spring(1, { damping: 1, response: 0.45 });
  const laserI = new Spring(0, { damping: 1, response: 0.35 });
  const panS = new Spring(0, { damping: 1, response: 0.6 });
  const tiltS = new Spring(0, { damping: 1, response: 0.6 });
  const state = { zoom: 1, laser: false, band: 'SWIR', focal: 25, scan: true };
  const minHalf = 1.1 / 14; // tan of half fov at max zoom (approx)

  function update(dt, t) {
    const z = zoom.step(dt);
    // Half-angle scales inversely with zoom (25–350 mm)
    const half = 0.55 / z + minHalf * 0.0;
    const len = fovLen * (0.55 + 0.45 * Math.min(1, (z - 1) / 13 + 0.2));
    fovGroup.scale.set(Math.tan(half) * len, Math.tan(half) * len * 0.8, len);
    lensGroup.position.z = 0.47 + (z - 1) / 13 * 0.03;
    const li = laserI.step(dt);
    laser.visible = li > 0.01;
    const lr = Math.tan(0.06 + 0.2 / z) * 3.0;
    laser.scale.set(lr, lr, 3.0 * li + 0.001);
    laser.material.uniforms.uOpacity.value = 0.55 * li;
    if (state.scan) { panS.target = Math.sin(t * 0.35) * 0.6; tiltS.target = Math.sin(t * 0.23) * 0.08 - 0.04; }
    pan.rotation.y = panS.step(dt);
    tilt.rotation.x = tiltS.step(dt);
    state.focal = Math.round(25 * z);
  }

  return {
    object: root, update, state,
    view: { pos: [2.4, 1.6, 3.4], target: [0, 0.85, 0.5] },
    api: {
      setZoom(v) { zoom.target = v; state.zoom = v; },
      setLaser(on) { laserI.target = on ? 1 : 0; state.laser = on; },
      setBand(b) {
        state.band = b;
        fovMat.uniforms.uColor.value.set(b === 'SWIR' ? 0x6aa8ff : 0x7cf0a0);
        edges.material.color.set(b === 'SWIR' ? 0x8fbaff : 0x9ff5bb);
      },
      setScan(on) { state.scan = on; if (!on) { panS.target = 0; tiltS.target = 0; } },
    },
  };
}

/* ================================================================== */
/* PTP — Precision pan-tilt platform                                   */
/* ================================================================== */
export const PTP_VARIANTS = {
  'PTP-005': { kg: 5, scale: 0.78, tilt: [-45, 45] },
  'PTP-010': { kg: 10, scale: 0.86, tilt: [-45, 45] },
  'PTP-025': { kg: 25, scale: 1.0, tilt: [-90, 45] },
  'PTP-035': { kg: 35, scale: 1.08, tilt: [-90, 90] },
  'PTP-050': { kg: 50, scale: 1.16, tilt: [-90, 90] },
};

export function buildPTP() {
  const root = new THREE.Group();
  const scaleG = new THREE.Group();
  root.add(scaleG);
  const bz = mat.bronze(), bzd = mat.bronzeDark();

  // Square base with feet holes
  const basePlate = new THREE.Mesh(RB(0.9, 0.08, 0.9, 0.05, 3), bzd);
  basePlate.position.y = 0.04;
  scaleG.add(basePlate);
  for (const [x, z] of [[-0.36, -0.36], [0.36, -0.36], [-0.36, 0.36], [0.36, 0.36]]) {
    const hole = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.085, 16), mat.bolt());
    hole.position.set(x, 0.045, z); scaleG.add(hole);
  }
  const plinth = new THREE.Mesh(RB(0.6, 0.1, 0.6, 0.06, 3), bzd);
  plinth.position.y = 0.12; scaleG.add(plinth);
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.28, 0.24, 48), bzd);
  neck.position.y = 0.29; scaleG.add(neck);
  const label = new THREE.Mesh(new THREE.PlaneGeometry(0.16, 0.05), new THREE.MeshBasicMaterial({ color: 0x111111 }));
  label.position.set(0, 0.12, 0.302); scaleG.add(label);

  // Pan stage
  const pan = new THREE.Group();
  pan.position.y = 0.41;
  scaleG.add(pan);
  const turntable = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.06, 48), bz);
  turntable.position.y = 0.03; pan.add(turntable);
  const ringMark = new THREE.Mesh(new THREE.TorusGeometry(0.242, 0.006, 8, 64), mat.steel());
  ringMark.rotation.x = Math.PI / 2; ringMark.position.y = 0.05; pan.add(ringMark);

  // D-shaped head (side profile extruded along X)
  const prof = new THREE.Shape();
  // profile in (z, y): flat back, rounded top-front, tapered bottom-front
  prof.moveTo(-0.34, 0.0);
  prof.lineTo(0.18, 0.0);
  prof.quadraticCurveTo(0.42, 0.06, 0.42, 0.42);
  prof.quadraticCurveTo(0.42, 0.86, 0.02, 0.9);
  prof.lineTo(-0.24, 0.9);
  prof.quadraticCurveTo(-0.38, 0.9, -0.38, 0.76);
  prof.lineTo(-0.38, 0.08);
  prof.quadraticCurveTo(-0.38, 0.0, -0.34, 0.0);
  const headGeo = new THREE.ExtrudeGeometry(prof, { depth: 0.5, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.035, bevelSegments: 6, curveSegments: 24 });
  headGeo.translate(0, 0, -0.25);
  headGeo.rotateY(-Math.PI / 2); // shape-x → +Z (front), extrusion → X (width)
  const head = new THREE.Mesh(headGeo, bz);
  const headWrap = new THREE.Group();
  headWrap.add(head);
  headWrap.position.y = 0.06;
  pan.add(headWrap);

  // Connectors on the back-right face
  for (const [y, z] of [[0.55, -0.12], [0.55, 0.02], [0.4, -0.05]]) {
    const conn = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.05, 20), mat.steel());
    conn.rotation.z = Math.PI / 2; conn.position.set(0.3, y + 0.06, z); pan.add(conn);
  }

  // Tilt axis on the left side with payload bracket
  const tilt = new THREE.Group();
  tilt.position.set(-0.31, 0.55, 0.02);
  pan.add(tilt);
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.06, 48), bzd);
  hub.rotation.z = Math.PI / 2; tilt.add(hub);
  const hubCap = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.065, 48), mat.steel());
  hubCap.rotation.z = Math.PI / 2; hubCap.position.x = -0.01; tilt.add(hubCap);
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * TAU;
    const b = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.07, 10), mat.bolt());
    b.rotation.z = Math.PI / 2; b.position.set(-0.012, Math.sin(a) * 0.11, Math.cos(a) * 0.11); tilt.add(b);
  }
  const armPlate = new THREE.Mesh(RB(0.04, 0.12, 0.5, 0.015, 2), bz);
  armPlate.position.set(-0.07, 0, 0.12); tilt.add(armPlate);
  // Payload: compact camera on the bracket
  const payload = new THREE.Group();
  const pBody = new THREE.Mesh(RB(0.22, 0.2, 0.46, 0.03, 3), mat.graphite());
  const pHood = new THREE.Mesh(RB(0.26, 0.02, 0.5, 0.01, 2), mat.hood());
  pHood.position.y = 0.11;
  const pLens = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.02, 32), mat.lens());
  pLens.rotation.x = Math.PI / 2; pLens.position.z = 0.235;
  payload.add(pBody, pHood, pLens);
  payload.position.set(-0.26, 0.0, 0.14);
  tilt.add(payload);
  const crossbar = new THREE.Mesh(RB(0.24, 0.03, 0.14, 0.01, 2), bz);
  crossbar.position.set(-0.19, -0.115, 0.14); tilt.add(crossbar);

  enableShadows(root);

  // Pointing line from payload (shows where the platform aims)
  const aimGeo = new THREE.CylinderGeometry(0.003, 0.003, 3, 6);
  aimGeo.translate(0, 1.5, 0); aimGeo.rotateX(Math.PI / 2);
  const aim = new THREE.Mesh(aimGeo, new THREE.MeshBasicMaterial({ color: 0x5cf29a, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, depthWrite: false }));
  aim.position.set(0, 0, 0.36);
  payload.add(aim);

  const panS = new Spring(0, { damping: 1, response: 0.55 });
  const tiltS = new Spring(0, { damping: 1, response: 0.55 });
  const scaleS = new Spring(1, { damping: 0.8, response: 0.4 });
  const state = { pan: 0, tilt: 0, demo: true, variant: 'PTP-025', limits: [-90, 45] };

  function update(dt, t) {
    if (state.demo) {
      panS.target = ((t * 22) % 360) * Math.PI / 180;
      const [lo, hi] = state.limits;
      tiltS.target = THREE.MathUtils.degToRad(THREE.MathUtils.lerp(Math.max(lo, -35), Math.min(hi, 30), (Math.sin(t * 0.6) + 1) / 2));
    }
    pan.rotation.y = panS.step(dt);
    tilt.rotation.x = -tiltS.step(dt);
    scaleG.scale.setScalar(scaleS.step(dt));
    state.pan = ((THREE.MathUtils.radToDeg(pan.rotation.y) % 360) + 360) % 360;
    state.tilt = THREE.MathUtils.radToDeg(tiltS.value);
  }

  return {
    object: root, update, state,
    view: { pos: [2.5, 1.7, 3.0], target: [0, 0.6, 0] },
    api: {
      setDemo(on) {
        state.demo = on;
        if (!on) { // continue from where it is (presentation value) — no jump
          const cur = panS.value % TAU;
          panS.value = cur; panS.target = cur;
        }
      },
      setPan(deg) { state.demo = false; panS.target = THREE.MathUtils.degToRad(deg); },
      setTilt(deg) { state.demo = false; tiltS.target = THREE.MathUtils.degToRad(deg); },
      setVariant(name) {
        const v = PTP_VARIANTS[name]; if (!v) return;
        state.variant = name; state.limits = v.tilt; scaleS.target = v.scale;
        const [lo, hi] = v.tilt;
        const cur = THREE.MathUtils.radToDeg(tiltS.target);
        tiltS.target = THREE.MathUtils.degToRad(THREE.MathUtils.clamp(cur, lo, hi));
      },
    },
  };
}

/* ================================================================== */
/* TANI — Smart card reader                                            */
/* ================================================================== */
function screenCanvas() {
  const c = document.createElement('canvas'); c.width = 320; c.height = 420;
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
  const g = c.getContext('2d');
  const font = '-apple-system, "SF Pro Display", Helvetica, Arial, sans-serif';
  function draw(mode, name = '') {
    const W = c.width, H = c.height;
    const grads = {
      idle: ['#e9f1ff', '#cfdcf5'], reading: ['#e9f1ff', '#cfdcf5'],
      ok: ['#d9f7e3', '#a8e8bf'], deny: ['#ffe1de', '#f5b5ae'], finger: ['#e9f1ff', '#cfdcf5'],
    };
    const [a, b] = grads[mode] || grads.idle;
    const grd = g.createLinearGradient(0, 0, 0, H); grd.addColorStop(0, a); grd.addColorStop(1, b);
    g.fillStyle = grd; g.fillRect(0, 0, W, H);
    g.fillStyle = '#1b2d70'; g.font = `600 18px ${font}`; g.textAlign = 'center';
    g.fillText('HTR TANI', W / 2, 40);
    g.font = `500 13px ${font}`; g.fillStyle = 'rgba(27,45,112,.6)';
    const now = new Date();
    g.fillText(now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }), W / 2, 62);
    g.lineWidth = 10; g.lineCap = 'round'; g.lineJoin = 'round';
    if (mode === 'ok') {
      g.strokeStyle = '#1e9e50'; g.beginPath(); g.arc(W / 2, 190, 70, 0, TAU); g.stroke();
      g.beginPath(); g.moveTo(W / 2 - 32, 192); g.lineTo(W / 2 - 8, 216); g.lineTo(W / 2 + 36, 168); g.stroke();
      g.fillStyle = '#145c31'; g.font = `700 26px ${font}`; g.fillText('Geçiş Onaylandı', W / 2, 315);
      g.font = `500 17px ${font}`; g.fillStyle = 'rgba(20,92,49,.8)'; g.fillText(name, W / 2, 345);
    } else if (mode === 'deny') {
      g.strokeStyle = '#c8291d'; g.beginPath(); g.arc(W / 2, 190, 70, 0, TAU); g.stroke();
      g.beginPath(); g.moveTo(W / 2 - 28, 162); g.lineTo(W / 2 + 28, 218); g.moveTo(W / 2 + 28, 162); g.lineTo(W / 2 - 28, 218); g.stroke();
      g.fillStyle = '#8a1a12'; g.font = `700 26px ${font}`; g.fillText('Yetkisiz Kart', W / 2, 315);
    } else if (mode === 'reading' || mode === 'finger') {
      g.strokeStyle = '#3d5bd9'; g.lineWidth = 8;
      for (let i = 0; i < 3; i++) { g.globalAlpha = 1 - i * 0.28; g.beginPath(); g.arc(W / 2, 190, 34 + i * 26, -0.9, 0.9); g.stroke(); }
      g.globalAlpha = 1;
      g.fillStyle = '#1b2d70'; g.font = `700 24px ${font}`;
      g.fillText(mode === 'finger' ? 'Parmak izi doğrulanıyor' : 'Kart okunuyor…', W / 2, 315);
    } else {
      // card + hand icon
      g.fillStyle = '#1b2d70';
      g.save(); g.translate(W / 2, 180); g.rotate(-0.2);
      g.beginPath(); g.roundRect(-58, -38, 116, 76, 10); g.fill();
      g.fillStyle = '#cfdcf5'; g.fillRect(-40, -18, 26, 20);
      g.restore();
      g.strokeStyle = '#1b2d70'; g.lineWidth = 5;
      for (let i = 0; i < 3; i++) { g.beginPath(); g.arc(W / 2 + 62, 150, 14 + i * 11, -0.9, 0.9); g.stroke(); }
      g.fillStyle = '#1b2d70'; g.font = `700 24px ${font}`; g.fillText('Kartınızı okutun', W / 2, 315);
      g.font = `500 15px ${font}`; g.fillStyle = 'rgba(27,45,112,.65)'; g.fillText('MIFARE · TÜBİTAK AKİS', W / 2, 345);
    }
    tex.needsUpdate = true;
  }
  draw('idle');
  return { tex, draw };
}

export function buildTani() {
  const root = new THREE.Group();
  const dev = new THREE.Group();
  root.add(dev);
  const black = mat.black();

  // Body
  const body = new THREE.Mesh(RB(0.5, 1.02, 0.12, 0.06, 5), black);
  dev.add(body);
  const back = new THREE.Mesh(RB(0.44, 0.96, 0.06, 0.04, 3), mat.graphite());
  back.position.z = -0.07; dev.add(back);
  // Top bezel / screen (variant dependent)
  const bezel = new THREE.Mesh(RB(0.42, 0.52, 0.02, 0.03, 3), mat.glass());
  bezel.position.set(0, 0.2, 0.06); dev.add(bezel);
  const scr = screenCanvas();
  const screenMat = new THREE.MeshBasicMaterial({ map: scr.tex, toneMapped: false });
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.32, 0.42), screenMat);
  screen.position.set(0, 0.22, 0.0715); dev.add(screen);
  const logo = new THREE.Mesh(new THREE.PlaneGeometry(0.08, 0.045), new THREE.MeshBasicMaterial({ map: logoTexture({ color: '#3d6bff' }), transparent: true }));
  logo.position.set(0, -0.02, 0.0716); dev.add(logo);
  // Reader zone marker (screenless variant)
  const zone = new THREE.Group();
  const zoneRing = new THREE.Mesh(new THREE.RingGeometry(0.09, 0.1, 48), new THREE.MeshBasicMaterial({ color: 0x3d6bff, toneMapped: false }));
  const zoneIcon = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 0.05), new THREE.MeshBasicMaterial({ map: logoTexture({ color: '#cfd8ff' }), transparent: true }));
  zone.add(zoneRing, zoneIcon); zone.position.set(0, 0.22, 0.072);
  dev.add(zone);
  // LED strip
  const ledMat = new THREE.MeshBasicMaterial({ color: 0x3d6bff, toneMapped: false });
  const led = new THREE.Mesh(RB(0.24, 0.012, 0.01, 0.005, 2), ledMat);
  led.position.set(0, -0.08, 0.066); dev.add(led);
  // Fingerprint housing
  const fp = new THREE.Group();
  const fpShape = new THREE.Mesh(RB(0.3, 0.3, 0.08, 0.05, 4), black);
  fpShape.position.set(0, -0.29, 0.07);
  const fpWell = new THREE.Mesh(RB(0.16, 0.18, 0.03, 0.035, 3), mat.graphite());
  fpWell.position.set(0, -0.31, 0.105);
  const fpSensor = new THREE.Mesh(RB(0.09, 0.12, 0.01, 0.02, 2), new THREE.MeshPhysicalMaterial({ color: 0x3a3d44, roughness: 0.2, metalness: 0.5, clearcoat: 1 }));
  fpSensor.position.set(0, -0.32, 0.122);
  const fpLight = new THREE.Mesh(new THREE.PlaneGeometry(0.08, 0.11), new THREE.MeshBasicMaterial({ color: 0x45d17a, transparent: true, opacity: 0, toneMapped: false }));
  fpLight.position.set(0, -0.32, 0.1281);
  fp.add(fpShape, fpWell, fpSensor, fpLight);
  dev.add(fp);

  dev.position.y = 0.92;
  // Wall stand (pedestal)
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.42, 24), mat.steel());
  pole.position.set(0, 0.21, -0.1);
  const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.22, 0.03, 40), mat.graphite());
  foot.position.set(0, 0.015, -0.1);
  const cradle = new THREE.Mesh(RB(0.3, 0.12, 0.1, 0.02, 2), mat.graphite());
  cradle.position.set(0, 0.45, -0.1);
  root.add(pole, foot, cradle);

  // Access card
  const card = new THREE.Group();
  const cardBody = new THREE.Mesh(RB(0.34, 0.215, 0.008, 0.02, 3), new THREE.MeshPhysicalMaterial({ color: 0xf4f6fb, roughness: 0.35, clearcoat: 0.8 }));
  const stripe = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.05), new THREE.MeshStandardMaterial({ color: 0x1b2d70 }));
  stripe.position.set(0, 0.07, 0.0045);
  const chip = new THREE.Mesh(RB(0.05, 0.04, 0.002, 0.006, 2), new THREE.MeshStandardMaterial({ color: 0xd4b25a, metalness: 0.9, roughness: 0.3 }));
  chip.position.set(-0.1, -0.01, 0.0045);
  const cardLogo = new THREE.Mesh(new THREE.PlaneGeometry(0.08, 0.045), new THREE.MeshBasicMaterial({ map: logoTexture({ color: '#ffffff' }), transparent: true }));
  cardLogo.position.set(0.11, 0.07, 0.0052);
  card.add(cardBody, stripe, chip, cardLogo);
  root.add(card);
  enableShadows(root);

  const cardHome = new THREE.Vector3(0.55, 0.85, 0.55);
  const cardTap = new THREE.Vector3(0, 1.14, 0.17);
  const cx = new Spring(cardHome.x, { damping: 1, response: 0.5 });
  const cy = new Spring(cardHome.y, { damping: 1, response: 0.5 });
  const cz = new Spring(cardHome.z, { damping: 1, response: 0.5 });
  const crot = new Spring(-0.6, { damping: 1, response: 0.5 });
  const ledGlow = new Spring(0, { damping: 1, response: 0.25 });

  const state = { variant: 'parmak', busy: false, granted: 0 };
  const names = ['Personel · 0427', 'Ziyaretçi · V-118', 'Personel · 1093'];
  let timers = [];
  const later = (ms, fn) => timers.push(setTimeout(fn, ms));
  const clear = () => { timers.forEach(clearTimeout); timers = []; };

  function applyVariant(v) {
    state.variant = v;
    const hasScreen = v !== 'ekransiz';
    screen.visible = hasScreen; zone.visible = !hasScreen;
    fp.visible = v === 'parmak';
    body.scale.y = 1; dev.position.y = 0.92;
  }
  applyVariant('parmak');

  function setCard(p, rot) { cx.target = p.x; cy.target = p.y; cz.target = p.z; crot.target = rot; }

  function tap(onEvent = () => {}) {
    clear();
    state.busy = true;
    scr.draw('idle'); ledMat.color.set(0x3d6bff);
    setCard(cardTap, 0);
    later(550, () => { scr.draw('reading'); onEvent('read'); });
    const finish = (granted) => {
      const name = names[state.granted % names.length];
      if (granted) { scr.draw('ok', name); ledMat.color.set(0x34c759); ledGlow.target = 1; onEvent('ok', name); state.granted++; }
      else { scr.draw('deny'); ledMat.color.set(0xff453a); ledGlow.target = 1; onEvent('deny'); }
      later(1700, () => { setCard(cardHome, -0.6); ledGlow.target = 0; });
      later(2800, () => { scr.draw('idle'); ledMat.color.set(0x3d6bff); fpLight.material.opacity = 0; state.busy = false; onEvent('idle'); });
    };
    if (state.variant === 'parmak') {
      later(1100, () => { scr.draw('finger'); fpLight.material.opacity = 0.85; onEvent('finger'); });
      later(1900, () => finish(true));
    } else {
      later(1150, () => finish(true));
    }
  }

  function update(dt) {
    card.position.set(cx.step(dt), cy.step(dt), cz.step(dt));
    card.rotation.y = crot.step(dt);
    const g = ledGlow.step(dt);
    led.scale.set(1 + g * 0.2, 1 + g * 1.5, 1);
    if (zone.visible) zoneRing.material.color.copy(ledMat.color);
  }

  return {
    object: root, update, state,
    view: { pos: [1.4, 1.35, 2.3], target: [0, 0.88, 0] },
    api: { tap, setVariant: applyVariant },
  };
}

/* ================================================================== */
/* ERİSİS — Integrated security management (facility twin)           */
/* ================================================================== */
export function buildErisis() {
  const root = new THREE.Group();
  const S = 1; // world scale
  // Ground tile
  const ground = new THREE.Mesh(RB(6.6, 0.12, 5.4, 0.16, 4), new THREE.MeshStandardMaterial({ color: 0x1a1d24, roughness: 0.9 }));
  ground.position.y = -0.06;
  ground.receiveShadow = true;
  root.add(ground);
  // Grid lines
  const grid = new THREE.GridHelper(6.4, 32, 0x2c3342, 0x232833);
  grid.position.y = 0.002; grid.scale.z = 5.2 / 6.4;
  root.add(grid);

  // Buildings
  const bMat = new THREE.MeshStandardMaterial({ color: 0xaeb4c0, roughness: 0.65 });
  const roof = new THREE.MeshStandardMaterial({ color: 0x9aa2b1, roughness: 0.7 });
  const addBox = (w, h, d, x, z, m = bMat) => {
    const b = new THREE.Mesh(RB(w, h, d, 0.02, 2), m); b.position.set(x, h / 2, z); root.add(b); return b;
  };
  addBox(1.1, 0.32, 0.6, -0.9, -0.45);
  addBox(0.6, 0.55, 0.5, 0.2, -0.6);
  addBox(0.5, 0.22, 0.9, 1.05, 0.1);
  addBox(0.35, 0.18, 0.35, -0.35, 0.55, roof);
  // Hangar
  const hg = new THREE.CylinderGeometry(0.38, 0.38, 1.0, 32, 1, false, -Math.PI / 2, Math.PI);
  hg.rotateX(-Math.PI / 2);
  const hangar = new THREE.Mesh(hg, roof); hangar.position.set(-1.25, 0, 0.55); hangar.rotation.y = Math.PI / 2; root.add(hangar);
  // Control center (glowing)
  const cc = addBox(0.42, 0.26, 0.32, 0.25, 0.35, new THREE.MeshStandardMaterial({ color: 0x2a3550, emissive: 0x2b4fd6, emissiveIntensity: 0.35, roughness: 0.4 }));
  // Tower
  const tower = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.04, 0.9, 12), mat.steel());
  tower.position.set(0.7, 0.45, -0.9); root.add(tower);

  // Perimeter fence
  const fw = 4.6, fd = 3.2;
  const fenceMat = new THREE.MeshStandardMaterial({ color: 0x8b93a3, roughness: 0.5, metalness: 0.6 });
  const fenceAlarmMat = new THREE.MeshBasicMaterial({ color: 0xff453a, transparent: true, opacity: 0 });
  const fence = new THREE.Group();
  const seg = (x1, z1, x2, z2) => {
    const len = Math.hypot(x2 - x1, z2 - z1);
    const rail = new THREE.Mesh(new THREE.BoxGeometry(len, 0.14, 0.008), fenceMat);
    rail.position.set((x1 + x2) / 2, 0.07, (z1 + z2) / 2);
    rail.rotation.y = -Math.atan2(z2 - z1, x2 - x1);
    rail.material.transparent = true; rail.material.opacity = 0.6;
    fence.add(rail);
    const glow = new THREE.Mesh(new THREE.BoxGeometry(len, 0.15, 0.02), fenceAlarmMat);
    glow.position.copy(rail.position); glow.rotation.copy(rail.rotation);
    fence.add(glow);
  };
  seg(-fw / 2, -fd / 2, fw / 2, -fd / 2); seg(fw / 2, -fd / 2, fw / 2, fd / 2);
  seg(fw / 2, fd / 2, -fw / 2, fd / 2); seg(-fw / 2, fd / 2, -fw / 2, -fd / 2);
  root.add(fence);

  // Sensors
  const sensors = [];
  const mkRadar = (x, z, yaw, name) => {
    const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = yaw;
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.25, 8), mat.steel()); post.position.y = 0.125;
    const box = new THREE.Mesh(RB(0.14, 0.11, 0.05, 0.01, 2), mat.olive()); box.position.set(0, 0.28, 0.0);
    const fan = radarFan({ radius: 1.5, halfAngle: Math.PI / 4.5, color: 0x5cf29a });
    g.add(post, box, fan);
    root.add(g);
    sensors.push({ type: 'radar', name, g, fan, range: 1.5, half: Math.PI / 4.5 });
  };
  const mkCam = (x, z, yaw, name) => {
    const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = yaw;
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.32, 8), mat.steel()); post.position.y = 0.16;
    const head = new THREE.Group(); head.position.y = 0.34;
    const body = new THREE.Mesh(RB(0.06, 0.06, 0.14, 0.01, 2), mat.graphite());
    head.add(body);
    const cone = new THREE.ConeGeometry(1, 1, 4, 1, true); cone.rotateY(Math.PI / 4); cone.translate(0, -0.5, 0); cone.rotateX(-Math.PI / 2);
    const fov = new THREE.Mesh(cone, beamMaterial(0x6aa8ff, 0.12, 0.6));
    fov.scale.set(0.45, 0.2, 1.3); fov.position.z = 0.07; fov.rotation.x = 0.22;
    head.add(fov);
    g.add(post, head); root.add(g);
    sensors.push({ type: 'cam', name, g, head, fov, yaw0: 0, range: 1.3 });
  };
  // Fans face local +Z; yaw θ maps it to (sin θ, cos θ). Radars look outward from corners (early warning).
  mkRadar(-fw / 2 + 0.15, fd / 2 - 0.15, Math.atan2(-fw / 2, fd / 2), 'Radar-1');
  mkRadar(fw / 2 - 0.15, -fd / 2 + 0.15, Math.atan2(fw / 2, -fd / 2), 'Radar-2');
  mkCam(-fw / 2 + 0.1, -fd / 2 + 0.1, Math.PI / 4, 'Kamera-1');
  mkCam(fw / 2 - 0.1, fd / 2 - 0.1, Math.PI + Math.PI / 4, 'Kamera-2');
  mkCam(0, fd / 2 - 0.05, Math.PI, 'Kamera-3');

  // Patrol path for intruder: approaches from outside, crosses fence, moves inside
  const intruder = new THREE.Group();
  const iDot = new THREE.Mesh(new THREE.SphereGeometry(0.045, 16, 12), new THREE.MeshBasicMaterial({ color: 0xff453a }));
  iDot.position.y = 0.05;
  const iRing = new THREE.Mesh(new THREE.RingGeometry(0.08, 0.1, 40), new THREE.MeshBasicMaterial({ color: 0xff453a, transparent: true, side: THREE.DoubleSide, depthWrite: false }));
  iRing.rotation.x = -Math.PI / 2; iRing.position.y = 0.01;
  intruder.add(iDot, iRing);
  intruder.visible = false;
  root.add(intruder);
  const path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-3.0, 0, 2.45), new THREE.Vector3(-2.6, 0, 2.0), new THREE.Vector3(-2.1, 0, 1.55),
    new THREE.Vector3(-1.6, 0, 1.1), new THREE.Vector3(-1.0, 0, 1.2), new THREE.Vector3(-0.6, 0, 1.0),
  ]);

  // Alarm pulse at position
  const pulse = new THREE.Mesh(new THREE.RingGeometry(0.1, 0.13, 48), new THREE.MeshBasicMaterial({ color: 0xff453a, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending }));
  pulse.rotation.x = -Math.PI / 2; pulse.position.y = 0.02;
  root.add(pulse);

  enableShadows(root);
  ground.castShadow = false;
  fence.traverse((o) => { o.castShadow = false; });

  // Scenario state machine
  const state = { running: false, phase: 'idle', progress: 0, alarms: 0, tracked: false };
  let emit = () => {};
  const fired = new Set();
  const local = new THREE.Vector3();
  const insideFence = (p) => Math.abs(p.x) < fw / 2 && Math.abs(p.z) < fd / 2;
  let pulseLife = 1;
  let fenceFlash = 0;

  function inCoverage(s, p) {
    local.copy(p); s.g.worldToLocal(local);
    const r = Math.hypot(local.x, local.z);
    const a = Math.atan2(local.x, local.z);
    return r < s.range && Math.abs(a) < (s.half || 0.45);
  }

  function start(onEvent) {
    emit = onEvent || (() => {});
    timers.forEach(clearTimeout); timers.length = 0;
    fired.clear();
    state.running = true; state.phase = 'approach'; state.progress = 0; state.tracked = false;
    intruder.visible = true;
    sensors.forEach((s) => { if (s.fan) s.fan.material.uniforms.uColor.value.set(0x5cf29a); });
    emit('info', 'Senaryo başladı · çevre gözetimi aktif');
  }
  function reset() {
    state.running = false; state.phase = 'idle'; intruder.visible = false; fenceFlash = 0; state.tracked = false;
    sensors.forEach((s) => {
      s.locked = false;
      if (s.fan) s.fan.material.uniforms.uColor.value.set(0x5cf29a);
      if (s.head) s.head.rotation.y = 0;
      if (s.fov) s.fov.material.uniforms.uColor.value.set(0x6aa8ff);
    });
  }

  function update(dt, t) {
    sensors.forEach((s) => s.fan && s.fan.userData.update(dt, t));
    // Idle camera patrol
    sensors.forEach((s, i) => {
      if (s.head && !(state.tracked && s.locked)) s.head.rotation.y = Math.sin(t * 0.4 + i) * 0.45;
    });
    cc.material.emissiveIntensity = 0.35 + Math.sin(t * 2) * 0.1 + (state.phase === 'alarm' ? 0.4 : 0);

    if (state.running) {
      state.progress = Math.min(1, state.progress + dt / 14);
      const p = path.getPointAt(state.progress);
      intruder.position.copy(p);
      iRing.scale.setScalar(1 + Math.sin(t * 6) * 0.15);
      const wp = intruder.getWorldPosition(new THREE.Vector3());

      sensors.forEach((s) => {
        const covered = inCoverage(s, wp);
        if (covered && s.type === 'radar' && !fired.has(s.name)) {
          fired.add(s.name);
          s.fan.material.uniforms.uColor.value.set(0xffb340);
          emit('warn', `${s.name}: hareket tespiti · insan sınıfı`);
          if (!state.tracked) {
            state.tracked = true;
            // Slew the nearest cameras onto the target
            sensors.filter((c) => c.type === 'cam').forEach((c) => { c.locked = true; });
            later(() => emit('info', 'ERİSİS: Kameralar otomatik olarak hedefe yönlendirildi'), 700);
          }
        }
      });
      if (state.tracked) {
        sensors.filter((c) => c.type === 'cam').forEach((c) => {
          local.copy(wp); c.g.worldToLocal(local);
          const want = Math.atan2(local.x, local.z);
          c.head.rotation.y += (want - c.head.rotation.y) * Math.min(1, dt * 4);
          c.fov.material.uniforms.uColor.value.set(0xffb340);
        });
      }
      if (insideFence(wp) && !fired.has('fence')) {
        fired.add('fence');
        state.phase = 'alarm'; state.alarms++;
        fenceFlash = 1; pulseLife = 0; pulse.position.set(wp.x, 0.02, wp.z);
        emit('alert', 'ALARM · Çevre ihlali — Bölge B, batı hattı');
        sensors.forEach((s) => s.fan && s.fan.material.uniforms.uColor.value.set(0xff5a4a));
        later(() => emit('info', 'Olay kaydı oluşturuldu · görüntüler arşivlendi'), 1400);
        later(() => emit('ok', 'Güvenlik ekibi bilgilendirildi · müdahale yönlendirildi'), 2600);
      }
      if (state.progress >= 1 && !fired.has('end')) {
        fired.add('end');
        later(() => { reset(); emit('done'); }, 3500);
      }
    }
    // Pulse + fence flash
    pulseLife = Math.min(1, pulseLife + dt / 1.4);
    if (pulseLife >= 1 && state.phase === 'alarm' && state.running) pulseLife = 0;
    pulse.scale.setScalar(1 + pulseLife * 6);
    pulse.material.opacity = (1 - pulseLife) * 0.8;
    fenceFlash = state.phase === 'alarm' ? 0.35 + Math.abs(Math.sin(t * 5)) * 0.4 : Math.max(0, fenceFlash - dt);
    fenceAlarmMat.opacity = fenceFlash;
  }
  const timers = [];
  function later(fn, ms) { timers.push(setTimeout(fn, ms)); }

  return {
    object: root, update, state,
    view: { pos: [0.4, 5.0, 6.3], target: [0, 0, 0.25] },
    api: { start, reset },
  };
}

export const BUILDERS = { sezgi: buildSezgi, gorsen: buildGorsen, ptp: buildPTP, tani: buildTani, erisis: buildErisis };
