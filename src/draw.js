import { COLORS, GRID, UNITS, UNIT_BY_ID } from "./data.js";

const INK = COLORS.ink;
let paperPattern = null;

export function setFont(ctx, size, weight = 700, family = '"Baloo 2", sans-serif') {
  ctx.font = `${weight} ${size}px ${family}`;
}

export function text(ctx, value, x, y, size, color = COLORS.cream, options = {}) {
  const {
    align = "center",
    baseline = "middle",
    weight = 700,
    family = '"Baloo 2", sans-serif',
    stroke = 0,
    strokeColor = INK,
    alpha = 1,
    shadow = null,
    letterSpacing = 0,
  } = options;
  ctx.save();
  ctx.globalAlpha *= alpha;
  setFont(ctx, size, weight, family);
  ctx.textAlign = align;
  ctx.textBaseline = baseline;
  ctx.lineJoin = "round";
  if (letterSpacing && "letterSpacing" in ctx) ctx.letterSpacing = `${letterSpacing}px`;
  if (shadow) {
    ctx.fillStyle = shadow;
    ctx.fillText(value, x + 2, y + 3);
  }
  if (stroke > 0) {
    ctx.lineWidth = stroke;
    ctx.strokeStyle = strokeColor;
    ctx.strokeText(value, x, y);
  }
  ctx.fillStyle = color;
  ctx.fillText(value, x, y);
  ctx.restore();
}

export function roundRectPath(ctx, x, y, w, h, r = 10) {
  const radius = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

export function ellipsePath(ctx, x, y, rx, ry) {
  ctx.beginPath();
  ctx.ellipse(x, y, Math.max(0.1, rx), Math.max(0.1, ry), 0, 0, Math.PI * 2);
}

export function drawStar(ctx, x, y, outer, inner = outer * 0.46, points = 5, rotation = -Math.PI / 2) {
  ctx.beginPath();
  for (let i = 0; i < points * 2; i += 1) {
    const radius = i % 2 === 0 ? outer : inner;
    const angle = rotation + (i * Math.PI) / points;
    const px = x + Math.cos(angle) * radius;
    const py = y + Math.sin(angle) * radius;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
}

export function drawHeart(ctx, x, y, size) {
  ctx.beginPath();
  ctx.moveTo(x, y + size * 0.72);
  ctx.bezierCurveTo(x - size * 1.1, y + size * 0.05, x - size * 0.8, y - size * 0.85, x, y - size * 0.32);
  ctx.bezierCurveTo(x + size * 0.8, y - size * 0.85, x + size * 1.1, y + size * 0.05, x, y + size * 0.72);
  ctx.closePath();
}

export function outlined(ctx, fill, stroke = INK, width = 3, pathFn = null) {
  if (pathFn) pathFn();
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (stroke) {
    ctx.lineWidth = width;
    ctx.strokeStyle = stroke;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.stroke();
  }
}

export function line(ctx, x1, y1, x2, y2, color = INK, width = 3) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.stroke();
}

export function drawPaperTexture(ctx, x, y, w, h, alpha = 0.45) {
  if (!paperPattern) {
    const tile = document.createElement("canvas");
    tile.width = 256;
    tile.height = 256;
    const tctx = tile.getContext("2d");
    for (let i = 0; i < 620; i += 1) {
      const px = Math.random() * 256;
      const py = Math.random() * 256;
      const light = Math.random() > 0.48;
      tctx.fillStyle = light ? `rgba(255,255,255,${Math.random() * 0.09})` : `rgba(0,0,0,${Math.random() * 0.1})`;
      tctx.fillRect(px, py, Math.random() > 0.8 ? 2 : 1, 1);
    }
    tctx.lineWidth = 0.6;
    for (let i = 0; i < 55; i += 1) {
      tctx.strokeStyle = `rgba(255,255,255,${0.015 + Math.random() * 0.04})`;
      tctx.beginPath();
      const sx = Math.random() * 256;
      const sy = Math.random() * 256;
      tctx.moveTo(sx, sy);
      tctx.quadraticCurveTo(sx + 12, sy + Math.random() * 6 - 3, sx + 20 + Math.random() * 30, sy + Math.random() * 6 - 3);
      tctx.stroke();
    }
    paperPattern = ctx.createPattern(tile, "repeat");
  }
  ctx.save();
  ctx.globalAlpha *= alpha;
  ctx.fillStyle = paperPattern;
  ctx.fillRect(x, y, w, h);
  ctx.restore();
}

function shadow(ctx, x, y, rx, ry, alpha = 0.32) {
  ctx.save();
  ctx.globalAlpha *= alpha;
  ctx.fillStyle = "#090815";
  ellipsePath(ctx, x, y, rx, ry);
  ctx.fill();
  ctx.restore();
}

export function glow(ctx, x, y, radius, color, alpha = 0.35) {
  const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
  grad.addColorStop(0, color);
  grad.addColorStop(1, "rgba(0,0,0,0)");
  ctx.save();
  ctx.globalAlpha *= alpha;
  ctx.fillStyle = grad;
  ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  ctx.restore();
}

function eye(ctx, x, y, r = 2.5, pupil = INK, shine = true) {
  ctx.fillStyle = INK;
  ellipsePath(ctx, x, y, r, r * 1.15);
  ctx.fill();
  if (shine) {
    ctx.fillStyle = "#ffffff";
    ellipsePath(ctx, x - r * 0.32, y - r * 0.38, r * 0.34, r * 0.34);
    ctx.fill();
  }
}

function blush(ctx, x, y, color = "rgba(255,120,150,0.55)") {
  ctx.fillStyle = color;
  ellipsePath(ctx, x, y, 4.2, 2.4);
  ctx.fill();
}

/* ------------------------------------------------------------------ icons */

export function drawMoonIcon(ctx, x, y, size, color = COLORS.gold) {
  ctx.save();
  ctx.translate(x, y);
  ctx.beginPath();
  ctx.arc(0, 0, size, Math.PI * 0.38, Math.PI * 1.62, false);
  ctx.arc(size * 0.42, 0, size * 0.84, Math.PI * 1.54, Math.PI * 0.46, true);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.strokeStyle = INK;
  ctx.lineWidth = Math.max(1.5, size * 0.16);
  ctx.stroke();
  ctx.restore();
}

export function drawGemIcon(ctx, x, y, size) {
  ctx.save();
  ctx.translate(x, y);
  ctx.beginPath();
  ctx.moveTo(0, -size);
  ctx.lineTo(size * 0.9, -size * 0.22);
  ctx.lineTo(size * 0.5, size * 0.85);
  ctx.lineTo(-size * 0.5, size * 0.85);
  ctx.lineTo(-size * 0.9, -size * 0.22);
  ctx.closePath();
  const grad = ctx.createLinearGradient(0, -size, 0, size);
  grad.addColorStop(0, "#b6f5ff");
  grad.addColorStop(0.45, COLORS.cyan);
  grad.addColorStop(1, "#148ac9");
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = INK;
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-size * 0.9, -size * 0.22);
  ctx.lineTo(size * 0.9, -size * 0.22);
  ctx.moveTo(0, -size);
  ctx.lineTo(-size * 0.35, size * 0.85);
  ctx.moveTo(0, -size);
  ctx.lineTo(size * 0.35, size * 0.85);
  ctx.strokeStyle = "rgba(255,255,255,0.35)";
  ctx.lineWidth = 1.2;
  ctx.stroke();
  ctx.restore();
}

export function drawLock(ctx, x, y, size, color = COLORS.gold) {
  ctx.save();
  ctx.translate(x, y);
  ctx.beginPath();
  ctx.arc(0, -size * 0.18, size * 0.48, Math.PI, 0);
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 0.24;
  ctx.stroke();
  roundRectPath(ctx, -size * 0.62, -size * 0.1, size * 1.24, size * 0.95, size * 0.22);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = INK;
  ctx.stroke();
  ctx.fillStyle = INK;
  ctx.beginPath();
  ctx.arc(0, size * 0.24, size * 0.13, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(-size * 0.07, size * 0.26, size * 0.14, size * 0.28);
  ctx.restore();
}

export function drawSoundIcon(ctx, x, y, size, muted, color = COLORS.cream) {
  ctx.save();
  ctx.translate(x, y);
  ctx.beginPath();
  ctx.moveTo(-size * 0.7, -size * 0.25);
  ctx.lineTo(-size * 0.32, -size * 0.25);
  ctx.lineTo(size * 0.12, -size * 0.65);
  ctx.lineTo(size * 0.12, size * 0.65);
  ctx.lineTo(-size * 0.32, size * 0.25);
  ctx.lineTo(-size * 0.7, size * 0.25);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.lineWidth = 1.8;
  ctx.strokeStyle = INK;
  ctx.stroke();
  if (muted) {
    line(ctx, size * 0.35, -size * 0.3, size * 0.78, size * 0.3, COLORS.coral, 2.4);
    line(ctx, size * 0.78, -size * 0.3, size * 0.35, size * 0.3, COLORS.coral, 2.4);
  } else {
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.55, -0.8, 0.8);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.8;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.85, -0.65, 0.65);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.globalAlpha *= 0.6;
    ctx.stroke();
  }
  ctx.restore();
}

export function drawStarCoin(ctx, x, y, size, time = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(Math.sin(time * 2.2) * 0.08);
  const grad = ctx.createLinearGradient(0, -size, 0, size);
  grad.addColorStop(0, "#fff7a1");
  grad.addColorStop(0.55, COLORS.gold);
  grad.addColorStop(1, "#f3a400");
  drawStar(ctx, 0, 0, size, size * 0.47, 5);
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.lineWidth = Math.max(1.8, size * 0.17);
  ctx.strokeStyle = INK;
  ctx.lineJoin = "round";
  ctx.stroke();
  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ellipsePath(ctx, -size * 0.25, -size * 0.3, size * 0.15, size * 0.1);
  ctx.fill();
  ctx.restore();
}

export function drawSwordIcon(ctx, x, y, size, color = COLORS.cyan) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(-Math.PI / 4);
  roundRectPath(ctx, -size * 0.09, -size * 0.85, size * 0.18, size * 1.1, size * 0.09);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.lineWidth = 1.6;
  ctx.strokeStyle = INK;
  ctx.stroke();
  roundRectPath(ctx, -size * 0.45, size * 0.15, size * 0.9, size * 0.16, size * 0.08);
  ctx.fillStyle = COLORS.gold;
  ctx.fill();
  ctx.stroke();
  roundRectPath(ctx, -size * 0.1, size * 0.25, size * 0.2, size * 0.45, size * 0.08);
  ctx.fillStyle = "#9a5a3c";
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

/* -------------------------------------------------------------- characters */

function toyFace(ctx, x, y, scale = 1) {
  eye(ctx, x - 5 * scale, y, 2.4 * scale);
  eye(ctx, x + 5 * scale, y, 2.4 * scale);
  blush(ctx, x - 10 * scale, y + 5 * scale);
  blush(ctx, x + 10 * scale, y + 5 * scale);
}

