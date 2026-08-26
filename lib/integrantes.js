import fs from "fs";
import path from "path";
import matter from "gray-matter";

// content/integrantes/*.md - grilla de /nosotros/integrantes.
// docs/panel-completo.md Bloque 2.
const INTEGRANTES_DIR = path.join(process.cwd(), "content", "integrantes");

export function getIntegrantes() {
  if (!fs.existsSync(INTEGRANTES_DIR)) return [];
  return fs
    .readdirSync(INTEGRANTES_DIR)
    .filter((f) => f.endsWith(".md") && f.toLowerCase() !== "readme.md")
    .map((archivo) => {
      const raw = fs.readFileSync(path.join(INTEGRANTES_DIR, archivo), "utf8");
      const { data } = matter(raw);
      return {
        nombre: data.nombre,
        rol: data.rol ?? "",
        foto: data.foto,
        alt: data.alt ?? data.nombre,
        bio: data.bio ?? "",
        bio_en: data.bio_en ?? "",
        formacion: data.formacion ?? null,
        orcid: data.orcid ?? null,
        twitter: data.twitter ?? null,
        linkedin: data.linkedin ?? null,
        activa: data.activa !== false,
        orden: data.orden ?? 0,
      };
    })
    .filter((p) => p.activa)
    .sort((a, b) => a.orden - b.orden);
}
