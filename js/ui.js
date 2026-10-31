// ── DOM UI: menus, HUD, town panels, loot, path, results ────────────────────
import {
  AFFIXES, BIOMES, BIOME_KEYS, BOSSES, DIFFICULTIES, ECHO_UPGRADES, ELEMENTS,
  MAX_LEVEL, RARITIES, RARITY_KEYS, SHOP_ITEMS, SKILL_BRANCHES, SKILL_BY_ID,
  STAT_INFO, STAT_KEYS, WEAPONS, WEAPON_COUNT, WEAPON_TYPES,
  echoCost, getWeapon, weaponDps, xpToNext,
} from './data.js';
import { drawMinimap } from './render.js';
import { clamp, fmt, roman, shortTime } from './util.js';
import { elementIconURL, resourceIconURL, skillIconURL, weaponIconURL } from './pixel.js';

const EMPTY_ICON = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
const PATH_COLORS = {
  combat: '#9b8fac', elite: '#ffb340', treasure: '#ffd86b',
  shrine: '#8cf07a', boss: '#ff5f6d', start: '#b8c2cf',
};
const PATH_GLYPHS = { combat: 'C', elite: 'E', treasure: 'T', shrine: 'S', boss: 'B', start: 'G' };

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pct = (a, b) => clamp(b > 0 ? a / b * 100 : 0, 0, 100);
const rarityOf = k => RARITIES[k] || RARITIES.common;
const owned = (meta, id) => Array.isArray(meta.ownedWeapons) && meta.ownedWeapons.includes(id);
const iconImg = (src, cls = '', alt = '') => `<img src="${src}" class="${cls}" alt="${esc(alt)}" draggable="false" />`;
const statTag = (label, val, color = '#b6a6c8') => `<span class="tag" style="color:${color};border-color:${color}55">${esc(label)} ${esc(val)}</span>`;

export class UI {
  constructor(audio, input) {
    this.audio = audio;
    this.input = input;
    this.game = null;
    this.blocking = false;
    this.modalLocked = false;
    this.modalKind = null;
    this.toastTimer = null;
    this.bannerTimer = null;
    this.bossTimer = null;
    this.fadeTimer = null;

    this.gateBiome = 'ember';
    this.gateDifficulty = 'normal';
    this.forgeFilter = 'all';
    this.codexFilter = 'all';
    this.lastMinimap = 0;
    this.lastSkillSig = '';

    this.screens = {
      title: document.getElementById('screen-title'),
      town: document.getElementById('screen-town'),
      dungeon: document.getElementById('screen-dungeon'),
    };
    this.modal = document.getElementById('modal');
    this.modalPanel = document.getElementById('modal-panel');
    this.bannerEl = document.getElementById('battle-banner');
    this.bannerTitle = document.getElementById('banner-title');
    this.bannerSub = document.getElementById('banner-sub');
    this.bossIntroEl = document.getElementById('boss-intro');
    this.promptEl = document.getElementById('interact-prompt');
    this.promptText = document.getElementById('interact-text');
    this.toastsEl = document.getElementById('toasts');
    this.fadeEl = document.getElementById('fade');
    this.minimap = document.getElementById('minimap');

    this.hydrateIcons();
    this.bindGlobal();
  }

  // ── Setup ────────────────────────────────────────────────────────────────
  hydrateIcons() {
    for (const img of document.querySelectorAll('img[data-icon]')) {
      const key = img.dataset.icon;
      if (key) { img.src = resourceIconURL(key, 18); img.classList.add('res-img'); }
    }
  }

