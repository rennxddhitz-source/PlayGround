import * as THREE from 'three';

/* ------------------------------------------------------------------ *
 * Blacksite: Zero Hour - enemy soldiers
 * Fully procedural, shared-resource soldier models and squad AI.
 * ------------------------------------------------------------------ */

const TAU = Math.PI * 2;
const DEG = Math.PI / 180;
const UP = new THREE.Vector3(0, 1, 0);

function mulberry32(seed) {
  let a = seed >>> 0;
  return function rand() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function clamp(v, lo, hi) {
  return v < lo ? lo : v > hi ? hi : v;
}

function dampAngle(current, target, lambda, dt) {
  let delta = (target - current) % TAU;
  if (delta > Math.PI) delta -= TAU;
  if (delta < -Math.PI) delta += TAU;
  return current + delta * (1 - Math.exp(-lambda * dt));
}

function smoothstep(t) {
  t = clamp(t, 0, 1);
  return t * t * (3 - 2 * t);
}

/* ------------------------------------------------------------------ *
 * Procedural camouflage. DataTexture keeps this DOM-free.
 * ------------------------------------------------------------------ */
function makeFlashTexture() {
  const size = 32;
  const data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = ((x + 0.5) / size) * 2 - 1;
      const dy = ((y + 0.5) / size) * 2 - 1;
      const r = Math.sqrt(dx * dx + dy * dy);
      const o = (y * size + x) * 4;
      if (r >= 1) {
        data[o + 3] = 0;
      } else {
        const falloff = Math.pow(1 - r, 2.1);
        const core = Math.pow(1 - r, 7);
        data[o] = 255;
        data[o + 1] = 135 + 120 * core;
        data[o + 2] = 40 + 200 * core;
        data[o + 3] = clamp(falloff * 255, 0, 255);
      }
    }
  }
  const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.magFilter = THREE.LinearFilter;
  tex.minFilter = THREE.LinearFilter;
  tex.needsUpdate = true;
  return tex;
}

function makeVestGeometry() {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array([
    -0.175, -0.15, -0.115,
     0.175, -0.15, -0.115,
     0.175, -0.15,  0.115,
    -0.175, -0.15,  0.115,
    -0.155,  0.15, -0.105,
     0.155,  0.15, -0.105,
     0.155,  0.15,  0.105,
    -0.155,  0.15,  0.105,
  ]);
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setIndex([
    0, 1, 2, 0, 2, 3,
    4, 6, 5, 4, 7, 6,
    0, 5, 1, 0, 4, 5,
    2, 7, 3, 2, 6, 7,
    0, 3, 7, 0, 7, 4,
    1, 6, 2, 1, 5, 6,
  ]);
  geometry.computeVertexNormals();
  return geometry;
}

function makeBootGeometry() {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array([
    -0.071, -0.0775, -0.14,
     0.071, -0.0775, -0.14,
     0.071, -0.0775,  0.17,
    -0.071, -0.0775,  0.17,
    -0.060,  0.0775, -0.11,
     0.060,  0.0775, -0.11,
     0.060,  0.0775,  0.07,
    -0.060,  0.0775,  0.07,
  ]);
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setIndex([
    0, 1, 2, 0, 2, 3,
    4, 6, 5, 4, 7, 6,
    0, 5, 1, 0, 4, 5,
    2, 7, 3, 2, 6, 7,
    0, 3, 7, 0, 7, 4,
    1, 6, 2, 1, 5, 6,
  ]);
  geometry.computeVertexNormals();
  return geometry;
}

function makeCamoTexture(base, blobs, seed) {
  const size = 64;
  const data = new Uint8Array(size * size * 4);
  const rng = mulberry32(seed);

  for (let i = 0; i < size * size; i++) {
    const o = i * 4;
    data[o] = base[0];
    data[o + 1] = base[1];
    data[o + 2] = base[2];
    data[o + 3] = 255;
  }

  for (let b = 0; b < 190; b++) {
    const col = blobs[(rng() * blobs.length) | 0];
    const cx = rng() * size;
    const cy = rng() * size;
    const rx = 1.2 + rng() * 4.4;
    const ry = 1.2 + rng() * 4.4;
    const rot = rng() * Math.PI;
    const cs = Math.cos(rot);
    const sn = Math.sin(rot);
    const x0 = Math.max(0, Math.floor(cx - rx - ry));
    const x1 = Math.min(size - 1, Math.ceil(cx + rx + ry));
    const y0 = Math.max(0, Math.floor(cy - rx - ry));
    const y1 = Math.min(size - 1, Math.ceil(cy + rx + ry));

    for (let y = y0; y <= y1; y++) {
      for (let x = x0; x <= x1; x++) {
        const dx = x - cx;
        const dy = y - cy;
        const u = dx * cs + dy * sn;
        const v = -dx * sn + dy * cs;
        if ((u * u) / (rx * rx) + (v * v) / (ry * ry) <= 1) {
          const o = (y * size + x) * 4;
          data[o] = col[0];
          data[o + 1] = col[1];
          data[o + 2] = col[2];
        }
      }
    }
  }

  // Fine grain so large flat faces do not read as plastic.
  for (let i = 0; i < size * size; i++) {
    const n = (rng() - 0.5) * 12;
    const o = i * 4;
    data[o] = clamp(data[o] + n, 0, 255);
    data[o + 1] = clamp(data[o + 1] + n, 0, 255);
    data[o + 2] = clamp(data[o + 2] + n, 0, 255);
  }

  const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3.0, 3.0);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.magFilter = THREE.LinearFilter;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.generateMipmaps = true;
  tex.needsUpdate = true;
  return tex;
}

/* ------------------------------------------------------------------ *
 * Shared geometry / materials. Created once, reused by every soldier.
 * ------------------------------------------------------------------ */
let SHARED = null;

