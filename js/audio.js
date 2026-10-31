// ── Chiptune + orchestral-tinted audio engine (WebAudio, zero assets) ────────
const midi = n => 440 * Math.pow(2, (n - 69) / 12);

const TRACKS = {
  title: {
    bpm: 64, steps: 32, gain: 0.34,
    chords: [[57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62]],
    lead: [76, 0, 0, 72, 0, 74, 0, 0, 76, 0, 79, 0, 74, 0, 0, 0, 72, 0, 0, 69, 0, 71, 0, 0, 72, 0, 74, 0, 71, 0, 0, 0],
    bass: [45, 0, 0, 0, 0, 0, 0, 0, 41, 0, 0, 0, 0, 0, 0, 0, 36, 0, 0, 0, 0, 0, 0, 0, 43, 0, 0, 0, 0, 0, 0, 0],
    drums: false, pad: true, arp: 0.25,
  },
  town: {
    bpm: 88, steps: 32, gain: 0.30,
    chords: [[48, 52, 55], [52, 55, 59], [53, 57, 60], [55, 59, 62]],
    lead: [72, 0, 74, 0, 76, 0, 79, 0, 76, 0, 74, 0, 72, 0, 0, 0, 71, 0, 72, 0, 74, 0, 76, 0, 74, 0, 72, 0, 71, 0, 0, 0],
    bass: [36, 0, 0, 0, 43, 0, 0, 0, 40, 0, 0, 0, 47, 0, 0, 0, 41, 0, 0, 0, 48, 0, 0, 0, 43, 0, 0, 0, 50, 0, 0, 0],
    drums: true, pad: true, arp: 0.35,
  },
  dungeon: {
    bpm: 108, steps: 32, gain: 0.28,
    chords: [[50, 53, 57], [46, 50, 53], [48, 52, 55], [45, 48, 52]],
    lead: [74, 0, 0, 77, 0, 76, 0, 74, 0, 0, 72, 0, 74, 0, 0, 0, 70, 0, 0, 74, 0, 72, 0, 70, 0, 0, 69, 0, 70, 0, 0, 0],
    bass: [38, 38, 0, 38, 0, 38, 0, 0, 34, 34, 0, 34, 0, 34, 0, 0, 36, 36, 0, 36, 0, 36, 0, 0, 33, 33, 0, 33, 0, 33, 0, 0],
    drums: true, pad: true, arp: 0.55,
  },
  boss: {
    bpm: 138, steps: 32, gain: 0.32,
    chords: [[40, 43, 47], [36, 40, 43], [38, 42, 45], [35, 38, 42]],
    lead: [76, 76, 0, 79, 0, 77, 76, 0, 74, 0, 76, 0, 79, 0, 0, 81, 79, 0, 77, 0, 76, 0, 74, 0, 72, 0, 74, 0, 76, 0, 0, 0],
    bass: [28, 28, 28, 0, 28, 28, 0, 28, 24, 24, 24, 0, 24, 24, 0, 24, 26, 26, 26, 0, 26, 26, 0, 26, 23, 23, 23, 0, 23, 23, 0, 23],
    drums: true, pad: true, arp: 0.65,
  },
};
TRACKS.victory = {
  bpm: 118, steps: 32, gain: 0.36, oneShot: true,
  chords: [[48, 52, 55], [53, 57, 60], [55, 59, 62], [48, 52, 55]],
  lead: [72, 76, 79, 84, 0, 79, 0, 76, 74, 77, 81, 86, 0, 81, 0, 77, 72, 76, 79, 84, 0, 84, 0, 79, 76, 0, 72, 0, 76, 0, 79, 0],
  bass: [36, 0, 36, 0, 41, 0, 41, 0, 43, 0, 43, 0, 36, 0, 36, 0],
  drums: true, pad: true, arp: 0.5,
};

