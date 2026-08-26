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
  return { ...data, content };
}
