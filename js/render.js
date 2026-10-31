// ── Renderer: title, town, dungeon rooms, dynamic lighting, ambience ────────
import { VIEW_W, VIEW_H, BIOMES, BOSSES, ELEMENTS, RARITIES } from './data.js';
import { TAU, clamp, dist, rngFrom, easeInOutQuad } from './util.js';
import { drawPixelText, drawKnight, drawShadow, drawGlow, px, drawBoss, drawChest, drawShrine, drawPortal, drawPotion, drawCoin, drawMaterial } from './pixel.js';
import { TILE } from './world.js';

// ── Public hotspots (world-space) ───────────────────────────────────────────
export const TOWN_HOTSPOTS = [
  { id: 'gate', name: 'Dungeon Gate', label: 'ENTER DUNGEON', x: 240, y: 130, r: 32, color: '#b07bff' },
  { id: 'forge', name: 'Forge', label: 'FORGE & ARSENAL', x: 88, y: 140, r: 34, color: '#ff9b4a' },
  { id: 'shop', name: 'Merchant', label: 'MERCHANT', x: 396, y: 140, r: 34, color: '#ffd86b' },
  { id: 'skills', name: 'Skill Shrine', label: 'SKILLS & STATS', x: 156, y: 192, r: 26, color: '#6db8ff' },
  { id: 'codex', name: 'Codex', label: 'WEAPON CODEX', x: 388, y: 194, r: 28, color: '#8ef0c8' },
  { id: 'echo', name: 'Echo Obelisk', label: 'ECHO OBELISK', x: 318, y: 138, r: 26, color: '#c78cff' },
];
export const TOWN_COLLIDERS = [
  { x: 240, y: 172, r: 25, kind: 'fountain' },
  { x: 156, y: 190, r: 11, kind: 'shrine' },
  { x: 388, y: 192, r: 18, kind: 'stall' },
  { x: 318, y: 130, r: 10, kind: 'obelisk' },
];
export const TOWN_BOUNDS = { x: 16, y: 126, w: VIEW_W - 32, h: 126 };

// ── Title scene ─────────────────────────────────────────────────────────────
let titleBase = null;
function buildTitleBase() {
  const c = document.createElement('canvas'); c.width = VIEW_W; c.height = VIEW_H;
  const x = c.getContext('2d'); x.imageSmoothingEnabled = false;
  const rng = rngFrom('title-bg');
  // sky
  const sky = x.createLinearGradient(0, 0, 0, 190);
  sky.addColorStop(0, '#0a0716'); sky.addColorStop(0.45, '#1d1233'); sky.addColorStop(0.72, '#48213b'); sky.addColorStop(1, '#8a3b3f');
  x.fillStyle = sky; x.fillRect(0, 0, VIEW_W, VIEW_H);
  // stars
  for (let i = 0; i < 90; i++) {
    const sx = rng() * VIEW_W, sy = rng() * 150;
    x.globalAlpha = 0.2 + rng() * 0.7; x.fillStyle = rng() < 0.2 ? '#ffd8a0' : '#cfd8ff'; x.fillRect(Math.round(sx), Math.round(sy), rng() < 0.2 ? 2 : 1, 1);
  }
  x.globalAlpha = 1;
  // shattered moon
  const mx = 366, my = 52;
  const halo = x.createRadialGradient(mx, my, 4, mx, my, 60);
  halo.addColorStop(0, 'rgba(255,224,190,0.34)'); halo.addColorStop(1, 'rgba(255,224,190,0)');
  x.fillStyle = halo; x.beginPath(); x.arc(mx, my, 60, 0, TAU); x.fill();
  x.fillStyle = '#f4e4c8'; x.beginPath(); x.arc(mx, my, 19, 0, TAU); x.fill();
  x.fillStyle = '#c9b394'; x.beginPath(); x.arc(mx + 5, my + 3, 15, 0, TAU); x.fill();
  x.fillStyle = '#f4e4c8'; x.beginPath(); x.arc(mx - 2, my - 2, 17, 0, TAU); x.fill();
  // crack
  x.strokeStyle = '#3a2540'; x.lineWidth = 1; x.beginPath(); x.moveTo(mx - 14, my - 12); x.lineTo(mx - 4, my - 2); x.lineTo(mx - 9, my + 7); x.lineTo(mx + 2, my + 14); x.stroke();
  // time loop ring
  x.save(); x.translate(240, 84); x.rotate(-0.18);
  for (let i = 0; i < 3; i++) {
    x.strokeStyle = i === 0 ? 'rgba(255,214,160,0.28)' : 'rgba(180,140,255,0.18)'; x.lineWidth = i === 0 ? 2 : 1;
    x.beginPath(); x.ellipse(0, 0, 100 + i * 14, 33 + i * 5, 0, 0, TAU); x.stroke();
  }
  for (let i = 0; i < 20; i++) {
    const a = i / 20 * TAU; x.fillStyle = i % 3 === 0 ? '#e8b95c' : 'rgba(200,180,255,0.5)';
    x.fillRect(Math.cos(a) * 100 - 1, Math.sin(a) * 33 - 1, 2, 2);
  }
  x.restore();
  // far mountains
  const mountain = (baseY, color, amp, seed) => {
    x.fillStyle = color; x.beginPath(); x.moveTo(0, VIEW_H);
    for (let i = 0; i <= VIEW_W; i += 8) {
      const y = baseY - Math.abs(Math.sin(i * 0.013 + seed)) * amp - Math.abs(Math.sin(i * 0.041 + seed * 3)) * amp * 0.45;
      x.lineTo(i, y);
    }
    x.lineTo(VIEW_W, VIEW_H); x.closePath(); x.fill();
  };
  mountain(170, '#24162e', 32, 1.2);
  mountain(188, '#191020', 22, 3.4);
  // castle silhouette
  x.fillStyle = '#120c1a';
  const castleY = 138;
  x.fillRect(205, castleY - 42, 70, 60);
  x.fillRect(196, castleY - 26, 12, 44); x.fillRect(272, castleY - 26, 12, 44);
  x.fillRect(186, castleY - 38, 8, 56); x.fillRect(286, castleY - 38, 8, 56);
  // towers/tips
  for (const [tx, ty, w, h] of [[186, castleY - 52, 8, 16], [286, castleY - 52, 8, 16], [205, castleY - 58, 10, 18], [265, castleY - 58, 10, 18], [236, castleY - 66, 8, 20]]) {
    x.beginPath(); x.moveTo(tx - 3, ty + h); x.lineTo(tx + w / 2, ty); x.lineTo(tx + w + 3, ty + h); x.closePath(); x.fill();
  }
  // windows
  x.fillStyle = '#ff9b4a';
  for (const [wx, wy] of [[214, 106], [232, 100], [252, 110], [270, 114], [194, 112], [290, 112]]) { x.globalAlpha = 0.7; x.fillRect(wx, wy, 3, 5); }
  x.globalAlpha = 1;
  // town silhouette foreground
  x.fillStyle = '#0d0913';
  for (let i = 0; i < 12; i++) {
    const bw = 18 + rng() * 30, bh = 16 + rng() * 34, bx = i * 42 - 10, by = 206 - bh;
    x.fillRect(bx, by, bw, bh);
    x.beginPath(); x.moveTo(bx - 3, by); x.lineTo(bx + bw / 2, by - 9); x.lineTo(bx + bw + 3, by); x.closePath(); x.fill();
    if (rng() < 0.7) { x.fillStyle = 'rgba(255,166,80,0.55)'; x.fillRect(bx + 5, by + 8, 3, 4); x.fillStyle = '#0d0913'; }
  }
  // cliff
  const cliff = x.createLinearGradient(0, 205, 0, 270);
  cliff.addColorStop(0, '#1c1520'); cliff.addColorStop(1, '#0b0810');
  x.fillStyle = cliff; x.beginPath(); x.moveTo(0, 214);
  for (let i = 0; i <= VIEW_W; i += 10) x.lineTo(i, 214 + Math.sin(i * 0.05) * 4 + Math.sin(i * 0.11) * 2);
  x.lineTo(VIEW_W, VIEW_H); x.lineTo(0, VIEW_H); x.closePath(); x.fill();
  // grass tufts
  for (let i = 0; i < 60; i++) { const gx = rng() * VIEW_W, gy = 218 + rng() * 50; x.fillStyle = rng() < 0.5 ? '#2b2b26' : '#3a3730'; x.fillRect(Math.round(gx), Math.round(gy), 1, 3); }
  // sword in stone
  const sx = 116, sy = 226;
  x.fillStyle = '#0a0812'; x.fillRect(sx - 3, sy - 26, 6, 30); x.fillRect(sx - 8, sy - 10, 16, 4);
  x.fillStyle = '#b9c2cf'; x.fillRect(sx - 1, sy - 24, 2, 18);
  x.fillStyle = '#e8b95c'; x.fillRect(sx - 7, sy - 10, 14, 2); x.fillRect(sx - 1, sy - 7, 2, 5);
  x.fillStyle = '#3a2a2a'; x.fillRect(sx - 10, sy + 2, 20, 5);
  return c;
}

