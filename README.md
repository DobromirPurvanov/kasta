# Kasta Ventures - E RIDE PRO Bulgaria

Official website for Kasta Ventures - the official E RIDE PRO distributor for Bulgaria.

## Site Structure

- **Homepage** - Hero video, About section, Models grid, Contact map, Blog
- **Models Page** - All 7 E RIDE PRO models with category filters
- **Product Detail** - Individual product pages with specs, FAQ, related products

## Languages

- Bulgarian (BG) - default
- English (EN) - via `?lang=en` URL parameter

## GitHub Pages Setup

This site is configured for GitHub Pages with SPA routing support via HashRouter.

### How to Deploy

1. Go to **Settings** → **Pages** in this repository
2. Select **Deploy from a branch**
3. Choose **main** branch and **/(root)** folder
4. Click **Save**
5. Your site will be live at: `https://dobromirpurvanov.github.io/kasta/`

### Local Development

```bash
# Clone the repository
git clone https://github.com/DobromirPurvanov/kasta.git
cd kasta

# If you have the source code:
npm install
npm run build

# Serve the dist folder
npx serve dist
```

### File Structure

```
├── index.html              # Main HTML entry point
├── 404.html                # SPA fallback redirect
├── _redirects              # Netlify redirect rules
├── assets/
│   ├── index-*.css         # Compiled CSS
│   └── index-*.js          # Compiled JavaScript
├── images/                 # All product images
│   ├── kasta/              # Original images from kastaventures.com
│   └── products/           # Product card images
└── videos/
    └── hero.mp4            # Hero background video
```

## Products

| Model | Category | Price |
|-------|----------|-------|
| Mini R | Mini | €3,960 |
| SR Off Road | SR / Off Road | €7,499 |
| SR L1e | SR / Road Legal | €7,499 |
| SS 3.0 L1e | SS 3.0 / Road Legal | €8,999 |
| SS 2.5 L1e | SS 2.5 / Road Legal | €7,999 |
| SS 2.5 Off Road | SS 2.5 / Off Road | €7,499 |
| SS 3.0 Off Road | SS 3.0 / Off Road | €8,499 |

## Credits

- Design inspired by [eridepro.com](https://www.eridepro.com/)
- Original product images from [kastaventures.com](https://www.kastaventures.com/)
- Built with React 18 + TypeScript + Vite + Tailwind CSS

---

© 2025 KaSta VENTURES. All rights reserved.
