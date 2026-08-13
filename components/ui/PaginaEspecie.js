import Image from "next/image";
import Link from "next/link";
import Section from "./Section";
import Garabato from "./Garabato";
import TodoAviso from "../TodoAviso";
import BloqueReporte from "../BloqueReporte";
import { SILUETAS } from "../../lib/especies";

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-marca focus-visible:ring-offset-2";

export default function PaginaEspecie({
  slug,
  nombreComun,
  nombreCientifico,
  imagen,
  proyectosAsociados = [],
  locale = "es",
  todo = false,
  children,
}) {
  const silueta = SILUETAS[slug];

  return (
    <>
      <div className="relative bg-mar-800 py-16 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        {silueta && (
          <div className="relative mx-auto w-full max-w-md">
            <Image
              src={silueta.src}
              alt={`Silueta de ${nombreComun}`}
              width={silueta.width}
              height={silueta.height}
              className="mx-auto w-full h-auto"
              priority
            />
          </div>
        )}
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {nombreComun}
        </h1>
        {nombreCientifico && (
          <p className="mt-2 italic text-mar-100">{nombreCientifico}</p>
        )}
      </div>

      <Section fondo="claro" className="relative">
        <Garabato
          numero={2}
          registro="neutro"
          width={140}
          className="absolute right-4 top-4 hidden sm:block"
        />
        <div className="relative mx-auto max-w-5xl text-lg">
          {imagen && (
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
              <Image
                src={imagen.src}
                alt={imagen.alt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 1024px, 100vw"
              />
            </div>
          )}

          {todo ? (
            <TodoAviso locale={locale} />
          ) : (
            <div className={imagen ? "mt-8" : ""}>{children}</div>
          )}

          {proyectosAsociados.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-semibold text-mar-800">
                {locale === "en" ? "Related projects" : "Proyectos asociados"}
              </h2>
              <ul className="mt-4 flex flex-wrap gap-3">
                {proyectosAsociados.map((p) => (
                  <li key={p.href}>
                    <Link
                      href={p.href}
                      className={`inline-block rounded-md border-[0.5px] border-marca-grafito/20 px-4 py-2 text-marca-oscuro hover:bg-costa-100 ${FOCUS_RING}`}
                    >
                      {p.nombre}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Section>
      <BloqueReporte tipo="avistamiento" locale={locale} />
    </>
  );
}
