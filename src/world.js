import * as THREE from 'three'
import {
  sandSurface, concreteSurface, containerSurface, metalSurface, woodSurface,
  hescoSurface, repeatSet, makeDecal, puffTexture
} from './textures.js'

// ---------------------------------------------------------------------------
// OPERATION BLACKSITE — a hand-built desert compound at dusk.
// All geometry is procedural. The world exposes simple AABB collision, spawn
// points and a raycast mesh list for weapon / AI line-of-sight checks.
// ---------------------------------------------------------------------------

const SUN_DIR = new THREE.Vector3(-0.62, 0.16, -0.77).normalize()
const V = (x, y, z) => new THREE.Vector3(x, y, z)

export function buildWorld(scene, renderer) {
  const colliders = []
  const raycastMeshes = []
  const dynamic = []
  const spawnPoints = []
  const rng = mulberry32(1337)

  scene.fog = new THREE.FogExp2(0x9b7a5d, 0.0105)
  scene.background = new THREE.Color(0x7d6b58)

  const sky = createSky()
  scene.add(sky.mesh)

  // A tiny hand-painted equirectangular sky gives the PBR materials a warm
  // bounce without the cost of rendering a full PMREM scene.
  try {
    const pmrem = new THREE.PMREMGenerator(renderer)
    const c = document.createElement('canvas')
    c.width = 256; c.height = 128
    const ctx = c.getContext('2d')
    const grad = ctx.createLinearGradient(0, 0, 0, 128)
    grad.addColorStop(0, '#243a56')
    grad.addColorStop(0.42, '#b47b50')
    grad.addColorStop(0.52, '#e2a169')
    grad.addColorStop(0.56, '#7a6045')
    grad.addColorStop(1, '#3a2c1f')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 256, 128)
    const sun = ctx.createRadialGradient(196, 66, 0, 196, 66, 34)
    sun.addColorStop(0, 'rgba(255,226,176,1)')
    sun.addColorStop(0.22, 'rgba(255,178,100,0.85)')
    sun.addColorStop(1, 'rgba(255,150,80,0)')
    ctx.fillStyle = sun
    ctx.fillRect(150, 20, 100, 92)
    const envTex = new THREE.CanvasTexture(c)
    envTex.mapping = THREE.EquirectangularReflectionMapping
    envTex.colorSpace = THREE.SRGBColorSpace
    scene.environment = pmrem.fromEquirectangular(envTex).texture
    scene.environmentIntensity = 0.55
    pmrem.dispose()
    envTex.dispose()
  } catch (e) {
    console.warn('Environment map skipped', e)
  }

  // ---- lights -------------------------------------------------------------
  const sun = new THREE.DirectionalLight(0xffb077, 3.1)
  sun.position.copy(SUN_DIR).multiplyScalar(95)
  sun.castShadow = true
  sun.shadow.mapSize.set(1024, 1024)
  sun.shadow.camera.near = 10
  sun.shadow.camera.far = 190
  sun.shadow.camera.left = -58
  sun.shadow.camera.right = 58
  sun.shadow.camera.top = 58
  sun.shadow.camera.bottom = -58
  sun.shadow.bias = -0.00035
  sun.shadow.normalBias = 0.035
  scene.add(sun)
  scene.add(sun.target)

  const hemi = new THREE.HemisphereLight(0x9cb9db, 0x5b422b, 0.95)
  scene.add(hemi)
  const fill = new THREE.DirectionalLight(0x7897c4, 0.5)
  fill.position.set(38, 24, 46)
  scene.add(fill)

  // ---- shared materials ---------------------------------------------------
  const sand = repeatSet(sandSurface(), 30, 30)
  const sandMat = new THREE.MeshStandardMaterial({
    map: sand.map, normalMap: sand.normalMap, roughnessMap: sand.roughnessMap,
    color: 0xd9b98d, roughness: 0.97, metalness: 0.0,
    normalScale: new THREE.Vector2(1.1, 1.1)
  })

  const ground = new THREE.Mesh(new THREE.PlaneGeometry(190, 190, 1, 1), sandMat)
  ground.rotation.x = -Math.PI / 2
  ground.receiveShadow = true
  ground.userData.solid = true
  scene.add(ground)
  raycastMeshes.push(ground)

  const concrete = repeatSet(concreteSurface('#8d8373', 5), 3, 2)
  const concreteMat = new THREE.MeshStandardMaterial({
    map: concrete.map, normalMap: concrete.normalMap, roughnessMap: concrete.roughnessMap,
    color: 0xc2b49c, roughness: 0.92, metalness: 0.02
  })
  const concreteDark = repeatSet(concreteSurface('#6f675b', 9), 3, 2)
  const concreteDarkMat = new THREE.MeshStandardMaterial({
    map: concreteDark.map, normalMap: concreteDark.normalMap, roughnessMap: concreteDark.roughnessMap,
    color: 0xa89b88, roughness: 0.94, metalness: 0.02
  })

  const metal = repeatSet(metalSurface('#565a5c', 31), 2, 2)
  const metalMat = new THREE.MeshStandardMaterial({
    map: metal.map, normalMap: metal.normalMap, roughnessMap: metal.roughnessMap,
    color: 0x8b8d8e, roughness: 0.55, metalness: 0.78
  })
  const darkMetalMat = new THREE.MeshStandardMaterial({ color: 0x24272a, roughness: 0.5, metalness: 0.7 })
  const rustMat = new THREE.MeshStandardMaterial({ color: 0x6b3b22, roughness: 0.92, metalness: 0.2 })
  const wood = repeatSet(woodSurface(), 2, 2)
  const woodMat = new THREE.MeshStandardMaterial({
    map: wood.map, normalMap: wood.normalMap, roughnessMap: wood.roughnessMap,
    color: 0xb08a5e, roughness: 0.88, metalness: 0.02
  })
  const hesco = repeatSet(hescoSurface('#9d8769', 51), 2, 1)
  const hescoMat = new THREE.MeshStandardMaterial({
    map: hesco.map, normalMap: hesco.normalMap, roughnessMap: hesco.roughnessMap,
    color: 0xc0a886, roughness: 0.96, metalness: 0.0
  })
  const sandbagMat = new THREE.MeshStandardMaterial({ color: 0x8d7958, roughness: 0.98, metalness: 0 })
  const glassMat = new THREE.MeshStandardMaterial({
    color: 0x0a1116, roughness: 0.12, metalness: 0.65,
    emissive: 0x0a1c24, emissiveIntensity: 0.7
  })
  const emissiveWarm = new THREE.MeshStandardMaterial({
    color: 0x120b05, emissive: 0xffa04a, emissiveIntensity: 3.2, roughness: 0.4
  })
  const emissiveRed = new THREE.MeshStandardMaterial({
    color: 0x140303, emissive: 0xff2a18, emissiveIntensity: 2.4, roughness: 0.4
  })
  const stripeMat = new THREE.MeshStandardMaterial({
    color: 0x2a241c, emissive: 0xff7a1e, emissiveIntensity: 0.35, roughness: 0.8
  })
  const cableMat = new THREE.MeshStandardMaterial({ color: 0x17181a, roughness: 0.7, metalness: 0.3 })

  // ---- helpers ------------------------------------------------------------
  function register(mesh, solid = true) {
    mesh.castShadow = true
    mesh.receiveShadow = true
    if (solid) { mesh.userData.solid = true; raycastMeshes.push(mesh) }
    scene.add(mesh)
    return mesh
  }

  function addCollider(x, z, w, d, h = 3) {
    colliders.push({ minX: x - w / 2, maxX: x + w / 2, minZ: z - d / 2, maxZ: z + d / 2, height: h })
  }

  function box(w, h, d, material, x, y, z, opts = {}) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material)
    mesh.position.set(x, y, z)
    if (opts.rotY) mesh.rotation.y = opts.rotY
    if (opts.rotX) mesh.rotation.x = opts.rotX
    if (opts.rotZ) mesh.rotation.z = opts.rotZ
    register(mesh, opts.solid !== false)
    if (opts.collider !== false) {
      const cos = Math.abs(Math.cos(opts.rotY || 0)), sin = Math.abs(Math.sin(opts.rotY || 0))
      addCollider(x, z, w * cos + d * sin, d * cos + w * sin, y + h / 2)
    }
    return mesh
  }

  function decal(kind, x, z, size, seed, opacity = 0.7, rot = 0) {
    const tex = makeDecal(kind, seed)
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(size, size),
      new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 })
    )
    m.rotation.x = -Math.PI / 2
    m.rotation.z = rot
    m.position.set(x, 0.012, z)
    m.receiveShadow = false
    scene.add(m)
    return m
  }

  // ---- ground dressing ----------------------------------------------------
  for (let i = 0; i < 46; i++) {
    const x = (rng() - 0.5) * 72, z = (rng() - 0.5) * 72
    if (Math.abs(x) < 11 && Math.abs(z) < 9) continue
    decal(rng() > 0.55 ? 'stain' : 'crack', x, z, 3 + rng() * 7, 100 + i, 0.25 + rng() * 0.35, rng() * 6)
  }

  // tire tracks: two long dark strips curving through the compound
  for (const off of [-0.9, 0.9]) {
    const curve = new THREE.CatmullRomCurve3([
      V(-34, 0, 24 + off), V(-16, 0, 18 + off), V(-4, 0, 6 + off),
      V(4, 0, -4 + off), V(20, 0, -12 + off), V(34, 0, -16 + off)
    ])
    const pts = curve.getPoints(80)
    for (let i = 0; i < pts.length - 1; i += 2) {
      const p = pts[i]
      const m = new THREE.Mesh(
        new THREE.PlaneGeometry(0.55, 1.1),
        new THREE.MeshBasicMaterial({ color: 0x3b2f24, transparent: true, opacity: 0.24, depthWrite: false })
      )
      m.rotation.x = -Math.PI / 2
      m.position.set(p.x, 0.014, p.z)
      m.rotation.z = Math.atan2(pts[i + 1].x - p.x, pts[i + 1].z - p.z)
      scene.add(m)
    }
  }

  // ---- perimeter HESCO wall ----------------------------------------------
  const wallHalf = 38
  for (let i = -wallHalf; i <= wallHalf; i += 5.2) {
    for (const side of [-1, 1]) {
      if (Math.abs(i) > wallHalf - 2) continue
      const jitter = (rng() - 0.5) * 0.18
      box(5.05, 2.55, 1.35, hescoMat, i, 1.275, side * wallHalf, { rotY: jitter, collider: false })
      addCollider(i, side * wallHalf, 5.05, 1.35, 2.55)
    }
  }
  for (let i = -wallHalf + 2.6; i <= wallHalf - 2.6; i += 5.2) {
    for (const side of [-1, 1]) {
      box(1.35, 2.55, 5.05, hescoMat, side * wallHalf, 1.275, i, { rotY: (rng() - 0.5) * 0.18, collider: false })
      addCollider(side * wallHalf, i, 1.35, 5.05, 2.55)
    }
  }

  // barbed wire on top of the wall
  const wireMat = new THREE.LineBasicMaterial({ color: 0x22201c, transparent: true, opacity: 0.75 })
  for (const side of [-1, 1]) {
    for (const axis of ['x', 'z']) {
      const pts = []
      for (let i = -wallHalf; i <= wallHalf; i += 1.1) {
        const sag = Math.sin((i + wallHalf) * 0.75) * 0.06
        if (axis === 'x') pts.push(V(i, 2.62 + sag, side * wallHalf))
        else pts.push(V(side * wallHalf, 2.62 + sag, i))
      }
      const geo = new THREE.BufferGeometry().setFromPoints(pts)
      scene.add(new THREE.Line(geo, wireMat))
    }
  }

  // ---- command building ---------------------------------------------------
  buildCommandPost()

  function buildCommandPost() {
    const cx = 0, cz = -1
    // floor
    box(22, 0.35, 17, concreteDarkMat, cx, 0.175, cz, { collider: false, solid: false })
    // front wall (south, +z) with 3.2m doorway
    box(8.4, 3.8, 0.55, concreteMat, -6.2, 1.9, 7.5, { collider: false })
    box(8.4, 3.8, 0.55, concreteMat, 6.2, 1.9, 7.5, { collider: false })
    box(4.4, 1.0, 0.55, concreteMat, 0, 3.3, 7.5, { collider: false })
    addCollider(-6.2, 7.5, 8.4, 0.55, 3.8)
    addCollider(6.2, 7.5, 8.4, 0.55, 3.8)
    // side + back walls
    box(0.55, 3.8, 17, concreteMat, -11, 1.9, cz, { collider: false })
    box(0.55, 3.8, 17, concreteMat, 11, 1.9, cz, { collider: false })
    box(22.55, 3.8, 0.55, concreteMat, cx, 1.9, -9.5, { collider: false })
    addCollider(-11, cz, 0.55, 17, 3.8)
    addCollider(11, cz, 0.55, 17, 3.8)
    addCollider(cx, -9.5, 22.55, 0.55, 3.8)
    // roof / upper floor
    box(22.6, 0.55, 17.6, concreteMat, cx, 4.05, cz, { collider: false, solid: false })
    // roof parapet
    for (const [x, z, w, d] of [[0, 8.2, 22.6, 0.5], [0, -10.2, 22.6, 0.5], [-11.2, -1, 0.5, 17.6], [11.2, -1, 0.5, 17.6]]) {
      box(w, 0.85, d, concreteDarkMat, x, 4.75, z, { collider: false, solid: false })
    }
    // interior columns
    for (const x of [-5.4, 5.4]) for (const z of [-4.4, 3.2]) {
      box(0.55, 3.5, 0.55, concreteMat, x, 1.75, z, { collider: true })
    }
    // facade windows (upper + lower)
    for (const x of [-7.2, -3.2, 3.2, 7.2]) {
      box(1.7, 1.15, 0.08, glassMat, x, 2.5, 7.8, { collider: false, solid: false })
      box(1.95, 0.16, 0.3, concreteDarkMat, x, 1.88, 7.78, { collider: false, solid: false })
    }
    for (const x of [-7.2, -3.2, 3.2, 7.2]) {
      box(1.5, 0.85, 0.08, glassMat, x, 3.55, 7.8, { collider: false, solid: false })
    }
    // side windows
    for (const z of [-6.2, -1, 4.2]) {
      box(0.08, 0.95, 1.5, glassMat, -11.28, 2.45, z, { collider: false, solid: false })
      box(0.08, 0.95, 1.5, glassMat, 11.28, 2.45, z, { collider: false, solid: false })
    }
    // doorway frame + warm interior light
    box(0.25, 3.1, 0.75, darkMetalMat, -2.15, 1.55, 7.5, { collider: false, solid: false })
    box(0.25, 3.1, 0.75, darkMetalMat, 2.15, 1.55, 7.5, { collider: false, solid: false })
    box(4.55, 0.22, 0.75, darkMetalMat, 0, 3.1, 7.5, { collider: false, solid: false })
    const doorLight = new THREE.PointLight(0xffa25a, 22, 16, 2)
    doorLight.position.set(0, 2.7, 6.4)
    scene.add(doorLight)
    const interiorLight = new THREE.PointLight(0xffc27a, 30, 20, 2)
    interiorLight.position.set(0, 3.1, 0)
    scene.add(interiorLight)
    const lampPanel = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.08, 0.5), emissiveWarm)
    lampPanel.position.set(0, 3.62, 2.5)
    scene.add(lampPanel)

    // sandbag emplacement in front of the door
    sandbagWall(-4.5, 12.5, 7, 0.15)
    sandbagWall(5.2, 11.8, 5, -0.1)

    // roof furniture
    box(3.2, 1.5, 2.4, metalMat, 5.5, 5.05, -4.5, { collider: false })
    box(1.2, 0.9, 1.0, darkMetalMat, -6.5, 4.8, -6.0, { collider: false })
    box(0.6, 2.4, 0.6, metalMat, -8.6, 5.8, 2.5, { collider: false, solid: false })
    const dish = new THREE.Mesh(new THREE.SphereGeometry(0.9, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2.4), metalMat)
    dish.rotation.x = Math.PI * 0.42
    dish.rotation.z = 0.4
    dish.position.set(-8.6, 6.5, 2.5)
    register(dish, false)
    sandbagWall(3.5, 6.9, 4, 0, 4.5)
    sandbagWall(-4.8, 6.8, 3, 0, 4.5)
    // roof antenna
    box(0.08, 5.5, 0.08, metalMat, 8.2, 7.0, -7.4, { collider: false, solid: false })
    const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), emissiveRed)
    beacon.position.set(8.2, 9.8, -7.4)
    scene.add(beacon)

    // interior set dressing
    box(2.4, 0.9, 1.1, woodMat, -4, 0.62, -2.0, { collider: true })
    for (let i = 0; i < 3; i++) {
      box(0.62, 0.42, 0.08, new THREE.MeshStandardMaterial({ color: 0x090d10, emissive: 0x2f7f9e, emissiveIntensity: 1.4 }), -4.9 + i * 0.9, 1.15, -2.0, { collider: false, solid: false, rotX: -0.1 })
    }
    box(1.1, 0.65, 1.1, darkMetalMat, 4.5, 0.5, 2.0, { collider: true })
    box(1.0, 0.08, 0.75, darkMetalMat, 4.5, 0.86, 2.0, { collider: false, solid: false })
    box(0.5, 1.25, 0.45, rustMat, 7.8, 0.8, -4.0, { collider: true })
    box(1.8, 0.9, 0.8, woodMat, 7.2, 0.62, -6.2, { collider: true, rotY: 0.3 })
    // hanging cables inside
    addCable([V(-10.6, 3.4, 6.8), V(-3, 3.1, 3), V(3, 3.35, -1), V(10.6, 3.2, -6)], 0.035)
    addCable([V(-10.6, 3.1, -6), V(0, 3.35, -3.5), V(10.6, 3.0, -7.5)], 0.03)
  }

  function addCable(points, radius = 0.04) {
    const curve = new THREE.CatmullRomCurve3(points)
    const geo = new THREE.TubeGeometry(curve, 24, radius, 5, false)
    const m = new THREE.Mesh(geo, cableMat)
    m.castShadow = false
    scene.add(m)
    return m
  }

  // ---- shipping containers ------------------------------------------------
  function addContainer(x, z, rotY, tint, seed, opts = {}) {
    const surface = repeatSet(containerSurface(tint, seed), 2.2, 1.4)
    const material = new THREE.MeshStandardMaterial({
      map: surface.map, normalMap: surface.normalMap, roughnessMap: surface.roughnessMap,
      color: 0xffffff, roughness: 0.72, metalness: 0.45
    })
    const w = 6.2, h = 2.6, d = 2.5
    const g = new THREE.Group()
    g.position.set(x, opts.y || h / 2, z)
    g.rotation.y = rotY
    scene.add(g)
    const body = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material)
    body.castShadow = body.receiveShadow = true
    body.userData.solid = true
    g.add(body)
    raycastMeshes.push(body)
    // corner castings + top rails
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
      const c = new THREE.Mesh(new THREE.BoxGeometry(0.34, h, 0.34), darkMetalMat)
      c.position.set(sx * (w / 2 - 0.1), 0, sz * (d / 2 - 0.1))
      c.castShadow = true
      g.add(c)
    }
    for (const sz of [-1, 1]) {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(w, 0.12, 0.12), darkMetalMat)
      rail.position.set(0, h / 2 - 0.04, sz * d / 2)
      g.add(rail)
    }
    // door end
    const door = new THREE.Mesh(new THREE.BoxGeometry(0.08, h * 0.82, d * 0.86), material)
    door.position.set(w / 2 + 0.02, -0.05, 0)
    g.add(door)
    for (const zz of [-0.3, 0.3]) {
      const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, h * 0.7, 6), metalMat)
      bar.position.set(w / 2 + 0.09, -0.05, zz)
      g.add(bar)
    }
    // roof rust patches
    for (let i = 0; i < 3; i++) {
      const p = new THREE.Mesh(new THREE.PlaneGeometry(1 + rng() * 1.4, 0.8 + rng() * 1.2), new THREE.MeshBasicMaterial({ map: makeDecal('scorch', 70 + i), transparent: true, opacity: 0.35, depthWrite: false }))
      p.rotation.x = -Math.PI / 2
      p.position.set((rng() - 0.5) * 4.5, h / 2 + 0.011, (rng() - 0.5) * 1.6)
      g.add(p)
    }
    const cos = Math.abs(Math.cos(rotY)), sin = Math.abs(Math.sin(rotY))
    addCollider(x, z, w * cos + d * sin, d * cos + w * sin, (opts.y || h / 2) + h / 2)
    return g
  }

  addContainer(-19, 12, 0.08, '#4d5547', 21)
  addContainer(-19, 8.9, 0.08, '#5c4636', 22, { y: 2.6 + 1.3 })
  addContainer(19, 10, -0.12, '#4a4f53', 23)
  addContainer(19.6, 6.6, 0.22, '#5f5a44', 24)
  addContainer(-21, -14, 0.5, '#57503d', 25)
  addContainer(20, -16, -0.35, '#3f4c4f', 26)
  addContainer(-22, -20, 1.2, '#5a4438', 27)
  // container stacked as a small bridge near the east
  addContainer(24, -4, 0.02, '#465044', 28, { y: 4.0 })

  // ---- watchtower ---------------------------------------------------------
  function addWatchtower(x, z) {
    const legMat = metalMat
    for (const sx of [-1.6, 1.6]) for (const sz of [-1.6, 1.6]) {
      box(0.28, 5.6, 0.28, legMat, x + sx, 2.8, z + sz, { collider: false })
      addCollider(x + sx, z + sz, 0.4, 0.4, 5.6)
    }
    box(4.4, 0.3, 4.4, concreteDarkMat, x, 5.75, z, { collider: false, solid: false })
    // railing
    for (const [dx, dz, w, d] of [[0, 2.1, 4.4, 0.12], [0, -2.1, 4.4, 0.12], [-2.1, 0, 0.12, 4.4], [2.1, 0, 0.12, 4.4]]) {
      box(w, 1.05, d, darkMetalMat, x + dx, 6.45, z + dz, { collider: false, solid: false })
    }
    // roof
    box(5.0, 0.18, 5.0, rustMat, x, 8.1, z, { collider: false, solid: false })
    for (const sx of [-2.2, 2.2]) for (const sz of [-2.2, 2.2]) {
      box(0.16, 2.2, 0.16, metalMat, x + sx, 7.0, z + sz, { collider: false, solid: false })
    }
    // ladder
    for (let i = 0; i < 12; i++) {
      box(0.7, 0.06, 0.06, metalMat, x - 2.25, 0.5 + i * 0.45, z, { collider: false, solid: false })
    }
    box(0.06, 5.4, 0.06, metalMat, x - 2.55, 2.8, z - 0.35, { collider: false, solid: false })
    box(0.06, 5.4, 0.06, metalMat, x - 2.55, 2.8, z + 0.35, { collider: false, solid: false })
    // searchlight
    const housing = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.38, 0.5, 12), darkMetalMat)
    housing.rotation.z = Math.PI / 2
    housing.position.set(x + 0.5, 6.9, z)
    register(housing, false)
    const lens = new THREE.Mesh(new THREE.CircleGeometry(0.3, 16), emissiveWarm)
    lens.rotation.y = -Math.PI / 2
    lens.position.set(x + 0.78, 6.9, z)
    scene.add(lens)
    const spot = new THREE.PointLight(0xffb066, 18, 24, 2)
    spot.position.set(x + 0.9, 6.9, z)
    scene.add(spot)
    // sandbags on platform
    sandbagWall(x, z + 1.5, 3, 0, 6.05)
  }
  addWatchtower(25.5, -24.5)

  // ---- antenna mast -------------------------------------------------------
  function addAntenna(x, z) {
    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.22, 14, 8), metalMat)
    mast.position.set(x, 7, z)
    register(mast, true)
    addCollider(x, z, 0.7, 0.7, 14)
    for (let i = 0; i < 5; i++) {
      const arm = new THREE.Mesh(new THREE.BoxGeometry(1.6 - i * 0.15, 0.06, 0.06), metalMat)
      arm.position.set(x, 3.2 + i * 2.1, z)
      scene.add(arm)
    }
    const dish = new THREE.Mesh(new THREE.SphereGeometry(1.5, 18, 10, 0, Math.PI * 2, 0, Math.PI / 3.2), metalMat)
    dish.position.set(x + 0.8, 9.2, z)
    dish.rotation.set(0.2, 0, Math.PI * 0.7)
    register(dish, false)
    const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.13, 8, 8), emissiveRed)
    beacon.position.set(x, 14.1, z)
    scene.add(beacon)
    dynamic.push({ type: 'blink', mesh: beacon, phase: 0 })
  }
  addAntenna(-27, -27)

  // ---- sandbag walls (instanced) -----------------------------------------
  function sandbagWall(x, z, count, rotY = 0, y = 0) {
    const bagGeo = new THREE.CapsuleGeometry(0.19, 0.42, 3, 7)
    bagGeo.rotateZ(Math.PI / 2)
    const inst = new THREE.InstancedMesh(bagGeo, sandbagMat, count * 4 + 8)
    inst.castShadow = inst.receiveShadow = true
    inst.frustumCulled = false
    const dummy = new THREE.Object3D()
    let idx = 0
    const rows = 3
    for (let r = 0; r < rows; r++) {
      const n = count - r
      for (let i = 0; i < n; i++) {
        dummy.position.set(
          (i - (n - 1) / 2) * 0.62 + (r % 2) * 0.14 + (rng() - 0.5) * 0.05,
          y + 0.19 + r * 0.33,
          (rng() - 0.5) * 0.1
        )
        dummy.rotation.set((rng() - 0.5) * 0.08, rotY + (rng() - 0.5) * 0.16, (rng() - 0.5) * 0.1)
        dummy.scale.set(1, 0.88 + rng() * 0.2, 0.9)
        dummy.updateMatrix()
        inst.setMatrixAt(idx++, dummy.matrix)
      }
    }
    inst.count = idx
    inst.instanceMatrix.needsUpdate = true
    inst.position.set(x, 0, z)
    scene.add(inst)
    const cos = Math.abs(Math.cos(rotY)), sin = Math.abs(Math.sin(rotY))
    addCollider(x, z, count * 0.62 * cos + 0.7 * sin, 0.7 * cos + count * 0.62 * sin, y + 1.1)
    return inst
  }

  // defensive positions around the compound
  sandbagWall(-24, 22, 6, 0.35)
  sandbagWall(23, 20, 6, -0.3)
  sandbagWall(-30, 2, 5, Math.PI / 2)
  sandbagWall(30, -2, 5, Math.PI / 2)
  sandbagWall(-13, -20, 5, 0.2)
  sandbagWall(13, -22, 5, -0.2)
  sandbagWall(2, 20, 7, 0.02)

  // ---- jersey barriers ----------------------------------------------------
  function jerseyBarrier(x, z, rotY = 0) {
    const g = new THREE.Group()
    g.position.set(x, 0, z); g.rotation.y = rotY
    const base = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.35, 1.0), concreteDarkMat)
    base.position.y = 0.175
    const body = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.55, 0.62), concreteMat)
    body.position.y = 0.62
    const top = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.42, 0.42), concreteMat)
    top.position.y = 1.05
    const stripe = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.26), stripeMat)
    stripe.position.set(0, 0.62, 0.315)
    for (const m of [base, body, top]) { m.castShadow = m.receiveShadow = true; m.userData.solid = true; g.add(m); raycastMeshes.push(m) }
    g.add(stripe)
    scene.add(g)
    const cos = Math.abs(Math.cos(rotY)), sin = Math.abs(Math.sin(rotY))
    addCollider(x, z, 3.2 * cos + 1.0 * sin, 1.0 * cos + 3.2 * sin, 1.25)
  }
  jerseyBarrier(-8, 18, 0.1)
  jerseyBarrier(9, 17, -0.08)
  jerseyBarrier(-17, 1, Math.PI / 2)
  jerseyBarrier(16, -8, Math.PI / 2 + 0.1)
  jerseyBarrier(-5, -16, 0.2)
  jerseyBarrier(8, -19, -0.15)

  // ---- crates & barrels ---------------------------------------------------
  function crate(x, z, size = 1.15, rotY = 0, y = 0) {
    const g = new THREE.Group()
    g.position.set(x, y + size / 2, z); g.rotation.y = rotY
    const b = new THREE.Mesh(new THREE.BoxGeometry(size, size, size), woodMat)
    b.castShadow = b.receiveShadow = true
    b.userData.solid = true
    g.add(b)
    raycastMeshes.push(b)
    for (const yy of [-0.34, 0.34]) {
      const band = new THREE.Mesh(new THREE.BoxGeometry(size * 1.02, 0.09, size * 1.02), darkMetalMat)
      band.position.y = yy * size
      g.add(band)
    }
    const stencil = new THREE.Mesh(new THREE.PlaneGeometry(size * 0.55, size * 0.22), new THREE.MeshBasicMaterial({ color: 0xc9c0a6, transparent: true, opacity: 0.55 }))
    stencil.position.set(0, 0, size / 2 + 0.006)
    g.add(stencil)
    scene.add(g)
    addCollider(x, z, size * 1.1, size * 1.1, y + size)
    return g
  }
  const cratePositions = [
    [-13, 8, 1.3, 0.2], [-11.4, 8.4, 0.95, -0.3], [-13.1, 9.4, 0.9, 0.6],
    [14, 13, 1.2, -0.2], [15.2, 12.6, 0.8, 0.4], [13.2, 12, 0.7, 0.1],
    [-7, -13, 1.2, 0.1], [-5.7, -13.4, 0.85, -0.4],
    [8.5, 22, 1.1, 0.3], [-11, 22, 1.25, -0.2], [21, 1.5, 0.95, 0.5],
    [-26, -8, 1.2, 0.2], [27, 8, 1.1, -0.3], [-2, -20, 1.15, 0.1]
  ]
  for (const [x, z, s, r] of cratePositions) crate(x, z, s, r)

  function barrel(x, z, color = 0x3d5a46, burning = false) {
    const g = new THREE.Group()
    g.position.set(x, 0, z)
    const m = new THREE.MeshStandardMaterial({ color, roughness: 0.55, metalness: 0.65 })
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 1.0, 14), m)
    body.position.y = 0.5
    body.castShadow = body.receiveShadow = true
    body.userData.solid = true
    g.add(body); raycastMeshes.push(body)
    for (const yy of [0.22, 0.78]) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.365, 0.035, 6, 18), darkMetalMat)
      ring.rotation.x = Math.PI / 2; ring.position.y = yy
      g.add(ring)
    }
    const lid = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.04, 14), metalMat)
    lid.position.y = 1.01
    g.add(lid)
    scene.add(g)
    addCollider(x, z, 0.85, 0.85, 1.05)
    if (burning) addFire(x, z)
    return g
  }
  barrel(-12.5, 15.5, 0x7a3b24, true)
  barrel(17.5, 4.5, 0x3d5a46)
  barrel(18.2, 3.7, 0x525c42)
  barrel(-23, 18, 0x4a3f2e)
  barrel(26, -10, 0x3d5a46)
  barrel(-17.5, -7.5, 0x6b3b22)
  barrel(3.5, 13.5, 0x4a4f53)

  // ---- wrecked technical ------------------------------------------------
  function addTechnical(x, z, rotY) {
    const g = new THREE.Group()
    g.position.set(x, 0, z); g.rotation.y = rotY
    const paint = new THREE.MeshStandardMaterial({ color: 0x4c4b3a, roughness: 0.78, metalness: 0.3 })
    const chassis = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.45, 4.5), darkMetalMat)
    chassis.position.y = 0.62
    const body = new THREE.Mesh(new THREE.BoxGeometry(1.95, 0.72, 2.3), paint)
    body.position.set(0, 1.05, -0.4)
    const hood = new THREE.Mesh(new THREE.BoxGeometry(1.85, 0.55, 1.35), paint)
    hood.position.set(0, 1.0, 1.55)
    const cab = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.62, 1.0), paint)
    cab.position.set(0, 1.58, 0.65)
    const windshield = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.42, 0.06), glassMat)
    windshield.position.set(0, 1.62, 1.14); windshield.rotation.x = -0.25
    const bed = new THREE.Mesh(new THREE.BoxGeometry(1.95, 0.16, 1.6), darkMetalMat)
    bed.position.set(0, 1.32, -1.3)
    const mount = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.2, 0.5, 8), darkMetalMat)
    mount.position.set(0, 1.65, -1.1)
    const gun = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 1.1), darkMetalMat)
    gun.position.set(0, 1.95, -0.7)
    for (const m of [chassis, body, hood, cab, bed, mount, gun]) { m.castShadow = m.receiveShadow = true; g.add(m); if (m !== bed) { m.userData.solid = true; raycastMeshes.push(m) } }
    g.add(windshield)
    for (const sx of [-1, 1]) for (const sz of [-1.5, 1.5]) {
      const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.28, 14), new THREE.MeshStandardMaterial({ color: 0x121212, roughness: 0.95 }))
      wheel.rotation.z = Math.PI / 2
      wheel.position.set(sx * 1.02, 0.42, sz)
      wheel.castShadow = true
      g.add(wheel)
    }
    scene.add(g)
    addCollider(x, z, 2.6, 5.2, 1.7)
  }
  addTechnical(-14, 13, 0.4)

  // ---- rocks & debris -----------------------------------------------------
  const rockMat = new THREE.MeshStandardMaterial({ color: 0x6e5d48, roughness: 1 })
  for (let i = 0; i < 42; i++) {
    const s = 0.12 + rng() * 0.45
    const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(s, 0), rockMat)
    rock.position.set((rng() - 0.5) * 72, s * 0.6, (rng() - 0.5) * 72)
    rock.rotation.set(rng() * 3, rng() * 3, rng() * 3)
    rock.scale.y = 0.55 + rng() * 0.5
    rock.castShadow = rock.receiveShadow = true
    scene.add(rock)
  }
  // scattered papers / debris
  for (let i = 0; i < 30; i++) {
    const p = new THREE.Mesh(new THREE.PlaneGeometry(0.18 + rng() * 0.2, 0.12 + rng() * 0.18), new THREE.MeshStandardMaterial({ color: 0xb0a58a, roughness: 1, side: THREE.DoubleSide }))
    p.rotation.x = -Math.PI / 2; p.rotation.z = rng() * 6
    p.position.set((rng() - 0.5) * 60, 0.015, (rng() - 0.5) * 60)
    scene.add(p)
  }

  // ---- light poles --------------------------------------------------------
  function lightPole(x, z, height = 7, color = 0xffc78a, withLight = true) {
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.11, height, 8), darkMetalMat)
    pole.position.set(x, height / 2, z)
    pole.castShadow = true
    scene.add(pole)
    addCollider(x, z, 0.3, 0.3, height)
    const arm = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.08, 0.08), darkMetalMat)
    arm.position.set(x + 0.6, height - 0.1, z)
    scene.add(arm)
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.12, 0.3), emissiveWarm)
    head.position.set(x + 1.2, height - 0.2, z)
    scene.add(head)
    if (!withLight) return null
    const light = new THREE.PointLight(color, 26, 20, 2)
    light.position.set(x + 1.2, height - 0.4, z)
    scene.add(light)
    return light
  }
  const flickerLights = []
  flickerLights.push({ light: lightPole(-14, 20, 7.5), base: 26, phase: 0 })
  lightPole(14, -10, 8, 0xffc78a, false)
  lightPole(-20, -12, 6.5, 0xffc78a, false)

  // ---- fire / smoke -------------------------------------------------------
  function addFire(x, z) {
    const group = new THREE.Group()
    group.position.set(x, 0.95, z)
    scene.add(group)
    const flames = []
    const tex = puffTexture()
    for (let i = 0; i < 9; i++) {
      const m = new THREE.SpriteMaterial({
        map: tex, color: i < 4 ? 0xffd27a : 0xff7a24, transparent: true,
        blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.8
      })
      const s = new THREE.Sprite(m)
      s.scale.setScalar(0.4 + rng() * 0.5)
      group.add(s)
      flames.push({ sprite: s, phase: rng() * Math.PI * 2, speed: 0.6 + rng() * 0.8, ox: (rng() - 0.5) * 0.2, oz: (rng() - 0.5) * 0.2 })
    }
    const smoke = []
    for (let i = 0; i < 8; i++) {
      const m = new THREE.SpriteMaterial({ map: tex, color: 0x3a312a, transparent: true, depthWrite: false, opacity: 0.22 })
      const s = new THREE.Sprite(m)
      s.scale.setScalar(1 + rng() * 1.2)
      group.add(s)
      smoke.push({ sprite: s, phase: rng() * 6, speed: 0.3 + rng() * 0.3, ox: (rng() - 0.5) * 0.5 })
    }
    const light = new THREE.PointLight(0xff7a2a, 26, 16, 2)
    light.position.set(x, 1.4, z)
    scene.add(light)
    const embers = new THREE.Points(
      new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(new Float32Array(30 * 3), 3)),
      new THREE.PointsMaterial({ color: 0xffa040, size: 0.05, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false })
    )
    embers.position.set(x, 1, z)
    scene.add(embers)
    dynamic.push({ type: 'fire', group, flames, smoke, light, embers, phase: 0 })
  }

  // distant smoke column (industrial haze on the horizon)
  for (const [sx, sz, n] of [[-70, -80, 18], [72, -64, 12]]) {
    for (let i = 0; i < n; i++) {
      const m = new THREE.SpriteMaterial({ map: puffTexture(), color: 0x5a4a3c, transparent: true, depthWrite: false, opacity: 0.16 })
      const s = new THREE.Sprite(m)
      s.position.set(sx + (rng() - 0.5) * 22, 10 + i * 3 + rng() * 6, sz + (rng() - 0.5) * 16)
      s.scale.setScalar(12 + rng() * 16)
      scene.add(s)
    }
  }

  // ---- dust motes ---------------------------------------------------------
  const dustCount = 700
  const dustPos = new Float32Array(dustCount * 3)
  for (let i = 0; i < dustCount; i++) {
    dustPos[i * 3] = (rng() - 0.5) * 80
    dustPos[i * 3 + 1] = rng() * 9
    dustPos[i * 3 + 2] = (rng() - 0.5) * 80
  }
  const dustGeo = new THREE.BufferGeometry()
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3))
  const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({
    color: 0xffd9a8, size: 0.035, transparent: true, opacity: 0.38,
    depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true
  }))
  scene.add(dust)

  // ---- flags / banners ----------------------------------------------------
  function addBanner(x, z, rotY, color) {
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 5, 6), metalMat)
    pole.position.set(x, 2.5, z); pole.castShadow = true
    scene.add(pole)
    const cloth = new THREE.Mesh(
      new THREE.PlaneGeometry(1.5, 2.2, 10, 8),
      new THREE.MeshStandardMaterial({ color, roughness: 0.9, side: THREE.DoubleSide })
    )
    cloth.position.set(x + 0.75 * Math.cos(rotY), 3.7, z - 0.75 * Math.sin(rotY))
    cloth.rotation.y = rotY
    cloth.castShadow = true
    scene.add(cloth)
    dynamic.push({ type: 'flag', cloth, base: cloth.geometry.attributes.position.array.slice(), phase: rng() * 6 })
  }
  addBanner(-3, -10.5, 0, 0x7a2e22)
  addBanner(8, 8.6, 0.2, 0x2f3d31)

  // ---- spawn points -------------------------------------------------------
  spawnPoints.push(
    V(-30, 0, -30), V(0, 0, -32), V(30, 0, -30),
    V(32, 0, -8), V(-32, 0, 6), V(28, 0, 22),
    V(-28, 0, 22), V(-34, 0, -12), V(33, 0, 8),
    V(10, 0, -31), V(-12, 0, -31),
    V(15, 0, 1), V(-15, 0, 3), V(0, 0, -18),
    V(-9, 0, -13), V(10, 0, -13), V(-17, 0, 16), V(17, 0, 15)
  )

  // ---- update -------------------------------------------------------------
  let time = 0
  const tmp = new THREE.Vector3()
  function update(dt, playerPos) {
    time += dt
    sky.material.uniforms.uTime.value = time
    // dust drifts and wraps around the player
    const arr = dustGeo.attributes.position.array
    for (let i = 0; i < dustCount; i++) {
      arr[i * 3] += dt * (0.18 + (i % 5) * 0.02)
      arr[i * 3 + 1] += Math.sin(time * 0.4 + i) * dt * 0.03
      if (playerPos && Math.abs(arr[i * 3] - playerPos.x) > 42) arr[i * 3] = playerPos.x - 42 * Math.sign(arr[i * 3] - playerPos.x)
      if (arr[i * 3 + 1] > 9) arr[i * 3 + 1] = 0.2
    }
    dustGeo.attributes.position.needsUpdate = true

    for (const d of dynamic) {
      if (d.type === 'fire') {
        for (const f of d.flames) {
          const p = (time * f.speed + f.phase) % 1
          f.sprite.position.set(f.ox + Math.sin(time * 2 + f.phase) * 0.06, p * 1.1, f.oz + Math.cos(time * 1.7 + f.phase) * 0.06)
          f.sprite.scale.setScalar(0.28 + (1 - p) * 0.5 + Math.sin(time * 9 + f.phase) * 0.05)
          f.sprite.material.opacity = 0.75 * (1 - p) * (0.7 + 0.3 * Math.sin(time * 12 + f.phase))
        }
        for (const s of d.smoke) {
          const p = (time * s.speed + s.phase) % 1
          s.sprite.position.set(s.ox + p * 0.9 + Math.sin(time + s.phase) * 0.2, 0.8 + p * 5.5, s.ox + Math.cos(time * 0.7 + s.phase) * 0.2)
          s.sprite.scale.setScalar(1 + p * 3.4)
          s.sprite.material.opacity = 0.24 * (1 - p) * Math.min(1, p * 4)
        }
        const emberArr = d.embers.geometry.attributes.position.array
        for (let i = 0; i < emberArr.length / 3; i++) {
          const p = (time * (0.4 + (i % 7) * 0.08) + i * 0.13) % 1
          emberArr[i * 3] = Math.sin(i * 2.4 + time) * 0.5 * (1 - p)
          emberArr[i * 3 + 1] = p * 3.2
          emberArr[i * 3 + 2] = Math.cos(i * 1.9 + time * 0.8) * 0.5 * (1 - p)
        }
        d.embers.geometry.attributes.position.needsUpdate = true
        d.light.intensity = 22 + Math.sin(time * 13) * 5 + Math.sin(time * 7.3) * 4
      } else if (d.type === 'blink') {
        d.mesh.material.emissiveIntensity = 1.2 + (Math.sin(time * 3 + d.phase) > 0.3 ? 2.8 : 0)
      } else if (d.type === 'flag') {
        const pos = d.cloth.geometry.attributes.position
        for (let i = 0; i < pos.count; i++) {
          const x = d.base[i * 3], y = d.base[i * 3 + 1]
          pos.setZ(i, Math.sin(time * 2.2 + x * 2.6 + y * 0.8 + d.phase) * 0.12 * (0.5 + x + 0.75))
        }
        pos.needsUpdate = true
        d.cloth.geometry.computeVertexNormals()
      }
    }
    for (const f of flickerLights) {
      f.light.intensity = f.base * (0.82 + 0.12 * Math.sin(time * 11 + f.phase) + 0.06 * Math.sin(time * 27 + f.phase * 2))
    }
  }

  // ---- collision ----------------------------------------------------------
  function collide(pos, radius) {
    for (const c of colliders) {
      const cx = Math.max(c.minX, Math.min(pos.x, c.maxX))
      const cz = Math.max(c.minZ, Math.min(pos.z, c.maxZ))
      let dx = pos.x - cx, dz = pos.z - cz
      const d2 = dx * dx + dz * dz
      if (d2 > radius * radius) continue
      if (d2 > 1e-8) {
        const d = Math.sqrt(d2)
        const push = (radius - d) / d
        pos.x += dx * push
        pos.z += dz * push
      } else {
        // center inside box: push out along smallest axis
        const left = pos.x - c.minX, right = c.maxX - pos.x
        const back = pos.z - c.minZ, front = c.maxZ - pos.z
        const m = Math.min(left, right, back, front)
        if (m === left) pos.x = c.minX - radius
        else if (m === right) pos.x = c.maxX + radius
        else if (m === back) pos.z = c.minZ - radius
        else pos.z = c.maxZ + radius
      }
    }
    pos.x = Math.max(-wallHalf + 1.5, Math.min(wallHalf - 1.5, pos.x))
    pos.z = Math.max(-wallHalf + 1.5, Math.min(wallHalf - 1.5, pos.z))
    return pos
  }

  // Height is flat, but expose it for future ramps.
  function groundHeight() { return 0 }

  return { colliders, raycastMeshes, spawnPoints, sun, sky, update, collide, groundHeight, bounds: wallHalf }
}

