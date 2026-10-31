// ── Pixel art: procedural sprites, icons and a 5×7 bitmap font ──────────────
import { ELEMENTS, RARITIES, WEAPON_TYPES, BIOMES } from './data.js';

export function makeCanvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  return { c, ctx };
}

const urlCache = new Map();
function cached(key, maker) {
  if (!urlCache.has(key)) urlCache.set(key, maker());
  return urlCache.get(key);
}

// ── 5×7 bitmap font ─────────────────────────────────────────────────────────
const FONT = {
  A: [0x0E,0x11,0x11,0x1F,0x11,0x11,0x11], B: [0x1E,0x11,0x11,0x1E,0x11,0x11,0x1E],
  C: [0x0E,0x11,0x10,0x10,0x10,0x11,0x0E], D: [0x1E,0x11,0x11,0x11,0x11,0x11,0x1E],
  E: [0x1F,0x10,0x10,0x1E,0x10,0x10,0x1F], F: [0x1F,0x10,0x10,0x1E,0x10,0x10,0x10],
  G: [0x0E,0x11,0x10,0x17,0x11,0x11,0x0F], H: [0x11,0x11,0x11,0x1F,0x11,0x11,0x11],
  I: [0x0E,0x04,0x04,0x04,0x04,0x04,0x0E], J: [0x07,0x02,0x02,0x02,0x02,0x12,0x0C],
  K: [0x11,0x12,0x14,0x18,0x14,0x12,0x11], L: [0x10,0x10,0x10,0x10,0x10,0x10,0x1F],
  M: [0x11,0x1B,0x15,0x15,0x11,0x11,0x11], N: [0x11,0x19,0x15,0x13,0x11,0x11,0x11],
  O: [0x0E,0x11,0x11,0x11,0x11,0x11,0x0E], P: [0x1E,0x11,0x11,0x1E,0x10,0x10,0x10],
  Q: [0x0E,0x11,0x11,0x11,0x15,0x12,0x0D], R: [0x1E,0x11,0x11,0x1E,0x14,0x12,0x11],
  S: [0x0F,0x10,0x10,0x0E,0x01,0x01,0x1E], T: [0x1F,0x04,0x04,0x04,0x04,0x04,0x04],
  U: [0x11,0x11,0x11,0x11,0x11,0x11,0x0E], V: [0x11,0x11,0x11,0x11,0x11,0x0A,0x04],
  W: [0x11,0x11,0x11,0x15,0x15,0x1B,0x11], X: [0x11,0x11,0x0A,0x04,0x0A,0x11,0x11],
  Y: [0x11,0x11,0x0A,0x04,0x04,0x04,0x04], Z: [0x1F,0x01,0x02,0x04,0x08,0x10,0x1F],
  0: [0x0E,0x11,0x13,0x15,0x19,0x11,0x0E], 1: [0x04,0x0C,0x04,0x04,0x04,0x04,0x0E],
  2: [0x0E,0x11,0x01,0x02,0x04,0x08,0x1F], 3: [0x1F,0x02,0x04,0x02,0x01,0x11,0x0E],
  4: [0x02,0x06,0x0A,0x12,0x1F,0x02,0x02], 5: [0x1F,0x10,0x1E,0x01,0x01,0x11,0x0E],
  6: [0x06,0x08,0x10,0x1E,0x11,0x11,0x0E], 7: [0x1F,0x01,0x02,0x04,0x08,0x08,0x08],
  8: [0x0E,0x11,0x11,0x0E,0x11,0x11,0x0E], 9: [0x0E,0x11,0x11,0x0F,0x01,0x02,0x0C],
  '+': [0x00,0x04,0x04,0x1F,0x04,0x04,0x00], '-': [0x00,0x00,0x00,0x1F,0x00,0x00,0x00],
  '!': [0x04,0x04,0x04,0x04,0x04,0x00,0x04], '?': [0x0E,0x11,0x01,0x02,0x04,0x00,0x04],
  '%': [0x19,0x1A,0x02,0x04,0x08,0x0B,0x13], '/': [0x01,0x02,0x02,0x04,0x08,0x08,0x10],
  '.': [0x00,0x00,0x00,0x00,0x00,0x0C,0x0C], ':': [0x00,0x0C,0x0C,0x00,0x0C,0x0C,0x00],
  "'": [0x04,0x04,0x00,0x00,0x00,0x00,0x00], ' ': [0,0,0,0,0,0,0],
  '×': [0x00,0x11,0x0A,0x04,0x0A,0x11,0x00], '·': [0x00,0x00,0x00,0x0C,0x0C,0x00,0x00],
};
export function textWidth(text, scale = 1) { return Math.max(0, text.length * 6 * scale - scale); }
export function drawPixelText(ctx, text, x, y, opts = {}) {
  const s = opts.scale || 1;
  const color = opts.color || '#fff';
  const align = opts.align || 'left';
  let str = String(text).toUpperCase();
  const w = textWidth(str, s);
  let ox = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x;
  if (opts.shadow !== false) {
    ctx.globalAlpha = opts.shadowAlpha ?? 0.6;
    drawRaw(ctx, str, ox + s, y + s, s, opts.shadowColor || '#08060c');
    ctx.globalAlpha = 1;
  }
  drawRaw(ctx, str, ox, y, s, color);
}
function drawRaw(ctx, str, x, y, s, color) {
  ctx.fillStyle = color;
  for (let i = 0; i < str.length; i++) {
    const rows = FONT[str[i]] || FONT[str[i].toUpperCase()] || FONT['?'];
    for (let ry = 0; ry < 7; ry++) {
      const bits = rows[ry];
      for (let rx = 0; rx < 5; rx++) {
        if (bits & (1 << (4 - rx))) ctx.fillRect(Math.round(x + (i * 6 + rx) * s), Math.round(y + ry * s), s, s);
      }
    }
  }
}

