import { Section, PageHeader, ProjectCardCompacta, TarjetaProyecto } from "../../../components/ui";
import { alternatesPara } from "../../../lib/i18n";
import { SILUETAS } from "../../../lib/especies";

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export function generateMetadata({ params: { locale } }) {
  const alternates = alternatesPara("investigacion");
  if (locale === "en") {
    return {
      title: "Research",
      description:
        "Yaqu Pacha Uruguay's projects and scientific publications to study and conserve toninas and their coastal environment.",
      alternates,
    };
  }
  return {
    title: "Investigación",
    description:
      "Los proyectos y publicaciones científicas de Yaqu Pacha Uruguay para estudiar y conservar a las toninas y su ambiente costero: monitoreo, investigación y educación ambiental.",
    alternates,
  };
}

export default function Home({ params: { locale } }) {
  const esIngles = locale === "en";
  return (
    <Section fondo="claro">
      <PageHeader
        title={esIngles ? "Research" : "Investigación"}
        description={
          esIngles
            ? "Proyecto Toninas is our main project. We also take part in three shared projects with other institutions."
            : "Proyecto Toninas es nuestro proyecto principal. Además participamos de tres proyectos compartidos con otras instituciones."
        }
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <TarjetaProyecto
          destacada
          href={`/${locale}/investigacion/toninas`}
          title="Proyecto Toninas"
          silueta={SILUETAS.tonina}
          description={
            esIngles
              ? "The project that has studied toninas in La Paloma, Cabo Polonio and Cerro Verde since 2002."
              : "El proyecto que estudia a las toninas en La Paloma, Cabo Polonio y Cerro Verde desde 2002."
          }
        />
        <TarjetaProyecto
          href={`/${locale}/investigacion/gephyreus`}
          title="Proyecto Gephyreus"
          silueta={SILUETAS.tonina}
          description={
            esIngles
              ? "Regional work with Brazil and Argentina to conserve Lahille's bottlenose dolphin."
              : "Trabajo regional con Brasil y Argentina para conservar al delfín de Lahille."
          }
        />
        <TarjetaProyecto
          href={`/${locale}/investigacion/varamientos`}
          title="Red Nacional de Varamientos"
          description={
            esIngles
              ? "Monitoring of stranded marine mammals along the Uruguayan coast."
              : "Monitoreo de varamientos de mamíferos acuáticos en la costa uruguaya."
          }
        />
        <TarjetaProyecto
          href={`/${locale}/investigacion/identidad-franca`}
          title="Identidad Franca"
          silueta={SILUETAS["ballena-franca"]}
          description={
            esIngles
              ? "Study and identification of the southern right whale."
              : "Estudio e identificación de la ballena franca austral."
          }
        />
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ProjectCardCompacta
          href={`/${locale}/investigacion/toninas/antecedentes`}
          title={esIngles ? "Background of Proyecto Toninas" : "Antecedentes del Proyecto Toninas"}
          description={
            esIngles
              ? "More than twenty years studying toninas on the Uruguayan coast."
              : "Más de veinte años estudiando a las toninas en la costa uruguaya."
          }
        />
        <ProjectCardCompacta
          href={`/${locale}/investigacion/publicaciones`}
          title={esIngles ? "Scientific publications" : "Publicaciones científicas"}
          description={
            esIngles
              ? "Peer-reviewed articles about toninas ecology, behaviour and conservation."
              : "Artículos científicos sobre ecología, comportamiento y conservación de las toninas."
          }
        />
      </div>
    </Section>
  );
}
