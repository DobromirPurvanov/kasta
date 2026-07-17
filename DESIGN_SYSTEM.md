# Kasta Ventures — Performance Editorial Design System

This document is the visual source of truth for the redesigned E RIDE PRO Bulgaria experience.

## Direction

**Cinematic performance editorial** — premium automotive photography, high-contrast technical typography, restrained glass surfaces and a precise vermilion action color. The interface should feel engineered, never decorative for its own sake.

## Color tokens

### Light

| Token | Value | Use |
|---|---:|---|
| Background | `#F3F3F1` | Main canvas |
| Elevated | `#FBFBFA` | Floating regions |
| Card | `#FFFFFF` | Product and content cards |
| Deep | `#E8E8E5` | Alternating sections |
| Foreground | `#0D0D0F` | Primary text |
| Secondary text | `#3F3F46` | Supporting copy |
| Muted text | `#66666F` | Metadata; do not reduce meaningful text below 60% foreground |
| Accent | `#D90429` | Primary actions and active states |
| Accent hover | `#B80021` | Pressed/hovered actions |
| Accent text | `#BD0022` | Accent text on pale surfaces |

### Dark

| Token | Value | Use |
|---|---:|---|
| Background | `#070708` | Cinematic canvas |
| Elevated | `#0D0D0F` | Navigation and overlays |
| Card | `#111114` | Product and content cards |
| Deep | `#040405` | Footer and section transitions |
| Foreground | `#F5F5F7` | Primary text |
| Secondary text | `#BCBCC3` | Supporting copy |
| Muted text | `#92929B` | Metadata |
| Accent | `#DF0A30` | Primary actions |
| Accent hover | `#FF2148` | Hover emphasis |
| Accent text | `#FF607B` | Small labels on dark surfaces |

Borders use 10% foreground; glass borders use 11% white in dark mode and 72% white in light mode. Red is reserved for actions, status and short labels—not large reading surfaces.

## Typography

The site uses self-hosted **Inter** for both display and body text to keep Cyrillic rendering, speed and brand precision consistent.

| Role | Size | Weight | Line height / tracking |
|---|---|---:|---|
| Cinematic hero | `clamp(48px, 7.1vw, 112px)` | 800 | `0.91`, `-0.058em` |
| Page display | `clamp(52px, 7.5vw, 116px)` | 800 | `0.91`, `-0.058em` |
| Section display | `clamp(41px, 6vw, 84px)` | 800 | `0.91`, `-0.058em` |
| Product title | `32–56px` | 800 | `0.96`, `-0.04em` |
| Card title | `19–30px` | 700 | `1.08`, `-0.035em` |
| Body | `15–17px` | 400–500 | `1.65–1.8` |
| UI label | `9–11px` | 700–800 | `0.12–0.18em`, uppercase |
| Button | `12px` | 700 | `0.05em`, uppercase |

Long legal copy is 16px with a 1.85 line height. Meaningful text must meet WCAG AA; low-opacity type is allowed only for decorative numerals and oversized outline phrases.

## Spacing and layout

- Base rhythm: **8px**.
- Working scale: `4, 8, 12, 16, 24, 32, 48, 64, 80, 112, 144px`.
- Section spacing: `clamp(80px, 9vw, 144px)`.
- Main container: maximum `1440px`.
- Horizontal gutters: `16px` mobile, `24px` small tablet, `40px` desktop.
- Card radius: `22–32px`; control radius: full pill or `16px`.
- Minimum interactive target: **44 × 44px**; primary actions are 52px high.

## Surfaces and elevation

- Cards use a low-opacity top sheen, a 1px semantic border and a wide low-density shadow.
- Glass is reserved for navigation, focused hero overlays and consent/settings surfaces.
- Default card shadow: `0 18px 48px -28px rgba(13,13,15,.24)` in light mode.
- Hover shadow: `0 32px 72px -30px rgba(13,13,15,.30)`.
- Hover lift: maximum `7px` plus `1.006` scale; never use hover as the only indication of interactivity.

## Motion

- Premium interaction curve: `cubic-bezier(0.25, 1, 0.5, 1)`.
- Expressive entrance curve: `cubic-bezier(0.16, 1, 0.3, 1)`.
- Hover/focus interactions: `180–300ms`.
- Card/image transitions: `300–700ms` only where the larger object needs visual continuity.
- Scroll entrances: `300–650ms`, short stagger `35–80ms`.
- Animate only `transform` and `opacity` for movement.
- `prefers-reduced-motion: reduce` disables continuous ambient motion, animated scrolling and decorative transitions.

## Component rules

- Primary CTA: vermilion gradient, white label, sliding white hover fill, visible focus ring.
- Secondary CTA: translucent foreground surface with a semantic border.
- Product card: category/status, clear product name, two comparable specs, price and a directional affordance.
- Status color is paired with text (`L1e` / `Off road`), never communicated by color alone.
- External maps load only after an explicit user action.
- Cookie consent is non-blocking on first visit; detailed preferences open in an accessible modal and can be reopened from the footer.