function getShared() {
  if (SHARED) return SHARED;

  const camoOlive = makeCamoTexture(
    [58, 60, 48],
    [[52, 55, 44], [66, 67, 53], [47, 50, 40], [73, 71, 56]],
    0x1a2b3c
  );
  const camoTan = makeCamoTexture(
    [76, 70, 56],
    [[68, 63, 51], [85, 78, 62], [59, 55, 45], [92, 83, 66]],
    0x51c0de
  );
  const camoGreen = makeCamoTexture(
    [46, 53, 45],
    [[40, 47, 40], [54, 62, 51], [36, 41, 35], [62, 68, 55]],
    0x7e11aa
  );

  const uniformMat = (map) =>
    new THREE.MeshStandardMaterial({
      map,
      color: 0xffffff,
      roughness: 0.94,
      metalness: 0.0,
    });

  const gearSets = [
    {
      uniform: uniformMat(camoOlive),
      vest: new THREE.MeshStandardMaterial({ color: 0x3b3d30, roughness: 0.88, metalness: 0.02 }),
      pouch: new THREE.MeshStandardMaterial({ color: 0x3f4032, roughness: 0.9 }),
      helmet: new THREE.MeshStandardMaterial({ map: camoOlive, color: 0xa8a89e, roughness: 0.82, metalness: 0.04 }),
    },
    {
      uniform: uniformMat(camoTan),
      vest: new THREE.MeshStandardMaterial({ color: 0x6b5e47, roughness: 0.9, metalness: 0.02 }),
      pouch: new THREE.MeshStandardMaterial({ color: 0x685b45, roughness: 0.92 }),
      helmet: new THREE.MeshStandardMaterial({ map: camoTan, color: 0xb0a894, roughness: 0.84, metalness: 0.04 }),
    },
    {
      uniform: uniformMat(camoGreen),
      vest: new THREE.MeshStandardMaterial({ color: 0x333d33, roughness: 0.87, metalness: 0.02 }),
      pouch: new THREE.MeshStandardMaterial({ color: 0x374236, roughness: 0.9 }),
      helmet: new THREE.MeshStandardMaterial({ map: camoGreen, color: 0x9aa397, roughness: 0.8, metalness: 0.04 }),
    },
  ];

  const mats = {
    gearSets,
    balaclava: new THREE.MeshStandardMaterial({ color: 0x1c1d19, roughness: 0.97 }),
    glove: new THREE.MeshStandardMaterial({ color: 0x24241e, roughness: 0.9 }),
    boot: new THREE.MeshStandardMaterial({ color: 0x14150f, roughness: 0.95 }),
    rubber: new THREE.MeshStandardMaterial({ color: 0x0e0f0c, roughness: 1.0 }),
    kneepad: new THREE.MeshStandardMaterial({ color: 0x20231c, roughness: 0.8 }),
    strap: new THREE.MeshStandardMaterial({ color: 0x2b2d24, roughness: 0.85 }),
    helmetRim: new THREE.MeshStandardMaterial({ color: 0x1d1f1a, roughness: 0.7, metalness: 0.15 }),
    nvg: new THREE.MeshStandardMaterial({ color: 0x191b18, roughness: 0.55, metalness: 0.35 }),
    lens: new THREE.MeshStandardMaterial({ color: 0x101511, roughness: 0.18, metalness: 0.6 }),
    rifle: new THREE.MeshStandardMaterial({ color: 0x1b1d1c, roughness: 0.42, metalness: 0.62 }),
    rifleFurniture: new THREE.MeshStandardMaterial({ color: 0x444032, roughness: 0.76, metalness: 0.14 }),
    visorAmber: new THREE.MeshStandardMaterial({
      color: 0x3a1c05,
      emissive: 0xff7a1e,
      emissiveIntensity: 1.55,
      roughness: 0.24,
      metalness: 0.45,
    }),
    visorRed: new THREE.MeshStandardMaterial({
      color: 0x350707,
      emissive: 0xff2412,
      emissiveIntensity: 1.45,
      roughness: 0.24,
      metalness: 0.45,
    }),
    patchAmber: new THREE.MeshStandardMaterial({
      color: 0x5c2a08,
      emissive: 0xff7a1e,
      emissiveIntensity: 0.24,
      roughness: 0.7,
    }),
    patchRed: new THREE.MeshStandardMaterial({
      color: 0x4a0e09,
      emissive: 0xd92b17,
      emissiveIntensity: 0.20,
      roughness: 0.7,
    }),
    flash: new THREE.SpriteMaterial({
      map: makeFlashTexture(),
      color: 0xffd9a0,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    }),
  };

  const geo = {
    pelvis: new THREE.BoxGeometry(0.285, 0.17, 0.195),
    torso: new THREE.CapsuleGeometry(0.155, 0.15, 6, 14),
    vest: makeVestGeometry(),
    pouch: new THREE.BoxGeometry(0.085, 0.105, 0.048),
    belt: new THREE.BoxGeometry(0.315, 0.062, 0.22),
    backpack: new THREE.BoxGeometry(0.235, 0.25, 0.13),
    strap: new THREE.BoxGeometry(0.068, 0.21, 0.05),
    holster: new THREE.BoxGeometry(0.075, 0.16, 0.065),
    thigh: new THREE.CapsuleGeometry(0.10, 0.205, 5, 10),
    shin: new THREE.CapsuleGeometry(0.078, 0.185, 5, 10),
    boot: makeBootGeometry(),
    knee: new THREE.BoxGeometry(0.14, 0.125, 0.055),
    upperArm: new THREE.CapsuleGeometry(0.061, 0.17, 5, 9),
    forearm: new THREE.CapsuleGeometry(0.053, 0.165, 5, 9),
    hand: new THREE.BoxGeometry(0.075, 0.095, 0.09),
    shoulderPad: new THREE.SphereGeometry(0.082, 10, 7),
    neck: new THREE.CylinderGeometry(0.055, 0.062, 0.11, 8),
    head: new THREE.SphereGeometry(0.115, 16, 12),
    helmet: new THREE.SphereGeometry(0.138, 16, 9, 0, TAU, 0, Math.PI * 0.58),
    helmetRim: new THREE.TorusGeometry(0.131, 0.010, 5, 18),
    nvgMount: new THREE.BoxGeometry(0.052, 0.055, 0.05),
    nvgTube: new THREE.CylinderGeometry(0.026, 0.029, 0.075, 8),
    visor: new THREE.BoxGeometry(0.14, 0.029, 0.032),
    patch: new THREE.BoxGeometry(0.045, 0.055, 0.012),
    receiver: new THREE.BoxGeometry(0.07, 0.095, 0.30),
    handguard: new THREE.BoxGeometry(0.066, 0.08, 0.21),
    barrel: new THREE.CylinderGeometry(0.017, 0.017, 0.19, 7),
    stock: new THREE.BoxGeometry(0.058, 0.085, 0.17),
    magazine: new THREE.BoxGeometry(0.05, 0.145, 0.085),
    grip: new THREE.BoxGeometry(0.044, 0.10, 0.06),
    sight: new THREE.BoxGeometry(0.05, 0.052, 0.11),
  };

  SHARED = { geo, mats };
  return SHARED;
}

/* ------------------------------------------------------------------ *
 * Procedural soldier. Model faces +Z. Feet sit at y = 0.
 * 44 meshes maximum, shared geometry and materials.
 * ------------------------------------------------------------------ */
