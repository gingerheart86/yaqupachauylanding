import Image from "next/image";
import { Section, PageHeader, Garabato } from "../../../../components/ui";
import TodoAviso from "../../../../components/TodoAviso";
import { alternatesPara } from "../../../../lib/i18n";

// Solo espanol - seccion 3 del doc de fase 3 bloque 1.
export async function generateStaticParams() {
  return [{ locale: "es" }];
}
export const dynamicParams = false;

export const metadata = {
  title: "Libros",
  description:
    "Los libros infantiles de Proyecto Toninas, ilustrados por Yez.",
  alternates: alternatesPara("educacion/libros", { soloEs: true }),
};

export default function Page({ params: { locale } }) {
  return (
    <Section fondo="textura" className="relative overflow-hidden">
      <Garabato
        numero={5}
        opacidad={15}
        width={280}
        className="absolute -left-8 -bottom-8 hidden sm:block"
      />
      <div className="flex justify-center">
        <Image
          src="/decor/clara-y-las-toninas.png"
          alt="Clara y las Toninas: una colección para sumergirnos en la ciencia, nuestra costa y acercarnos a las toninas"
          width={1000}
          height={736}
          className="w-full max-w-md h-auto"
          priority
        />
      </div>
      <PageHeader
        title="Clara y las Toninas"
        description="Una colección para sumergirnos en la ciencia, nuestra costa y acercarnos a las toninas."
        className="mt-4 sr-only"
      />
      <TodoAviso locale={locale} />
      <div className="mt-12 flex justify-center">
        <Image
          src="/decor/logos-libros-blanco.png"
          alt="Proyecto Toninas, Yaqu Pacha Uruguay y editorial Krakatoa"
          width={1200}
          height={309}
          className="w-full max-w-xs h-auto"
        />
      </div>
      <p className="mt-4 text-center text-sm text-marca-grafito">
        Guion: Silvia Soler. Ilustraciones: Yez. Editorial: Krakatoa.
      </p>
    </Section>
  );
}
