# DEMIGODZ — Operation Blacksite

A browser-native tactical first-person shooter built with **Three.js**, Vite, and zero external art or audio assets. Every texture, material, weapon model, character, level prop, and sound is generated procedurally at runtime.

![Gameplay](screenshots/linux.png)

## Play

```bash
npm install
PORT=3002 ./start.sh      # builds dist/ and serves it
# or, for development:
npm run dev               # http://localhost:3002
```

Open http://localhost:3002 and click **DEPLOY**.

## Controls

| Input | Action |
| --- | --- |
| `W A S D` | Move |
| `Shift` | Sprint |
| `Ctrl` | Crouch |
| `Space` | Jump |
| Mouse | Look |
| `LMB` | Fire (full-auto) |
| `RMB` | Aim down sights |
| `R` | Reload |
| `Esc` | Pause |

## Features

- **Procedural PBR world** — concrete, brushed steel, corrugated containers, warning stripes, scorch decals, puddles, and normal/roughness maps generated on `<canvas>`.
- **Cinematic lighting** — dusk sky shader, PMREM environment reflections, sun shadows, lamp flicker, fake volumetric light cones, drifting dust, and a patrolling drone.
- **Detailed viewmodel** — layered MK-17 rifle with rounded bevels, holo sight, laser module, skeleton stock, suppressor, gloved hands, sway, recoil, sprint pose, and reload animation.
- **Combat feel** — hitscan raycasts, headshot multipliers, spread bloom, tracers, muzzle flash, sparks, impact decals, hit markers, kill feed, and score.
- **Enemy AI** — spawn materialization, line-of-sight checks, approach/strafe/retreat states, burst fire, separation steering, hit reactions, and death animation.
- **Waves** — escalating enemy count and accuracy, clear/intermission flow, restartable game-over screen.
- **Post-processing** — MSAA render target, Unreal bloom, ACES tone mapping, chromatic fringing, filmic grade, vignette, and grain.
- **Fully procedural audio** — WebAudio gunshots, reload clicks, footsteps, enemy fire, hit confirms, wave horns, and industrial ambience.
- **HUD** — vitals, ammo, wave/hostiles/score, crosshair, ADS reticle, damage vignette, and animated overlays.

## Verification

- `npm run build` completes cleanly (Vite production build).
- Served on port `3002` and exercised in headed Chromium via `playwright-cli`.
- Verified in-browser: pointer lock, movement, jump, firing, headshot/body damage, kill feed, score, reload, ADS (FOV 76 → 52), pause/resume, wave clear → next wave, game over, and restart.
- The screenshot above is a real browser capture. CI uses SwiftShader (CPU software rendering), so the in-game FPS counter reads ~20–23 FPS there; it is not hardware GPU performance.

## Structure

```
index.html        HUD, menus, canvas
src/main.js       bootstrap, input, state machine, wave director
src/world.js      procedural textures, level, lighting, sky, props
src/weapon.js     viewmodel, hitscan, ammo, recoil, reload
src/enemies.js    robot model, AI, wave spawning
src/player.js     movement, collision, camera, health
src/fx.js         particles, tracers, decals, muzzle flash
src/audio.js      procedural WebAudio engine
src/post.js       bloom + custom grade composer
src/hud.js        DOM HUD bindings
```
