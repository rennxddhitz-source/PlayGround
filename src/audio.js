/* Fully procedural audio — no external assets. */
export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.ambientOn = false;
    this.noise = null;
  }

  unlock() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      return;
    }
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    this.ctx = ctx;

    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -14;
    comp.knee.value = 20;
    comp.ratio.value = 5;
    comp.attack.value = 0.003;
    comp.release.value = 0.2;

    const master = ctx.createGain();
    master.gain.value = 0.55;
    master.connect(comp);
    comp.connect(ctx.destination);
    this.master = master;

    // reusable noise buffer
    const len = ctx.sampleRate * 1.5;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    this.noise = buf;

    if (ctx.state === 'suspended') ctx.resume();
  }

  now() { return this.ctx ? this.ctx.currentTime : 0; }

  noiseSource() {
    const s = this.ctx.createBufferSource();
    s.buffer = this.noise;
    s.loop = true;
    return s;
  }

  env(gain, t, attack, hold, decay, peak = 1) {
    gain.gain.cancelScheduledValues(t);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.linearRampToValueAtTime(peak, t + attack);
    gain.gain.setValueAtTime(peak, t + attack + hold);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + attack + hold + decay);
  }

  noiseBurst({ dur = 0.15, filter = 'lowpass', freq = 1200, q = 0.8, gain = 0.5, delay = 0, sweep = null }) {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const t = ctx.currentTime + delay;
    const src = this.noiseSource();
    const f = ctx.createBiquadFilter();
    f.type = filter;
    f.frequency.setValueAtTime(freq, t);
    if (sweep) f.frequency.exponentialRampToValueAtTime(Math.max(40, sweep), t + dur);
    f.Q.value = q;
    const g = ctx.createGain();
    this.env(g, t, 0.002, dur * 0.25, dur * 0.75, gain);
    src.connect(f); f.connect(g); g.connect(this.master);
    src.start(t);
    src.stop(t + dur + 0.05);
  }

  tone({ freq = 440, endFreq = null, dur = 0.15, gain = 0.2, type = 'sine', delay = 0, attack = 0.004 }) {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const t = ctx.currentTime + delay;
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (endFreq) o.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq), t + dur);
    const g = ctx.createGain();
    this.env(g, t, attack, dur * 0.2, dur * 0.8, gain);
    o.connect(g); g.connect(this.master);
    o.start(t); o.stop(t + dur + 0.05);
  }

  shot() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    // body
    this.noiseBurst({ dur: 0.22, filter: 'lowpass', freq: 3600, sweep: 320, gain: 0.85 });
    this.noiseBurst({ dur: 0.05, filter: 'highpass', freq: 3800, gain: 0.5 });
    // thump
    this.tone({ freq: 170, endFreq: 42, dur: 0.2, gain: 0.75, type: 'sine' });
    this.tone({ freq: 92, endFreq: 40, dur: 0.26, gain: 0.4, type: 'triangle' });
    // mechanical click
    this.tone({ freq: 2600, endFreq: 1200, dur: 0.03, gain: 0.06, type: 'square', delay: 0.015 });
  }

  enemyShot() {
    if (!this.ctx) return;
    this.noiseBurst({ dur: 0.16, filter: 'lowpass', freq: 2200, sweep: 240, gain: 0.28 });
    this.tone({ freq: 130, endFreq: 50, dur: 0.16, gain: 0.22, type: 'sawtooth' });
  }

  empty() {
    this.tone({ freq: 900, endFreq: 500, dur: 0.04, gain: 0.08, type: 'square' });
  }

  hit(kill = false, head = false) {
    if (!this.ctx) return;
    if (kill) {
      this.tone({ freq: 1600, endFreq: 900, dur: 0.08, gain: 0.16, type: 'triangle' });
      this.tone({ freq: 2400, endFreq: 1800, dur: 0.06, gain: 0.08, type: 'square', delay: 0.04 });
    } else if (head) {
      this.tone({ freq: 2100, endFreq: 1500, dur: 0.05, gain: 0.12, type: 'square' });
    } else {
      this.tone({ freq: 1100, endFreq: 800, dur: 0.045, gain: 0.09, type: 'square' });
    }
  }

  reload() {
    if (!this.ctx) return;
    this.tone({ freq: 420, endFreq: 260, dur: 0.05, gain: 0.1, type: 'square', delay: 0.12 });
    this.tone({ freq: 300, endFreq: 190, dur: 0.06, gain: 0.12, type: 'square', delay: 0.9 });
    this.tone({ freq: 700, endFreq: 380, dur: 0.05, gain: 0.1, type: 'square', delay: 1.55 });
    this.noiseBurst({ dur: 0.05, filter: 'bandpass', freq: 1800, q: 2, gain: 0.1, delay: 1.62 });
  }

  step(sprint = false) {
    if (!this.ctx) return;
    this.noiseBurst({ dur: 0.075, filter: 'lowpass', freq: sprint ? 720 : 520, q: 1.2, gain: sprint ? 0.14 : 0.09 });
    this.tone({ freq: 90, endFreq: 55, dur: 0.07, gain: 0.05, type: 'sine' });
  }

  enemyDeath() {
    if (!this.ctx) return;
    this.noiseBurst({ dur: 0.28, filter: 'lowpass', freq: 1800, sweep: 180, gain: 0.22 });
    this.tone({ freq: 210, endFreq: 60, dur: 0.35, gain: 0.18, type: 'sawtooth' });
    this.tone({ freq: 820, endFreq: 320, dur: 0.18, gain: 0.08, type: 'square', delay: 0.03 });
  }

  hurt() {
    if (!this.ctx) return;
    this.noiseBurst({ dur: 0.18, filter: 'lowpass', freq: 700, gain: 0.3 });
    this.tone({ freq: 120, endFreq: 60, dur: 0.25, gain: 0.3, type: 'sawtooth' });
  }

  wave() {
    if (!this.ctx) return;
    this.tone({ freq: 150, endFreq: 96, dur: 0.9, gain: 0.28, type: 'sawtooth', attack: 0.08 });
    this.tone({ freq: 300, endFreq: 190, dur: 0.7, gain: 0.12, type: 'triangle', delay: 0.12, attack: 0.1 });
    this.noiseBurst({ dur: 0.8, filter: 'bandpass', freq: 400, q: 0.7, gain: 0.08, delay: 0.1 });
  }

  gameOver() {
    if (!this.ctx) return;
    this.tone({ freq: 220, endFreq: 80, dur: 1.4, gain: 0.3, type: 'sawtooth', attack: 0.02 });
    this.tone({ freq: 110, endFreq: 42, dur: 1.8, gain: 0.25, type: 'sine' });
  }

  ambient() {
    if (!this.ctx || this.ambientOn) return;
    this.ambientOn = true;
    const ctx = this.ctx;
    // low industrial drone
    const o1 = ctx.createOscillator();
    o1.type = 'sine'; o1.frequency.value = 46;
    const o2 = ctx.createOscillator();
    o2.type = 'sine'; o2.frequency.value = 57.3;
    const og = ctx.createGain(); og.gain.value = 0.05;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 190;
    o1.connect(og); o2.connect(og); og.connect(lp); lp.connect(this.master);
    o1.start(); o2.start();

    // wind
    const wind = this.noiseSource();
    const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 320; bp.Q.value = 0.55;
    const wg = ctx.createGain(); wg.gain.value = 0.03;
    const lfo = ctx.createOscillator(); lfo.frequency.value = 0.08;
    const lfoG = ctx.createGain(); lfoG.gain.value = 0.025;
    lfo.connect(lfoG); lfoG.connect(wg.gain);
    wind.connect(bp); bp.connect(wg); wg.connect(this.master);
    wind.start(); lfo.start();
  }
}
