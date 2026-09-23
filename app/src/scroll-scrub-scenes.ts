/**
 * Scene data for the scroll-scrub journey.
 *
 * FILM PENDING: the owner will supply their own film. Until then every scene's
 * `clip` is empty, so the engine never fetches and the poster (a vector
 * backdrop built from the brand's own `$` glyph) holds the stage, zoomed
 * gently by scroll progress (see `.gs-site .scroll-scrub__poster` in
 * styles.css).
 *
 * When the film arrives:
 *   1. Put the encoded clip at public/assets/world/scene-01.mp4 (and an
 *      optional scene-01-mobile.mp4).
 *   2. Replace `poster` with the EXACT first frame of that encoded clip
 *      (and add `mobilePoster` if `mobileClip` is set).
 *   3. Single-shot film: collapse to one scene carrying the clip, or give each
 *      scene its own seam-locked leg.
 *
 * Keep this array a module constant. Changing its identity on every render
 * intentionally rebuilds the media controller.
 */
import type {
  ScrollScrubScene,
  ScrollScrubTheme,
} from "@/components/scroll-scrub/scroll-scrub";

/** Brand tokens for the journey layer (README: celeste oscuro base, naranja accent). */
export const scrollScrubTheme: ScrollScrubTheme = {
  accent: "#E2672A",
  background: "#10222E",
  ink: "#FFFFFF",
  muted: "#A9C3D6",
};

const backdrop = "/assets/world/scene-01-poster.svg";

export const scrollScrubScenes: ScrollScrubScene[] = [
  {
    id: "inicio",
    label: "Inicio",
    kicker: "$ whoami",
    title: "La herramienta correcta, no la más compleja.",
    body: "Soy Gonzalo Argüello, desarrollador full stack. Ayudo a startups, empresas y equipos técnicos a llevar ideas web a producción.",
    clip: "",
    poster: backdrop,
    mobileObjectPosition: "80% 50%",
    scroll: 1.4,
  },
  {
    id: "criterio",
    label: "Criterio",
    kicker: "$ evaluar proceso-interno",
    title: "Primero el problema. Después la herramienta.",
    body: "A veces hace falta software a medida. A veces alcanza con Google Forms y Sheets. Lo decide el análisis, no la costumbre.",
    tags: ["javascript", "html/css", "wix + código propio", "google apps script"],
    clip: "",
    poster: backdrop,
    mobileObjectPosition: "80% 50%",
    align: "right",
    scroll: 1.3,
  },
  {
    id: "enfoque",
    label: "Servicios",
    kicker: "$ ls servicios/",
    title: "Tres formas de trabajar conmigo.",
    body: "Construyo a medida, asesoro en decisiones técnicas o te ofrezco herramientas propias listas para usar.",
    tags: ["desarrollo a medida", "consultoría técnica", "productos propios"],
    clip: "",
    poster: backdrop,
    mobileObjectPosition: "80% 50%",
    scroll: 1.2,
  },
];
