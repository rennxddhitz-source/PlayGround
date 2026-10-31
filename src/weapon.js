import * as THREE from 'three';

/* ------------------------------------------------------------------ *
 * Shared materials and procedural geometry helpers
 * ------------------------------------------------------------------ */

const MAT = {
  gunmetal: new THREE.MeshStandardMaterial({ color: 0x33373d, metalness: 0.86, roughness: 0.34 }),
  gunmetalDark: new THREE.MeshStandardMaterial({ color: 0x191b1e, metalness: 0.9, roughness: 0.3 }),
  steel: new THREE.MeshStandardMaterial({ color: 0x4a4f57, metalness: 0.94, roughness: 0.26 }),
  black: new THREE.MeshStandardMaterial({ color: 0x0e0f11, metalness: 0.5, roughness: 0.62 }),
  rubber: new THREE.MeshStandardMaterial({ color: 0x121315, metalness: 0.08, roughness: 0.94 }),
  tan: new THREE.MeshStandardMaterial({ color: 0xa98760, metalness: 0.08, roughness: 0.68 }),
  tanDark: new THREE.MeshStandardMaterial({ color: 0x806347, metalness: 0.08, roughness: 0.76 }),
  tanFlat: new THREE.MeshStandardMaterial({
    color: 0x9e7e58, metalness: 0.1, roughness: 0.72, flatShading: true,
  }),
  glove: new THREE.MeshStandardMaterial({ color: 0x2e3238, metalness: 0.05, roughness: 0.82 }),
  gloveDark: new THREE.MeshStandardMaterial({ color: 0x1a1c20, metalness: 0.05, roughness: 0.88 }),
  sleeve: new THREE.MeshStandardMaterial({ color: 0x7d674b, metalness: 0.02, roughness: 0.92 }),
  sleeveDark: new THREE.MeshStandardMaterial({ color: 0x5d4b37, metalness: 0.02, roughness: 0.96 }),
  brass: new THREE.MeshStandardMaterial({ color: 0xc6963c, metalness: 0.95, roughness: 0.28 }),
  lens: new THREE.MeshBasicMaterial({
    color: 0x8ec8d8, transparent: true, opacity: 0.1, side: THREE.DoubleSide,
    depthWrite: false, toneMapped: false,
  }),
  reticle: new THREE.MeshBasicMaterial({
    color: 0xff2a16, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending,
    depthTest: false, depthWrite: false, side: THREE.DoubleSide, toneMapped: false,
  }),
  reticleRing: new THREE.MeshBasicMaterial({
    color: 0xff3b1d, transparent: true, opacity: 0.42, blending: THREE.AdditiveBlending,
    depthTest: false, depthWrite: false, side: THREE.DoubleSide, toneMapped: false,
  }),
  flashCore: new THREE.MeshBasicMaterial({
    color: 0xfff3cf, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending,
    depthWrite: false, depthTest: false, side: THREE.DoubleSide, toneMapped: false,
  }),
  flashWarm: new THREE.MeshBasicMaterial({
    color: 0xff9c37, transparent: true, opacity: 0.78, blending: THREE.AdditiveBlending,
    depthWrite: false, depthTest: false, side: THREE.DoubleSide, toneMapped: false,
  }),
  flashEdge: new THREE.MeshBasicMaterial({
    color: 0xff5a12, transparent: true, opacity: 0.42, blending: THREE.AdditiveBlending,
    depthWrite: false, depthTest: false, side: THREE.DoubleSide, toneMapped: false,
  }),
};

const _UP = new THREE.Vector3(0, 1, 0);

/** Rounded rectangle profile used by the bevelled boxes. */
function roundedRect(width, height, radius) {
  const r = Math.min(radius, width * 0.45, height * 0.45);
  const x = -width * 0.5;
  const y = -height * 0.5;
  const s = new THREE.Shape();
  s.moveTo(x + r, y);
  s.lineTo(x + width - r, y);
  s.quadraticCurveTo(x + width, y, x + width, y + r);
  s.lineTo(x + width, y + height - r);
  s.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  s.lineTo(x + r, y + height);
  s.quadraticCurveTo(x, y + height, x, y + height - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  s.closePath();
  return s;
}

/** A bevelled box built as an extrusion; gives the hard-surface a cast look. */
function beveledBox(width, height, depth, material, bevel = 0.004) {
  const shape = roundedRect(width, height, bevel * 2.2);
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelSegments: 2,
    bevelSize: bevel,
    bevelThickness: bevel,
    curveSegments: 3,
    steps: 1,
  });
  geo.translate(0, 0, -depth * 0.5);
  return new THREE.Mesh(geo, material);
}

function place(parent, mesh, x, y, z, rx = 0, ry = 0, rz = 0) {
  mesh.position.set(x, y, z);
  mesh.rotation.set(rx, ry, rz);
  parent.add(mesh);
  return mesh;
}

function addBeveled(parent, width, height, depth, material, x, y, z, rx = 0, ry = 0, rz = 0, bevel = 0.004) {
  return place(parent, beveledBox(width, height, depth, material, bevel), x, y, z, rx, ry, rz);
}

function addBox(parent, width, height, depth, material, x, y, z, rx = 0, ry = 0, rz = 0) {
  return place(parent, new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material), x, y, z, rx, ry, rz);
}

