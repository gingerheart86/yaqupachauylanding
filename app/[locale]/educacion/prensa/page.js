import Image from "next/image";
import {
  NewspaperIcon,
  VideoCameraIcon,
  MicrophoneIcon,
  Bars3BottomLeftIcon,
} from "@heroicons/react/24/outline";
import { Section, PageHeader } from "../../../../components/ui";
import { getPrensa } from "../../../../lib/prensa";
import { alternatesPara } from "../../../../lib/i18n";

// Solo espanol - seccion 3 del doc de fase 3 bloque 1.
export async function generateStaticParams() {
  return [{ locale: "es" }];
}
export const dynamicParams = false;

export const metadata = {
  title: "Prensa y divulgación",
  description:
    "Notas de prensa, videos, charlas y materiales de divulgación sobre las toninas y la conservación de la costa uruguaya.",
  alternates: alternatesPara("educacion/prensa", { soloEs: true }),
};

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-marca focus-visible:ring-offset-2";

// Miniatura generica por tipo cuando no hay imagen cargada - nunca un
// hueco vacio. docs/correcciones-revision-local.md punto 4.
const ICONO_POR_TIPO = {
  Nota: NewspaperIcon,
  Video: VideoCameraIcon,
  Radio: MicrophoneIcon,
  Podcast: MicrophoneIcon,
  Otro: Bars3BottomLeftIcon,
};

function MiniaturaGenerica({ tipo }) {
  const Icono = ICONO_POR_TIPO[tipo] ?? Bars3BottomLeftIcon;
  return (
    <div className="flex h-full w-full items-center justify-center bg-costa-100">
      <Icono className="h-10 w-10 text-marca-grafito/50" aria-hidden="true" />
    </div>
  );
}

function fechaLegibleCorta(entrada) {
  if (!entrada.fecha) return null;
  const m = /^(\d{4})-(\d{2})-XX$/.exec(entrada.fecha);
  const MESES = [
    "ene", "feb", "mar", "abr", "may", "jun",
    "jul", "ago", "sep", "oct", "nov", "dic",
  ];
  if (m) return `${MESES[Number(m[2]) - 1]}. ${m[1]}`;
  if (/^\d{4}$/.test(entrada.fecha)) return entrada.fecha;
  const d = new Date(entrada.fecha);
  if (isNaN(d)) return entrada.fecha;
  return new Intl.DateTimeFormat("es-UY", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(d);
}

function urlFiltro({ anio, tipo }) {
  const params = new URLSearchParams();
  if (anio) params.set("anio", anio);
  if (tipo) params.set("tipo", tipo);
  const qs = params.toString();
  return `/es/educacion/prensa${qs ? `?${qs}` : ""}`;
}

export default function Page({ searchParams }) {
  const anioFiltro = searchParams?.anio || null;
  const tipoFiltro = searchParams?.tipo || null;

  let entradas = getPrensa();
  if (anioFiltro) entradas = entradas.filter((e) => e.anio === anioFiltro || (anioFiltro === "sin-fecha" && !e.anio));
  if (tipoFiltro) entradas = entradas.filter((e) => e.tipo === tipoFiltro);

  const todos = getPrensa();
  const todosLosAnios = [...new Set(todos.map((e) => e.anio).filter(Boolean))].sort((a, b) => b - a);
  const hayNoFechadas = todos.some((e) => !e.anio);
  const todosLosTipos = [...new Set(todos.map((e) => e.tipo))].sort();

  const porAnio = new Map();
  for (const entrada of entradas) {
    const clave = entrada.anio || "sin-fecha";
    if (!porAnio.has(clave)) porAnio.set(clave, []);
    porAnio.get(clave).push(entrada);
  }
  const claves = [...porAnio.keys()].sort((a, b) => {
    if (a === "sin-fecha") return 1;
    if (b === "sin-fecha") return -1;
    return b - a;
  });

  return (
    <Section fondo="claro">
      <PageHeader title="Prensa y divulgación" />

      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-marca-grafito">Año:</span>
          <a
            href={urlFiltro({ tipo: tipoFiltro })}
            className={`rounded-full px-3 py-1 ${FOCUS_RING} ${!anioFiltro ? "bg-marca-oscuro text-white" : "bg-costa-100 text-marca-oscuro hover:bg-costa-300"}`}
          >
            Todos
          </a>
          {todosLosAnios.map((a) => (
            <a
              key={a}
              href={urlFiltro({ anio: a, tipo: tipoFiltro })}
              className={`rounded-full px-3 py-1 ${FOCUS_RING} ${anioFiltro === a ? "bg-marca-oscuro text-white" : "bg-costa-100 text-marca-oscuro hover:bg-costa-300"}`}
            >
              {a}
            </a>
          ))}
          {hayNoFechadas && (
            <a
              href={urlFiltro({ anio: "sin-fecha", tipo: tipoFiltro })}
              className={`rounded-full px-3 py-1 ${FOCUS_RING} ${anioFiltro === "sin-fecha" ? "bg-marca-oscuro text-white" : "bg-costa-100 text-marca-oscuro hover:bg-costa-300"}`}
            >
              Sin fecha
            </a>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-marca-grafito">Tipo:</span>
          <a
            href={urlFiltro({ anio: anioFiltro })}
            className={`rounded-full px-3 py-1 ${FOCUS_RING} ${!tipoFiltro ? "bg-marca-oscuro text-white" : "bg-costa-100 text-marca-oscuro hover:bg-costa-300"}`}
          >
            Todos
          </a>
          {todosLosTipos.map((t) => (
            <a
              key={t}
              href={urlFiltro({ anio: anioFiltro, tipo: t })}
              className={`rounded-full px-3 py-1 ${FOCUS_RING} ${tipoFiltro === t ? "bg-marca-oscuro text-white" : "bg-costa-100 text-marca-oscuro hover:bg-costa-300"}`}
            >
              {t}
            </a>
          ))}
        </div>
      </div>

      {entradas.length === 0 && (
        <p className="mt-8 text-center text-texto">No hay entradas que coincidan con este filtro.</p>
      )}

      <div className="mt-10 max-w-4xl mx-auto space-y-10">
        {claves.map((clave) => (
          <div key={clave}>
            <h2 className="text-xl font-semibold text-mar-800 border-b border-marca-grafito/20 pb-2">
              {clave === "sin-fecha" ? "Anteriores" : clave}
            </h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {porAnio.get(clave).map((entrada) => {
                const Envoltorio = entrada.url ? "a" : "div";
                return (
                  <Envoltorio
                    key={entrada.slug}
                    {...(entrada.url ? { href: entrada.url, target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={`flex gap-4 rounded-lg border-[0.5px] border-marca-grafito/20 p-3 ${entrada.url ? `hover:bg-costa-100 ${FOCUS_RING}` : ""}`}
                  >
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md">
                      {entrada.miniatura ? (
                        <Image
                          src={entrada.miniatura}
                          alt={entrada.alt || entrada.titulo}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      ) : (
                        <MiniaturaGenerica tipo={entrada.tipo} />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wide text-marca-oscuro">
                        {entrada.tipo}
                      </p>
                      <h3 className="mt-0.5 font-semibold text-mar-800 line-clamp-2">
                        {entrada.titulo}
                      </h3>
                      <p className="mt-1 text-sm text-marca-grafito">
                        {entrada.medio}
                        {fechaLegibleCorta(entrada) && <> · {fechaLegibleCorta(entrada)}</>}
                      </p>
                    </div>
                  </Envoltorio>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
