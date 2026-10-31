"use strict";
/* ============ Gameplay: level state, combat systems, update ============ */
let G = null;               // current level game state
let state = "menu";         // "menu" | "game"
let paused = false, hitstop = 0, shake = 0, redFlash = 0;

function startLevel(li){
  state = "game"; paused = false; hitstop = 0; shake = 0; redFlash = 0;
  curLevel = li; hudCache = {};
  G = {
    li, stars: 50, dream: 100, dreamMax: 100,
    wave: 0, waveTotal: LEVELS[li].waves,
    waveT: 0, evs: makeWave(li, 0, false), waveGapT: 0, waveStartBanner: 0,
    units: [], enemies: [], projs: [], starsPool: [], parts: [], texts: [],
    sel: null, cooldowns: {}, atkT: {}, spawnT: 0, starT: 4, elapsed: 0, noPerfectLost: false,
    sp: 0, spReady: false, hover: null, badCell: null, bossSpawnT: 0, over: false,
  };
  UNIT_IDS.forEach(id => G.cooldowns[id] = 0);
  buildBar(); // in ui.js
  hideOverlays();
  showWaveBanner();
  if(li === 0){
    setTimeout(() => { if(state === "game" && G) addText(W / 2, 420, "Ketuk bintang jatuh ⭐ lalu taruh Teddy Knight!", "#7fe9ff"); }, 2600);
  }
}

function cellCenter(r, c){ return { x: GRID_X + c * CELL_W + CELL_W / 2, y: GRID_Y + r * CELL_H + CELL_H - 30 }; }

/* ---------------- spawning ---------------- */
function showWaveBanner(){
  G.waveStartBanner = 2;
  G.bannerText = (G.wave === 0) ? "Night " + (G.li + 1) + " — Wave 1/" + G.waveTotal
    : (G.wave === G.waveTotal - 1 ? "FINAL WAVE!" : "Wave " + (G.wave + 1) + "/" + G.waveTotal);
  G.bannerFinal = G.wave === G.waveTotal - 1;
  SFX.waveGo();
}
function spawnEnemy(type){
  const sc = enemyScale(G.li), d = ENEMIES[type];
  const rowPool = {};
  // spread rows, avoid 3+ in same row chain-feeding
  const counts = {};
  G.enemies.forEach(e => counts[e.row] = (counts[e.row] || 0) + 1);
  let row = irnd(0, ROWS - 1);
  for(let i = 0; i < ROWS; i++){ if((counts[row] || 0) >= 3){ row = irnd(0, ROWS - 1); } }
  const e = {
    type, row, def: d, t: rnd(0, 6),
    x: W + 50, y: GRID_Y + row * CELL_H + CELL_H - 26,
    hp: d.hp * sc.hp, maxHp: d.hp * sc.hp, dmg: d.dmg * sc.dmg,
    state: "walk", atk: 0, slowT: 0, stunT: 0, hitT: 0, dead: false,
  };
  G.enemies.push(e);
  if(type === "boss") SFX.boom();
}

/* ---------------- placement ---------------- */
function canPlace(r, c){
  return !(r < 0 || r >= ROWS || c < 0 || c >= COLS) &&
    !G.units.some(u => u.row === r && u.col === c);
}
function tryPlace(id, r, c){
  const u = UNITS[id];
  const ready = G.cooldowns[id] <= 0 && G.stars >= u.cost && glLevel() >= u.gl;
  if(!ready || !canPlace(r, c)){
    G.badCell = { r: clamp(r, 0, ROWS - 1), c: clamp(c, 0, COLS - 1), t: 0.35 };
    SFX.buzz();
    return false;
  }
  G.stars -= u.cost;
  G.cooldowns[id] = u.cd;
  const p = cellCenter(r, c);
  G.units.push({ id, row: r, col: c, x: p.x, y: p.y, hp: u.hp * upgMult(id), maxHp: u.hp * upgMult(id),
    t: rnd(0, 6), atkT: 0, swing: 0, genT: u.kind === "gen" ? u.genEvery * 0.7 : 0, fuse: u.kind === "bomb" ? u.fuse : 0 });
  SFX.boing(); SFX.put();
  G.sel = null;
  addText(p.x, p.y - 60, "-" + u.cost + "★", "#ffd700");
  return true;
}