function addCylinder(parent, radiusTop, radiusBottom, length, material, x, y, z, segments = 16, rx = 0, ry = 0, rz = 0, openEnded = false) {
  const geo = new THREE.CylinderGeometry(radiusTop, radiusBottom, length, segments, 1, openEnded);
  return place(parent, new THREE.Mesh(geo, material), x, y, z, rx, ry, rz);
}

function addCapsule(parent, radius, length, material, x, y, z, rx = 0, ry = 0, rz = 0) {
  const geo = new THREE.CapsuleGeometry(radius, length, 4, 10);
  return place(parent, new THREE.Mesh(geo, material), x, y, z, rx, ry, rz);
}

function addTorus(parent, radius, tube, material, x, y, z, rx = 0, ry = 0, rz = 0) {
  const geo = new THREE.TorusGeometry(radius, tube, 6, 20);
  return place(parent, new THREE.Mesh(geo, material), x, y, z, rx, ry, rz);
}

/** A tapered cylinder between two points (used for forearms and cuffs). */
function addLimb(parent, a, b, radiusStart, radiusEnd, material, segments = 12) {
  const dir = new THREE.Vector3().subVectors(b, a);
  const length = dir.length();
  const geo = new THREE.CylinderGeometry(radiusEnd, radiusStart, length, segments, 1, false);
  const mesh = new THREE.Mesh(geo, material);
  mesh.position.copy(a).add(b).multiplyScalar(0.5);
  mesh.quaternion.setFromUnitVectors(_UP, dir.normalize());
  parent.add(mesh);
  return mesh;
}

/** One draw call for repeated hardware details (rail teeth, pins, slots). */
function addInstanced(parent, geometry, material, placements) {
  const inst = new THREE.InstancedMesh(geometry, material, placements.length);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < placements.length; i += 1) {
    const p = placements[i];
    dummy.position.set(p[0], p[1], p[2]);
    dummy.rotation.set(p[3] || 0, p[4] || 0, p[5] || 0);
    const scale = p[6] || 1;
    dummy.scale.set(scale, p[7] || scale, p[8] || scale);
    dummy.updateMatrix();
    inst.setMatrixAt(i, dummy.matrix);
  }
  inst.instanceMatrix.needsUpdate = true;
  parent.add(inst);
  return inst;
}

/** Soft radial texture for the additive muzzle-flash sprites. */
function makeFlashTexture() {
  const size = 64;
  const data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const dx = ((x + 0.5) / size) * 2 - 1;
      const dy = ((y + 0.5) / size) * 2 - 1;
      const d = Math.min(1, Math.sqrt(dx * dx + dy * dy));
      const angle = Math.atan2(dy, dx);
      const glow = Math.pow(1 - d, 2.4) * 0.85;
      const spikes = Math.pow(Math.abs(Math.cos(angle * 3)), 10) * Math.pow(1 - d, 1.5);
      const alpha = Math.min(1, Math.max(glow, spikes));
      const i = (y * size + x) * 4;
      data[i] = 255;
      data[i + 1] = 225;
      data[i + 2] = 170;
      data[i + 3] = Math.round(alpha * 255);
    }
  }
  const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

const FLASH_TEXTURE = makeFlashTexture();

/* ------------------------------------------------------------------ *
 * Weapon viewmodel
 * ------------------------------------------------------------------ */

export class Weapon {
  constructor() {
    this.group = new THREE.Group();
    this.group.name = 'FirstPersonWeapon';
    this.group.rotation.order = 'YXZ';
    this.group.frustumCulled = false;

    this.hipPosition = new THREE.Vector3(0.26, -0.27, -0.52);
    this.hipRotation = new THREE.Euler(0.02, 0.15, -0.018, 'YXZ');
    this.adsPosition = new THREE.Vector3(0, -0.172, -0.18);
    this.adsRotation = new THREE.Euler(0, 0, 0, 'YXZ');
    this.group.position.copy(this.hipPosition);
    this.group.rotation.copy(this.hipRotation);

    this.adsProgress = 0;
    this.isReloading = false;
    this.ammoInMag = 30;
    this.reserveAmmo = 120;
    this.rpm = 700;

    this._adsTarget = false;
    this._elapsed = 0;
    this._bobPhase = 0;
    this._sprintAmount = 0;
    this._swayX = 0;
    this._swayY = 0;
    this._recoilZ = 0;
    this._recoilVelZ = 0;
    this._recoilPitch = 0;
    this._recoilVelPitch = 0;
    this._recoilYaw = 0;
    this._recoilVelYaw = 0;
    this._recoilRoll = 0;
    this._recoilVelRoll = 0;
    this._flashTimer = 0;
    this._reloadTime = 0;
    this._reloadRefilled = false;
    this._shells = [];

    this._build();
    this._buildHands();
    this._buildMuzzleFlash();

    // The whole viewmodel is excluded from shadow and culling passes.
    this.group.traverse((obj) => {
      obj.frustumCulled = false;
      obj.castShadow = false;
      obj.receiveShadow = false;
    });

    this._magBaseY = this.magazine.position.y;
    this._magBaseZ = this.magazine.position.z;
    this._magBaseRotX = this.magazine.rotation.x;
  }

  /* ---------------------------------------------------------------- *
   * Rifle construction
   * ---------------------------------------------------------------- */

