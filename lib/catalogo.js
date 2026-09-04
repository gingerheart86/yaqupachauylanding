import fs from "fs";
import path from "path";
import matter from "gray-matter";

// content/catalogo/*.mdx - catalogo de individuos, compartido por los
// dos proyectos que lo usan (Proyecto Toninas e Identidad Franca) via
// el campo "proyecto". docs/panel-completo.md Bloque 5,
// docs/catalogo-figuritas-y-voluntariado.md.
//
// El codigo real tiene formato "URU#001" - el "#" corta cualquier URL
// en un fragmento, asi que NO se usa el codigo como slug de ruta. El
// slug es el nombre del archivo (ej. uru-001-muescagrande.mdx), mismo
// criterio que noticias/integrantes/etc. El codigo se muestra tal
// cual, nunca se usa para armar una URL.
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
        slug: archivo.replace(/\.mdx$/, ""),
        codigo: data.codigo,
        nombre: data.nombre,
        lugar: data.lugar || null,
        proyecto: data.proyecto,
        especie: data.especie,
        fotos: data.fotos || [],
        stamp: data.stamp || null,
        descripcion: data.descripcion || "",
        historia: data.historia || content?.trim() || "",
        primer_avistamiento: data.primer_avistamiento || null,
        ultimo_avistamiento: data.ultimo_avistamiento || null,
        sexo: data.sexo || null,
        muerto: Boolean(data.muerto),
        arcgis_id: data.arcgis_id || null,
        publicado: data.publicado !== false,
      };
    });
}

export function getIndividuos(proyectoSlug) {
  return leerTodos()
    .filter((i) => i.proyecto === proyectoSlug && i.publicado)
    .sort((a, b) => (a.codigo || "").localeCompare(b.codigo || ""));
}

export function getIndividuo(proyectoSlug, slug) {
  return (
    leerTodos().find(
      (i) => i.proyecto === proyectoSlug && i.publicado && i.slug === slug
    ) ?? null
  );
}

export function getSlugsDeProyecto(proyectoSlug) {
  return leerTodos()
    .filter((i) => i.proyecto === proyectoSlug && i.publicado)
    .map((i) => i.slug);
}

// Para el libro -> catalogo (content/libros, campo "catalogo") que
// guarda el CODIGO, no el slug - hay que resolverlo para armar el
// link y mostrar el nombre. Devuelve el individuo completo o null si
// no se encuentra.
export function getIndividuoPorCodigo(codigo) {
  return leerTodos().find((i) => i.codigo === codigo && i.publicado) ?? null;
}