function buildSoldier(seed, variantIndex) {
  const { geo, mats } = getShared();
  const rng = mulberry32(seed);
  const gear = mats.gearSets[variantIndex % mats.gearSets.length];

  const group = new THREE.Group();
  group.name = 'soldier';
  const rig = new THREE.Group();
  group.add(rig);

  const heightScale = 0.955 + rng() * 0.085;
  const widthScale = 0.95 + rng() * 0.10;
  rig.scale.set(widthScale, heightScale, widthScale);

  const add = (parent, geometry, material, x, y, z, name) => {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    if (name) mesh.name = name;
    parent.add(mesh);
    return mesh;
  };

  const markMajor = (mesh) => {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  };

  /* ---------------- hips and legs ---------------- */
  const hips = new THREE.Group();
  hips.position.y = 0.94;
  rig.add(hips);

  markMajor(add(hips, geo.pelvis, gear.uniform, 0, 0.03, 0, 'pelvis'));
  const belt = add(hips, geo.belt, mats.strap, 0, 0.075, 0, 'belt');
  belt.castShadow = false;

  const legs = [];
  for (let side = -1; side <= 1; side += 2) {
    const leg = new THREE.Group();
    leg.position.set(side * 0.105, 0.94, 0);
    rig.add(leg);

    const thigh = markMajor(add(leg, geo.thigh, gear.uniform, 0, -0.21, 0, side < 0 ? 'thighL' : 'thighR'));
    thigh.scale.set(1.02, 1.0, 0.96);

    const knee = new THREE.Group();
    knee.position.y = -0.42;
    knee.rotation.x = 0.035;
    leg.add(knee);

    const shin = markMajor(add(knee, geo.shin, gear.uniform, 0, -0.175, 0, side < 0 ? 'shinL' : 'shinR'));
    shin.scale.set(1.0, 1.0, 0.98);
    markMajor(add(knee, geo.knee, mats.kneepad, 0, 0.005, 0.082, 'kneePad'));
    const boot = markMajor(add(knee, geo.boot, mats.boot, 0, -0.4425, 0.047, 'boot'));
    boot.rotation.x = -0.015;

    if (side > 0) {
      const holster = add(leg, geo.holster, mats.strap, 0.098, -0.25, 0.015, 'holster');
      holster.rotation.z = -0.08;
    }

    legs.push({ side, group: leg, knee, thigh, shin });
  }

  /* ---------------- torso / armour ---------------- */
  const torso = new THREE.Group();
  torso.position.y = 0.94;
  rig.add(torso);

  const chest = markMajor(add(torso, geo.torso, gear.uniform, 0, 0.30, 0, 'torso'));
  chest.scale.set(1.12, 1.0, 0.79);

  const vest = markMajor(add(torso, geo.vest, gear.vest, 0, 0.29, 0.008, 'plateCarrier'));
  vest.scale.set(1.02, 1.0, 1.0);
  vest.rotation.x = -0.015;

  // Three front pouches read as a plate-carrier loadout at distance.
  for (let i = -1; i <= 1; i++) {
    const pouch = add(torso, geo.pouch, gear.pouch, i * 0.095, 0.205, 0.142, 'pouch');
    pouch.rotation.x = -0.04;
    pouch.castShadow = false;
  }

  for (let side = -1; side <= 1; side += 2) {
    const strap = add(torso, geo.strap, mats.strap, side * 0.118, 0.425, 0.035, 'vestStrap');
    strap.rotation.z = side * 0.10;
    strap.rotation.x = -0.10;
    strap.castShadow = false;
  }

  const pack = markMajor(add(torso, geo.backpack, gear.vest, 0, 0.31, -0.205, 'backpack'));
  pack.scale.set(0.95, 1.0, 1.0);

  markMajor(add(torso, geo.neck, mats.balaclava, 0, 0.555, 0, 'neck'));

  /* ---------------- arms ---------------- */
  const arms = [];
  for (let side = -1; side <= 1; side += 2) {
    const arm = new THREE.Group();
    arm.position.set(side * 0.215, 0.45, 0.012);
    torso.add(arm);

    const pad = markMajor(add(arm, geo.shoulderPad, gear.vest, 0, -0.012, 0, 'shoulderPad'));
    pad.scale.set(0.82, 0.62, 0.95);

    const upper = markMajor(add(arm, geo.upperArm, gear.uniform, 0, -0.147, 0, side < 0 ? 'upperArmL' : 'upperArmR'));
    upper.scale.set(1.0, 1.0, 1.0);

    const elbow = new THREE.Group();
    elbow.position.y = -0.294;
    arm.add(elbow);

    markMajor(add(elbow, geo.forearm, gear.uniform, 0, -0.14, 0, side < 0 ? 'forearmL' : 'forearmR'));
    markMajor(add(elbow, geo.hand, mats.glove, 0, -0.285, 0.018, side < 0 ? 'handL' : 'handR'));

    const patch = add(arm, geo.patch, mats.patchAmber, side * 0.062, -0.105, 0.002, 'patch');
    patch.rotation.y = Math.PI * 0.5;
    patch.scale.set(0.82, 0.82, 1.0);
    patch.castShadow = false;

    arms.push({ side, group: arm, elbow, upper, hand: elbow.children[1], patch });
  }

  // Base aiming pose: elbows in, forearms forward at chest level.
  const rightArm = arms[1];
  const leftArm = arms[0];
  rightArm.group.rotation.set(-0.55, 0.02, -0.18);
  rightArm.elbow.rotation.set(-0.90, 0.0, 0.02);
  leftArm.group.rotation.set(-0.75, -0.02, 0.18);
  leftArm.elbow.rotation.set(-0.75, 0.0, -0.02);

  /* ---------------- head / helmet ---------------- */
  const headGroup = new THREE.Group();
  headGroup.position.y = 0.58;
  headGroup.userData.part = 'head';
  torso.add(headGroup);

  const head = add(headGroup, geo.head, mats.balaclava, 0, 0.085, 0.008, 'head');
  head.scale.set(0.94, 1.04, 0.96);
  head.castShadow = true;
  head.userData.part = 'head';

  const helmet = add(headGroup, geo.helmet, gear.helmet, 0, 0.118, 0, 'helmet');
  helmet.scale.set(1.0, 0.84, 1.02);
  helmet.castShadow = true;
  helmet.userData.part = 'head';

  const rim = add(headGroup, geo.helmetRim, mats.helmetRim, 0, 0.105, 0, 'helmetRim');
  rim.rotation.x = Math.PI * 0.5;
  rim.scale.set(1.0, 1.0, 1.04);
  rim.castShadow = false;
  rim.userData.part = 'head';

  const mount = add(headGroup, geo.nvgMount, mats.nvg, 0, 0.176, 0.118, 'nvgMount');
  mount.userData.part = 'head';
  const tube = add(headGroup, geo.nvgTube, mats.lens, 0, 0.181, 0.158, 'nvgTube');
  tube.rotation.x = Math.PI * 0.5;
  tube.userData.part = 'head';

  const visor = add(headGroup, geo.visor, rng() < 0.58 ? mats.visorAmber : mats.visorRed, 0, 0.105, 0.126, 'visor');
  visor.rotation.x = -0.04;
  visor.castShadow = false;
  visor.userData.part = 'head';

  // Slight head/helmet proportion variation.
  headGroup.scale.set(0.96 + rng() * 0.08, 0.97 + rng() * 0.06, 0.96 + rng() * 0.08);

  /* ---------------- rifle ---------------- */
  const weapon = new THREE.Group();
  weapon.position.set(0.055, 0.27, 0.285);
  weapon.rotation.set(0.015, -0.12, 0.0);
  torso.add(weapon);

  const receiver = add(weapon, geo.receiver, mats.rifle, 0, 0, 0, 'receiver');
  const handguard = add(weapon, geo.handguard, mats.rifleFurniture, 0, 0.002, 0.245, 'handguard');
  const barrel = add(weapon, geo.barrel, mats.rifle, 0, 0.004, 0.435, 'barrel');
  barrel.rotation.x = Math.PI * 0.5;
  const stock = add(weapon, geo.stock, mats.rifleFurniture, 0, -0.006, -0.232, 'stock');
  const mag = add(weapon, geo.magazine, mats.rifle, 0, -0.105, 0.055, 'magazine');
  mag.rotation.x = 0.28;
  const grip = add(weapon, geo.grip, mats.rifleFurniture, 0, -0.088, -0.085, 'grip');
  grip.rotation.x = -0.16;
  const sight = add(weapon, geo.sight, mats.lens, 0, 0.074, 0.025, 'sight');

  const flash = new THREE.Sprite(mats.flash);
  flash.name = 'muzzleFlash';
  flash.position.set(0, 0.004, 0.552);
  flash.scale.set(0.24, 0.24, 1);
  flash.visible = false;
  flash.userData.ignoreHit = true;
  weapon.add(flash);

  weapon.traverse((o) => {
    if (o.isMesh) {
      o.castShadow = true;
      o.receiveShadow = false;
      o.userData.ignoreHit = true;
    }
  });
  receiver.castShadow = true;
  handguard.castShadow = true;
  barrel.castShadow = true;
  stock.castShadow = true;
  mag.castShadow = true;
  grip.castShadow = true;
  sight.castShadow = true;

  // Per-enemy accent variation.
  const patchMat = rng() < 0.5 ? mats.patchAmber : mats.patchRed;
  arms[0].patch.material = patchMat;
  arms[1].patch.material = patchMat;

  // Keep the backpack on roughly 70% of soldiers.
  if (rng() < 0.3) pack.visible = false;

  return {
    group,
    rig,
    torso,
    hips,
    headGroup,
    head,
    helmet,
    visor,
    chest,
    vest,
    weapon,
    flash,
    arms,
    legs,
    parts: {
      head,
      torso: chest,
      vest,
      pelvis: hips.children[0],
      helmet,
      visor,
      weapon,
      flash,
      leftArm: leftArm.group,
      rightArm: rightArm.group,
      leftLeg: legs[0].group,
      rightLeg: legs[1].group,
    },
  };
}

