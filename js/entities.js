// ── Game entities: player, enemies, bosses, projectiles, particles, loot ────
import { BIOMES, BOSSES, ELEMENTS, ENEMY_TYPES, elementMultiplier, getWeapon } from './data.js';
import { TAU, clamp, dist, angleTo, angleDiff, pick, rngFrom, dist2 } from './util.js';
import { collide, blockedAt, propRect } from './world.js';
import { drawKnight, drawHeldWeapon, drawEnemy, drawBoss, drawPixelText, drawShadow, drawGlow, px, drawChest, drawShrine, drawPotion, drawCoin, drawMaterial } from './pixel.js';

const ENEMY_PALETTES = {
  ember: { body: '#3a2228', shade: '#241418' },
  frost: { body: '#263b48', shade: '#152630' },
  nature: { body: '#2d3b26', shade: '#1a2417' },
  void: { body: '#2a2340', shade: '#181228' },
};

export class Player {
  constructor(game, x, y) {
    this.game = game;
    this.x = x; this.y = y;
    this.r = 8;
    this.dir = 'right';
    this.moving = false;
    this.aim = 0;
    this.hitFlash = 0;
    this.invuln = 0;
    this.dodgeTime = 0;
    this.dodgeDir = { x: 0, y: 0 };
    this.dodgeCd = 0;
    this.attackCd = 0;
    this.attackAnim = 0;
    this.attackSwing = 0;
    this.walkPhase = 0;
    this.shield = 0;
    this.shieldTimer = 0;
    this.trail = [];
    this.hp = game.stats.maxHp;
    this.mp = game.stats.maxMp;
    this.dead = false;
    this.manaTick = 0;
  }
  get isDodging() { return this.dodgeTime > 0; }
  update(dt, axis, aim, aimActive) {
    const g = this.game;
    if (this.dead) return;
    this.attackCd = Math.max(0, this.attackCd - dt);
    this.attackAnim = Math.max(0, this.attackAnim - dt);
    this.attackSwing *= Math.pow(0.001, dt);
    this.invuln = Math.max(0, this.invuln - dt);
    this.hitFlash = Math.max(0, this.hitFlash - dt);
    this.dodgeCd = Math.max(0, this.dodgeCd - dt);
    this.shieldTimer = Math.max(0, this.shieldTimer - dt);
    if (this.shieldTimer <= 0) this.shield = 0;
    this.walkPhase += dt * (Math.hypot(axis.x, axis.y) > 0.1 ? 1 : 0.15);
    // aim handling
    if (aimActive) this.aim = aim;
    else {
      // auto-aim toward nearest enemy
      const target = g.nearestEnemy(this.x, this.y, 150);
      if (target) { const a = angleTo(this.x, this.y, target.x, target.y); this.aim = this.aim + angleDiff(this.aim, a) * Math.min(1, dt * 8); }
    }
    if (this.dodgeTime > 0) {
      this.dodgeTime -= dt;
      const speed = 340;
      const res = collide(g.room, this.x + this.dodgeDir.x * speed * dt, this.y + this.dodgeDir.y * speed * dt, this.r);
      this.x = res.x; this.y = res.y;
      this.trail.push({ x: this.x, y: this.y, life: 0.28 });
      this.invuln = Math.max(this.invuln, 0.05);
    } else {
      let mx = axis.x, my = axis.y;
      const len = Math.hypot(mx, my);
      if (len > 1) { mx /= len; my /= len; }
      const speed = g.stats.moveSpeed * (1 + (g.blessings.moveSpeed || 0));
      if (len > 0.05) {
        const res = collide(g.room, this.x + mx * speed * dt, this.y + my * speed * dt, this.r);
        this.x = res.x; this.y = res.y;
        this.moving = true;
        const a = Math.atan2(my, mx);
        const deg = ((a * 180 / Math.PI) + 360) % 360;
        this.dir = deg > 45 && deg < 135 ? 'down' : deg >= 135 && deg < 225 ? 'left' : deg >= 225 && deg < 315 ? 'up' : 'right';
      } else this.moving = false;
    }
    this.trail = this.trail.filter(t => { t.life -= dt; return t.life > 0; });
    // regen
    if (g.blessings.regen) this.hp = Math.min(g.stats.maxHp, this.hp + g.blessings.regen * dt);
    this.manaTick += dt;
    if (this.manaTick > 0.25) {
      this.manaTick = 0;
      this.mp = Math.min(g.stats.maxMp, this.mp + g.stats.mpRegen * 0.25);
    }
    if (g.stats.hpRegen) this.hp = Math.min(g.stats.maxHp, this.hp + g.stats.hpRegen * dt);
    this.hp = Math.min(this.hp, g.stats.maxHp);
    this.mp = Math.min(this.mp, g.stats.maxMp);
  }
  tryDodge(axis, aim) {
    if (this.dodgeCd > 0 || this.dodgeTime > 0 || this.dead) return false;
    let dx = axis.x, dy = axis.y;
    if (Math.hypot(dx, dy) < 0.1) { dx = Math.cos(aim); dy = Math.sin(aim); }
    const l = Math.hypot(dx, dy) || 1;
    this.dodgeDir = { x: dx / l, y: dy / l };
    this.dodgeTime = 0.19;
    this.dodgeCd = (this.game.stats.dodgeCd || 1.1);
    this.invuln = 0.34;
    this.game.audio.sfx('dodge');
    this.game.spawnBurst(this.x, this.y, '#8ef0c8', 8, 80);
    return true;
  }
  heal(amount) { this.hp = Math.min(this.game.stats.maxHp, this.hp + amount); this.game.addText(this.x, this.y - 26, `+${Math.round(amount)}`, '#8cf07a'); }
  takeDamage(amount, source) {
    const g = this.game;
    if (this.invuln > 0 || this.dead) return;
    if (this.shield > 0) {
      const absorbed = Math.min(this.shield, amount);
      this.shield -= absorbed; amount -= absorbed;
      g.addText(this.x, this.y - 30, `BLOCK ${Math.round(absorbed)}`, '#6db8ff');
      g.spawnBurst(this.x, this.y, '#6db8ff', 6, 70);
      if (amount <= 0) return;
    }
    const reduction = clamp(g.stats.damageReduction, 0, 0.75) + (this.shieldTimer > 0 ? 0.2 : 0);
    amount *= (1 - clamp(reduction, 0, 0.85));
    amount = Math.max(1, Math.round(amount));
    this.hp -= amount;
    this.invuln = 0.55;
    this.hitFlash = 0.16;
    g.stats.taken += amount;
    g.screenShake(4);
    g.hitStop(0.045);
    g.audio.sfx('hurt');
    g.addText(this.x, this.y - 30, `-${amount}`, '#ff5f6d', 1.2);
    g.spawnBurst(this.x, this.y, '#ff5f6d', 10, 100);
    if (g.blessings.thorns && source) {
      if (source.isEnemy) g.damageEnemy(source, amount * g.blessings.thorns, { element: 'dark', noCrit: true, silent: true });
    }
    if (this.hp <= 0) { this.hp = 0; this.dead = true; g.onPlayerDeath(); }
  }
  draw(ctx, t) {
    for (const tr of this.trail) {
      ctx.globalAlpha = tr.life * 1.7; ctx.fillStyle = '#77e6ff';
      ctx.fillRect(tr.x - 5, tr.y - 16, 10, 24);
    }
    ctx.globalAlpha = 1;
    if (this.invuln > 0 && Math.floor(this.invuln * 20) % 2 === 0 && !this.isDodging) ctx.globalAlpha = 0.5;
    const info = drawKnight(ctx, this.x, this.y, { time: t, dir: this.dir, moving: this.moving, flash: this.hitFlash > 0, aim: this.aim });
    const weapon = getWeapon(this.game.run?.weaponId || this.game.meta.equippedWeapon);
    if (weapon) drawHeldWeapon(ctx, weapon, info.handX, info.handY, this.aim, 0.92, -Math.sin(this.attackAnim * 25) * 0.7);
    if (this.shieldTimer > 0) {
      ctx.save(); ctx.globalAlpha = 0.3 + Math.sin(t * 8) * 0.08; ctx.strokeStyle = '#6db8ff'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(this.x, this.y - 12, 17, 0, TAU); ctx.stroke();
      ctx.globalAlpha = 0.07; ctx.fillStyle = '#6db8ff'; ctx.fill(); ctx.restore();
    }
    ctx.globalAlpha = 1;
  }
}

