# BLACKSITE // ZERO HOUR

A browser-based, first-person tactical shooter built with **Three.js** and **Vite**. No external art assets — every texture, weapon, soldier, structure and sound is generated procedurally at runtime.

## Run

```bash
npm install
npm run dev
```

Open the printed URL, press **PLAY**, then click the viewport to lock the mouse.

Production build:

```bash
npm run build
npm run preview
```

The `start.sh` runtime uses the default OMGithub static/Vite starter, which runs `vite build` and serves `dist/`.

## Controls

| Input | Action |
| --- | --- |
| `WASD` | Move |
| `Shift` | Sprint |
| `Ctrl` / `C` | Crouch |
| `Space` | Jump |
| Mouse | Look |
| `LMB` | Fire (automatic) |
| `RMB` | Aim down sights |
| `R` | Reload |
| `Esc` | Pause |

## Features

- Hand-built desert compound at dusk: command post, containers, watchtower, HESCO perimeter, technical wreck, sandbags, fires, dust and a custom atmospheric sky shader.
- Detailed procedural M4A1 viewmodel with red-dot optic, suppressor, animated reload, shell ejection, muzzle flash and spring recoil.
- Armored enemy operators with patrol/advance/strafe AI, line-of-sight checks, burst fire and death animations.
- Wave survival loop, health regeneration, hit markers, headshots, kill feed, score and a live tactical minimap.
- Post-processing chain: HDR bloom, filmic output, chromatic aberration, grain and vignette.
- Procedural WebAudio gunfire, impacts, footsteps, reloads and ambient wind.
