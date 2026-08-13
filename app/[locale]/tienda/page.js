import { Section, PageHeader } from "../../../components/ui";
import TodoAviso from "../../../components/TodoAviso";
import { alternatesPara } from "../../../lib/i18n";

// Solo espanol - seccion 3 del doc de fase 3 bloque 1.
export async function generateStaticParams() {
  return [{ locale: "es" }];
}
export const dynamicParams = false;

export const metadata = {
  title: "Tienda",
  description: "Comprá los libros y productos de Proyecto Toninas.",
  alternates: alternatesPara("tienda", { soloEs: true }),
};

export default function Page({ params: { locale } }) {
  return (
    <Section fondo="claro">
      <PageHeader title="Tienda" />
      <TodoAviso locale={locale} />
    </Section>
  );
}
