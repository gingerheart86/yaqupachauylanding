import Link from "next/link";
import Image from "next/image";

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-marca focus-visible:ring-offset-2";

// Tarjeta de proyecto: fondo mar.800 solido con la silueta de la
// especie en blanco, nunca una foto - docs/fase2-correcciones.md
// punto 1. Los logos de socios van en GrillaLogos, dentro de la
// pagina del proyecto, no como fondo de tarjeta.
export default function TarjetaProyecto({
  href,
  title,
  description,
  silueta,
  destacada = false,
  nivel: Nivel = "h3",
}) {
  return (
    <Link
      href={href}
      className={`group relative block overflow-hidden rounded-lg border-[0.5px] border-white/15 bg-mar-800 hover:bg-mar-800/90 ${
        destacada ? "sm:col-span-full p-8 sm:p-10" : "p-6"
      } ${FOCUS_RING}`}
    >
      {silueta && (
        <Image
          src={silueta.src}
          alt=""
          aria-hidden="true"
          width={silueta.width}
          height={silueta.height}
          className={`pointer-events-none select-none absolute right-0 top-1/2 h-auto opacity-30 ${
            destacada ? "w-56 sm:w-72" : "w-32 sm:w-40"
          }`}
          style={{ transform: "translateY(-50%) translateX(15%)" }}
        />
      )}
      <div className="relative">
        <Nivel
          className={`font-semibold text-white ${
            destacada ? "text-2xl sm:text-3xl" : "text-lg"
          }`}
        >
          {title}
        </Nivel>
        {description && (
          <p
            className={`mt-2 text-mar-100 ${
              destacada ? "max-w-xl" : "text-sm max-w-xs"
            }`}
          >
            {description}
          </p>
        )}
      </div>
    </Link>
  );
}
