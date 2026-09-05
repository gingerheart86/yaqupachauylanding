import fs from "fs";
import path from "path";
import matter from "gray-matter";

// content/proyectos/*.mdx - cuerpo editable de cada pagina de proyecto.
// docs/panel-completo.md Bloque 3.
const DIR = path.join(process.cwd(), "content", "proyectos");

export function getContenidoProyecto(slug) {
  const ruta = path.join(DIR, `${slug}.mdx`);
  if (!fs.existsSync(ruta)) return null;
  const raw = fs.readFileSync(ruta, "utf8");
  const { data, content } = matter(raw);
  return { slug, ...data, content };
}

// Lineas de trabajo de un proyecto (ej. Centinelas de la Costa dentro
// de Proyecto Toninas): cualquier proyecto cuyo campo proyecto_padre
// coincida, no un caso especial escrito a mano - asi se pueden sumar
// mas lineas despues sin tocar codigo, solo cargando la ficha en el
// panel.
export function getLineasDeTrabajo(slugPadre) {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((archivo) => {
      const raw = fs.readFileSync(path.join(DIR, archivo), "utf8");
      const { data } = matter(raw);
      return { slug: archivo.replace(/\.mdx$/, ""), ...data };
    })
    .filter((p) => p.proyecto_padre === slugPadre)
    .sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0));
}
