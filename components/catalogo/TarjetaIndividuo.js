"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  ArrowPathIcon,
  ArrowUturnLeftIcon,
  MagnifyingGlassPlusIcon,
} from "@heroicons/react/24/outline";
import { siluetaPorEspecie } from "../../lib/especies";
import { LightboxFoto } from "./LightboxFoto";

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

// Figurita de catalogo: frente (foto de aleta, codigo sobre la
// silueta arriba a la derecha, lengueta con el nombre abajo, boton
// de girar arriba a la izquierda) -> gira -> dorso (estampilla,
// codigo, nombre en texto simple, lugar, boton "Ver historia", boton
// de volver abajo a la derecha) -> "Ver historia" abre el modal/hoja
// con el relato completo. docs/catalogo-figuritas-y-voluntariado.md
// Bloque A y sus ajustes posteriores de accesibilidad y diseno: la
// tarjeta en si no dispara ninguna accion (alguien haciendo scroll en
// mobile no la gira sin querer), solo los botones lo hacen, y todos
// miden al menos 44x44px.
//
// El boton de girar esta arriba a la izquierda (no abajo a la
// derecha, la posicion "natural") para dejarle todo el borde inferior
// libre a la lengueta del nombre - un nombre largo como Muescagrande
// centrado chocaba con un boton ahi en anchos de tarjeta angostos
// (grillas de mobile), pase lo que pase con el largo del nombre.
export function TarjetaIndividuo({ individuo, onAbrirHistoria }) {
  const silueta = siluetaPorEspecie(individuo.especie);
  // Sin estampilla ni historia el dorso quedaria vacio y el boton de
  // girar llevaria a nada - el catalogo real tiene muchas mas fichas
  // con solo la foto de aleta que fichas completas con relato, y esto
  // lo decide el contenido de cada una, no una lista escrita a mano.
  const tieneReverso = Boolean(individuo.stamp) || Boolean(individuo.historia);
  const [girada, setGirada] = useState(false);
  const [lupaAbierta, setLupaAbierta] = useState(false);
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
        <span className="absolute -bottom-2 -left-2 z-20 rounded-full bg-acento-medusa px-2 py-0.5 text-xs font-semibold text-mar-900 shadow">
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
                  className="absolute whitespace-nowrap font-mono text-[11px] font-normal tracking-wide text-white sm:text-[13px]"
                  style={{ left: "43%", top: "55%", transform: "translate(-50%, -50%)" }}
                >
                  {individuo.codigo}
                </span>
              </div>
            )}
            {tieneReverso && (
              // El circulo visible se achico a 24px (el minimo que
              // todavia deja un margen visible alrededor del icono de
              // 16px) pero el boton en si sigue midiendo 44x44 y el
              // circulo queda centrado adentro - el area tocable no se
              // achica, solo lo que se ve.
              <button
                ref={btnFrenteRef}
                type="button"
                onClick={girar}
                onKeyDown={onKeyDownGirar}
                tabIndex={girada ? -1 : 0}
                aria-label={`Girar la figurita de ${individuo.nombre}`}
                className={`group absolute top-2 left-2 flex h-11 w-11 items-center justify-center rounded-full ${FOCUS_RING}`}
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-mar-900/70 text-white group-hover:bg-mar-900/90">
                  <ArrowPathIcon className="h-4 w-4" aria-hidden="true" />
                </span>
              </button>
            )}
            {individuo.fotos[0]?.src && (
              // Lupa para ver la foto sin recortar, mas grande - apilada
              // debajo del boton de girar (arriba a la izquierda), los
              // dos del mismo lado. Si no hay reverso el girar no se
              // monta y la lupa ocupa ese mismo lugar arriba a la
              // izquierda. No usa la esquina derecha (ahi esta la
              // silueta con el codigo) ni la lengueta del nombre abajo
              // (centrada en todo el ancho, choca con un boton fijo en
              // cualquier esquina inferior con nombres largos como
              // Muescagrande).
              <button
                type="button"
                onClick={() => setLupaAbierta(true)}
                aria-label={`Ver la foto de ${individuo.nombre} en detalle`}
                className={`group absolute left-2 flex h-11 w-11 items-center justify-center rounded-full ${FOCUS_RING} ${
                  tieneReverso ? "top-[60px]" : "top-2"
                }`}
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-mar-900/70 text-white group-hover:bg-mar-900/90">
                  <MagnifyingGlassPlusIcon className="h-4 w-4" aria-hidden="true" />
                </span>
              </button>
            )}
            {/* Lengueta con el nombre, apoyada en el borde inferior del
                anverso - como la banda de nombre de una figurita.
                Centrada en el ancho completo: la esquina inferior
                derecha queda libre a proposito (el boton de girar se
                movio arriba a la izquierda) para que un nombre largo
                como Muescagrande nunca compita por espacio con un
                boton, sea cual sea el ancho de la tarjeta. */}
            <div className="absolute inset-x-1 bottom-2 flex justify-center">
              <span
                className="inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap rounded-sm bg-mar-800 px-[13.8px] py-[4.6px] text-[13.8px] font-normal text-white"
                title={individuo.nombre}
              >
                {individuo.nombre}
              </span>
            </div>
          </div>

          {/* Dorso: estampilla, codigo, nombre, lugar, ver historia -
              no existe si no hay nada que mostrar en el (sin
              estampilla ni historia no hay boton de girar que lleve
              hasta aca, pero tampoco se monta el contenido). pb-14
              extra abajo: el contenido esta centrado verticalmente y
              con historias largas (Muescagrande) el boton "Ver
              historia" quedaba pegado al boton de volver, fijo en la
              esquina inferior derecha - se reserva ese espacio en vez
              de dejar que el centrado lo invada. */}
          {tieneReverso && (
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center gap-2 overflow-hidden bg-arena-200 p-4 pb-14 text-center ${MARCO}`}
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
              {individuo.historia && (
                <button
                  type="button"
                  onClick={() => onAbrirHistoria(individuo)}
                  tabIndex={girada ? 0 : -1}
                  aria-label={`Ver la historia de ${individuo.nombre}`}
                  className={`mt-1 mr-14 flex min-h-11 items-center justify-center rounded-full bg-marca-oscuro px-4 text-sm font-medium text-white hover:bg-marca-oscuro/90 ${FOCUS_RING}`}
                >
                  Ver historia
                </button>
              )}
              <button
                ref={btnDorsoRef}
                type="button"
                onClick={girar}
                onKeyDown={onKeyDownGirar}
                tabIndex={girada ? 0 : -1}
                aria-label={`Volver al frente de la figurita de ${individuo.nombre}`}
                className={`absolute bottom-2 right-2 flex h-11 w-11 items-center justify-center rounded-full bg-mar-900/70 text-white hover:bg-mar-900/90 ${FOCUS_RING}`}
              >
                <ArrowUturnLeftIcon className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>
      {lupaAbierta && (
        <LightboxFoto
          foto={individuo.fotos[0]}
          nombre={individuo.nombre}
          onCerrar={() => setLupaAbierta(false)}
        />
      )}
    </div>
  );
}
