"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import arbol from "../content/guia-identificacion.json";
import { SILUETAS, ESPECIES } from "../lib/especies";
import {
  SURVEY123_TONINA_URL,
  TELEGRAM_BALLENASUY_URL,
  SURVEY123_GENERICO_URL,
} from "../lib/contacto";

// Arbol de decision para /colabora/identificacion, cargado de
// content/guia-identificacion.json (sin backend, funciona sin
// conexion una vez cargada la pagina). docs/panel-completo.md
// Bloque 6. El JSON de hoy es un placeholder: ver el campo "_aviso"
// ahi mismo. No publicar contenido real sin revision biologica.

// Especies con pagina propia con contenido real (no un TODO), para
// decidir si mostrar el enlace "conoce más" en el resultado.
const ESPECIES_CON_CONTENIDO = new Set(["tonina", "franciscana"]);

const URL_REPORTE_POR_ESPECIE = {
  tonina: SURVEY123_TONINA_URL,
  "ballena-franca": TELEGRAM_BALLENASUY_URL,
  franciscana: SURVEY123_GENERICO_URL,
  orca: SURVEY123_GENERICO_URL,
};

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-marca focus-visible:ring-offset-2";

function BotonReportarSinIdentificar({ locale }) {
  return (
    <Link
      href={`/${locale}/colabora/reportar-avistamiento`}
      className={`block text-center text-sm text-marca-oscuro underline underline-offset-4 ${FOCUS_RING}`}
    >
      {locale === "en"
        ? "Report without identifying it"
        : "Reportar sin identificar"}
    </Link>
  );
}

function PantallaResultado({ especieSlug, locale, onEmpezarDeNuevo }) {
  const esIngles = locale === "en";
  const especie = ESPECIES.find((e) => e.slug === especieSlug);
  const silueta = especieSlug ? SILUETAS[especieSlug] : null;
  const urlReporte = especieSlug ? URL_REPORTE_POR_ESPECIE[especieSlug] : null;

  if (!especie) {
    return (
      <div className="text-center">
        <p className="text-lg text-texto">
          {esIngles
            ? "We couldn't identify it with these answers."
            : "No pudimos identificarlo con estas respuestas."}
        </p>
        <p className="mt-2 text-texto">
          {esIngles
            ? "Report it anyway with a photo. A record with a photo and no ID is more useful than one identified by mistake."
            : "Reportalo igual con una foto. Un registro con foto sin identificar es más útil que uno identificado por error."}
        </p>
        <div className="mt-6">
          <Link
            href={`/${locale}/colabora/reportar-avistamiento`}
            className={`inline-block rounded-md bg-marca px-6 py-3 font-medium text-white hover:bg-marca-oscuro ${FOCUS_RING}`}
          >
            {esIngles ? "Report a sighting" : "Reportar un avistamiento"}
          </Link>
        </div>
        <button
          onClick={onEmpezarDeNuevo}
          className={`mt-6 block mx-auto text-sm text-marca-oscuro underline underline-offset-4 ${FOCUS_RING}`}
        >
          {esIngles ? "Start over" : "Empezar de nuevo"}
        </button>
      </div>
    );
  }

  return (
    <div className="text-center">
      {silueta && (
        <Image
          src={silueta.src}
          alt=""
          aria-hidden="true"
          width={200}
          height={Math.round((200 * silueta.height) / silueta.width)}
          className="mx-auto"
        />
      )}
      <h2 className="mt-4 text-2xl font-semibold text-mar-800">
        {especie.nombre[locale] ?? especie.nombre.es}
      </h2>
      <p className="italic text-marca-grafito">{especie.cientifico}</p>

      {ESPECIES_CON_CONTENIDO.has(especieSlug) && (
        <p className="mt-4">
          <Link
            href={`/${locale}/especies/${especieSlug}`}
            className={`text-marca-oscuro underline underline-offset-4 ${FOCUS_RING}`}
          >
            {esIngles ? "Learn more" : "Conoce más"}
          </Link>
        </p>
      )}

      {urlReporte && (
        <div className="mt-6">
          <a
            href={urlReporte}
            className={`inline-block rounded-md bg-marca px-6 py-3 font-medium text-white hover:bg-marca-oscuro ${FOCUS_RING}`}
          >
            {esIngles ? "Report this sighting" : "Reportar este avistamiento"}
          </a>
        </div>
      )}

      <button
        onClick={onEmpezarDeNuevo}
        className={`mt-6 block mx-auto text-sm text-marca-oscuro underline underline-offset-4 ${FOCUS_RING}`}
      >
        {esIngles ? "Start over" : "Empezar de nuevo"}
      </button>
    </div>
  );
}

export default function GuiaIdentificacion({ locale = "es" }) {
  const [nodoActualId, setNodoActualId] = useState(arbol.inicio);
  const nodo = arbol.nodos[nodoActualId];

  function reiniciar() {
    setNodoActualId(arbol.inicio);
  }

  if (!nodo) return null;

  return (
    <div className="max-w-xl mx-auto">
      {nodo.pregunta ? (
        <div className="text-center">
          <p className="text-xl font-semibold text-mar-800">{nodo.pregunta}</p>
          <div className="mt-6 flex flex-col gap-3">
            {nodo.opciones.map((op) => (
              <button
                key={op.texto}
                onClick={() => setNodoActualId(op.siguiente)}
                className={`rounded-md border-[0.5px] border-marca-grafito/20 px-6 py-3 text-mar-800 hover:bg-costa-100 ${FOCUS_RING}`}
              >
                {op.texto}
              </button>
            ))}
          </div>
          <div className="mt-8">
            <BotonReportarSinIdentificar locale={locale} />
          </div>
        </div>
      ) : (
        <>
          <PantallaResultado
            especieSlug={nodo.resultado}
            locale={locale}
            onEmpezarDeNuevo={reiniciar}
          />
          <div className="mt-4">
            <BotonReportarSinIdentificar locale={locale} />
          </div>
        </>
      )}
    </div>
  );
}
