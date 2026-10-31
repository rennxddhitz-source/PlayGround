const NOTE = (midi) => 440 * 2 ** ((midi - 69) / 12);

const CHORDS = [
  { notes: [60, 64, 67, 71], bass: 48, pad: [48, 55, 64] },
  { notes: [57, 60, 64, 67], bass: 45, pad: [45, 52, 60] },
  { notes: [53, 57, 60, 64], bass: 41, pad: [41, 48, 57] },
  { notes: [55, 59, 62, 67], bass: 43, pad: [43, 50, 59] },
];

export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.musicGain = null;
    this.sfxGain = null;
    this.noise = null;
    this.nextNote = 0;
    this.step = 0;
    this.timer = null;
    this.muted = false;
    this.started = false;
  }

  ensure() {
    if (this.ctx) {
      if (this.ctx.state === "suspended") this.ctx.resume();
      return this.ctx;
    }
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    this.ctx = new AudioCtx();
    this.master = this.ctx.createGain();
    this.master.gain.value = this.muted ? 0 : 0.75;
    this.master.connect(this.ctx.destination);

    const compressor = this.ctx.createDynamicsCompressor();
    compressor.threshold.value = -18;
    compressor.knee.value = 18;
    compressor.ratio.value = 4;
    compressor.connect(this.master);

    this.musicGain = this.ctx.createGain();
    this.musicGain.gain.value = 0.19;
    this.musicGain.connect(compressor);

    this.sfxGain = this.ctx.createGain();
    this.sfxGain.gain.value = 0.42;
    this.sfxGain.connect(compressor);

    const buffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 1.2, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) data[i] = Math.random() * 2 - 1;
    this.noise = buffer;

    return this.ctx;
  }

  init() {
    if (!this.ensure() || this.started) return;
    this.started = true;
    this.nextNote = this.ctx.currentTime + 0.1;
    this.timer = window.setInterval(() => this.scheduleMusic(), 120);
    this.scheduleMusic();
  }

  setMuted(muted) {
    this.muted = muted;
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setTargetAtTime(muted ? 0 : 0.75, now, 0.08);
  }

  scheduleMusic() {
    if (!this.ctx || this.muted) return;
    const horizon = this.ctx.currentTime + 0.8;
    while (this.nextNote < horizon) {
      this.playStep(this.step, this.nextNote);
      this.step += 1;
      this.nextNote += 0.25;
    }
  }

  playStep(step, time) {
    const bar = Math.floor(step / 8) % CHORDS.length;
    const beat = step % 8;
    const chord = CHORDS[bar];
    if (beat === 0) {
      chord.pad.forEach((midi, index) => {
        this.tone(NOTE(midi), time + index * 0.015, 1.9, 0.022, "sine", this.musicGain, 1.8);
      });
      this.tone(NOTE(chord.bass), time, 1.6, 0.06, "triangle", this.musicGain, 0.8);
    }

    const pattern = [0, 2, 1, 3, 2, 1, 3, 2];
    const note = chord.notes[pattern[beat]];
    const velocity = beat === 0 ? 0.07 : 0.045;
    this.tone(NOTE(note + 12), time, 0.55, velocity, "triangle", this.musicGain, 2.6, 0.5);
    if (beat === 4 || beat === 6) {
      const sparkle = chord.notes[(beat + bar) % chord.notes.length] + 24;
      this.tone(NOTE(sparkle), time + 0.04, 0.4, 0.015, "sine", this.musicGain, 3.2);
    }
  }

  tone(freq, time, duration, volume, type, destination, attack = 0.01, detune = 0) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    osc.detune.value = detune;
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, volume), time + Math.min(attack, duration * 0.25));
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
    osc.connect(gain);
    gain.connect(destination);
    osc.start(time);
    osc.stop(time + duration + 0.05);
  }

  noiseBurst(time, duration, volume, filterFreq, destination) {
    if (!this.ctx || !this.noise) return;
    const source = this.ctx.createBufferSource();
    source.buffer = this.noise;
    const filter = this.ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = filterFreq;
    filter.Q.value = 0.9;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(volume, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(destination || this.sfxGain);
    source.start(time);
    source.stop(time + duration + 0.02);
  }

  sweep(from, to, time, duration, volume, type = "sine") {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(from, time);
    osc.frequency.exponentialRampToValueAtTime(Math.max(20, to), time + duration);
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(volume, time + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(time);
    osc.stop(time + duration + 0.03);
  }

  sfx(name) {
    if (!this.ensure() || this.muted) return;
    const now = this.ctx.currentTime + 0.01;
    switch (name) {
      case "click":
        this.tone(620, now, 0.08, 0.06, "triangle", this.sfxGain);
        break;
      case "place":
        this.sweep(220, 520, now, 0.13, 0.17, "sine");
        this.sweep(440, 780, now + 0.05, 0.14, 0.08, "triangle");
        break;
      case "deny":
        this.tone(180, now, 0.12, 0.12, "square", this.sfxGain);
        this.tone(145, now + 0.08, 0.14, 0.1, "square", this.sfxGain);
        break;
      case "pop":
        this.noiseBurst(now, 0.09, 0.18, 1700);
        this.sweep(300, 80, now, 0.12, 0.14, "triangle");
        break;
      case "laser":
        this.sweep(1300, 420, now, 0.08, 0.07, "square");
        break;
      case "star":
        this.tone(NOTE(84), now, 0.24, 0.12, "sine", this.sfxGain);
        this.tone(NOTE(91), now + 0.07, 0.3, 0.09, "sine", this.sfxGain);
        break;
      case "heal":
        this.tone(NOTE(76), now, 0.25, 0.08, "sine", this.sfxGain);
        this.tone(NOTE(83), now + 0.09, 0.35, 0.06, "triangle", this.sfxGain);
        break;
      case "hurt":
        this.sweep(180, 70, now, 0.22, 0.16, "sawtooth");
        this.noiseBurst(now, 0.15, 0.12, 400);
        break;
      case "wave":
        [60, 67, 72].forEach((midi, index) => {
          this.tone(NOTE(midi), now + index * 0.09, 0.5, 0.1, "triangle", this.sfxGain);
        });
        break;
      case "power":
        [60, 64, 67, 72, 76].forEach((midi, index) => {
          this.tone(NOTE(midi + 12), now + index * 0.06, 0.65, 0.09, "sine", this.sfxGain);
        });
        this.noiseBurst(now, 0.55, 0.16, 2400);
        break;
      case "victory":
        [60, 64, 67, 72, 76, 79].forEach((midi, index) => {
          this.tone(NOTE(midi + 12), now + index * 0.12, 0.9, 0.12, "triangle", this.sfxGain);
        });
        break;
      case "defeat":
        [64, 60, 57, 52].forEach((midi, index) => {
          this.tone(NOTE(midi), now + index * 0.18, 0.65, 0.1, "sine", this.sfxGain);
        });
        break;
      case "claim":
        [72, 76, 79, 84].forEach((midi, index) => {
          this.tone(NOTE(midi), now + index * 0.07, 0.4, 0.08, "sine", this.sfxGain);
        });
        break;
      default:
        break;
    }
  }
}
