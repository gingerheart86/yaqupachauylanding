import { Foto } from "../components/mdx/Foto";
import { ParFotos } from "../components/mdx/ParFotos";
import { Carrusel } from "../components/mdx/Carrusel";
import { Silueta } from "../components/mdx/Silueta";
import { GrillaLogos } from "../components/mdx/GrillaLogos";
import { Destacado } from "../components/mdx/Destacado";
import { VideoYoutube } from "../components/mdx/VideoYoutube";
import BloqueReporteUI from "../components/BloqueReporte";

// Componentes disponibles dentro del body de cualquier MDX de especies,
// proyectos o paginas. docs/panel-completo.md, seccion "Imagenes
// intercaladas en MDX". BloqueReporte necesita el locale, que no tiene
// sentido pedirle a quien edita que lo escriba a mano en el MDX - se
// inyecta aca segun la pagina que este renderizando.
export function getMdxComponents(locale = "es") {
  return {
    Foto,
    ParFotos,
    Carrusel,
    Silueta,
    GrillaLogos,
    Destacado,
    VideoYoutube,
    BloqueReporte: (props) => <BloqueReporteUI {...props} locale={locale} />,
  };
}
