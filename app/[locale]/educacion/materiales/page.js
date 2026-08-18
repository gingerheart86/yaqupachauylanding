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
// TODO general (ciclo de vida, ficha franciscana, trivia). Formato de
// entrega: PDF listo para imprimir, en resolucion de impresion (no
// reducidos como imagenes web) - se convirtieron con img2pdf a partir
// de los JPG/PNG originales, o re-renderizando el PDF original cuando
// hacia falta (ver el commit: el mapa venia en un PDF de 415 MB).
// Las siluetas para colorear siguen sin archivo, se listan como
// pendientes en vez de con un link roto.
const RECURSOS = [
  {
    slug: "mapa-ilustrado-costa",
    titulo: "Mapa ilustrado de la costa uruguaya",
    descripcion:
      "Mapa ilustrado por Yez de la costa de Rocha, con la ecología de la tonina y ejemplos del catálogo de foto-identificación. No es un mapa interactivo — el mapa en vivo de avistamientos está en /avistamientos.",
    thumb: "/recursos/mapa-ilustrado-costa-thumb.webp",
    archivo: "/recursos/mapa-ilustrado-costa.pdf",
    formato: "PDF",
    peso: "7,7 MB",
  },
  {
    slug: "ciclo-de-vida-toninas",
    titulo: "Ciclo de vida de las toninas",
    descripcion:
      "Infografía educativa con preguntas para completar en familia, sobre gestación, cría, madurez y longevidad de las toninas.",
    thumb: "/recursos/ciclo-de-vida-toninas-thumb.webp",
    archivo: "/recursos/ciclo-de-vida-toninas.pdf",
    formato: "PDF",
    peso: "2,3 MB",
  },
  {
    slug: "ficha-franciscana",
    titulo: "Ficha de franciscana — Expo Tramas Infinitas",
    descripcion:
      'Ficha de la franciscana elaborada por la Dra. Julia Rouaux para la exposición itinerante "Tramas Infinitas".',
    thumb: "/recursos/ficha-franciscana-thumb.webp",
    archivo: "/recursos/ficha-franciscana.pdf",
    formato: "PDF",
    peso: "570 KB",
  },
  {
    slug: "trivia-del-mar-frente",
    titulo: "La Trivia del Mar — frente (preguntas)",
    descripcion:
      "Juego de cartas de preguntas y respuestas sobre el océano y los cetáceos. Este archivo es el frente; imprimir junto con el dorso, a doble faz, y recortar.",
    thumb: "/recursos/trivia-del-mar-thumb.webp",
    archivo: "/recursos/trivia-del-mar-frente.pdf",
    formato: "PDF",
    peso: "244 KB",
  },
  {
    slug: "trivia-del-mar-dorso",
    titulo: "La Trivia del Mar — dorso",
    descripcion:
      "Reverso de las cartas, con el logo de Yaqu Pacha Uruguay. Se imprime a doble faz junto con el frente.",
    thumb: "/recursos/trivia-del-mar-thumb.webp",
    archivo: "/recursos/trivia-del-mar-dorso.pdf",
    formato: "PDF",
    peso: "1 MB",
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
              <p className="mt-2 text-xs uppercase tracking-wide text-marca-grafito">
                {r.formato} · {r.peso}
              </p>
              <a
                href={r.archivo}
                download
                className={`mt-3 inline-flex items-center gap-2 rounded-md bg-marca-oscuro px-4 py-2 text-sm font-medium text-white hover:bg-marca-oscuro/90 ${FOCUS_RING}`}
              >
                <ArrowDownTrayIcon className="h-4 w-4" aria-hidden="true" />
                Descargar
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
