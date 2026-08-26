import fs from "fs";
import path from "path";
import matter from "gray-matter";

// content/especies/*.mdx - cuerpo editable de cada pagina de especie.
// docs/panel-completo.md Bloque 3. No confundir con lib/especies.js
// (SILUETAS/ESPECIES), que es metadata fija usada tambien en componentes
// que no necesitan leer del filesystem.
const DIR = path.join(process.cwd(), "content", "especies");

export function getContenidoEspecie(slug) {
  const ruta = path.join(DIR, `${slug}.mdx`);
  if (!fs.existsSync(ruta)) return null;
  const raw = fs.readFileSync(ruta, "utf8");
  const { data, content } = matter(raw);
  return { ...data, content };
}
