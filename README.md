# imconte.com

Personal portfolio and professional card of **Nicolas Conte**, full stack developer. Live at [imconte.com](https://imconte.com), in Portuguese (`pt-BR`) and English (`en`).

It is a small Next.js App Router site with no UI library and no CMS: content lives in typed TypeScript files, every page is statically rendered, and the only dynamic endpoints are a live status card for the home server that hosts it and a still frame of an animated SVG.

## Highlights

- **Bilingual routing**: every page lives under `/{locale}`; `src/proxy.ts` redirects locale-less paths using the `NEXT_LOCALE` cookie first and `Accept-Language` (with q-values) second;
- **Case studies** at `/{locale}/projetos/{slug}`, with problem, role, highlights, outcome, stats and a gallery;
- **Printable CV** at `/{locale}/cv`, always light on screen and paper, with ATS-friendly headings; the PDFs in `public/cv/` are printed from that page;
- **Command palette** (`Ctrl/Cmd + K`): a native `<dialog>` with the ARIA combobox pattern and accent-insensitive search;
- **Skill filter** shared by the Projects and Skills sections;
- **Pixel identity**: Geist Pixel type, a dithered aurora (8×8 Bayer matrix) and a dithered portrait that resolves into the real photo on hover, tap or keyboard;
- **Activity**: the daily contribution game from the GitHub profile README, with a static frame served for `prefers-reduced-motion`;
- **Homelab card**: uptime, CPU, RAM and energy of the server that runs the site, polled only while the card is visible;
- **SEO**: canonical and `hreflang` alternates, Open Graph and Twitter cards with generated images per locale and per project, `sitemap.xml` and `robots.txt`;
- **No theme flash**: a blocking inline script applies the theme before first paint;
- Every animation respects `prefers-reduced-motion`.

## Stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack), React 19 |
| Language | TypeScript 6 |
| Styling | Tailwind CSS 4 (`@tailwindcss/postcss`), CSS variables for light/dark |
| Fonts | `geist` (Sans, Mono, Pixel Square) |
| Lint | ESLint 9 flat config with `eslint-config-next` |
| Assets | Python 3 + Pillow + NumPy scripts in `scripts/` |

## Getting started

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev          # http://localhost:3000
```

Other commands:

```bash
npx tsc --noEmit     # type-check
npx eslint src       # lint the sources (plain `eslint .` also walks build output)
npm run build        # production build into .next
npm run start        # serve the production build on port 9001
```

## Routes

| Path | Source | Notes |
| --- | --- | --- |
| `/`, any path without a locale | `src/proxy.ts` | Redirects to `/{locale}/...` |
| `/{locale}` | `src/app/[locale]/page.tsx` | Home |
| `/{locale}/cv` | `src/app/[locale]/cv/page.tsx` | Printable CV |
| `/{locale}/projetos/{slug}` | `src/app/[locale]/projetos/[slug]/page.tsx` | Case study; unknown slugs are 404 |
| `/{locale}/og.png`, `/{locale}/projetos/{slug}/og.png` | `route.tsx` handlers | 1200×630 share cards (`next/og`) |
| `/sitemap.xml`, `/robots.txt` | `src/app/sitemap.ts`, `src/app/robots.ts` | |
| `/activity/{dark,light}.svg` | `src/app/activity/[file]/route.ts` | Still frame of the contribution game |
| `/api/homelab` | `src/app/api/homelab/route.ts` | Live server vitals (JSON) |
| Anything else under a locale | `src/app/[locale]/[...rest]/page.tsx` | Localized 404 |

Paths that contain a dot (`og.png`, `sitemap.xml`, `*.svg`) and `/api/*` are excluded from the locale redirect by the proxy matcher.

## Project structure

```
src/
  app/            routes, layouts, route handlers, global CSS
  components/     sections and client-side leaves ("use client" only where needed)
  data/           portfolio.ts: profile, projects, experience, education, skills
  i18n/           locales and dictionaries (all translatable UI text)
  hooks/          scroll, scrollspy and skill-filter state
  lib/            metadata helpers, theme, locale, clipboard, OG renderer, homelab parsers
  assets/         project images, OG fonts, generated pixel data
public/           CV PDFs, pixel layers, portrait, icons
scripts/          asset generators (Python)
```

### Editing content

- **Facts** (names, links, dates, stack, metrics) live in `src/data/portfolio.ts`;
- **Translatable text** lives in `src/i18n/dictionaries.ts`, typed by `Dictionary`, so a missing translation fails the type-check;
- Mixed content is joined by `slug` or `id`, never by array position;
- A new project needs an entry in `projects`, its copy in both dictionaries under `projects.items[slug]`, and a cover in `src/assets/projects/`. The case study page, OG image and sitemap entry follow automatically;
- After changing the CV content, regenerate both PDFs by printing `/{locale}/cv` to `public/cv/nicolas-conte-cv-{locale}.pdf` (headless Chromium with `--print-to-pdf --no-pdf-header-footer` works).

## Generated assets

Both scripts need Python 3 with Pillow and NumPy and write directly into the repository.

```bash
python3 scripts/build-pixel-assets.py           # aurora, scene, OG band, TTF copy of Geist Pixel
python3 scripts/build-portrait.py [cutout.png]  # dithered portrait (dark/light) and photo.webp
```

`build-portrait.py` takes an optional cutout with a transparent background; without it, it re-dithers the existing `public/portrait/photo.webp`.

## Configuration

| Variable | When | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_ANALYTICS_SRC` | build | Script URL of a self-hosted analytics tool (Umami, Plausible or compatible) |
| `NEXT_PUBLIC_ANALYTICS_SITE_ID` | build | Website ID passed as `data-website-id` / `data-domain` |
| `NEXT_DIST_DIR` | build/start | Alternative build directory (default `.next`) |

Analytics is off unless both variables are set; nothing third-party is loaded by default.

## Homelab endpoint

`GET /api/homelab` returns only coarse, aggregated numbers:

```json
{ "uptime": 5565, "cpu": 4, "memory": 59, "energy": { "todayKwh": 0.6, "monthKwh": 46.9 }, "sampledAt": 1795194770507 }
```

- CPU is the busy share of `/proc/stat` over 250 ms and RAM is `(MemTotal - MemAvailable) / MemTotal`, the same formulas as the [Vitals-Deck](https://imconte.com/en/projetos/vitals-deck) desk screen;
- Energy comes from the Vitals-Deck state file and is `null` when that file is missing or older than ten minutes;
- One sample is shared by all visitors for ten seconds; on failure the endpoint answers `503`;
- No hostname, byte counts or raw counters leave the server. The endpoint only works on Linux; elsewhere the card shows its offline state.

## Deployment

The site is self-hosted: `next start` runs as a systemd service behind a reverse proxy and Cloudflare.

Because `next build` rewrites the same `.next` directory that the running server reads, validate changes in a separate directory first:

```bash
NEXT_DIST_DIR=.next-preview npx next build
NEXT_DIST_DIR=.next-preview npx next start -H 127.0.0.1 -p 9002
```

Then build into `.next` and restart the service right away.

### Security

- `next start` and `next dev` bind to `127.0.0.1`; only the reverse proxy reaches the app;
- `next.config.ts` sends a Content Security Policy, HSTS, `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`, `Permissions-Policy` and COOP, and drops `X-Powered-By`;
- Pages are statically rendered, so the CSP cannot use nonces and keeps `'unsafe-inline'` for scripts; third-party origins are limited to GitHub raw content (images) and Cloudflare Web Analytics, which the edge injects;
- Keep `next` on a patched release (`npm audit`), and never pass request-controlled values into the `og.png` image handlers.

## License

No license file has been added yet, so all rights are reserved by default. The written content, photos, CV and project images are personal. Geist fonts are under the SIL Open Font License (`src/assets/og/GEIST-LICENSE.txt`).
