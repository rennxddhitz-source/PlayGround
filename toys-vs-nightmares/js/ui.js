"use strict";
/* ============ UI: menu, unit bar, overlays, input ============ */
const MENU = document.getElementById("scr-menu");
const GAME = document.getElementById("scr-game");
let barBtns = [];
let curLevel = 0;

function showScreen(which){
  MENU.classList.toggle("on", which === "menu");
  GAME.classList.toggle("on", which === "game");
}

/* ---------------- main menu ---------------- */
function buildMenu(){
  const gl = glLevel();
  document.getElementById("mMoons").textContent = S.moons;
  document.getElementById("mGems").textContent = S.gems;
  document.getElementById("mGL").textContent = "GL " + gl;
  const nxt = UNIT_IDS.find(id => UNITS[id].gl === gl + 1);
  document.getElementById("mNext").textContent = gl >= 8 ? "Semua mainan terkumpul! 👑"
    : (nxt ? "Mainan berikutnya: " + UNITS[nxt].name + " (GL " + (gl + 1) + ")" : "");
  document.getElementById("xpFill").style.width = Math.round(glProgress() * 100) + "%";

  // level list
  const ll = document.getElementById("lvlList"); ll.innerHTML = "";
  LEVELS.forEach((lv, i) => {
    const open = i === 0 || S.won[i - 1];
    const b = document.createElement("button");
    b.className = "lvl" + (S.won[i] ? " done" : "") + (open ? "" : " locked") + (open ? " open" : "");
    b.innerHTML = '<span class="num">' + (S.won[i] ? "✔" : open ? (i + 1) : "🔒") + "</span>" +
      '<span class="info"><b>' + lv.name + (lv.waves >= 7 && i >= 4 ? " (Nightmare!)" : "") + "</b>" +
      "<span>" + lv.waves + " gelombang · hadiah 🌙" + lv.moons + " · ⭐" + lv.xp + "</span></span>" +
      '<span class="rew">' + lv.moons + "🌙<small>+" + lv.xp + " XP</small></span>";
    if(open) b.onclick = () => { ResumeAudio(); startLevel(i); showScreen("game"); };
    ll.appendChild(b);
  });

  // unit upgrade cards
  const ul = document.getElementById("unitList"); ul.innerHTML = "";
  UNIT_IDS.forEach(id => {
    const u = UNITS[id], unlocked = gl >= u.gl, lv = upgLevel(id);
    const card = document.createElement("div");
    card.className = "ucard";
    card.innerHTML = '<canvas width="90" height="90"></canvas>' +
      '<span class="info"><b>' + u.name + ' <em style="color:#ffd700">Lv ' + lv + (lv >= 5 ? " MAX" : "/5") + "</em></b>" +
      "<span>" + u.desc + "</span>" +
      '<em>Biaya ' + u.cost + "★ · HP " + Math.round(u.hp * upgMult(id)) +
      (u.dmg ? " · DMG " + Math.round(u.dmg * upgMult(id)) : "") + "</em></span>";
    const btn = document.createElement("button");
    if(!unlocked){
      btn.className = "lvbtn"; btn.disabled = true;
      btn.textContent = "🔒 GL " + u.gl;
    } else if(lv >= 5){
      btn.className = "lvbtn max"; btn.disabled = true; btn.textContent = "MAX ✔";
    } else {
      btn.className = "lvbtn"; btn.textContent = "↑ " + upgCost(id) + " 🌙";
      btn.disabled = S.moons < upgCost(id);
      btn.onclick = () => {
        if(S.moons >= upgCost(id)){
          S.moons -= upgCost(id); S.upg[id] = lv + 1; persist(); SFX.charge();
          buildMenu();
        } else SFX.buzz();
      };
    }
    card.appendChild(btn);
    ul.appendChild(card);
    paintIcon(card.querySelector("canvas"), id);
  });

  // achievements
  const al = document.getElementById("achList"); al.innerHTML = "";
  ACHS.forEach(a => {
    const got = S.ach.includes(a.id);
    const d = document.createElement("div");
    d.className = "ach" + (got ? " got" : "");
    d.innerHTML = '<span class="ic">' + a.ic + "</span><span><b>" + a.name + "</b><span>" +
      (got ? a.desc : "?? " + a.desc) + "</span></span>" + '<span class="gem">💎' + a.gem + "</span>";
    al.appendChild(d);
  });

  // daily
  const today = new Date().toISOString().slice(0, 10);
  const bd = document.getElementById("btnDaily");
  bd.disabled = S.daily === today;
  bd.textContent = S.daily === today ? "🎁 Bonus Harian ✔" : "🎁 Bonus Harian (+15🌙)";
}

document.getElementById("btnDaily").onclick = () => {
  const today = new Date().toISOString().slice(0, 10);
  if(S.daily !== today){
    S.daily = today; S.moons += 15; persist(); SFX.ding();
    buildMenu();
  }
};
function toggleSound(){
  soundOn = !soundOn;
  document.getElementById("btnMusic").textContent = soundOn ? "🔊 Suara: ON" : "🔇 Suara: OFF";
  document.getElementById("btnMusic2").textContent = soundOn ? "ON" : "OFF";
}
document.getElementById("btnMusic").onclick = toggleSound;
document.getElementById("btnMusic2").onclick = toggleSound;

