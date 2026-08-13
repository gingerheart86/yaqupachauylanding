import { PaginaEspecie } from "../../../../components/ui";
import { alternatesPara } from "../../../../lib/i18n";

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export function generateMetadata({ params: { locale } }) {
  const alternates = alternatesPara("especies/franciscana");
  if (locale === "en") {
    return {
      title: "Franciscana",
      description:
        "The franciscana (La Plata dolphin, Pontoporia blainvillei) off the Uruguayan coast.",
      alternates,
    };
  }
  return {
    title: "Franciscana",
    description:
      "La franciscana (Pontoporia blainvillei) en la costa uruguaya.",
    alternates,
  };
}

export default function Page({ params: { locale } }) {
  return (
    <PaginaEspecie
      nombreComun="Franciscana"
      nombreCientifico="Pontoporia blainvillei"
      locale={locale}
      todo
    />
  );
}
