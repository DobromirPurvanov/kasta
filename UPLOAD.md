# Upload Instructions

## Quick Deploy

1. Download `kasta-site.zip` from the latest Release
2. Extract all files to this repository root
3. Commit and push:

```bash
git clone https://github.com/DobromirPurvanov/kasta.git
cd kasta
# Extract kasta-site.zip contents here
unzip -o kasta-site.zip
rm kasta-site.zip
git add .
git commit -m "Deploy E RIDE PRO website"
git push origin main
```

## Enable GitHub Pages

1. Go to **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** → **/(root)**
4. Click **Save**
5. Wait 2-3 minutes
6. Your site will be live at: `https://dobromirpurvanov.github.io/kasta/`

## What's Included

- `index.html` - Main entry point
- `404.html` - SPA fallback redirect
- `_redirects` - Netlify redirect rules
- `assets/` - CSS and JS bundles
- `images/` - All product images (compressed)
- `videos/hero.mp4` - Hero background video
