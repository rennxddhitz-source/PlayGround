import { ACHIEVEMENTS, COLORS, GUARDIAN_XP, LEVELS, QUESTS } from "./data.js";
import {
  drawButton,
  drawGemIcon,
  drawHomeBackground,
  drawLock,
  drawLogo,
  drawMoonIcon,
  drawPanel,
  drawProgressBar,
  drawSoundIcon,
  drawStar,
  drawStarCoin,
  drawSwordIcon,
  glow,
  line,
  roundRectPath,
  text,
} from "./draw.js";

const TOP = {
  gl: { x: 12, y: 14, w: 126, h: 48 },
  moon: { x: 146, y: 14, w: 82, h: 36 },
  gem: { x: 236, y: 14, w: 82, h: 36 },
  help: { x: 408, y: 32, r: 17 },
  sound: { x: 448, y: 32, r: 17 },
};

const MENU = {
  play: { x: 92, y: 430, w: 296, h: 72 },
  levels: [
    { x: 14, y: 516, w: 142, h: 96 },
    { x: 169, y: 516, w: 142, h: 96 },
    { x: 324, y: 516, w: 142, h: 96 },
  ],
  workshop: { x: 14, y: 638, w: 216, h: 66 },
  quests: { x: 250, y: 638, w: 216, h: 66 },
};

function pointInRect(x, y, rect) {
  return x >= rect.x && x <= rect.x + rect.w && y >= rect.y && y <= rect.y + rect.h;
}

function pointInCircle(x, y, circle) {
  return Math.hypot(x - circle.x, y - circle.y) <= circle.r;
}

function drawGlBadge(ctx, app) {
  const rect = TOP.gl;
  drawPanel(ctx, rect.x, rect.y, rect.w, rect.h, {
    fill: "rgba(25,21,46,0.9)",
    radius: 14,
    accent: "rgba(255,215,0,0.45)",
  });
  drawStar(ctx, rect.x + 20, rect.y + 21, 9, 4, 5);
  ctx.fillStyle = COLORS.gold;
  ctx.fill();
  ctx.strokeStyle = COLORS.ink;
  ctx.lineWidth = 1.5;
  ctx.stroke();
  text(ctx, `GL ${app.guardianLevel}`, rect.x + 36, rect.y + 15, 11, COLORS.cream, {
    align: "left",
    weight: 800,
  });
  text(ctx, "GUARDIAN", rect.x + 36, rect.y + 29, 6, "#9e96c0", {
    align: "left",
    weight: 800,
    letterSpacing: 1.1,
  });
  drawProgressBar(ctx, rect.x + 8, rect.y + 38, rect.w - 16, 5, app.xpProgress, {
    fill: "#00b8e0",
    fill2: "#8bf3ff",
    radius: 2.5,
  });
}

function drawCurrencyPill(ctx, rect, type, value) {
  drawPanel(ctx, rect.x, rect.y, rect.w, rect.h, {
    fill: "rgba(25,21,46,0.9)",
    radius: 13,
    inner: false,
  });
  if (type === "moon") drawMoonIcon(ctx, rect.x + 19, rect.y + 18, 8, COLORS.gold);
  else drawGemIcon(ctx, rect.x + 19, rect.y + 18, 8);
  text(ctx, `${value}`, rect.x + 34, rect.y + 18, 14, COLORS.cream, {
    align: "left",
    weight: 800,
  });
}

function drawTopButtons(ctx, app) {
  for (const [circle, kind] of [[TOP.help, "help"], [TOP.sound, "sound"]]) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(25,21,46,0.9)";
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.14)";
    ctx.lineWidth = 1.3;
    ctx.stroke();
    if (kind === "help") {
      text(ctx, "?", circle.x, circle.y + 1, 18, COLORS.cream, {
        weight: 800,
        stroke: 3,
        strokeColor: COLORS.ink,
      });
    } else {
      drawSoundIcon(ctx, circle.x, circle.y, 9, !app.save.audio, COLORS.cream);
    }
    ctx.restore();
  }
}

