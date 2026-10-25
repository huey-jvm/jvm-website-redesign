# Page loading silhouettes

These JSON files are generated from real browser layouts using Playwright. Each
file contains the first 1,200 pixels of one page at 320, 375, 430, 640, 768, 1024,
1440, and 1920 CSS pixels. Text becomes line-sized bars, media and controls become
blocks, and paper/navy section backgrounds remain recognizable. The header and
footer stay outside the loading boundary and remain usable.

`PageSkeleton` selects the appropriate sample with CSS and scales it horizontally
between captures. No image downloads, resize observer, or added waiting period
is needed. Reduced motion disables the gentle opacity pulse. One screen-reader
status announces loading; the decorative silhouettes contain no focusable controls.

## Regenerate after changing page layouts

1. Start the local site with `NEXT_PUBLIC_SHOW_PLACEHOLDERS=false`.
2. Run `node scripts/capture-skeletons.mjs`. It defaults to localhost:3100 and
   installed Microsoft Edge; override `BASE_URL` or `PW_CHROMIUM` if needed.
3. Review the desktop/mobile screenshots and measurements under the ignored
   `diagnostic-results/layouts/` directory, then review the JSON diff.

To update selected pages, pass their JSON names without extensions, for example
`node scripts/capture-skeletons.mjs home healthcare-operations health-it`.

Unavailable routes are skipped. Past performance currently has no published
records and continues to show the custom missing-page state.

## Local review and tests

Run `node scripts/preview-states.mjs` to temporarily mount the fixture at
`/ui-state-preview?view=loading&name=contact` on the local development server.
Use any JSON filename (without its extension) as `name`. `?view=boundary` lets
you trigger a real render failure and test recovery and offline messaging.

Run `tests/e2e/ui-states.spec.ts` with `STATE_PREVIEW=true`, `BASE_URL` pointing to
that development server, and `PW_CHROMIUM` pointing to the installed browser.
Always run `node scripts/preview-states.mjs --clean` before a production build.
The fixture itself is kept under `tests/fixtures/` and is never a public route.

Next.js displays these fallbacks when route content is pending. Prefetched/static
pages may resolve immediately and do not need to flash a skeleton. Static hosting
can serve the exported missing-page screen, but cannot serve a custom response for
a hosting-provider outage or an initial offline visit before the application loads.
