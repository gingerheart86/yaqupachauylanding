"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { esRutaBilingue } from "../lib/i18n";

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-marca focus-visible:ring-offset-2";

// Si la ruta actual no existe en el otro idioma, el switcher manda a
// la portada de ese idioma en vez de a un 404.
function hrefParaLocale(pathname, targetLocale) {
  const segments = pathname.split("/").filter(Boolean); // [locale, ...resto]
  const resto = segments.slice(1);
  const primerSegmento = resto[0] ?? "";
  if (!esRutaBilingue(primerSegmento)) {
    return `/${targetLocale}`;
  }
  const path = resto.join("/");
  return path ? `/${targetLocale}/${path}` : `/${targetLocale}`;
}

export default function LanguageSwitcher({ locale, className = "" }) {
  const pathname = usePathname();

  return (
    <div className={`flex items-center gap-1 text-sm font-medium ${className}`}>
      <span className="sr-only">Idioma / Language</span>
      {["es", "en"].map((loc) => {
        const activo = loc === locale;
        return activo ? (
          <span
            key={loc}
            aria-current="true"
            className="rounded-md bg-marca-oscuro px-2 py-1 uppercase text-white"
          >
            {loc}
          </span>
        ) : (
          <Link
            key={loc}
            href={hrefParaLocale(pathname, loc)}
            className={`rounded-md px-2 py-1 uppercase text-marca-oscuro hover:bg-costa-300 ${FOCUS_RING}`}
          >
            {loc}
          </Link>
        );
      })}
    </div>
  );
}