// ── Element / resource / skill icons ────────────────────────────────────────
export function elementIconURL(element, size = 14) {
  return cached(`el:${element}:${size}`, () => {
    const { c, ctx } = makeCanvas(size, size);
    const el = ELEMENTS[element] || ELEMENTS.fire;
    const mid = size / 2;
    // pixel diamond
    for (let y = 0; y < size; y++) {
      const d = Math.abs(y - mid + 0.5) / mid;
      const half = Math.round((1 - d) * mid);
      for (let x = Math.round(mid - half); x < Math.round(mid + half); x++) {
        const edge = x === Math.round(mid - half) || x === Math.round(mid + half) - 1 || y < 2 || y > size - 3;
        ctx.fillStyle = edge ? '#0a0812' : (y < mid ? el.light : el.color);
        ctx.fillRect(x, y, 1, 1);
      }
    }
    ctx.fillStyle = el.light;
    ctx.fillRect(mid - 1, mid - 2, 2, 3);
    ctx.globalAlpha = 0.9;
    ctx.fillRect(mid + 1, mid + 1, 1, 1);
    return c.toDataURL();
  });
}
export function resourceIconURL(key, size = 16) {
  return cached(`res:${key}:${size}`, () => {
    const { c, ctx } = makeCanvas(size, size);
    const m = size / 2;
    const colors = {
      gold: ['#ffe08a', '#ffb340', '#8a4b13'], gem: ['#ffd0f0', '#ff5f9d', '#7a1746'],
      iron: ['#e6edf4', '#aab7c6', '#4a5564'], essence: ['#e1c4ff', '#a06bff', '#421d78'],
      crystal: ['#d4fbff', '#7de8ff', '#1f6d84'], echo: ['#f0dcff', '#b07bff', '#3c1f72'],
    }[key] || ['#fff', '#ccc', '#666'];
    const px = (x, y, col) => { ctx.fillStyle = col; ctx.fillRect(x, y, 1, 1); };
    if (key === 'gold') {
      for (let y = 2; y < size - 2; y++) for (let x = 3; x < size - 3; x++) {
        const d = Math.hypot(x - m + 0.5, y - m + 0.5);
        if (d < m - 2) px(x, y, d < m - 3.5 ? colors[0] : colors[1]);
      }
      for (let x = 5; x < size - 5; x++) px(x, m - 1, colors[2]);
      px(size - 5, 4, colors[2]); px(4, size - 5, colors[2]);
    } else if (key === 'gem' || key === 'crystal') {
      for (let y = 2; y < size - 2; y++) {
        const w = Math.round((1 - Math.abs(y - m + 0.5) / (m - 1)) * (m - 2)) + 1;
        for (let x = Math.round(m - w); x < Math.round(m + w); x++) px(x, y, y < m ? colors[0] : colors[1]);
      }
      px(m - 2, 3, colors[0]); px(m + 1, 4, colors[1]);
      px(m, m, colors[2]);
    } else if (key === 'iron') {
      for (let y = 5; y < 12; y++) for (let x = 3; x < 14; x++) px(x, y, y < 7 ? colors[0] : colors[1]);
      for (let x = 3; x < 14; x++) px(x, 12, colors[2]);
    } else if (key === 'essence' || key === 'echo') {
      for (let y = 2; y < size - 2; y++) for (let x = 2; x < size - 2; x++) {
        const d = Math.hypot(x - m + 0.5, y - m + 0.5);
        if (d < m - 2) px(x, y, d < m - 4 ? colors[0] : colors[1]);
      }
      px(m - 3, m - 4, '#fff'); px(m - 2, m - 4, '#fff');
      px(m + 2, m + 3, colors[2]);
    }
    return c.toDataURL();
  });
}
export function skillIconURL(skill, size = 22) {
  return cached(`skill:${skill.id}:${size}`, () => {
    const { c, ctx } = makeCanvas(size, size);
    const col = skill.color || '#fff';
    ctx.fillStyle = '#0b0913'; ctx.fillRect(2, 2, size - 4, size - 4);
    ctx.fillStyle = col; ctx.globalAlpha = 0.85;
    ctx.fillRect(2, 2, size - 4, 1); ctx.fillRect(2, size - 3, size - 4, 1);
    ctx.fillRect(2, 2, 1, size - 4); ctx.fillRect(size - 3, 2, 1, size - 4);
    ctx.globalAlpha = 0.18; ctx.fillRect(3, 3, size - 6, size - 6); ctx.globalAlpha = 1;
    const glyph = skill.glyph || '??';
    drawPixelText(ctx, glyph, size / 2, size / 2 - 3, { color: col, align: 'center', shadow: false, scale: 1 });
    if (skill.kind === 'passive') { ctx.fillStyle = '#0b0913'; ctx.fillRect(size - 7, size - 7, 4, 4); ctx.fillStyle = col; ctx.fillRect(size - 6, size - 6, 2, 2); }
    return c.toDataURL();
  });
}

