import * as THREE from 'three'

// ---------------------------------------------------------------------------
// HUD controller: DOM updates, compass strip, kill feed, tactical map.
// ---------------------------------------------------------------------------

export class HUD {
  constructor() {
    this.el = {
      hud: document.getElementById('hud'),
      healthValue: document.getElementById('health-value'),
      healthFill: document.getElementById('health-fill'),
      status: document.getElementById('status-text'),
      ammoMag: document.getElementById('ammo-mag'),
      ammoReserve: document.getElementById('ammo-reserve'),
      reloadHint: document.getElementById('reload-hint'),
      wave: document.getElementById('wave-label'),
      enemyCount: document.getElementById('enemy-count'),
      objective: document.getElementById('objective-text'),
      score: document.getElementById('score'),
      killfeed: document.getElementById('killfeed'),
      crosshair: document.getElementById('crosshair'),
      hitmarker: document.getElementById('hitmarker'),
      damage: document.getElementById('damage'),
      lowHealth: document.getElementById('low-health'),
      banner: document.getElementById('banner'),
      bannerKicker: document.getElementById('banner-kicker'),
      bannerTitle: document.getElementById('banner-title'),
      bannerSub: document.getElementById('banner-sub'),
      compass: document.getElementById('compass-strip'),
      heading: document.getElementById('heading'),
      minimap: document.getElementById('minimap'),
      hint: document.getElementById('hint'),
      fps: document.getElementById('fps')
    }
    this.mapCtx = this.el.minimap.getContext('2d')
    this.kills = []
    this.bannerTimer = 0
    this.damageTimer = 0
    this.hitTimer = 0
    this.mapTimer = 0
    this.buildCompass()
    this.setHealth(100)
    this.setAmmo(30, 120)
  }

  show() { this.el.hud.classList.remove('hidden') }
  hide() { this.el.hud.classList.add('hidden') }

  buildCompass() {
    const frag = document.createDocumentFragment()
    const dirs = { 0: 'N', 45: 'NE', 90: 'E', 135: 'SE', 180: 'S', 225: 'SW', 270: 'W', 315: 'NW' }
    for (let d = -360; d <= 720; d += 15) {
      const norm = ((d % 360) + 360) % 360
      const tick = document.createElement('div')
      tick.className = 'compass-tick' + (norm % 90 === 0 ? ' major' : '')
      tick.textContent = dirs[norm] || (norm % 45 === 0 ? String(norm).padStart(3, '0') : '')
      frag.appendChild(tick)
    }
    this.el.compass.appendChild(frag)
    this.tickWidth = 34
  }

  updateCompass(yaw) {
    const heading = ((-yaw * 180 / Math.PI) % 360 + 360) % 360
    const offset = -((heading / 15) + 24) * this.tickWidth
    this.el.compass.style.transform = `translateX(${offset.toFixed(1)}px)`
    this.el.heading.textContent = String(Math.round(heading) % 360).padStart(3, '0')
  }

  setHealth(hp) {
    const v = Math.max(0, Math.min(100, hp))
    this.el.healthValue.textContent = String(Math.ceil(v))
    this.el.healthFill.style.width = `${v}%`
    this.el.healthFill.classList.toggle('low', v < 35)
    this.el.lowHealth.classList.toggle('active', v > 0 && v < 30)
    this.el.status.textContent = v < 30 ? 'CRITICAL' : v < 60 ? 'WOUNDED' : 'COMBAT READY'
  }

  setAmmo(mag, reserve) {
    this.el.ammoMag.textContent = String(mag)
    this.el.ammoReserve.textContent = String(reserve)
    this.el.ammoMag.classList.toggle('empty', mag === 0)
    this.el.reloadHint.classList.toggle('show', mag === 0 && reserve > 0)
  }

  setReloading(on) {
    this.el.reloadHint.classList.toggle('show', on)
  }

  setWave(n, alive) {
    this.el.wave.textContent = `WAVE ${String(n).padStart(2, '0')}`
    this.el.enemyCount.textContent = `HOSTILES ${String(alive).padStart(2, '0')}`
    this.el.objective.textContent = n > 3 ? 'BREAK THE FINAL ASSAULT' : 'HOLD THE COMPOUND'
  }

  setScore(score) {
    this.el.score.textContent = String(score).padStart(6, '0')
  }

  setSpread(spread) {
    this.el.crosshair.style.setProperty('--spread', `${(5 + spread * 420).toFixed(1)}px`)
  }

  setADS(on) {
    this.el.crosshair.classList.toggle('ads', on)
  }

  hit(kill = false) {
    const h = this.el.hitmarker
    h.classList.remove('active', 'kill')
    void h.offsetWidth
    h.classList.add('active')
    if (kill) h.classList.add('kill')
    this.hitTimer = kill ? 0.3 : 0.18
  }

