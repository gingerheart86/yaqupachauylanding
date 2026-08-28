// POST /api/voluntariado - recibe el formulario dinamico de
// /colabora/voluntariado y lo envia por mail a yaqupachauy@gmail.com
// via Resend (docs/catalogo-figuritas-y-voluntariado.md Bloque B).
//
// RESEND_API_KEY y RESEND_FROM se leen de variables de entorno en
// Vercel, nunca del repo. RESEND_FROM tiene que ser una direccion de
// un dominio verificado en Resend - no se inventa, queda pendiente de
// que el equipo verifique un dominio y cargue la variable.
//
// Anti-spam: honeypot (campo oculto "sitio_web" que un humano nunca
// completa). Sin captcha de terceros, como pide el doc.

const DESTINO = "yaqupachauy@gmail.com";
const TIMEOUT_MS = 8000;

function formatearCuerpo(datos) {
  return Object.entries(datos)
    .filter(([clave]) => clave !== "sitio_web")
    .map(([clave, valor]) => `${clave}: ${valor}`)
    .join("\n");
}

export async function POST(request) {
  let datos;
  try {
    datos = await request.json();
  } catch {
    return Response.json({ error: "Formulario inválido." }, { status: 400 });
  }

  // Honeypot: si esta lleno, es un bot. Se responde exito sin enviar
  // nada, para no delatar el mecanismo.
  if (datos.sitio_web) {
    return Response.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  if (!apiKey || !from) {
    return Response.json(
      { error: "El envío de formularios todavía no está configurado. Escribinos por otro medio mientras tanto." },
      { status: 503 }
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let res;
  try {
    res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [DESTINO],
        subject: "Nuevo formulario de voluntariado",
        text: formatearCuerpo(datos),
      }),
      signal: controller.signal,
    });
  } catch (err) {
    clearTimeout(timeout);
    if (err.name === "AbortError") {
      return Response.json({ error: "El envío tardó demasiado. Probá de nuevo." }, { status: 504 });
    }
    return Response.json({ error: "No se pudo enviar el formulario. Probá de nuevo." }, { status: 502 });
  }
  clearTimeout(timeout);

  if (!res.ok) {
    return Response.json({ error: "No se pudo enviar el formulario. Probá de nuevo." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
