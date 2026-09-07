import {
  EnvelopeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { Section, PageHeader } from "../../../../components/ui";
import { getPagina } from "../../../../lib/paginas";
import { alternatesPara } from "../../../../lib/i18n";

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export function generateMetadata({ params: { locale } }) {
  const alternates = alternatesPara("colabora/contacto");
  if (locale === "en") {
    return {
      title: "Contact",
      description:
        "Get in touch to report a tonina sighting, collaborate with the project or ask about our activities.",
      alternates,
    };
  }
  return {
    title: "Contacto",
    description:
      "Escríbenos para reportar un avistamiento de toninas, colaborar con el proyecto o consultar sobre nuestras actividades.",
    alternates,
  };
}

export default function Home({ params: { locale } }) {
  const esIngles = locale === "en";
  const pagina = getPagina("contacto");
  const titulo = esIngles ? pagina.titulo_en : pagina.titulo;
  return (
    <Section fondo="claro">
      <div className="mx-auto max-w-lg md:grid md:max-w-none md:grid-cols-2 md:gap-8">
        <div>
          <PageHeader align="left" title={titulo} />
          <div className="mt-9">
            <div className="flex mt-6">
              <div className="flex-shrink-0">
                <MapPinIcon
                  className="h-6 w-6 text-marca-grafito"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-3 text-base text-texto">
                <p>{pagina.direccion}</p>
              </div>
            </div>
            <div className="mt-6 flex">
              <div className="flex-shrink-0">
                <EnvelopeIcon
                  className="h-6 w-6 text-marca-grafito"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-3 text-base text-texto">
                <a href={`mailto:${pagina.email}`} className="hover:underline">
                  {pagina.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
