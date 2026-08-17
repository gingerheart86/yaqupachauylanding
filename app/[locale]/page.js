import Image from "next/image";
import {
  Section,
  Card,
  Button,
  Eyebrow,
  ProjectCardDestacado,
  ProjectCardCompacta,
  Garabato,
} from "../../components/ui";
import HeroVideo from "../../components/HeroVideo";
import VideoInstitucional from "../../components/VideoInstitucional";
import BandaIlustrada from "../../components/BandaIlustrada";
import TodoAviso from "../../components/TodoAviso";
import { SURVEY123_URL } from "../../lib/contacto";
import { getDictionary } from "../../lib/i18n";

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

// Orden de secciones de la portada - docs/fase3-navegacion-portada.md
// seccion 4. La seccion de noticias (punto 5) no se renderiza todavia:
// no hay ninguna nota publicada, y una seccion de "ultimas noticias"
// vacia (o con placeholders inventados) es peor que no tener la
// seccion - mismo criterio que docs/fase3-arquitectura-y-contenido.md
// seccion 9.
export default function Home({ params: { locale } }) {
  const esIngles = locale === "en";

  return (
    <div className="relative ">
      {/* 1. Hero con video */}
      <HeroVideo>
        <h1 className="sr-only">Toninas</h1>
        <Image
          src="/decor/logo-proyecto-toninas-blanco.png"
          alt="Proyecto Toninas: Centinelas de la Costa"
          width={800}
          height={658}
          className="w-40 h-auto drop-shadow-lg sm:w-52"
          priority
        />
        <div className="mt-8">
          <Button href={`/${locale}/especies/tonina`} variante="primario">
            {esIngles ? "Meet the tonina" : "Conocé a la tonina"}
          </Button>
        </div>
      </HeroVideo>

      {esIngles ? (
        <Section fondo="claro">
          <TodoAviso locale={locale} />
        </Section>
      ) : (
        <>
          {/* 2. Dos tarjetas destacadas */}
          <Section fondo="claro" innerClassName="!py-0 !pt-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ProjectCardDestacado
                href={SURVEY123_URL ?? `/${locale}/colabora/contacto`}
                title="Reportá un avistamiento"
                description="¿Viste una tonina, una ballena, una orca o una franciscana? Contanos dónde y cuándo."
                image="/dol1.webp"
                imageAlt="Tonina en la costa uruguaya"
              />
              <ProjectCardDestacado
                href={`/${locale}/colabora/contacto`}
                title="Sumate como voluntaria"
                description="Colaborá con Yaqu Pacha Uruguay en el trabajo de campo, la educación ambiental y la divulgación."
                image="/gomon.webp"
                imageAlt="Costa uruguaya"
              />
            </div>
          </Section>

          {/* 3. Seccion institucional - sin fotos del equipo, esas van a /nosotros/integrantes */}
          <Section fondo="textura">
            <Eyebrow>Quiénes somos</Eyebrow>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-mar-800 sm:text-3xl lg:text-4xl">
              Yaqu Pacha Uruguay
            </h2>
            <div className="mt-6 max-w-3xl">
              <Card>
                <p className="text-base sm:text-xl text-texto">
                  Yaqu Pacha Uruguay es una filial de la Organización para la
                  Conservación de Mamíferos Acuáticos en América del Sur - Yaqu
                  Pacha e.V. en Alemania. La organización tiene como objetivos
                  investigar y conservar las especies de mamíferos acuáticos en
                  América del Sur, en particular aquellas amenazadas, así como
                  difundir y concientizar a las personas sobre la importancia de
                  estudiar y conservar a estas especies y sus ambientes.
                </p>
                <p className="mt-4 text-base sm:text-xl text-texto">
                  Esta filial fue creada en 2013 incorporando al Proyecto Toninas
                  que se venía desarrollando desde 2002 en Uruguay. Los dos
                  objetivos principales de este proyecto son estudiar a la
                  tonina{" "}
                  <span className="italic font-semibold">
                    Tursiops truncatus gephyreus
                  </span>
                  , una subespecie del delfín nariz de botella{" "}
                  <span className="italic font-semibold">
                    Tursiops truncatus
                  </span>{" "}
                  que ocurre únicamente en la zona costera del sur de Brasil,
                  Uruguay y Argentina, y promover la educación ambiental costera,
                  la conciencia sobre los efectos del cambio climático y a la
                  tonina como especie centinela de la costa.
                </p>
              </Card>
            </div>
            <div className="mt-8 max-w-3xl mx-auto">
              <VideoInstitucional />
            </div>
            <div className="mt-6 flex justify-center">
              <Image
                src="/logo_sinf.png"
                className="w-40 h-auto"
                alt="Logo institucional"
                width={600}
                height={514}
              />
            </div>
          </Section>

          <div className="flex justify-center bg-costa-100 pt-8">
            <Garabato numero={5} registro="alto" width={72} />
          </div>

          {/* 4. Dos proyectos, no cuatro - Toninas destacado y uno mas */}
          <Section fondo="mar" innerClassName="pt-0 relative">
            <Garabato
              numero={3}
              registro="alto"
              width={24}
              className="absolute right-8 top-20 hidden sm:block"
            />
            <Eyebrow tono="limon">Qué hacemos</Eyebrow>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Investigación
            </h2>
            <div className="mt-8">
              <ProjectCardDestacado
                href={`/${locale}/investigacion/toninas`}
                title="Proyecto Toninas"
                description="El proyecto que estudia a las toninas en La Paloma, Cabo Polonio y Cerro Verde desde 2002, y trabaja en educación ambiental con las comunidades de la costa de Rocha."
                image="/proytoninas/1.webp"
                imageAlt="Actividades del proyecto Toninas Centinelas de la costa"
              />
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ProjectCardCompacta
                oscuro
                href={`/${locale}/investigacion/gephyreus`}
                title="Proyecto Gephyreus"
                description="Trabajo regional con Brasil y Argentina para conservar al delfín de Lahille."
              />
              <ProjectCardCompacta
                oscuro
                href={`/${locale}/investigacion`}
                title="Ver toda la investigación"
                description="Los cuatro proyectos de Yaqu Pacha Uruguay y las publicaciones científicas."
              />
            </div>
          </Section>

          {/* 6. Banda ilustrada antes del footer */}
          <BandaIlustrada />
        </>
      )}
    </div>
  );
}
