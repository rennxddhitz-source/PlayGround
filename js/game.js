// ── Core game loop, dungeon run, combat, loot, progression ──────────────────
import {
  VIEW_W, VIEW_H, BIOMES, BIOME_KEYS, BOSSES, BLESSINGS, DIFFICULTIES, ELEMENTS, ELEMENT_LIST,
  ENEMY_TYPES, RARITIES, WEAPONS, WEAPON_BY_ID, getWeapon, elementMultiplier, xpToNext, MAX_LEVEL,
  SKILL_BY_ID, SKILL_BRANCHES, weaponDps, echoCost,
} from './data.js';
import {
  TAU, clamp, dist, dist2, angleTo, angleDiff, pick, pickWeighted, rngFrom, shuffle, fmt, shortTime, easeOutCubic,
} from './util.js';
import { generateDungeon, collide, blockedAt, roomLabel, ROOM_BOUNDS } from './world.js';
import {
  Player, Enemy, Boss, Projectile, Particle, FloatText, Pickup,
} from './entities.js';
import {
  drawTitleScene, drawTownScene, drawRoomStatic, drawRoomDynamic, drawLighting, drawAmbient,
  drawMinimap, applyShake, drawDamageText, TOWN_HOTSPOTS, TOWN_COLLIDERS, TOWN_BOUNDS, nearestHotspot,
} from './render.js';
import { drawKnight, drawHeldWeapon, drawChest, drawShrine, drawPortal, drawPixelText, drawGlow, drawShadow, px } from './pixel.js';

const TOWN_NPCS = [
  { x: 126, y: 160, skin: '#d9a06b', hair: '#3a2a22', body: '#6b3030', dark: '#3a1a1a', seed: 1, tool: 'hammer' },
  { x: 380, y: 168, skin: '#c98b6b', hair: '#2a2020', body: '#7a4a8a', dark: '#3a2448', seed: 2 },
  { x: 182, y: 178, skin: '#d9b08a', hair: '#e8e0d0', body: '#3a5a7a', dark: '#1a2a3a', seed: 3, tool: 'staff' },
  { x: 412, y: 226, skin: '#b87a5a', hair: '#5a3a22', body: '#5a6a3a', dark: '#2a3020', seed: 4 },
];

const DIFF_INDEX = { normal: 0, hard: 1, nightmare: 2 };

