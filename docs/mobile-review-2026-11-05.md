# Mobile review — 5 November 2026

Local changes only. Preview: http://localhost:3113/. No commit, push or deployment.

## Scope and decisions

Reviewed the homepage, About, Quality, Services and its six detail/legacy routes, Partner With Us, Careers, Contact, Why JVM, Contracting, Certifications, Capability Statements and all four legal pages. Also checked the intentionally unavailable Past Performance route's not-found state. Following the user's confirmation, chapters below 1024px fit their content instead of requiring a viewport of height. The homepage mission hero stays full-height; desktop chapter sizing is unchanged.

## Improvements

- Contact stays available in the header down to 320px.
- Mobile menu links dismiss the menu even when selecting an anchor on the current page. Forward page navigation keeps the opening title visible, including streamed routes. Desktop retains its small entry offset; anchors and history are not reset.
- Contact dialog has a compact phone heading, a scrollable form body, short-landscape sizing and safe-area spacing. Close and submit controls remain reachable.
- Footer navigation uses two columns on phones, with the office details below.
- Decorative service diagrams were initially hidden in phone listings. A subsequent user-requested photo pass replaced them with available client photographs, now shown on phones as well. Missing team portraits use a person icon instead of a processor icon.
- Careers exposes the jobs portal in its opening section. The service explorer consistently says Health IT.
- Next-service navigation catches large scroll jumps, wraps long labels and respects the bottom safe area.
- Contact uses the same office map query as About.

## Verification

- Build, TypeScript and ESLint passed.
- 66 route/width checks at 320, 390 and 768px found no document horizontal overflow or horizontally clipped headings, buttons, inputs or selects. This includes 63 checks of published pages and three of the unavailable Past Performance route.
- Mobile axe scan at 390×844 reported zero violations on all 22 checked routes, including the not-found state.
- Final production build: 11 Playwright checks passed across mobile-review, navigation-scroll, loading, service-sequence and operations-explorer specs. Interaction viewports include 320×568, 390×844 and 844×390, plus desktop navigation regression coverage.
- Visually reviewed section captures and the final Services page and contact dialog. Review images and machine-readable layout/accessibility results are in the parent workspace's `tmp/mobile-audit/` folder. Final Services screenshot: `services-final.png`.
- The development server hit a Turbopack internal error during a concurrent run. It was stopped; final interaction results are from the successful production build served locally.

## Limits

Verification used Chromium/Edge viewport emulation, not physical iOS/Android devices. No contact message was sent. Third-party jobs, map and PDF destinations retain their external behavior; this review does not certify those providers' mobile interfaces.
