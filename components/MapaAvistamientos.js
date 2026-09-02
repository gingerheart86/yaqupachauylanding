"use client";

import { useEffect, useRef, useState } from "react";

const TIEMPO_ESPERA_MS = 8000;

// El visor de ArcGIS pesa varios MB (docs/correcciones-revision-local.md
// punto 7) - loading="lazy" en el iframe, y un aviso visible en vez de
// un rectangulo en blanco si no llega a cargar (bloqueo de red, ad
// blocker, o el propio servicio caido). Como es un iframe de otro
// origen, no hay forma confiable de detectar un error de carga mas
// alla de esperar el evento "load" con un limite de tiempo.
export default function MapaAvistamientos({ url, locale = "es" }) {
  const esIngles = locale === "en";
  const [cargado, setCargado] = useState(false);
  const [agotado, setAgotado] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!url) return;
    timeoutRef.current = setTimeout(() => setAgotado(true), TIEMPO_ESPERA_MS);
    return () => clearTimeout(timeoutRef.current);
  }, [url]);

  if (!url) {
    return (
      <div className="rounded-lg border-[0.5px] border-dashed border-marca-grafito/40 bg-costa-100 p-8 text-center">
        <p className="font-semibold text-mar-800">
          {esIngles ? "The map is on its way" : "El mapa está en preparación"}
        </p>
        <p className="mt-2 text-texto">
          {esIngles
            ? "We're setting up the sightings map. In the meantime, you can still report a sighting using the button above."
            : "Estamos preparando el mapa de avistamientos. Mientras tanto, igual puedes reportar un avistamiento con el botón de arriba."}
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      {!cargado && !agotado && (
        <div
          className="flex h-[480px] w-full items-center justify-center rounded-lg border-[0.5px] border-marca-grafito/20 bg-costa-100"
          aria-hidden="true"
        >
          <p className="text-marca-grafito">
            {esIngles ? "Loading map…" : "Cargando el mapa…"}
          </p>
        </div>
      )}

      {agotado && !cargado && (
        <div className="rounded-lg border-[0.5px] border-dashed border-marca-grafito/40 bg-costa-100 p-8 text-center">
          <p className="font-semibold text-mar-800">
            {esIngles ? "The map couldn't load" : "El mapa no llegó a cargar"}
          </p>
          <p className="mt-2 text-texto">
            {esIngles
              ? "You can open it directly in a new tab instead."
              : "Puedes abrirlo directo en una pestaña nueva."}
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block rounded-md bg-marca-oscuro px-6 py-3 font-medium text-white hover:bg-marca-oscuro/90"
          >
            {esIngles ? "Open the map" : "Abrir el mapa"}
          </a>
        </div>
      )}

      <iframe
        src={url}
        title={esIngles ? "Sightings map" : "Mapa de avistamientos"}
        loading="lazy"
        onLoad={() => setCargado(true)}
        className={`h-[480px] w-full rounded-lg border-[0.5px] border-marca-grafito/20 ${
          cargado ? "block" : "hidden"
        }`}
      />
    </div>
  );
}
