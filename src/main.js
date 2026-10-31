import * as THREE from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js'
import { buildWorld } from './world.js'
import { Weapon } from './weapon.js'
import { EnemyManager } from './enemy.js'
import { Effects } from './effects.js'
import { HUD } from './hud.js'
import { AudioEngine } from './audio.js'

// ---------------------------------------------------------------------------
// BLACKSITE // ZERO HOUR — game shell, player controller, combat loop.
// ---------------------------------------------------------------------------

const canvas = document.getElementById('scene')
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' })
renderer.setPixelRatio(1)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFShadowMap
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1.08
renderer.outputColorSpace = THREE.SRGBColorSpace

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(72, window.innerWidth / window.innerHeight, 0.03, 600)
camera.rotation.order = 'YXZ'
scene.add(camera)

const world = buildWorld(scene, renderer)
const effects = new Effects(scene)
const hud = new HUD()
const audio = new AudioEngine()
const weapon = new Weapon()
weapon.group.visible = false
camera.add(weapon.group)

let enemyManager
enemyManager = new EnemyManager(scene, {
  world,
  spawnPoints: world.spawnPoints,
  onPlayerDamage: (amount, source) => damagePlayer(amount, source),
  onKill: (enemy, headshot) => onEnemyKilled(enemy, headshot),
  onEnemyShoot: (from, to) => {
    effects.tracer(from, to, 0xffa24e, 0.75)
    audio.enemyShot(from.distanceTo(camera.position))
  },
  onImpact: (point, normal) => effects.impact(point, normal)
})

// ---- post processing ------------------------------------------------------
const composer = new EffectComposer(renderer)
composer.addPass(new RenderPass(scene, camera))
const bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.46, 0.62, 0.86)
composer.addPass(bloom)
composer.addPass(new OutputPass())

const GradeShader = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
  },
  vertexShader: /* glsl */`
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
  `,
  fragmentShader: /* glsl */`
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform vec2 uResolution;
    varying vec2 vUv;
    float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
    void main() {
      vec2 uv = vUv;
      vec2 d = uv - 0.5;
      float r = length(d);
      vec2 ca = d * r * 0.0022;
      vec3 col;
      col.r = texture2D(tDiffuse, uv + ca).r;
      col.g = texture2D(tDiffuse, uv).g;
      col.b = texture2D(tDiffuse, uv - ca).b;
      float l = dot(col, vec3(0.299, 0.587, 0.114));
      col = mix(vec3(l), col, 1.07);
      col = (col - 0.5) * 1.045 + 0.5;
      col += vec3(0.012, 0.007, 0.003) * (1.0 - l);
      float vig = smoothstep(0.86, 0.26, r);
      col *= mix(0.68, 1.0, vig);
      float grain = hash(uv * uResolution + fract(uTime) * 91.7) - 0.5;
      col += grain * 0.016;
      gl_FragColor = vec4(max(col, 0.0), 1.0);
    }
  `
}
const gradePass = new ShaderPass(GradeShader)
composer.addPass(gradePass)

// ---- state ----------------------------------------------------------------
const START = new THREE.Vector3(0, 0, 27)
const state = {
  mode: 'menu',
  time: 0,
  menuTime: 0,
  health: 100,
  score: 0,
  kills: 0,
  wave: 0,
  waveActive: false,
  waveGrace: 0,
  waveCooldown: 0,
  playerPos: START.clone(),
  velocity: new THREE.Vector3(),
  yaw: 0,
  pitch: -0.035,
  lookDX: 0,
  lookDY: 0,
  jumpY: 0,
  vy: 0,
  onGround: true,
  crouch: false,
  sprinting: false,
  ads: false,
  firing: false,
  shotCooldown: 0,
  emptyCooldown: 0,
  recoilPitch: 0,
  recoilYaw: 0,
  shake: 0,
  bobTime: 0,
  stepTimer: 0,
  lastDamage: -99,
  dead: false,
  pointerLocked: false,
  hadLock: false,
  eyeHeight: 1.68,
  spread: 0.012,
  fps: 0,
  fpsTimer: 0,
  frames: 0
}

const keys = Object.create(null)
const raycaster = new THREE.Raycaster()
const tmpVec = new THREE.Vector3()
const tmpVec2 = new THREE.Vector3()
const tmpDir = new THREE.Vector3()
const tmpOrigin = new THREE.Vector3()
const tmpRight = new THREE.Vector3()
const forward = new THREE.Vector3()
const right = new THREE.Vector3()

