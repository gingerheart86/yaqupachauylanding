import { Section, PageHeader, Garabato } from "../../../components/ui";
import MapaAvistamientos from "../../../components/MapaAvistamientos";
import { alternatesPara } from "../../../lib/i18n";
import { ARCGIS_WEBMAP_URL } from "../../../lib/contacto";

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
      "Reporta un avistamiento de toninas u otros cetáceos en la costa uruguaya.",
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

      <div className="mx-auto mt-4 max-w-3xl text-center text-texto">
        <p>
          {locale === "en"
            ? "This map combines the citizen-science sightings reported through our survey with our own field records."
            : "Este mapa combina los avistamientos reportados por ciencia ciudadana a través de nuestro formulario con nuestros propios registros de campo."}
        </p>
        <p className="mt-1">
          {locale === "en" ? (
            <>
              Spotted a tonina or other cetacean?{" "}
              <a
                href={`/${locale}/colabora/reportar-avistamiento`}
                className="font-medium text-marca-oscuro underline hover:text-mar-900"
              >
                Report it here
              </a>
              .
            </>
          ) : (
            <>
              ¿Viste una tonina u otro cetáceo?{" "}
              <a
                href={`/${locale}/colabora/reportar-avistamiento`}
                className="font-medium text-marca-oscuro underline hover:text-mar-900"
              >
                Repórtalo acá
              </a>
              .
            </>
          )}
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-4xl">
        <MapaAvistamientos url={ARCGIS_WEBMAP_URL} locale={locale} />
      </div>
    </Section>
  );
}