/* ---------------- combat helpers ---------------- */
function rowEnemies(row){ return G.enemies.filter(e => !e.dead && e.row === row); }
function nearestEnemy(row, x, rangePx){
  let best = null;
  rowEnemies(row).forEach(e => {
    if(e.x >= x - 20 && e.x - x <= rangePx + 30){
      if(!best || e.x < best.x) best = e;
    }
  });
  return best;
}
function damageEnemy(e, dmg, srcX){
  if(e.dead) return;
  e.hp -= dmg; e.hitT = 0.12;
  hitstop = Math.max(hitstop, 0.08);
  SFX.hit();
  burst(e.x - 10, e.y - 40, e.type === "ghost" ? "#e9ecef" : "#ff8787", 5);
  if(e.hp <= 0){
    e.dead = true;
    SFX.pop();
    burst(e.x, e.y - 30, "#c884f0", 14);
    G.sp = Math.min(100, G.sp + (e.def.boss ? 60 : 8));
    if(e.type === "boss"){ SFX.boom(); shake = 14; }
    else shake = Math.max(shake, 3);
    addText(e.x, e.y - 70, "BOOP!", "#c884f0");
  }
}
function burst(x, y, color, n){
  for(let i = 0; i < n; i++)
    G.parts.push({ x, y, vx: rnd(-120, 160), vy: rnd(-190, -20), life: rnd(0.3, 0.7), color, r: rnd(3, 7) });
}
function addText(x, y, txt, color){ G.texts.push({ x, y, txt, color, life: 0.9 }); }

/* ---------------- starlight ---------------- */
function collectStar(s){
  s.state = "fly";
  s.fx = s.x; s.fy = s.y;
  s.tx = 100; s.ty = H - 320;
  SFX.ding();
}
function addStars(n){
  G.stars = Math.min(999, G.stars + n);
}
function spawnSkyStar(){
  const c = irnd(0, COLS - 1), r = irnd(0, ROWS - 1);
  const p = cellCenter(r, c);
  G.starsPool.push({ state: "fall", x: p.x, y: 130, ty: p.y - rnd(10, 30), t: 0, amt: 25, life: 12, spin: 0 });
}

/* ---------------- star power ---------------- */
function fireStarPower(){
  if(G.sp < 100 || paused || G.over) return;
  G.sp = 0;
  shake = 10; redFlash = 0.6;
  SFX.boom(); SFX.charge();
  G.enemies.forEach(e => {
    e.stunT = 3;
    damageEnemy(e, 300);
  });
  G.parts.push({ moon: true, x: W / 2, y: 500, life: 0.7 });
  addText(W / 2, 500, "MOONBEAM! 🌙", "#7fe9ff");
}

/* ---------------- loss / win ---------------- */
function loseGame(){
  if(G.over) return;
  G.over = true; paused = false;
  // consolation XP so Guardian Level creeps up on retries
  S.xp += 10; persist();
  SFX.lose();
  setTimeout(() => showResult(false), 700);
}
function winGame(){
  if(G.over) return;
  G.over = true;
  SFX.win();
  const li = G.li, first = !S.won[li];
  let moons = Math.round(LEVELS[li].moons * (first ? 1 : 0.5));
  let xp = LEVELS[li].xp, gems = first ? LEVELS[li].gem : 0;
  const gl0 = glLevel();
  let bonus = 0, achNew = [];
  if(G.dream >= 100){ bonus = 20; gainAch("perfect") && achNew.push("perfect"); }
  gainAch("first") && achNew.push("first");
  if(li >= 2) gainAch("night3") && achNew.push("night3");
  if(li >= 5) gainAch("night6") && achNew.push("night6");
  if(G.stars >= 200) gainAch("hoard") && achNew.push("hoard");
  moons += bonus;
  S.moons += moons; S.xp += xp; S.gems += gems;
  if(first) S.won[li] = 1;
  persist();
  const gl1 = glLevel();
  showResult({ win: true, moons, xp, gems, achNew, bonus, glUp: gl1 > gl0 ? gl1 : 0 });
}
function gainAch(id){
  if(S.ach.includes(id)) return false;
  S.ach.push(id); return true;
}

