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

const EMAIL = "arguellogonzalo97@gmail.com";

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
              Ver proyectos
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

type Decision = {
  question: string;
  why: string;
  picked: string;
  /** Shown under the pick when there is no discarded alternative. */
  pickedNote?: string;
  /** Only when the alternative was actually weighed; never invent one. */
  dropped?: string;
};

type Project = {
  id: string;
  title: string;
  client: string;
  summary: string;
  stack: string[];
  site?: string;
  repo?: string;
  /** Screenshot of the live site (desktop + phone), 1200×795. */
  image?: { src: string; alt: string };
  decisions: Decision[];
};

// Facts come from each project's README. The sustentabilidad case is the
// owner's current employer: keep it anonymous and without links.
const projects: Project[] = [
  {
    id: "willy-pesca",
    title: "Willy Pesca y Camping",
    client: "casa de pesca en Los Cóndores, Calamuchita",
    summary:
      "Sitio para una casa de pesca: vidriera de reeles y cañas con fichas técnicas, comparador de precios por categoría y pedidos de reparación de cañas que se arman como mensaje de WhatsApp. El negocio carga y actualiza sus productos desde un panel propio.",
    stack: ["react 19", "tanstack start", "supabase", "tailwind css", "vercel"],
    site: "https://willypesca.vercel.app",
    repo: "https://github.com/goarguello97/willy-pesca-v2",
    image: {
      src: "/assets/projects/willy-pesca.jpg",
      alt: "Sitio de Willy Pesca y Camping en una computadora y en un celular",
    },
    decisions: [
      {
        question: "¿Cómo actualiza el negocio su catálogo?",
        why: "Con un panel de administración: login con Google solo para cuentas autorizadas, hasta 8 fotos por producto y campos técnicos según la categoría. Las imágenes se comprimen en el navegador antes de subirse.",
        picked: "Panel propio sobre Supabase",
        pickedNote: "postgresql + rls + google oauth",
      },
      {
        question: "¿Cómo lo encuentran en buscadores y redes?",
        why: "Las páginas se renderizan en el servidor e incluyen metadatos Open Graph y datos estructurados JSON-LD.",
        picked: "Renderizado en servidor",
        pickedNote: "tanstack start + json-ld",
      },
    ],
  },
  {
    id: "entre-migas",
    title: "Entre Migas",
    client: "sándwiches de miga en Los Cóndores, Córdoba",
    summary:
      "Una app para que los clientes armen su pedido de sándwiches de miga desde el celular, por docena o media docena, y lo manden al WhatsApp del local con el mensaje ya armado. El carrito y los datos del cliente quedan guardados entre visitas.",
    stack: ["react 19", "typescript", "tailwind css", "google sheets", "vercel"],
    site: "https://entremigaslc-app.vercel.app",
    repo: "https://github.com/goarguello97/entremigaslc-app",
    image: {
      src: "/assets/projects/entre-migas.jpg",
      alt: "App de pedidos de Entre Migas en una computadora y en un celular",
    },
    decisions: [
      {
        question: "¿Hace falta un backend?",
        why: "El negocio tenía que poder cambiar variedades, precios, disponibilidad y textos sin tocar código. Una planilla de Google Sheets publicada como CSV alcanza para eso. La contra, asumida: los pedidos no quedan registrados fuera del chat de WhatsApp.",
        dropped: "Backend con base de datos",
        picked: "Google Sheets como menú editable",
      },
      {
        question: "¿Cómo se cierra el pedido?",
        why: "Un checkout corto pide nombre, tipo de entrega, forma de pago y notas, y arma un link de WhatsApp con el pedido codificado en la URL.",
        picked: "Mensaje de WhatsApp pre-armado",
        pickedNote: "sin servidor",
      },
    ],
  },
  {
    // Built at the owner's current job for a client: no client name, no image,
    // no links, and no implementation details beyond what the owner shared.
    id: "canje-codigos",
    title: "Sistema de canje de códigos de descuento",
    client: "cliente importante del rubro sushi",
    summary:
      "Un sistema para canjear códigos de descuento, que diseñé y construí de punta a punta. Por confidencialidad, no muestro el nombre del cliente ni los detalles del funcionamiento.",
    stack: ["google forms", "google sheets"],
    decisions: [
      {
        question: "¿Sistema a medida o herramientas que ya existen?",
        why: "Propuse dos caminos: un desarrollo full stack a medida o una solución sobre Google Forms y Sheets. Por costo, el cliente eligió la segunda.",
        dropped: "Desarrollo full stack a medida",
        picked: "Google Forms + Sheets",
      },
    ],
  },
  {
    id: "sustentabilidad",
    // Internal processes are left out on purpose (owner's request).
    title: "Rediseño web",
    client: "cliente del sector sustentabilidad",
    summary: "Un sitio en Wix que necesitaba más de lo que permitía el editor.",
    stack: ["wix + html propio"],
    decisions: [
      {
        question: "¿Cómo rediseñar las secciones clave del sitio?",
        why: "El editor visual limitaba el diseño y la funcionalidad. Sumé HTML propio dentro de Wix, sin migrar todo el sitio.",
        dropped: "Solo el editor visual de Wix",
        picked: "Wix con HTML propio",
      },
    ],
  },
];

