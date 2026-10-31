export const W = 480;
export const H = 854;

export const COLORS = {
  ink: "#17142f",
  inkSoft: "#282348",
  night: "#1a1a2e",
  nightDeep: "#0d0c1b",
  gold: "#ffd700",
  goldDeep: "#e09b00",
  cyan: "#00d4ff",
  cyanDeep: "#008fbf",
  cream: "#fff5d6",
  paper: "#f4e7c5",
  coral: "#ff6b7a",
  mint: "#72e6a5",
  lilac: "#b69cff",
  purple: "#7a4bd4",
  pink: "#ff9edb",
  red: "#ff4d6d",
  green: "#55d98b",
  white: "#ffffff",
};

export const GRID = {
  cols: 9,
  rows: 5,
  x: 24,
  y: 190,
  cw: 48,
  ch: 76,
};

export const GUARDIAN_XP = [0, 120, 300, 550, 850, 1200, 1600, 2100];

export const UNITS = [
  {
    id: "teddy",
    name: "Teddy Knight",
    short: "TEDDY",
    role: "Melee Guard",
    blurb: "A brave plush with a wooden sword and a heart of fluff.",
    cost: 25,
    hp: 60,
    damage: 10,
    interval: 1.0,
    range: 1,
    unlock: 1,
    cooldown: 2.0,
    attack: "melee",
    color: "#d99655",
    accent: "#ffd700",
    projectile: null,
  },
  {
    id: "robo",
    name: "Robo Blaster",
    short: "ROBO",
    role: "Laser Scout",
    blurb: "A wind-up tin hero with a very serious laser pointer.",
    cost: 75,
    hp: 90,
    damage: 18,
    interval: 1.4,
    range: 5,
    unlock: 2,
    cooldown: 3.2,
    attack: "projectile",
    color: "#51c9d8",
    accent: "#ff6b7a",
    projectile: "laser",
  },
  {
    id: "bunny",
    name: "Mochi Medic",
    short: "MOCHI",
    role: "Dream Healer",
    blurb: "Patches up bumped toys with marshmallow magic.",
    cost: 90,
    hp: 70,
    heal: 16,
    interval: 2.4,
    range: 3,
    unlock: 3,
    cooldown: 4.0,
    attack: "heal",
    color: "#f7d6d0",
    accent: "#ff8fb8",
    projectile: "heart",
  },
  {
    id: "dino",
    name: "Dino Bruiser",
    short: "DINO",
    role: "Heavy Brawler",
    blurb: "A bean-filled dinosaur who gives the best (and worst) hugs.",
    cost: 110,
    hp: 220,
    damage: 28,
    interval: 1.6,
    range: 1,
    unlock: 4,
    cooldown: 5.0,
    attack: "melee",
    color: "#74c96a",
    accent: "#ffd166",
    projectile: null,
  },
  {
    id: "sprout",
    name: "Star Sprout",
    short: "SPROUT",
    role: "Starlight Farm",
    blurb: "Grows handfuls of warm, spendable starlight.",
    cost: 50,
    hp: 55,
    generate: 25,
    interval: 8.0,
    range: 0,
    unlock: 5,
    cooldown: 4.2,
    attack: "generate",
    color: "#9fe6a0",
    accent: "#ffd700",
    projectile: null,
  },
  {
    id: "owl",
    name: "Clockwork Owl",
    short: "OWL",
    role: "Rapid Sniper",
    blurb: "Ticks, tocks, and fires tiny clock hands very quickly.",
    cost: 125,
    hp: 85,
    damage: 12,
    interval: 0.55,
    range: 4,
    unlock: 6,
    cooldown: 5.2,
    attack: "projectile",
    color: "#9b86dc",
    accent: "#ffd700",
    projectile: "clock",
    slow: 0.35,
  },
  {
    id: "unicorn",
    name: "Unicorn Dreamer",
    short: "UNI",
    role: "Splash Caster",
    blurb: "A glittering dream cannon disguised as a cuddle toy.",
    cost: 150,
    hp: 110,
    damage: 26,
    interval: 1.9,
    range: 5,
    unlock: 7,
    cooldown: 6.0,
    attack: "projectile",
    color: "#f8f0ff",
    accent: "#ff9edb",
    projectile: "rainbow",
    splash: 0.85,
  },
  {
    id: "dragon",
    name: "Dragon Plush",
    short: "DRAGON",
    role: "Flame Legend",
    blurb: "The final guardian. Slightly singed, extremely loyal.",
    cost: 200,
    hp: 180,
    damage: 42,
    interval: 1.2,
    range: 3,
    unlock: 8,
    cooldown: 7.0,
    attack: "projectile",
    color: "#ff8d5c",
    accent: "#ffe07a",
    projectile: "fire",
    splash: 0.45,
  },
];

export const UNIT_BY_ID = Object.fromEntries(UNITS.map((unit) => [unit.id, unit]));

