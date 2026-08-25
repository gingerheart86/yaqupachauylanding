import { outputHTML } from "../../../../lib/cms-auth";

// Segundo paso del login OAuth de Sveltia CMS - ver lib/cms-auth.js y
// docs/cms-panel-edicion.md Bloque 2. GitHub redirige aca despues de
// que la usuaria autoriza la OAuth App, con ?code=...&state=....
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  const cookieHeader = request.headers.get("cookie") ?? "";
  const match = cookieHeader.match(/\bcsrf-token=([a-z-]+?)_([0-9a-f]{32})\b/);
  const [, provider, csrfToken] = match ?? [];

  if (provider !== "github") {
    return outputHTML({
      error: "Este backend no esta soportado por el proxy de autenticacion.",
      errorCode: "UNSUPPORTED_BACKEND",
    });
  }

  if (!code || !state) {
    return outputHTML({
      provider,
      error: "No se recibio el codigo de autorizacion. Intenta de nuevo.",
      errorCode: "AUTH_CODE_REQUEST_FAILED",
    });
  }

  if (!csrfToken || state !== csrfToken) {
    return outputHTML({
      provider,
      error: "Se detecto un posible ataque CSRF. Se cancelo el login.",
      errorCode: "CSRF_DETECTED",
    });
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return outputHTML({
      provider,
      error: "Falta configurar GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET en Vercel.",
      errorCode: "MISCONFIGURED_CLIENT",
    });
  }

  let response;

  try {
    response = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ code, client_id: clientId, client_secret: clientSecret }),
    });
  } catch {
    // sigue abajo con response undefined
  }

  if (!response) {
    return outputHTML({
      provider,
      error: "No se pudo pedir el token de acceso. Intenta de nuevo.",
      errorCode: "TOKEN_REQUEST_FAILED",
    });
  }

  let token = "";
  let error = "";

  try {
    ({ access_token: token, error } = await response.json());
  } catch {
    return outputHTML({
      provider,
      error: "GitHub devolvio una respuesta con formato invalido.",
      errorCode: "MALFORMED_RESPONSE",
    });
  }

  return outputHTML({ provider, token, error });
}
