"use strict";
/* ============ Drawing: thick-outline toy cartoon style ============ */
const OUT = "#141428"; // outline color

function outlined(c, fill, lw){
  c.lineWidth = lw || 4; c.strokeStyle = OUT; c.stroke();
  if(fill) c.fillStyle = fill, c.fill();
}
function rr(c, x, y, w, h, r){ // rounded rect path
  c.beginPath();
  c.moveTo(x + r, y);
  c.arcTo(x + w, y, x + w, y + h, r);
  c.arcTo(x + w, y + h, x, y + h, r);
  c.arcTo(x, y + h, x, y, r);
  c.arcTo(x, y, x + w, y, r);
  c.closePath();
}
function eyes(c, x, y, s, sleepy){
  if(sleepy){
    c.strokeStyle = OUT; c.lineWidth = 3;
    c.beginPath(); c.arc(x - s, y, s * 0.7, Math.PI, Math.PI * 1.9); c.stroke();
    c.beginPath(); c.arc(x + s, y, s * 0.7, Math.PI, Math.PI * 1.9); c.stroke();
  } else {
    c.fillStyle = "#fff";
    c.beginPath(); c.arc(x - s, y, s * 0.9, 0, 7); c.fill();
    c.beginPath(); c.arc(x + s, y, s * 0.9, 0, 7); c.fill();
    c.fillStyle = OUT;
    c.beginPath(); c.arc(x - s + s * 0.25, y, s * 0.45, 0, 7); c.fill();
    c.beginPath(); c.arc(x + s + s * 0.25, y, s * 0.45, 0, 7); c.fill();
  }
}