/* ---------------- unit selection bar ---------------- */
function buildBar(){
  barBtns = [];
  const bar = el.bar; bar.innerHTML = "";
  UNIT_IDS.forEach(id => {
    const u = UNITS[id];
    const b = document.createElement("button");
    b.className = "ubtn"; b.dataset.id = id;
    b.dataset.glt = "GL " + u.gl;
    b.innerHTML = '<canvas width="72" height="72"></canvas><span class="cost">★' + u.cost + "</span><span class='cd'></span>";
    b.onpointerdown = ev => {
      ev.stopPropagation();
      if(glLevel() < u.gl){ SFX.buzz(); return; }
      if(G.cooldowns[id] > 0){ SFX.buzz(); return; }
      if(G.stars < u.cost){ SFX.buzz(); addText(W / 2, 700, "Starlight kurang!", "#ff8787"); return; }
      G.sel = G.sel === id ? null : id;
      SFX.put();
    };
    bar.appendChild(b);
    paintIcon(b.querySelector("canvas"), id);
    barBtns.push(b);
  });
}
function hideOverlays(){
  el.ovPause.classList.remove("on");
  el.ovResult.classList.remove("on");
}

/* ---------------- result overlay ---------------- */
function showResult(winOrObj){
  const obj = typeof winOrObj === "object" ? winOrObj : { win: winOrObj };
  const won = !!obj.win;
  hudCache = {};
  document.getElementById("resTitle").textContent = won ? "MENANG! 🌙" : "MIMPI TERTANDA…";
  document.getElementById("resTitle").style.color = won ? "#ffd700" : "#ff6b6b";
  document.getElementById("resSub").textContent = won
    ? "Si kecil terus tidur nyenyak. Berhasil!" : "Nightmare mencapai ranjang. Coba strategi lain!";
  document.getElementById("resMoons").textContent = "+" + (won ? obj.moons || 0 : 0);
  document.getElementById("resXP").textContent = "+" + (won ? obj.xp || 0 : 10); // defeat consolation XP
  const gmb = document.getElementById("resGemBox");
  gmb.style.display = won && obj.gems ? "" : "none";
  if(won && obj.gems) document.getElementById("resGems").textContent = "+" + obj.gems;
  const achTxt = (obj.achNew || []).map(id => ACHS.find(a => a.id === id).ic + " " + ACHS.find(a => a.id === id).name).join("  ·  ");
  let extra = won ? (obj.glUp ? "  ·  🌟 GUARDIAN LEVEL " + obj.glUp + "! Mainan baru terbuka!" : "") +
    (obj.bonus ? "  ·  💤 Bonus Mimpi Utuh +" + obj.bonus + "🌙" : "") : "";
  document.getElementById("resAch").textContent = achTxt + extra;
  const nb = document.getElementById("btnNext");
  nb.style.display = won && curLevel < LEVELS.length - 1 ? "" : "none";
  el.ovResult.classList.add("on");
  buildMenu(); // refresh meta
}

/* navigation */
function retryLevel(){ startLevel(curLevel); showScreen("game"); }
function nextLevel(){ if(curLevel < LEVELS.length - 1){ curLevel++; startLevel(curLevel); showScreen("game"); } }
function quitToMenu(){
  state = "menu"; G = null; hudCache = {};
  hideOverlays(); showScreen("menu"); buildMenu();
}
document.getElementById("btnRetry").onclick = retryLevel;
document.getElementById("btnRetry2").onclick = () => { hideOverlays(); retryLevel(); };
document.getElementById("btnNext").onclick = nextLevel;
document.getElementById("btnQuit1").onclick = quitToMenu;
document.getElementById("btnQuit2").onclick = quitToMenu;
document.getElementById("btnResume").onclick = () => { paused = false; hideOverlays(); };
document.getElementById("pauseBtn").onpointerdown = e => {
  e.stopPropagation();
  if(state !== "game" || (G && G.over)) return;
  paused = true; el.ovPause.classList.add("on");
};
document.getElementById("powBtn").onpointerdown = e => {
  e.stopPropagation();
  if(state !== "game" || !G || G.over) return;
  if(G.sp >= 100){ G.spFlash = 0.7; fireStarPower(); }
  else SFX.buzz();
};

/* ---------------- canvas input ---------------- */
cv.addEventListener("pointerdown", e => {
  e.preventDefault(); ResumeAudio();
  if(state !== "game" || !G || paused || G.over || e.target !== cv) return;
  const p = toGameXY(e);
  // collect stars first
  let took = false;
  for(const s of G.starsPool){
    if(s.state !== "fly" && Math.hypot(p.x - s.x, p.y - s.y) < 50){ collectStar(s); took = true; break; }
  }
  if(took || !G.sel) return;
  const c = Math.floor((p.x - GRID_X) / CELL_W), r = Math.floor((p.y - GRID_Y) / CELL_H);
  if(r >= 0 && r < ROWS && c >= 0 && c < COLS) tryPlace(G.sel, r, c);
});
cv.addEventListener("pointermove", e => {
  if(state !== "game" || !G || !G.sel) return;
  const p = toGameXY(e);
  const c = Math.floor((p.x - GRID_X) / CELL_W), r = Math.floor((p.y - GRID_Y) / CELL_H);
  G.hover = (r >= 0 && r < ROWS && c >= 0 && c < COLS) ? { r, c } : null;
});
cv.addEventListener("pointerleave", () => { if(G) G.hover = null; });

/* boot */
showScreen("menu");
buildMenu();