// The screenshot links to the live site when there is one.
function ProjectShot({ project, image }: { project: Project; image: { src: string; alt: string } }) {
  const img = (
    <img src={image.src} alt={image.alt} width={1200} height={795} loading="lazy" decoding="async" />
  );
  return project.site ? (
    <a className="gs-shot" href={project.site} target="_blank" rel="noopener noreferrer">
      {img}
    </a>
  ) : (
    <div className="gs-shot">{img}</div>
  );
}

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
              Proyectos, contados por sus decisiones
            </h2>
            <p className="gs-intro">
              En cada uno, la pregunta fue la misma: qué es lo mínimo que resuelve bien el
              problema. A veces es una planilla; a veces, una base de datos.
            </p>
            {projects.map((project) => (
              <article
                className="gs-project"
                id={project.id}
                key={project.id}
                aria-labelledby={`${project.id}-title`}
              >
                <div
                  className={
                    project.image ? "gs-project__top gs-project__top--shot" : "gs-project__top"
                  }
                >
                  <div className="gs-case-head">
                    <h3 id={`${project.id}-title`}>{project.title}</h3>
                    <span>{project.client}</span>
                  </div>
                  {project.image ? <ProjectShot project={project} image={project.image} /> : null}
                  <div className="gs-project__body">
                    <p className="gs-intro">{project.summary}</p>
                    <div className="gs-meta">
                      <ul className="gs-stack" aria-label="Tecnologías">
                        {project.stack.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                      {project.site || project.repo ? (
                        <p className="gs-links">
                          {project.site ? (
                            <a href={project.site} target="_blank" rel="noopener noreferrer">
                              Ver sitio
                            </a>
                          ) : null}
                          {project.repo ? (
                            <a href={project.repo} target="_blank" rel="noopener noreferrer">
                              Ver código
                            </a>
                          ) : null}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="gs-decisions">
                  {project.decisions.map((d) => (
                    <div className="gs-decision" key={d.question}>
                      <div>
                        <p className="gs-decision__q">{d.question}</p>
                        <p className="gs-decision__why">{d.why}</p>
                      </div>
                      <div className="gs-options">
                        {d.dropped ? (
                          <div className="gs-opt">
                            {d.dropped}
                            <small>descartada</small>
                          </div>
                        ) : null}
                        <div className={d.dropped ? "gs-opt gs-opt--pick" : "gs-opt gs-opt--pick gs-opt--solo"}>
                          {d.picked}
                          <small>{d.dropped ? "✓ elegida" : (d.pickedNote ?? "✓ elegida")}</small>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
            <p className="gs-thesis">
              Elegir la herramienta correcta para cada problema ahorra tiempo y presupuesto sin
              sacrificar el resultado.
            </p>
            <p className="gs-soon">
              Más proyectos en{" "}
              <a href="https://github.com/goarguello97" target="_blank" rel="noopener noreferrer">
                mi GitHub
              </a>
              .
            </p>
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
                sustentabilidad, donde rediseño secciones de su sitio y desarrollo soluciones
                para sus clientes.
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
