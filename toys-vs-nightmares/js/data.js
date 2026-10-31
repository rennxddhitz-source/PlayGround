"use strict";
/* ============ TOYS vs. NIGHTMARES — data & meta progression ============ */

// Logical canvas resolution (portrait)
const W = 720, H = 1280;
// Grid
const COLS = 9, ROWS = 5;
const GRID_X = 60, GRID_Y = 250, CELL_W = 70, CELL_H = 140;
const GRID_B = GRID_Y + ROWS * CELL_H; // 950
const HOUSE_X = GRID_X - 16;           // enemies reaching here damage the Dream Meter

// --- Units (unlock by Guardian Level; balance per design doc) ---
const UNITS = {
  teddy:  { name:"Teddy Knight",   gl:1, cost:25,  cd:5,  hp:60,  dmg:12, atk:1.0, range:0.95, kind:"melee",
            desc:"Ksatria beruang tahan banting. Ukuran pukulan kecil, semangat raksasa." },
  robot:  { name:"Robot Soldier",  gl:2, cost:50,  cd:6,  hp:80,  dmg:26, atk:1.1, range:3.2,  kind:"shoot",
            desc:"Menembakkan baut mainan ke barisan depan." },
  sprite: { name:"Star Sprite",    gl:3, cost:60,  cd:7,  hp:40,  kind:"gen", genEvery:6.5, genAmt:25,
            desc:"Produksi Starlight otomatis setiap 7 detik." },
  blocks: { name:"Block Fort",     gl:4, cost:70,  cd:8,  hp:340, kind:"wall",
            desc:"Benteng balok kayu. Blokir jalan mimpi buruk." },
  slinky: { name:"Slinky Springer",gl:5, cost:60,  cd:6,  hp:70,  dmg:8,  atk:0.5, range:0.95, kind:"melee",
            desc:"Seringai spiral: pukulan cepat dua kali lipat." },
  bubble: { name:"Bubble Blower",  gl:6, cost:80,  cd:8,  hp:60,  dmg:12, atk:1.8, range:3.0,  kind:"shoot", splash:1.1, slow:2.2,
            desc:"Gelembung lembut: damage area + memperlambat musuh." },
  jack:   { name:"Jack-in-the-Box",gl:7, cost:100, cd:12, hp:50,  kind:"bomb", fuse:2.0, dmg:250, radius:1.4,
            desc:"WOW! Meledak setelah 2 detik. Damage besar-area." },
  dragon: { name:"Plush Dragon",   gl:8, cost:150, cd:10, hp:150, dmg:40, atk:1.0, range:4.0,  kind:"shoot", splash:0.8,
            desc:"Naga boneka legendaris: napas api menembus barisan." },
};
const UNIT_IDS = Object.keys(UNITS);

// --- Nightmares ---
const ENEMIES = {
  mouse:  { name:"Zombie Mouse", hp:30,  dmg:5,  spd:0.50, dream:10, w:46, h:50 },
  shadow: { name:"Shadow Cat",   hp:55,  dmg:8,  spd:0.65, dream:10, w:48, h:56 },
  ghost:  { name:"Blanket Ghost",hp:85,  dmg:0,  spd:0.45, dream:15, w:52, h:58, fly:true },
  golem:  { name:"Sock Golem",   hp:200, dmg:14, spd:0.35, dream:25, w:60, h:72 },
  boss:   { name:"Nightmare King",hp:700,dmg:40, spd:0.22, dream:50, w:86, h:104, boss:true },
};
const SPAWNABLE = ["mouse","shadow","ghost","golem"];

// --- Levels: 6 nights ---
const LEVELS = [
  { name:"Malam 1", waves:5,  moons:30,  xp:40,  gem:3 },
  { name:"Malam 2", waves:6,  moons:45,  xp:60,  gem:3 },
  { name:"Malam 3", waves:6,  moons:60,  xp:90,  gem:5 },
  { name:"Malam 4", waves:7,  moons:80,  xp:120, gem:5 },
  { name:"Malam 5", waves:7,  moons:100, xp:150, gem:6 },
  { name:"Malam 6", waves:7,  moons:130, xp:200, gem:8 },
];

// Guardian Level thresholds (cumulative XP) — GL 1..8 unlock all units
const GL_XP = [0, 60, 140, 240, 360, 500, 680, 900];