/* ---------------- main update ---------------- */
function step(dt){
  const g = G;
  g.elapsed += dt;
  g.waveStartBanner = Math.max(0, g.waveStartBanner - dt);
  g.spawnT += dt;
  if(g.badCell){ g.badCell.t -= dt; if(g.badCell.t <= 0) g.badCell = null; }
  // star power trickles up while you fight
  g.sp = Math.min(100, g.sp + dt * 1.2);

  // starlight from sky — faster at harder nights
  g.starT -= dt;
  if(g.starT <= 0){
    const idle = G.starsPool.filter(s => s.state === "fall" || s.state === "idle").length;
    if(idle < 5){ spawnSkyStar(); SFX.boing(); }
    g.starT = Math.max(3.0, rnd(5.8, 8) - g.li * 0.55);
  }

  // wave flow
  if(g.waveGapT > 0){
    g.waveGapT -= dt;
    if(g.waveGapT <= 0){ g.wave++; g.waveT = 0; g.evs = makeWave(g.li, g.wave, g.wave === g.waveTotal - 1); showWaveBanner(); }
  } else {
    g.waveT += dt;
    while(g.evs.length && g.evs[0].t <= g.waveT){ spawnEnemy(g.evs.shift().type); }
    if(!g.evs.length && !g.enemies.length){
      if(g.wave >= g.waveTotal - 1){ winGame(); return; }
      g.waveGapT = 2.8;
    }
  }

  // golems knock 'em
  updateUnits(dt);
  updateEnemies(dt);
  updateProjs(dt);
  updateStars(dt);

  // particles / texts
  g.parts.forEach(p => { p.life -= dt; if(!p.moon){ p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 500 * dt; } });
  g.parts = g.parts.filter(p => p.life > 0);
  g.texts.forEach(t => { t.life -= dt; t.y -= 46 * dt; });
  g.texts = g.texts.filter(t => t.life > 0);

  redFlash = Math.max(0, redFlash - dt * 2);
  g.enemies = g.enemies.filter(e => !e.dead && e.x > HOUSE_X - 60);
}

function updateUnits(dt){
  G.units.forEach(u => {
    const def = UNITS[u.id];
    u.t += dt; u.swing = Math.max(0, u.swing - dt);
    if(def.kind === "gen"){
      u.genT -= dt;
      if(u.genT <= 0){
        u.genT = def.genEvery;
        G.starsPool.push({ state: "idle", x: u.x + rnd(-24, 24), y: u.y - 40, ty: u.y - 40, t: 0, amt: def.genAmt, life: 4, auto: u, spin: 0 });
      }
      return;
    }
    if(def.kind === "bomb"){
      u.fuse -= dt;
      if(u.fuse <= 0){
        // explode
        SFX.boom(); shake = 10;
        G.parts.push({ moon: true, x: u.x, y: u.y - 50, life: 0.5 });
        G.enemies.forEach(e => {
          if(!e.dead && Math.abs(e.row - u.row) <= 1 && Math.abs(e.x - u.x) <= CELL_W * def.radius) damageEnemy(e, def.dmg);
        });
        burst(u.x, u.y - 40, "#ffd23f", 22);
        u.hp = -1; // remove
      }
      return;
    }
    // measure
    u.atkT -= dt;
    if(u.atkT <= 0){
      const rangePx = def.kind === "melee" ? CELL_W * 1.0 : def.range * CELL_W;
      const tgt = nearestEnemy(u.row, u.x, rangePx);
      if(tgt){
        u.atkT = def.atk; u.swing = 0.25;
        if(def.kind === "melee"){ damageEnemy(tgt, def.dmg * upgMult(u.id)); }
        else {
          SFX.shoot();
          G.projs.push({ x: u.x + 28, y: u.y - 46, row: u.row,
            dmg: def.dmg * upgMult(u.id), splash: def.splash || 0, slow: def.slow || 0, spd: 520, type: u.id });
        }
      }
    }
  });
  G.units = G.units.filter(u => u.hp > 0);
}

