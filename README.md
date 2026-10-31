# PlayGround

<!-- omgithub:readme:start -->
## 🚀 Build, play, and remix with OMGithub

**Created using [OMGithub.com](https://omgithub.com).**

[![OMGithub](https://img.shields.io/badge/OMGithub-Open%20project-orange?style=for-the-badge)](https://omgithub.com/rennxddhitz-source/PlayGround)
[![GitHub](https://img.shields.io/badge/GitHub-Source-181717?logo=github&style=for-the-badge)](https://github.com/rennxddhitz-source/PlayGround)

- 🎮 [Open the project](https://omgithub.com/rennxddhitz-source/PlayGround).
- ✨ [Remix this project](https://omgithub.com/?remix=rennxddhitz-source%2FPlayGround).
- 💻 [Explore the source](https://github.com/rennxddhitz-source/PlayGround).
- 🛠️ [Check build runs](https://github.com/rennxddhitz-source/PlayGround/actions).
- 🐛 [Report an issue](https://github.com/rennxddhitz-source/PlayGround/issues).
- 👤 [Explore the creator's projects](https://omgithub.com/rennxddhitz-source).
- 🌍 [Create with OMGithub](https://omgithub.com).
<!-- omgithub:readme:end -->

---

## 🧸 Toys vs. Nightmares (`toys-vs-nightmares/`)

Lane-defense game bergaya kartun mainan (portrait, mobile-first, 2D top-down). Kamu adalah *Guardian* tak terlihat yang menata pasukan mainan hidup di grid 5×9 untuk melindungi tidur seorang anak dari para Nightmare — PvZ-style, dibungkus dunia kamar tidur malam hari.

**Cara main:** buka `toys-vs-nightmares/index.html` di browser (desktop atau HP Android/iOS) — tanpa build, tanpa dependensi. Atau serve lokal:

```bash
cd toys-vs-nightmares && python3 -m http.server 8080
```

**Fitur**
- ⭐ **Starlight** jatuh dari langit + unit generator → tap untuk kumpul; dipakai untuk menempatkan unit (validasi hijau/merah saat tap-to-place).
- 🧸 **8 unit** (Teddy Knight, Robot Soldier, Star Sprite, Block Fort, Slinky, Bubble Blower, Jack-in-the-Box, Plush Dragon) unlock bertahap lewat **Guardian Level**.
- 👾 **5 jenis Nightmare** termasuk Blanket Ghost (tidak bisa diblokir) dan boss **Nightmare King** — 6 malam (5–7 wave, sulitnya naik).
- ✨ **Star Power**: meter 0–100% → MOONBEAM pukulan area + stun.
- 🌀 **Game juice**: hit-stop 80ms saat hit, screen shake, partikel, ikon unit digambar canvas, outline tebal gaya mainan kertas; palet `#1a1a2e / #ffd700 / #00d4ff`.
- 🔊 Audio WebAudio: SFX *boing/pop/ding* + musik piano lullaby generatif (bisa dimatikan).
- 🌙 **Meta progression**: Bulan (upgrade unit permanen +12%/lv), XP → Guardian Level, Permata dari trofi/first-clear; progress tersimpan di `localStorage` — plus bonus harian.
