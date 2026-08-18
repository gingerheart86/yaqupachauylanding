import { PaginaEspecie } from "../../../../components/ui";
import { alternatesPara } from "../../../../lib/i18n";

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export function generateMetadata({ params: { locale } }) {
  const alternates = alternatesPara("especies/tonina");
  if (locale === "en") {
    return {
      title: "Tonina (Lahille's bottlenose dolphin)",
      description:
        "Lahille's bottlenose dolphin (Tursiops truncatus gephyreus), the coastal dolphin of Uruguay.",
      alternates,
    };
  }
  return {
    title: "La tonina, el delfín de la costa uruguaya",
    description:
      "Qué es la tonina (Tursiops truncatus gephyreus), el delfín costero de Uruguay: dónde vive, cuántos quedan, cómo se comunica y por qué está en peligro.",
    alternates,
  };
}

export default function Page({ params: { locale } }) {
  const esIngles = locale === "en";

  if (esIngles) {
    return (
      <PaginaEspecie
        slug="tonina"
        nombreComun="Tonina"
        nombreCientifico="Tursiops truncatus gephyreus"
        locale={locale}
        proyectosAsociados={[
          {
            nombre: "Toninas Centinelas de la Costa",
            href: `/${locale}/investigacion/toninas`,
          },
          {
            nombre: "Proyecto Gephyreus",
            href: `/${locale}/investigacion/gephyreus`,
          },
        ]}
      >
        <p className="text-base leading-8 text-texto">
          The tonina, or Lahille's bottlenose dolphin (
          <span className="italic">Tursiops truncatus gephyreus</span>),
          occurs only along the coast of southern Brazil, Uruguay and
          Argentina. This animal mainly inhabits localized and restricted
          areas of the coastal zone, which makes it highly vulnerable to
          growing pressures from human activities, such as bycatch in
          fisheries, pollution, prey depletion from overfishing and other
          known factors. The subspecies' genetic variability is low in
          both nuclear and mtDNA markers, and the sum of available
          abundance estimates suggests a maximum total population size of
          600 individuals (Vermeulen et al. 2019).
        </p>
        <p className="mt-8 text-base leading-8 text-texto">
          In Uruguay, systematic studies of the tonina's ecology and
          behaviour began in 2002 in La Coronilla-Cerro Verde and Cabo
          Polonio, areas that are now part of the National System of
          Protected Areas (SNAP), through Proyecto Toninas. Since then,
          studies of abundance, habitat use, residency patterns,
          population genetic structure, trophic ecology, social structure
          and acoustic communication have been carried out. The
          information generated has contributed to the creation of
          protected areas, the inclusion of the tonina on SNAP's list of
          priority species for conservation, its status as a focal
          conservation target in the Cerro Verde e Islas de La Coronilla
          protected area, as a baseline for environmental impact
          assessments, and the conservation of the coastal environment. In
          particular, the research results contributed to the recognition
          of the tonina as a subspecies and to its IUCN assessment as
          Vulnerable (Vermeulen et al. 2019).
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-mar-800">
          What do we know about the ecology and behaviour of toninas in
          Uruguay?
        </h2>
        <p className="mt-8 text-base leading-8 text-texto">
          The latest abundance estimate for toninas is just 70 individuals,
          indicating a very small population (Laporta et al. 2016) whose
          distribution occurs mostly within 500 m of the coast, with the
          highest frequency of occurrence between La Paloma and La
          Coronilla-Cerro Verde (Rocha department). They also have a
          social system with fission-fusion dynamics, made up of casual
          and stable companions, where most associations are weak and
          non-random (Menchaca et al. 2019), although some animals
          maintain more stable bonds, associating to carry out particular
          behaviours (Menchaca 2018). To maintain these bonds, toninas use
          a variety of whistle contours, mostly emitting multiloop,
          constant and upsweep whistles. The emission frequency range was
          between 4 and 11 kHz, and most whistles had a minimum frequency
          between 2.1 and 5.1 kHz, a maximum frequency below 12 kHz, and a
          duration under 600 ms (Menchaca 2018).
        </p>
      </PaginaEspecie>
    );
  }

  return (
    <PaginaEspecie
      slug="tonina"
      nombreComun="Tonina"
      nombreCientifico="Tursiops truncatus gephyreus"
      locale={locale}
      proyectosAsociados={[
        {
          nombre: "Toninas centinelas de la costa",
          href: `/${locale}/investigacion/toninas`,
        },
        {
          nombre: "Proyecto Gephyreus",
          href: `/${locale}/investigacion/gephyreus`,
        },
      ]}
    >
      <p className="text-base leading-8 text-texto">
        La tonina Tursiops truncatus gephyreus ocurre únicamente en la costa
        del sur de Brasil, Uruguay y Argentina. Este animal habita
        principalmente en zonas localizadas y restringidas de la zona
        costera, lo que lo hace muy vulnerable a las crecientes presiones de
        las actividades humanas, como la captura incidental en las
        pesquerías, la contaminación, la disminución de presas por
        sobrepesca y otros factores conocidos. La variabilidad genética de
        la subespecie es baja tanto en los marcadores nucleares como en los
        de ADNmt, y la suma de las estimaciones de abundancia disponibles
        sugiere un tamaño máximo total de la población de 600 individuos
        (Vermeulen et al. 2019).
      </p>
      <p className="mt-8 text-base leading-8 text-texto">
        En Uruguay, los estudios sistemáticos de la ecología y el
        comportamiento de la tonina comenzaron en 2002 en La Coronilla-Cerro
        Verde y Cabo Polonio, áreas que integran el Sistema Nacional de
        Áreas Protegidas (SNAP), a través del Proyecto Toninas. Desde
        entonces, se vienen realizando estudios de abundancia, uso de
        hábitat, patrones de residencia, estructura genética poblacional,
        ecología trófica, estructura social y comunicación acústica. La
        información generada ha sido un aporte para la creación de áreas
        protegidas, la incorporación de la tonina a la lista de especies
        prioritarias para la conservación del SNAP, su valoración como
        objeto focal de conservación en el área protegida Cerro Verde e
        Islas de La Coronilla, como línea de base para la evaluación de
        impactos ambientales y la conservación del ambiente costero. En
        particular, los resultados de las investigaciones contribuyeron al
        reconocimiento de la tonina como subespecie y para su evaluación por
        la UICN en la categoría Vulnerable (Vermeulen et al. 2019).
      </p>

      <h2 className="mt-8 text-2xl font-semibold text-mar-800">
        Qué sabemos de la ecología y el comportamiento de las toninas en
        Uruguay?
      </h2>
      <p className="mt-8 text-base leading-8 text-texto">
        La última estimación de abundancia de toninas es de apenas 70
        individuos, lo que indica que se trata de una población muy reducida
        (Laporta et al. 2016) y cuya distribución ocurre fundamentalmente
        dentro de los 500m de la costa, con mayor frecuencia de ocurrencia
        entre La Paloma y La Coronilla-Cerro Verde ( Depto. de Rocha). Por
        otro lado, tienen un sistema social con dinámica de fisión-fusión,
        compuesto por compañeros casuales y compañeros estables, donde la
        mayoría de las asociaciones son débiles y no aleatorias (Menchaca et
        al. 2019), aunque algunos animales mantienen vínculos más estables,
        asociándose para realizar determinados comportamientos (Menchaca
        2018). Para mantener estos vínculos las toninas utilizan una
        diversidad de contornos, emitiendo mayoritariamente silbidos
        multiloop, constantes y ascendentes. El rango de frecuencia de
        emisión se ubicó entre 4 y 11 kHz, y la mayoría de los silbidos tuvo
        una frecuencia mínima entre 2,1 y 5,1 kHz, una frecuencia máxima
        menor a 12 kHz, y una duración menor a 600 ms (Menchaca 2018).
      </p>
    </PaginaEspecie>
  );
}
