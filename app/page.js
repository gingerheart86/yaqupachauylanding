import Image from "next/image";
import { socialLinks } from "../components/social-icons";
import { Section, Card, Button, Eyebrow } from "../components/ui";

export default function Home() {
  return (
    <div className="relative ">
      <div className="relative sm:min-h-[40rem] min-h-[10rem]">
        <div className="absolute inset-0">
          <Image
            className="object-cover"
            src="/dol1.webp"
            alt="Toninas nadando frente a la costa de Uruguay"
            fill
            sizes="100vw"
            priority
          />
          <div
            className="absolute inset-0 bg-mar-800/60 mix-blend-multiply"
            aria-hidden="true"
          />
        </div>
        <div className="relative mx-auto max-w-7xl py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <Eyebrow tono="limon">Centinelas de la costa</Eyebrow>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            Toninas
          </h1>
          <p className="mt-6 max-w-xl text-lg text-mar-100 sm:text-xl">
            Si cuidamos las toninas cuidamos la costa. Si cuidamos la costa
            cuidamos las toninas.
          </p>
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
        </div>
      </div>

      <Section fondo="claro">
        <h2 className="text-2xl font-semibold tracking-tight text-mar-800 sm:text-3xl lg:text-4xl">
          ¿Qué es Yaqu Pacha Uruguay?
        </h2>
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-6">
          <Card className="max-w-3xl">
            <p className="text-base sm:text-xl text-texto">
              Yaqu Pacha Uruguay es una filial de la Organización para la
              Conservación de Mamíferos Acuáticos en América del Sur - Yaqu
              Pacha e.V. en Alemania. La organización tiene como objetivos
              investigar y conservar las especies de mamíferos acuáticos en
              América del Sur, en particular aquellas amenazadas, así como
              difundir y concientizar a las personas sobre la importancia de
              estudiar y conservar a estas especies y sus ambientes.
            </p>
          </Card>
          <div className="flex justify-around flex-1">
            <Image
              src="/logo_sinf.png"
              className="w-56 h-56"
              alt="Logo institucional"
              width={600}
              height={514}
            />
          </div>
        </div>
      </Section>

      <Section fondo="costa">
        <h2 className="text-2xl font-semibold tracking-tight text-mar-800 sm:text-3xl lg:text-4xl">
          ¿Cuál es el objetivo?
        </h2>
        <Card className="mt-6 max-w-3xl">
          <p className="text-base sm:text-xl text-texto">
            Esta filial fue creada en 2013 incorporando al Proyecto Toninas
            que se venía desarrollando desde 2002 en Uruguay. Los dos
            objetivos principales de este proyecto son estudiar a la tonina{" "}
            <span className="italic font-semibold">
              Tursiops truncatus gephyreus
            </span>
            , una subespecie del delfín nariz de botella{" "}
            <span className="italic font-semibold">Tursiops truncatus</span>{" "}
            que ocurre únicamente en la zona costera del sur de Brasil,
            Uruguay y Argentina, y promover la educación ambiental costera,
            la conciencia sobre los efectos del cambio climático y a la
            tonina como especie centinela de la costa.
          </p>
        </Card>
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
