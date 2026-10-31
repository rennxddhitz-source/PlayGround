// ── Game data: elements, weapons, skills, enemies, biomes, shops ─────────────
import { rngFrom, pick, pickWeighted, clamp } from './util.js';

export const GAME_TITLE = 'SOUL KNIGHT';
export const GAME_SUBTITLE = 'PREQUEL · ADVENTURE';
export const SAVE_KEY = 'skpa_save_v1';
export const MAX_LEVEL = 100;
export const VIEW_W = 480;
export const VIEW_H = 270;

// ── Elements ────────────────────────────────────────────────────────────────
export const ELEMENTS = {
  fire:      { name: 'Fire',      short: 'FIR', color: '#ff6b35', light: '#ffd27a', glyph: 'F', desc: 'Sears flesh and wood alike.' },
  water:     { name: 'Water',     short: 'WAT', color: '#46a8ff', light: '#a8e0ff', glyph: 'W', desc: 'Relentless, drowning force.' },
  lightning: { name: 'Lightning', short: 'LGT', color: '#ffe14d', light: '#fff7b0', glyph: 'L', desc: 'Fast and merciless.' },
  nature:    { name: 'Nature',    short: 'NAT', color: '#62d36f', light: '#c2ffb9', glyph: 'N', desc: 'Life that refuses to yield.' },
  dark:      { name: 'Dark',      short: 'DRK', color: '#a06bff', light: '#d9c2ff', glyph: 'D', desc: 'The hollow between loops.' },
  light:     { name: 'Light',     short: 'LIT', color: '#ffd86b', light: '#fff6cf', glyph: 'H', desc: 'A memory of the first dawn.' },
  earth:     { name: 'Earth',     short: 'ERT', color: '#c98b4b', light: '#f0cf9a', glyph: 'E', desc: 'Stone remembers every blow.' },
  ice:       { name: 'Ice',       short: 'ICE', color: '#7de8ff', light: '#d4fbff', glyph: 'I', desc: 'Stillness given teeth.' },
};
export const ELEMENT_LIST = Object.keys(ELEMENTS);
const BEATS = {
  fire: ['nature', 'ice'],
  water: ['fire', 'earth'],
  nature: ['water', 'lightning'],
  lightning: ['water', 'ice'],
  ice: ['nature', 'earth'],
  earth: ['lightning', 'fire'],
  light: ['dark'],
  dark: ['light'],
};
export function elementMultiplier(attacker, defender) {
  if (!attacker || !defender) return 1;
  if (BEATS[attacker]?.includes(defender)) return 1.5;
  if (BEATS[defender]?.includes(attacker)) return 0.7;
  return 1;
}
export function elementRelation(attacker, defender) {
  const m = elementMultiplier(attacker, defender);
  return m > 1 ? 'strong' : m < 1 ? 'weak' : 'neutral';
}

// ── Rarity ──────────────────────────────────────────────────────────────────
export const RARITIES = {
  common:    { name: 'Common',    color: '#b8c2cf', glow: '#7d8796', mult: 1.00, order: 0 },
  rare:      { name: 'Rare',      color: '#57b8ff', glow: '#2a7fbf', mult: 1.15, order: 1 },
  epic:      { name: 'Epic',      color: '#b478ff', glow: '#7038c4', mult: 1.34, order: 2 },
  legendary: { name: 'Legendary', color: '#ffb340', glow: '#d4791c', mult: 1.58, order: 3 },
  mythic:    { name: 'Mythic',    color: '#ff5f8d', glow: '#c42658', mult: 1.92, order: 4 },
};
export const RARITY_KEYS = Object.keys(RARITIES);

