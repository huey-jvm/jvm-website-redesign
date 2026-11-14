# Local loading-performance review — November 14, 2026

## Implemented

- All public pages are prerendered. The contact API remains dynamic.
- Removed unnecessary page-level loading boundaries from static routes: their HTML now contains visible page content directly, rather than a full-page skeleton with hidden content awaiting reveal. Existing loading templates are preserved under `components/site/route-loading/`; the withheld STARS route retains its gate. Form, photo and map loading feedback remains.
- Added portrait WebP sources and responsive picture sources for homepage/Careers phone heroes, with matching media-specific preloads. Desktop retains the original high-resolution sources. Mobile tests confirm the desktop hero is not downloaded too.
- Homepage hero transfer in the audited mobile viewport fell from 1,117,436 bytes to 84,466 bytes (about 92%).
- Place image-loading placeholders underneath the image so a ready image need not wait for a React update before becoming visible.
- Defer Google Maps creation until its card is near the viewport.
- Generated, content-hashed images receive `Cache-Control: public, max-age=31536000, immutable` on the Next server. Verified by an HTTP HEAD request. A separately deployed static host must configure its own response headers.

## Latest relevant mobile Lighthouse measurements

| Page | Performance | Accessibility | First contentful paint | Largest contentful paint | Layout shift |
| --- | ---: | ---: | --- | --- | --- |
| Homepage | 89 | 100 | 1.1 s | 3.7 s | 0 |
| Careers | 90 | 100 | 1.1 s | 3.7 s | 0 |
| Healthcare Operations | 91 | 100 | 1.1 s | 3.5 s | 0 |
| Contact | 93 | 100 | 1.1 s | 3.3 s | 0 |

These are local production-build lab measurements with Lighthouse 12.6.1 mobile simulation in Chrome, not field measurements or guarantees for the deployed domain. Sequential runs were used. Repeated runs varied: the latest homepage result is 89, and its 3.7-second LCP still exceeds the 2.5-second good threshold; there is room for further improvement. Initial paint is around 1.1 seconds on the latest representative runs. The reports in `diagnostic-results/performance-*.json` retain the iterations rather than hiding slower results.

## Verification

- Production build and TypeScript passed; changed-source ESLint passed.
- 183 regression checks passed: all public routes at seven widths, hero contrast, contact form/dialog, navigation, image loading and initial JavaScript budgets. One additional map keyboard test passed.
- All 22 public pages expose a visible main heading with JavaScript disabled.
- Every route remains below the existing 150 KiB gzip initial module-JavaScript budget.
- Contact form/card column edges measured equal on desktop. The message field remains non-resizable and internally scrollable; the removed helper sentence no longer renders.
- Careers now uses an edge-to-edge photograph with a dark bottom-up gradient. Wording and button destination are preserved; phone and desktop contrast checks passed.

Local development preview: http://localhost:3107. Production preview used for the final regression run: http://localhost:3118. No deployment was performed.

Framework reference: [Next.js loading boundaries and prefetching](https://nextjs.org/docs/app/guides/prefetching). Implementation decisions were verified against this project's generated HTML and browser tests.
