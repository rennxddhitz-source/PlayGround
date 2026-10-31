export class HUD {
  constructor() {
    const $ = (id) => document.getElementById(id);
    this.root = $('hud');
    this.waveEl = $('wave');
    this.hostilesEl = $('hostiles');
    this.scoreEl = $('score');
    this.healthBar = $('healthbar');
    this.healthNum = $('healthnum');
    this.status = $('status');
    this.ammoEl = $('ammo');
    this.ammoMag = $('ammo-mag');
    this.ammoReserve = $('ammo-reserve');
    this.reloadHint = $('reload-hint');
    this.crosshair = $('crosshair');
    this.hitmarker = $('hitmarker');
    this.killfeed = $('killfeed');
    this.bannerEl = $('banner');
    this.bannerTitle = $('banner-title');
    this.bannerSub = $('banner-sub');
    this.damageEl = $('damage');
    this.flashEl = $('flash');
    this.fpsEl = $('fps');

    this._bannerTimer = null;
    this._damageTimer = null;
    this._fpsAccum = 0;
    this._fpsFrames = 0;
  }

  show() { this.root.classList.remove('hidden'); }
  hide() { this.root.classList.add('hidden'); }

  setHealth(hp, max = 100) {
    const pct = Math.max(0, Math.min(1, hp / max));
    this.healthBar.style.width = `${pct * 100}%`;
    this.healthNum.textContent = Math.max(0, Math.round(hp));
    this.healthBar.classList.toggle('low', pct <= 0.34);
    this.status.textContent = pct > 0.66 ? 'NOMINAL' : pct > 0.34 ? 'DAMAGED' : 'CRITICAL';
  }

  setAmmo(mag, reserve, reloading = false) {
    this.ammoMag.textContent = String(mag).padStart(2, '0');
    this.ammoReserve.textContent = String(reserve).padStart(3, '0');
    this.ammoEl.classList.toggle('empty', mag === 0);
    this.ammoEl.classList.toggle('low', mag > 0 && mag <= 8);
    this.reloadHint.textContent = reloading ? 'RELOADING...' : 'RELOAD [R]';
  }

  setStats({ wave, hostiles, score }) {
    if (wave !== undefined) this.waveEl.textContent = String(wave).padStart(2, '0');
    if (hostiles !== undefined) this.hostilesEl.textContent = String(hostiles).padStart(2, '0');
    if (score !== undefined) this.scoreEl.textContent = String(score).padStart(6, '0');
  }

  hit(kill = false, head = false) {
    const el = this.hitmarker;
    el.classList.remove('show', 'kill', 'head');
    void el.offsetWidth;
    el.classList.add('show');
    if (kill) el.classList.add('kill');
    else if (head) el.classList.add('head');
  }

  feed(text, head = false, kill = true) {
    const el = document.createElement('div');
    el.className = 'kill-item';
    const points = head ? 150 : 100;
    el.innerHTML = `<span>${text}</span>${head ? '<span class="hs">HEADSHOT</span>' : ''}${kill ? `<b>+${points}</b>` : ''}`;
    this.killfeed.appendChild(el);
    while (this.killfeed.children.length > 5) this.killfeed.firstChild.remove();
    setTimeout(() => {
      el.style.transition = 'opacity .4s, transform .4s';
      el.style.opacity = '0';
      el.style.transform = 'translateX(20px)';
      setTimeout(() => el.remove(), 420);
    }, 3800);
  }

  damage() {
    this.damageEl.style.opacity = '1';
    clearTimeout(this._damageTimer);
    this._damageTimer = setTimeout(() => { this.damageEl.style.opacity = '0'; }, 160);
  }

  flash(a = 0.4) {
    this.flashEl.style.transition = 'none';
    this.flashEl.style.opacity = String(a);
    requestAnimationFrame(() => {
      this.flashEl.style.transition = 'opacity .3s';
      this.flashEl.style.opacity = '0';
    });
  }

  banner(title, sub, duration = 2200) {
    this.bannerTitle.textContent = title;
    this.bannerSub.textContent = sub;
    this.bannerEl.classList.add('show');
    clearTimeout(this._bannerTimer);
    if (duration > 0) {
      this._bannerTimer = setTimeout(() => this.bannerEl.classList.remove('show'), duration);
    }
  }

  hideBanner() {
    this.bannerEl.classList.remove('show');
  }

  ads(on) { this.crosshair.classList.toggle('ads', on); }

  lowHealthPulse(on) {
    this.healthNum.style.animation = on ? 'none' : '';
  }

  fps(dt) {
    this._fpsAccum += dt;
    this._fpsFrames++;
    if (this._fpsAccum >= 0.5) {
      this.fpsEl.textContent = `${Math.round(this._fpsFrames / this._fpsAccum)} FPS`;
      this._fpsAccum = 0;
      this._fpsFrames = 0;
    }
  }
}
