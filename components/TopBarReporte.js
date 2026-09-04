import { EyeIcon, ExclamationTriangleIcon, MapIcon } from "@heroicons/react/24/outline";
import { getDictionary } from "../lib/i18n";
import { WHATSAPP_VARAMIENTOS } from "../lib/contacto";

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-mar-900";

// Franja delgada arriba del navbar, en todas las paginas (no solo la
// portada) - seccion 3 de docs/fase3-navegacion-portada.md. Dos
// urgencias distintas, dos colores distintos: un avistamiento se
// reporta con calma (marca/cian), un varamiento requiere respuesta
// inmediata (acento.medusa, tono de alerta). El mapa es una consulta
// frecuente, no una urgencia, por eso va en tono neutro.
//
// Tres botones, no cuatro - docs/correcciones-revision-local.md punto
// 7: "con cuatro llamados a la accion se anulan entre si". "Sumate
// como voluntaria" no es una urgencia ni una consulta frecuente, va
// en el menu Colabora en vez de esta barra.
//
// Sin telefono suelto en la barra (docs/fase2-correcciones.md punto
// 3). El numero sigue visible como texto en BloqueReporte (pie de
// cada ficha de especie) y en /colabora/contacto.
export default function TopBarReporte({ locale = "es" }) {
  const dict = getDictionary(locale);

  return (
    <div className="bg-mar-900 text-white">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 py-1.5 text-xs sm:text-sm">
          <a
            href={`/${locale}/colabora/reportar-avistamiento`}
            className={`inline-flex items-center gap-1.5 rounded-full bg-marca-oscuro px-3 py-1 font-medium text-white hover:bg-mar-900 ${FOCUS_RING}`}
          >
            <EyeIcon className="h-4 w-4" aria-hidden="true" />
            {dict.common.reportarAvistamiento}
          </a>
          <a
            href={WHATSAPP_VARAMIENTOS}
            className={`inline-flex items-center gap-1.5 rounded-full bg-acento-medusa px-3 py-1 font-medium text-black hover:bg-acento-medusa/80 ${FOCUS_RING}`}
          >
            <ExclamationTriangleIcon className="h-4 w-4" aria-hidden="true" />
            {dict.common.reportarVaramiento}
          </a>
          <a
            href={`/${locale}/avistamientos`}
            className={`inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3 py-1 font-medium text-white hover:bg-white/20 ${FOCUS_RING}`}
          >
            <MapIcon className="h-4 w-4" aria-hidden="true" />
            {dict.common.mapaAvistamientos}
          </a>
        </div>
      </div>
    </div>
  );
}
