import fs from "fs";
import path from "path";
import matter from "gray-matter";

// content/noticias/*.mdx - frontmatter: titulo, fecha (YYYY-MM-DD),
// resumen, imagen, categoria, destacada (bool, opcional).
// docs/fase3-arquitectura-y-contenido.md seccion 9 y el TODO general:
// la estructura se arma aunque todavia no haya notas, porque el
// contenido va a seguir cambiando - agregar una nota es solo sumar un
// archivo, sin tocar codigo.
const NOTICIAS_DIR = path.join(process.cwd(), "content", "noticias");

function leerArchivos() {
  if (!fs.existsSync(NOTICIAS_DIR)) return [];
  return fs.readdirSync(NOTICIAS_DIR).filter((f) => f.endsWith(".mdx"));
}

export function getTodasLasNoticias() {
  return leerArchivos()
    .map((archivo) => {
      const slug = archivo.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(NOTICIAS_DIR, archivo), "utf8");
      const { data, content } = matter(raw);
      return {
        slug,
        content,
        titulo: data.titulo,
        fecha: data.fecha,
        resumen: data.resumen,
        imagen: data.imagen ?? null,
        categoria: data.categoria ?? null,
        destacada: Boolean(data.destacada),
      };
    })
    .sort((a, b) => (a.fecha < b.fecha ? 1 : -1)); // orden cronologico inverso
}

export function getUltimasNoticias(cantidad) {
  return getTodasLasNoticias().slice(0, cantidad);
}

export function getNoticia(slug) {
  return getTodasLasNoticias().find((n) => n.slug === slug) ?? null;
}

export function getSlugsDeNoticias() {
  return leerArchivos().map((f) => f.replace(/\.mdx$/, ""));
}