function drawTeddy(ctx, time, attack, hurt) {
  const bob = Math.sin(time * 3.1) * 1.2;
  shadow(ctx, 0, 30, 23, 6);
  ctx.translate(0, bob);

  // legs
  outlined(ctx, "#b9783f", INK, 3, () => {
    ellipsePath(ctx, -12, 22, 9, 8);
  });
  outlined(ctx, "#b9783f", INK, 3, () => {
    ellipsePath(ctx, 12, 22, 9, 8);
  });

  // sword arm group
  ctx.save();
  ctx.translate(17, -1);
  ctx.rotate(-0.5 + attack * 1.25);
  line(ctx, 0, 0, 12, -19, INK, 7);
  line(ctx, 0, 0, 12, -19, "#d99655", 4);
  outlined(ctx, "#e8f8ff", INK, 2.5, () => {
    ctx.beginPath();
    ctx.moveTo(9, -16);
    ctx.lineTo(13, -33);
    ctx.lineTo(17, -16);
    ctx.lineTo(16, -13);
    ctx.lineTo(10, -13);
    ctx.closePath();
  });
  line(ctx, 8, -14, 18, -14, COLORS.gold, 4);
  ctx.restore();

  // body
  const bodyGrad = ctx.createLinearGradient(-18, -8, 18, 28);
  bodyGrad.addColorStop(0, "#e5aa6d");
  bodyGrad.addColorStop(1, "#c48147");
  outlined(ctx, bodyGrad, INK, 3.2, () => {
    roundRectPath(ctx, -17, -8, 34, 33, 14);
  });
  outlined(ctx, "#f4cf9f", null, 0, () => {
    ellipsePath(ctx, 2, 8, 11, 12);
  });
  // stitching
  ctx.setLineDash([2, 3]);
  ctx.strokeStyle = "rgba(81,42,18,0.55)";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(-8, 6);
  ctx.lineTo(10, 6);
  ctx.stroke();
  ctx.setLineDash([]);

  // shield
  ctx.save();
  ctx.translate(-21, 3);
  ctx.rotate(-0.12);
  outlined(ctx, "#eafcff", INK, 3, () => {
    ctx.beginPath();
    ctx.moveTo(0, -14);
    ctx.lineTo(13, -9);
    ctx.lineTo(11, 8);
    ctx.quadraticCurveTo(1, 17, 0, 17);
    ctx.quadraticCurveTo(-1, 17, -11, 8);
    ctx.lineTo(-13, -9);
    ctx.closePath();
  });
  drawStar(ctx, 0, 1, 7, 3.3);
  ctx.fillStyle = COLORS.cyan;
  ctx.fill();
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = INK;
  ctx.stroke();
  ctx.restore();

  // head
  outlined(ctx, "#d99655", INK, 3, () => {
    ellipsePath(ctx, -17, -27, 8.5, 8.5);
  });
  outlined(ctx, "#d99655", INK, 3, () => {
    ellipsePath(ctx, 17, -27, 8.5, 8.5);
  });
  outlined(ctx, "#e4aa6c", INK, 2.4, () => {
    ellipsePath(ctx, -17, -27, 4.5, 4.5);
  });
  outlined(ctx, "#e4aa6c", INK, 2.4, () => {
    ellipsePath(ctx, 17, -27, 4.5, 4.5);
  });

  const headGrad = ctx.createLinearGradient(0, -44, 0, -7);
  headGrad.addColorStop(0, "#efbe83");
  headGrad.addColorStop(1, "#cf8c50");
  outlined(ctx, headGrad, INK, 3.2, () => {
    ellipsePath(ctx, 0, -25, 19, 18);
  });
  // helmet
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(0, -25, 19, 18, 0, Math.PI * 1.08, Math.PI * 1.92);
  ctx.lineTo(13, -25);
  ctx.quadraticCurveTo(0, -35, -13, -25);
  ctx.closePath();
  ctx.fillStyle = COLORS.cyan;
  ctx.fill();
  ctx.strokeStyle = INK;
  ctx.lineWidth = 2.4;
  ctx.stroke();
  line(ctx, -14, -31, 13, -31, "rgba(255,255,255,0.55)", 1.5);
  // plume
  ctx.beginPath();
  ctx.moveTo(0, -41);
  ctx.quadraticCurveTo(11, -54, 20, -42);
  ctx.quadraticCurveTo(8, -44, 5, -38);
  ctx.closePath();
  ctx.fillStyle = COLORS.gold;
  ctx.fill();
  ctx.strokeStyle = INK;
  ctx.lineWidth = 2.2;
  ctx.stroke();
  ctx.restore();

  // muzzle and face
  outlined(ctx, "#f3d2a6", null, 0, () => {
    ellipsePath(ctx, 1, -17, 10, 7.5);
  });
  ctx.fillStyle = INK;
  ellipsePath(ctx, 1, -20, 3.1, 2.4);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(1, -19);
  ctx.quadraticCurveTo(1, -14, -2, -15);
  ctx.moveTo(1, -19);
  ctx.quadraticCurveTo(1, -14, 4, -15);
  ctx.strokeStyle = INK;
  ctx.lineWidth = 1.4;
  ctx.stroke();
  eye(ctx, -8, -28, 2.3);
  eye(ctx, 7, -28, 2.3);
  blush(ctx, -13, -19, "rgba(255,115,145,0.45)");
  blush(ctx, 13, -19, "rgba(255,115,145,0.45)");

  if (hurt > 0) {
    ctx.globalCompositeOperation = "source-atop";
    ctx.globalAlpha = hurt * 0.5;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(-40, -60, 80, 100);
    ctx.globalCompositeOperation = "source-over";
  }
}

function drawRobo(ctx, time, attack, hurt) {
  const bob = Math.sin(time * 3.5) * 0.9;
  shadow(ctx, 0, 30, 22, 6);
  ctx.translate(0, bob);

  // wind-up key
  ctx.save();
  ctx.translate(-21, -2);
  ctx.rotate(time * 0.8);
  line(ctx, 0, 0, -10, 0, INK, 5);
  line(ctx, 0, 0, -10, 0, "#f2bf58", 3);
  outlined(ctx, "#f2bf58", INK, 2, () => {
    ellipsePath(ctx, -12, -5, 5, 4);
  });
  outlined(ctx, "#f2bf58", INK, 2, () => {
    ellipsePath(ctx, -12, 5, 5, 4);
  });
  ctx.restore();

  // legs
  outlined(ctx, "#3d7f91", INK, 2.6, () => {
    roundRectPath(ctx, -14, 17, 10, 13, 4);
  });
  outlined(ctx, "#3d7f91", INK, 2.6, () => {
    roundRectPath(ctx, 5, 17, 10, 13, 4);
  });
  outlined(ctx, COLORS.cyan, INK, 2.2, () => {
    roundRectPath(ctx, -16, 25, 14, 6, 3);
  });
  outlined(ctx, COLORS.cyan, INK, 2.2, () => {
    roundRectPath(ctx, 3, 25, 14, 6, 3);
  });

  // arms
  outlined(ctx, "#6fa8b6", INK, 2.6, () => {
    roundRectPath(ctx, -25, -5, 9, 19, 4);
  });
  ctx.save();
  ctx.translate(17, -3);
  const recoil = attack * 5;
  ctx.translate(-recoil, 0);
  outlined(ctx, "#7db6c1", INK, 2.6, () => {
    roundRectPath(ctx, 0, -3, 18, 11, 5);
  });
  outlined(ctx, "#f7d45f", INK, 2.2, () => {
    roundRectPath(ctx, 14, -4, 7, 13, 3);
  });
  if (attack > 0.05) {
    glow(ctx, 25, 2, 10, "rgba(0,212,255,0.8)", attack * 0.8);
    ctx.fillStyle = COLORS.cyan;
    ellipsePath(ctx, 24, 2, 3 + attack * 2, 3 + attack * 2);
    ctx.fill();
  }
  ctx.restore();

  // body
  const bodyGrad = ctx.createLinearGradient(-18, -10, 18, 25);
  bodyGrad.addColorStop(0, "#9ed5dd");
  bodyGrad.addColorStop(1, "#56a9b8");
  outlined(ctx, bodyGrad, INK, 3, () => {
    roundRectPath(ctx, -17, -10, 34, 31, 8);
  });
  outlined(ctx, "#173f50", INK, 2, () => {
    roundRectPath(ctx, -10, -4, 20, 13, 4);
  });
  drawHeart(ctx, 0, 2.5, 5);
  ctx.fillStyle = COLORS.coral;
  ctx.fill();
  // rivets
  [[-12, -6], [12, -6], [-12, 17], [12, 17]].forEach(([x, y]) => {
    ctx.fillStyle = "#d8f6f8";
    ctx.beginPath();
    ctx.arc(x, y, 1.4, 0, Math.PI * 2);
    ctx.fill();
  });

  // head
  outlined(ctx, "#8bc9d4", INK, 3, () => {
    roundRectPath(ctx, -15, -37, 30, 24, 8);
  });
  outlined(ctx, "#173f50", INK, 2, () => {
    roundRectPath(ctx, -10, -31, 20, 12, 5);
  });
  // eyes
  ctx.fillStyle = COLORS.cyan;
  ellipsePath(ctx, -5, -25, 2.6, 3.2);
  ctx.fill();
  ellipsePath(ctx, 5, -25, 2.6, 3.2);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ellipsePath(ctx, -5.8, -26, 0.8, 1);
  ctx.fill();
  ellipsePath(ctx, 4.2, -26, 0.8, 1);
  ctx.fill();
  line(ctx, -4, -18, 4, -18, "#2e6a7b", 1.4);
  // antenna
  line(ctx, 0, -37, 0, -44, INK, 2.4);
  outlined(ctx, COLORS.coral, INK, 1.8, () => {
    ctx.beginPath();
    ctx.arc(0, -46, 3.4, 0, Math.PI * 2);
  });
  // ear bolts
  outlined(ctx, "#f2bf58", INK, 1.8, () => {
    ctx.beginPath();
    ctx.arc(-16, -27, 3, 0, Math.PI * 2);
  });
  outlined(ctx, "#f2bf58", INK, 1.8, () => {
    ctx.beginPath();
    ctx.arc(16, -27, 3, 0, Math.PI * 2);
  });

  if (hurt > 0) {
    ctx.globalAlpha = hurt * 0.55;
    ctx.fillStyle = "#ffffff";
    roundRectPath(ctx, -26, -48, 52, 84, 16);
    ctx.fill();
  }
}

function drawBunny(ctx, time, attack, hurt) {
  const bob = Math.sin(time * 3.4) * 1.2;
  shadow(ctx, 0, 30, 22, 6);
  ctx.translate(0, bob);

  // ears
  ctx.save();
  ctx.translate(-8, -39);
  ctx.rotate(-0.18 + Math.sin(time * 2) * 0.03);
  outlined(ctx, "#f8e5dc", INK, 2.8, () => {
    ellipsePath(ctx, 0, -14, 7, 19);
  });
  outlined(ctx, "#f2a9bd", null, 0, () => {
    ellipsePath(ctx, 0, -14, 3.2, 13);
  });
  ctx.restore();
  ctx.save();
  ctx.translate(8, -40);
  ctx.rotate(0.22 + Math.cos(time * 2) * 0.03);
  outlined(ctx, "#f8e5dc", INK, 2.8, () => {
    ellipsePath(ctx, 0, -14, 7, 19);
  });
  outlined(ctx, "#f2a9bd", null, 0, () => {
    ellipsePath(ctx, 0, -14, 3.2, 13);
  });
  ctx.restore();

  // feet
  outlined(ctx, "#f5d8cd", INK, 2.5, () => {
    ellipsePath(ctx, -10, 24, 8, 5);
  });
  outlined(ctx, "#f5d8cd", INK, 2.5, () => {
    ellipsePath(ctx, 11, 24, 8, 5);
  });

  // body
  outlined(ctx, "#f9e8df", INK, 3, () => {
    roundRectPath(ctx, -15, -8, 30, 32, 13);
  });
  outlined(ctx, "#f7c8c7", null, 0, () => {
    ellipsePath(ctx, 0, 8, 9, 10);
  });

  // wand
  ctx.save();
  ctx.translate(17, 0);
  ctx.rotate(-0.45 + attack * 0.7);
  line(ctx, 0, 5, 9, -20, INK, 4.5);
  line(ctx, 0, 5, 9, -20, "#e8c8a6", 2.5);
  drawHeart(ctx, 11, -23, 7);
  ctx.fillStyle = COLORS.pink;
  ctx.fill();
  ctx.strokeStyle = INK;
  ctx.lineWidth = 1.8;
  ctx.stroke();
  ctx.restore();

  // head
  outlined(ctx, "#faece5", INK, 3, () => {
    ellipsePath(ctx, 0, -26, 17, 15.5);
  });
  // nurse cap
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(0, -34, 16, 12, 0, Math.PI * 1.03, Math.PI * 1.97);
  ctx.closePath();
  ctx.fillStyle = "#fffdf8";
  ctx.fill();
  ctx.strokeStyle = INK;
  ctx.lineWidth = 2.2;
  ctx.stroke();
  ctx.fillStyle = COLORS.coral;
  ctx.fillRect(-1.4, -45, 2.8, 9);
  ctx.fillRect(-5, -41.5, 10, 2.8);
  ctx.restore();

  eye(ctx, -6, -27, 2.2);
  eye(ctx, 6, -27, 2.2);
  ctx.fillStyle = "#ef8eae";
  ctx.beginPath();
  ctx.moveTo(0, -22);
  ctx.lineTo(-2.6, -24.5);
  ctx.quadraticCurveTo(0, -25.5, 2.6, -24.5);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(0, -22);
  ctx.quadraticCurveTo(0, -18, -3, -19);
  ctx.moveTo(0, -22);
  ctx.quadraticCurveTo(0, -18, 3, -19);
  ctx.strokeStyle = INK;
  ctx.lineWidth = 1.2;
  ctx.stroke();
  blush(ctx, -11, -20);
  blush(ctx, 11, -20);

  if (hurt > 0) {
    ctx.globalAlpha = hurt * 0.5;
    ctx.fillStyle = "#ffffff";
    roundRectPath(ctx, -24, -50, 48, 86, 16);
    ctx.fill();
  }
}

