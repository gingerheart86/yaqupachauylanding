import { Section, PageHeader, Garabato } from "../../../components/ui";
import TodoAviso from "../../../components/TodoAviso";
import { alternatesPara } from "../../../lib/i18n";

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export function generateMetadata({ params: { locale } }) {
  const alternates = alternatesPara("avistamientos");
  if (locale === "en") {
    return {
      title: "Sightings",
      description:
        "Report a dolphin or whale sighting off the Uruguayan coast.",
      alternates,
    };
  }
  return {
    title: "Avistamientos",
    description:
      "Reportá un avistamiento de toninas u otros cetáceos en la costa uruguaya.",
    alternates,
  };
}

export default function Page({ params: { locale } }) {
  return (
    <Section fondo="claro" className="relative">
      <Garabato
        numero={1}
        registro="neutro"
        width={160}
        className="absolute right-0 top-0 hidden sm:block"
      />
      <PageHeader title={locale === "en" ? "Sightings" : "Avistamientos"} />
      <TodoAviso locale={locale} />
    </Section>
  );
}
