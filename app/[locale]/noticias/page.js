import Image from "next/image";
import Link from "next/link";
import { Section, PageHeader } from "../../../components/ui";
import { getTodasLasNoticias, fechaLegible } from "../../../lib/noticias";
import { alternatesPara } from "../../../lib/i18n";

// Solo espanol - fase3-arquitectura-y-contenido.md seccion 11.
export async function generateStaticParams() {
  return [{ locale: "es" }];
}
export const dynamicParams = false;

export const metadata = {
  title: "Noticias",
  description: "Novedades de Yaqu Pacha Uruguay.",
  alternates: alternatesPara("noticias", { soloEs: true }),
};

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-marca focus-visible:ring-offset-2";

export default function Page() {
  const noticias = getTodasLasNoticias();
  // La destacada es la marcada con destacada:true en el frontmatter, no
  // necesariamente la mas reciente - ver content/noticias/README.md.
  // Si ninguna esta marcada, cae a la mas reciente por defecto.
  const indiceDestacada = noticias.findIndex((n) => n.destacada);
  const destacada = noticias[indiceDestacada === -1 ? 0 : indiceDestacada];
  const resto = noticias.filter((n) => n !== destacada);

  return (
    <Section fondo="claro">
      <PageHeader title="Noticias" />

      {noticias.length === 0 && (
        <p className="mt-8 text-center text-texto">
          Todavía no hay noticias publicadas. Volvé pronto.
        </p>
      )}

      {destacada && (
        <Link
          href={`/es/noticias/${destacada.slug}`}
          className={`mt-10 group block overflow-hidden rounded-lg border-[0.5px] border-marca-grafito/20 ${FOCUS_RING}`}
        >
          {destacada.imagen && (
            <div className="relative aspect-[21/9] w-full">
              <Image
                src={destacada.imagen}
                alt=""
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(min-width: 1024px) 1024px, 100vw"
              />
            </div>
          )}
          <div className="p-6">
            {destacada.categoria && (
              <p className="text-xs font-semibold uppercase tracking-widest text-marca-oscuro">
                {destacada.categoria}
              </p>
            )}
            <h2 className="mt-2 text-2xl font-semibold text-mar-800">
              {destacada.titulo}
            </h2>
            <p className="mt-1 text-sm text-marca-grafito">
              {fechaLegible(destacada.fecha)}
            </p>
            <p className="mt-3 text-base text-texto">{destacada.resumen}</p>
          </div>
        </Link>
      )}

      {resto.length > 0 && (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resto.map((n) => (
            <Link
              key={n.slug}
              href={`/es/noticias/${n.slug}`}
              className={`group block overflow-hidden rounded-lg border-[0.5px] border-marca-grafito/20 ${FOCUS_RING}`}
            >
              {n.imagen && (
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={n.imagen}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, 100vw"
                  />
                </div>
              )}
              <div className="p-5">
                {n.categoria && (
                  <p className="text-xs font-semibold uppercase tracking-widest text-marca-oscuro">
                    {n.categoria}
                  </p>
                )}
                <h3 className="mt-1 font-semibold text-mar-800">
                  {n.titulo}
                </h3>
                <p className="mt-1 text-sm text-marca-grafito">
                  {fechaLegible(n.fecha)}
                </p>
                <p className="mt-2 text-sm text-texto">{n.resumen}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </Section>
  );
}
