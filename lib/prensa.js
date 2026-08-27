import fs from "fs";
import path from "path";
import matter from "gray-matter";

// content/prensa/*.mdx - docs/correcciones-revision-local.md punto 4.
// fecha y url son opcionales (a diferencia del schema del doc): varias
// citas de material impreso no tienen version digital ni fecha exacta
// conocida.
const DIR = path.join(process.cwd(), "content", "prensa");

export function getPrensa() {
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
        medio: data.medio || "",
        fecha: data.fecha || null,
        anio: data.fecha ? String(data.fecha).slice(0, 4) : null,
        tipo: data.tipo || "Otro",
        url: data.url || null,
        miniatura: data.miniatura || null,
        alt: data.alt || "",
        resumen: data.resumen || "",
      };
    })
    .sort((a, b) => (b.fecha ?? "0000").localeCompare(a.fecha ?? "0000"));
}
