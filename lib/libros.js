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
        orden: data.orden ?? 0,
        tapa: data.tapa || null,
        sinopsis: data.sinopsis || "",
        edad: data.edad || null,
        guion: data.guion || "Silvia Soler",
        ilustraciones: data.ilustraciones || "Yez",
        editorial: data.editorial || "Krakatoa",
        // Lista de codigos ({ codigo: "URU#001" } por item, formato
        // list del panel) - un libro puede tener mas de un
        // protagonista real (El Sonido de las Toninas tiene dos).
        catalogo: (data.catalogo || []).map((c) => c.codigo).filter(Boolean),
        disponible: data.disponible !== false,
      };
    })
    .sort((a, b) => a.orden - b.orden);
}

export function getLibro(slug) {
  return getLibros().find((l) => l.slug === slug) ?? null;
}

// Enlace cruzado catalogo -> libro: content/libros guarda el CODIGO
// de cada individuo (ej. "URU#001"), no su slug. Un mismo individuo
// puede aparecer en mas de un libro (Muescagrande esta en dos), asi
// que devuelve todos los que coincidan, no uno solo.
export function getLibrosPorCodigoCatalogo(codigo) {
  return getLibros().filter((l) => l.catalogo.includes(codigo));
}
