import { AudioEngine } from "./audio.js";
import {
  ACHIEVEMENTS,
  GUARDIAN_XP,
  LEVELS,
  QUESTS,
  UNITS,
  UNIT_BY_ID,
  guardianLevelForXp,
  upgradeCost,
} from "./data.js";
import { Game } from "./game.js";
import { gamePointerDown, gamePointerMove, gamePointerUp, gameWheel } from "./input.js";
import { roundRectPath } from "./draw.js";
import { drawGame } from "./render.js";
import {
  drawHelpScreen,
  drawMenu,
  drawQuestsScreen,
  drawWorkshopScreen,
  helpPointerDown,
  menuPointerDown,
  QUESTS_LAYOUT,
  questsPointerDown,
  questsPointerMove,
  questsPointerUp,
  WORKSHOP,
  workshopPointerDown,
  workshopPointerMove,
  workshopPointerUp,
} from "./screens.js";

const SAVE_KEY = "toys-vs-nightmares-save-v1";

function todayKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function defaultSave() {
  return {
    version: 1,
    xp: 0,
    moon: 80,
    gems: 0,
    cleared: [],
    upgrades: {},
    audio: true,
    daily: {
      date: todayKey(),
      progress: { win: 0, kills: 0, stars: 0 },
      claimed: [],
    },
    achievements: [],
    seenIntro: false,
    lastLevel: 0,
  };
}

function loadSave() {
  const base = defaultSave();
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return base;
    const parsed = JSON.parse(raw);
    const merged = {
      ...base,
      ...parsed,
      daily: {
        ...base.daily,
        ...(parsed.daily || {}),
        progress: { ...base.daily.progress, ...((parsed.daily || {}).progress || {}) },
        claimed: Array.isArray(parsed.daily?.claimed) ? parsed.daily.claimed : [],
      },
      upgrades: { ...base.upgrades, ...(parsed.upgrades || {}) },
      cleared: Array.isArray(parsed.cleared) ? parsed.cleared : [],
      achievements: Array.isArray(parsed.achievements) ? parsed.achievements : [],
    };
    if (merged.daily.date !== todayKey()) {
      merged.daily = { date: todayKey(), progress: { win: 0, kills: 0, stars: 0 }, claimed: [] };
    }
    return merged;
  } catch {
    return base;
  }
}

export class App {
  constructor() {
    this.save = loadSave();
    this.audio = new AudioEngine();
    this.audio.muted = !this.save.audio;
    this.screen = "menu";
    this.game = null;
    this.time = 0;
    this.transition = 1;
    this.workshopScroll = 0;
    this.questsScroll = 0;
    this.workshopDrag = null;
    this.questsDrag = null;
    this.toastText = "";
    this.toastTimer = 0;
    this.toastColor = "#00d4ff";
    this.audio.setMuted(!this.save.audio);
  }

  get guardianLevel() {
    return guardianLevelForXp(this.save.xp);
  }

  get xpProgress() {
    const level = this.guardianLevel;
    if (level >= 8) return 1;
    const current = GUARDIAN_XP[level - 1] ?? 0;
    const next = GUARDIAN_XP[level] ?? current + 1;
    return Math.max(0, Math.min(1, (this.save.xp - current) / (next - current)));
  }

  get xpToNext() {
    if (this.guardianLevel >= 8) return 0;
    return GUARDIAN_XP[this.guardianLevel] - this.save.xp;
  }