// ---------------------------------------------------------------------------
// Sky dome
// ---------------------------------------------------------------------------
function createSky() {
  const uniforms = {
    uSunDir: { value: SUN_DIR.clone() },
    uTime: { value: 0 },
    uZenith: { value: new THREE.Color(0x172a46) },
    uHorizon: { value: new THREE.Color(0xd98d55) },
    uHaze: { value: new THREE.Color(0xf1b073) },
    uSunColor: { value: new THREE.Color(0xffd2a1) }
  }
  const material = new THREE.ShaderMaterial({
    uniforms,
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    vertexShader: /* glsl */`
      varying vec3 vWorld;
      void main() {
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorld = wp.xyz;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,
    fragmentShader: /* glsl */`
      precision highp float;
      uniform vec3 uSunDir, uZenith, uHorizon, uHaze, uSunColor;
      uniform float uTime;
      varying vec3 vWorld;

      float hash(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }
      float noise(vec2 p) {
        vec2 i = floor(p), f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash(i), b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }
      float fbm(vec2 p) {
        float v = 0.0, a = 0.5;
        for (int i = 0; i < 5; i++) { v += a * noise(p); p = p * 2.02 + 11.7; a *= 0.5; }
        return v;
      }

      void main() {
        vec3 dir = normalize(vWorld - cameraPosition);
        float h = clamp(dir.y, 0.0, 1.0);
        vec3 col = mix(uHorizon, uZenith, pow(h, 0.58));

        float sunDot = max(dot(dir, uSunDir), 0.0);
        // atmospheric glow around the sun
        col += uSunColor * pow(sunDot, 6.0) * 0.34;
        col += uSunColor * pow(sunDot, 42.0) * 0.8;
        // sun disc
        col += uSunColor * smoothstep(0.99955, 0.99985, sunDot) * 3.6;

        // warm horizon haze
        float haze = exp(-max(dir.y, 0.0) * 7.0);
        col = mix(col, uHaze, haze * 0.46);

        // high cirrus clouds, lit from below by the setting sun
        if (dir.y > 0.015) {
          vec2 uv = dir.xz / (dir.y + 0.16) * 0.5;
          uv += vec2(uTime * 0.0016, uTime * 0.0007);
          float cloud = fbm(uv * 2.6 + vec2(3.1, 1.7));
          cloud = smoothstep(0.52, 0.78, cloud);
          float wisp = fbm(uv * 7.0 + 8.0) * 0.35;
          cloud *= smoothstep(0.0, 0.18, dir.y) * (0.65 + wisp);
          vec3 cloudCol = mix(vec3(0.24, 0.20, 0.23), vec3(1.05, 0.62, 0.38), pow(sunDot, 2.5));
          col = mix(col, cloudCol, cloud * 0.58);
        }

        // horizon dust band
        col = mix(col, vec3(0.55, 0.38, 0.26), smoothstep(0.02, -0.05, dir.y) * 0.5);

        // filmic-ish dithering to avoid banding
        float d = hash(gl_FragCoord.xy) / 255.0;
        gl_FragColor = vec4(col + d, 1.0);
      }
    `
  })
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(450, 48, 32), material)
  mesh.frustumCulled = false
  return { mesh, material }
}

function mulberry32(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0
    let t = Math.imul(a ^ a >>> 15, 1 | a)
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t
    return ((t ^ t >>> 14) >>> 0) / 4294967296
  }
}
