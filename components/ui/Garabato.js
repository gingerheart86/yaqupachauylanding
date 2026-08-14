import Image from "next/image";

// Piezas sueltas de garabatos.png (Yez) - ver docs/fase2-assets-yez.md
// seccion 3. 1: mandala grande parcial. 2: espiral con estrella.
// 3: puntito diminuto (15x15px - nunca escalar grande). 4: estrella
// fugaz con espiral. 5: mandala mediano parcial.
const GARABATOS = {
  1: { src: "/decor/garabatos/garabato-1.png", width: 369, height: 267 },
  2: { src: "/decor/garabatos/garabato-2.png", width: 271, height: 122 },
  3: { src: "/decor/garabatos/garabato-3.png", width: 15, height: 15 },
  4: { src: "/decor/garabatos/garabato-4.png", width: 387, height: 159 },
  5: { src: "/decor/garabatos/garabato-5.png", width: 373, height: 171 },
};

// registro: "alto" (visible) o "neutro" (sutil, marca de agua).
// Nunca usar en registro "sobrio" - eso lo decide quien llama al
// componente no incluyendolo, no una prop.
export default function Garabato({
  numero = 1,
  registro = "neutro",
  width = 96,
  className = "",
}) {
  const pieza = GARABATOS[numero];
  const height = Math.round((width * pieza.height) / pieza.width);
  const opacidad = registro === "alto" ? "opacity-100" : "opacity-15";

  return (
    <Image
      src={pieza.src}
      alt=""
      aria-hidden="true"
      width={width}
      height={height}
      className={`pointer-events-none select-none ${opacidad} ${className}`}
    />
  );
}
