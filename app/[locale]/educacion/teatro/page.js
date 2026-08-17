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
  title: "Intervenciones de teatro",
  description:
    "Intervenciones de teatro de Yaqu Pacha Uruguay para educación ambiental.",
  alternates: alternatesPara("educacion/teatro", { soloEs: true }),
};

export default function Page({ params: { locale } }) {
  return (
    <Section fondo="claro">
      <PageHeader title="Intervenciones de teatro" />
      <TodoAviso locale={locale} />
    </Section>
  );
}
