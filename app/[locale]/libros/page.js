import { Section, PageHeader } from "../../../components/ui";
import TodoAviso from "../../../components/TodoAviso";
import { alternatesPara } from "../../../lib/i18n";

// Solo espanol - seccion 3 del doc de fase 3 bloque 1.
export async function generateStaticParams() {
  return [{ locale: "es" }];
}
export const dynamicParams = false;

export const metadata = {
  title: "Libros",
  description:
    "Los libros infantiles de Proyecto Toninas, ilustrados por Yez.",
  alternates: alternatesPara("libros", { soloEs: true }),
};

export default function Page({ params: { locale } }) {
  return (
    <Section fondo="claro">
      <PageHeader title="Libros" />
      <TodoAviso locale={locale} />
    </Section>
  );
}
