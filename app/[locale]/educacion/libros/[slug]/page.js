import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "../../../../../components/ui";
import { getLibro, getLibros } from "../../../../../lib/libros";
import { getIndividuoPorCodigo } from "../../../../../lib/catalogo";
import { getArticulo } from "../../../../../lib/tienda";
import { catalogoEstaOculto } from "../../../../../lib/paginas";
import { alternatesPara } from "../../../../../lib/i18n";

export async function generateStaticParams() {
  return getLibros().map((l) => ({ locale: "es", slug: l.slug }));
}
export const dynamicParams = false;

export function generateMetadata({ params: { slug } }) {
  const libro = getLibro(slug);
  if (!libro) return {};
  return {
    title: libro.titulo,
    description: libro.sinopsis,
    alternates: alternatesPara(`educacion/libros/${slug}`, { soloEs: true }),
  };
}

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-marca focus-visible:ring-offset-2";

export default function Page({ params: { slug } }) {
  const libro = getLibro(slug);
  if (!libro) notFound();
  const individuos = catalogoEstaOculto()
    ? []
    : libro.catalogo.map((codigo) => getIndividuoPorCodigo(codigo)).filter(Boolean);
  // El slug del libro y el del articulo de la tienda son el mismo
  // texto por convencion - si todavia no existe ese articulo, no hay
  // boton de compra en vez de uno que no lleva a ningun lado.
  const articulo = libro.disponible ? getArticulo(libro.slug) : null;

  return (
    <Section fondo="claro">
      <p className="text-center text-sm">
        <Link
          href="/es/educacion/libros"
          className={`text-marca-oscuro underline underline-offset-4 ${FOCUS_RING}`}
        >
          ← Volver a Libros
        </Link>
      </p>

      <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-[240px_1fr] gap-8">
        <div className="relative aspect-square w-full max-w-xs mx-auto sm:mx-0 overflow-hidden rounded-lg bg-costa-100">
          {libro.tapa && (
            <Image
              src={libro.tapa}
              alt={`Tapa de ${libro.titulo}`}
              fill
              className="object-cover"
              sizes="240px"
            />
          )}
          {!libro.disponible && (
            <span className="absolute top-2 right-2 rounded-full bg-mar-900/80 px-3 py-1 text-xs font-semibold text-white">
              Próximamente
            </span>
          )}
        </div>

        <div>
          <h1 className="text-2xl font-semibold text-mar-800">{libro.titulo}</h1>
          {libro.edad && <p className="mt-1 text-sm text-marca-grafito">{libro.edad}</p>}
          {libro.sinopsis && <p className="mt-4 text-texto">{libro.sinopsis}</p>}

          <dl className="mt-6 space-y-1 text-sm text-marca-grafito">
            <div>
              <dt className="inline font-semibold">Guion: </dt>
              <dd className="inline">{libro.guion}</dd>
            </div>
            <div>
              <dt className="inline font-semibold">Ilustraciones: </dt>
              <dd className="inline">{libro.ilustraciones}</dd>
            </div>
            <div>
              <dt className="inline font-semibold">Editorial: </dt>
              <dd className="inline">{libro.editorial}</dd>
            </div>
          </dl>

          {individuos.length > 0 && (
            <p className="mt-4 space-x-3">
              {individuos.map((individuo) => (
                <Link
                  key={individuo.slug}
                  href={`/es/investigacion/${individuo.proyecto}/catalogo/${individuo.slug}`}
                  className={`text-marca-oscuro underline underline-offset-4 ${FOCUS_RING}`}
                >
                  Conoce a {individuo.nombre} en el catálogo →
                </Link>
              ))}
            </p>
          )}

          {!libro.disponible ? (
            <p className="mt-4 text-sm text-marca-grafito">
              Próximamente. Todavía no está publicado.
            </p>
          ) : articulo ? (
            <p className="mt-4">
              <Link
                href={`/es/tienda#${articulo.slug}`}
                className={`inline-block rounded-md bg-marca-oscuro px-4 py-2 text-sm font-medium text-white hover:bg-marca-oscuro/90 ${FOCUS_RING}`}
              >
                Comprarlo en la Yaqutienda
              </Link>
            </p>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
