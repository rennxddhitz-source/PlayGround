import { COLORS, UNIT_BY_ID } from "./data.js";
import { PAUSE, RESULT } from "./game.js";
import {
  drawButton,
  drawMoonIcon,
  drawPanel,
  drawProgressBar,
  drawSoundIcon,
  drawStar,
  drawStarCoin,
  glow,
  roundRectPath,
  text,
} from "./draw.js";

const INK = COLORS.ink;

export function drawPauseOverlay(ctx, game) {
  ctx.save();
  ctx.fillStyle = "rgba(7,6,16,0.74)";
  ctx.fillRect(0, 0, 480, 854);
  drawPanel(ctx, 60, 190, 360, 430, {
    fill: "rgba(28,24,52,0.98)",
    radius: 24,
    accent: "rgba(0,212,255,0.5)",
  });
  text(ctx, "PAUSED", 240, 246, 40, COLORS.cream, {
    family: '"Lilita One", sans-serif',
    weight: 400,
    stroke: 8,
    strokeColor: INK,
  });
  text(ctx, "The toys will keep watch.", 240, 283, 11, "#b9b1d9", { weight: 700 });

  drawButton(ctx, PAUSE.resume.x, PAUSE.resume.y, PAUSE.resume.w, PAUSE.resume.h, {
    label: "KEEP GUARDING",
    fill: COLORS.gold,
    fill2: "#f2b600",
    fontSize: 20,
    time: game.time,
  });
  drawButton(ctx, PAUSE.restart.x, PAUSE.restart.y, PAUSE.restart.w, PAUSE.restart.h, {
    label: "RESTART NIGHT",
    fill: "#51447d",
    fill2: "#3b3163",
    textColor: COLORS.cream,
    fontSize: 17,
  });
  drawButton(ctx, PAUSE.sound.x, PAUSE.sound.y, PAUSE.sound.w, PAUSE.sound.h, {
    label: game.app.save.audio ? "SOUND: ON" : "SOUND: OFF",
    fill: "#2e2853",
    fill2: "#252045",
    textColor: COLORS.cream,
    fontSize: 16,
    icon: (iconCtx, x, y, size) => drawSoundIcon(iconCtx, x, y, size, !game.app.save.audio, COLORS.cream),
  });
  drawButton(ctx, PAUSE.quit.x, PAUSE.quit.y, PAUSE.quit.w, PAUSE.quit.h, {
    label: "LEAVE DREAM",
    fill: "#5e3348",
    fill2: "#442437",
    textColor: COLORS.cream,
    fontSize: 15,
  });
  text(ctx, "Tip: place a guardian in every lane.", 240, 604, 10, "rgba(255,255,255,0.4)", { weight: 600 });
  ctx.restore();
}

function drawStatTile(ctx, x, y, w, h, label, value, color) {
  roundRectPath(ctx, x, y, w, h, 12);
  ctx.fillStyle = "rgba(18,15,35,0.65)";
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.lineWidth = 1;
  ctx.stroke();
  text(ctx, label, x + w / 2, y + 16, 7, "rgba(255,255,255,0.45)", {
    weight: 800,
    letterSpacing: 1.1,
  });
  text(ctx, value, x + w / 2, y + 37, 20, color, {
    weight: 800,
    stroke: 3,
    strokeColor: "rgba(0,0,0,0.28)",
  });
}

function drawResultSparkles(ctx, game) {
  for (let i = 0; i < 18; i += 1) {
    const angle = i * 1.37 + game.resultTime * 0.3;
    const radius = 150 + (i % 4) * 32 + Math.sin(game.resultTime + i) * 12;
    const x = 240 + Math.cos(angle) * radius;
    const y = 400 + Math.sin(angle * 1.3) * radius * 0.72;
    const alpha = 0.18 + 0.5 * (0.5 + Math.sin(game.resultTime * 2.3 + i * 1.8) * 0.5);
    ctx.save();
    ctx.globalAlpha = alpha;
    drawStar(ctx, x, y, 2 + (i % 3), 0.8, i % 5 === 0 ? 4 : 5, game.resultTime + i);
    ctx.fillStyle = i % 3 === 0 ? COLORS.gold : i % 3 === 1 ? COLORS.cyan : COLORS.pink;
    ctx.fill();
    ctx.restore();
  }
}