function drawBedIcon(ctx, x, y, size) {
  ctx.save();
  ctx.translate(x, y);
  roundRectPath(ctx, -size, -size * 0.25, size * 2, size * 0.7, 3);
  ctx.fillStyle = "#b69cff";
  ctx.fill();
  ctx.strokeStyle = COLORS.ink;
  ctx.lineWidth = 1.6;
  ctx.stroke();
  roundRectPath(ctx, -size * 0.88, -size * 0.62, size * 0.62, size * 0.42, 4);
  ctx.fillStyle = "#fff5d6";
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(-size * 0.38, -size * 0.42, size * 0.2, 0, Math.PI * 2);
  ctx.fillStyle = "#ffd7b0";
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawCrownIcon(ctx, x, y, size) {
  ctx.save();
  ctx.translate(x, y);
  ctx.beginPath();
  ctx.moveTo(-size, size * 0.45);
  ctx.lineTo(-size * 0.8, -size * 0.5);
  ctx.lineTo(-size * 0.28, size * 0.05);
  ctx.lineTo(0, -size * 0.75);
  ctx.lineTo(size * 0.28, size * 0.05);
  ctx.lineTo(size * 0.8, -size * 0.5);
  ctx.lineTo(size, size * 0.45);
  ctx.closePath();
  ctx.fillStyle = COLORS.gold;
  ctx.fill();
  ctx.strokeStyle = COLORS.ink;
  ctx.lineWidth = 1.6;
  ctx.stroke();
  ctx.fillStyle = COLORS.coral;
  ctx.beginPath();
  ctx.arc(0, -size * 0.15, size * 0.16, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawLevelIcon(ctx, index, x, y) {
  if (index === 0) drawMoonIcon(ctx, x, y, 12, COLORS.cyan);
  else if (index === 1) drawBedIcon(ctx, x, y, 12);
  else drawCrownIcon(ctx, x, y, 12);
}

function levelShortName(index) {
  return ["MOONLIT", "HOLLOW", "CLOSET"][index] || LEVELS[index].name.toUpperCase();
}

function drawLevelCard(ctx, app, index, rect) {
  const level = LEVELS[index];
  const unlocked = app.canPlayLevel(index);
  const cleared = app.save.cleared.includes(index);
  const current = app.save.lastLevel === index;
  drawPanel(ctx, rect.x, rect.y, rect.w, rect.h, {
    fill: current ? "rgba(46,38,77,0.96)" : "rgba(25,21,46,0.92)",
    radius: 16,
    accent: unlocked ? level.accent : "rgba(255,255,255,0.08)",
    stroke: current ? COLORS.gold : COLORS.ink,
    lineWidth: current ? 2.2 : 2.5,
  });
  if (current) glow(ctx, rect.x + rect.w / 2, rect.y + rect.h / 2, rect.w * 0.55, "rgba(255,215,0,0.11)", 0.8);
  drawLevelIcon(ctx, index, rect.x + 26, rect.y + 29);
  text(ctx, levelShortName(index), rect.x + 45, rect.y + 24, 11, unlocked ? COLORS.cream : "rgba(255,255,255,0.4)", {
    align: "left",
    weight: 800,
    letterSpacing: 0.4,
  });
  text(ctx, `${level.waves.length} WAVES`, rect.x + 45, rect.y + 39, 7, "#9e96c0", {
    align: "left",
    weight: 700,
    letterSpacing: 0.8,
  });
  line(ctx, rect.x + 12, rect.y + 52, rect.x + rect.w - 12, rect.y + 52, "rgba(255,255,255,0.08)", 1);
  drawMoonIcon(ctx, rect.x + 22, rect.y + 73, 6, unlocked ? COLORS.gold : "#5b5475");
  text(ctx, `${level.reward}`, rect.x + 33, rect.y + 73, 11, unlocked ? COLORS.gold : "rgba(255,255,255,0.3)", {
    align: "left",
    weight: 800,
  });
  if (cleared) {
    roundRectPath(ctx, rect.x + rect.w - 44, rect.y + 64, 32, 17, 8);
    ctx.fillStyle = "rgba(85,217,139,0.16)";
    ctx.fill();
    ctx.strokeStyle = "rgba(85,217,139,0.5)";
    ctx.lineWidth = 1;
    ctx.stroke();
    text(ctx, "CLEAR", rect.x + rect.w - 28, rect.y + 73, 6.5, "#72e6a5", { weight: 800 });
  }
  if (!unlocked) {
    roundRectPath(ctx, rect.x, rect.y, rect.w, rect.h, 16);
    ctx.fillStyle = "rgba(9,8,20,0.64)";
    ctx.fill();
    drawLock(ctx, rect.x + rect.w / 2, rect.y + 36, 13, "rgba(255,255,255,0.7)");
    text(ctx, `CLEAR NIGHT ${index}`, rect.x + rect.w / 2, rect.y + 66, 7, "rgba(255,255,255,0.55)", {
      weight: 800,
      letterSpacing: 0.8,
    });
  }
}

function drawNavButton(ctx, app, rect, label, sub, type) {
  drawPanel(ctx, rect.x, rect.y, rect.w, rect.h, {
    fill: "rgba(28,23,51,0.94)",
    radius: 16,
    accent: type === "workshop" ? "rgba(0,212,255,0.4)" : "rgba(255,158,219,0.4)",
  });
  if (type === "workshop") {
    // hammer
    ctx.save();
    ctx.translate(rect.x + 31, rect.y + 32);
    ctx.rotate(-0.55);
    roundRectPath(ctx, -11, -4, 22, 8, 3);
    ctx.fillStyle = COLORS.cyan;
    ctx.fill();
    ctx.strokeStyle = COLORS.ink;
    ctx.lineWidth = 1.6;
    ctx.stroke();
    roundRectPath(ctx, -2, 2, 5, 18, 2);
    ctx.fillStyle = "#d99655";
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  } else {
    // scroll
    ctx.save();
    ctx.translate(rect.x + 31, rect.y + 33);
    roundRectPath(ctx, -9, -13, 18, 26, 4);
    ctx.fillStyle = "#f7e7c3";
    ctx.fill();
    ctx.strokeStyle = COLORS.ink;
    ctx.lineWidth = 1.6;
    ctx.stroke();
    for (let i = 0; i < 3; i += 1) line(ctx, -5, -6 + i * 5, 5, -6 + i * 5, "#8d7a5e", 1);
    ctx.restore();
  }
  text(ctx, label, rect.x + 54, rect.y + 25, 13, COLORS.cream, {
    align: "left",
    weight: 800,
    letterSpacing: 0.3,
  });
  text(ctx, sub, rect.x + 54, rect.y + 43, 8, "#9e96c0", {
    align: "left",
    weight: 600,
  });
  if (type === "quests") {
    const claimable = QUESTS.some(
      (quest) => app.questProgress(quest.id) >= quest.target && !app.save.daily.claimed.includes(quest.id),
    );
    if (claimable) {
      ctx.beginPath();
      ctx.arc(rect.x + rect.w - 16, rect.y + 15, 6, 0, Math.PI * 2);
      ctx.fillStyle = COLORS.coral;
      ctx.fill();
      ctx.strokeStyle = COLORS.ink;
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }
  }
}

export function drawMenu(ctx, app) {
  drawHomeBackground(ctx, app.time);
  drawTopButtons(ctx, app);
  drawGlBadge(ctx, app);
  drawCurrencyPill(ctx, TOP.moon, "moon", app.save.moon);
  drawCurrencyPill(ctx, TOP.gem, "gem", app.save.gems);

  drawLogo(ctx, 240, 108, 1, app.time);

  const nextLevel = Math.min(app.save.lastLevel, LEVELS.length - 1);
  const level = LEVELS[nextLevel];
  drawButton(ctx, MENU.play.x, MENU.play.y, MENU.play.w, MENU.play.h, {
    label: "PLAY",
    sub: `NIGHT ${nextLevel + 1} · ${level.name.toUpperCase()}`,
    fill: COLORS.gold,
    fill2: "#f2b600",
    fontSize: 27,
    time: app.time,
    pulse: true,
  });

  for (let i = 0; i < LEVELS.length; i += 1) {
    drawLevelCard(ctx, app, i, MENU.levels[i]);
  }

  drawNavButton(ctx, app, MENU.workshop, "TOY WORKSHOP", "Permanent guardian upgrades", "workshop");
  drawNavButton(ctx, app, MENU.quests, "DREAM QUESTS", "Daily Moon & milestones", "quests");

  text(ctx, "Tap a night to defend. Catch stars. Keep the dream alive.", 240, 727, 8.5, "rgba(255,255,255,0.36)", {
    weight: 600,
  });
  text(ctx, "5 LANES  ·  9 TILES  ·  ONE COZY BATTLE", 240, 748, 7, "rgba(255,215,0,0.32)", {
    weight: 800,
    letterSpacing: 1.2,
  });

  // small glowing dream dust
  for (let i = 0; i < 5; i += 1) {
    const x = 50 + i * 95 + Math.sin(app.time * 0.8 + i) * 6;
    const y = 780 + Math.sin(app.time * 1.2 + i * 2) * 4;
    ctx.save();
    ctx.globalAlpha = 0.25 + 0.2 * Math.sin(app.time * 2 + i);
    drawStar(ctx, x, y, 2, 0.8, 5);
    ctx.fillStyle = i % 2 ? COLORS.cyan : COLORS.gold;
    ctx.fill();
    ctx.restore();
  }
}

export function menuPointerDown(app, x, y) {
  if (pointInCircle(x, y, TOP.sound)) {
    app.toggleSound();
    return true;
  }
  if (pointInCircle(x, y, TOP.help)) {
    app.audio.sfx("click");
    app.openHelp();
    return true;
  }
  if (pointInRect(x, y, MENU.play)) {
    app.audio.sfx("click");
    app.startLevel(Math.min(app.save.lastLevel, LEVELS.length - 1));
    return true;
  }
  for (let i = 0; i < LEVELS.length; i += 1) {
    if (pointInRect(x, y, MENU.levels[i])) {
      if (!app.canPlayLevel(i)) {
        app.showToast(`Clear Night ${i} first!`, "#ff6b7a");
        app.audio.sfx("deny");
      } else {
        app.audio.sfx("click");
        app.startLevel(i);
      }
      return true;
    }
  }
  if (pointInRect(x, y, MENU.workshop)) {
    app.audio.sfx("click");
    app.openWorkshop();
    return true;
  }
  if (pointInRect(x, y, MENU.quests)) {
    app.audio.sfx("click");
    app.openQuests();
    return true;
  }
  return false;
}

export { TOP as MENU_TOP, MENU };
