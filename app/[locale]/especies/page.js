import Link from "next/link";
import Image from "next/image";
import { Section, PageHeader } from "../../../components/ui";
import { alternatesPara } from "../../../lib/i18n";
import { ESPECIES, SILUETAS } from "../../../lib/especies";

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
        {ESPECIES.map((especie) => {
          const silueta = SILUETAS[especie.slug];
          return (
            <Link
              key={especie.slug}
              href={`/${locale}/especies/${especie.slug}`}
              className={`block overflow-hidden rounded-lg border-[0.5px] border-marca-grafito/20 ${FOCUS_RING}`}
            >
              <div
                className="relative flex h-40 items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: "url(/decor/textura-guarda.webp)" }}
              >
                <Image
                  src={silueta.src}
                  alt=""
                  aria-hidden="true"
                  width={silueta.width}
                  height={silueta.height}
                  className="h-24 w-auto object-contain"
                />
              </div>
              <div className="bg-white p-4 hover:bg-costa-100">
                <h2 className="font-semibold text-mar-800">
                  {especie.nombre[locale] ?? especie.nombre.es}
                </h2>
                <p className="mt-1 italic text-sm text-texto opacity-80">
                  {especie.cientifico}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
