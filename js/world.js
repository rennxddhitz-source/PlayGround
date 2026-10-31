// ── Procedural dungeon graph + room geometry ────────────────────────────────
import { BIOMES, BOSSES, VIEW_W, VIEW_H } from './data.js';
import { clamp, circleRect, dist, rngFrom, shuffle } from './util.js';

export const TILE = 30;
export const ROOM_BOUNDS = { x: 30, y: 32, w: 420, h: 208 };

const ROOM_LABELS = {
  combat: { name: 'Combat Chamber', glyph: '⚔', desc: 'Enemies guard the way forward.' },
  elite: { name: 'Elite Den', glyph: '☠', desc: 'A champion awaits. Better loot.' },
  treasure: { name: 'Treasure Vault', glyph: '◆', desc: 'A chest hums with old magic.' },
  shrine: { name: 'Loop Shrine', glyph: '✦', desc: 'Restore yourself, or take a blessing.' },
  start: { name: 'Dungeon Gate', glyph: '▲', desc: 'The way you came in.' },
  boss: { name: 'Boss Sanctum', glyph: '☼', desc: 'The heart of the loop.' },
};
export const roomLabel = type => ROOM_LABELS[type] || ROOM_LABELS.combat;

export function generateDungeon(seed, biomeId, difficulty, playerLevel = 1) {
  const rng = rngFrom('dungeon', seed, biomeId, difficulty);
  const total = 5 + Math.floor(rng() * 14); // 5–18
  const layers = [];
  for (let layer = 0; layer < total; layer++) {
    let nodes;
    if (layer === 0 || layer === total - 1) nodes = 1;
    else if (layer === 1) nodes = 1;
    else nodes = rng() < 0.48 ? 2 : 1;
    const arr = [];
    for (let i = 0; i < nodes; i++) {
      const x = nodes === 1 ? 0.5 : 0.24 + i * 0.52;
      arr.push({ layer, x, y: layer, id: `n${layer}_${i}`, type: 'combat', next: [], visited: false, seen: false, roomSeed: Math.floor(rng() * 1e9), index: 0 });
    }
    layers.push(arr);
  }
  layers[0][0].type = 'start';
  layers[total - 1][0].type = 'boss';
  // assign room types with a rhythm
  let sinceSpecial = 0;
  for (let layer = 1; layer < total - 1; layer++) {
    for (const n of layers[layer]) {
      sinceSpecial++;
      if (layer === 1) { n.type = 'combat'; continue; }
      const roll = rng();
      if (sinceSpecial >= 4 && roll < 0.22) { n.type = 'treasure'; sinceSpecial = 0; }
      else if (sinceSpecial >= 4 && roll < 0.42) { n.type = 'shrine'; sinceSpecial = 0; }
      else if (roll > 0.82) n.type = 'elite';
      else n.type = 'combat';
    }
  }
  // connect every node to every node in the next layer
  for (let layer = 0; layer < total - 1; layer++) {
    for (const n of layers[layer]) n.next = layers[layer + 1].map(m => m.id);
  }
  const nodes = layers.flat();
  const byId = new Map(nodes.map(n => [n.id, n]));
  // enemy budget scales with depth
  for (const n of nodes) {
    n.room = buildRoom(n, biomeId, difficulty, playerLevel);
    n.room.nodeId = n.id;
    n.room.roomType = n.type;
  }
  return {
    id: seed, biome: biomeId, difficulty, total, layers, nodes, byId,
    startId: layers[0][0].id, bossId: layers[total - 1][0].id,
    currentNode: layers[0][0].id,
  };
}