export function drawTitleScene(ctx, t) {
  if (!titleBase) titleBase = buildTitleBase();
  ctx.drawImage(titleBase, 0, 0);
  // animated ring
  ctx.save(); ctx.translate(240, 84); ctx.rotate(t * 0.04 - 0.18);
  ctx.strokeStyle = 'rgba(232,185,92,0.35)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.ellipse(0, 0, 118, 39, 0, 0, TAU); ctx.stroke();
  for (let i = 0; i < 8; i++) {
    const a = t * 0.25 + i / 8 * TAU;
    px(ctx, Math.cos(a) * 118, Math.sin(a) * 39, i % 2 ? '#ffd27a' : '#c7a8ff', 2, 2);
  }
  ctx.restore();
  // fog
  for (let i = 0; i < 4; i++) {
    ctx.globalAlpha = 0.05 + i * 0.012;
    ctx.fillStyle = i % 2 ? '#b07bff' : '#ffb347';
    const fx = ((t * (4 + i) + i * 140) % 620) - 70;
    ctx.beginPath(); ctx.ellipse(fx, 196 + i * 8, 90, 13, 0, 0, TAU); ctx.fill();
  }
  ctx.globalAlpha = 1;
  // hero silhouette foreground
  const bob = Math.round(Math.sin(t * 1.7) * 0.8);
  drawKnight(ctx, 84, 248 + bob, { time: t, dir: 'right', moving: false });
  // cape flutter
  const cape = Math.round(Math.sin(t * 5) * 2);
  px(ctx, 72 + cape, 226 + bob, '#7a2638', 5, 18);
  px(ctx, 69 + cape, 230 + bob, '#4a1522', 4, 12);
  // embers + birds
  for (let i = 0; i < 46; i++) {
    const seed = i * 91.7;
    const ex = ((seed * 3.1 + t * (4 + (i % 6))) % (VIEW_W + 80)) - 40;
    const ey = 270 - ((t * (10 + i % 9) + i * 31) % 280);
    ctx.globalAlpha = 0.25 + (i % 5) * 0.12;
    px(ctx, ex + Math.sin(t * 2 + i) * 6, ey, i % 3 ? '#ff9b4a' : '#ffd27a', 1, 2);
  }
  ctx.globalAlpha = 1;
  for (let i = 0; i < 5; i++) {
    const bx = (t * 9 + i * 57) % (VIEW_W + 30) - 15, by = 58 + Math.sin(t * 2 + i) * 7 + i * 3;
    ctx.fillStyle = '#12101c'; ctx.fillRect(bx, by, 4, 1); ctx.fillRect(bx + 4, by - 1, 3, 1);
  }
  // subtle vignette
  const v = ctx.createRadialGradient(240, 135, 80, 240, 135, 290);
  v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,0.55)');
  ctx.fillStyle = v; ctx.fillRect(0, 0, VIEW_W, VIEW_H);
}

