"use client";

import { useCarrito } from "../lib/carrito";

// Contador de articulos del carrito, visible en el navbar junto a
// YaquTienda - docs/panel-completo.md Bloque 9.
export default function ContadorCarrito() {
  const { cantidadTotal } = useCarrito();
  if (cantidadTotal === 0) return null;
  return (
    <span className="ml-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-acento-medusa px-1.5 text-xs font-semibold text-mar-900">
      {cantidadTotal}
    </span>
  );
}