  _build() {
    const g = this.group;

    // Lower and upper receiver. The upper is slightly wider for a stepped profile.
    addBeveled(g, 0.072, 0.078, 0.27, MAT.gunmetal, 0, -0.004, -0.06, 0, 0, 0, 0.006);
    addBeveled(g, 0.079, 0.07, 0.32, MAT.gunmetal, 0, 0.058, -0.085, 0, 0, 0, 0.006);
    addBeveled(g, 0.08, 0.058, 0.105, MAT.gunmetalDark, 0, -0.052, -0.102, 0, 0, 0, 0.005);
    addBeveled(g, 0.002, 0.036, 0.14, MAT.gunmetalDark, -0.0385, 0.028, -0.075, 0, 0, 0, 0.002);
    addBeveled(g, 0.002, 0.03, 0.11, MAT.gunmetalDark, 0.0385, 0.03, -0.07, 0, 0, 0, 0.002);

    // Continuous top rail: one base plus instanced Picatinny teeth.
    addBox(g, 0.046, 0.012, 0.61, MAT.black, 0, 0.102, -0.225);
    const teeth = [];
    for (let z = 0.072; z >= -0.505; z -= 0.028) {
      teeth.push([0, 0.111, z]);
    }
    addInstanced(g, new THREE.BoxGeometry(0.044, 0.007, 0.011), MAT.black, teeth);

    // Receiver hardware: pins, selector, bolt catch, mag release and forward assist.
    addInstanced(
      g,
      new THREE.CylinderGeometry(0.0038, 0.0038, 0.008, 8),
      MAT.steel,
      [[-0.039, 0.005, 0.02, 0, 0, Math.PI / 2], [0.039, 0.005, 0.02, 0, 0, Math.PI / 2],
        [-0.039, 0.005, -0.09, 0, 0, Math.PI / 2], [0.039, 0.005, -0.09, 0, 0, Math.PI / 2]],
    );
    addCylinder(g, 0.009, 0.009, 0.012, MAT.steel, -0.044, 0.028, 0.018, 12, 0, 0, Math.PI / 2);
    addBox(g, 0.012, 0.007, 0.032, MAT.gunmetalDark, -0.049, 0.02, 0.025, 0.5, 0, 0);
    addBox(g, 0.008, 0.018, 0.05, MAT.gunmetalDark, -0.042, 0.008, -0.04, 0, 0, 0);
    addCylinder(g, 0.009, 0.009, 0.012, MAT.steel, 0.043, -0.02, -0.08, 12, 0, 0, Math.PI / 2);
    addCylinder(g, 0.011, 0.011, 0.03, MAT.steel, 0.045, 0.056, -0.008, 12, 0, 0, Math.PI / 2);
    addCylinder(g, 0.014, 0.014, 0.008, MAT.gunmetalDark, 0.062, 0.056, -0.008, 12, 0, 0, Math.PI / 2);

    // Ejection port and brass deflector on the right side.
    addBeveled(g, 0.004, 0.028, 0.075, MAT.black, 0.041, 0.062, -0.052, 0, 0, 0, 0.001);
    addBox(g, 0.003, 0.03, 0.006, MAT.gunmetalDark, 0.042, 0.062, -0.092, 0.35, 0, 0);
    addBox(g, 0.003, 0.006, 0.07, MAT.gunmetalDark, 0.042, 0.078, -0.05, 0, 0, 0.35);
    addBox(g, 0.002, 0.011, 0.032, MAT.brass, 0.0435, 0.06, -0.055, 0, 0, 0);

    // Charging handle at the rear of the upper.
    addBox(g, 0.012, 0.012, 0.075, MAT.gunmetalDark, 0, 0.095, 0.112);
    addBeveled(g, 0.046, 0.012, 0.018, MAT.gunmetalDark, 0, 0.095, 0.148, 0, 0, 0, 0.002);
    addBox(g, 0.014, 0.016, 0.02, MAT.steel, 0.026, 0.095, 0.148, 0, 0, 0.2);

    // Trigger guard and trigger.
    addBox(g, 0.013, 0.035, 0.008, MAT.gunmetalDark, 0, -0.073, -0.045);
    addBox(g, 0.013, 0.008, 0.068, MAT.gunmetalDark, 0, -0.092, -0.012);
    addBox(g, 0.013, 0.038, 0.008, MAT.gunmetalDark, 0, -0.076, 0.022, -0.22, 0, 0);
    addBox(g, 0.008, 0.028, 0.009, MAT.steel, 0, -0.06, -0.004, 0.35, 0, 0);
    addCylinder(g, 0.004, 0.004, 0.016, MAT.steel, 0, -0.056, 0.002, 8, 0, 0, Math.PI / 2);

    this._buildHandguard();
    this._buildBarrel();
    this._buildStock();
    this._buildGrip();
    this._buildMagazine();
    this._buildOptic();
    this._buildIronSights();
  }

  _buildHandguard() {
    const g = this.group;

    // Barrel nut and octagonal FDE handguard.
    addCylinder(g, 0.033, 0.033, 0.032, MAT.gunmetalDark, 0, 0.015, -0.25, 12, Math.PI / 2);
    addCylinder(g, 0.051, 0.054, 0.27, MAT.tanFlat, 0, 0.015, -0.386, 8, Math.PI / 2);
    addCylinder(g, 0.056, 0.056, 0.012, MAT.tanDark, 0, 0.015, -0.522, 8, Math.PI / 2);

    // Black rail riser over the handguard, then M-LOK slots and a short bottom rail.
    addBeveled(g, 0.046, 0.028, 0.265, MAT.black, 0, 0.079, -0.386, 0, 0, 0, 0.003);
    const slots = [];
    for (const z of [-0.285, -0.33, -0.375, -0.42, -0.465]) {
      slots.push([0.052, 0.006, z, 0, 0, 0], [-0.052, 0.006, z, 0, 0, 0]);
    }
    addInstanced(g, new THREE.BoxGeometry(0.003, 0.015, 0.031), MAT.black, slots);
    addBox(g, 0.034, 0.01, 0.18, MAT.black, 0, -0.043, -0.39);
    addBeveled(g, 0.03, 0.042, 0.022, MAT.tanDark, 0, -0.06, -0.49, -0.18, 0, 0, 0.002);
    addCylinder(g, 0.009, 0.009, 0.012, MAT.steel, -0.054, 0.022, -0.292, 10, 0, 0, Math.PI / 2);
    addTorus(g, 0.011, 0.0028, MAT.steel, -0.056, 0.022, -0.31, 0, Math.PI / 2, 0);
  }

