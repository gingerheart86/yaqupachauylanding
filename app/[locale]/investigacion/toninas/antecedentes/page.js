import Image from "next/image";
import { Section, PageHeader } from "../../../../../components/ui";
import { alternatesPara } from "../../../../../lib/i18n";

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export function generateMetadata({ params: { locale } }) {
  const alternates = alternatesPara("investigacion/toninas/antecedentes");
  if (locale === "en") {
    return {
      title: "Background of Proyecto Toninas",
      description:
        "More than twenty years studying toninas on the Uruguayan coast.",
      alternates,
    };
  }
  return {
    title: "Antecedentes del Proyecto Toninas",
    description:
      "Más de veinte años estudiando a las toninas en la costa uruguaya: cómo empezó el Proyecto Toninas en 2002 y qué resultados dejó.",
    alternates,
  };
}

export default function Home({ params: { locale } }) {
  if (locale === "en") {
    return (
      <Section fondo="claro">
        <PageHeader title="Background" />
        <div className="mt-8">
          <p className="text-base leading-8 text-texto">
            In 2002, Proyecto Toninas began the first systematic study of
            several aspects of the ecology and behaviour of toninas along
            the coastal zone of La Coronilla and Cabo Polonio, which are
            now part of the National System of Protected Areas (SNAP).
            Between 2002 and 2007, the studies aimed to find out how often
            toninas were observed on those beaches, describe their
            behaviour, and test the photo-identification technique to
            identify individuals through photographs of long-lasting
            natural marks on the dorsal fin (Würsig and Würsig 1977).
            During that same period, studies of the social structure of
            the groups also began — that is, how they are made up (adult,
            juvenile and calf individuals) and how photo-identified
            individuals associate with one another (whether there is any
            preference between individuals).
          </p>
          <p className="mt-8 text-base leading-8 text-texto">
            🐬💙🌊 Overall, more than half of the individuals in the
            tonina population show long-lasting marks on the trailing edge
            of their dorsal fin. These marks can be notches, cuts,
            depressions or colour changes that alter the profile of the
            fin. This is how researchers can identify each tonina
            individually. The marks may originate from interactions
            between animals during socialising or mating. They can also
            be caused by boat propeller cuts or entanglement in fishing
            nets.
          </p>

          <p className="mt-8 text-base leading-8 text-texto">
            📸 In Uruguay, more than 45 toninas have been identified
            through photographs of natural dorsal-fin marks (Laporta 2009,
            Laporta et al. 2016, Menchaca et al. 2019). Each tonina has a
            name and a corresponding number, and they are catalogued in a
            📖 photo-identification catalogue, used to record the toninas
            observed in our waters and as a reference for comparison with
            other areas. Fin photos provide very valuable information
            about the abundance and movements of individuals in the
            population, how long each individual stays in a given area,
            association preferences, calving intervals, and other data.
          </p>
          <h2 className="text-mar-800 font-semibold text-2xl mt-4">
            Catalogue photo examples
          </h2>
          <div className="grid sm:grid-cols-4 grid-cols-2 md:grid-cols-5 gap-x-5">
            <div className="relative aspect-square w-full mt-2">
              <Image
                src="/toninas/1.webp"
                alt="Tonina dorsal-fin identification photo"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 20vw, (min-width: 640px) 25vw, 45vw"
              />
            </div>
            <div className="relative aspect-square w-full mt-2">
              <Image
                src="/toninas/aletas1.webp"
                alt="Tonina dorsal-fin identification photo"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 20vw, (min-width: 640px) 25vw, 45vw"
              />
            </div>
            <div className="relative aspect-square w-full mt-2">
              <Image
                src="/toninas/3.webp"
                alt="Tonina dorsal-fin identification photo"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 20vw, (min-width: 640px) 25vw, 45vw"
              />
            </div>
            <div className="relative aspect-square w-full mt-2">
              <Image
                src="/toninas/aletas2.webp"
                alt="Tonina dorsal-fin identification photo"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 20vw, (min-width: 640px) 25vw, 45vw"
              />
            </div>
            <div className="relative aspect-square w-full mt-2">
              <Image
                src="/toninas/aletas3.webp"
                alt="Tonina dorsal-fin identification photo"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 20vw, (min-width: 640px) 25vw, 45vw"
              />
            </div>
          </div>
          <p className="mt-8 text-base leading-8 text-texto">
            Since 2017, Proyecto Toninas has been acoustically monitoring
            tonina groups in Uruguay, aiming to build a whistle catalogue.
            Within this work, it was found that toninas use a variety of
            whistle contours, mostly emitting multiloop, constant and
            upsweep whistles. The emission frequency range was between 4
            and 11 kHz, and most whistles had a minimum frequency between
            2.1 and 5.1 kHz, a maximum frequency below 12 kHz, and a
            duration under 600 ms (Menchaca 2018).
            <div className="prose my-4">
              <h3>🎧 Listen to a whistle</h3>
              <audio
                controls
                className="my-4"
                controlsList="nodownload noremoteplayback noplaybackrate"
              >
                <source src="/silbido.mp3" type="audio/mp3" />
              </audio>
            </div>
            In addition, a comparative whistle study together with
            colleagues from Brazil found that toninas from southern Brazil
            and Uruguay produce sounds that are more similar to each other
            than to those produced by toninas occurring in Rio de Janeiro,
            which could be explained by genetic divergence or
            environmental variance (Lima et al. 2020).
          </p>
        </div>
      </Section>
    );
  }

  return (
    <Section fondo="claro">
      <PageHeader title="Antecedentes" />
      <div className="mt-8">
        <p className="text-base leading-8 text-texto">
          En el año 2002, con el Proyecto Toninas se inició el primer estudio
          sistemático de varios aspectos de la ecología y el comportamiento de
          las toninas en la zona costera de La Coronilla y Cabo Polonio, que
          actualmente integran el Sistema Nacional de Áreas Protegidas (SNAP).
          Entre 2002 y 2007, los estudios apuntaron a conocer la frecuencia
          con que se observaban las toninas en aquellas playas, describir su
          comportamiento y poner a prueba la técnica de foto-identificación
          para lograr identificar a los individuos mediante fotografías de las
          marcas naturales de larga duración presentes en la aleta dorsal
          (Würsig y Würsig 1977). En ese mismo período se comenzaron a
          realizar estudios sobre la estructura social de los grupos, es
          decir, cómo están integrados (individuos adultos, juveniles, crías)
          y cómo se asocian los individuos foto-identificados entre sí (si hay
          alguna preferencia entre individuos).
        </p>
        <p className="mt-8 text-base leading-8 text-texto">
          🐬💙🌊 En general, más de la mitad de los individuos de la población
          de toninas presentan marcas de larga duración en el borde posterior
          de su aleta dorsal. Estas marcas pueden ser muescas, cortes,
          depresiones o cambios de color que alteran el perfil de su aleta. De
          esta manera, las investigadoras pueden identificar a cada una de las
          toninas de manera individual. El origen de las marcas puede ser
          debido a la interacción entre ellas durante la socialización o
          reproducción. También pueden ser producidas por cortes de hélices de
          barcos o por enmalles con redes de pesca.
        </p>

        <p className="mt-8 text-base leading-8 text-texto">
          📸En Uruguay se han identificado más de 45 toninas a través de
          fotografías de las marcas naturales de la aleta dorsal (Laporta
          2009, Laporta et al. 2016, Menchaca et al. 2019). Cada tonina tiene
          un nombre, su número correspondiente y están ordenadas en un 📖
          catálogo de foto-identificación, que sirve para registrar las
          toninas que se observaran en nuestras aguas y como referencia para
          comparar con otras zonas. Las fotos de las aletas brindan
          información muy valiosa sobre la abundancia y movimientos de los
          individuos en la población, el tiempo que permanece cada individuo
          en un área determinada, las preferencias de asociación, los
          intervalos de nacimiento de las crías, entre otros datos.
        </p>
        <h2 className="text-mar-800 font-semibold text-2xl mt-4">
          Ejemplo de fotos del catálogo
        </h2>
        <div className="grid sm:grid-cols-4 grid-cols-2 md:grid-cols-5 gap-x-5">
          <div className="relative aspect-square w-full mt-2">
            <Image
              src="/toninas/1.webp"
              alt="Foto de identificación de aleta de tonina"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 20vw, (min-width: 640px) 25vw, 45vw"
            />
          </div>
          <div className="relative aspect-square w-full mt-2">
            <Image
              src="/toninas/aletas1.webp"
              alt="Foto de identificación de aleta de tonina"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 20vw, (min-width: 640px) 25vw, 45vw"
            />
          </div>
          <div className="relative aspect-square w-full mt-2">
            <Image
              src="/toninas/3.webp"
              alt="Foto de identificación de aleta de tonina"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 20vw, (min-width: 640px) 25vw, 45vw"
            />
          </div>
          <div className="relative aspect-square w-full mt-2">
            <Image
              src="/toninas/aletas2.webp"
              alt="Foto de identificación de aleta de tonina"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 20vw, (min-width: 640px) 25vw, 45vw"
            />
          </div>
          <div className="relative aspect-square w-full mt-2">
            <Image
              src="/toninas/aletas3.webp"
              alt="Foto de identificación de aleta de tonina"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 20vw, (min-width: 640px) 25vw, 45vw"
            />
          </div>
        </div>
        <p className="mt-8 text-base leading-8 text-texto">
          A partir del 2017, el Proyecto Toninas comenzó a monitorear
          acústicamente a los grupos de toninas de Uruguay, con el objetivo de
          construir un catálogo de silbidos. En ese marco, se determinó que
          las toninas utilizan una diversidad de contornos, emitiendo
          mayoritariamente silbidos multiloop, constantes y ascendentes. El
          rango de frecuencia de emisión se ubicó entre 4 y 11 kHz, y la
          mayoría de los silbidos tuvo una frecuencia mínima entre 2,1 y 5,1
          kHz, una frecuencia máxima menor a 12 kHz, y una duración menor a
          600 ms (Menchaca 2018).
          <div className="prose my-4">
            <h3>🎧 Escucha un silbido</h3>
            <audio
              controls
              className="my-4"
              controlsList="nodownload noremoteplayback noplaybackrate"
            >
              <source src="/silbido.mp3" type="audio/mp3" />
            </audio>
          </div>
          Además, en un estudio comparativo de silbidos, en conjunto con
          colegas de Brasil, se determinó que las toninas del sur de Brasil y
          Uruguay emiten sonidos que son más similares entre sí que los que
          emiten las toninas que ocurren en Río de Janeiro, lo que podría
          explicarse por divergencia génetica o varianza ambiental (LIma et
          al. 2020).
        </p>
      </div>
    </Section>
  );
}
