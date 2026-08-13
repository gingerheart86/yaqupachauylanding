import Image from "next/image";
import Link from "next/link";
import Section from "./Section";
import TodoAviso from "../TodoAviso";
import BloqueReporte from "../BloqueReporte";

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-marca focus-visible:ring-offset-2";

export default function PaginaEspecie({
  nombreComun,
  nombreCientifico,
  imagen,
  proyectosAsociados = [],
  locale = "es",
  todo = false,
  children,
}) {
  return (
    <>
      <Section fondo="claro">
        <div className="mx-auto max-w-5xl text-lg">
          <div className="text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-mar-800 sm:text-4xl">
              {nombreComun}
            </h1>
            {nombreCientifico && (
              <p className="mt-2 italic text-texto opacity-80">
                {nombreCientifico}
              </p>
            )}
          </div>

          {imagen && (
            <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-lg">
              <Image
                src={imagen.src}
                alt={imagen.alt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 1024px, 100vw"
              />
            </div>
          )}

          {todo ? <TodoAviso locale={locale} /> : <div className="mt-8">{children}</div>}

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
