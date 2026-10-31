import * as THREE from 'three'

// ---------------------------------------------------------------------------
// Procedural texture library. Everything is generated in-browser so the build
// has no external art dependencies. Textures are cached by key.
// ---------------------------------------------------------------------------

const cache = new Map()

function canvas(size) {
  const c = document.createElement('canvas')
  c.width = c.height = size
  return c
}

function rng(seed) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

function hash2(x, y, seed) {
  const n = Math.sin(x * 127.1 + y * 311.7 + seed * 74.7) * 43758.5453
  return n - Math.floor(n)
}

function smooth(t) { return t * t * (3 - 2 * t) }

function valueNoise(x, y, seed) {
  const xi = Math.floor(x), yi = Math.floor(y)
  const xf = smooth(x - xi), yf = smooth(y - yi)
  const a = hash2(xi, yi, seed), b = hash2(xi + 1, yi, seed)
  const c = hash2(xi, yi + 1, seed), d = hash2(xi + 1, yi + 1, seed)
  return (a + (b - a) * xf) * (1 - yf) + (c + (d - c) * xf) * yf
}

function fbm(x, y, seed, octaves = 4, gain = 0.5) {
  let v = 0, amp = 0.5, freq = 1
  for (let i = 0; i < octaves; i++) {
    v += amp * valueNoise(x * freq, y * freq, seed + i * 17)
    freq *= 2.03
    amp *= gain
  }
  return v
}

function heightToNormal(src, strength = 2.2) {
  const size = src.width
  const out = canvas(size)
  const ctx = out.getContext('2d')
  const sctx = src.getContext('2d')
  const data = sctx.getImageData(0, 0, size, size).data
  const img = ctx.createImageData(size, size)
  const h = (x, y) => {
    x = (x + size) % size; y = (y + size) % size
    return data[(y * size + x) * 4] / 255
  }
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = (h(x + 1, y) - h(x - 1, y)) * strength
      const dy = (h(x, y + 1) - h(x, y - 1)) * strength
      const nx = -dx, ny = -dy, nz = 1
      const len = Math.hypot(nx, ny, nz)
      const i = (y * size + x) * 4
      img.data[i] = (nx / len * 0.5 + 0.5) * 255
      img.data[i + 1] = (ny / len * 0.5 + 0.5) * 255
      img.data[i + 2] = (nz / len * 0.5 + 0.5) * 255
      img.data[i + 3] = 255
    }
  }
  ctx.putImageData(img, 0, 0)
  return out
}

function makeTexture(source, { srgb = true, repeat = 1, aniso = 8 } = {}) {
  const t = new THREE.CanvasTexture(source)
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  t.repeat.set(repeat, repeat)
  t.anisotropy = aniso
  if (srgb) t.colorSpace = THREE.SRGBColorSpace
  t.needsUpdate = true
  return t
}

function shade(hex, f) {
  const c = new THREE.Color(hex)
  c.multiplyScalar(f)
  return `#${c.getHexString()}`
}

// ---- Sand -----------------------------------------------------------------

function sandCanvas(seed = 11) {
  const size = 256
  const c = canvas(size), ctx = c.getContext('2d')
  const rand = rng(seed)
  const img = ctx.createImageData(size, size)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const n = fbm(x / 21, y / 21, seed, 3)
      const ripple = Math.sin((x * 0.055) + fbm(x / 30, y / 30, seed + 3) * 5.5) * 0.045
      const grit = (rand() - 0.5) * 0.16
      const v = 0.55 + n * 0.28 + ripple + grit
      const i = (y * size + x) * 4
      img.data[i] = Math.min(255, 180 * v + 38)
      img.data[i + 1] = Math.min(255, 142 * v + 28)
      img.data[i + 2] = Math.min(255, 98 * v + 18)
      img.data[i + 3] = 255
    }
  }
  ctx.putImageData(img, 0, 0)
  // pebbles
  for (let i = 0; i < 180; i++) {
    const x = rand() * size, y = rand() * size, r = 0.6 + rand() * 2.6
    ctx.fillStyle = rand() > 0.55 ? 'rgba(60,44,30,0.30)' : 'rgba(220,190,145,0.28)'
    ctx.beginPath(); ctx.ellipse(x, y, r, r * (0.6 + rand() * 0.6), rand() * 6, 0, Math.PI * 2); ctx.fill()
  }
  // dry cracks
  ctx.lineWidth = 0.8
  for (let i = 0; i < 16; i++) {
    let x = rand() * size, y = rand() * size
    ctx.strokeStyle = `rgba(58,40,26,${0.10 + rand() * 0.18})`
    ctx.beginPath(); ctx.moveTo(x, y)
    for (let s = 0; s < 30; s++) {
      x += (rand() - 0.5) * 16; y += (rand() - 0.5) * 16
      ctx.lineTo(x, y)
    }
    ctx.stroke()
  }
  return c
}