export class AudioEngine {
  constructor(settings = {}) {
    this.settings = { bgm: true, sfx: true, ...settings };
    this.ctx = null;
    this.trackName = 'none';
    this.track = null;
    this.step = 0;
    this.nextTime = 0;
    this.timer = null;
    this.ready = false;
  }
  init() {
    if (this.ctx) { if (this.ctx.state === 'suspended') this.ctx.resume(); return; }
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    this.ctx = new Ctx();
    this.master = this.ctx.createGain(); this.master.gain.value = 0.55; this.master.connect(this.ctx.destination);
    this.musicGain = this.ctx.createGain(); this.musicGain.gain.value = this.settings.bgm ? 1 : 0; this.musicGain.connect(this.master);
    this.sfxGain = this.ctx.createGain(); this.sfxGain.gain.value = this.settings.sfx ? 0.8 : 0; this.sfxGain.connect(this.master);
    // generated reverb impulse
    this.reverb = this.ctx.createConvolver();
    const len = this.ctx.sampleRate * 1.6;
    const buf = this.ctx.createBuffer(2, len, this.ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const data = buf.getChannelData(ch);
      for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6);
    }
    this.reverb.buffer = buf;
    this.reverbGain = this.ctx.createGain(); this.reverbGain.gain.value = 0.20;
    this.reverb.connect(this.reverbGain); this.reverbGain.connect(this.master);
    // noise buffer
    this.noiseBuf = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.6, this.ctx.sampleRate);
    const nd = this.noiseBuf.getChannelData(0);
    for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
    this.ready = true;
    this.timer = setInterval(() => this.schedule(), 45);
  }
  setSettings(s) {
    this.settings = { ...this.settings, ...s };
    if (this.musicGain) this.musicGain.gain.setTargetAtTime(this.settings.bgm ? 1 : 0, this.ctx.currentTime, 0.15);
    if (this.sfxGain) this.sfxGain.gain.setTargetAtTime(this.settings.sfx ? 0.8 : 0, this.ctx.currentTime, 0.05);
  }
  setTrack(name) {
    if (this.trackName === name) return;
    this.trackName = name;
    this.track = TRACKS[name] || null;
    this.step = 0;
    this.nextTime = this.ctx ? this.ctx.currentTime + 0.08 : 0;
    if (!this.ready) return;
    // little transition ping
    if (name !== 'none') this.sfx('transition', 0.5);
  }
  trackFor(mode, boss) { return mode === 'title' ? 'title' : mode === 'town' ? 'town' : mode === 'victory' ? 'victory' : boss ? 'boss' : 'dungeon'; }
  schedule() {
    if (!this.ready || !this.track || !this.settings.bgm) return;
    const ctx = this.ctx;
    if (ctx.state !== 'running') return;
    const stepDur = 60 / this.track.bpm / 4;
    while (this.nextTime < ctx.currentTime + 0.18) {
      this.playStep(this.step % this.track.steps, this.nextTime, stepDur);
      this.step++;
      this.nextTime += stepDur;
      if (this.track.oneShot && this.step % this.track.steps === 0 && this.step > 0) { this.trackName = 'none'; this.track = null; break; }
    }
  }
  playStep(step, time, stepDur) {
    const T = this.track;
    const bar = Math.floor(step / 16) % T.chords.length;
    const chord = T.chords[bar];
    const root = chord[0];
    const s16 = step % 16;
    // pad on bar start
    if (T.pad && step % 16 === 0) {
      for (const n of chord) this.tone(midi(n + 12), time, stepDur * 15, 'sawtooth', 0.035, 420, true);
    }
    // bass
    const b = T.bass[step % T.bass.length];
    if (b > 0) this.tone(midi(b), time, stepDur * 0.85, 'triangle', 0.16, 900);
    // arp
    if (T.arp && step % 2 === 0) {
      const n = chord[(step / 2) % chord.length] + 24 + (step % 8 === 4 ? 12 : 0);
      this.tone(midi(n), time, stepDur * 0.8, 'square', 0.028 * T.arp, 2600);
    }
    // lead
    const l = T.lead[step % T.lead.length];
    if (l > 0) {
      this.tone(midi(l + 12), time, stepDur * (step % 4 === 0 ? 1.8 : 0.8), 'square', 0.075, 3000, true);
      this.tone(midi(l + 12) * 1.005, time, stepDur * 1.2, 'triangle', 0.03, 2400);
    }
    // drums
    if (T.drums) {
      if (s16 % 8 === 0 || (this.trackName === 'boss' && s16 % 4 === 2)) this.kick(time);
      if (s16 === 4 || s16 === 12) this.snare(time, 0.07);
      if (s16 % 2 === 0) this.hat(time, 0.018);
    }
  }
  tone(freq, time, dur, type, vol, cutoff, reverb = false) {
    const ctx = this.ctx;
    const o = ctx.createOscillator(); const g = ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, time);
    const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.setValueAtTime(cutoff || 2200, time);
    g.gain.setValueAtTime(0.0001, time);
    g.gain.exponentialRampToValueAtTime(vol, time + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, time + dur);
    o.connect(f); f.connect(g); g.connect(this.musicGain);
    if (reverb) g.connect(this.reverb);
    o.start(time); o.stop(time + dur + 0.03);
  }
  kick(time) {
    const ctx = this.ctx; const o = ctx.createOscillator(); const g = ctx.createGain();
    o.type = 'sine'; o.frequency.setValueAtTime(120, time); o.frequency.exponentialRampToValueAtTime(42, time + 0.11);
    g.gain.setValueAtTime(0.24, time); g.gain.exponentialRampToValueAtTime(0.001, time + 0.14);
    o.connect(g); g.connect(this.musicGain); o.start(time); o.stop(time + 0.16);
  }
  snare(time, vol = 0.1) {
    const ctx = this.ctx; const src = ctx.createBufferSource(); src.buffer = this.noiseBuf;
    const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 1700; f.Q.value = 0.8;
    const g = ctx.createGain(); g.gain.setValueAtTime(vol, time); g.gain.exponentialRampToValueAtTime(0.001, time + 0.12);
    src.connect(f); f.connect(g); g.connect(this.musicGain); src.start(time); src.stop(time + 0.14);
  }
  hat(time, vol = 0.03) {
    const ctx = this.ctx; const src = ctx.createBufferSource(); src.buffer = this.noiseBuf;
    const f = ctx.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = 6500;
    const g = ctx.createGain(); g.gain.setValueAtTime(vol, time); g.gain.exponentialRampToValueAtTime(0.001, time + 0.045);
    src.connect(f); f.connect(g); g.connect(this.musicGain); src.start(time); src.stop(time + 0.06);
  }
  noiseHit(time, dur, type, freq, vol, q = 1) {
    const ctx = this.ctx; const src = ctx.createBufferSource(); src.buffer = this.noiseBuf;
    const f = ctx.createBiquadFilter(); f.type = type; f.frequency.setValueAtTime(freq, time); f.Q.value = q;
    const g = ctx.createGain(); g.gain.setValueAtTime(vol, time); g.gain.exponentialRampToValueAtTime(0.001, time + dur);
    src.connect(f); f.connect(g); g.connect(this.sfxGain); src.start(time); src.stop(time + dur + 0.02);
    return f;
  }
  blip(freq, dur, type = 'square', vol = 0.09, slide = 0) {
    if (!this.ready || !this.settings.sfx) return;
    const ctx = this.ctx; const t = ctx.currentTime;
    const o = ctx.createOscillator(); const g = ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, t);
    if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(30, freq + slide), t + dur);
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g); g.connect(this.sfxGain); o.start(t); o.stop(t + dur + 0.02);
  }
  sfx(name, volume = 1) {
    if (!this.ready || !this.settings.sfx) return;
    const t = this.ctx.currentTime; const v = volume;
    switch (name) {
      case 'click': this.blip(660, 0.05, 'square', 0.05); break;
      case 'hover': this.blip(880, 0.025, 'square', 0.02); break;
      case 'slash': this.noiseHit(t, 0.13, 'bandpass', 1800, 0.16 * v, 0.7); this.blip(320, 0.09, 'sawtooth', 0.05, -180); break;
      case 'shoot': this.blip(760, 0.08, 'square', 0.06, -420); break;
      case 'arrow': this.noiseHit(t, 0.09, 'highpass', 2400, 0.08 * v); break;
      case 'hit': this.noiseHit(t, 0.08, 'lowpass', 900, 0.12 * v); this.blip(120, 0.09, 'triangle', 0.09, -50); break;
      case 'crit': this.blip(1400, 0.12, 'square', 0.09, -500); this.blip(2100, 0.09, 'triangle', 0.06, 300); break;
      case 'hurt': this.noiseHit(t, 0.16, 'lowpass', 600, 0.16 * v); this.blip(90, 0.2, 'sawtooth', 0.08, -40); break;
      case 'dodge': this.noiseHit(t, 0.16, 'bandpass', 1200, 0.08, 0.4); this.blip(420, 0.16, 'sine', 0.04, -260); break;
      case 'loot': [0, 90, 180, 300].forEach((ms, i) => setTimeout(() => this.blip([660, 880, 1100, 1320][i], 0.16, 'square', 0.05), ms)); break;
      case 'coin': this.blip(1200, 0.06, 'square', 0.045); setTimeout(() => this.blip(1600, 0.09, 'square', 0.035), 55); break;
      case 'levelup': [523, 659, 784, 1046].forEach((f, i) => setTimeout(() => this.blip(f, 0.35, 'triangle', 0.07), i * 90)); break;
      case 'potion': this.blip(420, 0.35, 'sine', 0.07, 500); break;
      case 'portal': this.noiseHit(t, 0.4, 'lowpass', 900, 0.1); this.blip(180, 0.45, 'sawtooth', 0.06, 420); break;
      case 'bossroar': this.blip(70, 0.7, 'sawtooth', 0.12, -22); this.noiseHit(t, 0.6, 'lowpass', 400, 0.14, 0.5); break;
      case 'explosion': this.noiseHit(t, 0.35, 'lowpass', 700, 0.2 * v); this.blip(100, 0.3, 'sine', 0.1, -60); break;
      case 'freeze': this.blip(1600, 0.25, 'triangle', 0.06, 900); this.noiseHit(t, 0.2, 'highpass', 5000, 0.05); break;
      case 'thunder': this.noiseHit(t, 0.22, 'bandpass', 3000, 0.13, 0.5); this.blip(1800, 0.18, 'sawtooth', 0.05, -1400); break;
      case 'shield': this.blip(300, 0.4, 'triangle', 0.07, 300); break;
      case 'death': [392, 330, 262, 196].forEach((f, i) => setTimeout(() => this.blip(f, 0.4, 'triangle', 0.08), i * 160)); break;
      case 'victory': [523, 659, 784, 1046, 1318].forEach((f, i) => setTimeout(() => this.blip(f, 0.5, 'square', 0.06), i * 120)); break;
      case 'error': this.blip(140, 0.2, 'sawtooth', 0.07, -30); break;
      case 'transition': this.blip(220, 0.4, 'sine', 0.05, 440); break;
      case 'stun': this.blip(240, 0.18, 'triangle', 0.06, -80); break;
      case 'revive': [262, 392, 523, 784].forEach((f, i) => setTimeout(() => this.blip(f, 0.45, 'triangle', 0.07), i * 130)); break;
      case 'open': this.noiseHit(t, 0.25, 'bandpass', 900, 0.06, 0.6); break;
      case 'bossdown': this.noiseHit(t, 1.1, 'lowpass', 500, 0.2); this.blip(80, 1.0, 'sawtooth', 0.1, -30); break;
    }
  }
}
