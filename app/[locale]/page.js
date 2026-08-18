import Image from "next/image";
import Link from "next/link";
import {
  Section,
  Button,
  Eyebrow,
  ProjectCardDestacado,
  ProjectCardCompacta,
  Garabato,
} from "../../components/ui";
import HeroVideo from "../../components/HeroVideo";
import BandaIlustrada from "../../components/BandaIlustrada";
import { SURVEY123_URL } from "../../lib/contacto";
import { getDictionary } from "../../lib/i18n";
import { getUltimasNoticias } from "../../lib/noticias";

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

function fechaCorta(fecha) {
  return new Intl.DateTimeFormat("es-UY", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(new Date(fecha));
}

// Orden de secciones de la portada - docs/fase3-navegacion-portada.md
// seccion 4. La seccion de noticias (punto 5) se arma sola desde
// content/noticias/: si todavia no hay ninguna nota, no se renderiza -
// una seccion de "ultimas noticias" vacia es peor que no tener la
// seccion (fase3-arquitectura-y-contenido.md seccion 9).
export default function Home({ params: { locale } }) {
  const esIngles = locale === "en";
  const noticias = esIngles ? [] : getUltimasNoticias(3);

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

      {/* 2. Dos tarjetas destacadas */}
      <Section fondo="claro" innerClassName="!py-0 !pt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ProjectCardDestacado
            href={SURVEY123_URL ?? `/${locale}/colabora/contacto`}
            title={esIngles ? "Report a sighting" : "Reportá un avistamiento"}
            description={
              esIngles
                ? "Did you spot a tonina, a whale, an orca or a franciscana? Tell us where and when."
                : "¿Viste una tonina, una ballena, una orca o una franciscana? Contanos dónde y cuándo."
            }
            image="/dol1.webp"
            imageAlt={esIngles ? "A tonina off the Uruguayan coast" : "Tonina en la costa uruguaya"}
          />
          <ProjectCardDestacado
            href={`/${locale}/colabora/contacto`}
            title={esIngles ? "Volunteer with us" : "Sumate como voluntaria"}
            description={
              esIngles
                ? "Collaborate with Yaqu Pacha Uruguay in fieldwork, environmental education and outreach."
                : "Colaborá con Yaqu Pacha Uruguay en el trabajo de campo, la educación ambiental y la divulgación."
            }
            image="/gomon.webp"
            imageAlt={esIngles ? "The Uruguayan coast" : "Costa uruguaya"}
          />
        </div>
      </Section>

      <div className="flex justify-center bg-white pt-8">
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
        <Eyebrow tono="limon">{esIngles ? "What we do" : "Qué hacemos"}</Eyebrow>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
          {esIngles ? "Research" : "Investigación"}
        </h2>
        <div className="mt-8">
          <ProjectCardDestacado
            href={`/${locale}/investigacion/toninas`}
            title="Proyecto Toninas"
            description={
              esIngles
                ? "The project that has studied toninas in La Paloma, Cabo Polonio and Cerro Verde since 2002, and works on environmental education with coastal communities in Rocha."
                : "El proyecto que estudia a las toninas en La Paloma, Cabo Polonio y Cerro Verde desde 2002, y trabaja en educación ambiental con las comunidades de la costa de Rocha."
            }
            image="/proytoninas/1.webp"
            imageAlt={
              esIngles
                ? "Toninas Centinelas de la Costa project activities"
                : "Actividades del proyecto Toninas Centinelas de la costa"
            }
          />
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ProjectCardCompacta
            oscuro
            href={`/${locale}/investigacion/gephyreus`}
            title="Proyecto Gephyreus"
            description={
              esIngles
                ? "Regional work with Brazil and Argentina to conserve Lahille's bottlenose dolphin."
                : "Trabajo regional con Brasil y Argentina para conservar al delfín de Lahille."
            }
          />
          <ProjectCardCompacta
            oscuro
            href={`/${locale}/investigacion`}
            title={esIngles ? "See all our research" : "Ver toda la investigación"}
            description={
              esIngles
                ? "Yaqu Pacha Uruguay's four projects and its scientific publications."
                : "Los cuatro proyectos de Yaqu Pacha Uruguay y las publicaciones científicas."
            }
          />
        </div>
      </Section>

      {/* 5. Tres noticias - solo en espanol (bilingue selectivo), y no se
          renderiza si content/noticias/ esta vacio */}
      {noticias.length > 0 && (
        <Section fondo="costa">
          <Eyebrow>Novedades</Eyebrow>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-mar-800 sm:text-3xl lg:text-4xl">
            Noticias
          </h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {noticias.map((n) => (
              <Link
                key={n.slug}
                href={`/${locale}/noticias/${n.slug}`}
                className="group block overflow-hidden rounded-lg border-[0.5px] border-marca-grafito/20 bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-marca focus-visible:ring-offset-2"
              >
                {n.imagen && (
                  <div className="relative aspect-[16/9] w-full">
                    <Image
                      src={n.imagen}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(min-width: 1024px) 33vw, 100vw"
                    />
                  </div>
                )}
                <div className="p-5">
                  <h3 className="font-semibold text-mar-800">{n.titulo}</h3>
                  <p className="mt-1 text-sm text-marca-grafito">
                    {fechaCorta(n.fecha)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href={`/${locale}/noticias`}
              className="text-marca-oscuro font-medium underline underline-offset-4"
            >
              Ver todas las noticias
            </Link>
          </div>
        </Section>
      )}

      {/* 6. Banda ilustrada antes del footer */}
      <BandaIlustrada />
    </div>
  );
}