export function buildRoom(node, biomeId, difficulty, playerLevel = 1) {
  const biome = BIOMES[biomeId];
  const rng = rngFrom('room', node.roomSeed, biomeId, node.type);
  const isBoss = node.type === 'boss';
  const isStart = node.type === 'start';
  const props = [];
  const lights = [];
  const decor = [];
  // wall torches
  const torchXs = isBoss ? [70, 240, 410] : [86, 240, 394];
  for (const tx of torchXs) {
    const color = node.type === 'boss' ? BOSSES[biome.boss].color : biome.palette.light;
    lights.push({ x: tx, y: 30, r: 82, color, intensity: 0.9, flicker: 0.1, torch: true });
    decor.push({ type: 'torch', x: tx, y: 28 });
  }
  // braziers / pillars / crates
  if (!isBoss && !isStart) {
    const count = 2 + Math.floor(rng() * 3);
    const cells = [
      [3, 2], [12, 2], [3, 6], [12, 6], [7, 2], [8, 6], [2, 4], [13, 4], [5, 4], [10, 4],
    ];
    shuffle(rng, cells).slice(0, count).forEach(([cx, cy]) => {
      const x = cx * TILE + TILE / 2, y = cy * TILE + TILE / 2;
      if (Math.abs(x - VIEW_W / 2) < 54 && Math.abs(y - VIEW_H / 2) < 34) return;
      const roll = rng();
      if (roll < 0.34) {
        props.push({ kind: 'pillar', shape: 'circle', x, y, r: 10, h: 30 });
        lights.push({ x, y: y - 10, r: 50, color: biome.palette.accent, intensity: 0.4, flicker: 0.2 });
      } else if (roll < 0.58) {
        props.push({ kind: 'brazier', shape: 'circle', x, y, r: 8, h: 14 });
        lights.push({ x, y: y - 8, r: 90, color: biome.palette.light, intensity: 0.9, flicker: 0.15 });
      } else if (roll < 0.82) {
        props.push({ kind: 'crate', shape: 'rect', x: x - 10, y: y - 8, w: 20, h: 16 });
      } else {
        props.push({ kind: 'rubble', shape: 'none', x, y });
      }
    });
    // ambient decor
    for (let i = 0; i < 10; i++) {
      decor.push({ type: rng() < 0.4 ? 'crack' : rng() < 0.5 ? 'bone' : 'moss', x: 40 + rng() * 400, y: 45 + rng() * 190, s: rng() });
    }
  }
  if (isBoss) {
    for (const [x, y] of [[72, 70], [408, 70], [72, 204], [408, 204]]) props.push({ kind: 'pillar', shape: 'circle', x, y, r: 10, h: 30 });
    decor.push({ type: 'sigil', x: VIEW_W / 2, y: VIEW_H / 2 + 4 });
  }
  if (isStart) {
    // gate at the top
    decor.push({ type: 'gate', x: VIEW_W / 2, y: 38 });
    for (let i = 0; i < 6; i++) decor.push({ type: 'crack', x: 60 + rng() * 360, y: 70 + rng() * 150, s: rng() });
  }
  const spawnPoints = [
    [48, 54], [432, 54], [48, 220], [432, 220], [240, 48], [240, 222], [42, 136], [438, 136],
    [150, 58], [330, 58], [150, 214], [330, 214],
  ].map(([x, y]) => ({ x, y })).filter(p => !props.some(pr => circleRect(p.x, p.y, 14, propRect(pr))));
  return {
    nodeId: node.id, roomType: node.type, biome: biomeId, seed: node.roomSeed,
    props, lights, decor, spawnPoints,
    bounds: { ...ROOM_BOUNDS },
    pellet: [], // reserved
    isBoss, isStart,
    cleared: false,
  };
}

export function propRect(p) {
  if (p.shape === 'rect') return { x: p.x, y: p.y, w: p.w, h: p.h };
  if (p.shape === 'circle') return { x: p.x - p.r, y: p.y - p.r, w: p.r * 2, h: p.r * 2 };
  return { x: p.x, y: p.y, w: 0, h: 0 };
}

export function collide(room, x, y, r) {
  const b = room.bounds;
  let nx = clamp(x, b.x + r, b.x + b.w - r);
  let ny = clamp(y, b.y + r, b.y + b.h - r);
  for (const p of room.props) {
    if (p.shape === 'circle') {
      const d = Math.hypot(nx - p.x, ny - p.y);
      const min = r + p.r;
      if (d < min && d > 0.0001) { nx = p.x + (nx - p.x) / d * min; ny = p.y + (ny - p.y) / d * min; }
      else if (d <= 0.0001) nx += min;
    } else if (p.shape === 'rect') {
      const cx = clamp(nx, p.x, p.x + p.w), cy = clamp(ny, p.y, p.y + p.h);
      const dx = nx - cx, dy = ny - cy, d = Math.hypot(dx, dy);
      if (d < r) {
        if (d > 0.0001) { nx = cx + dx / d * r; ny = cy + dy / d * r; }
        else {
          const left = nx - p.x, right = p.x + p.w - nx, top = ny - p.y, bot = p.y + p.h - ny;
          const m = Math.min(left, right, top, bot);
          if (m === left) nx = p.x - r; else if (m === right) nx = p.x + p.w + r; else if (m === top) ny = p.y - r; else ny = p.y + p.h + r;
        }
      }
    }
  }
  nx = clamp(nx, b.x + r, b.x + b.w - r);
  ny = clamp(ny, b.y + r, b.y + b.h - r);
  return { x: nx, y: ny };
}

export function blockedAt(room, x, y, r = 0) {
  const b = room.bounds;
  if (x < b.x + r || x > b.x + b.w - r || y < b.y + r || y > b.y + b.h - r) return true;
  for (const p of room.props) {
    if (p.shape === 'circle' && dist(x, y, p.x, p.y) < p.r + r) return true;
    if (p.shape === 'rect' && circleRect(x, y, r, propRect(p))) return true;
  }
  return false;
}

// simple heap-free path stepping for enemies
export function steerAround(room, x, y, tx, ty, r) {
  const res = collide(room, x, y, r);
  if (Math.abs(res.x - x) + Math.abs(res.y - y) < 0.2) return { x: tx, y: ty };
  // slide along the obstacle toward target
  const angle = Math.atan2(ty - y, tx - x);
  for (const off of [0.7, -0.7, 1.3, -1.3, 2.0, -2.0]) {
    const a = angle + off;
    const nx = x + Math.cos(a) * 12, ny = y + Math.sin(a) * 12;
    if (!blockedAt(room, nx, ny, r)) return { x: nx, y: ny };
  }
  return { x: res.x, y: res.y };
}
