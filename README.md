# Kasta Ventures — E RIDE PRO Bulgaria

Official distributor website for E RIDE PRO electric dirt bikes and moto cross in Bulgaria.

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS 3.4
- **Routing:** React Router 7 (BrowserRouter)
- **Animation:** GSAP + ScrollTrigger

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Project Structure

```
public/          # Static assets (images, videos, manifest, sitemap)
src/
  components/    # Reusable components
  data/          # Product data
  hooks/         # Custom hooks (language context)
  pages/         # Route-level pages
  sections/      # Homepage sections
index.html       # Entry HTML with SEO meta tags
```

## Deployment

### Vercel

The project includes `vercel.json` with SPA fallback configured.

### Netlify

The `_redirects` file handles SPA routing.

### GitHub Pages

Use the `404.html` fallback and ensure `base` in `vite.config.ts` matches your repository path.

## Notes

- Security headers (CSP, HSTS, etc.) should be configured at the hosting/CDN level, not in HTML meta tags.
- The site uses a cookie consent banner. Consent preferences are stored in `localStorage`.