  damage(amount) {
    this.damageTimer = Math.min(0.65, 0.18 + amount * 0.035)
    this.el.damage.style.opacity = String(Math.min(0.95, 0.28 + amount * 0.06))
  }

  banner(kicker, title, sub, duration = 2.6) {
    this.el.bannerKicker.textContent = kicker
    this.el.bannerTitle.textContent = title
    this.el.bannerSub.textContent = sub
    this.el.banner.classList.add('show')
    this.bannerTimer = duration
  }

  killfeed(headshot = false, name = 'HOSTILE') {
    const div = document.createElement('div')
    div.className = 'kill-entry'
    div.innerHTML = `YOU <b>›</b> ${name}${headshot ? '<span class="hs">HEADSHOT</span>' : ''}`
    this.el.killfeed.prepend(div)
    this.kills.push({ el: div, life: 4.2 })
    while (this.el.killfeed.children.length > 5) this.el.killfeed.lastChild.remove()
  }

  hint(text) { this.el.hint.textContent = text }

  update(dt, playerPos, enemies, colliders, yaw) {
    this.updateCompass(yaw)
    if (this.bannerTimer > 0) {
      this.bannerTimer -= dt
      if (this.bannerTimer <= 0) this.el.banner.classList.remove('show')
    }
    if (this.damageTimer > 0) {
      this.damageTimer -= dt
      if (this.damageTimer <= 0) this.el.damage.style.opacity = '0'
    }
    if (this.hitTimer > 0) this.hitTimer -= dt
    for (const k of this.kills) {
      k.life -= dt
      if (k.life <= 0) k.el.remove()
    }
    this.kills = this.kills.filter(k => k.life > 0)

    this.mapTimer -= dt
    if (this.mapTimer <= 0 && playerPos) {
      this.mapTimer = 0.08
      this.drawMap(playerPos, enemies, colliders, yaw)
    }
  }

  drawMap(playerPos, enemies, colliders, yaw) {
    const ctx = this.mapCtx
    const W = 190, H = 190
    const scale = 2.25
    const cx = W / 2, cy = H / 2
    ctx.clearRect(0, 0, W, H)
    ctx.fillStyle = 'rgba(6,9,8,0.72)'
    ctx.fillRect(0, 0, W, H)

    // range rings
    ctx.strokeStyle = 'rgba(216,196,162,0.12)'
    ctx.lineWidth = 1
    for (const r of [26, 52, 78]) {
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke()
    }
    ctx.beginPath(); ctx.moveTo(cx, 8); ctx.lineTo(cx, H - 8); ctx.moveTo(8, cy); ctx.lineTo(W - 8, cy); ctx.stroke()

    // world geometry
    ctx.fillStyle = 'rgba(190,170,136,0.17)'
    for (const c of colliders) {
      const x = cx + c.minX * scale, z = cy + c.minZ * scale
      const w = (c.maxX - c.minX) * scale, d = (c.maxZ - c.minZ) * scale
      if (x + w < 0 || x > W || z + d < 0 || z > H) continue
      ctx.fillRect(x, z, w, d)
    }

    // enemies
    for (const e of enemies) {
      if (!e || !e.alive) continue
      const x = cx + e.group.position.x * scale
      const z = cy + e.group.position.z * scale
      ctx.fillStyle = '#ff3f30'
      ctx.beginPath(); ctx.arc(x, z, 2.4, 0, Math.PI * 2); ctx.fill()
      ctx.strokeStyle = 'rgba(255,63,48,0.25)'
      ctx.beginPath(); ctx.arc(x, z, 5.5, 0, Math.PI * 2); ctx.stroke()
    }

    // player arrow
    const px = cx + playerPos.x * scale, pz = cy + playerPos.z * scale
    ctx.save()
    ctx.translate(px, pz)
    ctx.rotate(-yaw)
    ctx.fillStyle = '#ffc46b'
    ctx.beginPath(); ctx.moveTo(0, -7); ctx.lineTo(5, 5); ctx.lineTo(0, 2.5); ctx.lineTo(-5, 5); ctx.closePath(); ctx.fill()
    ctx.restore()

    // view cone
    ctx.save()
    ctx.translate(px, pz)
    ctx.rotate(-yaw)
    const grad = ctx.createLinearGradient(0, 0, 0, -44)
    grad.addColorStop(0, 'rgba(245,167,66,0.20)')
    grad.addColorStop(1, 'rgba(245,167,66,0)')
    ctx.fillStyle = grad
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-24, -44); ctx.lineTo(24, -44); ctx.closePath(); ctx.fill()
    ctx.restore()
  }
}
