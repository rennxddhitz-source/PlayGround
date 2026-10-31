import { ACHIEVEMENTS, COLORS, QUESTS, UNITS, upgradeCost, unitStats } from "./data.js";
import {
  drawButton,
  drawGemIcon,
  drawHeart,
  drawHomeBackground,
  drawLock,
  drawMoonIcon,
  drawPanel,
  drawPortraitFrame,
  drawProgressBar,
  drawStar,
  drawStarCoin,
  drawSwordIcon,
  drawUnit,
  glow,
  line,
  roundRectPath,
  text,
} from "./draw.js";

const BACK = { x: 14, y: 14, w: 42, h: 42 };
export const WORKSHOP = {
  listTop: 98,
  listBottom: 792,
  cardX: 16,
  cardW: 448,
  cardH: 88,
  gap: 8,
  startY: 108,
  maxScroll: 90,
};
export const QUESTS_LAYOUT = {
  questStart: 112,
  questH: 108,
  questGap: 10,
  achTitle: 484,
  achStart: 506,
  achH: 74,
  achGap: 8,
  maxScroll: 0,
};

function pointInRect(x, y, rect) {
  return x >= rect.x && x <= rect.x + rect.w && y >= rect.y && y <= rect.y + rect.h;
}

function pointInCircle(x, y, circle) {
  return Math.hypot(x - circle.x, y - circle.y) <= circle.r;
}

function drawBackdrop(ctx, app) {
  drawHomeBackground(ctx, app.time);
  ctx.save();
  ctx.fillStyle = "rgba(8,7,18,0.74)";
  ctx.fillRect(0, 0, 480, 854);
  const grad = ctx.createLinearGradient(0, 0, 0, 854);
  grad.addColorStop(0, "rgba(30,24,55,0.55)");
  grad.addColorStop(0.5, "rgba(16,13,31,0.3)");
  grad.addColorStop(1, "rgba(8,7,18,0.6)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 480, 854);
  ctx.restore();
}

function drawHeader(ctx, app, title, subtitle) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(BACK.x + BACK.w / 2, BACK.y + BACK.h / 2, 19, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(25,21,46,0.94)";
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.16)";
  ctx.lineWidth = 1.4;
  ctx.stroke();
  line(ctx, 40, 30, 31, 36, COLORS.cream, 2.6);
  line(ctx, 31, 36, 40, 42, COLORS.cream, 2.6);
  text(ctx, title, 66, 31, 22, COLORS.cream, {
    align: "left",
    weight: 800,
    stroke: 4,
    strokeColor: "rgba(0,0,0,0.28)",
  });
  if (subtitle) text(ctx, subtitle, 66, 52, 8.5, "#9e96c0", { align: "left", weight: 600 });

  // moon pill
  roundRectPath(ctx, 304, 18, 78, 34, 12);
  ctx.fillStyle = "rgba(25,21,46,0.94)";
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.12)";
  ctx.lineWidth = 1;
  ctx.stroke();
  drawMoonIcon(ctx, 320, 35, 8, COLORS.gold);
  text(ctx, `${app.save.moon}`, 336, 35, 13, COLORS.cream, { align: "left", weight: 800 });

  // gem pill
  roundRectPath(ctx, 390, 18, 76, 34, 12);
  ctx.fillStyle = "rgba(25,21,46,0.94)";
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.12)";
  ctx.lineWidth = 1;
  ctx.stroke();
  drawGemIcon(ctx, 406, 35, 7.5);
  text(ctx, `${app.save.gems}`, 422, 35, 13, COLORS.cream, { align: "left", weight: 800 });
  ctx.restore();
}

function drawScrollbar(ctx, x, y, h, scroll, maxScroll, visible = 0.62) {
  if (maxScroll <= 0) return;
  roundRectPath(ctx, x, y, 3, h, 1.5);
  ctx.fillStyle = "rgba(255,255,255,0.07)";
  ctx.fill();
  const thumbH = Math.max(36, h * visible);
  const thumbY = y + (scroll / Math.max(1, maxScroll)) * (h - thumbH);
  roundRectPath(ctx, x, thumbY, 3, thumbH, 1.5);
  ctx.fillStyle = "rgba(255,215,0,0.45)";
  ctx.fill();
}

function drawPips(ctx, x, y, count) {
  for (let i = 0; i < 5; i += 1) {
    ctx.beginPath();
    ctx.arc(x + i * 12, y, 3.4, 0, Math.PI * 2);
    ctx.fillStyle = i < count ? COLORS.gold : "rgba(255,255,255,0.14)";
    ctx.fill();
    if (i < count) {
      ctx.strokeStyle = "rgba(255,215,0,0.45)";
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }
  }
}

