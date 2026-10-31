import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

const MAG_SIZE = 30;
const RESERVE_START = 150;
const FIRE_RATE = 0.095;
const RELOAD_TIME = 1.75;

function reticleTexture() {
  const s = 128;
  const c = document.createElement('canvas');
  c.width = c.height = s;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, s, s);
  ctx.strokeStyle = 'rgba(120,240,255,0.95)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(s / 2, s / 2, 26, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = 'rgba(160,250,255,1)';
  ctx.beginPath();
  ctx.arc(s / 2, s / 2, 4, 0, Math.PI * 2);
  ctx.fill();
  for (const [x1, y1, x2, y2] of [[64, 8, 64, 24], [64, 104, 64, 120], [8, 64, 24, 64], [104, 64, 120, 64]]) {
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function gunWearTexture(base = '#343a40', seed = 1) {
  const size = 256;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  let a = seed * 9301 + 49297;
  const rand = () => { a = (a * 9301 + 49297) % 233280; return a / 233280; };
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, size, size);
  const img = ctx.getImageData(0, 0, size, size);
  for (let i = 0; i < size * size; i++) {
    const n = (rand() - 0.5) * 26;
    img.data[i * 4] += n; img.data[i * 4 + 1] += n; img.data[i * 4 + 2] += n;
  }
  ctx.putImageData(img, 0, 0);
  for (let i = 0; i < 70; i++) {
    ctx.strokeStyle = `rgba(${180 + rand() * 50},${185 + rand() * 50},${195 + rand() * 45},${rand() * 0.16})`;
    ctx.lineWidth = 0.6;
    const x = rand() * size, y = rand() * size;
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + (rand() - 0.5) * 60, y + (rand() - 0.5) * 6); ctx.stroke();
  }
  for (let i = 0; i < 24; i++) {
    ctx.fillStyle = `rgba(16,18,20,${0.1 + rand() * 0.25})`;
    ctx.beginPath(); ctx.arc(rand() * size, rand() * size, 1 + rand() * 5, 0, Math.PI * 2); ctx.fill();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 4;
  return t;
}

export class Weapon {
  constructor(camera, scene, world, enemies, fx, audio, hud, player, callbacks = {}) {
    this.camera = camera;
    this.scene = scene;
    this.world = world;
    this.enemies = enemies;
    this.fx = fx;
    this.audio = audio;
    this.hud = hud;
    this.player = player;
    this.onKill = callbacks.onKill || (() => {});
    this.onShot = callbacks.onShot || (() => {});

    this.mag = MAG_SIZE;
    this.reserve = RESERVE_START;
    this.reloading = false;
    this.reloadT = 0;
    this.cooldown = 0;
    this.bloom = 0;
    this.kickZ = 0;
    this.kickRot = 0;
    this.kickRoll = 0;
    this.flashTime = 0;
    this.triggerHeld = false;

    this.raycaster = new THREE.Raycaster();
    this.raycaster.far = 200;

    this.root = new THREE.Group();
    this.root.position.set(0.36, -0.25, -0.8);
    this.root.scale.setScalar(0.72);
    camera.add(this.root);
    this.build();

    this.hud.setAmmo(this.mag, this.reserve);
  }

  build() {
    const wear = gunWearTexture('#343a40', 3);
    const gunmetal = new THREE.MeshStandardMaterial({ map: wear, color: 0xffffff, metalness: 0.32, roughness: 0.58, envMapIntensity: 0.3 });
    const gunmetalLight = new THREE.MeshStandardMaterial({ map: gunWearTexture('#4d555e', 9), color: 0xffffff, metalness: 0.4, roughness: 0.48, envMapIntensity: 0.35 });
    const dark = new THREE.MeshStandardMaterial({ color: 0x111417, metalness: 0.35, roughness: 0.7, envMapIntensity: 0.3 });
    const polymer = new THREE.MeshStandardMaterial({ color: 0x15171a, metalness: 0.15, roughness: 0.85, envMapIntensity: 0.4 });
    const accent = new THREE.MeshStandardMaterial({
      color: 0x38160a, emissive: 0xff6a18, emissiveIntensity: 2.2, metalness: 0.4, roughness: 0.4,
    });
    const glass = new THREE.MeshBasicMaterial({
      color: 0x6fe8ff, transparent: true, opacity: 0.07, blending: THREE.AdditiveBlending, depthWrite: false,
    });

    const rb = (w, h, d, r = 0.006, seg = 2) => new RoundedBoxGeometry(w, h, d, seg, r);
    const add = (geo, mat, x, y, z, rx = 0, ry = 0, rz = 0, parent = this.root) => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      m.rotation.set(rx, ry, rz);
      m.castShadow = false;
      m.receiveShadow = false;
      parent.add(m);
      return m;
    };