// ---- Concrete -------------------------------------------------------------

function concreteCanvas(seed = 5, tint = '#8b8374') {
  const size = 256
  const c = canvas(size), ctx = c.getContext('2d')
  const rand = rng(seed)
  const base = new THREE.Color(tint)
  const img = ctx.createImageData(size, size)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const n = fbm(x / 28, y / 28, seed, 3)
      const fine = (rand() - 0.5) * 0.11
      const streak = Math.sin(x * 0.02 + fbm(x / 90, y / 24, seed + 7) * 7) * 0.02
      const v = 0.74 + n * 0.24 + fine + streak
      const i = (y * size + x) * 4
      img.data[i] = base.r * 255 * v
      img.data[i + 1] = base.g * 255 * v
      img.data[i + 2] = base.b * 255 * v
      img.data[i + 3] = 255
    }
  }
  ctx.putImageData(img, 0, 0)
  // form-work seams
  ctx.strokeStyle = 'rgba(40,36,30,0.18)'; ctx.lineWidth = 1.4
  for (let y = 64; y < size; y += 128) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(size, y); ctx.stroke()
  }
  // stains
  for (let i = 0; i < 28; i++) {
    const x = rand() * size, y = rand() * size, r = 8 + rand() * 55
    const g = ctx.createRadialGradient(x, y, 0, x, y, r)
    g.addColorStop(0, `rgba(38,34,27,${0.04 + rand() * 0.12})`)
    g.addColorStop(1, 'rgba(38,34,27,0)')
    ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2)
  }
  // cracks + chips
  for (let i = 0; i < 11; i++) {
    let x = rand() * size, y = rand() * size
    ctx.strokeStyle = `rgba(30,27,22,${0.22 + rand() * 0.25})`; ctx.lineWidth = 0.7 + rand()
    ctx.beginPath(); ctx.moveTo(x, y)
    for (let s = 0; s < 24; s++) {
      x += (rand() - 0.5) * 22; y += (rand() - 0.45) * 18
      ctx.lineTo(x, y)
    }
    ctx.stroke()
  }
  return c
}

// ---- Corrugated container -------------------------------------------------

function containerCanvas(seed = 21, tint = '#4c5546') {
  const size = 256
  const c = canvas(size), ctx = c.getContext('2d')
  const rand = rng(seed)
  const base = new THREE.Color(tint)
  const img = ctx.createImageData(size, size)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const rib = Math.sin(x * Math.PI * 2 / 32)
      const n = fbm(x / 30, y / 30, seed, 3)
      const scratch = rand() > 0.997 ? -0.25 : 0
      const v = 0.82 + rib * 0.075 + (n - 0.5) * 0.18 + scratch
      const i = (y * size + x) * 4
      img.data[i] = base.r * 255 * v
      img.data[i + 1] = base.g * 255 * v
      img.data[i + 2] = base.b * 255 * v
      img.data[i + 3] = 255
    }
  }
  ctx.putImageData(img, 0, 0)
  // rust streaks
  for (let i = 0; i < 26; i++) {
    const x = rand() * size, y = rand() * size * 0.75
    const h = 20 + rand() * 150
    const g = ctx.createLinearGradient(0, y, 0, y + h)
    g.addColorStop(0, `rgba(96,52,24,${0.16 + rand() * 0.28})`)
    g.addColorStop(1, 'rgba(96,52,24,0)')
    ctx.fillStyle = g; ctx.fillRect(x, y, 2 + rand() * 7, h)
  }
  // paint chips
  for (let i = 0; i < 70; i++) {
    ctx.fillStyle = `rgba(120,112,96,${0.10 + rand() * 0.25})`
    ctx.fillRect(rand() * size, rand() * size, 1 + rand() * 4, 1 + rand() * 2)
  }
  return c
}

// ---- Metal ----------------------------------------------------------------

