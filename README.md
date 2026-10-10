# JVM Solutions website

The rebuilt jvmsolutions.net. Next.js (App Router), React, TypeScript, Tailwind CSS v4, deployed on Vercel.
The planning documents that define it live one folder up in `../docs/`: the PRD, the business rules, the
architecture and the design guidelines. This README is how to run, check and ship it.

## Run it

```
pnpm install
pnpm dev
```

Open http://localhost:3000. In development the placeholder blocks are visible (dashed gold boxes carrying a
register id such as `P5`), the contact form logs instead of sending, and nothing needs an API key.

## Check it

```
pnpm lint          # eslint
pnpm typecheck     # tsc
pnpm build         # production build
pnpm test          # playwright: width sweep at 7 widths, axe on every page, structure, redirects, widget
pnpm check         # all of the above in order
```

The test suite starts `pnpm start` on port 3100 by itself. Browsers: `pnpm exec playwright install chromium` once.
Lighthouse budgets live in `lighthouserc.json` and run with `npx @lhci/cli autorun`.

## Where things are

| Path | What |
|---|---|
| `app/globals.css` | The token layer. Every colour, type step, radius, shadow and easing, as `@theme`. Tailwind's stock palette is removed so a component cannot reach for a colour that is not a token |
| `content/` | One fact, one file. `contact.ts` holds the only address, phone and routing table. `services.ts` holds the four service areas. `identifiers.ts`, `vehicles.ts`, `credentials.ts`, `team.ts`, `values.ts`, `statements.ts`, `legal.ts`, `navigation.ts`, `redirects.ts`, `placeholders.ts` |
| `components/ui/` | Primitives that carry the interaction contract once: `Button`, `Placeholder`, `Chip`, `CopyButton`, `ExternalLink`, `Eyebrow` |
| `components/site/` | Site components: header, footer, contact widget and form, proof strip, cards, fact block, in-page nav, close button, banner |
| `app/` | Routes. One folder per page, plus `api/contact`, `sitemap.ts`, `robots.ts` |
| `tests/e2e/` | The gates |
| `public/images/` | Logo, team photography, Open Graph image |
| `public/assets/` | Not in the repo yet. See below |

## Content that is still pending

Every gap is a `<Placeholder id="Pn">` and the ids match the register in `../docs/01-PRD.md` section 12.
Placeholders show in development and on any build with `NEXT_PUBLIC_SHOW_PLACEHOLDERS=true` (set that on the
Vercel Preview environment). A production build hides them and renders the fallback, or nothing. The past
performance page withholds itself in production until `content/vehicles.ts` has publishable records.

## The credential images

Run `../download-assets.ps1` once on a Windows machine, then copy the resulting `assets/` folder to
`public/assets/`. The paths in `content/credentials.ts` already match the file names that script produces.
Until the files are there, each credential renders as a text tile, so nothing is broken, it is just plain.

## Deploy

1. Create a Vercel project from this folder. Framework preset Next.js, root `site/`.
2. Environment variables, from `.env.example`. Production: `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`,
   `CONTACT_FROM`, and the two Turnstile keys if used. Preview: add `NEXT_PUBLIC_SHOW_PLACEHOLDERS=true`
   and `NEXT_PUBLIC_NOINDEX=true`.
3. In Resend, verify the `jvmsolutions.net` domain so mail from `no-reply@jvmsolutions.net` is accepted.
4. Point the domain at Vercel. The redirects from every old Wix path are in `content/redirects.ts`.

## Version one, what is deliberately not here yet

- The CMS (`../docs/03-Project-Architecture.md` section 3.2). Version one keeps the editable set in
  `content/` so the site can ship before JVM's accounts exist. Wiring Sanity is the first version 1.1 task,
  and the content types are already shaped for it.
- Job listings pulled from iSolved. The careers page links through, with a slot for listings.
- The capability statement PDF and the ISO certificate PDF.
