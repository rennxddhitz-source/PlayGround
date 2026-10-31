import * as THREE from 'three';

/* ------------------------------------------------------------------ utils */
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function canvas(size) {
  const c = document.createElement('canvas');
  c.width = size; c.height = size;
  return c;
}

function tex(c, srgb = true, repeat = [1, 1]) {
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repeat[0], repeat[1]);
  t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  t.anisotropy = 8;
  return t;
}

function normalFromHeight(height, size, strength = 2.4) {
  const c = canvas(size);
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(size, size);
  const d = img.data;
  const at = (x, y) => height[((y + size) % size) * size + ((x + size) % size)];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = (at(x + 1, y) - at(x - 1, y)) * strength;
      const dy = (at(x, y + 1) - at(x, y - 1)) * strength;
      const len = Math.hypot(dx, dy, 1);
      const i = (y * size + x) * 4;
      d[i] = ((-dx / len) * 0.5 + 0.5) * 255;
      d[i + 1] = ((dy / len) * 0.5 + 0.5) * 255;
      d[i + 2] = ((1 / len) * 0.5 + 0.5) * 255;
      d[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return tex(c, false);
}

function grayTexture(fn, size = 256, repeat = [1, 1]) {
  const c = canvas(size);
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(size, size);
  const d = img.data;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const v = Math.max(0, Math.min(1, fn(x / size, y / size)));
      const i = (y * size + x) * 4;
      d[i] = d[i + 1] = d[i + 2] = v * 255;
      d[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return tex(c, false, repeat);
}

/* --------------------------------------------------------------- textures */
function concreteMaterial(seed = 7, repeat = [8, 8]) {
  const size = 512;
  const rand = mulberry32(seed);
  const c = canvas(size);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#7b7f82';
  ctx.fillRect(0, 0, size, size);

  const img = ctx.getImageData(0, 0, size, size);
  const d = img.data;
  const height = new Float32Array(size * size);
  for (let i = 0; i < size * size; i++) {
    const n = (rand() - 0.5) * 26;
    d[i * 4] = Math.max(0, Math.min(255, d[i * 4] + n));
    d[i * 4 + 1] = Math.max(0, Math.min(255, d[i * 4 + 1] + n));
    d[i * 4 + 2] = Math.max(0, Math.min(255, d[i * 4 + 2] + n));
    height[i] = 0.5 + (rand() - 0.5) * 0.1 + (rand() > 0.985 ? 0.12 : 0);
  }
  ctx.putImageData(img, 0, 0);

  // stains and damp patches
  for (let i = 0; i < 14; i++) {
    const x = rand() * size, y = rand() * size, r = 18 + rand() * 74;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, `rgba(20,24,26,${0.1 + rand() * 0.16})`);
    g.addColorStop(0.7, 'rgba(20,24,26,0.05)');
    g.addColorStop(1, 'rgba(20,24,26,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }

  // expansion seams
  ctx.strokeStyle = 'rgba(28,30,32,0.6)';
  ctx.lineWidth = 3;
  for (const p of [0, 256]) {
    ctx.beginPath(); ctx.moveTo(p, 0); ctx.lineTo(p, size); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, p); ctx.lineTo(size, p); ctx.stroke();
  }
  ctx.strokeStyle = 'rgba(178,184,188,0.18)';
  ctx.lineWidth = 1;
  for (const p of [3, 259]) {
    ctx.beginPath(); ctx.moveTo(p, 0); ctx.lineTo(p, size); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, p); ctx.lineTo(size, p); ctx.stroke();
  }

  // cracks
  ctx.strokeStyle = 'rgba(26,28,30,0.7)';
  for (let i = 0; i < 10; i++) {
    let x = rand() * size, y = rand() * size;
    ctx.lineWidth = 0.6 + rand() * 1.2;
    ctx.beginPath(); ctx.moveTo(x, y);
    const segs = 6 + Math.floor(rand() * 10);
    for (let s = 0; s < segs; s++) {
      x += (rand() - 0.5) * 34;
      y += (rand() - 0.5) * 34;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  const map = tex(c, true, repeat);
  const normalMap = normalFromHeight(height, size, 3.0);
  normalMap.repeat.set(repeat[0], repeat[1]);
  const roughnessMap = grayTexture((u, v) => 0.72 + Math.sin(u * 40 + v * 33) * 0.04 + rand() * 0.12, 256, repeat);
  return new THREE.MeshStandardMaterial({ map, normalMap, roughnessMap, roughness: 1, metalness: 0.02, color: 0xffffff });
}

function metalMaterial(seed = 3, repeat = [2, 2]) {
  const size = 512;
  const rand = mulberry32(seed);
  const c = canvas(size);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#454c54';
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 2600; i++) {
    const y = rand() * size;
    const l = rand() * size;
    ctx.strokeStyle = `rgba(${190 + rand() * 50},${200 + rand() * 40},${210 + rand() * 40},${rand() * 0.05})`;
    ctx.lineWidth = 0.5 + rand();
    ctx.beginPath(); ctx.moveTo(rand() * size, y); ctx.lineTo(rand() * size + l, y); ctx.stroke();
  }
  for (let i = 0; i < 22; i++) {
    const x = rand() * size, y = rand() * size, r = 2 + rand() * 4;
    ctx.fillStyle = `rgba(20,22,25,${0.2 + rand() * 0.3})`;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(200,210,220,0.15)';
    ctx.beginPath(); ctx.arc(x - r * 0.25, y - r * 0.25, r * 0.45, 0, Math.PI * 2); ctx.fill();
  }
  // rust
  for (let i = 0; i < 9; i++) {
    const x = rand() * size, y = rand() * size, r = 8 + rand() * 30;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, 'rgba(120,62,28,0.3)');
    g.addColorStop(1, 'rgba(120,62,28,0)');
    ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }
  const map = tex(c, true, repeat);
  const roughnessMap = grayTexture((u, v) => 0.42 + Math.sin(u * 120) * 0.05 + rand() * 0.2, 256, repeat);
  return new THREE.MeshStandardMaterial({ map, roughnessMap, roughness: 1, metalness: 0.82, color: 0xffffff });
}

function containerMaterial(hex, code, seed = 11) {
  const size = 512;
  const rand = mulberry32(seed);
  const c = canvas(size);
  const ctx = c.getContext('2d');
  const base = new THREE.Color(hex);
  ctx.fillStyle = `#${base.getHexString()}`;
  ctx.fillRect(0, 0, size, size);

  // corrugated vertical ribs
  for (let x = 0; x < size; x += 16) {
    const g = ctx.createLinearGradient(x, 0, x + 16, 0);
    g.addColorStop(0, 'rgba(0,0,0,0.22)');
    g.addColorStop(0.35, 'rgba(255,255,255,0.12)');
    g.addColorStop(0.65, 'rgba(0,0,0,0.06)');
    g.addColorStop(1, 'rgba(0,0,0,0.26)');
    ctx.fillStyle = g;
    ctx.fillRect(x, 0, 16, size);
  }
  // frame rails
  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.fillRect(0, 0, size, 16); ctx.fillRect(0, size - 16, size, 16);
  ctx.fillRect(0, 0, 18, size); ctx.fillRect(size - 18, 0, 18, size);

  // grime + rust drips
  for (let i = 0; i < 90; i++) {
    const x = rand() * size, w = 1 + rand() * 5, h = 20 + rand() * 180, y = rand() * size * 0.7;
    ctx.fillStyle = `rgba(${40 + rand() * 40},${24 + rand() * 20},${12 + rand() * 14},${0.05 + rand() * 0.16})`;
    ctx.fillRect(x, y, w, h);
  }
  for (let i = 0; i < 6; i++) {
    const x = rand() * size, y = rand() * size, r = 20 + rand() * 60;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, 'rgba(110,62,30,0.24)');
    g.addColorStop(1, 'rgba(110,62,30,0)');
    ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }

  // stencil
  ctx.save();
  ctx.translate(70, size * 0.5);
  ctx.fillStyle = 'rgba(235,235,230,0.72)';
  ctx.font = 'bold 58px monospace';
  ctx.fillText(code, 0, 0);
  ctx.font = 'bold 20px monospace';
  ctx.fillStyle = 'rgba(235,235,230,0.5)';
  ctx.fillText('DGSU // MAX GROSS 30480 KG', 0, 34);
  ctx.fillText('SEAL INTACT — DO NOT OPEN', 0, 62);
  ctx.restore();

  const map = tex(c, true, [1, 1]);
  const roughnessMap = grayTexture((u, v) => 0.55 + Math.sin(u * 80) * 0.05 + rand() * 0.16, 256, [1, 1]);
  return new THREE.MeshStandardMaterial({ map, roughnessMap, roughness: 1, metalness: 0.55, color: 0xffffff });
}