  _buildBarrel() {
    const g = this.group;

    addCylinder(g, 0.012, 0.012, 0.17, MAT.steel, 0, 0.02, -0.58, 14, Math.PI / 2);
    addBeveled(g, 0.034, 0.04, 0.042, MAT.gunmetalDark, 0, 0.037, -0.545, 0, 0, 0, 0.003);
    addCylinder(g, 0.0045, 0.0045, 0.12, MAT.steel, 0, 0.04, -0.46, 8, Math.PI / 2);

    // Suppressor with end caps and heat rings.
    addCylinder(g, 0.028, 0.028, 0.19, MAT.gunmetalDark, 0, 0.02, -0.73, 20, Math.PI / 2);
    addCylinder(g, 0.031, 0.031, 0.012, MAT.steel, 0, 0.02, -0.637, 20, Math.PI / 2);
    addCylinder(g, 0.03, 0.03, 0.012, MAT.steel, 0, 0.02, -0.831, 20, Math.PI / 2);
    for (const z of [-0.69, -0.73, -0.77]) {
      addCylinder(g, 0.0292, 0.0292, 0.005, MAT.steel, 0, 0.02, z, 20, Math.PI / 2);
    }
  }

  _buildStock() {
    const g = this.group;

    addCylinder(g, 0.019, 0.019, 0.29, MAT.gunmetalDark, 0, 0.055, 0.165, 14, Math.PI / 2);
    addCylinder(g, 0.024, 0.024, 0.018, MAT.steel, 0, 0.055, 0.045, 12, Math.PI / 2);
    addBeveled(g, 0.066, 0.098, 0.16, MAT.tan, 0, 0.024, 0.3, 0, 0, 0, 0.006);
    addBeveled(g, 0.06, 0.028, 0.105, MAT.tanDark, 0, 0.088, 0.288, 0, 0, 0, 0.004);
    addBeveled(g, 0.069, 0.108, 0.018, MAT.rubber, 0, 0.02, 0.39, 0, 0, 0, 0.004);
    addBox(g, 0.02, 0.034, 0.06, MAT.tanDark, 0, -0.03, 0.302, 0.1, 0, 0);
    addBox(g, 0.018, 0.008, 0.045, MAT.rubber, 0, -0.048, 0.305, 0.1, 0, 0);
    addTorus(g, 0.011, 0.0028, MAT.steel, -0.038, 0.005, 0.355, 0, Math.PI / 2, 0);
    addCylinder(g, 0.008, 0.008, 0.014, MAT.steel, -0.036, 0.042, 0.34, 10, 0, 0, Math.PI / 2);
  }

  _buildGrip() {
    const grip = new THREE.Group();
    grip.position.set(0, -0.115, 0.035);
    grip.rotation.x = -0.32;
    this.group.add(grip);
    this.grip = grip;

    addBeveled(grip, 0.052, 0.105, 0.062, MAT.gloveDark, 0, -0.05, 0, 0, 0, 0, 0.007);
    addBeveled(grip, 0.05, 0.018, 0.058, MAT.rubber, 0, -0.108, 0, 0, 0, 0, 0.003);
    addBeveled(grip, 0.036, 0.018, 0.035, MAT.gunmetalDark, 0, 0.006, -0.008, 0.1, 0, 0, 0.003);
    addInstanced(
      grip,
      new THREE.BoxGeometry(0.039, 0.005, 0.004),
      MAT.rubber,
      [[0, -0.028, -0.032], [0, -0.044, -0.032], [0, -0.06, -0.032], [0, -0.076, -0.032]],
    );
  }

  _buildMagazine() {
    const mag = new THREE.Group();
    mag.position.set(0, -0.085, -0.108);
    this.group.add(mag);
    this.magazine = mag;

    addBeveled(mag, 0.058, 0.08, 0.085, MAT.gunmetalDark, 0, -0.022, -0.003, 0.04, 0, 0, 0.004);
    addBeveled(mag, 0.056, 0.08, 0.082, MAT.gunmetalDark, 0, -0.088, -0.018, 0.14, 0, 0, 0.004);
    addBeveled(mag, 0.054, 0.072, 0.078, MAT.gunmetalDark, 0, -0.15, -0.045, 0.25, 0, 0, 0.004);
    addBeveled(mag, 0.062, 0.013, 0.088, MAT.tanDark, 0, -0.192, -0.068, 0.25, 0, 0, 0.003);
    addBox(mag, 0.02, 0.008, 0.026, MAT.tan, 0, -0.202, -0.068, 0.25, 0, 0);
    addInstanced(
      mag,
      new THREE.BoxGeometry(0.002, 0.009, 0.014),
      MAT.steel,
      [[0.0295, -0.05, -0.012, 0.1, 0, 0], [0.0295, -0.095, -0.03, 0.14, 0, 0],
        [0.0295, -0.14, -0.052, 0.2, 0, 0]],
    );
  }

