import { MDXRemote } from "next-mdx-remote/rsc";
import { Section, PageHeader } from "../../../../components/ui";
import BloqueReporte from "../../../../components/BloqueReporte";
import { alternatesPara } from "../../../../lib/i18n";
import { getContenidoProyecto } from "../../../../lib/contenido-proyectos";
import { getMdxComponents } from "../../../../lib/mdx-components";

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export function generateMetadata({ params: { locale } }) {
  const alternates = alternatesPara("investigacion/varamientos");
  if (locale === "en") {
    return {
      title: "Stranding Network",
      description:
        "Yaqu Pacha Uruguay takes part in this project alongside other institutions to monitor stranded marine mammals along the Uruguayan coast.",
      alternates,
    };
  }
  return {
    title: "Grupo de Trabajo en Varamientos",
    description:
      "Registro y seguimiento de varamientos de tortugas y cetáceos, vivos o muertos, en la costa uruguaya.",
    alternates,
  };
}

export default function Page({ params: { locale } }) {
  const esIngles = locale === "en";
  const proyecto = getContenidoProyecto("varamientos");
  const nombre = esIngles ? proyecto.nombre_en : proyecto.nombre;
  const resumen = esIngles ? proyecto.resumen_en : proyecto.resumen;
  const cuerpo = esIngles ? proyecto.body_en : proyecto.content;

  return (
    <>
      <Section fondo="claro">
        <PageHeader title={nombre} description={resumen} />
        <div className="mt-8 max-w-3xl mx-auto prose text-texto [&_p]:text-base [&_p]:leading-8 [&_p+p]:mt-8 [&_figure:first-child]:max-w-sm [&_figure:first-child]:mx-auto">
          <MDXRemote source={cuerpo} components={getMdxComponents(locale)} />
        </div>
      </Section>

      <BloqueReporte tipo="varamiento" locale={locale} />
    </>
  );
}
