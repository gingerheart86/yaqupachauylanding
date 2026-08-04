import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { Section, PageHeader } from "../../components/ui";

export const metadata = {
  title: "Contacto",
  description:
    "Escribinos para reportar un avistamiento de toninas, colaborar con el proyecto o consultar sobre nuestras actividades.",
};

export default function Home() {
  return (
    <Section fondo="claro">
      <div className="mx-auto max-w-lg md:grid md:max-w-none md:grid-cols-2 md:gap-8">
        <div>
          <PageHeader align="left" title="Ponte en contacto" />
          <div className="mt-9">
            <div className="flex mt-6">
              <div className="flex-shrink-0">
                <MapPinIcon
                  className="h-6 w-6 text-marca-grafito"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-3 text-base text-texto">
                <p>Orinoco s/n y San Luis, Punta del Diablo, Rocha, Uruguay</p>
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
                <p>yaqupachauy@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