  _buildOptic() {
    const g = this.group;
    const y = 0.152;

    // Tall mount keeps the sight window clear of the handguard.
    addBeveled(g, 0.042, 0.018, 0.105, MAT.black, 0, 0.115, -0.1, 0, 0, 0, 0.003);
    addBeveled(g, 0.034, 0.05, 0.014, MAT.black, 0, 0.14, -0.058, 0, 0, 0, 0.002);
    addBeveled(g, 0.034, 0.05, 0.014, MAT.black, 0, 0.14, -0.142, 0, 0, 0, 0.002);

    addCylinder(g, 0.026, 0.026, 0.125, MAT.black, 0, y, -0.1, 24, Math.PI / 2, 0, 0, true);
    addCylinder(g, 0.032, 0.03, 0.022, MAT.black, 0, y, -0.032, 24, Math.PI / 2, 0, 0, true);
    addCylinder(g, 0.032, 0.034, 0.022, MAT.black, 0, y, -0.168, 24, Math.PI / 2, 0, 0, true);
    addTorus(g, 0.0275, 0.0035, MAT.gunmetalDark, 0, y, -0.057, 0, 0, 0);
    addTorus(g, 0.0275, 0.0035, MAT.gunmetalDark, 0, y, -0.143, 0, 0, 0);

    // Lenses sit just inside each bell.
    const rearLens = place(g, new THREE.Mesh(new THREE.CircleGeometry(0.027, 28), MAT.lens), 0, y, -0.024);
    const frontLens = place(g, new THREE.Mesh(new THREE.CircleGeometry(0.028, 28), MAT.lens), 0, y, -0.176);
    rearLens.renderOrder = 2;
    frontLens.renderOrder = 2;

    // Elevation and windage turrets.
    addCylinder(g, 0.013, 0.013, 0.019, MAT.gunmetalDark, 0, y + 0.036, -0.1, 16);
    addCylinder(g, 0.014, 0.014, 0.005, MAT.steel, 0, y + 0.047, -0.1, 16);
    addCylinder(g, 0.012, 0.012, 0.019, MAT.gunmetalDark, 0.033, y, -0.1, 16, 0, 0, Math.PI / 2);
    addCylinder(g, 0.013, 0.013, 0.005, MAT.steel, 0.044, y, -0.1, 16, 0, 0, Math.PI / 2);
    addInstanced(
      g,
      new THREE.CylinderGeometry(0.0022, 0.0022, 0.005, 6),
      MAT.steel,
      [[-0.016, 0.126, -0.07, 0, 0, 0], [0.016, 0.126, -0.07, 0, 0, 0],
        [-0.016, 0.126, -0.13, 0, 0, 0], [0.016, 0.126, -0.13, 0, 0, 0]],
    );

    // Reticle: a bright core, a faint ring, and a tiny sphere for side-on visibility.
    const dot = place(g, new THREE.Mesh(new THREE.CircleGeometry(0.0018, 14), MAT.reticle), 0, y, -0.092);
    const ring = place(g, new THREE.Mesh(new THREE.TorusGeometry(0.0065, 0.0007, 6, 24), MAT.reticleRing), 0, y, -0.092);
    const core = place(g, new THREE.Mesh(new THREE.SphereGeometry(0.0018, 8, 6), MAT.reticle), 0, y, -0.092);
    dot.renderOrder = 30;
    ring.renderOrder = 29;
    core.renderOrder = 30;
    this.reticle = dot;
  }

  _buildIronSights() {
    const g = this.group;

    // Folded front sight with protective wings, kept below the optic window.
    addBeveled(g, 0.028, 0.012, 0.04, MAT.black, 0, 0.118, -0.475, 0, 0, 0, 0.002);
    addBox(g, 0.023, 0.005, 0.028, MAT.gunmetalDark, 0, 0.124, -0.475, 0.2, 0, 0);
    addBox(g, 0.005, 0.015, 0.006, MAT.gunmetalDark, 0, 0.125, -0.475);
    addBox(g, 0.004, 0.017, 0.008, MAT.gunmetalDark, -0.013, 0.124, -0.475, 0, 0, 0.12);
    addBox(g, 0.004, 0.017, 0.008, MAT.gunmetalDark, 0.013, 0.124, -0.475, 0, 0, -0.12);

    // Folded rear aperture behind the optic, clear of the sight picture.
    addBeveled(g, 0.03, 0.012, 0.04, MAT.black, 0, 0.118, 0.036, 0, 0, 0, 0.002);
    addTorus(g, 0.0065, 0.0016, MAT.gunmetalDark, 0, 0.123, 0.036, 0, 0, 0);
    addBox(g, 0.004, 0.014, 0.009, MAT.gunmetalDark, -0.012, 0.121, 0.036, 0, 0, 0.1);
    addBox(g, 0.004, 0.014, 0.009, MAT.gunmetalDark, 0.012, 0.121, 0.036, 0, 0, -0.1);
  }