export class Enemy {
  constructor(game, kind, x, y, opts = {}) {
    const base = ENEMY_TYPES[kind];
    const biome = BIOMES[game.run?.biome || 'ember'];
    this.game = game;
    this.kind = kind;
    this.isEnemy = true;
    this.x = x; this.y = y;
    this.spawnX = x; this.spawnY = y;
    this.r = base.radius * (opts.elite ? 1.2 : 1);
    this.size = base.size;
    this.seed = Math.random() * 100;
    this.element = opts.element || pick(Math.random, biome.elements);
    this.elite = !!opts.elite;
    this.depth = opts.depth || 0;
    const diff = game.difficulty;
    const hpScale = (1 + this.depth * 0.155) * diff.hp * (this.elite ? 2.15 : 1);
    this.maxHp = Math.round(base.hp * hpScale);
    this.hp = this.maxHp;
    this.dmg = base.dmg * (1 + this.depth * 0.10) * diff.dmg * (this.elite ? 1.25 : 1);
    this.speed = base.speed * (this.elite ? 1.08 : 1);
    this.behavior = base.behavior;
    this.xp = Math.round(base.xp * (1 + this.depth * 0.15) * (this.elite ? 2.4 : 1));
    this.gold = Math.round(base.gold * (1 + this.depth * 0.18) * (this.elite ? 3 : 1));
    this.palette = { ...ENEMY_PALETTES[biome.id] };
    this.state = 'spawn';
    this.stateTime = 0.55;
    this.attackCd = 0.4 + Math.random() * 0.7;
    this.windup = 0;
    this.hitFlash = 0;
    this.stun = 0;
    this.slow = 0;
    this.burn = 0; this.burnTick = 0; this.burnDmg = 0;
    this.knock = { x: 0, y: 0 };
    this.dead = false;
    this.deathTime = 0;
    this.telegraph = null;
    this.facing = 1;
    this.chargeDir = { x: 0, y: 0 };
    this.spawnPulse = 1;
    this.damageDealt = 0;
    this.boss = false;
  }
  get isBoss() { return false; }
  update(dt) {
    const g = this.game, p = g.player;
    if (this.dead) { this.deathTime += dt; return; }
    if (this.spawnPulse > 0) this.spawnPulse -= dt * 2;
    this.hitFlash = Math.max(0, this.hitFlash - dt);
    this.stun = Math.max(0, this.stun - dt);
    this.slow = Math.max(0, this.slow - dt);
    if (this.burn > 0) {
      this.burn -= dt; this.burnTick -= dt;
      if (this.burnTick <= 0) { this.burnTick = 0.5; g.damageEnemy(this, this.burnDmg, { element: 'fire', noCrit: true, silent: true, dot: true }); }
      if (Math.random() < dt * 8) g.spawnBurst(this.x, this.y - 8, '#ff7b3a', 1, 30);
    }
    if (this.stun > 0) { this.telegraph = null; return; }
    if (this.state === 'spawn') {
      this.stateTime -= dt;
      if (this.stateTime <= 0) this.state = 'move';
      return;
    }
    // knockback
    if (Math.abs(this.knock.x) + Math.abs(this.knock.y) > 1) {
      const res = collide(g.room, this.x + this.knock.x * dt, this.y + this.knock.y * dt, this.r);
      this.x = res.x; this.y = res.y;
      this.knock.x *= Math.pow(0.002, dt); this.knock.y *= Math.pow(0.002, dt);
    }
    this.attackCd -= dt;
    const d = dist(this.x, this.y, p.x, p.y);
    const speedMul = (this.slow > 0 ? 0.7 : 1) * (this.elite ? 1.05 : 1);
    this.facing = p.x < this.x ? -1 : 1;
    if (this.windup > 0) {
      this.windup -= dt;
      if (this.telegraph) this.telegraph.t = this.windup;
      if (this.windup <= 0) { this.telegraph = null; this.doAttack(d); }
      return;
    }
    switch (this.behavior) {
      case 'chase': {
        this.moveToward(p.x, p.y, this.speed * speedMul, dt);
        if (d < this.r + p.r + 8 && this.attackCd <= 0) this.startWindup(0.42, { type: 'circle', r: this.r + 16 });
        break;
      }
      case 'bat': {
        const t = g.time * 2.2 + this.seed;
        const tx = p.x + Math.cos(t) * 46, ty = p.y + Math.sin(t * 1.3) * 36 - 10;
        this.moveToward(tx, ty, this.speed * speedMul, dt);
        if (d < this.r + p.r + 6 && this.attackCd <= 0) this.startWindup(0.3, { type: 'circle', r: this.r + 12 });
        break;
      }
      case 'ranged': {
        if (d > 130) this.moveToward(p.x, p.y, this.speed * speedMul, dt);
        else if (d < 85) this.moveToward(this.x - (p.x - this.x), this.y - (p.y - this.y), this.speed * speedMul, dt);
        if (d < 240 && this.attackCd <= 0) this.startWindup(0.55, { type: 'line', angle: angleTo(this.x, this.y, p.x, p.y), range: d, color: '#ff9b6a' });
        break;
      }
      case 'charger': {
        if (this.state === 'dash') {
          this.stateTime -= dt;
          const res = collide(g.room, this.x + this.chargeDir.x * this.speed * 3.4 * dt, this.y + this.chargeDir.y * this.speed * 3.4 * dt, this.r);
          if (res.x === this.x && res.y === this.y) this.stateTime = 0;
          this.x = res.x; this.y = res.y;
          if (d < this.r + p.r + 4) g.damagePlayer(this.dmg, this);
          if (this.stateTime <= 0) { this.state = 'move'; this.attackCd = 0.9; }
          return;
        }
        if (d > 45) this.moveToward(p.x, p.y, this.speed * speedMul, dt);
        if (d < 160 && this.attackCd <= 0) {
          this.chargeDir = { x: (p.x - this.x) / (d || 1), y: (p.y - this.y) / (d || 1) };
          this.startWindup(0.5, { type: 'line', angle: Math.atan2(this.chargeDir.y, this.chargeDir.x), range: 150, color: '#ff5f6d' });
          this.pendingCharge = true;
        }
        break;
      }
      case 'bomber': {
        this.moveToward(p.x, p.y, this.speed * speedMul, dt);
        if (d < 30 || (this.attackCd <= 0 && d < 60)) { this.startWindup(0.7, { type: 'circle', r: 42, color: '#ff7b3a' }); this.pendingExplode = true; }
        break;
      }
      case 'mage': {
        if (d < 90) this.moveToward(this.x - (p.x - this.x), this.y - (p.y - this.y), this.speed * speedMul, dt);
        else if (d > 190) this.moveToward(p.x, p.y, this.speed * speedMul, dt);
        if (this.attackCd <= 0) {
          this.startWindup(0.65, { type: 'line', angle: angleTo(this.x, this.y, p.x, p.y), range: d, color: '#c78cff' });
          this.pendingRanged = 'orb';
          if (Math.random() < 0.3) this.teleport();
        }
        break;
      }
      case 'brute': {
        this.moveToward(p.x, p.y, this.speed * speedMul, dt);
        if (d < 46 && this.attackCd <= 0) this.startWindup(0.75, { type: 'circle', r: 58, color: '#ffb340' });
        break;
      }
      case 'wraith': {
        const t = g.time + this.seed;
        this.moveToward(p.x + Math.cos(t) * 24, p.y + Math.sin(t) * 24, this.speed * speedMul, dt);
        if (d < 120 && this.attackCd <= 0) {
          this.startWindup(0.5, { type: 'line', angle: angleTo(this.x, this.y, p.x, p.y), range: d, color: '#b07bff' });
          this.pendingRanged = 'homing';
        }
        break;
      }
    }
  }
  startWindup(duration, telegraph) {
    this.windup = duration;
    this.attackCd = 1.4 + Math.random() * 1.2;
    this.telegraph = { ...telegraph, t: duration, max: duration, x: this.x, y: this.y };
    if (this.behavior !== 'charger') this.telegraph.x = this.x, this.telegraph.y = this.y;
  }
  doAttack(d) {
    const g = this.game, p = g.player;
    if (this.pendingCharge) { this.pendingCharge = false; this.state = 'dash'; this.stateTime = 0.32; g.audio.sfx('dodge'); return; }
    if (this.pendingExplode) {
      this.pendingExplode = false;
      g.explosion(this.x, this.y, 44, this.dmg * 1.6, this.element, this);
      this.die(); return;
    }
    if (this.pendingRanged) {
      const type = this.pendingRanged; this.pendingRanged = null;
      if (type === 'orb') g.spawnProjectile({ x: this.x, y: this.y - 8, angle: angleTo(this.x, this.y, p.x, p.y), speed: 110, dmg: this.dmg, team: 'enemy', kind: 'orb', element: this.element, color: '#c78cff', radius: 5 });
      if (type === 'homing') g.spawnProjectile({ x: this.x, y: this.y - 8, angle: angleTo(this.x, this.y, p.x, p.y), speed: 90, dmg: this.dmg, team: 'enemy', kind: 'homing', element: this.element, color: '#b07bff', radius: 5, homing: 1.8 });
      return;
    }
    switch (this.behavior) {
      case 'chase': case 'bat': case 'wraith':
        if (dist(this.x, this.y, p.x, p.y) < this.r + p.r + 18) g.damagePlayer(this.dmg, this);
        g.spawnBurst(this.x + (p.x - this.x) * 0.4, this.y + (p.y - this.y) * 0.4, ELEMENTS[this.element].color, 5, 70);
        break;
      case 'ranged':
        g.spawnProjectile({ x: this.x, y: this.y - 8, angle: angleTo(this.x, this.y, p.x, p.y), speed: 135, dmg: this.dmg, team: 'enemy', kind: 'arrow', element: this.element, color: '#e8e2d0', radius: 4 });
        g.audio.sfx('arrow');
        break;
      case 'brute':
        g.explosion(this.x, this.y, 62, this.dmg * 1.1, this.element, this);
        g.screenShake(5);
        break;
      case 'bomber':
        g.explosion(this.x, this.y, 44, this.dmg * 1.6, this.element, this);
        this.die();
        break;
    }
  }
  teleport() {
    const g = this.game;
    g.spawnBurst(this.x, this.y, '#c78cff', 12, 80);
    for (let i = 0; i < 12; i++) {
      const a = Math.random() * TAU, d = 60 + Math.random() * 90;
      const nx = clamp(this.x + Math.cos(a) * d, g.room.bounds.x + 20, g.room.bounds.x + g.room.bounds.w - 20);
      const ny = clamp(this.y + Math.sin(a) * d, g.room.bounds.y + 20, g.room.bounds.y + g.room.bounds.h - 20);
      if (!blockedAt(g.room, nx, ny, this.r)) { this.x = nx; this.y = ny; break; }
    }
    g.spawnBurst(this.x, this.y, '#c78cff', 12, 80);
  }
  moveToward(tx, ty, speed, dt) {
    const a = Math.atan2(ty - this.y, tx - this.x);
    const nx = this.x + Math.cos(a) * speed * dt, ny = this.y + Math.sin(a) * speed * dt;
    const res = collide(this.game.room, nx, ny, this.r);
    this.x = res.x; this.y = res.y;
  }
  die() {
    if (this.dead) return;
    this.dead = true;
    this.deathTime = 0;
    this.game.onEnemyDeath(this);
  }
  draw(ctx, t) {
    if (this.dead) {
      ctx.globalAlpha = Math.max(0, 1 - this.deathTime * 2.2);
      ctx.save(); ctx.translate(this.x, this.y); ctx.scale(1 + this.deathTime * 0.4, 1 - this.deathTime * 0.5); ctx.translate(-this.x, -this.y);
      drawEnemy(ctx, { ...this, hitFlash: 0, x: this.x, y: this.y }, t);
      ctx.restore(); ctx.globalAlpha = 1; return;
    }
    if (this.spawnPulse > 0) {
      ctx.save(); ctx.globalAlpha = 0.5 * (1 - this.spawnPulse);
      ctx.strokeStyle = ELEMENTS[this.element].color; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(this.x, this.y, 8 + (1 - this.spawnPulse) * 24, 0, TAU); ctx.stroke(); ctx.restore();
    }
    if (this.elite) drawGlow(ctx, this.x, this.y - 6, 22, '#ffb340', 0.16);
    if (this.slow > 0) { ctx.globalAlpha = 0.35; ctx.fillStyle = '#7de8ff'; ctx.beginPath(); ctx.arc(this.x, this.y - 6, this.r + 5, 0, TAU); ctx.fill(); ctx.globalAlpha = 1; }
    drawEnemy(ctx, this, t);
    if (this.hp < this.maxHp || this.elite) {
      const w = this.elite ? 30 : 24, h = 3, y = this.y - this.size[1] * 0.75 - 10;
      ctx.fillStyle = 'rgba(6,4,10,0.8)'; ctx.fillRect(this.x - w / 2 - 1, y - 1, w + 2, h + 2);
      ctx.fillStyle = this.elite ? '#ffb340' : '#ff5f6d'; ctx.fillRect(this.x - w / 2, y, w * Math.max(0, this.hp / this.maxHp), h);
      ctx.fillStyle = ELEMENTS[this.element].color; ctx.fillRect(this.x - w / 2, y - 3, 3, 2);
    }
  }
  drawTelegraph(ctx, t) {
    if (!this.telegraph || this.dead) return;
    const tg = this.telegraph;
    const k = clamp(tg.t / tg.max, 0, 1);
    ctx.save();
    if (tg.type === 'circle') {
      ctx.globalAlpha = 0.18 + (1 - k) * 0.20;
      ctx.fillStyle = tg.color || '#ff5f6d';
      ctx.beginPath(); ctx.arc(this.x, this.y, tg.r || 30, 0, TAU); ctx.fill();
      ctx.globalAlpha = 0.7; ctx.strokeStyle = tg.color || '#ff5f6d'; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.arc(this.x, this.y, (tg.r || 30) * (0.4 + k * 0.6), 0, TAU); ctx.stroke();
    } else if (tg.type === 'line') {
      ctx.globalAlpha = 0.16; ctx.fillStyle = tg.color || '#ff5f6d';
      const range = tg.range || 100;
      ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(tg.angle);
      ctx.fillRect(0, -5, range, 10);
      ctx.globalAlpha = 0.65; ctx.fillStyle = tg.color || '#ff5f6d'; ctx.fillRect(0, -1, range * (1 - k) + 10, 2);
      ctx.restore();
    }
    ctx.restore();
  }
}

