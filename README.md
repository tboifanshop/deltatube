# A Modern YouTube Clone Application in React JS with Material UI 5 and RapidAPI

![YouTube](demo/main-page.png)

For clone to work, get API key from https://rapidapi.com/ytdlfree/api/youtube-v31 <br>
Put it in environment variable `REACT_APP_RAPID_API_KEY`

## Shorts Page (`shorts.html`)

A standalone static Shorts page — no build step required, works directly on GitHub Pages.

### Navigation
- Click **▶ Shorts** in the top navigation bar of the main app to open the Shorts page.
- Click **← Back** on the Shorts page to return to the main app.

### Controls

| Action | Key / Gesture |
|---|---|
| Move the soul | WASD or ↑ ↓ ← → arrow keys |
| Go to **previous** short | Hold soul in the **top 15%** of the screen for 2 seconds |
| Go to **next** short | Hold soul in the **bottom 15%** of the screen for 2 seconds |
| Toggle **Like** (white ↔ yellow) | Hold soul over the ♡ Like button for 2 seconds, or tap it directly |
| Toggle **Subscribe** + pixel explosion | Hold soul over the ★ Subscribe button for 2 seconds, or tap it directly |
| **Mobile D-pad** | Drag the on-screen circular D-pad (shown on touch devices) |

### Features
- 6 sample Deltarune YouTube embeds in a vertical 9:16 feed with fade transitions.
- Pixel-art red heart soul drawn on canvas (8×6 pixel grid → 24×18 px sprite) with red glow.
- Edge-triggered navigation with animated SVG progress rings (debounced — must leave zone before re-trigger).
- Pixel explosion effect (20 colored square particles) on subscribe.
- Deltarune-inspired styling: Press Start 2P pixel font, #5fa8d3 blue theme, CRT scanline overlay.
- Service worker (`sw.js`, cache `twincraft-v2`) caches `index.html` and `shorts.html` for offline use.

## Easter Egg – Queen 👑

When a user submits a search query that does **not** contain the word *deltarune* (case-insensitive):

1. The Queen character slides up beside the search bar.
2. Her laugh sound effect (`public/sfx/ohohohoh.mp3`) plays.
3. The search query is replaced with `why queen is so sexy deltarune` and the search proceeds.

To use a custom image, place a file at `public/images/deltarune_queen.webp` — if it's missing the Easter egg falls back to an emoji.