/* ---- unit painters: draw at (x,y)=feet center, s≈1 ---- */
function drawUnit(c, id, x, y, s, anim){
  const bob = Math.sin((anim.t || 0) * 3.2) * 3;
  const hurt = anim.hurt > 0;
  c.save();
  c.translate(x, y + bob);
  if(hurt){ c.globalAlpha = 0.65; }
  c.scale(s, s);
  // shadow
  c.fillStyle = "rgba(0,0,0,.3)";
  c.beginPath(); c.ellipse(0, 4 - bob, 26, 8, 0, 0, 7); c.fill();
  const swing = anim.swing > 0 ? Math.sin(anim.swing * 8) * 6 : 0;
  switch(id){
    case "teddy": {
      // plush body under head
      c.beginPath(); c.ellipse(0, -8, 15, 13, 0, 0, 7); outlined(c, "#b57a44");
      c.beginPath(); c.ellipse(0, -6, 8, 7, 0, 0, 7); outlined(c, "#e8c48e"); // tummy
      c.beginPath(); c.ellipse(-12, 4, 6, 4, 0, 0, 7); outlined(c, "#8f5a2e"); // feet
      c.beginPath(); c.ellipse(12, 4, 6, 4, 0, 0, 7); outlined(c, "#8f5a2e");
      // sword arm
      c.save(); c.rotate(-0.5 - swing * 0.1);
      c.beginPath(); c.rect(30, -34, 7, 30); outlined(c, "#cfd8ea");
      c.save(); c.translate(0, -12); c.beginPath(); c.moveTo(-8, -16); c.lineTo(8, -16); c.lineTo(0, -46); c.closePath(); outlined(c, "#ffd700"); c.restore();
      c.restore();
      c.beginPath(); c.arc(-24, -30, 10, 0, 7); outlined(c, "#a06a3a"); // ear L (behind)
      c.beginPath(); c.arc(24, -30, 10, 0, 7); outlined(c, "#a06a3a");
      c.beginPath(); c.ellipse(0, -28, 22, 20, 0, 0, 7); outlined(c, "#b57a44"); // head
      c.beginPath(); c.ellipse(0, -22, 10, 7, 0, 0, 7); outlined(c, "#e8c48e"); // muzzle
      eyes(c, -8, -34, 3);
      c.beginPath(); c.arc(0, -24, 2.4, 0, 7); c.fillStyle = OUT; c.fill();
      // helmet
      c.beginPath(); c.arc(0, -32, 23, Math.PI * 1.05, Math.PI * 1.95); outlined(c, "#4a7bd4");
      c.fillRect(-24, -35, 48, 5); c.strokeRect(-24, -35, 48, 5);
      c.beginPath(); c.moveTo(0, -58); c.lineTo(-5, -65); c.lineTo(5, -65); c.closePath(); outlined(c, "#ff5252");
      break;
    }
    case "robot": {
      c.beginPath(); rr(c, -20, -46, 40, 44, 8); outlined(c, "#9fb3c8");
      eyes(c, -10, -30, 4);
      c.fillStyle = OUT; c.fillRect(-9, -18, 18, 4); // mouth grill
      // antenna
      c.beginPath(); c.moveTo(0, -46); c.lineTo(0, -58); c.lineWidth = 3; c.strokeStyle = OUT; c.stroke();
      c.beginPath(); c.arc(0, -61, 5, 0, 7); outlined(c, "#00d4ff");
      // barrel pointing right
      c.beginPath(); rr(c, 16, -40, 22, 12, 4); outlined(c, "#62788f");
      break;
    }
    case "sprite": {
      const rot = anim.t * 1.5;
      c.save(); c.translate(0, -34); c.rotate(Math.sin(rot) * 0.1);
      c.beginPath();
      for(let i = 0; i < 5; i++){
        const a = rot * 0.5 + i * Math.PI * 2 / 5 - Math.PI / 2;
        const b = a + Math.PI / 5;
        c.lineTo(Math.cos(a) * 30, Math.sin(a) * 30);
        c.lineTo(Math.cos(b) * 14, Math.sin(b) * 14);
      }
      c.closePath(); outlined(c, "#ffd700");
      eyes(c, -6, -2, 3);
      c.beginPath(); c.arc(0, 7, 6, 0, Math.PI); c.strokeStyle = OUT; c.lineWidth = 3; c.stroke();
      c.restore();
      break;
    }
    case "blocks": {
      c.fillStyle = "#e2574c"; c.beginPath(); rr(c, -26, -34, 52, 24, 5); outlined(c);
      c.fillStyle = "#ffd23f"; c.beginPath(); rr(c, -24, -56, 48, 22, 5); outlined(c);
      c.fillStyle = "#3fa7d6"; c.beginPath(); rr(c, -22, -76, 44, 20, 5); outlined(c);
      c.fillStyle = OUT; c.font = "bold 15px Fredoka, sans-serif"; c.textAlign = "center";
      c.fillText("A", 0, -17); c.fillText("Z", 0, -40); c.fillText("z", 0, -61);
      break;
    }
    case "slinky": {
      for(let i = 0; i < 4; i++){ // spring coil
        c.beginPath(); c.ellipse(-6 - i * 7, -14 - i * 10, 15 - i * 2, 9 - i, 0, 0, 7);
        c.lineWidth = 4; c.strokeStyle = "#8f6b9e"; c.stroke();
        c.beginPath(); c.ellipse(-6 - i * 7, -14 - i * 10, 15 - i * 2, 9 - i, 0, 0.5, 2.2);
        c.strokeStyle = OUT; c.stroke();
      }
      c.beginPath(); c.ellipse(14, -40, 16, 14, -0.2, 0, 7); outlined(c, "#b9805a"); // head
      c.beginPath(); c.ellipse(6, -50, 6, 9, 0.4, 0, 7); outlined(c, "#8f6242"); // ear
      c.beginPath(); c.ellipse(20, -52, 6, 9, -0.3, 0, 7); outlined(c, "#8f6242");
      eyes(c, 16, -42, 3);
      c.fillStyle = OUT; c.beginPath(); c.arc(13, -34, 2.2, 0, 7); c.fill();
      break;
    }
    case "bubble": {
      const bl = (anim.t * 1.4) % 1;
      for(let i = 0; i < 3; i++){ // rising bubbles
        const t = (bl + i * 0.33) % 1;
        c.beginPath(); c.arc(-24 + i * 8, -30 - t * 60, 7 - t * 4, 0, 7);
        c.fillStyle = "rgba(0,212,255,.35)"; c.fill();
        c.strokeStyle = "rgba(0,212,255,.85)"; c.lineWidth = 2; c.stroke();
      }
      c.beginPath(); c.ellipse(0, -30, 22, 20, 0, 0, 7); outlined(c, "#7ec8e3");
      eyes(c, -6, -36, 3);
      c.beginPath(); c.arc(2, -26, 5, 0, Math.PI); c.strokeStyle = OUT; c.lineWidth = 3; c.stroke();
      // wand
      c.beginPath(); c.moveTo(-20, -14); c.lineTo(-34, -6); c.lineWidth = 5; c.strokeStyle = OUT; c.stroke();
      break;
    }
    case "jack": {
      const pulse = 1 + Math.min(0.25, anim.fuse ? anim.fuse * 0.12 : 0);
      c.save(); c.scale(pulse, pulse);
      c.beginPath(); rr(c, -24, -40, 48, 36, 6); outlined(c, "#7b5ea7");
      c.fillStyle = "#ffd23f"; c.beginPath(); rr(c, -24, -40, 48, 10, 4); outlined(c);
      c.fillStyle = OUT; c.font = "bold 13px Fredoka, sans-serif"; c.textAlign = "center";
      c.fillText("POW", 0, -20);
      // crank
      c.beginPath(); c.moveTo(-26, -34); c.lineTo(-38, -34); c.lineTo(-38, -24); c.lineWidth = 4; c.strokeStyle = OUT; c.stroke();
      c.beginPath(); c.arc(-38, -21, 4, 0, 7); outlined(c, "#ffd700");
      // jack head springing
      c.beginPath(); c.moveTo(0, -40); c.quadraticCurveTo(6, -50, 0, -60); c.lineWidth = 3; c.strokeStyle = OUT; c.stroke();
      c.beginPath(); c.arc(0, -66, 9, 0, 7); outlined(c, "#e2574c");
      c.fillStyle = OUT; c.beginPath(); c.arc(-3, -68, 1.6, 0, 7); c.fill(); c.beginPath(); c.arc(3, -68, 1.6, 0, 7); c.fill();
      c.restore();
      break;
    }
    case "dragon": {
      // wings flap
      const flap = Math.sin(anim.t * 6) * 0.35;
      c.save(); c.translate(-6, -50); c.rotate(-0.4 + flap);
      c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(-34, -30, -44, 6); c.quadraticCurveTo(-24, 6, 0, 0); outlined(c, "#37b24d");
      c.restore();
      c.beginPath(); c.ellipse(0, -26, 24, 22, 0, 0, 7); outlined(c, "#51cf66"); // body
      c.beginPath(); c.ellipse(14, -52, 18, 16, 0.1, 0, 7); outlined(c, "#8ce99a"); // head
      c.beginPath(); c.moveTo(22, -56); c.lineTo(18, -68); c.lineTo(26, -56); c.closePath(); outlined(c, "#ffd23f"); // horn
      eyes(c, 14, -56, 3.4);
      c.beginPath(); c.moveTo(30, -50); c.quadraticCurveTo(40, -48, 38, -42); c.lineWidth = 4; c.strokeStyle = OUT; c.stroke(); // snout puff
      break;
    }
  }
  c.restore();
}

