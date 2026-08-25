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

// Categorias y anios presentes, para los filtros de /noticias.
export function getCategoriasDeNoticias() {
  const categorias = new Set(
    getTodasLasNoticias()
      .map((n) => n.categoria)
      .filter(Boolean)
  );
  return [...categorias].sort();
}

export function getAniosDeNoticias() {
  const anios = new Set(getTodasLasNoticias().map((n) => n.fecha.slice(0, 4)));
  return [...anios].sort().reverse();
}

// Anterior (mas vieja) y siguiente (mas nueva) respecto de un slug, para
// la navegacion al pie de cada nota. El orden de getTodasLasNoticias() ya
// es cronologico inverso (mas nueva primero).
export function getNoticiasAdyacentes(slug) {
  const todas = getTodasLasNoticias();
  const indice = todas.findIndex((n) => n.slug === slug);
  if (indice === -1) return { anterior: null, siguiente: null };
  return {
    siguiente: indice > 0 ? todas[indice - 1] : null,
    anterior: indice < todas.length - 1 ? todas[indice + 1] : null,
  };
}

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

// La fecha puede tener el dia sin confirmar todavia (YYYY-MM-XX, ver
// content/noticias/README.md y docs/noticias-pendientes.md: "dejarlas
// asi hasta que el equipo las confirme"). new Date() no parsea eso, asi
// que se muestra solo mes y anio en ese caso.
export function fechaLegible(fecha) {
  const m = /^(\d{4})-(\d{2})-XX$/.exec(fecha);
  if (m) {
    const [, anio, mes] = m;
    return `${MESES[Number(mes) - 1]} de ${anio}`;
  }
  return new Intl.DateTimeFormat("es-UY", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(fecha));
}
