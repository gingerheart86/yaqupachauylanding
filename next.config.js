/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      { source: "/", destination: "/es", permanent: true },
      // Reestructura de navegacion (docs/fase3-navegacion-portada.md):
      // /nosotras se partio en /nosotros/ong y /nosotros/integrantes.
      // El contenido viejo de /nosotras era el equipo, asi que el
      // bookmark viejo va a integrantes, no al indice de la rama.
      {
        source: "/nosotras",
        destination: "/es/nosotros/integrantes",
        permanent: true,
      },
      // /especies era la pagina de la tonina antes de la fase 3 - el
      // contenido se migro a /especies/tonina, no al indice nuevo.
      {
        source: "/especies",
        destination: "/es/especies/tonina",
        permanent: true,
      },
      {
        source: "/publicaciones",
        destination: "/es/investigacion/publicaciones",
        permanent: true,
      },
      {
        source: "/prensa-y-divulgacion",
        destination: "/es/educacion/prensa",
        permanent: true,
      },
      {
        source: "/contacto",
        destination: "/es/colabora/contacto",
        permanent: true,
      },
      {
        source: "/proyectos",
        destination: "/es/investigacion",
        permanent: true,
      },
      {
        source: "/proyectos/antecedentes",
        destination: "/es/investigacion/toninas/antecedentes",
        permanent: true,
      },
      {
        source: "/proyectos/toninas",
        destination: "/es/investigacion/toninas",
        permanent: true,
      },
      {
        source: "/proyectos/gephyreus",
        destination: "/es/investigacion/gephyreus",
        permanent: true,
      },
      {
        source: "/proyectos/varamientos",
        destination: "/es/investigacion/varamientos",
        permanent: true,
      },
      {
        source: "/proyectos/identidad-franca",
        destination: "/es/investigacion/identidad-franca",
        permanent: true,
      },
      // Rutas /es/... y /en/... de la reestructura anterior (rama
      // estructura-rutas), por si llegaron a quedar indexadas o
      // enlazadas externamente antes de este cambio.
      {
        source: "/:locale(es|en)/proyectos",
        destination: "/:locale/investigacion",
        permanent: true,
      },
      {
        source: "/:locale(es|en)/proyectos/antecedentes",
        destination: "/:locale/investigacion/toninas/antecedentes",
        permanent: true,
      },
      {
        source: "/:locale(es|en)/proyectos/toninas",
        destination: "/:locale/investigacion/toninas",
        permanent: true,
      },
      {
        source: "/:locale(es|en)/proyectos/gephyreus",
        destination: "/:locale/investigacion/gephyreus",
        permanent: true,
      },
      {
        source: "/:locale(es|en)/proyectos/varamientos",
        destination: "/:locale/investigacion/varamientos",
        permanent: true,
      },
      {
        source: "/:locale(es|en)/proyectos/identidad-franca",
        destination: "/:locale/investigacion/identidad-franca",
        permanent: true,
      },
      {
        source: "/:locale(es|en)/publicaciones",
        destination: "/:locale/investigacion/publicaciones",
        permanent: true,
      },
      {
        source: "/es/prensa-y-divulgacion",
        destination: "/es/educacion/prensa",
        permanent: true,
      },
      {
        source: "/es/libros",
        destination: "/es/educacion/libros",
        permanent: true,
      },
      {
        source: "/es/donaciones",
        destination: "/es/colabora/donaciones",
        permanent: true,
      },
      {
        source: "/:locale(es|en)/nosotras",
        destination: "/:locale/nosotros/integrantes",
        permanent: true,
      },
      {
        source: "/:locale(es|en)/contacto",
        destination: "/:locale/colabora/contacto",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      // public/admin/index.html no se sirve solo en /admin (Next no
      // resuelve directorios a su index.html); sin esto, /admin cae en
      // la ruta dinamica [locale] y renderiza la portada. Ver
      // docs/cms-panel-edicion.md.
      { source: "/admin", destination: "/admin/index.html" },
    ];
  },
};

module.exports = nextConfig;