/* ------------------------------------------------------------------ *
 * Collision helpers. The supplied world.collide is preferred; these
 * are safe fallbacks for previews and partial worlds.
 * ------------------------------------------------------------------ */
function pointBlocked(x, z, radius, colliders) {
  for (let i = 0; i < colliders.length; i++) {
    const c = colliders[i];
    if (
      x > c.minX - radius &&
      x < c.maxX + radius &&
      z > c.minZ - radius &&
      z < c.maxZ + radius
    ) {
      return true;
    }
  }
  return false;
}

function fallbackCollide(position, radius, colliders) {
  for (let pass = 0; pass < 2; pass++) {
    for (let i = 0; i < colliders.length; i++) {
      const c = colliders[i];
      if (
        position.x > c.minX - radius &&
        position.x < c.maxX + radius &&
        position.z > c.minZ - radius &&
        position.z < c.maxZ + radius
      ) {
        const pushLeft = position.x - (c.minX - radius);
        const pushRight = c.maxX + radius - position.x;
        const pushBack = position.z - (c.minZ - radius);
        const pushFront = c.maxZ + radius - position.z;
        const m = Math.min(pushLeft, pushRight, pushBack, pushFront);
        if (m === pushLeft) position.x = c.minX - radius;
        else if (m === pushRight) position.x = c.maxX + radius;
        else if (m === pushBack) position.z = c.minZ - radius;
        else position.z = c.maxZ + radius;
      }
    }
  }
}

const _v1 = new THREE.Vector3();
const _v2 = new THREE.Vector3();
const _v3 = new THREE.Vector3();
const _v4 = new THREE.Vector3();
const _v5 = new THREE.Vector3();
const _muzzle = new THREE.Vector3();
const _eye = new THREE.Vector3();
const _toPlayer = new THREE.Vector3();
const _desired = new THREE.Vector3();
const _chosen = new THREE.Vector3();
const _separation = new THREE.Vector3();

export class EnemyManager {
  constructor(scene, config = {}) {
    this.scene = scene;
    this.config = config || {};
    this.world = this.config.world || {};
    this.spawnPoints = Array.isArray(this.config.spawnPoints) ? this.config.spawnPoints : [];
    this.onPlayerDamage = typeof this.config.onPlayerDamage === 'function' ? this.config.onPlayerDamage : () => {};
    this.onKill = typeof this.config.onKill === 'function' ? this.config.onKill : () => {};
    this.onEnemyShoot = typeof this.config.onEnemyShoot === 'function' ? this.config.onEnemyShoot : () => {};
    this.onImpact = typeof this.config.onImpact === 'function' ? this.config.onImpact : () => {};

    this._enemies = [];
    this._targets = [];
    this._spawnQueue = [];
    this._waveNumber = 0;
    this._nextId = 1;
    this._elapsed = 0;
    this._playerPosition = new THREE.Vector3();
    this._hasPlayerPosition = false;

    this._raycaster = new THREE.Raycaster();
    this._raycaster.far = 100;
    this._muzzleLights = [];
    this._muzzleLightCursor = 0;
    this._createMuzzleLights();
  }

  /* ---------------------------- public API ---------------------------- */

  get aliveCount() {
    let n = 0;
    for (let i = 0; i < this._enemies.length; i++) {
      if (this._enemies[i].alive) n++;
    }
    return n;
  }

  get waveNumber() {
    return this._waveNumber;
  }

  getTargets() {
    return this._targets;
  }

  spawnWave(count) {
    this._waveNumber++;

    const supplied = Number.isFinite(count);
    const base = supplied ? Math.max(0, Math.floor(count)) : 4 + this._waveNumber * 2;
    const waveBonus = Math.min(3, Math.floor((this._waveNumber - 1) / 2));
    const total = base > 0 ? base + waveBonus : 0;
    if (total <= 0) return 0;

    const window = 2.0;
    for (let i = 0; i < total; i++) {
      const t = total === 1 ? 0 : (i / (total - 1)) * window;
      this._spawnQueue.push({
        delay: t + (i === 0 ? 0 : Math.random() * 0.07),
        wave: this._waveNumber,
      });
    }
    return total;
  }