// ── Weapon archetypes ───────────────────────────────────────────────────────
export const WEAPON_TYPES = {
  sword:  { key: 'sword',  name: 'Sword',  stat: 'str', mult: 1.00, speed: 1.30, range: 60, arc: 1.95, kind: 'melee', icon: 'sword' },
  axe:    { key: 'axe',    name: 'Axe',    stat: 'str', mult: 1.52, speed: 0.82, range: 72, arc: 2.30, kind: 'melee', icon: 'axe' },
  spear:  { key: 'spear',  name: 'Spear',  stat: 'str', mult: 1.12, speed: 1.02, range: 88, arc: 0.70, kind: 'melee', icon: 'spear' },
  dagger: { key: 'dagger', name: 'Dagger', stat: 'dex', mult: 0.64, speed: 1.95, range: 46, arc: 1.35, kind: 'melee', icon: 'dagger', crit: 8 },
  bow:    { key: 'bow',    name: 'Bow',    stat: 'dex', mult: 0.94, speed: 1.02, range: 330, arc: 0.2, kind: 'ranged', proj: 'arrow', icon: 'bow' },
  staff:  { key: 'staff',  name: 'Staff',  stat: 'int', mult: 1.06, speed: 0.80, range: 300, arc: 0.2, kind: 'ranged', proj: 'orb', splash: 26, icon: 'staff' },
  gun:    { key: 'gun',    name: 'Gun',    stat: 'dex', mult: 1.14, speed: 0.72, range: 260, arc: 0.2, kind: 'ranged', proj: 'bullet', pellets: 3, spread: 0.20, icon: 'gun' },
  tome:   { key: 'tome',   name: 'Tome',   stat: 'int', mult: 0.88, speed: 1.12, range: 290, arc: 0.2, kind: 'ranged', proj: 'homing', icon: 'tome' },
};
export const WEAPON_TYPE_KEYS = Object.keys(WEAPON_TYPES);

export const AFFIXES = {
  fury:      { name: 'of Fury',        desc: '+12% attack speed',            color: '#ffd27a' },
  keen:      { name: 'of the Hawk',    desc: '+7% critical chance',          color: '#ffe14d' },
  vampiric:  { name: 'of Thirst',      desc: '4% lifesteal',                 color: '#ff5f8d' },
  blazing:   { name: 'of Cinders',     desc: 'Hits burn for 3 dmg/s',        color: '#ff6b35' },
  frostbound:{ name: 'of Rime',        desc: 'Hits slow enemies by 25%',     color: '#7de8ff' },
  thunderous:{ name: 'of Thunder',     desc: '20% chance to chain lightning',color: '#ffe14d' },
  earthshatter:{ name: 'of Tremors',   desc: '12% chance to stun',           color: '#c98b4b' },
  radiant:   { name: 'of Dawn',        desc: 'Kills restore 3 HP',           color: '#ffd86b' },
  umbral:    { name: 'of the Hollow',  desc: '+20% damage below 35% HP',     color: '#a06bff' },
  vigilant:  { name: 'of the Wind',    desc: '+5% dodge',                    color: '#8ef0c8' },
  arcane:    { name: 'of the Arcane',  desc: '+10% elemental damage',        color: '#b478ff' },
  swift:     { name: 'of Haste',       desc: '+6% move speed',               color: '#57b8ff' },
};
export const AFFIX_KEYS = Object.keys(AFFIXES);

