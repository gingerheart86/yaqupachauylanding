import { getScope, getDomainPatterns, outputHTML } from "../../../lib/cms-auth";

// Primer paso del login OAuth de Sveltia CMS - ver lib/cms-auth.js y
// docs/cms-panel-edicion.md Bloque 2. Sveltia abre esta URL en un popup
// como /api/auth?provider=github&site_id=<host>&scope=... y espera
// terminar redirigida a GitHub para autorizar.
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const provider = searchParams.get("provider");
  const domain = searchParams.get("site_id");
  const requestedScope = searchParams.get("scope");

  if (provider !== "github") {
    return outputHTML({
      provider: provider ?? "unknown",
      error: "Este backend no esta soportado por el proxy de autenticacion.",
      errorCode: "UNSUPPORTED_BACKEND",
    });
  }

  const allowedDomains = process.env.SVELTIA_ALLOWED_DOMAINS ?? "yaqupachauy.org";
  const domainPatterns = getDomainPatterns(allowedDomains);

  if (domainPatterns.length && !domainPatterns.some((p) => new RegExp(p).test(domain ?? ""))) {
    return outputHTML({
      provider,
      error: "Este dominio no tiene permiso para usar el panel de edicion.",
      errorCode: "UNSUPPORTED_DOMAIN",
      allowedDomains,
    });
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return outputHTML({
      provider,
      error: "Falta configurar GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET en Vercel.",
      errorCode: "MISCONFIGURED_CLIENT",
      allowedDomains,
    });
  }

  const scope = getScope(requestedScope);
  const csrfToken = globalThis.crypto.randomUUID().replaceAll("-", "");

  const params = new URLSearchParams({ client_id: clientId, scope, state: csrfToken });
  const authURL = `https://github.com/login/oauth/authorize?${params.toString()}`;

  return new Response("", {
    status: 302,
    headers: {
      Location: authURL,
      // La cookie expira en 10 minutos; SameSite=Lax para que el
      // navegador la mande de vuelta despues del redirect de GitHub.
      "Set-Cookie": `csrf-token=github_${csrfToken}; HttpOnly; Path=/; Max-Age=600; SameSite=Lax; Secure`,
    },
  });
}