// ── Town ────────────────────────────────────────────────────────────────────
let townBase = null;
function buildTownBase() {
  const c = document.createElement('canvas'); c.width = VIEW_W; c.height = VIEW_H;
  const x = c.getContext('2d'); x.imageSmoothingEnabled = false;
  const rng = rngFrom('town-base');
  const sky = x.createLinearGradient(0, 0, 0, 160);
  sky.addColorStop(0, '#0d0b20'); sky.addColorStop(0.42, '#2a1c3e'); sky.addColorStop(0.76, '#693647'); sky.addColorStop(1, '#c46a4a');
  x.fillStyle = sky; x.fillRect(0, 0, VIEW_W, 160);
  for (let i = 0; i < 70; i++) {
    x.globalAlpha = 0.25 + rng() * 0.6; x.fillStyle = rng() < 0.15 ? '#ffd8a0' : '#dfe6ff';
    x.fillRect(Math.round(rng() * VIEW_W), Math.round(rng() * 110), 1, 1);
  }
  x.globalAlpha = 1;
  // moon
  x.fillStyle = 'rgba(255,228,190,0.2)'; x.beginPath(); x.arc(396, 44, 26, 0, TAU); x.fill();
  x.fillStyle = '#f0e4cc'; x.beginPath(); x.arc(396, 44, 14, 0, TAU); x.fill();
  x.fillStyle = '#d8c8aa'; x.beginPath(); x.arc(399, 46, 11, 0, TAU); x.fill();
  x.fillStyle = '#f0e4cc'; x.beginPath(); x.arc(394, 42, 12, 0, TAU); x.fill();
  // clouds
  for (let i = 0; i < 5; i++) { x.globalAlpha = 0.10; x.fillStyle = '#e8b0c0'; x.beginPath(); x.ellipse(60 + i * 100, 56 + (i % 3) * 12, 55, 7, 0, 0, TAU); x.fill(); }
  x.globalAlpha = 1;
  // distant castle and town
  x.fillStyle = '#191224';
  x.fillRect(208, 78, 64, 55); x.fillRect(198, 88, 12, 44); x.fillRect(270, 88, 12, 44);
  for (const [tx, ty, w, h] of [[198, 72, 12, 18], [270, 72, 12, 18], [222, 62, 10, 24], [250, 62, 10, 24]]) {
    x.beginPath(); x.moveTo(tx - 3, ty + h); x.lineTo(tx + w / 2, ty - 4); x.lineTo(tx + w + 3, ty + h); x.closePath(); x.fill();
  }
  x.fillStyle = 'rgba(255,166,80,0.72)'; for (const [wx, wy] of [[218, 92], [236, 86], [256, 92], [204, 100], [278, 100]]) x.fillRect(wx, wy, 3, 4);
  // silhouetted houses row
  x.fillStyle = '#1a1320';
  for (let i = 0; i < 11; i++) {
    const bw = 26 + rng() * 26, bh = 16 + rng() * 26, bx = i * 46 - 14, by = 138 - bh;
    x.fillRect(bx, by, bw, bh);
    x.beginPath(); x.moveTo(bx - 4, by); x.lineTo(bx + bw / 2, by - 10); x.lineTo(bx + bw + 4, by); x.closePath(); x.fill();
    if (rng() < 0.75) { x.fillStyle = 'rgba(255,170,90,0.4)'; x.fillRect(bx + 6, by + 7, 3, 4); x.fillStyle = '#1a1320'; }
  }
  // ground
  const ground = x.createLinearGradient(0, 132, 0, 270);
  ground.addColorStop(0, '#4a3a3a'); ground.addColorStop(0.35, '#3d3033'); ground.addColorStop(1, '#2a222b');
  x.fillStyle = ground; x.fillRect(0, 132, VIEW_W, 138);
  // cobblestone rows with perspective
  let rowY = 134, rowH = 3;
  for (let row = 0; row < 22; row++) {
    rowH = 3 + row * 0.62; rowY += rowH;
    if (rowY > 270) break;
    const offset = (row % 2) * 14;
    for (let cx = -20 + offset; cx < VIEW_W + 20; cx += 24 + row * 0.8) {
      const w = 20 + row * 0.6;
      x.fillStyle = ['#453639', '#403235', '#4a3b3c', '#382d31'][Math.floor(rng() * 4)];
      x.fillRect(Math.round(cx), Math.round(rowY), Math.round(w), Math.max(2, Math.round(rowH - 1)));
      x.fillStyle = 'rgba(255,220,190,0.05)'; x.fillRect(Math.round(cx), Math.round(rowY), Math.round(w), 1);
    }
  }
  // moss/flowers
  for (let i = 0; i < 50; i++) { x.fillStyle = rng() < 0.6 ? '#3c4a32' : '#5a6340'; x.fillRect(Math.round(rng() * VIEW_W), Math.round(150 + rng() * 116), 2, 1); }

  // ── forge building ──
  const forgeX = 24, forgeY = 64, forgeW = 128, forgeH = 64;
  x.fillStyle = '#1a1218'; x.fillRect(forgeX - 4, forgeY - 4, forgeW + 8, forgeH + 8);
  x.fillStyle = '#4a3436'; x.fillRect(forgeX, forgeY, forgeW, forgeH);
  x.fillStyle = '#563c3c'; x.fillRect(forgeX, forgeY, forgeW, 8);
  // stone blocks
  for (let by = forgeY + 10; by < forgeY + forgeH; by += 10) for (let bx = forgeX + (by % 20 ? 0 : 8); bx < forgeX + forgeW; bx += 22) {
    x.fillStyle = rng() < 0.5 ? '#523a3b' : '#462f32'; x.fillRect(bx, by, 20, 8);
  }
  // roof
  x.fillStyle = '#241820'; x.beginPath(); x.moveTo(forgeX - 12, forgeY + 2); x.lineTo(forgeX + forgeW / 2, forgeY - 30); x.lineTo(forgeX + forgeW + 12, forgeY + 2); x.closePath(); x.fill();
  x.fillStyle = '#6e3030'; x.beginPath(); x.moveTo(forgeX - 8, forgeY - 1); x.lineTo(forgeX + forgeW / 2, forgeY - 26); x.lineTo(forgeX + forgeW + 8, forgeY - 1); x.closePath(); x.fill();
  for (let i = 0; i < 5; i++) { x.fillStyle = i % 2 ? '#803a36' : '#5e2929'; x.fillRect(forgeX + 6 + i * 25, forgeY - 8, 20, 4); }
  // chimney
  x.fillStyle = '#2a2024'; x.fillRect(forgeX + 96, forgeY - 40, 14, 26); x.fillStyle = '#3c2e30'; x.fillRect(forgeX + 94, forgeY - 42, 18, 5);
  // window + door + furnace glow
  x.fillStyle = '#1a1012'; x.fillRect(forgeX + 16, forgeY + 22, 26, 20);
  x.fillStyle = '#ff8a3d'; x.fillRect(forgeX + 19, forgeY + 25, 20, 14);
  x.fillStyle = '#ffd27a'; x.fillRect(forgeX + 23, forgeY + 28, 8, 8);
  x.fillStyle = '#241418'; x.fillRect(forgeX + 82, forgeY + 28, 24, 36);
  x.fillStyle = '#5a3a2c'; x.fillRect(forgeX + 84, forgeY + 30, 20, 34); x.fillStyle = '#3a2620'; x.fillRect(forgeX + 85, forgeY + 31, 2, 32);
  x.fillStyle = '#e8b95c'; x.fillRect(forgeX + 98, forgeY + 44, 3, 3);
  // anvil
  x.fillStyle = '#16121a'; x.fillRect(168, 146, 26, 8); x.fillRect(176, 154, 10, 12);
  x.fillStyle = '#5a6470'; x.fillRect(170, 146, 22, 4); x.fillRect(178, 154, 6, 10);
  x.fillStyle = '#2a2c34'; x.fillRect(166, 164, 30, 5);
  // weapon rack
  x.fillStyle = '#3a2a22'; x.fillRect(148, 136, 3, 34); x.fillRect(184, 136, 3, 34); x.fillRect(148, 142, 39, 2);
  x.fillStyle = '#c2cad6'; x.fillRect(157, 126, 2, 20); x.fillRect(170, 122, 2, 24); x.fillStyle = '#ff9b4a'; x.fillRect(162, 130, 2, 14);
  // sign
  x.fillStyle = '#2a1c1a'; x.fillRect(60, 134, 42, 14); x.fillStyle = '#8a5a32'; x.fillRect(62, 136, 38, 10);
  drawPixelText(x, 'FORGE', 81, 137, { color: '#ffd27a', align: 'center', scale: 1 });
  // smoke puffs (static)
  for (let i = 0; i < 5; i++) { x.globalAlpha = 0.1 - i * 0.015; x.fillStyle = '#c0a8b0'; x.beginPath(); x.arc(forgeX + 103 + i * 4, forgeY - 48 - i * 12, 6 + i * 3, 0, TAU); x.fill(); }
  x.globalAlpha = 1;

  // ── merchant tent ──
  const shX = 330, shY = 70, shW = 126, shH = 58;
  x.fillStyle = '#1a1220'; x.fillRect(shX - 4, shY - 4, shW + 8, shH + 8);
  x.fillStyle = '#3e2c48'; x.fillRect(shX, shY, shW, shH);
  // awning stripes
  for (let i = 0; i < 9; i++) { x.fillStyle = i % 2 ? '#8a3a56' : '#d8b070'; x.fillRect(shX + i * 14, shY, 14, 14); }
  x.fillStyle = '#2a1c30'; x.fillRect(shX, shY + 14, shW, 4); x.fillRect(shX, shY + 40, shW, 3);
  // poles
  x.fillStyle = '#5a4032'; x.fillRect(shX + 4, shY + 4, 3, shH); x.fillRect(shX + shW - 7, shY + 4, 3, shH);
  // counter
  x.fillStyle = '#3a2620'; x.fillRect(shX + 12, shY + 34, shW - 24, 12); x.fillStyle = '#6b4630'; x.fillRect(shX + 12, shY + 34, shW - 24, 4);
  // wares
  x.fillStyle = '#57b8ff'; x.fillRect(shX + 22, shY + 26, 5, 8); x.fillStyle = '#ff5f6d'; x.fillRect(shX + 34, shY + 28, 5, 6); x.fillStyle = '#b478ff'; x.fillRect(shX + 50, shY + 24, 5, 10);
  x.fillStyle = '#ffd86b'; x.fillRect(shX + 66, shY + 27, 5, 7); x.fillStyle = '#8cf07a'; x.fillRect(shX + 82, shY + 25, 5, 9); x.fillStyle = '#57b8ff'; x.fillRect(shX + 96, shY + 28, 5, 6);
  // hanging lanterns
  for (const lx of [shX + 18, shX + shW - 20]) { x.fillStyle = '#2a1c20'; x.fillRect(lx, shY + 14, 1, 8); x.fillStyle = '#ffd86b'; x.fillRect(lx - 2, shY + 22, 5, 6); x.fillStyle = '#ff9b4a'; x.fillRect(lx - 1, shY + 23, 3, 4); }
  // sign
  x.fillStyle = '#2a1c1a'; x.fillRect(372, 132, 60, 14); x.fillStyle = '#8a5a32'; x.fillRect(374, 134, 56, 10);
  drawPixelText(x, 'MARKET', 402, 135, { color: '#ffd27a', align: 'center', scale: 1 });
  // crates
  x.fillStyle = '#3a2a22'; x.fillRect(462, 150, 12, 14); x.fillStyle = '#6b4630'; x.fillRect(463, 151, 10, 12);

  // ── gate ──
  x.fillStyle = '#1a1420';
  x.fillRect(203, 54, 74, 80);
  x.fillStyle = '#4a4152'; x.fillRect(207, 58, 66, 74);
  // arch opening
  x.fillStyle = '#0c0814'; x.fillRect(222, 74, 36, 58);
  x.beginPath(); x.arc(240, 74, 18, Math.PI, 0); x.fill();
  // stone blocks
  for (let by = 58; by < 132; by += 9) for (let bx = 207 + (by % 18 ? 0 : 8); bx < 273; bx += 16) {
    if (bx > 218 && bx < 262 && by > 64) continue;
    x.fillStyle = rng() < 0.5 ? '#554b5c' : '#443c4c'; x.fillRect(bx, by, 14, 7);
  }
  // pillars
  x.fillStyle = '#5d5266'; x.fillRect(200, 58, 10, 74); x.fillRect(270, 58, 10, 74);
  x.fillStyle = '#776a80'; x.fillRect(199, 58, 12, 4); x.fillRect(269, 58, 12, 4);
  // runes
  for (let i = 0; i < 6; i++) { x.fillStyle = i % 2 ? '#b07bff' : '#ffd27a'; x.fillRect(210 + (i * 13) % 58, 96 + (i % 3) * 9, 2, 2); }
  // stairs
  x.fillStyle = '#3a3345'; x.fillRect(212, 132, 56, 4); x.fillStyle = '#4a4154'; x.fillRect(204, 136, 72, 4); x.fillStyle = '#2e2839'; x.fillRect(196, 140, 88, 4);

  // ── codex stall ──
  x.fillStyle = '#1a1418'; x.fillRect(360, 174, 58, 34);
  x.fillStyle = '#4a3430'; x.fillRect(362, 176, 54, 30);
  x.fillStyle = '#6b4630'; x.fillRect(354, 202, 70, 6); x.fillStyle = '#3a2620'; x.fillRect(358, 208, 4, 12); x.fillRect(416, 208, 4, 12);
  // books
  const bookCols = ['#b478ff', '#57b8ff', '#62d36f', '#ffb340', '#ff5f6d'];
  for (let i = 0; i < 7; i++) { x.fillStyle = bookCols[i % 5]; x.fillRect(366 + i * 6, 186 - (i % 3) * 2, 4, 16 + (i % 3) * 2); }
  // canopy
  x.fillStyle = '#2c2030'; x.fillRect(358, 158, 62, 3); x.fillStyle = '#5a3a56'; x.fillRect(358, 161, 62, 3);
  // candle
  x.fillStyle = '#e8d8b0'; x.fillRect(420, 194, 2, 6); x.fillStyle = '#ffd27a'; x.fillRect(419, 191, 4, 3);
  drawPixelText(x, 'CODEX', 389, 177, { color: '#d8c8b0', align: 'center', scale: 1 });
  // hanging sign
  x.fillStyle = '#2a1c1a'; x.fillRect(366, 166, 46, 10); drawPixelText(x, 'CODEX', 389, 168, { color: '#8ef0c8', align: 'center', scale: 1 });

  // ── skill shrine ──
  x.fillStyle = '#12101a'; x.fillRect(146, 172, 20, 30);
  x.fillStyle = '#4a5568'; x.fillRect(148, 174, 16, 26);
  x.fillStyle = '#6d7c92'; x.fillRect(150, 176, 12, 22);
  x.fillStyle = '#8cf07a'; x.fillRect(154, 182, 4, 4); x.fillStyle = '#e0ffb0'; x.fillRect(155, 183, 2, 2);
  x.fillStyle = '#3a4658'; x.fillRect(144, 200, 24, 4);
  drawPixelText(x, 'SKILL', 156, 164, { color: '#8cf07a', align: 'center', scale: 1 });

  // ── echo obelisk ──
  x.fillStyle = '#141020'; x.fillRect(305, 106, 26, 30);
  x.fillStyle = '#2e2448'; x.fillRect(308, 108, 20, 28);
  x.fillStyle = '#4a3a72'; x.fillRect(312, 110, 12, 26);
  x.fillStyle = '#b07bff'; x.fillRect(316, 114, 4, 10); x.fillStyle = '#e2c7ff'; x.fillRect(317, 116, 2, 4);
  x.fillStyle = '#241c38'; x.fillRect(302, 134, 32, 5);
  drawPixelText(x, 'ECHO', 318, 98, { color: '#c78cff', align: 'center', scale: 1 });

  // ── fountain ──
  x.fillStyle = '#231c2a'; x.beginPath(); x.ellipse(240, 172, 30, 16, 0, 0, TAU); x.fill();
  x.fillStyle = '#4a4158'; x.beginPath(); x.ellipse(240, 170, 27, 14, 0, 0, TAU); x.fill();
  x.fillStyle = '#2f4a5c'; x.beginPath(); x.ellipse(240, 168, 22, 10, 0, 0, TAU); x.fill();
  x.fillStyle = '#3f667c'; x.beginPath(); x.ellipse(240, 168, 18, 7, 0, 0, TAU); x.fill();
  x.fillStyle = '#7a6a80'; x.fillRect(236, 148, 8, 20); x.fillStyle = '#9a8aa0'; x.fillRect(238, 146, 4, 20);
  x.fillStyle = '#5a4a66'; x.beginPath(); x.ellipse(240, 146, 9, 4, 0, 0, TAU); x.fill();
  x.fillStyle = '#a8d8e8'; x.fillRect(239, 138, 2, 9);

  // trees / props
  const tree = (tx, ty, s = 1) => {
    x.fillStyle = '#221a1c'; x.fillRect(tx - 3 * s, ty - 2, 6 * s, 16 * s);
    x.fillStyle = '#2e3a2a'; x.beginPath(); x.arc(tx, ty - 10, 12 * s, 0, TAU); x.fill();
    x.fillStyle = '#3e5034'; x.beginPath(); x.arc(tx - 4, ty - 14, 8 * s, 0, TAU); x.fill();
    x.fillStyle = '#4c6240'; x.beginPath(); x.arc(tx + 3, ty - 16, 6 * s, 0, TAU); x.fill();
  };
  tree(26, 190, 1.2); tree(458, 196, 1.1); tree(300, 220, 0.8);
  // barrels
  x.fillStyle = '#3a2a22'; x.fillRect(44, 160, 10, 13); x.fillStyle = '#6b4630'; x.fillRect(45, 161, 8, 11); x.fillStyle = '#8a5a3a'; x.fillRect(45, 164, 8, 2);
  x.fillStyle = '#3a2a22'; x.fillRect(432, 172, 10, 13);
  // banners
  for (const bx of [188, 292]) { x.fillStyle = '#5a2030'; x.fillRect(bx, 58, 10, 26); x.fillStyle = '#8a3048'; x.fillRect(bx + 2, 60, 6, 22); x.fillStyle = '#e8b95c'; x.fillRect(bx + 4, 66, 2, 8); }
  // flowerbeds near edges
  for (let i = 0; i < 14; i++) { x.fillStyle = ['#8a3a56', '#e8b95c', '#b478ff'][i % 3]; x.fillRect(30 + rng() * 420, 246 + rng() * 16, 2, 2); }
  // ambient rim light from portal
  const portalGlow = x.createRadialGradient(240, 100, 2, 240, 100, 70);
  portalGlow.addColorStop(0, 'rgba(176,123,255,0.20)'); portalGlow.addColorStop(1, 'rgba(176,123,255,0)');
  x.fillStyle = portalGlow; x.fillRect(160, 40, 160, 130);
  return c;
}