/* ---- enemy painters ---- */
function drawEnemy(c, e){
  const d = ENEMIES[e.type], bob = Math.sin(e.t * (e.flyT ? 4 : 3)) * 4;
  const lunge = e.state === "atk" && e.atkT > d ? Math.sin(Math.min(1, (e.t % 1) * 2)) * 10 : 0;
  c.save();
  c.translate(e.x - lunge, e.y + (e.def.fly ? -26 : 0) + bob);
  if(e.type === "ghost") c.globalAlpha = 0.85;
  // shadow
  c.fillStyle = "rgba(0,0,0,.35)";
  c.beginPath(); c.ellipse(0, 6, d.w * 0.4, 9, 0, 0, 7); c.fill();
  switch(e.type){
    case "mouse": {
      c.beginPath(); c.ellipse(0, -22, 22, 24, 0, 0, 7); outlined(c, "#8a9b6e");
      c.beginPath(); c.ellipse(-16, -40, 8, 11, 0.3, 0, 7); outlined(c, "#6e805a");
      c.beginPath(); c.ellipse(14, -42, 8, 11, -0.4, 0, 7); outlined(c, "#6e805a");
      c.fillStyle = "#ff4d4d";
      c.beginPath(); c.arc(-7, -26, 3.4, 0, 7); c.fill();
      c.beginPath(); c.arc(8, -26, 3.4, 0, 7); c.fill();
      c.strokeStyle = OUT; c.lineWidth = 3;
      c.beginPath(); c.moveTo(-12, -14); c.lineTo(14, -14); c.stroke();
      // little tail
      c.beginPath(); c.moveTo(20, -10); c.quadraticCurveTo(34, -14, 30, -24); c.lineWidth = 4; c.stroke();
      break;
    }
    case "shadow": {
      c.beginPath(); c.ellipse(0, -24, 22, 24, 0, 0, 7); outlined(c, "#3d2b52");
      c.beginPath(); c.moveTo(-20, -40); c.lineTo(-24, -58); c.lineTo(-10, -46); c.closePath(); outlined(c, "#3d2b52");
      c.beginPath(); c.moveTo(18, -42); c.lineTo(24, -58); c.lineTo(8, -46); c.closePath(); outlined(c, "#3d2b52");
      c.fillStyle = "#ffdd57";
      c.beginPath(); c.ellipse(-8, -28, 5, 3, 0.2, 0, 7); c.fill();
      c.beginPath(); c.ellipse(9, -28, 5, 3, -0.2, 0, 7); c.fill();
      c.beginPath(); c.arc(-8, -26, 1.6, 0, 7); c.fillStyle = OUT; c.fill();
      c.beginPath(); c.arc(9, -26, 1.6, 0, 7); c.fill();
      c.strokeStyle = OUT; c.lineWidth = 3;
      c.beginPath(); c.moveTo(-8, -14); c.lineTo(-3, -10); c.lineTo(2, -14); c.lineTo(7, -10); c.stroke();
      break;
    }
    case "ghost": {
      c.beginPath();
      c.arc(0, -36, 22, Math.PI, 0);
      c.lineTo(22, -10);
      c.quadraticCurveTo(16, -2, 11, -10);
      c.quadraticCurveTo(6, -18, 0, -10);
      c.quadraticCurveTo(-6, -18, -11, -10);
      c.quadraticCurveTo(-16, -2, -22, -10);
      c.closePath(); outlined(c, "#e9ecef");
      eyes(c, -8, -38, 4.5, true); // hollow sleepy eyes
      c.beginPath(); c.ellipse(0, -26, 4, 6, 0, 0, 7); c.fillStyle = "#495057"; c.fill(); // void mouth
      break;
    }
    case "golem": {
      c.beginPath(); rr(c, -26, -52, 52, 56, 14); outlined(c, "#d9b98c");
      c.strokeStyle = OUT; c.lineWidth = 3;
      c.beginPath(); c.moveTo(-12, -30); c.lineTo(2, -22); c.moveTo(2, -30); c.lineTo(-12, -22); c.stroke(); // stitched X eye
      eyes(c, 12, -30, 3.5, true);
      c.beginPath(); c.moveTo(-14, -8); c.quadraticCurveTo(0, -2, 14, -8); c.stroke(); // stitched mouth
      c.beginPath(); rr(c, -34, -26, 10, 30, 5); outlined(c, "#c9a97e"); // arms
      c.beginPath(); rr(c, 24, -26, 10, 30, 5); outlined(c, "#c9a97e");
      c.fillStyle = "#a0762e"; c.beginPath(); c.ellipse(-8, -46, 6, 4, 0, 0, 7); c.fill(); // patch
      break;
    }
    case "boss": {
      c.beginPath(); c.arc(-26, -64, 15, 0, 7); outlined(c, "#2c2340"); // ears
      c.beginPath(); c.arc(26, -64, 15, 0, 7); outlined(c, "#2c2340");
      c.beginPath(); c.ellipse(0, -52, 40, 36, 0, 0, 7); outlined(c, "#453357");
      c.beginPath(); c.ellipse(0, -44, 17, 12, 0, 0, 7); outlined(c, "#5d4a72");
      c.fillStyle = "#ff6b6b";
      c.beginPath(); c.ellipse(-12, -58, 6, 8, 0.2, 0, 7); c.fill();
      c.beginPath(); c.ellipse(12, -58, 6, 8, -0.2, 0, 7); c.fill();
      c.fillStyle = OUT;
      c.beginPath(); c.ellipse(-12, -58, 2.6, 4, 0.2, 0, 7); c.fill();
      c.beginPath(); c.ellipse(12, -58, 2.6, 4, -0.2, 0, 7); c.fill();
      // teeth
      c.fillStyle = "#fff"; c.beginPath(); c.moveTo(-8, -40); c.lineTo(-4, -32); c.lineTo(0, -40); c.closePath(); c.fill();
      c.beginPath(); c.moveTo(2, -40); c.lineTo(6, -32); c.lineTo(10, -40); c.closePath(); c.fill();
      // crooked crown
      c.save(); c.rotate(0.12);
      c.beginPath(); c.moveTo(-20, -88); c.lineTo(-20, -102); c.lineTo(-10, -92); c.lineTo(0, -104); c.lineTo(10, -92); c.lineTo(20, -102); c.lineTo(20, -88); c.closePath(); outlined(c, "#ffd700");
      c.restore();
      break;
    }
  }
  c.restore();
  // hp bar
  if(e.hp < e.maxHp){
    const w = d.w * 0.9, frac = clamp01(e.hp / e.maxHp);
    const bx = e.x - w / 2;
    const by = e.y + (e.def.fly ? -96 : -e.def.h * 0.95 - 64);
    c.fillStyle = "rgba(0,0,0,.55)"; rr(c, bx - 2, by - 2, w + 4, 9, 4); c.fill();
    c.fillStyle = frac > 0.5 ? "#51cf66" : frac > 0.25 ? "#ffd43b" : "#ff6b6b";
    rr(c, bx, by, w * frac, 5, 2); c.fill();
  }
}