export class Game {
  constructor(canvas, ui, audio, input, meta, saveFn) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;
    this.ui = ui;
    this.audio = audio;
    this.input = input;
    this.meta = meta;
    this.saveFn = saveFn;
    this.mode = 'title';
    this.time = 0;
    this.run = null;
    this.dungeon = null;
    this.room = null;
    this.player = null;
    this.enemies = [];
    this.projectiles = [];
    this.particles = [];
    this.texts = [];
    this.pickups = [];
    this.zones = [];
    this.effects = [];
    this.timers = [];
    this.cooldowns = {};
    this.boss = null;
    this.depth = 0;
    this.wave = 0;
    this.wavesTotal = 0;
    this.roomState = 'idle';
    this.clearDelay = -1;
    this.shake = 0;
    this.stopTime = 0;
    this.hudTimer = 0;
    this.blocking = false;
    this.interactTarget = null;
    this.chest = null;
    this.shrine = null;
    this.blessings = {};
    this.difficulty = DIFFICULTIES.normal;
    this.pendingLoot = false;
    this.bossIntroTimer = 0;
    this.slowmo = 0;
    this.townRoom = {
      bounds: TOWN_BOUNDS,
      props: TOWN_COLLIDERS.map(c => ({ shape: 'circle', x: c.x, y: c.y, r: c.r, kind: c.kind })),
      lights: [], decor: [], seed: 0, biome: 'ember',
    };
    this.stats = this.deriveStats();
    this.lastFrame = performance.now();
    this.acc = 0;
    this.running = false;
    this.titlePlayer = { x: 84, y: 248, dir: 'right', moving: false, hitFlash: 0 };
  }

  // ── Stats ──────────────────────────────────────────────────────────────────
  deriveStats() {
    const m = this.meta;
    const w = getWeapon(this.run?.weaponId || m.equippedWeapon) || getWeapon(m.ownedWeapons[0]);
    const skills = m.skills || {};
    const passives = new Set(Object.keys(skills).filter(k => skills[k] && SKILL_BY_ID.get(k)?.kind === 'passive'));
    const b = this.blessings || {};
    const echo = m.echo || {};
    const vit = m.stats.vit, dex = m.stats.dex, agi = m.stats.agi, int = m.stats.int;
    let maxHp = 100 + vit * 8 + m.level * 5 + (echo.vitality || 0) * 14;
    if (passives.has('ironwill')) maxHp += 40;
    maxHp = Math.round(maxHp * (1 + (b.maxHp || 0)));
    const maxMp = Math.round(40 + int * 3 + m.level * 2 + (passives.has('manaflow') ? 20 : 0));
    const crit = 3 + dex * 0.35 + (w?.critBonus || 0) + (w?.affixes?.includes('keen') ? 7 : 0) + (b.crit || 0);
    const dodge = Math.min(48, agi * 0.25 + (w?.affixes?.includes('vigilant') ? 5 : 0) + (b.dodge || 0));
    const attackSpeed = (passives.has('bloodlust') ? 1.15 : 1) * (1 + (b.attackSpeed || 0)) * (w?.affixes?.includes('fury') ? 1.12 : 1);
    let damageBonus = (echo.power || 0) * 0.04 + (passives.has('bloodlust') ? 0.10 : 0) + (b.damage || 0);
    let elemental = (passives.has('manaflow') ? 0.15 : 0) + (w?.affixes?.includes('arcane') ? 0.10 : 0) + (b.elemental || 0);
    return {
      maxHp, maxMp, crit: Math.min(85, crit), dodge,
      moveSpeed: 96 * (1 + (echo.haste || 0) * 0.025 + (b.moveSpeed || 0) + (w?.affixes?.includes('swift') ? 0.06 : 0)),
      damageBonus, elemental, attackSpeed,
      lifesteal: (w?.affixes?.includes('vampiric') ? 0.04 : 0) + (b.lifesteal || 0),
      mpRegen: 4 + int * 0.07 + (passives.has('manaflow') ? 3 : 0),
      hpRegen: b.regen || 0,
      damageReduction: (passives.has('ironwill') ? 0.12 : 0),
      dodgeCd: 1.15 * (1 - (b.dodgeCd || 0)),
      weapon: w,
      powerStat: w?.powerStat || 'str',
      taken: this.stats?.taken || 0,
    };
  }
  recompute(keepRatio = true) {
    const oldMax = this.stats?.maxHp || 1;
    const oldMp = this.stats?.maxMp || 1;
    const hpRatio = this.player ? this.player.hp / oldMax : 1;
    const mpRatio = this.player ? this.player.mp / oldMp : 1;
    this.stats = this.deriveStats();
    if (this.player) {
      if (keepRatio) { this.player.hp = Math.max(1, this.player.hp + (this.stats.maxHp - oldMax)); this.player.mp = Math.min(this.stats.maxMp, this.player.mp + (this.stats.maxMp - oldMp)); }
      this.player.hp = clamp(this.player.hp, 1, this.stats.maxHp);
      this.player.mp = clamp(this.player.mp, 0, this.stats.maxMp);
    }
  }
  get equippedWeapon() { return getWeapon(this.run?.weaponId || this.meta.equippedWeapon); }
  get potions() { return this.run?.potions || this.meta.potions; }

  // ── Lifecycle ──────────────────────────────────────────────────────────────
  start() {
    if (this.running) return;
    this.running = true;
    this.lastFrame = performance.now();
    requestAnimationFrame(this.frame.bind(this));
  }
  frame(now) {
    if (!this.running) return;
    let dt = Math.min(0.05, (now - this.lastFrame) / 1000);
    this.lastFrame = now;
    const realDt = dt;
    this.time += dt;
    if (this.stopTime > 0) { this.stopTime -= realDt; dt *= 0.1; }
    if (this.slowmo > 0) { this.slowmo -= realDt; dt *= 0.35; }
    if (this.mode === 'title') {
      this.updateParticles(dt);
      this.ui.syncTitle(this);
    } else if (this.mode === 'town') {
      if (!this.ui.blocking) this.updateTown(dt);
      this.updateParticles(dt);
    } else if (this.mode === 'dungeon') {
      if (!this.ui.blocking) this.updateDungeon(dt);
      else this.updateParticles(dt * 0.5);
    } else if (this.mode === 'victory' || this.mode === 'gameover') {
      this.updateParticles(dt);
    }
    this.shake *= Math.pow(0.0001, realDt);
    if (this.shake < 0.1) this.shake = 0;
    this.render();
    this.hudTimer -= realDt;
    if (this.hudTimer <= 0 && (this.mode === 'dungeon' || this.mode === 'town')) { this.hudTimer = 0.08; this.ui.updateHUD(this); }
    this.input.endFrame();
    requestAnimationFrame(this.frame.bind(this));
  }

  goTitle() {
    this.mode = 'title';
    this.ui.showScreen('title');
    this.audio.setTrack('title');
  }
  goTown(options = {}) {
    this.mode = 'town';
    this.run = null;
    this.enemies = []; this.projectiles = []; this.pickups = []; this.zones = []; this.effects = []; this.texts = []; this.particles = [];
    this.room = this.townRoom;
    this.stats = this.deriveStats();
    this.player = new Player(this, 240, 228);
    this.player.hp = this.stats.maxHp;
    this.player.mp = this.stats.maxMp;
    this.blocking = false;
    this.ui.showScreen('town');
    this.ui.closeModal();
    this.audio.setTrack('town');
    if (options.fromRun) this.ui.toast(options.fromRun, options.color || '#ffd86b');
  }

  // ── Town ───────────────────────────────────────────────────────────────────
  updateTown(dt) {
    const p = this.player;
    if (!p) return;
    const axis = this.input.getAxis();
    const aim = this.input.aimAngle(p.x, p.y);
    p.update(dt, axis, aim ?? p.aim, aim !== null);
    // clamp to town bounds
    const b = TOWN_BOUNDS;
    p.x = clamp(p.x, b.x + 8, b.x + b.w - 8);
    p.y = clamp(p.y, b.y + 8, b.y + b.h - 8);
    const hs = nearestHotspot(p.x, p.y);
    this.interactTarget = hs;
    this.ui.setTownPrompt(hs);
    if (this.input.consume('interact') && hs) this.openTown(hs.id);
    if (this.input.tap) {
      for (const h of TOWN_HOTSPOTS) {
        if (dist(this.input.tap.x, this.input.tap.y, h.x, h.y) < h.r + 18) { this.openTown(h.id); break; }
      }
    }
    if (this.input.consume('pause')) this.ui.showPause(this);
  }
  openTown(id) {
    this.audio.sfx('click');
    this.ui.openTownPanel(id, this);
  }

  // ── Run setup ──────────────────────────────────────────────────────────────
  startRun({ biome, difficulty }) {
    this.ui.closeModal();
    const diff = DIFFICULTIES[difficulty] || DIFFICULTIES.normal;
    const seed = Math.floor(Math.random() * 1e9);
    this.difficulty = diff;
    this.dungeon = generateDungeon(seed, biome, diff.id, this.meta.level);
    this.run = {
      biome, difficulty: diff.id, seed, weaponId: this.meta.equippedWeapon,
      gold: 0, kills: 0, xp: 0, materials: { iron: 0, essence: 0, crystal: 0 },
      potions: { ...this.meta.potions }, startTime: this.time, blessings: {},
      roomsCleared: 0, eliteKills: 0, damageDealt: 0, damageTaken: 0,
      rerolls: 1, dead: false, revived: false,
    };
    this.blessings = this.run.blessings;
    this.meta.potions = { ...this.run.potions };
    this.mode = 'dungeon';
    this.ui.showScreen('dungeon');
    this.audio.sfx('portal');
    this.audio.setTrack('dungeon');
    this.depth = 0;
    this.stats = this.deriveStats();
    this.player = new Player(this, 240, 210);
    this.player.hp = this.stats.maxHp;
    this.player.mp = this.stats.maxMp;
    this.enterRoom(this.dungeon.byId.get(this.dungeon.startId));
    this.save();
  }

  enterRoom(node) {
    const d = this.dungeon;
    d.currentNode = node.id;
    node.visited = true;
    node.seen = true;
    for (const id of node.next) d.byId.get(id).seen = true;
    this.currentNode = node;
    this.room = node.room;
    this.depth = node.layer / Math.max(1, d.total - 1);
    this.enemies = [];
    this.projectiles = [];
    this.pickups = [];
    this.zones = [];
    this.effects = [];
    this.texts = [];
    this.particles = [];
    this.boss = null;
    this.chest = null;
    this.shrine = null;
    this.wave = 0;
    this.wavesTotal = 0;
    this.roomState = 'intro';
    this.introTimer = 0.9;
    this.clearDelay = -1;
    this.pendingLoot = false;
    this.interactTarget = null;
    this.cooldowns = {};
    this.spinTime = 0;
    this.room.cleared = false;
    this.player.x = 240; this.player.y = 214;
    if (node.type === 'boss') { this.player.y = 222; }
    this.player.hp = Math.min(this.stats.maxHp, this.player.hp + this.stats.maxHp * 0.14);
    this.player.mp = Math.min(this.stats.maxMp, this.player.mp + this.stats.maxMp * 0.25);
    this.player.invuln = 0.8;
    this.ui.hideBoss();
    this.ui.banner(roomLabel(node.type).name, `ROOM ${node.layer + 1} / ${d.total}`, BIOMES[this.run.biome].palette.accent);
    this.audio.setTrack('dungeon');
    this.save();
    if (node.type === 'boss') {
      this.spawnBoss();
    } else if (node.type === 'start') {
      // safe room: pick a path
      this.roomState = 'cleared';
      this.room.cleared = true;
      this.timers.push({ t: 1.0, fn: () => this.openPath() });
    } else if (node.type === 'treasure') {
      this.chest = { x: 240, y: 146, opened: false };
    } else if (node.type === 'shrine') {
      this.shrine = { x: 240, y: 150, used: false };
    } else {
      this.wavesTotal = node.type === 'elite' ? 1 : 2 + (this.depth > 0.55 ? 1 : 0);
      this.roomState = 'intro';
    }
  }

  spawnBoss() {
    const def = BOSSES[BIOMES[this.run.biome].boss];
    this.boss = new Boss(this, def.id, 240, 104);
    this.roomState = 'bossintro';
    this.bossIntroTimer = 2.0;
    this.player.invuln = 2.5;
    this.ui.showBossIntro(def);
    this.audio.sfx('bossroar');
    this.audio.setTrack('boss');
    this.addParticles(240, 104, def.accent, 24, 135, 1);
    this.screenShake(8);
  }

  spawnWave() {
    if (!this.run) return;
    this.wave++;
    const count = clamp(2 + Math.floor(this.depth * 3.4) + DIFF_INDEX[this.run.difficulty] + (this.wave - 1), 2, 8);
    const biome = BIOMES[this.run.biome];
    const pool = this.room.roomType === 'elite' ? ['brute', 'wraith', 'mage', 'charger'] : ['husk', 'bat', 'archer', 'charger', 'bomber', 'mage', 'wraith', 'brute'];
    const points = shuffle(Math.random, this.room.spawnPoints);
    const elite = this.room.roomType === 'elite' && this.wave === 1;
    for (let i = 0; i < count; i++) {
      const kind = pick(Math.random, pool);
      const pt = points[i % points.length];
      const e = new Enemy(this, kind, pt.x, pt.y, { element: pick(Math.random, biome.elements), depth: this.depth, elite: elite && i === 0 });
      if (elite) e.element = biome.elements[0];
      if (dist(e.x, e.y, this.player.x, this.player.y) < 55) { e.x = 60 + Math.random() * 360; e.y = 60 + Math.random() * 150; }
      this.enemies.push(e);
      this.spawnBurst(e.x, e.y, ELEMENTS[e.element].color, 7, 60);
    }
    this.roomState = 'fight';
    if (this.wavesTotal > 1) this.ui.banner(`WAVE ${this.wave} / ${this.wavesTotal}`, this.room.roomType === 'elite' ? 'ELITE CHAMPION' : 'CLEAR THE CHAMBER', '#ff9b6a');
    else this.ui.banner('ELITE CHAMPION', 'CLEAR THE CHAMBER', '#ffb340');
    this.audio.sfx('portal', 0.6);
  }

  spawnEnemy(kind, x, y, opts = {}) {
    if (!this.run) return null;
    const biome = BIOMES[this.run.biome];
    const e = new Enemy(this, kind, x, y, {
      element: opts.element || pick(Math.random, biome.elements),
      depth: this.depth,
      elite: !!opts.elite,
    });
    this.enemies.push(e);
    this.spawnBurst(e.x, e.y, ELEMENTS[e.element].color, 8, 70);
    return e;
  }

  abandonRun() {
    if (this.mode !== 'dungeon' || !this.run) return;
    this.commitRun(false);
    this.run = null;
    this.save();
    this.goTown({ fromRun: 'You left the loop behind. Partial spoils kept.', color: '#ffb340' });
  }

  openPath() {
    if (!this.dungeon) return;
    const node = this.currentNode;
    const options = node.next.map(id => {
      const n = this.dungeon.byId.get(id);
      return { id: n.id, type: n.type, label: roomLabel(n.type).name, desc: roomLabel(n.type).desc, layer: n.layer + 1, elite: n.type === 'elite', boss: n.type === 'boss', biome: BIOMES[this.run.biome].name };
    });
    if (!options.length) return;
    this.audio.sfx('open');
    this.ui.showPath(options, this);
  }
  choosePath(id) {
    this.ui.closeModal();
    const n = this.dungeon.byId.get(id);
    if (!n) return;
    this.audio.sfx('portal');
    this.fadeTransition(() => this.enterRoom(n));
  }
  fadeTransition(fn) {
    this.ui.fade(0.18, () => { fn(); this.ui.fadeOut(0.2); });
  }

  // ── Dungeon update ─────────────────────────────────────────────────────────
  updateDungeon(dt) {
    const p = this.player;
    if (!p) return;
    // timers
    for (const timer of this.timers) { timer.t -= dt; }
    const ready = this.timers.filter(t => t.t <= 0);
    this.timers = this.timers.filter(t => t.t > 0);
    for (const t of ready) t.fn();
    // cooldowns
    for (const k of Object.keys(this.cooldowns)) this.cooldowns[k] = Math.max(0, this.cooldowns[k] - dt);
    // input
    const axis = this.input.getAxis();
    const aimMouse = this.input.aimAngle(p.x, p.y);
    let aim = p.aim;
    if (aimMouse !== null && !this.ui.blocking) { aim = aimMouse; p.aim = aim; }
    if (this.input.tap) p.aim = Math.atan2(this.input.tap.y - p.y, this.input.tap.x - p.x);
    p.update(dt, axis, aim, aimMouse !== null || !!this.input.tap);
    if (this.roomState === 'fight' || this.roomState === 'cleared' || this.roomState === 'bossintro') {
      if (this.input.consume('attack') || this.input.isHeld('attack')) this.tryAttack();
    }
    if (this.input.consume('dodge')) p.tryDodge(axis, p.aim);
    if (this.input.consume('skill1')) this.useSkill(0);
    if (this.input.consume('skill2')) this.useSkill(1);
    if (this.input.consume('potion_hp')) this.usePotion('hp');
    if (this.input.consume('potion_mp')) this.usePotion('mp');
    if (this.input.consume('pause')) this.ui.showPause(this);
    if (this.input.consume('interact')) this.tryInteract();
    if (this.input.tap && this.roomState === 'cleared') {
      if (this.chest && !this.chest.opened && dist(this.input.tap.x, this.input.tap.y, this.chest.x, this.chest.y) < 30) this.tryInteract();
      if (this.shrine && !this.shrine.used && dist(this.input.tap.x, this.input.tap.y, this.shrine.x, this.shrine.y) < 30) this.tryInteract();
    }
    // spin ultimate
    if (this.spinTime > 0) {
      this.spinTime -= dt;
      this.spinTick = (this.spinTick || 0) - dt;
      if (this.spinTick <= 0) { this.spinTick = 0.14; this.hitArea(p.x, p.y, 78, this.attackBase() * 0.45, { element: this.equippedWeapon?.element || 'fire', noKnock: true }); this.addParticles(p.x, p.y, '#ffd27a', 3, 100, 0.3); }
    }
    // room intro
    if (this.roomState === 'intro') {
      this.introTimer -= dt;
      if (this.introTimer <= 0) {
        if (this.currentNode.type === 'treasure' || this.currentNode.type === 'shrine') { this.roomState = 'cleared'; this.room.cleared = true; this.ui.banner('INTERACT', 'Press F or tap', '#ffd86b'); }
        else { this.roomState = 'fight'; this.spawnWave(); }
      }
    }
    if (this.roomState === 'bossintro') {
      this.bossIntroTimer -= dt;
      if (this.bossIntroTimer <= 0) this.roomState = 'fight';
    }
    // enemies
    for (const e of this.enemies) e.update(dt);
    const before = this.enemies.length;
    this.enemies = this.enemies.filter(e => !(e.dead && e.deathTime > 0.9));
    // projectiles
    for (const pr of this.projectiles) pr.update(dt);
    this.projectiles = this.projectiles.filter(pr => !pr.dead);
    // pickups
    for (const pk of this.pickups) pk.update(dt, p);
    this.pickups = this.pickups.filter(pk => !pk.dead);
    // zones
    for (const z of this.zones) {
      z.timer -= dt;
      if (!z.exploded && z.timer <= 0) {
        z.exploded = true;
        z.flash = 0.25;
        this.explosion(z.x, z.y, z.r, z.dmg, z.element || 'fire', null, 'enemy', z.kind);
        this.screenShake(3);
      }
      if (z.flash > 0) z.flash -= dt;
    }
    this.zones = this.zones.filter(z => z.timer > -0.35);
    // boss
    if (this.boss && !this.boss.dead) {
      if (this.roomState === 'fight') this.boss.update(dt);
      if (this.boss && this.boss.dead) { /* handled */ }
    } else if (this.boss && this.boss.dead) {
      this.boss.deathTime += dt;
    }
    // effects
    for (const fx of this.effects) fx.life -= dt;
    this.effects = this.effects.filter(fx => fx.life > 0);
    this.updateParticles(dt);
    // wave clear
    if (this.roomState === 'fight' && this.boss === null) {
      const alive = this.enemies.some(e => !e.dead);
      if (!alive && this.wave < this.wavesTotal) {
        if (this.clearDelay < 0) this.clearDelay = 0.9;
        this.clearDelay -= dt;
        if (this.clearDelay <= 0) { this.clearDelay = -1; this.spawnWave(); }
      } else if (!alive && this.wave >= this.wavesTotal) {
        if (this.clearDelay < 0) this.clearDelay = 1.0;
        this.clearDelay -= dt;
        if (this.clearDelay <= 0) { this.clearDelay = -1; this.clearRoom(); }
      }
    }
    // boss clear check
    if (this.roomState === 'fight' && this.boss && this.boss.dead && this.boss.deathTime > 1.8) {
      this.roomState = 'cleared';
    }
  }

  clearRoom() {
    if (!this.run || !this.currentNode) return;
    this.roomState = 'cleared';
    this.room.cleared = true;
    this.run.roomsCleared++;
    this.player.heal(this.stats.maxHp * 0.08);
    this.ui.banner('CHAMBER CLEAR', 'The way forward opens', '#8cf07a');
    this.audio.sfx('loot');
    const node = this.currentNode;
    const gold = Math.round((10 + node.layer * 3) * this.difficulty.reward * (1 + (this.blessings.gold || 0)));
    this.spawnGold(this.player.x, this.player.y, gold);
    if (Math.random() < 0.35) this.addPickup('iron', 1, this.player.x, this.player.y);
    if (Math.random() < 0.12) this.addPickup('essence', 1, this.player.x, this.player.y);
    // loot then path
    this.timers.push({ t: 0.7, fn: () => {
      if (node.type === 'boss') return;
      this.offerLoot();
    } });
    this.save();
  }

  tryInteract() {
    if (this.roomState !== 'cleared') return;
    if (this.chest && !this.chest.opened && dist(this.player.x, this.player.y, this.chest.x, this.chest.y) < 40) {
      this.chest.opened = true;
      this.audio.sfx('loot');
      this.spawnBurst(this.chest.x, this.chest.y - 6, '#ffd86b', 22, 110);
      this.addText(this.chest.x, this.chest.y - 24, 'TREASURE!', '#ffd86b', 1.2);
      this.offerLoot(true);
      return;
    }
    if (this.shrine && !this.shrine.used && dist(this.player.x, this.player.y, this.shrine.x, this.shrine.y) < 40) {
      this.shrine.used = true;
      this.audio.sfx('open');
      this.ui.showShrine(this);
      return;
    }
    // if room cleared and no loot pending, path may be waiting
    if (this.roomState === 'cleared' && !this.pendingLoot && !this.chest && !this.shrine) this.openPath();
  }

  chooseShrine(choice) {
    this.ui.closeModal();
    if (choice === 'heal') {
      this.player.heal(this.stats.maxHp * 0.42);
      this.audio.sfx('potion');
      this.ui.toast('The shrine restores you.', '#8cf07a');
    } else {
      const blessing = pick(Math.random, BLESSINGS.filter(b => b.rarity !== 'legendary'));
      this.applyBlessing(blessing);
      this.audio.sfx('levelup');
      this.ui.toast(`Blessing: ${blessing.name}`, blessing.color);
    }
    this.roomState = 'cleared';
    this.timers.push({ t: 0.8, fn: () => { this.offerLoot(); } });
  }

  // ── Combat ─────────────────────────────────────────────────────────────────
  attackBase(weapon = this.equippedWeapon) {
    if (!weapon) return 5;
    const power = this.meta.stats[weapon.powerStat] || 5;
    const upgrade = 1 + (this.meta.upgrades?.[weapon.id] || 0) * 0.08;
    const base = (weapon.baseDmg * upgrade) / weapon.rarityMult;
    let dmg = base * (1 + power / 100) * weapon.rarityMult * (1 + this.stats.damageBonus);
    if (this.stats.elemental) dmg *= (1 + this.stats.elemental);
    if (weapon.affixes?.includes('umbral') && this.player.hp / this.stats.maxHp < 0.35) dmg *= 1.2;
    return dmg;
  }
  tryAttack() {
    const p = this.player, w = this.equippedWeapon;
    if (!w || p.dead || p.attackCd > 0) return;
    const speed = w.speed * this.stats.attackSpeed;
    p.attackCd = 1 / Math.max(0.25, speed);
    p.attackAnim = 0.2;
    const crit = Math.random() * 100 < this.stats.crit;
    const base = this.attackBase(w);
    if (w.kind === 'melee') {
      const range = w.range;
      const aim = p.aim;
      this.effects.push({ type: 'slash', x: p.x, y: p.y - 8, angle: aim, range, arc: w.arc, life: 0.2, maxLife: 0.2, color: ELEMENTS[w.element].light });
      let hitAny = false;
      const targets = [...this.enemies.filter(e => !e.dead), this.boss && !this.boss.dead ? this.boss : null].filter(Boolean);
      for (const e of targets) {
        const d = dist(p.x, p.y, e.x, e.y);
        if (d > range + e.r) continue;
        const a = angleTo(p.x, p.y, e.x, e.y);
        if (Math.abs(angleDiff(a, aim)) > w.arc / 2 && d > e.r + 10) continue;
        hitAny = true;
        this.damageEnemy(e, base, { element: w.element, crit, source: 'weapon', angle: aim, knock: 32 });
        this.applyAffixes(e, w, base, crit);
      }
      if (hitAny) { this.hitStop(0.035); this.screenShake(w.type === 'axe' ? 3.2 : 1.8); this.audio.sfx(crit ? 'crit' : 'slash'); }
      else this.audio.sfx('slash', 0.6);
      if (w.type === 'spear') this.effects.push({ type: 'thrust', x: p.x, y: p.y - 8, angle: aim, range, life: 0.15, maxLife: 0.15, color: ELEMENTS[w.element].light });
    } else {
      const count = w.pellets || 1;
      for (let i = 0; i < count; i++) {
        const spread = count > 1 ? (i - (count - 1) / 2) * w.spread : 0;
        this.spawnProjectile({
          x: p.x + Math.cos(p.aim) * 12, y: p.y - 8 + Math.sin(p.aim) * 12,
          angle: p.aim + spread + (Math.random() - 0.5) * (w.type === 'gun' ? 0.05 : 0.01),
          speed: w.type === 'bow' ? 330 : w.type === 'gun' ? 380 : 240,
          dmg: base, team: 'player', kind: w.projectile === 'bullet' ? 'bullet' : w.projectile === 'homing' ? 'homing' : w.projectile === 'orb' ? 'orb' : 'arrow',
          element: w.element, color: ELEMENTS[w.element].color, radius: w.type === 'staff' ? 6 : 4,
          splash: w.splash, crit, life: 1.4, homing: w.projectile === 'homing' ? 2.2 : 0,
        });
      }
      this.audio.sfx(w.type === 'bow' ? 'arrow' : 'shoot');
      this.spawnBurst(p.x + Math.cos(p.aim) * 14, p.y - 8 + Math.sin(p.aim) * 14, ELEMENTS[w.element].light, 3, 40, 0.2);
      this.screenShake(w.type === 'gun' ? 1.4 : 0.6);
    }
    this.applyAffixHeal(w);
  }
  applyAffixes(enemy, w, base, crit) {
    if (!enemy || !w.affixes) return;
    if (w.affixes.includes('blazing')) { enemy.burn = Math.max(enemy.burn, 2.4); enemy.burnDmg = Math.max(enemy.burnDmg, 3 + base * 0.06); }
    if (w.affixes.includes('frostbound')) enemy.slow = Math.max(enemy.slow, 1.6);
    if (w.affixes.includes('earthshatter') && Math.random() < 0.12) { enemy.stun = Math.max(enemy.stun, 0.9); this.addText(enemy.x, enemy.y - 34, 'STUN', '#c98b4b'); }
    if (w.affixes.includes('thunderous') && Math.random() < 0.2) {
      const other = this.nearestEnemy(enemy.x, enemy.y, 100, enemy);
      if (other) { this.damageEnemy(other, base * 0.5, { element: 'lightning', crit: false, source: 'chain' }); this.effects.push({ type: 'lightning', x1: enemy.x, y1: enemy.y, x2: other.x, y2: other.y, life: 0.18, maxLife: 0.18, color: '#ffe14d' }); this.audio.sfx('thunder'); }
    }
  }
  applyAffixHeal(w) {
    if (w.affixes?.includes('radiant')) this.player.heal(3);
  }
  useSkill(slot) {
    const id = this.meta.equippedSkills?.[slot];
    if (!id) { this.ui.toast('No skill equipped. Visit the Skill Shrine.', '#ffb340'); this.audio.sfx('error'); return; }
    const skill = SKILL_BY_ID.get(id);
    if (!skill || skill.kind !== 'active') return;
    if (!this.meta.skills?.[id]) { this.ui.toast('Skill not unlocked.', '#ffb340'); return; }
    if ((this.cooldowns[id] || 0) > 0) { this.audio.sfx('error'); return; }
    if (this.player.mp < skill.mp) { this.ui.toast('Not enough MP.', '#57b8ff'); this.audio.sfx('error'); return; }
    this.player.mp -= skill.mp;
    this.cooldowns[id] = skill.cd;
    const p = this.player, w = this.equippedWeapon;
    const base = this.attackBase();
    if (id === 'whirlwind') {
      this.effects.push({ type: 'spin', x: p.x, y: p.y, life: 0.55, maxLife: 0.55, color: '#ff9b6a' });
      for (let i = 0; i < 3; i++) this.timers.push({ t: 0.05 + i * 0.16, fn: () => { this.hitArea(p.x, p.y, 78, base * 0.8, { element: w?.element || 'fire', crit: Math.random() * 100 < this.stats.crit }); this.screenShake(2.5); } });
      this.audio.sfx('slash');
    } else if (id === 'bladestorm') {
      this.spinTime = 1.8; this.spinTick = 0;
      this.effects.push({ type: 'spin', x: p.x, y: p.y, life: 1.8, maxLife: 1.8, color: '#ffd27a' });
      this.audio.sfx('slash');
    } else if (id === 'shieldbash') {
      const aim = p.aim;
      for (const e of [...this.enemies, this.boss].filter(Boolean)) {
        if (e.dead) continue;
        const d = dist(p.x, p.y, e.x, e.y);
        if (d < 100 && Math.abs(angleDiff(angleTo(p.x, p.y, e.x, e.y), aim)) < 0.85) {
          this.damageEnemy(e, base * 1.35, { element: 'light', crit: false, source: 'skill', angle: aim, knock: 180 });
          if (!e.isBoss) e.stun = Math.max(e.stun, 1.0);
        }
      }
      this.effects.push({ type: 'cone', x: p.x, y: p.y - 8, angle: aim, range: 100, life: 0.3, maxLife: 0.3, color: '#6db8ff' });
      this.screenShake(5); this.audio.sfx('shield');
      this.player.shieldTimer = Math.max(this.player.shieldTimer, 2.5);
    } else if (id === 'aegis') {
      this.player.shield = Math.round(this.stats.maxHp * 0.45 + 30);
      this.player.shieldTimer = 6;
      this.addText(p.x, p.y - 34, 'AEGIS', '#6db8ff', 1.3);
      this.audio.sfx('shield');
    } else if (id === 'fireball') {
      this.spawnProjectile({ x: p.x + Math.cos(p.aim) * 14, y: p.y - 8 + Math.sin(p.aim) * 14, angle: p.aim, speed: 210, dmg: base * 1.7, team: 'player', kind: 'fireball', element: 'fire', color: '#ff7b3a', radius: 8, splash: 44, crit: Math.random() * 100 < this.stats.crit, life: 1.6 });
      this.audio.sfx('shoot');
    } else if (id === 'starfall') {
      for (let i = 0; i < 5; i++) {
        const target = i < 2 && this.nearestEnemy(p.x, p.y, 300) ? this.nearestEnemy(p.x, p.y, 300) : null;
        const x = target ? target.x + (Math.random() - 0.5) * 40 : p.x + (Math.random() - 0.5) * 180;
        const y = target ? target.y + (Math.random() - 0.5) * 40 : p.y + (Math.random() - 0.5) * 140;
        this.addZone({ x: clamp(x, 50, 430), y: clamp(y, 50, 220), r: 32, delay: 0.55 + i * 0.12, duration: 0.25, color: '#c78cff', dmg: base * 1.2, element: 'light', kind: 'meteor', team: 'player' });
      }
      this.audio.sfx('thunder');
    }
    this.ui.toast(`${skill.name}`, skill.color);
  }
  usePotion(type) {
    const run = this.run;
    if (!run) return;
    if ((run.potions[type] || 0) <= 0) { this.audio.sfx('error'); this.ui.toast(`No ${type === 'hp' ? 'health' : 'mana'} flasks left.`, '#ffb340'); return; }
    run.potions[type]--;
    if (type === 'hp') { this.player.heal(this.stats.maxHp * 0.4); }
    else { this.player.mp = Math.min(this.stats.maxMp, this.player.mp + this.stats.maxMp * 0.55); this.addText(this.player.x, this.player.y - 26, '+MP', '#57b8ff'); }
    this.audio.sfx('potion');
    this.spawnBurst(this.player.x, this.player.y - 8, type === 'hp' ? '#ff5f6d' : '#57b8ff', 10, 70);
  }

  hitArea(x, y, r, dmg, opts = {}) {
    const targets = [...this.enemies.filter(e => !e.dead), this.boss && !this.boss.dead ? this.boss : null].filter(Boolean);
    for (const e of targets) {
      if (dist(x, y, e.x, e.y) < r + e.r) this.damageEnemy(e, dmg, { element: opts.element || 'fire', crit: opts.crit || false, source: 'skill', knock: opts.knock, noKnock: opts.noKnock });
    }
  }

  damageEnemy(enemy, amount, opts = {}) {
    if (!enemy || enemy.dead) return 0;
    const mult = elementMultiplier(opts.element || 'light', enemy.element);
    const crit = opts.crit && !opts.noCrit;
    let dmg = amount * mult * (crit ? 1.9 : 1);
    if (enemy.isBoss && enemy.invuln > 0) return 0;
    dmg = Math.max(1, Math.round(dmg));
    enemy.hp -= dmg;
    enemy.hitFlash = 0.12;
    this.run && (this.run.damageDealt += dmg);
    if (opts.knock && !enemy.isBoss && !opts.noKnock) {
      const a = opts.angle ?? angleTo(this.player.x, this.player.y, enemy.x, enemy.y);
      enemy.knock.x += Math.cos(a) * opts.knock;
      enemy.knock.y += Math.sin(a) * opts.knock;
    }
    if (opts.stunChance && Math.random() < opts.stunChance) enemy.stun = Math.max(enemy.stun, 0.7);
    if (this.stats.lifesteal > 0 && !opts.dot) this.player.heal(dmg * this.stats.lifesteal);
    // visual feedback
    const col = crit ? '#ffd86b' : mult > 1 ? ELEMENTS[opts.element].light : mult < 1 ? '#8a84a8' : '#f0e6d2';
    this.addText(enemy.x + (Math.random() - 0.5) * 8, enemy.y - (enemy.isBoss ? 52 : enemy.size[1] * 0.8) - 6, String(dmg), col, crit ? 1.45 : 1);
    if (mult > 1 && Math.random() < 0.6) this.addText(enemy.x, enemy.y - 30, 'WEAK!', ELEMENTS[opts.element].light, 0.9, 0.6);
    if (!opts.silent) {
      this.audio.sfx(crit ? 'crit' : 'hit', 0.7);
      this.spawnBurst(enemy.x, enemy.y - 8, ELEMENTS[opts.element].color, crit ? 9 : 5, crit ? 110 : 70, 0.4);
    }
    if (enemy.hp <= 0) {
      enemy.hp = 0;
      if (enemy.isBoss) { if (!enemy.dead) { enemy.dead = true; enemy.deathTime = 0; this.onBossDeath(enemy); } }
      else enemy.die();
    }
    return dmg;
  }
  damagePlayer(amount, source) { this.player.takeDamage(amount, source); }

  nearestEnemy(x, y, max = 9999, exclude = null) {
    let best = null, bd = max * max;
    for (const e of this.enemies) {
      if (e.dead || e === exclude) continue;
      const d = dist2(x, y, e.x, e.y); if (d < bd) { bd = d; best = e; }
    }
    if (this.boss && !this.boss.dead && this.boss !== exclude) { const d = dist2(x, y, this.boss.x, this.boss.y); if (d < bd) best = this.boss; }
    return best;
  }

  spawnProjectile(opts) {
    const pr = new Projectile({ ...opts, game: this });
    pr.game = this;
    this.projectiles.push(pr);
    return pr;
  }
  projectileHit(proj, enemy) {
    this.damageEnemy(enemy, proj.dmg, { element: proj.element, crit: proj.crit, source: 'projectile' });
    if (proj.splash) this.explosion(proj.x, proj.y, proj.splash, proj.dmg * 0.55, proj.element, null, 'player');
    if (proj.crit) this.audio.sfx('crit');
  }
  explosion(x, y, r, dmg, element, source, team = 'enemy', kind = '') {
    this.particles.push(new Particle({ x, y, life: 0.36, maxLife: 0.36, color: ELEMENTS[element]?.light || '#ffd27a', ring: true, radius: 5, growth: r * 3.2, alpha: 0.8 }));
    this.addParticles(x, y, ELEMENTS[element]?.color || '#ff7b3a', 12, 140, 0.55);
    this.addParticles(x, y, '#fff2c0', 5, 90, 0.3);
    this.audio.sfx('explosion', 0.7);
    if (team === 'player') {
      for (const e of [...this.enemies, this.boss].filter(Boolean)) {
        if (e.dead) continue;
        if (dist(x, y, e.x, e.y) < r + e.r) this.damageEnemy(e, dmg, { element, crit: false, source: 'explosion' });
      }
    } else {
      if (dist(x, y, this.player.x, this.player.y) < r + this.player.r) this.damagePlayer(dmg, source);
    }
  }
  applyBlessing(b) {
    const s = this.run.blessings;
    b.apply(s);
    this.recompute();
    if (s.healNow) { this.player.heal(this.stats.maxHp * s.healNow); s.healNow = 0; }
    this.spawnBurst(this.player.x, this.player.y, b.color, 14, 90);
    this.save();
  }

  addZone(opts) {
    this.zones.push({ timer: opts.delay, delay: opts.delay, duration: opts.duration || 0.2, r: opts.r || 30, x: opts.x, y: opts.y, color: opts.color || '#ff7b3a', dmg: opts.dmg || 10, element: opts.element || 'fire', kind: opts.kind || 'slam', exploded: false, flash: 0, team: opts.team || 'enemy' });
  }

  // ── Death / loot / rewards ─────────────────────────────────────────────────
  onEnemyDeath(e) {
    if (!this.run) return;
    this.run.kills++;
    this.gainXp(e.xp, true);
    this.spawnBurst(e.x, e.y - 8, ELEMENTS[e.element].color, 12, 100);
    this.addParticles(e.x, e.y - 8, '#d8c8ff', 5, 60, 0.8);
    this.audio.sfx('death', 0.35);
    const gold = e.gold + Math.round(e.gold * (this.blessings.gold || 0));
    this.spawnGold(e.x, e.y, gold);
    if (e.elite) {
      this.addPickup('essence', 1, e.x, e.y);
      this.addPickup('crystal', 1, e.x, e.y);
      this.run.eliteKills++;
      this.meta.gems += 2;
    }
    if (Math.random() < 0.05) this.addPickup(Math.random() < 0.5 ? 'hp' : 'mp', 1, e.x, e.y);
    if (this.equippedWeapon?.affixes?.includes('radiant')) this.player.heal(3);
    this.addText(e.x, e.y - 22, `+${e.xp} XP`, '#b478ff', 0.9, 0.7);
  }
  onBossDeath(b) {
    this.slowmo = 1.1;
    this.screenShake(14);
    this.audio.sfx('bossdown');
    this.audio.setTrack('none');
    this.spawnBurst(b.x, b.y, b.def.accent, 40, 200);
    this.addParticles(b.x, b.y, b.def.color, 30, 140, 1.2);
    this.run.kills++;
    this.gainXp(120 + DIFF_INDEX[this.run.difficulty] * 60, true);
    this.addText(b.x, b.y - 42, `+${120 + DIFF_INDEX[this.run.difficulty] * 60} XP`, '#b478ff', 1.2, 1.2);
    this.run.gold += 80 + Math.round(120 * this.difficulty.reward);
    const gemGain = Math.round((12 + Math.floor(Math.random() * 11)) * (1 + (this.meta.echo.fortune || 0) * 0.07)) * (DIFF_INDEX[this.run.difficulty] + 1);
    this.meta.gems += gemGain;
    const echoGain = 1 + DIFF_INDEX[this.run.difficulty];
    this.meta.echoes += echoGain;
    this.run._gems = gemGain; this.run._echoes = echoGain;
    this.run.materials.crystal += 2;
    this.run.materials.essence += 2;
    this.player.heal(this.stats.maxHp * 0.35);
    this.ui.hideBoss();
    this.save();
    this.timers.push({ t: 2.2, fn: () => this.endRun(true) });
  }
  onPlayerDeath() {
    this.audio.sfx('death');
    this.audio.setTrack('none');
    this.screenShake(10);
    this.spawnBurst(this.player.x, this.player.y, '#ff5f6d', 30, 150);
    this.mode = 'gameover';
    this.ui.showGameOver(this, { canRevive: !this.run.revived && this.meta.gems >= 30, keepGold: Math.round(this.run.gold * 0.25), gold: this.run.gold });
  }
  revive() {
    if (this.meta.gems < 30) return;
    this.meta.gems -= 30;
    this.run.revived = true;
    this.player.dead = false;
    this.player.hp = this.stats.maxHp * 0.6;
    this.player.mp = this.stats.maxMp * 0.5;
    this.player.invuln = 2.5;
    this.enemies.forEach(e => { if (!e.dead && dist(e.x, e.y, this.player.x, this.player.y) < 90) e.die(); });
    this.projectiles = [];
    this.zones = [];
    this.mode = 'dungeon';
    this.ui.closeModal();
    this.ui.showScreen('dungeon');
    this.audio.setTrack(this.boss && !this.boss.dead ? 'boss' : 'dungeon');
    this.audio.sfx('revive');
    this.ui.toast('The loop spits you back out.', '#b07bff');
    this.save();
  }
  endRun(victory) {
    if (!this.run) return;
    this.commitRun(victory);
    this.mode = 'victory';
    this.audio.setTrack('victory');
    this.audio.sfx('victory');
    const d = this.dungeon;
    this.ui.showVictory(this, {
      victory, biome: BIOMES[this.run.biome].name, difficulty: DIFFICULTIES[this.run.difficulty].name,
      gold: this.run._committedGold || 0, xp: this.run._committedXp || 0, kills: this.run.kills,
      rooms: d ? d.total : 0, time: this.time - this.run.startTime, materials: this.run._committedMats || {},
      gems: this.run._gems || 0, echoes: this.run._echoes || 0, level: this.meta.level, weapon: this.equippedWeapon,
    });
  }
  commitRun(full) {
    if (!this.run || this.run._committed) return;
    this.run._committed = true;
    const gold = Math.round(this.run.gold * (full ? 1.0 : 0.25));
    this.run._committedGold = gold;
    this.run._committedXp = this.run.xp || 0;
    this.meta.gold += gold;
    this.meta.materials.iron += this.run.materials.iron;
    this.meta.materials.essence += this.run.materials.essence;
    this.meta.materials.crystal += this.run.materials.crystal;
    this.run._committedMats = { ...this.run.materials };
    if (full) {
      this.meta.equippedWeapon = this.run.weaponId;
      if (!this.meta.ownedWeapons.includes(this.run.weaponId)) this.meta.ownedWeapons.push(this.run.weaponId);
      this.meta.potions = { ...this.run.potions };
    } else {
      this.meta.potions = { ...this.run.potions };
    }
    this.meta.runs = (this.meta.runs || 0) + 1;
    this.meta.kills = (this.meta.kills || 0) + this.run.kills;
    this.meta.bestRoom = Math.max(this.meta.bestRoom || 0, this.run.roomsCleared);
    this.recompute();
    this.save();
  }
  returnToTown() {
    this.ui.closeModal();
    const wasGameOver = this.mode === 'gameover';
    if (wasGameOver) this.commitRun(false);
    const summary = this.mode === 'victory' ? 'Spoils claimed. The loop waits.' : 'You wake in the town square. The loop remembers.';
    this.mode = 'town';
    this.run = null;
    this.meta.potions = this.meta.potions || { hp: 3, mp: 2 };
    this.save();
    this.goTown({ fromRun: summary, color: '#ffd86b' });
  }

  gainXp(amount, quiet = false) {
    if (!this.meta || amount <= 0) return;
    this.meta.xp += amount;
    if (this.run) this.run.xp += amount;
    let leveled = false;
    while (this.meta.level < MAX_LEVEL && this.meta.xp >= xpToNext(this.meta.level)) {
      this.meta.xp -= xpToNext(this.meta.level);
      this.meta.level++;
      this.meta.statPoints += 3;
      this.meta.skillPoints += 1;
      leveled = true;
    }
    if (leveled) {
      this.recompute();
      if (this.player) { this.player.hp = Math.min(this.stats.maxHp, this.player.hp + this.stats.maxHp * 0.3); this.player.mp = this.stats.maxMp; }
      this.audio.sfx('levelup');
      this.ui.toast(`LEVEL ${this.meta.level}! +3 stat points, +1 skill point`, '#ffd86b');
      this.spawnBurst(this.player.x, this.player.y, '#ffd86b', 24, 140);
      this.save();
    } else if (!quiet) this.addText(this.player.x, this.player.y - 28, `+${amount} XP`, '#b478ff');
  }

  // ── Loot ───────────────────────────────────────────────────────────────────
  offerLoot(fromChest = false) {
    if (this.pendingLoot) return;
    this.pendingLoot = true;
    const cards = this.makeLootCards();
    this.audio.sfx('open');
    this.ui.showLoot(cards, this, fromChest);
  }
  makeLootCards() {
    const cards = [];
    const depth = this.depth;
    const diff = DIFF_INDEX[this.run.difficulty];
    const weights = [
      { w: Math.max(6, 42 - depth * 30 - diff * 6), rarity: 'common' },
      { w: 28 + depth * 4 + diff * 2, rarity: 'rare' },
      { w: 18 + depth * 14 + diff * 8, rarity: 'epic' },
      { w: 5 + depth * 12 + diff * 7, rarity: 'legendary' },
      { w: 1 + depth * 4 + diff * 3, rarity: 'mythic' },
    ];
    const rollRarity = () => pickWeighted(Math.random, weights).rarity;
    let rarity = rollRarity();
    let pool = WEAPONS.filter(w => w.rarity === rarity && w.req <= Math.min(60, this.meta.level + 10));
    if (!pool.length) pool = WEAPONS.filter(w => w.req <= Math.min(60, this.meta.level + 10));
    let weapon = pick(Math.random, pool);
    if (Math.random() < 0.45) {
      const biomeEl = BIOMES[this.run.biome].elements;
      const biased = pool.filter(w => biomeEl.includes(w.element));
      if (biased.length) weapon = pick(Math.random, biased);
    }
    cards.push({ kind: 'weapon', weapon, id: weapon.id });
    const bl = pick(Math.random, BLESSINGS.filter(b => b.rarity !== 'legendary' || Math.random() < 0.35));
    cards.push({ kind: 'blessing', blessing: bl, id: bl.id });
    // third card: supplies / second blessing / weapon
    const roll = Math.random();
    if (roll < 0.42) {
      const gold = Math.round((24 + depth * 40) * this.difficulty.reward);
      cards.push({ kind: 'supplies', supply: 'gold', amount: gold, id: 'gold' });
    } else if (roll < 0.68) {
      const mat = pick(Math.random, ['iron', 'essence', 'crystal']);
      cards.push({ kind: 'supplies', supply: mat, amount: 1 + (mat === 'crystal' && Math.random() < 0.4 ? 1 : 0), id: mat });
    } else if (roll < 0.86) {
      cards.push({ kind: 'supplies', supply: 'potion', amount: 2, id: 'potion' });
    } else {
      const bl2 = pick(Math.random, BLESSINGS.filter(b => b.id !== bl.id));
      cards.push({ kind: 'blessing', blessing: bl2, id: bl2.id });
    }
    return shuffle(Math.random, cards);
  }
  chooseLoot(card) {
    if (!this.run) return;
    this.pendingLoot = false;
    this.ui.closeModal();
    const w = card.kind === 'weapon' ? card.weapon : null;
    if (card.kind === 'weapon' && w) {
      const owned = this.meta.ownedWeapons.includes(w.id);
      if (owned) {
        this.meta.materials.essence += 1;
        this.meta.gold += 25;
        this.ui.toast(`Duplicate ${w.name} → 25 gold + essence`, '#b478ff');
      } else {
        this.meta.ownedWeapons.push(w.id);
        this.meta.collection[w.id] = (this.meta.collection[w.id] || 0) + 1;
        this.ui.toast(`New weapon: ${w.name}`, RARITIES[w.rarity].color);
        this.audio.sfx('loot');
      }
      const oldDps = weaponDps(this.equippedWeapon, this.meta);
      const newDps = weaponDps(w, this.meta);
      if (w.req <= this.meta.level && (this.run.weaponId === w.id || (this.meta.settings.autoEquip && newDps > oldDps))) {
        this.run.weaponId = w.id;
        this.meta.equippedWeapon = w.id;
        this.recompute();
        this.ui.toast(`Equipped ${w.name} (+${Math.round((newDps - oldDps) / Math.max(1, oldDps) * 100)}% DPS)`, RARITIES[w.rarity].color);
      }
    } else if (card.kind === 'blessing' && card.blessing) {
      this.applyBlessing(card.blessing);
      this.ui.toast(`Blessing: ${card.blessing.name}`, card.blessing.color);
    } else if (card.kind === 'supplies') {
      if (card.supply === 'gold') { this.run.gold += card.amount; this.audio.sfx('coin'); this.ui.toast(`+${card.amount} gold`, '#ffd86b'); }
      else if (card.supply === 'potion') { this.run.potions.hp += 1; this.run.potions.mp += 1; this.ui.toast('+1 HP / +1 MP flask', '#8cf07a'); }
      else { this.run.materials[card.supply] = (this.run.materials[card.supply] || 0) + card.amount; this.ui.toast(`+${card.amount} ${card.supply}`, '#8ef0c8'); }
    }
    this.save();
    this.timers.push({ t: 0.6, fn: () => { if (this.currentNode && this.currentNode.type !== 'boss') this.openPath(); } });
  }
  rerollLoot() {
    if (!this.run || this.run.rerolls <= 0) { this.ui.toast('No rerolls left this run.', '#ffb340'); this.audio.sfx('error'); return; }
    if (this.meta.gems < 10) { this.ui.toast('Need 10 gems to reroll.', '#ffb340'); this.audio.sfx('error'); return; }
    this.run.rerolls--; this.meta.gems -= 10;
    const cards = this.makeLootCards();
    this.ui.updateLoot(cards);
    this.audio.sfx('loot');
  }

  // ── Pickups / particles / text ─────────────────────────────────────────────
  spawnGold(x, y, amount) {
    const coins = clamp(Math.ceil(amount / 4), 1, 6);
    for (let i = 0; i < coins; i++) this.addPickup('gold', Math.max(1, Math.round(amount / coins)), x + (Math.random() - 0.5) * 18, y + (Math.random() - 0.5) * 12);
  }
  addPickup(kind, value, x, y) {
    const pk = new Pickup(kind, value, x, y);
    pk.onCollect = player => {
      if (kind === 'gold') { this.run.gold += value; this.audio.sfx('coin', 0.4); }
      else if (kind === 'iron' || kind === 'essence' || kind === 'crystal') { this.run.materials[kind] += value; this.audio.sfx('coin', 0.5); this.ui.toast(`+${value} ${kind}`, '#8ef0c8'); }
      else if (kind === 'hp') { this.run.potions.hp += value; this.ui.toast('+1 HP flask', '#ff5f6d'); }
      else if (kind === 'mp') { this.run.potions.mp += value; this.ui.toast('+1 MP flask', '#57b8ff'); }
      else if (kind === 'echo') { this.meta.echoes += value; this.ui.toast('+1 Echo', '#c78cff'); }
      this.addText(player.x, player.y - 32, `+${value} ${kind === 'gold' ? 'G' : ''}`.trim(), kind === 'gold' ? '#ffd86b' : '#8ef0c8', 0.9, 0.5);
    };
    this.pickups.push(pk);
  }
  addParticles(x, y, color, count, speed, life = 0.5, opts = {}) {
    for (let i = 0; i < count; i++) {
      const a = Math.random() * TAU, s = speed * (0.3 + Math.random() * 0.8);
      this.particles.push(new Particle({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - (opts.up || 0), life: life * (0.6 + Math.random() * 0.7), maxLife: life, color, size: opts.size || (Math.random() < 0.3 ? 2 : 1), gravity: opts.gravity ?? 40, drag: opts.drag ?? 0.9, glow: Math.random() < 0.2 }));
    }
    if (this.particles.length > 520) this.particles.splice(0, this.particles.length - 520);
  }
  spawnBurst(x, y, color, count, speed, life = 0.5) { this.addParticles(x, y, color, count, speed, life); }
  addText(x, y, text, color = '#fff', scale = 1, life = 0.85) { this.texts.push(new FloatText(x, y, text, color, scale, life)); if (this.texts.length > 40) this.texts.shift(); }
  updateParticles(dt) {
    for (const p of this.particles) p.update(dt);
    this.particles = this.particles.filter(p => p.life > 0);
    for (const t of this.texts) t.update(dt);
    this.texts = this.texts.filter(t => t.life > 0);
  }
  screenShake(n) { if (this.meta.settings.shake) this.shake = Math.max(this.shake, n); }
  hitStop(t) { this.stopTime = Math.max(this.stopTime, t); }

  // ── Render ─────────────────────────────────────────────────────────────────
  render() {
    const ctx = this.ctx;
    ctx.save();
    ctx.clearRect(0, 0, VIEW_W, VIEW_H);
    if (this.mode === 'title') { drawTitleScene(ctx, this.time); ctx.restore(); return; }
    if (this.mode === 'town') {
      drawTownScene(ctx, this.time, this.player || { x: 240, y: 228, dir: 'down', moving: false, hitFlash: 0 }, TOWN_NPCS);
      this.renderOverlays(ctx);
      ctx.restore(); return;
    }
    // dungeon
    if (!this.room) { ctx.restore(); return; }
    applyShake(ctx, this.shake);
    drawRoomStatic(ctx, this.room);
    drawRoomDynamic(ctx, this.room, this.time);
    if (this.chest) drawChest(ctx, this.chest.x, this.chest.y, this.chest.opened, this.time);
    if (this.shrine) drawShrine(ctx, this.shrine.x, this.shrine.y, this.time, this.shrine.used);
    for (const z of this.zones) this.drawZone(ctx, z);
    for (const pk of this.pickups) pk.draw(ctx, this.time);
    // sort entities by y
    const drawables = [];
    for (const e of this.enemies) drawables.push({ y: e.y, obj: e, kind: 'enemy' });
    if (this.boss) drawables.push({ y: this.boss.y, obj: this.boss, kind: 'boss' });
    if (this.player) drawables.push({ y: this.player.y, obj: this.player, kind: 'player' });
    drawables.sort((a, b) => a.y - b.y);
    for (const d of drawables) {
      if (d.kind === 'enemy') { d.obj.drawTelegraph(ctx, this.time); d.obj.draw(ctx, this.time); }
      else if (d.kind === 'boss') { d.obj.drawTelegraph(ctx, this.time); d.obj.draw(ctx, this.time); }
      else d.obj.draw(ctx, this.time);
    }
    for (const pr of this.projectiles) pr.draw(ctx);
    for (const p of this.particles) p.draw(ctx);
    for (const fx of this.effects) this.drawEffect(ctx, fx);
    // lighting
    const lights = this.room.lights.map(L => ({ ...L }));
    if (this.player) lights.push({ x: this.player.x, y: this.player.y - 8, r: 52, color: '#ffd8a0', intensity: 0.8, flicker: 0.05 });
    for (const e of this.enemies) {
      if (e.dead) continue;
      const el = ELEMENTS[e.element]?.color || '#ff9b6a';
      lights.push({ x: e.x, y: e.y - 9, r: e.elite ? 42 : 30, color: el, intensity: e.elite ? 0.45 : 0.32, flicker: 0.06 });
    }
    if (this.boss && !this.boss.dead) lights.push({ x: this.boss.x, y: this.boss.y - 8, r: 90, color: this.boss.def.color, intensity: 0.7, flicker: 0.1 });
    for (const pr of this.projectiles) if (pr.kind !== 'arrow') lights.push({ x: pr.x, y: pr.y, r: 22, color: pr.color, intensity: 0.5, flicker: 0.08 });
    const ambient = this.currentNode?.type === 'boss' ? 0.66 : this.room.roomType === 'treasure' ? 0.58 : 0.62;
    drawLighting(ctx, lights, this.time, ambient);
    drawAmbient(ctx, this.run?.biome || 'ember', this.time);
    for (const t of this.texts) t.draw(ctx);
    // low HP pulse
    if (this.player && this.player.hp / this.stats.maxHp < 0.3 && !this.player.dead) {
      ctx.save(); ctx.globalAlpha = 0.08 + Math.sin(this.time * 6) * 0.05; ctx.fillStyle = '#ff2d4a'; ctx.fillRect(0, 0, VIEW_W, VIEW_H); ctx.restore();
    }
    this.renderOverlays(ctx);
    ctx.restore();
  }
  renderOverlays(ctx) {
    if (this.mode !== 'dungeon') return;
    // boss telegraph/sigil already drawn; draw interact hints
    if (this.roomState === 'cleared') {
      if (this.chest && !this.chest.opened && dist(this.player.x, this.player.y, this.chest.x, this.chest.y) < 46) this.groundHint(ctx, this.chest.x, this.chest.y - 22, 'OPEN [F]');
      if (this.shrine && !this.shrine.used && dist(this.player.x, this.player.y, this.shrine.x, this.shrine.y) < 46) this.groundHint(ctx, this.shrine.x, this.shrine.y - 26, 'PRAY [F]');
    }
  }
  groundHint(ctx, x, y, text) {
    const bob = Math.sin(this.time * 3) * 1.5;
    drawPixelText(ctx, text, x, y + bob, { color: '#ffd86b', align: 'center', scale: 1 });
  }
  drawZone(ctx, z) {
    if (z.exploded) {
      if (z.flash > 0) {
        ctx.save(); ctx.globalAlpha = z.flash * 2; ctx.fillStyle = z.color;
        ctx.beginPath(); ctx.arc(z.x, z.y, z.r * 0.8, 0, TAU); ctx.fill(); ctx.restore();
      }
      return;
    }
    const pct = 1 - z.timer / z.delay;
    ctx.save();
    ctx.globalAlpha = 0.16 + pct * 0.18; ctx.fillStyle = z.color;
    ctx.beginPath(); ctx.arc(z.x, z.y, z.r, 0, TAU); ctx.fill();
    ctx.globalAlpha = 0.7; ctx.strokeStyle = z.color; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(z.x, z.y, z.r * (0.35 + pct * 0.65), 0, TAU); ctx.stroke();
    // rune marks
    for (let i = 0; i < 6; i++) { const a = i / 6 * TAU + this.time; px(ctx, z.x + Math.cos(a) * z.r * 0.8, z.y + Math.sin(a) * z.r * 0.55, z.color, 2, 2); }
    ctx.restore();
  }
  drawEffect(ctx, fx) {
    const k = 1 - fx.life / fx.maxLife;
    ctx.save();
    if (fx.type === 'slash') {
      ctx.globalAlpha = (1 - k) * 0.85;
      ctx.strokeStyle = fx.color; ctx.lineWidth = 3.5;
      ctx.beginPath(); ctx.arc(fx.x, fx.y, fx.range * 0.78, fx.angle - fx.arc / 2 + k * 0.35, fx.angle + fx.arc / 2 + k * 0.35); ctx.stroke();
      ctx.globalAlpha = (1 - k) * 0.3; ctx.lineWidth = 8; ctx.strokeStyle = '#fff';
      ctx.beginPath(); ctx.arc(fx.x, fx.y, fx.range * 0.78, fx.angle - fx.arc / 2 + 0.1 + k * 0.35, fx.angle + fx.arc / 2 - 0.1 + k * 0.35); ctx.stroke();
    } else if (fx.type === 'thrust') {
      ctx.globalAlpha = (1 - k) * 0.9; ctx.fillStyle = fx.color;
      ctx.save(); ctx.translate(fx.x, fx.y); ctx.rotate(fx.angle);
      ctx.fillRect(8 + k * 30, -2, fx.range * 0.55, 4); ctx.restore();
    } else if (fx.type === 'spin') {
      ctx.globalAlpha = (1 - k) * 0.75;
      for (let i = 0; i < 3; i++) {
        const a = this.time * 14 + i * TAU / 3;
        ctx.strokeStyle = fx.color; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(fx.x, fx.y, 30 + i * 14, a, a + 1.4); ctx.stroke();
      }
    } else if (fx.type === 'cone') {
      ctx.globalAlpha = (1 - k) * 0.35; ctx.fillStyle = fx.color;
      ctx.beginPath(); ctx.moveTo(fx.x, fx.y); ctx.arc(fx.x, fx.y, fx.range * (0.5 + k * 0.5), fx.angle - 0.8, fx.angle + 0.8); ctx.closePath(); ctx.fill();
    } else if (fx.type === 'lightning') {
      ctx.globalAlpha = (1 - k) * 0.9; ctx.strokeStyle = fx.color; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(fx.x1, fx.y1);
      const segs = 6;
      for (let i = 1; i <= segs; i++) {
        const t = i / segs;
        ctx.lineTo(fx.x1 + (fx.x2 - fx.x1) * t + (Math.random() - 0.5) * 14, fx.y1 + (fx.y2 - fx.y1) * t + (Math.random() - 0.5) * 14);
      }
      ctx.stroke();
    }
    ctx.restore();
  }

  // ── Misc ───────────────────────────────────────────────────────────────────
  save() { try { this.saveFn?.(this.meta); } catch (e) { console.error(e); } }
  setBlocking(v) { this.blocking = v; }
}

export { TOWN_NPCS };
