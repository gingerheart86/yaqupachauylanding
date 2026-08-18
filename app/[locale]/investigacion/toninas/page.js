import Image from "next/image";
import Gallery from "../../../../components/imagegallery";
import { Section, PageHeader, Garabato } from "../../../../components/ui";
import { alternatesPara } from "../../../../lib/i18n";

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export function generateMetadata({ params: { locale } }) {
  const alternates = alternatesPara("investigacion/toninas");
  if (locale === "en") {
    return {
      title: "Toninas Centinelas de la Costa",
      description:
        "The project that has studied toninas in La Paloma, Cabo Polonio and Cerro Verde since 2002.",
      alternates,
    };
  }
  return {
    title: "Toninas, centinelas de la costa",
    description:
      "El proyecto que estudia a las toninas en La Paloma, Cabo Polonio y Cerro Verde desde 2002, y trabaja en educación ambiental con las comunidades de la costa de Rocha.",
    alternates,
  };
}

export default function Home({ params: { locale } }) {
  if (locale === "en") {
    return (
      <Section fondo="claro">
        <div className="flex justify-center">
          <Image
            src="/logo-toninas.png"
            alt="Proyecto Toninas: Centinelas de la Costa"
            width={600}
            height={494}
            className="w-48 h-auto sm:w-56"
          />
        </div>
        <PageHeader title="Toninas Centinelas de la Costa" className="mt-6" />

        <p className="mt-8 text-base leading-8 text-texto">
          Funded by ECOSSUR, over 9 months (2021-2022) we carried out
          activities in monitoring, environmental education and training
          for coastal management — a central axis for adapting to climate
          change under the UN Framework Convention on Climate Change
          (UNFCCC) and the Convention on Biological Diversity (CBD). We
          shared information about climate change in the coastal zone,
          especially its impact on toninas, an iconic, flagship species of
          the Uruguayan coast whose conservation could be affected if we
          don't act to reduce these impacts. During this project, we
          carried out educational activities in schools (in collaboration
          with the Costa+ group), art interventions on the beach,
          outreach materials and training workshops for tourism operators
          in Maldonado and Rocha.
        </p>
        <figure className="my-4">
          <Image
            className="w-full h-auto rounded-lg"
            src="/pic1.png"
            alt="Toninas Centinelas de la Costa project activities"
            width={957}
            height={225}
          />
        </figure>

        <div className="mt-8 flex justify-center">
          <Garabato numero={4} registro="alto" width={90} />
        </div>
        <h2 className="mt-4 block text-center text-3xl font-semibold tracking-tight text-mar-800 sm:text-3xl">
          Photo gallery
        </h2>
        <div className="max-w-5xl w-full mx-auto">
          <Gallery />
        </div>
      </Section>
    );
  }

  return (
    <Section fondo="claro">
      <div className="flex justify-center">
        <Image
          src="/logo-toninas.png"
          alt="Proyecto Toninas: Centinelas de la Costa"
          width={600}
          height={494}
          className="w-48 h-auto sm:w-56"
        />
      </div>
      <PageHeader title="Toninas Centinelas de la costa" className="mt-6" />

      <p className="mt-8 text-base leading-8 text-texto">
        Financiado por ECOSSUR, durante 9 meses (2021-2022) realizamos
        diversas actividades que involucran el trabajo en monitoreo,
        educación ambiental y capacitación para la gestión costera, eje
        central de cara a la adaptación frente al CC y por lo tanto de la
        Convención Marco Naciones Unidas sobre el Cambio Climático (CMNUCC)
        y del Convenio sobre Diversidad Biológica (CDB)este proyecto.
        Compartimos información sobre el cambio climático en la zona
        costera, especialmente sobre su impacto en las toninas, especie
        carísmática y bandera de la costa uruguaya, cuya conservación podría
        verse afectada si no actuamos para reducir los impactos generados.
        Durante este proyecto, realizamos actividades educativas en el
        ámbito escolar (en colaboración con el grupo Costa+), intervenciones
        artísticas en la playa, material de difusión y talleres de
        capacitación para operadores turísticos de Maldonado y Rocha.
      </p>
      <figure className="my-4">
        <Image
          className="w-full h-auto rounded-lg"
          src="/pic1.png"
          alt="Actividades del proyecto Toninas Centinelas de la costa"
          width={957}
          height={225}
        />
      </figure>

      <div className="mt-8 flex justify-center">
        <Garabato numero={4} registro="alto" width={90} />
      </div>
      <h2 className="mt-4 block text-center text-3xl font-semibold tracking-tight text-mar-800 sm:text-3xl">
        Galería de fotos
      </h2>
      <div className="max-w-5xl w-full mx-auto">
        <Gallery />
      </div>
    </Section>
  );
}
