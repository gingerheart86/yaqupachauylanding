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
  title: "Materiales educativos",
  description:
    "Materiales educativos de Yaqu Pacha Uruguay para descargar e imprimir.",
  alternates: alternatesPara("educacion/materiales", { soloEs: true }),
};

// Disponibles: ver doc de revision final, seccion 2 (mapa de Yez) y el
// TODO general (ciclo de vida, ficha franciscana, trivia). Las siluetas
// para colorear siguen sin archivo, se listan como pendientes en vez de
// con un link roto.
const RECURSOS = [
  {
    slug: "mapa-ilustrado-costa",
    titulo: "Mapa ilustrado de la costa uruguaya",
    descripcion:
      "Mapa ilustrado por Yez de la costa de Rocha, con la ecología de la tonina y ejemplos del catálogo de foto-identificación. No es un mapa interactivo — el mapa en vivo de avistamientos está en /avistamientos.",
    thumb: "/recursos/mapa-ilustrado-costa-thumb.webp",
    descargas: [
      { label: "Descargar imagen (JPG, 0,9 MB)", href: "/recursos/mapa-ilustrado-costa.jpg" },
    ],
  },
  {
    slug: "ciclo-de-vida-toninas",
    titulo: "Ciclo de vida de las toninas",
    descripcion:
      "Infografía educativa con preguntas para completar en familia, sobre gestación, cría, madurez y longevidad de las toninas.",
    thumb: "/recursos/ciclo-de-vida-toninas-thumb.webp",
    descargas: [
      { label: "Descargar (JPG, 263 KB)", href: "/recursos/ciclo-de-vida-toninas.jpg" },
    ],
  },
  {
    slug: "ficha-franciscana",
    titulo: "Ficha de franciscana — Expo Tramas Infinitas",
    descripcion:
      'Ficha de la franciscana elaborada por la Dra. Julia Rouaux para la exposición itinerante "Tramas Infinitas".',
    thumb: "/recursos/ficha-franciscana-thumb.webp",
    descargas: [
      { label: "Descargar (JPG, 205 KB)", href: "/recursos/ficha-franciscana.jpg" },
    ],
  },
  {
    slug: "trivia-del-mar",
    titulo: "La Trivia del Mar",
    descripcion:
      "Juego de cartas de preguntas y respuestas sobre el océano y los cetáceos, para armar imprimiendo las dos caras y recortando.",
    thumb: "/recursos/trivia-del-mar-thumb.webp",
    descargas: [
      { label: "Frente — preguntas (PDF, 244 KB)", href: "/recursos/trivia-del-mar-frente.pdf" },
      { label: "Dorso — para imprimir doble faz (PDF, 1 MB)", href: "/recursos/trivia-del-mar-dorso.pdf" },
    ],
  },
];

const PENDIENTES = ["Silueta de tonina para colorear", "Silueta de ballena para colorear"];

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-marca focus-visible:ring-offset-2";

export default function Page() {
  return (
    <Section fondo="claro">
      <PageHeader
        title="Materiales educativos"
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
              <div className="mt-4 flex flex-col gap-2">
                {r.descargas.map((d) => (
                  <a
                    key={d.href}
                    href={d.href}
                    download
                    className={`inline-flex items-center gap-2 rounded-md bg-marca-oscuro px-4 py-2 text-sm font-medium text-white hover:bg-marca-oscuro/90 ${FOCUS_RING}`}
                  >
                    <ArrowDownTrayIcon className="h-4 w-4" aria-hidden="true" />
                    {d.label}
                  </a>
                ))}
              </div>
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
