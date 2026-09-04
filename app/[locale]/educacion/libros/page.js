import Image from "next/image";
import Link from "next/link";
import { Section, PageHeader, Garabato } from "../../../../components/ui";
import { getPagina } from "../../../../lib/paginas";
import { getLibros } from "../../../../lib/libros";
import { alternatesPara } from "../../../../lib/i18n";

// Solo espanol - seccion 3 del doc de fase 3 bloque 1.
export async function generateStaticParams() {
  return [{ locale: "es" }];
}
export const dynamicParams = false;

export const metadata = {
  title: "Libros",
  description:
    "Los libros infantiles de Proyecto Toninas, ilustrados por Yez.",
  alternates: alternatesPara("educacion/libros", { soloEs: true }),
};

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-marca focus-visible:ring-offset-2";

export default function Page() {
  const pagina = getPagina("libros");
  const libros = getLibros();

  return (
    <Section fondo="textura" className="relative overflow-hidden">
      <Garabato
        numero={5}
        opacidad={15}
        width={280}
        className="absolute -left-8 -bottom-8 hidden sm:block"
      />
      <div className="flex justify-center">
        <Image
          src="/decor/clara-y-las-toninas.png"
          alt="Clara y las Toninas: una colección para sumergirnos en la ciencia, nuestra costa y acercarnos a las toninas"
          width={1000}
          height={736}
          className="w-full max-w-md h-auto"
          priority
        />
      </div>
      <PageHeader title={pagina.titulo} className="mt-4 sr-only" />

      {pagina.intro && (
        <p className="relative mt-6 max-w-2xl mx-auto text-center text-lg text-texto">
          {pagina.intro}
        </p>
      )}

      {libros.length === 0 ? (
        <p className="relative mt-10 text-center text-texto">
          Todavía no hay libros cargados.
        </p>
      ) : (
        <div className="relative mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {libros.map((libro) => (
            <Link
              key={libro.slug}
              href={`/es/educacion/libros/${libro.slug}`}
              className={`block overflow-hidden rounded-lg border-[0.5px] border-marca-grafito/20 bg-white ${FOCUS_RING}`}
            >
              <div className="relative aspect-square w-full bg-costa-100">
                {libro.tapa && (
                  <Image
                    src={libro.tapa}
                    alt={`Tapa de ${libro.titulo}`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                  />
                )}
                {!libro.disponible && (
                  <span className="absolute top-2 right-2 rounded-full bg-mar-900/80 px-2 py-0.5 text-xs font-semibold text-white">
                    Próximamente
                  </span>
                )}
              </div>
              <div className="p-3">
                <h3 className="text-sm font-semibold text-mar-800">{libro.titulo}</h3>
                {libro.sinopsis && (
                  <p className="mt-1 text-xs text-texto line-clamp-2">{libro.sinopsis}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="relative mt-12 flex justify-center">
        <Image
          src="/decor/logos-libros-blanco.png"
          alt="Proyecto Toninas, Yaqu Pacha Uruguay y editorial Krakatoa"
          width={1200}
          height={309}
          className="w-full max-w-xs h-auto"
        />
      </div>
      <p className="relative mt-4 text-center text-sm text-marca-grafito">
        Guion: Silvia Soler. Ilustraciones: Yez. Editorial: Krakatoa.
      </p>
    </Section>
  );
}