const ELEMENT_PREFIXES = {
  fire:      ['Cinder', 'Ashen', 'Ember', 'Molten', 'Pyre', 'Searing', 'Infernal', 'Scorched', 'Blazing', 'Magma'],
  water:     ['Tide', 'Coral', 'Abyssal', 'Brine', 'Riptide', 'Wave', 'Azure', 'Drowned', 'Rain', 'Deepwater'],
  lightning: ['Storm', 'Thunder', 'Arc', 'Voltaic', 'Tempest', 'Spark', 'Skyrend', 'Static', 'Thunderhead', 'Bolt'],
  nature:    ['Oakheart', 'Verdant', 'Thorn', 'Bloom', 'Moss', 'Bramble', 'Sylvan', 'Rootbound', 'Petal', 'Wildwood'],
  dark:      ['Umbral', 'Void', 'Gloom', 'Shadow', 'Dusk', 'Nether', 'Hollow', 'Grave', 'Obsidian', 'Nightfall'],
  light:     ['Radiant', 'Dawn', 'Lumen', 'Sanctum', 'Golden', 'Solar', 'Halo', 'Pure', 'Celestial', 'Blessed'],
  earth:     ['Granite', 'Stone', 'Iron', 'Terra', 'Boulder', 'Quake', 'Rusted', 'Copper', 'Basalt', 'Mountain'],
  ice:       ['Frost', 'Rime', 'Glacier', 'Snow', 'Frozen', 'Winter', 'Crystal', 'Chill', 'Hail', 'Permafrost'],
};
const TYPE_FORMS = {
  sword:  ['Shortsword', 'Longsword', 'Sabre', 'Falchion', 'Broadsword', 'Claymore'],
  axe:    ['Hatchet', 'War Axe', 'Cleaver', 'Halberd', 'Greataxe', 'Splitter'],
  spear:  ['Spear', 'Lance', 'Pike', 'Glaive', 'Trident', 'Partisan'],
  dagger: ['Dagger', 'Dirk', 'Stiletto', 'Kukri', 'Kris', 'Fang'],
  bow:    ['Shortbow', 'Longbow', 'Recurve', 'Warbow', 'Arbalest', 'Fletch'],
  staff:  ['Staff', 'Rod', 'Scepter', 'Branch', 'Crook', 'Spire'],
  gun:    ['Blunderbuss', 'Hand Cannon', 'Musket', 'Repeater', 'Scattergun', 'Longrifle'],
  tome:   ['Tome', 'Grimoire', 'Codex', 'Orb', 'Folio', 'Lexicon'],
};
const SUFFIXES = ['of the Vow', 'of Embers', 'of the Deep', 'of the Ninth Loop', 'of Ruin', 'of Dawn', 'of the Hollow', 'of the First Knight', 'of Broken Time'];

const RARITY_BREAKS = [
  { key: 'common', count: 96 },
  { key: 'rare', count: 62 },
  { key: 'epic', count: 42 },
  { key: 'legendary', count: 18 },
  { key: 'mythic', count: 6 },
];
export const WEAPON_COUNT = RARITY_BREAKS.reduce((n, r) => n + r.count, 0); // 224

function rarityForIndex(i) {
  let n = 0;
  for (const r of RARITY_BREAKS) { n += r.count; if (i < n) return r.key; }
  return 'common';
}
function reqForIndex(i, rarity) {
  const base = { common: 1, rare: 5, epic: 11, legendary: 18, mythic: 26 }[rarity];
  const span = { common: 3, rare: 7, epic: 6, legendary: 6, mythic: 7 }[rarity];
  return base + Math.floor((i % 37) / 37 * span);
}

