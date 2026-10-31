import * as THREE from 'three';

/* Procedural texture helpers for effects */
function radialTexture(size, inner, outer, spikes = 0) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, inner);
  g.addColorStop(0.25, outer);
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  if (spikes) {
    ctx.save();
    ctx.translate(size / 2, size / 2);
    ctx.globalCompositeOperation = 'lighter';
    for (let i = 0; i < spikes; i++) {
      ctx.rotate((Math.PI * 2) / spikes);
      const lg = ctx.createLinearGradient(0, 0, size / 2, 0);
      lg.addColorStop(0, inner);
      lg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = lg;
      ctx.beginPath();
      ctx.moveTo(0, -3);
      ctx.lineTo(size / 2, 0);
      ctx.lineTo(0, 3);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function scorchTexture() {
  const s = 128;
  const c = document.createElement('canvas');
  c.width = c.height = s;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(s / 2, s / 2, 2, s / 2, s / 2, s / 2);
  g.addColorStop(0, 'rgba(6,6,7,0.95)');
  g.addColorStop(0.35, 'rgba(12,11,10,0.75)');
  g.addColorStop(0.72, 'rgba(20,18,16,0.25)');
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  // chipped edges
  ctx.globalCompositeOperation = 'destination-out';
  for (let i = 0; i < 40; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = 26 + Math.random() * 34;
    ctx.beginPath();
    ctx.arc(64 + Math.cos(a) * r, 64 + Math.sin(a) * r, 1 + Math.random() * 5, 0, Math.PI * 2);
    ctx.fill();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export class FX {
  constructor(scene) {
    this.scene = scene;
    this.cursor = 0;
    this.N = 900;

    const geo = new THREE.BufferGeometry();
    this.pos = new Float32Array(this.N * 3);
    this.vel = new Float32Array(this.N * 3);
    this.col = new Float32Array(this.N * 3);
    this.alpha = new Float32Array(this.N);
    this.size = new Float32Array(this.N);
    this.life = new Float32Array(this.N);
    this.max = new Float32Array(this.N);

    geo.setAttribute('position', new THREE.BufferAttribute(this.pos, 3));
    geo.setAttribute('aColor', new THREE.BufferAttribute(this.col, 3));
    geo.setAttribute('aLife', new THREE.BufferAttribute(this.alpha, 1));
    geo.setAttribute('aSize', new THREE.BufferAttribute(this.size, 1));

    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: /* glsl */ `
        attribute vec3 aColor;
        attribute float aLife;
        attribute float aSize;
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vColor = aColor;
          vAlpha = aLife;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * (340.0 / max(0.1, -mv.z));
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vec2 p = gl_PointCoord - 0.5;
          float d = length(p);
          float a = smoothstep(0.5, 0.05, d);
          gl_FragColor = vec4(vColor, a * vAlpha);
        }
      `,
    });
    this.points = new THREE.Points(geo, mat);
    this.points.frustumCulled = false;
    scene.add(this.points);
    this.geo = geo;

    // tracers
    this.tracers = [];
    const tGeo = new THREE.CylinderGeometry(0.014, 0.014, 1, 5, 1, true);
    for (let i = 0; i < 32; i++) {
      const m = new THREE.Mesh(tGeo, new THREE.MeshBasicMaterial({
        color: 0xffd9a0, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false,
      }));
      m.visible = false;
      m.frustumCulled = false;
      scene.add(m);
      this.tracers.push({ mesh: m, life: 0, max: 0.1 });
    }
    this.tracerCursor = 0;

    // decals
    this.decals = [];
    const dGeo = new THREE.CircleGeometry(0.5, 14);
    const dTex = scorchTexture();
    for (let i = 0; i < 36; i++) {
      const mat2 = new THREE.MeshBasicMaterial({
        map: dTex, transparent: true, opacity: 0, depthWrite: false,
        polygonOffset: true, polygonOffsetFactor: -4,
      });
      const m = new THREE.Mesh(dGeo, mat2);
      m.visible = false;
      scene.add(m);
      this.decals.push({ mesh: m, life: 0, max: 26 });
    }
    this.decalCursor = 0;

    this.flashTex = radialTexture(128, 'rgba(255,255,240,1)', 'rgba(255,170,70,0.85)', 6);
    this.glowTex = radialTexture(64, 'rgba(255,230,190,1)', 'rgba(255,130,50,0.35)', 0);
  }

  burst(position, normal = new THREE.Vector3(0, 1, 0), color = 0xffb060, count = 16, speed = 6, size = 0.16) {
    const n = new THREE.Vector3().copy(normal).normalize();
    const c = new THREE.Color(color);
    for (let k = 0; k < count; k++) {
      const i = this.cursor;
      this.cursor = (this.cursor + 1) % this.N;
      const i3 = i * 3;
      this.pos[i3] = position.x + n.x * 0.02;
      this.pos[i3 + 1] = position.y + n.y * 0.02;
      this.pos[i3 + 2] = position.z + n.z * 0.02;
      // random direction in hemisphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * 0.9;
      const rx = Math.cos(theta) * Math.sin(phi);
      const ry = Math.cos(phi);
      const rz = Math.sin(theta) * Math.sin(phi);
      const t1 = new THREE.Vector3(-n.z, 0.001, n.x).normalize();
      const t2 = new THREE.Vector3().crossVectors(n, t1).normalize();
      const dir = new THREE.Vector3()
        .addScaledVector(n, ry)
        .addScaledVector(t1, rx)
        .addScaledVector(t2, rz)
        .normalize();
      const s = speed * (0.35 + Math.random() * 0.9);
      this.vel[i3] = dir.x * s;
      this.vel[i3 + 1] = dir.y * s + 1.2;
      this.vel[i3 + 2] = dir.z * s;
      const tint = 0.75 + Math.random() * 0.5;
      this.col[i3] = c.r * tint;
      this.col[i3 + 1] = c.g * tint;
      this.col[i3 + 2] = c.b * tint;
      this.max[i] = 0.25 + Math.random() * 0.55;
      this.life[i] = this.max[i];
      this.alpha[i] = 1;
      this.size[i] = size * (0.5 + Math.random());
    }
    this.geo.attributes.aColor.needsUpdate = true;
    this.geo.attributes.aSize.needsUpdate = true;
  }

  muzzle(position, color = 0xffb060) {
    this.burst(position, new THREE.Vector3(0, 0.2, -1).normalize(), color, 6, 3.2, 0.09);
  }

  tracer(from, to, color = 0xffd9a0, width = 1) {
    const t = this.tracers[this.tracerCursor];
    this.tracerCursor = (this.tracerCursor + 1) % this.tracers.length;
    const dir = new THREE.Vector3().subVectors(to, from);
    const len = dir.length();
    if (len < 0.05) return;
    dir.normalize();
    t.mesh.position.copy(from).addScaledVector(dir, len / 2);
    t.mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    t.mesh.scale.set(width, len, width);
    t.mesh.material.color.setHex(color);
    t.mesh.material.opacity = 0.95;
    t.mesh.visible = true;
    t.max = 0.07 + Math.random() * 0.04;
    t.life = t.max;
    t.mesh.renderOrder = 3;
  }

  decal(position, normal, scale = 1) {
    const d = this.decals[this.decalCursor];
    this.decalCursor = (this.decalCursor + 1) % this.decals.length;
    const n = new THREE.Vector3().copy(normal).normalize();
    d.mesh.position.copy(position).addScaledVector(n, 0.015);
    d.mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), n);
    d.mesh.rotateZ(Math.random() * Math.PI * 2);
    d.mesh.scale.setScalar(scale * (0.55 + Math.random() * 0.5));
    d.mesh.material.opacity = 0.9;
    d.mesh.visible = true;
    d.life = d.max;
  }

  impact(position, normal, enemy = false, head = false) {
    if (enemy) {
      this.burst(position, normal, head ? 0xffe2a8 : 0xff8a3c, head ? 26 : 14, head ? 8 : 6, 0.13);
      this.burst(position, normal, 0x8fe8ff, 6, 4, 0.08);
    } else {
      this.burst(position, normal, 0xffb060, 14, 7, 0.12);
      this.burst(position, normal, 0x6a7078, 5, 2.5, 0.16);
      this.decal(position, normal, 0.75);
    }
  }

  update(dt) {
    const g = this.geo;
    for (let i = 0; i < this.N; i++) {
      if (this.life[i] <= 0) { this.alpha[i] = 0; continue; }
      this.life[i] -= dt;
      const i3 = i * 3;
      if (this.life[i] <= 0) { this.alpha[i] = 0; continue; }
      this.vel[i3 + 1] -= 11 * dt;
      const drag = Math.exp(-2.2 * dt);
      this.vel[i3] *= drag; this.vel[i3 + 1] *= drag; this.vel[i3 + 2] *= drag;
      this.pos[i3] += this.vel[i3] * dt;
      this.pos[i3 + 1] += this.vel[i3 + 1] * dt;
      this.pos[i3 + 2] += this.vel[i3 + 2] * dt;
      this.alpha[i] = Math.max(0, this.life[i] / this.max[i]);
    }
    g.attributes.position.needsUpdate = true;
    g.attributes.aLife.needsUpdate = true;

    for (const t of this.tracers) {
      if (t.life > 0) {
        t.life -= dt;
        t.mesh.material.opacity = Math.max(0, (t.life / t.max) * 0.95);
        if (t.life <= 0) t.mesh.visible = false;
      }
    }
    for (const d of this.decals) {
      if (d.life > 0) {
        d.life -= dt;
        if (d.life < 4) d.mesh.material.opacity = Math.max(0, (d.life / 4) * 0.9);
        if (d.life <= 0) d.mesh.visible = false;
      }
    }
  }
}