// ── Weapon icons ────────────────────────────────────────────────────────────
export function weaponIconURL(weapon, size = 28) {
  return cached(`wpn:${weapon.id}:${size}`, () => {
    const { c, ctx } = makeCanvas(24, 24);
    const el = ELEMENTS[weapon.element] || ELEMENTS.fire;
    const rar = RARITIES[weapon.rarity] || RARITIES.common;
    const rng = (weapon.spriteSeed || 1) % 1;
    const dark = '#0a0812';
    const metal = weapon.rarity === 'common' ? '#c2cad6' : weapon.rarity === 'rare' ? '#d6e6f5' : '#f0e6cf';
    const shade = weapon.rarity === 'common' ? '#77818f' : weapon.rarity === 'rare' ? '#7fa4c4' : '#a89170';
    const wood = '#6b3f2a', woodLight = '#9c5f3d';
    const px = (x, y, col) => { ctx.fillStyle = col; ctx.fillRect(x, y, 1, 1); };
    const rect = (x, y, w, h, col) => { ctx.fillStyle = col; ctx.fillRect(x, y, w, h); };
    // faint rarity glow background
    if (rar.order >= 2) {
      ctx.globalAlpha = 0.16; ctx.fillStyle = rar.color;
      ctx.beginPath(); ctx.arc(12, 12, 9, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1;
    }
    const t = weapon.type;
    if (t === 'sword' || t === 'dagger') {
      const top = t === 'dagger' ? 7 : 3, bot = t === 'dagger' ? 15 : 17;
      rect(11, top, 3, bot - top, dark); rect(12, top, 1, bot - top, metal); rect(11, top, 1, bot - top, shade);
      rect(8, bot, 9, 2, dark); rect(9, bot, 7, 1, el.light);
      rect(11, bot + 2, 2, 5, dark); rect(11, bot + 2, 1, 4, wood);
      rect(10, bot + 1, 4, 1, '#d6a24b');
      rect(11, bot + 6, 3, 2, dark); rect(12, bot + 6, 1, 1, el.color);
      px(13, top + 1, el.light); px(12, Math.floor((top + bot) / 2), el.color);
    } else if (t === 'axe') {
      rect(12, 4, 2, 18, dark); rect(12, 4, 1, 17, woodLight);
      rect(5, 5, 8, 9, dark); rect(6, 6, 6, 6, metal); rect(6, 6, 2, 6, shade);
      rect(4, 7, 3, 4, dark); rect(5, 7, 2, 4, el.color);
      rect(13, 7, 4, 5, dark); rect(14, 8, 3, 3, el.light);
      px(13, 19, '#d6a24b');
    } else if (t === 'spear') {
      rect(11, 5, 2, 18, dark); rect(11, 6, 1, 16, woodLight);
      for (let y = 1; y < 8; y++) {
        const w = Math.max(1, 4 - Math.abs(y - 4));
        rect(12 - w, y, w * 2, 1, dark);
        rect(12 - w + 1, y, Math.max(1, w * 2 - 2), 1, y < 4 ? metal : el.color);
      }
      rect(9, 17, 6, 2, dark); rect(10, 17, 4, 1, '#d6a24b');
      px(12, 5, el.light);
    } else if (t === 'bow') {
      for (let y = 3; y < 21; y++) {
        const x = 6 + Math.round(Math.sin((y - 3) / 18 * Math.PI) * 6);
        px(x + 1, y, dark); px(x, y, woodLight);
        px(x + 2, y, shade);
      }
      for (let y = 4; y < 20; y++) px(13, y, y % 3 === 0 ? '#e8e2d0' : '#b9b2a0');
      rect(10, 3, 6, 2, dark); rect(11, 4, 4, 1, el.color);
      px(12, 12, el.light); px(12, 13, '#d6a24b');
    } else if (t === 'staff') {
      rect(11, 7, 2, 16, dark); rect(11, 8, 1, 14, woodLight);
      for (let y = -4; y <= 4; y++) for (let x = -4; x <= 4; x++) {
        const d = Math.hypot(x, y);
        if (d < 4) { ctx.fillStyle = d < 2 ? el.light : d < 3.2 ? el.color : '#0a0812'; ctx.fillRect(12 + x, 6 + y, 1, 1); }
      }
      px(10, 5, '#fff'); px(14, 8, el.color);
      rect(9, 20, 6, 2, dark); rect(10, 20, 4, 1, '#d6a24b');
    } else if (t === 'gun') {
      rect(3, 8, 17, 5, dark); rect(4, 9, 15, 3, metal); rect(4, 11, 15, 1, shade);
      rect(16, 5, 5, 4, dark); rect(17, 6, 3, 2, el.color);
      rect(13, 13, 4, 8, dark); rect(14, 13, 2, 7, wood);
      rect(15, 14, 2, 5, woodLight);
      rect(3, 7, 3, 7, dark); rect(4, 8, 1, 5, el.light);
      px(19, 9, '#fff');
    } else if (t === 'tome') {
      rect(5, 5, 15, 15, dark); rect(6, 6, 13, 13, '#3a2440');
      rect(11, 6, 2, 13, '#d6a24b');
      rect(6, 6, 4, 13, '#4b2e54'); rect(14, 6, 5, 13, '#4b2e54');
      const rune = weapon.element === 'dark' ? '#d9c2ff' : el.light;
      px(8, 9, rune); px(9, 10, rune); px(8, 11, rune); px(8, 10, el.color);
      px(15, 9, rune); px(16, 10, rune); px(15, 11, rune);
      rect(6, 4, 13, 2, dark); rect(7, 4, 11, 1, rar.color);
    }
    // rarity gem
    ctx.fillStyle = dark; ctx.fillRect(18, 18, 5, 5);
    ctx.fillStyle = rar.color; ctx.fillRect(19, 19, 3, 3);
    ctx.fillStyle = rar.glow; ctx.fillRect(20, 20, 1, 1);
    return c.toDataURL();
  });
}

// ── Pixel primitives ────────────────────────────────────────────────────────
export function drawShadow(ctx, x, y, rx, ry, alpha = 0.35) {
  ctx.save(); ctx.globalAlpha = alpha; ctx.fillStyle = '#05040a';
  ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
}
export function drawGlow(ctx, x, y, r, color, alpha = 0.5) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, color); g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.save(); ctx.globalAlpha = alpha; ctx.globalCompositeOperation = 'lighter';
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); ctx.restore();
}
export function px(ctx, x, y, color, w = 1, h = 1) { ctx.fillStyle = color; ctx.fillRect(Math.round(x), Math.round(y), w, h); }