function drawWorkshopCard(ctx, app, unit, index, y) {
  const level = app.save.upgrades[unit.id] || 0;
  const stats = unitStats(unit, level);
  const locked = app.guardianLevel < unit.unlock;
  const cost = upgradeCost(level);
  const maxed = level >= 5;

  drawPanel(ctx, WORKSHOP.cardX, y, WORKSHOP.cardW, WORKSHOP.cardH, {
    fill: locked ? "rgba(21,18,40,0.94)" : "rgba(31,26,56,0.96)",
    radius: 16,
    accent: locked ? "rgba(255,255,255,0.04)" : unit.accent,
  });
  drawPortraitFrame(ctx, WORKSHOP.cardX + 12, y + 13, 62, unit.id, {
    locked,
    time: app.time,
  });

  text(ctx, unit.name, 94, y + 22, 15, locked ? "rgba(255,255,255,0.45)" : COLORS.cream, {
    align: "left",
    weight: 800,
  });
  text(ctx, `${unit.role.toUpperCase()} · COST ${unit.cost}★`, 94, y + 39, 7.5, "#9e96c0", {
    align: "left",
    weight: 700,
    letterSpacing: 0.5,
  });
  drawPips(ctx, 96, y + 55, level);
  text(ctx, `HP ${stats.hp}`, 96, y + 73, 8, "#b9b1d9", { align: "left", weight: 700 });
  text(ctx, unit.damage ? `DMG ${stats.damage}` : unit.heal ? `HEAL ${stats.heal}` : `GEN ${stats.generate}`, 158, y + 73, 8, "#b9b1d9", {
    align: "left",
    weight: 700,
  });
  text(ctx, `+${level * 10}%`, 226, y + 73, 8, level > 0 ? "#72e6a5" : "rgba(255,255,255,0.25)", {
    align: "left",
    weight: 800,
  });

  if (locked) {
    drawLock(ctx, 396, y + 36, 12, "rgba(255,255,255,0.68)");
    text(ctx, `GL ${unit.unlock}`, 396, y + 64, 10, "rgba(255,255,255,0.55)", { weight: 800 });
  } else {
    drawButton(ctx, 344, y + 20, 104, 46, {
      label: maxed ? "MAXED" : "UPGRADE",
      sub: maxed ? "FULL POWER" : `${cost} MOON`,
      fill: maxed ? "#40385f" : app.save.moon >= cost ? COLORS.gold : "#4b426e",
      fill2: maxed ? "#2e2849" : app.save.moon >= cost ? "#f2b600" : "#3c345c",
      textColor: maxed ? "#b9b1d9" : INK,
      fontSize: 12,
      disabled: maxed,
    });
  }
}

const INK = COLORS.ink;

export function drawWorkshopScreen(ctx, app) {
  drawBackdrop(ctx, app);
  drawHeader(ctx, app, "TOY WORKSHOP", "Permanent guardian upgrades · +10% HP & power per level");
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, WORKSHOP.listTop, 480, WORKSHOP.listBottom - WORKSHOP.listTop);
  ctx.clip();
  for (let i = 0; i < UNITS.length; i += 1) {
    const y = WORKSHOP.startY + i * (WORKSHOP.cardH + WORKSHOP.gap) - app.workshopScroll;
    if (y > WORKSHOP.listBottom || y + WORKSHOP.cardH < WORKSHOP.listTop) continue;
    drawWorkshopCard(ctx, app, UNITS[i], i, y);
  }
  ctx.restore();
  drawScrollbar(ctx, 473, WORKSHOP.listTop + 6, WORKSHOP.listBottom - WORKSHOP.listTop - 12, app.workshopScroll, WORKSHOP.maxScroll, 0.74);
  text(ctx, "Tap UPGRADE to spend Moon. Upgrades apply to every future night.", 240, 816, 8, "rgba(255,255,255,0.36)", {
    weight: 600,
  });
}

function workshopUpgradeAt(app, x, y) {
  for (let i = 0; i < UNITS.length; i += 1) {
    const cardY = WORKSHOP.startY + i * (WORKSHOP.cardH + WORKSHOP.gap) - app.workshopScroll;
    if (pointInRect(x, y, { x: 344, y: cardY + 20, w: 104, h: 46 })) return UNITS[i];
  }
  return null;
}

