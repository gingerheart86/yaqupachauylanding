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
                className="absolute right-1 top-1 w-[67px] sm:right-2 sm:top-2 sm:w-24"
                style={{ aspectRatio: `${silueta.width} / ${silueta.height}` }}
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-mar-800"
                  style={estiloMascara(silueta.src)}
                />
                {/* Posicionado a mano sobre el punto mas ancho del
                    cuerpo de la silueta (medido en pixeles reales del
                    PNG: a ~55% de alto hay una franja solida de ~68%
                    del ancho, centrada ~43%), no en el medio de la
                    caja completa - el medio geometrico cae sobre la
                    cola, angosta, y el codigo se desbordaba. */}
                <span
                  className="absolute whitespace-nowrap font-mono text-[11px] font-semibold tracking-tighter text-white sm:text-[13px]"
                  style={{ left: "43%", top: "55%", transform: "translate(-50%, -50%)" }}
                >
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
            className={`absolute inset-0 flex flex-col items-center overflow-hidden bg-arena-200 p-3 pb-2 text-center ${MARCO}`}
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            aria-hidden={!girada}
          >
            {/* min-h-0 deja que este bloque se achique si hace falta
                en vez de desbordar la tarjeta (alto fijo por
                aspect-ratio) cuando "lugar" ocupa dos lineas - sin
                esto la lengueta del nombre quedaba recortada fuera
                de la vista en tarjetas mas anchas que altas. */}
            <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-1">
              <div className="relative h-12 w-12 shrink-0">
                {individuo.stamp && (
                  <Image
                    src={individuo.stamp}
                    alt=""
                    aria-hidden="true"
                    fill
                    className="object-contain"
                    sizes="48px"
                  />
                )}
              </div>
              <p className="font-mono text-sm tracking-wider text-marca-grafito">
                {individuo.codigo}
              </p>
              {individuo.lugar && (
                <p className="text-xs leading-tight text-marca-grafito">{individuo.lugar}</p>
              )}
              <button
                type="button"
                onClick={() => onAbrirHistoria(individuo)}
                tabIndex={girada ? 0 : -1}
                aria-label={`Ver la historia de ${individuo.nombre}`}
                className={`flex min-h-11 items-center justify-center rounded-full bg-marca-oscuro px-4 text-sm font-medium text-white hover:bg-marca-oscuro/90 ${FOCUS_RING}`}
              >
                Ver historia
              </button>
            </div>
            {/* Lengueta con el nombre, apoyada en el borde inferior -
                como la banda de nombre de una figurita. Ancho segun
                el contenido (inline-block), nunca corta con puntos
                suspensivos. Centrada en el ancho completo: el boton
                de volver se movio a la esquina superior (ver mas
                abajo) para no competir por espacio horizontal con
                nombres largos como Muescagrande - reservar un margen
                lateral fijo (pr-12) funcionaba a un ancho de tarjeta
                pero se volvia a romper en otro (mobile a 2 columnas
                es mas angosto que el grid de escritorio a 5). */}
            <div className="flex w-full justify-center">
              <span className="inline-block max-w-full whitespace-nowrap rounded-sm bg-mar-800 px-3 py-1 text-xs font-semibold text-white">
                {individuo.nombre}
              </span>
            </div>
            <button
              ref={btnDorsoRef}
              type="button"
              onClick={girar}
              onKeyDown={onKeyDownGirar}
              tabIndex={girada ? 0 : -1}
              aria-label={`Volver al frente de la figurita de ${individuo.nombre}`}
              className={`absolute top-2 right-2 flex h-11 w-11 items-center justify-center rounded-full bg-mar-900/70 text-white hover:bg-mar-900/90 ${FOCUS_RING}`}
            >
              <ArrowUturnLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
