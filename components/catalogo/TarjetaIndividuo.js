"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  ArrowPathIcon,
  ArrowUturnLeftIcon,
} from "@heroicons/react/24/outline";
import { siluetaPorEspecie } from "../../lib/especies";

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-marca focus-visible:ring-offset-2";

// Marco de figurita: mar.800 solido, sin sombra ni degrade. El mismo
// marco en las dos caras para que se mantenga al girar.
const MARCO =
  "border-[5px] sm:border-[7px] border-mar-800 ring-1 ring-inset ring-white rounded-[5px]";

function estiloMascara(src) {
  return {
    maskImage: `url(${src})`,
    maskSize: "contain",
    maskRepeat: "no-repeat",
    maskPosition: "center",
    WebkitMaskImage: `url(${src})`,
    WebkitMaskSize: "contain",
    WebkitMaskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
  };
}

// Figurita de catalogo: frente (foto de aleta, codigo superpuesto) ->
// gira -> dorso (estampilla, codigo, nombre, lugar, boton "Ver
// historia") -> el boton "Ver historia" abre el modal/hoja con el
// relato completo. docs/catalogo-figuritas-y-voluntariado.md Bloque A
// y su ajuste posterior de accesibilidad: la tarjeta en si no dispara
// ninguna accion (alguien haciendo scroll en mobile no la gira sin
// querer), solo los dos botones lo hacen, y ambos miden al menos
// 44x44px. El nombre ya no es un boton - no se entendia que lo era.
export function TarjetaIndividuo({ individuo, onAbrirHistoria }) {
  const silueta = siluetaPorEspecie(individuo.especie);
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
          {/* Frente: foto de la aleta, codigo sobre la silueta de la especie */}
          <div
            className={`absolute inset-0 overflow-hidden bg-costa-100 ${MARCO}`}
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
            {individuo.codigo && silueta && (
              <div
                className="absolute right-1 top-1 w-14 sm:right-2 sm:top-2 sm:w-20"
                style={{ aspectRatio: `${silueta.width} / ${silueta.height}` }}
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-mar-800"
                  style={estiloMascara(silueta.src)}
                />
                <span className="relative flex h-full items-center justify-center font-mono text-[9px] font-semibold tracking-wide text-white sm:text-[11px]">
                  {individuo.codigo}
                </span>
              </div>
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
            className={`absolute inset-0 flex flex-col items-center justify-center gap-2 overflow-hidden bg-arena-200 p-4 text-center ${MARCO}`}
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
