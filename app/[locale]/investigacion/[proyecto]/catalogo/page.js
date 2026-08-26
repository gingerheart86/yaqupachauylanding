import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section, PageHeader } from "../../../../../components/ui";
import { getIndividuos } from "../../../../../lib/catalogo";
import { PROYECTOS_CON_CATALOGO } from "../../../../../lib/proyectos-catalogo";
import { alternatesPara } from "../../../../../lib/i18n";

// Un solo componente para los dos proyectos con catalogo (Proyecto
// Toninas e Identidad Franca) - docs/panel-completo.md Bloque 5:
// "el mismo componente parametrizado para los dos proyectos".
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

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-marca focus-visible:ring-offset-2";

export default function Page({ params: { locale, proyecto } }) {
  const info = PROYECTOS_CON_CATALOGO[proyecto];
  if (!info) notFound();
  const esIngles = locale === "en";
  const nombreProyecto = esIngles ? info.nombre_en : info.nombre;
  const individuos = getIndividuos(proyecto);

  return (
    <Section fondo="claro">
      <PageHeader
        title={esIngles ? `Catalogue — ${nombreProyecto}` : `Catálogo de individuos — ${nombreProyecto}`}
      />

      {individuos.length === 0 && (
        <p className="mt-8 text-center text-texto">
          {esIngles
            ? "No individuals published yet."
            : "Todavía no hay individuos publicados."}
        </p>
      )}

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {individuos.map((ind) => (
          <Link
            key={ind.codigo}
            href={`/${locale}/investigacion/${proyecto}/catalogo/${ind.codigo}`}
            className={`block overflow-hidden rounded-lg border-[0.5px] border-marca-grafito/20 ${FOCUS_RING}`}
          >
            <div className="relative aspect-[4/3] w-full bg-costa-100">
              {ind.fotos[0]?.src && (
                <Image
                  src={ind.fotos[0].src}
                  alt={ind.fotos[0].vista || ind.nombre}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                />
              )}
            </div>
            <div className="p-4">
              <h2 className="font-semibold text-mar-800">{ind.nombre}</h2>
              <p className="text-sm text-marca-grafito">{ind.codigo}</p>
              {ind.muerto && (
                <span className="mt-2 inline-block rounded-full bg-acento-medusa/20 px-2 py-0.5 text-xs font-medium text-mar-800">
                  {esIngles ? "Recorded dead" : "Registrado muerto"}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