  reset() {
    for (let i = 0; i < this._enemies.length; i++) {
      const enemy = this._enemies[i];
      if (enemy.group && enemy.group.parent) enemy.group.parent.remove(enemy.group);
      this._disposeDeathMaterials(enemy);
    }
    this._enemies.length = 0;
    this._targets.length = 0;
    this._spawnQueue.length = 0;
    this._waveNumber = 0;
    this._nextId = 1;
    this._elapsed = 0;
    for (let i = 0; i < this._muzzleLights.length; i++) {
      const entry = this._muzzleLights[i];
      entry.life = 0;
      entry.light.intensity = 0;
    }
  }

  damage(enemy, part, amount) {
    if (!enemy || !enemy.alive) return;
    enemy.lastHitPart = part;
    enemy.flinch = Math.min(1.25, enemy.flinch + 0.8);
    enemy.flinchDir = Math.random() < 0.5 ? -1 : 1;

    if (part === 'head') {
      enemy.health = 0;
      this._kill(enemy, true);
      return;
    }

    const dmg = Number.isFinite(amount) ? Math.max(0, amount) : 34;
    enemy.health -= dmg;
    if (enemy.health <= 0) {
      enemy.health = 0;
      this._kill(enemy, false);
    }
  }

  /* --------------------------- spawning --------------------------- */

  _createMuzzleLights() {
    if (!this.scene) return;
    for (let i = 0; i < 2; i++) {
      const light = new THREE.PointLight(0xffa04a, 0, 7, 2);
      light.name = 'enemyMuzzleLight';
      light.castShadow = false;
      this.scene.add(light);
      this._muzzleLights.push({ light, life: 0 });
    }
  }

  _processSpawnQueue(dt) {
    for (let i = this._spawnQueue.length - 1; i >= 0; i--) {
      const entry = this._spawnQueue[i];
      entry.delay -= dt;
      if (entry.delay <= 0) {
        this._spawnQueue.splice(i, 1);
        this._spawnOne(entry.wave);
      }
    }
  }

  _spawnOne(wave) {
    const position = this._pickSpawnPosition();
    const variant = (Math.random() * 3) | 0;
    const seed = ((Math.random() * 0x7fffffff) | 0) ^ (wave * 7919) ^ (this._nextId * 104729);
    const model = buildSoldier(seed, variant);

    const enemy = {
      id: this._nextId++,
      group: model.group,
      rig: model.rig,
      model,
      parts: model.parts,
      position: position.clone(),
      baseY: position.y,
      velocity: new THREE.Vector3(),
      health: 100,
      maxHealth: 100,
      alive: true,
      removed: false,
      wave,
      aggression: 1 + (wave - 1) * 0.045,
      speedBase: 1.95 + Math.random() * 0.5,
      yaw: Math.random() * TAU,
      walkPhase: Math.random() * TAU,
      phase: Math.random() * TAU,
      time: Math.random() * 12,
      distance: 99,
      hasLOS: false,
      losTimer: Math.random() * 0.3,
      strafeDir: Math.random() < 0.5 ? -1 : 1,
      strafeTimer: 1.4 + Math.random() * 2.4,
      repositionTimer: 0,
      repositionCooldown: 3.5 + Math.random() * 3.5,
      fireCooldown: 0.75 + Math.random() * 1.5,
      burstShots: 0,
      shotTimer: 0,
      flashTimer: 0,
      recoil: 0,
      flinch: 0,
      flinchDir: 1,
      aimBlend: 0.55,
      animSpeed: 0,
      deathTime: 0,
      deathSide: Math.random() < 0.5 ? -1 : 1,
      deathTwist: (Math.random() - 0.5) * 0.45,
      deathMaterials: null,
      deathFadeStarted: false,
      lastHitPart: null,
    };

    enemy.group.position.copy(enemy.position);
    enemy.group.rotation.y = enemy.yaw;

    const hitMeshes = [];
    model.group.traverse((o) => {
      if (o.isMesh && !o.userData.ignoreHit) {
        o.userData.enemy = enemy;
        if (o.userData.part !== 'head') o.userData.part = 'body';
        hitMeshes.push(o);
      }
    });
    enemy.hitMeshes = hitMeshes;

    if (this.scene) this.scene.add(enemy.group);
    this._enemies.push(enemy);
    for (let i = 0; i < hitMeshes.length; i++) this._targets.push(hitMeshes[i]);
  }

  _pickSpawnPosition() {
    const points = this.spawnPoints;
    const colliders = this.world.colliders || [];
    let best = null;
    let bestScore = -Infinity;

    for (let attempt = 0; attempt < 8; attempt++) {
      let bx;
      let bz;
      let by = 0;
      if (points.length > 0) {
        const p = points[(Math.random() * points.length) | 0];
        bx = p.x + (Math.random() - 0.5) * 3.2;
        bz = p.z + (Math.random() - 0.5) * 3.2;
        by = p.y || 0;
      } else {
        const a = Math.random() * TAU;
        const r = 17 + Math.random() * 6;
        bx = Math.cos(a) * r;
        bz = Math.sin(a) * r;
      }

      const pos = new THREE.Vector3(bx, by, bz);
      this._collide(pos, 0.38);

      let score = Infinity;
      for (let i = 0; i < this._enemies.length; i++) {
        const e = this._enemies[i];
        if (!e.alive) continue;
        const dx = e.position.x - pos.x;
        const dz = e.position.z - pos.z;
        score = Math.min(score, Math.sqrt(dx * dx + dz * dz));
      }
      if (this._hasPlayerPosition) {
        const dx = this._playerPosition.x - pos.x;
        const dz = this._playerPosition.z - pos.z;
        const playerDist = Math.sqrt(dx * dx + dz * dz);
        if (playerDist < 7) score -= 10;
      }

      // Prefer clear points but never fail to return a position.
      if (!pointBlocked(pos.x, pos.z, 0.36, colliders)) score += 4;
      if (score > bestScore) {
        bestScore = score;
        best = pos;
      }
      if (score > 6) break;
    }

    return best || new THREE.Vector3(0, 0, 18);
  }

  _collide(position, radius) {
    if (typeof this.world.collide === 'function') {
      this.world.collide(position, radius);
    } else {
      fallbackCollide(position, radius, this.world.colliders || []);
    }
  }

  _kill(enemy, headshot) {
    if (!enemy.alive) return;
    enemy.alive = false;
    enemy.health = 0;
    enemy.deathTime = 0;
    enemy.burstShots = 0;
    enemy.flashTimer = 0;
    enemy.model.flash.visible = false;
    enemy.model.weapon.visible = true;

    this._targets = this._targets.filter((m) => m.userData.enemy !== enemy);
    this._cloneDeathMaterials(enemy);
    this.onKill(enemy, headshot);
  }

