"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCarrito } from "../../lib/carrito";
import { formatearPrecio } from "../../lib/tienda-utils";

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-marca focus-visible:ring-offset-2";

// libro: la ficha de content/libros con el mismo slug, si el
// articulo es uno de los libros (se resuelve en el server, page.js -
// este componente es "use client" y no puede leer content/ con fs).
// Ahi vive la sinopsis y los creditos; la tienda no los duplica.
export default function TarjetaArticulo({ articulo, locale = "es", libro = null }) {
  const esIngles = locale === "en";
  const { agregar } = useCarrito();
  const [variante, setVariante] = useState(articulo.variantes[0] ?? null);
  const [agregado, setAgregado] = useState(false);

  function handleAgregar() {
    agregar({
      slug: articulo.slug,
      nombre: articulo.nombre,
      precio: articulo.precio,
      variante,
    });
    setAgregado(true);
    setTimeout(() => setAgregado(false), 1500);
  }

  return (
    <div
      id={articulo.slug}
      className="overflow-hidden rounded-lg border-[0.5px] border-marca-grafito/20 scroll-mt-24"
    >
      <div className="relative aspect-[4/3] w-full bg-costa-100">
        {articulo.fotos[0]?.src && (
          <Image
            src={articulo.fotos[0].src}
            alt={articulo.fotos[0].alt || articulo.nombre}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 33vw, 100vw"
          />
        )}
        {!articulo.disponible && (
          <span className="absolute top-2 right-2 rounded-full bg-mar-900/80 px-3 py-1 text-xs font-semibold text-white">
            {esIngles ? "Out of stock" : "Sin stock"}
          </span>
        )}
      </div>
      <div className="p-4">
        <h2 className="font-semibold text-mar-800">{articulo.nombre}</h2>
        {articulo.descripcion && (
          <p className="mt-1 text-sm text-texto">{articulo.descripcion}</p>
        )}
        {libro && (
          <Link
            href={`/es/educacion/libros/${libro.slug}`}
            className={`mt-1 inline-block text-sm text-marca-oscuro underline underline-offset-4 ${FOCUS_RING}`}
          >
            {esIngles ? "About this book" : "Sobre este libro"}
          </Link>
        )}
        <p className="mt-2 font-semibold text-mar-800">
          $U {formatearPrecio(articulo.precio)}
        </p>

        {articulo.variantes.length > 0 && (
          <select
            value={variante ?? ""}
            onChange={(e) => setVariante(e.target.value)}
            disabled={!articulo.disponible}
            className={`mt-2 w-full rounded-md border-[0.5px] border-marca-grafito/30 px-3 py-1.5 text-sm ${FOCUS_RING}`}
          >
            {articulo.variantes.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        )}

        <button
          onClick={handleAgregar}
          disabled={!articulo.disponible}
          className={`mt-3 w-full rounded-md px-4 py-2 text-sm font-medium ${FOCUS_RING} ${
            articulo.disponible
              ? "bg-marca-oscuro text-white hover:bg-marca-oscuro/90"
              : "bg-costa-100 text-marca-grafito cursor-not-allowed"
          }`}
        >
          {!articulo.disponible
            ? esIngles
              ? "Out of stock"
              : "Sin stock"
            : agregado
              ? esIngles
                ? "Added ✓"
                : "Agregado ✓"
              : esIngles
                ? "Add to cart"
                : "Agregar al carrito"}
        </button>
      </div>
    </div>
  );
}
