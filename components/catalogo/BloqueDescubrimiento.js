import Image from "next/image";
import Link from "next/link";
import { getIndividuos } from "../../lib/catalogo";
import { PROYECTOS_CON_CATALOGO } from "../../lib/proyectos-catalogo";

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-marca focus-visible:ring-offset-2";

// Bloque destacado hacia el catalogo, para la pagina de especie -
// "no un link al pie". docs/correcciones-revision-local.md punto 5,
// docs/catalogo-figuritas-y-voluntariado.md ("Descubrimiento desde la
// especie"). No renderiza nada si el proyecto todavia no tiene
// ningun individuo publicado - no hay nada que descubrir todavia.
export function BloqueDescubrimiento({ proyecto, locale = "es" }) {
  const individuos = getIndividuos(proyecto);
  if (individuos.length === 0) return null;

  const info = PROYECTOS_CON_CATALOGO[proyecto];
  const esIngles = locale === "en";
  const muestra = individuos.find((i) => i.stamp) ?? individuos[0];

  return (
    <Link
      href={`/${locale}/investigacion/${proyecto}/catalogo`}
      className={`mt-10 flex items-center gap-6 rounded-xl border-2 border-marca bg-costa-100 p-6 hover:bg-costa-300 ${FOCUS_RING}`}
    >
      {muestra.stamp && (
        <div className="relative h-20 w-20 shrink-0 sm:h-24 sm:w-24">
          <Image src={muestra.stamp} alt="" aria-hidden="true" fill className="object-contain" sizes="96px" />
        </div>
      )}
      <div>
        <p className="text-lg font-semibold text-mar-800">
          {esIngles ? "Meet our identified individuals" : "Conocé a los individuos identificados"}
        </p>
        <p className="mt-1 text-marca-grafito">
          {individuos.length}{" "}
          {esIngles
            ? individuos.length === 1
              ? `individual identified — ${info?.nombre_en ?? proyecto} catalogue`
              : `individuals identified — ${info?.nombre_en ?? proyecto} catalogue`
            : individuos.length === 1
              ? `individuo identificado — catálogo de ${info?.nombre ?? proyecto}`
              : `individuos identificados — catálogo de ${info?.nombre ?? proyecto}`}
        </p>
      </div>
    </Link>
  );
}
