import Image from "next/image";
import { PaginaEspecie } from "../../../../components/ui";
import TodoAviso from "../../../../components/TodoAviso";
import { alternatesPara } from "../../../../lib/i18n";

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export function generateMetadata({ params: { locale } }) {
  const alternates = alternatesPara("especies/franciscana");
  if (locale === "en") {
    return {
      title: "Franciscana (La Plata dolphin)",
      description:
        "The franciscana (La Plata dolphin, Pontoporia blainvillei) off the Uruguayan coast: one of the world's five river dolphin species, and among the most threatened.",
      alternates,
    };
  }
  return {
    title: "Franciscana, el delfín del Río de la Plata",
    description:
      "Qué es la franciscana (Pontoporia blainvillei): una de las cinco especies de delfines de río del mundo, y una de las más amenazadas. Distribución, biología y capturas incidentales.",
    alternates,
  };
}

export default function Page({ params: { locale } }) {
  if (locale === "en") {
    return (
      <PaginaEspecie
        slug="franciscana"
        nombreComun="Franciscana"
        nombreCientifico="Pontoporia blainvillei"
        locale={locale}
        todo
      />
    );
  }

  return (
    <PaginaEspecie
      slug="franciscana"
      nombreComun="Franciscana"
      nombreCientifico="Pontoporia blainvillei"
      locale={locale}
      imagen={{
        src: "/franciscana/hero.webp",
        alt: "Cría de franciscana asomando a la superficie en Aguas Dulces, Rocha",
      }}
      proyectosAsociados={[
        {
          nombre: "Grupo de Trabajo en Varamientos",
          href: `/${locale}/investigacion/varamientos`,
        },
      ]}
    >
      <p className="text-base leading-8 text-texto">
        La franciscana es una de las 5 especies de delfines de río que
        existen en el mundo y es la única que incurre en aguas oceánicas.
        Sólo se encuentra en la costa del Océano Atlántico Sudoccidental,
        desde Itaúnas, en el estado de Espírito Santo (Brasil), hasta Golfo
        Nuevo en la Península Valdés (Argentina). Habita preferentemente
        aguas someras con una profundidad inferior a los 50 metros.
      </p>
      <p className="mt-8 text-base leading-8 text-texto">
        Los delfines de río son morfológica y fisiológicamente distintos a
        los delfines marinos, presentan hocicos largos, ojos pequeños y un
        tamaño corporal que oscila entre 1,5 y 3,0 metros de longitud.
      </p>

      <figure className="my-8">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
          <Image
            src="/franciscana/infografia.webp"
            alt='Infografía "Franciscana o delfín del Plata", con mapa de distribución y estado de conservación Vulnerable'
            fill
            className="object-contain bg-white"
            sizes="(min-width: 1024px) 1024px, 100vw"
          />
        </div>
        <figcaption className="mt-2 text-sm text-marca-grafito">
          Infografía de la franciscana elaborada por la Dra. Julia Rouaux
          como parte de la exposición itinerante "Tramas infinitas", donde
          arte y ciencia se unen para retratar la fragilidad de la
          biodiversidad sudamericana.
        </figcaption>
      </figure>

      <h2 className="mt-8 text-2xl font-semibold text-mar-800">
        ¿Cómo reconocer a una franciscana?
      </h2>
      <p className="mt-4 text-base leading-8 text-texto">
        La franciscana es de color marrón grisáceo en el dorso y más claro
        en el vientre. Tiene la cabeza pequeña, el hocico largo y angosto.
        Su aleta dorsal es triangular y redondeada y las aletas pectorales
        tienen forma de remo. Tiene un total de 200 dientes pequeños y
        todos iguales, con los que se alimenta de peces juveniles de fondo
        como la pescadilla y la corvina, calamares y camarones.
      </p>
      <p className="mt-8 text-base leading-8 text-texto">
        Su nombre común posiblemente esté inspirado en el color de la
        vestimenta de los monjes franciscanos. Su nombre científico{" "}
        <span className="italic font-semibold">Pontoporia blainvillei</span>
        , deriva del griego <span className="italic">ponto</span>, que hace
        referencia al mar abierto, y <span className="italic">poria</span>,
        de poro, pasaje o cruce — porque habita tanto en estuarios como en
        el mar. El nombre <span className="italic">blainvillei</span> es en
        honor al naturalista francés Blainville (1777-1850).
      </p>
      <p className="mt-8 text-base leading-8 text-texto">
        La franciscana es un mamífero marino: tiene sangre caliente (o sea
        que mantiene su temperatura interna constante), respira por
        pulmones, gesta y pare una cría, la amamanta y la cuida durante un
        gran período de su vida. Las crías nacen entre octubre y febrero
        luego de 10 meses de gestación. La lactancia dura al menos 9 meses
        y después de 2 o 3 años de vida alcanzan la madurez sexual. Las
        franciscanas tienen una cría cada 2 años, que al nacer puede
        alcanzar los 70 cm de longitud. Los machos adultos miden entre 1,2
        m y 1,6 m, y las hembras entre 1,4 y 1,8 m; pesan entre 35 y 55 kg
        (Kasuya &amp; Brownell 1979).
      </p>

      <figure className="my-8 max-w-md mx-auto">
        <Image
          src="/franciscana/ilustracion.webp"
          alt="Ilustración científica de una franciscana vista de perfil"
          width={1200}
          height={515}
          className="w-full h-auto"
        />
        <figcaption className="mt-2 text-sm text-marca-grafito text-center">
          Franciscana (Pontoporia blainvillei). Ilustración científica:
          Julia Rouaux.
        </figcaption>
      </figure>

      <h2 className="mt-8 text-2xl font-semibold text-mar-800">
        Las franciscanas en su medio natural
      </h2>
      <p className="mt-4 text-base leading-8 text-texto">
        La franciscana es difícilmente observada desde la costa a lo largo
        de su distribución. Bahía Anegada (Argentina), Río de Janeiro y
        Baía de Babitonga (Brasil) son los únicos sitios donde se han
        estudiado franciscanas vivas y sus patrones de comportamiento. En
        Bahía de Babitonga se encuentra la única población de franciscanas
        del mundo que reside en una bahía, con aproximadamente 50
        individuos (Cremer y Simões-Lopes 2008; Wells et al. 2021).
      </p>
      <p className="mt-8 text-base leading-8 text-texto">
        Además de su pequeño tamaño y su coloración críptica que la hace
        camuflarse entre las aguas, la franciscana tiene un comportamiento
        discreto en la superficie: no realiza saltos fuera del agua y es
        evasiva ante las embarcaciones. Sólo pasa unos escasos segundos en
        la superficie, el suficiente para respirar. Generalmente se las
        observa solitarias, o en pequeños grupos que no superan los 6
        individuos.
      </p>
      <p className="mt-8 text-base leading-8 text-texto">
        En Uruguay existen diversos registros de franciscanas vivas
        comunicados por pescadores, investigadoras y público general. Desde
        Yaqu Pacha Uruguay estamos realizando esfuerzos para estudiar a la
        franciscana en vida libre, generando registros de avistamientos y
        detectando los sitios con mayor frecuencia de ocurrencia para poder
        realizar monitoreos a largo plazo.
      </p>

      <div className="my-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
          <Image
            src="/franciscana/esmeralda-1.webp"
            alt="Franciscana asomando a la superficie frente a la costa de La Esmeralda, Rocha"
            fill
            className="object-cover"
            sizes="(min-width: 640px) 512px, 100vw"
          />
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
          <Image
            src="/franciscana/esmeralda-2.webp"
            alt="Par de franciscanas nadando cerca de la costa de La Esmeralda, Rocha"
            fill
            className="object-cover"
            sizes="(min-width: 640px) 512px, 100vw"
          />
        </div>
      </div>
      <p className="text-sm text-marca-grafito text-center">
        Fotografías de franciscanas en La Esmeralda, Rocha. Créditos: Yaqu
        Pacha Uruguay.
      </p>

      <h2 className="mt-12 text-2xl font-semibold text-mar-800">
        ¿Cómo se distribuye la franciscana?
      </h2>
      <p className="mt-4 text-base leading-8 text-texto">
        Su distribución no es continua: en el sudeste de Brasil hay dos
        zonas donde la franciscana está ausente. Se han propuesto cinco
        áreas de manejo de la franciscana (FMA, por su sigla en inglés,{" "}
        <span className="italic">Franciscana's Management Areas</span>) en
        toda su distribución, y algunas de ellas están subdivididas en
        áreas más pequeñas. Esto se hizo en base al conocimiento científico
        sobre su distribución, abundancia, carga de contaminantes y
        parásitos, parámetros reproductivos, y datos morfológicos y
        genéticos.
      </p>

      <figure className="my-8 max-w-sm mx-auto">
        <Image
          src="/franciscana/mapa-fma.webp"
          alt="Mapa de las áreas de manejo (FMA) de la franciscana entre Brasil, Uruguay y Argentina"
          width={700}
          height={883}
          className="w-full h-auto"
        />
        <figcaption className="mt-2 text-sm text-marca-grafito text-center">
          Áreas de manejo de la franciscana (FMA), adaptado de Secchi et
          al. 2021.
        </figcaption>
      </figure>

      <h2 className="mt-8 text-2xl font-semibold text-mar-800">
        ¿Cuántas franciscanas hay?
      </h2>
      <p className="mt-4 text-base leading-8 text-texto">
        Las estimaciones de abundancia de franciscanas generalmente se
        realizan a través de censos aéreos en botes, avionetas o aviones
        bimotor, recorriendo transectas perpendiculares a la costa o en
        zig-zag. Así se aplica el método de distancias, donde se mide la
        distancia perpendicular (o el ángulo) entre el observador y el
        individuo o grupo de franciscanas. Con la ayuda de modelos
        matemáticos se obtiene una cifra de densidad de animales (número de
        individuos por superficie recorrida).
      </p>
      <p className="mt-8 text-base leading-8 text-texto">
        En la costa uruguaya se estima un total de 30.000 franciscanas
        (Sucunza et al. 2023). En el sur de Brasil, unas 13.000, y en la
        costa argentina unas 14.000. En el sudeste de Brasil se estiman
        unas 10.000 franciscanas (Secchi et al. 2021). Parece mucho, pero
        si se considera la mortalidad por captura incidental, están
        muriendo más franciscanas de las que nacen.
      </p>

      <h2 className="mt-8 text-2xl font-semibold text-mar-800">
        La captura incidental
      </h2>
      <p className="mt-4 text-base leading-8 text-texto">
        Las franciscanas quedan enmalladas incidentalmente en las redes de
        pesca artesanal e industrial a lo largo de toda su distribución.
        Esto hace que mueran ahogadas y, en muchos casos, aparezcan varadas
        en la playa. Se han realizado diversos estudios para reducir esta
        captura — alarmas que emiten sonido para ahuyentarlas, cambios en
        el material de las redes, botellas de plástico incorporadas para
        hacerlas más detectables — pero todavía no se han logrado tomar
        medidas de manejo de la pesca que reduzcan las capturas de forma
        efectiva.
      </p>
      <p className="mt-8 text-base leading-8 text-texto">
        Es una especie catalogada como{" "}
        <span className="font-semibold">Vulnerable</span> en la Lista Roja
        de las Especies Amenazadas de la UICN (Unión Internacional para la
        Conservación de la Naturaleza), basado en la sospecha de una
        disminución del 30% a lo largo de tres generaciones — que se
        espera aumente debido a la expansión de la pesca y la falta de
        medidas mitigadoras.
      </p>
    </PaginaEspecie>
  );
}
