import { getTodasLasNoticias } from "../lib/noticias";

const rutasBilingues = [
  "",
  "especies",
  "especies/tonina",
  "especies/ballena-franca",
  "especies/franciscana",
  "especies/orca",
  "investigacion",
  "investigacion/toninas",
  "investigacion/toninas/antecedentes",
  "investigacion/gephyreus",
  "investigacion/varamientos",
  "investigacion/identidad-franca",
  "investigacion/publicaciones",
  "avistamientos",
  "nosotros/ong",
  "nosotros/integrantes",
  "colabora/contacto",
  "colabora/reportar-avistamiento",
  "colabora/identificacion",
];

const rutasSoloEs = [
  "educacion/prensa",
  "educacion/libros",
  "educacion/materiales",
  "tienda",
  "colabora/donaciones",
  "noticias",
];

const BASE = "https://yaqupachauy.org";

export default function sitemap() {
  const lastModified = new Date();
  const entries = [];

  for (const n of getTodasLasNoticias()) {
    // fecha puede venir como "YYYY-MM-XX" mientras el equipo no confirma
    // el dia exacto (ver content/noticias/README.md) - no es un Date
    // valido, así que se sustituye XX por 01 solo para este campo.
    const fechaValida = n.fecha.replace(/-XX$/, "-01");
    entries.push({
      url: `${BASE}/es/noticias/${n.slug}`,
      lastModified: new Date(fechaValida),
    });
  }

  for (const ruta of rutasBilingues) {
    const sufijo = ruta ? `/${ruta}` : "";
    const languages = {
      es: `${BASE}/es${sufijo}`,
      en: `${BASE}/en${sufijo}`,
    };
    entries.push({
      url: languages.es,
      lastModified,
      alternates: { languages },
    });
    entries.push({
      url: languages.en,
      lastModified,
      alternates: { languages },
    });
  }

  for (const ruta of rutasSoloEs) {
    entries.push({
      url: `${BASE}/es/${ruta}`,
      lastModified,
    });
  }

  return entries;
}
