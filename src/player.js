import * as THREE from 'three';
import { resolveCircle } from './util.js';

const BASE_FOV = 76;
const ADS_FOV = 52;

export class Player {
  constructor(camera, world, audio, hud) {
    this.camera = camera;
    this.colliders = world.colliders;
    this.audio = audio;
    this.hud = hud;

    this.pos = new THREE.Vector3(0, 0, 21);
    this.yaw = 0;
    this.pitch = -0.03;
    this.vel = new THREE.Vector3();
    this.vy = 0;
    this.onGround = true;

    this.maxHealth = 100;
    this.health = 100;
    this.alive = true;
    this.lastDamage = -999;
    this.ads = false;
    this.sprinting = false;
    this.crouching = false;
    this.eye = 1.68;
    this.eyeCurrent = 1.68;

    this.bobTime = 0;
    this.bobAmount = 0;
    this.roll = 0;

    this.recoilPitch = 0;
    this.recoilYaw = 0;
    this.shake = 0;
    this.shakeSeed = Math.random() * 100;

    this.stepAccum = 0;
    this.sensitivity = 0.0021;
    this.speed = 0;
    this._moved = new THREE.Vector3();
  }

  reset() {
    this.pos.set(0, 0, 21);
    this.yaw = 0;
    this.pitch = -0.03;
    this.vel.set(0, 0, 0);
    this.vy = 0;
    this.health = this.maxHealth;
    this.alive = true;
    this.lastDamage = -999;
    this.ads = false;
    this.eyeCurrent = this.eye;
    this.recoilPitch = this.recoilYaw = 0;
    this.shake = 0;
    this.camera.fov = BASE_FOV;
    this.camera.updateProjectionMatrix();
    this.hud.setHealth(this.health);
  }

  look(dx, dy) {
    if (!this.alive) return;
    const sens = this.sensitivity * (this.ads ? 0.62 : 1);
    this.yaw -= dx * sens;
    this.pitch -= dy * sens;
    const lim = Math.PI / 2 - 0.04;
    this.pitch = Math.max(-lim, Math.min(lim, this.pitch));
  }

  addRecoil(pitch, yaw) {
    this.recoilPitch += pitch;
    this.recoilYaw += yaw;
  }

  setAds(on) {
    this.ads = on;
  }

  damage(amount, from = null) {
    if (!this.alive) return;
    this.health = Math.max(0, this.health - amount);
    this.lastDamage = performance.now() / 1000;
    this.shake = Math.min(0.05, this.shake + 0.018);
    this.hud.damage();
    this.hud.setHealth(this.health, this.maxHealth);
    this.audio.hurt();
    if (this.health <= 0) {
      this.alive = false;
    }
  }

  update(dt, input) {
    const now = performance.now() / 1000;

    // regen after 6s
    if (this.alive && now - this.lastDamage > 6 && this.health < this.maxHealth) {
      this.health = Math.min(this.maxHealth, this.health + 9 * dt);
      this.hud.setHealth(this.health, this.maxHealth);
    }

    this.crouching = !!input.crouch;
    this.sprinting = !!input.sprint && !this.ads && !this.crouching && this.alive;

    const fwd = (input.forward ? 1 : 0) - (input.back ? 1 : 0);
    const strafe = (input.right ? 1 : 0) - (input.left ? 1 : 0);
    const dir = new THREE.Vector3();
    if (fwd || strafe) {
      const sin = Math.sin(this.yaw), cos = Math.cos(this.yaw);
      dir.x = -sin * fwd + cos * strafe;
      dir.z = -cos * fwd - sin * strafe;
      dir.normalize();
    }

    let speed = 5.6;
    if (this.ads) speed = 3.4;
    if (this.crouching) speed = 2.5;
    if (this.sprinting) speed = 8.6;

    const accel = this.onGround ? 11 : 2.4;
    const k = 1 - Math.exp(-accel * dt);
    this.vel.x += (dir.x * speed - this.vel.x) * k;
    this.vel.z += (dir.z * speed - this.vel.z) * k;

    // jump / gravity
    if (input.jump && this.onGround && this.alive) {
      this.vy = 6.4;
      this.onGround = false;
    }
    this.vy -= 21 * dt;
    this.pos.y += this.vy * dt;
    if (this.pos.y <= 0) {
      this.pos.y = 0;
      this.vy = 0;
      this.onGround = true;
    }

    this.pos.x += this.vel.x * dt;
    this.pos.z += this.vel.z * dt;
    resolveCircle(this.pos, 0.38, this.colliders, 1.8);

    // clamp to arena
    this.pos.x = Math.max(-33, Math.min(33, this.pos.x));
    this.pos.z = Math.max(-33, Math.min(33, this.pos.z));

    // movement feedback
    const hSpeed = Math.hypot(this.vel.x, this.vel.z);
    this.speed = hSpeed;
    this.bobTime += dt * hSpeed * 1.35;
    const targetBob = this.onGround ? Math.min(1, hSpeed / 6) : 0;
    this.bobAmount += (targetBob - this.bobAmount) * Math.min(1, dt * 8);

    // footsteps
    if (this.onGround && hSpeed > 1.2) {
      this.stepAccum += hSpeed * dt;
      const stride = this.sprinting ? 2.35 : 2.0;
      if (this.stepAccum > stride) {
        this.stepAccum = 0;
        this.audio.step(this.sprinting);
      }
    }

    // eye height / crouch
    const targetEye = this.crouching ? 1.08 : 1.68;
    this.eyeCurrent += (targetEye - this.eyeCurrent) * Math.min(1, dt * 9);

    // recoil recovery
    const rec = Math.exp(-dt * 7.5);
    this.recoilPitch *= rec;
    this.recoilYaw *= rec;
    this.shake *= Math.exp(-dt * 6);

    // fov
    const targetFov = this.ads ? ADS_FOV : BASE_FOV;
    if (Math.abs(this.camera.fov - targetFov) > 0.05) {
      this.camera.fov += (targetFov - this.camera.fov) * Math.min(1, dt * 12);
      this.camera.updateProjectionMatrix();
    }

    // camera transform
    const bobY = Math.sin(this.bobTime * 2) * 0.026 * this.bobAmount;
    const bobX = Math.cos(this.bobTime) * 0.03 * this.bobAmount;
    const shakeT = now * 42;
    const shakeX = Math.sin(shakeT * 1.7 + this.shakeSeed) * this.shake;
    const shakeY = Math.cos(shakeT * 1.3 + this.shakeSeed) * this.shake;

    this.camera.position.set(this.pos.x + bobX * 0.4, this.pos.y + this.eyeCurrent + bobY, this.pos.z);
    this.camera.rotation.order = 'YXZ';

    const targetRoll = (this.ads ? 0 : -strafe * 0.012) + Math.cos(this.bobTime) * 0.004 * this.bobAmount;
    this.roll += (targetRoll - this.roll) * Math.min(1, dt * 6);

    this.camera.rotation.set(
      this.pitch + this.recoilPitch + shakeY,
      this.yaw + this.recoilYaw + shakeX,
      this.roll
    );
  }
}
