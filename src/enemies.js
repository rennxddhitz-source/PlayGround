import * as THREE from 'three';
import { resolveCircle, lineBlocked } from './util.js';

const ONE = new THREE.Vector3(1, 1, 1);

export class Enemy {
  constructor(manager, position, wave) {
    this.manager = manager;
    this.scene = manager.scene;
    this.world = manager.world;
    this.player = manager.player;
    this.fx = manager.fx;
    this.audio = manager.audio;

    this.maxHp = 100 + wave * 12;
    this.hp = this.maxHp;
    this.dead = false;
    this.deathT = 0;
    this.hitFlash = 0;
    this.walkPhase = Math.random() * Math.PI * 2;
    this.speed = 2.1 + Math.min(1.4, wave * 0.14);
    this.state = 'spawn';
    this.spawnT = 0;
    this.nextShot = 1.2 + Math.random() * 2;
    this.burst = 0;
    this.burstT = 0;
    this.los = false;
    this.losT = Math.random() * 0.2;
    this.strafeDir = Math.random() > 0.5 ? 1 : -1;
    this.strafeT = 1.5 + Math.random() * 2;
    this.aimFlash = 0;

    this.group = new THREE.Group();
    this.group.position.copy(position);
    this.group.scale.set(1.1, 0.01, 1.1);
    this.scene.add(this.group);

    this.hitMeshes = [];
    this.build(wave);
    this.group.updateMatrixWorld(true);
  }

  build(wave) {
    const armor = new THREE.MeshStandardMaterial({ color: 0x3f4852, metalness: 0.72, roughness: 0.42, emissive: 0x0a1218, emissiveIntensity: 0.6 });
    const plate = new THREE.MeshStandardMaterial({ color: 0x252c33, metalness: 0.68, roughness: 0.52, emissive: 0x070c11, emissiveIntensity: 0.5 });
    const trim = new THREE.MeshStandardMaterial({ color: 0x22262b, metalness: 0.6, roughness: 0.45 });
    const glow = new THREE.MeshStandardMaterial({
      color: 0x1a0d06, emissive: 0xff5a16, emissiveIntensity: 2.4, metalness: 0.3, roughness: 0.4,
    });
    const eye = new THREE.MeshStandardMaterial({
      color: 0x0a0a0a, emissive: 0xff7a22, emissiveIntensity: 6, metalness: 0.2, roughness: 0.3,
    });
    const gunMat = new THREE.MeshStandardMaterial({ color: 0x191c20, metalness: 0.85, roughness: 0.35 });
    this.mats = [armor, plate, trim, glow];

    const part = (geo, mat, x, y, z, parent = this.group, tag = null) => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      m.castShadow = true;
      m.receiveShadow = true;
      parent.add(m);
      if (tag) {
        m.userData.enemy = this;
        m.userData.part = tag;
        this.hitMeshes.push(m);
      }
      return m;
    };

    // legs
    this.legs = [];
    for (const s of [-1, 1]) {
      const hip = new THREE.Group();
      hip.position.set(s * 0.15, 1.0, 0);
      this.group.add(hip);
      part(new THREE.BoxGeometry(0.17, 0.45, 0.19), plate, 0, -0.225, 0, hip, 'body');
      const knee = new THREE.Group();
      knee.position.set(0, -0.45, 0);
      hip.add(knee);
      part(new THREE.BoxGeometry(0.15, 0.44, 0.17), armor, 0, -0.22, 0, knee, 'body');
      part(new THREE.BoxGeometry(0.19, 0.1, 0.28), plate, 0, -0.45, -0.05, knee, 'body');
      // glowing knee / shin accents
      part(new THREE.BoxGeometry(0.02, 0.18, 0.02), glow, s * 0.075, -0.22, -0.085, knee, null);
      this.legs.push({ hip, knee, s });
    }

    // pelvis + torso
    part(new THREE.BoxGeometry(0.44, 0.2, 0.28), plate, 0, 1.02, 0, this.group, 'body');
    this.torso = new THREE.Group();
    this.torso.position.y = 1.32;
    this.group.add(this.torso);
    part(new THREE.BoxGeometry(0.52, 0.48, 0.28), armor, 0, 0, 0, this.torso, 'body');
    part(new THREE.BoxGeometry(0.4, 0.3, 0.06), plate, 0, 0.03, -0.16, this.torso, 'body');
    // glowing core
    part(new THREE.BoxGeometry(0.09, 0.09, 0.03), glow, 0, 0.08, -0.2, this.torso, null);
    // backpack
    part(new THREE.BoxGeometry(0.34, 0.32, 0.14), plate, 0, 0.02, 0.2, this.torso, null);
    part(new THREE.BoxGeometry(0.2, 0.02, 0.02), glow, 0, 0.14, 0.27, this.torso, null);

