import fs from "fs";
import path from "path";
import matter from "gray-matter";

// content/tienda/*.mdx - docs/panel-completo.md Bloque 9.
const DIR = path.join(process.cwd(), "content", "tienda");

export function getArticulos() {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx") && f.toLowerCase() !== "readme.mdx")
    .map((archivo) => {
      const raw = fs.readFileSync(path.join(DIR, archivo), "utf8");
      const { data } = matter(raw);
      return {
        slug: archivo.replace(/\.mdx$/, ""),
        nombre: data.nombre,
        precio: Number(data.precio) || 0,
        fotos: data.fotos || [],
        descripcion: data.descripcion || "",
        categoria: data.categoria || "Otros",
        variantes: (data.variantes || []).map((v) => v.opcion ?? v),
        disponible: data.disponible !== false,
        orden: data.orden ?? 0,
      };
    })
    .sort((a, b) => a.orden - b.orden);
}

export function getArticulo(slug) {
  return getArticulos().find((a) => a.slug === slug) ?? null;
}

export function getCategorias() {
  return [...new Set(getArticulos().map((a) => a.categoria))].sort();
}