/* ---- background, pre-rendered once per level ---- */
let bgCanvas = null;
function buildBackground(){
  bgCanvas = document.createElement("canvas");
  bgCanvas.width = W; bgCanvas.height = H;
  const c = bgCanvas.getContext("2d");
  // night sky
  const g = c.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, "#101024"); g.addColorStop(0.35, "#1a1a2e"); g.addColorStop(1, "#20203c");
  c.fillStyle = g; c.fillRect(0, 0, W, H);
  // moon
  c.beginPath(); c.arc(610, 90, 46, 0, 7); c.fillStyle = "#fff4d6"; c.fill();
  c.beginPath(); c.arc(625, 80, 9, 0, 7); c.fillStyle = "#e8dcc0"; c.fill();
  c.beginPath(); c.arc(596, 104, 6, 0, 7); c.fill();
  c.globalAlpha = 0.15; c.beginPath(); c.arc(610, 90, 70, 0, 7); c.fillStyle = "#fff4d6"; c.fill(); c.globalAlpha = 1;
  // twinkle stars
  for(let i = 0; i < 26; i++){
    c.globalAlpha = rnd(0.25, 0.8);
    c.fillStyle = "#fff";
    const sx = rnd(20, 700), sy = rnd(20, 220);
    c.beginPath(); c.arc(sx, sy, rnd(1, 2.4), 0, 7); c.fill();
  }
  c.globalAlpha = 1;
  // curtains above grid ("window" night scene)
  c.fillStyle = "#26264c"; c.fillRect(0, 225, W, 18);
  c.fillStyle = "#16162e"; c.fillRect(0, 0, 10, H);
  // bed + sleeping child at left (dream meter = this bed)
  c.fillStyle = "#282855"; c.fillRect(0, GRID_Y - 10, GRID_X - 8, ROWS * CELL_H + 20);
  c.fillStyle = "#3a3a6e"; c.fillRect(0, GRID_Y + 30, GRID_X - 14, 260);
  c.fillStyle = "#ffd9e0"; rr(c, 2, GRID_Y + 34, 26, 40, 8); c.fill(); // pillow
  // sleeping kid: closed eyes, rosy cheeks, blanket
  const kx = 20, ky = GRID_Y + 150;
  c.fillStyle = "#f1c27d"; c.beginPath(); c.ellipse(kx, ky, 13, 14, 0, 0, 7); c.fill();
  c.strokeStyle = OUT; c.lineWidth = 3;
  c.beginPath(); c.arc(kx, ky, 13, 0, 7); c.stroke();
  c.lineWidth = 2;
  c.beginPath(); c.arc(kx - 5, ky - 2, 3.4, Math.PI * 1.05, Math.PI * 1.95); c.stroke();
  c.beginPath(); c.arc(kx + 5, ky - 2, 3.4, Math.PI * 1.05, Math.PI * 1.95); c.stroke();
  c.fillStyle = "rgba(255,130,130,.55)";
  c.beginPath(); c.arc(kx - 7, ky + 4, 2.6, 0, 7); c.fill();
  c.beginPath(); c.arc(kx + 7, ky + 4, 2.6, 0, 7); c.fill();
  c.fillStyle = "#8a6be0"; rr(c, 2, GRID_Y + 176, 30, 110, 6); c.fill(); // blanket
  c.fillStyle = "#9a7ff0"; c.beginPath(); c.moveTo(2, GRID_Y + 196); c.lineTo(10, GRID_Y + 188); c.lineTo(18, GRID_Y + 196); c.lineTo(26, GRID_Y + 188); c.lineTo(32, GRID_Y + 196); c.lineTo(32, GRID_Y + 210); c.lineTo(2, GRID_Y + 210); c.closePath(); c.fill();
  // grid tiles
  for(let r = 0; r < ROWS; r++) for(let col = 0; col < COLS; col++){
    const x = GRID_X + col * CELL_W, y = GRID_Y + r * CELL_H;
    c.fillStyle = (r + col) % 2 ? "#232347" : "#26264e";
    rr(c, x + 2, y + 2, CELL_W - 4, CELL_H - 4, 8); c.fill();
    c.strokeStyle = "rgba(255,255,255,.05)"; c.lineWidth = 2; c.stroke();
  }
  // thick frame around grid
  c.strokeStyle = "#3d3d70"; c.lineWidth = 6;
  rr(c, GRID_X - 4, GRID_Y - 4, COLS * CELL_W + 8, ROWS * CELL_H + 8, 12); c.stroke();
  // right-spawn glow
  const eg = c.createLinearGradient(W - 60, 0, W, 0);
  eg.addColorStop(0, "rgba(120,40,120,0)"); eg.addColorStop(1, "rgba(120,40,120,.45)");
  c.fillStyle = eg; c.fillRect(W - 60, GRID_Y, 60, ROWS * CELL_H);
  // floor below grid
  c.fillStyle = "#191934"; c.fillRect(0, GRID_B, W, H - GRID_B);
  c.strokeStyle = "#3d3d70"; c.beginPath(); c.moveTo(0, GRID_B); c.lineTo(W, GRID_B); c.lineWidth = 5; c.stroke();
  // paper texture noise
  const n = document.createElement("canvas"); n.width = n.height = 120;
  const nc = n.getContext("2d"), id = nc.createImageData(120, 120);
  for(let i = 0; i < id.data.length; i += 4){
    const v = 120 + Math.random() * 90;
    id.data[i] = id.data[i + 1] = id.data[i + 2] = v; id.data[i + 3] = 14;
  }
  nc.putImageData(id, 0, 0);
  c.fillStyle = c.createPattern(n, "repeat"); c.fillRect(0, 0, W, H);
}

/* collectible star painter */
function drawStarShape(c, x, y, s, spin){
  c.save(); c.translate(x, y); c.rotate(spin); c.scale(s, s);
  c.beginPath();
  for(let i = 0; i < 5; i++){
    const a = i * Math.PI * 2 / 5 - Math.PI / 2, b = a + Math.PI / 5;
    c.lineTo(Math.cos(a) * 16, Math.sin(a) * 16);
    c.lineTo(Math.cos(b) * 7.5, Math.sin(b) * 7.5);
  }
  c.closePath(); outlined(c, "#ffd700", 3);
  c.restore();
}

/* unit icon for DOM bars/cards */
function paintIcon(canvas, id){
  const c = canvas.getContext("2d");
  c.setTransform(1, 0, 0, 1, 0, 0);
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = "#1a1a3e"; rr(c, 0, 0, canvas.width, canvas.height, 8); c.fill();
  c.translate(canvas.width / 2, canvas.height * 0.9);
  const s = canvas.width / 84;
  c.scale(s, s);
  drawUnit(c, id, 0, 0, 1, { t: irnd(0, 5), hurt: 0, swing: 0 });
}