export function workshopPointerDown(app, x, y) {
  if (pointInRect(x, y, BACK)) {
    app.audio.sfx("click");
    app.goMenu();
    return true;
  }
  if (y > WORKSHOP.listTop && y < WORKSHOP.listBottom) {
    app.workshopDrag = { startX: x, startY: y, startScroll: app.workshopScroll, moved: false };
    return true;
  }
  return false;
}

export function workshopPointerMove(app, x, y) {
  if (!app.workshopDrag) return false;
  const dy = y - app.workshopDrag.startY;
  if (Math.abs(dy) > 6) app.workshopDrag.moved = true;
  app.workshopScroll = Math.max(0, Math.min(WORKSHOP.maxScroll, app.workshopDrag.startScroll - dy));
  return true;
}

export function workshopPointerUp(app, x, y) {
  if (!app.workshopDrag) return false;
  const drag = app.workshopDrag;
  app.workshopDrag = null;
  if (drag.moved) return true;
  const unit = workshopUpgradeAt(app, x, y);
  if (unit) {
    app.upgradeUnit(unit.id);
    return true;
  }
  return true;
}

function drawQuestIcon(ctx, type, x, y) {
  if (type === "moon") drawMoonIcon(ctx, x, y, 10, COLORS.gold);
  else if (type === "sword") drawSwordIcon(ctx, x, y, 15, COLORS.cyan);
  else drawStarCoin(ctx, x, y, 10, 0);
}

function drawQuestCard(ctx, app, quest, y) {
  const progress = Math.min(quest.target, app.questProgress(quest.id));
  const complete = progress >= quest.target;
  const claimed = app.save.daily.claimed.includes(quest.id);
  drawPanel(ctx, 16, y, 448, QUESTS_LAYOUT.questH, {
    fill: claimed ? "rgba(24,20,43,0.86)" : "rgba(31,26,56,0.96)",
    radius: 16,
    accent: complete && !claimed ? COLORS.gold : "rgba(255,255,255,0.05)",
  });
  ctx.save();
  ctx.beginPath();
  ctx.arc(54, y + 44, 22, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255,255,255,0.05)";
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.lineWidth = 1;
  ctx.stroke();
  drawQuestIcon(ctx, quest.icon, 54, y + 44);
  ctx.restore();
  text(ctx, quest.title, 88, y + 25, 14, claimed ? "rgba(255,255,255,0.5)" : COLORS.cream, {
    align: "left",
    weight: 800,
  });
  text(ctx, quest.description, 88, y + 43, 8.5, "#9e96c0", { align: "left", weight: 600 });
  drawProgressBar(ctx, 88, y + 60, 238, 9, progress / quest.target, {
    fill: complete ? "#55d98b" : "#00b8e0",
    fill2: complete ? "#a9ffbf" : "#8bf3ff",
  });
  text(ctx, `${progress}/${quest.target}`, 330, y + 65, 8, complete ? "#72e6a5" : "#b9b1d9", {
    align: "right",
    weight: 800,
  });
  drawMoonIcon(ctx, 96, y + 88, 6, COLORS.gold);
  text(ctx, `+${quest.reward} MOON`, 107, y + 88, 8.5, COLORS.gold, { align: "left", weight: 800 });

  if (claimed) {
    roundRectPath(ctx, 346, y + 30, 96, 48, 13);
    ctx.fillStyle = "rgba(85,217,139,0.12)";
    ctx.fill();
    ctx.strokeStyle = "rgba(85,217,139,0.4)";
    ctx.lineWidth = 1.2;
    ctx.stroke();
    text(ctx, "CLAIMED", 394, y + 54, 9, "#72e6a5", { weight: 800, letterSpacing: 1 });
  } else {
    drawButton(ctx, 346, y + 28, 96, 50, {
      label: complete ? "CLAIM" : "LOCKED",
      fill: complete ? COLORS.gold : "#413962",
      fill2: complete ? "#f2b600" : "#332c51",
      textColor: complete ? INK : "rgba(255,255,255,0.5)",
      fontSize: 11,
      disabled: !complete,
      time: app.time,
      pulse: complete,
    });
  }
}

