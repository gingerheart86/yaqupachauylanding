"use client";

import { useState } from "react";
import { TarjetaIndividuo } from "./TarjetaIndividuo";
import { ModalHistoria } from "./ModalHistoria";

// Une la grilla de figuritas con el modal de historia - el estado de
// "cual esta abierto" vive aca porque la pagina que llama es un
// Server Component. docs/catalogo-figuritas-y-voluntariado.md Bloque A.
export function GrillaCatalogo({ individuos, librosPorCodigo }) {
  const [abierto, setAbierto] = useState(null);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {individuos.map((ind) => (
          <TarjetaIndividuo key={ind.slug} individuo={ind} onAbrirHistoria={setAbierto} />
        ))}
      </div>

      {abierto && (
        <ModalHistoria
          individuo={abierto}
          libros={librosPorCodigo[abierto.codigo] ?? []}
          onCerrar={() => setAbierto(null)}
        />
      )}
    </>
  );
}