    // shoulders
    for (const s of [-1, 1]) {
      part(new THREE.BoxGeometry(0.18, 0.16, 0.24), armor, s * 0.34, 1.55, 0, this.group, 'body');
    }

    // arms
    this.arms = [];
    for (const s of [-1, 1]) {
      const shoulder = new THREE.Group();
      shoulder.position.set(s * 0.34, 1.5, 0);
      this.group.add(shoulder);
      part(new THREE.BoxGeometry(0.12, 0.32, 0.13), plate, 0, -0.18, 0, shoulder, 'body');
      const elbow = new THREE.Group();
      elbow.position.set(0, -0.34, 0);
      shoulder.add(elbow);
      part(new THREE.BoxGeometry(0.105, 0.3, 0.12), armor, 0, -0.15, 0, elbow, 'body');
      this.arms.push({ shoulder, elbow, s });
    }

    // head
    this.head = new THREE.Group();
    this.head.position.y = 1.75;
    this.group.add(this.head);
    part(new THREE.BoxGeometry(0.3, 0.24, 0.28), armor, 0, 0, 0, this.head, 'head');
    part(new THREE.BoxGeometry(0.34, 0.06, 0.3), plate, 0, 0.13, 0, this.head, 'head');
    const visor = part(new THREE.BoxGeometry(0.24, 0.06, 0.02), eye, 0, 0.01, -0.145, this.head, null);
    visor.castShadow = false;
    part(new THREE.BoxGeometry(0.03, 0.2, 0.24), trim, 0.16, 0, 0.02, this.head, null);
    part(new THREE.BoxGeometry(0.03, 0.2, 0.24), trim, -0.16, 0, 0.02, this.head, null);

