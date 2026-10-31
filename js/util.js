// ── Soul Knight Prequel: Adventure ───────────────────────────────────────────
// Small, dependency-free helpers shared by every module.

export const TAU = Math.PI * 2;

export function clamp(v, min, max) { return v < min ? min : v > max ? max : v; }
export function lerp(a, b, t) { return a + (b - a) * t; }
export function invLerp(a, b, v) { return clamp((v - a) / (b - a), 0, 1); }
export function dist(ax, ay, bx, by) { return Math.hypot(bx - ax, by - ay); }
export function dist2(ax, ay, bx, by) { const dx = bx - ax, dy = by - ay; return dx * dx + dy * dy; }
export function angleTo(ax, ay, bx, by) { return Math.atan2(by - ay, bx - ax); }
export function angleDiff(a, b) { let d = (a - b) % TAU; if (d > Math.PI) d -= TAU; if (d < -Math.PI) d += TAU; return d; }
export function approachAngle(a, b, step) { const d = angleDiff(b, a); return a + clamp(d, -step, step); }
export function randRange(rng, a, b) { return a + rng() * (b - a); }
export function randInt(rng, a, b) { return Math.floor(a + rng() * (b - a + 1)); }
export function pick(rng, arr) { return arr[Math.floor(rng() * arr.length)]; }
export function pickWeighted(rng, entries) {
  let total = 0;
  for (const e of entries) total += e.w;
  let roll = rng() * total;
  for (const e of entries) { roll -= e.w; if (roll <= 0) return e; }
  return entries[entries.length - 1];
}
export function shuffle(rng, arr) {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [out[i], out[j]] = [out[j], out[i]]; }
  return out;
}
export function hashString(str) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
export function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export function rngFrom(...parts) { return mulberry32(hashString(parts.join('|'))); }
export function fmt(n) {
  n = Math.floor(n);
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(n >= 10_000_000 ? 0 : 1).replace('.0', '') + 'M';
  if (n >= 10_000) return (n / 1000).toFixed(n >= 100_000 ? 0 : 1).replace('.0', '') + 'K';
  return String(n);
}
export function shortTime(sec) {
  const m = Math.floor(sec / 60), s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}
export function uid(prefix = 'id') { return `${prefix}_${Math.random().toString(36).slice(2, 9)}`; }
export function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
export function pointInRect(x, y, r) { return x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h; }
export function circleRect(cx, cy, cr, r) {
  const nx = clamp(cx, r.x, r.x + r.w);
  const ny = clamp(cy, r.y, r.y + r.h);
  return dist2(cx, cy, nx, ny) <= cr * cr;
}
export function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }
export function easeInOutQuad(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }
export function roman(n) {
  const map = [[10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
  let out = '';
  for (const [v, s] of map) while (n >= v) { out += s; n -= v; }
  return out || 'I';
}
export function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

export class Emitter {
  constructor() { this.map = new Map(); }
  on(evt, fn) { if (!this.map.has(evt)) this.map.set(evt, new Set()); this.map.get(evt).add(fn); return () => this.off(evt, fn); }
  off(evt, fn) { this.map.get(evt)?.delete(fn); }
  emit(evt, ...args) { for (const fn of this.map.get(evt) || []) { try { fn(...args); } catch (e) { console.error(e); } } }
}

export const Keybinds = {
  UP: ['KeyW', 'ArrowUp'],
  DOWN: ['KeyS', 'ArrowDown'],
  LEFT: ['KeyA', 'ArrowLeft'],
  RIGHT: ['KeyD', 'ArrowRight'],
  ATTACK: ['Space', 'KeyJ'],
  DODGE: ['ShiftLeft', 'ShiftRight', 'KeyK'],
  SKILL1: ['KeyQ'],
  SKILL2: ['KeyE'],
  POTION_HP: ['Digit1'],
  POTION_MP: ['Digit2'],
  PAUSE: ['Escape', 'KeyP'],
  INTERACT: ['KeyF', 'Enter'],
};
