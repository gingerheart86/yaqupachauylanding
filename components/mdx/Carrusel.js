"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Foto } from "./Foto";

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-marca focus-visible:ring-offset-2";

// <Carrusel imagenes={[{src,alt,epigrafe,credito}]} /> o con hijos <Foto>.
// docs/correcciones-revision-local.md punto 2. Reemplaza el <Gallery>
// de investigacion/toninas (react-image-gallery), que no tenia alto
// fijo (saltaba de layout) ni alt por imagen.
//
// Con una sola imagen renderiza <Foto> sin controles - no tiene
// sentido un carrusel de un elemento. Solo se monta la imagen actual
// en el DOM (no todas), asi que las demas nunca cargan hasta que se
// navega a ellas - la forma mas simple de "carga diferida de las que
// no estan visibles" sin logica extra.
export function Carrusel({ imagenes, children }) {
  const items = normalizar(imagenes, children);

  const [indice, setIndice] = useState(0);
  const touchStartX = useRef(null);

  if (items.length === 0) return null;
  if (items.length === 1) return <Foto {...items[0]} ancho="completo" />;

  const actual = items[indice];

  function ir(nuevoIndice) {
    setIndice(((nuevoIndice % items.length) + items.length) % items.length);
  }

  function onKeyDown(e) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      ir(indice - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      ir(indice + 1);
    }
  }

  function onTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
  }

  function onTouchEnd(e) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    const UMBRAL = 40;
    if (delta > UMBRAL) ir(indice - 1);
    else if (delta < -UMBRAL) ir(indice + 1);
    touchStartX.current = null;
  }

  return (
    <figure
      className="my-8 w-full"
      role="group"
      aria-roledescription="carrusel"
      aria-label={actual.epigrafe || actual.alt}
      onKeyDown={onKeyDown}
    >
      <div
        className={`relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-costa-100 ${FOCUS_RING}`}
        tabIndex={0}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <Image
          key={actual.src}
          src={actual.src}
          alt={actual.alt || ""}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 1024px, 100vw"
          priority={indice === 0}
        />

        <button
          type="button"
          onClick={() => ir(indice - 1)}
          aria-label="Imagen anterior"
          className={`absolute left-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-mar-900/60 text-white hover:bg-mar-900/80 ${FOCUS_RING}`}
        >
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => ir(indice + 1)}
          aria-label="Imagen siguiente"
          className={`absolute right-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-mar-900/60 text-white hover:bg-mar-900/80 ${FOCUS_RING}`}
        >
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="absolute inset-x-0 bottom-2 flex justify-center gap-1.5">
          {items.map((item, i) => (
            <button
              key={item.src}
              type="button"
              onClick={() => ir(i)}
              aria-label={`Ir a la imagen ${i + 1} de ${items.length}`}
              aria-current={i === indice}
              className={`h-2 w-2 rounded-full ${FOCUS_RING} ${
                i === indice ? "bg-white" : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      </div>

      {(actual.epigrafe || actual.credito) && (
        <figcaption className="mt-2 text-sm text-marca-grafito text-center">
          {actual.epigrafe}
          {actual.credito && <span> · {actual.credito}</span>}
        </figcaption>
      )}
    </figure>
  );
}

function normalizar(imagenes, children) {
  if (Array.isArray(imagenes)) return imagenes.filter((it) => it && it.src);
  if (!children) return [];
  const hijos = Array.isArray(children) ? children : [children];
  return hijos
    .filter((child) => child && child.props && child.props.src)
    .map((child) => child.props);
}
