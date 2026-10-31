"use strict";
/* ============ Canvas render + HUD sync + main loop ============ */
const cv = document.getElementById("cv"), cx = cv.getContext("2d");
const SS = Math.min(2, window.devicePixelRatio || 1);
function resizeCanvas(){
  cv.width = Math.round(W * SS); cv.height = Math.round(H * SS);
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

/* DOM refs */
const el = {
  dream: document.getElementById("dreamfill"), wave: document.getElementById("waveTxt"),
  starVal: document.getElementById("starVal"), powBtn: document.getElementById("powBtn"),
  bar: document.getElementById("barUnits"), ovPause: document.getElementById("ov-pause"),
  ovResult: document.getElementById("ov-result"),
};

function toGameXY(e){
  const r = cv.getBoundingClientRect();
  return { x: (e.clientX - r.left) / r.width * W, y: (e.clientY - r.top) / r.height * H };
}

/* ---------- banner toast ---------- */
function drawBanner(){
  if(!G || !G.waveStartBanner || !G.bannerText) return;
  const k = G.waveStartBanner, a = clamp01(k / 0.4), sc = 1 + (1 - clamp01((2 - k) / 0.3)) * 0.3;
  cx.save();
  cx.translate(W / 2, 175); cx.scale(sc, sc);
  cx.globalAlpha = a;
  cx.font = "700 54px Fredoka, sans-serif"; cx.textAlign = "center";
  cx.strokeStyle = OUT; cx.lineWidth = 10; cx.lineJoin = "round";
  cx.fillStyle = G.bannerFinal ? "#ff6b6b" : "#ffd700";
  cx.strokeText(G.bannerText, 0, 0); cx.fillText(G.bannerText, 0, 0);
  cx.restore();
}

/* ---------- render ---------- */
function render(){
  cx.setTransform(SS, 0, 0, SS, 0, 0);
  cx.clearRect(0, 0, W, H);
  if(!bgCanvas) buildBackground();

  let sx = 0, sy = 0;
  if(shake > 0.1){ sx = rnd(-shake, shake); sy = rnd(-shake, shake); }
  shake = Math.max(0, shake - 0.6);
  cx.save();
  cx.translate(sx, sy);

  cx.drawImage(bgCanvas, 0, 0);

  if(state === "game" && G){
    // zzz floating over bed
    for(let i = 0; i < 3; i++){
      const t = (G.elapsed * 0.5 + i * 0.35) % 1;
      cx.globalAlpha = (1 - t) * 0.7;
      cx.font = "700 " + (18 + i * 5) + "px Fredoka, sans-serif";
      cx.fillStyle = "#8fd8ff"; cx.textAlign = "center";
      cx.fillText("z", 34 - t * 10, GRID_Y + 120 - t * 60);
    }
    cx.globalAlpha = 1;

    // hover / placement preview
    if(G.sel && G.hover){
      const ok = canPlace(G.hover.r, G.hover.c) && G.stars >= UNITS[G.sel].cost && G.cooldowns[G.sel] <= 0;
      const p = cellCenter(G.hover.r, G.hover.c);
      cx.fillStyle = ok ? "rgba(105,219,124,.28)" : "rgba(255,107,107,.28)";
      rr(cx, GRID_X + G.hover.c * CELL_W + 2, GRID_Y + G.hover.r * CELL_H + 2, CELL_W - 4, CELL_H - 4, 8); cx.fill();
      cx.strokeStyle = ok ? "#69db7c" : "#ff6b6b"; cx.lineWidth = 3; cx.stroke();
      cx.globalAlpha = 0.5; drawUnitObj(cx, G.sel, p.x, p.y, 1, { t: G.elapsed, hurt: 0, swing: 0 }); cx.globalAlpha = 1;
    }
    // bad-cell flash
    if(G.badCell){
      cx.fillStyle = "rgba(255,80,80," + (G.badCell.t * 2) + ")";
      rr(cx, GRID_X + G.badCell.c * CELL_W + 2, GRID_Y + G.badCell.r * CELL_H + 2, CELL_W - 4, CELL_H - 4, 8); cx.fill();
    }

    // units
    G.units.forEach(u => {
      u.hurtT = Math.max(0, (u.hurtT || 0) - 1 / 60);
      drawUnitObj(cx, u.id, u.x, u.y, 1, u);
      // hp
      if(u.hp < u.maxHp){
        const frac = clamp01(u.hp / u.maxHp);
        cx.fillStyle = "rgba(0,0,0,.55)"; rr(cx, u.x - 22, u.y + 26, 44, 8, 4); cx.fill();
        cx.fillStyle = frac > 0.4 ? "#4dabf7" : "#ff6b6b"; rr(cx, u.x - 20, u.y + 28, 40 * frac, 4, 2); cx.fill();
      }
    });

    // projectiles
    G.projs.forEach(p => {
      if(p.type === "bubble"){
        cx.beginPath(); cx.arc(p.x, p.y, 12, 0, 7);
        cx.fillStyle = "rgba(126,200,227,.75)"; cx.fill();
        cx.strokeStyle = "#fff"; cx.lineWidth = 2; cx.stroke();
      } else {
        drawStarShape(cx, p.x, p.y, p.type === "dragon" ? 1.15 : 0.65, G.elapsed * 12);
        if(p.type === "dragon"){ cx.globalAlpha = 0.35; cx.beginPath(); cx.arc(p.x - 14, p.y, 10, 0, 7); cx.fillStyle = "#ffd23f"; cx.fill(); cx.globalAlpha = 1; }
      }
    });

    // stars on field
    G.starsPool.forEach(s => {
      if(s.state === "fly") return;
      const blink = s.state === "idle" && s.life < 3 ? (Math.sin(G.elapsed * 10) > 0 ? 1 : 0.25) : 1;
      cx.globalAlpha = blink;
      drawStarShape(cx, s.x, s.y, 1.15 + Math.sin(G.elapsed * 4 + s.x) * 0.07, s.spin);
      cx.globalAlpha = 1;
    });

    // enemies (sorted by row for overlap)
    G.enemies.slice().sort((a, b) => a.row - b.row).forEach(e => {
      cx.save();
      if(e.hitT > 0){ cx.globalAlpha = 0.55; }
      if(e.stunT > 0){
        cx.font = "16px Fredoka, sans-serif"; cx.fillStyle = "#7fe9ff";
        cx.fillText("* * *", e.x - 20, e.y - 110 + Math.sin(G.elapsed * 6) * 4);
      }
      drawEnemy(cx, e);
      cx.restore();
      if(e.slowT > 0){
        cx.fillStyle = "rgba(126,200,227,.25)";
        rr(cx, e.x - 26, e.y - 60, 52, 64, 10); cx.fill();
      }
    });

    // particles
    G.parts.forEach(p => {
      if(p.moon){
        cx.globalAlpha = clamp01(p.life / 0.7);
        cx.strokeStyle = "#7fe9ff"; cx.lineWidth = 8;
        cx.beginPath(); cx.arc(p.x, p.y, (0.7 - p.life) * 700 + 60, 0, 7); cx.stroke();
        cx.globalAlpha = 1;
      } else {
        cx.globalAlpha = clamp01(p.life * 2); cx.fillStyle = p.color;
        cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, 7); cx.fill(); cx.globalAlpha = 1;
      }
    });

    // floating texts
    G.texts.forEach(t => {
      cx.globalAlpha = clamp01(t.life * 1.6);
      cx.font = "700 27px Fredoka, sans-serif"; cx.textAlign = "center";
      cx.strokeStyle = OUT; cx.lineWidth = 6; cx.strokeText(t.txt, t.x, t.y);
      cx.fillStyle = t.color; cx.fillText(t.txt, t.x, t.y);
      cx.globalAlpha = 1;
    });
  }
  cx.restore();

  drawBanner();

  // red dmg flash
  if(redFlash > 0.02){
    cx.fillStyle = "rgba(255,0,60," + redFlash * 0.4 + ")"; cx.fillRect(0, 0, W, H);
  }
  // star power flash
  if(G && G.spFlash > 0){
    cx.fillStyle = "rgba(0,212,255," + G.spFlash * 0.5 + ")"; cx.fillRect(0, 0, W, H);
    G.spFlash -= 1 / 60;
  }
  syncHUD();
}

