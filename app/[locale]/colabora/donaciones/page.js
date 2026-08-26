import { MDXRemote } from "next-mdx-remote/rsc";
import { Section, PageHeader } from "../../../../components/ui";
import TodoAviso from "../../../../components/TodoAviso";
import { getPagina } from "../../../../lib/paginas";
import { alternatesPara } from "../../../../lib/i18n";

// Solo espanol - seccion 3 del doc de fase 3 bloque 1.
export async function generateStaticParams() {
  return [{ locale: "es" }];
}
export const dynamicParams = false;

export const metadata = {
  title: "Donaciones",
  description: "Cómo colaborar económicamente con Yaqu Pacha Uruguay.",
  alternates: alternatesPara("colabora/donaciones", { soloEs: true }),
};

export default function Page({ params: { locale } }) {
  const pagina = getPagina("donaciones");
  const hayContenido = pagina.content?.trim().length > 0;

  return (
    <Section fondo="claro">
      <PageHeader title={pagina.titulo} description={pagina.intro} />
      {hayContenido ? (
        <div className="prose max-w-3xl mx-auto mt-8 text-texto [&_a]:text-marca-oscuro">
          <MDXRemote source={pagina.content} />
        </div>
      ) : (
        <TodoAviso locale={locale} />
      )}
    </Section>
  );
}