function metalCanvas(seed = 31, tint = '#5d6062') {
  const size = 256
  const c = canvas(size), ctx = c.getContext('2d')
  const rand = rng(seed)
  const base = new THREE.Color(tint)
  const img = ctx.createImageData(size, size)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const brush = (hash2(0, y, seed) - 0.5) * 0.09 + (rand() - 0.5) * 0.06
      const n = fbm(x / 40, y / 20, seed, 3)
      const v = 0.8 + brush + (n - 0.5) * 0.22
      const i = (y * size + x) * 4
      img.data[i] = base.r * 255 * v
      img.data[i + 1] = base.g * 255 * v
      img.data[i + 2] = base.b * 255 * v
      img.data[i + 3] = 255
    }
  }
  ctx.putImageData(img, 0, 0)
  for (let i = 0; i < 55; i++) {
    ctx.strokeStyle = `rgba(210,205,195,${0.05 + rand() * 0.16})`
    ctx.lineWidth = 0.5 + rand()
    const y = rand() * size, x = rand() * size
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 10 + rand() * 60, y + (rand() - 0.5) * 2); ctx.stroke()
  }
  for (let i = 0; i < 14; i++) {
    const x = rand() * size, y = rand() * size, r = 4 + rand() * 26
    const g = ctx.createRadialGradient(x, y, 0, x, y, r)
    g.addColorStop(0, `rgba(92,48,20,${0.12 + rand() * 0.22})`)
    g.addColorStop(1, 'rgba(92,48,20,0)')
    ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2)
  }
  return c
}

// ---- Wood -----------------------------------------------------------------

function woodCanvas(seed = 41) {
  const size = 256
  const c = canvas(size), ctx = c.getContext('2d')
  const rand = rng(seed)
  const img = ctx.createImageData(size, size)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const grain = Math.sin((x + fbm(x / 60, y / 12, seed) * 55) * 0.09) * 0.09
      const n = fbm(x / 15, y / 45, seed, 3)
      const v = 0.58 + n * 0.34 + grain
      const i = (y * size + x) * 4
      img.data[i] = 112 * v + 32
      img.data[i + 1] = 78 * v + 20
      img.data[i + 2] = 46 * v + 12
      img.data[i + 3] = 255
    }
  }
  ctx.putImageData(img, 0, 0)
  ctx.strokeStyle = 'rgba(30,18,10,0.45)'; ctx.lineWidth = 2
  for (let y = 0; y < size; y += 128) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(size, y); ctx.stroke() }
  for (let i = 0; i < 12; i++) {
    ctx.fillStyle = 'rgba(25,15,8,0.35)'
    ctx.beginPath(); ctx.ellipse(rand() * size, rand() * size, 3 + rand() * 6, 1 + rand() * 3, 0, 0, 6); ctx.fill()
  }
  return c
}

// ---- HESCO / gabion -------------------------------------------------------

function hescoCanvas(seed = 51, tint = '#9a8567') {
  const size = 256
  const c = canvas(size), ctx = c.getContext('2d')
  const base = new THREE.Color(tint)
  const rand = rng(seed)
  const img = ctx.createImageData(size, size)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const n = fbm(x / 14, y / 14, seed, 3)
      const pebble = rand() > 0.94 ? 0.13 : 0
      const v = 0.72 + n * 0.3 + pebble
      const i = (y * size + x) * 4
      img.data[i] = base.r * 255 * v
      img.data[i + 1] = base.g * 255 * v
      img.data[i + 2] = base.b * 255 * v
      img.data[i + 3] = 255
    }
  }
  ctx.putImageData(img, 0, 0)
  // basket seams
  ctx.strokeStyle = 'rgba(55,45,32,0.38)'; ctx.lineWidth = 2
  for (let y = 0; y < size; y += 128) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(size, y); ctx.stroke() }
  for (let x = 0; x < size; x += 128) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, size); ctx.stroke() }
  // wire mesh
  ctx.strokeStyle = 'rgba(40,36,30,0.15)'; ctx.lineWidth = 1
  for (let i = -size; i < size; i += 26) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i + size, size); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(i, size); ctx.lineTo(i + size, 0); ctx.stroke()
  }
  return c
}

// ---- Decals ---------------------------------------------------------------