// ── Knight ──────────────────────────────────────────────────────────────────
const KNIGHT = {
  outline: '#0a0812', armor: '#c4ccd8', armorLight: '#eff4f8', armorShade: '#77828f',
  cloth: '#7a2638', clothLight: '#b84052', clothDark: '#4a1522', gold: '#e8b95c',
  skin: '#d9a06b', visor: '#65e0ff', steel: '#9aa6b5', leather: '#5a3a2c',
};
export function drawKnight(ctx, x, y, opts = {}) {
  const t = opts.time || 0;
  const moving = opts.moving ? 1 : 0;
  const dir = opts.dir || 'down';
  const flash = opts.flash ? 0.8 : 0;
  const bob = moving ? Math.round(Math.sin(t * 13) * 1.2) : Math.round(Math.sin(t * 2.4) * 0.5);
  const step = moving ? Math.sin(t * 13) : 0;
  const P = { ...KNIGHT };
  if (flash) for (const k of ['armor', 'armorLight', 'armorShade', 'cloth', 'clothLight', 'steel']) P[k] = '#ffffff';
  const ox = Math.round(x - 12), oy = Math.round(y - 27 + bob);
  const R = (dx, dy, w, h, col) => px(ctx, ox + dx, oy + dy, col, w, h);
  // shadow & cape
  drawShadow(ctx, x, y + 6, 10, 3.4, 0.4);
  if (dir !== 'up') {
    R(4, 13, 16, 13, P.outline);
    R(5, 14, 14, 12, P.clothDark);
    R(6, 15, 12, 9, P.cloth);
    R(7, 16, 4, 8, P.clothLight);
    R(6, 23, 12, 3, P.outline);
  }
  // legs
  const legLift = Math.round(step * 2);
  R(7, 27, 4, 8, P.outline); R(13, 27, 4, 8, P.outline);
  R(8, 27 + Math.max(0, legLift), 2, 7, P.steel); R(14, 27 + Math.max(0, -legLift), 2, 7, P.steel);
  R(7, 33, 4, 2, '#2a2028'); R(13, 33, 4, 2, '#2a2028');
  // torso
  R(6, 16, 12, 12, P.outline);
  R(7, 17, 10, 10, P.armorShade);
  R(8, 17, 8, 9, P.armor);
  R(9, 18, 4, 5, P.armorLight);
  R(8, 24, 8, 2, P.gold);
  R(11, 19, 2, 7, P.armorShade);
  // shoulders
  R(4, 16, 4, 5, P.outline); R(5, 17, 3, 3, P.armor);
  R(16, 16, 4, 5, P.outline); R(16, 17, 3, 3, P.armor);
  // arms
  R(4, 20, 3, 7, P.outline); R(5, 21, 1, 5, P.armorShade);
  R(17, 20, 3, 7, P.outline); R(18, 21, 1, 5, P.armorShade);
  // helmet
  R(7, 6, 10, 10, P.outline);
  R(8, 7, 8, 8, P.armor);
  R(9, 7, 5, 2, P.armorLight);
  R(8, 12, 8, 3, P.armorShade);
  if (dir === 'up') {
    R(8, 8, 8, 6, P.armorShade);
  } else {
    R(9, 10, 6, 2, P.outline);
    R(10, 10, 1, 1, P.visor); R(13, 10, 1, 1, P.visor);
    R(8, 10, 1, 2, P.armorLight); R(15, 10, 1, 2, P.armorShade);
  }
  // plume
  R(12, 3, 3, 4, P.outline);
  R(13, 2, 2, 4, P.clothLight);
  R(14, 1, 2, 3, P.cloth);
  // shield arm (left)
  R(2, 20, 4, 8, P.outline);
  R(2, 21, 3, 6, P.gold);
  R(3, 22, 2, 4, P.armorShade);
  R(3, 23, 1, 2, P.visor);
  // weapon hand
  R(18, 22, 3, 3, P.leather);
  return { handX: x + 8, handY: y - 2 + bob, headY: y - 22 + bob };
}

