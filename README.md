# Firewood (Shinano)

Firewood — also published under its Chinese name "积薪" — is a highly opinionated personal blog that highlights long‑form essays, photo essays, reading notes, and short "thought" snippets. Content is modeled and published from [shinano-cms](https://github.com/darmau-co/shinano-cms), a SvelteKit admin that writes to Supabase. This repository is the public site, served from Cloudflare Workers with an Astro 5 + selective React-island front end, with a heavy emphasis on multilingual publishing (Chinese, English, and Japanese).

The project is intentionally bespoke: it mirrors my own writing workflow, integrates tightly with my media storage, and is not meant to be a generic starter.

## Highlights

- **Multilingual everywhere** – Every route under `src/pages/[lang]/...` reads locale strings from `src/locales`, generates `hreflang` tags via `src/lib/seo/i18nLinks.ts`, and exposes zh/en/jp versions of pages, feeds, and sitemaps. Locale negotiation lives in `src/middleware/index.ts`.
- **Multiple content streams** – Long-form articles, photography albums (with EXIF + Mapbox maps), micro "thoughts", RSS exports, and a public reading log live side by side while sharing Supabase as the data source.
- **Rich reader experience** – Article pages ship a live reading progress bar, table of contents, next/previous navigation, and paginated comments guarded by Cloudflare Turnstile. Photo albums render lightbox galleries, shooting metadata, and location pins.
- **Membership & messaging** – Visitors authenticate via passwordless email magic links or GitHub OAuth, leave comments as guests or authenticated users, and send private messages through the contact form once logged in.
- **Edge-first architecture** – Astro renders on Cloudflare Workers via `@astrojs/cloudflare`. Static-eligible pages are pre-rendered and served as plain HTML through Workers Static Assets; dynamic pages and API routes hit the Worker. Supabase SSR clients are created per request, and media is served from object storage via `IMG_PREFIX`.
- **Islands, not SPAs** – Only the genuinely interactive components hydrate (Navbar, Reaction, CommentEditor, Mapbox, lightbox gallery, etc.) using `client:load` / `client:idle` / `client:visible`. Everything else is plain server-rendered HTML.
- **Syndication & SEO** – Per-language RSS feeds for articles, photo albums, and thoughts (`src/pages/[lang]/{article,album,thought}/rss.xml.ts`), sitemap indexes (`src/pages/sitemap-index.xml.ts`, `src/pages/[lang]/sitemap.xml.ts`), and structured meta tags keep the content crawlable.

## Content & Pages

- **Articles** (`src/pages/[lang]/article/[slug].astro`): long-form writing with featured images, topics, reading progress, table of contents (`Catalog.astro`), Supabase RPC-backed view counters, comment threads, and adjacent post navigation.
- **Thoughts** (`src/pages/[lang]/thoughts.astro`, `src/pages/[lang]/thought/[slug].astro`): lightweight micro posts with infinite "load more" pagination and optional inline imagery.
- **Photography albums** (`src/pages/[lang]/album/[slug].astro`, `src/pages/[lang]/albums/...`): gallery/lightbox experience powered by Yet Another React Lightbox, EXIF overlays, Mapbox maps, and location badges. Comments, page views, and tagging mirror the article experience.
- **Bookshelf** (`src/pages/[lang]/book/index.astro`): a reading journal listing ratings, capsule reviews, and outbound links, pulled from Supabase and paginated via island fetches.
- **Meta pages** (`src/pages/[lang]/{about,site,contact,terms-of-use}.astro`): showcase biography content, explain the tech stack, and provide a logged-in contact form that stores submissions in Supabase.
- **Authentication flows** (`src/pages/[lang]/login.astro`, `src/pages/auth/*.ts`, `src/pages/api/auth/*.ts`): passwordless email magic links and GitHub OAuth built on Supabase Auth.

## Architecture

1. **shinano-cms**: A dedicated CMS (SvelteKit + Supabase) is used to create content, trigger AI helpers (for translations, summaries, alt text, and slugs), and manage media uploads. The CMS and blog are fully decoupled.
2. **Supabase**: Acts as the primary database, storage metadata layer, and auth provider. Per-request server clients (`src/lib/supabase/server.ts`) query typed relations and invoke RPC helpers such as `article_page_view`. Session injection happens once in `src/middleware/index.ts` and is exposed via `Astro.locals.supabase` / `Astro.locals.session`.
3. **Cloudflare stack**: Astro builds to a Worker entry (`dist/_worker.js/index.js`) plus pre-rendered static assets served by Workers Static Assets — both declared in `wrangler.jsonc`. The `AI` binding (Workers AI) powers translate / search endpoints.
4. **Media & maps**: Images are stored in object storage and served through Cloudflare Image Resizing using `IMG_PREFIX`, while Mapbox tokens unlock per-photo maps and EXIF visualizations.
5. **Comments & anti-abuse**: `CommentEditor` (React island) enforces Turnstile challenges for anonymous visitors and supports threaded replies/pagination. Authenticated submissions inherit Supabase session context.

## Tech Stack

- Astro 5 (SSR + selective prerender) + React 19 islands + TypeScript
- Cloudflare Workers + Workers Static Assets + Workers AI, deployed with Wrangler 4
- Tailwind CSS v4 (via `@tailwindcss/vite`) with Heroicons
- Supabase (Postgres, Auth, RPC) accessed through `@supabase/ssr`
- Mapbox GL for location-aware photography
- Cloudflare Turnstile for form protection
- `marked` + `highlight.js` for comment / article rendering
- shinano-cms (authoring), Tiptap editor, OpenAI-powered utilities (as described on `/site`)

## Running the Site Locally

```sh
pnpm install
pnpm dev          # astro dev — http://localhost:4321
pnpm build        # astro build → dist/ (Worker entry + static assets)
pnpm preview      # wrangler dev — runs the built Worker locally
pnpm check        # astro check (typecheck + .astro diagnostics)
pnpm deploy       # astro build && wrangler deploy
pnpm typegen      # regenerate worker-configuration.d.ts from wrangler.jsonc
```

Required environment variables live in your Cloudflare Worker (and `.dev.vars` when running locally). All are read at request time via `Astro.locals.runtime.env` — none are baked in at build time, so build can run without secrets.

| Variable | Purpose | Exposure |
| --- | --- | --- |
| `SUPABASE_URL`, `SUPABASE_ANON_KEY` | Server + client Supabase calls | Reaches the browser (passed to `AuthProvider` island) |
| `IMG_PREFIX` | Base URL for object storage / Cloudflare Image delivery | Server-rendered into HTML |
| `BASE_URL` | Canonical site origin used in meta tags, RSS, and sitemaps | Server only |
| `TURNSTILE_SITE_KEY` | Cloudflare Turnstile widget on comment forms | Reaches the browser |
| `TURNSTILE_SECRET_KEY` | Server-side Turnstile validation in `api/comments` | **Secret** — server only |
| `MAPBOX_TOKEN` | Mapbox GL token for album maps & EXIF visualizations | Reaches the browser |
| `UNSUBSCRIBE_KEY` | HMAC secret for unsubscribe links | **Secret** — server only |

`AI` and `ASSETS` are Cloudflare bindings declared in `wrangler.jsonc`, not env vars.

Because Firewood is tightly coupled to my Supabase schema and CMS workflows, adapting it requires mirroring that data model. The `/site` route (and `src/locales/site.tsx`) documents the reasoning, architecture choices, and trade-offs if you're curious about the broader system.

---

If you're mostly after the CMS experience, visit **shinano-cms**; if you're here to read, [firewood (积薪)](https://darmau.co) is the canonical deployment powered by this codebase.