function drawDino(ctx, time, attack, hurt) {
  const bob = Math.sin(time * 2.8) * 1.1;
  shadow(ctx, 0, 31, 28, 7);
  ctx.translate(0, bob);

  // tail
  ctx.save();
  ctx.translate(-18, 12);
  ctx.rotate(Math.sin(time * 2.4) * 0.08);
  outlined(ctx, "#67b85f", INK, 3, () => {
    ctx.beginPath();
    ctx.moveTo(0, -8);
    ctx.quadraticCurveTo(-25, 2, -26, -16);
    ctx.quadraticCurveTo(-13, -11, -1, 8);
    ctx.closePath();
  });
  ctx.restore();

  // legs
  outlined(ctx, "#5ba552", INK, 2.6, () => {
    roundRectPath(ctx, -15, 17, 12, 13, 5);
  });
  outlined(ctx, "#5ba552", INK, 2.6, () => {
    roundRectPath(ctx, 5, 17, 12, 13, 5);
  });

  // body
  const bodyGrad = ctx.createLinearGradient(-20, -8, 20, 25);
  bodyGrad.addColorStop(0, "#8fe084");
  bodyGrad.addColorStop(1, "#5cac53");
  outlined(ctx, bodyGrad, INK, 3.2, () => {
    ellipsePath(ctx, 0, 7, 21, 23);
  });
  outlined(ctx, "#e9f1a7", null, 0, () => {
    ellipsePath(ctx, 1, 10, 12, 14);
  });
  // back spikes
  [[-16, -8], [-12, -16], [-5, -22]].forEach(([x, y], index) => {
    ctx.beginPath();
    ctx.moveTo(x - 4, y + 4);
    ctx.lineTo(x + 1, y - 6 - index * 0.5);
    ctx.lineTo(x + 5, y + 3);
    ctx.closePath();
    ctx.fillStyle = COLORS.gold;
    ctx.fill();
    ctx.strokeStyle = INK;
    ctx.lineWidth = 1.8;
    ctx.stroke();
  });

  // arms / gloves
  ctx.save();
  ctx.translate(14, 1);
  ctx.rotate(-0.2 + attack * 0.7);
  line(ctx, 0, 0, 13, 7, INK, 6);
  line(ctx, 0, 0, 13, 7, "#6cbd63", 3.5);
  outlined(ctx, "#ffd166", INK, 2.4, () => {
    ellipsePath(ctx, 16, 9, 8, 7);
  });
  ctx.restore();
  ctx.save();
  ctx.translate(-16, 4);
  line(ctx, 0, 0, -8, 10, INK, 5);
  line(ctx, 0, 0, -8, 10, "#6cbd63", 3);
  outlined(ctx, "#ffd166", INK, 2.4, () => {
    ellipsePath(ctx, -10, 13, 7, 6);
  });
  ctx.restore();

  // head
  outlined(ctx, "#84d879", INK, 3.1, () => {
    ellipsePath(ctx, 3, -20, 20, 16);
  });
  // snout
  outlined(ctx, "#9fea8d", INK, 2.2, () => {
    ellipsePath(ctx, 13, -16, 12, 8);
  });
  ctx.fillStyle = "#3f7d43";
  ellipsePath(ctx, 20, -18, 1.8, 1.2);
  ctx.fill();
  // mouth
  ctx.beginPath();
  ctx.moveTo(8, -12);
  ctx.quadraticCurveTo(14, -9, 22, -13);
  ctx.strokeStyle = INK;
  ctx.lineWidth = 1.4;
  ctx.stroke();
  // teeth
  ctx.fillStyle = "#fffdf0";
  ctx.beginPath();
  ctx.moveTo(11, -11);
  ctx.lineTo(13, -8);
  ctx.lineTo(15, -11);
  ctx.closePath();
  ctx.fill();
  // eye
  eye(ctx, 1, -24, 3);
  blush(ctx, 7, -14, "rgba(255,130,140,0.45)");
  // scarf
  outlined(ctx, COLORS.coral, INK, 2.3, () => {
    roundRectPath(ctx, -12, -6, 29, 7, 3.5);
  });
  ctx.beginPath();
  ctx.moveTo(-8, -2);
  ctx.lineTo(-18, 7);
  ctx.lineTo(-10, 9);
  ctx.lineTo(-3, 1);
  ctx.closePath();
  ctx.fillStyle = COLORS.coral;
  ctx.fill();
  ctx.strokeStyle = INK;
  ctx.lineWidth = 2;
  ctx.stroke();

  if (hurt > 0) {
    ctx.globalAlpha = hurt * 0.5;
    ctx.fillStyle = "#ffffff";
    roundRectPath(ctx, -30, -42, 60, 84, 18);
    ctx.fill();
  }
}

function drawSprout(ctx, time, attack, hurt) {
  const bob = Math.sin(time * 2.7) * 1.3;
  shadow(ctx, 0, 30, 19, 5);
  ctx.translate(0, bob);

  // pot
  outlined(ctx, "#d97c54", INK, 3, () => {
    ctx.beginPath();
    ctx.moveTo(-14, 8);
    ctx.lineTo(14, 8);
    ctx.lineTo(10, 28);
    ctx.lineTo(-10, 28);
    ctx.closePath();
  });
  outlined(ctx, "#f09b6c", INK, 2.2, () => {
    roundRectPath(ctx, -17, 4, 34, 8, 3);
  });
  ctx.fillStyle = "#6f4a33";
  ellipsePath(ctx, 0, 6, 13, 3);
  ctx.fill();

  // stem
  line(ctx, 0, 4, 0, -12, INK, 6);
  line(ctx, 0, 4, 0, -12, "#72c76e", 3.4);
  // leaves
  outlined(ctx, "#8ee08a", INK, 2.2, () => {
    ctx.beginPath();
    ctx.moveTo(0, -4);
    ctx.quadraticCurveTo(-20, -9, -18, -18);
    ctx.quadraticCurveTo(-6, -17, 0, -4);
    ctx.closePath();
  });
  outlined(ctx, "#8ee08a", INK, 2.2, () => {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(19, -5, 18, -14);
    ctx.quadraticCurveTo(6, -13, 0, 0);
    ctx.closePath();
  });

  // glowing star head
  glow(ctx, 0, -25, 27, "rgba(255,215,0,0.5)", 0.9);
  const pulse = 1 + Math.sin(time * 3.5) * 0.05;
  ctx.save();
  ctx.translate(0, -25);
  ctx.scale(pulse, pulse);
  drawStar(ctx, 0, 0, 18, 8.5);
  const grad = ctx.createLinearGradient(0, -18, 0, 18);
  grad.addColorStop(0, "#fff5a1");
  grad.addColorStop(1, COLORS.gold);
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.lineWidth = 2.8;
  ctx.strokeStyle = INK;
  ctx.lineJoin = "round";
  ctx.stroke();
  eye(ctx, -5, 0, 1.9);
  eye(ctx, 5, 0, 1.9);
  ctx.beginPath();
  ctx.arc(0, 4, 3, 0.2, Math.PI - 0.2);
  ctx.strokeStyle = INK;
  ctx.lineWidth = 1.2;
  ctx.stroke();
  blush(ctx, -9, 5, "rgba(255,120,120,0.4)");
  blush(ctx, 9, 5, "rgba(255,120,120,0.4)");
  ctx.restore();

  if (hurt > 0) {
    ctx.globalAlpha = hurt * 0.5;
    ctx.fillStyle = "#ffffff";
    roundRectPath(ctx, -20, -46, 40, 80, 16);
    ctx.fill();
  }
}

function drawOwl(ctx, time, attack, hurt) {
  const bob = Math.sin(time * 3.2) * 1.0;
  shadow(ctx, 0, 30, 22, 6);
  ctx.translate(0, bob);

  // wings
  ctx.save();
  ctx.translate(-16, 1);
  ctx.rotate(0.12 + Math.sin(time * 4) * 0.06);
  outlined(ctx, "#7d68be", INK, 2.6, () => {
    ellipsePath(ctx, -3, 2, 9, 17);
  });
  ctx.restore();
  ctx.save();
  ctx.translate(16, 1);
  ctx.rotate(-0.12 - Math.sin(time * 4) * 0.06);
  outlined(ctx, "#7d68be", INK, 2.6, () => {
    ellipsePath(ctx, 3, 2, 9, 17);
  });
  ctx.restore();

  // body
  const grad = ctx.createLinearGradient(0, -18, 0, 28);
  grad.addColorStop(0, "#b9a4f3");
  grad.addColorStop(1, "#8066c8");
  outlined(ctx, grad, INK, 3.2, () => {
    ellipsePath(ctx, 0, 3, 20, 24);
  });

  // clock belly
  outlined(ctx, "#f7e7c3", INK, 2.6, () => {
    ctx.beginPath();
    ctx.arc(0, 5, 12.5, 0, Math.PI * 2);
  });
  for (let i = 0; i < 12; i += 1) {
    const a = (i / 12) * Math.PI * 2;
    line(
      ctx,
      Math.cos(a) * 9.5,
      5 + Math.sin(a) * 9.5,
      Math.cos(a) * 11,
      5 + Math.sin(a) * 11,
      "#6f5a42",
      1,
    );
  }
  line(ctx, 0, 5, Math.cos(time * 0.7) * 6, 5 + Math.sin(time * 0.7) * 6, "#6f5a42", 1.7);
  line(ctx, 0, 5, Math.cos(time * 2.1) * 4, 5 + Math.sin(time * 2.1) * 4, COLORS.coral, 1.2);

  // head / ear tufts
  outlined(ctx, "#a48be4", INK, 2.8, () => {
    ctx.beginPath();
    ctx.moveTo(-17, -17);
    ctx.lineTo(-14, -36);
    ctx.lineTo(-4, -24);
    ctx.closePath();
  });
  outlined(ctx, "#a48be4", INK, 2.8, () => {
    ctx.beginPath();
    ctx.moveTo(17, -17);
    ctx.lineTo(14, -36);
    ctx.lineTo(4, -24);
    ctx.closePath();
  });
  outlined(ctx, "#c2aef7", INK, 3, () => {
    ellipsePath(ctx, 0, -22, 18, 15);
  });
  // goggles
  outlined(ctx, "#3c3159", INK, 2, () => {
    roundRectPath(ctx, -16, -30, 32, 13, 6);
  });
  ctx.fillStyle = "#6df0ff";
  ellipsePath(ctx, -7, -23.5, 5.2, 5.2);
  ctx.fill();
  ellipsePath(ctx, 7, -23.5, 5.2, 5.2);
  ctx.fill();
  ctx.strokeStyle = INK;
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.fillStyle = "#173f50";
  ellipsePath(ctx, -6, -23, 2.2, 2.5);
  ctx.fill();
  ellipsePath(ctx, 8, -23, 2.2, 2.5);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ellipsePath(ctx, -7, -24, 0.8, 0.8);
  ctx.fill();
  ellipsePath(ctx, 7, -24, 0.8, 0.8);
  ctx.fill();
  // beak
  ctx.beginPath();
  ctx.moveTo(-4, -16);
  ctx.lineTo(0, -10);
  ctx.lineTo(4, -16);
  ctx.closePath();
  ctx.fillStyle = COLORS.gold;
  ctx.fill();
  ctx.strokeStyle = INK;
  ctx.lineWidth = 1.6;
  ctx.stroke();
  // feet
  line(ctx, -7, 25, -9, 30, COLORS.gold, 2.4);
  line(ctx, 7, 25, 9, 30, COLORS.gold, 2.4);

  if (attack > 0.05) {
    glow(ctx, 19, -2, 12, "rgba(255,215,0,0.7)", attack);
  }
  if (hurt > 0) {
    ctx.globalAlpha = hurt * 0.5;
    ctx.fillStyle = "#ffffff";
    roundRectPath(ctx, -25, -44, 50, 80, 18);
    ctx.fill();
  }
}