export function drawHeldWeapon(ctx, weapon, x, y, angle, scale = 1, swing = 0) {
  if (!weapon) return;
  const el = ELEMENTS[weapon.element] || ELEMENTS.fire;
  const rar = RARITIES[weapon.rarity] || RARITIES.common;
  ctx.save();
  ctx.translate(x, y); ctx.rotate(angle + swing); ctx.scale(scale, scale);
  const blade = rar.order >= 2 ? el.light : '#d7dee8';
  if (weapon.kind === 'melee') {
    const len = weapon.type === 'spear' ? 38 : weapon.type === 'dagger' ? 16 : weapon.type === 'axe' ? 24 : 27;
    ctx.fillStyle = '#0a0812'; ctx.fillRect(2, -2, len + 2, 4);
    ctx.fillStyle = '#6b3f2a'; ctx.fillRect(0, -1, 8, 2);
    if (weapon.type === 'axe') {
      ctx.fillStyle = blade; ctx.fillRect(20, -7, 10, 13);
      ctx.fillStyle = el.color; ctx.fillRect(2, 0, 3, 2);
    } else {
      ctx.fillStyle = blade; ctx.fillRect(7, -1, len, 2);
      ctx.fillStyle = el.color; ctx.fillRect(len - 5, 0, 4, 1);
      if (weapon.type === 'spear') { ctx.fillStyle = blade; ctx.fillRect(len, -2, 4, 5); }
    }
    ctx.fillStyle = '#e8b95c'; ctx.fillRect(6, -3, 2, 6);
  } else {
    ctx.fillStyle = '#6b3f2a'; ctx.fillRect(0, -1, 22, 3);
    ctx.fillStyle = el.light; ctx.fillRect(16, -3, 5, 7);
    ctx.fillStyle = el.color; ctx.fillRect(21, -1, 3, 3);
  }
  ctx.restore();
}