  bindGlobal() {
    const click = (id, fn) => document.getElementById(id)?.addEventListener('click', e => { e.stopPropagation(); this.audio.sfx('click'); fn(e); });

    click('btn-play', () => {
      this.ensureAudio();
      this.closeModal();
      this.game.goTown();
    });
    click('btn-howto', () => this.openHowTo());
    click('btn-title-settings', () => this.openSettings());
    click('btn-mute-title', () => this.toggleMute());
    click('btn-town-mute', () => this.toggleMute());
    click('btn-full-title', () => this.toggleFullscreen());

    for (const btn of document.querySelectorAll('[data-town]')) {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        this.ensureAudio();
        this.audio.sfx('click');
        this.game.openTown(btn.dataset.town);
      });
    }
    click('btn-town-pause', () => this.game.ui.showPause(this.game));
    click('btn-pause', () => this.game.ui.showPause(this.game));

    // Action buttons — pointerdown keeps response under a frame (<100ms).
    const action = (id, fn) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('pointerdown', e => {
        e.preventDefault(); e.stopPropagation();
        this.ensureAudio();
        if (this.blocking) return;
        fn(el);
      });
    };
    action('btn-attack', () => { this.input.queue('attack'); this.input.held.attack = true; });
    document.getElementById('btn-attack')?.addEventListener('pointerup', () => { this.input.held.attack = false; });
    document.getElementById('btn-attack')?.addEventListener('pointerleave', () => { this.input.held.attack = false; });
    document.getElementById('btn-attack')?.addEventListener('pointercancel', () => { this.input.held.attack = false; });
    action('btn-dodge', () => this.input.queue('dodge'));
    action('btn-skill1', () => this.input.queue('skill1'));
    action('btn-skill2', () => this.input.queue('skill2'));
    action('btn-potion-hp', () => this.input.queue('potion_hp'));
    action('btn-potion-mp', () => this.input.queue('potion_mp'));

    this.modal?.addEventListener('click', e => {
      if (e.target?.dataset?.close !== undefined) {
        if (!this.modalLocked) this.closeModal();
      }
    });

    const firstGesture = () => {
      this.ensureAudio();
      window.removeEventListener('pointerdown', firstGesture);
      window.removeEventListener('keydown', firstGesture);
    };
    window.addEventListener('pointerdown', firstGesture);
    window.addEventListener('keydown', firstGesture);
  }

  ensureAudio() {
    if (!this.audio) return;
    if (!this.audio.ready) {
      this.audio.init();
      if (this.audio.ctx && this.audio.track) this.audio.nextTime = this.audio.ctx.currentTime + 0.1;
    } else if (this.audio.ctx?.state === 'suspended') {
      this.audio.ctx.resume();
    }
  }

  toggleMute() {
    const s = this.game.meta.settings;
    s.sfx = !s.sfx;
    s.bgm = s.sfx;
    this.audio.setSettings({ sfx: s.sfx, bgm: s.bgm });
    this.game.save();
    this.refreshMute();
    this.toast(s.sfx ? 'AUDIO ON' : 'AUDIO MUTED', s.sfx ? '#8cf07a' : '#ffb340');
  }

  refreshMute() {
    const on = !!this.game?.meta?.settings?.sfx;
    for (const id of ['btn-mute-title', 'btn-town-mute']) {
      document.getElementById(id)?.classList.toggle('off', !on);
    }
  }

  toggleFullscreen() {
    try {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
      else document.exitFullscreen?.();
    } catch { /* ignore */ }
  }

  hideBoot() {
    const boot = document.getElementById('boot');
    if (!boot) return;
    boot.classList.add('off');
    setTimeout(() => boot.classList.add('hidden'), 500);
  }

  // ── Screens / modal ──────────────────────────────────────────────────────
  showScreen(name) {
    for (const [key, el] of Object.entries(this.screens)) {
      if (!el) continue;
      el.classList.toggle('hidden', key !== name);
    }
    document.body.dataset.screen = name;
    if (name !== 'dungeon') this.hideBoss();
    if (name === 'title') this.closeModal();
    this.refreshMute();
  }

  openModal(html, { locked = false, panelClass = '', kind = 'panel' } = {}) {
    if (!this.modal || !this.modalPanel) return;
    this.modal.classList.remove('hidden');
    this.modalPanel.className = `panel ${panelClass}`.trim();
    this.modalPanel.innerHTML = html;
    this.modalLocked = !!locked;
    this.modalKind = kind;
    this.blocking = true;
    this.modalPanel.scrollTop = 0;
  }

  closeModal() {
    if (!this.modal) return;
    this.modal.classList.add('hidden');
    if (this.modalPanel) { this.modalPanel.innerHTML = ''; this.modalPanel.className = 'panel'; }
    this.modalLocked = false;
    this.modalKind = null;
    this.blocking = false;
  }

  fade(duration, cb) {
    if (!this.fadeEl) { cb?.(); return; }
    clearTimeout(this.fadeTimer);
    this.fadeEl.style.transitionDuration = `${duration}s`;
    this.fadeEl.classList.add('on');
    this.fadeTimer = setTimeout(() => { cb?.(); }, Math.max(0, duration * 1000));
  }

  fadeOut(duration = 0.2) {
    if (!this.fadeEl) return;
    this.fadeEl.style.transitionDuration = `${duration}s`;
    this.fadeEl.classList.remove('on');
  }

  // ── Title / HUD ──────────────────────────────────────────────────────────
  syncTitle(game) {
    if (this._titleLoop !== game.meta.runs) {
      this._titleLoop = game.meta.runs;
    }
  }

  updateHUD(game) {
    const meta = game.meta;
    if (!meta) return;
    const p = game.player;
    const stats = game.stats || {};
    const run = game.run;

    // Town header / status
    const setText = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };
    setText('town-gold', fmt(meta.gold));
    setText('town-gems', fmt(meta.gems));
    setText('town-echoes', fmt(meta.echoes));
    setText('town-iron', fmt(meta.materials?.iron || 0));
    setText('town-essence', fmt(meta.materials?.essence || 0));
    setText('town-crystal', fmt(meta.materials?.crystal || 0));
    setText('town-level', String(meta.level));
    setText('town-name', meta.name || 'THE WANDERER');
    const need = xpToNext(meta.level);
    setText('town-xp-text', meta.level >= MAX_LEVEL ? 'MAX LEVEL' : `${fmt(meta.xp)} / ${fmt(need)} XP`);
    const txp = document.getElementById('town-xp-fill');
    if (txp) txp.style.width = `${meta.level >= MAX_LEVEL ? 100 : pct(meta.xp, need)}%`;
    setText('town-hp', String(Math.round(game.player?.hp ?? stats.maxHp ?? 0)));
    setText('town-dps', fmt(weaponDps(game.equippedWeapon, meta)));
    setText('town-potions', String((meta.potions?.hp || 0) + (meta.potions?.mp || 0)));
    setText('dock-collection', `${Object.keys(meta.collection || {}).length}/${WEAPON_COUNT}`);

    if (game.mode !== 'dungeon' || !p) return;

    // Dungeon bars
    const hpEl = document.getElementById('hp-fill');
    const mpEl = document.getElementById('mp-fill');
    if (hpEl) hpEl.style.width = `${pct(p.hp, stats.maxHp)}%`;
    if (mpEl) mpEl.style.width = `${pct(p.mp, stats.maxMp)}%`;
    setText('hp-text', `${Math.ceil(p.hp)} / ${Math.round(stats.maxHp)}`);
    setText('mp-text', `${Math.floor(p.mp)} / ${Math.round(stats.maxMp)}`);
    setText('hud-level', String(meta.level));
    const hxp = document.getElementById('hud-xp-fill');
    if (hxp) hxp.style.width = `${meta.level >= MAX_LEVEL ? 100 : pct(meta.xp, xpToNext(meta.level))}%`;

    setText('hud-gold', fmt(run ? run.gold : meta.gold));
    setText('hud-gems', fmt(meta.gems));
    setText('potion-hp-count', String(run?.potions?.hp ?? meta.potions?.hp ?? 0));
    setText('potion-mp-count', String(run?.potions?.mp ?? meta.potions?.mp ?? 0));
    setText('room-count', `ROOM ${(game.currentNode?.layer ?? 0) + 1}/${game.dungeon?.total ?? 1}`);
    setText('run-time', shortTime(run ? Math.max(0, game.time - run.startTime) : 0));
    setText('biome-label', game.run ? (BIOMES[game.run.biome]?.name || '').toUpperCase() : 'THE LOOP');
    const weapon = game.equippedWeapon;
    setText('hud-weapon', weapon ? `${weapon.name.toUpperCase()} · ${rarityOf(weapon.rarity).name.toUpperCase()}` : '—');

    // Skills + cooldowns
    const slots = [1, 2];
    const sig = JSON.stringify(meta.equippedSkills || []);
    for (const i of slots) {
      const id = meta.equippedSkills?.[i - 1];
      const skill = id ? SKILL_BY_ID.get(id) : null;
      const img = document.getElementById(`skill${i}-icon`);
      const cdEl = document.getElementById(`skill${i}-cd`);
      const costEl = document.getElementById(`skill${i}-cost`);
      if (img) {
        if (skill) img.src = skillIconURL(skill, 38);
        else img.src = EMPTY_ICON;
        img.style.opacity = skill ? '1' : '0.25';
      }
      if (costEl) costEl.textContent = skill ? String(skill.mp) : '';
      if (cdEl) {
        const rem = skill ? (game.cooldowns?.[id] || 0) : 0;
        cdEl.style.setProperty('--p', `${skill && rem > 0 ? (rem / skill.cd) * 100 : 0}%`);
        cdEl.style.display = skill ? 'block' : 'none';
      }
    }
    if (this.lastSkillSig !== sig) this.lastSkillSig = sig;

    // Dodge cooldown
    const dodgeCd = document.getElementById('dodge-cd');
    if (dodgeCd) {
      const rem = p.dodgeCd || 0;
      const max = Math.max(0.01, stats.dodgeCd || 1.15);
      dodgeCd.style.setProperty('--p', `${clamp(rem / max, 0, 1) * 100}%`);
    }

    // Boss health
    const boss = game.boss;
    const bw = document.getElementById('boss-wrap');
    if (bw) bw.classList.toggle('hidden', !boss || boss.dead);
    if (boss && !boss.dead) {
      setText('boss-name', boss.def.name);
      setText('boss-phase', `PHASE ${roman(boss.phase)}`);
      const bf = document.getElementById('boss-fill');
      if (bf) bf.style.width = `${pct(boss.hp, boss.maxHp)}%`;
    }

    // Minimap at a calmer cadence
    const now = performance.now();
    if (this.minimap && game.dungeon && now - this.lastMinimap > 90) {
      this.lastMinimap = now;
      drawMinimap(this.minimap, game.dungeon, game.currentNode?.id);
    }
  }

  setTownPrompt(hotspot) {
    if (!this.promptEl) return;
    if (!hotspot) { this.promptEl.classList.add('hidden'); return; }
    this.promptEl.classList.remove('hidden');
    if (this.promptText) this.promptText.textContent = hotspot.label || hotspot.name || 'Interact';
  }

  // ── Small live feedback ──────────────────────────────────────────────────
  toast(msg, color = '#b6a6c8') {
    if (!this.toastsEl) return;
    const el = document.createElement('div');
    el.className = 'toast';
    el.style.setProperty('--tc', color);
    el.textContent = msg;
    this.toastsEl.appendChild(el);
    while (this.toastsEl.children.length > 4) this.toastsEl.firstElementChild?.remove();
    setTimeout(() => el.remove(), 2850);
  }

  banner(title, sub, color = '#f0c05a') {
    if (!this.bannerEl) return;
    clearTimeout(this.bannerTimer);
    this.bannerTitle.textContent = title;
    this.bannerSub.textContent = sub || '';
    this.bannerTitle.style.color = color;
    this.bannerEl.classList.add('hidden');
    void this.bannerEl.offsetWidth;
    this.bannerEl.classList.remove('hidden');
    this.bannerTimer = setTimeout(() => this.bannerEl.classList.add('hidden'), 2300);
  }

  showBossIntro(def) {
    if (!this.bossIntroEl) return;
    clearTimeout(this.bossTimer);
    document.getElementById('boss-intro-name').textContent = def.name;
    document.getElementById('boss-intro-title').textContent = def.title;
    document.getElementById('boss-intro-quote').textContent = `“${def.intro}”`;
    this.bossIntroEl.classList.add('hidden');
    void this.bossIntroEl.offsetWidth;
    this.bossIntroEl.classList.remove('hidden');
    this.audio.sfx('bossroar');
    this.bossTimer = setTimeout(() => this.bossIntroEl.classList.add('hidden'), 2650);
  }

  hideBoss() {
    clearTimeout(this.bossTimer);
    this.bossIntroEl?.classList.add('hidden');
  }

  // ── Path choice ──────────────────────────────────────────────────────────
  showPath(options, game) {
    if (!options?.length) { this.closeModal(); return; }
    const cards = options.map(o => {
      const col = PATH_COLORS[o.type] || '#9b8fac';
      return `
        <button class="path-card" data-path="${esc(o.id)}" style="--pc:${col}">
          <span class="path-glyph"><span>${PATH_GLYPHS[o.type] || '?'}</span></span>
          <h3>${esc(o.label)}</h3>
          <p>${esc(o.desc)}</p>
          <div class="path-meta">
            <span class="tag" style="color:${col};border-color:${col}66">ROOM ${o.layer}</span>
            ${o.elite ? '<span class="tag gold">ELITE</span>' : ''}
            ${o.boss ? '<span class="tag red">BOSS</span>' : ''}
          </div>
          <div class="path-cta">ENTER →</div>
        </button>`;
    }).join('');
    const html = `
      <div class="panel-head">
        <div class="ph-icon" style="color:#b07bff">◇</div>
        <div>
          <h2>CHOOSE YOUR PATH</h2>
          <div class="ph-sub">The loop branches. Every door remembers a different death.</div>
        </div>
        <div class="ph-right"><span class="tag violet">${esc(BIOMES[game.run?.biome]?.name || 'DUNGEON')}</span></div>
      </div>
      <div class="panel-body"><div class="path-grid">${cards}</div></div>`;
    this.openModal(html, { locked: true, kind: 'path' });
    for (const card of this.modalPanel.querySelectorAll('[data-path]')) {
      card.addEventListener('click', () => {
        this.audio.sfx('portal');
        game.choosePath(card.dataset.path);
      });
    }
  }

  // ── Loot ─────────────────────────────────────────────────────────────────
  showLoot(cards, game, fromChest = false) {
    this.lootCards = cards;
    this.lootFromChest = fromChest;
    const header = fromChest ? 'TREASURE VAULT' : 'SPOILS OF THE CHAMBER';
    const html = `
      <div class="loot-head">
        <div class="kicker">${fromChest ? 'THE CHEST REMEMBERS' : 'CHOOSE ONE'}</div>
        <h2>${header}</h2>
        <p>Take one. The other two fade into the next loop.</p>
      </div>
      <div class="loot-grid" id="loot-grid">${this.lootCardsHTML(cards, game)}</div>
      <div class="loot-foot">
        <button class="btn btn-ghost btn-sm" id="loot-reroll">REROLL · 10 GEMS</button>
        <span class="hint">Rerolls left: ${game.run?.rerolls ?? 0}</span>
        <span class="tag gold">◆ ${fmt(game.meta.gems)} GEMS</span>
      </div>`;
    this.openModal(html, { locked: true, panelClass: 'loot-panel', kind: 'loot' });
    this.bindLoot(game);
    const rr = document.getElementById('loot-reroll');
    if (rr) rr.disabled = (game.run?.rerolls ?? 0) <= 0 || (game.meta.gems || 0) < 10;
  }

  lootCardsHTML(cards, game) {
    return cards.map((card, i) => this.lootCardHTML(card, game, i)).join('');
  }

  lootCardHTML(card, game, index) {
    const meta = game.meta;
    if (card.kind === 'weapon') {
      const w = card.weapon;
      const rar = rarityOf(w.rarity);
      const cur = getWeapon(meta.equippedWeapon);
      const newDps = weaponDps(w, meta);
      const curDps = weaponDps(cur, meta);
      const diff = curDps > 0 ? Math.round((newDps - curDps) / curDps * 100) : 0;
      const deltaCol = diff > 0 ? '#8cf07a' : diff < 0 ? '#ff5f6d' : '#b6a6c8';
      const dup = owned(meta, w.id);
      const type = WEAPON_TYPES[w.type]?.name || w.type;
      const affixes = (w.affixes || []).map(a => AFFIXES[a]).filter(Boolean);
      return `
        <div class="loot-card" data-loot="${index}" style="--lc:${rar.color}">
          <div class="loot-rarity">${rar.name.toUpperCase()}${dup ? ' · OWNED' : ''}</div>
          <div class="loot-ico">${iconImg(weaponIconURL(w, 76), '', w.name)}</div>
          <div class="loot-body">
            <h3 style="color:${rar.color}">${esc(w.name)}</h3>
            <div class="loot-type">${esc(type)} · ${esc(ELEMENTS[w.element]?.name || w.element)}</div>
            <div class="loot-stats">
              <span>DPS ${fmt(newDps)}</span>
              <span>DMG ${w.baseDmg}</span>
              <span>REQ ${w.req}</span>
            </div>
            <div class="loot-compare" style="color:${deltaCol}">${diff >= 0 ? '+' : ''}${diff}% DPS vs equipped</div>
            <p class="loot-desc">${affixes.length ? affixes.map(a => `<span style="color:${a.color}">${esc(a.name)}</span> — ${esc(a.desc)}`).join('<br />') : 'A dependable blade from the loop.'}</p>
          </div>
          <div class="loot-take">TAKE<small>${dup ? 'Refunded as essence' : 'Add to arsenal'}</small></div>
        </div>`;
    }
    if (card.kind === 'blessing') {
      const b = card.blessing;
      const col = b.color || rarityOf(b.rarity).color;
      return `
        <div class="loot-card" data-loot="${index}" style="--lc:${col}">
          <div class="loot-rarity">${(b.rarity || 'blessing').toUpperCase()}</div>
          <div class="loot-ico"><div class="rune-badge"><span>${esc(b.glyph || '✦')}</span></div></div>
          <div class="loot-body">
            <h3 style="color:${col}">${esc(b.name)}</h3>
            <div class="loot-type">IN-RUN BLESSING</div>
            <p class="loot-desc">${esc(b.desc)}</p>
            <div class="loot-stats"><span>LASTS THIS RUN</span></div>
          </div>
          <div class="loot-take">CLAIM<small>Stack the blessing</small></div>
        </div>`;
    }
    const col = card.supply === 'gold' ? '#ffd86b' : card.supply === 'potion' ? '#ff5f6d' : '#8ef0c8';
    const label = card.supply === 'potion' ? 'FLASKS' : card.supply === 'gold' ? 'GOLD' : String(card.supply).toUpperCase();
    const supIcon = card.supply === 'potion'
      ? `<div class="rune-badge"><span>HP</span></div>`
      : iconImg(resourceIconURL(card.supply === 'gold' ? 'gold' : card.supply, 52), 'sup-icon', label);
    const desc = card.supply === 'gold' ? 'Coins for the merchant back in town.'
      : card.supply === 'potion' ? 'One crimson and one azure flask for the road.'
      : 'Forging material. The forge always hungers.';
    return `
      <div class="loot-card" data-loot="${index}" style="--lc:${col}">
        <div class="loot-rarity">SUPPLIES</div>
        <div class="loot-ico">${supIcon}</div>
        <div class="loot-body">
          <h3 style="color:${col}">+${fmt(card.amount)} ${esc(label)}</h3>
          <div class="loot-type">PACK SUPPLIES</div>
          <p class="loot-desc">${desc}</p>
          <div class="loot-stats"><span>INSTANT</span></div>
        </div>
        <div class="loot-take">STOW<small>Into the run purse</small></div>
      </div>`;
  }

  bindLoot(game) {
    for (const cardEl of this.modalPanel.querySelectorAll('[data-loot]')) {
      cardEl.addEventListener('click', () => {
        const card = this.lootCards?.[Number(cardEl.dataset.loot)];
        if (!card) return;
        this.audio.sfx('click');
        game.chooseLoot(card);
      });
    }
    document.getElementById('loot-reroll')?.addEventListener('click', () => {
      this.audio.sfx('click');
      game.rerollLoot();
    });
  }

  updateLoot(cards) {
    this.lootCards = cards;
    const grid = document.getElementById('loot-grid');
    if (!grid) { if (this.game) this.showLoot(cards, this.game, this.lootFromChest); return; }
    grid.innerHTML = this.lootCardsHTML(cards, this.game);
    this.bindLoot(this.game);
    const rr = document.getElementById('loot-reroll');
    if (rr) {
      const n = this.game?.run?.rerolls ?? 0;
      rr.textContent = `REROLL · 10 GEMS`;
      rr.disabled = n <= 0 || (this.game?.meta.gems || 0) < 10;
      const hint = this.modalPanel.querySelector('.loot-foot .hint');
      if (hint) hint.textContent = `Rerolls left: ${n}`;
    }
  }

  // ── Shrine ───────────────────────────────────────────────────────────────
  showShrine(game) {
    const html = `
      <div class="panel-head">
        <div class="ph-icon" style="color:#8cf07a">✦</div>
        <div><h2>LOOP SHRINE</h2><div class="ph-sub">A quiet place between one death and the next.</div></div>
      </div>
      <div class="panel-body">
        <div class="shrine-grid">
          <button class="shrine-card" data-shrine="heal" style="--sc:#8cf07a">
            <div class="shrine-glyph">✚</div>
            <h3>RESTORE</h3>
            <p>Heal 42% of max HP.<br /><span class="muted">Safe. Certain. Warm.</span></p>
          </button>
          <button class="shrine-card" data-shrine="blessing" style="--sc:#c78cff">
            <div class="shrine-glyph">◇</div>
            <h3>BLESSING</h3>
            <p>Gain a random run blessing.<br /><span class="muted">Power always asks a price.</span></p>
          </button>
        </div>
      </div>`;
    this.openModal(html, { locked: true, kind: 'shrine' });
    for (const btn of this.modalPanel.querySelectorAll('[data-shrine]')) {
      btn.addEventListener('click', () => {
        this.audio.sfx('click');
        game.chooseShrine(btn.dataset.shrine);
      });
    }
  }

  // ── Victory / defeat ─────────────────────────────────────────────────────
  showVictory(game, s) {
    const mins = Math.floor((s.time || 0) / 60);
    const secs = Math.floor((s.time || 0) % 60);
    const mats = s.materials || {};
    const weapon = s.weapon;
    const rar = weapon ? rarityOf(weapon.rarity) : rarityOf('common');
    const html = `
      <div class="result-hero result-confetti">
        <div class="result-kicker">THE LOOP BREAKS · JUST THIS ONCE</div>
        <h2>VICTORY</h2>
        <p>${esc(s.biome)} falls silent. The Warden is dead. For now.</p>
      </div>
      <div class="summary-grid">
        <div><span>Difficulty</span><b>${esc(s.difficulty)}</b></div>
        <div><span>Rooms cleared</span><b>${s.rooms}</b></div>
        <div><span>Enemies slain</span><b>${fmt(s.kills)}</b></div>
        <div><span>Run time</span><b>${mins}:${String(secs).padStart(2, '0')}</b></div>
        <div><span>Gold claimed</span><b class="gold-text">${fmt(s.gold)}</b></div>
        <div><span>XP gained</span><b class="violet-text">${fmt(s.xp)}</b></div>
        <div><span>Gems</span><b class="gold-text">+${fmt(s.gems || 0)}</b></div>
        <div><span>Echoes</span><b class="violet-text">+${fmt(s.echoes || 0)}</b></div>
        <div><span>Materials</span><b>${mats.iron || 0}I · ${mats.essence || 0}E · ${mats.crystal || 0}C</b></div>
        <div><span>Level</span><b>${s.level}</b></div>
      </div>
      ${weapon ? `
      <div class="result-loot">
        ${iconImg(weaponIconURL(weapon, 44), '', weapon.name)}
        <div><b style="color:${rar.color}">${esc(weapon.name)}</b><small>${rar.name} ${esc(WEAPON_TYPES[weapon.type]?.name || weapon.type)} · ${esc(ELEMENTS[weapon.element]?.name || '')}</small></div>
        <span class="spacer"></span><span class="tag gold">CARRIED OUT</span>
      </div>` : ''}
      <div class="result-actions">
        <button class="btn btn-primary" data-act="again">RUN AGAIN</button>
        <button class="btn btn-ghost" data-act="town">RETURN TO TOWN</button>
      </div>`;
    this.openModal(html, { locked: true, panelClass: 'result-panel', kind: 'victory' });
    const biome = game.run?.biome || 'ember';
    const difficulty = game.run?.difficulty || 'normal';
    this.modalPanel.querySelector('[data-act="again"]')?.addEventListener('click', () => {
      this.closeModal();
      game.startRun({ biome, difficulty });
    });
    this.modalPanel.querySelector('[data-act="town"]')?.addEventListener('click', () => game.returnToTown());
  }

  showGameOver(game, opts = {}) {
    const canRevive = !!opts.canRevive;
    const keepGold = opts.keepGold || 0;
    const totalGold = opts.gold || 0;
    const html = `
      <div class="result-hero defeat">
        <div class="result-kicker">THE LOOP CLAIMS ANOTHER</div>
        <h2>YOU DIED</h2>
        <p>The world darkens. Somewhere, a bell rings once.</p>
      </div>
      <div class="summary-grid">
        <div><span>Run gold</span><b class="gold-text">${fmt(totalGold)}</b></div>
        <div><span>Gold kept (25%)</span><b class="green-text">${fmt(keepGold)}</b></div>
        <div><span>Kills this run</span><b>${fmt(game.run?.kills || 0)}</b></div>
        <div><span>Rooms cleared</span><b>${fmt(game.run?.roomsCleared || 0)}</b></div>
        <div><span>Gems</span><b class="gold-text">${fmt(game.meta.gems)}</b></div>
        <div><span>Echoes</span><b class="violet-text">${fmt(game.meta.echoes)}</b></div>
      </div>
      <div class="result-actions">
        ${canRevive ? '<button class="btn btn-primary" data-act="revive">REVIVE · 30 GEMS</button>' : '<button class="btn" disabled>REVIVE · NEED 30 GEMS</button>'}
        <button class="btn btn-ghost" data-act="town">RETURN TO TOWN</button>
      </div>
      <div class="panel-foot" style="justify-content:center">
        <span class="muted" style="font-size:16px">Echoes and your arsenal persist through death.</span>
      </div>`;
    this.openModal(html, { locked: true, panelClass: 'result-panel', kind: 'gameover' });
    this.modalPanel.querySelector('[data-act="revive"]')?.addEventListener('click', () => {
      this.audio.sfx('click');
      game.revive();
    });
    this.modalPanel.querySelector('[data-act="town"]')?.addEventListener('click', () => game.returnToTown());
  }

  // ── Pause ────────────────────────────────────────────────────────────────
  showPause(game) {
    const inRun = game.mode === 'dungeon' && game.run;
    const w = game.equippedWeapon;
    const html = `
      <div class="panel-head">
        <div class="ph-icon">II</div>
        <div><h2>PAUSED</h2><div class="ph-sub">${inRun ? esc(BIOMES[game.run.biome]?.name || 'Dungeon') : 'Town of Last Light'}</div></div>
      </div>
      <div class="panel-body">
        <div class="gate-summary" style="margin-bottom:14px">
          <div><span>Level</span><b>${game.meta.level}</b></div>
          <div><span>Weapon</span><b style="color:${w ? rarityOf(w.rarity).color : '#eee3c8'}">${esc(w?.name || 'Unarmed')}</b></div>
          <div><span>DPS</span><b class="green-text">${fmt(weaponDps(w, game.meta))}</b></div>
          <div><span>Echoes</span><b class="violet-text">${fmt(game.meta.echoes)}</b></div>
          ${inRun ? `<div><span>Run gold</span><b class="gold-text">${fmt(game.run.gold)}</b></div><div><span>Kills</span><b>${fmt(game.run.kills)}</b></div>` : ''}
        </div>
        <div class="divider"></div>
        <div class="title-menu-row" style="gap:8px">
          <button class="btn btn-primary" data-act="resume">RESUME</button>
          <button class="btn btn-ghost" data-act="settings">SETTINGS</button>
          ${inRun ? '<button class="btn btn-ghost" data-act="abandon" style="border-color:#7a2c3a;color:#ff8b93">ABANDON RUN</button>' : '<button class="btn btn-ghost" data-act="title">RETURN TO TITLE</button>'}
        </div>
        ${inRun ? '<p class="muted" style="margin:14px 0 0;font-size:16px">Abandoning keeps 25% of run gold and all materials already gathered.</p>' : ''}
      </div>`;
    this.openModal(html, { kind: 'pause', panelClass: 'result-panel' });
    this.modalPanel.querySelector('[data-act="resume"]')?.addEventListener('click', () => this.closeModal());
    this.modalPanel.querySelector('[data-act="settings"]')?.addEventListener('click', () => this.openSettings(game.mode === 'town'));
    this.modalPanel.querySelector('[data-act="abandon"]')?.addEventListener('click', () => game.abandonRun?.());
    this.modalPanel.querySelector('[data-act="title"]')?.addEventListener('click', () => { this.closeModal(); game.goTitle(); });
  }

  // ── Town panels ──────────────────────────────────────────────────────────
  openTownPanel(id, game) {
    this.ensureAudio();
    switch (id) {
      case 'gate': return this.openGate(game);
      case 'forge': return this.openForge(game);
      case 'skills': return this.openSkills(game);
      case 'shop': return this.openShop(game);
      case 'codex': return this.openCodex(game);
      case 'echo': return this.openEcho(game);
      case 'settings': return this.openSettings(true);
      case 'howto': return this.openHowTo();
      default: return this.openGate(game);
    }
  }

  panelHead(glyph, title, sub, color = '#f0c05a', right = '') {
    return `
      <div class="panel-head">
        <div class="ph-icon" style="color:${color};border-color:${color}77">${glyph}</div>
        <div><h2>${title}</h2><div class="ph-sub">${sub}</div></div>
        <div class="ph-right">${right}<button class="panel-close" data-close aria-label="Close">✕</button></div>
      </div>`;
  }

  resourceRow(meta) {
    return `
      <div class="res-row">
        <span>${iconImg(resourceIconURL('gold'), '', 'gold')} ${fmt(meta.gold)}</span>
        <span>${iconImg(resourceIconURL('gem'), '', 'gems')} ${fmt(meta.gems)}</span>
        <span>${iconImg(resourceIconURL('echo'), '', 'echoes')} ${fmt(meta.echoes)}</span>
        <span>${iconImg(resourceIconURL('iron'), '', 'iron')} ${fmt(meta.materials?.iron || 0)}</span>
        <span>${iconImg(resourceIconURL('essence'), '', 'essence')} ${fmt(meta.materials?.essence || 0)}</span>
        <span>${iconImg(resourceIconURL('crystal'), '', 'crystal')} ${fmt(meta.materials?.crystal || 0)}</span>
      </div>`;
  }

  // ── Gate ─────────────────────────────────────────────────────────────────
  openGate(game) {
    const meta = game.meta;
    if (!BIOMES[this.gateBiome]) this.gateBiome = 'ember';
    const biomeCards = BIOME_KEYS.map(key => {
      const b = BIOMES[key];
      const locked = meta.level < b.unlock;
      const sel = key === this.gateBiome && !locked;
      return `
        <button class="gate-card${sel ? ' selected' : ''}${locked ? ' locked' : ''}" data-biome="${key}" style="--bc:${b.palette.accent}" ${locked ? 'disabled' : ''}>
          <b>${locked ? '◈ LOCKED' : b.name.toUpperCase()}</b>
          <small>${locked ? `Reach level ${b.unlock} to open this gate.` : esc(b.desc)}</small>
          <div class="gc-elems">${b.elements.map(el => iconImg(elementIconURL(el, 13), '', ELEMENTS[el].name)).join('')}</div>
          <div class="path-meta" style="justify-content:flex-start;margin-top:7px"><span class="tag" style="color:${b.palette.accent};border-color:${b.palette.accent}66">${locked ? 'SEALED' : 'BOSS · ' + (BOSSES[b.boss]?.name || 'THE WARDEN')}</span></div>
        </button>`;
    }).join('');
    const diffCards = Object.values(DIFFICULTIES).map(d => `
      <button class="diff-card${this.gateDifficulty === d.id ? ' selected' : ''}" data-diff="${d.id}" style="--dc:${d.color}">
        <span class="diff-pip"></span>
        <div><b>${d.name.toUpperCase()}</b><small>${esc(d.desc)}</small></div>
      </button>`).join('');
    const biome = BIOMES[this.gateBiome];
    const boss = BOSSES[biome.boss];
    const w = game.equippedWeapon;
    const html = `${this.panelHead('▲', 'DUNGEON GATE', 'Choose a biome and a difficulty. The loop reshapes itself every time.', '#b07bff', this.resourceRow(meta))}
      <div class="panel-body">
        <div class="gate-layout">
          <div class="gate-section">
            <h3>BIOME</h3>
            <div class="gate-biomes">${biomeCards}</div>
            <div class="divider"></div>
            <h3>DIFFICULTY</h3>
            <div class="diff-list">${diffCards}</div>
          </div>
          <aside class="gate-side">
            <h3 style="margin:0 0 10px;font-family:var(--font-head);font-size:8px;color:#c8b9dc">RUN BRIEFING</h3>
            <div class="gate-summary">
              <div><span>Biome</span><b style="color:${biome.palette.accent}">${biome.name}</b></div>
              <div><span>Boss</span><b>${boss.name}</b></div>
              <div><span>Rooms</span><b>5 – 18</b></div>
              <div><span>Level</span><b>${meta.level}</b></div>
              <div><span>Weapon</span><b>${esc(w?.name || 'Unarmed')}</b></div>
              <div><span>Est. DPS</span><b class="green-text">${fmt(weaponDps(w, meta))}</b></div>
              <div><span>Flasks</span><b>${meta.potions?.hp || 0} HP / ${meta.potions?.mp || 0} MP</b></div>
              <div><span>Echoes</span><b class="violet-text">${meta.echoes}</b></div>
            </div>
            <div class="divider"></div>
            <button class="btn btn-primary enter-loop" id="enter-loop" style="width:100%">ENTER THE LOOP<small>The gate remembers</small></button>
            <p class="muted" style="font-size:16px;margin:10px 0 0;line-height:1.15">Death keeps 25% of gold. Echoes, materials and weapons persist.</p>
          </aside>
        </div>
      </div>`;
    this.openModal(html, { kind: 'gate' });
    this.bindClose();
    for (const card of this.modalPanel.querySelectorAll('[data-biome]:not([disabled])')) {
      card.addEventListener('click', () => {
        this.gateBiome = card.dataset.biome;
        this.audio.sfx('click');
        this.openGate(game);
      });
    }
    for (const card of this.modalPanel.querySelectorAll('[data-diff]')) {
      card.addEventListener('click', () => {
        this.gateDifficulty = card.dataset.diff;
        this.audio.sfx('click');
        this.openGate(game);
      });
    }
    document.getElementById('enter-loop')?.addEventListener('click', () => {
      this.closeModal();
      game.startRun({ biome: this.gateBiome, difficulty: this.gateDifficulty });
    });
  }

  // ── Forge ────────────────────────────────────────────────────────────────
  openForge(game) {
    const meta = game.meta;
    const equipped = getWeapon(meta.equippedWeapon);
    const byId = new Map(WEAPONS.map(w => [w.id, w]));
    let list = [...(meta.ownedWeapons || [])].map(id => byId.get(id)).filter(Boolean);
    if (this.forgeFilter !== 'all') list = list.filter(w => w.rarity === this.forgeFilter);
    list.sort((a, b) => rarityOf(b.rarity).order - rarityOf(a.rarity).order || weaponDps(b, meta) - weaponDps(a, meta));
    const filterButtons = ['all', ...RARITY_KEYS].map(k => {
      const col = k === 'all' ? '#f0c05a' : rarityOf(k).color;
      return `<button class="btn btn-sm filter-btn${this.forgeFilter === k ? ' btn-primary' : ' btn-ghost'}" data-filter="${k}" style="--fc:${col}">${k.toUpperCase()}</button>`;
    }).join('');
    const rows = list.length ? list.map(w => {
      const rar = rarityOf(w.rarity);
      const lvl = meta.upgrades?.[w.id] || 0;
      const dps = weaponDps(w, meta);
      const isEq = meta.equippedWeapon === w.id;
      return `
        <div class="weapon-row${isEq ? ' equipped' : ''}" style="--wc:${rar.color}">
          ${iconImg(weaponIconURL(w, 38), '', w.name)}
          <div class="wr-info">
            <div class="wr-name" style="color:${rar.color}">${esc(w.name)}${lvl ? ` <span class="green-text">+${lvl}</span>` : ''}</div>
            <div class="wr-sub"><span>${rar.name}</span><span>${WEAPON_TYPES[w.type]?.name || w.type}</span><span style="color:${ELEMENTS[w.element].color}">${ELEMENTS[w.element].name}</span><span>REQ ${w.req}</span></div>
          </div>
          <div class="wr-dps"><small>DPS</small>${fmt(dps)}</div>
          <div class="wr-actions">
            ${isEq ? '<span class="tag gold">EQUIPPED</span>' : `<button class="btn btn-sm btn-ghost" data-equip="${w.id}" ${meta.level < w.req ? 'disabled' : ''}>EQUIP</button>`}
            <button class="btn btn-sm btn-ghost" data-upgrade="${w.id}" ${lvl >= 10 ? 'disabled' : ''}>${lvl >= 10 ? 'MAX' : 'FORGE'}</button>
          </div>
        </div>`;
    }).join('') : '<div class="empty-state">No weapons match this filter. Delve deeper.</div>';

    const eqRar = equipped ? rarityOf(equipped.rarity) : rarityOf('common');
    const eqAffixes = (equipped?.affixes || []).map(a => AFFIXES[a]).filter(Boolean);
    const html = `${this.panelHead('⚒', 'THE FORGE', 'Equip, forge and hoard. The arsenal remembers every loop.', '#ff9b4a', this.resourceRow(meta))}
      <div class="panel-body">
        <div class="forge-layout">
          <aside>
            <div class="equipped-card" style="--wc:${eqRar.color}">
              <div class="big-weapon">
                <div class="wicon">${equipped ? iconImg(weaponIconURL(equipped, 64), '', equipped.name) : ''}</div>
                <div>
                  <h3 style="color:${eqRar.color}">${esc(equipped?.name || 'Unarmed')}</h3>
                  <div class="w-meta">
                    <span class="tag" style="color:${eqRar.color};border-color:${eqRar.color}66">${eqRar.name}</span>
                    <span class="tag">${WEAPON_TYPES[equipped?.type]?.name || '—'}</span>
                    <span class="tag" style="color:${ELEMENTS[equipped?.element]?.color || '#b6a6c8'}">${ELEMENTS[equipped?.element]?.name || '—'}</span>
                  </div>
                </div>
              </div>
              <div class="weapon-stats">
                <div><span>Base DMG</span><b>${equipped?.baseDmg ?? 0}</b></div>
                <div><span>DPS</span><b class="green-text">${fmt(weaponDps(equipped, meta))}</b></div>
                <div><span>Speed</span><b>${(equipped?.speed || 0).toFixed(2)}</b></div>
                <div><span>Range</span><b>${equipped?.range ?? 0}</b></div>
                <div><span>Req level</span><b>${equipped?.req ?? 1}</b></div>
                <div><span>Forge</span><b>+${meta.upgrades?.[equipped?.id] || 0}</b></div>
              </div>
              <div class="affix-list" style="margin-top:9px">
                ${eqAffixes.length ? eqAffixes.map(a => `<div style="display:flex;justify-content:space-between;gap:8px;font-size:17px"><span style="color:${a.color}">${esc(a.name)}</span><span class="muted">${esc(a.desc)}</span></div>`).join('') : '<div class="muted" style="font-size:16px">No affixes. Common steel.</div>'}
              </div>
            </div>
            <div class="setting-row" style="margin-top:12px">
              <div class="sr-info"><b>Auto-equip</b><small>Swap to any higher-DPS drop</small></div>
              <button class="toggle${meta.settings.autoEquip ? ' on' : ''}" id="toggle-autoequip" aria-label="Toggle auto-equip"></button>
            </div>
            <p class="muted" style="font-size:16px;margin-top:10px;line-height:1.15">Upgrades cost gold, iron and essence. The loop is generous — eventually.</p>
          </aside>
          <div>
            <div class="owner-list-head">
              <h3>ARSENAL · ${(meta.ownedWeapons || []).length} OWNED</h3>
              <span class="spacer"></span>
            </div>
            <div class="codex-filters">${filterButtons}</div>
            <div class="owner-list">${rows}</div>
          </div>
        </div>
      </div>`;
    this.openModal(html, { kind: 'forge' });
    this.bindClose();
    for (const btn of this.modalPanel.querySelectorAll('[data-filter]')) {
      btn.addEventListener('click', () => { this.forgeFilter = btn.dataset.filter; this.openForge(game); });
    }
    document.getElementById('toggle-autoequip')?.addEventListener('click', e => {
      meta.settings.autoEquip = !meta.settings.autoEquip;
      e.currentTarget.classList.toggle('on', meta.settings.autoEquip);
      this.audio.sfx('click');
      game.save();
    });
    for (const btn of this.modalPanel.querySelectorAll('[data-equip]')) {
      btn.addEventListener('click', () => {
        const w = byId.get(btn.dataset.equip);
        if (!w) return;
        if (meta.level < w.req) { this.toast(`Requires level ${w.req}.`, '#ffb340'); return; }
        meta.equippedWeapon = w.id;
        game.recompute();
        game.save();
        this.audio.sfx('click');
        this.toast(`Equipped ${w.name}`, rarityOf(w.rarity).color);
        this.openForge(game);
      });
    }
    for (const btn of this.modalPanel.querySelectorAll('[data-upgrade]')) {
      btn.addEventListener('click', () => {
        const w = byId.get(btn.dataset.upgrade);
        if (!w) return;
        const lvl = meta.upgrades?.[w.id] || 0;
        if (lvl >= 10) return;
        const cost = this.upgradeCost(w, lvl);
        if (!this.canPay(meta, cost)) { this.toast('Not enough materials to forge.', '#ffb340'); this.audio.sfx('error'); return; }
        this.pay(meta, cost);
        meta.upgrades[w.id] = lvl + 1;
        game.recompute();
        game.save();
        this.audio.sfx('levelup');
        this.toast(`${w.name} forged to +${lvl + 1}`, rarityOf(w.rarity).color);
        this.openForge(game);
      });
    }
  }

  upgradeCost(w, lvl) {
    return {
      gold: 50 + lvl * 40,
      iron: 2 + lvl * 2,
      essence: lvl >= 1 ? 1 + Math.floor(lvl / 2) : 0,
      crystal: (RARITIES[w.rarity]?.order >= 2 && lvl >= 2) ? 1 : 0,
    };
  }
  canPay(meta, cost) {
    return (meta.gold || 0) >= (cost.gold || 0)
      && (meta.materials?.iron || 0) >= (cost.iron || 0)
      && (meta.materials?.essence || 0) >= (cost.essence || 0)
      && (meta.materials?.crystal || 0) >= (cost.crystal || 0);
  }
  pay(meta, cost) {
    meta.gold -= cost.gold || 0;
    meta.materials.iron -= cost.iron || 0;
    meta.materials.essence -= cost.essence || 0;
    meta.materials.crystal -= cost.crystal || 0;
  }

  // ── Skills / stats ───────────────────────────────────────────────────────
  openSkills(game) {
    const meta = game.meta;
    const stats = game.stats || {};
    const statRows = STAT_KEYS.map(k => {
      const info = STAT_INFO[k];
      return `
        <div class="stat-row" style="--sc:${info.color}">
          <span class="stat-abbr">${info.name}</span>
          <div class="stat-info"><b>${info.label}</b><small>${info.desc}</small></div>
          <span class="stat-val">${meta.stats[k]}</span>
          <button class="plus-btn" data-stat="${k}" ${meta.statPoints <= 0 ? 'disabled' : ''}>+</button>
        </div>`;
    }).join('');
    const branchCols = SKILL_BRANCHES.map(branch => {
      const nodes = branch.nodes.map(node => {
        const unlocked = !!meta.skills?.[node.id];
        const prereq = !node.req || meta.skills?.[node.req];
        const levelOk = meta.level >= node.levelReq;
        const available = !unlocked && prereq && levelOk;
        const cls = unlocked ? 'unlocked' : available ? 'available' : 'locked';
        const icon = skillIconURL(node, 30);
        const slotTxt = node.kind === 'active' && unlocked ? `
          <div class="node-actions">
            ${[0, 1].map(i => `<button class="btn btn-sm ${meta.equippedSkills?.[i] === node.id ? 'btn-primary' : 'btn-ghost'}" data-slot="${i}" data-skill="${node.id}">${i === 0 ? 'Q' : 'E'}</button>`).join('')}
          </div>` : '';
        const action = !unlocked ? `<button class="btn btn-sm ${available ? 'btn-primary' : 'btn-ghost'}" data-unlock="${node.id}" ${available && meta.skillPoints >= node.cost ? '' : 'disabled'}>${available ? `UNLOCK · ${node.cost} SP` : `LV ${node.levelReq}${node.req ? ' · NEEDS ' + (SKILL_BY_ID.get(node.req)?.name || node.req).toUpperCase() : ''}`}</button>` : '';
        return `
          <div class="skill-node ${cls}" style="--bc:${branch.color}">
            <div class="skill-node-top">
              ${iconImg(icon, '', node.name)}
              <div><b>${esc(node.name)}</b><small>${node.kind === 'passive' ? 'PASSIVE' : `ACTIVE · ${node.mp} MP · ${node.cd}s`}</small></div>
              <span class="spacer"></span>
              ${unlocked ? `<span class="tag" style="color:${branch.color};border-color:${branch.color}66">${node.kind === 'passive' ? 'ON' : 'READY'}</span>` : ''}
            </div>
            <p>${esc(node.desc)}</p>
            <div class="node-actions">${slotTxt}${action}</div>
          </div>`;
      }).join('');
      return `
        <div class="branch" style="--bc:${branch.color}">
          <div class="branch-head">
            <span class="branch-glyph">${branch.glyph}</span>
            <div><b>${branch.name.toUpperCase()}</b><small>${branch.tagline}</small></div>
          </div>
          ${nodes}
        </div>`;
    }).join('');
    const slots = [0, 1].map(i => {
      const id = meta.equippedSkills?.[i];
      const skill = id ? SKILL_BY_ID.get(id) : null;
      return `<div class="skill-slot${skill ? '' : ' empty'}">${skill ? iconImg(skillIconURL(skill, 40), '', skill.name) : ''}<small>${i === 0 ? 'Q' : 'E'}</small></div>`;
    }).join('');
    const html = `${this.panelHead('◆', 'SKILL SHRINE', 'Three paths. Pick one — or borrow from all of them.', '#6db8ff', this.resourceRow(meta))}
      <div class="panel-body">
        ${(meta.statPoints > 0 || meta.skillPoints > 0) ? `<div class="points-banner">◈ ${meta.statPoints} STAT POINTS · ${meta.skillPoints} SKILL POINTS AVAILABLE</div>` : ''}
        <div class="skills-layout">
          <aside>
            <div class="stats-panel">
              <div class="gate-summary" style="margin-bottom:10px">
                <div><span>Level</span><b>${meta.level}</b></div>
                <div><span>HP</span><b class="green-text">${Math.round(stats.maxHp || 0)}</b></div>
                <div><span>MP</span><b class="blue-text">${Math.round(stats.maxMp || 0)}</b></div>
                <div><span>Crit</span><b>${(stats.crit || 0).toFixed(1)}%</b></div>
                <div><span>Dodge</span><b>${(stats.dodge || 0).toFixed(1)}%</b></div>
                <div><span>DPS</span><b class="green-text">${fmt(weaponDps(game.equippedWeapon, meta))}</b></div>
              </div>
              ${statRows}
            </div>
            <div class="skill-equip" style="margin-top:12px">
              <span class="muted" style="font-family:var(--font-head);font-size:7px">EQUIPPED</span>
              <div class="skill-slots">${slots}</div>
            </div>
          </aside>
          <div>
            <div class="skill-cols">${branchCols}</div>
          </div>
        </div>
      </div>`;
    this.openModal(html, { kind: 'skills' });
    this.bindClose();
    for (const b of this.modalPanel.querySelectorAll('[data-stat]')) {
      b.addEventListener('click', () => {
        if (meta.statPoints <= 0) return;
        const key = b.dataset.stat;
        meta.stats[key]++;
        meta.statPoints--;
        game.recompute();
        game.save();
        this.audio.sfx('click');
        this.openSkills(game);
      });
    }
    for (const b of this.modalPanel.querySelectorAll('[data-unlock]')) {
      b.addEventListener('click', () => {
        const node = SKILL_BY_ID.get(b.dataset.unlock);
        if (!node || meta.skills?.[node.id]) return;
        if (meta.skillPoints < node.cost) { this.toast('No skill points.', '#ffb340'); return; }
        meta.skills[node.id] = true;
        meta.skillPoints -= node.cost;
        if (node.kind === 'active' && (!meta.equippedSkills?.[0] || !meta.equippedSkills?.[1])) {
          meta.equippedSkills = meta.equippedSkills || [null, null];
          const empty = meta.equippedSkills[0] ? 1 : 0;
          meta.equippedSkills[empty] = node.id;
        }
        game.recompute();
        game.save();
        this.audio.sfx('levelup');
        this.toast(`${node.name} unlocked.`, node.color);
        this.openSkills(game);
      });
    }
    for (const b of this.modalPanel.querySelectorAll('[data-slot]')) {
      b.addEventListener('click', () => {
        const slot = Number(b.dataset.slot);
        const id = b.dataset.skill;
        meta.equippedSkills = meta.equippedSkills || [null, null];
        const other = meta.equippedSkills[1 - slot];
        if (meta.equippedSkills[slot] === id) meta.equippedSkills[slot] = null;
        else {
          meta.equippedSkills[slot] = id;
          if (other === id) meta.equippedSkills[1 - slot] = null;
        }
        game.save();
        this.audio.sfx('click');
        this.openSkills(game);
      });
    }
  }

  // ── Shop ─────────────────────────────────────────────────────────────────
  openShop(game) {
    const meta = game.meta;
    const items = SHOP_ITEMS.map(item => {
      const funds = item.currency === 'gems' ? meta.gems : meta.gold;
      const can = funds >= item.price;
      const icon = item.id === 'potion_hp' || item.id === 'potion_mp'
        ? `<span style="color:${item.color};font-family:var(--font-head);font-size:10px">${item.glyph}</span>`
        : iconImg(resourceIconURL(item.id === 'relic' ? 'gem' : item.id, 30), '', item.name);
      const owning = item.id === 'potion_hp' ? meta.potions.hp : item.id === 'potion_mp' ? meta.potions.mp : item.id === 'iron' || item.id === 'essence' || item.id === 'crystal' ? meta.materials[item.id] : null;
      return `
        <div class="shop-item">
          <div class="shop-icon" style="--sc:${item.color}">${icon}</div>
          <div class="shop-info">
            <b>${esc(item.name)}</b>
            <small>${esc(item.desc)}${owning !== null ? ` · Owned ${owning}` : ''}</small>
          </div>
          <div class="shop-buy">
            <span class="price" style="color:${item.currency === 'gems' ? '#ff5f9d' : '#ffd86b'}">${fmt(item.price)} ${item.currency === 'gems' ? 'GEMS' : 'G'}</span>
            <button class="btn btn-sm ${can ? 'btn-primary' : 'btn-ghost'}" data-buy="${item.id}" ${can ? '' : 'disabled'}>BUY</button>
          </div>
        </div>`;
    }).join('');
    const html = `${this.panelHead('✦', 'THE MERCHANT', '“Everything has a price. Most of it is negotiable.”', '#ffd86b', this.resourceRow(meta))}
      <div class="panel-body">
        <div class="shop-grid">${items}</div>
        <div class="divider"></div>
        <p class="muted" style="font-size:16px;margin:0">Flasks are refilled at the start of every run. Relic pulls can roll any Rare or better weapon still missing from your codex.</p>
      </div>`;
    this.openModal(html, { kind: 'shop' });
    this.bindClose();
    for (const b of this.modalPanel.querySelectorAll('[data-buy]')) {
      b.addEventListener('click', () => {
        const item = SHOP_ITEMS.find(i => i.id === b.dataset.buy);
        if (!item) return;
        const funds = item.currency === 'gems' ? meta.gems : meta.gold;
        if (funds < item.price) { this.toast('Not enough coin.', '#ffb340'); this.audio.sfx('error'); return; }
        if (item.currency === 'gems') meta.gems -= item.price; else meta.gold -= item.price;
        if (item.id === 'potion_hp') meta.potions.hp += 1;
        else if (item.id === 'potion_mp') meta.potions.mp += 1;
        else if (item.id === 'iron' || item.id === 'essence' || item.id === 'crystal') meta.materials[item.id] += 1;
        else if (item.id === 'relic') this.grantRelic(meta, game);
        game.save();
        this.audio.sfx('coin');
        this.openShop(game);
      });
    }
  }

  grantRelic(meta, game) {
    const pool = WEAPONS.filter(w => rarityOf(w.rarity).order >= 1 && (!owned(meta, w.id) || w.rarity === 'legendary' || w.rarity === 'mythic'));
    const w = pool.length ? pool[Math.floor(Math.random() * pool.length)] : WEAPONS[WEAPONS.length - 1];
    if (!owned(meta, w.id)) {
      meta.ownedWeapons.push(w.id);
      meta.collection[w.id] = (meta.collection[w.id] || 0) + 1;
      this.toast(`Relic: ${w.name}`, rarityOf(w.rarity).color);
    } else {
      meta.materials.essence += 2;
      meta.gold += 40;
      this.toast(`Duplicate ${w.name} → 40 gold + 2 essence`, rarityOf(w.rarity).color);
    }
    game.recompute();
  }

  // ── Codex ────────────────────────────────────────────────────────────────
  openCodex(game) {
    const meta = game.meta;
    const filters = ['all', 'owned', ...RARITY_KEYS].map(k => {
      const col = k === 'all' || k === 'owned' ? '#f0c05a' : rarityOf(k).color;
      const label = k.toUpperCase();
      return `<button class="btn btn-sm ${this.codexFilter === k ? 'btn-primary' : 'btn-ghost'}" data-cfilter="${k}" style="--fc:${col}">${label}</button>`;
    }).join('');
    let list = WEAPONS;
    if (this.codexFilter === 'owned') list = WEAPONS.filter(w => owned(meta, w.id));
    else if (RARITIES[this.codexFilter]) list = WEAPONS.filter(w => w.rarity === this.codexFilter);
    const found = Object.keys(meta.collection || {}).length;
    const cells = list.map(w => {
      const have = owned(meta, w.id);
      const rar = rarityOf(w.rarity);
      return `
        <button class="codex-cell ${have ? 'owned' : 'locked'}" data-weapon="${w.id}" style="--cc:${rar.color}" title="${have ? esc(w.name) : 'Undiscovered ' + rar.name}">
          ${iconImg(weaponIconURL(w, 56), '', have ? w.name : '')}
          ${have ? '<span class="cc-check">◆</span>' : ''}
        </button>`;
    }).join('');
    const html = `${this.panelHead('◇', 'WEAPON CODEX', 'Two hundred and twenty-four blades. The loop keeps every one you touch.', '#8ef0c8', this.resourceRow(meta))}
      <div class="panel-body">
        <div class="codex-stats"><span>FOUND ${found} / ${WEAPON_COUNT}</span><span>${Math.round(found / WEAPON_COUNT * 100)}% COMPLETE</span><span>STARTERS + DROPS + RELICS</span></div>
        <div class="codex-filters">${filters}<span class="spacer"></span><span class="muted" style="font-size:15px">${list.length} shown</span></div>
        <div class="codex-grid">${cells}</div>
        <div class="divider"></div>
        <div class="element-wheel" style="display:flex;flex-wrap:wrap;gap:5px">
          ${Object.entries(ELEMENTS).map(([el, e]) => `<span class="element-chip" style="--ec:${e.color}">${iconImg(elementIconURL(el, 12), '', e.name)} ${e.name}</span>`).join('')}
        </div>
      </div>`;
    this.openModal(html, { kind: 'codex' });
    this.bindClose();
    for (const b of this.modalPanel.querySelectorAll('[data-cfilter]')) {
      b.addEventListener('click', () => { this.codexFilter = b.dataset.cfilter; this.openCodex(game); });
    }
    for (const b of this.modalPanel.querySelectorAll('[data-weapon]')) {
      b.addEventListener('click', () => {
        const w = getWeapon(b.dataset.weapon);
        if (w) this.openWeaponDetail(w, game);
      });
    }
  }

  openWeaponDetail(w, game) {
    const meta = game.meta;
    const rar = rarityOf(w.rarity);
    const have = owned(meta, w.id);
    const affixes = (w.affixes || []).map(a => AFFIXES[a]).filter(Boolean);
    const html = `${this.panelHead('◆', 'WEAPON RECORD', have ? 'A blade that already knows your hand.' : 'A shape the loop has not yet offered you.', rar.color, `<button class="btn btn-sm btn-ghost" id="codex-back">← CODEX</button>`)}
      <div class="panel-body">
        <div class="weapon-detail" style="--wc:${rar.color}">
          <div class="wd-icon">${iconImg(weaponIconURL(w, 110), '', w.name)}</div>
          <div>
            <h3 style="color:${rar.color}">${esc(w.name)}</h3>
            <div class="w-meta" style="display:flex;gap:5px;flex-wrap:wrap">
              <span class="tag" style="color:${rar.color};border-color:${rar.color}66">${rar.name}</span>
              <span class="tag">${WEAPON_TYPES[w.type]?.name || w.type}</span>
              <span class="tag" style="color:${ELEMENTS[w.element].color}">${ELEMENTS[w.element].name}</span>
              <span class="tag ${have ? 'green' : 'red'}">${have ? 'OWNED' : 'UNDISCOVERED'}</span>
            </div>
            <div class="weapon-stats" style="margin-top:12px">
              <div><span>Base DMG</span><b>${w.baseDmg}</b></div>
              <div><span>DPS</span><b class="green-text">${fmt(weaponDps(w, meta))}</b></div>
              <div><span>Speed</span><b>${w.speed.toFixed(2)}</b></div>
              <div><span>Range</span><b>${w.range}</b></div>
              <div><span>Req level</span><b>${w.req}</b></div>
              <div><span>Price</span><b class="gold-text">${fmt(w.price)}g</b></div>
            </div>
            <div class="divider"></div>
            <div style="font-size:17px;color:#b7a9c6;line-height:1.25">
              ${affixes.length ? affixes.map(a => `<div style="display:flex;justify-content:space-between;gap:10px;border-bottom:1px dotted #2e2440;padding:4px 0"><span style="color:${a.color}">${esc(a.name)}</span><span class="muted">${esc(a.desc)}</span></div>`).join('') : '<span class="muted">No affixes. Reliable, unremarkable steel.</span>'}
            </div>
            <div class="result-actions" style="padding:16px 0 0;justify-content:flex-start">
              ${have ? `<button class="btn btn-primary" id="codex-equip" ${meta.level < w.req ? 'disabled' : ''}>EQUIP</button>` : '<button class="btn" disabled>FIND IT IN THE LOOP</button>'}
            </div>
          </div>
        </div>
      </div>`;
    this.openModal(html, { kind: 'codex-detail' });
    this.bindClose();
    document.getElementById('codex-back')?.addEventListener('click', () => this.openCodex(game));
    document.getElementById('codex-equip')?.addEventListener('click', () => {
      if (meta.level < w.req) { this.toast(`Requires level ${w.req}.`, '#ffb340'); return; }
      meta.equippedWeapon = w.id;
      game.recompute(); game.save();
      this.toast(`Equipped ${w.name}`, rar.color);
      this.openWeaponDetail(w, game);
    });
  }

  // ── Echo obelisk ─────────────────────────────────────────────────────────
  openEcho(game) {
    const meta = game.meta;
    const rows = ECHO_UPGRADES.map(e => {
      const rank = meta.echo?.[e.id] || 0;
      const maxed = rank >= e.max;
      const cost = echoCost(rank);
      const can = !maxed && meta.echoes >= cost;
      return `
        <div class="echo-item">
          <div class="echo-glyph" style="--ec:${e.color}">${e.glyph}</div>
          <div class="echo-info">
            <b>${esc(e.name)}</b>
            <small>${esc(e.desc)}</small>
            <div class="echo-ranks">${Array.from({ length: e.max }, (_, i) => `<i style="background:${i < rank ? e.color : '#2a2139'};box-shadow:${i < rank ? `0 0 5px ${e.color}` : 'none'}"></i>`).join('')}</div>
          </div>
          <div style="text-align:right">
            <div class="muted" style="font-family:var(--font-head);font-size:7px;margin-bottom:5px">${rank}/${e.max}</div>
            <button class="btn btn-sm ${can ? 'btn-primary' : 'btn-ghost'}" data-echo="${e.id}" ${can ? '' : 'disabled'}>${maxed ? 'MAX' : `${cost} ◈`}</button>
          </div>
        </div>`;
    }).join('');
    const html = `${this.panelHead('◈', 'THE ECHO OBELISK', 'Nothing is lost. The obelisk remembers every death and spends it.', '#c78cff', this.resourceRow(meta))}
      <div class="panel-body">
        <div class="echo-layout">
          <div class="echo-intro">
            <div class="echo-crystal"></div>
            <h3>ECHOES PERSIST</h3>
            <p>You carry <b class="violet-text">${fmt(meta.echoes)}</b> echoes across every loop. Spend them for permanent power. Nothing here is lost on death.</p>
            <div class="divider"></div>
            <div class="gate-summary" style="text-align:left">
              <div><span>Runs survived</span><b>${meta.runs || 0}</b></div>
              <div><span>Total kills</span><b>${fmt(meta.kills || 0)}</b></div>
              <div><span>Best depth</span><b>${meta.bestRoom || 0} rooms</b></div>
            </div>
          </div>
          <div class="echo-list">${rows}</div>
        </div>
      </div>`;
    this.openModal(html, { kind: 'echo' });
    this.bindClose();
    for (const b of this.modalPanel.querySelectorAll('[data-echo]')) {
      b.addEventListener('click', () => {
        const def = ECHO_UPGRADES.find(e => e.id === b.dataset.echo);
        if (!def) return;
        const rank = meta.echo[def.id] || 0;
        const cost = echoCost(rank);
        if (rank >= def.max || meta.echoes < cost) return;
        meta.echoes -= cost;
        meta.echo[def.id] = rank + 1;
        game.recompute();
        game.save();
        this.audio.sfx('levelup');
        this.toast(`${def.name} → rank ${rank + 1}`, def.color);
        this.openEcho(game);
      });
    }
  }

  // ── Settings / how-to ────────────────────────────────────────────────────
  openSettings(fromTown = false) {
    const meta = this.game.meta;
    const row = (key, title, sub) => `
      <div class="setting-row">
        <div class="sr-info"><b>${title}</b><small>${sub}</small></div>
        <button class="toggle${meta.settings[key] ? ' on' : ''}" data-setting="${key}" aria-label="Toggle ${title}"></button>
      </div>`;
    const html = `${this.panelHead('⚙', 'SETTINGS', 'Tune the loop to your liking.', '#6db8ff')}
      <div class="panel-body">
        <div class="settings-list">
          ${row('autoEquip', 'Auto-equip weapons', 'Swap automatically when a drop has higher DPS')}
          ${row('sfx', 'Sound effects', 'Slash, impact, potion and interface sounds')}
          ${row('bgm', 'Music', 'Chiptune and orchestral-tinted loop music')}
          ${row('shake', 'Screen shake', 'Impact feedback and boss quakes')}
        </div>
        <div class="divider"></div>
        <div class="howto-grid">
          <div class="howto-card">
            <h3>CONTROLS · DESKTOP</h3>
            <div class="control-list">
              <kbd>WASD</kbd><span>Move</span>
              <kbd>CLICK</kbd><span>Aim & attack</span>
              <kbd>SPACE</kbd><span>Attack</span>
              <kbd>SHIFT</kbd><span>Dodge</span>
              <kbd>Q / E</kbd><span>Skills</span>
              <kbd>1 / 2</kbd><span>Flasks</span>
              <kbd>F</kbd><span>Interact</span>
              <kbd>ESC</kbd><span>Pause</span>
            </div>
          </div>
          <div class="howto-card">
            <h3>CONTROLS · MOBILE</h3>
            <p>Left thumb: joystick. Right thumb: attack, dash, skills and flasks. Tap the world to aim and strike. Tap chests and shrines to interact.</p>
          </div>
        </div>
      </div>`;
    this.openModal(html, { kind: 'settings', panelClass: 'settings-panel' });
    this.bindClose();
    for (const b of this.modalPanel.querySelectorAll('[data-setting]')) {
      b.addEventListener('click', () => {
        const key = b.dataset.setting;
        meta.settings[key] = !meta.settings[key];
        b.classList.toggle('on', meta.settings[key]);
        if (key === 'sfx' || key === 'bgm') this.audio.setSettings({ [key]: meta.settings[key] });
        this.audio.sfx('click');
        this.game.save();
      });
    }
  }

  openHowTo() {
    const html = `${this.panelHead('?', 'HOW TO PLAY', 'Everything the loop will not tell you twice.', '#ffd86b')}
      <div class="panel-body">
        <div class="howto-grid">
          <div class="howto-card">
            <h3>THE LOOP</h3>
            <p>Enter the dungeon gate. Clear 5–18 rooms of procedural chambers, claim one of three spoils after each fight, and break the boss at the bottom.</p>
            <p>Death costs 25% of run gold — but weapons, materials, echoes and levels persist forever.</p>
          </div>
          <div class="howto-card">
            <h3>ELEMENTS</h3>
            <p>Eight elements. Advantage deals <b class="gold-text">1.5×</b> damage; disadvantage deals <b class="red-text">0.7×</b>. Watch for the WEAK! tag.</p>
            <div class="element-wheel" style="display:flex;flex-wrap:wrap;gap:4px;margin-top:6px">
              ${Object.entries(ELEMENTS).map(([el, e]) => `<span class="element-chip" style="--ec:${e.color}">${iconImg(elementIconURL(el, 12), '', e.name)} ${e.name}</span>`).join('')}
            </div>
          </div>
          <div class="howto-card">
            <h3>COMBAT</h3>
            <ul>
              <li>Click or tap the world to aim and attack.</li>
              <li>Dodge grants brief invulnerability — roll through projectiles.</li>
              <li>Skills spend MP. Flasks restore HP or MP instantly.</li>
              <li>Crit scales with DEX. Dodge scales with AGI.</li>
            </ul>
          </div>
          <div class="howto-card">
            <h3>PROGRESSION</h3>
            <ul>
              <li>Level cap 100. Each level grants stat and skill points.</li>
              <li>Forging a weapon raises its damage by 8% per rank.</li>
              <li>Echoes bought at the obelisk are permanent.</li>
              <li>224 weapons wait in the codex.</li>
            </ul>
          </div>
        </div>
        <div class="result-actions" style="padding-bottom:0"><button class="btn btn-primary" data-close>BACK</button></div>
      </div>`;
    this.openModal(html, { kind: 'howto', panelClass: 'howto-panel' });
    this.bindClose();
  }

  bindClose() {
    for (const el of this.modalPanel.querySelectorAll('[data-close]')) {
      el.addEventListener('click', e => { e.stopPropagation(); this.closeModal(); });
    }
  }
}
