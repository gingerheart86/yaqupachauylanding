import { Section, PageHeader } from "../../../../components/ui";
import { getPublicaciones } from "../../../../lib/publicaciones";
import { alternatesPara } from "../../../../lib/i18n";

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export function generateMetadata({ params: { locale } }) {
  const alternates = alternatesPara("investigacion/publicaciones");
  if (locale === "en") {
    return {
      title: "Scientific publications",
      description:
        "Scientific articles about the toninas of Uruguay: ecology, behaviour, genetics, social structure and acoustic communication.",
      alternates,
    };
  }
  return {
    title: "Publicaciones científicas",
    description:
      "Artículos científicos sobre las toninas de Uruguay: ecología, comportamiento, genética, estructura social y comunicación acústica.",
    alternates,
  };
}

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-marca focus-visible:ring-offset-2";

// autores se guarda como texto plano con **Nombre** para resaltar a
// integrantes del equipo (config.yml, coleccion "publicaciones") - no
// es markdown completo, solo negrita simple.
function Autores({ texto }) {
  const partes = (texto ?? "").split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {partes.map((parte, i) =>
        parte.startsWith("**") && parte.endsWith("**") ? (
          <strong key={i}>{parte.slice(2, -2)}</strong>
        ) : (
          <span key={i}>{parte}</span>
        )
      )}
    </>
  );
}

function urlFiltro({ especie, proyecto }) {
  const params = new URLSearchParams();
  if (especie) params.set("especie", especie);
  if (proyecto) params.set("proyecto", proyecto);
  const qs = params.toString();
  return `/es/investigacion/publicaciones${qs ? `?${qs}` : ""}`;
}

export default function Page({ params: { locale }, searchParams }) {
  const esIngles = locale === "en";
  const especieFiltro = searchParams?.especie || null;
  const proyectoFiltro = searchParams?.proyecto || null;

  let publicaciones = getPublicaciones();
  if (especieFiltro) publicaciones = publicaciones.filter((p) => p.especie.includes(especieFiltro));
  if (proyectoFiltro) publicaciones = publicaciones.filter((p) => p.proyecto === proyectoFiltro);

  const todasLasEspecies = [...new Set(getPublicaciones().flatMap((p) => p.especie))].sort();
  const todosLosProyectos = [...new Set(getPublicaciones().map((p) => p.proyecto).filter(Boolean))].sort();

  const porAnio = new Map();
  for (const pub of publicaciones) {
    const anio = pub.anio ?? "?";
    if (!porAnio.has(anio)) porAnio.set(anio, []);
    porAnio.get(anio).push(pub);
  }
  const anios = [...porAnio.keys()].sort((a, b) => b - a);

  return (
    <Section fondo="claro">
      <PageHeader
        title={esIngles ? "Scientific publications" : "Publicaciones científicas"}
      />

      {(todasLasEspecies.length > 0 || todosLosProyectos.length > 0) && (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
          {todasLasEspecies.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-marca-grafito">Especie:</span>
              <a
                href={urlFiltro({ proyecto: proyectoFiltro })}
                className={`rounded-full px-3 py-1 ${FOCUS_RING} ${!especieFiltro ? "bg-marca-oscuro text-white" : "bg-costa-100 text-marca-oscuro hover:bg-costa-300"}`}
              >
                Todas
              </a>
              {todasLasEspecies.map((e) => (
                <a
                  key={e}
                  href={urlFiltro({ especie: e, proyecto: proyectoFiltro })}
                  className={`rounded-full px-3 py-1 ${FOCUS_RING} ${especieFiltro === e ? "bg-marca-oscuro text-white" : "bg-costa-100 text-marca-oscuro hover:bg-costa-300"}`}
                >
                  {e}
                </a>
              ))}
            </div>
          )}
          {todosLosProyectos.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-marca-grafito">Proyecto:</span>
              <a
                href={urlFiltro({ especie: especieFiltro })}
                className={`rounded-full px-3 py-1 ${FOCUS_RING} ${!proyectoFiltro ? "bg-marca-oscuro text-white" : "bg-costa-100 text-marca-oscuro hover:bg-costa-300"}`}
              >
                Todos
              </a>
              {todosLosProyectos.map((p) => (
                <a
                  key={p}
                  href={urlFiltro({ especie: especieFiltro, proyecto: p })}
                  className={`rounded-full px-3 py-1 ${FOCUS_RING} ${proyectoFiltro === p ? "bg-marca-oscuro text-white" : "bg-costa-100 text-marca-oscuro hover:bg-costa-300"}`}
                >
                  {p}
                </a>
              ))}
            </div>
          )}
        </div>
      )}

      {publicaciones.length === 0 && (
        <p className="mt-8 text-center text-texto">No hay publicaciones que coincidan con este filtro.</p>
      )}

      <div className="mt-10 max-w-3xl mx-auto space-y-10">
        {anios.map((anio) => (
          <div key={anio}>
            <h2 className="text-xl font-semibold text-mar-800 border-b border-marca-grafito/20 pb-2">
              {anio}
            </h2>
            <ul role="list" className="mt-4 space-y-6">
              {porAnio.get(anio).map((pub) => (
                <li
                  key={pub.slug}
                  className={`text-texto ${pub.autoria_yaqu ? "border-l-4 border-marca pl-4" : ""}`}
                >
                  <p>
                    <Autores texto={pub.autores} /> ({pub.anio}). {pub.titulo}.{" "}
                    <span className="italic">{pub.revista}</span>
                    {pub.volumen && <>, {pub.volumen}</>}
                    {pub.paginas && <>: {pub.paginas}</>}.
                  </p>
                  <p className="mt-1 flex flex-wrap items-center gap-3 text-sm">
                    {pub.doi && (
                      <a
                        href={`https://doi.org/${pub.doi}`}
                        className={`text-marca-oscuro underline underline-offset-4 ${FOCUS_RING}`}
                      >
                        doi.org/{pub.doi}
                      </a>
                    )}
                    {pub.acceso_abierto && (
                      <span className="rounded-full bg-costa-100 px-2 py-0.5 text-marca-oscuro font-medium">
                        Acceso abierto
                      </span>
                    )}
                    {pub.autoria_yaqu && (
                      <span className="rounded-full bg-marca/10 px-2 py-0.5 text-marca-oscuro font-medium">
                        {esIngles ? "Yaqu Pacha authorship" : "Autoría de Yaqu Pacha"}
                      </span>
                    )}
                  </p>
                  {pub.resumen_es && (
                    <details className="mt-2">
                      <summary className={`cursor-pointer text-sm text-marca-oscuro ${FOCUS_RING}`}>
                        Resumen en español
                      </summary>
                      <p className="mt-2 text-sm">{pub.resumen_es}</p>
                    </details>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