// ── Enemies ─────────────────────────────────────────────────────────────────
const ENEMY_OUTLINE = '#08060c';
export function drawEnemy(ctx, e, time) {
  const x = Math.round(e.x), y = Math.round(e.y);
  drawShadow(ctx, x, y + e.size[1] * 0.36, e.size[0] * 0.42, 3, 0.35);
  const el = ELEMENTS[e.element] || ELEMENTS.dark;
  const flash = e.hitFlash > 0;
  const P = { body: e.palette.body, shade: e.palette.shade, eye: flash ? '#fff' : el.light, accent: el.color, outline: ENEMY_OUTLINE };
  if (flash) { P.body = '#fff'; P.shade = '#fff'; P.accent = '#fff'; }
  const ox = x - Math.round(e.size[0] / 2), oy = Math.round(y - e.size[1] * 0.75);
  const R = (dx, dy, w, h, col) => px(ctx, ox + dx, oy + dy, col, w, h);
  const bob = Math.round(Math.sin(time * (e.behavior === 'bat' ? 12 : 4) + e.seed) * 1.2);
  switch (e.kind) {
    case 'husk': {
      R(4, 4, 13, 18, P.outline);
      R(5, 6, 11, 15, P.body);
      R(7, 7, 5, 4, P.shade);
      R(6, 9, 2, 2, P.eye); R(12, 9, 2, 2, P.eye);
      R(8, 15, 5, 2, P.outline);
      R(3, 18, 5, 6, P.outline); R(14, 18, 5, 6, P.outline);
      R(4, 19, 3, 4, P.shade); R(15, 19, 3, 4, P.shade);
      R(0, 13, 4, 6, P.outline); R(17, 13, 4, 6, P.outline);
      break;
    }
    case 'bat': {
      const flap = Math.round(Math.sin(time * 14 + e.seed) * 4);
      R(2, 5 + flap, 6, 4, P.outline); R(0, 7 + flap, 3, 3, P.accent);
      R(14, 5 + flap, 6, 4, P.outline); R(19, 7 + flap, 3, 3, P.accent);
      R(5, 7, 12, 9, P.outline); R(6, 8, 10, 7, P.body);
      R(7, 9, 2, 2, P.eye); R(13, 9, 2, 2, P.eye);
      R(7, 3, 2, 3, P.outline); R(13, 3, 2, 3, P.outline);
      break;
    }
    case 'archer': {
      R(5, 4, 12, 8, P.outline); R(6, 5, 10, 6, '#d7d1bd');
      R(8, 7, 2, 2, P.outline); R(13, 7, 2, 2, P.outline);
      R(8, 11, 6, 2, P.outline);
      R(4, 13, 14, 12, P.outline); R(5, 14, 12, 10, P.body);
      R(8, 14, 2, 9, '#d7d1bd'); R(12, 14, 2, 9, '#d7d1bd');
      R(4, 25, 4, 4, P.outline); R(14, 25, 4, 4, P.outline);
      // bow
      R(17, 9, 2, 16, '#6b3f2a');
      for (let i = 0; i < 16; i++) px(ctx, ox + 19 + (i % 2), oy + 9 + i, '#cfc9b8');
      break;
    }
    case 'charger': {
      R(2, 9, 20, 11, P.outline); R(3, 10, 18, 9, P.body);
      R(1, 6, 8, 6, P.outline); R(2, 7, 6, 4, P.body);
      R(2, 8, 2, 2, P.eye); R(6, 8, 2, 2, P.eye);
      R(3, 4, 2, 4, P.outline); R(8, 4, 2, 4, P.outline);
      R(4, 20, 3, 5, P.outline); R(16, 20, 3, 5, P.outline);
      R(0, 12, 4, 2, P.accent); R(20, 12, 4, 2, P.accent);
      break;
    }
    case 'bomber': {
      R(3, 6, 13, 12, P.outline); R(4, 7, 11, 10, P.body);
      R(5, 8, 4, 3, P.shade); R(7, 10, 2, 2, P.eye); R(11, 10, 2, 2, P.eye);
      R(8, 3, 2, 4, '#6b3f2a');
      const spark = Math.sin(time * 20) > 0 ? P.accent : '#fff';
      px(ctx, ox + 9, oy + 2, spark, 2, 2);
      R(4, 18, 3, 3, P.outline); R(13, 18, 3, 3, P.outline);
      break;
    }
    case 'mage': {
      R(4, 5, 13, 7, P.outline); R(5, 6, 11, 5, P.body);
      R(3, 12, 15, 15, P.outline); R(4, 13, 13, 13, P.body);
      R(6, 9, 2, 2, P.eye); R(13, 9, 2, 2, P.eye);
      R(4, 22, 13, 2, P.accent);
      R(16, 5, 2, 24, '#3c2c46');
      R(15, 2, 4, 4, P.accent);
      px(ctx, ox + 16, oy + 1, '#fff', 2, 1);
      break;
    }
    case 'brute': {
      R(3, 3, 24, 20, P.outline); R(4, 4, 22, 18, P.body);
      R(6, 6, 7, 6, P.shade); R(18, 6, 6, 6, P.shade);
      R(8, 10, 4, 3, P.eye); R(18, 10, 4, 3, P.eye);
      R(10, 17, 10, 3, P.outline);
      R(5, 23, 8, 8, P.outline); R(17, 23, 8, 8, P.outline);
      R(6, 24, 6, 6, P.shade); R(18, 24, 6, 6, P.shade);
      R(0, 12, 5, 12, P.outline); R(25, 12, 5, 12, P.outline);
      R(24, 8, 3, 4, P.accent);
      break;
    }
    case 'wraith': {
      const float = Math.round(Math.sin(time * 3 + e.seed) * 2);
      R(4, 4 + float, 14, 12, P.outline); R(5, 5 + float, 12, 10, P.body);
      R(6, 18 + float, 10, 8, P.outline); R(4, 20 + float, 14, 6, P.body);
      R(7, 8 + float, 2, 2, P.eye); R(13, 8 + float, 2, 2, P.eye);
      R(3, 3 + float, 3, 3, P.accent); R(16, 3 + float, 3, 3, P.accent);
      break;
    }
  }
  if (e.stun > 0) {
    const sy = oy - 7 + Math.round(Math.sin(time * 8) * 2);
    drawPixelText(ctx, '!', x, sy, { color: '#ffe14d', scale: 1, align: 'center' });
  }
}