function crateMaterial(seed = 5) {
  const size = 256;
  const rand = mulberry32(seed);
  const c = canvas(size);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#6d5537';
  ctx.fillRect(0, 0, size, size);
  for (let y = 0; y < size; y += 32) {
    ctx.fillStyle = `rgba(${95 + rand() * 30},${72 + rand() * 20},${44 + rand() * 14},0.8)`;
    ctx.fillRect(0, y + 1, size, 30);
    for (let i = 0; i < 26; i++) {
      ctx.strokeStyle = `rgba(42,30,18,${0.05 + rand() * 0.12})`;
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      const yy = y + rand() * 30;
      ctx.moveTo(0, yy);
      ctx.bezierCurveTo(size * 0.3, yy + (rand() - 0.5) * 6, size * 0.7, yy + (rand() - 0.5) * 6, size, yy);
      ctx.stroke();
    }
    ctx.fillStyle = 'rgba(28,20,12,0.55)';
    ctx.fillRect(0, y + 30, size, 2);
  }
  ctx.strokeStyle = 'rgba(60,64,68,0.9)';
  ctx.lineWidth = 8;
  ctx.strokeRect(4, 4, size - 8, size - 8);
  ctx.fillStyle = 'rgba(220,210,190,0.35)';
  ctx.font = 'bold 20px monospace';
  ctx.fillText('DG // 7.62', 22, size * 0.5);
  const map = tex(c, true, [1, 1]);
  return new THREE.MeshStandardMaterial({ map, roughness: 0.85, metalness: 0.05 });
}

