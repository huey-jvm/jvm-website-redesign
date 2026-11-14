# Site-wide design review — 14 November 2026

Scope: all public route templates, the six service slugs, four legal pages, shared navigation/footer, forms, contact dialog, loading and recovery components. Local changes only; no commit, push or deployment by this design task. Existing unrelated prelaunch fixes were preserved.

## The 20 principles

| # | Principle | Applied decision and evidence |
| --- | --- | --- |
| 1 | Delete filler badges | Removed the filled hero motto treatment, About mission/vision number watermarks and framed initials in the values list. Preserved factual leadership experience highlights, procurement statuses and navigation state indicators. |
| 2 | Drop redundant labels | Shared page/image heroes suppress eyebrows already present in breadcrumbs. Removed repeated Service / Integrated expertise card labels, the duplicate capability-library heading on its dedicated page, repeated About/Careers headings, the dialog's Talk to JVM eyebrow and gallery filler label/numbering. Desktop hero motto is hidden because the utility bar already displays it. |
| 3 | Unitalicize random words | Searched all app/components: no decorative italic emphasis to remove. Address elements explicitly retain upright text. EB Garamond is upright, including quotations. |
| 4 | Mono only when needed | No monospace added. Body and interface text remain Inter; identifiers and numerical data retain tabular figures. |
| 5 | Use a design system | Reused shared Button, Section, hero, typography and color tokens. Added one editorial font token, aligned credential/purpose/action radii with existing tokens and retained the same control components across routes. |
| 6 | Show the actual product | Preserved supplied team/clinical/service photographs, real leadership portraits, original capability PDFs and linked credential records. Retained explanatory outcome illustrations and the interactive operations explorer because they explain the service. No fabricated product imagery or claims. |
| 7 | Enlarge the main feature | Retained the prominent homepage hero, larger lead healthcare card, careers panorama, About team photo and dominant contact-form column. Editorial titles have a distinct scale without enlarging navigation or every card title. |
| 8 | Group with spacing | Retained document chapters, service rows and side-by-side partnership paths. Removed background line art, mission/vision decorative backdrop and gallery ornament. Preserved the approved full-height desktop chapters; mobile follows content height. |
| 9 | Make headlines specific | Homepage outcomes: From Access to Care to Operational Readiness. About: Leadership and Team / Company Details. Contact: Contact JVM Solutions. Why JVM: Coordinating Healthcare Operations. Commercial section: Healthcare Support for Commercial Health Systems. Approved factual body copy, quotations and legal wording retained. |
| 10 | Emphasize the CTA | Services is the filled hero action and Meet JVM is tertiary. Preserved direct careers-portal, PDF-preview, business-development and form-submit actions. Avoided making every link equally prominent. |
| 11 | Add an accent colour | Retained gold as the UI accent with navy/cream. Removed the competing red navigation underline; the brand logo itself is unchanged. Operations selector surfaces now use shared cream/white/ink tokens. |
| 12 | Keep icons consistent | Standard Lucide stroke for partnership, credential and error controls. Removed duplicate desktop service arrows; icons beside labels cannot shrink. Brand/social symbols and explanatory illustrations retain their distinct purpose. |
| 13 | Remove embellishments | Removed credential watermarks/seal rings/light gradients and shadows, partnership background curves, About decorative numbers/backdrop, recovery contour artwork/rings, duplicate gallery numbering and unused photo-corner decoration. Kept photo readability overlays and useful borders/state indicators. |
| 14 | Inner radius = outer minus padding | Reviewed nested cards, menu, dialog, record panels and image frames. Padded dropdown links now have square inner corners; edge-to-edge photos use parent clipping. Small rounded controls remain consistent as controls rather than being treated as nested decorative frames. |
| 15 | Improve text contrast | Preserved stronger hero shading from the prelaunch work, kept dark-gold text on light surfaces and light-gold/cream on dark surfaces, simplified light credential surfaces. Automated axe and rendered hero contrast checks cover public routes. |
| 16 | Wrap headlines properly | Kept balanced headings/pretty paragraphs, gave the serif less-tight tracking and responsive sizes. Dedicated capability page now has a single page title followed by correctly leveled document headings. Width checks cover 320–1920px. |
| 17 | Align by eye, not pixels | Reviewed desktop hero/About and phone credentials/contact sheet; retained explicit image focal positions and service/CTA alignment. Removed repeated service arrows and prevented action-icon shrink. |
| 18 | Use tabular nums | Verified identifiers, NAICS, contract numbers/periods, fact blocks, numbered service/outcome lists and conditional past-performance tables retain tabular figures. Prose and names are not forced into numeric formatting. |
| 19 | Add loading states | Preserved route/photo/map loading work. Contact shell now opens immediately while form code loads, showing a status message with an available Close control. Early header-open intent is buffered until the widget subscribes. |
| 20 | Animate useful feedback | Removed decorative section/rule entry motion. Retained useful hover, pressed, selected, copy, submission and loading feedback with reduced-motion support. Clipboard denial now announces a manual-copy fallback instead of failing silently. |

## Contact dialog fixes

