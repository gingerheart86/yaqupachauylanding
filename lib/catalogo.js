import fs from "fs";
import path from "path";
import matter from "gray-matter";

// content/catalogo/*.mdx - catalogo de individuos, compartido por los
// dos proyectos que lo usan (Proyecto Toninas e Identidad Franca) via
// el campo "proyecto". docs/panel-completo.md Bloque 5.
const DIR = path.join(process.cwd(), "content", "catalogo");

function leerTodos() {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx") && f.toLowerCase() !== "readme.mdx")
    .map((archivo) => {
      const raw = fs.readFileSync(path.join(DIR, archivo), "utf8");
      const { data, content } = matter(raw);
      return {
        codigo: data.codigo,
        nombre: data.nombre,
        proyecto: data.proyecto,
        especie: data.especie,
        fotos: data.fotos || [],
        descripcion: data.descripcion || content?.trim() || "",
        primer_avistamiento: data.primer_avistamiento || null,
        ultimo_avistamiento: data.ultimo_avistamiento || null,
        sexo: data.sexo || null,
        muerto: Boolean(data.muerto),
        arcgis_id: data.arcgis_id || null,
        libro: data.libro || null,
        publicado: data.publicado !== false,
      };
    });
}

// slug de la URL en base al codigo - {{codigo}} en config.yml, ej. TT-014.
function slugDeCodigo(codigo) {
  return (codigo || "").trim();
}

export function getIndividuos(proyectoSlug) {
  return leerTodos()
    .filter((i) => i.proyecto === proyectoSlug && i.publicado)
    .sort((a, b) => (a.codigo || "").localeCompare(b.codigo || ""));
}

export function getIndividuo(proyectoSlug, codigo) {
  return (
    leerTodos().find(
      (i) =>
        i.proyecto === proyectoSlug &&
        i.publicado &&
        slugDeCodigo(i.codigo) === codigo
    ) ?? null
  );
}

export function getCodigosDeProyecto(proyectoSlug) {
  return leerTodos()
    .filter((i) => i.proyecto === proyectoSlug && i.publicado)
    .map((i) => slugDeCodigo(i.codigo));
}