// --- Achievements (gems) ---
const ACHS = [
  { id:"first",     ic:"🌟", name:"Cahaya Pertama",  desc:"Menangkan malam pertamamu",              gem:4 },
  { id:"perfect",   ic:"💤", name:"Mimpi Utuh",      desc:"Menang dengan Dream Meter 100",           gem:8 },
  { id:"night3",    ic:"🌙", name:"Pejalan Malam",   desc:"Selesaikan Malam 3",                      gem:5 },
  { id:"night6",    ic:"👑", name:"Sang Guardian",   desc:"Selesaikan Malam 6",                      gem:12 },
  { id:"hoard",     ic:"🪙", name:"Pengumpul Bintang",desc:"Menang dengan 200 Starlight tersisa",    gem:5 },
];

/* ---------------- save / meta ---------------- */
const SAVE_KEY = "tvn_save_v2";
function freshSave(){ return { moons:0, gems:0, xp:0, won:[0,0,0,0,0,0], ach:[], upg:{}, daily:"" }; }
let S = loadSave();
function loadSave(){
  try{
    const d = JSON.parse(localStorage.getItem(SAVE_KEY));
    if(d && typeof d === "object") return Object.assign(freshSave(), d);
  }catch(e){}
  return freshSave();
}
function persist(){ try{ localStorage.setItem(SAVE_KEY, JSON.stringify(S)); }catch(e){} }

function glLevel(){
  let gl = 1;
  for(let i = 0; i < GL_XP.length; i++) if(S.xp >= GL_XP[i]) gl = i + 1;
  return Math.min(gl, 8);
}
function glProgress(){
  const gl = glLevel();
  if(gl >= 8) return 1;
  const a = GL_XP[gl - 1], b = GL_XP[gl];
  return clamp01((S.xp - a) / (b - a));
}
const clamp01 = v => v < 0 ? 0 : v > 1 ? 1 : v;
const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
const rnd = (a, b) => a + Math.random() * (b - a);
const irnd = (a, b) => Math.floor(rnd(a, b + 1));

// Upgrade multiplier: +12% hp/dmg per level (max lv 5)
function upgLevel(id){ return S.upg[id] || 0; }
function upgMult(id){ return 1 + 0.12 * upgLevel(id); }
function upgCost(id){ return 30 + upgLevel(id) * 30; }

/* ---------------- level wave builder ---------------- */
function pickPool(li, wi){
  const p = ["mouse"];
  if(li >= 1 || wi >= 2) p.push("shadow");
  if(li >= 2 && wi >= 2) p.push("ghost");
  if(li >= 3 && wi >= 3) p.push("golem");
  if(li >= 4 && wi >= 2) p.push("golem", "shadow");
  return p;
}
// Each wave = sorted event list [{t, type}]
function makeWave(li, wi, last){
  const evs = [];
  const n = Math.round(3 + wi * 1.5 + li * (li >= 4 ? 0.9 : 1.1));
  if(last && li >= 4 && wi === LEVELS[li].waves - 1){ // boss night
    evs.push({ t:1.5, type:"boss" });
    for(let i = 0; i < 4; i++) evs.push({ t:3 + i * 3.2, type:"mouse" });
    for(let i = 0; i < 3; i++) evs.push({ t:6 + i * 4, type:"shadow" });
    return evs;
  }
  const pool = pickPool(li, wi);
  let gap = clamp(3.4 - wi * 0.24 - li * 0.16, 1.0, 3.4);
  let count = n;
  if(wi === 0){ // first-wave mercy: gentle opener
    count = Math.max(3, Math.round(n * 0.6));
    gap *= 1.35;
  }
  for(let i = 0; i < count; i++) evs.push({ t:1.2 + i * gap, type:pool[irnd(0, pool.length - 1)] });
  if(wi >= 2 && li >= 1 && !(li >= 3 && wi < 3)){ // second group, overlapping pressure
    const m = Math.max(2, Math.round(n * 0.35));
    for(let i = 0; i < m; i++) evs.push({ t:3.5 + i * 2.8, type:pool[irnd(0, pool.length - 1)] });
  }
  return evs.sort((a, b) => a.t - b.t);
}
function enemyScale(li){ return { hp:1 + 0.13 * li, dmg:1 + 0.06 * li }; }
