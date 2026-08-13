import Image from "next/image";
import { Section, PageHeader } from "../../../../components/ui";
import TodoAviso from "../../../../components/TodoAviso";
import { alternatesPara } from "../../../../lib/i18n";

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export function generateMetadata({ params: { locale } }) {
  const alternates = alternatesPara("proyectos/gephyreus");
  if (locale === "en") {
    return {
      title: "Gephyreus Project",
      description:
        "Regional work with Brazil and Argentina to conserve Lahille's bottlenose dolphin (Tursiops truncatus gephyreus) in the southwestern Atlantic.",
      alternates,
    };
  }
  return {
    title: "Proyecto Gephyreus",
    description:
      "Trabajo regional con Brasil y Argentina para conservar al delfín de Lahille (Tursiops truncatus gephyreus) en el Atlántico Sur occidental.",
    alternates,
  };
}

export default function Home({ params: { locale } }) {
  if (locale === "en") {
    return (
      <Section fondo="claro">
        <PageHeader title="Gephyreus Project" />
        <TodoAviso locale={locale} />
      </Section>
    );
  }

  return (
    <Section fondo="claro">
      <PageHeader title="Proyecto Gephyreus" />
      <p className="mt-8 text-base leading-8 text-texto">
        Desde 2018, formamos parte de un proyecto binacional en conjunto con
        investigadores brasileños, con el fin de estimar la abundancia de
        toninas del Atlántico Sudoccidental.
      </p>
      <div className="flex space-x-3 items-center">
        <figure className="my-4 flex-1">
          <Image
            className="w-full h-auto rounded-lg"
            src="/pic2.webp"
            alt="Logo del Proyecto Gephyreus"
            width={465}
            height={318}
          />
        </figure>
        <figure className="my-4 flex-1">
          <Image
            className="w-full h-auto rounded-lg"
            src="/pic3.jpg"
            alt="Actividades del Proyecto Gephyreus"
            width={819}
            height={1024}
          />
        </figure>
      </div>
      <div className="flex justify-center w-full">
        <iframe
          width="650"
          height="480"
          src={`https://www.youtube.com/embed/B57lG7eKorA`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          title="Embedded youtube"
        />
      </div>
    </Section>
  );
}
