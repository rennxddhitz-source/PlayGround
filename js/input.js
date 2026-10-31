// ── Unified keyboard / mouse / touch input ──────────────────────────────────
import { Keybinds, clamp } from './util.js';

export class Input {
  constructor(canvas) {
    this.canvas = canvas;
    this.keys = new Set();
    this.joy = { x: 0, y: 0, active: false };
    this.pointer = { x: 240, y: 135, active: false, world: false };
    this.touchAttack = false;
    this.justPressed = new Set();
    this.held = { attack: false, dodge: false };
    this.lastAim = 0;
    this.mouseMoved = 0;
    this.joystickEl = null;
    this.knobEl = null;
    this.joyPointer = null;
    this.tap = null;
    this.bind();
  }
  bind() {
    window.addEventListener('keydown', e => {
      if (e.target && /input|textarea/i.test(e.target.tagName)) return;
      const code = e.code;
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(code)) e.preventDefault();
      if (!this.keys.has(code)) {
        for (const [action, codes] of Object.entries(Keybinds)) {
          if (codes.includes(code)) this.justPressed.add(action.toLowerCase());
        }
      }
      this.keys.add(code);
      if (code === 'Space' || code === 'KeyJ') this.held.attack = true;
      if (code === 'ShiftLeft' || code === 'ShiftRight' || code === 'KeyK') this.held.dodge = true;
    });
    window.addEventListener('keyup', e => {
      this.keys.delete(e.code);
      if (e.code === 'Space' || e.code === 'KeyJ') this.held.attack = false;
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight' || e.code === 'KeyK') this.held.dodge = false;
    });
    window.addEventListener('blur', () => { this.keys.clear(); this.held.attack = false; this.held.dodge = false; });
    const move = e => {
      const w = this.toWorld(e.clientX, e.clientY);
      this.pointer.x = w.x; this.pointer.y = w.y; this.pointer.active = true; this.pointer.world = true;
      if (e.pointerType === 'mouse') this.mouseMoved = performance.now();
    };
    this.canvas.addEventListener('pointermove', move);
    this.canvas.addEventListener('pointerdown', e => {
      if (e.button !== undefined && e.button !== 0) return;
      const w = this.toWorld(e.clientX, e.clientY);
      this.pointer.x = w.x; this.pointer.y = w.y; this.pointer.active = true; this.pointer.world = true;
      this.tap = { x: w.x, y: w.y };
      this.justPressed.add('attack');
      this.held.attack = true;
      if (e.pointerType === 'touch') this.mouseMoved = 0;
      e.preventDefault();
    });
    this.canvas.addEventListener('pointerup', e => { this.held.attack = false; });
    this.canvas.addEventListener('pointercancel', () => { this.held.attack = false; });
    this.canvas.addEventListener('contextmenu', e => e.preventDefault());
    // joystick (fixed base at bottom-left on touch devices)
    const setupJoy = () => {
      this.joystickEl = document.getElementById('joystick');
      this.knobEl = document.getElementById('joystick-knob');
      if (!this.joystickEl) return;
      const start = e => {
        this.joyPointer = e.pointerId;
        this.joy.active = true;
        this.updateJoy(e);
        this.joystickEl.setPointerCapture?.(e.pointerId);
        this.joystickEl.classList.add('active');
        e.preventDefault(); e.stopPropagation();
      };
      const durante = e => { if (this.joyPointer !== e.pointerId) return; this.updateJoy(e); e.preventDefault(); e.stopPropagation(); };
      const end = e => {
        if (this.joyPointer !== e.pointerId) return;
        this.joyPointer = null; this.joy = { x: 0, y: 0, active: false };
        if (this.knobEl) this.knobEl.style.transform = 'translate(-50%, -50%)';
        this.joystickEl.classList.remove('active');
      };
      this.joystickEl.addEventListener('pointerdown', start);
      this.joystickEl.addEventListener('pointermove', durante);
      this.joystickEl.addEventListener('pointerup', end);
      this.joystickEl.addEventListener('pointercancel', end);
      this.joystickEl.addEventListener('lostpointercapture', end);
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setupJoy); else setupJoy();
  }
  updateJoy(e) {
    const el = this.joystickEl;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    let dx = e.clientX - cx, dy = e.clientY - cy;
    const max = r.width * 0.33;
    const len = Math.hypot(dx, dy);
    if (len > max) { dx = dx / len * max; dy = dy / len * max; }
    this.joy.x = dx / max; this.joy.y = dy / max;
    if (this.knobEl) this.knobEl.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
  }
  toWorld(clientX, clientY) {
    const r = this.canvas.getBoundingClientRect();
    return {
      x: clamp((clientX - r.left) / r.width * 480, 0, 480),
      y: clamp((clientY - r.top) / r.height * 270, 0, 270),
    };
  }
  queue(action) { this.justPressed.add(action); }
  consume(action) { if (this.justPressed.has(action)) { this.justPressed.delete(action); return true; } return false; }
  isHeld(action) {
    if (action === 'attack') return this.held.attack || this.keys.has('Space') || this.keys.has('KeyJ');
    if (action === 'dodge') return this.held.dodge;
    return false;
  }
  getAxis() {
    let x = 0, y = 0;
    if (this.keys.has('KeyA') || this.keys.has('ArrowLeft')) x -= 1;
    if (this.keys.has('KeyD') || this.keys.has('ArrowRight')) x += 1;
    if (this.keys.has('KeyW') || this.keys.has('ArrowUp')) y -= 1;
    if (this.keys.has('KeyS') || this.keys.has('ArrowDown')) y += 1;
    if (Math.abs(this.joy.x) + Math.abs(this.joy.y) > 0.1) { x += this.joy.x; y += this.joy.y; }
    const l = Math.hypot(x, y);
    if (l > 1) { x /= l; y /= l; }
    return { x, y };
  }
  aimAngle(px, py) {
    if (this.mouseMoved && this.pointer.active && performance.now() - this.mouseMoved < 4000) {
      return Math.atan2(this.pointer.y - py, this.pointer.x - px);
    }
    return null;
  }
  endFrame() { this.justPressed.clear(); this.tap = null; }
}
