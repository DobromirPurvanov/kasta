# Kasta Ventures — UI/UX Redesign Audit

## Executive summary

The original implementation had a sound responsive and accessibility foundation, but its visual system was too uniform for a premium motorcycle brand. Sections repeated the same rounded-card pattern, key statistics appeared three times, the catalogue was difficult to compare, and conversion depended almost entirely on `mailto:` links. A blocking first-visit cookie modal and an inactive four-card blog also interrupted the path from product interest to contact.

## Findings and resolutions

| Before | Resolution |
|---|---|
| One weighty Inter/uppercase treatment made every section feel equally important. | Introduced a cinematic editorial scale with larger display typography, quieter supporting copy and restrained technical labels. |
| Flat off-white/black surfaces and identical cards lacked depth. | Added semantic light/dark tokens, wide organic shadows, top-edge sheen, limited glass surfaces, technical grids and soft ambient vermilion light. |
| Hero had generic CTAs and no direct product path or trust proof. | Rebuilt it around the product category, clear test-ride/model actions, comparable performance facts and a featured flagship card. |
| About appeared before the products and repeated the same metrics. | Reordered the story to Hero → trust → catalogue → local service proof → contact; replaced repeated metrics with the ownership journey. |
| Product cards showed only a tagline and price. | Added L1e/off-road status, speed/range comparison chips, stronger hierarchy and an expanded flagship treatment. |
| `/models` reused the homepage section with a visually hidden H1. | Added a real cinematic page hero, visible H1, range context and a direct catalogue anchor. |
| Desktop navigation prioritized utility icons over conversion; the 320px header could collide. | Added a persistent test-ride CTA, scroll progress, responsive logo behavior, 44px controls and a corrected mobile utility alignment. |
| Four non-actionable “Coming soon” blog cards added dead scroll before Contact. | Removed the placeholder section from the homepage journey until real articles exist. |
| Contact used improvised text logos and loaded Google Maps before consent. | Replaced them with brand assets, built a premium contact card, and made Maps an explicit user-loaded enhancement with a directions fallback. |
| Cookie consent blocked the entire first visit despite no active analytics. | Replaced it with a compact non-blocking banner; detailed settings now use a keyboard-safe modal and can be reopened from the footer. |
| Several light-mode labels used foreground opacity below WCAG AA. | Raised meaningful text contrast, enlarged legal body copy, preserved visible focus and maintained 44px minimum targets. |
| Repetitive 0.7–1.8s entrances delayed content and replayed heavily on filter changes. | Shortened reveals and filter transitions, standardized premium easing and preserved reduced-motion behavior with visible-by-default content. |
| SPA route metadata and delayed hash targets could become stale. | Synchronized canonical/Open Graph/Twitter metadata and added retry logic for lazy route anchors. |

## Product/content limitations requiring owner assets

- Each model currently has only one source image. A true gallery/360° viewer needs authentic front, rear, detail and lifestyle images for every SKU.
- There is no form/CRM endpoint, stock feed, financing data or delivery API. The redesign keeps honest phone/email conversion paths rather than simulating a successful submission.
- Customer reviews, test-ride photography and service-team proof were not present in the repository, so no fabricated social proof was added.
- Product speed/licence claims noted in the previous technical audit still require manufacturer confirmation before being emphasized further.

