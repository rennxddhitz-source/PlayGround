import { GRID, UNIT_BY_ID } from "./data.js";
import {
  drawEnemy,
  drawGameBackground,
  drawPaperTexture,
  drawStar,
  drawStarCoin,
  drawUnit,
  drawVignette,
  glow,
  line,
  roundRectPath,
  text,
} from "./draw.js";
import { drawHUD } from "./hud.js";
import { drawPauseOverlay, drawResultOverlay } from "./overlays.js";

function easeOutBack(t) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
}

function drawSelection(ctx, game) {
  if (!game.selectedUnit || game.state !== "playing") return;
  const unit = UNIT_BY_ID[game.selectedUnit];
  if (!unit) return;
  const pulse = 0.5 + 0.5 * Math.sin(game.time * 4.2);
  for (let row = 0; row < GRID.rows; row += 1) {
    for (let col = 0; col < GRID.cols; col += 1) {
      if (!game.isCellValid(row, col)) continue;
      const x = GRID.x + col * GRID.cw;
      const y = GRID.y + row * GRID.ch;
      roundRectPath(ctx, x + 2, y + 2, GRID.cw - 4, GRID.ch - 4, 8);
      ctx.fillStyle = `rgba(114,230,165,${0.035 + pulse * 0.035})`;
      ctx.fill();
      ctx.strokeStyle = `rgba(114,230,165,${0.18 + pulse * 0.16})`;
      ctx.lineWidth = 1.3;
      ctx.setLineDash([3, 4]);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }

  if (game.hoverCell) {
    const { row, col } = game.hoverCell;
    const valid = game.isCellValid(row, col);
    const x = GRID.x + col * GRID.cw;
    const y = GRID.y + row * GRID.ch;
    roundRectPath(ctx, x + 2, y + 2, GRID.cw - 4, GRID.ch - 4, 8);
    ctx.fillStyle = valid ? "rgba(114,230,165,0.24)" : "rgba(255,77,109,0.25)";
    ctx.fill();
    ctx.strokeStyle = valid ? "#72e6a5" : "#ff4d6d";
    ctx.lineWidth = 2.2;
    ctx.stroke();
    if (valid) {
      ctx.save();
      ctx.globalAlpha = 0.42;
      drawUnit(ctx, unit.id, x + GRID.cw / 2, y + GRID.ch / 2 + 5, 0.76, {
        time: game.time,
        alpha: 0.55,
      });
      ctx.restore();
    }
  }
}

function drawHealthBar(ctx, x, y, w, ratio, color, boss = false) {
  ctx.save();
  roundRectPath(ctx, x, y, w, boss ? 6 : 4, 2);
  ctx.fillStyle = "rgba(8,7,18,0.82)";
  ctx.fill();
  ctx.strokeStyle = "rgba(21,19,43,0.9)";
  ctx.lineWidth = 1;
  ctx.stroke();
  if (ratio > 0) {
    roundRectPath(ctx, x + 1, y + 1, Math.max(1, (w - 2) * ratio), boss ? 4 : 2, 1.5);
    ctx.fillStyle = color;
    ctx.fill();
  }
  ctx.restore();
}

function drawWorld(ctx, game) {
  const items = [];
  for (const unit of game.units) {
    if (!unit.dead) items.push({ kind: "unit", row: unit.row, sortX: unit.col, unit });
  }
  for (const enemy of game.enemies) {
    if (!enemy.dead) items.push({ kind: "enemy", row: enemy.row, sortX: enemy.x, enemy });
  }
  items.sort((a, b) => a.row - b.row || a.sortX - b.sortX);

  for (const item of items) {
    if (item.kind === "unit") {
      const unit = item.unit;
      const bob = Math.sin(game.time * 2.6 + unit.id) * 0.7;
      drawUnit(ctx, unit.def.id, unit.px, unit.py + bob, 0.78, {
        time: game.time + unit.id,
        attack: unit.attackAnim,
        hurt: unit.hurt,
      });
      if (unit.pulse > 0) {
        glow(ctx, unit.px, unit.py - 10, 30, unit.def.accent, unit.pulse * 0.35);
      }
      if (unit.hp < unit.maxHp) {
        drawHealthBar(ctx, unit.px - 16, unit.py - 45, 32, unit.hp / unit.maxHp, unit.hp / unit.maxHp > 0.35 ? "#72e6a5" : "#ff6b7a");
      }
      if (unit.def.id === "sprout") {
        const ratio = 1 - Math.max(0, unit.genTimer) / unit.def.interval;
        ctx.beginPath();
        ctx.arc(unit.px, unit.py + 29, 3, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * ratio);
        ctx.strokeStyle = "rgba(255,215,0,0.8)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    } else {
      const enemy = item.enemy;
      const scale = enemy.def.size * (enemy.def.boss ? 0.98 : 0.86) * easeOutBack(Math.min(1, enemy.spawn * 4));
      const px = enemy.x * GRID.cw + GRID.x + GRID.cw / 2;
      const py = enemy.row * GRID.ch + GRID.y + GRID.ch / 2 + 7;
      if (enemy.freeze > 0) {
        ctx.save();
        ctx.globalAlpha = 0.55;
        ctx.fillStyle = "rgba(0,212,255,0.26)";
        roundRectPath(ctx, px - 22, py - 36, 44, 58, 12);
        ctx.fill();
        ctx.strokeStyle = "rgba(180,245,255,0.65)";
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.restore();
      }
      drawEnemy(ctx, enemy.type, px, py, scale, {
        time: game.time + enemy.seed,
        attack: enemy.animAttack,
        hurt: enemy.hurt,
      });
      if (enemy.slowTimer > 0) {
        ctx.save();
        ctx.globalAlpha = 0.55;
        drawStar(ctx, px + 17, py - 32, 3, 1.4, 4, game.time);
        ctx.fillStyle = "#9beaff";
        ctx.fill();
        ctx.restore();
      }
      if (enemy.hp < enemy.maxHp || enemy.def.boss) {
        const width = enemy.def.boss ? 48 : 27;
        drawHealthBar(ctx, px - width / 2, py - (enemy.def.boss ? 55 : 39), width, enemy.hp / enemy.maxHp, enemy.def.boss ? "#ff4d6d" : "#ff9edb", enemy.def.boss);
      }
      if (enemy.def.boss) {
        glow(ctx, px, py - 18, 44, "rgba(255,77,109,0.22)", 0.9);
      }
    }
  }
}

function drawProjectiles(ctx, game) {
  for (const projectile of game.projectiles) {
    ctx.save();
    ctx.translate(projectile.x, projectile.y);
    ctx.rotate(projectile.angle || 0);
    if (projectile.kind === "heal") {
      glow(ctx, 0, 0, 13, "rgba(114,230,165,0.65)", 0.8);
      ctx.fillStyle = "#ff9edb";
      ctx.beginPath();
      ctx.moveTo(0, 7);
      ctx.bezierCurveTo(-10, -1, -7, -9, 0, -4);
      ctx.bezierCurveTo(7, -9, 10, -1, 0, 7);
      ctx.fill();
      ctx.strokeStyle = "#17142f";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    } else if (projectile.type === "laser") {
      ctx.globalCompositeOperation = "lighter";
      line(ctx, -14, 0, 6, 0, "rgba(0,212,255,0.25)", 6);
      line(ctx, -8, 0, 5, 0, "#9ef5ff", 3);
      line(ctx, 0, 0, 5, 0, "#ffffff", 1.5);
    } else if (projectile.type === "clock") {
      glow(ctx, 0, 0, 10, "rgba(255,215,0,0.55)", 0.7);
      ctx.fillStyle = "#ffd700";
      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#17142f";
      ctx.lineWidth = 1;
      ctx.stroke();
      line(ctx, 0, 0, 0, -3, "#17142f", 1);
      line(ctx, 0, 0, 2, 0, "#17142f", 1);
    } else if (projectile.type === "rainbow") {
      glow(ctx, 0, 0, 15, "rgba(255,158,219,0.65)", 0.8);
      const colors = ["#ff9edb", "#ffd700", "#00d4ff", "#b69cff"];
      for (let i = 0; i < 4; i += 1) {
        ctx.fillStyle = colors[i];
        ctx.beginPath();
        ctx.arc(-i * 2, i - 3, 3.2, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (projectile.type === "fire") {
      glow(ctx, 0, 0, 16, "rgba(255,141,92,0.8)", 0.9);
      ctx.fillStyle = "#ffd166";
      ctx.beginPath();
      ctx.ellipse(0, 0, 7, 4.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ff8d5c";
      ctx.beginPath();
      ctx.ellipse(-4, 0, 4, 3, 0, 0, Math.PI * 2);
      ctx.fill();
    } else {
      glow(ctx, 0, 0, 10, projectile.color || "#00d4ff", 0.6);
      ctx.fillStyle = projectile.color || "#00d4ff";
      ctx.beginPath();
      ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}

function drawParticles(ctx, game) {
  for (const particle of game.particles) {
    const alpha = Math.max(0, particle.life / particle.maxLife);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(particle.x, particle.y);
    ctx.rotate(particle.rotation || 0);
    ctx.fillStyle = particle.color;
    if (particle.type === "star") {
      drawStar(ctx, 0, 0, particle.size * 1.2, particle.size * 0.5, 5, 0);
      ctx.fill();
    } else if (particle.type === "square") {
      ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
    } else {
      ctx.beginPath();
      ctx.arc(0, 0, particle.size * 0.6, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  for (const floater of game.floaters) {
    const alpha = Math.min(1, floater.life / (floater.maxLife * 0.55));
    ctx.save();
    ctx.globalAlpha = alpha;
    text(ctx, floater.value, floater.x, floater.y, floater.size, floater.color, {
      weight: 800,
      stroke: 3,
      strokeColor: "#17142f",
    });
    ctx.restore();
  }
}

function drawFallingStars(ctx, game) {
  for (const star of game.fallingStars) {
    const position = game.starPosition(star);
    const fade = star.age > star.life - 1.2 ? 0.4 + 0.6 * Math.abs(Math.sin(star.age * 8)) : 1;
    ctx.save();
    ctx.globalAlpha = fade;
    if (!position.landed) {
      const progress = Math.min(1, star.age / star.fall);
      for (let i = 1; i <= 3; i += 1) {
        const trailY = position.y - i * 18 * (1 - progress * 0.4);
        ctx.globalAlpha = fade * (0.25 / i);
        drawStar(ctx, position.x + Math.sin(star.age * 6 + i) * 4, trailY, 6 - i, 2.4, 5);
        ctx.fillStyle = "#ffd700";
        ctx.fill();
      }
      ctx.globalAlpha = fade;
    }
    glow(ctx, position.x, position.y, 28, "rgba(255,215,0,0.45)", 0.9);
    drawStarCoin(ctx, position.x, position.y, 12, game.time + star.seed);
    const ring = 0.5 + 0.5 * Math.sin(game.time * 4 + star.seed);
    ctx.beginPath();
    ctx.arc(position.x, position.y, 18 + ring * 3, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255,215,0,${0.18 + ring * 0.18})`;
    ctx.lineWidth = 1.2;
    ctx.setLineDash([2, 4]);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
  }
}

function drawPowerPulse(ctx, game) {
  if (game.powerPulse <= 0) return;
  const t = 1 - game.powerPulse / 1.7;
  const radius = 50 + t * 440;
  ctx.save();
  ctx.globalAlpha = Math.max(0, 0.65 * (1 - t));
  ctx.beginPath();
  ctx.arc(240, 390, radius, 0, Math.PI * 2);
  ctx.strokeStyle = "#ffd700";
  ctx.lineWidth = 8 * (1 - t) + 1;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(240, 390, radius * 0.7, 0, Math.PI * 2);
  ctx.strokeStyle = "#00d4ff";
  ctx.lineWidth = 4 * (1 - t) + 1;
  ctx.stroke();
  ctx.restore();
}

export function drawGame(ctx, game) {
  ctx.clearRect(0, 0, 480, 854);
  drawGameBackground(ctx, game.time, game.danger);

  ctx.save();
  if (game.shake > 0.2) {
    ctx.translate((Math.random() - 0.5) * game.shake, (Math.random() - 0.5) * game.shake);
  }
  drawSelection(ctx, game);
  drawWorld(ctx, game);
  drawProjectiles(ctx, game);
  drawParticles(ctx, game);
  drawFallingStars(ctx, game);
  drawPowerPulse(ctx, game);
  ctx.restore();

  if (game.danger) {
    const pulse = 0.12 + 0.08 * Math.sin(game.time * 5);
    const grad = ctx.createRadialGradient(240, 390, 120, 240, 390, 440);
    grad.addColorStop(0, "rgba(255,77,109,0)");
    grad.addColorStop(1, `rgba(255,77,109,${pulse})`);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 480, 854);
  }
  if (game.flash > 0) {
    ctx.save();
    ctx.globalAlpha = game.flash * 0.22;
    ctx.fillStyle = "#ff4d6d";
    ctx.fillRect(0, 0, 480, 854);
    ctx.restore();
  }

  drawHUD(ctx, game);
  drawVignette(ctx, 0.22);

  if (game.state === "paused") drawPauseOverlay(ctx, game);
  if (game.state === "won" || game.state === "lost") drawResultOverlay(ctx, game);
}
