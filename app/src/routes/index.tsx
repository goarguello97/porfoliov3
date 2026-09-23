import { createFileRoute } from "@tanstack/react-router";

import { ScrollScrub } from "@/components/scroll-scrub/scroll-scrub";
import type { ScrollScrubScene } from "@/components/scroll-scrub/scroll-scrub";
import { scrollScrubScenes, scrollScrubTheme } from "@/scroll-scrub-scenes";

import "../site.css";

export const Route = createFileRoute("/")({
  // No title/description here on purpose: the home page inherits the site's
  // editable page metadata from the root route (title/favicon/og).
  component: Index,
});

const EMAIL = "hola@gonzaloarguello.dev";

// Module constant: the hero chapter gets its CTAs without changing the array's
// identity between renders.
const scenes: ScrollScrubScene[] = scrollScrubScenes.map((scene, index) =>
  index === 0
    ? {
        ...scene,
        actions: (
          <>
            <a className="gs-btn" href="#contacto">
              Hablemos de tu proyecto
            </a>
            <a className="gs-btn gs-btn--line" href="#proyectos">
              Ver un caso real
            </a>
          </>
        ),
      }
    : scene
);

const services = [
  {
    name: "Desarrollo a medida",
    body: "Construyo tu producto o funcionalidad desde cero, o sobre lo que ya tenés, con foco en que llegue a producción sin fricción.",
  },
  {
    name: "Consultoría técnica",
    body: "Reviso arquitectura, destrabo decisiones técnicas y soy un segundo par de ojos para tu equipo o tu agencia. A veces la respuesta es no escribir código.",
  },
  {
    name: "Productos propios",
    body: "Herramientas que construyo porque primero las necesito yo. Es la mejor forma de probar una idea antes de ofrecerla.",
  },
];

const decisions = [
  {
    question: "¿Cómo rediseñar las secciones clave del sitio?",
    why: "El editor visual limitaba el diseño y la funcionalidad. Sumé HTML propio dentro de Wix, sin migrar todo el sitio.",
    dropped: "Solo el editor visual de Wix",
    picked: "Wix con HTML propio",
  },
  {
    question: "¿Qué procesos internos necesitan software a medida?",
    why: "Analicé cada proceso por separado. Donde Google Forms y Sheets resolvían la necesidad de forma más eficiente, implementé esa alternativa.",
    dropped: "Software a medida para todo",
    picked: "Forms + Sheets donde alcanza",
  },
];

function Logo() {
  return (
    <a className="gs-logo" href="#inicio" aria-label="Gonzalo Argüello, inicio">
      <img
        src="/assets/brand/logo-gonzalo-arguello-light.svg"
        alt=""
        width={896}
        height={162}
      />
    </a>
  );
}

function Index() {
  return (
    <div className="gs-site">
      <a className="gs-skip" href="#servicios">
        Saltar al contenido
      </a>
      <header className="gs-header">
        <div className="gs-wrap gs-header__inner">
          <Logo />
          <nav className="gs-nav" aria-label="Principal">
            <a href="#servicios">Servicios</a>
            <a href="#proyectos">Proyectos</a>
            <a href="#sobre-mi">Sobre mí</a>
            <a className="gs-btn gs-btn--sm" href="#contacto">
              Contactarme
            </a>
          </nav>
        </div>
      </header>

      <main>
        <ScrollScrub scenes={scenes} theme={scrollScrubTheme} />

        <section id="servicios" className="gs-section" aria-labelledby="servicios-title">
          <div className="gs-wrap">
            <p className="gs-label">// servicios</p>
            <h2 id="servicios-title" className="gs-h2">
              Qué incluye cada forma de trabajo
            </h2>
            <div className="gs-rows">
              {services.map((service) => (
                <div className="gs-row" key={service.name}>
                  <h3>{service.name}</h3>
                  <p>{service.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="proyectos" className="gs-section gs-section--alt" aria-labelledby="proyectos-title">
          <div className="gs-wrap">
            <p className="gs-label">// proyectos</p>
            <h2 id="proyectos-title" className="gs-h2">
              Un caso, contado por sus decisiones
            </h2>
            <div className="gs-case-head">
              <h3>Rediseño web y automatización de procesos</h3>
              <span>cliente del sector sustentabilidad</span>
            </div>
            <p className="gs-intro">
              Un sitio en Wix que necesitaba más de lo que permitía el editor, y procesos
              internos que había que ordenar. En cada punto, la pregunta fue la misma: qué es
              lo mínimo que resuelve bien el problema.
            </p>
            <div className="gs-decisions">
              {decisions.map((d) => (
                <article className="gs-decision" key={d.question}>
                  <div>
                    <p className="gs-decision__q">{d.question}</p>
                    <p className="gs-decision__why">{d.why}</p>
                  </div>
                  <div className="gs-options">
                    <div className="gs-opt">
                      {d.dropped}
                      <small>descartada</small>
                    </div>
                    <div className="gs-opt gs-opt--pick">
                      {d.picked}
                      <small>✓ elegida</small>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <p className="gs-thesis">
              Elegir la herramienta correcta para cada problema ahorra tiempo y presupuesto sin
              sacrificar el resultado.
            </p>
            <p className="gs-soon">Estoy sumando más proyectos propios a esta sección. Volvé pronto.</p>
          </div>
        </section>

        <section id="sobre-mi" className="gs-section" aria-labelledby="sobre-title">
          <div className="gs-wrap gs-about">
            <div>
              <p className="gs-label">// sobre mí</p>
              <h2 id="sobre-title" className="gs-h2">
                Hola, soy Gonzalo
              </h2>
            </div>
            <div className="gs-about__body">
              <p className="gs-about__lead">
                Soy desarrollador full stack y estudiante avanzado de Ingeniería en Software.
              </p>
              <p>
                Hoy trabajo como desarrollador y diseñador web en una empresa del sector
                sustentabilidad. Rediseño secciones de su sitio y, para cada necesidad del
                negocio, evalúo si conviene una solución a medida o una alternativa más ágil
                como Google Forms y Sheets.
              </p>
              <p>
                Mi enfoque es encontrar la solución técnica adecuada para cada problema y
                ejecutarla con criterio, ya sea en un proyecto freelance, en una consultoría o en
                mis propias herramientas.
              </p>
            </div>
          </div>
        </section>

        <section id="contacto" className="gs-section gs-contact" aria-labelledby="contacto-title">
          <div className="gs-wrap">
            <p className="gs-label">// contacto</p>
            <h2 id="contacto-title" className="gs-h2">
              Hablemos
            </h2>
            <p className="gs-intro">
              ¿Tenés un proyecto en mente, necesitás una segunda opinión técnica o querés saber
              más sobre mis herramientas? Escribime.
            </p>
            <a className="gs-mail" href={`mailto:${EMAIL}`}>
              <span aria-hidden="true">$ </span>
              {EMAIL}
            </a>
          </div>
        </section>
      </main>

      <footer className="gs-footer">
        <div className="gs-wrap gs-footer__inner">
          <Logo />
          <span>© 2026 Gonzalo Argüello</span>
        </div>
      </footer>
    </div>
  );
}