  _cloneDeathMaterials(enemy) {
    const clones = new Map();
    enemy.group.traverse((o) => {
      if (!o.isMesh) return;
      const original = o.material;
      if (!original) return;
      let clone = clones.get(original);
      if (!clone) {
        clone = original.clone();
        clone.transparent = false;
        clone.opacity = 1;
        clones.set(original, clone);
      }
      o.material = clone;
    });
    enemy.deathMaterials = Array.from(clones.values());
  }

  _disposeDeathMaterials(enemy) {
    if (!enemy.deathMaterials) return;
    for (let i = 0; i < enemy.deathMaterials.length; i++) {
      enemy.deathMaterials[i].dispose();
    }
    enemy.deathMaterials = null;
  }

  /* ----------------------------- update ----------------------------- */

  update(dt, playerPosition, playerCamera) {
    dt = Number.isFinite(dt) ? clamp(dt, 0, 0.1) : 0;
    if (dt <= 0) return;

    this._elapsed += dt;

    if (playerPosition && Number.isFinite(playerPosition.x)) {
      this._playerPosition.copy(playerPosition);
      this._hasPlayerPosition = true;
    } else if (!this._hasPlayerPosition) {
      this._playerPosition.set(0, 0, 0);
    }

    if (playerCamera && playerCamera.position) {
      _eye.copy(playerCamera.position);
    } else {
      _eye.copy(this._playerPosition);
      _eye.y += 1.6;
    }

    this._processSpawnQueue(dt);
    this._updateMuzzleLights(dt);

    let needsFilter = false;
    for (let i = 0; i < this._enemies.length; i++) {
      const enemy = this._enemies[i];
      if (enemy.removed) {
        needsFilter = true;
        continue;
      }
      if (!enemy.alive) {
        this._updateDeath(enemy, dt);
        if (enemy.removed) needsFilter = true;
        continue;
      }
      enemy.time += dt;
      this._updateEnemy(enemy, dt, this._playerPosition, _eye);
    }

    if (needsFilter) {
      this._enemies = this._enemies.filter((e) => !e.removed);
    }
  }

  _updateEnemy(enemy, dt, playerPos, playerEye) {
    const dx = playerPos.x - enemy.position.x;
    const dz = playerPos.z - enemy.position.z;
    const dist = Math.sqrt(dx * dx + dz * dz);
    enemy.distance = dist;

    const targetYaw = Math.atan2(dx, dz);
    enemy.yaw = dampAngle(enemy.yaw, targetYaw, 9.0, dt);
    enemy.group.rotation.y = enemy.yaw;

    enemy.losTimer -= dt;
    if (enemy.losTimer <= 0) {
      enemy.hasLOS = this._hasLineOfSight(enemy, playerEye);
      enemy.losTimer = 0.22 + Math.random() * 0.20;
    }

    /* ---- steering ---- */
    const desired = _desired.set(0, 0, 0);
    const hasLos = enemy.hasLOS;

    if (dist > 16 || (!hasLos && dist > 6.5)) {
      desired.set(dx, 0, dz);
      if (desired.lengthSq() > 0.0001) desired.normalize();
      // A little lateral movement while closing keeps the advance readable.
      const lateral = _v1.set(dz, 0, -dx);
      if (lateral.lengthSq() > 0.0001) {
        lateral.normalize().multiplyScalar(enemy.strafeDir * 0.18);
        desired.add(lateral);
      }
    } else if (dist < 8) {
      desired.set(-dx, 0, -dz);
      if (desired.lengthSq() > 0.0001) desired.normalize();
      const lateral = _v1.set(dz, 0, -dx);
      if (lateral.lengthSq() > 0.0001) {
        lateral.normalize().multiplyScalar(enemy.strafeDir * 0.45);
        desired.add(lateral);
      }
    } else {
      const strafe = _v1.set(dz, 0, -dx);
      if (strafe.lengthSq() > 0.0001) {
        strafe.normalize().multiplyScalar(enemy.strafeDir);
      }
      const radial = _v2.set(dx, 0, dz);
      if (radial.lengthSq() > 0.0001) {
        radial.normalize().multiplyScalar(clamp((dist - 12) * 0.07, -0.35, 0.35));
      }
      desired.copy(strafe).add(radial);
      if (enemy.repositionTimer > 0) {
        const toward = _v3.set(dx, 0, dz);
        if (toward.lengthSq() > 0.0001) {
          toward.normalize().multiplyScalar(dist > 12 ? 0.85 : -0.6);
          desired.add(toward);
        }
      }
    }

    // Separation from squadmates and the player.
    _separation.set(0, 0, 0);
    for (let i = 0; i < this._enemies.length; i++) {
      const other = this._enemies[i];
      if (other === enemy || !other.alive) continue;
      const ox = enemy.position.x - other.position.x;
      const oz = enemy.position.z - other.position.z;
      const d2 = ox * ox + oz * oz;
      if (d2 < 2.56 && d2 > 0.0001) {
        const d = Math.sqrt(d2);
        const push = (1.6 - d) / 1.6;
        _separation.x += (ox / d) * push;
        _separation.z += (oz / d) * push;
      }
    }
    if (dist < 2.2 && dist > 0.001) {
      _separation.x -= (dx / dist) * 0.9;
      _separation.z -= (dz / dist) * 0.9;
    }
    desired.addScaledVector(_separation, 0.85);
    desired.y = 0;
    if (desired.lengthSq() > 0.0001) desired.normalize();

    const chosen = this._avoidObstacles(enemy.position, desired, 0.42, 1.15);

    /* ---- speed ---- */
    let targetSpeed;
    if (dist > 16) {
      targetSpeed = enemy.speedBase * 1.05 * enemy.aggression;
      if (dist > 28) targetSpeed *= 1.12;
    } else if (dist < 8) {
      targetSpeed = 1.45 + (8 - dist) * 0.06;
    } else {
      targetSpeed = 1.25 + 0.15 * enemy.aggression;
      if (!hasLos) targetSpeed = enemy.speedBase * enemy.aggression;
    }
    if (enemy.repositionTimer > 0) targetSpeed *= 1.12;

    const blend = 1 - Math.exp(-7.0 * dt);
    enemy.velocity.x += (chosen.x * targetSpeed - enemy.velocity.x) * blend;
    enemy.velocity.z += (chosen.z * targetSpeed - enemy.velocity.z) * blend;

    const prevX = enemy.position.x;
    const prevZ = enemy.position.z;
    enemy.position.x += enemy.velocity.x * dt;
    enemy.position.z += enemy.velocity.z * dt;
    this._collide(enemy.position, 0.38);
    enemy.position.y = enemy.baseY;

    const movedX = enemy.position.x - prevX;
    const movedZ = enemy.position.z - prevZ;
    const actualSpeed = Math.sqrt(movedX * movedX + movedZ * movedZ) / dt;
    enemy.animSpeed += (Math.min(actualSpeed, 4.0) - enemy.animSpeed) * (1 - Math.exp(-10 * dt));
    enemy.group.position.copy(enemy.position);

    /* ---- combat rhythm ---- */
    enemy.strafeTimer -= dt;
    if (enemy.strafeTimer <= 0) {
      enemy.strafeDir *= -1;
      enemy.strafeTimer = 1.5 + Math.random() * 2.5;
    }

    enemy.repositionCooldown -= dt;
    if (enemy.repositionCooldown <= 0 && dist < 26 && hasLos) {
      enemy.repositionTimer = 0.65 + Math.random() * 0.9;
      enemy.repositionCooldown = 3.2 + Math.random() * 4.0;
      enemy.strafeDir *= -1;
    }
    enemy.repositionTimer = Math.max(0, enemy.repositionTimer - dt);

    const aimTarget = hasLos && dist < 34 ? 1.0 : dist < 12 ? 0.9 : 0.35;
    enemy.aimBlend += (aimTarget - enemy.aimBlend) * (1 - Math.exp(-3.2 * dt));

    this._updateCombat(enemy, dt, playerEye, dist);
    this._animateAlive(enemy, dt);
  }

