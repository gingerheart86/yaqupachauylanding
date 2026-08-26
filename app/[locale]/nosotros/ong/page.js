import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Section, PageHeader, Card } from "../../../../components/ui";
import VideoInstitucional from "../../../../components/VideoInstitucional";
import { getPagina } from "../../../../lib/paginas";
import { alternatesPara } from "../../../../lib/i18n";

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export function generateMetadata({ params: { locale } }) {
  const alternates = alternatesPara("nosotros/ong");
  if (locale === "en") {
    return {
      title: "The NGO",
      description:
        "Yaqu Pacha Uruguay, a branch of Yaqu Pacha e.V.: research and conservation of aquatic mammals in South America.",
      alternates,
    };
  }
  return {
    title: "La ONG",
    description:
      "Yaqu Pacha Uruguay, filial de Yaqu Pacha e.V.: investigación y conservación de mamíferos acuáticos en América del Sur, desde 2013.",
    alternates,
  };
}

export default function Home({ params: { locale } }) {
  const pagina = getPagina("la-ong");
  const esIngles = locale === "en";
  const titulo = esIngles ? pagina.titulo_en : pagina.titulo;
  const resumen = esIngles ? pagina.resumen_en : pagina.resumen;
  const cuerpo = esIngles ? pagina.body_en : pagina.content;

  return (
    <Section fondo="claro">
      <PageHeader title={titulo} description={resumen} />
      <Card className="mt-10 max-w-3xl mx-auto prose sm:prose-xl text-texto [&_p]:text-base [&_p]:sm:text-xl [&_p+p]:mt-4">
        <MDXRemote source={cuerpo} />
      </Card>
      <div className="mt-8 max-w-3xl mx-auto">
        <VideoInstitucional />
      </div>
      <div className="mt-8 flex justify-center">
        <Image
          src="/logo_sinf.png"
          className="w-40 h-auto"
          alt={esIngles ? "Institutional logo" : "Logo institucional"}
          width={600}
          height={514}
        />
      </div>
    </Section>
  );
}