// ---- input ----------------------------------------------------------------
window.addEventListener('keydown', (e) => {
  if (e.repeat) return
  keys[e.code] = true
  if (e.code === 'KeyR' && state.mode === 'playing') startReload()
  if (e.code === 'Escape') {
    if (state.mode === 'playing') pauseGame()
    else if (state.mode === 'paused') resumeGame()
  }
  if (e.code === 'KeyM') audio.master && (audio.master.gain.value = audio.master.gain.value > 0 ? 0 : 0.55)
})
window.addEventListener('keyup', (e) => { keys[e.code] = false })

window.addEventListener('mousemove', (e) => {
  if (state.mode !== 'playing') return
  if (!state.pointerLocked) return
  const sens = state.ads ? 0.0015 : 0.0021
  state.yaw -= e.movementX * sens
  state.pitch -= e.movementY * sens
  state.pitch = Math.max(-1.42, Math.min(1.42, state.pitch))
  state.lookDX += e.movementX
  state.lookDY += e.movementY
})

canvas.addEventListener('mousedown', (e) => {
  if (state.mode !== 'playing') return
  if (e.button === 0) {
    if (!state.pointerLocked) requestLock()
    state.firing = true
  }
  if (e.button === 2) state.ads = true
})
window.addEventListener('mouseup', (e) => {
  if (e.button === 0) state.firing = false
  if (e.button === 2) state.ads = false
})
window.addEventListener('contextmenu', (e) => e.preventDefault())

document.addEventListener('pointerlockchange', () => {
  const locked = document.pointerLockElement === canvas
  state.pointerLocked = locked
  if (locked) state.hadLock = true
  else if (state.hadLock && state.mode === 'playing') pauseGame()
})

function requestLock() {
  try {
    const p = canvas.requestPointerLock()
    if (p && p.catch) p.catch(() => {})
  } catch (_) { /* pointer lock is optional; drag still works */ }
}

// ---- menu / flow ----------------------------------------------------------
document.getElementById('play').addEventListener('click', () => {
  audio.start()
  startGame()
})
document.getElementById('resume').addEventListener('click', () => { audio.ui(); resumeGame() })
document.getElementById('restart').addEventListener('click', () => { audio.ui(); restartGame() })
document.getElementById('restart-pause').addEventListener('click', () => { audio.ui(); restartGame() })

function startGame() {
  state.mode = 'playing'
  state.health = 100
  state.score = 0
  state.kills = 0
  state.wave = 0
  state.waveActive = false
  state.waveCooldown = 0.6
  state.dead = false
  state.playerPos.copy(START)
  state.velocity.set(0, 0, 0)
  state.yaw = 0
  state.pitch = -0.035
  state.jumpY = 0
  state.vy = 0
  state.onGround = true
  state.recoilPitch = 0
  state.recoilYaw = 0
  state.shake = 0
  state.lastDamage = -99
  state.crouch = false
  state.ads = false
  state.firing = false
  weapon.reset()
  weapon.group.visible = true
  enemyManager.reset()
  hud.show()
  hud.setHealth(100)
  hud.setAmmo(weapon.ammoInMag, weapon.reserveAmmo)
  hud.setScore(0)
  hud.setWave(1, 0)
  hud.banner('OPERATION ZERO HOUR', 'MOVE OUT', 'SECURE THE COMPOUND', 3)
  const menu = document.getElementById('menu')
  menu.classList.add('closing')
  window.setTimeout(() => { menu.style.display = 'none' }, 600)
  camera.fov = 72
  camera.updateProjectionMatrix()
  requestLock()
  audio.start()
  window.setTimeout(() => { if (state.mode === 'playing') startWave() }, 700)
}

function pauseGame() {
  if (state.mode !== 'playing') return
  state.mode = 'paused'
  state.firing = false
  state.ads = false
  weapon.setADS(false)
  document.getElementById('pause').classList.remove('hidden')
  if (document.pointerLockElement === canvas) document.exitPointerLock()
}

function resumeGame() {
  if (state.mode !== 'paused') return
  state.mode = 'playing'
  document.getElementById('pause').classList.add('hidden')
  requestLock()
}

function restartGame() {
  document.getElementById('death').classList.add('hidden')
  document.getElementById('pause').classList.add('hidden')
  state.mode = 'menu'
  startGame()
}