function drawAchievementCard(ctx, app, achievement, y) {
  const earned = app.save.achievements.includes(achievement.id);
  drawPanel(ctx, 16, y, 448, QUESTS_LAYOUT.achH, {
    fill: earned ? "rgba(37,31,63,0.96)" : "rgba(24,20,43,0.9)",
    radius: 14,
    accent: earned ? "rgba(0,212,255,0.3)" : "rgba(255,255,255,0.03)",
  });
  ctx.save();
  ctx.beginPath();
  ctx.arc(47, y + 37, 19, 0, Math.PI * 2);
  ctx.fillStyle = earned ? "rgba(0,212,255,0.1)" : "rgba(255,255,255,0.04)";
  ctx.fill();
  drawGemIcon(ctx, 47, y + 37, 8);
  ctx.restore();
  text(ctx, achievement.title, 78, y + 26, 12, earned ? COLORS.cream : "rgba(255,255,255,0.55)", {
    align: "left",
    weight: 800,
  });
  text(ctx, achievement.description, 78, y + 43, 8, "#9e96c0", { align: "left", weight: 600 });
  text(ctx, `+${achievement.gems}`, 408, y + 31, 13, COLORS.cyan, { align: "right", weight: 800 });
  text(ctx, earned ? "EARNED" : "LOCKED", 408, y + 47, 7, earned ? "#72e6a5" : "rgba(255,255,255,0.35)", {
    align: "right",
    weight: 800,
    letterSpacing: 1,
  });
}

export function drawQuestsScreen(ctx, app) {
  drawBackdrop(ctx, app);
  drawHeader(ctx, app, "DREAM JOURNAL", "Daily quests & dream milestones");
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 88, 480, 720);
  ctx.clip();
  text(ctx, "DAILY QUESTS", 18, 98, 9, COLORS.gold, { align: "left", weight: 800, letterSpacing: 1.6 });
  text(ctx, "Resets at midnight", 462, 98, 7.5, "rgba(255,255,255,0.38)", { align: "right", weight: 600 });
  for (let i = 0; i < QUESTS.length; i += 1) {
    const y = QUESTS_LAYOUT.questStart + i * (QUESTS_LAYOUT.questH + QUESTS_LAYOUT.questGap) - app.questsScroll;
    drawQuestCard(ctx, app, QUESTS[i], y);
  }
  text(ctx, "ACHIEVEMENTS", 18, QUESTS_LAYOUT.achTitle - app.questsScroll, 9, COLORS.cyan, {
    align: "left",
    weight: 800,
    letterSpacing: 1.6,
  });
  text(ctx, `${app.save.achievements.length}/${ACHIEVEMENTS.length} earned`, 462, QUESTS_LAYOUT.achTitle - app.questsScroll, 7.5, "rgba(255,255,255,0.38)", {
    align: "right",
    weight: 600,
  });
  for (let i = 0; i < ACHIEVEMENTS.length; i += 1) {
    const y = QUESTS_LAYOUT.achStart + i * (QUESTS_LAYOUT.achH + QUESTS_LAYOUT.achGap) - app.questsScroll;
    drawAchievementCard(ctx, app, ACHIEVEMENTS[i], y);
  }
  ctx.restore();
  drawScrollbar(ctx, 473, 96, 710, app.questsScroll, QUESTS_LAYOUT.maxScroll, 0.86);
  text(ctx, "Every good night makes the next one brighter.", 240, 822, 8, "rgba(255,255,255,0.36)", { weight: 600 });
}

function questClaimAt(app, x, y) {
  for (let i = 0; i < QUESTS.length; i += 1) {
    const cardY = QUESTS_LAYOUT.questStart + i * (QUESTS_LAYOUT.questH + QUESTS_LAYOUT.questGap) - app.questsScroll;
    if (pointInRect(x, y, { x: 346, y: cardY + 28, w: 96, h: 50 })) return QUESTS[i];
  }
  return null;
}

export function questsPointerDown(app, x, y) {
  if (pointInRect(x, y, BACK)) {
    app.audio.sfx("click");
    app.goMenu();
    return true;
  }
  if (y > 88) {
    app.questsDrag = { startX: x, startY: y, startScroll: app.questsScroll, moved: false };
    return true;
  }
  return false;
}

export function questsPointerMove(app, x, y) {
  if (!app.questsDrag) return false;
  const dy = y - app.questsDrag.startY;
  if (Math.abs(dy) > 6) app.questsDrag.moved = true;
  app.questsScroll = Math.max(0, Math.min(QUESTS_LAYOUT.maxScroll, app.questsDrag.startScroll - dy));
  return true;
}

export function questsPointerUp(app, x, y) {
  if (!app.questsDrag) return false;
  const drag = app.questsDrag;
  app.questsDrag = null;
  if (drag.moved) return true;
  const quest = questClaimAt(app, x, y);
  if (quest) {
    app.claimQuest(quest.id);
    return true;
  }
  return true;
}

