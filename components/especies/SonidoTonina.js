import Link from "next/link";
import { Foto } from "../mdx/Foto";

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-marca focus-visible:ring-offset-2";

// Ilustracion de Yez ("Las toninas silban", de El Sonido de las
// Toninas) + reproductor del silbido real. preload="none": que el
// audio no se descargue hasta que alguien lo pida, y nunca autoplay -
// docs/panel-completo.md.
export function SonidoTonina({ locale = "es" }) {
  const esIngles = locale === "en";

  return (
    <div className="mt-12">
      <Foto
        src="/decor/silban-toninas.webp"
        alt={
          esIngles
            ? "Illustration of two toninas swimming, with yellow sound waves coming from the first one's mouth, representing its whistle"
            : "Ilustración de dos toninas nadando, con ondas de sonido amarillas saliendo de la boca de la primera, representando su silbido"
        }
        credito={esIngles ? "Illustration: Yez" : "Ilustración: Yez"}
        ancho="completo"
        width={1600}
        height={800}
      />

      <div className="mx-auto mt-4 max-w-2xl text-center">
        <p className="text-texto">
          {esIngles
            ? "Toninas use whistles to stay in contact with their companions. Listen to a real recording made on the Rocha coast:"
            : "Las toninas usan silbidos para mantener el contacto con sus compañeros. Escuchá una grabación real hecha en la costa de Rocha:"}
        </p>

        <audio controls preload="none" className="mx-auto mt-4 w-full max-w-md">
          <source src="/silbido.mp3" type="audio/mpeg" />
          {esIngles
            ? "Your browser can't play this audio."
            : "Tu navegador no puede reproducir este audio."}
        </audio>

        <p className="mt-4 text-sm">
          <Link
            href="/es/educacion/libros/el-sonido-de-las-toninas"
            className={`text-marca-oscuro underline underline-offset-4 ${FOCUS_RING}`}
          >
            {esIngles
              ? "This illustration is from the book «El Sonido de las Toninas» →"
              : "Esta ilustración es del libro «El Sonido de las Toninas» →"}
          </Link>
        </p>
      </div>
    </div>
  );
}