function drawUnitObj(c, id, x, y, s, a){ drawUnit(c, id, x, y, s, { t: a.t || 0, hurt: a.hurtT || 0, swing: a.swing || 0, fuse: a.fuse }); }

/* ---------- HUD DOM sync ---------- */
let hudCache = {};
function syncHUD(){
  if(state !== "game" || !G) return;
  const c = hudCache;
  // dream meter
  const dFrac = clamp01(G.dream / G.dreamMax) * 100;
  if(c.dream !== dFrac){
    el.dream.style.width = dFrac + "%";
    el.dream.style.background = dFrac > 50 ? "#51cf66" : dFrac > 25 ? "#ffd43b" : "#ff6b6b";
    c.dream = dFrac;
  }
  if(c.wave !== G.wave + 1){ c.wave = G.wave + 1; el.wave.textContent = "Wave " + (G.wave + 1) + "/" + G.waveTotal; }
  const st = Math.floor(G.stars);
  if(c.stars !== st){ c.stars = st; el.starVal.textContent = st; }
  // star power
  const spF = Math.floor(G.sp);
  if(c.sp !== spF){
    c.sp = spF;
    el.powBtn.style.background = "conic-gradient(#00d4ff " + spF + "%,rgba(255,255,255,.1) 0)";
    el.powBtn.classList.toggle("ready", G.sp >= 100);
  }
  // unit buttons
  barBtns.forEach(b => {
    const u = UNITS[b.dataset.id], cd = G.cooldowns[b.dataset.id];
    b.classList.toggle("sel", G.sel === b.dataset.id);
    b.classList.toggle("locked", glLevel() < u.gl);
    b.classList.toggle("noafford", G.stars < u.cost);
    b.classList.toggle("cd", cd > 0);
    if(cd > 0){
      b.querySelector(".cd").style.background =
        "conic-gradient(rgba(5,5,20,.75) " + (cd / u.cd * 100) + "%, transparent 0)";
    }
  });
}

/* ---------- main loop ---------- */
let lastTs = 0;
function frame(ts){
  requestAnimationFrame(frame);
  const dtRaw = Math.min(0.05, (ts - lastTs) / 1000 || 0);
  lastTs = ts;
  if(state === "game" && G && !paused && !G.over){
    if(hitstop > 0){ hitstop -= dtRaw; }
    else step(dtRaw);
    // cooldowns tick
    UNIT_IDS.forEach(id => { if(G.cooldowns[id] > 0) G.cooldowns[id] = Math.max(0, G.cooldowns[id] - dtRaw); });
  }
  render();
}
requestAnimationFrame(frame);