  _buildHands() {
    const g = this.group;

    // Right hand wrapped around the pistol grip.
    const right = new THREE.Group();
    right.position.set(0.024, -0.145, 0.03);
    right.rotation.set(-0.32, 0.08, -0.05);
    g.add(right);

    addBeveled(right, 0.05, 0.072, 0.058, MAT.glove, 0.012, 0, 0.008, 0, 0, 0, 0.006);
    addBeveled(right, 0.038, 0.016, 0.042, MAT.tanDark, 0.018, 0.026, 0.012, 0, 0, 0, 0.004);
    for (let i = 0; i < 4; i += 1) {
      const y = 0.022 - i * 0.019;
      addCapsule(right, 0.0085, 0.032, MAT.glove, -0.008, y, -0.03, 0, 0, Math.PI / 2);
    }
    addCapsule(right, 0.009, 0.038, MAT.gloveDark, 0.034, 0.026, 0.006, 0, 0, 0.55);
    addCapsule(right, 0.023, 0.028, MAT.gloveDark, 0.025, -0.05, 0.03, 0.18, 0, 0);

    const wristR = new THREE.Vector3(0.035, -0.198, 0.058);
    const elbowR = new THREE.Vector3(0.205, -0.43, 0.19);
    addLimb(g, wristR, elbowR, 0.033, 0.047, MAT.sleeve, 12);
    const dirR = new THREE.Vector3().subVectors(elbowR, wristR).normalize();
    addLimb(g, wristR.clone().addScaledVector(dirR, -0.01), wristR.clone().addScaledVector(dirR, 0.042), 0.04, 0.04, MAT.sleeveDark, 12);
    addLimb(g, wristR.clone().addScaledVector(dirR, -0.035), wristR.clone().addScaledVector(dirR, 0.012), 0.028, 0.03, MAT.gloveDark, 10);

    // Left hand supporting the handguard, thumb over the near side.
    const left = new THREE.Group();
    left.position.set(0.065, -0.055, -0.36);
    left.rotation.set(0.12, 0.05, 0.08);
    g.add(left);

    addBeveled(left, 0.06, 0.048, 0.08, MAT.glove, 0, -0.018, 0, 0, 0, 0, 0.006);
    addBeveled(left, 0.046, 0.014, 0.054, MAT.tanDark, 0.012, 0.012, 0.004, 0, 0, 0, 0.004);
    addBox(left, 0.005, 0.034, 0.044, MAT.tanDark, 0.033, -0.006, 0, 0, 0, 0);
    addBeveled(left, 0.05, 0.012, 0.058, MAT.gloveDark, -0.004, -0.042, 0.004, 0, 0, 0, 0.004);
    for (let i = 0; i < 4; i += 1) {
      const z = 0.028 - i * 0.019;
      addCapsule(left, 0.009, 0.036, MAT.glove, 0.044, 0.002, z, 0, 0, -0.12);
    }
    addCapsule(left, 0.0095, 0.044, MAT.gloveDark, -0.028, -0.006, 0.014, Math.PI / 2, 0, 0);
    addCapsule(left, 0.022, 0.026, MAT.gloveDark, 0.008, -0.062, 0.02, 0.1, 0, 0.1);

    const wristL = new THREE.Vector3(0.05, -0.098, -0.342);
    const elbowL = new THREE.Vector3(-0.205, -0.36, -0.19);
    addLimb(g, wristL, elbowL, 0.031, 0.044, MAT.sleeve, 12);
    const dirL = new THREE.Vector3().subVectors(elbowL, wristL).normalize();
    addLimb(g, wristL.clone().addScaledVector(dirL, -0.008), wristL.clone().addScaledVector(dirL, 0.04), 0.037, 0.037, MAT.sleeveDark, 12);
    addLimb(g, wristL.clone().addScaledVector(dirL, -0.032), wristL.clone().addScaledVector(dirL, 0.01), 0.026, 0.028, MAT.gloveDark, 10);
  }

  _buildMuzzleFlash() {
    const g = this.group;
    this.muzzle = new THREE.Object3D();
    this.muzzle.position.set(0, 0.02, -0.845);
    g.add(this.muzzle);

    this.flash = new THREE.Group();
    this.flash.position.copy(this.muzzle.position);
    this.flash.visible = false;
    g.add(this.flash);

    const cones = [
      [0.046, 0.14, MAT.flashEdge, -0.055],
      [0.031, 0.11, MAT.flashWarm, -0.052],
      [0.017, 0.075, MAT.flashCore, -0.045],
    ];
    for (const [radius, height, material, z] of cones) {
      const geo = new THREE.ConeGeometry(radius, height, 10, 1, true);
      place(this.flash, new THREE.Mesh(geo, material), 0, 0, z, -Math.PI / 2, 0, 0);
    }

    const spriteMat = new THREE.SpriteMaterial({
      map: FLASH_TEXTURE, color: 0xffc37c, transparent: true, opacity: 0.92,
      blending: THREE.AdditiveBlending, depthTest: false, depthWrite: false, toneMapped: false,
    });
    const spriteA = new THREE.Sprite(spriteMat);
    spriteA.position.set(0, 0, -0.018);
    spriteA.scale.set(0.2, 0.2, 1);
    this.flash.add(spriteA);

    const spriteMat2 = spriteMat.clone();
    spriteMat2.color.setHex(0xfff3d2);
    spriteMat2.opacity = 0.75;
    spriteMat2.rotation = Math.PI * 0.25;
    const spriteB = new THREE.Sprite(spriteMat2);
    spriteB.position.set(0, 0, -0.045);
    spriteB.scale.set(0.13, 0.13, 1);
    this.flash.add(spriteB);

    this.flashLight = new THREE.PointLight(0xffa24d, 0, 7, 2);
    this.flashLight.position.copy(this.muzzle.position);
    this.flashLight.castShadow = false;
    g.add(this.flashLight);
  }