function drawHelpStep(ctx, app, index, y, title, description, kind) {
  roundRectPath(ctx, 48, y, 384, 96, 16);
  ctx.fillStyle = "rgba(255,255,255,0.035)";
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.07)";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.save();
  ctx.beginPath();
  ctx.arc(90, y + 48, 27, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255,215,0,0.08)";
  ctx.fill();
  ctx.strokeStyle = "rgba(255,215,0,0.25)";
  ctx.lineWidth = 1.2;
  ctx.stroke();
  if (kind === "teddy") drawUnit(ctx, "teddy", 90, y + 58, 0.62, { time: app.time });
  if (kind === "star") drawStarCoin(ctx, 90, y + 48, 13, app.time);
  if (kind === "heart") {
    drawHeart(ctx, 90, y + 48, 15);
    ctx.fillStyle = "#55d98b";
    ctx.fill();
    ctx.strokeStyle = COLORS.ink;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
  if (kind === "power") {
    drawStar(ctx, 90, y + 48, 16, 7, 5, app.time);
    ctx.fillStyle = COLORS.gold;
    ctx.fill();
    ctx.strokeStyle = COLORS.ink;
    ctx.lineWidth = 1.8;
    ctx.stroke();
  }
  ctx.restore();
  text(ctx, title, 132, y + 29, 13, COLORS.cream, { align: "left", weight: 800 });
  const words = description.split(" ");
  let lineText = "";
  let lineIndex = 0;
  for (const word of words) {
    const test = lineText ? `${lineText} ${word}` : word;
    if (ctx.measureText(test).width > 270 && lineText) {
      text(ctx, lineText, 132, y + 48 + lineIndex * 14, 8.5, "#b9b1d9", { align: "left", weight: 600 });
      lineText = word;
      lineIndex += 1;
    } else {
      lineText = test;
    }
  }
  if (lineText) text(ctx, lineText, 132, y + 48 + lineIndex * 14, 8.5, "#b9b1d9", { align: "left", weight: 600 });
}

export function drawHelpScreen(ctx, app) {
  drawBackdrop(ctx, app);
  drawPanel(ctx, 24, 74, 432, 708, {
    fill: "rgba(28,24,52,0.97)",
    radius: 24,
    accent: "rgba(0,212,255,0.35)",
  });
  text(ctx, "HOW TO DREAM", 240, 120, 28, COLORS.cream, {
    family: '"Lilita One", sans-serif',
    weight: 400,
    stroke: 6,
    strokeColor: COLORS.ink,
  });
  text(ctx, "A tiny guide to guarding a very big imagination.", 240, 146, 9, "#9e96c0", { weight: 600 });

  drawHelpStep(
    ctx,
    app,
    0,
    166,
    "1 · PLACE YOUR TOYS",
    "Tap a toy card, then a glowing tile. Guardians block lanes and fight all on their own.",
    "teddy",
  );
  drawHelpStep(
    ctx,
    app,
    1,
    274,
    "2 · CATCH STARLIGHT",
    "Tap falling stars to earn Starlight. Spend it on more toys before the next wave arrives.",
    "star",
  );
  drawHelpStep(
    ctx,
    app,
    2,
    382,
    "3 · GUARD THE DREAM",
    "Nightmares drain the Dream Meter at the left edge. Keep all five lanes covered.",
    "heart",
  );
  drawHelpStep(
    ctx,
    app,
    3,
    490,
    "4 · UNLEASH STAR POWER",
    "Banish nightmares to fill the star button. Tap it for a dream nova that freezes and scorches.",
    "power",
  );

  text(ctx, "COZY TIP", 62, 616, 8, COLORS.gold, { align: "left", weight: 800, letterSpacing: 1.2 });
  text(ctx, "You can pause any time. Upgrades and Moon are saved forever.", 62, 635, 9, "#b9b1d9", {
    align: "left",
    weight: 600,
  });
  drawButton(ctx, 66, 672, 348, 58, {
    label: "GOT IT",
    fill: COLORS.gold,
    fill2: "#f2b600",
    fontSize: 20,
    time: app.time,
  });
  text(ctx, "Toys vs. Nightmares · a cozy lane defense", 240, 752, 7.5, "rgba(255,255,255,0.3)", { weight: 600 });
}

export function helpPointerDown(app, x, y) {
  if (pointInRect(x, y, BACK) || pointInRect(x, y, { x: 66, y: 672, w: 348, h: 58 })) {
    app.audio.sfx("click");
    app.goMenu();
    return true;
  }
  return false;
}
