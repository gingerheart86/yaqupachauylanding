import fs from "fs";
import path from "path";
import matter from "gray-matter";

// content/publicaciones/*.mdx - docs/panel-completo.md Bloque 4.
const DIR = path.join(process.cwd(), "content", "publicaciones");

export function getPublicaciones() {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((archivo) => {
      const raw = fs.readFileSync(path.join(DIR, archivo), "utf8");
      const { data } = matter(raw);
      return {
        slug: archivo.replace(/\.mdx$/, ""),
        doi: data.doi || null,
        titulo: data.titulo,
        autores: data.autores,
        revista: data.revista,
        anio: data.anio,
        volumen: data.volumen || null,
        paginas: data.paginas || null,
        especie: data.especie || [],
        proyecto: data.proyecto || null,
        autoria_yaqu: data.autoria_yaqu !== false,
        acceso_abierto: Boolean(data.acceso_abierto),
        resumen_es: data.resumen_es || null,
      };
    })
    .sort((a, b) => (b.anio ?? 0) - (a.anio ?? 0));
}
