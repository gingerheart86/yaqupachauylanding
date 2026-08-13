import Link from "next/link";
import { Section, PageHeader, Card } from "../../../components/ui";
import { alternatesPara } from "../../../lib/i18n";

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export function generateMetadata({ params: { locale } }) {
  const alternates = alternatesPara("especies");
  if (locale === "en") {
    return {
      title: "Species",
      description:
        "The four cetacean species Yaqu Pacha Uruguay studies and works to protect off the Uruguayan coast.",
      alternates,
    };
  }
  return {
    title: "Especies",
    description:
      "Las cuatro especies de cetáceos que Yaqu Pacha Uruguay estudia y trabaja para proteger en la costa uruguaya.",
    alternates,
  };
}

const especies = [
  {
    slug: "tonina",
    nombre: { es: "Tonina", en: "Tonina" },
    cientifico: "Tursiops truncatus gephyreus",
  },
  {
    slug: "ballena-franca",
    nombre: { es: "Ballena franca austral", en: "Southern right whale" },
    cientifico: "Eubalaena australis",
  },
  {
    slug: "franciscana",
    nombre: { es: "Franciscana", en: "Franciscana" },
    cientifico: "Pontoporia blainvillei",
  },
  {
    slug: "orca",
    nombre: { es: "Orca", en: "Orca" },
    cientifico: "Orcinus orca",
  },
];

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-marca focus-visible:ring-offset-2";

export default function Page({ params: { locale } }) {
  return (
    <Section fondo="claro">
      <PageHeader
        title={locale === "en" ? "Species" : "Especies"}
        description={
          locale === "en"
            ? "Four species, four different stories along the Uruguayan coast."
            : "Cuatro especies, cuatro historias distintas a lo largo de la costa uruguaya."
        }
      />
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {especies.map((especie) => (
          <Link
            key={especie.slug}
            href={`/${locale}/especies/${especie.slug}`}
            className={FOCUS_RING}
          >
            <Card className="h-full hover:bg-costa-100">
              <h2 className="font-semibold text-mar-800">
                {especie.nombre[locale] ?? especie.nombre.es}
              </h2>
              <p className="mt-1 italic text-sm text-texto opacity-80">
                {especie.cientifico}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </Section>
  );
}
