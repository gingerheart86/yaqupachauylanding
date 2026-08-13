import { Section, PageHeader } from "../../../../components/ui";
import TodoAviso from "../../../../components/TodoAviso";
import { alternatesPara } from "../../../../lib/i18n";

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export function generateMetadata({ params: { locale } }) {
  const alternates = alternatesPara("proyectos/identidad-franca");
  if (locale === "en") {
    return {
      title: "Identidad Franca",
      description:
        "Yaqu Pacha Uruguay takes part in this project alongside other institutions to study and identify the southern right whale.",
      alternates,
    };
  }
  return {
    title: "Identidad Franca",
    description:
      "Proyecto en el que Yaqu Pacha Uruguay participa junto a otras instituciones para el estudio y la identificación de la ballena franca austral.",
    alternates,
  };
}

export default function Home({ params: { locale } }) {
  return (
    <Section fondo="claro">
      <PageHeader title="Identidad Franca" />
      <TodoAviso locale={locale} />
    </Section>
  );
}