function updateEnemies(dt){
  G.enemies.forEach(e => {
    const d = e.def;
    e.t += dt; e.hitT = Math.max(0, e.hitT - dt);
    if(e.stunT > 0){ e.stunT -= dt; return; } // frozen by moonlight
    const speedMul = e.slowT > 0 ? 0.5 : 1;
    e.slowT = Math.max(0, e.slowT - dt);

    if(d.boss){ // Nightmare King spawns minions
      e.bossSpawnT = (e.bossSpawnT || 6) - dt;
      if(e.bossSpawnT <= 0){
        e.bossSpawnT = 10;
        spawnEnemy(irnd(0, 1) ? "mouse" : "shadow");
        G.enemies[G.enemies.length - 1].x = e.x + 90;
        addText(e.x, e.y - 130, "Ajak anak buah!", "#c884f0");
      }
    }

    // blocking unit ahead (ghosts fly over)
    if(!d.fly){
      const blocking = G.units.find(u => u.row === e.row && Math.abs(u.x - e.x) <= CELL_W * 0.62);
      if(blocking){
        e.state = "atk"; e.target = blocking;
        e.atk -= dt * speedMul;
        if(e.atk <= 0){
          e.atk = 1.25;
          blocking.hp -= e.dmg; blocking.hurtT = 0.15;
          SFX.hit();
          if(blocking.hp <= 0){ SFX.crumble(); burst(blocking.x, blocking.y - 40, UNITS[blocking.id] ? "#a06a3a" : "#aaa", 10); }
        }
        return; // stop while attacking
      }
    }
    e.state = "walk";
    if(e.x <= HOUSE_X){
      // reached the dreamer!
      if(e.dreamPending !== true){
        e.dreamPending = true;
        G.dream = Math.max(0, G.dream - d.dream);
        redFlash = 0.6; shake = 8; SFX.hurt();
        addText(GRID_X + 20, e.y - 60, "-" + d.dream + " 💤", "#ff6b6b");
        e.dead = true;
        if(G.dream <= 0) loseGame();
      }
      return;
    }
    e.x -= d.spd * CELL_W * speedMul * dt;
  });
}

function updateProjs(dt){
  G.projs.forEach(p => {
    p.x += p.spd * dt;
    // hit first enemy ahead in row
    let hit = null;
    rowEnemies(p.row).forEach(e => { if(!hit && Math.abs(e.x - p.x) < 30 && (e.x > p.x - 40)) if(!hit || e.x < hit.x) hit = e; });
    if(hit){
      p.dead = true;
      damageEnemy(hit, p.dmg);
      if(p.slow){ hit.slowT = Math.max(hit.slowT, p.slow); addText(hit.x, hit.y - 80, "☃", "#7ec8e3"); }
      if(p.splash){
        G.enemies.forEach(e => {
          if(e !== hit && !e.dead && Math.abs(e.row - p.row) <= 1 && Math.abs(e.x - hit.x) <= CELL_W * p.splash) damageEnemy(e, Math.round(p.dmg * 0.6));
        });
      }
      if(p.type === "dragon") burst(p.x, p.y, "#ffd23f", 8);
      else burst(p.x, p.y, "#00d4ff", 4);
    }
    if(p.x > W + 40) p.dead = true;
  });
  G.projs = G.projs.filter(p => !p.dead);
}

function updateStars(dt){
  G.starsPool.forEach(s => {
    s.spin += dt * 2;
    if(s.state === "fall"){
      s.t += dt / 1.1;
      s.y = s.y + (s.ty - 130) * (dt / 1.1) * (s.t * s.t + 0.2);
      if(s.y >= s.ty){ s.y = s.ty; s.state = "idle"; }
    } else if(s.state === "idle"){
      s.life -= dt;
      if(s.life <= 0){
        s.state = "fly"; s.fx = s.x; s.fy = s.y; s.tx = 100; s.ty = H - 320; // auto-collect
      }
    } else if(s.state === "fly"){
      s.t += dt / 0.45;
      const k = clamp01(s.t);
      s.x = s.fx + (s.tx - s.fx) * k * k;
      s.y = s.fy + (s.ty - s.fy) * k * k - Math.sin(k * Math.PI) * 70;
      if(s.t >= 1){ s.dead = true; addStars(s.amt); SFX.ding(); }
    }
  });
  G.starsPool = G.starsPool.filter(s => !s.dead);
}
