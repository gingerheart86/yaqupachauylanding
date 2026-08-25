import { getTodasLasNoticias } from "../../../lib/noticias";

const BASE = "https://yaqupachauy.org";

function escapeXml(texto) {
  return String(texto ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// La fecha puede venir como "YYYY-MM-XX" mientras el equipo no confirma
// el dia exacto (ver content/noticias/README.md) - se usa el dia 1 solo
// para poder construir un Date valido para pubDate.
function fechaValida(fecha) {
  return new Date(fecha.replace(/-XX$/, "-01"));
}

export async function GET() {
  const noticias = getTodasLasNoticias();

  const items = noticias
    .map((n) => {
      const url = `${BASE}/es/noticias/${n.slug}`;
      return `
    <item>
      <title>${escapeXml(n.titulo)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${fechaValida(n.fecha).toUTCString()}</pubDate>
      <description>${escapeXml(n.resumen)}</description>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Noticias — Yaqu Pacha Uruguay</title>
    <link>${BASE}/es/noticias</link>
    <description>Novedades de Yaqu Pacha Uruguay.</description>
    <language>es</language>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
