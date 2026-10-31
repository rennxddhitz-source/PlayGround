import * as THREE from 'three'
import { makeDecal, puffTexture } from './textures.js'

// ---------------------------------------------------------------------------
// Combat effects: tracers, impact sparks, dust puffs, blood, explosion light.
// Everything is pooled so the render loop stays allocation-free in combat.
// ---------------------------------------------------------------------------

export class Effects {
  constructor(scene) {
    this.scene = scene
    this.time = 0
    this.tracers = []
    this.sparks = []
    this.puffs = []
    this.decals = []
    this.flashes = []

    const tracerGeo = new THREE.BoxGeometry(0.018, 0.018, 1)
    tracerGeo.translate(0, 0, -0.5)
    const tracerMat = new THREE.MeshBasicMaterial({
      color: 0xffd08a, transparent: true, opacity: 0.9,
      blending: THREE.AdditiveBlending, depthWrite: false
    })
    for (let i = 0; i < 32; i++) {
      const m = new THREE.Mesh(tracerGeo, tracerMat.clone())
      m.visible = false
      m.frustumCulled = false
      scene.add(m)
      this.tracers.push({ mesh: m, life: 0, max: 0.06 })
    }

    const sparkCount = 260
    const sparkGeo = new THREE.BufferGeometry()
    const sparkPositions = new Float32Array(sparkCount * 3)
    sparkPositions.fill(-9999)
    sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3))
    const sparkMat = new THREE.PointsMaterial({
      color: 0xffb15e, size: 0.045, transparent: true, opacity: 0.95,
      blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true
    })
    this.sparkPoints = new THREE.Points(sparkGeo, sparkMat)
    this.sparkPoints.frustumCulled = false
    scene.add(this.sparkPoints)
    this.sparkData = Array.from({ length: sparkCount }, () => ({ life: 0, max: 1, vel: new THREE.Vector3(), pos: new THREE.Vector3() }))
    this.sparkIndex = 0

    const bloodGeo = new THREE.BufferGeometry()
    const bloodPositions = new Float32Array(120 * 3)
    bloodPositions.fill(-9999)
    bloodGeo.setAttribute('position', new THREE.BufferAttribute(bloodPositions, 3))
    const bloodMat = new THREE.PointsMaterial({
      color: 0x8f1d12, size: 0.06, transparent: true, opacity: 0.9,
      depthWrite: false, sizeAttenuation: true
    })
    this.bloodPoints = new THREE.Points(bloodGeo, bloodMat)
    this.bloodPoints.frustumCulled = false
    scene.add(this.bloodPoints)
    this.bloodData = Array.from({ length: 120 }, () => ({ life: 0, max: 1, vel: new THREE.Vector3(), pos: new THREE.Vector3() }))
    this.bloodIndex = 0

    const puffTex = puffTexture()
    for (let i = 0; i < 24; i++) {
      const mat = new THREE.SpriteMaterial({ map: puffTex, color: 0x9d8c74, transparent: true, opacity: 0, depthWrite: false })
      const s = new THREE.Sprite(mat)
      s.visible = false
      scene.add(s)
      this.puffs.push({ sprite: s, life: 0, max: 1, vel: new THREE.Vector3(), grow: 1 })
    }
    this.puffIndex = 0

    for (let i = 0; i < 2; i++) {
      const light = new THREE.PointLight(0xffb060, 0, 9, 2)
      light.visible = false
      scene.add(light)
      this.flashes.push({ light, life: 0 })
    }
    this.flashIndex = 0

    this.decalIndex = 0
    this.maxDecals = 36
  }

  tracer(from, to, color = 0xffd08a, width = 1) {
    const t = this.tracers.find(x => x.life <= 0) || this.tracers[0]
    const dist = from.distanceTo(to)
    if (dist < 0.2) return
    t.mesh.position.copy(from)
    t.mesh.lookAt(to)
    t.mesh.scale.set(width, width, dist)
    t.mesh.material.color.setHex(color)
    t.mesh.material.opacity = 0.95
    t.mesh.visible = true
    t.life = 0.055
    t.max = 0.055
  }

  sparksAt(point, normal, count = 10, color = 0xffb15e) {
    const posArr = this.sparkPoints.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      const d = this.sparkData[this.sparkIndex]
      d.pos.copy(point)
      d.vel.set(
        normal.x * 2.2 + (Math.random() - 0.5) * 4.5,
        normal.y * 2.2 + Math.random() * 4.5,
        normal.z * 2.2 + (Math.random() - 0.5) * 4.5
      )
      d.life = d.max = 0.22 + Math.random() * 0.45
      const j = this.sparkIndex * 3
      posArr[j] = point.x; posArr[j + 1] = point.y; posArr[j + 2] = point.z
      this.sparkIndex = (this.sparkIndex + 1) % this.sparkData.length
    }
    this.sparkPoints.material.color.setHex(color)
    this.sparkPoints.geometry.attributes.position.needsUpdate = true
  }

  bloodAt(point, dir, count = 8) {
    const posArr = this.bloodPoints.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      const d = this.bloodData[this.bloodIndex]
      d.pos.copy(point)
      d.vel.copy(dir).multiplyScalar(0.8).add(new THREE.Vector3(
        (Math.random() - 0.5) * 2.4, Math.random() * 1.8, (Math.random() - 0.5) * 2.4
      ))
      d.life = d.max = 0.35 + Math.random() * 0.4
      const j = this.bloodIndex * 3
      posArr[j] = point.x; posArr[j + 1] = point.y; posArr[j + 2] = point.z
      this.bloodIndex = (this.bloodIndex + 1) % this.bloodData.length
    }
    this.bloodPoints.geometry.attributes.position.needsUpdate = true
  }

  puff(point, size = 0.4, color = 0x9d8c74, opacity = 0.4, life = 0.8) {
    const p = this.puffs[this.puffIndex]
    this.puffIndex = (this.puffIndex + 1) % this.puffs.length
    p.sprite.position.copy(point)
    p.sprite.scale.setScalar(size)
    p.sprite.material.color.setHex(color)
    p.sprite.material.opacity = opacity
    p.sprite.visible = true
    p.life = p.max = life
    p.grow = size
    p.vel.set((Math.random() - 0.5) * 0.5, 0.5 + Math.random() * 0.4, (Math.random() - 0.5) * 0.5)
  }

  impact(point, normal, material = 'concrete') {
    this.sparksAt(point, normal, 8, material === 'metal' ? 0xffe2a0 : 0xffb15e)
    this.puff(point, 0.22, material === 'metal' ? 0x7d7a72 : 0xa5947a, 0.5, 0.55)
    this.flash(point, 0xffa050, 6)
    if (this.decals.length < this.maxDecals) {
      const d = new THREE.Mesh(
        new THREE.PlaneGeometry(0.22, 0.22),
        new THREE.MeshBasicMaterial({ map: makeDecal('scorch', 88), transparent: true, opacity: 0.75, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -3 })
      )
      d.position.copy(point).addScaledVector(normal, 0.012)
      d.lookAt(point.clone().add(normal))
      this.scene.add(d)
      this.decals.push({ mesh: d, life: 20 })
    } else {
      const d = this.decals[this.decalIndex]
      this.decalIndex = (this.decalIndex + 1) % this.maxDecals
      d.mesh.position.copy(point).addScaledVector(normal, 0.012)
      d.mesh.lookAt(point.clone().add(normal))
      d.life = 20
    }
  }

  flash(point, color = 0xffa050, intensity = 12, distance = 7) {
    const f = this.flashes[this.flashIndex]
    this.flashIndex = (this.flashIndex + 1) % this.flashes.length
    f.light.position.copy(point)
    f.light.color.setHex(color)
    f.light.distance = distance
    f.light.intensity = intensity
    f.light.visible = true
    f.life = 0.07
  }

  explosion(point) {
    this.flash(point, 0xff7a24, 140, 24)
    this.sparksAt(point, new THREE.Vector3(0, 1, 0), 70, 0xffa040)
    for (let i = 0; i < 10; i++) {
      const p = point.clone().add(new THREE.Vector3((Math.random() - 0.5) * 1.4, Math.random() * 0.8, (Math.random() - 0.5) * 1.4))
      this.puff(p, 1 + Math.random() * 1.6, 0x3a2e25, 0.55, 1.8)
    }
  }

  update(dt) {
    this.time += dt
    for (const t of this.tracers) {
      if (t.life > 0) {
        t.life -= dt
        t.mesh.material.opacity = Math.max(0, t.life / t.max) * 0.95
        if (t.life <= 0) t.mesh.visible = false
      }
    }
    const posArr = this.sparkPoints.geometry.attributes.position.array
    for (let i = 0; i < this.sparkData.length; i++) {
      const d = this.sparkData[i]
      if (d.life <= 0) continue
      d.life -= dt
      d.vel.y -= 11 * dt
      d.pos.addScaledVector(d.vel, dt)
      const j = i * 3
      posArr[j] = d.pos.x; posArr[j + 1] = d.pos.y; posArr[j + 2] = d.pos.z
    }
    this.sparkPoints.geometry.attributes.position.needsUpdate = true
    this.sparkPoints.material.opacity = 0.9

    const bArr = this.bloodPoints.geometry.attributes.position.array
    for (let i = 0; i < this.bloodData.length; i++) {
      const d = this.bloodData[i]
      if (d.life <= 0) continue
      d.life -= dt
      d.vel.y -= 9 * dt
      d.pos.addScaledVector(d.vel, dt)
      const j = i * 3
      bArr[j] = d.pos.x; bArr[j + 1] = d.pos.y; bArr[j + 2] = d.pos.z
    }
    this.bloodPoints.geometry.attributes.position.needsUpdate = true

    for (const p of this.puffs) {
      if (p.life <= 0) continue
      p.life -= dt
      const k = 1 - p.life / p.max
      p.sprite.position.addScaledVector(p.vel, dt)
      p.sprite.scale.setScalar(p.grow + k * 1.3)
      p.sprite.material.opacity = Math.max(0, (1 - k) * 0.5)
      if (p.life <= 0) p.sprite.visible = false
    }
    for (const f of this.flashes) {
      if (f.life > 0) {
        f.life -= dt
        if (f.life <= 0) { f.light.intensity = 0; f.light.visible = false }
      }
    }
    for (const d of this.decals) {
      d.life -= dt
      if (d.life <= 0) d.mesh.visible = false
    }
  }
}
