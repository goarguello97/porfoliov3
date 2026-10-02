# Gonzalo Argüello: personal brand site

Personal brand site (portfolio + selling services) for Gonzalo Argüello, full stack developer and advanced Software Engineering student. The copy is in Spanish (Rioplatense, uses *vos*). Talk to the owner in the language they write in.

Built on the Higgsfield **scroll-scrub website template**: React 19 + TanStack Start, server-rendered. The template targets a Cloudflare Worker, but the site is deployed on **Vercel** from GitHub `main`. The project lives in `app/`. Run every `bun` command from there.

The in-repo template contract is below. Follow it: don't rewrite the scroll engine, delete nothing from the scaffold, never import `@higgsfield/quanta/*`.

@app/AGENTS.md

## Where things live

| Path | What it is |
|---|---|
| `app/src/routes/index.tsx` | The page: header, scroll journey, then the servicios / proyectos / sobre-mí / contacto sections and footer. All copy is here, except the chapter copy. |
| `app/src/scroll-scrub-scenes.ts` | Journey theme tokens + the 3 chapters (`inicio`, `criterio`, `enfoque`). Holds the chapter copy. |
| `app/src/site.css` | The site's own brand layer (`gs-*` classes, brand tokens, overrides of `.scroll-scrub__*`). Imported from `routes/index.tsx`. |
| `app/src/app-meta.json` | Title, description, favicon, share image, feed cover. |
| `app/src/routes/__root.tsx` | `<head>`: `lang="es"`, author, IBM Plex from Google Fonts, apple-touch-icon. Edited from the template. |
| `app/public/assets/brand/` | The owner's logo and icons (copied from their original static site). `logo-gonzalo-arguello-light.svg` is a white recolor made for dark backgrounds. |
| `app/public/assets/projects/` | Project screenshots: `willy-pesca.jpg`, `entre-migas.jpg`. Each is a 1200×795 JPEG showing the live site's desktop view (1440×900) in a browser frame next to its phone view (390×844 at 2×), on the section's `#EEF5FA` background. They were made with headless Chrome driven through the DevTools protocol (real device emulation; plain `--window-size` can't go below ~500px wide) and composited with System.Drawing. To redo one, keep the same size and framing. |
| `app/public/assets/world/` | Journey backdrops: `scene-01-poster.svg` (landscape) and `scene-01-mobile-poster.svg` (portrait). |
| `app/public/favicon.ico` | Multi-size favicon. |

## Brand (fixed, from the owner's brand brief)

- **Colors:** celeste `#6FA8D4`, naranja `#E2672A`, blanco `#FFFFFF`, carbón `#22303C`, celeste oscuro `#1C3D52`. The journey background uses `#10222E`.
  - Orange is only an **action accent** (CTAs, links, highlights), never the dominant color. Celeste + white are the base.
  - For orange text on white, use `--gs-link: #B8511C` (passes AA contrast).
- **Type:** IBM Plex Sans 400/500/600 for headings and body. IBM Plex Mono 400/500 for terminal-style accents (`// sección` labels, prompts, tags).
- **Logo:** the wordmark `$gonzalo argüello_` in terminal-prompt style (`$` and `_` in orange).
- **Layout:** dark scroll journey (header + 3 chapters), then white / light-celeste content sections, then a dark contact section and footer.

## Decisions the owner made (don't undo without asking)

- **No `$` in the hero.** It reads as money. The hero uses a terminal prompt instead: chapter kickers are `> whoami`, `> evaluar proceso-interno`, `> ls servicios/`, and the backdrops draw a large `>_`. The `$` still appears in the header/footer logo, the contact email prefix, the "Más proyectos en mi GitHub" line and the icon files. The owner hasn't decided on those yet, so ask before changing them.
- **No AI-generated media.** Don't generate images, video or covers. The owner will supply their own later. Until then:
  - Every scene's `clip` is `""`, so the engine never fetches a video and the SVG poster holds the stage. `site.css` zooms it slightly as you scroll.
  - `og_image_url` and `marketplace_cover_url` point to `/assets/brand/icon-dark-512.png`.
- **Animated template chosen** (scroll-scrub). The video goes in later; see "When the owner's video arrives".
- **Higgsfield is retired for this project** (the owner decided on 2026-10-02). Never push to the Higgsfield repo and never run `higgsfield website deploy` / `publish`. Push to GitHub only; Vercel deploys from it. See "Git remotes and deploying".
- **Contact email is `arguellogonzalo97@gmail.com`** (`EMAIL` in `index.tsx`), at the owner's request. It replaced the `hola@gonzaloarguello.dev` placeholder.
- **Copy rules:**
  - Don't invent results, numbers, clients or testimonials.
  - Projects live in the `projects` array in `index.tsx`. Willy Pesca and Entre Migas are named publicly with live and code links, and their facts come from their GitHub READMEs. A `dropped` option only appears where the alternative was really weighed; otherwise use `pickedNote`. A project's optional `image` renders beside the summary on desktop and under the title on phones, and it links to the live site.
  - The sustentabilidad case comes from the owner's **current employer**. Keep it anonymous ("cliente del sector sustentabilidad", "una empresa del sector sustentabilidad"). The owner still has to confirm with the employer that it can be shown. It has **no image** on purpose, because a screenshot would identify the employer.
  - The site's central idea: "La herramienta correcta, no la más compleja."
- **No Higgsfield branding** in page content or meta. `author` is the owner and `twitter:site @Higgsfield` was removed.

## Code conventions

- Raw hex colors never go in `src/routes/**`. `check:ui` fails the build if they do. Colors live in `src/site.css` (`--gs-*` tokens) and `src/scroll-scrub-scenes.ts`.
- Style with plain CSS classes prefixed `gs-` in `src/site.css`, not Tailwind/Quanta utilities.
- Adjust the scroll engine only through `.gs-site .scroll-scrub__*` overrides in `site.css`. Never edit `src/components/scroll-scrub/*`.
- Keep `scrollScrubScenes` and the derived `scenes` in `index.tsx` as module constants. Changing their identity on every render rebuilds the scroll controller.
- Respect `prefers-reduced-motion`. Keep the layout working at 375px wide with no horizontal scroll.

## Commands (from `app/`)

```bash
bun install
bun run dev          # local dev server (Vite)
bun run typecheck
bun run build        # check:ui + typecheck + production build; must pass before deploying
```

On Windows, the desktop app's preview config in the parent folder calls `node_modules/.bin/vite.exe dev <path-to-app> --port 5173` directly, because `bun --cwd` breaks on paths with spaces.

## Git remotes and deploying

The only destination is **GitHub**: `https://github.com/goarguello97/porfoliov3.git`. **Vercel** deploys from it on every push to `main` (see "Vercel" below).

Deploy flow: `bun run build` passes → commit → `git push`. That's all.

- On the original laptop, GitHub is the remote `github` and `main` tracks it, so a plain `git push` goes there. On a fresh clone, GitHub is `origin`.
- **Higgsfield (retired):** on the original laptop, `origin` still points at the old Higgsfield repo (website `9fe7bc01-2486-4597-97a7-dca8c9484b48`, `gonzaloarguello.higgsfield.app`, which always answered 401 to visitors who weren't signed in). The owner decided on 2026-10-02 to stop using it. **Never push to `origin` there, and never run any `higgsfield website …` command for this site.** That copy stays frozen at the 2026-10-02 merge.
- `.github/workflows/ci.yml` is the template's CI. It targets the self-hosted runner `arc-runners-frontend`, which doesn't exist on the owner's GitHub, so runs there will queue and never start. Leave the file alone (template lockstep); ignore those runs or disable Actions on GitHub.
- `app/packages/` holds Higgsfield's vendored packages. They're required by the build; don't delete them. If the GitHub repo is public, they're visible there.

## Vercel (the deploy target)

Added from the owner's other laptop to get a **publicly reachable** URL, because `gonzaloarguello.higgsfield.app` answered 401 to anyone not signed in. It's now the only deploy target. The template's default Cloudflare build is still kept intact for the template lockstep; it just isn't deployed anywhere.

- **Root Directory must be `app`** in the Vercel project settings — the app isn't at the repo root. Framework preset: TanStack Start (pinned in `app/vercel.json`, so monorepo detection can't fall back to plain Vite).
- Vercel runs `bun run build` (it picks up `bun.lock`), so `check:ui` and `tsc --noEmit` gate the deploy exactly like everywhere else.
- Vercel sets `VERCEL=1` during the build. `app/vite.config.ts` gates **everything** Vercel-specific on that flag:
  - `nitro()` from `nitro/vite` is added to the plugins only then. Nitro reads `VERCEL=1` itself, picks its `vercel` preset and emits `.vercel/output` (static + a `nodejs24.x` function with response streaming).
  - The workerd SSR settings are skipped then — `ssr.target: "webworker"`, the edge resolve conditions, and `noExternal`. Vercel Functions run on Node, so `node:` builtins are real instead of `nodejs_compat` shims.
  - With the flag unset, nitro never loads and the build emits `dist/server/server.js` for Cloudflare exactly as before. Verify both after touching the vite config:

```bash
cd app && bun run build                      # Cloudflare: dist/server/server.js
cd app && VERCEL=1 bun run build             # Vercel: .vercel/output
```

- `src/server.ts` keeps its Worker shape (`export default { fetch(request, env, ctx) }`). Nitro consumes it fine — it's a web-standard fetch handler — so `applySecurityHeaders` still runs on both targets. Don't "de-Cloudflare" it.
- `app.manifest.json` declares no D1/R2/KV/Durable Object, so there are no Cloudflare bindings to replace. If the site ever needs storage or a database, use something Vercel can reach (Higgsfield infra is off the table).
- Don't follow Vercel's "migrate off Cloudflare" guide: it deletes `wrangler.jsonc` and the Cloudflare deps, which breaks the default build and the template lockstep `app/AGENTS.md` requires.

## When the owner's video arrives

1. Put the encoded clip at `app/public/assets/world/scene-01.mp4`, plus an optional `scene-01-mobile.mp4`. Size budget: ≤32 MiB desktop, ≤16 MiB mobile.
2. Set `clip` (and `mobileClip`) in `scroll-scrub-scenes.ts`. For one continuous video, collapse to one scene, or give each chapter its own seam-locked clip.
3. Replace `poster` / `mobilePoster` with the **exact first frame of the encoded clip** (a template hard rule). Delete the SVG backdrops only once they're no longer referenced.
4. If the owner supplies a new cover, update `og_image_url` and `marketplace_cover_url` in `app-meta.json`. Ideally that's a 1200×630 share image.

## Owner's to-do list (from the brand brief)

- [ ] Register `gonzaloarguello.dev` (optionally `.io` as a defensive redirect).
- [x] Real contact email: `arguellogonzalo97@gmail.com`, a plain `mailto:`. If `gonzaloarguello.dev` gets registered, the owner may want a mailbox on it.
- [x] Add more portfolio cases. Willy Pesca y Camping and Entre Migas were added in Oct 2026, three cases in total.
- [ ] Add a real LinkedIn link. GitHub (`github.com/goarguello97`) is already linked below the projects; LinkedIn has no confirmed URL yet.
- [ ] Confirm with the employer that the current case can be used.
- [ ] Consider a real contact form (needs a backend or a service like Formspree).
- [ ] Add a separate CV / work-experience section, where employers can be named.
- [ ] Supply the video and cover (see above). Decide whether the `$` goes from the logo and icons too.
- [ ] Add the Vercel production URL to the README and this file once the owner shares it.