export const ENEMIES = {
  mouse: {
    id: "mouse",
    name: "Zombie Mouse",
    hp: 30,
    damage: 5,
    speed: 0.5,
    dream: 10,
    color: "#a6a3b8",
    accent: "#7dffb0",
    size: 0.7,
  },
  bat: {
    id: "bat",
    name: "Boogey Bat",
    hp: 42,
    damage: 3,
    speed: 0.72,
    dream: 8,
    color: "#8e6bc4",
    accent: "#ff8fb8",
    size: 0.64,
    flying: true,
  },
  slug: {
    id: "slug",
    name: "Snore Slug",
    hp: 115,
    damage: 8,
    speed: 0.27,
    dream: 15,
    color: "#5d719d",
    accent: "#7dffb0",
    size: 0.84,
  },
  clown: {
    id: "clown",
    name: "Shadow Clown",
    hp: 310,
    damage: 14,
    speed: 0.3,
    dream: 25,
    color: "#7a4bd4",
    accent: "#ff4d6d",
    size: 0.98,
  },
  king: {
    id: "king",
    name: "Nightmare King",
    hp: 1100,
    damage: 22,
    speed: 0.2,
    dream: 100,
    color: "#3e285d",
    accent: "#ff4d6d",
    size: 1.32,
    boss: true,
  },
};

const ROWS = [2, 1, 3, 0, 4];

function makeWave(entries, gap, start = 1.2) {
  return {
    spawns: entries.map(([type, row, delay], index) => ({
      type,
      row,
      t: start + index * gap + (delay || 0),
    })),
    duration: start + Math.max(0, entries.length - 1) * gap,
  };
}

function spreadMice(count, offset = 0) {
  return Array.from({ length: count }, (_, index) => ["mouse", ROWS[(index + offset) % ROWS.length]]);
}

const LEVEL_ONE_WAVES = [
  makeWave(spreadMice(4), 2.4),
  makeWave([...spreadMice(6, 1), ["bat", 3]], 2.0),
  makeWave([...spreadMice(8, 2), ["bat", 1], ["bat", 4], ["slug", 2]], 1.82),
  makeWave([...spreadMice(10, 3), ["bat", 0], ["bat", 3], ["slug", 1]], 1.62),
  makeWave([...spreadMice(12, 1), ["bat", 2], ["bat", 4], ["bat", 0], ["slug", 3], ["slug", 1]], 1.48),
  makeWave(
    [...spreadMice(12, 2), ["bat", 0], ["bat", 3], ["bat", 1], ["bat", 4], ["slug", 2], ["slug", 4], ["clown", 1, 1.2]],
    1.34,
  ),
  makeWave(
    [
      ...spreadMice(14, 0),
      ["bat", 1],
      ["bat", 3],
      ["bat", 0],
      ["bat", 4],
      ["bat", 2],
      ["slug", 1],
      ["slug", 3],
      ["slug", 0],
      ["clown", 4, 1.0],
      ["king", 2, 5.5],
    ],
    1.18,
  ),
];

export const LEVELS = [
  {
    id: 0,
    name: "Moonlit Nursery",
    tagline: "The first creak in the dark.",
    difficulty: 1,
    waves: LEVEL_ONE_WAVES,
    reward: 80,
    xp: 130,
    accent: "#00d4ff",
    icon: "moon",
  },
  {
    id: 1,
    name: "Under-Bed Hollow",
    tagline: "Something is living in the dust.",
    difficulty: 1.28,
    waves: LEVEL_ONE_WAVES,
    reward: 120,
    xp: 180,
    accent: "#b69cff",
    icon: "bed",
  },
  {
    id: 2,
    name: "Closet Kingdom",
    tagline: "The hangers have declared war.",
    difficulty: 1.58,
    waves: LEVEL_ONE_WAVES,
    reward: 180,
    xp: 240,
    accent: "#ff9edb",
    icon: "crown",
  },
];

export const QUESTS = [
  {
    id: "win",
    title: "One Good Night",
    description: "Win any level.",
    target: 1,
    reward: 40,
    icon: "moon",
  },
  {
    id: "kills",
    title: "Nightmare Repellent",
    description: "Banish 25 nightmares.",
    target: 25,
    reward: 25,
    icon: "sword",
  },
  {
    id: "stars",
    title: "Star Collector",
    description: "Catch 12 falling stars.",
    target: 12,
    reward: 20,
    icon: "star",
  },
];

export const ACHIEVEMENTS = [
  { id: "first-win", title: "Sweet Dreams", description: "Win your first night.", gems: 5 },
  { id: "boss", title: "Crown Breaker", description: "Defeat the Nightmare King.", gems: 10 },
  { id: "no-leak", title: "Flawless Fluff", description: "Win without losing Dream Meter.", gems: 15 },
];

export function guardianLevelForXp(xp) {
  let level = 1;
  for (let index = 0; index < GUARDIAN_XP.length; index += 1) {
    if (xp >= GUARDIAN_XP[index]) level = index + 1;
  }
  return Math.min(level, 8);
}

export function xpForNextLevel(level) {
  if (level >= 8) return null;
  return GUARDIAN_XP[level];
}

export function isUnitUnlocked(unit, guardianLevel) {
  return guardianLevel >= unit.unlock;
}

export function unitStats(unit, upgradeLevel = 0) {
  const scale = 1 + upgradeLevel * 0.1;
  return {
    ...unit,
    hp: Math.round(unit.hp * scale),
    damage: unit.damage ? Math.round(unit.damage * scale) : 0,
    heal: unit.heal ? Math.round(unit.heal * scale) : 0,
    generate: unit.generate ? Math.round(unit.generate * scale) : 0,
  };
}

export function upgradeCost(upgradeLevel) {
  return 40 + upgradeLevel * 35;
}
