import { COLORS } from "./data.js";
import { BAR, POWER, RESOURCE, TOP } from "./game.js";
import {
  drawLock,
  drawMoonIcon,
  drawPanel,
  drawProgressBar,
  drawStar,
  drawStarCoin,
  drawTutorialHint,
  drawUnitCard,
  drawWaveBanner,
  glow,
  line,
  roundRectPath,
  text,
} from "./draw.js";

function drawDreamPanel(ctx, game) {
  drawPanel(ctx, TOP.dream.x, TOP.dream.y, TOP.dream.w, TOP.dream.h, {
    fill: "rgba(26,23,48,0.94)",
    radius: 15,
    accent: "rgba(255,215,0,0.35)",
  });
  drawMoonIcon(ctx, 32, 43, 10, "#ffe9a3");
  text(ctx, "z", 39, 33, 8, "#b9b1d9", { weight: 800 });
  text(ctx, "z", 44, 27, 6, "#8e86b5", { weight: 800 });
  text(ctx, "DREAM METER", 50, 29, 8, "#c7bfe4", {
    align: "left",
    weight: 800,
    letterSpacing: 1.4,
  });
  const ratio = Math.max(0, Math.min(1, game.displayDream / 100));
  const color = ratio > 0.6 ? "#55d98b" : ratio > 0.3 ? "#ffd700" : "#ff4d6d";
  const color2 = ratio > 0.6 ? "#a9ffbf" : ratio > 0.3 ? "#fff09a" : "#ff8fa3";
  drawProgressBar(ctx, 50, 42, 156, 13, ratio, { fill: color, fill2: color2 });
  text(ctx, `${Math.ceil(game.displayDream)}`, 236, 49, 18, color, {
    align: "right",
    weight: 800,
    stroke: 2.5,
    strokeColor: "rgba(0,0,0,0.3)",
  });
}