const townLights = [
  { x: 240, y: 105, r: 95, color: '#b07bff', intensity: 0.9, flicker: 0.08 },
  { x: 82, y: 96, r: 70, color: '#ff9b4a', intensity: 0.8, flicker: 0.14 },
  { x: 396, y: 100, r: 70, color: '#ffd86b', intensity: 0.7, flicker: 0.1 },
  { x: 156, y: 188, r: 46, color: '#8cf07a', intensity: 0.6, flicker: 0.1 },
  { x: 388, y: 190, r: 44, color: '#8ef0c8', intensity: 0.5, flicker: 0.1 },
  { x: 318, y: 122, r: 50, color: '#c78cff', intensity: 0.65, flicker: 0.12 },
  { x: 240, y: 168, r: 55, color: '#7de8ff', intensity: 0.35, flicker: 0.04 },
  { x: 60, y: 170, r: 40, color: '#ffb347', intensity: 0.4, flicker: 0.12 },
  { x: 430, y: 168, r: 40, color: '#ffb347', intensity: 0.4, flicker: 0.12 },
];

export function drawTownScene(ctx, t, player, npcs = []) {
  if (!townBase) townBase = buildTownBase();
  ctx.drawImage(townBase, 0, 0);
  // portal animation
  ctx.save();
  for (let i = 0; i < 4; i++) {
    const r = 16 - i * 3 + Math.sin(t * 2.2 + i) * 1.2;
    ctx.strokeStyle = i === 0 ? 'rgba(176,123,255,0.8)' : i === 1 ? 'rgba(232,199,255,0.7)' : 'rgba(255,255,255,0.6)';
    ctx.lineWidth = 1.4; ctx.beginPath(); ctx.ellipse(240, 103, r * 0.62, r, 0, 0, TAU); ctx.stroke();
  }
  for (let i = 0; i < 14; i++) {
    const a = t * 1.7 + i * 0.9;
    px(ctx, 240 + Math.cos(a) * (10 + (i % 3) * 3), 103 + Math.sin(a) * (17 + (i % 4) * 3), i % 2 ? '#e2c7ff' : '#b07bff', 1, 1);
  }
  ctx.restore();
  drawGlow(ctx, 240, 103, 46, '#b07bff', 0.28);
  // fountain water animation
  for (let i = 0; i < 16; i++) {
    const a = t * 1.4 + i * 1.9;
    px(ctx, 240 + Math.cos(a) * (5 + (i % 4) * 3), 140 + ((t * 18 + i * 7) % 25), i % 2 ? '#9ad8ee' : '#d4fbff', 1, 2);
  }
  drawGlow(ctx, 240, 166, 36, '#7de8ff', 0.01);
  // forge furnace flicker
  drawGlow(ctx, 78, 100, 22 + Math.sin(t * 9) * 3, '#ff7b3a', 0.28);
  // shop lanterns
  drawGlow(ctx, 350, 98, 13, '#ffd86b', 0.24); drawGlow(ctx, 434, 98, 13, '#ffd86b', 0.24);
  drawGlow(ctx, 421, 192, 10, '#ffd27a', 0.22);
  // shrine pulse
  drawGlow(ctx, 156, 184, 16 + Math.sin(t * 2.5) * 2, '#8cf07a', 0.22);
  drawGlow(ctx, 318, 120, 18 + Math.sin(t * 2) * 2, '#c78cff', 0.2);
  // NPCs (small pixel folk)
  for (const n of npcs) {
    const bob = Math.round(Math.sin(t * 2 + n.seed) * 0.7);
    const x = n.x, y = n.y + bob;
    drawShadow(ctx, x, y + 11, 7, 2.4, 0.3);
    px(ctx, x - 5, y - 10, n.dark, 10, 14);
    px(ctx, x - 4, y - 16, n.skin, 8, 7);
    px(ctx, x - 5, y - 17, n.hair, 10, 3);
    px(ctx, x - 3, y - 13, '#151018', 1, 1); px(ctx, x + 2, y - 13, '#151018', 1, 1);
    px(ctx, x - 5, y - 8, n.body, 10, 10);
    px(ctx, x - 4, y + 2, n.dark, 3, 4); px(ctx, x + 1, y + 2, n.dark, 3, 4);
    if (n.tool === 'hammer') { px(ctx, x + 6, y - 13, '#6b4630', 2, 8); px(ctx, x + 5, y - 15, '#8a95a5', 4, 3); }
    if (n.tool === 'staff') { px(ctx, x + 6, y - 18, '#6b4630', 2, 18); px(ctx, x + 5, y - 20, '#b07bff', 4, 3); }
  }
  // player
  drawKnight(ctx, player.x, player.y, { time: t, dir: player.dir, moving: player.moving, flash: player.hitFlash > 0 });
  // lantern sparkles
  for (let i = 0; i < 22; i++) {
    const a = i * 2.1 + t * 0.4;
    const fx = 240 + Math.cos(a) * (60 + (i % 5) * 34);
    const fy = 150 + Math.sin(a * 1.3) * 50 + Math.sin(t + i) * 8;
    ctx.globalAlpha = 0.18 + (i % 4) * 0.08;
    px(ctx, fx, fy, i % 3 ? '#ffd27a' : '#c2ffb9', 1, 1);
  }
  ctx.globalAlpha = 1;
  drawLighting(ctx, townLights, t, 0.30, 0.95);
  // fireflies after light
  for (let i = 0; i < 18; i++) {
    const fx = 30 + ((i * 67 + t * (6 + i % 4)) % 420);
    const fy = 150 + Math.sin(t * 1.2 + i * 1.7) * 38 + (i % 5) * 10;
    ctx.globalAlpha = 0.25 + Math.sin(t * 3 + i) * 0.2;
    px(ctx, fx, fy, '#d8ff9a', 1, 1);
  }
  ctx.globalAlpha = 1;
  const v = ctx.createRadialGradient(240, 145, 110, 240, 145, 300);
  v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(4,2,10,0.55)');
  ctx.fillStyle = v; ctx.fillRect(0, 0, VIEW_W, VIEW_H);
}