function generateWeapons() {
  const list = [];
  const used = new Set();
  for (let i = 0; i < WEAPON_COUNT; i++) {
    const rarity = rarityForIndex(i);
    const rar = RARITIES[rarity];
    const rarityOrder = rar.order;
    const typeKey = WEAPON_TYPE_KEYS[i % WEAPON_TYPE_KEYS.length];
    const type = WEAPON_TYPES[typeKey];
    const element = ELEMENT_LIST[(i * 3 + Math.floor(i / 8)) % ELEMENT_LIST.length];
    const rng = rngFrom('weapon', i, element, typeKey);
    const prefix = ELEMENT_PREFIXES[element][Math.floor(rng() * ELEMENT_PREFIXES[element].length)];
    const form = TYPE_FORMS[typeKey][Math.floor(rng() * TYPE_FORMS[typeKey].length)];
    let name = `${prefix} ${form}`;
    if ((rarityOrder >= 3 || used.has(name)) && rng() < 0.94) name += ` ${SUFFIXES[Math.floor(rng() * SUFFIXES.length)]}`;
    let guard = 0;
    while (used.has(name) && guard++ < 30) name = `${prefix} ${form} ${SUFFIXES[(i + guard) % SUFFIXES.length]}`;
    if (used.has(name)) name += ` ${String.fromCharCode(65 + (i % 26))}`;
    used.add(name);

    const req = reqForIndex(i, rarity);
    const base = Math.round((5 + req * 1.62) * type.mult * rar.mult * (0.94 + rng() * 0.14));
    const affixes = [];
    if (rarityOrder >= 1) affixes.push(AFFIX_KEYS[Math.floor(rng() * AFFIX_KEYS.length)]);
    if (rarityOrder >= 3) {
      let a = AFFIX_KEYS[Math.floor(rng() * AFFIX_KEYS.length)];
      if (affixes.includes(a)) a = AFFIX_KEYS[(AFFIX_KEYS.indexOf(a) + 3) % AFFIX_KEYS.length];
      affixes.push(a);
    }
    list.push({
      id: `w${String(i).padStart(3, '0')}`,
      index: i, name, type: typeKey, rarity, element, req, baseDmg: base,
      powerStat: type.stat, rarityMult: rar.mult, kind: type.kind, projectile: type.proj || null,
      arc: type.arc, range: type.range, speed: type.speed, pellets: type.pellets || 1,
      spread: type.spread || 0, splash: type.splash || 0, critBonus: type.crit || 0,
      affixes, spriteSeed: rng() * 10000,
      price: Math.round(30 + base * 2.2 + rar.order * 45),
    });
  }
  return list;
}
export const WEAPONS = generateWeapons();
export const WEAPON_BY_ID = new Map(WEAPONS.map(w => [w.id, w]));
export function getWeapon(id) { return WEAPON_BY_ID.get(id) || null; }

// Hand-picked starter loadout from the generated set.
function findWeapon(pred) { return WEAPONS.find(pred); }
const starterSword = findWeapon(w => w.type === 'sword' && w.rarity === 'common' && w.element === 'fire') || WEAPONS[0];
const starterBow = findWeapon(w => w.type === 'bow' && w.rarity === 'rare' && w.element === 'nature') || WEAPONS[1];
const starterStaff = findWeapon(w => w.type === 'staff' && w.rarity === 'rare' && w.element === 'ice') || WEAPONS[2];
export const STARTER_WEAPONS = [starterSword.id, starterBow.id, starterStaff.id];

export function weaponDps(weapon, meta) {
  if (!weapon) return 0;
  const stats = meta?.stats || { str: 5, dex: 5, int: 5 };
  const base = weapon.baseDmg * (1 + (meta?.upgrades?.[weapon.id] || 0) * 0.08);
  const power = stats[weapon.powerStat] ?? 5;
  const speed = weapon.speed * (weapon.affixes.includes('fury') ? 1.12 : 1);
  const crit = (3 + (stats.dex || 0) * 0.35 + weapon.critBonus + (weapon.affixes.includes('keen') ? 7 : 0)) / 100;
  return base * (1 + power / 100) * weapon.rarityMult * speed * (1 + Math.min(0.6, crit) * 1.8);
}