    // weapon held at right side
    const gun = new THREE.Group();
    gun.position.set(0.3, 1.2, -0.2);
    this.group.add(gun);
    const gm = (w, h, d, x, y, z) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), gunMat);
      m.position.set(x, y, z);
      m.castShadow = true;
      gun.add(m);
      return m;
    };
    gm(0.07, 0.09, 0.46, 0, 0, -0.12);
    gm(0.045, 0.045, 0.34, 0, 0.01, -0.46);
    gm(0.055, 0.14, 0.09, 0, -0.12, -0.02);
    gm(0.03, 0.05, 0.07, 0, 0.02, 0.12);
    const muzzleTip = new THREE.Object3D();
    muzzleTip.position.set(0, 0.01, -0.64);
    gun.add(muzzleTip);
    this.muzzle = muzzleTip;
    this.gun = gun;

    // right hand on gun
    part(new THREE.BoxGeometry(0.08, 0.08, 0.09), plate, 0.3, 1.15, -0.12, this.group, null);

    // scale hp by wave visually via core
    glow.emissiveIntensity = 1.8 + wave * 0.2;
  }

  takeDamage(amount, head = false) {
    if (this.dead) return false;
    this.hp -= amount;
    this.hitFlash = 0.14;
    for (const m of this.mats) {
      m.emissive.setHex(0xff8a3c);
      m.emissiveIntensity = m === this.mats[3] ? 6 : 1.2;
    }
    if (this.hp <= 0) {
      this.die(head);
      return true;
    }
    return false;
  }

  die(head) {
    this.dead = true;
    this.deathT = 0;
    this.burst = 0;
    const p = this.group.position.clone();
    p.y = 1.2;
    this.fx.burst(p, new THREE.Vector3(0, 1, 0.3).normalize(), 0xff7a20, 34, 9, 0.22);
    this.fx.burst(p, new THREE.Vector3(0, 1, 0.3).normalize(), 0x7fe7ff, 14, 5, 0.12);
    this.audio.enemyDeath();
    this.manager.onEnemyDeath(this, head);
  }

  shoot(dist) {
    const from = new THREE.Vector3();
    this.muzzle.getWorldPosition(from);
    const eye = this.player.camera.getWorldPosition(new THREE.Vector3());
    const accuracy = Math.min(0.72, 0.4 + this.manager.wave * 0.025);
    const hitChance = accuracy * (dist < 12 ? 1 : dist < 22 ? 0.8 : 0.55);
    const willHit = Math.random() < hitChance;
    const target = eye.clone();
    if (!willHit) {
      target.x += (Math.random() - 0.5) * 2.4;
      target.y += (Math.random() - 0.6) * 1.6;
      target.z += (Math.random() - 0.5) * 2.4;
    } else {
      target.x += (Math.random() - 0.5) * 0.25;
      target.y += (Math.random() - 0.5) * 0.25;
    }
    this.fx.tracer(from, target, 0xffb060, 0.85);
    this.fx.burst(from, new THREE.Vector3(0, 0.2, -1), 0xffc070, 4, 2.5, 0.08);
    this.audio.enemyShot();
    if (willHit && this.player.alive) {
      this.player.damage(5 + Math.random() * 4);
    }
  }

  update(dt, t, others) {
    if (this.dead) {
      this.deathT += dt;
      if (this.deathT > 0.15) {
        const k = Math.min(1, (this.deathT - 0.15) / 0.55);
        const ease = 1 - Math.pow(1 - k, 3);
        this.group.rotation.x = ease * (Math.PI / 2 - 0.1);
        this.group.position.y = -Math.sin(ease * Math.PI) * 0.08;
      }
      if (this.deathT > 2.6) {
        this.group.position.y -= dt * 0.5;
      }
      if (this.deathT > 3.2) {
        this.group.scale.multiplyScalar(Math.max(0, 1 - dt * 1.5));
      }
      return;
    }

    // hit flash decay
    if (this.hitFlash > 0) {
      this.hitFlash -= dt;
      if (this.hitFlash <= 0) {
        this.mats[0].emissive.setHex(0x000000);
        this.mats[0].emissiveIntensity = 0;
        this.mats[1].emissive.setHex(0x000000);
        this.mats[1].emissiveIntensity = 0;
        this.mats[2].emissive.setHex(0x000000);
        this.mats[2].emissiveIntensity = 0;
        this.mats[3].emissive.setHex(0xff5a16);
        this.mats[3].emissiveIntensity = 2.4;
      }
    }

    // spawn materialize
    if (this.state === 'spawn') {
      this.spawnT += dt;
      const k = Math.min(1, this.spawnT / 0.55);
      const ease = 1 - Math.pow(1 - k, 3);
      this.group.scale.set(1.1, Math.max(0.02, ease) * 1.1, 1.1);
      if (this.spawnT < 0.1) {
        this.fx.burst(this.group.position.clone().setY(0.2), new THREE.Vector3(0, 1, 0), 0x7fe7ff, 12, 3, 0.1);
      }
      if (k >= 1) this.state = 'active';
      return;
    }

    const playerPos = this.player.pos;
    const to = new THREE.Vector3(playerPos.x - this.group.position.x, 0, playerPos.z - this.group.position.z);
    const dist = to.length();
    if (dist > 0.001) to.multiplyScalar(1 / dist);

    // line of sight
    this.losT -= dt;
    if (this.losT <= 0) {
      this.losT = 0.14 + Math.random() * 0.08;
      const eyePos = this.group.position.clone().setY(1.65);
      const pEye = this.player.camera.getWorldPosition(new THREE.Vector3());
      this.los = this.player.alive && !lineBlocked(eyePos, pEye, this.world.raycastMeshes);
    }

    // movement
    let move = new THREE.Vector3();
    if (dist > 15) {
      move.copy(to);
    } else if (dist < 6.5) {
      move.copy(to).multiplyScalar(-0.8);
    } else {
      this.strafeT -= dt;
      if (this.strafeT <= 0) {
        this.strafeT = 1.6 + Math.random() * 1.8;
        this.strafeDir *= -1;
      }
      move.set(-to.z * this.strafeDir, 0, to.x * this.strafeDir);
    }

    // separation from other enemies
    for (const o of others) {
      if (o === this || o.dead) continue;
      const dx = this.group.position.x - o.group.position.x;
      const dz = this.group.position.z - o.group.position.z;
      const d = Math.hypot(dx, dz);
      if (d < 1.3 && d > 0.001) {
        move.x += (dx / d) * (1.3 - d) * 1.6;
        move.z += (dz / d) * (1.3 - d) * 1.6;
      }
    }

    if (move.lengthSq() > 0.0001) move.normalize();
    const step = this.speed * dt;
    this.group.position.x += move.x * step;
    this.group.position.z += move.z * step;
    resolveCircle(this.group.position, 0.45, this.world.colliders, 1.9);
    this.group.position.x = Math.max(-32, Math.min(32, this.group.position.x));
    this.group.position.z = Math.max(-32, Math.min(32, this.group.position.z));

    // facing
    const targetYaw = Math.atan2(-to.x, -to.z);
    let dy = targetYaw - this.group.rotation.y;
    while (dy > Math.PI) dy -= Math.PI * 2;
    while (dy < -Math.PI) dy += Math.PI * 2;
    this.group.rotation.y += dy * Math.min(1, dt * 7);

    // walk animation
    this.walkPhase += dt * (2.5 + this.speed * 1.6);
    const swing = Math.sin(this.walkPhase) * 0.5;
    if (this.legs) {
      this.legs[0].hip.rotation.x = swing;
      this.legs[1].hip.rotation.x = -swing;
      this.legs[0].knee.rotation.x = Math.max(0, -Math.sin(this.walkPhase)) * 0.5;
      this.legs[1].knee.rotation.x = Math.max(0, Math.sin(this.walkPhase)) * 0.5;
    }
    if (this.arms) {
      this.arms[0].shoulder.rotation.x = -swing * 0.5;
      this.arms[1].shoulder.rotation.x = -1.15;
      this.arms[1].elbow.rotation.x = -0.3;
    }
    this.torso.position.y = 1.32 + Math.sin(this.walkPhase * 2) * 0.012;

    // shooting
    this.nextShot -= dt;
    if (this.burst > 0) {
      this.burstT -= dt;
      if (this.burstT <= 0) {
        this.burstT = 0.13;
        this.burst--;
        this.shoot(dist);
        if (this.burst === 0) this.nextShot = 1.4 + Math.random() * 1.6;
      }
    } else if (this.los && dist < 30 && this.nextShot <= 0 && this.player.alive) {
      this.burst = 3;
      this.burstT = 0;
    }

    // idle visor pulse
    this.mats[3].emissiveIntensity = 2.2 + Math.sin(t * 3 + this.walkPhase) * 0.5;
  }

  dispose() {
    this.scene.remove(this.group);
    this.group.traverse((o) => {
      if (o.isMesh) {
        o.geometry.dispose();
        if (Array.isArray(o.material)) o.material.forEach((m) => m.dispose());
        else o.material.dispose();
      }
    });
    this.hitMeshes = [];
  }
}