  _avoidObstacles(position, desired, radius, lookahead) {
    if (desired.lengthSq() < 0.0001) return _chosen.set(0, 0, 0);
    const colliders = this.world.colliders || [];
    if (!colliders.length) return _chosen.copy(desired).normalize();

    const angles = [0, 35 * DEG, -35 * DEG, 70 * DEG, -70 * DEG];
    for (let i = 0; i < angles.length; i++) {
      _v4.copy(desired).applyAxisAngle(UP, angles[i]);
      let clear = true;
      const steps = [0.55, lookahead];
      for (let s = 0; s < steps.length; s++) {
        const step = steps[s];
        if (
          pointBlocked(
            position.x + _v4.x * step,
            position.z + _v4.z * step,
            radius,
            colliders
          )
        ) {
          clear = false;
          break;
        }
      }
      if (clear) return _chosen.copy(_v4).normalize();
    }
    return _chosen.copy(desired).normalize();
  }

  _hasLineOfSight(enemy, playerEye) {
    const meshes = this.world.raycastMeshes;
    if (!Array.isArray(meshes) || meshes.length === 0) return true;

    _v1.set(enemy.position.x, enemy.position.y + 1.35, enemy.position.z);
    _v2.copy(playerEye).sub(_v1);
    const dist = _v2.length();
    if (dist < 0.1) return true;
    _v2.multiplyScalar(1 / dist);

    this._raycaster.set(_v1, _v2);
    this._raycaster.far = Math.max(0.1, dist - 0.4);
    const hits = this._raycaster.intersectObjects(meshes, true);
    return hits.length === 0;
  }

  /* ----------------------------- combat ----------------------------- */

  _updateCombat(enemy, dt, playerEye, dist) {
    enemy.flashTimer = Math.max(0, enemy.flashTimer - dt);
    if (enemy.flashTimer <= 0) enemy.model.flash.visible = false;
    enemy.recoil = Math.max(0, enemy.recoil - dt * 14);
    enemy.fireCooldown -= dt;

    if (enemy.burstShots > 0) {
      if (!enemy.hasLOS || dist > 42) {
        enemy.burstShots = 0;
        enemy.fireCooldown = Math.max(enemy.fireCooldown, 0.35);
        return;
      }
      enemy.shotTimer -= dt;
      if (enemy.shotTimer <= 0) {
        this._fireShot(enemy, playerEye, dist);
        enemy.burstShots--;
        enemy.shotTimer = 0.095 + Math.random() * 0.06;
      }
    } else if (enemy.fireCooldown <= 0 && enemy.hasLOS && dist < 40) {
      enemy.burstShots = 2 + ((Math.random() * 3) | 0);
      enemy.shotTimer = 0.01 + Math.random() * 0.035;
      const rate = 1.0 + Math.random() * 1.2;
      enemy.fireCooldown = rate / Math.min(1.16, enemy.aggression);
    }
  }

  _fireShot(enemy, playerEye, dist) {
    enemy.flashTimer = 0.055;
    enemy.recoil = 1;

    const flash = enemy.model.flash;
    flash.visible = true;
    flash.scale.setScalar(0.18 + Math.random() * 0.11);
    flash.getWorldPosition(_muzzle);
    this._flashMuzzle(_muzzle);

    const distFactor = clamp((dist - 6) / 20, 0, 1);
    const hitChance = clamp(
      0.36 - distFactor * 0.10 + (enemy.aggression - 1) * 0.05,
      0.22,
      0.36
    );
    const hit = Math.random() < hitChance;

    const to = _v1.copy(playerEye);
    if (hit) {
      to.x += (Math.random() - 0.5) * 0.22;
      to.y += (Math.random() - 0.5) * 0.16;
      to.z += (Math.random() - 0.5) * 0.22;
    } else {
      // Deliberately visible misses: pass near the player, not through them.
      const dir = _v2.copy(playerEye).sub(_muzzle);
      if (dir.lengthSq() > 0.0001) dir.normalize();
      const perp = _v3.set(-dir.z, 0, dir.x);
      const side = Math.random() < 0.5 ? -1 : 1;
      const magnitude = 0.55 + Math.random() * 1.75;
      to.copy(playerEye)
        .addScaledVector(perp, side * magnitude)
        .addScaledVector(UP, (Math.random() - 0.35) * 1.0)
        .addScaledVector(dir, 0.5 + Math.random() * 3.0);

      const impact = this._findImpact(_muzzle, to);
      if (impact) {
        to.copy(impact.point);
        this.onImpact(impact.point, impact.normal);
      }
    }

    this.onEnemyShoot(_muzzle.clone(), to.clone());

    if (hit) {
      const damage = 5 + Math.random() * 4;
      const source = _v4.copy(enemy.position);
      source.y += 1.2;
      this.onPlayerDamage(damage, source.clone());
    }
  }

  _findImpact(from, to) {
    const meshes = this.world.raycastMeshes;
    if (!Array.isArray(meshes) || meshes.length === 0) return null;

    const dir = _v5.copy(to).sub(from);
    const len = dir.length();
    if (len < 0.05) return null;
    dir.multiplyScalar(1 / len);

    this._raycaster.set(from, dir);
    this._raycaster.far = len;
    const hits = this._raycaster.intersectObjects(meshes, true);
    if (hits.length === 0) return null;

    const hit = hits[0];
    const normal = new THREE.Vector3(0, 1, 0);
    if (hit.face && hit.face.normal) {
      normal.copy(hit.face.normal).transformDirection(hit.object.matrixWorld).normalize();
    }
    return { point: hit.point.clone(), normal };
  }

  _flashMuzzle(position) {
    if (this._muzzleLights.length === 0) return;
    const index = this._muzzleLightCursor % this._muzzleLights.length;
    this._muzzleLightCursor++;
    const entry = this._muzzleLights[index];
    entry.light.position.copy(position);
    entry.light.intensity = 18;
    entry.life = 0.065;
  }