// ── Skills ──────────────────────────────────────────────────────────────────
export const SKILL_BRANCHES = [
  {
    id: 'warrior', name: 'Warrior', tagline: 'Physical DPS', color: '#ff7a57', glyph: 'W',
    desc: 'Become the storm. Trade caution for a blade that never stops moving.',
    nodes: [
      { id: 'whirlwind', name: 'Whirlwind', kind: 'active', tier: 1, req: null, levelReq: 1, cost: 1, cd: 5, mp: 15, glyph: 'WW', desc: 'Spin with your weapon, striking every enemy around you three times.', color: '#ff7a57' },
      { id: 'bloodlust', name: 'Bloodlust', kind: 'passive', tier: 2, req: 'whirlwind', levelReq: 4, cost: 1, glyph: 'BL', desc: '+15% attack speed and +10% weapon damage.', color: '#ff7a57' },
      { id: 'bladestorm', name: 'Blade Storm', kind: 'active', tier: 3, req: 'bloodlust', levelReq: 10, cost: 1, cd: 14, mp: 30, glyph: 'BS', desc: 'Become a cyclone for 1.8s, shredding anything that comes close.', color: '#ff7a57' },
    ],
  },
  {
    id: 'guardian', name: 'Guardian', tagline: 'Tank / Bulwark', color: '#6db8ff', glyph: 'G',
    desc: 'The loop breaks against you. Hold the line when everything else falls.',
    nodes: [
      { id: 'shieldbash', name: 'Shield Bash', kind: 'active', tier: 1, req: null, levelReq: 1, cost: 1, cd: 6, mp: 12, glyph: 'SB', desc: 'Slam forward, damaging and knocking back every enemy in a cone.', color: '#6db8ff' },
      { id: 'ironwill', name: 'Iron Will', kind: 'passive', tier: 2, req: 'shieldbash', levelReq: 4, cost: 1, glyph: 'IW', desc: '+40 max HP and 12% damage reduction.', color: '#6db8ff' },
      { id: 'aegis', name: 'Aegis', kind: 'active', tier: 3, req: 'ironwill', levelReq: 10, cost: 1, cd: 20, mp: 25, glyph: 'AE', desc: 'Gain a luminous shield that absorbs damage for 6 seconds.', color: '#6db8ff' },
    ],
  },
  {
    id: 'mage', name: 'Mage', tagline: 'Elemental', color: '#c78cff', glyph: 'M',
    desc: 'Eight elements answer your call. Burn, freeze, shatter, repeat.',
    nodes: [
      { id: 'fireball', name: 'Fireball', kind: 'active', tier: 1, req: null, levelReq: 1, cost: 1, cd: 4, mp: 16, glyph: 'FB', desc: 'Hurl an exploding ball of fire that burns enemies.', color: '#c78cff' },
      { id: 'manaflow', name: 'Mana Flow', kind: 'passive', tier: 2, req: 'fireball', levelReq: 4, cost: 1, glyph: 'MF', desc: '+3 MP regen per second and +15% elemental damage.', color: '#c78cff' },
      { id: 'starfall', name: 'Starfall', kind: 'active', tier: 3, req: 'manaflow', levelReq: 10, cost: 1, cd: 16, mp: 40, glyph: 'SF', desc: 'Call five meteors down around you, each exploding on impact.', color: '#c78cff' },
    ],
  },
];
export const SKILL_BY_ID = new Map(SKILL_BRANCHES.flatMap(b => b.nodes.map(n => [n.id, { ...n, branch: b.id }])));

