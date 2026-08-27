"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/outline";

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-mar-900";

// Modal con la historia completa del individuo. Abre y cierra con
// transicion suave (no un salto), cierra con Escape, devuelve el
// foco a quien lo abrio. docs/catalogo-figuritas-y-voluntariado.md
// Bloque A.
//
// "historia" es markdown en el schema, pero el contenido real son
// parrafos simples sin links/imagenes - se separa por linea en
// blanco en vez de sumar un pipeline de MDX del lado del cliente
// para esto.
export function ModalHistoria({ individuo, libro, onCerrar }) {
  const [visible, setVisible] = useState(false);
  const cerrarBtnRef = useRef(null);
  const disparadorRef = useRef(
    typeof document !== "undefined" ? document.activeElement : null
  );

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    cerrarBtnRef.current?.focus();

    function onKeyDown(e) {
      if (e.key === "Escape") cerrar();
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

  const parrafos = (individuo.historia || "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className="absolute inset-0 bg-mar-900/70"
        onClick={cerrar}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-historia-titulo"
        className={`relative z-10 max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl transition-transform duration-200 ${
          visible ? "scale-100" : "scale-95"
        }`}
      >
        <button
          ref={cerrarBtnRef}
          type="button"
          onClick={cerrar}
          aria-label="Cerrar"
          className={`absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-marca-grafito hover:bg-costa-100 focus-visible:ring-2 focus-visible:ring-marca ${FOCUS_RING.replace("white", "marca")}`}
        >
          <XMarkIcon className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="flex items-center gap-4">
          {individuo.stamp && (
            <div className="relative h-16 w-16 shrink-0">
              <Image src={individuo.stamp} alt="" aria-hidden="true" fill className="object-contain" sizes="64px" />
            </div>
          )}
          <div>
            <h2 id="modal-historia-titulo" className="text-xl font-semibold text-mar-800">
              {individuo.nombre}
            </h2>
            <p className="font-mono text-sm text-marca-grafito">{individuo.codigo}</p>
          </div>
        </div>

        <div className="mt-4 space-y-3 text-texto">
          {parrafos.length > 0 ? (
            parrafos.map((p, i) => <p key={i}>{p}</p>)
          ) : (
            <p className="text-marca-grafito">Todavía no hay una historia cargada para esta ficha.</p>
          )}
        </div>

        {libro && (
          <p className="mt-4 border-t border-marca-grafito/10 pt-4 text-sm">
            <Link
              href={`/es/educacion/libros/${libro}`}
              className="text-marca-oscuro underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-marca"
            >
              {individuo.nombre} también es protagonista de un libro →
            </Link>
          </p>
        )}
      </div>
    </div>,
    document.body
  );
}