function drawUnicorn(ctx, time, attack, hurt) {
  const bob = Math.sin(time * 3.1) * 1.1;
  shadow(ctx, 0, 30, 25, 6);
  ctx.translate(0, bob);

  // tail
  ctx.save();
  ctx.translate(-18, 8);
  for (let i = 0; i < 3; i += 1) {
    ctx.beginPath();
    ctx.moveTo(0, -4 + i * 4);
    ctx.quadraticCurveTo(-18 - i * 3, -10 + i * 7, -24 - i * 2, 4 + i * 5);
    ctx.strokeStyle = INK;
    ctx.lineWidth = 6;
    ctx.stroke();
    ctx.strokeStyle = ["#ff9edb", "#00d4ff", "#ffd700"][i];
    ctx.lineWidth = 3.4;
    ctx.stroke();
  }
  ctx.restore();

  // legs
  outlined(ctx, "#f2eaff", INK, 2.5, () => {
    roundRectPath(ctx, -14, 17, 10, 14, 4);
  });
  outlined(ctx, "#f2eaff", INK, 2.5, () => {
    roundRectPath(ctx, 5, 17, 10, 14, 4);
  });
  // body
  outlined(ctx, "#fff8ff", INK, 3, () => {
    ellipsePath(ctx, -1, 7, 20, 18);
  });
  // mane
  for (let i = 0; i < 4; i += 1) {
    ctx.beginPath();
    ctx.arc(-3 + i * 2, -25 + i * 1.2, 9 - i * 0.5, Math.PI * 0.75, Math.PI * 1.8);
    ctx.strokeStyle = INK;
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.strokeStyle = ["#ff9edb", "#00d4ff", "#ffd700", "#b69cff"][i];
    ctx.lineWidth = 2.8;
    ctx.stroke();
  }
  // head
  outlined(ctx, "#fff9ff", INK, 3, () => {
    ellipsePath(ctx, 8, -21, 15, 15);
  });
  // snout
  outlined(ctx, "#ffeef8", INK, 2.3, () => {
    ellipsePath(ctx, 17, -14, 9, 7);
  });
  ctx.fillStyle = "#d98ab6";
  ellipsePath(ctx, 22, -16, 1.5, 1);
  ctx.fill();
  // horn
  ctx.beginPath();
  ctx.moveTo(4, -35);
  ctx.lineTo(8, -50);
  ctx.lineTo(13, -34);
  ctx.closePath();
  const hornGrad = ctx.createLinearGradient(8, -50, 8, -34);
  hornGrad.addColorStop(0, "#fff7a1");
  hornGrad.addColorStop(1, COLORS.gold);
  ctx.fillStyle = hornGrad;
  ctx.fill();
  ctx.strokeStyle = INK;
  ctx.lineWidth = 2;
  ctx.stroke();
  line(ctx, 6, -39, 11, -38, "rgba(160,100,0,0.6)", 1);
  line(ctx, 7, -44, 10, -43, "rgba(160,100,0,0.6)", 1);
  // eyes
  eye(ctx, 5, -23, 2.8);
  blush(ctx, 14, -15, "rgba(255,120,170,0.5)");
  // wand
  ctx.save();
  ctx.translate(20, 0);
  ctx.rotate(-0.4 + attack * 0.5);
  line(ctx, 0, 8, 8, -17, INK, 4);
  line(ctx, 0, 8, 8, -17, "#f7d8a8", 2.2);
  drawStar(ctx, 9, -20, 6.5, 3, 5, time);
  ctx.fillStyle = COLORS.gold;
  ctx.fill();
  ctx.strokeStyle = INK;
  ctx.lineWidth = 1.6;
  ctx.stroke();
  ctx.restore();

  if (attack > 0.05) glow(ctx, 25, -5, 16, "rgba(255,158,219,0.7)", attack * 0.7);
  if (hurt > 0) {
    ctx.globalAlpha = hurt * 0.5;
    ctx.fillStyle = "#ffffff";
    roundRectPath(ctx, -28, -52, 56, 88, 20);
    ctx.fill();
  }
}

function drawDragon(ctx, time, attack, hurt) {
  const bob = Math.sin(time * 2.9) * 1.2;
  shadow(ctx, 0, 31, 28, 7);
  ctx.translate(0, bob);

  // wings
  ctx.save();
  ctx.translate(-9, -4);
  ctx.rotate(Math.sin(time * 3.2) * 0.05);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(-27, -26, -31, -2);
  ctx.quadraticCurveTo(-24, 1, -25, 14);
  ctx.quadraticCurveTo(-14, 7, 0, 0);
  ctx.closePath();
  ctx.fillStyle = "#7f5bc9";
  ctx.fill();
  ctx.strokeStyle = INK;
  ctx.lineWidth = 2.5;
  ctx.stroke();
  line(ctx, -6, 0, -24, -12, "#a987e9", 1.5);
  line(ctx, -5, 2, -23, 6, "#a987e9", 1.5);
  ctx.restore();

  // tail
  ctx.save();
  ctx.translate(-18, 13);
  ctx.rotate(Math.sin(time * 2.2) * 0.06);
  ctx.beginPath();
  ctx.moveTo(0, -7);
  ctx.quadraticCurveTo(-25, 4, -28, -9);
  ctx.quadraticCurveTo(-22, -12, -19, -6);
  ctx.strokeStyle = INK;
  ctx.lineWidth = 9;
  ctx.stroke();
  ctx.strokeStyle = "#ff8d5c";
  ctx.lineWidth = 5.5;
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-28, -9);
  ctx.lineTo(-36, -16);
  ctx.lineTo(-33, -3);
  ctx.closePath();
  ctx.fillStyle = COLORS.gold;
  ctx.fill();
  ctx.strokeStyle = INK;
  ctx.lineWidth = 1.8;
  ctx.stroke();
  ctx.restore();

  // legs
  outlined(ctx, "#e9794d", INK, 2.6, () => {
    roundRectPath(ctx, -15, 17, 12, 14, 5);
  });
  outlined(ctx, "#e9794d", INK, 2.6, () => {
    roundRectPath(ctx, 5, 17, 12, 14, 5);
  });
  // body
  const grad = ctx.createLinearGradient(0, -14, 0, 28);
  grad.addColorStop(0, "#ffb07a");
  grad.addColorStop(1, "#f0774a");
  outlined(ctx, grad, INK, 3.2, () => {
    ellipsePath(ctx, 0, 7, 21, 21);
  });
  outlined(ctx, "#ffe3a8", null, 0, () => {
    ellipsePath(ctx, 1, 10, 12, 12);
  });
  // belly lines
  for (let i = 0; i < 3; i += 1) {
    ctx.beginPath();
    ctx.arc(1, 3 + i * 5, 8, 0.3, Math.PI - 0.3);
    ctx.strokeStyle = "rgba(180,90,40,0.4)";
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  // head
  outlined(ctx, "#ff9c64", INK, 3, () => {
    ellipsePath(ctx, 5, -21, 18, 15);
  });
  // snout
  outlined(ctx, "#ffc08d", INK, 2.2, () => {
    ellipsePath(ctx, 16, -16, 10, 7);
  });
  ctx.fillStyle = "#9d442e";
  ellipsePath(ctx, 22, -18, 1.6, 1);
  ctx.fill();
  // horns
  outlined(ctx, "#ffe3a8", INK, 2, () => {
    ctx.beginPath();
    ctx.moveTo(-6, -34);
    ctx.quadraticCurveTo(-10, -45, -2, -42);
    ctx.lineTo(-1, -34);
    ctx.closePath();
  });
  outlined(ctx, "#ffe3a8", INK, 2, () => {
    ctx.beginPath();
    ctx.moveTo(10, -34);
    ctx.quadraticCurveTo(16, -44, 18, -35);
    ctx.closePath();
  });
  // eye
  eye(ctx, 3, -24, 3);
  blush(ctx, 12, -12, "rgba(255,100,100,0.35)");
  // mouth
  ctx.beginPath();
  ctx.moveTo(10, -12);
  ctx.quadraticCurveTo(16, -9, 22, -13);
  ctx.strokeStyle = INK;
  ctx.lineWidth = 1.4;
  ctx.stroke();
  // tiny arms
  line(ctx, 14, 2, 20, 7, INK, 5);
  line(ctx, 14, 2, 20, 7, "#f0774a", 3);
  if (attack > 0.1) {
    glow(ctx, 28, -10, 20, "rgba(255,180,60,0.9)", attack * 0.9);
    ctx.fillStyle = attack > 0.5 ? "#ffd166" : "#ff8d5c";
    ctx.beginPath();
    ctx.moveTo(25, -12);
    ctx.quadraticCurveTo(38, -18, 36, -8);
    ctx.quadraticCurveTo(32, -5, 25, -12);
    ctx.fill();
  }
  if (hurt > 0) {
    ctx.globalAlpha = hurt * 0.5;
    ctx.fillStyle = "#ffffff";
    roundRectPath(ctx, -30, -48, 60, 88, 20);
    ctx.fill();
  }
}

export function drawUnit(ctx, id, x, y, scale = 1, options = {}) {
  const unit = UNIT_BY_ID[id];
  if (!unit) return;
  const { time = 0, attack = 0, hurt = 0, alpha = 1, flip = false } = options;
  ctx.save();
  ctx.globalAlpha *= alpha;
  ctx.translate(x, y);
  if (flip) ctx.scale(-1, 1);
  ctx.scale(scale, scale);
  const draw = {
    teddy: drawTeddy,
    robo: drawRobo,
    bunny: drawBunny,
    dino: drawDino,
    sprout: drawSprout,
    owl: drawOwl,
    unicorn: drawUnicorn,
    dragon: drawDragon,
  }[id];
  if (draw) draw(ctx, time, attack, hurt);
  ctx.restore();
}

/* ---------------------------------------------------------------- enemies */

