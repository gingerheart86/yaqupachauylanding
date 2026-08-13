import { PaginaEspecie } from "../../../../components/ui";
import { alternatesPara } from "../../../../lib/i18n";

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export function generateMetadata({ params: { locale } }) {
  const alternates = alternatesPara("especies/orca");
  if (locale === "en") {
    return {
      title: "Orca",
      description: "The orca (Orcinus orca) off the Uruguayan coast.",
      alternates,
    };
  }
  return {
    title: "Orca",
    description: "La orca (Orcinus orca) en la costa uruguaya.",
    alternates,
  };
}

export default function Page({ params: { locale } }) {
  return (
    <PaginaEspecie
      slug="orca"
      nombreComun="Orca"
      nombreCientifico="Orcinus orca"
      locale={locale}
      todo
    />
  );
}
