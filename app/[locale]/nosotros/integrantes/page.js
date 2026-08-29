import Image from "next/image";
import { Section, PageHeader, Card, Garabato } from "../../../../components/ui";
import { getIntegrantes } from "../../../../lib/integrantes";
import { alternatesPara } from "../../../../lib/i18n";

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export function generateMetadata({ params: { locale } }) {
  const alternates = alternatesPara("nosotros/integrantes");
  if (locale === "en") {
    return {
      title: "Team",
      description:
        "The team of biologists researching toninas along the Uruguayan coast.",
      alternates,
    };
  }
  return {
    title: "Integrantes",
    description:
      "El equipo de biólogas y biólogos que investiga a las toninas en la costa de Uruguay.",
    alternates,
  };
}

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-marca focus-visible:ring-offset-2 rounded-sm";

const GRUPOS = ["Equipo científico y dirección", "Equipo artístico"];
const GRUPOS_EN = {
  "Equipo científico y dirección": "Science and management team",
  "Equipo artístico": "Art team",
};

function Grilla({ personas, esIngles }) {
  return (
    <ul role="list" className="mt-8 flex flex-wrap justify-around">
      {personas.map((p) => (
        <li key={p.nombre} className="sm:py-8 max-w-sm mb-8 my-10 sm:my-0">
          <Card>
            <div className="relative w-full h-[26rem] shrink-0 flex-1 bg-costa-100 rounded-lg overflow-hidden">
              {p.foto && (
                <Image
                  className="rounded-lg object-cover"
                  src={p.foto}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 640px) 24rem, 100vw"
                />
              )}
            </div>
            <div className="mt-4">
              <div className="space-y-4">
                <div className="space-y-1 text-lg font-medium leading-6">
                  <h3>{p.nombre}</h3>
                  {p.rol && <p className="text-marca-grafito">{p.rol}</p>}
                </div>
                <div className="text-lg">
                  <p className="text-texto">
                    {esIngles ? p.bio_en : p.bio}
                  </p>
                </div>
                <ul role="list" className="flex space-x-5">
                  {p.twitter && (
                    <li>
                      <a
                        href={p.twitter}
                        className={`text-marca-grafito hover:text-marca ${FOCUS_RING}`}
                      >
                        <span className="sr-only">Twitter</span>
                        <svg
                          className="h-5 w-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                    </li>
                  )}
                  {p.linkedin && (
                    <li>
                      <a
                        href={p.linkedin}
                        className={`text-marca-grafito hover:text-marca ${FOCUS_RING}`}
                      >
                        <span className="sr-only">LinkedIn</span>
                        <svg
                          className="h-5 w-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    </li>
                  )}
                  {p.orcid && (
                    <li>
                      <a
                        href={`https://orcid.org/${p.orcid}`}
                        className={`text-marca-grafito hover:text-marca ${FOCUS_RING}`}
                      >
                        <span className="sr-only">ORCID</span>
                        <svg
                          className="h-5 w-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947 0 .525-.422.947-.947.947-.525 0-.946-.422-.946-.947 0-.516.421-.947.946-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-2.016-1.284-3.722-4.097-3.722h-2.222z" />
                        </svg>
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </Card>
        </li>
      ))}
    </ul>
  );
}

export default function Home({ params: { locale } }) {
  const esIngles = locale === "en";
  const integrantes = getIntegrantes();

  return (
    <Section fondo="claro" className="relative">
      <Garabato
        numero={1}
        registro="neutro"
        width={220}
        className="absolute left-0 bottom-0 hidden lg:block"
      />
      <PageHeader
        title={esIngles ? "Team" : "Integrantes"}
        description={
          esIngles
            ? "Yaqu Pacha Uruguay is made up of 3 researchers and has the collaboration of more than 20 people with diverse backgrounds and skills."
            : "Yaqu Pacha Uruguay está conformado por 3 investigadoras y cuenta con la colaboración de más de 20 personas con diversas formaciones y habilidades."
        }
      />
      {GRUPOS.map((grupo) => {
        const personas = integrantes.filter((p) => p.grupo === grupo);
        if (personas.length === 0) return null;
        return (
          <div key={grupo} className="mt-12">
            <h2 className="text-2xl font-semibold tracking-tight text-mar-800 border-b border-marca-grafito/10 pb-2">
              {esIngles ? GRUPOS_EN[grupo] : grupo}
            </h2>
            <Grilla personas={personas} esIngles={esIngles} />
          </div>
        );
      })}
    </Section>
  );
}
