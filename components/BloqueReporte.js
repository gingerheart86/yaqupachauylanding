import { Section, Button } from "./ui";
import { getDictionary } from "../lib/i18n";

// TODO: falta la URL real del formulario Survey123 de avistamientos.
// Mientras no este, el boton de avistamiento manda a /contacto (no se
// inventan links rotos ni URLs falsas).
const SURVEY123_URL = null;
const WHATSAPP_VARAMIENTOS = "https://wa.me/59898490889";
const TELEFONO_VARAMIENTOS = "098 490 889";

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
              <a href="tel:+59898490889" className="hover:underline">
                {TELEFONO_VARAMIENTOS}
              </a>
            </p>
          </div>
        ) : (
          <div className="mt-6">
            <Button
              href={SURVEY123_URL ?? `/${locale}/contacto`}
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
