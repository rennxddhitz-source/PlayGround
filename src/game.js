import { ENEMIES, GRID, LEVELS, UNITS, UNIT_BY_ID, unitStats } from "./data.js";

export const TOP = {
  dream: { x: 12, y: 12, w: 238, h: 62 },
  wave: { x: 258, y: 12, w: 124, h: 62 },
  pause: { x: 438, y: 43, r: 20 },
};

export const BAR = {
  panel: { x: 10, y: 692, w: 460, h: 154 },
  cardY: 704,
  cardW: 82,
  cardH: 128,
  gap: 9,
  left: 22,
  viewportLeft: 16,
  viewportRight: 464,
  maxScroll: 276,
};

export const POWER = { x: 430, y: 650, r: 34 };
export const RESOURCE = { x: 14, y: 632, w: 116, h: 48 };

export const RESULT = {
  card: { x: 34, y: 100, w: 412, h: 650 },
  next: { x: 66, y: 574, w: 348, h: 58 },
  retry: { x: 66, y: 646, w: 168, h: 54 },
  home: { x: 246, y: 646, w: 168, h: 54 },
};

export const PAUSE = {
  resume: { x: 110, y: 334, w: 260, h: 58 },
  restart: { x: 110, y: 404, w: 260, h: 54 },
  sound: { x: 110, y: 470, w: 260, h: 50 },
  quit: { x: 110, y: 534, w: 260, h: 50 },
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function pointInRect(x, y, rect) {
  return x >= rect.x && x <= rect.x + rect.w && y >= rect.y && y <= rect.y + rect.h;
}

function pointInCircle(x, y, circle) {
  return Math.hypot(x - circle.x, y - circle.y) <= circle.r;
}

let nextUid = 1;

export class Game {
  constructor(app, levelIndex) {
    this.app = app;
    this.levelIndex = levelIndex;
    this.level = LEVELS[levelIndex];
    this.guardianLevel = app.guardianLevel;

    this.state = "playing";
    this.time = 0;
    this.resultTime = 0;
    this.hitstop = 0;
    this.shake = 0;
    this.flash = 0;
    this.danger = false;

    this.grid = Array.from({ length: GRID.rows }, () => Array(GRID.cols).fill(null));
    this.units = [];
    this.enemies = [];
    this.projectiles = [];
    this.particles = [];
    this.floaters = [];
    this.fallingStars = [];

    this.starlight = 220;
    this.dream = 100;
    this.displayDream = 100;
    this.charge = 0;
    this.powerPulse = 0;
    this.selectedUnit = null;
    this.cooldowns = {};
    this.scroll = 0;
    this.barDrag = null;
    this.hoverCell = null;
    this.pointer = null;
    this.cardRects = [];

    this.waveIndex = 0;
    this.waveState = "countdown";
    this.countdown = 3.6;
    this.clearTimer = 0;
    this.waveTime = 0;
    this.waveQueue = [];
    this.waveBanner = 0;
    this.bannerWave = 0;
    this.waveCleared = 0;

    this.starTimer = 2.2;
    this.kills = 0;
    this.starsCollected = 0;
    this.bossKilled = false;
    this.hurtSfxTimer = 0;

    this.toastText = "";
    this.toastTimer = 0;
    this.toastColor = "#00d4ff";

    this.tutorialStep = app.save.seenIntro ? 3 : 0;
    this.tutorialTimer = 0;

    this.result = null;
    this.stats = null;

    this.spawnParticles(240, 600, "#00d4ff", 8, 40);
  }

  get currentWave() {
    if (this.waveIndex === 0) return 1;
    return Math.min(this.waveIndex, this.level.waves.length);
  }

  get enemiesRemaining() {
    const alive = this.enemies.reduce((sum, enemy) => sum + (enemy.dead ? 0 : 1), 0);
    return alive + this.waveQueue.length;
  }

  get canUsePower() {
    return this.charge >= 100 && this.state === "playing";
  }

  showToast(message, color = "#00d4ff") {
    this.toastText = message;
    this.toastColor = color;
    this.toastTimer = 2.2;
  }

  advanceTutorial(step) {
    if (this.tutorialStep === step) {
      this.tutorialStep += 1;
      if (this.tutorialStep >= 3) this.app.save.seenIntro = true;
    }
  }

  update(dt) {
    if (this.state === "paused") return;
    if (this.state === "won" || this.state === "lost") {
      this.resultTime += dt;
      this.updateEffects(dt);
      return;
    }
    if (this.state !== "playing") return;

    this.time += dt;
    if (this.toastTimer > 0) this.toastTimer -= dt;
    if (this.hurtSfxTimer > 0) this.hurtSfxTimer -= dt;
    this.displayDream += (this.dream - this.displayDream) * Math.min(1, dt * 8);
    this.flash = Math.max(0, this.flash - dt * 2.4);
    this.shake = Math.max(0, this.shake - dt * 22);
    this.powerPulse = Math.max(0, this.powerPulse - dt * 0.9);
    this.waveBanner = Math.max(0, this.waveBanner - dt);
    this.danger = this.dream <= 30;

    if (this.hitstop > 0) {
      this.hitstop -= dt;
      this.updateEffects(dt * 0.35);
      return;
    }

    for (const key of Object.keys(this.cooldowns)) {
      this.cooldowns[key] = Math.max(0, this.cooldowns[key] - dt);
    }

    this.updateWave(dt);
    this.updateStars(dt);
    this.updateUnits(dt);
    this.updateEnemies(dt);
    this.updateProjectiles(dt);
    this.updateEffects(dt);
    this.updateTutorial(dt);

    this.units = this.units.filter((unit) => !unit.dead);
    this.enemies = this.enemies.filter((enemy) => !enemy.dead);

    if (this.dream <= 0 && this.state === "playing") this.lose();
  }

  updateTutorial(dt) {
    if (this.tutorialStep >= 3) return;
    this.tutorialTimer += dt;
  }

  updateWave(dt) {
    if (this.waveState === "countdown") {
      this.countdown -= dt;
      if (this.countdown <= 0) this.startWave();
      return;
    }

    if (this.waveState === "active") {
      this.waveTime += dt;
      while (this.waveQueue.length && this.waveQueue[0].t <= this.waveTime) {
        const spawn = this.waveQueue.shift();
        this.spawnEnemy(spawn.type, spawn.row);
      }
      if (!this.waveQueue.length && this.enemies.every((enemy) => enemy.dead)) {
        this.waveState = "clear";
        this.clearTimer = 2.4;
        this.waveCleared += 1;
        this.charge = Math.min(100, this.charge + 10);
        this.starlight += 12;
        this.addFloater("+12", 240, 560, "#ffd700", 14);
        this.app.audio.sfx("star");
        this.spawnParticles(240, 570, "#ffd700", 14, 55);
        if (this.waveIndex >= this.level.waves.length) {
          this.clearTimer = 1.2;
        }
      }
      return;
    }

    if (this.waveState === "clear") {
      this.clearTimer -= dt;
      if (this.clearTimer > 0) return;
      if (this.waveIndex >= this.level.waves.length) {
        this.win();
      } else {
        this.waveState = "countdown";
        this.countdown = 3.2;
      }
    }
  }

  startWave() {
    this.waveIndex += 1;
    this.waveState = "active";
    this.waveTime = 0;
    this.waveQueue = this.level.waves[this.waveIndex - 1].spawns.map((spawn) => ({ ...spawn }));
    this.waveBanner = 2.2;
    this.bannerWave = this.waveIndex;
    this.app.audio.sfx("wave");
    this.spawnParticles(240, 390, "#00d4ff", 12, 45);
  }

  spawnEnemy(type, row) {
    const def = ENEMIES[type];
    const difficulty = this.level.difficulty;
    const hp = Math.round(def.hp * (1 + (difficulty - 1) * 0.95));
    this.enemies.push({
      uid: nextUid++,
      type,
      def,
      row,
      x: def.boss ? 9.95 : 9.65,
      hp,
      maxHp: hp,
      speed: def.speed * (1 + (difficulty - 1) * 0.16),
      dream: def.dream,
      damage: Math.round(def.damage * (1 + (difficulty - 1) * 0.35)),
      attackTimer: 0.5,
      animAttack: 0,
      hurt: 0,
      slowTimer: 0,
      freeze: 0,
      dead: false,
      seed: Math.random() * 20,
      spawn: 0,
    });
  }

  updateStars(dt) {
    this.starTimer -= dt;
    if (this.starTimer <= 0 && this.fallingStars.length < 4) {
      this.starTimer = 3.1 + Math.random() * 1.9;
      const x = 58 + Math.random() * 364;
      const y = 228 + Math.random() * 300;
      this.fallingStars.push({
        x,
        y,
        startY: 140,
        age: 0,
        fall: 0.7 + Math.random() * 0.25,
        life: 7.2,
        value: 20,
        dead: false,
        seed: Math.random() * 10,
      });
    }
    for (const star of this.fallingStars) {
      star.age += dt;
      if (star.age > star.life) star.dead = true;
    }
    this.fallingStars = this.fallingStars.filter((star) => !star.dead);
  }

  starPosition(star) {
    const t = clamp(star.age / star.fall, 0, 1);
    const eased = t * t;
    const landed = star.age - star.fall;
    const bob = landed > 0 ? Math.sin(landed * 3 + star.seed) * 2 : 0;
    return {
      x: star.x,
      y: star.startY + (star.y - star.startY) * eased + bob,
      landed: t >= 1,
    };
  }

  updateUnits(dt) {
    for (const unit of this.units) {
      if (unit.dead) continue;
      unit.attackAnim = Math.max(0, unit.attackAnim - dt * 5.5);
      unit.hurt = Math.max(0, unit.hurt - dt * 5);
      unit.pulse = Math.max(0, (unit.pulse || 0) - dt * 4);

      if (unit.def.attack === "generate") {
        unit.genTimer -= dt;
        if (unit.genTimer <= 0) {
          unit.genTimer = unit.def.interval;
          this.starlight += unit.stats.generate;
          this.addFloater(`+${unit.stats.generate}`, unit.px, unit.py - 34, "#ffd700", 15);
          this.spawnParticles(unit.px, unit.py - 18, "#ffd700", 7, 30);
          this.app.audio.sfx("star");
          unit.pulse = 1;
        }
        continue;
      }

      unit.atkTimer -= dt;
      if (unit.atkTimer > 0) continue;

      if (unit.def.attack === "heal") {
        const target = this.findHealTarget(unit);
        if (target) {
          unit.atkTimer = unit.def.interval;
          unit.attackAnim = 1;
          this.projectiles.push({
            kind: "heal",
            type: unit.def.projectile,
            x: unit.px + 8,
            y: unit.py - 6,
            target,
            speed: 300,
            amount: unit.stats.heal,
            color: unit.def.accent,
          });
        }
        continue;
      }

      const target = this.findEnemyTarget(unit);
      if (!target) continue;

      unit.atkTimer = unit.def.interval;
      unit.attackAnim = 1;
      if (unit.def.attack === "melee") {
        this.damageEnemy(target, unit.stats.damage, unit);
        this.spawnParticles(target.x * GRID.cw + GRID.x, target.row * GRID.ch + GRID.y + 26, unit.def.accent, 4, 28);
        if (unit.def.id === "dino") {
          target.x = Math.min(9.6, target.x + 0.22);
          this.shake = Math.max(this.shake, 2);
        }
      } else {
        this.projectiles.push({
          kind: "enemy",
          type: unit.def.projectile,
          x: unit.px + 10,
          y: unit.py - 8,
          target,
          speed: unit.def.id === "owl" ? 680 : 470,
          damage: unit.stats.damage,
          splash: unit.def.splash || 0,
          slow: unit.def.slow || 0,
          color: unit.def.accent,
          owner: unit,
        });
        this.app.audio.sfx(unit.def.id === "robo" ? "laser" : "click");
      }
    }
  }

  findEnemyTarget(unit) {
    let best = null;
    for (const enemy of this.enemies) {
      if (enemy.dead || enemy.row !== unit.row) continue;
      const distance = enemy.x - unit.col;
      if (distance < -0.4 || distance > unit.def.range + 0.5) continue;
      if (!best || enemy.x < best.x) best = enemy;
    }
    return best;
  }

  findHealTarget(unit) {
    let best = null;
    let bestRatio = 1;
    for (const ally of this.units) {
      if (ally.dead || ally.hp >= ally.maxHp) continue;
      if (Math.abs(ally.row - unit.row) > 1) continue;
      if (Math.abs(ally.col - unit.col) > unit.def.range) continue;
      const ratio = ally.hp / ally.maxHp;
      if (ratio < bestRatio) {
        bestRatio = ratio;
        best = ally;
      }
    }
    return best;
  }

  updateEnemies(dt) {
    for (const enemy of this.enemies) {
      if (enemy.dead) continue;
      enemy.hurt = Math.max(0, enemy.hurt - dt * 5);
      enemy.animAttack = Math.max(0, enemy.animAttack - dt * 4.5);
      enemy.slowTimer = Math.max(0, enemy.slowTimer - dt);
      enemy.spawn += dt;
      if (enemy.freeze > 0) {
        enemy.freeze -= dt;
        continue;
      }

      const blocker = this.findBlocker(enemy);
      if (blocker) {
        enemy.attackTimer -= dt;
        if (enemy.attackTimer <= 0) {
          enemy.attackTimer = enemy.def.boss ? 1.25 : 1.0;
          enemy.animAttack = 1;
          this.damageUnit(blocker, enemy.damage);
          if (this.hurtSfxTimer <= 0) {
            this.app.audio.sfx("hurt");
            this.hurtSfxTimer = 0.16;
          }
        }
        continue;
      }

      enemy.attackTimer = Math.min(enemy.attackTimer, 0.4);
      const speed = enemy.speed * (enemy.slowTimer > 0 ? 0.62 : 1);
      enemy.x -= speed * dt;
      if (enemy.x < -0.45) {
        this.damageDream(enemy);
        enemy.dead = true;
      }
    }
  }

  findBlocker(enemy) {
    let best = null;
    for (const unit of this.units) {
      if (unit.dead || unit.row !== enemy.row) continue;
      const distance = enemy.x - unit.col;
      if (distance >= -0.1 && distance < 0.62) {
        if (!best || unit.col > best.col) best = unit;
      }
    }
    return best;
  }

  updateProjectiles(dt) {
    for (const projectile of this.projectiles) {
      if (projectile.dead) continue;
      const target = projectile.target;
      if (!target || target.dead || target.hp <= 0) {
        projectile.dead = true;
        continue;
      }
      const targetX = projectile.kind === "heal" ? target.px : target.x * GRID.cw + GRID.x + GRID.cw / 2;
      const targetY = projectile.kind === "heal" ? target.py - 8 : target.row * GRID.ch + GRID.y + GRID.ch / 2;
      const dx = targetX - projectile.x;
      const dy = targetY - projectile.y;
      const distance = Math.hypot(dx, dy);
      const step = projectile.speed * dt;
      if (distance <= Math.max(11, step)) {
        projectile.dead = true;
        if (projectile.kind === "heal") {
          this.healUnit(target, projectile.amount);
        } else {
          this.hitProjectile(projectile, target);
        }
        continue;
      }
      projectile.x += (dx / distance) * step;
      projectile.y += (dy / distance) * step;
      projectile.angle = Math.atan2(dy, dx);
      if (Math.random() < dt * 34) {
        this.particles.push({
          x: projectile.x,
          y: projectile.y,
          vx: (Math.random() - 0.5) * 16,
          vy: (Math.random() - 0.5) * 16,
          life: 0.25,
          maxLife: 0.25,
          size: 2 + Math.random() * 2,
          color: projectile.color || "#00d4ff",
          type: "spark",
        });
      }
    }
    this.projectiles = this.projectiles.filter((projectile) => !projectile.dead);
  }

  hitProjectile(projectile, target) {
    this.hitstop = Math.max(this.hitstop, 0.08);
    this.damageEnemy(target, projectile.damage, projectile.owner);
    const px = target.x * GRID.cw + GRID.x + GRID.cw / 2;
    const py = target.row * GRID.ch + GRID.y + GRID.ch / 2;
    this.spawnParticles(px, py, projectile.color, 7, 60);
    if (projectile.splash > 0) {
      for (const enemy of this.enemies) {
        if (enemy.dead || enemy === target) continue;
        const dx = (enemy.x - target.x) * GRID.cw;
        const dy = (enemy.row - target.row) * GRID.ch;
        if (Math.hypot(dx, dy) <= projectile.splash * GRID.cw) {
          this.damageEnemy(enemy, Math.round(projectile.damage * 0.55), projectile.owner);
        }
      }
      this.spawnParticles(px, py, "#ff9edb", 12, 85);
    }
    if (projectile.slow) target.slowTimer = 2.4;
  }

  damageEnemy(enemy, amount, source = null) {
    if (enemy.dead) return;
    enemy.hp -= amount;
    enemy.hurt = 0.28;
    const px = enemy.x * GRID.cw + GRID.x + GRID.cw / 2;
    const py = enemy.row * GRID.ch + GRID.y + GRID.ch / 2 - 10;
    this.addFloater(`-${Math.round(amount)}`, px + (Math.random() - 0.5) * 10, py, "#fff5d6", 11);
    if (enemy.hp <= 0) this.killEnemy(enemy, source);
  }

  killEnemy(enemy, source = null) {
    if (enemy.dead) return;
    enemy.dead = true;
    this.kills += 1;
    this.charge = Math.min(100, this.charge + (enemy.def.boss ? 20 : 7));
    if (enemy.def.boss) {
      this.bossKilled = true;
      this.charge = 100;
    }
    this.app.recordKill();
    const px = enemy.x * GRID.cw + GRID.x + GRID.cw / 2;
    const py = enemy.row * GRID.ch + GRID.y + GRID.ch / 2;
    this.spawnParticles(px, py, enemy.def.color, enemy.def.boss ? 28 : 10, enemy.def.boss ? 120 : 70);
    this.spawnParticles(px, py, enemy.def.accent, enemy.def.boss ? 16 : 5, 55);
    this.shake = Math.max(this.shake, enemy.def.boss ? 9 : 3);
    this.app.audio.sfx("pop");
    if (enemy.def.boss) {
      this.addFloater("BANISHED!", px, py - 26, "#ffd700", 24);
      this.hitstop = 0.12;
    }
  }

  damageUnit(unit, amount) {
    if (unit.dead) return;
    unit.hp -= amount;
    unit.hurt = 0.35;
    this.addFloater(`-${amount}`, unit.px + 10, unit.py - 20, "#ff8a9c", 10);
    this.spawnParticles(unit.px, unit.py - 8, "#ff6b7a", 4, 32);
    if (unit.hp <= 0) {
      unit.hp = 0;
      unit.dead = true;
      this.grid[unit.row][unit.col] = null;
      this.spawnParticles(unit.px, unit.py - 8, unit.def.color, 12, 65);
      this.addFloater("POOF!", unit.px, unit.py - 28, "#ff9edb", 13);
      this.shake = Math.max(this.shake, 4);
    }
  }

  healUnit(unit, amount) {
    if (unit.dead) return;
    const healed = Math.min(amount, unit.maxHp - unit.hp);
    unit.hp += healed;
    unit.hurt = 0;
    this.addFloater(`+${healed}`, unit.px, unit.py - 26, "#72e6a5", 12);
    this.spawnParticles(unit.px, unit.py - 8, "#72e6a5", 6, 35);
    this.app.audio.sfx("heal");
  }

  damageDream(enemy) {
    this.dream = Math.max(0, this.dream - enemy.dream);
    this.flash = 1;
    this.shake = 11;
    this.hitstop = 0.06;
    this.spawnParticles(24, 390, "#ff4d6d", 18, 100);
    this.addFloater(`-${enemy.dream}`, 62, 390, "#ff4d6d", 19);
    this.app.audio.sfx("hurt");
    this.showToast("A nightmare slipped through!", "#ff6b7a");
    if (this.dream <= 0) this.lose();
  }

  addFloater(value, x, y, color, size = 12) {
    this.floaters.push({ value, x, y, color, size, life: 0.9, maxLife: 0.9, vy: -34 });
  }

  spawnParticles(x, y, color, count, speed = 50) {
    for (let i = 0; i < count; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const velocity = speed * (0.35 + Math.random() * 0.8);
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - speed * 0.25,
        life: 0.45 + Math.random() * 0.45,
        maxLife: 0.9,
        size: 2 + Math.random() * 4,
        color,
        type: Math.random() > 0.55 ? "star" : Math.random() > 0.5 ? "square" : "spark",
        rotation: Math.random() * Math.PI,
        spin: (Math.random() - 0.5) * 9,
        gravity: 70,
      });
    }
  }

  updateEffects(dt) {
    for (const particle of this.particles) {
      particle.life -= dt;
      particle.x += particle.vx * dt;
      particle.y += particle.vy * dt;
      particle.vy += (particle.gravity || 0) * dt;
      particle.vx *= 0.985;
      particle.rotation += particle.spin * dt;
    }
    this.particles = this.particles.filter((particle) => particle.life > 0);
    for (const floater of this.floaters) {
      floater.life -= dt;
      floater.y += floater.vy * dt;
      floater.vy *= 0.97;
    }
    this.floaters = this.floaters.filter((floater) => floater.life > 0);
  }

  tryPlace(row, col) {
    if (!this.selectedUnit) {
      const existing = this.grid[row][col];
      if (existing && !existing.dead) {
        this.showToast(`${existing.def.name} · ${Math.ceil(existing.hp)}/${existing.maxHp} HP`, "#b69cff");
      }
      return;
    }
    const unit = UNIT_BY_ID[this.selectedUnit];
    if (!unit) return;
    if (this.grid[row][col]) {
      this.showToast("That patch is taken!", "#ff6b7a");
      this.app.audio.sfx("deny");
      return;
    }
    for (const enemy of this.enemies) {
      if (!enemy.dead && enemy.row === row && Math.abs(enemy.x - col) < 0.72) {
        this.showToast("Too spooky! Try another tile.", "#ff6b7a");
        this.app.audio.sfx("deny");
        return;
      }
    }
    if (this.starlight < unit.cost) {
      this.showToast(`Need ${unit.cost - this.starlight} more starlight`, "#ff6b7a");
      this.app.audio.sfx("deny");
      return;
    }
    if ((this.cooldowns[unit.id] || 0) > 0) {
      this.showToast(`${unit.name} is still recharging`, "#ff6b7a");
      this.app.audio.sfx("deny");
      return;
    }

    const stats = unitStats(unit, this.app.save.upgrades[unit.id] || 0);
    const px = GRID.x + (col + 0.5) * GRID.cw;
    const py = GRID.y + (row + 0.5) * GRID.ch + 5;
    const placed = {
      id: nextUid++,
      def: unit,
      stats,
      row,
      col,
      px,
      py,
      hp: stats.hp,
      maxHp: stats.hp,
      atkTimer: 0.25,
      genTimer: Math.max(1.2, unit.interval * 0.55),
      attackAnim: 0,
      hurt: 0,
      pulse: 1,
      dead: false,
    };
    this.units.push(placed);
    this.grid[row][col] = placed;
    this.starlight -= unit.cost;
    this.cooldowns[unit.id] = unit.cooldown;
    this.selectedUnit = null;
    this.app.audio.sfx("place");
    this.spawnParticles(px, py, unit.accent, 10, 45);
    this.addFloater("BOING!", px, py - 34, unit.accent, 13);
    this.advanceTutorial(0);
  }

  collectStar(star) {
    if (star.dead) return;
    star.dead = true;
    this.starlight += star.value;
    this.starsCollected += 1;
    this.app.recordStar();
    this.app.audio.sfx("star");
    this.addFloater(`+${star.value}`, star.x, star.y - 18, "#ffd700", 18);
    this.spawnParticles(star.x, star.y, "#ffd700", 14, 65);
    this.advanceTutorial(1);
  }

  activatePower() {
    if (this.charge < 100) {
      this.showToast("Star Power is still charging!", "#b69cff");
      return;
    }
    this.charge = 0;
    this.powerPulse = 1.7;
    this.shake = 12;
    this.hitstop = 0.1;
    this.app.audio.sfx("power");
    for (const enemy of this.enemies) {
      if (enemy.dead) continue;
      enemy.freeze = 2.4;
      this.damageEnemy(enemy, 72, null);
    }
    for (const unit of this.units) {
      if (unit.dead) continue;
      this.healUnit(unit, Math.round(unit.maxHp * 0.28));
    }
    for (let i = 0; i < 4; i += 1) {
      this.spawnParticles(80 + i * 110, 260 + i * 60, i % 2 ? "#ffd700" : "#00d4ff", 18, 130);
    }
    this.addFloater("DREAM NOVA!", 240, 320, "#ffd700", 27);
    this.advanceTutorial(2);
  }

  win() {
    if (this.state !== "playing") return;
    this.state = "won";
    this.resultTime = 0;
    this.app.save.seenIntro = true;
    this.app.audio.sfx("victory");
    this.spawnParticles(240, 300, "#ffd700", 40, 160);
    this.spawnParticles(240, 360, "#00d4ff", 28, 140);
    this.stats = {
      dream: Math.round(this.dream),
      kills: this.kills,
      stars: this.starsCollected,
      wave: this.waveIndex,
      bossKilled: this.bossKilled,
      noLeak: this.dream >= 100,
    };
    this.result = this.app.completeLevel(this.levelIndex, this.stats);
  }

  lose() {
    if (this.state !== "playing") return;
    this.state = "lost";
    this.resultTime = 0;
    this.app.save.seenIntro = true;
    this.app.audio.sfx("defeat");
    this.stats = {
      dream: 0,
      kills: this.kills,
      stars: this.starsCollected,
      wave: this.waveIndex,
      bossKilled: this.bossKilled,
      noLeak: false,
    };
    this.result = this.app.failLevel(this.levelIndex, this.stats);
  }

  togglePause() {
    if (this.state === "playing") this.state = "paused";
    else if (this.state === "paused") this.state = "playing";
  }

  isCellValid(row, col) {
    if (row < 0 || row >= GRID.rows || col < 0 || col >= GRID.cols) return false;
    if (this.grid[row][col]) return false;
    for (const enemy of this.enemies) {
      if (!enemy.dead && enemy.row === row && Math.abs(enemy.x - col) < 0.72) return false;
    }
    return true;
  }

  getCardRects() {
    return UNITS.map((unit, index) => ({
      unit,
      x: BAR.left + index * (BAR.cardW + BAR.gap) - this.scroll,
      y: BAR.cardY + (this.selectedUnit === unit.id ? -5 : 0),
      w: BAR.cardW,
      h: BAR.cardH,
      locked: this.guardianLevel < unit.unlock,
      cooldown: this.cooldowns[unit.id] || 0,
      affordable: this.starlight >= unit.cost,
    }));
  }
}

export { pointInRect, pointInCircle, clamp };
