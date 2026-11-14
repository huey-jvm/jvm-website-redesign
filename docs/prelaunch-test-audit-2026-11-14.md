# Prelaunch test audit, November 14, 2026

Starting point: Checks run `43583244322`, commit `a6b1bda`, 16 failures, 392 passes, 20 optional state-preview skips. This work does not change the live domain binding, website DNS, email DNS or nameservers.

## Findings and changes

| Original failures | Cause | Resolution |
| --- | --- | --- |
| Map hover/keyboard parity | Inactive map-view buttons lacked matching keyboard styling | Added focus-visible background styling |
| About accessibility at 375px | A visually locked Google frame still exposed focusable embedded controls | Made the frame inert and hidden from assistive navigation; retained accessible Map/Satellite buttons and external map link |
| Initial JavaScript budget | Loading runtime was included for visitors who never needed it | Load Skullet only for pending images/maps; render the root page silhouette on the server; defer decorative error artwork. Budget remains 150 KiB gzip |
| Hero contrast | The text-side shade was too weak. Measurement also captured unpainted offscreen pixels and visually hidden labels | Strengthened shade behind copy and bottom facts while retaining the clear right-side photo; capture document-space pixels and exclude screen-reader-only labels. Contrast thresholds remain unchanged |
| STARS visibility sweep | The disabled route still exposed a loading marker and returned a streamed error with HTTP 200 | Gate its loading shell and redirect the withheld route to Contracting on server and static hosting |
| Three STARS responsive/accessibility checks, STARS copy action, contact resources, service contract summary | Tests required a vehicle the client has withheld | Condition vehicle-specific tests on the publication switch; continue testing that no STARS claims appear and that old URLs resolve safely |
| Founder-story figure | Test forbade the newly approved semantic founder quotation | Verify the supplied quote, author and all approved paragraphs |
| Sitemap | Test inventory omitted the new Community Impact page | Add that page to route, accessibility and layout coverage |
| Hero and chapter height (two checks) | Tests contradicted the client's full-height desktop direction | Test full desktop chapters, natural-height cards and legal sections, and compact mobile service introductions |
| Footer credential count | Test expected four linked marks although only three currently have approved evidence links | Expect three linked marks; do not republish a withheld credential to satisfy a count |

Eleven original failures were outdated expectations; five identified production or accessibility issues. The fixes also add a keyboard test for switching the locked office map's view.

Lighthouse now audits `/contracting` instead of the withheld `/contracting/stars-iii` page. All performance, accessibility, best-practices and SEO score thresholds are retained.

After the browser suite reached 420 passes, Lighthouse exposed mobile performance failures on the homepage and Healthcare Operations page. Photo placeholders now use CSS instead of downloading the Skullet runtime (the map still uses Skullet). The hero uses a phone derivative generated from the same original at the existing 60% horizontal focal point; desktop HD files are unchanged. Media-specific preloads prevent duplicate desktop downloads, and below-the-fold images receive low fetch priority. A browser regression checks the phone derivative, its HD dimensions and the single-image request. Failure artifacts now include the hidden Lighthouse reports so future performance issues retain their evidence.

## Release gate

The browser suite passed 421 tests with 22 intentional skips at `2fdb203`. The subsequent navigation regression verifies that a destination is not prefetched on initial render, is prefetched on keyboard focus, and opens with its heading visible. Primary navigation, buttons and breadcrumbs now prefetch on intent to avoid competing hero downloads. Performance CI runs separately against the production static export, with the same score thresholds and two runs per URL. Static sitemap and canonical URLs include the final trailing slash and are checked after export.

Mobile Lighthouse performance remains a cutover gate: the latest local static audit measured 88 on the homepage and 93–96 on the other three routes. Passing browser tests alone does not establish readiness for domain cutover.

GitHub run `43593729467` passed all 422 browser tests (22 intentional skips), and the preview and production-check exports passed. Its HTTP/1 static audit passed three routes, with the homepage at 85/88. The audit server now supports compressed HTTP/2 on loopback to match the production CDN's asset multiplexing. A one-day self-signed audit certificate is generated in an OS temporary directory; Chromium trusts it only for the local audit invocation. Production TLS settings are unaffected. Local HTTP/2 runs showed homepage LCP at 2.9–3.0 seconds, versus 3.9 seconds with the HTTP/1 connection queue; CPU time remains independently measured and gated.

Before website DNS cutover: require the updated Checks workflow, Pages preview deployment and build-only production export to pass, then verify the live preview. Real mailbox delivery and custom-domain HTTPS must still be checked during the coordinated cutover. The static contact experience intentionally uses direct email links rather than an API submission form.
