import { Section, PageHeader } from "../../../../components/ui";
import TodoAviso from "../../../../components/TodoAviso";
import { alternatesPara } from "../../../../lib/i18n";

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export function generateMetadata({ params: { locale } }) {
  const alternates = alternatesPara("investigacion/varamientos");
  if (locale === "en") {
    return {
      title: "Stranding Network",
      description:
        "Yaqu Pacha Uruguay takes part in this project alongside other institutions to monitor stranded marine mammals along the Uruguayan coast.",
      alternates,
    };
  }
  return {
    title: "Red Nacional de Varamientos",
    description:
      "Proyecto en el que Yaqu Pacha Uruguay participa junto a otras instituciones para monitorear varamientos de mamíferos acuáticos en la costa uruguaya.",
    alternates,
  };
}

export default function Home({ params: { locale } }) {
  return (
    <Section fondo="claro">
      <PageHeader
        title={
          locale === "en"
            ? "Stranding Network (Grupo de Trabajo en Varamientos)"
            : "Red Nacional de Varamientos"
        }
      />
      <TodoAviso locale={locale} />
    </Section>
  );
}
