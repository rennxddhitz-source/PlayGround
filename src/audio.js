// ---------------------------------------------------------------------------
// Procedural WebAudio soundscape. No sample files: gunfire, impacts, footsteps,
// wind and UI cues are synthesised. The context starts on the first user click.
// ---------------------------------------------------------------------------

export class AudioEngine {
  constructor() {
    this.ctx = null
    this.master = null
    this.started = false
    this.stepTimer = 0
    this.enemyShotCooldown = 0
  }

  start() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') this.ctx.resume()
      return
    }
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return
    this.ctx = new AC()
    this.master = this.ctx.createGain()
    this.master.gain.value = 0.55
    const comp = this.ctx.createDynamicsCompressor()
    comp.threshold.value = -18
    comp.knee.value = 20
    comp.ratio.value = 6
    comp.attack.value = 0.003
    comp.release.value = 0.18
    this.master.connect(comp).connect(this.ctx.destination)
    this.noise = this.makeNoise(2)
    this.started = true
    this.ambient()
  }

  makeNoise(seconds = 1) {
    const len = Math.floor(this.ctx.sampleRate * seconds)
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate)
    const data = buf.getChannelData(0)
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1
    return buf
  }

  ambient() {
    const ctx = this.ctx
    const src = ctx.createBufferSource()
    src.buffer = this.noise
    src.loop = true
    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 380
    lp.Q.value = 0.4
    const gain = ctx.createGain()
    gain.gain.value = 0.05
    src.connect(lp).connect(gain).connect(this.master)
    src.start()
    // slow wind swell
    const lfo = ctx.createOscillator()
    lfo.frequency.value = 0.07
    const lfoGain = ctx.createGain()
    lfoGain.gain.value = 0.025
    lfo.connect(lfoGain).connect(gain.gain)
    lfo.start()
  }

  noiseBurst({ duration = 0.12, gain = 0.5, freq = 900, q = 0.7, type = 'bandpass', pan = 0 } = {}) {
    if (!this.started) return
    const ctx = this.ctx
    const src = ctx.createBufferSource()
    src.buffer = this.noise
    const filter = ctx.createBiquadFilter()
    filter.type = type
    filter.frequency.value = freq
    filter.Q.value = q
    const g = ctx.createGain()
    const t = ctx.currentTime
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(gain, t + 0.005)
    g.gain.exponentialRampToValueAtTime(0.0001, t + duration)
    const p = ctx.createStereoPanner()
    p.pan.value = pan
    src.connect(filter).connect(g).connect(p).connect(this.master)
    src.start(t)
    src.stop(t + duration + 0.02)
  }

  tone({ freq = 200, end = 60, duration = 0.2, gain = 0.4, type = 'sine', pan = 0 } = {}) {
    if (!this.started) return
    const ctx = this.ctx
    const o = ctx.createOscillator()
    o.type = type
    const g = ctx.createGain()
    const t = ctx.currentTime
    o.frequency.setValueAtTime(freq, t)
    o.frequency.exponentialRampToValueAtTime(Math.max(20, end), t + duration)
    g.gain.setValueAtTime(gain, t)
    g.gain.exponentialRampToValueAtTime(0.0001, t + duration)
    const p = ctx.createStereoPanner()
    p.pan.value = pan
    o.connect(g).connect(p).connect(this.master)
    o.start(t)
    o.stop(t + duration + 0.02)
  }

  shot() {
    if (!this.started) return
    this.noiseBurst({ duration: 0.16, gain: 0.75, freq: 1400, q: 0.6 })
    this.noiseBurst({ duration: 0.5, gain: 0.25, freq: 500, q: 0.4 })
    this.tone({ freq: 150, end: 42, duration: 0.18, gain: 0.55, type: 'triangle' })
    this.tone({ freq: 2400, end: 600, duration: 0.05, gain: 0.09, type: 'square' })
  }

  enemyShot(distance = 20) {
    if (!this.started) return
    if (this.enemyShotCooldown > 0) return
    this.enemyShotCooldown = 0.05
    const vol = Math.max(0.08, 0.5 - distance * 0.012)
    const pan = (Math.random() - 0.5) * 0.7
    this.noiseBurst({ duration: 0.13, gain: vol, freq: 900, q: 0.5, pan })
    this.tone({ freq: 120, end: 45, duration: 0.16, gain: vol * 0.7, type: 'triangle', pan })
  }

  hit() {
    this.tone({ freq: 1600, end: 1200, duration: 0.045, gain: 0.15, type: 'square' })
  }

  headshot() {
    this.tone({ freq: 2400, end: 1800, duration: 0.06, gain: 0.18, type: 'square' })
    this.tone({ freq: 1200, end: 900, duration: 0.08, gain: 0.12, type: 'sine' })
  }

  kill() {
    this.tone({ freq: 520, end: 720, duration: 0.09, gain: 0.1, type: 'sine' })
  }

  hurt() {
    this.noiseBurst({ duration: 0.2, gain: 0.35, freq: 220, q: 0.8 })
    this.tone({ freq: 90, end: 55, duration: 0.25, gain: 0.3, type: 'sine' })
  }

  reload() {
    if (!this.started) return
    const click = (delay, freq, gain) => {
      window.setTimeout(() => this.noiseBurst({ duration: 0.035, gain, freq, q: 3 }), delay * 1000)
    }
    click(0.12, 2200, 0.18)
    click(0.55, 1400, 0.22)
    click(1.15, 900, 0.3)
    click(1.55, 1800, 0.2)
  }

  empty() {
    this.noiseBurst({ duration: 0.04, gain: 0.22, freq: 2600, q: 4 })
  }

  footstep() {
    this.noiseBurst({ duration: 0.08, gain: 0.12, freq: 240, q: 0.8 })
  }

  impact() {
    this.noiseBurst({ duration: 0.06, gain: 0.1, freq: 1800, q: 1 })
  }

  explosion() {
    this.noiseBurst({ duration: 0.8, gain: 0.9, freq: 180, q: 0.4 })
    this.tone({ freq: 80, end: 30, duration: 0.9, gain: 0.7, type: 'sine' })
  }

  ui() {
    this.tone({ freq: 900, end: 1100, duration: 0.05, gain: 0.08, type: 'sine' })
  }

  update(dt) {
    if (this.enemyShotCooldown > 0) this.enemyShotCooldown -= dt
  }
}