export function makeDecal(kind = 'stain', seed = 61) {
  const key = `decal:${kind}:${seed}`
  if (cache.has(key)) return cache.get(key)
  const size = 256
  const c = canvas(size), ctx = c.getContext('2d')
  const rand = rng(seed)
  ctx.clearRect(0, 0, size, size)
  if (kind === 'stain') {
    for (let i = 0; i < 8; i++) {
      const x = size / 2 + (rand() - 0.5) * 70, y = size / 2 + (rand() - 0.5) * 70
      const r = 30 + rand() * 55
      const g = ctx.createRadialGradient(x, y, 0, x, y, r)
      g.addColorStop(0, 'rgba(22,18,14,0.55)')
      g.addColorStop(0.65, 'rgba(28,23,18,0.22)')
      g.addColorStop(1, 'rgba(28,23,18,0)')
      ctx.fillStyle = g; ctx.fillRect(0, 0, size, size)
    }
  } else if (kind === 'crack') {
    for (let i = 0; i < 5; i++) {
      let x = rand() * size, y = rand() * size
      ctx.strokeStyle = `rgba(15,12,9,${0.5 + rand() * 0.4})`
      ctx.lineWidth = 1 + rand() * 2
      ctx.beginPath(); ctx.moveTo(x, y)
      for (let s = 0; s < 40; s++) {
        x += (rand() - 0.5) * 20; y += (rand() - 0.5) * 20
        ctx.lineTo(x, y)
      }
      ctx.stroke()
    }
  } else if (kind === 'scorch') {
    const g = ctx.createRadialGradient(size / 2, size / 2, 5, size / 2, size / 2, size / 2)
    g.addColorStop(0, 'rgba(8,7,6,0.85)')
    g.addColorStop(0.55, 'rgba(14,12,10,0.45)')
    g.addColorStop(1, 'rgba(20,18,15,0)')
    ctx.fillStyle = g; ctx.fillRect(0, 0, size, size)
  }
  const tex = makeTexture(c, { srgb: true, repeat: 1 })
  tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping
  cache.set(key, tex)
  return tex
}

// ---- Public surface sets --------------------------------------------------

function surfaceSet(key, colorCanvas, normalStrength, roughCanvas) {
  if (cache.has(key)) return cache.get(key)
  const set = {
    map: makeTexture(colorCanvas, { srgb: true }),
    normalMap: makeTexture(heightToNormal(colorCanvas, normalStrength), { srgb: false }),
    roughnessMap: makeTexture(roughCanvas || colorCanvas, { srgb: false })
  }
  cache.set(key, set)
  return set
}

export function sandSurface() {
  return surfaceSet('sand', sandCanvas(), 1.4)
}

export function concreteSurface(tint = '#8b8374', seed = 5) {
  return surfaceSet(`concrete:${tint}:${seed}`, concreteCanvas(seed, tint), 2.0)
}

export function containerSurface(tint = '#4c5546', seed = 21) {
  return surfaceSet(`container:${tint}:${seed}`, containerCanvas(seed, tint), 3.4)
}

export function metalSurface(tint = '#5d6062', seed = 31) {
  return surfaceSet(`metal:${tint}:${seed}`, metalCanvas(seed, tint), 0.7)
}

export function woodSurface() {
  return surfaceSet('wood', woodCanvas(), 1.2)
}

export function hescoSurface(tint = '#9a8567', seed = 51) {
  return surfaceSet(`hesco:${tint}:${seed}`, hescoCanvas(seed, tint), 2.6)
}

// Clone a texture set and set repeat without mutating the cached originals.
export function repeatSet(set, x, y = x) {
  const out = {}
  for (const [k, v] of Object.entries(set)) {
    const t = v.clone()
    t.wrapS = t.wrapT = THREE.RepeatWrapping
    t.repeat.set(x, y)
    t.needsUpdate = true
    out[k] = t
  }
  return out
}

// A tiny noise texture used for particle sprites / smoke puffs.
export function puffTexture() {
  if (cache.has('puff')) return cache.get('puff')
  const size = 128
  const c = canvas(size), ctx = c.getContext('2d')
  const g = ctx.createRadialGradient(size / 2, size / 2, 2, size / 2, size / 2, size / 2)
  g.addColorStop(0, 'rgba(255,255,255,0.9)')
  g.addColorStop(0.45, 'rgba(255,255,255,0.35)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g; ctx.fillRect(0, 0, size, size)
  const t = makeTexture(c, { srgb: true })
  t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping
  cache.set('puff', t)
  return t
}
