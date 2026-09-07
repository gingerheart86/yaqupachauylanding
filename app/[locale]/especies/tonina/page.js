import { MDXRemote } from "next-mdx-remote/rsc";
import { PaginaEspecie } from "../../../../components/ui";
import { BloqueDescubrimiento } from "../../../../components/catalogo/BloqueDescubrimiento";
import { SonidoTonina } from "../../../../components/especies/SonidoTonina";
import { alternatesPara } from "../../../../lib/i18n";
import { getContenidoEspecie } from "../../../../lib/contenido-especies";
import { getMdxComponents } from "../../../../lib/mdx-components";
import { catalogoEstaOculto } from "../../../../lib/paginas";

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export function generateMetadata({ params: { locale } }) {
  const alternates = alternatesPara("especies/tonina");
  if (locale === "en") {
    return {
      title: "Tonina (Lahille's bottlenose dolphin)",
      description:
        "Lahille's bottlenose dolphin (Tursiops truncatus gephyreus), the coastal dolphin of Uruguay.",
      alternates,
    };
  }
  return {
    title: "La tonina, el delfín de la costa uruguaya",
    description:
      "Quién es la tonina (Tursiops truncatus gephyreus), el delfín costero de Uruguay: dónde vive, cuántos quedan, cómo se comunica y por qué está en peligro.",
    alternates,
  };
}

export default function Page({ params: { locale } }) {
  const esIngles = locale === "en";
  const especie = getContenidoEspecie("tonina");
  const resumen = esIngles ? especie.resumen_en : especie.resumen;
  const cuerpo = esIngles ? especie.body_en : especie.content;

  const proyectosAsociados = esIngles
    ? [
        { nombre: "Proyecto Toninas", href: `/${locale}/investigacion/toninas` },
        { nombre: "Proyecto Gephyreus", href: `/${locale}/investigacion/gephyreus` },
      ]
    : [
        { nombre: "Proyecto Toninas", href: `/${locale}/investigacion/toninas` },
        { nombre: "Proyecto Gephyreus", href: `/${locale}/investigacion/gephyreus` },
      ];

  return (
    <PaginaEspecie
      slug="tonina"
      nombreComun={especie.nombre_comun}
      nombreCientifico={especie.nombre_cientifico}
      resumen={resumen}
      locale={locale}
      proyectosAsociados={proyectosAsociados}
    >
      <div className="prose max-w-none text-texto [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-mar-800 [&_h2]:mt-8 [&_p]:text-base [&_p]:leading-8 [&_p+p]:mt-8">
        <MDXRemote source={cuerpo} components={getMdxComponents(locale)} />
      </div>
      <SonidoTonina locale={locale} />
      {!catalogoEstaOculto() && (
        <BloqueDescubrimiento proyecto="toninas" locale={locale} />
      )}
    </PaginaEspecie>
  );
}
