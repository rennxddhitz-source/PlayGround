import { GRID, UNIT_BY_ID } from "./data.js";
import { BAR, PAUSE, POWER, RESULT, TOP, clamp, pointInCircle, pointInRect } from "./game.js";

function cellAt(x, y) {
  if (x < GRID.x || x > GRID.x + GRID.cols * GRID.cw) return null;
  if (y < GRID.y || y > GRID.y + GRID.rows * GRID.ch) return null;
  return {
    col: Math.floor((x - GRID.x) / GRID.cw),
    row: Math.floor((y - GRID.y) / GRID.ch),
  };
}

function handlePauseTap(game, x, y) {
  if (pointInRect(x, y, PAUSE.resume)) {
    game.app.audio.sfx("click");
    game.togglePause();
    return true;
  }
  if (pointInRect(x, y, PAUSE.restart)) {
    game.app.audio.sfx("click");
    game.app.startLevel(game.levelIndex);
    return true;
  }
  if (pointInRect(x, y, PAUSE.sound)) {
    game.app.toggleSound();
    game.app.audio.sfx("click");
    return true;
  }
  if (pointInRect(x, y, PAUSE.quit)) {
    game.app.audio.sfx("click");
    game.app.goMenu();
    return true;
  }
  return true;
}

function handleResultTap(game, x, y) {
  const won = game.state === "won";
  if (won) {
    if (pointInRect(x, y, RESULT.next)) {
      if (!game.result?.nextAvailable) return true;
      game.app.audio.sfx("click");
      game.app.nextLevel();
      return true;
    }
    if (pointInRect(x, y, RESULT.retry)) {
      game.app.audio.sfx("click");
      game.app.startLevel(game.levelIndex);
      return true;
    }
    if (pointInRect(x, y, RESULT.home)) {
      game.app.audio.sfx("click");
      game.app.goMenu();
      return true;
    }
  } else {
    if (pointInRect(x, y, RESULT.next)) {
      game.app.audio.sfx("click");
      game.app.startLevel(game.levelIndex);
      return true;
    }
    if (pointInRect(x, y, { x: 66, y: 646, w: 348, h: 54 })) {
      game.app.audio.sfx("click");
      game.app.goMenu();
      return true;
    }
  }
  return true;
}

function handleCardTap(game, x, y) {
  const rect = game.cardRects.find((card) => pointInRect(x, y, card));
  if (!rect) return false;
  if (rect.locked) {
    game.showToast(`Reach Guardian Level ${rect.unit.unlock} to unlock ${rect.unit.name}`, "#b69cff");
    game.app.audio.sfx("deny");
    return true;
  }
  if (rect.cooldown > 0) {
    game.showToast(`${rect.unit.name} is recharging…`, "#ff6b7a");
    game.app.audio.sfx("deny");
    return true;
  }
  if (game.starlight < rect.unit.cost) {
    game.showToast(`Need ${rect.unit.cost - game.starlight} more starlight`, "#ff6b7a");
    game.app.audio.sfx("deny");
    return true;
  }
  game.selectedUnit = game.selectedUnit === rect.unit.id ? null : rect.unit.id;
  game.app.audio.sfx("click");
  if (game.selectedUnit) {
    game.showToast(`${rect.unit.name} · ${rect.unit.cost}★ · tap a tile`, "#72e6a5");
  }
  return true;
}

export function gamePointerDown(game, x, y) {
  game.pointer = { x, y };
  if (game.state === "paused") return handlePauseTap(game, x, y);
  if (game.state === "won" || game.state === "lost") return handleResultTap(game, x, y);
  if (game.state !== "playing") return false;

  if (pointInCircle(x, y, TOP.pause)) {
    game.app.audio.sfx("click");
    game.togglePause();
    return true;
  }

  if (pointInCircle(x, y, POWER)) {
    game.activatePower();
    return true;
  }

  for (let i = game.fallingStars.length - 1; i >= 0; i -= 1) {
    const star = game.fallingStars[i];
    const position = game.starPosition(star);
    if (Math.hypot(x - position.x, y - position.y) < 30) {
      game.collectStar(star);
      return true;
    }
  }

  if (y >= BAR.panel.y - 10) {
    game.barDrag = {
      startX: x,
      startY: y,
      startScroll: game.scroll,
      moved: false,
    };
    return true;
  }

  const cell = cellAt(x, y);
  if (cell) {
    game.hoverCell = cell;
    if (game.selectedUnit) {
      game.tryPlace(cell.row, cell.col);
    } else {
      const unit = game.grid[cell.row][cell.col];
      if (unit) {
        game.showToast(`${unit.def.name} · ${Math.ceil(unit.hp)}/${unit.maxHp} HP`, "#b69cff");
      } else {
        game.showToast("Pick a toy from the bar first!", "#00d4ff");
      }
    }
    return true;
  }
  return false;
}

export function gamePointerMove(game, x, y) {
  if (game.barDrag) {
    const dx = x - game.barDrag.startX;
    if (Math.abs(dx) > 5) game.barDrag.moved = true;
    game.scroll = clamp(game.barDrag.startScroll - dx, 0, BAR.maxScroll);
    return;
  }
  if (game.state !== "playing") return;
  const cell = cellAt(x, y);
  game.hoverCell = cell;
}

export function gamePointerUp(game, x, y) {
  if (game.state === "playing" && game.barDrag) {
    const drag = game.barDrag;
    game.barDrag = null;
    if (!drag.moved) return handleCardTap(game, x, y);
    return true;
  }
  game.barDrag = null;
  return false;
}

export function gameWheel(game, x, y, deltaY) {
  if (game.state !== "playing") return false;
  if (y < BAR.panel.y - 20) return false;
  game.scroll = clamp(game.scroll + deltaY * 0.55, 0, BAR.maxScroll);
  return true;
}
