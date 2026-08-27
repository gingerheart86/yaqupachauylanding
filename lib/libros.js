import fs from "fs";
import path from "path";
import matter from "gray-matter";

// content/libros/*.mdx - docs/panel-completo.md Bloque 3,
// docs/correcciones-revision-local.md punto 3.
const DIR = path.join(process.cwd(), "content", "libros");

export function getLibros() {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx") && f.toLowerCase() !== "readme.mdx")
    .map((archivo) => {
      const raw = fs.readFileSync(path.join(DIR, archivo), "utf8");
      const { data } = matter(raw);
      return {
        slug: archivo.replace(/\.mdx$/, ""),
        titulo: data.titulo,
        tapa: data.tapa || null,
        sinopsis: data.sinopsis || "",
        edad: data.edad || null,
        guion: data.guion || "Silvia Soler",
        ilustraciones: data.ilustraciones || "Yez",
        editorial: data.editorial || "Krakatoa",
        catalogo: data.catalogo || null,
        disponible: data.disponible !== false,
      };
    });
}

export function getLibro(slug) {
  return getLibros().find((l) => l.slug === slug) ?? null;
}

// Enlace cruzado catalogo -> libro: content/libros guarda el CODIGO
// del individuo (ej. "URU#001"), no su slug. Bloque A,
// docs/catalogo-figuritas-y-voluntariado.md.
export function getLibroPorCodigoCatalogo(codigo) {
  return getLibros().find((l) => l.catalogo === codigo) ?? null;
}