// ── Bosses ──────────────────────────────────────────────────────────────────
export function drawBoss(ctx, b, time) {
  const x = Math.round(b.x), y = Math.round(b.y);
  const def = b.def;
  const flash = b.hitFlash > 0;
  const P = { body: flash ? '#fff' : def.color, shade: flash ? '#fff' : shadeColor(def.color, -0.45), accent: flash ? '#fff' : def.accent, outline: '#08060c' };
  const float = Math.round(Math.sin(time * 2.2) * 2);
  drawShadow(ctx, x, y + 22, 30, 7, 0.44);
  const R = (dx, dy, w, h, col) => px(ctx, x + dx, y + dy, col, w, h);
  switch (def.id) {
    case 'cinder': {
      R(-20, -30, 40, 54, P.outline);
      R(-18, -28, 36, 50, P.body);
      R(-12, -24, 24, 30, P.shade);
      R(-11, -20, 8, 6, P.accent); R(3, -20, 8, 6, P.accent);
      R(-6, -10, 12, 4, '#2a1010');
      R(-14, 22, 10, 10, P.outline); R(4, 22, 10, 10, P.outline);
      // horns
      R(-18, -38, 5, 12, P.outline); R(-14, -42, 4, 8, P.accent);
      R(13, -38, 5, 12, P.outline); R(10, -42, 4, 8, P.accent);
      // sword
      R(24, -30, 6, 40, P.outline); R(25, -32, 4, 42, '#ffce7a'); R(26, -28, 2, 34, '#fff2c0');
      R(18, -30, 16, 4, P.outline);
      // flame aura
      for (let i = 0; i < 10; i++) {
        const a = time * 2 + i * 0.7;
        const fx = Math.cos(a) * (22 + Math.sin(time * 3 + i) * 4);
        const fy = Math.sin(a) * (26 + Math.cos(time * 2 + i) * 4) - 4;
        px(ctx, x + fx, y + fy + float, i % 2 ? '#ff7b3a' : '#ffd27a', 2, 2);
      }
      break;
    }
    case 'glacier': {
      // floating crystals
      for (let i = 0; i < 8; i++) {
        const a = time * 0.8 + i * 0.785;
        const cx = Math.cos(a) * 27, cy = Math.sin(a) * 20 - 6;
        R(cx - 1, cy - 4, 3, 8, '#bff6ff'); R(cx, cy - 5, 1, 4, '#fff');
      }
      R(-17, -26, 34, 48, P.outline);
      R(-15, -24, 30, 44, P.body);
      R(-10, -20, 20, 20, P.shade);
      R(-9, -16, 5, 4, '#ffffff'); R(4, -16, 5, 4, '#ffffff');
      R(-6, -6, 12, 3, '#1d3c4a');
      // crown
      for (let i = -2; i <= 2; i++) { R(i * 7 - 2, -35 - Math.abs(i) * 2, 4, 9 + Math.abs(i) * 2, P.accent); }
      // ice shards
      R(-27, -12, 4, 18, '#bff6ff'); R(23, -8, 4, 16, '#d4fbff');
      break;
    }
    case 'treant': {
      R(-22, -24, 44, 48, P.outline);
      R(-20, -22, 40, 44, P.body);
      R(-14, -18, 28, 20, P.shade);
      R(-9, -14, 6, 5, '#ffe14d'); R(3, -14, 6, 5, '#ffe14d');
      R(-6, -2, 12, 4, '#1a0f12');
      // branches
      R(-30, -38, 6, 18, P.outline); R(-34, -44, 18, 5, P.outline);
      R(24, -34, 6, 16, P.outline); R(20, -42, 16, 5, P.outline);
      // leaves
      for (let i = 0; i < 12; i++) {
        const a = i / 12 * Math.PI * 2 + time * 0.2;
        px(ctx, x + Math.cos(a) * 32, y - 26 + Math.sin(a) * 14, i % 2 ? '#8cf07a' : '#4f9e44', 3, 2);
      }
      R(-18, 24, 12, 8, P.outline); R(6, 24, 12, 8, P.outline);
      break;
    }
    case 'hollow': {
      // cape
      for (let y2 = -18; y2 < 28; y2++) {
        const w = 24 + Math.max(0, y2 + 18) * 0.25;
        px(ctx, x - w, y + y2 + float, '#1a1230', w * 2, 1);
      }
      R(-15, -28, 30, 46, P.outline);
      R(-13, -26, 26, 42, P.body);
      R(-9, -22, 18, 18, P.shade);
      R(-7, -17, 5, 4, '#f0dcff'); R(3, -17, 5, 4, '#f0dcff');
      for (let i = -2; i <= 2; i++) R(i * 6 - 2, -36 - Math.abs(i) * 2, 4, 10 + Math.abs(i) * 2, P.accent);
      // floating void orb
      const orbR = 6 + Math.sin(time * 3) * 1.5;
      for (let a = 0; a < 24; a++) {
        const ang = a / 24 * Math.PI * 2 + time;
        px(ctx, x + 23 + Math.cos(ang) * orbR, y + 2 + Math.sin(ang) * orbR, a % 2 ? '#b07bff' : '#f0dcff', 2, 2);
      }
      break;
    }
  }
  if (b.stun > 0) drawPixelText(ctx, 'STAGGER', x, y - 46, { color: '#ffe14d', align: 'center', scale: 1 });
}

function shadeColor(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  r = Math.round(Math.min(255, Math.max(0, r + 255 * amt)));
  g = Math.round(Math.min(255, Math.max(0, g + 255 * amt)));
  b = Math.round(Math.min(255, Math.max(0, b + 255 * amt)));
  return `rgb(${r},${g},${b})`;
}

