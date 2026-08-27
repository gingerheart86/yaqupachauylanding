import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Carrusel } from "../../../../components/mdx/Carrusel";
import { Section, PageHeader, Garabato } from "../../../../components/ui";
import { alternatesPara } from "../../../../lib/i18n";
import { getContenidoProyecto } from "../../../../lib/contenido-proyectos";
import { getMdxComponents } from "../../../../lib/mdx-components";

// Mismas 8 fotos que tenia components/imagegallery.js (react-image-gallery,
// sin alto fijo - saltaba de layout al cambiar de imagen). docs/correcciones-revision-local.md
// punto 2.
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

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export function generateMetadata({ params: { locale } }) {
  const alternates = alternatesPara("investigacion/toninas");
  if (locale === "en") {
    return {
      title: "Toninas Centinelas de la Costa",
      description:
        "The project that has studied toninas in La Paloma, Cabo Polonio and Cerro Verde since 2002.",
      alternates,
    };
  }
  return {
    title: "Toninas, centinelas de la costa",
    description:
      "El proyecto que estudia a las toninas en La Paloma, Cabo Polonio y Cerro Verde desde 2002, y trabaja en educación ambiental con las comunidades de la costa de Rocha.",
    alternates,
  };
}

export default function Home({ params: { locale } }) {
  const esIngles = locale === "en";
  const proyecto = getContenidoProyecto("toninas");
  const nombre = esIngles ? proyecto.nombre_en : proyecto.nombre;
  const cuerpo = esIngles ? proyecto.body_en : proyecto.content;

  return (
    <Section fondo="claro">
      <div className="flex justify-center">
        <Image
          src="/logo-toninas.png"
          alt="Proyecto Toninas: Centinelas de la Costa"
          width={600}
          height={494}
          className="w-48 h-auto sm:w-56"
        />
      </div>
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