function die() {
  if (state.mode === 'dead') return
  state.mode = 'dead'
  state.dead = true
  state.firing = false
  state.ads = false
  weapon.setADS(false)
  if (document.pointerLockElement === canvas) document.exitPointerLock()
  hud.hide()
  weapon.group.visible = false
  document.getElementById('death-score').textContent = String(state.score)
  document.getElementById('death-kills').textContent = String(state.kills)
  document.getElementById('death-wave').textContent = String(state.wave)
  document.getElementById('death').classList.remove('hidden')
}

// ---- waves ----------------------------------------------------------------
function startWave() {
  if (state.mode !== 'playing') return
  state.wave++
  state.waveActive = true
  state.waveGrace = 3.5
  const count = Math.min(4 + state.wave * 2, 14)
  enemyManager.spawnWave(count)
  hud.setWave(state.wave, count)
  hud.banner('HOSTILE CONTACT', `WAVE ${String(state.wave).padStart(2, '0')}`, 'ENGAGE AT WILL', 2.8)
  audio.ui()
}

function checkWave(dt) {
  if (!state.waveActive) {
    if (state.waveCooldown > 0) {
      state.waveCooldown -= dt
      if (state.waveCooldown <= 0) startWave()
    }
    return
  }
  if (state.waveGrace > 0) { state.waveGrace -= dt; return }
  if (enemyManager.aliveCount === 0) {
    state.waveActive = false
    state.waveCooldown = 6
    const bonus = 250 * state.wave
    state.score += bonus
    hud.setScore(state.score)
    hud.setWave(state.wave, 0)
    hud.banner('SECTOR CLEAR', `WAVE ${String(state.wave).padStart(2, '0')} CLEARED`, `+${bonus} // REGROUP`, 3.4)
    audio.ui()
  } else {
    hud.setWave(state.wave, enemyManager.aliveCount)
  }
}

// ---- combat ---------------------------------------------------------------
function startReload() {
  if (weapon.isReloading) return
  if (weapon.ammoInMag >= 30 || weapon.reserveAmmo <= 0) return
  if (weapon.reload()) {
    hud.setReloading(true)
    audio.reload()
  }
}

function shoot() {
  if (state.shotCooldown > 0) return
  if (weapon.isReloading) return
  if (weapon.ammoInMag <= 0) {
    if (state.emptyCooldown <= 0) {
      audio.empty()
      state.emptyCooldown = 0.35
    }
    startReload()
    return
  }
  if (!weapon.fire()) return
  state.shotCooldown = 60 / weapon.rpm
  audio.shot()

  const adsKick = state.ads ? 0.65 : 1
  state.recoilPitch += (0.010 + Math.random() * 0.006) * adsKick
  state.recoilYaw += (Math.random() - 0.5) * 0.009 * adsKick
  state.shake = Math.min(0.07, state.shake + 0.006)

  const muzzle = weapon.getMuzzleWorldPosition(tmpVec)
  camera.getWorldPosition(tmpOrigin)
  camera.getWorldDirection(tmpDir)
  let spread = 0.011
  if (state.ads) spread = 0.0022
  const speed = Math.hypot(state.velocity.x, state.velocity.z)
  if (speed > 0.5) spread += state.ads ? 0.004 : 0.010
  if (state.sprinting) spread += 0.028
  if (!state.onGround) spread += 0.022
  if (state.crouch) spread *= 0.7
  tmpDir.x += (Math.random() - 0.5) * spread
  tmpDir.y += (Math.random() - 0.5) * spread
  tmpDir.z += (Math.random() - 0.5) * spread
  tmpDir.normalize()

  raycaster.set(tmpOrigin, tmpDir)
  raycaster.far = 140
  const targets = [...enemyManager.getTargets(), ...world.raycastMeshes]
  const hits = raycaster.intersectObjects(targets, false)
  const hit = hits.find(h => h.object.visible)
  let end = tmpOrigin.clone().addScaledVector(tmpDir, 90)
  if (hit) {
    end = hit.point.clone()
    const enemy = hit.object.userData?.enemy
    if (enemy) {
      const part = hit.object.userData.part || 'body'
      const wasAlive = enemy.alive !== false
      const result = enemyManager.damage(enemy, part, part === 'head' ? 130 : 36)
      const dead = result?.dead ?? (wasAlive && enemy.alive === false)
      const headshot = result?.headshot ?? part === 'head'
      effects.bloodAt(hit.point, tmpDir, headshot ? 14 : 8)
      hud.hit(dead)
      if (dead) audio.headshot()
      else audio.hit()
    } else {
      const normal = hit.face?.normal
        ? hit.face.normal.clone().transformDirection(hit.object.matrixWorld)
        : tmpDir.clone().negate()
      const surface = (hit.object.material?.metalness || 0) > 0.45 ? 'metal' : 'concrete'
      effects.impact(hit.point, normal, surface)
      audio.impact()
    }
  }
  effects.tracer(muzzle, end, 0xffd08a, 1)
}

