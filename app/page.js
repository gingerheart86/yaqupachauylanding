import Image from "next/image";
import { socialLinks } from "../components/social-icons";
import {
  Section,
  Card,
  Button,
  Eyebrow,
  ProjectCardDestacado,
  ProjectCardCompacta,
} from "../components/ui";
import HeroVideo from "../components/HeroVideo";

export default function Home() {
  return (
    <div className="relative ">
      <HeroVideo>
        <h1 className="sr-only">Toninas</h1>
        <Image
          src="/logo-toninas.png"
          alt="Proyecto Toninas: Centinelas de la Costa"
          width={600}
          height={494}
          className="w-48 h-auto sm:w-64"
          priority
        />
        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="/contacto" variante="primario">
            Reportar un avistamiento
          </Button>
          <Button
            href="/especies"
            variante="secundario"
            className="!border-white !text-white hover:!bg-white/10"
          >
            Conocé a la tonina
          </Button>
        </div>
      </HeroVideo>

      <Section fondo="claro">
        <Eyebrow>Quiénes somos</Eyebrow>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-mar-800 sm:text-3xl lg:text-4xl">
          Yaqu Pacha Uruguay
        </h2>
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <Card className="lg:col-span-2">
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
          <div className="grid grid-cols-3 lg:grid-cols-1 gap-3">
            {[
              { src: "/Paula.webp", alt: "Paula Laporta" },
              { src: "/caro.webp", alt: "Carolina Menchaca" },
              { src: "/checho.webp", alt: "Cecilia Laporta" },
            ].map((foto) => (
              <div
                key={foto.src}
                className="relative aspect-square w-full overflow-hidden rounded-lg"
              >
                <Image
                  src={foto.src}
                  alt={foto.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 12rem, 33vw"
                />
              </div>
            ))}
          </div>
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

      <Section fondo="costa">
        <Eyebrow>Qué hacemos</Eyebrow>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-mar-800 sm:text-3xl lg:text-4xl">
          Nuestros proyectos
        </h2>
        <div className="mt-8">
          <ProjectCardDestacado
            href="/proyectos/toninas"
            title="Proyecto Toninas"
            description="El proyecto que estudia a las toninas en La Paloma, Cabo Polonio y Cerro Verde desde 2002, y trabaja en educación ambiental con las comunidades de la costa de Rocha."
            image="/pic1.png"
            imageAlt="Actividades del proyecto Toninas Centinelas de la costa"
          />
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ProjectCardCompacta
            href="/proyectos/gephyreus"
            title="Proyecto Gephyreus"
            description="Trabajo regional con Brasil y Argentina para conservar al delfín de Lahille."
          />
          <ProjectCardCompacta
            href="/proyectos/varamientos"
            title="Red Nacional de Varamientos"
            description="Monitoreo de varamientos de mamíferos acuáticos en la costa uruguaya."
          />
          <ProjectCardCompacta
            href="/proyectos/identidad-franca"
            title="Identidad Franca"
            description="Estudio e identificación de la ballena franca austral."
          />
        </div>
      </Section>

      <Section fondo="claro" className="flex justify-center">
        <iframe
          className="w-full aspect-video max-w-5xl h-[340px] sm:h-[540px]"
          src={`https://www.youtube.com/embed/KQ81xnqVkLY`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          title="yaqupacha youtube"
        />
      </Section>

      <div className="relative pb-12 px-4 sm:px-6 lg:px-8 bg-mar-800 w-full">
        <div className="absolute inset-0">
          <Image
            className="object-cover"
            src="/gomon.webp"
            alt="Costa uruguaya"
            fill
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-mar-800/70 mix-blend-multiply"
            aria-hidden="true"
          />
        </div>
        <div className="relative mx-auto max-w-7xl py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Conoce más en nuestras redes sociales
          </h2>
          <div className="max-w-3xl flex space-x-10 mt-8 text-white">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-mar-800 rounded-sm"
              >
                <span className="sr-only">{item.name}</span>
                <item.Icon
                  className="w-12 h-12 sm:w-20 sm:h-20"
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
