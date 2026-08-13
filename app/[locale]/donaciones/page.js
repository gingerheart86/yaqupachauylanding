import { Section, PageHeader } from "../../../components/ui";
import TodoAviso from "../../../components/TodoAviso";
import { alternatesPara } from "../../../lib/i18n";

// Solo espanol - seccion 3 del doc de fase 3 bloque 1.
export async function generateStaticParams() {
  return [{ locale: "es" }];
}
export const dynamicParams = false;

export const metadata = {
  title: "Donaciones",
  description: "Cómo colaborar económicamente con Yaqu Pacha Uruguay.",
  alternates: alternatesPara("donaciones", { soloEs: true }),
};

export default function Page({ params: { locale } }) {
  return (
    <Section fondo="claro">
      <PageHeader title="Donaciones" />
      <TodoAviso locale={locale} />
    </Section>
  );
}
