#!/usr/bin/env node
// Recibe un DOI y arma el frontmatter de content/publicaciones/*.mdx.
// docs/panel-completo.md Bloque 4: alternativa a un widget dentro del
// panel, para cuando cargar una publicacion nueva conviene hacerlo por
// terminal (carga masiva, o mientras no exista el boton en el editor).
//
// Uso:
//   node scripts/doi-a-frontmatter.js 10.1016/j.biocon.2026.111865
//
// Llama directo a Crossref (misma logica que app/api/doi/route.js) y
// imprime el frontmatter listo para pegar en un archivo nuevo. No
// escribe el archivo solo: quien lo corre decide el nombre y revisa
// los datos antes de guardar, como pide el doc ("los datos traidos
// siempre son editables antes de guardar").

const doi = process.argv[2];

if (!doi) {
  console.error("Uso: node scripts/doi-a-frontmatter.js <doi>");
  console.error("Ej:  node scripts/doi-a-frontmatter.js 10.1016/j.biocon.2026.111865");
  process.exit(1);
}

function formatearAutor({ given, family }) {
  if (!family) return given ?? "";
  if (!given) return family;
  const iniciales = given
    .trim()
    .split(/\s+/)
    .map((parte) => `${parte[0].toUpperCase()}.`)
    .join("");
  return `${family}, ${iniciales}`;
}

function formatearAutores(autores) {
  if (!Array.isArray(autores) || autores.length === 0) return "";
  const nombres = autores.map(formatearAutor).filter(Boolean);
  if (nombres.length === 1) return nombres[0];
  return `${nombres.slice(0, -1).join(", ")} y ${nombres[nombres.length - 1]}`;
}

function esAccesoAbierto(licencias) {
  if (!Array.isArray(licencias)) return false;
  return licencias.some((l) => l.URL?.includes("creativecommons.org"));
}

function yamlString(valor) {
  return `"${String(valor ?? "").replace(/"/g, '\\"')}"`;
}

async function main() {
  const doiLimpio = doi.trim().replace(/^https?:\/\/doi\.org\//, "");
  const res = await fetch(`https://api.crossref.org/works/${encodeURIComponent(doiLimpio)}`, {
    headers: { "User-Agent": "YaquPachaUruguay/1.0 (mailto:yaqupachauy@gmail.com)" },
  });

  if (res.status === 404) {
    console.error(`Ese DOI no existe en Crossref: ${doiLimpio}`);
    process.exit(1);
  }
  if (!res.ok) {
    console.error(`Crossref devolvió un error (${res.status}).`);
    process.exit(1);
  }

  const { message: m } = await res.json();
  const anio =
    m.published?.["date-parts"]?.[0]?.[0] ?? m["published-print"]?.["date-parts"]?.[0]?.[0] ?? "";

  const frontmatter = `---
doi: ${yamlString(doiLimpio)}
titulo: ${yamlString(m.title?.[0])}
autores: ${yamlString(formatearAutores(m.author))}
revista: ${yamlString(m["container-title"]?.[0])}
anio: ${anio}
volumen: ${yamlString(m.volume ?? "")}
paginas: ${yamlString(m.page ?? "")}
especie: []
proyecto:
autoria_yaqu: true
acceso_abierto: ${esAccesoAbierto(m.license)}
resumen_es:
---
`;

  console.log(frontmatter);
  console.error("\n# Revisá los datos (Crossref no siempre separa bien los nombres compuestos)");
  console.error("# y guardalos en content/publicaciones/<slug>.mdx");
}

main().catch((err) => {
  console.error("No se pudo conectar con Crossref:", err.message);
  process.exit(1);
});