function drawMouse(ctx, time, attack, hurt) {
  const bob = Math.sin(time * 6.2) * 1.3;
  shadow(ctx, 0, 27, 18, 5);
  ctx.translate(0, bob);
  // tail
  ctx.beginPath();
  ctx.moveTo(-12, 14);
  ctx.quadraticCurveTo(-30, 22, -27, 4);
  ctx.strokeStyle = INK;
  ctx.lineWidth = 3.6;
  ctx.stroke();
  ctx.strokeStyle = "#f2a6b8";
  ctx.lineWidth = 1.8;
  ctx.stroke();
  // legs
  outlined(ctx, "#8e8ba3", INK, 2.3, () => {
    ellipsePath(ctx, -8, 20, 6, 5);
  });
  outlined(ctx, "#8e8ba3", INK, 2.3, () => {
    ellipsePath(ctx, 7, 20, 6, 5);
  });
  // body
  outlined(ctx, "#a9a6bb", INK, 2.8, () => {
    ellipsePath(ctx, -2, 4, 16, 18);
  });
  outlined(ctx, "#c9c6d8", null, 0, () => {
    ellipsePath(ctx, -1, 9, 8, 9);
  });
  // arms reaching
  ctx.save();
  ctx.translate(10, 0);
  ctx.rotate(-0.2 + attack * 0.5);
  line(ctx, 0, 0, 15, 7, INK, 5);
  line(ctx, 0, 0, 15, 7, "#a9a6bb", 3);
  outlined(ctx, "#b9b6c9", INK, 1.8, () => {
    ellipsePath(ctx, 17, 8, 4, 3.5);
  });
  ctx.restore();
  ctx.save();
  ctx.translate(2, 5);
  ctx.rotate(0.2);
  line(ctx, 0, 0, 14, 4, INK, 4.5);
  line(ctx, 0, 0, 14, 4, "#a9a6bb", 2.6);
  outlined(ctx, "#b9b6c9", INK, 1.8, () => {
    ellipsePath(ctx, 16, 5, 4, 3.5);
  });
  ctx.restore();
  // ears
  outlined(ctx, "#9c99b0", INK, 2.5, () => {
    ctx.beginPath();
    ctx.arc(-12, -22, 9, 0, Math.PI * 2);
  });
  outlined(ctx, "#9c99b0", INK, 2.5, () => {
    ctx.beginPath();
    ctx.arc(11, -23, 9, 0, Math.PI * 2);
  });
  outlined(ctx, "#d8a5b2", null, 0, () => {
    ctx.beginPath();
    ctx.arc(-12, -22, 4.5, 0, Math.PI * 2);
  });
  outlined(ctx, "#d8a5b2", null, 0, () => {
    ctx.beginPath();
    ctx.arc(11, -23, 4.5, 0, Math.PI * 2);
  });
  // torn ear notch
  ctx.beginPath();
  ctx.moveTo(7, -31);
  ctx.lineTo(10, -25);
  ctx.lineTo(13, -32);
  ctx.closePath();
  ctx.fillStyle = "#6c697d";
  ctx.fill();
  // head
  outlined(ctx, "#b3b0c3", INK, 2.7, () => {
    ellipsePath(ctx, 0, -14, 16, 13);
  });
  // glowing eyes
  glow(ctx, -5, -16, 7, "rgba(125,255,176,0.5)", 0.8);
  glow(ctx, 6, -16, 7, "rgba(125,255,176,0.5)", 0.8);
  ctx.fillStyle = "#7dffb0";
  ellipsePath(ctx, -5, -16, 3, 3.4);
  ctx.fill();
  ellipsePath(ctx, 6, -16, 3, 3.4);
  ctx.fill();
  ctx.fillStyle = INK;
  ellipsePath(ctx, -5, -16, 1, 1.7);
  ctx.fill();
  ellipsePath(ctx, 6, -16, 1, 1.7);
  ctx.fill();
  // snout
  outlined(ctx, "#d8d4e5", null, 0, () => {
    ellipsePath(ctx, 1, -9, 6, 4);
  });
  ctx.fillStyle = "#e26f8b";
  ellipsePath(ctx, 1, -10, 2, 1.4);
  ctx.fill();
  // teeth
  ctx.fillStyle = "#fffdf0";
  ctx.beginPath();
  ctx.moveTo(-3, -6);
  ctx.lineTo(-1, -2);
  ctx.lineTo(1, -6);
  ctx.lineTo(3, -2);
  ctx.lineTo(4, -6);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = INK;
  ctx.lineWidth = 1;
  ctx.stroke();
  if (hurt > 0) {
    ctx.globalAlpha = hurt * 0.6;
    ctx.fillStyle = "#ffffff";
    roundRectPath(ctx, -23, -38, 46, 70, 16);
    ctx.fill();
  }
}

function drawBat(ctx, time, attack, hurt) {
  const flap = Math.sin(time * 12) * 0.55;
  shadow(ctx, 0, 25, 16, 4);
  ctx.translate(0, -2 + Math.sin(time * 4) * 2);
  // wings
  for (const side of [-1, 1]) {
    ctx.save();
    ctx.scale(side, 1);
    ctx.rotate(-flap * 0.55);
    ctx.beginPath();
    ctx.moveTo(5, -4);
    ctx.quadraticCurveTo(18, -25, 30, -14);
    ctx.quadraticCurveTo(24, -10, 26, -2);
    ctx.quadraticCurveTo(19, -4, 17, 3);
    ctx.quadraticCurveTo(11, 0, 5, 4);
    ctx.closePath();
    ctx.fillStyle = "#7a4bd4";
    ctx.fill();
    ctx.strokeStyle = INK;
    ctx.lineWidth = 2.4;
    ctx.stroke();
    line(ctx, 7, -2, 22, -12, "#9b72e0", 1.2);
    line(ctx, 8, 1, 21, -4, "#9b72e0", 1.2);
    ctx.restore();
  }
  // body
  outlined(ctx, "#9b72e0", INK, 2.7, () => {
    ellipsePath(ctx, 0, 1, 12, 15);
  });
  // ears
  outlined(ctx, "#8a5fd0", INK, 2.2, () => {
    ctx.beginPath();
    ctx.moveTo(-9, -10);
    ctx.lineTo(-13, -24);
    ctx.lineTo(-2, -15);
    ctx.closePath();
  });
  outlined(ctx, "#8a5fd0", INK, 2.2, () => {
    ctx.beginPath();
    ctx.moveTo(9, -10);
    ctx.lineTo(13, -24);
    ctx.lineTo(2, -15);
    ctx.closePath();
  });
  // face
  eye(ctx, -4.5, -7, 2.4, INK);
  eye(ctx, 4.5, -7, 2.4, INK);
  ctx.fillStyle = COLORS.pink;
  ellipsePath(ctx, 0, -1, 2, 1.5);
  ctx.fill();
  // fangs
  ctx.fillStyle = "#fffdf0";
  ctx.beginPath();
  ctx.moveTo(-3, 3);
  ctx.lineTo(-2, 8);
  ctx.lineTo(0, 3);
  ctx.moveTo(3, 3);
  ctx.lineTo(2, 8);
  ctx.lineTo(0, 3);
  ctx.fill();
  if (hurt > 0) {
    ctx.globalAlpha = hurt * 0.6;
    ctx.fillStyle = "#ffffff";
    roundRectPath(ctx, -28, -30, 56, 56, 16);
    ctx.fill();
  }
}

