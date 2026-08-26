import fs from "fs";
import path from "path";
import matter from "gray-matter";

// content/paginas/*.mdx - una pagina unica editable desde el panel
// (coleccion "paginas", tipo file collection). docs/panel-completo.md
// Bloque 1.
const PAGINAS_DIR = path.join(process.cwd(), "content", "paginas");

export function getPagina(nombre) {
  const ruta = path.join(PAGINAS_DIR, `${nombre}.mdx`);
  const raw = fs.readFileSync(ruta, "utf8");
  const { data, content } = matter(raw);
  return { ...data, content };
}