  _updateMuzzleLights(dt) {
    for (let i = 0; i < this._muzzleLights.length; i++) {
      const entry = this._muzzleLights[i];
      if (entry.life <= 0) continue;
      entry.life -= dt;
      if (entry.life <= 0) {
        entry.life = 0;
        entry.light.intensity = 0;
      } else {
        entry.light.intensity = (entry.life / 0.065) * 18;
      }
    }
  }

  /* --------------------------- animation --------------------------- */

  _animateAlive(enemy, dt) {
    const m = enemy.model;
    const speed = enemy.animSpeed;
    const speedNorm = clamp(speed / 2.6, 0, 1);
    const run = clamp((speed - 1.55) / 1.25, 0, 1);
    enemy.walkPhase += dt * (2.4 + speed * 3.2);

    const phase = enemy.walkPhase;
    const idle = 1 - speedNorm * 0.85;
    const breath = Math.sin(enemy.time * 1.7 + enemy.phase) * idle;
    enemy.flinch = Math.max(0, enemy.flinch - dt * 4.0);
    const flinch = enemy.flinch;
    const aim = enemy.aimBlend;

    // Legs: hip swing plus a knee that folds on the recovery half-stride.
    for (let i = 0; i < m.legs.length; i++) {
      const leg = m.legs[i];
      const p = phase + (leg.side > 0 ? Math.PI : 0);
      const swing = Math.sin(p) * (0.44 + run * 0.25) * speedNorm;
      const stance = (1 - speedNorm) * 0.045;
      leg.group.rotation.x = -swing + (leg.side < 0 ? -stance : stance * 0.75);
      leg.group.rotation.z = leg.side * (0.018 + (1 - speedNorm) * 0.018);
      leg.knee.rotation.x =
        0.035 +
        (1 - speedNorm) * 0.045 +
        Math.max(0, -Math.sin(p)) * (0.55 + run * 0.42) * speedNorm;
    }

    const bob = Math.abs(Math.sin(phase * 2)) * (0.015 + run * 0.028) * speedNorm;
    m.rig.position.y = bob;
    m.rig.position.z = -0.035 * flinch;

    m.torso.position.y = 0.94 + breath * 0.006;
    m.torso.rotation.x = -0.035 - flinch * 0.16 + run * 0.035;
    m.torso.rotation.z =
      Math.sin(enemy.time * 0.8 + enemy.phase) * 0.008 + flinch * 0.05 * enemy.flinchDir;
    m.torso.rotation.y = Math.sin(enemy.time * 0.5 + enemy.phase) * 0.012;

    m.headGroup.rotation.x = -0.02 - flinch * 0.10;
    m.headGroup.rotation.y =
      Math.sin(enemy.time * 0.55 + enemy.phase) * 0.06 * (1 - aim * 0.7);
    m.headGroup.rotation.z = flinch * 0.20 * enemy.flinchDir;

    const armSwing = Math.sin(phase) * (0.045 + run * 0.10) * speedNorm;
    m.arms[1].group.rotation.x = -0.55 - armSwing + (1 - aim) * 0.10 + breath * 0.006;
    m.arms[1].group.rotation.z = -0.18;
    m.arms[1].elbow.rotation.x = -0.90 + armSwing * 0.45;
    m.arms[0].group.rotation.x = -0.75 + armSwing * 0.75 + (1 - aim) * 0.12 + breath * 0.006;
    m.arms[0].group.rotation.z = 0.18;
    m.arms[0].elbow.rotation.x = -0.75 - armSwing * 0.35;

    const recoil = enemy.recoil;
    m.weapon.position.y = 0.27 - (1 - aim) * 0.025;
    m.weapon.position.z = 0.285 - recoil * 0.022;
    m.weapon.rotation.x = 0.015 + (1 - aim) * 0.08 - recoil * 0.055;
    m.weapon.rotation.y = -0.12 + Math.sin(enemy.time * 0.9 + enemy.phase) * 0.006;
  }

  _updateDeath(enemy, dt) {
    enemy.deathTime += dt;
    const t = enemy.deathTime;
    const m = enemy.model;
    const fall = smoothstep(t / 1.05);
    const limp = smoothstep(t / 0.85);

    m.rig.rotation.x = -1.48 * fall;
    m.rig.rotation.z = enemy.deathSide * 0.42 * fall;
    m.rig.rotation.y = enemy.deathTwist * fall;
    m.rig.position.y = -0.02 * fall;
    m.rig.position.z = -0.10 * fall;

    m.arms[0].group.rotation.x = -0.75 + 0.62 * limp;
    m.arms[0].group.rotation.z = 0.18 + 0.32 * limp;
    m.arms[0].elbow.rotation.x = -0.75 + 0.55 * limp;
    m.arms[1].group.rotation.x = -0.55 + 0.48 * limp;
    m.arms[1].group.rotation.z = -0.18 - 0.28 * limp;
    m.arms[1].elbow.rotation.x = -0.90 + 0.65 * limp;

    m.legs[0].group.rotation.x = -0.10 * limp;
    m.legs[0].knee.rotation.x = 0.035 + 0.22 * limp;
    m.legs[1].group.rotation.x = 0.12 * limp;
    m.legs[1].knee.rotation.x = 0.035 + 0.32 * limp;

    m.headGroup.rotation.x = -0.02 + 0.35 * limp;
    m.headGroup.rotation.z = enemy.deathSide * 0.22 * limp;
    m.torso.rotation.x = -0.035 + 0.08 * limp;
    m.torso.rotation.z = 0;
    m.weapon.rotation.x = 0.015;
    m.weapon.rotation.y = -0.12;

    if (t > 8.0) {
      if (!enemy.deathFadeStarted) {
        enemy.deathFadeStarted = true;
        if (enemy.deathMaterials) {
          for (let i = 0; i < enemy.deathMaterials.length; i++) {
            const mat = enemy.deathMaterials[i];
            mat.transparent = true;
            mat.depthWrite = false;
            mat.needsUpdate = true;
          }
        }
        m.group.traverse((o) => {
          if (o.isMesh) {
            o.castShadow = false;
            o.receiveShadow = false;
          }
        });
      }

      const fade = clamp((t - 8.0) / 1.6, 0, 1);
      enemy.group.position.y = enemy.baseY - 1.25 * fade;
      if (enemy.deathMaterials) {
        const opacity = 1 - fade;
        for (let i = 0; i < enemy.deathMaterials.length; i++) {
          enemy.deathMaterials[i].opacity = opacity;
        }
      }
    }

    if (t > 10.0) {
      if (enemy.group.parent) enemy.group.parent.remove(enemy.group);
      this._disposeDeathMaterials(enemy);
      enemy.removed = true;
    }
  }
}


