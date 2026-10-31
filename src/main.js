import * as THREE from 'three';
import { createWorld } from './world.js';
import { FX } from './fx.js';
import { AudioEngine } from './audio.js';
import { HUD } from './hud.js';
import { Player } from './player.js';
import { Weapon } from './weapon.js';
import { EnemyManager } from './enemies.js';
import { createPost } from './post.js';

const params = new URLSearchParams(location.search);
const CAPTURE = params.get('capture') === '1';

const canvas = document.getElementById('scene');
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: false,
  powerPreference: 'high-performance',
  stencil: false,
});
renderer.setPixelRatio(CAPTURE ? 1 : Math.min(window.devicePixelRatio || 1, 1.5));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.16;
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(76, window.innerWidth / window.innerHeight, 0.03, 320);
scene.add(camera);

const world = createWorld(renderer, scene);
world.attachCamera(camera);

const fx = new FX(scene);
const audio = new AudioEngine();
const hud = new HUD();
const player = new Player(camera, world, audio, hud);

let score = 0;
let kills = 0;
let wave = 1;
let waveActive = false;
let intermission = 0;
let state = 'menu';
let hadLock = false;
let started = false;
let elapsed = 0;

const enemies = new EnemyManager(scene, world, fx, audio, player, hud, {
  onKill: (enemy, head) => {
    score += head ? 150 : 100;
    kills++;
    hud.setStats({ score, hostiles: enemies.remaining() });
  },
});

const weapon = new Weapon(camera, scene, world, enemies, fx, audio, hud, player, {
  onKill: () => {},
});

const post = createPost(renderer, scene, camera);

const screenFade = document.getElementById('flash');
const menu = document.getElementById('menu');
const pauseEl = document.getElementById('pause');
const gameoverEl = document.getElementById('gameover');
const loadingEl = document.getElementById('loading');

const keys = Object.create(null);
let mouseFire = false;
let mouseAds = false;

/* ------------------------------------------------------------- game flow */
function startWave(n) {
  wave = n;
  waveActive = true;
  intermission = 0;
  const count = Math.min(14, 3 + Math.floor(n * 1.4));
  enemies.spawnWave(n, count);
  hud.setStats({ wave, hostiles: enemies.remaining(), score });
  hud.banner(`WAVE ${String(n).padStart(2, '0')}`, n === 1 ? 'HOSTILES INBOUND' : 'REINFORCEMENTS DETECTED', 2400);
  audio.wave();
}

function beginGame() {
  audio.unlock();
  audio.ambient();
  menu.classList.add('hidden');
  pauseEl.classList.add('hidden');
  gameoverEl.classList.add('hidden');
  hud.show();
  player.reset();
  weapon.reset();
  weapon.root.visible = true;
  enemies.reset();
  score = 0;
  kills = 0;
  state = 'playing';
  started = true;
  hud.setStats({ wave: 1, hostiles: 0, score: 0 });
  hud.setHealth(100);
  hud.setAmmo(weapon.mag, weapon.reserve);
  startWave(1);
  canvas.requestPointerLock?.();
}

function deploy() {
  beginGame();
}

function pauseGame() {
  if (state !== 'playing') return;
  state = 'paused';
  mouseFire = false;
  mouseAds = false;
  player.setAds(false);
  pauseEl.classList.remove('hidden');
}

function resumeGame() {
  if (state !== 'paused') return;
  pauseEl.classList.add('hidden');
  state = 'playing';
  canvas.requestPointerLock?.();
}

function gameOver() {
  if (state === 'dead') return;
  state = 'dead';
  mouseFire = false;
  mouseAds = false;
  document.exitPointerLock?.();
  hud.hideBanner();
  audio.gameOver();
  setTimeout(() => {
    document.getElementById('final-wave').textContent = String(wave).padStart(2, '0');
    document.getElementById('final-score').textContent = String(score).padStart(6, '0');
    document.getElementById('final-kills').textContent = String(kills).padStart(2, '0');
    gameoverEl.classList.remove('hidden');
  }, 900);
}

function restart() {
  gameoverEl.classList.add('hidden');
  beginGame();
}

/* ---------------------------------------------------------------- events */
document.getElementById('deploy').addEventListener('click', deploy);
document.getElementById('resume').addEventListener('click', resumeGame);
document.getElementById('restart').addEventListener('click', restart);

document.addEventListener('pointerlockchange', () => {
  if (CAPTURE) return;
  const locked = document.pointerLockElement === canvas;
  if (locked) {
    hadLock = true;
    if (state === 'paused') {
      pauseEl.classList.add('hidden');
      state = 'playing';
    }
  } else if (hadLock) {
    hadLock = false;
    if (state === 'playing') pauseGame();
  }
});

document.addEventListener('mousemove', (e) => {
  if (document.pointerLockElement === canvas && state === 'playing') {
    player.look(e.movementX, e.movementY);
  }
});

document.addEventListener('mousedown', (e) => {
  if (state !== 'playing') return;
  audio.unlock();
  if (e.button === 0) mouseFire = true;
  if (e.button === 2) {
    mouseAds = true;
    player.setAds(true);
  }
});

