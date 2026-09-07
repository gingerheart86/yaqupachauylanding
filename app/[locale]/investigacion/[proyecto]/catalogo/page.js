import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Section, PageHeader } from "../../../../../components/ui";
import { GrillaCatalogo } from "../../../../../components/catalogo/GrillaCatalogo";
import { getIndividuos } from "../../../../../lib/catalogo";
import { getLibros } from "../../../../../lib/libros";
import { PROYECTOS_CON_CATALOGO } from "../../../../../lib/proyectos-catalogo";
import { getPagina, catalogoEstaOculto } from "../../../../../lib/paginas";
import { SILUETAS } from "../../../../../lib/especies";
import { alternatesPara } from "../../../../../lib/i18n";

// Un solo componente para los dos proyectos con catalogo (Proyecto
// Toninas e Identidad Franca) - docs/panel-completo.md Bloque 5:
// "el mismo componente parametrizado para los dos proyectos".
//
// Album de figuritas, no herramienta cientifica - es divulgacion
// para publico general. docs/catalogo-figuritas-y-voluntariado.md
// Bloque A: nada de logica de coleccionismo competitivo, un
// individuo muerto no es "una figurita repetida".
export async function generateStaticParams() {
  return Object.keys(PROYECTOS_CON_CATALOGO).flatMap((proyecto) => [
    { locale: "es", proyecto },
    { locale: "en", proyecto },
  ]);
}
export const dynamicParams = false;

export function generateMetadata({ params: { locale, proyecto } }) {
  const info = PROYECTOS_CON_CATALOGO[proyecto];
  if (!info) return {};
  const alternates = alternatesPara(`investigacion/${proyecto}/catalogo`);
  const nombre = locale === "en" ? info.nombre_en : info.nombre;
  return {
    title: locale === "en" ? `Catalogue — ${nombre}` : `Catálogo — ${nombre}`,
    alternates,
  };
}

// Solo Proyecto Toninas usa el campo en_construccion por ahora -
// Identidad Franca sigue mostrando su catalogo normal.
function catalogoEnConstruccion(proyecto) {
  return proyecto === "toninas" && catalogoEstaOculto();
}

export default function Page({ params: { locale, proyecto } }) {
  const info = PROYECTOS_CON_CATALOGO[proyecto];
  if (!info) notFound();
  const esIngles = locale === "en";
  const nombreProyecto = esIngles ? info.nombre_en : info.nombre;

  if (catalogoEnConstruccion(proyecto)) {
    const pagina = getPagina("catalogo");
    const silueta = SILUETAS.tonina;
    return (
      <Section fondo="claro" className="relative overflow-hidden">
        {silueta && (
          <Image
            src={silueta.src}
            alt=""
            aria-hidden="true"
            width={silueta.width}
            height={silueta.height}
            className="pointer-events-none select-none absolute right-0 top-1/2 h-auto w-64 opacity-10 sm:w-96"
            style={{ transform: "translateY(-50%) translateX(15%)" }}
          />
        )}
        <PageHeader
          title={
            esIngles
              ? `Catalogue — ${nombreProyecto}`
              : pagina.titulo || `Catálogo de individuos — ${nombreProyecto}`
          }
        />
        <div className="prose max-w-xl mx-auto mt-8 text-center text-texto">
          {esIngles ? (
            <>
              <p>
                <strong>We're preparing the catalogue</strong>
              </p>
              <p>
                Soon you&apos;ll be able to meet the toninas identified along
                the Uruguayan coast.
              </p>
            </>
          ) : (
            <MDXRemote source={pagina.texto_construccion || ""} />
          )}
        </div>
      </Section>
    );
  }

  const individuos = getIndividuos(proyecto);

  // catalogo es una lista de codigos (un libro puede tener mas de un
  // protagonista real, y un individuo puede aparecer en mas de un
  // libro - Muescagrande esta en dos) - se arma codigo -> lista de
  // libros, no un solo slug por codigo.
  const librosPorCodigo = {};
  for (const libro of getLibros()) {
    for (const codigo of libro.catalogo) {
      if (!librosPorCodigo[codigo]) librosPorCodigo[codigo] = [];
      librosPorCodigo[codigo].push({ slug: libro.slug, titulo: libro.titulo });
    }
  }

  return (
    <Section fondo="claro">
      <PageHeader
        title={esIngles ? `Catalogue — ${nombreProyecto}` : `Catálogo de individuos — ${nombreProyecto}`}
      />

      {individuos.length === 0 ? (
        <p className="mt-8 text-center text-texto">
          {esIngles
            ? "No individuals published yet."
            : "Todavía no hay individuos publicados."}
        </p>
      ) : (
        <>
          {/* Lugar reservado para el contador real de individuos
              catalogados (no la cantidad de fichas subidas al sitio).
              Se saco porque mostraba "5" cuando el catalogo real tiene
              unos 55 - un numero bajo transmite lo contrario de lo que
              corresponde. Se vuelve a poner cuando esten todas las
              fichas cargadas, no antes. docs/correcciones-* pendiente. */}
          <div className="mt-4 h-7" aria-hidden="true" />
          <div className="mt-10">
            <GrillaCatalogo individuos={individuos} librosPorCodigo={librosPorCodigo} />
          </div>
        </>
      )}
    </Section>
  );
}
