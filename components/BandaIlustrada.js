import Image from "next/image";
import Garabato from "./ui/Garabato";

// Banda de costa antes del footer, con las siluetas de Yez a distintas
// escalas y un par de garabatos - seccion 5 de
// docs/fase3-navegacion-portada.md. El footer quedo en costa-100
// (claro), asi que la banda va oscura (mar-900) para separar las dos
// franjas en vez de fundirse una con otra.
const SILUETAS = [
  { src: "/decor/silueta-orca.png", w: 900, h: 466, ancho: 120, bottom: 4 },
  { src: "/decor/silueta-tonina.png", w: 900, h: 362, ancho: 150, bottom: 10 },
  {
    src: "/decor/silueta-ballena-franca.png",
    w: 900,
    h: 357,
    ancho: 170,
    bottom: 0,
  },
  {
    src: "/decor/silueta-franciscana.png",
    w: 900,
    h: 261,
    ancho: 110,
    bottom: 14,
  },
];

export default function BandaIlustrada() {
  return (
    <div
      className="relative h-32 sm:h-44 w-full overflow-hidden bg-mar-900"
      aria-hidden="true"
    >
      <Garabato
        numero={2}
        registro="neutro"
        width={140}
        className="absolute left-[8%] top-4 hidden sm:block"
      />
      <Garabato
        numero={4}
        registro="neutro"
        width={160}
        className="absolute right-[6%] top-6"
      />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-center gap-6 sm:gap-16 px-4 pb-2">
        {SILUETAS.map((s) => (
          <div
            key={s.src}
            className="relative shrink-0"
            style={{ bottom: s.bottom }}
          >
            <Image
              src={s.src}
              alt=""
              width={s.w}
              height={s.h}
              loading="eager"
              className="h-auto opacity-90"
              style={{ width: s.ancho }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
