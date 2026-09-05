"use client";

import { useState } from "react";

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-marca focus-visible:ring-offset-2";

function BotonCopiar({ texto }) {
  const [copiado, setCopiado] = useState(false);

  function copiar() {
    navigator.clipboard?.writeText(texto).then(() => {
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    });
  }

  return (
    <button
      type="button"
      onClick={copiar}
      className={`shrink-0 rounded-md border-[0.5px] border-marca-grafito/30 px-3 py-1.5 text-sm font-medium text-mar-800 hover:bg-costa-100 ${FOCUS_RING}`}
    >
      {copiado ? "Copiado ✓" : "Copiar"}
    </button>
  );
}

// Una cuenta bancaria con subcuentas por moneda (BROU): se presenta
// como UNA cuenta con dos subcuentas anidadas visualmente adentro,
// no como dos tarjetas paralelas - eso ultimo se leeria como dos
// cuentas distintas y alguien podria transferir a la moneda
// equivocada. El boton copia el numero completo con su subcuenta
// (ej. "110133846 - 00001"), no solo la subcuenta sola.
//
// Recibe las subcuentas como props planos (numeroDolares/numeroPesos)
// en vez de un array/objeto: next-mdx-remote/rsc descarta en silencio
// los props JSX que no son primitivos (string/number/boolean), asi
// que un prop `subcuentas={[...]}` llega vacio al componente.
export function DatosBancarios({ banco, cuenta, numeroDolares, numeroPesos }) {
  const subcuentas = [
    { moneda: "Dólares", numero: numeroDolares },
    { moneda: "Pesos uruguayos", numero: numeroPesos },
  ];
  return (
    <div className="not-prose my-6 rounded-lg border-[0.5px] border-marca-grafito/20 bg-costa-100 p-5">
      <p className="font-semibold text-mar-800">
        {banco} — <span className="font-mono">{cuenta}</span>
      </p>
      <ul className="mt-4 space-y-3">
        {subcuentas.map((sub) => {
          const numeroCompleto = `${cuenta} - ${sub.numero}`;
          return (
            <li
              key={sub.numero}
              className="flex flex-wrap items-center justify-between gap-3 rounded-md bg-white p-3"
            >
              <div>
                <p className="text-sm font-semibold text-marca-oscuro">{sub.moneda}</p>
                <p className="font-mono text-lg text-mar-800">{numeroCompleto}</p>
              </div>
              <BotonCopiar texto={numeroCompleto} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