// ── Props ───────────────────────────────────────────────────────────────────
export function drawChest(ctx, x, y, opened, time) {
  const wood = '#7a4a2c', woodL = '#a86a3f', gold = '#e8b95c';
  drawShadow(ctx, x, y + 11, 12, 3.5, 0.4);
  if (opened) {
    px(ctx, x - 12, y - 2, '#0a0812', 24, 14);
    px(ctx, x - 10, y, wood, 20, 10);
    px(ctx, x - 10, y - 9, '#0a0812', 20, 9);
    px(ctx, x - 9, y - 8, woodL, 18, 7);
    px(ctx, x - 2, y - 8, gold, 4, 2);
  } else {
    px(ctx, x - 12, y - 6, '#0a0812', 24, 18);
    px(ctx, x - 10, y - 4, wood, 20, 14);
    px(ctx, x - 10, y - 4, woodL, 20, 5);
    px(ctx, x - 1, y - 4, gold, 3, 12);
    px(ctx, x - 5, y + 1, gold, 10, 2);
    px(ctx, x - 2, y + 1, '#5a3a1a', 4, 4);
    if (Math.sin(time * 4) > 0.6) drawGlow(ctx, x, y - 4, 14, '#ffd86b', 0.35);
  }
}
export function drawShrine(ctx, x, y, time, used) {
  drawShadow(ctx, x, y + 12, 14, 4, 0.4);
  px(ctx, x - 10, y - 4, '#0a0812', 20, 18);
  px(ctx, x - 8, y - 2, '#5a6474', 16, 14);
  px(ctx, x - 6, y, '#7a8698', 12, 10);
  px(ctx, x - 8, y + 10, '#414a58', 16, 4);
  const glow = used ? '#4a4252' : '#8cf07a';
  px(ctx, x - 2, y - 14, '#0a0812', 4, 12);
  if (!used) {
    const pulse = 0.35 + Math.sin(time * 3) * 0.15;
    drawGlow(ctx, x, y - 15, 16, glow, pulse);
    px(ctx, x - 3, y - 18, glow, 6, 6);
    px(ctx, x - 1, y - 20, '#fff', 2, 2);
  } else {
    px(ctx, x - 2, y - 14, '#3a3345', 4, 10);
  }
}
export function drawPortal(ctx, x, y, time, color = '#b07bff') {
  drawShadow(ctx, x, y + 18, 20, 5, 0.4);
  px(ctx, x - 16, y - 6, '#0a0812', 32, 28);
  px(ctx, x - 14, y - 4, '#3a2f52', 28, 24);
  for (let i = 0; i < 3; i++) {
    const r = 10 - i * 2.5 + Math.sin(time * 3 + i) * 1.2;
    ctx.save(); ctx.strokeStyle = i === 0 ? color : i === 1 ? '#e0c7ff' : '#fff';
    ctx.globalAlpha = 0.8 - i * 0.2; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.ellipse(x, y + 6, r * 0.7, r, 0, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
  }
  for (let i = 0; i < 6; i++) {
    const a = time * 2 + i * 1.05;
    px(ctx, x + Math.cos(a) * 8, y + 6 + Math.sin(a) * 12, i % 2 ? color : '#fff', 1, 1);
  }
  drawGlow(ctx, x, y + 6, 24, color, 0.3);
}
export function drawPotion(ctx, x, y, type, time) {
  const col = type === 'mp' ? '#57b8ff' : '#ff5f6d';
  drawShadow(ctx, x, y + 7, 5, 2, 0.35);
  const bob = Math.round(Math.sin(time * 3 + x) * 1);
  px(ctx, x - 3, y - 7 + bob, '#0a0812', 7, 11);
  px(ctx, x - 2, y - 5 + bob, col, 5, 8);
  px(ctx, x - 2, y - 8 + bob, '#d9c8a0', 5, 3);
  px(ctx, x - 1, y - 10 + bob, '#e8b95c', 3, 2);
  px(ctx, x - 1, y - 3 + bob, '#fff', 1, 2);
}
export function drawCoin(ctx, x, y, time) {
  const bob = Math.round(Math.sin(time * 4 + x * 0.3) * 1.5);
  drawGlow(ctx, x, y + bob, 7, '#ffd86b', 0.25);
  px(ctx, x - 3, y - 3 + bob, '#8a4b13', 7, 7);
  px(ctx, x - 2, y - 2 + bob, '#ffd86b', 5, 5);
  px(ctx, x - 1, y - 1 + bob, '#fff2b0', 2, 2);
}
export function drawMaterial(ctx, x, y, kind, time) {
  const colors = { iron: '#b8c2cf', essence: '#b478ff', crystal: '#7de8ff' };
  const col = colors[kind] || '#b8c2cf';
  const bob = Math.round(Math.sin(time * 3 + x * 0.2) * 1.5);
  drawGlow(ctx, x, y + bob, 8, col, 0.28);
  px(ctx, x - 3, y - 3 + bob, '#0a0812', 7, 7);
  px(ctx, x - 2, y - 2 + bob, col, 5, 5);
  px(ctx, x - 1, y - 1 + bob, '#fff', 2, 2);
}

// biome accents used by renderer
export function biomeAccent(biomeId) { return BIOMES[biomeId]?.palette.accent || '#ffb05a'; }