function stripeMaterial() {
  const size = 256;
  const c = canvas(size);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#c9922b';
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = '#17191c';
  for (let i = -size; i < size * 2; i += 64) {
    ctx.save();
    ctx.translate(i, 0);
    ctx.rotate(-Math.PI / 4);
    ctx.fillRect(0, -size, 32, size * 3);
    ctx.restore();
  }
  // wear
  const rand = mulberry32(19);
  for (let i = 0; i < 300; i++) {
    ctx.fillStyle = `rgba(60,54,44,${rand() * 0.4})`;
    ctx.fillRect(rand() * size, rand() * size, 1 + rand() * 6, 1 + rand() * 3);
  }
  return new THREE.MeshStandardMaterial({ map: tex(c, true, [1, 1]), roughness: 0.8, metalness: 0.1 });
}

function windowTexture(seed = 4) {
  const s = 256;
  const c = canvas(s);
  const ctx = c.getContext('2d');
  const rand = mulberry32(seed);
  ctx.fillStyle = '#15181c';
  ctx.fillRect(0, 0, s, s);
  for (let y = 12; y < s; y += 32) {
    for (let x = 10; x < s; x += 28) {
      const lit = rand() > 0.38;
      ctx.fillStyle = lit
        ? `rgba(${230 + rand() * 20},${175 + rand() * 45},${110 + rand() * 50},${0.55 + rand() * 0.45})`
        : 'rgba(18,22,27,0.9)';
      ctx.fillRect(x, y, 18, 18);
      if (lit) {
        ctx.fillStyle = 'rgba(255,205,140,0.12)';
        ctx.fillRect(x - 3, y - 3, 24, 24);
      }
    }
  }
  return tex(c, true, [1, 1]);
}