  /* ---------------------------------------------------------------- *
   * Public animation / gameplay API
   * ---------------------------------------------------------------- */

  setADS(value) {
    this._adsTarget = !!value;
  }

  fire() {
    if (this.isReloading || this.ammoInMag <= 0) return false;

    this.ammoInMag -= 1;
    this.addRecoil(1);

    this._flashTimer = 0.045;
    this.flash.visible = true;
    const scale = 0.82 + Math.random() * 0.5;
    this.flash.scale.set(scale, scale * (0.82 + Math.random() * 0.32), scale);
    this.flash.rotation.set(0, 0, Math.random() * Math.PI * 2);
    this.flashLight.intensity = 25;

    this._ejectShell();
    return true;
  }

  reload() {
    if (this.isReloading || this.ammoInMag >= 30 || this.reserveAmmo <= 0) return false;
    this.isReloading = true;
    this._reloadTime = 0;
    this._reloadRefilled = false;
    return true;
  }

  addRecoil(amount = 1) {
    const value = Math.max(0, Number(amount) || 0);
    if (value <= 0) return;
    const scale = value * (1 - this.adsProgress * 0.4);
    this._recoilVelZ += 0.36 * scale;
    this._recoilVelPitch += 0.6 * scale;
    this._recoilVelYaw += (Math.random() - 0.5) * 0.25 * scale;
    this._recoilVelRoll += (Math.random() - 0.5) * 0.2 * scale;
  }

  getMuzzleWorldPosition(target) {
    const out = target || new THREE.Vector3();
    this.muzzle.getWorldPosition(out);
    return out;
  }

  reset() {
    for (const shell of this._shells) {
      this.group.remove(shell);
      shell.geometry.dispose();
      shell.material.dispose();
    }
    this._shells.length = 0;

    this.ammoInMag = 30;
    this.reserveAmmo = 120;
    this.isReloading = false;
    this._reloadTime = 0;
    this._reloadRefilled = false;
    this._adsTarget = false;
    this.adsProgress = 0;
    this._sprintAmount = 0;
    this._swayX = 0;
    this._swayY = 0;
    this._bobPhase = 0;
    this._elapsed = 0;
    this._flashTimer = 0;
    this.flash.visible = false;
    this.flash.scale.set(1, 1, 1);
    this.flashLight.intensity = 0;

    this._recoilZ = 0;
    this._recoilVelZ = 0;
    this._recoilPitch = 0;
    this._recoilVelPitch = 0;
    this._recoilYaw = 0;
    this._recoilVelYaw = 0;
    this._recoilRoll = 0;
    this._recoilVelRoll = 0;

    this.magazine.position.set(0, this._magBaseY, this._magBaseZ);
    this.magazine.rotation.x = this._magBaseRotX;
    this.group.position.copy(this.hipPosition);
    this.group.rotation.copy(this.hipRotation);
  }