    // ---- receiver
    add(rb(0.078, 0.1, 0.38, 0.009, 3), gunmetal, 0, 0, 0);
    add(rb(0.082, 0.045, 0.3, 0.007, 2), gunmetalLight, 0, 0.054, -0.01);
    add(rb(0.074, 0.05, 0.3, 0.007, 2), dark, 0, -0.055, 0.015);
    // side panels catch the light
    add(new THREE.BoxGeometry(0.006, 0.06, 0.26), gunmetalLight, 0.043, 0.005, 0.02);
    add(new THREE.BoxGeometry(0.006, 0.06, 0.26), gunmetalLight, -0.043, 0.005, 0.02);
    // ejection port + bolt
    add(new THREE.BoxGeometry(0.004, 0.032, 0.09), dark, 0.045, 0.012, 0.055);
    add(new THREE.BoxGeometry(0.006, 0.016, 0.05), gunmetalLight, 0.047, 0.012, 0.05);
    // charging handle
    add(new THREE.BoxGeometry(0.028, 0.012, 0.04), dark, 0.02, 0.058, 0.16);
    // screws
    for (const [yy, zz] of [[0.028, -0.11], [-0.028, -0.11], [0.028, 0.13], [-0.028, 0.13]]) {
      add(new THREE.CylinderGeometry(0.006, 0.006, 0.006, 8), gunmetalLight, 0.046, yy, zz, 0, 0, Math.PI / 2);
    }

    // ---- top rail
    add(new THREE.BoxGeometry(0.052, 0.02, 0.4), dark, 0, 0.078, -0.01);
    for (let i = 0; i < 11; i++) {
      add(new THREE.BoxGeometry(0.058, 0.012, 0.014), gunmetalLight, 0, 0.094, -0.23 + i * 0.044);
    }

    // ---- handguard
    add(rb(0.072, 0.076, 0.3, 0.01, 3), polymer, 0, 0.002, -0.33);
    for (let i = 0; i < 6; i++) {
      add(new THREE.BoxGeometry(0.076, 0.01, 0.014), gunmetal, 0, 0.002, -0.45 + i * 0.042);
      add(new THREE.BoxGeometry(0.01, 0.034, 0.03), dark, 0.037, 0.0, -0.44 + i * 0.042);
      add(new THREE.BoxGeometry(0.01, 0.034, 0.03), dark, -0.037, 0.0, -0.44 + i * 0.042);
    }
    // handguard top rail continuation
    add(new THREE.BoxGeometry(0.056, 0.012, 0.28), dark, 0, 0.045, -0.33);

    // ---- barrel, gas block, suppressor
    add(new THREE.CylinderGeometry(0.016, 0.016, 0.34, 12), gunmetal, 0, 0.002, -0.62, Math.PI / 2, 0, 0);
    add(new THREE.BoxGeometry(0.045, 0.05, 0.06), gunmetal, 0, 0.01, -0.66);
    add(new THREE.CylinderGeometry(0.033, 0.033, 0.26, 16), dark, 0, 0.002, -0.95, Math.PI / 2, 0, 0);
    for (let i = 0; i < 5; i++) {
      add(new THREE.CylinderGeometry(0.035, 0.035, 0.012, 16), gunmetalLight, 0, 0.002, -0.84 - i * 0.045, Math.PI / 2, 0, 0);
    }
    add(new THREE.CylinderGeometry(0.03, 0.033, 0.03, 16), gunmetal, 0, 0.002, -1.08, Math.PI / 2, 0, 0);
    add(new THREE.BoxGeometry(0.006, 0.012, 0.09), accent, 0.032, 0.02, -0.93);