document.addEventListener('mouseup', (e) => {
  if (e.button === 0) mouseFire = false;
  if (e.button === 2) {
    mouseAds = false;
    player.setAds(false);
  }
});

document.addEventListener('contextmenu', (e) => e.preventDefault());

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'ArrowDown') e.preventDefault();
  keys[e.code] = true;
  if (e.code === 'KeyR' && state === 'playing') weapon.startReload();
  if (e.code === 'Escape') {
    if (state === 'playing' && !document.pointerLockElement) pauseGame();
  }
});

document.addEventListener('keyup', (e) => { keys[e.code] = false; });

window.addEventListener('blur', () => {
  mouseFire = false;
  mouseAds = false;
  for (const k in keys) keys[k] = false;
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  post.resize();
});

/* -------------------------------------------------------------- capture */
let captureEnemies = false;
function setupCapture() {
  menu.classList.add('hidden');
  pauseEl.classList.add('hidden');
  loadingEl.classList.add('done');
  hud.show();
  state = 'playing';
  started = true;

  player.reset();
  player.pos.set(0, 0, 20);
  player.yaw = 0.02;
  player.pitch = -0.02;
  player.health = 86;
  hud.setHealth(86);

  score = 0;
  kills = 0;
  hud.setStats({ wave: 1, hostiles: 3, score: 0 });
  hud.banner('WAVE 01', 'HOSTILES INBOUND', 0);
  weapon.reset();
  weapon.root.visible = true;

  const spots = [
    new THREE.Vector3(-3.6, 0, 6.5),
    new THREE.Vector3(2.4, 0, 3.2),
    new THREE.Vector3(7.2, 0, 8.4),
  ];
  for (const p of spots) {
    enemies.spawnEnemy(p, 1);
    const e = enemies.enemies[enemies.enemies.length - 1];
    e.state = 'active';
    e.group.scale.set(1.1, 1.1, 1.1);
    e.group.rotation.y = Math.PI;
    e.nextShot = 2.6;
  }
  captureEnemies = true;
  waveActive = true;
}

/* ----------------------------------------------------------------- loop */
let lastTime = performance.now();
let firstFrame = true;
let hudTimer = 0;

function inputState() {
  return {
    forward: !!(keys.KeyW || keys.ArrowUp),
    back: !!(keys.KeyS || keys.ArrowDown),
    left: !!(keys.KeyA || keys.ArrowLeft),
    right: !!(keys.KeyD || keys.ArrowRight),
    sprint: !!(keys.ShiftLeft || keys.ShiftRight),
    crouch: !!(keys.ControlLeft || keys.ControlRight),
    jump: !!keys.Space,
    fire: mouseFire,
    ads: mouseAds,
  };
}

function animate(now = performance.now()) {
  requestAnimationFrame(animate);
  const dt = Math.min(0.05, Math.max(0, (now - lastTime) / 1000));
  lastTime = now;
  elapsed += dt;

  if (state === 'playing' || state === 'dead') {
    player.setAds(mouseAds && player.alive);
    player.update(dt, inputState());

    if (player.alive) {
      weapon.update(dt, inputState());
    }

    enemies.update(dt, elapsed);

    if (state === 'playing') {
      // wave clear / intermission
      if (waveActive && enemies.remaining() === 0) {
        waveActive = false;
        intermission = 4.2;
        hud.banner('SECTOR CLEARED', 'REARM — HOSTILES INBOUND', 2600);
        hud.setStats({ hostiles: 0 });
      }
      if (!waveActive && intermission > 0) {
        intermission -= dt;
        if (intermission <= 0) startWave(wave + 1);
      }
      if (!player.alive) gameOver();
    }

    hud.fps(dt);
    hudTimer -= dt;
    if (hudTimer <= 0) {
      hudTimer = 0.2;
      hud.setStats({ hostiles: Math.max(0, enemies.remaining()) });
      if (state === 'playing' && player.alive) {
        hud.setStats({ score });
      }
    }
  } else if (state === 'menu') {
    // slow idle camera drift behind the menu
    const t = elapsed;
    camera.position.set(Math.sin(t * 0.08) * 1.8, 1.72 + Math.sin(t * 0.11) * 0.03, 20);
    camera.rotation.order = 'YXZ';
    camera.rotation.set(-0.02, Math.sin(t * 0.07) * 0.22, 0);
  }

  world.update(dt, elapsed);
  fx.update(dt);
  post.render(dt, elapsed, state === 'dead' ? 0.55 : Math.max(0, (60 - player.health) / 100) * 0.35);

  if (firstFrame) {
    firstFrame = false;
    loadingEl.classList.add('done');
    setTimeout(() => loadingEl.remove(), 700);
  }
}

if (CAPTURE) {
  setupCapture();
  // make sure the pointer is not needed
  canvas.style.cursor = 'none';
}

animate();

// expose a tiny debug surface for automated verification
window.__DG = {
  state: () => state,
  player,
  weapon,
  enemies,
  camera,
  renderer,
  capture: CAPTURE,
};
