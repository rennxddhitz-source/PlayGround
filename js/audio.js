"use strict";
/* ============ WebAudio: juicy SFX + cozy generative music ============ */
let AC = null, sfxBus = null, musBus = null;
let soundOn = true, musicTimer = null, musNext = 0, musStep = 0;

function initAudio(){
  if(AC) return;
  try{
    AC = new (window.AudioContext || window.webkitAudioContext)();
    sfxBus = AC.createGain(); sfxBus.gain.value = 0.5; sfxBus.connect(AC.destination);
    musBus = AC.createGain(); musBus.gain.value = 0.3; musBus.connect(AC.destination);
    musNext = AC.currentTime + 0.1;
    musicTimer = setInterval(musicTick, 120);
  }catch(e){}
}
function ResumeAudio(){ initAudio(); if(AC && AC.state === "suspended") AC.resume(); }

function tone(freq, dur, type, vol, bus, bendTo, delay){
  if(!AC || !soundOn) return;
  const t = AC.currentTime + (delay || 0);
  const o = AC.createOscillator(), g = AC.createGain();
  o.type = type || "sine";
  o.frequency.setValueAtTime(freq, t);
  if(bendTo) o.frequency.exponentialRampToValueAtTime(Math.max(30, bendTo), t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol || 0.2, t + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g); g.connect(bus || sfxBus);
  o.start(t); o.stop(t + dur + 0.05);
}
function noise(dur, vol, bus, low){
  if(!AC || !soundOn) return;
  const t = AC.currentTime;
  const len = Math.max(1, Math.floor(AC.sampleRate * dur));
  const buf = AC.createBuffer(1, len, AC.sampleRate);
  const d = buf.getChannelData(0);
  for(let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
  const src = AC.createBufferSource(); src.buffer = buf;
  const g = AC.createGain(); g.gain.value = vol || 0.15;
  if(low){
    const f = AC.createBiquadFilter(); f.type = "lowpass"; f.frequency.value = low;
    src.connect(f); f.connect(g);
  } else src.connect(g);
  g.connect(bus || sfxBus);
  src.start(t);
}

const SFX = {
  pop(){ tone(600, 0.09, "square", 0.16, null, 220); },                    // enemy death
  boing(){ tone(320, 0.22, "sine", 0.2, null, 110), tone(300, 0.18, "triangle", 0.1, null, 60); },
  ding(){ tone(880, 0.28, "sine", 0.18); tone(1318, 0.3, "sine", 0.1); },  // starlight collect
  put(){ tone(220, 0.08, "triangle", 0.2, null, 160); noise(0.05, 0.06); },// place unit
  hit(){ noise(0.05, 0.07, null, 2400); tone(190, 0.05, "square", 0.05); },
  shoot(){ tone(720, 0.07, "square", 0.08, null, 480); },
  buzz(){ tone(150, 0.16, "sawtooth", 0.14, null, 90); },
  crumble(){ noise(0.3, 0.2, null, 900); tone(180, 0.25, "triangle", 0.14, null, 60); },
  boom(){ noise(0.5, 0.3, null, 500); tone(120, 0.5, "sine", 0.3, null, 40); },
  hurt(){ tone(200, 0.2, "sawtooth", 0.16, null, 80); },
  waveGo(){ tone(523, 0.14, "triangle", 0.16); tone(659, 0.14, "triangle", 0.16, null, null, 0.1); tone(784, 0.2, "triangle", 0.16, null, null, 0.2); },
  win(){ [523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, 0.34, "triangle", 0.18, null, null, i * 0.13)); },
  lose(){ [392, 330, 262, 196].forEach((f, i) => tone(f, 0.4, "sine", 0.16, null, null, i * 0.18)); },
  charge(){ [660, 880, 1100].forEach((f, i) => tone(f, 0.12, "sine", 0.1, null, f * 1.3, i * 0.07)); },
};

/* --- cozy generative lullaby: Am - F - C - G, soft piano-ish eighths --- */
const CHORDS = [ [220, 261.6, 329.6], [174.6, 220, 261.6], [130.8, 164.8, 196], [196, 246.9, 293.7] ];
const PENTA = [329.6, 392, 440, 523.3, 587.3, 659.3, 784];
function musicTick(){
  if(!AC || !soundOn) return;
  while(musNext < AC.currentTime + 0.4){
    const bar = Math.floor(musStep / 8) % 4, eighth = musStep % 8;
    const ch = CHORDS[bar];
    if(eighth === 0){ // bass root
      tone(ch[0] / 2, 1.6, "sine", 0.14, musBus);
    }
    if(eighth % 2 === 0 && Math.random() < 0.72){ // melody plucks
      const f = PENTA[irnd(0, PENTA.length - 1)];
      tone(f, 0.9, "triangle", 0.06, musBus);
    }
    if(Math.random() < 0.18) tone(ch[irnd(0, 2)] * 2, 1.2, "sine", 0.03, musBus); // soft pad sparkle
    musNext += 0.46;
    musStep++;
  }
}
