import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Section, PageHeader, ProjectCardCompacta } from "../../../../components/ui";
import { alternatesPara } from "../../../../lib/i18n";
import { getContenidoProyecto, getLineasDeTrabajo } from "../../../../lib/contenido-proyectos";
import { getMdxComponents } from "../../../../lib/mdx-components";
import { catalogoEstaOculto } from "../../../../lib/paginas";

// Proyecto Toninas es el proyecto "padre": empezo antes y Centinelas
// de la Costa fue una de sus lineas de trabajo, no un proyecto al
// mismo nivel - docs de esta ronda. Las lineas de trabajo salen de
// content/proyectos/*.mdx con proyecto_padre: "toninas", no estan
// escritas a mano aca, para poder sumar mas sin tocar este archivo.
export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export function generateMetadata({ params: { locale } }) {
  const alternates = alternatesPara("investigacion/toninas");
  if (locale === "en") {
    return {
      title: "Proyecto Toninas",
      description:
        "The project that has studied toninas on the Uruguayan coast since 2002.",
      alternates,
    };
  }
  return {
    title: "Proyecto Toninas",
    description:
      "El proyecto que estudia a las toninas en la costa uruguaya desde 2002.",
    alternates,
  };
}

export default function Page({ params: { locale } }) {
  const esIngles = locale === "en";
  const proyecto = getContenidoProyecto("toninas");
  const nombre = esIngles ? proyecto.nombre_en : proyecto.nombre;
  const cuerpo = esIngles ? proyecto.body_en : proyecto.content;
  const lineas = getLineasDeTrabajo("toninas");
  const catalogoOculto = catalogoEstaOculto();

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
      <PageHeader title={nombre} className="mt-12" />

      <div className="mt-16 prose max-w-none text-texto [&_p]:text-base [&_p]:leading-8 [&_p+p]:mt-8">
        <MDXRemote source={cuerpo} components={getMdxComponents(locale)} />
      </div>

      {lineas.length > 0 && (
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {lineas.map((linea) => (
            <ProjectCardCompacta
              key={linea.slug}
              href={`/${locale}/investigacion/toninas/${linea.slug}`}
              title={esIngles ? linea.nombre_en || linea.nombre : linea.nombre}
              description={esIngles ? linea.resumen_en : linea.resumen}
            />
          ))}
        </div>
      )}

      <div className={`mt-12 grid grid-cols-1 gap-4 ${catalogoOculto ? "" : "sm:grid-cols-2"}`}>
        <ProjectCardCompacta
          href={`/${locale}/investigacion/toninas/antecedentes`}
          title={esIngles ? "Background" : "Antecedentes"}
          description={
            esIngles
              ? "More than twenty years studying toninas on the Uruguayan coast."
              : "Más de veinte años estudiando a las toninas en la costa uruguaya."
          }
        />
        {!catalogoOculto && (
          <ProjectCardCompacta
            href={`/${locale}/investigacion/toninas/catalogo`}
            title={esIngles ? "Photo-identification catalogue" : "Catálogo de foto-identificación"}
            description={
              esIngles
                ? "Meet the individually identified toninas."
                : "Conocé a las toninas identificadas individualmente."
            }
          />
        )}
      </div>
    </Section>
  );
}
