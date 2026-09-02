// GET /api/doi?doi=10.1016/j.biocon.2026.111865
// Trae los datos de una publicacion desde Crossref (api.crossref.org),
// el registro oficial de los DOI - gratis, sin cuenta, infraestructura
// publica de la comunidad cientifica. docs/panel-completo.md Bloque 4.
//
// Nunca deja el formulario colgado: timeout de 8s, y cualquier fallo
// (DOI inexistente, sin conexion, respuesta lenta) devuelve un error
// claro en vez de tirar abajo la request - la carga manual siempre
// sigue disponible en el panel.

const TIMEOUT_MS = 8000;

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

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const doi = searchParams.get("doi")?.trim().replace(/^https?:\/\/doi\.org\//, "");

  if (!doi) {
    return Response.json({ error: "Falta el DOI." }, { status: 400 });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let res;
  try {
    res = await fetch(`https://api.crossref.org/works/${encodeURIComponent(doi)}`, {
      headers: {
        "User-Agent": "YaquPachaUruguay/1.0 (mailto:yaqupachauy@gmail.com)",
      },
      signal: controller.signal,
    });
  } catch (err) {
    clearTimeout(timeout);
    if (err.name === "AbortError") {
      return Response.json(
        { error: "Crossref no respondió a tiempo. Carga los datos a mano." },
        { status: 504 }
      );
    }
    return Response.json(
      { error: "No se pudo conectar con Crossref. Carga los datos a mano." },
      { status: 502 }
    );
  }
  clearTimeout(timeout);

  if (res.status === 404) {
    return Response.json({ error: "Ese DOI no existe en Crossref." }, { status: 404 });
  }
  if (!res.ok) {
    return Response.json(
      { error: `Crossref devolvió un error (${res.status}). Carga los datos a mano.` },
      { status: 502 }
    );
  }

  let json;
  try {
    json = await res.json();
  } catch {
    return Response.json(
      { error: "Crossref devolvió una respuesta inválida. Carga los datos a mano." },
      { status: 502 }
    );
  }

  const m = json.message;
  const anio =
    m.published?.["date-parts"]?.[0]?.[0] ??
    m["published-print"]?.["date-parts"]?.[0]?.[0] ??
    null;

  return Response.json({
    titulo: m.title?.[0] ?? "",
    autores: formatearAutores(m.author),
    revista: m["container-title"]?.[0] ?? "",
    anio,
    volumen: m.volume ?? "",
    paginas: m.page ?? "",
    acceso_abierto: esAccesoAbierto(m.license),
  });
}
