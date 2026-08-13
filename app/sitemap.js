const rutasBilingues = [
  "",
  "especies",
  "especies/tonina",
  "especies/ballena-franca",
  "especies/franciscana",
  "especies/orca",
  "proyectos",
  "proyectos/toninas",
  "proyectos/gephyreus",
  "proyectos/varamientos",
  "proyectos/identidad-franca",
  "proyectos/antecedentes",
  "avistamientos",
  "publicaciones",
  "nosotras",
  "contacto",
];

const rutasSoloEs = ["prensa-y-divulgacion", "libros", "tienda", "donaciones"];

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
