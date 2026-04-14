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
- Dynamic Deltarune-focused Shorts feed loaded from the app's YouTube API backend, with lightweight on-demand pagination.
- Pixel-art red heart soul drawn on canvas (8×6 pixel grid → 24×18 px sprite) with red glow.
- Edge-triggered navigation with animated SVG progress rings (debounced — must leave zone before re-trigger).
- Pixel explosion effect (20 colored square particles) on subscribe.
- Deltarune-inspired styling: Press Start 2P pixel font, #5fa8d3 blue theme, CRT scanline overlay.
- Service worker (`sw.js`) caches `index.html` and `shorts.html` for offline use.

## Easter Egg – John Murston 🤠

When the user searches for `john murston` (case-insensitive, trimmed, and with normalized spaces), the search results experience switches to a full photo takeover that fills visible result containers using:

`https://static.wikia.nocookie.net/reddeadredemption/images/7/73/John_Marston_TBTN_5_Cropped.png/revision/latest?cb=20250808171334`
