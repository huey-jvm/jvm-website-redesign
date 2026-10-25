# JVM Solutions website

The rebuilt jvmsolutions.net. Next.js (App Router), React, TypeScript, Tailwind CSS v4, deployed on Vercel.
The planning documents that define it live one folder up in `../docs/`: the PRD, the business rules, the
architecture and the design guidelines. This README is how to run, check and ship it.

## Run it

```
pnpm install
pnpm dev
```

Open http://localhost:3000. The contact form logs instead of sending, and nothing needs an API key.

## Check it

```
pnpm lint          # eslint
pnpm typecheck     # tsc
pnpm build         # production build
pnpm test          # playwright: width sweep at 7 widths, axe on every page, structure, redirects, widget
pnpm check         # all of the above in order
```

The test suite starts `pnpm start` on port 3100 by itself. Browsers: `pnpm exec playwright install chromium` once.
The test server is never reused. Stop anything on port 3100 before running it, or set `BASE_URL` to an explicitly managed server.
Lighthouse budgets live in `lighthouserc.json`. Run `pnpm lighthouse:mobile` and `pnpm lighthouse:desktop` after the production build. They use port 3200 and retain the 90 performance and 95 accessibility, best practices and SEO thresholds.

The JavaScript gate measures gzip bytes of the initial module scripts on every route, with a 150 KiB limit. Modules loaded after opening a menu or form, idle analytics and legacy `nomodule` scripts are outside that initial-load measurement.

## Cards and illustrations

Card titles occupy one line and expose the full title through a title attribute. Summary prose uses a two-line clamp; detail prose remains complete. Numbers and identifiers never truncate or clip. Card height follows content and row stretch, without a minimum height.

When the full text is too long for a card, the card carries a high level version and the detail sits one click away.

- Outcome and differentiator summaries use the deck sentence. Service summaries use their complete `teaser` sentence, at most 120 characters. Complete copy is available at the linked detail.
- A card that is itself the detail, such as a differentiator on the Why JVM page, shows its full text.
- Hierarchy decides the picture. The top tier carries an illustration or a photo: the five outcomes and the service cards. Everything below is text only: differentiators, pillars, values and link cards.

Illustrations share one shape. Landscape 8:5, 1200 by 750 pixels, a PNG with a transparent background, isometric 2:1 line art with a single gold accent object. They are registered in `content/assets.ts` with kind `illustration` and saved in `public/images/generated/`. Until a file exists the card draws a simple version of the same scene in code. `tests/e2e/assets.spec.ts` checks the size of every illustration file that exists.

## Where things are

| Path | What |
|---|---|
| `app/globals.css` | The token layer. Every colour, type step, radius, shadow and easing, as `@theme`. Tailwind's stock palette is removed so a component cannot reach for a colour that is not a token |
| `content/` | One fact, one file. `contact.ts` holds the only address, phone and routing table. `services.ts` holds the four service areas. `identifiers.ts`, `vehicles.ts`, `credentials.ts`, `team.ts`, `values.ts`, `statements.ts`, `legal.ts`, `navigation.ts`, `redirects.ts`, `placeholders.ts` |
| `components/ui/` | Primitives that carry the interaction contract once: `Button`, `Placeholder`, `CopyButton`, `ExternalLink`, `Eyebrow` |
| `components/site/` | Site components: header, footer, contact widget and form, proof strip, cards, fact block, in-page nav, close button, banner |
| `app/` | Routes. One folder per page, plus `api/contact`, `sitemap.ts`, `robots.ts` |
| `tests/e2e/` | The gates |
| `public/images/` | Logo, team photography, Open Graph image |
| `public/assets/` | Not in the repo yet. See below |

## Content that is still pending

Every gap is a `<Placeholder id="Pn">` and the ids match the register in `../docs/01-PRD.md` section 12.
The boxes are hidden everywhere unless a build sets `NEXT_PUBLIC_SHOW_PLACEHOLDERS=true`; the pending items are
tracked in a PDF kept outside the site instead. A hidden placeholder renders its fallback, or nothing. The past
performance page withholds itself in production until `content/vehicles.ts` has publishable records.

## The credential images

Run `../download-assets.ps1` once on a Windows machine, then copy the resulting `assets/` folder to
`public/assets/`. The paths in `content/credentials.ts` already match the file names that script produces.
Until the files are there, each credential renders as a text tile, so nothing is broken, it is just plain.

## Preview on GitHub Pages

Every push to `main` runs `.github/workflows/pages.yml`, which publishes a static preview with search indexing off. Pages cannot run a server, so that build drops the contact API (the form says it cannot send and offers
the direct email), the old Wix redirects and the security headers. Set the repository Pages source to GitHub Actions once.
To rehearse it locally: move `app/api` aside, run `PAGES_BASE_PATH=/jvm-website-redesign pnpm build`, then
`node scripts/pages-postbuild.mjs out`, and put `app/api` back.

## Deploy

1. Create a Vercel project from this repository. Framework preset Next.js, root directory left at the repository root.
2. Environment variables, from `.env.example`. Production: `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`,
   `CONTACT_FROM`, and the two Turnstile keys if used. Preview: add `NEXT_PUBLIC_NOINDEX=true`.
3. In Resend, verify the `jvmsolutions.net` domain so mail from `no-reply@jvmsolutions.net` is accepted.
4. Point the domain at Vercel. The redirects from every old Wix path are in `content/redirects.ts`.

## Version one, what is deliberately not here yet

- The CMS (`../docs/03-Project-Architecture.md` section 3.2). The editable set is job postings, contract
  vehicles and periods of performance, certifications, and leadership and team. Version one keeps that set in
  `content/` so the site can ship before JVM's accounts exist, and the content types are already shaped for a
  CMS. Contact details are not in the editable set. They are fixed in `content/contact.ts` by the client's choice.
- Job listings on the site. The careers page links through to the iSolved portal, which exposes no public
  feed. If JVM's iSolved administrator enables the job feed, listing openings here is a small follow up.
- The capability statement PDF and the ISO certificate PDF.
