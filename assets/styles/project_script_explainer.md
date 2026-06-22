# 🎬 5-Minute Video Script: HTML + CSS + JS (Velvet Groove)

---

## 0:00–0:25 — Intro / What the project is
**Host:**
“This is *Velvet Groove*, a coffee shop landing page. It has four main sections—**Home**, **Menu**, **Music**, and **Jobs**—but the cool part is that **JavaScript updates what you see**, and the **Music player actually plays audio**.”

---

## 0:25–1:35 — HTML: the structure (what the browser renders)
**Host:**
“Let’s start with HTML—`velvet-groove.html`. The page is organized like this:”

**On screen:**
- `<header class="header">` with navigation links
- `<main class="main-container">` as the swap zone
- Sections like `section#home`, `section#menu`, `section#music`, `section#job`

**Host:**
“The music section is built around containers such as `.music-player`, and controls like `.progress-bar` and buttons with classes like `.music-icons.play`, `.stop`, `.loop`. Even if the final content changes, the HTML provides the targets and layout hooks.”

---

## 1:35–2:40 — CSS: theme + layout + animations
**Host:**
“Now CSS—`assets/styles/style.css`. This file sets the whole visual style using **CSS variables** at `:root`—colors like `--primary-color`, `--neutral-color`, and font families for that coffee-lounge vibe.”

**Key points to mention:**
- `.header` is **fixed**, so navigation stays on top
- `.nav-menu` slides in/out using `transform` and `.nav-active`
- Sections use reusable helpers like `.sec-container` and `.grid`
- The Home section uses `.glow-effect` and a spinning vinyl animation via `@keyframes spin`
- The Music player is a panel: `.music-player` and icon states like `.select-state-active` / `.active-loop`

---

## 2:40–4:15 — JavaScript (Part 1): navigation + dynamic rendering
**Host:**
“First script: `assets/scripts/velvet-groove.js`. It controls navigation and replaces the main content.”

**On screen:**
- `let ACTIVE = null;`
- Burger menu: `burgerNav()` toggles `.nav-active`
- Click handling: listens for clicks on `.nav-list`

**Host:**
“When you click a nav item, `changeHTML(e)` clears `mainContainer.innerHTML`, then calls a renderer like `renderHomeHTML()`, `renderMenuHTML()`, `renderMusicHTML()`, or `renderJobsHTML()`.”

---

## 4:15–5:00 — JavaScript (Part 2): the Music player (audio + UI)
**Host:**
“Second script: `assets/scripts/velvet-music-fixed.js`. This one powers the music player.”

**Key flow:**
1. `initializeMusicPlayer()` does `fetch('assets/scripts/musics.json')` and loads the track list
2. It listens for clicks using **event delegation** on `document`
3. It uses the Web Audio-friendly `new Audio(fileLocation)` to play music
4. Controls:
   - play/pause: `togglePlay()` + icon updates
   - stop: reset `audio.currentTime = 0`
   - next/rewind: wraps with modulo math
   - loop: toggles `audio.loop`
   - progress bar: click-to-seek using element bounding box

**Host closing line:**
“So HTML provides the layout, CSS makes it look like a lounge, and JS makes it interactive—especially the data-driven music system.”

---

## End card (0:03)
**Host:**
“Want to expand it? Add a new song in `musics.json`, drop the MP3 and image into `assets/music/` and `assets/img/act2/music/`, and the playlist updates automatically.”

