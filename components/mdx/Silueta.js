import Image from "next/image";
import { SILUETAS } from "../../lib/especies";

// <Silueta especie="tonina" /> - silueta de Yez (public/decor/), para
// usar dentro del cuerpo de un MDX cuando la especie no es la protagonista
// de la pagina (ej. mencionada de paso en un proyecto compartido).
export function Silueta({ especie, width = 240 }) {
  const s = SILUETAS[especie];
  if (!s) return null;
  return (
    <div className="my-8 flex justify-center">
      <Image
        src={s.src}
        alt={`Silueta de ${especie}`}
        width={width}
        height={Math.round((width * s.height) / s.width)}
      />
    </div>
  );
}
