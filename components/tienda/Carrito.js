"use client";

import { useState } from "react";
import Link from "next/link";
import { useCarrito } from "../../lib/carrito";
import { formatearPrecio } from "../../lib/tienda-utils";
import { WHATSAPP_TIENDA } from "../../lib/contacto";

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-marca focus-visible:ring-offset-2";

// Arma el mensaje de WhatsApp con el detalle del pedido - formato
// exacto de docs/panel-completo.md Bloque 9.
function armarMensaje(items, total) {
  const lineas = items.map(
    (it) =>
      `· ${it.nombre}${it.variante ? ` — talle ${it.variante}` : ""} — ${it.cantidad} — $${formatearPrecio(it.precio * it.cantidad)}`
  );
  return `Hola, quiero hacer este pedido de la Yaqutienda:\n\n${lineas.join("\n")}\n\nTotal: $${formatearPrecio(total)}`;
}

function itemKey(it) {
  return it.variante ? `${it.slug}::${it.variante}` : it.slug;
}

export default function Carrito({ locale = "es" }) {
  const { items, total, cambiarCantidad, quitar } = useCarrito();
  const [copiado, setCopiado] = useState(false);

  if (items.length === 0) {
    return (
      <div className="text-center">
        <p className="text-texto">Tu carrito está vacío.</p>
        <Link
          href={`/${locale}/tienda`}
          className={`mt-4 inline-block text-marca-oscuro underline underline-offset-4 ${FOCUS_RING}`}
        >
          Ver la tienda
        </Link>
      </div>
    );
  }

  const mensaje = armarMensaje(items, total);
  const urlWhatsapp = WHATSAPP_TIENDA
    ? `${WHATSAPP_TIENDA}?text=${encodeURIComponent(mensaje)}`
    : null;

  function copiarPedido() {
    navigator.clipboard?.writeText(mensaje).then(() => {
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    });
  }

  return (
    <div className="max-w-2xl mx-auto">
      <ul role="list" className="divide-y divide-marca-grafito/10">
        {items.map((it) => (
          <li key={itemKey(it)} className="flex items-center justify-between gap-4 py-4">
            <div className="flex-1">
              <p className="font-medium text-mar-800">
                {it.nombre}
                {it.variante && <span className="text-marca-grafito"> — talle {it.variante}</span>}
              </p>
              <p className="text-sm text-marca-grafito">$U {formatearPrecio(it.precio)} c/u</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => cambiarCantidad(it, it.cantidad - 1)}
                aria-label="Restar uno"
                className={`h-8 w-8 rounded-md border-[0.5px] border-marca-grafito/30 text-mar-800 hover:bg-costa-100 ${FOCUS_RING}`}
              >
                −
              </button>
              <span className="w-6 text-center">{it.cantidad}</span>
              <button
                onClick={() => cambiarCantidad(it, it.cantidad + 1)}
                aria-label="Sumar uno"
                className={`h-8 w-8 rounded-md border-[0.5px] border-marca-grafito/30 text-mar-800 hover:bg-costa-100 ${FOCUS_RING}`}
              >
                +
              </button>
            </div>
            <p className="w-20 text-right font-medium text-mar-800">
              $U {formatearPrecio(it.precio * it.cantidad)}
            </p>
            <button
              onClick={() => quitar(it)}
              className={`text-sm text-marca-grafito hover:text-acento-medusa ${FOCUS_RING}`}
              aria-label={`Quitar ${it.nombre}`}
            >
              Quitar
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center justify-between border-t border-marca-grafito/20 pt-4">
        <span className="text-lg font-semibold text-mar-800">Total</span>
        <span className="text-lg font-semibold text-mar-800">$U {formatearPrecio(total)}</span>
      </div>

      <div className="mt-6 rounded-lg border-[0.5px] border-marca-grafito/20 bg-costa-100 p-4">
        <p className="text-sm font-semibold text-mar-800">Así queda el mensaje del pedido:</p>
        <pre className="mt-2 whitespace-pre-wrap font-sans text-sm text-texto">{mensaje}</pre>
      </div>

      <div className="mt-4 rounded-lg border-2 border-acento-medusa bg-acento-medusa/10 p-4">
        <p className="font-semibold text-mar-800">
          Este pedido <u>no es una compra confirmada</u>.
        </p>
        <p className="mt-1 text-texto">
          Vamos a responderte para coordinar la entrega y la forma de pago.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {urlWhatsapp ? (
          <a
            href={urlWhatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={`block rounded-md bg-marca px-6 py-3 text-center font-medium text-white hover:bg-marca-oscuro ${FOCUS_RING}`}
          >
            Realizar pedido por WhatsApp
          </a>
        ) : (
          <p className="rounded-md bg-costa-100 px-6 py-3 text-center text-sm text-marca-grafito">
            El número de WhatsApp de la tienda todavía no está cargado. Mientras tanto, copia el
            pedido de arriba y envíalo por Instagram.
          </p>
        )}
        <button
          onClick={copiarPedido}
          className={`rounded-md border-[0.5px] border-marca-grafito/30 px-6 py-3 text-center font-medium text-mar-800 hover:bg-costa-100 ${FOCUS_RING}`}
        >
          {copiado ? "Copiado ✓" : "Copiar pedido para enviar por Instagram"}
        </button>
      </div>
    </div>
  );
}
