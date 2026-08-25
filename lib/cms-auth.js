// Proxy de autenticacion OAuth para Sveltia CMS en Vercel -
// docs/cms-panel-edicion.md Bloque 2. Sveltia trae un backend pensado
// para Netlify (api.netlify.com/auth) o para el Cloudflare Worker
// oficial (sveltia/sveltia-cms-auth); en Vercel no hay equivalente, asi
// que este archivo reimplementa el mismo protocolo como dos Route
// Handlers propios: app/api/auth/route.js y
// app/api/auth/callback/route.js.
//
// Portado del codigo fuente de referencia (mismo protocolo exacto de
// postMessage que espera el cliente embebido en sveltia-cms.js, no es
// negociable cambiarlo):
// https://github.com/sveltia/sveltia-cms-auth/blob/main/src/index.js
//
// Solo se soporta GitHub - es el unico backend que usa este repo.

const GITHUB_SCOPES = {
  default: "repo,user",
  allowed: ["repo", "public_repo", "user", "read:user", "user:email"],
};

/**
 * Calcula el scope de OAuth a pedirle a GitHub.
 * @param {string | null} requested - El parametro `scope` que manda Sveltia, si lo manda.
 * @returns {string}
 */
export function getScope(requested) {
  const scopes = (requested ?? "").split(/[\s,]+/).filter(Boolean);
  if (!scopes.length) return GITHUB_SCOPES.default;
  if (scopes.every((s) => GITHUB_SCOPES.allowed.includes(s))) return scopes.join(",");
  return GITHUB_SCOPES.default;
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Convierte ALLOWED_DOMAINS ("yaqupachauy.org,*.vercel.app") en patrones de regex.
 * @param {string | undefined} allowedDomains
 * @returns {string[]}
 */
export function getDomainPatterns(allowedDomains) {
  return (allowedDomains ?? "")
    .split(/,/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => `^${escapeRegExp(s).replaceAll("\\*", ".+")}$`);
}

function serialize(value) {
  return JSON.stringify(value ?? null).replaceAll("<", "\\u003c");
}

/**
 * HTML que se sirve dentro del popup de autenticacion. Hace el handshake de
 * postMessage con la ventana que abrio el popup (el panel /admin): primero
 * avisa "estoy listo", espera el eco de la ventana para confirmar el origen,
 * y recien ahi manda el token real. Sveltia CMS es quien implementa el otro
 * lado de este protocolo (no se puede modificar, viene en el bundle).
 * @param {object} args
 * @param {string} [args.provider]
 * @param {string} [args.token]
 * @param {string} [args.error]
 * @param {string} [args.errorCode]
 * @param {string} [args.allowedDomains]
 * @returns {Response}
 */
export function outputHTML({ provider = "github", token, error, errorCode, allowedDomains }) {
  const state = error ? "error" : "success";
  const content = error ? { provider, error, errorCode } : { provider, token };

  const html = `<!doctype html><html><body><script>
    (() => {
      const trustedPatterns = ${serialize(getDomainPatterns(allowedDomains))};
      const hasToken = ${serialize(!!token)};

      const isTrusted = (origin) => {
        try {
          const { hostname } = new URL(origin);
          return trustedPatterns.some((p) => new RegExp(p).test(hostname));
        } catch {
          return false;
        }
      };

      window.addEventListener("message", ({ data, origin }) => {
        if (data !== "authorizing:${provider}") return;
        if (hasToken && trustedPatterns.length && !isTrusted(origin)) return;
        window.opener?.postMessage(
          "authorization:${provider}:${state}:${JSON.stringify(content)}",
          origin
        );
      });
      window.opener?.postMessage("authorizing:${provider}", "*");
    })();
  </script></body></html>`;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html;charset=UTF-8",
      "Set-Cookie": "csrf-token=deleted; HttpOnly; Max-Age=0; Path=/; SameSite=Lax; Secure",
    },
  });
}
