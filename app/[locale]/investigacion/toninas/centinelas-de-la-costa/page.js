import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Section, PageHeader, Garabato } from "../../../../../components/ui";
import { Carrusel } from "../../../../../components/mdx/Carrusel";
import { alternatesPara } from "../../../../../lib/i18n";
import { getContenidoProyecto } from "../../../../../lib/contenido-proyectos";
import { getMdxComponents } from "../../../../../lib/mdx-components";

const FOTOS_GALERIA = [
  { src: "/proytoninas/5.webp", alt: "Foto del Proyecto Toninas" },
  { src: "/proytoninas/1.webp", alt: "Foto del Proyecto Toninas" },
  { src: "/proytoninas/2.webp", alt: "Foto del Proyecto Toninas" },
  { src: "/proytoninas/3.webp", alt: "Foto del Proyecto Toninas" },
  { src: "/proytoninas/4.webp", alt: "Foto del Proyecto Toninas" },
  { src: "/toninas/4.webp", alt: "Tonina en la costa uruguaya" },
  { src: "/toninas/5.webp", alt: "Tonina en la costa uruguaya" },
  { src: "/toninas/6.webp", alt: "Tonina en la costa uruguaya" },
];

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-marca focus-visible:ring-offset-2";

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export function generateMetadata({ params: { locale } }) {
  const alternates = alternatesPara("investigacion/toninas/centinelas-de-la-costa");
  if (locale === "en") {
    return {
      title: "Toninas Centinelas of the Coast",
      description:
        "Monitoring, environmental education and coastal management training, funded by ECOSSUR (2021-2022).",
      alternates,
    };
  }
  return {
    title: "Toninas, centinelas de la costa",
    description:
      "Monitoreo, educación ambiental y capacitación para la gestión costera, financiado por ECOSSUR (2021-2022).",
    alternates,
  };
}

export default function Page({ params: { locale } }) {
  const esIngles = locale === "en";
  const proyecto = getContenidoProyecto("centinelas-de-la-costa");
  const nombre = esIngles ? proyecto.nombre_en : proyecto.nombre;
  const cuerpo = esIngles ? proyecto.body_en : proyecto.content;

  return (
    <Section fondo="claro">
      <p className="text-center text-sm">
        <Link
          href={`/${locale}/investigacion/toninas`}
          className={`text-marca-oscuro underline underline-offset-4 ${FOCUS_RING}`}
        >
          ← {esIngles ? "Proyecto Toninas" : "Proyecto Toninas"}
        </Link>
      </p>

      <PageHeader title={nombre} className="mt-6" />

      <div className="prose max-w-none text-texto [&_p]:text-base [&_p]:leading-8 [&_p+p]:mt-8">
        <MDXRemote source={cuerpo} components={getMdxComponents(locale)} />
      </div>

      <div className="mt-8 flex justify-center">
        <Garabato numero={4} registro="alto" width={90} />
      </div>
      <h2 className="mt-4 block text-center text-3xl font-semibold tracking-tight text-mar-800 sm:text-3xl">
        {esIngles ? "Photo gallery" : "Galería de fotos"}
      </h2>
      <div className="max-w-5xl w-full mx-auto">
        <Carrusel imagenes={FOTOS_GALERIA} />
      </div>
    </Section>
  );
}