// ── Blessings (in-run upgrades) ─────────────────────────────────────────────
export const BLESSINGS = [
  { id: 'emberheart', name: 'Ember Heart', glyph: 'EH', color: '#ff7a57', rarity: 'rare', desc: '+12% weapon damage this run.', apply: s => { s.damage += 0.12; } },
  { id: 'ironskin', name: 'Iron Skin', glyph: 'IS', color: '#c98b4b', rarity: 'rare', desc: '+18% max HP and heal 18% now.', apply: s => { s.maxHp += 0.18; s.healNow = (s.healNow || 0) + 0.18; } },
  { id: 'falconeye', name: 'Falcon Eye', glyph: 'FE', color: '#ffe14d', rarity: 'rare', desc: '+9% critical chance.', apply: s => { s.crit += 9; } },
  { id: 'windstep', name: 'Windstep', glyph: 'WS', color: '#57b8ff', rarity: 'common', desc: '+9% move speed and +6% dodge.', apply: s => { s.moveSpeed += 0.09; s.dodge += 6; } },
  { id: 'sanguine', name: 'Sanguine Vow', glyph: 'SV', color: '#ff5f8d', rarity: 'epic', desc: '+4% lifesteal.', apply: s => { s.lifesteal += 0.04; } },
  { id: 'arcanefocus', name: 'Arcane Focus', glyph: 'AF', color: '#c78cff', rarity: 'epic', desc: '+18% elemental damage.', apply: s => { s.elemental += 0.18; } },
  { id: 'secondwind', name: 'Second Wind', glyph: 'SW', color: '#62d36f', rarity: 'common', desc: 'Restore 35% HP immediately.', apply: s => { s.healNow = (s.healNow || 0) + 0.35; } },
  { id: 'midas', name: 'Midas Touch', glyph: 'MT', color: '#ffd86b', rarity: 'common', desc: '+30% gold from this dungeon.', apply: s => { s.gold += 0.30; } },
  { id: 'thorns', name: 'Thorn Mail', glyph: 'TM', color: '#62d36f', rarity: 'rare', desc: 'Reflect 25% of damage taken.', apply: s => { s.thorns += 0.25; } },
  { id: 'regen', name: 'Verdant Pulse', glyph: 'VP', color: '#62d36f', rarity: 'epic', desc: 'Regenerate 1.2 HP per second.', apply: s => { s.regen += 1.2; } },
  { id: 'chrono', name: 'Chrono Slip', glyph: 'CS', color: '#a06bff', rarity: 'legendary', desc: 'Dodge cooldown reduced by 35%.', apply: s => { s.dodgeCd -= 0.35; } },
  { id: 'overload', name: 'Overload', glyph: 'OL', color: '#ffe14d', rarity: 'legendary', desc: '+25% attack speed and +8% damage.', apply: s => { s.attackSpeed += 0.25; s.damage += 0.08; } },
];

// ── Enemies ─────────────────────────────────────────────────────────────────
export const ENEMY_TYPES = {
  husk:   { name: 'Husk',          hp: 30,  dmg: 8,  speed: 34, radius: 9,  xp: 7,  gold: 3, behavior: 'chase',   size: [20, 26] },
  bat:    { name: 'Gloom Bat',     hp: 18,  dmg: 6,  speed: 60, radius: 8,  xp: 5,  gold: 2, behavior: 'bat',     size: [20, 16] },
  archer: { name: 'Bone Archer',   hp: 26,  dmg: 7,  speed: 27, radius: 9,  xp: 8,  gold: 4, behavior: 'ranged',  size: [20, 26], shot: 'arrow' },
  charger:{ name: 'Rift Hound',    hp: 34,  dmg: 10, speed: 46, radius: 10, xp: 9,  gold: 4, behavior: 'charger', size: [24, 20] },
  bomber: { name: 'Cinder Bomb',   hp: 20,  dmg: 12, speed: 42, radius: 9,  xp: 7,  gold: 4, behavior: 'bomber',  size: [18, 18] },
  mage:   { name: 'Veil Cultist',  hp: 28,  dmg: 8,  speed: 26, radius: 9,  xp: 10, gold: 5, behavior: 'mage',    size: [20, 28], shot: 'orb' },
  brute:  { name: 'Stone Brute',   hp: 72,  dmg: 14, speed: 22, radius: 14, xp: 14, gold: 7, behavior: 'brute',   size: [30, 34] },
  wraith: { name: 'Loop Wraith',   hp: 40,  dmg: 9,  speed: 38, radius: 10, xp: 12, gold: 5, behavior: 'wraith',  size: [22, 28] },
};

