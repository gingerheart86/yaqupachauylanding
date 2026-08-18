import Image from "next/image";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { Section, PageHeader } from "../../../../components/ui";
import { alternatesPara } from "../../../../lib/i18n";

// Solo espanol - seccion 3 del doc de fase 3 bloque 1.
export async function generateStaticParams() {
  return [{ locale: "es" }];
}
export const dynamicParams = false;

export const metadata = {
  title: "Recursos descargables",
  description:
    "Materiales educativos de Yaqu Pacha Uruguay para descargar e imprimir.",
  alternates: alternatesPara("educacion/recursos", { soloEs: true }),
};

// Disponibles: ver TODO general - "Educacion ambiental > Recursos
// descargables". Trivia del mar y las siluetas para colorear siguen
// sin archivo, asi que se listan como pendientes en vez de con un
// link roto.
const RECURSOS = [
  {
    slug: "ciclo-de-vida-toninas",
    titulo: "Ciclo de vida de las toninas",
    descripcion:
      "Infografía educativa con preguntas para completar en familia, sobre gestación, cría, madurez y longevidad de las toninas.",
    thumb: "/recursos/ciclo-de-vida-toninas-thumb.webp",
    archivo: "/recursos/ciclo-de-vida-toninas.jpg",
    formato: "JPG",
    peso: "263 KB",
  },
  {
    slug: "ficha-franciscana",
    titulo: "Ficha de franciscana — Expo Tramas Infinitas",
    descripcion:
      'Ficha de la franciscana elaborada por la Dra. Julia Rouaux para la exposición itinerante "Tramas Infinitas".',
    thumb: "/recursos/ficha-franciscana-thumb.webp",
    archivo: "/recursos/ficha-franciscana.jpg",
    formato: "JPG",
    peso: "205 KB",
  },
];

const PENDIENTES = ["Trivia del mar", "Silueta de tonina para colorear", "Silueta de ballena para colorear"];

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-marca focus-visible:ring-offset-2";

export default function Page() {
  return (
    <Section fondo="claro">
      <PageHeader
        title="Recursos descargables"
        description="Materiales de Yaqu Pacha Uruguay para descargar, imprimir y usar en casa o en el aula."
      />

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {RECURSOS.map((r) => (
          <div
            key={r.slug}
            className="overflow-hidden rounded-lg border-[0.5px] border-marca-grafito/20"
          >
            <div className="relative aspect-[4/3] w-full bg-costa-100">
              <Image
                src={r.thumb}
                alt=""
                fill
                className="object-cover"
                sizes="(min-width: 640px) 448px, 100vw"
              />
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-mar-800">{r.titulo}</h3>
              <p className="mt-1 text-sm text-texto">{r.descripcion}</p>
              <a
                href={r.archivo}
                download
                className={`mt-4 inline-flex items-center gap-2 rounded-md bg-marca-oscuro px-4 py-2 text-sm font-medium text-white hover:bg-marca-oscuro/90 ${FOCUS_RING}`}
              >
                <ArrowDownTrayIcon className="h-4 w-4" aria-hidden="true" />
                Descargar ({r.formato}, {r.peso})
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-lg border-[0.5px] border-dashed border-marca-grafito/40 bg-costa-100 p-6">
        <p className="font-semibold text-mar-800">Próximamente</p>
        <ul className="mt-2 list-disc list-inside text-texto">
          {PENDIENTES.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>

      <p className="mt-8 text-center text-sm text-marca-grafito">
        Ilustraciones: Yez.
      </p>
    </Section>
  );
}
