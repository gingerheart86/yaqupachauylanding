"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/outline";

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-marca";

const UMBRAL_CIERRE_PX = 100;

// Detalle del individuo: modal centrado en desktop, hoja que sube
// desde abajo en mobile (el patron que la gente ya conoce de sus
// apps - un modal centrado con texto largo queda apretado y con
// scroll dentro de scroll en pantalla chica).
// docs/catalogo-figuritas-y-voluntariado.md Bloque A y su ajuste
// posterior de accesibilidad.
//
// En los dos casos: bloquea el scroll de fondo, atrapa el foco
// adentro (Tab/Shift+Tab no se escapan del dialogo), cierra con
// Escape, clic afuera (solo aporta en desktop, en mobile el backdrop
// tambien esta pero la hoja ocupa casi toda la pantalla) o el boton
// visible, y devuelve el foco a quien lo abrio.
//
// El header (estampilla, titulo, boton cerrar) queda fuera del area
// que hace scroll para que el boton de cerrar este siempre visible,
// incluso con historias largas.
//
// "historia" es markdown en el schema, pero el contenido real son
// parrafos simples sin links/imagenes - se separa por linea en
// blanco en vez de sumar un pipeline de MDX del lado del cliente
// para esto.
export function ModalHistoria({ individuo, libros = [], onCerrar }) {
  const [visible, setVisible] = useState(false);
  const [arrastreY, setArrastreY] = useState(0);
  const [arrastrando, setArrastrando] = useState(false);
  const cerrarBtnRef = useRef(null);
  const panelRef = useRef(null);
  const disparadorRef = useRef(
    typeof document !== "undefined" ? document.activeElement : null
  );
  const tocandoRef = useRef(null);

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

  function onTocarInicio(e) {
    tocandoRef.current = e.touches[0].clientY;
    setArrastrando(true);
  }

  function onTocarMover(e) {
    if (tocandoRef.current == null) return;
    const delta = e.touches[0].clientY - tocandoRef.current;
    if (delta > 0) setArrastreY(delta);
  }

  function onTocarFin() {
    setArrastrando(false);
    if (arrastreY > UMBRAL_CIERRE_PX) {
      cerrar();
    } else {
      setArrastreY(0);
    }
    tocandoRef.current = null;
  }

  const parrafos = (individuo.historia || "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div
        className={`absolute inset-0 bg-mar-900/70 transition-opacity duration-200 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        onClick={cerrar}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-historia-titulo"
        className={`relative z-10 flex max-h-[90vh] w-full flex-col overflow-hidden rounded-t-2xl bg-white shadow-xl sm:max-h-[85vh] sm:max-w-lg sm:rounded-xl ${
          arrastrando ? "" : "transition-transform duration-200"
        } ${
          visible
            ? "translate-y-0 sm:scale-100 sm:opacity-100"
            : "translate-y-full sm:translate-y-0 sm:scale-95 sm:opacity-0"
        }`}
        style={arrastreY ? { transform: `translateY(${arrastreY}px)` } : undefined}
      >
        {/* Agarradera - solo mobile, arrastrar hacia abajo cierra */}
        <div
          className="flex shrink-0 justify-center pb-1 pt-2 sm:hidden"
          onTouchStart={onTocarInicio}
          onTouchMove={onTocarMover}
          onTouchEnd={onTocarFin}
        >
          <span className="h-1.5 w-10 rounded-full bg-marca-grafito/30" aria-hidden="true" />
        </div>

        <div className="flex shrink-0 items-start gap-4 px-6 pb-4 pt-2 sm:pt-6">
          {individuo.stamp && (
            <div className="relative h-16 w-16 shrink-0">
              <Image src={individuo.stamp} alt="" aria-hidden="true" fill className="object-contain" sizes="64px" />
            </div>
          )}
          <div className="min-w-0 flex-1 pr-8">
            <h2 id="modal-historia-titulo" className="text-xl font-semibold text-mar-800">
              {individuo.nombre}
            </h2>
            <p className="font-mono text-sm text-marca-grafito">{individuo.codigo}</p>
          </div>
          <button
            ref={cerrarBtnRef}
            type="button"
            onClick={cerrar}
            aria-label="Cerrar"
            className={`absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full text-marca-grafito hover:bg-costa-100 ${FOCUS_RING}`}
          >
            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="space-y-3 text-texto">
            {parrafos.length > 0 ? (
              parrafos.map((p, i) => <p key={i}>{p}</p>)
            ) : (
              <p className="text-marca-grafito">Todavía no hay una historia cargada para esta ficha.</p>
            )}
          </div>

          {libros.length > 0 && (
            <p className="mt-4 space-x-3 border-t border-marca-grafito/10 pt-4 text-sm">
              {libros.map((libro) => (
                <Link
                  key={libro.slug}
                  href={`/es/educacion/libros/${libro.slug}`}
                  className={`text-marca-oscuro underline underline-offset-4 ${FOCUS_RING}`}
                >
                  {individuo.nombre} también es protagonista de «{libro.titulo}» →
                </Link>
              ))}
            </p>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