export function nearestHotspot(x, y) {
  let best = null, bd = 1e9;
  for (const h of TOWN_HOTSPOTS) {
    const d = dist(x, y, h.x, h.y);
    if (d < bd) { bd = d; best = h; }
  }
  return bd < 52 ? { ...best, distance: bd } : null;
}

// ── Dungeon room base ───────────────────────────────────────────────────────
const roomCache = new Map();
function buildRoomBase(room) {
  const biome = BIOMES[room.biome];
  const p = biome.palette;
  const rng = rngFrom('roombase', room.seed);
  const c = document.createElement('canvas'); c.width = VIEW_W; c.height = VIEW_H;
  const x = c.getContext('2d'); x.imageSmoothingEnabled = false;
  const b = room.bounds;
  // void background
  x.fillStyle = '#05040a'; x.fillRect(0, 0, VIEW_W, VIEW_H);
  // floor tiles
  for (let ty = 0; ty < 9; ty++) {
    for (let tx = 0; tx < 16; tx++) {
      const fx = tx * TILE, fy = ty * TILE;
      if (fy < b.y - 2 || fy > b.y + b.h || fx < b.x - 2 || fx > b.x + b.w) continue;
      const shade = ['floorA', 'floorB', 'floorC'][Math.floor(rng() * 3)];
      x.fillStyle = p[shade]; x.fillRect(fx, fy, TILE, TILE);
      // tile bevel & grain
      x.fillStyle = 'rgba(255,255,255,0.035)'; x.fillRect(fx, fy, TILE, 1); x.fillRect(fx, fy, 1, TILE);
      x.fillStyle = 'rgba(0,0,0,0.16)'; x.fillRect(fx, fy + TILE - 1, TILE, 1); x.fillRect(fx + TILE - 1, fy, 1, TILE);
      for (let i = 0; i < 3; i++) { x.fillStyle = rng() < 0.5 ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.03)'; x.fillRect(fx + Math.floor(rng() * (TILE - 4)) + 2, fy + Math.floor(rng() * (TILE - 4)) + 2, 2 + Math.floor(rng() * 5), 1); }
    }
  }
  // biome floor flourishes
  if (room.biome === 'ember') {
    for (let i = 0; i < 12; i++) {
      const lx = 40 + rng() * 400, ly = 40 + rng() * 190;
      x.fillStyle = rng() < 0.5 ? '#7a2a1c' : '#ff6b35'; x.fillRect(lx, ly, 1 + rng() * 10, 1);
    }
  } else if (room.biome === 'frost') {
    for (let i = 0; i < 20; i++) { x.fillStyle = 'rgba(212,251,255,0.28)'; x.fillRect(40 + rng() * 400, 40 + rng() * 190, 1 + rng() * 6, 1); }
  } else if (room.biome === 'nature') {
    for (let i = 0; i < 22; i++) { x.fillStyle = rng() < 0.5 ? '#3d5a32' : '#4f6e3a'; x.fillRect(40 + rng() * 400, 40 + rng() * 190, 2 + rng() * 5, 1 + rng() * 2); }
  } else {
    for (let i = 0; i < 14; i++) { x.fillStyle = 'rgba(176,123,255,0.22)'; x.fillRect(40 + rng() * 400, 40 + rng() * 190, 1, 1 + rng() * 8); }
  }
  // walls
  const drawWallBlock = (bx, by, bw, bh, top = false) => {
    x.fillStyle = top ? p.wallTop : p.wall; x.fillRect(bx, by, bw, bh);
    x.fillStyle = 'rgba(255,255,255,0.06)'; x.fillRect(bx, by, bw, 1);
    x.fillStyle = p.wallEdge; x.fillRect(bx, by + bh - 1, bw, 1);
    const bl = 22, br = 9;
    for (let yy = by + 2; yy < by + bh - 1; yy += 8) {
      for (let xx = bx + ((Math.floor(yy / 8) % 2) ? 10 : 0); xx < bx + bw - 2; xx += 20) {
        x.fillStyle = rng() < 0.5 ? p.wallTop : p.wall; x.fillRect(xx, yy, Math.min(18, bx + bw - xx - 1), 6);
        x.fillStyle = 'rgba(0,0,0,0.18)'; x.fillRect(xx, yy + 6, Math.min(18, bx + bw - xx - 1), 1);
      }
    }
  };
  drawWallBlock(0, 0, VIEW_W, b.y, true);
  drawWallBlock(0, 0, b.x, VIEW_H, false);
  drawWallBlock(b.x + b.w, 0, VIEW_W - (b.x + b.w), VIEW_H, false);
  drawWallBlock(0, b.y + b.h, VIEW_W, VIEW_H - (b.y + b.h), true);
  // top wall crenellations / trim
  x.fillStyle = p.wallEdge; x.fillRect(0, b.y - 3, VIEW_W, 3);
  for (let i = 0; i < 20; i++) { x.fillStyle = i % 2 ? p.wallTop : p.wall; x.fillRect(i * 26, b.y - 8, 20, 6); }
  x.fillStyle = 'rgba(0,0,0,0.35)'; x.fillRect(b.x - 8, b.y, 8, b.h); x.fillRect(b.x + b.w, b.y, 8, b.h);
  // floor shadow at wall base
  const shadow = x.createLinearGradient(0, b.y, 0, b.y + 16);
  shadow.addColorStop(0, 'rgba(0,0,0,0.55)'); shadow.addColorStop(1, 'rgba(0,0,0,0)');
  x.fillStyle = shadow; x.fillRect(b.x, b.y, b.w, 16);
  // decor
  for (const d of room.decor) {
    if (d.type === 'crack') {
      x.strokeStyle = 'rgba(0,0,0,0.35)'; x.lineWidth = 1; x.beginPath();
      let cx = d.x, cy = d.y; x.moveTo(cx, cy);
      for (let i = 0; i < 4; i++) { cx += (rng() - 0.5) * 12; cy += rng() * 7; x.lineTo(Math.round(cx), Math.round(cy)); }
      x.stroke();
    } else if (d.type === 'bone') {
      x.fillStyle = '#b8b09a'; x.fillRect(d.x, d.y, 5, 1); x.fillRect(d.x + 5, d.y - 1, 2, 1);
      x.fillStyle = '#8a8272'; x.fillRect(d.x + 1, d.y + 1, 3, 1);
    } else if (d.type === 'moss') {
      x.fillStyle = room.biome === 'nature' ? '#4f6e3a' : '#3a4a35';
      for (let i = 0; i < 4; i++) x.fillRect(d.x + i * 2, d.y + (i % 2), 2, 1);
    } else if (d.type === 'torch') {
      x.fillStyle = '#2a2024'; x.fillRect(d.x - 2, d.y - 2, 4, 8);
      x.fillStyle = '#5a4032'; x.fillRect(d.x - 1, d.y - 8, 2, 6);
      x.fillStyle = p.light; x.fillRect(d.x - 2, d.y - 10, 4, 2);
    } else if (d.type === 'sigil') {
      const { x: sx, y: sy } = d;
      x.save(); x.translate(sx, sy);
      for (let r = 0; r < 3; r++) {
        x.strokeStyle = r === 0 ? 'rgba(255,122,87,0.5)' : 'rgba(255,180,120,0.25)'; x.lineWidth = 1.5;
        x.beginPath(); x.ellipse(0, 0, 60 - r * 14, 30 - r * 7, 0, 0, TAU); x.stroke();
      }
      for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; x.fillStyle = i % 2 ? '#ff7b3a' : '#ffd27a'; x.fillRect(Math.cos(a) * 54 - 1, Math.sin(a) * 27 - 1, 2, 2); }
      x.strokeStyle = 'rgba(255,155,74,0.35)'; x.beginPath(); x.moveTo(-40, 0); x.lineTo(0, -26); x.lineTo(40, 0); x.lineTo(0, 26); x.closePath(); x.stroke();
      x.restore();
    } else if (d.type === 'gate') {
      x.fillStyle = '#1a1420'; x.fillRect(d.x - 30, d.y - 12, 60, 40);
      x.fillStyle = '#4a4152'; x.fillRect(d.x - 26, d.y - 8, 52, 34);
      x.fillStyle = '#0c0814'; x.fillRect(d.x - 16, d.y - 4, 32, 30);
      x.fillStyle = p.accent; x.fillRect(d.x - 2, d.y + 4, 4, 4);
    }
  }
  // props sorted by y
  const propSort = room.props.slice().sort((a, b) => a.y - b.y);
  for (const pr of propSort) drawProp(x, pr, room);
  return c;
}