export const BIOMES = {
  ember: {
    id: 'ember', name: 'Ember Keep', short: 'EMBER', unlock: 1,
    desc: 'A fortress that has burned for a hundred loops. The Warden still tends the first flame.',
    elements: ['fire', 'earth', 'dark'], boss: 'cinder',
    palette: {
      sky: '#180d12', fog: '#3a1418', floorA: '#3b2a28', floorB: '#332321', floorC: '#45302b',
      wall: '#241a1e', wallTop: '#3a2726', wallEdge: '#160f12', light: '#ff7b3a', accent: '#ffb05a', ambient: 'rgba(28,10,10,0.62)',
    },
    particles: 'embers',
  },
  frost: {
    id: 'frost', name: 'Frost Crypt', short: 'FROST', unlock: 4,
    desc: 'The dead sleep beneath a glacier that never melts. Something beneath it is still dreaming.',
    elements: ['ice', 'water', 'dark'], boss: 'glacier',
    palette: {
      sky: '#0a1620', fog: '#163047', floorA: '#2a3f4c', floorB: '#243643', floorC: '#34505f',
      wall: '#172731', wallTop: '#2a4552', wallEdge: '#0a1219', light: '#7de8ff', accent: '#bff6ff', ambient: 'rgba(8,18,30,0.62)',
    },
    particles: 'snow',
  },
  nature: {
    id: 'nature', name: 'Verdant Ruins', short: 'VERDANT', unlock: 8,
    desc: 'A temple swallowed by roots. Every flower here remembers a different end of the world.',
    elements: ['nature', 'earth', 'water'], boss: 'treant',
    palette: {
      sky: '#0b1410', fog: '#1c3323', floorA: '#2f3d2a', floorB: '#293523', floorC: '#3d4f32',
      wall: '#1b271a', wallTop: '#31452c', wallEdge: '#0b120a', light: '#8cf07a', accent: '#d0ffb0', ambient: 'rgba(10,22,12,0.56)',
    },
    particles: 'leaves',
  },
  void: {
    id: 'void', name: 'Hollow Sanctum', short: 'HOLLOW', unlock: 12,
    desc: 'The engine beneath the world. Here the loop is thin enough to touch — and it is watching you.',
    elements: ['dark', 'light', 'lightning'], boss: 'hollow',
    palette: {
      sky: '#0d0a18', fog: '#251a3d', floorA: '#2d2840', floorB: '#262138', floorC: '#3a3354',
      wall: '#191428', wallTop: '#2f2850', wallEdge: '#0a0712', light: '#b07bff', accent: '#e2c7ff', ambient: 'rgba(12,8,24,0.66)',
    },
    particles: 'void',
  },
};
export const BIOME_KEYS = Object.keys(BIOMES);
export const BOSSES = {
  cinder: {
    id: 'cinder', name: 'CINDER WARDEN', title: 'Keeper of the First Flame', biome: 'ember', element: 'fire',
    hp: 620, dmg: 15, radius: 26, color: '#ff7b3a', accent: '#ffe0a0',
    intro: 'The flame remembers your name, little knight.',
  },
  glacier: {
    id: 'glacier', name: 'GLACIER QUEEN', title: 'The Sleep Beneath the Ice', biome: 'frost', element: 'ice',
    hp: 760, dmg: 17, radius: 25, color: '#7de8ff', accent: '#e8ffff',
    intro: 'Kneel. The cold is kinder than the truth.',
  },
  treant: {
    id: 'treant', name: 'BLIGHTROOT', title: 'The Temple That Grew Teeth', biome: 'nature', element: 'nature',
    hp: 900, dmg: 19, radius: 28, color: '#8cf07a', accent: '#e0ffb0',
    intro: 'You are the third knight to feed my roots today.',
  },
  hollow: {
    id: 'hollow', name: 'THE HOLLOW KING', title: 'Sovereign of the Broken Loop', biome: 'void', element: 'dark',
    hp: 1160, dmg: 22, radius: 27, color: '#b07bff', accent: '#f0dcff',
    intro: 'I have killed you a thousand times. Show me something new.',
  },
};

