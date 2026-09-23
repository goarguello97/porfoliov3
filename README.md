# Gonzalo Argüello: personal brand site

**[English](#english) · [Español](#español)**

---

## English

Personal brand site (portfolio + services) for **Gonzalo Argüello**, full stack developer and advanced Software Engineering student.

> *La herramienta correcta, no la más compleja.* The right tool, not the most complex one.

The page opens with a scroll-driven journey: three chapters over a full-screen backdrop that responds to scrolling. The content sections follow: services, a portfolio case told through the decisions behind it, about me, and contact. The site's copy is in Spanish.

- **Live:** https://gonzaloarguello.higgsfield.app (it currently asks for a Higgsfield sign-in; see [Status](#status))
- **Planned domain:** `gonzaloarguello.dev`

### Tech stack

| | |
|---|---|
| Framework | React 19 + TanStack Start (server-rendered) |
| Build | Vite 8, TypeScript |
| Runtime | One Cloudflare Worker, deployed through Higgsfield |
| Package manager | Bun |
| Starting point | Higgsfield *scroll-scrub* website template (scroll-synced video engine) |
| Styling | Plain CSS brand layer (`app/src/site.css`) |
| Fonts | IBM Plex Sans + IBM Plex Mono (Google Fonts) |

### Project structure

```
.
├── CLAUDE.md                       Context and rules for Claude Code
├── .github/workflows/ci.yml        Template CI (see Status)
└── app/
    ├── AGENTS.md                   Template contract: what to edit, what not to touch
    ├── src/
    │   ├── routes/index.tsx        The page: header, journey, sections, footer
    │   ├── routes/__root.tsx       <head>: language, fonts, icons, metadata
    │   ├── scroll-scrub-scenes.ts  Journey chapters and theme colors
    │   ├── site.css                Brand styles (gs-* classes)
    │   ├── app-meta.json           Title, description, favicon, share image
    │   └── components/scroll-scrub Scroll engine (from the template, don't edit)
    ├── public/
    │   ├── favicon.ico
    │   └── assets/
    │       ├── brand/              Logo and icons
    │       └── world/              Journey backdrops (landscape + portrait)
    └── packages/                   Vendored template packages (required by the build)
```

### Getting started

Requirements: [Git](https://git-scm.com) and [Bun](https://bun.sh).

```bash
git clone https://github.com/goarguello97/porfoliov3.git
cd porfoliov3/app
bun install
bun run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

### Scripts

Run these from `app/`:

| Command | What it does |
|---|---|
| `bun run dev` | Starts the local dev server |
| `bun run typecheck` | Generates routes and checks TypeScript |
| `bun run build` | UI check, typecheck and production build. Must pass before deploying. |
| `bun run lint` | ESLint |
| `bun run test` | Template tests |

### Editing the content

- **Chapter text** (the scroll journey): `app/src/scroll-scrub-scenes.ts`
- **Everything else** (services, portfolio case, about, contact): `app/src/routes/index.tsx`
- **Colors, spacing, type:** `app/src/site.css`. Keep raw hex colors out of `src/routes/`, or the build's UI check fails.
- **Page title, description and share image:** `app/src/app-meta.json`

### Brand

| Role | Color |
|---|---|
| Celeste base | `#6FA8D4` |
| Naranja accent | `#E2672A` |
| White / background | `#FFFFFF` |
| Carbón / text | `#22303C` |
| Celeste oscuro (headers, footer, badges) | `#1C3D52` |

Orange is only an action accent (buttons, links, highlights), never the dominant color. The type is IBM Plex Sans for text and IBM Plex Mono for terminal-style details (`// section` labels, `>` prompts).

### Adding the video

The site is built to scrub a video as you scroll, but it ships without one for now: each chapter's `clip` is empty, and an SVG backdrop fills the stage. To add a video:

1. Put the encoded clip at `app/public/assets/world/scene-01.mp4`, plus an optional mobile version. Keep it under about 32 MB for desktop and 16 MB for mobile.
2. Set `clip` (and `mobileClip`) in `app/src/scroll-scrub-scenes.ts`.
3. Replace each `poster` with the exact first frame of the encoded clip.

### Deployment

The live site deploys from a Higgsfield-hosted copy of this repo. GitHub is the code backup, and pushing to GitHub alone doesn't update the live site.

1. `bun run build` passes.
2. Commit and push to GitHub.
3. Push the same commit to the Higgsfield repo and run `higgsfield website deploy`. This needs the Higgsfield CLI and `higgsfield auth login`.

`CLAUDE.md` has the exact commands, including how to push without saving the access token.

### Status

- **Live URL needs a sign-in.** The deployed site currently asks visitors to sign in to Higgsfield. The cause is still being checked.
- **No video yet.** The journey uses SVG backdrops until the video is added.
- **CI doesn't run on GitHub.** The template's workflow targets a build server that doesn't exist on this account, so runs stay queued. It's harmless and the file is left as shipped.

### Roadmap

- [ ] Register `gonzaloarguello.dev`
- [ ] Set up the real contact mailbox (the current address is a placeholder)
- [ ] Add more portfolio cases
- [ ] Add LinkedIn and GitHub links
- [ ] Add a contact form
- [ ] Add a separate CV / experience section
- [ ] Add the scroll video and a proper share image

### Credits

- Site content, copy and brand: © 2026 Gonzalo Argüello.
- Built on the Higgsfield scroll-scrub template. The vendored packages in `app/packages/` belong to their respective owners.
- IBM Plex fonts: open source, by IBM.

---

## Español

Sitio de marca personal (portfolio + servicios) de **Gonzalo Argüello**, desarrollador full stack y estudiante avanzado de Ingeniería en Software.

> *La herramienta correcta, no la más compleja.*

La página arranca con un recorrido guiado por el scroll: tres capítulos sobre un fondo a pantalla completa que responde al desplazamiento. Después vienen las secciones de contenido: servicios, un caso de portfolio contado a partir de las decisiones que se tomaron, sobre mí y contacto.

- **En vivo:** https://gonzaloarguello.higgsfield.app (por ahora pide iniciar sesión en Higgsfield; ver [Estado](#estado))
- **Dominio previsto:** `gonzaloarguello.dev`

### Tecnologías

| | |
|---|---|
| Framework | React 19 + TanStack Start (renderizado en servidor) |
| Build | Vite 8, TypeScript |
| Runtime | Un Cloudflare Worker, publicado a través de Higgsfield |
| Gestor de paquetes | Bun |
| Punto de partida | Plantilla de sitio *scroll-scrub* de Higgsfield (motor de video sincronizado con el scroll) |
| Estilos | Capa de marca en CSS plano (`app/src/site.css`) |
| Tipografías | IBM Plex Sans + IBM Plex Mono (Google Fonts) |

### Estructura del proyecto

```
.
├── CLAUDE.md                       Contexto y reglas para Claude Code
├── .github/workflows/ci.yml        CI de la plantilla (ver Estado)
└── app/
    ├── AGENTS.md                   Contrato de la plantilla: qué editar y qué no tocar
    ├── src/
    │   ├── routes/index.tsx        La página: header, recorrido, secciones, footer
    │   ├── routes/__root.tsx       <head>: idioma, fuentes, íconos, metadatos
    │   ├── scroll-scrub-scenes.ts  Capítulos del recorrido y colores del tema
    │   ├── site.css                Estilos de marca (clases gs-*)
    │   ├── app-meta.json           Título, descripción, favicon, imagen para compartir
    │   └── components/scroll-scrub Motor de scroll (de la plantilla, no editar)
    ├── public/
    │   ├── favicon.ico
    │   └── assets/
    │       ├── brand/              Logo e íconos
    │       └── world/              Fondos del recorrido (horizontal + vertical)
    └── packages/                   Paquetes de la plantilla incluidos (el build los necesita)
```

### Cómo empezar

Requisitos: [Git](https://git-scm.com) y [Bun](https://bun.sh).

```bash
git clone https://github.com/goarguello97/porfoliov3.git
cd porfoliov3/app
bun install
bun run dev
```

Después abrí la URL local que muestra Vite (normalmente http://localhost:5173).

### Scripts

Se corren desde `app/`:

| Comando | Qué hace |
|---|---|
| `bun run dev` | Levanta el servidor de desarrollo local |
| `bun run typecheck` | Genera las rutas y chequea TypeScript |
| `bun run build` | Chequeo de UI, typecheck y build de producción. Tiene que pasar antes de publicar. |
| `bun run lint` | ESLint |
| `bun run test` | Tests de la plantilla |

### Cómo editar el contenido

- **Texto de los capítulos** (el recorrido con scroll): `app/src/scroll-scrub-scenes.ts`
- **Todo lo demás** (servicios, caso de portfolio, sobre mí, contacto): `app/src/routes/index.tsx`
- **Colores, espaciado, tipografía:** `app/src/site.css`. No pongas colores hex directamente en `src/routes/`, porque falla el chequeo de UI del build.
- **Título, descripción e imagen para compartir:** `app/src/app-meta.json`

### Marca

| Rol | Color |
|---|---|
| Celeste base | `#6FA8D4` |
| Naranja acento | `#E2672A` |
| Blanco / fondo | `#FFFFFF` |
| Carbón / texto | `#22303C` |
| Celeste oscuro (headers, footer, badges) | `#1C3D52` |

El naranja es solo un acento de acción (botones, links, destacados), nunca el color dominante. La tipografía es IBM Plex Sans para el texto e IBM Plex Mono para los detalles tipo terminal (etiquetas `// sección`, prompts `>`).

### Cómo agregar el video

El sitio está pensado para que un video avance con el scroll, pero por ahora sale sin video: el `clip` de cada capítulo está vacío y un fondo SVG ocupa la pantalla. Para agregarlo:

1. Poné el clip codificado en `app/public/assets/world/scene-01.mp4`, y opcionalmente una versión para celular. Mantenelo por debajo de unos 32 MB en desktop y 16 MB en celular.
2. Completá `clip` (y `mobileClip`) en `app/src/scroll-scrub-scenes.ts`.
3. Reemplazá cada `poster` por el primer fotograma exacto del clip codificado.

### Publicación

El sitio en vivo se publica desde una copia de este repo alojada en Higgsfield. GitHub es el respaldo del código, y subir cambios solo a GitHub no actualiza el sitio.

1. `bun run build` pasa sin errores.
2. Commit y push a GitHub.
3. Push del mismo commit al repo de Higgsfield y `higgsfield website deploy`. Esto necesita el CLI de Higgsfield y `higgsfield auth login`.

`CLAUDE.md` tiene los comandos exactos, incluido cómo hacer push sin guardar el token de acceso.

### Estado

- **La URL en vivo pide iniciar sesión.** Hoy el sitio publicado les pide a los visitantes que inicien sesión en Higgsfield. Todavía se está revisando por qué.
- **Todavía no hay video.** El recorrido usa fondos SVG hasta que se agregue.
- **El CI no corre en GitHub.** El workflow de la plantilla apunta a un servidor de build que no existe en esta cuenta, así que las ejecuciones quedan en cola. No afecta en nada y el archivo se deja como vino.

### Próximos pasos

- [ ] Registrar `gonzaloarguello.dev`
- [ ] Crear la casilla de contacto real (la dirección actual es provisoria)
- [ ] Sumar más casos de portfolio
- [ ] Agregar los links a LinkedIn y GitHub
- [ ] Agregar un formulario de contacto
- [ ] Agregar una sección de CV / experiencia aparte
- [ ] Agregar el video del recorrido y una imagen para compartir adecuada

### Créditos

- Contenido, textos y marca del sitio: © 2026 Gonzalo Argüello.
- Hecho sobre la plantilla scroll-scrub de Higgsfield. Los paquetes incluidos en `app/packages/` pertenecen a sus respectivos dueños.
- Tipografías IBM Plex: open source, de IBM.