  saveGame() {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(this.save));
    } catch {
      // Storage may be unavailable in private browsing; the run still works.
    }
  }

  refreshDaily() {
    if (this.save.daily.date !== todayKey()) {
      this.save.daily = { date: todayKey(), progress: { win: 0, kills: 0, stars: 0 }, claimed: [] };
      this.saveGame();
    }
  }

  showToast(message, color = "#00d4ff") {
    this.toastText = message;
    this.toastColor = color;
    this.toastTimer = 2.4;
  }

  changeScreen(screen) {
    this.screen = screen;
    this.transition = 1;
  }

  canPlayLevel(index) {
    if (index < 0 || index >= LEVELS.length) return false;
    if (index === 0) return true;
    return this.save.cleared.includes(index - 1);
  }

  startLevel(index) {
    if (!this.canPlayLevel(index)) {
      this.showToast("Clear the previous night first!", "#ff6b7a");
      this.audio.sfx("deny");
      return;
    }
    this.save.lastLevel = index;
    this.saveGame();
    this.game = new Game(this, index);
    this.changeScreen("game");
    this.audio.init();
  }

  nextLevel() {
    if (!this.game) return;
    const next = this.game.levelIndex + 1;
    if (this.canPlayLevel(next)) this.startLevel(next);
    else this.goMenu();
  }

  goMenu() {
    this.game = null;
    this.saveGame();
    this.changeScreen("menu");
  }

  openWorkshop() {
    this.workshopScroll = 0;
    this.changeScreen("workshop");
  }

  openQuests() {
    this.refreshDaily();
    this.questsScroll = 0;
    this.changeScreen("quests");
  }

  openHelp() {
    this.changeScreen("help");
  }

  toggleSound() {
    this.save.audio = !this.save.audio;
    this.audio.setMuted(!this.save.audio);
    this.saveGame();
    if (this.save.audio) this.audio.sfx("click");
  }

  recordKill() {
    this.save.daily.progress.kills += 1;
  }

  recordStar() {
    this.save.daily.progress.stars += 1;
  }

  completeLevel(levelIndex, stats) {
    this.refreshDaily();
    const level = LEVELS[levelIndex];
    const firstClear = !this.save.cleared.includes(levelIndex);
    const moon = firstClear ? level.reward : Math.max(20, Math.round(level.reward * 0.35));
    const xp = firstClear ? level.xp : Math.max(30, Math.round(level.xp * 0.35));
    const oldLevel = this.guardianLevel;

    this.save.xp += xp;
    this.save.moon += moon;
    if (firstClear) {
      this.save.cleared.push(levelIndex);
      this.save.cleared.sort((a, b) => a - b);
    }
    this.save.lastLevel = Math.min(levelIndex + 1, LEVELS.length - 1);
    this.save.daily.progress.win += 1;

    let gems = 0;
    if (firstClear && !this.save.achievements.includes("first-win")) {
      this.save.achievements.push("first-win");
      gems += ACHIEVEMENTS.find((achievement) => achievement.id === "first-win")?.gems || 0;
    }
    if (stats.bossKilled && !this.save.achievements.includes("boss")) {
      this.save.achievements.push("boss");
      gems += ACHIEVEMENTS.find((achievement) => achievement.id === "boss")?.gems || 0;
    }
    if (stats.noLeak && !this.save.achievements.includes("no-leak")) {
      this.save.achievements.push("no-leak");
      gems += ACHIEVEMENTS.find((achievement) => achievement.id === "no-leak")?.gems || 0;
    }
    this.save.gems += gems;

    const newLevel = this.guardianLevel;
    let unlockedUnit = null;
    for (const unit of UNITS) {
      if (unit.unlock > oldLevel && unit.unlock <= newLevel) unlockedUnit = unit.id;
    }

    this.saveGame();
    return {
      firstClear,
      moon,
      xp,
      gems,
      oldLevel,
      newLevel,
      xpProgress: this.xpProgress,
      unlockedUnit,
      nextAvailable: this.canPlayLevel(levelIndex + 1),
    };
  }

  failLevel() {
    this.refreshDaily();
    this.saveGame();
    const level = this.guardianLevel;
    return {
      firstClear: false,
      moon: 0,
      xp: 0,
      gems: 0,
      oldLevel: level,
      newLevel: level,
      xpProgress: this.xpProgress,
      unlockedUnit: null,
      nextAvailable: false,
    };
  }

  questProgress(id) {
    return this.save.daily.progress[id] || 0;
  }

  claimQuest(id) {
    this.refreshDaily();
    const quest = QUESTS.find((item) => item.id === id);
    if (!quest) return;
    if (this.save.daily.claimed.includes(id)) {
      this.showToast("Already claimed today!", "#b69cff");
      return;
    }
    if (this.questProgress(id) < quest.target) {
      this.showToast("Quest is not finished yet!", "#ff6b7a");
      this.audio.sfx("deny");
      return;
    }
    this.save.daily.claimed.push(id);
    this.save.moon += quest.reward;
    this.saveGame();
    this.audio.sfx("claim");
    this.showToast(`+${quest.reward} Moon claimed!`, "#ffd700");
  }

  upgradeUnit(id) {
    const unit = UNIT_BY_ID[id];
    if (!unit) return;
    if (this.guardianLevel < unit.unlock) {
      this.showToast(`Reach GL ${unit.unlock} first!`, "#ff6b7a");
      this.audio.sfx("deny");
      return;
    }
    const current = this.save.upgrades[id] || 0;
    if (current >= 5) {
      this.showToast(`${unit.name} is fully upgraded!`, "#ffd700");
      return;
    }
    const cost = upgradeCost(current);
    if (this.save.moon < cost) {
      this.showToast(`Need ${cost - this.save.moon} more Moon`, "#ff6b7a");
      this.audio.sfx("deny");
      return;
    }
    this.save.moon -= cost;
    this.save.upgrades[id] = current + 1;
    this.saveGame();
    this.audio.sfx("claim");
    this.showToast(`${unit.name} upgraded to +${current + 1}!`, "#72e6a5");
  }

  update(dt) {
    this.time += dt;
    if (this.transition > 0) this.transition = Math.max(0, this.transition - dt * 3.2);
    if (this.toastTimer > 0) this.toastTimer -= dt;
    if (this.screen === "game" && this.game) this.game.update(dt);
  }

  draw(ctx) {
    ctx.clearRect(0, 0, 480, 854);
    if (this.screen === "game" && this.game) {
      drawGame(ctx, this.game);
    } else if (this.screen === "workshop") {
      drawWorkshopScreen(ctx, this);
    } else if (this.screen === "quests") {
      drawQuestsScreen(ctx, this);
    } else if (this.screen === "help") {
      drawHelpScreen(ctx, this);
    } else {
      drawMenu(ctx, this);
    }

    if (this.toastTimer > 0 && this.toastText && this.screen !== "game") {
      drawScreenToast(ctx, this);
    }
    if (this.transition > 0) {
      ctx.save();
      ctx.globalAlpha = this.transition;
      ctx.fillStyle = "#080711";
      ctx.fillRect(0, 0, 480, 854);
      ctx.restore();
    }
  }

  pointerDown(x, y) {
    if (this.transition > 0.75) return false;
    if (this.screen === "game" && this.game) return gamePointerDown(this.game, x, y);
    if (this.screen === "workshop") return workshopPointerDown(this, x, y);
    if (this.screen === "quests") return questsPointerDown(this, x, y);
    if (this.screen === "help") return helpPointerDown(this, x, y);
    return menuPointerDown(this, x, y);
  }

  pointerMove(x, y) {
    if (this.screen === "game" && this.game) return gamePointerMove(this.game, x, y);
    if (this.screen === "workshop") return workshopPointerMove(this, x, y);
    if (this.screen === "quests") return questsPointerMove(this, x, y);
    return false;
  }

  pointerUp(x, y) {
    if (this.screen === "game" && this.game) return gamePointerUp(this.game, x, y);
    if (this.screen === "workshop") return workshopPointerUp(this, x, y);
    if (this.screen === "quests") return questsPointerUp(this, x, y);
    return false;
  }

  wheel(x, y, deltaY) {
    if (this.screen === "game" && this.game) return gameWheel(this.game, x, y, deltaY);
    if (this.screen === "workshop") {
      this.workshopScroll = Math.max(0, Math.min(WORKSHOP.maxScroll, this.workshopScroll + deltaY * 0.5));
      return true;
    }
    if (this.screen === "quests") {
      this.questsScroll = Math.max(0, Math.min(QUESTS_LAYOUT.maxScroll, this.questsScroll + deltaY * 0.5));
      return true;
    }
    return false;
  }
}

function drawScreenToast(ctx, app) {
  ctx.save();
  ctx.globalAlpha = Math.min(1, app.toastTimer / 0.3);
  ctx.font = '700 12px "Baloo 2", sans-serif';
  const width = Math.min(390, ctx.measureText(app.toastText).width + 52);
  const x = 240 - width / 2;
  roundRectPath(ctx, x, 84, width, 36, 12);
  ctx.fillStyle = "rgba(11,9,24,0.95)";
  ctx.fill();
  ctx.strokeStyle = app.toastColor;
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.fillStyle = app.toastColor;
  ctx.beginPath();
  ctx.arc(x + 18, 102, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#fff5d6";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(app.toastText, 240 + 6, 102);
  ctx.restore();
}