export class Boss {
  constructor(game, defId, x, y) {
    const def = BOSSES[defId];
    const diff = game.difficulty;
    this.game = game;
    this.def = def;
    this.defId = defId;
    this.isEnemy = true;
    this.isBoss = true;
    this.x = x; this.y = y;
    this.r = def.radius;
    this.maxHp = Math.round(def.hp * diff.hp * (1 + game.depth * 0.03));
    this.hp = this.maxHp;
    this.dmg = def.dmg * diff.dmg;
    this.element = def.element;
    this.hitFlash = 0;
    this.stun = 0;
    this.slow = 0;
    this.burn = 0; this.burnTick = 0; this.burnDmg = 0;
    this.dead = false;
    this.deathTime = 0;
    this.phase = 1;
    this.attackCd = 1.8;
    this.state = 'intro';
    this.stateTime = 2.2;
    this.windup = 0;
    this.telegraph = null;
    this.palette = { body: def.color, shade: '#241418' };
    this.patternIndex = 0;
    this.float = 0;
    this.invuln = 0;
    this.spawnPulse = 0;
    this.knock = { x: 0, y: 0 };
  }
  update(dt) {
    const g = this.game, p = g.player;
    if (this.dead) { this.deathTime += dt; return; }
    if (this.state === 'intro') {
      this.stateTime -= dt;
      if (this.stateTime <= 0) { this.state = 'idle'; this.attackCd = 0.7; }
      return;
    }
    this.hitFlash = Math.max(0, this.hitFlash - dt);
    this.stun = Math.max(0, this.stun - dt);
    this.slow = Math.max(0, this.slow - dt);
    this.invuln = Math.max(0, this.invuln - dt);
    if (this.burn > 0) { this.burn -= dt; this.burnTick -= dt; if (this.burnTick <= 0) { this.burnTick = 0.5; g.damageEnemy(this, this.burnDmg, { element: 'fire', noCrit: true, silent: true, dot: true }); } }
    const pct = this.hp / this.maxHp;
    if (pct < 0.34 && this.phase < 3) { this.phase = 3; this.rage(); }
    else if (pct < 0.68 && this.phase < 2) { this.phase = 2; this.rage(); }
    if (this.stun > 0) return;
    if (this.windup > 0) { this.windup -= dt; if (this.windup <= 0) this.release(); return; }
    this.attackCd -= dt;
    // hover near center / approach
    const d = dist(this.x, this.y, p.x, p.y);
    if (this.state === 'charge') {
      this.stateTime -= dt;
      const res = collide(g.room, this.x + this.chargeDir.x * 250 * dt, this.y + this.chargeDir.y * 250 * dt, this.r);
      this.x = res.x; this.y = res.y;
      if (d < this.r + p.r + 4) g.damagePlayer(this.dmg * 0.9, this);
      if (this.stateTime <= 0) { this.state = 'idle'; this.attackCd = 0.8; }
      return;
    }
    if (d > 80) {
      const a = Math.atan2(p.y - this.y, p.x - this.x);
      const res = collide(g.room, this.x + Math.cos(a) * 20 * dt, this.y + Math.sin(a) * 20 * dt, this.r);
      this.x = res.x; this.y = res.y;
    }
    if (this.attackCd <= 0) this.chooseAttack();
  }
  rage() {
    this.game.screenShake(9);
    this.game.audio.sfx('bossroar');
    this.game.addText(this.x, this.y - 56, 'PHASE ' + this.phase, '#ffb340', 1.6);
    this.game.spawnBurst(this.x, this.y, this.def.accent, 24, 170);
    this.invuln = 0.6;
  }
  chooseAttack() {
    const p = this.game.player;
    this.patternIndex++;
    const patterns = this.defId === 'cinder' ? ['ring', 'charge', 'fan', 'summon']
      : this.defId === 'glacier' ? ['fan', 'spikes', 'teleport', 'ring']
      : this.defId === 'treant' ? ['roots', 'slam', 'summon', 'spores']
      : ['orbs', 'teleport', 'ring', 'beam'];
    const pat = patterns[this.patternIndex % patterns.length];
    this.pendingPattern = pat;
    this.state = 'windup';
    this.windup = this.phase === 3 ? 0.62 : 0.85;
    this.telegraph = { type: 'circle', r: 70, t: this.windup, max: this.windup, x: this.x, y: this.y, color: this.def.color };
    this.game.audio.sfx('stun');
    this.attackCd = (this.phase === 3 ? 1.45 : this.phase === 2 ? 1.9 : 2.5);
  }
  release() {
    const g = this.game, p = g.player, def = this.def;
    const pat = this.pendingPattern;
    this.telegraph = null;
    this.state = 'idle';
    const ang = angleTo(this.x, this.y, p.x, p.y);
    const base = { x: this.x, y: this.y - 14, team: 'enemy', element: this.element, color: def.color, radius: 6, dmg: this.dmg };
    if (pat === 'ring') {
      const n = this.phase === 3 ? 18 : 14;
      for (let i = 0; i < n; i++) g.spawnProjectile({ ...base, angle: i / n * TAU + g.time * 0.3, speed: 105, kind: 'orb' });
      g.screenShake(4); g.audio.sfx('explosion', 0.6);
    } else if (pat === 'fan') {
      const n = this.phase === 3 ? 7 : 5;
      for (let i = 0; i < n; i++) g.spawnProjectile({ ...base, angle: ang + (i - (n - 1) / 2) * 0.18, speed: 150, kind: this.defId === 'glacier' ? 'ice' : 'orb' });
      g.audio.sfx('shoot');
    } else if (pat === 'charge') {
      this.chargeDir = { x: Math.cos(ang), y: Math.sin(ang) };
      this.state = 'charge'; this.stateTime = 0.42;
      g.screenShake(3);
    } else if (pat === 'summon') {
      const kinds = g.run.biome === 'ember' ? ['husk', 'bomber'] : g.run.biome === 'frost' ? ['bat', 'archer'] : g.run.biome === 'nature' ? ['husk', 'brute'] : ['wraith', 'mage'];
      for (let i = 0; i < (this.phase >= 2 ? 3 : 2); i++) g.spawnEnemy(pick(Math.random, kinds), this.x + (i - 1) * 34, this.y + 20, { element: this.element });
      g.audio.sfx('portal');
    } else if (pat === 'spikes') {
      for (let i = 0; i < (this.phase === 3 ? 7 : 5); i++) {
        const a = Math.random() * TAU, d = 30 + Math.random() * 110;
        g.addZone({ x: p.x + Math.cos(a) * d, y: p.y + Math.sin(a) * d, r: 20, delay: 0.75, duration: 0.2, color: '#7de8ff', dmg: this.dmg * 0.9, kind: 'spike' });
      }
      g.audio.sfx('freeze');
    } else if (pat === 'roots') {
      for (let i = 0; i < 3; i++) {
        g.addZone({ x: p.x, y: p.y, r: 28, delay: 0.7 + i * 0.22, duration: 0.2, color: '#8cf07a', dmg: this.dmg * 0.9, kind: 'root' });
      }
      g.audio.sfx('stun');
    } else if (pat === 'slam') {
      for (let i = 0; i < (this.phase === 3 ? 3 : 2); i++) {
        const a = Math.random() * TAU, d = 40 + Math.random() * 100;
        g.addZone({ x: this.x + Math.cos(a) * d, y: this.y + Math.sin(a) * d, r: 38, delay: 0.7, duration: 0.25, color: '#ffb340', dmg: this.dmg, kind: 'slam' });
      }
      g.screenShake(7);
    } else if (pat === 'spores') {
      for (let i = 0; i < 5; i++) g.addZone({ x: this.x + (Math.random() - 0.5) * 220, y: this.y + (Math.random() - 0.5) * 140, r: 25, delay: 1.1, duration: 0.2, color: '#8cf07a', dmg: this.dmg * 0.8, kind: 'spore' });
    } else if (pat === 'teleport') {
      g.spawnBurst(this.x, this.y, def.color, 16, 120);
      this.x = clamp(p.x + (Math.random() < 0.5 ? -70 : 70), 60, 420);
      this.y = clamp(p.y + (Math.random() < 0.5 ? -50 : 50), 60, 210);
      g.spawnBurst(this.x, this.y, def.color, 16, 120);
      if (this.phase >= 2) for (let i = 0; i < 8; i++) g.spawnProjectile({ ...base, angle: i / 8 * TAU, speed: 100, kind: 'orb' });
    } else if (pat === 'orbs') {
      for (let i = 0; i < (this.phase === 3 ? 5 : 3); i++) {
        g.spawnProjectile({ ...base, angle: ang + (Math.random() - 0.5) * 0.6, speed: 85, kind: 'homing', homing: 1.6 });
      }
      g.audio.sfx('shoot');
    } else if (pat === 'beam') {
      g.addZone({ x: p.x, y: p.y, r: 34, delay: 0.8, duration: 0.25, color: '#b07bff', dmg: this.dmg * 1.4, kind: 'beam' });
      g.addZone({ x: this.x + (p.x - this.x) * 0.5, y: this.y + (p.y - this.y) * 0.5, r: 22, delay: 0.8, duration: 0.25, color: '#b07bff', dmg: this.dmg * 0.8, kind: 'beam' });
      g.audio.sfx('thunder');
    }
  }
  takeDamage(amount, opts = {}) {
    if (this.dead || this.invuln > 0) return 0;
    const mult = elementMultiplier(opts.element || 'light', this.element);
    const dmg = Math.max(1, Math.round(amount * mult));
    this.hp -= dmg;
    this.hitFlash = 0.12;
    if (opts.stunChance && Math.random() < opts.stunChance) this.stun = Math.max(this.stun, 0.35);
    if (this.hp <= 0) { this.hp = 0; this.dead = true; this.game.onBossDeath(this); }
    return dmg;
  }
  die() {}
  draw(ctx, t) {
    if (this.dead) {
      ctx.globalAlpha = Math.max(0, 1 - this.deathTime * 1.4);
      ctx.save(); ctx.translate(this.x, this.y); ctx.scale(1 + this.deathTime * 0.2, 1 + this.deathTime * 0.2); ctx.translate(-this.x, -this.y);
      drawBoss(ctx, { ...this, def: this.def, x: this.x, y: this.y, hitFlash: 0, stun: 0 }, t);
      ctx.restore(); ctx.globalAlpha = 1; return;
    }
    if (this.state === 'intro') {
      ctx.globalAlpha = 0.3 + Math.sin(t * 8) * 0.2;
      drawGlow(ctx, this.x, this.y, 60, this.def.color, 0.4); ctx.globalAlpha = 1;
    }
    drawBoss(ctx, this, t);
    if (this.phase >= 2 && !this.dead) drawGlow(ctx, this.x, this.y - 6, 38 + Math.sin(t * 5) * 4, this.def.color, 0.12);
  }
  drawTelegraph(ctx) {
    if (!this.telegraph) return;
    const tg = this.telegraph, k = clamp(tg.t / tg.max, 0, 1);
    ctx.save(); ctx.globalAlpha = 0.10 + (1 - k) * 0.14;
    ctx.fillStyle = tg.color; ctx.beginPath(); ctx.arc(this.x, this.y, 88, 0, TAU); ctx.fill();
    ctx.globalAlpha = 0.6; ctx.strokeStyle = tg.color; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(this.x, this.y, 88 * (0.35 + k * 0.65), 0, TAU); ctx.stroke();
    ctx.restore();
  }
}

