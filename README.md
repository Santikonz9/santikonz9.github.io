# Santikon Tapkila — Portfolio

A premium, self-contained developer portfolio for **Santikon Tapkila** (Full-Stack & AI / Quant Engineer).
No build step, no dependencies. Just open `index.html`.

## Features
- 🌌 Interactive particle-constellation + mouse-parallax aurora + grid + noise background
- 🔢 Counting preloader with progress bar
- ✨ Split-text animated hero name + shimmering gradient
- 🧲 Magnetic buttons / links (pull toward the cursor)
- 🪪 3D-tilt glass cards & project cards (follow your mouse)
- 🖱️ Skill cards with cursor-following spotlight
- 🏷️ Featured project cards + 6-way category filter
- 🧭 Journey timeline + infinite tech marquee
- ⌨️ Rotating typewriter headline
- 💬 Simulated live-chat widget + validated contact form (with toast)
- 🌗 Dark / light theme toggle · 🇬🇧🇹🇭 EN / TH language toggle
- 📱 Fully responsive + reduced-motion friendly

## How to customize
| What | Where |
|------|-------|
| Name, bio, headline | `index.html` (search for `Santikon`) |
| Thai translations | `data-th="..."` attributes in `index.html` |
| Skills list | `SKILLS` array in `script.js` |
| Projects | `PROJECTS` array in `script.js` (set `feat:true` for a featured 2-wide card, `badge:'...'` for a corner tag) |
| Timeline / Journey | `TIMELINE` object in `script.js` |
| Tech marquee | `MARQUEE` array in `script.js` |
| Colors / theme | `:root` variables at top of `styles.css` |
| Your photo | replace the `<svg class="avatar-svg">` block in `index.html` with `<img src="me.jpg">` |
| Chat auto-replies | `REPLIES` object in `script.js` |
| Social / CV links | `.hero-social a href` and the Download CV button in `index.html` |

## Notes
- Fonts load from Google Fonts when online; a system-font fallback is built in for offline use.
- The contact form and chat are front-end only (demo). To send real emails, connect the
  form to a service like Formspree, or a backend endpoint, in the `#contact-form` submit handler.
