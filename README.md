# Muhammed Salih & Fathimath Rishana — Wedding Invitation

A luxury, cinematic, single-page wedding invitation built with **HTML5, CSS3, and vanilla JavaScript** — no frameworks, no backend. Powered by GSAP, Lenis smooth scroll, and AOS for scroll animations.

## 🎨 Theme

| Token | Value |
|---|---|
| Deep Emerald | `#0B3D2E` |
| Forest Green | `#123F30` |
| Matte Black | `#0A0B0A` |
| Gold | `#D4AF37` |
| Ivory White | `#F6F1E7` |

**Fonts:** Playfair Display & Cormorant Garamond (headings/script), Poppins (body).

## 📁 Project Structure

```
Wedding Invitation/
│
├── index.html
├── style.css
├── script.js
│
├── assets/
│   ├── images/
│   │   ├── couple.jpg        ← hero background photo
│   │   ├── gallery1–8.jpg    ← placeholder gallery photos
│   │
│   ├── music/
│   │   └── wedding.mp3       ← placeholder background track
│   │
│   └── icons/
│       ├── favicon.png
│       └── favicon-32.png
│
└── README.md
```

## ✏️ How to customize

### 1. Replace photos
- Swap `assets/images/couple.jpg` with your own hero photo (recommend a wide/landscape crop, min. 1600×900, so it fills the screen nicely with the Ken Burns zoom).
- Swap `assets/images/gallery1.jpg` … `gallery8.jpg` with your real photos. Keep the same filenames, or update the `data-src` attributes in `index.html` under the `#gallery` section.

### 2. Replace music
- Drop your own track into `assets/music/wedding.mp3` (keep the same filename), or update the `<source>` path inside the `<audio id="bgMusic">` tag in `index.html`. Autoplay is intentionally OFF — guests tap the floating gold music button to start it.

### 3. Update the wedding date / countdown
Open `script.js` and edit this line near the top:

```js
const WEDDING_DATE = new Date('2026-07-19T12:00:00');
```

### 4. Update the Google Maps link
There are two places with a placeholder Maps search link — search for `mapsBtn` and the "Get Directions" button in `index.html` and replace the `href` with your real Google Maps share link, e.g.:

```
https://www.google.com/maps/place/YOUR_EXACT_LOCATION
```

### 5. Update phone numbers
In the **Contact** section of `index.html`, replace the placeholder `tel:` links and visible numbers for the groom's and bride's families.

### 6. Edit "Our Story"
Each timeline card in the `#story` section of `index.html` has placeholder copy — replace the text inside `.timeline-content` with your real story.

## 🚀 Running locally

No build step needed. Just open `index.html` in a browser, or serve the folder with any static server, e.g.:

```bash
npx serve .
```

(A local server is recommended over opening the file directly, so lazy-loaded images and relative asset paths behave consistently across browsers.)

## ✅ Features

- Cinematic intro loader with staggered fade/blur reveal
- Full-screen Ken Burns hero with mouse parallax and dark cinematic overlay
- Live flip-style countdown timer
- Glassmorphism wedding detail cards
- Alternating scroll-animated "Our Story" timeline
- Masonry gallery with lazy loading + keyboard-navigable lightbox
- Vertical event schedule with connecting gold lines
- Floating play/pause music button (autoplay off)
- Glass navbar that appears on scroll, with mobile slide-in menu
- Ambient floating gold particles, shimmer text, and section reveal animations
- Mobile-first, responsive down to small phones
- Respects `prefers-reduced-motion`
- Semantic HTML, alt text, visible focus states, SEO meta tags

## 🛠️ Tech

- HTML5 / CSS3 / Vanilla JS (ES6+)
- [GSAP](https://gsap.com/) + ScrollTrigger — animation engine
- [Lenis](https://github.com/darkroomengineering/lenis) — smooth scroll
- [AOS](https://michalsnik.github.io/aos/) — scroll reveal
- [Font Awesome 6](https://fontawesome.com/) — icons
- Google Fonts — Playfair Display, Cormorant Garamond, Poppins

---

*With love, Muhammed Salih & Fathimath Rishana — 19 July 2026.*