export class Projectile {
  constructor(opts) {
    Object.assign(this, {
      x: 0, y: 0, vx: 0, vy: 0, speed: 200, dmg: 5, team: 'player', kind: 'arrow',
      element: 'fire', color: '#fff', radius: 4, life: 2.2, maxLife: 2.2, homing: 0,
      pierce: 0, splash: 0, owner: null, dead: false, trail: [], hit: new Set(), angle: 0,
      target: null, onKill: null, crit: false,
    }, opts);
    this.angle = opts.angle ?? 0;
    this.vx = Math.cos(this.angle) * this.speed;
    this.vy = Math.sin(this.angle) * this.speed;
    this.x = opts.x; this.y = opts.y;
    this.maxLife = opts.life ?? 2.2;
  }
  update(dt) {
    if (this.dead) return;
    const g = this.game || this.owner?.game;
    this.life -= dt;
    if (this.life <= 0) { this.dead = true; return; }
    if (this.homing) {
      const target = this.team === 'player' ? g.nearestEnemy(this.x, this.y, 260) : g.player;
      if (target && !target.dead) {
        const a = Math.atan2(target.y - this.y, target.x - this.x);
        const cur = Math.atan2(this.vy, this.vx);
        let da = ((a - cur + Math.PI * 3) % TAU) - Math.PI;
        const na = cur + clamp(da, -this.homing * dt, this.homing * dt);
        this.vx = Math.cos(na) * this.speed; this.vy = Math.sin(na) * this.speed;
      }
    }
    this.x += this.vx * dt; this.y += this.vy * dt;
    this.angle = Math.atan2(this.vy, this.vx);
    this.trail.push({ x: this.x, y: this.y, life: 0.15 });
    if (this.trail.length > 6) this.trail.shift();
    for (const tr of this.trail) tr.life -= dt;
    // walls / props
    if (blockedAt(g.room, this.x, this.y, 1)) {
      this.impact(true); return;
    }
    if (this.team === 'player') {
      const targets = g.boss && !g.boss.dead ? [...g.enemies, g.boss] : g.enemies;
      for (const e of targets) {
        if (e.dead || this.hit.has(e)) continue;
        if (dist2(this.x, this.y, e.x, e.y) < (this.radius + e.r) ** 2) {
          this.hit.add(e);
          g.projectileHit(this, e);
          if (this.pierce-- <= 0) { this.impact(false); return; }
        }
      }
    } else {
      const p = g.player;
      if (!p.dead && dist2(this.x, this.y, p.x, p.y) < (this.radius + p.r + 2) ** 2) {
        g.damagePlayer(this.dmg, this);
        this.impact(false); return;
      }
    }
  }
  impact(onWall) {
    if (this.dead) return;
    this.dead = true;
    const g = this.game;
    if (this.splash && g) g.explosion(this.x, this.y, this.splash, this.dmg * 0.6, this.element, null, this.team);
    if (g) g.spawnBurst(this.x, this.y, this.color, onWall ? 4 : 6, 60);
  }
  draw(ctx) {
    if (this.dead) return;
    for (const tr of this.trail) {
      ctx.globalAlpha = tr.life * 4; ctx.fillStyle = this.color;
      ctx.fillRect(tr.x - 1, tr.y - 1, 2, 2);
    }
    ctx.globalAlpha = 1;
    const a = this.angle;
    if (this.kind === 'arrow') {
      ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(a);
      ctx.fillStyle = '#d8d0b8'; ctx.fillRect(-7, -1, 12, 2); ctx.fillStyle = this.color; ctx.fillRect(5, -2, 4, 4);
      ctx.fillStyle = '#8a8272'; ctx.fillRect(-8, -2, 3, 1); ctx.fillRect(-8, 1, 3, 1);
      ctx.restore();
    } else if (this.kind === 'bullet') {
      ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(a);
      ctx.fillStyle = this.color; ctx.fillRect(-4, -1, 8, 2); ctx.fillStyle = '#fff'; ctx.fillRect(0, -1, 4, 2);
      ctx.restore();
    } else {
      drawGlow(ctx, this.x, this.y, this.radius * 4, this.color, 0.35);
      ctx.fillStyle = this.color; ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, TAU); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(this.x - 1, this.y - 1, Math.max(1, this.radius * 0.4), 0, TAU); ctx.fill();
      if (this.kind === 'ice') { ctx.fillStyle = '#d4fbff'; ctx.fillRect(this.x - 5, this.y - 5, 3, 3); ctx.fillRect(this.x + 2, this.y + 2, 3, 3); }
    }
  }
}

