import Link from "next/link";
import { Section, PageHeader } from "../../../components/ui";
import TarjetaArticulo from "../../../components/tienda/TarjetaArticulo";
import { getArticulos, getCategorias } from "../../../lib/tienda";
import { getLibro } from "../../../lib/libros";
import { alternatesPara } from "../../../lib/i18n";

// Solo espanol - seccion 3 del doc de fase 3 bloque 1.
export async function generateStaticParams() {
  return [{ locale: "es" }];
}
export const dynamicParams = false;

export const metadata = {
  title: "Tienda",
  description: "Compra los libros y productos de Yaqu Pacha Uruguay.",
  alternates: alternatesPara("tienda", { soloEs: true }),
};

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-marca focus-visible:ring-offset-2";

export default function Page({ params: { locale }, searchParams }) {
  const categoriaFiltro = searchParams?.categoria || null;
  let articulos = getArticulos();
  if (categoriaFiltro) articulos = articulos.filter((a) => a.categoria === categoriaFiltro);
  const categorias = getCategorias();

  return (
    <Section fondo="claro">
      <PageHeader
        title="Yaqutienda"
        description="Los libros y productos de Yaqu Pacha Uruguay. El pedido se coordina por WhatsApp, no hay pago en línea."
      />

      <p className="mt-4 text-center text-sm">
        <Link
          href={`/${locale}/tienda/carrito`}
          className={`text-marca-oscuro underline underline-offset-4 ${FOCUS_RING}`}
        >
          Ver carrito
        </Link>
      </p>

      {categorias.length > 0 && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm">
          <Link
            href={`/${locale}/tienda`}
            className={`rounded-full px-3 py-1 ${FOCUS_RING} ${!categoriaFiltro ? "bg-marca-oscuro text-white" : "bg-costa-100 text-marca-oscuro hover:bg-costa-300"}`}
          >
            Todas
          </Link>
          {categorias.map((c) => (
            <Link
              key={c}
              href={`/${locale}/tienda?categoria=${encodeURIComponent(c)}`}
              className={`rounded-full px-3 py-1 ${FOCUS_RING} ${categoriaFiltro === c ? "bg-marca-oscuro text-white" : "bg-costa-100 text-marca-oscuro hover:bg-costa-300"}`}
            >
              {c}
            </Link>
          ))}
        </div>
      )}

      {articulos.length === 0 && (
        <p className="mt-10 text-center text-texto">
          {categoriaFiltro
            ? "No hay artículos en esta categoría."
            : "Todavía no hay artículos cargados."}
        </p>
      )}

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articulos.map((a) => (
          <TarjetaArticulo
            key={a.slug}
            articulo={a}
            locale={locale}
            libro={a.categoria === "Libros" ? getLibro(a.slug) : null}
          />
        ))}
      </div>
    </Section>
  );
}