function drawProp(x, pr, room) {
  const biome = BIOMES[room.biome];
  if (pr.kind === 'pillar') {
    x.fillStyle = 'rgba(0,0,0,0.35)'; x.beginPath(); x.ellipse(pr.x, pr.y + 4, 14, 5, 0, 0, TAU); x.fill();
    x.fillStyle = '#0a0812'; x.fillRect(pr.x - 9, pr.y - 30, 18, 34);
    x.fillStyle = biome.palette.wall; x.fillRect(pr.x - 7, pr.y - 28, 14, 30);
    x.fillStyle = biome.palette.wallTop; x.fillRect(pr.x - 5, pr.y - 28, 4, 26);
    x.fillStyle = biome.palette.wallEdge; x.fillRect(pr.x + 5, pr.y - 28, 2, 26);
    x.fillStyle = biome.palette.wallTop; x.fillRect(pr.x - 11, pr.y - 32, 22, 5); x.fillRect(pr.x - 11, pr.y + 2, 22, 5);
    x.fillStyle = biome.palette.accent; x.fillRect(pr.x - 2, pr.y - 20, 4, 4);
  } else if (pr.kind === 'brazier') {
    x.fillStyle = 'rgba(0,0,0,0.3)'; x.beginPath(); x.ellipse(pr.x, pr.y + 3, 10, 4, 0, 0, TAU); x.fill();
    x.fillStyle = '#0a0812'; x.fillRect(pr.x - 5, pr.y - 12, 10, 15);
    x.fillStyle = '#4a4152'; x.fillRect(pr.x - 4, pr.y - 10, 8, 12);
    x.fillStyle = '#2a2024'; x.fillRect(pr.x - 7, pr.y - 16, 14, 5);
    x.fillStyle = biome.palette.light; x.fillRect(pr.x - 3, pr.y - 19, 6, 4);
  } else if (pr.kind === 'crate') {
    x.fillStyle = 'rgba(0,0,0,0.28)'; x.fillRect(pr.x + 3, pr.y + pr.h, pr.w, 3);
    x.fillStyle = '#0a0812'; x.fillRect(pr.x, pr.y, pr.w, pr.h);
    x.fillStyle = '#6b4630'; x.fillRect(pr.x + 1, pr.y + 1, pr.w - 2, pr.h - 2);
    x.fillStyle = '#8a5a3a'; x.fillRect(pr.x + 2, pr.y + 2, pr.w - 4, 3); x.fillRect(pr.x + 2, pr.y + 2, 3, pr.h - 4);
    x.fillStyle = '#3a2620'; x.fillRect(pr.x + 5, pr.y + 6, pr.w - 10, 2);
  } else if (pr.kind === 'rubble') {
    x.fillStyle = '#0a0812'; x.fillRect(pr.x - 8, pr.y - 2, 16, 6);
    x.fillStyle = biome.palette.wallTop; x.fillRect(pr.x - 7, pr.y - 1, 7, 4); x.fillRect(pr.x + 1, pr.y, 5, 3);
    x.fillStyle = biome.palette.wallEdge; x.fillRect(pr.x - 3, pr.y - 5, 3, 3);
  }
}

