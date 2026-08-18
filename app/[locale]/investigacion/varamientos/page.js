import Image from "next/image";
import { Section, PageHeader } from "../../../../components/ui";
import BloqueReporte from "../../../../components/BloqueReporte";
import { alternatesPara } from "../../../../lib/i18n";

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export function generateMetadata({ params: { locale } }) {
  const alternates = alternatesPara("investigacion/varamientos");
  if (locale === "en") {
    return {
      title: "Stranding Network",
      description:
        "Yaqu Pacha Uruguay takes part in this project alongside other institutions to monitor stranded marine mammals along the Uruguayan coast.",
      alternates,
    };
  }
  return {
    title: "Grupo de Trabajo en Varamientos",
    description:
      "Registro, seguimiento y rescate de varamientos de cetáceos en la costa uruguaya, en conjunto con Karumbé y la Alianza AFC3R para la franciscana.",
    alternates,
  };
}

export default function Page({ params: { locale } }) {
  if (locale === "en") {
    return (
      <>
        <Section fondo="claro">
          <PageHeader
            title="Stranding Network (Grupo de Trabajo en Varamientos)"
            description="Cetacean strandings along the Uruguayan coast."
          />
          <div className="mt-8 max-w-3xl mx-auto">
            <p className="text-base leading-8 text-texto">
              Recording and monitoring strandings are important sources of
              information for studying various aspects of these animals'
              biology, and for recording species new to the country and to
              science.
            </p>
            <p className="mt-8 text-base leading-8 text-texto">
              Together with the civil association Karumbé, we carry out
              systematic surveys along the Uruguayan coast to record
              strandings of live or dead turtles and cetaceans, and to
              understand what causes them.
            </p>
            <p className="mt-8 text-base leading-8 text-texto">
              When animals strand dead, we identify the species and
              collect morphological data and tissue samples for studies of
              diet, population genetic structure, contaminants, among
              others.
            </p>

            <figure className="my-8">
              <div className="relative aspect-[4/3] w-full max-w-md mx-auto overflow-hidden rounded-lg">
                <Image
                  src="/varamientos/adulto.webp"
                  alt="Adult franciscana stranded on the coast of Rocha department"
                  fill
                  className="object-cover"
                  sizes="(min-width: 640px) 448px, 100vw"
                />
              </div>
              <figcaption className="mt-2 text-sm text-marca-grafito text-center">
                An adult franciscana (Pontoporia blainvillei) stranded on
                the coast of Rocha department.
              </figcaption>
            </figure>

            <p className="text-base leading-8 text-texto">
              When animals strand alive, as most often happens with the
              franciscana (<span className="italic">Pontoporia
              blainvillei</span>), we work with the team from the Alliance
              for Franciscana Dolphin Research, Rescue, Rehabilitation and
              Conservation (AFC3R). This group's members are more than 30
              aquatic mammal professionals — veterinarians, biologists and
              rehabilitation specialists from Brazil, Uruguay, Argentina,
              the USA and Germany — with long experience handling small
              cetaceans (Meegan et al. 2022).
            </p>
            <p className="mt-4 text-base leading-8 text-texto">
              For more information about the Alliance, visit{" "}
              <a
                href="https://yaqupacha.de/es/proyecto-la-plata-delfin/"
                className="text-marca-oscuro underline underline-offset-4"
              >
                yaqupacha.de/es/proyecto-la-plata-delfin
              </a>
              .
            </p>
            <p className="mt-8 text-base leading-8 text-texto">
              This Alliance was created in 2019 in response to the high
              number of live franciscana strandings in South America. This
              small dolphin species lives exclusively in the coastal
              waters of Brazil, Uruguay and Argentina, and is today one of
              the most threatened dolphin species in the region, along
              with the tonina, or Lahille's bottlenose dolphin (
              <span className="italic">Tursiops truncatus gephyreus</span>
              ). The franciscana's biggest threat comes from bycatch in
              artisanal and industrial fishing gear, with thousands of
              animals dying entangled in nets every year (Secchi et al.
              2021).
            </p>
            <p className="mt-8 text-base leading-8 text-texto">
              Over the last 20 years, the number of live franciscana
              strandings recorded in a small part of the species' full
              range has been more than 133 animals (Meegan et al. 2022).
              What's striking about these stranded animals is that more
              than 96% are very young, particularly newborn calves.
            </p>

            <figure className="my-8">
              <div className="relative aspect-[4/3] w-full max-w-md mx-auto overflow-hidden rounded-lg">
                <Image
                  src="/varamientos/cria.webp"
                  alt="Newborn franciscana stranded alive on the coast of Rocha"
                  fill
                  className="object-cover"
                  sizes="(min-width: 640px) 448px, 100vw"
                />
              </div>
              <figcaption className="mt-2 text-sm text-marca-grafito text-center">
                A newborn franciscana stranded alive on the coast of
                Rocha.
              </figcaption>
            </figure>

            <p className="text-base leading-8 text-texto">
              A first step was establishing protocols for handling live
              neonatal, juvenile and adult franciscanas, based not only on
              many years of experience but also on scientific evidence.
              Each live franciscana stranding is therefore handled
              collectively, with expert guidance and systematic recording
              of the actions taken.
            </p>

            <figure className="my-8">
              <div className="relative aspect-[4/3] w-full max-w-md mx-auto overflow-hidden rounded-lg">
                <Image
                  src="/varamientos/rescate.webp"
                  alt="Franciscana calf rescued alive on the beach at La Coronilla, Rocha"
                  fill
                  className="object-cover"
                  sizes="(min-width: 640px) 448px, 100vw"
                />
              </div>
              <figcaption className="mt-2 text-sm text-marca-grafito text-center">
                A franciscana calf rescued alive on the beach at La
                Coronilla, Rocha.
              </figcaption>
            </figure>
          </div>
        </Section>

        <BloqueReporte tipo="varamiento" locale={locale} />
      </>
    );
  }

  return (
    <>
      <Section fondo="claro">
        <PageHeader
          title="Grupo de Trabajo en Varamientos"
          description="Varamientos de cetáceos en la costa uruguaya."
        />
        <div className="mt-8 max-w-3xl mx-auto">
          <p className="text-base leading-8 text-texto">
            El registro y seguimiento de los varamientos son fuentes de
            información importantes para el estudio de diversos aspectos de
            la biología de estos animales, y para el registro de nuevas
            especies para el país y la ciencia.
          </p>
          <p className="mt-8 text-base leading-8 text-texto">
            En conjunto con la asociación civil Karumbé, realizamos
            relevamientos sistemáticos en la costa uruguaya para registrar
            los varamientos de tortugas y cetáceos vivos o muertos, y
            comprender las causas que los provocan.
          </p>
          <p className="mt-8 text-base leading-8 text-texto">
            Cuando los animales varan muertos, procedemos a la
            identificación de la especie, la recolección de datos
            morfológicos y de muestras de tejidos para estudios de dieta,
            estructura genética poblacional, contaminantes, entre otros.
          </p>

          <figure className="my-8">
            <div className="relative aspect-[4/3] w-full max-w-md mx-auto overflow-hidden rounded-lg">
              <Image
                src="/varamientos/adulto.webp"
                alt="Franciscana adulta varada en la costa del departamento de Rocha"
                fill
                className="object-cover"
                sizes="(min-width: 640px) 448px, 100vw"
              />
            </div>
            <figcaption className="mt-2 text-sm text-marca-grafito text-center">
              Franciscana (Pontoporia blainvillei) adulta varada en la
              costa del departamento de Rocha.
            </figcaption>
          </figure>

          <p className="text-base leading-8 text-texto">
            Cuando los animales varan vivos, como ocurre con la franciscana
            (<span className="italic">Pontoporia blainvillei</span>) en
            mayor frecuencia, trabajamos con el equipo de la Alianza para
            la Investigación, Rescate, Rehabilitación y Conservación del
            Delfín Franciscana (AFC3R). Los miembros de este grupo son más
            de 30 profesionales de los mamíferos acuáticos — veterinarios,
            biólogos y especialistas en rehabilitación de Brasil, Uruguay,
            Argentina, EE.UU. y Alemania — con una larga experiencia en el
            trato con pequeños cetáceos (Meegan et al. 2022).
          </p>
          <p className="mt-4 text-base leading-8 text-texto">
            Por más información sobre la Alianza, entrá a{" "}
            <a
              href="https://yaqupacha.de/es/proyecto-la-plata-delfin/"
              className="text-marca-oscuro underline underline-offset-4"
            >
              yaqupacha.de/es/proyecto-la-plata-delfin
            </a>
            .
          </p>
          <p className="mt-8 text-base leading-8 text-texto">
            Esta Alianza se creó en 2019 en respuesta al elevado número de
            varamientos vivos de franciscanas en América del Sur. Esta
            pequeña especie de delfín vive exclusivamente en las aguas
            costeras de Brasil, Uruguay y Argentina, y es hoy una de las
            especies de delfín más amenazada de esta región, junto con la
            tonina o delfín nariz de botella de Lahille (
            <span className="italic">Tursiops truncatus gephyreus</span>
            ). La mayor amenaza de la franciscana proviene de la captura
            incidental en artes de pesca artesanal e industrial, con miles
            de animales que mueren enmallados en las redes cada año (Secchi
            et al. 2021).
          </p>
          <p className="mt-8 text-base leading-8 text-texto">
            En los últimos 20 años, el número de franciscanas varadas vivas
            encontradas en una pequeña zona de toda el área de distribución
            ha sido de más de 133 animales (Meegan et al. 2022). Lo
            sorprendente de estos animales varados es que más del 96% son
            animales muy jóvenes, en particular, crías recién nacidas.
          </p>

          <figure className="my-8">
            <div className="relative aspect-[4/3] w-full max-w-md mx-auto overflow-hidden rounded-lg">
              <Image
                src="/varamientos/cria.webp"
                alt="Franciscana recién nacida varada viva en la costa de Rocha"
                fill
                className="object-cover"
                sizes="(min-width: 640px) 448px, 100vw"
              />
            </div>
            <figcaption className="mt-2 text-sm text-marca-grafito text-center">
              Franciscana recién nacida varada viva en la costa de Rocha.
            </figcaption>
          </figure>

          <p className="text-base leading-8 text-texto">
            Una primera medida adoptada fue establecer protocolos para el
            abordaje de franciscanas neonatas, juveniles y adultas vivas,
            basados no sólo en muchos años de experiencia, sino también en
            hechos científicos. Así, cada varamiento de una franciscana
            viva se trabaja de manera colectiva, con asesoramiento de
            expertos y sistematización de las acciones realizadas.
          </p>

          <figure className="my-8">
            <div className="relative aspect-[4/3] w-full max-w-md mx-auto overflow-hidden rounded-lg">
              <Image
                src="/varamientos/rescate.webp"
                alt="Cría de franciscana rescatada viva en la playa de La Coronilla, Rocha"
                fill
                className="object-cover"
                sizes="(min-width: 640px) 448px, 100vw"
              />
            </div>
            <figcaption className="mt-2 text-sm text-marca-grafito text-center">
              Cría de franciscana rescatada viva en la playa de La
              Coronilla, Rocha.
            </figcaption>
          </figure>
        </div>
      </Section>

      <BloqueReporte tipo="varamiento" locale={locale} />
    </>
  );
}