- Statically load the small dialog shell; keep the form deferred with visible loading feedback.
- Buffer the latest open request so a click during partial hydration is not lost; retain its opener for focus restoration.
- Exclude the backdrop from background inertness so click-away dismissal works.
- Provide a close cleanup timer as well as transition completion, including reduced-motion mode.
- Preserve route selection, validation, duplicate-submit prevention, focus trapping, Escape dismissal and return focus.
- Regression tests deliberately hold form JavaScript at phone/desktop widths, dismiss while pending, reopen, click the backdrop and close with reduced motion. Submission tests intercept the API; no real messages are sent.

## Typography

EB Garamond is self-hosted as a 400–800 upright Latin variable WOFF2. Downloaded from Google Fonts; copyright and SIL Open Font License 1.1 retained in `app/fonts/EB-Garamond-OFL.txt`. Sources: https://fonts.google.com/specimen/EB+Garamond and https://raw.githubusercontent.com/google/fonts/main/ofl/ebgaramond/OFL.txt.

Use it for page titles, major section/CTA headings, founder quotations and explicitly marked `.editorial-title` or `.font-editorial` emphasis. Body text, forms, navigation, footer labels, data and ordinary card headings remain sans serif. ABC Marist, Tiempos Fine and GT Alpina were not downloaded, installed or purchased; no trial forms were submitted.

## Route coverage

| Route family | Reviewed scope |
| --- | --- |
| Home | Hero, outcomes, lead/secondary services, differentiators, partnerships, leadership, CTA |
| Services index + healthcare-operations, health-it, logistics, facilities-management, management-support, logistics-facilities | Directory, all shared service chapters, capability lists, commercial support, PDF library, navigation/CTAs |
| About + community-impact + quality-compliance | Introduction, leadership/team, mission/vision, supplied founder quotes, values, company/map, quality standards and concern routes |
| Contracting + certifications + capability-statement | Copyable identifiers, evidence records, acquisition resources and all five original PDFs |
| Careers + work-with-us | Careers panorama, audiences, team gallery, job portal, partnership mail link and enquiry details |
| Contact | Full form, route selection, errors/success/pending states, office contacts/map and shared dialog |
| Privacy, terms, accessibility, SMS consent | Shared legal template, reading widths, heading structure, navigation and unchanged legal text |
| Recovery, loading, header/footer | Missing-page UI, error/loading source, desktop/mobile navigation, footer resources and keyboard controls |
| Withheld STARS III and past performance | Source reviewed; publication gating retained. No unavailable records were enabled for visual testing. |

## Verification

Production build, whole-project ESLint, TypeScript and whitespace checks passed.

- Broad production suite: **319 passed, 22 expected skips**. Covered all 22 public routes, accessibility, contrast, widths from 320 to 1920 pixels, navigation, buttons, motion, layout and contact interaction states. Skips cover withheld routes and optional synthetic state previews.
- Final production suite after the last typography and label adjustments: **43 passed**. Covered contact loading/dismissal/submission/copy failures, page structure, photo loading, original PDF downloads, publication gates and route JavaScript budgets.
- Browser review included the desktop homepage, About and healthcare service heroes, plus phone certifications and contact. Final preview is available at http://localhost:3111.

Browser checks use desktop Chrome and emulated phone viewports, not physical devices. These design changes remain local; no deployment was performed for this task.


## Follow-up revisions

- Homepage headline is now “Built to Serve. Ready to Deliver.” Desktop keeps the second sentence on one line; smaller screens can wrap.
- Partner introduction uses the same two-column grid as the content below it. The checklist introduction is “For partner enquiries, send us an email with these details:”.
- Contact card has a smaller editorial heading, evenly sized radio choices, visible selected indicators and recipient feedback. The textarea cannot be resized: 160px on the page, 128px in the compact dialog, with internal scrolling. Footer controls stack on narrow screens.
- Header contact controls now link to `/contact` on desktop and mobile. The separate conversation launcher still supports the dialog; dialog tests now use that launcher.
- Inner-page image heroes use equal columns, bounded photo heights and larger supporting copy. Removed secondary eyebrow labels from image heroes and the About introduction. Careers retains the full panoramic photograph without cropping people.
- Latest check: 179 tests passed in the combined responsive/hero/contact/navigation run; one layout test initially measured before the page rendered. After fixing its readiness check, all six layout/navigation tests passed. ESLint and TypeScript passed. Browser review confirmed the About desktop/mobile layouts, Careers hero, message height/resize settings and exact partner-column alignment.

- Typography follow-up: the larger desktop heading (up to 68px) and introductory paragraph (up to 24px) scale now applies to every inner-page hero, with and without photographs. The homepage hero and mobile text sizes remain unchanged.

- Latest follow-up: Careers uses a full-photo hero with a bottom-up gradient; header/form copy remains as approved. Contact sidebar and form stretch to the same desktop height, and the initial enquiry helper sentence is removed. Static page loading boundaries were superseded by direct visible HTML after performance inspection; see `loading-performance-2026-11-14.md` for results and limitations. Final regression: 184 checks passed.
