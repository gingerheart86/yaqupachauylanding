import { Section, PageHeader, Garabato } from "../../../components/ui";
import TodoAviso from "../../../components/TodoAviso";
import { alternatesPara } from "../../../lib/i18n";

// Solo espanol - seccion 3 del doc de fase 3 bloque 1.
export async function generateStaticParams() {
  return [{ locale: "es" }];
}
export const dynamicParams = false;

export const metadata = {
  title: "Libros",
  description:
    "Los libros infantiles de Proyecto Toninas, ilustrados por Yez.",
  alternates: alternatesPara("libros", { soloEs: true }),
};

export default function Page({ params: { locale } }) {
  return (
    <Section fondo="textura" className="relative">
      <Garabato
        numero={5}
        registro="alto"
        width={110}
        className="absolute right-6 top-6 hidden sm:block"
      />
      <PageHeader title="Libros" />
      <TodoAviso locale={locale} />
      <p className="mt-12 text-center text-sm text-marca-grafito">
        Ilustraciones: Yez
      </p>
    </Section>
  );
}
