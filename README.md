# Edison Real Estate — Landing Page

A pixel-accurate, fully responsive front-end recreation of the [Edison Real Estate Bangladesh](https://edisonrealestatebd.com/) homepage, built as a single-file HTML/CSS/JS implementation with zero dependencies.

---

## 📸 Preview

> Hero Section — full-screen grayscale image slider with smooth push transitions and bottom-up text animation.

> About Us Section — two-column layout with company description on the left and an image with an inline YouTube video lightbox on the right.

---

## 🚀 Getting Started

No build tools, no package manager, no framework. Just open the file.

```bash
# Clone the repository
git clone https://github.com/your-username/edison-realestate.git

# Open in browser
open edison-realestate.html
```

Or simply drag `edison-realestate.html` into any browser.

---

## 📁 Project Structure

```
edison-realestate/
├── edison-realestate.html   # All HTML, CSS, and JS in one file
└── README.md
```

> Everything is self-contained in a single `.html` file — styles are in `<style>`, scripts are in `<script>`, and Google Fonts are loaded via CDN link.

---

## ✨ Features

### 🔲 Navbar
- Fixed dark navbar (`#1c1c1c`) that stays on top at all times
- **EDiSON REAL ESTATE** bold condensed logo on the left
- Centered navigation links: Home, About, Projects, Blog, Gallery, Career, Contact, Landowner
- Bordered phone CTA button (`16760`) on the right
- **Hamburger menu** on mobile with slide-down drawer

### 🖼️ Hero Slider (Section 1)
- Full-screen (`100vh`) grayscale image slider with 3 slides
- **Smooth push transition** — current image slides out left/right simultaneously as new image slides in from the opposite side
- `cubic-bezier(0.77, 0, 0.175, 1)` easing for a premium, high-end feel
- **Ken Burns effect** — subtle zoom-out on each active slide's background image
- **Text animation** — slide titles are fixed overlays (not inside the sliding rail), so:
  - Current text fades + drops down on exit
  - New text rises up from below with fade-in after the slide lands
- **Vertical dot indicators** on the right side — clickable, direction-aware
- **Auto-advance** every 5.5 seconds, resets on manual interaction
- **Bottom project bar** — "Explore Projects" icon label + Ongoing / Handed Over / Upcoming / Ready links

### 🏢 About Us (Section 2)
- Two-column flex layout matching the original site structure
- **Left column** — "About Us" label, bold uppercase heading, two full body paragraphs (justified), "learn more" button with border hover effect
- **Right column** — building image with subtle dark overlay and an animated **red YouTube play button**
  - Pulsing ripple rings animate outward continuously
  - Scale + glow on hover
- **Inline video lightbox** — clicking play opens a modal on the same page:
  - Dark overlay fades in
  - Video box scales in with spring animation
  - YouTube video autoplays via embed API
  - Closes via ✕ button, clicking backdrop, or pressing `Escape`
  - Video stops completely on close (iframe `src` is cleared)
  - Page scroll locks while modal is open

---

## 🎨 Design Tokens

| Token | Value | Usage |
|---|---|---|
| `--nav-bg` | `#1c1c1c` | Navbar background |
| `--dark` | `#111111` | Page background |
| `--white` | `#ffffff` | Primary text on dark |
| `--gold` | `#b8975a` | Accent colour |
| `--off-white` | `#f4f1ec` | Light section background |
| `--text` | `#2a2420` | Body text on light |

---

## 🔤 Typography

| Family | Weights | Usage |
|---|---|---|
| `Barlow Condensed` | 700, 800 | Hero titles, section headings |
| `Barlow` | 300, 400, 500, 600 | Body text, nav links, labels |
| `Cormorant Garamond` | 300, 400, 600 | Decorative / serif accents |

All fonts loaded from **Google Fonts** — no local font files needed.

---

## 📱 Responsive Breakpoints

| Breakpoint | Changes |
|---|---|
| `≤ 1100px` | Nav link padding reduced, bar links compressed |
| `≤ 860px` | Nav links hidden → hamburger menu, About section stacks vertically |
| `≤ 540px` | Project bar label hidden, hero title font size reduced |

---

## 🛠️ Tech Stack

| Technology | Details |
|---|---|
| HTML5 | Semantic structure |
| CSS3 | Custom properties, Flexbox, Grid, keyframe animations |
| Vanilla JavaScript | Slider logic, modal, mobile menu — no jQuery or libraries |
| Google Fonts | Barlow, Barlow Condensed, Cormorant Garamond |
| YouTube Embed API | `?autoplay=1` via iframe src swap |
| Unsplash | Placeholder images (replace with actual project photos) |

---

## 🔧 Customisation

### Swap images
Replace the Unsplash URLs in the CSS with your actual building photos:
```css
.slide:nth-child(1) .slide-bg { background-image: url('your-image-1.jpg'); }
.slide:nth-child(2) .slide-bg { background-image: url('your-image-2.jpg'); }
.slide:nth-child(3) .slide-bg { background-image: url('your-image-3.jpg'); }
```

### Change the YouTube video
Update the `VIDEO_ID` constant in the `<script>` block:
```js
const VIDEO_ID = 'YOUR_YOUTUBE_VIDEO_ID';
```

### Change slide interval
Update the autoplay timer (milliseconds):
```js
timer = setInterval(() => goTo(current + 1, 'next'), 5500); // change 5500
```

### Add / remove slides
1. Add a new `.slide` div inside the hero section
2. Add a corresponding `#text-N` div with your title
3. Add a new `.dot` button in `.slider-dots`
4. Update `const TOTAL = 3` to match the new count

---

## 📄 License

This project is a front-end UI recreation built for educational and portfolio purposes.  
All brand assets, copy, and imagery belong to [Edison Real Estate Ltd.](https://edisonrealestatebd.com/)

---

## 🙏 Credits

- Original site: [edisonrealestatebd.com](https://edisonrealestatebd.com/)
- Placeholder images: [Unsplash](https://unsplash.com/)
- Fonts: [Google Fonts](https://fonts.google.com/)
