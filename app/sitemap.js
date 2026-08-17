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
];

const rutasSoloEs = [
  "educacion/prensa",
  "educacion/libros",
  "tienda",
  "colabora/donaciones",
  "noticias",
];

const BASE = "https://yaqupachauy.org";

export default function sitemap() {
  const lastModified = new Date();
  const entries = [];

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
