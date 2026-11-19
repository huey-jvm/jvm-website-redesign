# Margie's feedback and local video revision

Initial local review: 19 November 2026. Publication of this revision was authorized on 20 November 2026.

## Feedback translated into changes

| Feedback / request | Local implementation |
| --- | --- |
| Replace the homepage services-list introduction | “JVM delivers integrated healthcare management, workforce solutions and operational readiness to support our clients’ mission readiness.” Minor grammar/punctuation normalized from the supplied message. |
| Motion-led homepage | `landing.mp4` replaces the homepage image hero, with the existing headline and service/About actions over the film. |
| Move the team-shirt visual to About, with motion | `about-jvm.mp4` is the About JVM hero; its heading, introduction, breadcrumb and leadership action remain available. |
| Smooth sidebar expansion and collapse | The mobile navigation uses one persistent sliding panel and a separately fading backdrop. First lazy mount paints a closed frame before entering; closing remains visible until the slide finishes. The hamburger icon transforms with state. |
| Initial local-only review | Reviewed at http://localhost:3113/ and http://localhost:3113/about before publication was authorized. No DNS changes are required for this revision. |

The screenshot mentions a future white-suit film. The supplied `landing.mp4` actually shows navy suits; it is used as supplied, with no generated wardrobe or identity edits.

## Media preparation

Originals remain unchanged in `C:\Projects\jvm-website-redesign`. That folder's site clone is dated 19 October; implementation uses the current 14 November source in `C:\Users\User\Documents\jvm-website-redesign(v2)\site`.

| File | Source | Web version | Phone version |
| --- | --- | --- | --- |
| landing.mp4 | 2560 × 1440, 12.25 sec, 10.3 MB | 1920 × 1080, 6.4 MB | 960 × 540, 1.7 MB |
| about-jvm.mp4 (updated clip) | 1280 × 720, 5.04 sec, 13.7 MB | 1280 × 720, 2.6 MB | 960 × 540, 1.1 MB |

Outputs in `public/videos` use H.264, yuv420p, no audio, and MP4 fast-start metadata. Posters in `public/images/video` come from the supplied films at 1.5 seconds and use the existing responsive image pipeline. Media was prepared with FFmpeg; original footage was not changed.

The updated About film uses revision `32eef00a` in its filenames to avoid stale browser caches. It replaces the initial ten-second clip, including its poster. Previous generated About MP4s are retained in ignored local notes instead of shipped in `public`.

## Interface and safeguards

- Desktop: full-bleed film with lower-left text and actions. About uses a lighter upper gradient because its copy sits lower. The reading zones were tested against a completely white frame, rather than relying on a single convenient frame of the film.
- Phones: full-bleed film fills the complete hero behind its copy and actions, with a text-aware gradient and centered cover framing.
- Small, keyboard-accessible, icon-only Play/Pause controls are semi-transparent at rest and fully opaque on hover or keyboard focus. Films are muted, looped and inline at 85% speed.
- Reduced-motion and data-saving preferences show the still poster without requesting the video. Explicit Play remains available.
- Films pause when out of view or when the tab is hidden. A visitor's explicit pause survives scrolling away and back.
- Failed or blocked playback leaves the poster and all copy/actions available. Posters and page content are server rendered; no JavaScript is needed to read or navigate.
- Drawer focus trapping, Escape dismissal, background inertness and return focus remain intact. Keyboard and reduced-motion interactions use immediate state changes.

## Verification

Production build passed. Focused checks cover both films at phone and desktop widths, pause/resume, reduced motion, data saving, failed-video fallback, offscreen pause, worst-case contrast, and drawer entrance/exit/focus behavior. Existing photo-loading and responsive-image checks were updated for the new posters; About layout checks now target its video hero. Browser review covered both heroes and the open/closed phone drawer.

Final production-server regression: **76 passed, one intentionally skipped** (withheld STARS content). Lint, TypeScript, production build and whitespace checks passed. The wider responsive/navigation/contrast sweep also passed 215 checks; four older test setups were corrected and then included in the passing final production run.

Screenshots are saved in `notes/video-heroes-review` as `home-desktop.png`, `home-phone.png`, `about-desktop.png` and `about-phone.png`. Verification uses Edge with emulated viewports, not physical phones. These results describe the local review before publication.

Follow-up after the mobile full-bleed direction, icon-only control styling and replacement About footage: **21 focused checks passed**. They verify full-frame bounds on both routes, subdued rest/opaque hover and focus states, playback, fallbacks, reduced motion, data saving, white-frame contrast and drawer transitions. The drawer animation assertion records transition events so a busy test runner cannot miss a short animation merely by polling too late. ESLint and whitespace checks also passed for this follow-up.