    // ---- skeleton stock
    add(rb(0.052, 0.085, 0.06, 0.008, 2), dark, 0, -0.005, 0.21);
    add(rb(0.022, 0.026, 0.22, 0.005, 2), gunmetal, 0, 0.048, 0.32, 0.04, 0, 0);
    add(rb(0.022, 0.026, 0.2, 0.005, 2), gunmetal, 0, -0.048, 0.33, -0.08, 0, 0);
    add(rb(0.05, 0.11, 0.028, 0.007, 2), dark, 0, -0.005, 0.425);
    add(new THREE.BoxGeometry(0.036, 0.03, 0.12), polymer, 0, 0.065, 0.33);
    // sling loop
    add(new THREE.TorusGeometry(0.016, 0.004, 6, 12), gunmetalLight, 0.03, -0.06, 0.2, 0, Math.PI / 2, 0);

    // ---- grip, trigger, magazine
    add(rb(0.046, 0.14, 0.062, 0.012, 3), polymer, 0, -0.12, 0.095, 0.32, 0, 0);
    add(new THREE.BoxGeometry(0.05, 0.012, 0.062), dark, 0, -0.185, 0.075, 0.32, 0, 0);
    add(new THREE.BoxGeometry(0.05, 0.02, 0.11), gunmetal, 0, -0.085, -0.02);
    // trigger guard
    add(new THREE.BoxGeometry(0.012, 0.012, 0.09), gunmetal, -0.02, -0.075, 0.02);
    add(new THREE.BoxGeometry(0.012, 0.012, 0.09), gunmetal, 0.02, -0.075, 0.02);
    add(new THREE.BoxGeometry(0.015, 0.04, 0.012), gunmetalLight, 0, -0.1, 0.0, 0.2, 0, 0);
    add(rb(0.046, 0.2, 0.095, 0.009, 2), dark, 0, -0.14, -0.075, -0.18, 0, 0);
    add(new THREE.BoxGeometry(0.05, 0.02, 0.1), polymer, 0, -0.235, -0.09, -0.18, 0, 0);
    for (let i = 0; i < 3; i++) {
      add(new THREE.BoxGeometry(0.048, 0.008, 0.098), gunmetal, 0, -0.09 - i * 0.04, -0.055 - i * 0.008, -0.18, 0, 0);
    }

    // ---- holo sight
    const sightY = 0.096;
    add(rb(0.058, 0.016, 0.095, 0.004, 2), dark, 0, sightY, -0.01);
    add(new THREE.BoxGeometry(0.008, 0.058, 0.06), gunmetalLight, -0.031, sightY + 0.036, -0.032);
    add(new THREE.BoxGeometry(0.008, 0.058, 0.06), gunmetalLight, 0.031, sightY + 0.036, -0.032);
    add(new THREE.BoxGeometry(0.07, 0.01, 0.06), gunmetalLight, 0, sightY + 0.068, -0.032);
    add(new THREE.BoxGeometry(0.07, 0.012, 0.012), dark, 0, sightY + 0.068, 0.0);
    glass.side = THREE.DoubleSide;
    const glassMesh = add(new THREE.PlaneGeometry(0.056, 0.05), glass, 0, sightY + 0.038, -0.055);
    add(new THREE.BoxGeometry(0.02, 0.012, 0.02), accent, -0.032, sightY + 0.005, 0.02);

    // reticle (must sit on the camera axis when aiming)
    const retMat = new THREE.MeshBasicMaterial({
      map: reticleTexture(), transparent: true, blending: THREE.AdditiveBlending,
      depthWrite: false, opacity: 0.95,
    });
    retMat.side = THREE.DoubleSide;
    add(new THREE.PlaneGeometry(0.046, 0.046), retMat, 0, sightY + 0.038, -0.052);

    // ---- laser module
    add(new THREE.BoxGeometry(0.03, 0.03, 0.08), dark, 0.052, 0.0, -0.38);
    add(new THREE.SphereGeometry(0.008, 8, 6), new THREE.MeshBasicMaterial({ color: 0xff2a10 }), 0.052, 0.0, -0.425);

    // ---- gloved hands
    const glove = new THREE.MeshStandardMaterial({ color: 0x1b1e21, roughness: 0.9, metalness: 0.05 });
    const gloveLight = new THREE.MeshStandardMaterial({ color: 0x33383e, roughness: 0.8, metalness: 0.1 });
    const rh = add(rb(0.072, 0.085, 0.095, 0.014, 3), glove, 0, -0.1, 0.1);
    rh.rotation.x = 0.35;
    add(new THREE.BoxGeometry(0.026, 0.05, 0.07), gloveLight, -0.036, -0.085, 0.11, 0.3, 0, 0.2);
    const lh = add(rb(0.084, 0.07, 0.105, 0.014, 3), glove, -0.004, -0.058, -0.33);
    lh.rotation.z = -0.22;
    add(new THREE.BoxGeometry(0.03, 0.05, 0.075), gloveLight, 0.038, -0.04, -0.33, 0, 0, -0.2);