function onEnemyKilled(enemy, headshot) {
  state.kills++
  state.score += headshot ? 150 : 100
  hud.setScore(state.score)
  hud.killfeed(headshot, 'INSURGENT')
  audio.kill()
}

function damagePlayer(amount, source) {
  if (state.mode !== 'playing') return
  state.health -= amount
  state.lastDamage = state.time
  state.shake = Math.min(0.18, state.shake + 0.045)
  hud.damage(amount)
  hud.setHealth(state.health)
  audio.hurt()
  if (state.health <= 0) {
    state.health = 0
    hud.setHealth(0)
    die()
  }
}

// ---- player update --------------------------------------------------------
function updatePlayer(dt) {
  const f = (keys.KeyW ? 1 : 0) - (keys.KeyS ? 1 : 0)
  const r = (keys.KeyD ? 1 : 0) - (keys.KeyA ? 1 : 0)
  state.crouch = !!(keys.ControlLeft || keys.ControlRight || keys.KeyC)
  state.sprinting = !!(keys.ShiftLeft || keys.ShiftRight) && f > 0 && !state.ads && !state.crouch

  forward.set(-Math.sin(state.yaw), 0, -Math.cos(state.yaw))
  right.set(Math.cos(state.yaw), 0, -Math.sin(state.yaw))
  const wish = tmpVec2.set(0, 0, 0)
  wish.addScaledVector(forward, f).addScaledVector(right, r)
  if (wish.lengthSq() > 0) wish.normalize()

  let speed = 5.1
  if (state.crouch) speed = 2.5
  else if (state.sprinting) speed = 7.8
  else if (state.ads) speed = 3.2
  if (state.sprinting && state.ads) speed = 3.2
  wish.multiplyScalar(speed)

  const accel = state.onGround ? 13 : 3.5
  const k = 1 - Math.exp(-accel * dt)
  state.velocity.x += (wish.x - state.velocity.x) * k
  state.velocity.z += (wish.z - state.velocity.z) * k

  state.playerPos.x += state.velocity.x * dt
  state.playerPos.z += state.velocity.z * dt
  world.collide(state.playerPos, 0.34)

  if (keys.Space && state.onGround && !state.crouch) {
    state.vy = 5.3
    state.onGround = false
  }
  if (!state.onGround) {
    state.jumpY += state.vy * dt
    state.vy -= 17 * dt
    if (state.jumpY <= 0) { state.jumpY = 0; state.vy = 0; state.onGround = true }
  }

  const targetEye = state.crouch ? 1.08 : 1.68
  state.eyeHeight += (targetEye - state.eyeHeight) * (1 - Math.exp(-12 * dt))

  const speedNow = Math.hypot(state.velocity.x, state.velocity.z)
  state.bobTime += dt * (2.4 + speedNow * 1.35)
  const bobAmt = Math.min(1, speedNow / 7) * (state.ads ? 0.18 : 1) * (state.onGround ? 1 : 0.25)
  const bobY = Math.sin(state.bobTime * 2) * 0.026 * bobAmt
  const bobX = Math.cos(state.bobTime) * 0.019 * bobAmt

  const eye = state.eyeHeight + state.jumpY
  camera.position.set(
    state.playerPos.x + right.x * bobX,
    eye + bobY,
    state.playerPos.z + right.z * bobX
  )

  // damage shake + recoil decay
  state.shake *= Math.exp(-5.5 * dt)
  state.recoilPitch *= Math.exp(-8.5 * dt)
  state.recoilYaw *= Math.exp(-9.5 * dt)
  const shakeP = (Math.random() - 0.5) * state.shake
  const shakeY = (Math.random() - 0.5) * state.shake
  camera.rotation.set(
    state.pitch + state.recoilPitch + shakeP,
    state.yaw + state.recoilYaw + shakeY,
    -r * 0.012 * Math.min(1, speedNow / 5)
  )

  // fov
  const targetFov = state.ads ? 52 : state.sprinting ? 80 : 72
  camera.fov += (targetFov - camera.fov) * (1 - Math.exp(-10 * dt))
  camera.updateProjectionMatrix()

  // footsteps
  if (state.onGround && speedNow > 1.1) {
    state.stepTimer -= dt * (state.sprinting ? 1.6 : 1)
    if (state.stepTimer <= 0) {
      audio.footstep()
      state.stepTimer = 0.42
    }
  } else state.stepTimer = 0.1

  // reload / auto reload
  if (weapon.ammoInMag === 0 && weapon.reserveAmmo > 0 && !weapon.isReloading && state.firing) startReload()
  if (!weapon.isReloading) hud.setReloading(false)

  // shooting
  state.shotCooldown = Math.max(0, state.shotCooldown - dt)
  state.emptyCooldown = Math.max(0, state.emptyCooldown - dt)
  if (state.firing && state.mode === 'playing') shoot()

  weapon.setADS(state.ads)
  weapon.update(dt, {
    moving: speedNow > 0.4,
    sprinting: state.sprinting,
    grounded: state.onGround,
    ads: state.ads,
    lookDeltaX: state.lookDX,
    lookDeltaY: state.lookDY
  })
  state.lookDX = 0
  state.lookDY = 0

  // health regen
  if (state.health > 0 && state.health < 100 && state.time - state.lastDamage > 4.2) {
    state.health = Math.min(100, state.health + 17 * dt)
    hud.setHealth(state.health)
  }

  // HUD
  hud.setAmmo(weapon.ammoInMag, weapon.reserveAmmo)
  hud.setADS(state.ads)
  state.spread = state.ads ? 0.0022 : 0.011 + Math.min(0.03, speedNow * 0.0035) + (state.sprinting ? 0.02 : 0)
  hud.setSpread(state.spread)
  hud.update(dt, state.playerPos, getEnemyList(), world.colliders, state.yaw)
}

