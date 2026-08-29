"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  ArrowPathIcon,
  ArrowUturnLeftIcon,
} from "@heroicons/react/24/outline";

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-marca focus-visible:ring-offset-2";

// Figurita de catalogo: frente (foto de aleta, codigo superpuesto) ->
// gira -> dorso (estampilla, codigo, nombre, lugar, boton "Ver
// historia") -> el boton "Ver historia" abre el modal/hoja con el
// relato completo. docs/catalogo-figuritas-y-voluntariado.md Bloque A
// y su ajuste posterior de accesibilidad: la tarjeta en si no dispara
// ninguna accion (alguien haciendo scroll en mobile no la gira sin
// querer), solo los dos botones lo hacen, y ambos miden al menos
// 44x44px. El nombre ya no es un boton - no se entendia que lo era.
export function TarjetaIndividuo({ individuo, onAbrirHistoria }) {
  const [girada, setGirada] = useState(false);
  const btnFrenteRef = useRef(null);
  const btnDorsoRef = useRef(null);
  const primeraVez = useRef(true);

  useEffect(() => {
    if (primeraVez.current) {
      primeraVez.current = false;
      return;
    }
    (girada ? btnDorsoRef : btnFrenteRef).current?.focus();
  }, [girada]);

  function girar() {
    setGirada((g) => !g);
  }

  function onKeyDownGirar(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      girar();
    }
  }

  return (
    <div className="relative">
      {individuo.muerto && (
        <span className="absolute -top-2 -left-2 z-20 rounded-full bg-acento-medusa px-2 py-0.5 text-xs font-semibold text-mar-900 shadow">
          Registrado muerto
        </span>
      )}
      <div className="aspect-[3/4] w-full" style={{ perspective: "1200px" }}>
        <div
          className="relative h-full w-full transition-transform duration-500 ease-in-out"
          style={{
            transformStyle: "preserve-3d",
            transform: girada ? "rotateY(180deg)" : "none",
          }}
        >
          {/* Frente: foto de la aleta, codigo superpuesto */}
          <div
            className="absolute inset-0 overflow-hidden rounded-xl border-2 border-marca-grafito/20 bg-costa-100"
            style={{ backfaceVisibility: "hidden" }}
            aria-hidden={girada}
          >
            {individuo.fotos[0]?.src && (
              <Image
                src={individuo.fotos[0].src}
                alt={individuo.fotos[0].vista || individuo.nombre}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 20vw, 33vw"
              />
            )}
            {individuo.codigo && (
              <span className="absolute right-2 top-2 rounded-md bg-mar-900/75 px-2 py-1 font-mono text-xs font-semibold tracking-wide text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.6)]">
                {individuo.codigo}
              </span>
            )}
            <button
              ref={btnFrenteRef}
              type="button"
              onClick={girar}
              onKeyDown={onKeyDownGirar}
              tabIndex={girada ? -1 : 0}
              aria-label={`Girar la figurita de ${individuo.nombre}`}
              className={`absolute bottom-2 right-2 flex h-11 w-11 items-center justify-center rounded-full bg-mar-900/70 text-white hover:bg-mar-900/90 ${FOCUS_RING}`}
            >
              <ArrowPathIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* Dorso: estampilla, codigo, nombre, lugar, ver historia */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border-2 border-marca-grafito/20 bg-arena-200 p-4 text-center"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            aria-hidden={!girada}
          >
            <div className="relative h-20 w-20 shrink-0">
              {individuo.stamp && (
                <Image
                  src={individuo.stamp}
                  alt=""
                  aria-hidden="true"
                  fill
                  className="object-contain"
                  sizes="80px"
                />
              )}
            </div>
            <p className="font-mono text-sm tracking-wider text-marca-grafito">
              {individuo.codigo}
            </p>
            <p className="font-semibold text-mar-800">{individuo.nombre}</p>
            {individuo.lugar && (
              <p className="text-xs text-marca-grafito">{individuo.lugar}</p>
            )}
            <button
              type="button"
              onClick={() => onAbrirHistoria(individuo)}
              tabIndex={girada ? 0 : -1}
              aria-label={`Ver la historia de ${individuo.nombre}`}
              className={`mt-1 flex min-h-11 items-center justify-center rounded-full bg-marca-oscuro px-4 text-sm font-medium text-white hover:bg-marca-oscuro/90 ${FOCUS_RING}`}
            >
              Ver historia
            </button>
            <button
              ref={btnDorsoRef}
              type="button"
              onClick={girar}
              onKeyDown={onKeyDownGirar}
              tabIndex={girada ? 0 : -1}
              aria-label={`Volver al frente de la figurita de ${individuo.nombre}`}
              className={`absolute bottom-2 right-2 flex h-11 w-11 items-center justify-center rounded-full bg-mar-900/70 text-white hover:bg-mar-900/90 ${FOCUS_RING}`}
            >
              <ArrowUturnLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
