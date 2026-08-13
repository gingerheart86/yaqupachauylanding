import { PaginaEspecie } from "../../../../components/ui";
import { alternatesPara } from "../../../../lib/i18n";

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export function generateMetadata({ params: { locale } }) {
  const alternates = alternatesPara("especies/ballena-franca");
  if (locale === "en") {
    return {
      title: "Southern right whale",
      description:
        "The southern right whale (Eubalaena australis) off the Uruguayan coast.",
      alternates,
    };
  }
  return {
    title: "Ballena franca austral",
    description:
      "La ballena franca austral (Eubalaena australis) en la costa uruguaya.",
    alternates,
  };
}

export default function Page({ params: { locale } }) {
  return (
    <PaginaEspecie
      nombreComun={locale === "en" ? "Southern right whale" : "Ballena franca austral"}
      nombreCientifico="Eubalaena australis"
      locale={locale}
      todo
    />
  );
}
