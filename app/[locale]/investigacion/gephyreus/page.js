import { MDXRemote } from "next-mdx-remote/rsc";
import { Section, PageHeader } from "../../../../components/ui";
import { alternatesPara } from "../../../../lib/i18n";
import { getContenidoProyecto } from "../../../../lib/contenido-proyectos";
import { getMdxComponents } from "../../../../lib/mdx-components";

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export function generateMetadata({ params: { locale } }) {
  const alternates = alternatesPara("investigacion/gephyreus");
  if (locale === "en") {
    return {
      title: "Gephyreus Project",
      description:
        "Regional work with Brazil and Argentina to conserve Lahille's bottlenose dolphin (Tursiops truncatus gephyreus) in the southwestern Atlantic.",
      alternates,
    };
  }
  return {
    title: "Proyecto Gephyreus",
    description:
      "Trabajo regional con Brasil y Argentina para conservar al delfín de Lahille (Tursiops truncatus gephyreus) en el Atlántico Sur occidental.",
    alternates,
  };
}

export default function Home({ params: { locale } }) {
  const esIngles = locale === "en";
  const proyecto = getContenidoProyecto("gephyreus");
  const nombre = esIngles ? proyecto.nombre_en : proyecto.nombre;
  const cuerpo = esIngles ? proyecto.body_en : proyecto.content;

  return (
    <Section fondo="claro">
      <PageHeader title={nombre} />
      <div className="prose max-w-none text-texto [&_p]:text-base [&_p]:leading-8 [&_p+p]:mt-8">
        <MDXRemote source={cuerpo} components={getMdxComponents(locale)} />
      </div>
    </Section>
  );
}
