import GrillaLogosUI from "../ui/GrillaLogos";
import { LOGOS_POR_PROYECTO } from "../../lib/logos";

// <GrillaLogos proyecto="gephyreus" /> - logos de socios institucionales,
// para usar dentro del cuerpo de un MDX. Busca en lib/logos.js; si el
// proyecto no tiene logos cargados todavia, no renderiza nada (no rompe
// el build por falta de datos).
export function GrillaLogos({ proyecto }) {
  const logos = LOGOS_POR_PROYECTO[proyecto];
  if (!logos || logos.length === 0) return null;
  return <GrillaLogosUI logos={logos} />;
}
