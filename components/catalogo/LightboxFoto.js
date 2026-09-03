"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-marca";

// Popup con la foto de la aleta a tamano grande y sin recortar
// (object-contain, no object-cover como en la tarjeta) - para que se
// pueda ver la marca de identificacion en detalle, mas alla de como
// haya quedado encuadrada la miniatura 4:3 de la tarjeta. Mismo
// patron de accesibilidad que ModalHistoria: bloquea el scroll de
// fondo, atrapa el foco, cierra con Escape o clic afuera, devuelve el
// foco a quien lo abrio.
export function LightboxFoto({ foto, nombre, onCerrar }) {
  const [visible, setVisible] = useState(false);
  const cerrarBtnRef = useRef(null);
  const panelRef = useRef(null);
  const disparadorRef = useRef(
    typeof document !== "undefined" ? document.activeElement : null
  );

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    cerrarBtnRef.current?.focus();

    function onKeyDown(e) {
      if (e.key === "Escape") {
        cerrar();
        return;
      }
      if (e.key === "Tab") {
        const nodos = panelRef.current?.querySelectorAll(
          'button, a[href], [tabindex]:not([tabindex="-1"])'
        );
        if (!nodos || nodos.length === 0) return;
        const primero = nodos[0];
        const ultimo = nodos[nodos.length - 1];
        if (e.shiftKey && document.activeElement === primero) {
          e.preventDefault();
          ultimo.focus();
        } else if (!e.shiftKey && document.activeElement === ultimo) {
          e.preventDefault();
          primero.focus();
        }
      }
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      cancelAnimationFrame(id);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function cerrar() {
    setVisible(false);
    setTimeout(() => {
      onCerrar();
      disparadorRef.current?.focus?.();
    }, 200);
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className={`absolute inset-0 bg-mar-900/85 transition-opacity duration-200 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        onClick={cerrar}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Foto de ${nombre} en detalle`}
        className={`relative z-10 max-h-[90vh] w-full max-w-3xl transition-transform duration-200 ${
          visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <button
          ref={cerrarBtnRef}
          type="button"
          onClick={cerrar}
          aria-label="Cerrar"
          className={`absolute -top-2 -right-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-marca-grafito shadow-lg hover:bg-costa-100 ${FOCUS_RING}`}
        >
          <XMarkIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-mar-900">
          {/* La version grande (1600px, con marca de agua en las
              fotos que la llevan) - la miniatura de la tarjeta es de
              solo 600px y sin marca, no sirve para este detalle
              ampliado. */}
          {(foto?.full || foto?.src) && (
            <Image
              src={foto.full || foto.src}
              alt={foto.vista || nombre}
              fill
              className="object-contain"
              sizes="(min-width: 768px) 768px, 100vw"
              quality={90}
            />
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