/* ------------------------------------------------------------------- sky */
const SKY_FRAG = /* glsl */ `
  varying vec3 vWorld;
  uniform vec3 uSun;
  void main() {
    vec3 dir = normalize(vWorld);
    float h = dir.y;
    vec3 zenith = vec3(0.020, 0.038, 0.095);
    vec3 mid = vec3(0.135, 0.155, 0.235);
    vec3 horizon = vec3(0.95, 0.47, 0.24);
    vec3 ground = vec3(0.020, 0.022, 0.028);

    vec3 col = mix(horizon, mid, smoothstep(0.0, 0.18, h));
    col = mix(col, zenith, smoothstep(0.18, 0.75, h));
    col = mix(ground, col, smoothstep(-0.09, 0.015, h));

    float sd = max(dot(dir, normalize(uSun)), 0.0);
    col += vec3(1.0, 0.62, 0.30) * pow(sd, 220.0) * 2.0;
    col += vec3(1.0, 0.45, 0.18) * pow(sd, 15.0) * 0.3;
    col += vec3(0.85, 0.42, 0.22) * pow(sd, 3.0) * 0.08;

    // thin drifting cloud bands
    float band = smoothstep(0.62, 0.0, abs(h - 0.16)) * 0.5;
    float stripes = 0.5 + 0.5 * sin(dir.x * 14.0 + dir.z * 9.0 + dir.y * 30.0);
    col += vec3(0.20, 0.13, 0.13) * band * stripes * 0.35;

    // stars
    float star = step(0.9993, fract(sin(dot(dir, vec3(12.9898, 78.233, 45.164))) * 43758.5453));
    col += vec3(0.65, 0.75, 1.0) * star * smoothstep(0.25, 0.6, h) * 0.5;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function makeSky(sunDir) {
  const geo = new THREE.SphereGeometry(260, 48, 24);
  const mat = new THREE.ShaderMaterial({
    vertexShader: /* glsl */ `
      varying vec3 vWorld;
      void main() {
        vWorld = (modelMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: SKY_FRAG,
    uniforms: { uSun: { value: sunDir.clone() } },
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.frustumCulled = false;
  mesh.renderOrder = -10;
  return mesh;
}

/* ----------------------------------------------------------------- world */
export function createWorld(renderer, scene) {
  const colliders = [];
  const raycastMeshes = [];
  const spawnPoints = [];
  const lamps = [];

  const concrete = concreteMaterial(7, [18, 18]);
  const concrete2 = concreteMaterial(23, [4, 2]);
  const steel = metalMaterial(3, [3, 1]);
  const containerRed = containerMaterial(0x8e3428, 'DGSU 402191', 2);
  const containerBlue = containerMaterial(0x24486b, 'DGSU 771044', 3);
  const containerGreen = containerMaterial(0x35553a, 'DGSU 118230', 4);
  const containerTan = containerMaterial(0x86693c, 'DGSU 905512', 5);
  const crateMat = crateMaterial(9);
  const stripeMat = stripeMaterial();
  const windows = windowTexture(4);
  const windows2 = windowTexture(8);
  const windowMat = new THREE.MeshStandardMaterial({
    map: windows, emissiveMap: windows, emissive: 0xffc07a, emissiveIntensity: 1.7, roughness: 0.65, metalness: 0.2,
  });
  const windowMat2 = new THREE.MeshStandardMaterial({
    map: windows2, emissiveMap: windows2, emissive: 0x8fd7ff, emissiveIntensity: 1.2, roughness: 0.65, metalness: 0.2,
  });

  const sunDir = new THREE.Vector3(0.5, 0.3, -0.78).normalize();

  // sky + environment
  const sky = makeSky(sunDir);
  scene.add(sky);
  try {
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envScene = new THREE.Scene();
    const envSky = makeSky(sunDir);
    envSky.scale.setScalar(0.2);
    envScene.add(envSky);
    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(40, 32),
      new THREE.MeshBasicMaterial({ color: 0x1b1a1c })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -2;
    envScene.add(ground);
    scene.environment = pmrem.fromScene(envScene, 0.03).texture;
    scene.environmentIntensity = 0.6;
    pmrem.dispose();
  } catch (e) { /* env map is optional */ }

  scene.fog = new THREE.FogExp2(0x33323e, 0.0105);

  // ---------------------------------------------------------------- lights
  const sun = new THREE.DirectionalLight(0xffb37a, 2.4);
  sun.position.copy(sunDir).multiplyScalar(60);
  sun.target.position.set(0, 0, 0);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -42;
  sun.shadow.camera.right = 42;
  sun.shadow.camera.top = 42;
  sun.shadow.camera.bottom = -42;
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 140;
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.03;
  scene.add(sun, sun.target);

  const hemi = new THREE.HemisphereLight(0x93b0d8, 0x3a2c1e, 1.05);
  scene.add(hemi);
  const fill = new THREE.DirectionalLight(0x7fa9d8, 0.85);
  fill.position.set(-25, 18, 30);
  scene.add(fill);
  // warm bounce from the yard back toward the camera
  const bounce = new THREE.DirectionalLight(0xffb98a, 0.9);
  bounce.position.set(12, 9, 38);
  scene.add(bounce);
  scene.add(new THREE.AmbientLight(0x2c3648, 0.35));

  // ----------------------------------------------------------------- ground
  const groundGeo = new THREE.PlaneGeometry(92, 92, 1, 1);
  const groundMat = concrete;
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);
  raycastMeshes.push(ground);

  // paint markings
  const paintMat = new THREE.MeshStandardMaterial({
    color: 0xd9a53c, roughness: 0.8, metalness: 0.05,
    polygonOffset: true, polygonOffsetFactor: -2,
  });
  const addStripe = (x, z, w, d, rot = 0) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), paintMat);
    m.rotation.x = -Math.PI / 2;
    m.rotation.z = rot;
    m.position.set(x, 0.012, z);
    m.receiveShadow = true;
    scene.add(m);
  };
  addStripe(0, -8, 0.32, 34);
  addStripe(0, 8, 0.32, 34);
  addStripe(-8, 0, 34, 0.32);
  addStripe(8, 0, 34, 0.32);
  addStripe(-8, -8, 2, 2, Math.PI / 4);

  // hazard pads
  const hazard = (x, z, w, d) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), stripeMat);
    m.rotation.x = -Math.PI / 2;
    m.position.set(x, 0.014, z);
    scene.add(m);
  };
  hazard(0, -20, 16, 1.4);
  hazard(-22, 0, 1.4, 14);
  hazard(20, 22, 10, 1.2);

  // puddles
  const puddleMat = new THREE.MeshStandardMaterial({
    color: 0x070a0d, metalness: 0.8, roughness: 0.16, transparent: true, opacity: 0.72,
    envMapIntensity: 0.55, polygonOffset: true, polygonOffsetFactor: -3,
  });
  const rand = mulberry32(77);
  for (let i = 0; i < 6; i++) {
    const p = new THREE.Mesh(new THREE.CircleGeometry(1, 22), puddleMat);
    p.rotation.x = -Math.PI / 2;
    p.scale.set(1.1 + rand() * 1.9, 0.8 + rand() * 1.0, 1);
    p.position.set((rand() - 0.5) * 44, 0.018, (rand() - 0.5) * 44);
    scene.add(p);
  }

  // ground stencils
  function stencilTexture(title, sub) {
    const c = canvas(512);
    const ctx = c.getContext('2d');
    ctx.clearRect(0, 0, 512, 512);
    ctx.fillStyle = 'rgba(214,164,58,0.85)';
    ctx.font = 'bold 108px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(title, 256, 250);
    ctx.font = 'bold 34px monospace';
    ctx.fillText(sub, 256, 312);
    ctx.strokeStyle = 'rgba(214,164,58,0.7)';
    ctx.lineWidth = 6;
    ctx.strokeRect(30, 140, 452, 200);
    // weather it
    const r2 = mulberry32(title.length * 31 + 5);
    ctx.globalCompositeOperation = 'destination-out';
    for (let i = 0; i < 340; i++) {
      ctx.fillStyle = `rgba(0,0,0,${0.2 + r2() * 0.6})`;
      ctx.beginPath();
      ctx.arc(r2() * 512, r2() * 512, 1 + r2() * 7, 0, Math.PI * 2);
      ctx.fill();
    }
    return tex(c, true, [1, 1]);
  }
  const stencilMat = (t) => new THREE.MeshBasicMaterial({
    map: t, transparent: true, depthWrite: false, opacity: 0.8,
    polygonOffset: true, polygonOffsetFactor: -4,
  });
  const st1 = new THREE.Mesh(new THREE.PlaneGeometry(7, 7), stencilMat(stencilTexture('SECTOR 07', 'BLACKSITE // RESTRICTED')));
  st1.rotation.x = -Math.PI / 2;
  st1.rotation.z = 0.12;
  st1.position.set(11, 0.02, 12);
  scene.add(st1);
  const st2 = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), stencilMat(stencilTexture('DG', 'DEMIGODZ GAMING')));
  st2.rotation.x = -Math.PI / 2;
  st2.rotation.z = -0.5;
  st2.position.set(-15, 0.02, 23);
  scene.add(st2);

  // scattered debris
  const debrisMat = new THREE.MeshStandardMaterial({ color: 0x8f8776, roughness: 0.95, metalness: 0.02, side: THREE.DoubleSide });
  for (let i = 0; i < 26; i++) {
    const d = new THREE.Mesh(new THREE.PlaneGeometry(0.12 + rand() * 0.22, 0.08 + rand() * 0.2), debrisMat);
    d.rotation.x = -Math.PI / 2;
    d.rotation.z = rand() * Math.PI;
    d.position.set((rand() - 0.5) * 56, 0.022, (rand() - 0.5) * 56);
    scene.add(d);
  }

  // --------------------------------------------------------------- helpers
  const world = new THREE.Group();
  scene.add(world);
  world.updateMatrixWorld(true);

  function solid(mesh, collide = true) {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    world.add(mesh);
    raycastMeshes.push(mesh);
    if (collide) {
      world.updateMatrixWorld(true);
      colliders.push(new THREE.Box3().setFromObject(mesh));
    }
    return mesh;
  }

  function box(w, h, d, mat, x, y, z, rotY = 0, collide = true) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    m.position.set(x, y, z);
    m.rotation.y = rotY;
    return solid(m, collide);
  }

  // ------------------------------------------------------------- perimeter
  const wallH = 7;
  const trimMat = new THREE.MeshStandardMaterial({ color: 0x2a2d31, roughness: 0.6, metalness: 0.5 });
  const walls = [
    [72, wallH, 1, 0, wallH / 2, -34],
    [72, wallH, 1, 0, wallH / 2, 34],
    [1, wallH, 72, -34, wallH / 2, 0],
    [1, wallH, 72, 34, wallH / 2, 0],
  ];
  for (const [w, h, d, x, y, z] of walls) {
    box(w, h, d, concrete2, x, y, z);
    // top trim
    box(w + 0.4, 0.35, d + 0.4, trimMat, x, h + 0.16, z, 0, false);
  }
  // buttresses
  for (let i = -30; i <= 30; i += 10) {
    box(0.9, wallH - 0.5, 1.6, concrete2, i, wallH / 2, -34.6, 0, false);
    box(0.9, wallH - 0.5, 1.6, concrete2, i, wallH / 2, 34.6, 0, false);
    box(1.6, wallH - 0.5, 0.9, concrete2, -34.6, wallH / 2, i, 0, false);
    box(1.6, wallH - 0.5, 0.9, concrete2, 34.6, wallH / 2, i, 0, false);
  }

  // hazard edge strips along wall bases
  const baseStripe = new THREE.MeshStandardMaterial({ map: stripeMat.map, roughness: 0.85, metalness: 0.08 });
  for (const [x, z, w, d] of [[0, -33.2, 68, 0.7], [0, 33.2, 68, 0.7], [-33.2, 0, 0.7, 68], [33.2, 0, 0.7, 68]]) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), baseStripe);
    m.rotation.x = -Math.PI / 2;
    m.position.set(x, 0.016, z);
    scene.add(m);
  }

  // ------------------------------------------------------------- warehouse A
  const buildingMat = new THREE.MeshStandardMaterial({ color: 0x6c7278, roughness: 0.78, metalness: 0.25 });
  const wA = box(15, 9, 12, buildingMat, -20, 4.5, -20);
  // roof lip
  box(15.8, 0.6, 12.8, trimMat, -20, 9.1, -20, 0, false);
  // window band
  const winA = new THREE.Mesh(new THREE.PlaneGeometry(11, 2.6), windowMat);
  winA.position.set(-20, 6.6, -13.96);
  world.add(winA);
  // loading door
  const doorMat = new THREE.MeshStandardMaterial({ color: 0x30363c, roughness: 0.55, metalness: 0.6 });
  box(5.6, 5, 0.25, doorMat, -20, 2.5, -13.9, 0, false);
  const doorGlow = new THREE.Mesh(new THREE.PlaneGeometry(4.6, 0.16), new THREE.MeshBasicMaterial({ color: 0xff9d45 }));
  doorGlow.position.set(-20, 5.2, -13.72);
  world.add(doorGlow);
  const lampA = new THREE.PointLight(0xffa552, 55, 26, 2);
  lampA.position.set(-20, 4.4, -12.6);
  scene.add(lampA);

  // ------------------------------------------------------------- warehouse B
  box(13, 7, 11, buildingMat, 20, 3.5, 19);
  box(13.7, 0.55, 11.7, trimMat, 20, 7.05, 19, 0, false);
  const winB = new THREE.Mesh(new THREE.PlaneGeometry(9, 2.1), windowMat2);
  winB.position.set(20, 5.2, 13.44);
  winB.rotation.y = Math.PI;
  world.add(winB);
  box(4.4, 4, 0.22, doorMat, 20, 2, 13.5, 0, false);
  const lampB = new THREE.PointLight(0xffa552, 45, 24, 2);
  lampB.position.set(20, 4.1, 12.4);
  scene.add(lampB);

  // ------------------------------------------------------------- control tower
  const towerMat = new THREE.MeshStandardMaterial({ color: 0x4c545c, roughness: 0.7, metalness: 0.4 });
  box(6.4, 11, 6.4, towerMat, 22, 5.5, -22);
  // windows cabin
  box(7.2, 3, 7.2, towerMat, 22, 11, -22, 0, false);
  const cabinGlass = new THREE.MeshStandardMaterial({
    color: 0x0d151c, emissive: 0x2f6a8a, emissiveIntensity: 0.5, metalness: 0.8, roughness: 0.15,
  });
  for (let side = 0; side < 4; side++) {
    const g = new THREE.Mesh(new THREE.PlaneGeometry(6, 1.9), cabinGlass);
    const a = side * Math.PI / 2;
    g.position.set(22 + Math.sin(a) * 3.62, 11.2, -22 + Math.cos(a) * 3.62);
    g.rotation.y = a;
    world.add(g);
  }
  box(8, 0.4, 8, trimMat, 22, 12.65, -22, 0, false);
  // antenna
  const ant = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.08, 4), trimMat);
  ant.position.set(22, 14.8, -22);
  world.add(ant);
  const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 8), new THREE.MeshBasicMaterial({ color: 0xff3b20 }));
  beacon.position.set(22, 16.9, -22);
  scene.add(beacon);
  lamps.push({ mesh: beacon, kind: 'beacon' });

  // ------------------------------------------------------------- containers
  const containers = [
    { mat: containerRed, x: 9, z: -9, rot: 0 },
    { mat: containerBlue, x: -7, z: 6, rot: Math.PI / 2 },
    { mat: containerGreen, x: 14, z: 11, rot: 0.12 },
    { mat: containerTan, x: -16, z: 13, rot: -0.06 },
    { mat: containerBlue, x: 2, z: -22, rot: Math.PI / 2 },
    { mat: containerRed, x: -26, z: 2, rot: Math.PI / 2 },
  ];
  for (const c of containers) {
    const m = box(6.1, 2.6, 2.45, c.mat, c.x, 1.3, c.z, c.rot);
    // doors + locking bars on the ends
    const barMat = new THREE.MeshStandardMaterial({ color: 0x8b9096, roughness: 0.4, metalness: 0.9 });
    for (const s of [-1, 1]) {
      for (let i = -1; i <= 1; i++) {
        const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 2.2, 6), barMat);
        bar.position.set(s * 3.06, 0, i * 0.62);
        bar.rotation.x = Math.PI / 2;
        bar.castShadow = true;
        m.add(bar);
      }
    }
  }
  // stacked container
  const stack = box(6.1, 2.6, 2.45, containerGreen, 9, 3.9, -9, 0);
  box(6.1, 2.6, 2.45, containerTan, 14.1, 3.9, 11, 0.12);

  // ------------------------------------------------------------- crates
  const cratePositions = [
    [-14, -13, 0.3], [-12.6, -12.4, -0.2], [-13.4, -11.5, 0.7],
    [16, 15.4, 0.1], [17.2, 15.8, -0.4], [15.4, 16.5, 0.5],
    [-3, 14, 0.2], [-1.8, 14.4, -0.3], [4, 18, 0.6],
    [24, -6, 0.1], [25.1, -5.6, -0.5],
  ];
  for (const [x, z, r] of cratePositions) {
    const s = 1.25 + rand() * 0.25;
    box(s, s, s, crateMat, x, s / 2, z, r);
  }
  // crate stacks
  box(1.4, 1.4, 1.4, crateMat, -14, 2.0, -13, 0.5);
  box(1.4, 1.4, 1.4, crateMat, 17.2, 2.0, 15.8, 0.2);

  // ------------------------------------------------------------- barrels
  const barrelMat = new THREE.MeshStandardMaterial({ color: 0xb4561f, roughness: 0.55, metalness: 0.65 });
  const barrelRim = new THREE.MeshStandardMaterial({ color: 0x2d3236, roughness: 0.45, metalness: 0.8 });
  const barrelSpots = [[-5, -2], [-4, -2.2], [-4.6, -3.1], [11.6, 4.8], [12.5, 4.4], [-9, 24], [26, 12], [7, 24.5]];
  for (const [x, z] of barrelSpots) {
    const b = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 1.15, 16), barrelMat);
    b.position.set(x, 0.58, z);
    b.castShadow = b.receiveShadow = true;
    world.add(b);
    raycastMeshes.push(b);
    world.updateMatrixWorld(true);
    colliders.push(new THREE.Box3().setFromObject(b));
    for (const y of [-0.4, 0, 0.4]) {
      const rim = new THREE.Mesh(new THREE.TorusGeometry(0.405, 0.028, 6, 18), barrelRim);
      rim.rotation.x = Math.PI / 2;
      rim.position.y = y;
      b.add(rim);
    }
  }

  // ------------------------------------------------------------- barricades
  const barrierMat = new THREE.MeshStandardMaterial({
    map: concrete2.map, normalMap: concrete2.normalMap, roughnessMap: concrete2.roughnessMap,
    color: 0xb9bcbd, roughness: 1, metalness: 0.03,
  });
  const barrierSpots = [[-8, 18, 0.15], [10, 17, -0.1], [-18, 6, Math.PI / 2], [18, -2, Math.PI / 2], [-3, -11, 0.05], [22, 3, 0.4]];
  for (const [x, z, r] of barrierSpots) {
    const g = new THREE.Group();
    const lower = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.4, 0.72), concrete2);
    lower.position.y = 0.2;
    const upper = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.62, 0.4), barrierMat);
    upper.position.y = 0.69;
    for (const m of [lower, upper]) { m.castShadow = m.receiveShadow = true; g.add(m); }
    g.position.set(x, 0, z);
    g.rotation.y = r;
    world.add(g);
    world.updateMatrixWorld(true);
    colliders.push(new THREE.Box3().setFromObject(g));
    raycastMeshes.push(lower, upper);
    // hazard cap
    const cap = new THREE.Mesh(new THREE.PlaneGeometry(2.0, 0.16), stripeMat);
    cap.rotation.x = -Math.PI / 2;
    cap.position.set(0, 0.41, 0);
    g.add(cap);
  }

  // sandbag nests
  const sandMat = new THREE.MeshStandardMaterial({ color: 0x6e6449, roughness: 0.98, metalness: 0.0 });
  const sandSpots = [[-12, 22, 0.3], [13, -14, -0.4], [-24, 16, 0.9]];
  for (const [x, z, r] of sandSpots) {
    const g = new THREE.Group();
    for (let row = 0; row < 3; row++) {
      const n = 4 - row;
      for (let i = 0; i < n; i++) {
        const b = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.26, 0.36), sandMat);
        b.position.set((i - (n - 1) / 2) * 0.64, 0.13 + row * 0.26, (row % 2 ? 0.04 : -0.04));
        b.rotation.y = (rand() - 0.5) * 0.12;
        b.castShadow = b.receiveShadow = true;
        g.add(b);
      }
    }
    g.position.set(x, 0, z);
    g.rotation.y = r;
    world.add(g);
    world.updateMatrixWorld(true);
    colliders.push(new THREE.Box3().setFromObject(g));
    g.traverse((o) => { if (o.isMesh) raycastMeshes.push(o); });
  }

  // pipe stacks
  const pipeMat = new THREE.MeshStandardMaterial({ color: 0x4c5157, roughness: 0.55, metalness: 0.75 });
  for (let row = 0; row < 3; row++) {
    const p = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 5.2, 16), pipeMat);
    p.rotation.z = Math.PI / 2;
    p.position.set(26, 0.34 + row * 0.6, 17 - row * 0.62);
    p.castShadow = p.receiveShadow = true;
    world.add(p);
    raycastMeshes.push(p);
    world.updateMatrixWorld(true);
    colliders.push(new THREE.Box3().setFromObject(p));
  }

  // overhead cables
  const cableMat = new THREE.MeshStandardMaterial({ color: 0x14161a, roughness: 0.9, metalness: 0.2 });
  const cablePairs = [
    [new THREE.Vector3(-27, 9.2, -27), new THREE.Vector3(27, 9.4, -27)],
    [new THREE.Vector3(-27, 8.8, 27), new THREE.Vector3(27, 9.0, 27)],
    [new THREE.Vector3(-27, 9.2, -27), new THREE.Vector3(-27, 9.6, 27)],
  ];
  for (const [a, b] of cablePairs) {
    const mid = a.clone().add(b).multiplyScalar(0.5);
    mid.y -= 1.5;
    const curve = new THREE.CatmullRomCurve3([a, mid, b]);
    const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 24, 0.02, 5, false), cableMat);
    scene.add(tube);
  }

  // ------------------------------------------------------------- light towers
  const poleMat = new THREE.MeshStandardMaterial({ color: 0x3a4046, roughness: 0.5, metalness: 0.8 });
  const lampMat = new THREE.MeshStandardMaterial({ color: 0x222222, emissive: 0xffd9a0, emissiveIntensity: 4, roughness: 0.3 });
  const towerSpots = [[-27, -27], [27, -27], [-27, 27], [27, 27]];
  for (const [x, z] of towerSpots) {
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.2, 9.5, 10), poleMat);
    pole.position.set(x, 4.75, z);
    pole.castShadow = true;
    world.add(pole);
    world.updateMatrixWorld(true);
    colliders.push(new THREE.Box3().setFromObject(pole));
    raycastMeshes.push(pole);
    const head = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.5, 0.7), poleMat);
    head.position.set(x, 9.5, z);
    head.lookAt(0, 9.2, 0);
    world.add(head);
    const bulb = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.36), lampMat);
    bulb.position.set(0, -0.16, 0.36);
    bulb.rotation.x = Math.PI / 2.5;
    head.add(bulb);
    const pl = new THREE.PointLight(0xffb067, 90, 34, 2);
    pl.position.set(x, 9.0, z);
    scene.add(pl);
    lamps.push({ light: pl, base: 90, phase: rand() * 10, kind: 'tower' });
    // fake volumetric light cone
    const cone = new THREE.Mesh(
      new THREE.ConeGeometry(5.2, 9.4, 24, 1, true),
      new THREE.MeshBasicMaterial({
        color: 0xffa858, transparent: true, opacity: 0.035, blending: THREE.AdditiveBlending,
        depthWrite: false, side: THREE.DoubleSide,
      })
    );
    cone.position.set(x, 4.7, z);
    scene.add(cone);
  }

  // ------------------------------------------------------------- distant city
  const cityMat = new THREE.MeshStandardMaterial({ color: 0x1b2028, roughness: 0.9, metalness: 0.1 });
  for (let i = 0; i < 26; i++) {
    const a = (i / 26) * Math.PI * 2 + rand() * 0.12;
    const r = 55 + rand() * 30;
    const w = 5 + rand() * 9, h = 8 + rand() * 22, d = 5 + rand() * 9;
    const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), cityMat);
    b.position.set(Math.cos(a) * r, h / 2 - 2, Math.sin(a) * r);
    b.rotation.y = rand() * Math.PI;
    scene.add(b);
    if (rand() > 0.4) {
      const wm = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.8, h * 0.7), rand() > 0.5 ? windowMat : windowMat2);
      wm.position.set(b.position.x + Math.sin(b.rotation.y) * 0, b.position.y, b.position.z);
      wm.lookAt(0, b.position.y, 0);
      scene.add(wm);
    }
  }

  // patrol drone
  const drone = new THREE.Group();
  const droneMat = new THREE.MeshStandardMaterial({ color: 0x22272d, metalness: 0.7, roughness: 0.4 });
  const droneBody = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.22, 0.8), droneMat);
  droneBody.castShadow = true;
  drone.add(droneBody);
  const rotors = [];
  for (const [sx, sz] of [[-1, -1], [-1, 1], [1, -1], [1, 1]]) {
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.06, 0.1), droneMat);
    arm.position.set(sx * 0.46, 0, sz * 0.46);
    arm.rotation.y = sx * sz > 0 ? Math.PI / 4 : -Math.PI / 4;
    drone.add(arm);
    const rotor = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.012, 12), new THREE.MeshStandardMaterial({ color: 0x14171a, roughness: 0.5, metalness: 0.5, transparent: true, opacity: 0.55 }));
    rotor.position.set(sx * 0.72, 0.08, sz * 0.72);
    drone.add(rotor);
    rotors.push(rotor);
  }
  const droneLed = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 6), new THREE.MeshBasicMaterial({ color: 0xff2a10 }));
  droneLed.position.set(0, -0.14, 0.25);
  drone.add(droneLed);
  drone.position.set(0, 11, 0);
  scene.add(drone);

  // ------------------------------------------------------------- dust motes
  const dustCount = 380;
  const dustGeo = new THREE.BufferGeometry();
  const dustPos = new Float32Array(dustCount * 3);
  for (let i = 0; i < dustCount; i++) {
    dustPos[i * 3] = (rand() - 0.5) * 62;
    dustPos[i * 3 + 1] = rand() * 9;
    dustPos[i * 3 + 2] = (rand() - 0.5) * 62;
  }
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
  const dustMat = new THREE.PointsMaterial({
    color: 0xffc38a, size: 0.045, transparent: true, opacity: 0.5,
    depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true,
  });
  const dust = new THREE.Points(dustGeo, dustMat);
  scene.add(dust);

  // ------------------------------------------------------------- spawn points
  const spawns = [
    [0, -27], [-24, -22], [24, -20], [-27, 8], [27, 6], [-20, 27], [18, 27], [0, 28], [-25, -4], [26, -10],
  ];
  for (const [x, z] of spawns) spawnPoints.push(new THREE.Vector3(x, 0, z));

  const time0 = performance.now();

  function update(dt, t) {
    // lamp flicker
    for (const l of lamps) {
      if (l.kind === 'tower') {
        const n = Math.sin(t * 17 + l.phase) * 0.5 + Math.sin(t * 5.3 + l.phase * 2) * 0.5;
        l.light.intensity = l.base * (0.94 + n * 0.06);
      } else if (l.kind === 'beacon') {
        const on = Math.sin(t * 3.2) > 0.2;
        l.mesh.material.color.setHex(on ? 0xff3b20 : 0x3a0f08);
      }
    }
    // drifting dust
    const p = dust.geometry.attributes.position;
    for (let i = 0; i < dustCount; i += 3) {
      p.array[i * 3 + 1] += dt * (0.06 + (i % 5) * 0.01);
      p.array[i * 3] += dt * 0.04 * Math.sin(t * 0.4 + i);
      if (p.array[i * 3 + 1] > 9) p.array[i * 3 + 1] = 0;
    }
    p.needsUpdate = true;
    sky.position.copy(cameraRef());
    drone.position.set(Math.cos(t * 0.16) * 19, 11.5 + Math.sin(t * 0.7) * 0.4, Math.sin(t * 0.16) * 19);
    drone.rotation.y = -t * 0.16 + Math.PI / 2;
    for (const r of rotors) r.rotation.y += dt * 40;
    droneLed.visible = Math.sin(t * 6) > 0.4;
  }

  // keep sky centered on camera
  let cam = null;
  function cameraRef() { return cam ? cam.position : new THREE.Vector3(); }
  function attachCamera(camera) { cam = camera; }

  return {
    colliders, raycastMeshes, spawnPoints, lamps, sunDir, sun,
    attachCamera, update,
    elapsed: () => (performance.now() - time0) / 1000,
  };
}
