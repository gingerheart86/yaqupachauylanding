import Image from "next/image";
import Link from "next/link";
import { Section, PageHeader } from "../../../components/ui";
import {
  getTodasLasNoticias,
  getCategoriasDeNoticias,
  getAniosDeNoticias,
  fechaLegible,
} from "../../../lib/noticias";
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
const POR_PAGINA = 10;

function urlPagina({ categoria, anio, pagina }) {
  const params = new URLSearchParams();
  if (categoria) params.set("categoria", categoria);
  if (anio) params.set("anio", anio);
  if (pagina && pagina > 1) params.set("pagina", String(pagina));
  const qs = params.toString();
  return `/es/noticias${qs ? `?${qs}` : ""}`;
}

export default function Page({ searchParams }) {
  const categoriaFiltro = searchParams?.categoria || null;
  const anioFiltro = searchParams?.anio || null;
  const paginaPedida = Math.max(1, parseInt(searchParams?.pagina, 10) || 1);

  let noticias = getTodasLasNoticias();
  if (categoriaFiltro) noticias = noticias.filter((n) => n.categoria === categoriaFiltro);
  if (anioFiltro) noticias = noticias.filter((n) => n.fecha.slice(0, 4) === anioFiltro);

  const totalPaginas = Math.max(1, Math.ceil(noticias.length / POR_PAGINA));
  const pagina = Math.min(paginaPedida, totalPaginas);
  const inicio = (pagina - 1) * POR_PAGINA;
  const itemsPagina = noticias.slice(inicio, inicio + POR_PAGINA);

  const sinFiltros = !categoriaFiltro && !anioFiltro;
  const mostrarDestacada = sinFiltros && pagina === 1 && itemsPagina.length > 0;

  let destacada = null;
  let resto = itemsPagina;
  if (mostrarDestacada) {
    const indiceDestacada = itemsPagina.findIndex((n) => n.destacada);
    destacada = itemsPagina[indiceDestacada === -1 ? 0 : indiceDestacada];
    resto = itemsPagina.filter((n) => n !== destacada);
  }

  const categorias = getCategoriasDeNoticias();
  const anios = getAniosDeNoticias();

  return (
    <Section fondo="claro">
      <PageHeader title="Noticias" />

      {(categorias.length > 0 || anios.length > 0) && (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
          {categorias.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-marca-grafito">Categoría:</span>
              <Link
                href={urlPagina({ anio: anioFiltro })}
                className={`rounded-full px-3 py-1 ${FOCUS_RING} ${
                  !categoriaFiltro
                    ? "bg-marca-oscuro text-white"
                    : "bg-costa-100 text-marca-oscuro hover:bg-costa-300"
                }`}
              >
                Todas
              </Link>
              {categorias.map((c) => (
                <Link
                  key={c}
                  href={urlPagina({ categoria: c, anio: anioFiltro })}
                  className={`rounded-full px-3 py-1 ${FOCUS_RING} ${
                    categoriaFiltro === c
                      ? "bg-marca-oscuro text-white"
                      : "bg-costa-100 text-marca-oscuro hover:bg-costa-300"
                  }`}
                >
                  {c}
                </Link>
              ))}
            </div>
          )}
          {anios.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-marca-grafito">Año:</span>
              <Link
                href={urlPagina({ categoria: categoriaFiltro })}
                className={`rounded-full px-3 py-1 ${FOCUS_RING} ${
                  !anioFiltro
                    ? "bg-marca-oscuro text-white"
                    : "bg-costa-100 text-marca-oscuro hover:bg-costa-300"
                }`}
              >
                Todos
              </Link>
              {anios.map((a) => (
                <Link
                  key={a}
                  href={urlPagina({ categoria: categoriaFiltro, anio: a })}
                  className={`rounded-full px-3 py-1 ${FOCUS_RING} ${
                    anioFiltro === a
                      ? "bg-marca-oscuro text-white"
                      : "bg-costa-100 text-marca-oscuro hover:bg-costa-300"
                  }`}
                >
                  {a}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {noticias.length === 0 && (
        <p className="mt-8 text-center text-texto">
          No hay noticias que coincidan con este filtro.
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

      {totalPaginas > 1 && (
        <nav
          aria-label="Paginación de noticias"
          className="mt-12 flex items-center justify-center gap-4 text-sm"
        >
          {pagina > 1 ? (
            <Link
              href={urlPagina({ categoria: categoriaFiltro, anio: anioFiltro, pagina: pagina - 1 })}
              className={`rounded-md px-3 py-1.5 text-marca-oscuro hover:bg-costa-100 ${FOCUS_RING}`}
            >
              ← Anteriores
            </Link>
          ) : (
            <span className="px-3 py-1.5 text-marca-grafito/40">← Anteriores</span>
          )}
          <span className="text-marca-grafito">
            Página {pagina} de {totalPaginas}
          </span>
          {pagina < totalPaginas ? (
            <Link
              href={urlPagina({ categoria: categoriaFiltro, anio: anioFiltro, pagina: pagina + 1 })}
              className={`rounded-md px-3 py-1.5 text-marca-oscuro hover:bg-costa-100 ${FOCUS_RING}`}
            >
              Siguientes →
            </Link>
          ) : (
            <span className="px-3 py-1.5 text-marca-grafito/40">Siguientes →</span>
          )}
        </nav>
      )}

      <p className="mt-10 text-center text-sm">
        <a href="/noticias/feed.xml" className={`text-marca-oscuro underline underline-offset-4 ${FOCUS_RING}`}>
          RSS
        </a>
      </p>
    </Section>
  );
}
