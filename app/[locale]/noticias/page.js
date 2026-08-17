import { Section, PageHeader } from "../../../components/ui";
import { alternatesPara } from "../../../lib/i18n";

// Solo espanol - fase3-arquitectura-y-contenido.md seccion 11. Sin
// entradas todavia: no hay compromiso de publicar con regularidad, asi
// que la seccion existe con la estructura lista pero sin contenido
// inventado (seccion 9 del mismo doc).
export async function generateStaticParams() {
  return [{ locale: "es" }];
}
export const dynamicParams = false;

export const metadata = {
  title: "Noticias",
  description: "Novedades de Yaqu Pacha Uruguay.",
  alternates: alternatesPara("noticias", { soloEs: true }),
};

export default function Page() {
  return (
    <Section fondo="claro">
      <PageHeader title="Noticias" />
      <p className="mt-8 text-center text-texto">
        Todavía no hay noticias publicadas. Volvé pronto.
      </p>
    </Section>
  );
}
