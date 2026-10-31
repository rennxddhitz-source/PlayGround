import { App } from "./app.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d", { alpha: false });
const boot = document.getElementById("boot");
const app = new App();
window.__toys = app;

let dpr = 1;

function resize() {
  dpr = Math.min(2, Math.max(1, window.devicePixelRatio || 1));
  canvas.width = Math.round(480 * dpr);
  canvas.height = Math.round(854 * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.imageSmoothingEnabled = true;
}

function toVirtual(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / rect.width) * 480,
    y: ((event.clientY - rect.top) / rect.height) * 854,
  };
}

canvas.addEventListener("pointerdown", (event) => {
  event.preventDefault();
  app.audio.init();
  const point = toVirtual(event);
  canvas.setPointerCapture?.(event.pointerId);
  app.pointerDown(point.x, point.y);
});

canvas.addEventListener("pointermove", (event) => {
  event.preventDefault();
  const point = toVirtual(event);
  app.pointerMove(point.x, point.y);
});

canvas.addEventListener("pointerup", (event) => {
  event.preventDefault();
  const point = toVirtual(event);
  app.pointerUp(point.x, point.y);
});

canvas.addEventListener("pointercancel", (event) => {
  const point = toVirtual(event);
  app.pointerUp(point.x, point.y);
});

canvas.addEventListener(
  "wheel",
  (event) => {
    event.preventDefault();
    const point = toVirtual(event);
    app.wheel(point.x, point.y, event.deltaY);
  },
  { passive: false },
);

canvas.addEventListener("contextmenu", (event) => event.preventDefault());

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" || event.key.toLowerCase() === "p") {
    if (app.screen === "game" && app.game) {
      app.audio.init();
      if (app.game.state === "playing" || app.game.state === "paused") app.game.togglePause();
    }
  }
  if (event.key === " " && app.screen === "game" && app.game) {
    event.preventDefault();
    app.audio.init();
    if (app.game.state === "playing") app.game.activatePower();
  }
});

window.addEventListener("resize", resize);
window.addEventListener("pagehide", () => app.saveGame());
document.addEventListener("visibilitychange", () => {
  if (document.hidden) app.saveGame();
});

resize();

let last = performance.now();
function frame(now) {
  const dt = Math.min(0.25, Math.max(0, (now - last) / 1000));
  last = now;
  app.update(dt);
  app.draw(ctx);
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

const fontReady = Promise.all([
  document.fonts?.load('800 24px "Baloo 2"'),
  document.fonts?.load('400 24px "Lilita One"'),
]).catch(() => null);

Promise.race([
  fontReady,
  new Promise((resolve) => setTimeout(resolve, 1800)),
]).then(() => {
  setTimeout(() => boot?.classList.add("hidden"), 220);
});
