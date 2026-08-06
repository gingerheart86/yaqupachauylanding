const routes = [
  "",
  "/nosotras",
  "/especies",
  "/proyectos",
  "/proyectos/antecedentes",
  "/proyectos/toninas",
  "/proyectos/gephyreus",
  "/proyectos/varamientos",
  "/proyectos/identidad-franca",
  "/publicaciones",
  "/prensa-y-divulgacion",
  "/contacto",
];

export default function sitemap() {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: `https://yaqupachauy.org${route}`,
    lastModified,
  }));
}
