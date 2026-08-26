import { MDXRemote } from "next-mdx-remote/rsc";
import { PaginaEspecie } from "../../../../components/ui";
import { alternatesPara } from "../../../../lib/i18n";
import { getContenidoEspecie } from "../../../../lib/contenido-especies";
import { getMdxComponents } from "../../../../lib/mdx-components";

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export function generateMetadata({ params: { locale } }) {
  const alternates = alternatesPara("especies/franciscana");
  if (locale === "en") {
    return {
      title: "Franciscana (La Plata dolphin)",
      description:
        "The franciscana (La Plata dolphin, Pontoporia blainvillei) off the Uruguayan coast: one of the world's five river dolphin species, and among the most threatened.",
      alternates,
    };
  }
  return {
    title: "Franciscana, el delfín del Río de la Plata",
    description:
      "Qué es la franciscana (Pontoporia blainvillei): una de las cinco especies de delfines de río del mundo, y una de las más amenazadas. Distribución, biología y capturas incidentales.",
    alternates,
  };
}

export default function Page({ params: { locale } }) {
  const esIngles = locale === "en";
  const especie = getContenidoEspecie("franciscana");
  const resumen = esIngles ? especie.resumen_en : especie.resumen;
  const alt = esIngles ? especie.alt_en : especie.alt;
  const cuerpo = esIngles ? especie.body_en : especie.content;

  return (
    <PaginaEspecie
      slug="franciscana"
      nombreComun={especie.nombre_comun}
      nombreCientifico={especie.nombre_cientifico}
      resumen={resumen}
      locale={locale}
      imagen={{ src: especie.imagen, alt }}
      proyectosAsociados={[
        {
          nombre: "Grupo de Trabajo en Varamientos",
          href: `/${locale}/investigacion/varamientos`,
        },
      ]}
    >
      <div className="prose max-w-none text-texto [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-mar-800 [&_p]:text-base [&_p]:leading-8 [&_p+p]:mt-8">
        <MDXRemote source={cuerpo} components={getMdxComponents(locale)} />
      </div>
    </PaginaEspecie>
  );
}