export class EnemyManager {
  constructor(scene, world, fx, audio, player, hud, callbacks = {}) {
    this.scene = scene;
    this.world = world;
    this.fx = fx;
    this.audio = audio;
    this.player = player;
    this.hud = hud;
    this.onKill = callbacks.onKill || (() => {});
    this.onAllDead = callbacks.onAllDead || (() => {});
    this.enemies = [];
    this.hitMeshes = [];
    this.wave = 1;
    this.pending = 0;
    this.time = 0;
  }

  reset() {
    for (const e of this.enemies) e.dispose();
    this.enemies = [];
    this.hitMeshes = [];
    this.pending = 0;
  }

  spawnWave(wave, count) {
    this.wave = wave;
    this.pending = count;
    const used = new Set();
    for (let i = 0; i < count; i++) {
      let pos = null;
      let best = null;
      for (let attempt = 0; attempt < 12; attempt++) {
        const p = this.world.spawnPoints[Math.floor(Math.random() * this.world.spawnPoints.length)];
        const key = `${p.x},${p.z}`;
        if (used.has(key)) continue;
        const d = Math.hypot(p.x - this.player.pos.x, p.z - this.player.pos.z);
        if (d < 12) continue;
        best = p;
        used.add(key);
        break;
      }
      if (!best) {
        const p = this.world.spawnPoints[Math.floor(Math.random() * this.world.spawnPoints.length)];
        pos = new THREE.Vector3(p.x + (Math.random() - 0.5) * 4, 0, p.z + (Math.random() - 0.5) * 4);
      } else {
        pos = new THREE.Vector3(best.x, 0, best.z);
      }
      this.spawnEnemy(pos, wave);
    }
    this.pending = 0;
  }

  spawnEnemy(pos, wave) {
    const e = new Enemy(this, pos, wave);
    this.enemies.push(e);
    this.hitMeshes.push(...e.hitMeshes);
  }

  onEnemyDeath(enemy, head) {
    const idx = this.hitMeshes.findIndex((m) => m.userData.enemy === enemy);
    if (idx >= 0) this.hitMeshes = this.hitMeshes.filter((m) => m.userData.enemy !== enemy);
    this.onKill(enemy, head);
  }

  aliveCount() {
    return this.enemies.filter((e) => !e.dead).length;
  }

  remaining() {
    return this.aliveCount() + this.pending;
  }

  update(dt, t) {
    this.time = t;
    for (const e of this.enemies) e.update(dt, t, this.enemies);

    let removed = false;
    for (const e of this.enemies) {
      if (e.dead && e.deathT > 4.4) {
        e.dispose();
        removed = true;
      }
    }
    if (removed) this.enemies = this.enemies.filter((e) => e.deathT <= 4.4);
  }
}