function drawWavePanel(ctx, game) {
  drawPanel(ctx, TOP.wave.x, TOP.wave.y, TOP.wave.w, TOP.wave.h, {
    fill: "rgba(26,23,48,0.94)",
    radius: 15,
    accent: "rgba(0,212,255,0.28)",
  });
  text(ctx, "WAVE", 320, 28, 8, "#9e96c0", { weight: 800, letterSpacing: 2 });
  text(ctx, `${game.currentWave}/${game.level.waves.length}`, 320, 46, 22, COLORS.cream, {
    weight: 800,
    stroke: 4,
    strokeColor: "rgba(0,0,0,0.3)",
  });
  const total = game.level.waves.length;
  const dotGap = 9;
  const startX = 320 - ((total - 1) * dotGap) / 2;
  for (let i = 0; i < total; i += 1) {
    const active = i + 1 === game.currentWave;
    const done = i + 1 < game.currentWave || game.waveCleared >= i + 1;
    ctx.beginPath();
    ctx.arc(startX + i * dotGap, 66, active ? 2.4 : 1.7, 0, Math.PI * 2);
    ctx.fillStyle = done ? COLORS.gold : active ? COLORS.cyan : "rgba(255,255,255,0.18)";
    ctx.fill();
    if (active) {
      ctx.strokeStyle = "rgba(0,212,255,0.45)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }
}

function drawPauseButton(ctx, game) {
  const { x, y, r } = TOP.pause;
  ctx.save();
  glow(ctx, x, y, r + 8, "rgba(0,212,255,0.14)", 0.8);
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(25,22,48,0.94)";
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.22)";
  ctx.lineWidth = 1.8;
  ctx.stroke();
  roundRectPath(ctx, x - 7, y - 8, 5, 16, 2);
  ctx.fillStyle = COLORS.cream;
  ctx.fill();
  roundRectPath(ctx, x + 2, y - 8, 5, 16, 2);
  ctx.fill();
  ctx.restore();
}

function drawResource(ctx, game) {
  drawPanel(ctx, RESOURCE.x, RESOURCE.y, RESOURCE.w, RESOURCE.h, {
    fill: "rgba(32,27,58,0.96)",
    radius: 14,
    accent: "rgba(255,215,0,0.45)",
  });
  drawStarCoin(ctx, RESOURCE.x + 20, RESOURCE.y + 26, 10, game.time);
  text(ctx, "STARLIGHT", RESOURCE.x + 37, RESOURCE.y + 15, 7, "#b9b1d9", {
    align: "left",
    weight: 800,
    letterSpacing: 1.3,
  });
  text(ctx, `${game.starlight}`, RESOURCE.x + 37, RESOURCE.y + 32, 18, COLORS.gold, {
    align: "left",
    weight: 800,
    stroke: 2.5,
    strokeColor: "rgba(0,0,0,0.32)",
  });
}

function drawPowerButton(ctx, game) {
  const { x, y, r } = POWER;
  const ratio = Math.max(0, Math.min(1, game.charge / 100));
  const ready = ratio >= 1;
  ctx.save();
  text(ctx, "STAR POWER", x, y - r - 14, 8, ready ? COLORS.gold : "#9e96c0", {
    weight: 800,
    letterSpacing: 1.2,
  });
  if (ready) {
    const pulse = 0.65 + Math.sin(game.time * 5) * 0.25;
    glow(ctx, x, y, r + 18, "rgba(255,215,0,0.42)", pulse);
  }
  ctx.beginPath();
  ctx.arc(x, y, r + 3, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(10,8,22,0.9)";
  ctx.fill();
  ctx.strokeStyle = ready ? COLORS.gold : "rgba(255,255,255,0.18)";
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.clip();
  ctx.fillStyle = "rgba(35,29,64,0.95)";
  ctx.fillRect(x - r, y - r, r * 2, r * 2);
  if (ratio > 0) {
    const grad = ctx.createLinearGradient(x, y + r, x, y - r);
    grad.addColorStop(0, "#00a6d6");
    grad.addColorStop(0.55, "#00d4ff");
    grad.addColorStop(1, "#ffd700");
    ctx.fillStyle = grad;
    ctx.fillRect(x - r, y + r - ratio * r * 2, r * 2, ratio * r * 2);
  }
  // diagonal shine
  ctx.globalAlpha = 0.13;
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.moveTo(x - r, y - r);
  ctx.lineTo(x + r, y - r * 0.2);
  ctx.lineTo(x + r, y + r * 0.12);
  ctx.lineTo(x - r, y + r * 0.72);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  drawStar(ctx, x, y - 4, 16, 7.2);
  ctx.fillStyle = ready ? "#fff6a8" : ratio > 0.5 ? "#ffe66d" : "rgba(255,215,0,0.75)";
  ctx.fill();
  ctx.strokeStyle = "#17142f";
  ctx.lineWidth = 2.2;
  ctx.lineJoin = "round";
  ctx.stroke();
  text(ctx, `${Math.round(game.charge)}%`, x, y + 18, 9, ready ? "#fff5d6" : "rgba(255,255,255,0.75)", {
    weight: 800,
    stroke: 2,
    strokeColor: "rgba(0,0,0,0.4)",
  });
  ctx.restore();
}

function drawCardBar(ctx, game) {
  const panel = BAR.panel;
  drawPanel(ctx, panel.x, panel.y, panel.w, panel.h, {
    fill: "rgba(22,18,42,0.96)",
    radius: 18,
    accent: "rgba(255,215,0,0.24)",
  });
  ctx.save();
  roundRectPath(ctx, BAR.viewportLeft, panel.y + 4, BAR.viewportRight - BAR.viewportLeft, panel.h - 8, 14);
  ctx.clip();
  const rects = game.getCardRects();
  game.cardRects = rects;
  for (const rect of rects) {
    if (rect.x + rect.w < BAR.viewportLeft - 20 || rect.x > BAR.viewportRight + 20) continue;
    drawUnitCard(ctx, rect.x, rect.y, rect.w, rect.h, rect.unit, {
      locked: rect.locked,
      selected: game.selectedUnit === rect.unit.id,
      affordable: rect.affordable,
      cooldown: rect.cooldown,
      time: game.time,
      guardianLevel: game.guardianLevel,
    });
  }
  ctx.restore();

  // edge fades
  const leftFade = ctx.createLinearGradient(panel.x, 0, panel.x + 28, 0);
  leftFade.addColorStop(0, "rgba(22,18,42,0.95)");
  leftFade.addColorStop(1, "rgba(22,18,42,0)");
  ctx.fillStyle = leftFade;
  ctx.fillRect(panel.x + 2, panel.y + 6, 26, panel.h - 12);
  const rightFade = ctx.createLinearGradient(panel.x + panel.w - 28, 0, panel.x + panel.w, 0);
  rightFade.addColorStop(0, "rgba(22,18,42,0)");
  rightFade.addColorStop(1, "rgba(22,18,42,0.95)");
  ctx.fillStyle = rightFade;
  ctx.fillRect(panel.x + panel.w - 28, panel.y + 6, 26, panel.h - 12);

  // scroll indicator
  const trackX = 34;
  const trackW = 412;
  const trackY = 837;
  roundRectPath(ctx, trackX, trackY, trackW, 3, 1.5);
  ctx.fillStyle = "rgba(255,255,255,0.08)";
  ctx.fill();
  const thumbW = 84;
  const maxScroll = BAR.maxScroll;
  const thumbX = trackX + (game.scroll / Math.max(1, maxScroll)) * (trackW - thumbW);
  roundRectPath(ctx, thumbX, trackY, thumbW, 3, 1.5);
  ctx.fillStyle = "rgba(255,215,0,0.5)";
  ctx.fill();
}

function tutorialMessage(game) {
  if (game.tutorialStep >= 3 || game.state !== "playing") return null;
  if (game.tutorialStep === 0) {
    return game.selectedUnit
      ? "Now tap a glowing tile to place your toy."
      : "Tap a toy card below, then a glowing tile to place it.";
  }
  if (game.tutorialStep === 1) return "Catch falling stars to grow your Starlight.";
  if (game.charge >= 100) return "Star Power is full! Tap the glowing star button.";
  return "Banish nightmares to fill Star Power.";
}

function drawToast(ctx, game) {
  if (game.toastTimer <= 0 || !game.toastText) return;
  const alpha = Math.min(1, game.toastTimer / 0.28);
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.font = '700 12px "Baloo 2", sans-serif';
  const width = Math.min(390, ctx.measureText(game.toastText).width + 46);
  const x = 240 - width / 2;
  roundRectPath(ctx, x, 88, width, 34, 11);
  ctx.fillStyle = "rgba(11,9,24,0.95)";
  ctx.fill();
  ctx.strokeStyle = game.toastColor;
  ctx.lineWidth = 1.4;
  ctx.stroke();
  drawStar(ctx, x + 17, 105, 5, 2.1);
  ctx.fillStyle = game.toastColor;
  ctx.fill();
  text(ctx, game.toastText, 240 + 8, 105, 11.5, COLORS.cream, { weight: 700 });
  ctx.restore();
}

export function drawHUD(ctx, game) {
  drawDreamPanel(ctx, game);
  drawWavePanel(ctx, game);
  drawPauseButton(ctx, game);
  drawResource(ctx, game);
  drawPowerButton(ctx, game);
  drawCardBar(ctx, game);

  const message = tutorialMessage(game);
  if (message) drawTutorialHint(ctx, 58, 584, 318, message, game.time);

  if (game.waveBanner > 0) {
    const life = game.waveBanner;
    const enter = 1 - Math.min(1, (2.2 - life) / 0.28);
    const alpha = life < 0.4 ? life / 0.4 : Math.min(1, enter * 2);
    const scale = 0.82 + 0.18 * Math.min(1, (2.2 - life) * 4);
    drawWaveBanner(ctx, game.bannerWave, game.level.waves.length, alpha, scale);
  }

  drawToast(ctx, game);
}