export function drawRoomStatic(ctx, room) {
  if (!roomCache.has(room.seed)) {
    if (roomCache.size > 24) roomCache.delete(roomCache.keys().next().value);
    roomCache.set(room.seed, buildRoomBase(room));
  }
  ctx.drawImage(roomCache.get(room.seed), 0, 0);
}

export function drawRoomDynamic(ctx, room, t) {
  // torch / brazier flames
  for (const d of room.decor) {
    if (d.type === 'torch') {
      const fl = Math.sin(t * 13 + d.x) * 1.6;
      drawGlow(ctx, d.x, d.y - 12, 10, BIOMES[room.biome].palette.light, 0.22);
      px(ctx, d.x - 2, d.y - 15 + Math.round(fl), '#ff7b3a', 4, 5);
      px(ctx, d.x - 1, d.y - 19 + Math.round(fl * 1.4), '#ffd27a', 2, 5);
      px(ctx, d.x, d.y - 21 + Math.round(fl), '#fff2c0', 1, 3);
    }
  }
  for (const pr of room.props) {
    if (pr.kind === 'brazier') {
      drawGlow(ctx, pr.x, pr.y - 16, 18, BIOMES[room.biome].palette.light, 0.24);
      const fl = Math.sin(t * 11 + pr.x) * 2;
      px(ctx, pr.x - 3, pr.y - 22 + Math.round(fl), '#ff7b3a', 6, 6);
      px(ctx, pr.x - 2, pr.y - 27 + Math.round(fl), '#ffd27a', 4, 7);
      px(ctx, pr.x - 1, pr.y - 30 + Math.round(fl), '#fff2c0', 2, 4);
    }
  }
  // sigil pulse / gate shimmer
  for (const d of room.decor) {
    if (d.type === 'sigil') {
      drawGlow(ctx, d.x, d.y, 70 + Math.sin(t * 2) * 6, BOSSES[BIOMES[room.biome].boss].color, 0.12);
      for (let i = 0; i < 10; i++) {
        const a = t * 0.6 + i / 10 * TAU;
        px(ctx, d.x + Math.cos(a) * 54, d.y + Math.sin(a) * 27, i % 2 ? '#ff7b3a' : '#ffd27a', 1, 1);
      }
    }
    if (d.type === 'gate') {
      drawGlow(ctx, d.x, d.y + 8, 26, '#b07bff', 0.2);
      for (let i = 0; i < 5; i++) px(ctx, d.x + Math.sin(t * 3 + i) * 10, d.y + 4 + i * 4, '#e2c7ff', 1, 2);
    }
  }
}