function getEnemyList() {
  const seen = new Set()
  const list = []
  for (const m of enemyManager.getTargets()) {
    const e = m.userData?.enemy
    if (e && !seen.has(e)) { seen.add(e); list.push(e) }
  }
  return list
}

// ---- menu camera ----------------------------------------------------------
function updateMenu(dt) {
  state.menuTime += dt
  const t = state.menuTime * 0.055 + 0.7
  const radius = 33
  camera.position.set(Math.sin(t) * radius, 10.5 + Math.sin(t * 0.7) * 0.6, Math.cos(t) * radius)
  camera.lookAt(0, 2.6, 0)
  camera.fov = 56
  camera.updateProjectionMatrix()
  world.update(dt, null)
}

// ---- main loop ------------------------------------------------------------
let last = performance.now()
function frame(now) {
  requestAnimationFrame(frame)
  const dt = Math.min(0.05, Math.max(0.0001, (now - last) / 1000))
  last = now
  state.time += dt

  if (state.mode === 'playing') {
    updatePlayer(dt)
    checkWave(dt)
  } else if (state.mode === 'menu') {
    updateMenu(dt)
  } else {
    // paused / dead: keep the world alive, hide the weapon while dead
    world.update(dt, state.playerPos)
    if (state.mode === 'paused') {
      weapon.update(dt, { moving: false, sprinting: false, grounded: true, ads: false, lookDeltaX: 0, lookDeltaY: 0 })
    }
  }

  effects.update(dt)
  audio.update(dt)
  gradePass.uniforms.uTime.value = state.time
  composer.render()

  state.frames++
  state.fpsTimer += dt
  if (state.fpsTimer > 0.5) {
    state.fps = Math.round(state.frames / state.fpsTimer)
    state.frames = 0
    state.fpsTimer = 0
    if (state.mode === 'playing') hud.el.fps.textContent = `${state.fps} FPS`
  }
}

window.addEventListener('resize', () => {
  const w = window.innerWidth, h = window.innerHeight
  renderer.setPixelRatio(1)
  renderer.setSize(w, h)
  composer.setSize(w, h)
  camera.aspect = w / h
  camera.updateProjectionMatrix()
  gradePass.uniforms.uResolution.value.set(w, h)
})

// ---- boot -----------------------------------------------------------------
function boot() {
  const loading = document.getElementById('loading')
  loading.classList.add('done')
  window.setTimeout(() => loading.classList.add('hidden'), 550)
  requestAnimationFrame(frame)
}

window.setTimeout(boot, 80)