  update(dt, state = {}) {
    const step = Math.min(Math.max(Number(dt) || 0, 0), 0.033);
    this._elapsed += step;

    const moving = !!state.moving;
    const sprinting = !!state.sprinting && moving;
    const grounded = state.grounded !== false;
    const lookX = Number(state.lookDeltaX) || 0;
    const lookY = Number(state.lookDeltaY) || 0;

    this.adsProgress = THREE.MathUtils.clamp(
      THREE.MathUtils.damp(this.adsProgress, this._adsTarget ? 1 : 0, 14, step),
      0, 1,
    );
    const ads = this.adsProgress;
    this._sprintAmount = THREE.MathUtils.damp(this._sprintAmount, sprinting ? 1 : 0, 8, step);
    const sprint = this._sprintAmount * (1 - ads * 0.8);

    // Mouse-look lag: the weapon trails the camera slightly.
    const swayScale = 1 - ads * 0.78;
    const targetSwayX = THREE.MathUtils.clamp(-lookX * 0.00055, -0.017, 0.017);
    const targetSwayY = THREE.MathUtils.clamp(-lookY * 0.00055, -0.013, 0.013);
    this._swayX = THREE.MathUtils.damp(this._swayX, targetSwayX, 9, step);
    this._swayY = THREE.MathUtils.damp(this._swayY, targetSwayY, 9, step);

    // Walk / sprint bob.
    const bobScale = (1 - ads * 0.87) * (sprinting ? 1.5 : 1);
    if (moving && grounded) {
      this._bobPhase += step * (sprinting ? 10.8 : 7.2);
    }
    const bobX = moving && grounded ? Math.cos(this._bobPhase) * 0.0072 * bobScale : 0;
    const bobY = moving && grounded ? Math.sin(this._bobPhase * 2) * 0.0056 * bobScale : 0;
    const bobRoll = moving && grounded ? Math.cos(this._bobPhase) * 0.009 * bobScale : 0;
    const breath = Math.sin(this._elapsed * 1.7) * 0.0013 * (1 - ads * 0.7);

    // Spring-damper recoil, sub-stepped for stability.
    const subSteps = Math.max(1, Math.ceil(step / 0.016));
    const h = step / subSteps;
    for (let i = 0; i < subSteps; i += 1) {
      this._recoilVelZ += (-150 * this._recoilZ - 18 * this._recoilVelZ) * h;
      this._recoilZ += this._recoilVelZ * h;
      this._recoilVelPitch += (-180 * this._recoilPitch - 20 * this._recoilVelPitch) * h;
      this._recoilPitch += this._recoilVelPitch * h;
      this._recoilVelYaw += (-140 * this._recoilYaw - 18 * this._recoilVelYaw) * h;
      this._recoilYaw += this._recoilVelYaw * h;
      this._recoilVelRoll += (-140 * this._recoilRoll - 18 * this._recoilVelRoll) * h;
      this._recoilRoll += this._recoilVelRoll * h;
    }

    // Reload: dip, roll, magazine out/in, refill at 1.6 s, finish at 2.1 s.
    let reloadX = 0;
    let reloadY = 0;
    let reloadZ = 0;
    let reloadRX = 0;
    let reloadRY = 0;
    let reloadRZ = 0;
    let magDrop = 0;

    if (this.isReloading) {
      this._reloadTime += step;
      const p = Math.min(this._reloadTime / 2.1, 1);
      const dip = Math.sin(Math.PI * Math.min(p / 0.98, 1));
      // Pull the weapon toward the centre and roll it so the magwell is visible.
      reloadX = -0.06 * dip;
      reloadY = 0.05 * dip;
      reloadZ = 0.02 * dip;
      reloadRX = -0.18 * dip;
      reloadRY = 0.2 * dip;
      reloadRZ = 0.62 * dip;

      if (p > 0.12 && p < 0.72) {
        const m = (p - 0.12) / 0.6;
        magDrop = Math.sin(m * Math.PI) * 0.14;
      }

      if (!this._reloadRefilled && this._reloadTime >= 1.6) {
        const transfer = Math.min(30 - this.ammoInMag, this.reserveAmmo);
        this.ammoInMag += transfer;
        this.reserveAmmo -= transfer;
        this._reloadRefilled = true;
      }

      if (this._reloadTime >= 2.1) {
        this.isReloading = false;
        this._reloadTime = 0;
      }
    }

    this.magazine.position.y = this._magBaseY - magDrop;
    this.magazine.position.z = this._magBaseZ + magDrop * 0.28;
    this.magazine.rotation.x = this._magBaseRotX + magDrop * 2.4;

    const pos = this.group.position;
    pos.copy(this.hipPosition).lerp(this.adsPosition, ads);
    pos.x += -0.034 * sprint + bobX + this._swayX * swayScale + reloadX;
    pos.y += -0.085 * sprint + bobY + breath + this._swayY * swayScale + reloadY;
    pos.z += 0.03 * sprint + reloadZ + this._recoilZ;

    const rot = this.group.rotation;
    rot.set(
      THREE.MathUtils.lerp(this.hipRotation.x, this.adsRotation.x, ads)
        - 0.34 * sprint + this._recoilPitch + this._swayY * 2.2 * swayScale + reloadRX,
      THREE.MathUtils.lerp(this.hipRotation.y, this.adsRotation.y, ads)
        - 0.16 * sprint + this._recoilYaw - this._swayX * 2.0 * swayScale + reloadRY,
      THREE.MathUtils.lerp(this.hipRotation.z, this.adsRotation.z, ads)
        - 0.34 * sprint + this._recoilRoll + bobRoll + reloadRZ,
    );

    this._updateFlash(step);
    this._updateShells(step);
  }

  /* ---------------------------------------------------------------- *
   * Internal effects
   * ---------------------------------------------------------------- */

  _updateFlash(dt) {
    if (this._flashTimer <= 0) return;
    this._flashTimer -= dt;
    if (this._flashTimer <= 0) {
      this._flashTimer = 0;
      this.flash.visible = false;
      this.flashLight.intensity = 0;
    }
  }

  _ejectShell() {
    const geometry = new THREE.CylinderGeometry(0.0055, 0.0062, 0.024, 8);
    const material = MAT.brass.clone();
    material.transparent = true;
    const shell = new THREE.Mesh(geometry, material);
    shell.position.set(0.048, 0.07, -0.035);
    shell.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    shell.userData.velocity = new THREE.Vector3(
      0.7 + Math.random() * 0.35,
      0.75 + Math.random() * 0.35,
      0.08 + Math.random() * 0.22,
    );
    shell.userData.spin = new THREE.Vector3(
      (Math.random() - 0.5) * 16,
      (Math.random() - 0.5) * 16,
      (Math.random() - 0.5) * 16,
    );
    shell.userData.life = 0;
    this.group.add(shell);
    this._shells.push(shell);
  }

  _updateShells(dt) {
    for (let i = this._shells.length - 1; i >= 0; i -= 1) {
      const shell = this._shells[i];
      const data = shell.userData;
      data.life += dt;
      data.velocity.y -= 3.2 * dt;
      shell.position.addScaledVector(data.velocity, dt);
      shell.rotation.x += data.spin.x * dt;
      shell.rotation.y += data.spin.y * dt;
      shell.rotation.z += data.spin.z * dt;

      // A shallow local bounce keeps the casing visible for the full lifetime.
      if (shell.position.y < -0.32) {
        shell.position.y = -0.32;
        if (data.velocity.y < 0) data.velocity.y *= -0.32;
        data.velocity.x *= 0.72;
        data.velocity.z *= 0.72;
        data.spin.multiplyScalar(0.7);
      }

      if (data.life > 1) {
        shell.material.opacity = Math.max(0, 1 - (data.life - 1) / 0.5);
      }
      if (data.life >= 1.5) {
        this.group.remove(shell);
        shell.geometry.dispose();
        shell.material.dispose();
        this._shells.splice(i, 1);
      }
    }
  }
}

