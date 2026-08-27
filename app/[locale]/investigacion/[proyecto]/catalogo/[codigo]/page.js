import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section, PageHeader } from "../../../../../../components/ui";
import { getIndividuo, getSlugsDeProyecto } from "../../../../../../lib/catalogo";
import { PROYECTOS_CON_CATALOGO } from "../../../../../../lib/proyectos-catalogo";
import { alternatesPara } from "../../../../../../lib/i18n";
import { fechaLegible } from "../../../../../../lib/noticias";

// Mismo componente para los dos proyectos con catalogo - ver la
// grilla en la ruta padre.
export async function generateStaticParams() {
  return Object.keys(PROYECTOS_CON_CATALOGO).flatMap((proyecto) =>
    getSlugsDeProyecto(proyecto).flatMap((codigo) => [
      { locale: "es", proyecto, codigo },
      { locale: "en", proyecto, codigo },
    ])
  );
}
export const dynamicParams = false;

export function generateMetadata({ params: { proyecto, codigo } }) {
  const individuo = getIndividuo(proyecto, codigo);
  if (!individuo) return {};
  const alternates = alternatesPara(`investigacion/${proyecto}/catalogo/${codigo}`);
  return { title: `${individuo.nombre} (${individuo.codigo})`, alternates };
}

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-marca focus-visible:ring-offset-2";

export default function Page({ params: { locale, proyecto, codigo } }) {
  const info = PROYECTOS_CON_CATALOGO[proyecto];
  const individuo = getIndividuo(proyecto, codigo);
  if (!info || !individuo) notFound();
  const esIngles = locale === "en";

  return (
    <Section fondo="claro">
      <p className="text-center text-sm">
        <Link
          href={`/${locale}/investigacion/${proyecto}/catalogo`}
          className={`text-marca-oscuro underline underline-offset-4 ${FOCUS_RING}`}
        >
          ← {esIngles ? "Back to catalogue" : "Volver al catálogo"}
        </Link>
      </p>

      <PageHeader title={individuo.nombre} description={individuo.codigo} />

      {individuo.muerto && (
        <p className="mt-4 text-center">
          <span className="inline-block rounded-full bg-acento-medusa/20 px-3 py-1 text-sm font-semibold text-mar-800">
            {esIngles ? "Recorded dead" : "Registrado muerto"}
          </span>
        </p>
      )}

      {individuo.fotos.length > 0 && (
        <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
          {individuo.fotos.map((foto, i) => (
            <figure key={i}>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-costa-100">
                {foto.src && (
                  <Image
                    src={foto.src}
                    alt={foto.vista || individuo.nombre}
                    fill
                    className="object-cover"
                    sizes="(min-width: 640px) 448px, 100vw"
                  />
                )}
              </div>
              {foto.vista && (
                <figcaption className="mt-1 text-sm text-marca-grafito text-center">
                  {foto.vista}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}

      <div className="mt-8 max-w-2xl mx-auto space-y-4 text-texto">
        {individuo.descripcion && <p>{individuo.descripcion}</p>}

        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
          {individuo.sexo && (
            <div>
              <dt className="font-semibold text-mar-800">{esIngles ? "Sex" : "Sexo"}</dt>
              <dd>{individuo.sexo}</dd>
            </div>
          )}
          {individuo.primer_avistamiento && (
            <div>
              <dt className="font-semibold text-mar-800">
                {esIngles ? "First sighting" : "Primer avistamiento"}
              </dt>
              <dd>{fechaLegible(individuo.primer_avistamiento)}</dd>
            </div>
          )}
          {individuo.ultimo_avistamiento && (
            <div>
              <dt className="font-semibold text-mar-800">
                {esIngles ? "Last sighting" : "Último avistamiento"}
              </dt>
              <dd>{fechaLegible(individuo.ultimo_avistamiento)}</dd>
            </div>
          )}
        </dl>

        {individuo.libro && (
          // El enlace se activa cuando exista /educacion/libros/[slug] -
          // esa pagina individual todavia no existe (Bloque 5 solo
          // preparaba el campo). Mientras tanto se muestra como texto.
          <p className="text-sm text-marca-grafito">
            {esIngles ? "Appears in the book" : "Aparece en el libro"}: {individuo.libro}
          </p>
        )}
      </div>
    </Section>
  );
}