export class Particle {
  constructor(opts) {
    Object.assign(this, { x: 0, y: 0, vx: 0, vy: 0, life: 0.5, maxLife: 0.5, color: '#fff', size: 1, gravity: 0, drag: 0.9, glow: false, ring: false, radius: 2, growth: 0, shape: 'rect', alpha: 1 }, opts);
    this.maxLife = this.life;
  }
  update(dt) {
    this.life -= dt;
    this.x += this.vx * dt; this.y += this.vy * dt;
    this.vx *= Math.pow(this.drag, dt * 60); this.vy = this.vy * Math.pow(this.drag, dt * 60) + this.gravity * dt;
    if (this.ring) this.radius += this.growth * dt;
  }
  draw(ctx) {
    const a = clamp(this.life / this.maxLife, 0, 1) * this.alpha;
    if (a <= 0) return;
    if (this.ring) {
      ctx.save(); ctx.globalAlpha = a * 0.7; ctx.strokeStyle = this.color; ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, TAU); ctx.stroke(); ctx.restore(); return;
    }
    ctx.globalAlpha = a;
    if (this.glow) { drawGlow(ctx, this.x, this.y, this.size * 6, this.color, a * 0.3); }
    ctx.fillStyle = this.color;
    ctx.fillRect(Math.round(this.x), Math.round(this.y), this.size, this.size);
    ctx.globalAlpha = 1;
  }
}

