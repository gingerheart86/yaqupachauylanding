import Image from "next/image";
import { Section, PageHeader, Card } from "../../../../components/ui";
import VideoInstitucional from "../../../../components/VideoInstitucional";
import { alternatesPara } from "../../../../lib/i18n";

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export function generateMetadata({ params: { locale } }) {
  const alternates = alternatesPara("nosotros/ong");
  if (locale === "en") {
    return {
      title: "The NGO",
      description:
        "Yaqu Pacha Uruguay, a branch of Yaqu Pacha e.V.: research and conservation of aquatic mammals in South America.",
      alternates,
    };
  }
  return {
    title: "La ONG",
    description:
      "Yaqu Pacha Uruguay, filial de Yaqu Pacha e.V.: investigación y conservación de mamíferos acuáticos en América del Sur, desde 2013.",
    alternates,
  };
}

export default function Home({ params: { locale } }) {
  if (locale === "en") {
    return (
      <Section fondo="claro">
        <PageHeader
          title="The NGO"
          description="Who we are, what we do and why."
        />
        <Card className="mt-10 max-w-3xl mx-auto">
          <p className="text-base sm:text-xl text-texto">
            Yaqu Pacha Uruguay is a branch of the Organization for the
            Conservation of Aquatic Mammals in South America — Yaqu Pacha
            e.V. — based in Germany. The organization's goals are to
            research and conserve aquatic mammal species in South America,
            particularly those under threat, and to raise awareness about
            the importance of studying and conserving these species and
            their environments.
          </p>
          <p className="mt-4 text-base sm:text-xl text-texto">
            This branch was created in 2013, incorporating Proyecto
            Toninas, which had been running in Uruguay since 2002. The
            project's two main goals are to study the tonina (
            <span className="italic font-semibold">
              Tursiops truncatus gephyreus
            </span>
            ), a subspecies of the bottlenose dolphin{" "}
            <span className="italic font-semibold">Tursiops truncatus</span>{" "}
            found only along the coast of southern Brazil, Uruguay and
            Argentina, and to promote coastal environmental education,
            awareness of the effects of climate change, and the tonina as
            a sentinel species of the coast.
          </p>
        </Card>
        <div className="mt-8 max-w-3xl mx-auto">
          <VideoInstitucional />
        </div>
        <div className="mt-8 flex justify-center">
          <Image
            src="/logo_sinf.png"
            className="w-40 h-auto"
            alt="Institutional logo"
            width={600}
            height={514}
          />
        </div>
      </Section>
    );
  }

  return (
    <Section fondo="claro">
      <PageHeader
        title="La ONG"
        description="Quiénes somos, qué hacemos y por qué."
      />
      <Card className="mt-10 max-w-3xl mx-auto">
        <p className="text-base sm:text-xl text-texto">
          Yaqu Pacha Uruguay es una filial de la Organización para la
          Conservación de Mamíferos Acuáticos en América del Sur - Yaqu Pacha
          e.V. en Alemania. La organización tiene como objetivos investigar y
          conservar las especies de mamíferos acuáticos en América del Sur,
          en particular aquellas amenazadas, así como difundir y
          concientizar a las personas sobre la importancia de estudiar y
          conservar a estas especies y sus ambientes.
        </p>
        <p className="mt-4 text-base sm:text-xl text-texto">
          Esta filial fue creada en 2013 incorporando al Proyecto Toninas que
          se venía desarrollando desde 2002 en Uruguay. Los dos objetivos
          principales de este proyecto son estudiar a la tonina{" "}
          <span className="italic font-semibold">
            Tursiops truncatus gephyreus
          </span>
          , una subespecie del delfín nariz de botella{" "}
          <span className="italic font-semibold">Tursiops truncatus</span>{" "}
          que ocurre únicamente en la zona costera del sur de Brasil, Uruguay
          y Argentina, y promover la educación ambiental costera, la
          conciencia sobre los efectos del cambio climático y a la tonina
          como especie centinela de la costa.
        </p>
      </Card>
      <div className="mt-8 max-w-3xl mx-auto">
        <VideoInstitucional />
      </div>
      <div className="mt-8 flex justify-center">
        <Image
          src="/logo_sinf.png"
          className="w-40 h-auto"
          alt="Logo institucional"
          width={600}
          height={514}
        />
      </div>
    </Section>
  );
}