// ── Progression ─────────────────────────────────────────────────────────────
export const STAT_INFO = {
  str: { name: 'STR', label: 'Strength', desc: '+1% physical weapon damage', color: '#ff7a57' },
  dex: { name: 'DEX', label: 'Dexterity', desc: '+0.35% critical chance', color: '#ffe14d' },
  agi: { name: 'AGI', label: 'Agility', desc: '+0.25% dodge chance', color: '#8ef0c8' },
  int: { name: 'INT', label: 'Intelligence', desc: '+1% magic damage & +3 MP', color: '#c78cff' },
  vit: { name: 'VIT', label: 'Vitality', desc: '+8 max HP', color: '#6db8ff' },
};
export const STAT_KEYS = ['str', 'dex', 'agi', 'int', 'vit'];

export function xpToNext(level) {
  if (level >= MAX_LEVEL) return Infinity;
  return Math.floor(38 + level * 24 + Math.pow(level, 1.55) * 9);
}

export const DIFFICULTIES = {
  normal:    { id: 'normal',    name: 'Normal',    hp: 1.0,  dmg: 1.0,  reward: 1.0, color: '#8ef0c8', desc: 'The loop as it is.' },
  hard:      { id: 'hard',      name: 'Hard',      hp: 1.55, dmg: 1.35, reward: 1.45, color: '#ffb340', desc: 'Stronger foes. Richer spoils.' },
  nightmare: { id: 'nightmare', name: 'Nightmare', hp: 2.3,  dmg: 1.7,  reward: 2.0,  color: '#ff5f8d', desc: 'The loop fights back.' },
};

export const ECHO_UPGRADES = [
  { id: 'power', name: 'Echo of Power', glyph: 'PW', color: '#ff7a57', desc: '+4% all damage per rank.', max: 10 },
  { id: 'vitality', name: 'Echo of Life', glyph: 'LF', color: '#62d36f', desc: '+14 max HP per rank.', max: 10 },
  { id: 'haste', name: 'Echo of Haste', glyph: 'HS', color: '#57b8ff', desc: '+2.5% move speed per rank.', max: 8 },
  { id: 'fortune', name: 'Echo of Fortune', glyph: 'FT', color: '#ffd86b', desc: '+7% gold and gems per rank.', max: 8 },
];
export function echoCost(level) { return 1 + Math.floor(level * 0.9); }

export const SHOP_ITEMS = [
  { id: 'potion_hp', name: 'Crimson Flask', glyph: 'HP', color: '#ff5f6d', desc: 'Restores 40% max HP.', price: 30, currency: 'gold' },
  { id: 'potion_mp', name: 'Azure Flask', glyph: 'MP', color: '#57b8ff', desc: 'Restores 55% max MP.', price: 26, currency: 'gold' },
  { id: 'iron', name: 'Iron Ingot', glyph: 'IR', color: '#b8c2cf', desc: 'Common forging material.', price: 45, currency: 'gold' },
  { id: 'essence', name: 'Monster Essence', glyph: 'ES', color: '#b478ff', desc: 'Unstable forging material.', price: 70, currency: 'gold' },
  { id: 'crystal', name: 'Loop Crystal', glyph: 'CR', color: '#7de8ff', desc: 'Rare forging material.', price: 120, currency: 'gold' },
  { id: 'relic', name: 'Relic Pull', glyph: 'RL', color: '#ffb340', desc: 'A random Rare+ weapon. Duplicates refund materials.', price: 100, currency: 'gems' },
];

export const LOADING_TIPS = [
  'Elemental advantage deals 1.5× damage. The UI shows a WEAK! tag when you exploit it.',
  'Dodging grants brief invulnerability. Use it through projectiles, not away from them.',
  'Weapons auto-equip if the toggle is on and the new blade has higher DPS.',
  'Break every pot. The loop is generous to the greedy.',
  'Skill points unlock active abilities. Equip two from the Skill Shrine.',
  'Echoes persist through death. The Obelisk is the only thing that remembers you.',
  'Critical hits scale with DEX. Daggers and bows love a high-DEX knight.',
  'The minimap only shows rooms you have seen. The boss waits at the bottom.',
  'Shrines can heal you — or grant a permanent run blessing.',
  'The loop resets, but the collection does not. 224 weapons are waiting.',
];