export class FloatText {
  constructor(x, y, text, color = '#fff', scale = 1, life = 0.85) {
    this.x = x; this.y = y; this.text = text; this.color = color; this.scale = scale; this.life = life; this.maxLife = life; this.vy = -32; this.vx = (Math.random() - 0.5) * 12;
  }
  update(dt) { this.life -= dt; this.y += this.vy * dt; this.x += this.vx * dt; this.vy += 30 * dt; }
  draw(ctx) {
    const a = clamp(this.life / this.maxLife * 1.6, 0, 1);
    ctx.globalAlpha = a;
    drawPixelText(ctx, this.text, this.x, this.y, { color: this.color, align: 'center', scale: this.scale, shadow: true });
    ctx.globalAlpha = 1;
  }
}

export class Pickup {
  constructor(kind, value, x, y, opts = {}) {
    this.kind = kind; this.value = value; this.x = x; this.y = y;
    this.vx = (Math.random() - 0.5) * 60; this.vy = (Math.random() - 0.5) * 60 - 30;
    this.life = 20; this.radius = 6; this.dead = false; this.magnet = false;
    this.seed = Math.random() * 10;
    this.color = opts.color || '#ffd86b';
    this.big = !!opts.big;
    this.label = opts.label || null;
  }
  update(dt, player) {
    this.life -= dt;
    if (this.life <= 0) { this.dead = true; return; }
    this.vy += 18 * dt;
    this.x += this.vx * dt; this.y += this.vy * dt;
    this.vx *= Math.pow(0.02, dt); this.vy *= Math.pow(0.02, dt);
    const d = dist(this.x, this.y, player.x, player.y);
    if (d < 70) this.magnet = true;
    if (this.magnet) {
      const a = Math.atan2(player.y - this.y, player.x - this.x);
      const s = 140;
      this.x += Math.cos(a) * s * dt; this.y += Math.sin(a) * s * dt;
      if (d < 12) { this.dead = true; this.onCollect(player); }
    }
  }
  draw(ctx, t) {
    const bob = Math.sin(t * 4 + this.seed) * 1.5;
    if (this.kind === 'gold') drawCoin(ctx, this.x, this.y + bob, t);
    else if (this.kind === 'iron' || this.kind === 'essence' || this.kind === 'crystal') drawMaterial(ctx, this.x, this.y + bob, this.kind, t);
    else if (this.kind === 'hp' || this.kind === 'mp') drawPotion(ctx, this.x, this.y + bob, this.kind, t);
    else if (this.kind === 'echo') {
      drawGlow(ctx, this.x, this.y, 12, '#b07bff', 0.4);
      px(ctx, this.x - 3, this.y - 4 + bob, '#3c1f72', 7, 9); px(ctx, this.x - 2, this.y - 3 + bob, '#c78cff', 5, 7); px(ctx, this.x - 1, this.y - 2 + bob, '#fff', 2, 3);
    } else {
      drawGlow(ctx, this.x, this.y, 7, this.color, 0.3);
      px(ctx, this.x - 2, this.y - 2 + bob, this.color, 5, 5);
    }
    if (this.label) drawPixelText(ctx, this.label, this.x, this.y - 16, { color: this.color, align: 'center', scale: 1, shadow: true });
  }
}
