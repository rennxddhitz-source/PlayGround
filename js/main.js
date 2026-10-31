// ── Bootstrap: save data, systems, boot screen ──────────────────────────────
import { Game } from './game.js';
import { UI } from './ui.js';
import { AudioEngine } from './audio.js';
import { Input } from './input.js';
import { SAVE_KEY, STARTER_WEAPONS, getWeapon } from './data.js';
import { clamp } from './util.js';

function defaultMeta() {
  const collection = {};
  for (const id of STARTER_WEAPONS) collection[id] = 1;
  return {
    name: 'THE WANDERER',
    level: 1, xp: 0, gold: 140, gems: 0, echoes: 0,
    materials: { iron: 6, essence: 3, crystal: 0 },
    stats: { str: 5, dex: 5, agi: 5, int: 5, vit: 5 },
    statPoints: 0, skillPoints: 1,
    skills: { whirlwind: true },
    equippedSkills: ['whirlwind', null],
    ownedWeapons: [...STARTER_WEAPONS],
    equippedWeapon: STARTER_WEAPONS[0],
    upgrades: {}, collection,
    potions: { hp: 3, mp: 2 },
    echo: { power: 0, vitality: 0, haste: 0, fortune: 0 },
    settings: { autoEquip: true, sfx: true, bgm: true, shake: true },
    runs: 0, kills: 0, bestRoom: 0,
    lastBiome: 'ember', lastDifficulty: 'normal',
  };
}

function normalize(raw) {
  const d = defaultMeta();
  if (!raw || typeof raw !== 'object') return d;
  const m = { ...d, ...raw };
  m.stats = { ...d.stats, ...(raw.stats || {}) };
  m.materials = { ...d.materials, ...(raw.materials || {}) };
  m.potions = { ...d.potions, ...(raw.potions || {}) };
  m.echo = { ...d.echo, ...(raw.echo || {}) };
  m.settings = { ...d.settings, ...(raw.settings || {}) };
  m.skills = { ...d.skills, ...(raw.skills || {}) };
  m.upgrades = { ...(raw.upgrades || {}) };
  m.collection = { ...d.collection, ...(raw.collection || {}) };
  m.ownedWeapons = Array.from(new Set([...(Array.isArray(raw.ownedWeapons) ? raw.ownedWeapons : []), ...STARTER_WEAPONS]))
    .filter(id => getWeapon(id));
  m.equippedSkills = Array.isArray(raw.equippedSkills) ? raw.equippedSkills.slice(0, 2) : ['whirlwind', null];
  while (m.equippedSkills.length < 2) m.equippedSkills.push(null);
  m.level = clamp(Math.round(Number(m.level) || 1), 1, 100);
  m.xp = Math.max(0, Number(m.xp) || 0);
  m.gold = Math.max(0, Math.round(Number(m.gold) || 0));
  m.gems = Math.max(0, Math.round(Number(m.gems) || 0));
  m.echoes = Math.max(0, Math.round(Number(m.echoes) || 0));
  m.statPoints = Math.max(0, Math.round(Number(m.statPoints) || 0));
  m.skillPoints = Math.max(0, Math.round(Number(m.skillPoints) || 0));
  for (const k of Object.keys(m.stats)) m.stats[k] = Math.max(1, Math.round(Number(m.stats[k]) || 1));
  if (!getWeapon(m.equippedWeapon) || !m.ownedWeapons.includes(m.equippedWeapon)) m.equippedWeapon = m.ownedWeapons[0] || STARTER_WEAPONS[0];
  if (!m.name) m.name = 'THE WANDERER';
  return m;
}

function loadMeta() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return defaultMeta();
    return normalize(JSON.parse(raw));
  } catch (err) {
    console.warn('[SKPA] save load failed, starting fresh', err);
    return defaultMeta();
  }
}

const meta = loadMeta();
let saveTimer = 0;
function saveMeta(data) {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(data)); }
    catch (err) { console.warn('[SKPA] save failed', err); }
  }, 90);
}
function flushSave() {
  clearTimeout(saveTimer);
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(meta)); } catch { /* ignore */ }
}

const canvas = document.getElementById('game');
canvas.width = 480;
canvas.height = 270;
const ctx = canvas.getContext('2d', { alpha: false });
ctx.imageSmoothingEnabled = false;

const audio = new AudioEngine(meta.settings);
const input = new Input(canvas);
const ui = new UI(audio, input);
const game = new Game(canvas, ui, audio, input, meta, saveMeta);
ui.game = game;
ui.gateBiome = meta.lastBiome in { ember: 1, frost: 1, nature: 1, void: 1 } ? meta.lastBiome : 'ember';
ui.gateDifficulty = meta.lastDifficulty || 'normal';

// Keep the latest gate choices sticky for the next session.
const originalStartRun = game.startRun.bind(game);
game.startRun = opts => {
  meta.lastBiome = opts?.biome || 'ember';
  meta.lastDifficulty = opts?.difficulty || 'normal';
  originalStartRun(opts);
};

ui.refreshMute();
game.goTitle();
game.start();
setTimeout(() => ui.hideBoot(), 480);
window.addEventListener('beforeunload', flushSave);
document.addEventListener('visibilitychange', () => { if (document.hidden) flushSave(); });

// Debug / automation hook.
window.__SKPA__ = { game, ui, audio, input, meta, save: flushSave };
window.game = game;
