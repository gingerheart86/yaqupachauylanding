import es from "../content/i18n/es.json";
import en from "../content/i18n/en.json";

export const LOCALES = ["es", "en"];
export const DEFAULT_LOCALE = "es";

const dictionaries = { es, en };

export function getDictionary(locale) {
  return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
}

// Rutas que existen en los dos idiomas vs. solo en español.
// Seccion 11 de docs/fase3-arquitectura-y-contenido.md. Son prefijos,
// no solo el primer segmento: colabora/donaciones es solo-ES aunque
// colabora/contacto si sea bilingue, asi que no alcanza con mirar la
// rama de primer nivel.
export const RUTAS_BILINGUES = [
  "",
  "especies",
  "investigacion",
  "avistamientos",
  "nosotros",
  "colabora/contacto",
];

export function esRutaBilingue(rutaSinLocale) {
  return RUTAS_BILINGUES.some(
    (prefijo) =>
      rutaSinLocale === prefijo || rutaSinLocale.startsWith(`${prefijo}/`)
  );
}

// Hreflang reciproco para el metadata de cada pagina.
// rutaSinLocale: ej. "proyectos/toninas", o "" para la portada.
export function alternatesPara(rutaSinLocale, { soloEs = false } = {}) {
  const sufijo = rutaSinLocale ? `/${rutaSinLocale}` : "";
  if (soloEs) {
    return { canonical: `/es${sufijo}` };
  }
  return {
    languages: {
      es: `/es${sufijo}`,
      en: `/en${sufijo}`,
    },
  };
}
