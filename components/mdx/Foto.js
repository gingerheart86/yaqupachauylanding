import Image from "next/image";

const ANCHOS = {
  normal: "max-w-md mx-auto",
  completo: "w-full",
};

// <Foto> - componente embebible en MDX para insertar una imagen exactamente
// donde va en el relato, con epigrafe y credito opcionales. docs/panel-completo.md,
// seccion "Imagenes intercaladas en MDX".
//
// width/height son el tamano real de la imagen (para que next/image calcule
// el aspect-ratio y evite layout shift) - el render siempre es w-full h-auto,
// osea que cada foto conserva su proporcion natural en vez de recortarse a
// una relacion fija. Las fotos originales tenian relaciones muy distintas
// (retrato, panoramica, cuadrada) y forzar un solo recorte las distorsionaba.
//
// alt es obligatorio: si falta, se muestra un aviso visible en vez de fallar
// en silencio, para que quien edita lo note enseguida.
export function Foto({ src, alt, epigrafe, credito, ancho = "normal", width = 1200, height = 800 }) {
  const altFinal = alt && alt.trim() ? alt : "";
  return (
    <figure className={`my-8 ${ANCHOS[ancho] ?? ANCHOS.normal}`}>
      <Image
        src={src}
        alt={altFinal}
        width={width}
        height={height}
        className="w-full h-auto rounded-lg"
        sizes={ancho === "completo" ? "(min-width: 1024px) 1024px, 100vw" : "(min-width: 640px) 448px, 100vw"}
      />
      {(epigrafe || credito || !altFinal) && (
        <figcaption className="mt-2 text-sm text-marca-grafito text-center">
          {!altFinal && (
            <span className="block font-semibold text-acento-medusa">
              Falta describir esta imagen (alt vacío).
            </span>
          )}
          {epigrafe}
          {credito && <span> · {credito}</span>}
        </figcaption>
      )}
    </figure>
  );
}
