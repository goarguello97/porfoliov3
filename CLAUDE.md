# Gonzalo Argüello: personal brand site

Personal brand site (portfolio + selling services) for Gonzalo Argüello, full stack developer and advanced Software Engineering student. The copy is in Spanish (Rioplatense, uses *vos*). Talk to the owner in the language they write in.

Built on the Higgsfield **scroll-scrub website template**: React 19 + TanStack Start, server-rendered, deployed as one Cloudflare Worker. The project lives in `app/`. Run every `bun` command from there.

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

- **No `$` in the hero.** It reads as money. The hero uses a terminal prompt instead: chapter kickers are `> whoami`, `> evaluar proceso-interno`, `> ls servicios/`, and the backdrops draw a large `>_`. The `$` still appears in the header/footer logo, the contact email prefix, the "sumando proyectos" line and the icon files. The owner hasn't decided on those yet, so ask before changing them.
- **No AI-generated media.** Don't generate images, video or covers. The owner will supply their own later. Until then:
  - Every scene's `clip` is `""`, so the engine never fetches a video and the SVG poster holds the stage. `site.css` zooms it slightly as you scroll.
  - `og_image_url` and `marketplace_cover_url` point to `/assets/brand/icon-dark-512.png`.
- **Animated template chosen** (scroll-scrub). The video goes in later; see "When the owner's video arrives".
- **Not listed** on the Higgsfield community feed. Deploy only; publish only if the owner asks.
- **Copy rules:**
  - Don't invent results, numbers, clients or testimonials.
  - The portfolio case comes from the owner's **current employer**. Keep it anonymous ("cliente del sector sustentabilidad", "una empresa del sector sustentabilidad"). The owner still has to confirm with the employer that it can be shown.
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

There are two destinations:

- **GitHub:** `https://github.com/goarguello97/porfoliov3.git`, the owner's code backup. `main` tracks it.
- **Higgsfield:** the repo the live site deploys from. It takes a short-lived scoped token, so there's no stored credential.

On the original laptop, the Higgsfield remote is `origin` and GitHub is `github`. On a fresh clone from GitHub, `origin` is GitHub. Push to Higgsfield by URL, as below.

The website ID is `9fe7bc01-2486-4597-97a7-dca8c9484b48` (subdomain `gonzaloarguello`, category `other`). `higgsfield website list` shows it too. The CLI needs `higgsfield auth login` first; the owner runs that, never Claude.

Deploy flow: build passes → commit → push to GitHub → push to Higgsfield → deploy.

```bash
git push github main    # or `git push` on a fresh clone
```

Push to Higgsfield without saving the token anywhere (bash):

```bash
URL=$(higgsfield website repo-access 9fe7bc01-2486-4597-97a7-dca8c9484b48 --json | bun -e 'const j=JSON.parse(await Bun.stdin.text());const u=new URL(j.repo_url);u.username=j.username;u.password=j.token;console.log(u.href)')
git -c credential.helper= push "$URL" HEAD:main
```

PowerShell equivalent:

```powershell
$r = higgsfield website repo-access 9fe7bc01-2486-4597-97a7-dca8c9484b48 --json | ConvertFrom-Json
$u = [uri]$r.repo_url
git -c credential.helper= push "https://$($r.username):$($r.token)@$($u.Host)$($u.PathAndQuery)" "HEAD:$($r.branch)"
```

Then deploy and check:

```bash
higgsfield website deploy 9fe7bc01-2486-4597-97a7-dca8c9484b48
higgsfield website status 9fe7bc01-2486-4597-97a7-dca8c9484b48
```

- Never print, commit or save the token to git config. Mask it in any output.
- The deploy request sometimes fails with "request failed (no response received)". Retry. `--json` has worked on retry.
- The live URL `https://gonzaloarguello.higgsfield.app` currently returns **401** (it redirects to Higgsfield sign-in) for anyone not signed in, even though status says `deployed`. The cause isn't known yet (free plan? not on the feed?). Don't assume the site is public.
- `.github/workflows/ci.yml` is the template's CI. It targets the self-hosted runner `arc-runners-frontend`, which doesn't exist on the owner's GitHub, so runs there will queue and never start. Leave the file alone (template lockstep); ignore those runs or disable Actions on GitHub.
- `app/packages/` holds Higgsfield's vendored packages. They're required by the build; don't delete them. If the GitHub repo is public, they're visible there.

## When the owner's video arrives

1. Put the encoded clip at `app/public/assets/world/scene-01.mp4`, plus an optional `scene-01-mobile.mp4`. Size budget: ≤32 MiB desktop, ≤16 MiB mobile.
2. Set `clip` (and `mobileClip`) in `scroll-scrub-scenes.ts`. For one continuous video, collapse to one scene, or give each chapter its own seam-locked clip.
3. Replace `poster` / `mobilePoster` with the **exact first frame of the encoded clip** (a template hard rule). Delete the SVG backdrops only once they're no longer referenced.
4. If the owner supplies a new cover, update `og_image_url` and `marketplace_cover_url` in `app-meta.json`. Ideally that's a 1200×630 share image.

## Owner's to-do list (from the brand brief)

- [ ] Register `gonzaloarguello.dev` (optionally `.io` as a defensive redirect).
- [ ] Create the real mailbox. `hola@gonzaloarguello.dev` in `index.tsx` (`EMAIL`) is a placeholder, and contact is a plain `mailto:`.
- [ ] Add more portfolio cases. There's only one now, plus a "sumando proyectos" note. 1–2 well-documented personal projects were suggested as a bridge.
- [ ] Add real LinkedIn / GitHub links. None are on the site yet because no URLs were confirmed.
- [ ] Confirm with the employer that the current case can be used.
- [ ] Consider a real contact form (needs a backend or a service like Formspree).
- [ ] Add a separate CV / work-experience section, where employers can be named.
- [ ] Supply the video and cover (see above). Decide whether the `$` goes from the logo and icons too.
- [ ] Figure out why the live URL returns 401 before sharing it.
