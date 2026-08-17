import { Section, Button } from "./ui";
import { getDictionary } from "../lib/i18n";
import {
  SURVEY123_URL,
  WHATSAPP_VARAMIENTOS,
  TELEFONO_VARAMIENTOS,
  TELEFONO_VARAMIENTOS_TEL,
} from "../lib/contacto";

const TITULOS = {
  avistamiento: {
    es: "¿Viste una tonina u otro delfín?",
    en: "Did you spot a dolphin?",
  },
  varamiento: {
    es: "¿Encontraste un animal varado?",
    en: "Found a stranded animal?",
  },
};

export default function BloqueReporte({ tipo = "avistamiento", locale = "es" }) {
  const dict = getDictionary(locale);
  const esVaramiento = tipo === "varamiento";
  const titulo = TITULOS[tipo][locale] ?? TITULOS[tipo].es;

  return (
    <Section fondo="mar">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">
          {titulo}
        </h2>
        {esVaramiento ? (
          <div className="mt-6">
            <Button
              href={WHATSAPP_VARAMIENTOS}
              variante="primario"
              className="!bg-white !text-mar-800 hover:!bg-mar-100"
            >
              {dict.common.reportarVaramiento}
            </Button>
            <p className="mt-3 text-mar-100">
              <a href={`tel:${TELEFONO_VARAMIENTOS_TEL}`} className="hover:underline">
                {TELEFONO_VARAMIENTOS}
              </a>
            </p>
          </div>
        ) : (
          <div className="mt-6">
            <Button
              href={SURVEY123_URL ?? `/${locale}/colabora/contacto`}
              variante="primario"
              className="!bg-white !text-mar-800 hover:!bg-mar-100"
            >
              {dict.common.reportarAvistamiento}
            </Button>
          </div>
        )}
      </div>
    </Section>
  );
}
