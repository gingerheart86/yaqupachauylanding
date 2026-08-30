import { notFound } from "next/navigation";
import { Section, PageHeader } from "../../../../../components/ui";
import { GrillaCatalogo } from "../../../../../components/catalogo/GrillaCatalogo";
import { getIndividuos } from "../../../../../lib/catalogo";
import { getLibros } from "../../../../../lib/libros";
import { PROYECTOS_CON_CATALOGO } from "../../../../../lib/proyectos-catalogo";
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

export default function Page({ params: { locale, proyecto } }) {
  const info = PROYECTOS_CON_CATALOGO[proyecto];
  if (!info) notFound();
  const esIngles = locale === "en";
  const nombreProyecto = esIngles ? info.nombre_en : info.nombre;
  const individuos = getIndividuos(proyecto);

  const librosPorCodigo = {};
  for (const libro of getLibros()) {
    if (libro.catalogo) librosPorCodigo[libro.catalogo] = libro.slug;
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
