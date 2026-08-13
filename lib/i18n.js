import es from "../content/i18n/es.json";
import en from "../content/i18n/en.json";

export const LOCALES = ["es", "en"];
export const DEFAULT_LOCALE = "es";

const dictionaries = { es, en };

export function getDictionary(locale) {
  return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
}

// Rutas que existen en los dos idiomas vs. solo en español.
// Seccion 3 del doc de fase 3 bloque 1.
export const RUTAS_BILINGUES = new Set([
  "",
  "especies",
  "proyectos",
  "avistamientos",
  "publicaciones",
  "nosotras",
  "contacto",
]);

export function esRutaBilingue(primerSegmento) {
  return RUTAS_BILINGUES.has(primerSegmento);
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