export function drawResultOverlay(ctx, game) {
  const won = game.state === "won";
  const result = game.result || {};
  const card = RESULT.card;
  ctx.save();
  ctx.fillStyle = "rgba(7,6,16,0.8)";
  ctx.fillRect(0, 0, 480, 854);
  drawResultSparkles(ctx, game);

  // card glow
  glow(ctx, 240, 390, 280, won ? "rgba(255,215,0,0.2)" : "rgba(255,77,109,0.14)", 0.9);
  drawPanel(ctx, card.x, card.y, card.w, card.h, {
    fill: won ? "rgba(31,26,57,0.99)" : "rgba(29,23,48,0.99)",
    radius: 26,
    accent: won ? COLORS.gold : COLORS.coral,
    lineWidth: 3,
  });

  // ribbon
  roundRectPath(ctx, 138, 112, 204, 26, 13);
  ctx.fillStyle = won ? COLORS.gold : "#ff6b7a";
  ctx.fill();
  ctx.strokeStyle = INK;
  ctx.lineWidth = 2;
  ctx.stroke();
  text(ctx, won ? "NIGHT COMPLETE" : "DREAM LOST", 240, 125, 10, INK, {
    weight: 800,
    letterSpacing: 1.8,
  });

  text(ctx, won ? "DREAM SECURED!" : "NIGHTMARE WON", 240, 170, won ? 31 : 28, won ? COLORS.gold : "#ff8a9c", {
    family: '"Lilita One", sans-serif',
    weight: 400,
    stroke: 7,
    strokeColor: INK,
    shadow: won ? "#6c4a00" : "#561421",
  });
  text(
    ctx,
    won ? "The nursery is safe until morning." : "The dream slipped away… but dawn returns.",
    240,
    197,
    10.5,
    "#c7bfe4",
    { weight: 600 },
  );

  // medallion
  const medallionY = 252;
  ctx.save();
  ctx.beginPath();
  ctx.arc(240, medallionY, 37, 0, Math.PI * 2);
  ctx.fillStyle = won ? "rgba(255,215,0,0.1)" : "rgba(255,77,109,0.09)";
  ctx.fill();
  ctx.strokeStyle = won ? "rgba(255,215,0,0.45)" : "rgba(255,77,109,0.4)";
  ctx.lineWidth = 1.4;
  ctx.setLineDash([3, 5]);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();
  drawMoonIcon(ctx, 240, medallionY, 27, won ? "#ffe9a3" : "#9d8ebd");
  drawStar(ctx, 266, medallionY - 22, 7, 3, 5, game.resultTime);
  ctx.fillStyle = won ? COLORS.gold : "#7b6b99";
  ctx.fill();
  ctx.strokeStyle = INK;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  const stats = game.stats || { dream: 0, kills: 0, stars: 0 };
  drawStatTile(ctx, 64, 305, 108, 56, "DREAM LEFT", `${stats.dream}`, "#55d98b");
  drawStatTile(ctx, 186, 305, 108, 56, "BANISHED", `${stats.kills}`, "#ffd700");
  drawStatTile(ctx, 308, 305, 108, 56, "STARS", `${stats.stars}`, "#00d4ff");

  // reward
  roundRectPath(ctx, 64, 378, 352, 82, 15);
  ctx.fillStyle = "rgba(16,13,31,0.72)";
  ctx.fill();
  ctx.strokeStyle = won ? "rgba(255,215,0,0.28)" : "rgba(255,255,255,0.08)";
  ctx.lineWidth = 1.3;
  ctx.stroke();
  if (won) {
    text(ctx, "MOON REWARD", 82, 397, 8, "#b9b1d9", { align: "left", weight: 800, letterSpacing: 1.2 });
    drawMoonIcon(ctx, 91, 426, 12, COLORS.gold);
    text(ctx, `+${result.moon || 0}`, 110, 427, 23, COLORS.gold, {
      align: "left",
      weight: 800,
      stroke: 3,
      strokeColor: "rgba(0,0,0,0.3)",
    });
    text(ctx, result.firstClear ? "FIRST CLEAR BONUS" : "REPLAY REWARD", 398, 397, 8, result.firstClear ? COLORS.cyan : "#b9b1d9", {
      align: "right",
      weight: 800,
      letterSpacing: 0.9,
    });
    text(ctx, `+${result.xp || 0} GUARDIAN XP`, 398, 427, 12, "#fff5d6", {
      align: "right",
      weight: 800,
    });
    if (result.gems > 0) {
      text(ctx, `+${result.gems} GEM${result.gems > 1 ? "S" : ""}`, 398, 446, 9, COLORS.cyan, {
        align: "right",
        weight: 800,
      });
    }
  } else {
    text(ctx, "A LITTLE STRATEGY", 82, 397, 8, "#ff9edb", { align: "left", weight: 800, letterSpacing: 1.2 });
    text(ctx, "Fill every lane with a guardian, then", 82, 421, 11, COLORS.cream, { align: "left", weight: 600 });
    text(ctx, "catch stars to afford reinforcements.", 82, 439, 11, COLORS.cream, { align: "left", weight: 600 });
    text(ctx, `WAVE ${stats.wave || 0}/${game.level.waves.length}`, 398, 426, 13, "#ffd700", {
      align: "right",
      weight: 800,
    });
  }

  // guardian xp
  const level = result.newLevel || game.app.guardianLevel;
  const xp = game.app.save.xp;
  const progress = result.xpProgress ?? 0;
  text(ctx, "GUARDIAN LEVEL", 64, 486, 8, "#b9b1d9", { align: "left", weight: 800, letterSpacing: 1.2 });
  text(ctx, `GL ${level}`, 416, 486, 13, COLORS.cyan, { align: "right", weight: 800 });
  drawProgressBar(ctx, 64, 497, 352, 12, progress, { fill: "#00b8e0", fill2: "#8bf3ff" });
  text(ctx, `${xp} XP`, 64, 522, 9, "rgba(255,255,255,0.45)", { align: "left", weight: 700 });
  if (result.newLevel > result.oldLevel) {
    roundRectPath(ctx, 312, 514, 104, 20, 10);
    ctx.fillStyle = COLORS.gold;
    ctx.fill();
    ctx.strokeStyle = INK;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    text(ctx, "LEVEL UP!", 364, 524, 9, INK, { weight: 800, letterSpacing: 1 });
  } else if (result.unlockedUnit) {
    const unit = UNIT_BY_ID[result.unlockedUnit];
    text(ctx, `${unit.name} unlocked!`, 416, 522, 9, COLORS.gold, { align: "right", weight: 700 });
  }

  // buttons
  if (won) {
    drawButton(ctx, RESULT.next.x, RESULT.next.y, RESULT.next.w, RESULT.next.h, {
      label: result.nextAvailable ? "NEXT NIGHT" : "NIGHT COMPLETE",
      fill: COLORS.gold,
      fill2: "#f2b600",
      fontSize: 21,
      disabled: !result.nextAvailable,
      time: game.resultTime,
      pulse: result.nextAvailable,
    });
    drawButton(ctx, RESULT.retry.x, RESULT.retry.y, RESULT.retry.w, RESULT.retry.h, {
      label: "REPLAY",
      fill: "#51447d",
      fill2: "#3b3163",
      textColor: COLORS.cream,
      fontSize: 15,
    });
    drawButton(ctx, RESULT.home.x, RESULT.home.y, RESULT.home.w, RESULT.home.h, {
      label: "HOME",
      fill: "#2e2853",
      fill2: "#252045",
      textColor: COLORS.cream,
      fontSize: 15,
    });
  } else {
    drawButton(ctx, RESULT.next.x, RESULT.next.y, RESULT.next.w, RESULT.next.h, {
      label: "TRY AGAIN",
      fill: COLORS.gold,
      fill2: "#f2b600",
      fontSize: 21,
      time: game.resultTime,
      pulse: true,
    });
    drawButton(ctx, 66, 646, 348, 54, {
      label: "BACK TO HOME",
      fill: "#2e2853",
      fill2: "#252045",
      textColor: COLORS.cream,
      fontSize: 15,
    });
  }

  // footer toys
  ctx.save();
  ctx.globalAlpha = 0.75;
  drawStarCoin(ctx, 92, 722, 8, game.resultTime);
  drawStarCoin(ctx, 388, 722, 8, game.resultTime + 1);
  text(ctx, won ? "Sleep tight, little guardian." : "Every guardian needs another try.", 240, 723, 9, "rgba(255,255,255,0.42)", {
    weight: 600,
  });
  ctx.restore();
  ctx.restore();
}
