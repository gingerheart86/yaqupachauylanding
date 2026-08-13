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
      { source: "/nosotras", destination: "/es/nosotras", permanent: true },
      // /especies era la pagina de la tonina antes de la fase 3 - el
      // contenido se migro a /especies/tonina, no al indice nuevo.
      {
        source: "/especies",
        destination: "/es/especies/tonina",
        permanent: true,
      },
      {
        source: "/publicaciones",
        destination: "/es/publicaciones",
        permanent: true,
      },
      {
        source: "/prensa-y-divulgacion",
        destination: "/es/prensa-y-divulgacion",
        permanent: true,
      },
      { source: "/contacto", destination: "/es/contacto", permanent: true },
      { source: "/proyectos", destination: "/es/proyectos", permanent: true },
      {
        source: "/proyectos/antecedentes",
        destination: "/es/proyectos/antecedentes",
        permanent: true,
      },
      {
        source: "/proyectos/toninas",
        destination: "/es/proyectos/toninas",
        permanent: true,
      },
      {
        source: "/proyectos/gephyreus",
        destination: "/es/proyectos/gephyreus",
        permanent: true,
      },
      {
        source: "/proyectos/varamientos",
        destination: "/es/proyectos/varamientos",
        permanent: true,
      },
      {
        source: "/proyectos/identidad-franca",
        destination: "/es/proyectos/identidad-franca",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