// ── Lighting ────────────────────────────────────────────────────────────────
let lightCanvas = null;
export function drawLighting(ctx, lights, t, ambient = 0.6, ambientScale = 1) {
  if (!lightCanvas) { lightCanvas = document.createElement('canvas'); lightCanvas.width = VIEW_W; lightCanvas.height = VIEW_H; }
  const lc = lightCanvas.getContext('2d');
  lc.clearRect(0, 0, VIEW_W, VIEW_H);
  lc.fillStyle = `rgba(4,2,10,${clamp(ambient * ambientScale, 0, 0.92)})`;
  lc.fillRect(0, 0, VIEW_W, VIEW_H);
  lc.globalCompositeOperation = 'destination-out';
  for (const L of lights) {
    const flick = 1 + (L.flicker || 0) * Math.sin(t * (7 + (L.x % 5)) + L.y);
    const r = L.r * (L.flicker ? flick : 1);
    const g = lc.createRadialGradient(L.x, L.y, 1, L.x, L.y, r);
    g.addColorStop(0, `rgba(0,0,0,${0.96 * (L.intensity ?? 1)})`);
    g.addColorStop(0.45, `rgba(0,0,0,${0.55 * (L.intensity ?? 1)})`);
    g.addColorStop(0.8, `rgba(0,0,0,${0.14 * (L.intensity ?? 1)})`);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    lc.fillStyle = g; lc.beginPath(); lc.arc(L.x, L.y, r, 0, TAU); lc.fill();
  }
  lc.globalCompositeOperation = 'source-over';
  ctx.drawImage(lightCanvas, 0, 0);
  // colored bloom pass
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  for (const L of lights) {
    const flick = 1 + (L.flicker || 0) * Math.sin(t * (7 + (L.x % 5)) + L.y) * 0.6;
    const r = L.r * (L.flicker ? flick : 1);
    const g = ctx.createRadialGradient(L.x, L.y, 0, L.x, L.y, r * 0.72);
    g.addColorStop(0, hexA(L.color, 0.10 * (L.intensity ?? 1)));
    g.addColorStop(1, hexA(L.color, 0));
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(L.x, L.y, r * 0.72, 0, TAU); ctx.fill();
  }
  ctx.restore();
}
function hexA(hex, a) {
  if (!hex || !hex.startsWith('#')) return `rgba(255,200,120,${a})`;
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

// ── Ambience ────────────────────────────────────────────────────────────────
export function drawAmbient(ctx, biomeId, t) {
  if (biomeId === 'ember') {
    for (let i = 0; i < 34; i++) {
      const x = ((i * 73 + Math.sin(t * 0.7 + i) * 18 + t * (5 + i % 4)) % 500) - 10;
      const y = 260 - ((t * (12 + i % 7) + i * 27) % 250);
      ctx.globalAlpha = 0.2 + (i % 4) * 0.10;
      px(ctx, x, y, i % 3 ? '#ff7b3a' : '#ffd27a', 1, 2);
    }
  } else if (biomeId === 'frost') {
    for (let i = 0; i < 42; i++) {
      const x = ((i * 57 + Math.sin(t * 0.4 + i) * 12 + t * (2 + i % 3)) % 500) - 10;
      const y = ((t * (10 + i % 6) + i * 19) % 280);
      ctx.globalAlpha = 0.25 + (i % 3) * 0.12;
      px(ctx, x, y, i % 4 ? '#d4fbff' : '#7de8ff', 1, 1);
      if (i % 7 === 0) px(ctx, x, y + 1, '#ffffff', 1, 1);
    }
  } else if (biomeId === 'nature') {
    for (let i = 0; i < 26; i++) {
      const x = ((i * 83 + t * (8 + i % 5)) % 520) - 20;
      const y = 40 + (i * 37 + Math.sin(t * 0.8 + i) * 14) % 220;
      ctx.globalAlpha = 0.2 + (i % 4) * 0.09;
      px(ctx, x, y, i % 3 ? '#8cf07a' : '#d0ff8a', 2, 1);
    }
  } else {
    for (let i = 0; i < 30; i++) {
      const a = t * 0.3 + i * 1.9;
      const x = 240 + Math.cos(a) * (40 + (i * 13) % 200);
      const y = 135 + Math.sin(a * 0.7) * (30 + (i * 7) % 90);
      ctx.globalAlpha = 0.18 + (i % 4) * 0.10;
      px(ctx, x, y, i % 3 ? '#b07bff' : '#e2c7ff', 1, 1);
    }
  }
  ctx.globalAlpha = 1;
}

// ── Minimap ─────────────────────────────────────────────────────────────────
export function drawMinimap(canvas, dungeon, currentId) {
  const dpr = 1;
  if (canvas.width !== 80 * dpr) { canvas.width = 80; canvas.height = 80; }
  const x = canvas.getContext('2d');
  x.clearRect(0, 0, 80, 80);
  if (!dungeon) return;
  x.fillStyle = 'rgba(8,6,14,0.85)'; x.fillRect(0, 0, 80, 80);
  const layers = dungeon.layers;
  const maxL = layers.length;
  const rowH = 68 / Math.max(1, maxL - 1);
  const current = dungeon.byId.get(currentId);
  for (let l = 0; l < maxL; l++) {
    const nodes = layers[l];
    for (const n of nodes) {
      const nx = nodes.length === 1 ? 40 : 20 + n.x * 45;
      const ny = 6 + n.y * rowH;
      for (const nid of n.next) {
        const m = dungeon.byId.get(nid);
        const mx = dungeon.layers[m.layer].length === 1 ? 40 : 20 + m.x * 45;
        const my = 6 + m.y * rowH;
        x.strokeStyle = n.visited || m.visited ? 'rgba(232,185,92,0.45)' : 'rgba(120,110,140,0.22)';
        x.lineWidth = 1; x.beginPath(); x.moveTo(nx, ny); x.lineTo(mx, my); x.stroke();
      }
    }
  }
  for (const n of dungeon.nodes) {
    const nodes = dungeon.layers[n.layer];
    const nx = nodes.length === 1 ? 40 : 20 + n.x * 45;
    const ny = 6 + n.y * rowH;
    if (!n.seen && !n.visited) continue;
    const col = n.type === 'boss' ? '#ff5f6d' : n.type === 'elite' ? '#ffb340' : n.type === 'treasure' ? '#ffd86b' : n.type === 'shrine' ? '#8cf07a' : n.type === 'start' ? '#b8c2cf' : '#8a84a8';
    x.fillStyle = n.id === currentId ? '#fff' : col;
    if (n.id === currentId) { x.fillRect(nx - 2, ny - 2, 5, 5); x.fillStyle = col; x.fillRect(nx - 1, ny - 1, 3, 3); }
    else x.fillRect(nx - 1, ny - 1, 3, 3);
    if (n.type === 'boss' && (n.seen || n.visited)) { x.fillStyle = '#ff5f6d'; x.fillRect(nx - 2, ny - 3, 1, 7); x.fillRect(nx + 2, ny - 3, 1, 7); }
  }
  // frame
  x.strokeStyle = 'rgba(232,185,92,0.35)'; x.lineWidth = 1; x.strokeRect(0.5, 0.5, 79, 79);
}

// ── Utility: screen shake transform helper ──────────────────────────────────
export function applyShake(ctx, shake) {
  if (!shake) return;
  const x = (Math.random() - 0.5) * shake * 2;
  const y = (Math.random() - 0.5) * shake * 2;
  ctx.translate(x, y);
}

export function drawDamageText(ctx, text, x, y, color, scale = 1, alpha = 1) {
  ctx.globalAlpha = alpha;
  drawPixelText(ctx, text, x, y, { color, align: 'center', scale, shadow: true });
  ctx.globalAlpha = 1;
}
