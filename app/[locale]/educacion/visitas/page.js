import { Section, PageHeader } from "../../../../components/ui";
import TodoAviso from "../../../../components/TodoAviso";
import { alternatesPara } from "../../../../lib/i18n";

// Solo espanol, y no enlazada desde el menu hasta que tenga contenido -
// seccion 6 de docs/fase3-navegacion-portada.md.
export async function generateStaticParams() {
  return [{ locale: "es" }];
}
export const dynamicParams = false;

export const metadata = {
  title: "Visitas a centros educativos",
  description:
    "Visitas de Yaqu Pacha Uruguay a centros educativos para educación ambiental.",
  alternates: alternatesPara("educacion/visitas", { soloEs: true }),
};

export default function Page({ params: { locale } }) {
  return (
    <Section fondo="claro">
      <PageHeader title="Visitas a centros educativos" />
      <TodoAviso locale={locale} />
    </Section>
  );
}