    // ---- muzzle anchor + flash
    this.muzzle = new THREE.Object3D();
    this.muzzle.position.set(0, 0.002, -1.1);
    this.root.add(this.muzzle);

    const flashMat = new THREE.SpriteMaterial({
      map: this.fx.flashTex, color: 0xffe0b0, transparent: true, opacity: 0,
      blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false,
    });
    this.flash = new THREE.Sprite(flashMat);
    this.flash.scale.setScalar(0.4);
    this.flash.position.set(0, 0.002, -1.12);
    this.flash.visible = false;
    this.root.add(this.flash);

    this.flashLight = new THREE.PointLight(0xffb060, 0, 7, 2);
    this.flashLight.position.set(0, 0.02, -0.7);
    this.root.add(this.flashLight);

    const viewLight = new THREE.PointLight(0xffd9b8, 0.55, 2.0, 2);
    viewLight.position.set(0.12, 0.02, -0.32);
    this.camera.add(viewLight);

    // store animated bits
    this.baseRootPos = this.root.position.clone();
    this.reloadGroup = this.root;
  }

  reset() {
    this.mag = MAG_SIZE;
    this.reserve = RESERVE_START;
    this.reloading = false;
    this.reloadT = 0;
    this.cooldown = 0;
    this.bloom = 0;
    this.kickZ = this.kickRot = this.kickRoll = 0;
    this.flashTime = 0;
    this.root.rotation.set(0, 0, 0);
    this.hud.setAmmo(this.mag, this.reserve);
  }

  startReload() {
    if (this.reloading || this.mag === MAG_SIZE || this.reserve <= 0) return;
    this.reloading = true;
    this.reloadT = 0;
    this.audio.reload();
    this.hud.setAmmo(this.mag, this.reserve, true);
  }

  finishReload() {
    const need = MAG_SIZE - this.mag;
    const take = Math.min(need, this.reserve);
    this.mag += take;
    this.reserve -= take;
    this.reloading = false;
    this.hud.setAmmo(this.mag, this.reserve);
  }

  setTrigger(down) {
    this.triggerHeld = down;
    if (down) this.tryFire();
  }

  tryFire() {
    if (this.reloading || !this.player.alive) return;
    if (this.cooldown > 0) return;
    if (this.mag <= 0) {
      this.audio.empty();
      this.cooldown = 0.25;
      this.startReload();
      return;
    }

    this.mag--;
    this.cooldown = FIRE_RATE;
    this.bloom = Math.min(0.02, this.bloom + 0.0022);
    this.audio.shot();
    this.player.addRecoil(0.0085 + Math.random() * 0.004, (Math.random() - 0.5) * 0.006);
    this.kickZ = Math.min(0.09, this.kickZ + 0.055);
    this.kickRot = Math.min(0.16, this.kickRot + 0.1);
    this.kickRoll = (Math.random() - 0.5) * 0.06;
    this.flashTime = 0.05;
    this.flash.visible = true;
    this.flash.material.opacity = 1;
    this.flash.material.rotation = Math.random() * Math.PI;
    this.flash.scale.setScalar(0.32 + Math.random() * 0.16);
    this.flashLight.intensity = 12;

    const muzzlePos = new THREE.Vector3();
    this.muzzle.getWorldPosition(muzzlePos);
    this.fx.muzzle(muzzlePos, 0xffc070);
    this.hud.setAmmo(this.mag, this.reserve);

    // spread cone
    const dir = new THREE.Vector3();
    this.camera.getWorldDirection(dir);
    const right = new THREE.Vector3().setFromMatrixColumn(this.camera.matrixWorld, 0);
    const up = new THREE.Vector3().setFromMatrixColumn(this.camera.matrixWorld, 1);
    const spread = (this.player.ads ? 0.0016 : 0.0075) + this.bloom + Math.min(0.01, this.player.speed * 0.0011);
    const a = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random()) * spread;
    dir.addScaledVector(right, Math.cos(a) * r).addScaledVector(up, Math.sin(a) * r).normalize();

    this.raycaster.set(this.camera.getWorldPosition(new THREE.Vector3()), dir);
    const targets = this.world.raycastMeshes.concat(this.enemies.hitMeshes);
    const hits = this.raycaster.intersectObjects(targets, false);
    let end = this.raycaster.ray.at(120, new THREE.Vector3());

    if (hits.length) {
      const hit = hits[0];
      end = hit.point.clone();
      const data = hit.object.userData;
      if (data.enemy && !data.enemy.dead) {
        const head = data.part === 'head';
        const dmg = head ? 68 : 26;
        const killed = data.enemy.takeDamage(dmg, head);
        const normal = hit.face
          ? hit.face.normal.clone().transformDirection(hit.object.matrixWorld)
          : dir.clone().negate();
        this.fx.impact(hit.point, normal, true, head);
        this.hud.hit(killed, head);
        this.audio.hit(killed, head);
        if (killed) {
          this.hud.feed('MK-17 ▸ SENTINEL', head);
          this.onKill(data.enemy, head);
        }
      } else {
        const normal = hit.face
          ? hit.face.normal.clone().transformDirection(hit.object.matrixWorld)
          : dir.clone().negate();
        this.fx.impact(hit.point, normal, false, false);
      }
    }

    this.fx.tracer(muzzlePos, end, 0xffd9a0, 1);
    this.onShot();

    if (this.mag === 0 && this.reserve > 0) {
      setTimeout(() => this.startReload(), 220);
    }
  }

  update(dt, input) {
    this.cooldown = Math.max(0, this.cooldown - dt);
    this.bloom = Math.max(0, this.bloom - dt * 0.012);

    if (this.reloading) {
      this.reloadT += dt;
      if (this.reloadT >= RELOAD_TIME) this.finishReload();
    }

    const ads = this.player.ads && !this.reloading;
    const sprint = this.player.sprinting && !this.reloading;
    this.hud.ads(ads);

    // model pose
    const bob = this.player.bobTime;
    const bobAmt = this.player.bobAmount;
    const swayX = Math.sin(bob) * 0.006 * bobAmt;
    const swayY = Math.sin(bob * 2) * 0.005 * bobAmt;

    let px = 0.36 + swayX;
    let py = -0.25 + swayY;
    let pz = -0.8;
    let rx = 0, ry = 0.16, rz = 0;

    if (ads) {
      px = 0 + swayX * 0.25;
      py = -0.0965 + swayY * 0.25;
      pz = -0.66;
      rx = 0; ry = 0; rz = 0;
    }
    if (sprint) {
      px = 0.32 + swayX * 1.4;
      py = -0.32 + swayY * 1.4;
      pz = -0.78;
      rx = -0.12; ry = 0.28; rz = 0.42;
    }
    if (this.reloading) {
      const t = Math.min(1, this.reloadT / RELOAD_TIME);
      const dip = Math.sin(Math.PI * Math.min(1, t * 1.05));
      py -= 0.2 * dip;
      px += 0.04 * dip;
      rz += 0.55 * dip;
      rx -= 0.32 * dip;
    }

    const k = 1 - Math.exp(-dt * 13);
    this.root.position.x += (px - this.root.position.x) * k;
    this.root.position.y += (py - this.root.position.y) * k;
    this.root.position.z += (pz - this.root.position.z) * k;

    // recoil springs
    this.kickZ *= Math.exp(-dt * 15);
    this.kickRot *= Math.exp(-dt * 12);
    this.kickRoll *= Math.exp(-dt * 12);

    this.root.position.z += this.kickZ;
    this.root.rotation.x += (rx + this.kickRot - this.root.rotation.x) * k;
    this.root.rotation.y += (ry - this.root.rotation.y) * k;
    this.root.rotation.z += (rz + this.kickRoll - this.root.rotation.z) * k;

    // muzzle flash decay
    if (this.flashTime > 0) {
      this.flashTime -= dt;
      this.flash.material.opacity = Math.max(0, this.flashTime / 0.05);
      this.flashLight.intensity = Math.max(0, this.flashLight.intensity - dt * 400);
      if (this.flashTime <= 0) this.flash.visible = false;
    }

    if (input.fire && !this.reloading) this.tryFire();
  }
}