function drawSlug(ctx, time, attack, hurt) {
  const bob = Math.sin(time * 2.4) * 1.2;
  shadow(ctx, 0, 28, 24, 6);
  ctx.translate(0, bob);
  // slime
  ctx.fillStyle = "rgba(125,255,176,0.2)";
  ellipsePath(ctx, -3, 25, 24, 6);
  ctx.fill();
  // body
  const grad = ctx.createLinearGradient(0, -16, 0, 27);
  grad.addColorStop(0, "#7d8fb8");
  grad.addColorStop(1, "#4d5e86");
  outlined(ctx, grad, INK, 3, () => {
    ctx.beginPath();
    ctx.moveTo(-19, 20);
    ctx.quadraticCurveTo(-25, 5, -16, -4);
    ctx.quadraticCurveTo(-10, -13, 0, -12);
    ctx.quadraticCurveTo(18, -14, 22, 4);
    ctx.quadraticCurveTo(26, 20, 17, 24);
    ctx.quadraticCurveTo(0, 30, -19, 20);
    ctx.closePath();
  });
  // spots
  [[-10, 6, 3.5], [7, 2, 3], [-2, 13, 2.5]].forEach(([x, y, r]) => {
    ctx.fillStyle = "rgba(190,210,240,0.28)";
    ellipsePath(ctx, x, y, r, r * 0.7);
    ctx.fill();
  });
  // eyes stalks
  for (const [x, tilt] of [[-8, -0.25], [6, 0.2]]) {
    ctx.save();
    ctx.translate(x, -10);
    ctx.rotate(tilt);
    line(ctx, 0, 0, 0, -12, INK, 4);
    line(ctx, 0, 0, 0, -12, "#7d8fb8", 2.2);
    outlined(ctx, "#d7e2f2", INK, 1.8, () => {
      ctx.beginPath();
      ctx.arc(0, -15, 4.2, 0, Math.PI * 2);
    });
    eye(ctx, 0, -15, 1.6);
    ctx.restore();
  }
  // mouth
  ctx.beginPath();
  ctx.moveTo(-4, 10);
  ctx.quadraticCurveTo(1, 15, 6, 10);
  ctx.strokeStyle = INK;
  ctx.lineWidth = 1.6;
  ctx.stroke();
  // snot bubble
  const bubble = 4 + Math.sin(time * 1.8) * 1.8;
  ctx.fillStyle = "rgba(180,230,255,0.75)";
  ctx.beginPath();
  ctx.arc(7, 6, bubble, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(120,180,220,0.8)";
  ctx.lineWidth = 1;
  ctx.stroke();
  if (hurt > 0) {
    ctx.globalAlpha = hurt * 0.6;
    ctx.fillStyle = "#ffffff";
    roundRectPath(ctx, -28, -32, 56, 66, 18);
    ctx.fill();
  }
}

function drawClown(ctx, time, attack, hurt) {
  const bob = Math.sin(time * 3.5) * 1.2;
  shadow(ctx, 0, 30, 22, 6);
  ctx.translate(0, bob);
  // arms
  for (const side of [-1, 1]) {
    ctx.save();
    ctx.translate(side * 15, 3);
    ctx.rotate(side * (-0.25 + attack * 0.4));
    line(ctx, 0, 0, side * 11, 15, INK, 5);
    line(ctx, 0, 0, side * 11, 15, "#6b3f9c", 3);
    outlined(ctx, "#f5ecff", INK, 1.8, () => {
      ctx.beginPath();
      ctx.arc(side * 13, 17, 4.5, 0, Math.PI * 2);
    });
    ctx.restore();
  }
  // body
  outlined(ctx, "#6b3f9c", INK, 3, () => {
    roundRectPath(ctx, -16, -4, 32, 31, 10);
  });
  // ruff
  for (let i = 0; i < 7; i += 1) {
    const angle = (i / 7) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(Math.cos(angle) * 10, -4 + Math.sin(angle) * 4, 4, 0, Math.PI * 2);
    ctx.fillStyle = i % 2 ? "#f5ecff" : "#d7c7ff";
    ctx.fill();
    ctx.strokeStyle = INK;
    ctx.lineWidth = 1.2;
    ctx.stroke();
  }
  // buttons
  ctx.fillStyle = COLORS.gold;
  [5, 13, 21].forEach((y) => {
    ctx.beginPath();
    ctx.arc(0, y, 1.6, 0, Math.PI * 2);
    ctx.fill();
  });
  // head
  outlined(ctx, "#f4eaff", INK, 2.8, () => {
    ellipsePath(ctx, 0, -20, 16, 15);
  });
  // hair
  for (const side of [-1, 1]) {
    outlined(ctx, "#ff6b7a", INK, 2, () => {
      ctx.beginPath();
      ctx.arc(side * 15, -21, 6, 0, Math.PI * 2);
    });
  }
  // hat
  ctx.beginPath();
  ctx.moveTo(-12, -31);
  ctx.lineTo(-9, -46);
  ctx.lineTo(8, -46);
  ctx.lineTo(11, -31);
  ctx.closePath();
  ctx.fillStyle = "#4b2b73";
  ctx.fill();
  ctx.strokeStyle = INK;
  ctx.lineWidth = 2.4;
  ctx.stroke();
  line(ctx, -11, -35, 10, -35, COLORS.gold, 3);
  outlined(ctx, "#4b2b73", INK, 2, () => {
    roundRectPath(ctx, -16, -33, 32, 5, 2);
  });
  // eyes
  ctx.fillStyle = "#1b1330";
  ctx.beginPath();
  ctx.moveTo(-9, -24);
  ctx.lineTo(-3, -22);
  ctx.lineTo(-8, -19);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(9, -24);
  ctx.lineTo(3, -22);
  ctx.lineTo(8, -19);
  ctx.closePath();
  ctx.fill();
  // nose
  ctx.fillStyle = "#ff4d6d";
  ctx.beginPath();
  ctx.arc(0, -16, 3.5, 0, Math.PI * 2);
  ctx.fill();
  // grin
  ctx.beginPath();
  ctx.moveTo(-10, -10);
  ctx.quadraticCurveTo(-5, -3, 0, -7);
  ctx.quadraticCurveTo(5, -3, 10, -10);
  ctx.strokeStyle = INK;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = "#fffdf0";
  for (let i = -1; i <= 1; i += 1) {
    ctx.beginPath();
    ctx.moveTo(i * 4 - 2, -9);
    ctx.lineTo(i * 4, -5);
    ctx.lineTo(i * 4 + 2, -9);
    ctx.fill();
  }
  if (hurt > 0) {
    ctx.globalAlpha = hurt * 0.55;
    ctx.fillStyle = "#ffffff";
    roundRectPath(ctx, -22, -50, 44, 84, 18);
    ctx.fill();
  }
}

function drawKing(ctx, time, attack, hurt) {
  const bob = Math.sin(time * 2.2) * 2;
  shadow(ctx, 0, 37, 31, 8, 0.45);
  ctx.translate(0, bob);
  // smoke
  for (let i = 0; i < 4; i += 1) {
    const angle = time * 0.6 + i * 1.7;
    const r = 18 + i * 5;
    ctx.fillStyle = `rgba(122,75,212,${0.14 - i * 0.02})`;
    ellipsePath(ctx, Math.cos(angle) * r, 15 + Math.sin(angle * 1.3) * 8, 10 + i * 2, 6 + i);
    ctx.fill();
  }
  // cape
  ctx.beginPath();
  ctx.moveTo(-22, -8);
  ctx.quadraticCurveTo(-37, 12, -30, 34);
  ctx.lineTo(0, 28);
  ctx.lineTo(30, 34);
  ctx.quadraticCurveTo(37, 12, 22, -8);
  ctx.closePath();
  ctx.fillStyle = "#38235c";
  ctx.fill();
  ctx.strokeStyle = INK;
  ctx.lineWidth = 2.8;
  ctx.stroke();
  // body
  const grad = ctx.createLinearGradient(0, -20, 0, 32);
  grad.addColorStop(0, "#533578");
  grad.addColorStop(1, "#2c1a49");
  outlined(ctx, grad, INK, 3.2, () => {
    ellipsePath(ctx, 0, 7, 24, 26);
  });
  // claws
  for (const side of [-1, 1]) {
    ctx.save();
    ctx.translate(side * 20, 1);
    ctx.rotate(side * (0.2 - attack * 0.55));
    line(ctx, 0, 0, side * 14, 14, INK, 6);
    line(ctx, 0, 0, side * 14, 14, "#3d255e", 3.6);
    for (let i = -1; i <= 1; i += 1) {
      line(ctx, side * 16, 16, side * (20 + i * 3), 22 + Math.abs(i) * 2, "#f4eaff", 1.7);
    }
    ctx.restore();
  }
  // head
  outlined(ctx, "#3d255e", INK, 3.1, () => {
    ellipsePath(ctx, 0, -20, 20, 18);
  });
  // crown
  ctx.beginPath();
  ctx.moveTo(-16, -33);
  ctx.lineTo(-20, -48);
  ctx.lineTo(-8, -41);
  ctx.lineTo(0, -52);
  ctx.lineTo(8, -41);
  ctx.lineTo(20, -48);
  ctx.lineTo(16, -33);
  ctx.closePath();
  ctx.fillStyle = COLORS.gold;
  ctx.fill();
  ctx.strokeStyle = INK;
  ctx.lineWidth = 2.2;
  ctx.stroke();
  ctx.fillStyle = COLORS.coral;
  ctx.beginPath();
  ctx.arc(0, -40, 2.2, 0, Math.PI * 2);
  ctx.fill();
  // eyes
  glow(ctx, -7, -22, 11, "rgba(255,77,109,0.8)", 0.9);
  glow(ctx, 7, -22, 11, "rgba(255,77,109,0.8)", 0.9);
  ctx.fillStyle = "#ff4d6d";
  ctx.beginPath();
  ctx.moveTo(-12, -24);
  ctx.lineTo(-3, -22);
  ctx.lineTo(-11, -18);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(12, -24);
  ctx.lineTo(3, -22);
  ctx.lineTo(11, -18);
  ctx.closePath();
  ctx.fill();
  // grin
  ctx.beginPath();
  ctx.moveTo(-12, -11);
  ctx.quadraticCurveTo(-6, -4, 0, -8);
  ctx.quadraticCurveTo(6, -4, 12, -11);
  ctx.strokeStyle = "#f4eaff";
  ctx.lineWidth = 2.2;
  ctx.stroke();
  for (let i = -2; i <= 2; i += 1) {
    ctx.beginPath();
    ctx.moveTo(i * 4.5 - 1.6, -9);
    ctx.lineTo(i * 4.5, -5);
    ctx.lineTo(i * 4.5 + 1.6, -9);
    ctx.fillStyle = "#f4eaff";
    ctx.fill();
  }
  if (hurt > 0) {
    ctx.globalAlpha = hurt * 0.5;
    ctx.fillStyle = "#ffffff";
    roundRectPath(ctx, -32, -54, 64, 96, 22);
    ctx.fill();
  }
}

export function drawEnemy(ctx, id, x, y, scale = 1, options = {}) {
  const { time = 0, attack = 0, hurt = 0, alpha = 1 } = options;
  ctx.save();
  ctx.globalAlpha *= alpha;
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  const draw = { mouse: drawMouse, bat: drawBat, slug: drawSlug, clown: drawClown, king: drawKing }[id];
  if (draw) draw(ctx, time, attack, hurt);
  ctx.restore();
}

/* -------------------------------------------------------------- backgrounds */

function wallpaper(ctx, x, y, w, h) {
  const grad = ctx.createLinearGradient(x, y, x, y + h);
  grad.addColorStop(0, "#1d1b37");
  grad.addColorStop(1, "#15132a");
  ctx.fillStyle = grad;
  ctx.fillRect(x, y, w, h);
  ctx.save();
  ctx.globalAlpha = 0.25;
  for (let stripe = 0; stripe < 12; stripe += 1) {
    ctx.fillStyle = stripe % 2 === 0 ? "#2c2852" : "transparent";
    ctx.fillRect(x + stripe * 42, y, 20, h);
  }
  // tiny stars
  ctx.fillStyle = "rgba(255,215,0,0.18)";
  for (let i = 0; i < 22; i += 1) {
    const px = x + ((i * 73) % w);
    const py = y + ((i * 109) % h);
    drawStar(ctx, px, py, 2.2, 1, 5);
    ctx.fill();
  }
  ctx.restore();
}

function drawWindow(ctx, x, y, w, h) {
  ctx.save();
  roundRectPath(ctx, x - 7, y - 7, w + 14, h + 14, 18);
  ctx.fillStyle = "#3b2f65";
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = INK;
  ctx.stroke();

  const sky = ctx.createLinearGradient(x, y, x, y + h);
  sky.addColorStop(0, "#111a42");
  sky.addColorStop(0.6, "#203a72");
  sky.addColorStop(1, "#3e4f86");
  roundRectPath(ctx, x, y, w, h, 12);
  ctx.fillStyle = sky;
  ctx.fill();
  ctx.save();
  ctx.clip();
  // stars
  for (let i = 0; i < 18; i += 1) {
    const px = x + 8 + ((i * 41) % (w - 16));
    const py = y + 10 + ((i * 53) % (h - 20));
    ctx.globalAlpha = 0.3 + ((i * 17) % 60) / 100;
    drawStar(ctx, px, py, 1.4 + (i % 3), 0.5, 5);
    ctx.fillStyle = i % 5 === 0 ? COLORS.gold : "#d9f5ff";
    ctx.fill();
  }
  // moon
  const moonX = x + w * 0.62;
  const moonY = y + h * 0.34;
  glow(ctx, moonX, moonY, 38, "rgba(255,230,150,0.38)", 0.8);
  drawMoonIcon(ctx, moonX, moonY, 19, "#ffe9a3");
  // clouds
  ctx.fillStyle = "rgba(20,24,58,0.6)";
  ellipsePath(ctx, x + w * 0.25, y + h * 0.78, 40, 10);
  ctx.fill();
  ellipsePath(ctx, x + w * 0.68, y + h * 0.87, 55, 12);
  ctx.fill();
  ctx.restore();

  // cross bars
  line(ctx, x + w / 2, y, x + w / 2, y + h, "#3b2f65", 4);
  line(ctx, x, y + h / 2, x + w, y + h / 2, "#3b2f65", 4);
  line(ctx, x + w / 2, y, x + w / 2, y + h, "rgba(255,255,255,0.15)", 1.2);
  line(ctx, x, y + h / 2, x + w, y + h / 2, "rgba(255,255,255,0.15)", 1.2);

  // curtains
  for (const side of [-1, 1]) {
    const cx = side === -1 ? x - 16 : x + w + 16;
    ctx.beginPath();
    ctx.moveTo(cx, y - 16);
    ctx.quadraticCurveTo(cx + side * 22, y + h * 0.4, cx + side * 2, y + h + 12);
    ctx.quadraticCurveTo(cx - side * 6, y + h * 0.5, cx - side * 4, y - 16);
    ctx.closePath();
    ctx.fillStyle = "#6a3b87";
    ctx.fill();
    ctx.strokeStyle = INK;
    ctx.lineWidth = 2.5;
    ctx.stroke();
    line(ctx, cx + side * 5, y, cx + side * 10, y + h, "rgba(255,215,0,0.35)", 2);
  }
  // rod
  roundRectPath(ctx, x - 30, y - 22, w + 60, 7, 4);
  ctx.fillStyle = COLORS.gold;
  ctx.fill();
  ctx.strokeStyle = INK;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();
}

function drawStars(ctx, count, time, seed = 1) {
  for (let i = 0; i < count; i += 1) {
    const x = ((i * 97 + seed * 31) % 470) + 5;
    const y = ((i * 71 + seed * 47) % 820) + 10;
    const twinkle = 0.3 + 0.5 * (0.5 + 0.5 * Math.sin(time * 1.5 + i * 1.7));
    ctx.globalAlpha = twinkle;
    drawStar(ctx, x, y, 1.2 + (i % 3) * 0.7, 0.55, 5);
    ctx.fillStyle = i % 6 === 0 ? COLORS.gold : "#d8f6ff";
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function drawToyShelf(ctx, y) {
  roundRectPath(ctx, 34, y, 412, 13, 5);
  ctx.fillStyle = "#7a4a3a";
  ctx.fill();
  ctx.strokeStyle = INK;
  ctx.lineWidth = 3;
  ctx.stroke();
  line(ctx, 44, y + 4, 436, y + 4, "rgba(255,220,160,0.3)", 2);
  // brackets
  for (const x of [75, 405]) {
    ctx.beginPath();
    ctx.moveTo(x, y + 12);
    ctx.lineTo(x, y + 34);
    ctx.lineTo(x + 12, y + 12);
    ctx.closePath();
    ctx.fillStyle = "#5d3529";
    ctx.fill();
    ctx.strokeStyle = INK;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

export function drawHomeBackground(ctx, time) {
  ctx.save();
  const bg = ctx.createLinearGradient(0, 0, 0, 854);
  bg.addColorStop(0, "#1a1a2e");
  bg.addColorStop(0.68, "#18162c");
  bg.addColorStop(1, "#100e20");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 480, 854);

  wallpaper(ctx, 0, 0, 480, 622);
  drawStars(ctx, 16, time, 2);

  // wainscoting
  ctx.fillStyle = "#221d3d";
  ctx.fillRect(0, 560, 480, 62);
  line(ctx, 0, 560, 480, 560, "#3d3266", 3);
  for (let x = 0; x < 480; x += 48) {
    roundRectPath(ctx, x + 8, 574, 32, 36, 3);
    ctx.strokeStyle = "rgba(122,75,212,0.22)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  // floor
  const floor = ctx.createLinearGradient(0, 622, 0, 854);
  floor.addColorStop(0, "#3b2938");
  floor.addColorStop(1, "#24192b");
  ctx.fillStyle = floor;
  ctx.fillRect(0, 622, 480, 232);
  for (let i = 0; i < 9; i += 1) {
    const y = 622 + i * 26;
    line(ctx, 0, y, 480, y, "rgba(255,255,255,0.035)", 1);
  }
  for (let i = 0; i < 6; i += 1) {
    const x = 20 + i * 86;
    line(ctx, x, 622, x - 20, 854, "rgba(0,0,0,0.12)", 1.5);
  }

  drawWindow(ctx, 146, 34, 188, 224);

  // floating dust/stars
  for (let i = 0; i < 10; i += 1) {
    const x = 40 + ((i * 83) % 400);
    const y = 290 + Math.sin(time * 0.8 + i) * 8 + ((i * 37) % 210);
    ctx.globalAlpha = 0.22 + 0.25 * (0.5 + Math.sin(time * 2 + i) * 0.5);
    drawStar(ctx, x, y, 1.8, 0.8, 5);
    ctx.fillStyle = i % 2 ? COLORS.gold : COLORS.cyan;
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // moon halo behind mascots
  const halo = ctx.createRadialGradient(240, 360, 10, 240, 360, 120);
  halo.addColorStop(0, "rgba(255,215,0,0.18)");
  halo.addColorStop(1, "rgba(255,215,0,0)");
  ctx.fillStyle = halo;
  ctx.fillRect(110, 230, 260, 260);

  drawToyShelf(ctx, 407);

  // mascots
  ctx.save();
  ctx.translate(102, 350);
  ctx.scale(1.22, 1.22);
  drawTeddy(ctx, time + 1.3, 0, 0);
  ctx.restore();
  ctx.save();
  ctx.translate(238, 363);
  ctx.scale(1.02, 1.02);
  drawBunny(ctx, time + 2.2, 0, 0);
  ctx.restore();
  ctx.save();
  ctx.translate(375, 346);
  ctx.scale(1.18, 1.18);
  drawDragon(ctx, time + 0.7, 0, 0);
  ctx.restore();

  drawPaperTexture(ctx, 0, 0, 480, 854, 0.32);
  ctx.restore();
}

function drawDreamDoor(ctx, time, danger) {
  ctx.save();
  const grad = ctx.createLinearGradient(0, 180, 40, 590);
  grad.addColorStop(0, "rgba(255,215,0,0.08)");
  grad.addColorStop(0.5, "rgba(0,212,255,0.2)");
  grad.addColorStop(1, "rgba(255,215,0,0.05)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 178, 27, 404);
  // glowing edge
  const edge = ctx.createLinearGradient(20, 0, 32, 0);
  edge.addColorStop(0, "rgba(0,212,255,0)");
  edge.addColorStop(1, danger ? "rgba(255,77,109,0.9)" : "rgba(0,212,255,0.65)");
  ctx.fillStyle = edge;
  ctx.fillRect(18, 180, 14, 400);
  // little sleeping child at bottom
  ctx.save();
  ctx.translate(10, 560);
  ctx.rotate(-0.1);
  outlined(ctx, "#ffd7b0", INK, 1.8, () => {
    ellipsePath(ctx, 0, 0, 9, 8);
  });
  ctx.fillStyle = "#7a4bd4";
  ctx.beginPath();
  ctx.arc(0, -4, 9, Math.PI, Math.PI * 2);
  ctx.fill();
  line(ctx, -5, 1, -2, 1, INK, 1);
  line(ctx, 2, 1, 5, 1, INK, 1);
  ctx.fillStyle = "#f2a6b8";
  ellipsePath(ctx, 0, 4, 2, 1.2);
  ctx.fill();
  ctx.restore();
  // floating dream bubbles
  for (let i = 0; i < 3; i += 1) {
    const y = 250 + i * 90 + Math.sin(time * 1.1 + i) * 12;
    ctx.globalAlpha = 0.2 + i * 0.08;
    ctx.strokeStyle = i === 1 ? COLORS.gold : COLORS.cyan;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.arc(10 + (i % 2) * 4, y, 5 + i, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
}

function drawCloset(ctx, time) {
  const grad = ctx.createLinearGradient(456, 0, 480, 0);
  grad.addColorStop(0, "rgba(30,20,54,0)");
  grad.addColorStop(0.35, "#1d1433");
  grad.addColorStop(1, "#090710");
  ctx.fillStyle = grad;
  ctx.fillRect(452, 178, 28, 404);
  // purple fog
  for (let i = 0; i < 4; i += 1) {
    const y = 230 + i * 85 + Math.sin(time * 0.8 + i) * 8;
    ctx.fillStyle = `rgba(122,75,212,${0.08 + i * 0.02})`;
    ellipsePath(ctx, 466, y, 18, 25);
    ctx.fill();
  }
  // eyes in the dark
  const blink = Math.sin(time * 0.9) > 0.93 ? 0.2 : 1;
  ctx.globalAlpha = 0.8 * blink;
  ctx.fillStyle = "#ff4d6d";
  ellipsePath(ctx, 463, 252, 2, 3.4);
  ctx.fill();
  ellipsePath(ctx, 472, 252, 2, 3.4);
  ctx.fill();
  ctx.globalAlpha = 1;
}

export function drawGameBackground(ctx, time, danger = false) {
  ctx.save();
  const bg = ctx.createLinearGradient(0, 0, 0, 854);
  bg.addColorStop(0, "#19172e");
  bg.addColorStop(0.62, "#16142a");
  bg.addColorStop(1, "#0f0d1e");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 480, 854);
  wallpaper(ctx, 0, 0, 480, 620);
  drawStars(ctx, 12, time, 5);

  // moon window peeking behind HUD
  glow(ctx, 388, 160, 80, "rgba(255,230,150,0.12)", 0.7);
  drawMoonIcon(ctx, 392, 158, 26, "rgba(255,233,163,0.5)");

  // playfield mat border
  roundRectPath(ctx, GRID.x - 10, GRID.y - 10, GRID.cols * GRID.cw + 20, GRID.rows * GRID.ch + 20, 18);
  ctx.fillStyle = "#2a2144";
  ctx.fill();
  ctx.strokeStyle = INK;
  ctx.lineWidth = 3;
  ctx.stroke();
  // gold stitching around mat
  ctx.setLineDash([6, 5]);
  roundRectPath(ctx, GRID.x - 5, GRID.y - 5, GRID.cols * GRID.cw + 10, GRID.rows * GRID.ch + 10, 14);
  ctx.strokeStyle = "rgba(255,215,0,0.45)";
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.setLineDash([]);

  // tiles
  for (let row = 0; row < GRID.rows; row += 1) {
    for (let col = 0; col < GRID.cols; col += 1) {
      const x = GRID.x + col * GRID.cw;
      const y = GRID.y + row * GRID.ch;
      const even = (row + col) % 2 === 0;
      const tile = ctx.createLinearGradient(x, y, x, y + GRID.ch);
      if (even) {
        tile.addColorStop(0, "#34305c");
        tile.addColorStop(1, "#2c294f");
      } else {
        tile.addColorStop(0, "#2e2a53");
        tile.addColorStop(1, "#272345");
      }
      ctx.fillStyle = tile;
      ctx.fillRect(x + 1, y + 1, GRID.cw - 2, GRID.ch - 2);
      // stitched border
      ctx.strokeStyle = "rgba(181,166,235,0.13)";
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 4]);
      ctx.strokeRect(x + 4.5, y + 4.5, GRID.cw - 9, GRID.ch - 9);
      ctx.setLineDash([]);
      // tiny patch motif
      if ((row * 3 + col) % 7 === 0) {
        ctx.globalAlpha = 0.13;
        drawStar(ctx, x + GRID.cw / 2, y + GRID.ch / 2, 6, 2.6);
        ctx.fillStyle = COLORS.cyan;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }
  }

  // lane separators
  for (let row = 1; row < GRID.rows; row += 1) {
    const y = GRID.y + row * GRID.ch;
    line(ctx, GRID.x + 3, y, GRID.x + GRID.cols * GRID.cw - 3, y, "rgba(10,8,24,0.5)", 2);
  }

  drawDreamDoor(ctx, time, danger);
  drawCloset(ctx, time);

  // floor under HUD
  const floor = ctx.createLinearGradient(0, 620, 0, 854);
  floor.addColorStop(0, "#221a35");
  floor.addColorStop(1, "#141023");
  ctx.fillStyle = floor;
  ctx.fillRect(0, 620, 480, 234);
  line(ctx, 0, 620, 480, 620, "#3c2d5c", 3);
  line(ctx, 0, 624, 480, 624, "rgba(255,215,0,0.14)", 1);

  // scattered toy blocks on floor edge
  ctx.save();
  ctx.globalAlpha = 0.28;
  const blocks = [
    [44, 806, "#ff6b7a"],
    [72, 824, "#00d4ff"],
    [414, 818, "#ffd700"],
  ];
  for (const [x, y, color] of blocks) {
    roundRectPath(ctx, x - 8, y - 8, 16, 16, 3);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = INK;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
  ctx.restore();

  drawPaperTexture(ctx, 0, 0, 480, 854, 0.3);
  ctx.restore();
}

/* ------------------------------------------------------------------- logo */

export function drawLogo(ctx, x, y, scale = 1, time = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.save();
  ctx.rotate(-0.02);
  text(ctx, "TOYS", 0, 0, 78, COLORS.gold, {
    family: '"Lilita One", sans-serif',
    weight: 400,
    stroke: 12,
    strokeColor: INK,
    shadow: "#6d3a00",
  });
  ctx.restore();
  // vs medallion
  ctx.save();
  ctx.translate(0, 46);
  ctx.rotate(-0.08);
  outlined(ctx, COLORS.coral, INK, 3, () => {
    ellipsePath(ctx, 0, 0, 25, 18);
  });
  text(ctx, "vs", 0, 1, 24, COLORS.cream, {
    family: '"Lilita One", sans-serif',
    weight: 400,
    stroke: 4,
    strokeColor: INK,
  });
  ctx.restore();
  text(ctx, "NIGHTMARES", 0, 88, 45, COLORS.cyan, {
    family: '"Lilita One", sans-serif',
    weight: 400,
    stroke: 9,
    strokeColor: INK,
    shadow: "#043f52",
  });
  // sparkles
  for (let i = 0; i < 6; i += 1) {
    const angle = time * 0.5 + i * 1.1;
    const px = Math.cos(angle) * (130 + i * 8);
    const py = Math.sin(angle * 1.3) * 54 - 5;
    ctx.globalAlpha = 0.3 + 0.5 * (0.5 + Math.sin(time * 2 + i) * 0.5);
    drawStar(ctx, px, py, 3 + (i % 3), 1.2, 5);
    ctx.fillStyle = i % 2 ? COLORS.cyan : COLORS.gold;
    ctx.fill();
  }
  ctx.restore();
}

/* --------------------------------------------------------------------- UI */

export function drawPanel(ctx, x, y, w, h, options = {}) {
  const {
    fill = "rgba(28,24,52,0.92)",
    stroke = INK,
    lineWidth = 3,
    radius = 16,
    shadow = true,
    inner = true,
    accent = null,
  } = options;
  ctx.save();
  if (shadow) {
    roundRectPath(ctx, x, y + 5, w, h, radius);
    ctx.fillStyle = "rgba(5,4,12,0.45)";
    ctx.fill();
  }
  roundRectPath(ctx, x, y, w, h, radius);
  ctx.fillStyle = fill;
  ctx.fill();
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }
  if (inner) {
    roundRectPath(ctx, x + 4, y + 4, w - 8, h - 8, Math.max(2, radius - 4));
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth = 1.2;
    ctx.stroke();
  }
  if (accent) {
    roundRectPath(ctx, x + 2, y + 2, w - 4, 4, 2);
    ctx.fillStyle = accent;
    ctx.globalAlpha *= 0.6;
    ctx.fill();
    ctx.globalAlpha /= 0.6;
  }
  ctx.restore();
}

export function drawButton(ctx, x, y, w, h, options = {}) {
  const {
    label = "",
    sub = null,
    fill = COLORS.gold,
    fill2 = null,
    textColor = INK,
    stroke = INK,
    radius = 16,
    icon = null,
    disabled = false,
    pressed = false,
    fontSize = 24,
    time = 0,
    pulse = false,
  } = options;
  ctx.save();
  if (disabled) ctx.globalAlpha *= 0.5;
  const offset = pressed ? 3 : 0;
  // bottom lip
  roundRectPath(ctx, x, y + 6, w, h, radius);
  ctx.fillStyle = "#090812";
  ctx.fill();
  if (pulse) {
    glow(ctx, x + w / 2, y + h / 2, w * 0.72, "rgba(255,215,0,0.18)", 0.7 + Math.sin(time * 3) * 0.2);
  }
  const grad = ctx.createLinearGradient(x, y, x, y + h);
  grad.addColorStop(0, fill);
  grad.addColorStop(1, fill2 || fill);
  roundRectPath(ctx, x, y + offset, w, h, radius);
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 3;
  ctx.stroke();
  // gloss
  roundRectPath(ctx, x + 6, y + offset + 5, w - 12, h * 0.38, Math.max(2, radius - 5));
  ctx.fillStyle = "rgba(255,255,255,0.22)";
  ctx.fill();
  // bottom shade
  roundRectPath(ctx, x + 4, y + offset + h - 11, w - 8, 7, 3);
  ctx.fillStyle = "rgba(0,0,0,0.14)";
  ctx.fill();
  const centerY = y + offset + h / 2 + (sub ? -6 : 1);
  if (icon) {
    icon(ctx, x + 30, centerY, 12);
    text(ctx, label, x + w / 2 + 8, centerY, fontSize, textColor, {
      weight: 800,
      stroke: 3.5,
      strokeColor: "rgba(21,19,43,0.18)",
    });
  } else {
    text(ctx, label, x + w / 2, centerY, fontSize, textColor, {
      weight: 800,
      stroke: 3.5,
      strokeColor: "rgba(21,19,43,0.16)",
    });
  }
  if (sub) {
    text(ctx, sub, x + w / 2, y + offset + h - 16, 10, "rgba(21,19,43,0.68)", { weight: 700 });
  }
  ctx.restore();
}

export function drawProgressBar(ctx, x, y, w, h, value, options = {}) {
  const {
    fill = COLORS.mint,
    fill2 = null,
    bg = "rgba(8,7,18,0.7)",
    stroke = INK,
    radius = h / 2,
    showGloss = true,
  } = options;
  ctx.save();
  roundRectPath(ctx, x, y, w, h, radius);
  ctx.fillStyle = bg;
  ctx.fill();
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 2;
  ctx.stroke();
  const clamped = Math.max(0, Math.min(1, value));
  if (clamped > 0) {
    ctx.save();
    roundRectPath(ctx, x, y, w, h, radius);
    ctx.clip();
    const grad = ctx.createLinearGradient(x, y, x + w, y);
    grad.addColorStop(0, fill);
    grad.addColorStop(1, fill2 || fill);
    ctx.fillStyle = grad;
    ctx.fillRect(x, y, w * clamped, h);
    if (showGloss) {
      ctx.fillStyle = "rgba(255,255,255,0.3)";
      ctx.fillRect(x + 2, y + 2, Math.max(0, w * clamped - 4), Math.max(1, h * 0.32));
    }
    ctx.restore();
  }
  ctx.restore();
}

export function drawPortraitFrame(ctx, x, y, size, unitId, options = {}) {
  const { locked = false, time = 0, selected = false } = options;
  ctx.save();
  roundRectPath(ctx, x, y, size, size, size * 0.22);
  const grad = ctx.createLinearGradient(x, y, x, y + size);
  grad.addColorStop(0, "#3d3568");
  grad.addColorStop(1, "#252045");
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.strokeStyle = selected ? COLORS.gold : "rgba(255,255,255,0.16)";
  ctx.lineWidth = selected ? 2.4 : 1.5;
  ctx.stroke();
  ctx.save();
  ctx.beginPath();
  roundRectPath(ctx, x + 2, y + 2, size - 4, size - 4, size * 0.2);
  ctx.clip();
  const glowColor = UNIT_BY_ID[unitId]?.color || COLORS.gold;
  glow(ctx, x + size / 2, y + size * 0.62, size * 0.62, glowColor, 0.22);
  drawUnit(ctx, unitId, x + size / 2, y + size * 0.58, size / 62, { time, alpha: locked ? 0.28 : 1 });
  ctx.restore();
  if (locked) {
    roundRectPath(ctx, x, y, size, size, size * 0.22);
    ctx.fillStyle = "rgba(9,8,20,0.55)";
    ctx.fill();
    drawLock(ctx, x + size / 2, y + size / 2, size * 0.26, "rgba(255,255,255,0.7)");
  }
  ctx.restore();
}

export function drawUnitCard(ctx, x, y, w, h, unit, options = {}) {
  const {
    locked = false,
    selected = false,
    affordable = true,
    cooldown = 0,
    time = 0,
    guardianLevel = 1,
  } = options;
  ctx.save();
  // shadow
  roundRectPath(ctx, x, y + 4, w, h, 14);
  ctx.fillStyle = "rgba(5,4,12,0.5)";
  ctx.fill();
  // body
  const grad = ctx.createLinearGradient(x, y, x, y + h);
  grad.addColorStop(0, selected ? "#4d417c" : "#332c59");
  grad.addColorStop(1, selected ? "#332a5b" : "#252045");
  roundRectPath(ctx, x, y, w, h, 14);
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.strokeStyle = selected ? COLORS.gold : "rgba(255,255,255,0.12)";
  ctx.lineWidth = selected ? 2.6 : 1.4;
  ctx.stroke();
  if (selected) {
    glow(ctx, x + w / 2, y + h / 2, w * 0.7, "rgba(255,215,0,0.15)", 0.8);
  }
  // portrait
  drawPortraitFrame(ctx, x + w / 2 - 26, y + 8, 52, unit.id, {
    locked,
    time,
    selected,
  });
  // name
  text(ctx, unit.short, x + w / 2, y + h - 33, 10, locked ? "rgba(255,255,255,0.5)" : COLORS.cream, {
    weight: 800,
    letterSpacing: 0.5,
  });
  // cost
  if (!locked) {
    drawStarCoin(ctx, x + 14, y + h - 14, 7, time);
    text(ctx, `${unit.cost}`, x + 24, y + h - 13, 13, affordable ? COLORS.gold : COLORS.coral, {
      align: "left",
      weight: 800,
      stroke: 2.4,
      strokeColor: "rgba(0,0,0,0.35)",
    });
  } else {
    text(ctx, `GL ${unit.unlock}`, x + w / 2, y + h - 13, 11, "rgba(255,255,255,0.5)", { weight: 800 });
  }
  // cooldown veil
  if (cooldown > 0 && !locked) {
    const ratio = Math.min(1, cooldown);
    roundRectPath(ctx, x, y, w, h, 14);
    ctx.fillStyle = "rgba(8,6,20,0.62)";
    ctx.fill();
    ctx.save();
    roundRectPath(ctx, x, y, w, h, 14);
    ctx.clip();
    ctx.fillStyle = "rgba(0,212,255,0.16)";
    ctx.fillRect(x, y + h * (1 - ratio), w, h * ratio);
    ctx.restore();
    text(ctx, cooldown.toFixed(1), x + w / 2, y + h / 2, 16, COLORS.cyan, {
      weight: 800,
      stroke: 3,
      strokeColor: INK,
    });
  }
  // unaffordable tint
  if (!affordable && !locked) {
    roundRectPath(ctx, x, y, w, h, 14);
    ctx.fillStyle = "rgba(255,77,109,0.09)";
    ctx.fill();
  }
  ctx.restore();
}

export function drawWaveBanner(ctx, wave, total, alpha, scale = 1) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(240, 386);
  ctx.scale(scale, scale);
  roundRectPath(ctx, -136, -36, 272, 72, 18);
  ctx.fillStyle = "rgba(19,16,39,0.92)";
  ctx.fill();
  ctx.strokeStyle = COLORS.gold;
  ctx.lineWidth = 2;
  ctx.stroke();
  text(ctx, `WAVE ${wave}`, 0, -4, 32, COLORS.cream, {
    family: '"Lilita One", sans-serif',
    weight: 400,
    stroke: 6,
    strokeColor: INK,
  });
  text(ctx, `${total} waves of nightmares`, 0, 21, 10, COLORS.cyan, { weight: 700, letterSpacing: 1 });
  drawStar(ctx, -110, 0, 9, 4);
  ctx.fillStyle = COLORS.gold;
  ctx.fill();
  drawStar(ctx, 110, 0, 9, 4);
  ctx.fill();
  ctx.restore();
}

export function drawTutorialHint(ctx, x, y, w, message, time) {
  ctx.save();
  const bob = Math.sin(time * 2.4) * 2;
  roundRectPath(ctx, x, y + bob, w, 38, 12);
  ctx.fillStyle = "rgba(12,10,26,0.9)";
  ctx.fill();
  ctx.strokeStyle = "rgba(0,212,255,0.5)";
  ctx.lineWidth = 1.4;
  ctx.stroke();
  text(ctx, message, x + w / 2, y + 19 + bob, 11, COLORS.cream, { weight: 700 });
  ctx.restore();
}

export function drawVignette(ctx, alpha = 0.3, color = "#080711") {
  const grad = ctx.createRadialGradient(240, 400, 190, 240, 400, 470);
  grad.addColorStop(0, "rgba(0,0,0,0)");
  grad.addColorStop(1, color);
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 480, 854);
  ctx.restore();
}

export function drawToast(ctx, message, time, color = COLORS.cyan) {
  ctx.save();
  const w = Math.min(360, ctx.measureText(message).width + 64);
  roundRectPath(ctx, 240 - w / 2, 116, w, 36, 12);
  ctx.fillStyle = "rgba(12,10,26,0.94)";
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.stroke();
  text(ctx, message, 240, 134, 12, COLORS.cream, { weight: 700 });
  ctx.restore();
}
