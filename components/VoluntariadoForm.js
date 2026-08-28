"use client";

import { useState } from "react";

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-marca focus-visible:ring-offset-2";

const TIPO_INPUT = {
  texto: "text",
  email: "email",
  "teléfono": "tel",
};

// Formulario generado a partir de content/paginas/voluntariado.mdx,
// campo "campos" - agregar un campo desde el panel lo hace aparecer
// aca. docs/catalogo-figuritas-y-voluntariado.md Bloque B.
export default function VoluntariadoForm({ campos, mensajeExito, avisoDatos }) {
  const [estado, setEstado] = useState("listo"); // listo | enviando | exito | error
  const [error, setError] = useState(null);

  async function onSubmit(e) {
    e.preventDefault();
    setEstado("enviando");
    setError(null);

    const datos = Object.fromEntries(new FormData(e.target).entries());

    try {
      const res = await fetch("/api/voluntariado", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "No se pudo enviar el formulario.");
      setEstado("exito");
    } catch (err) {
      setEstado("error");
      setError(err.message);
    }
  }

  if (estado === "exito") {
    return (
      <div className="rounded-lg border-2 border-marca bg-costa-100 p-6 text-center">
        <p className="font-semibold text-mar-800">{mensajeExito}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Honeypot - invisible para personas, los bots suelen completar
          cualquier campo que encuentran. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="sitio_web">No completar este campo</label>
        <input type="text" id="sitio_web" name="sitio_web" tabIndex={-1} autoComplete="off" />
      </div>

      {campos.map((campo) => (
        <div key={campo.nombre}>
          <label htmlFor={campo.nombre} className="block text-sm font-medium text-mar-800">
            {campo.etiqueta}
            {campo.obligatorio && <span className="text-acento-medusa"> *</span>}
          </label>

          {campo.tipo === "texto largo" ? (
            <textarea
              id={campo.nombre}
              name={campo.nombre}
              required={campo.obligatorio}
              rows={4}
              className={`mt-1 w-full rounded-md border-[0.5px] border-marca-grafito/30 px-3 py-2 ${FOCUS_RING}`}
            />
          ) : campo.tipo === "selección" ? (
            <select
              id={campo.nombre}
              name={campo.nombre}
              required={campo.obligatorio}
              className={`mt-1 w-full rounded-md border-[0.5px] border-marca-grafito/30 px-3 py-2 ${FOCUS_RING}`}
            >
              {(campo.opciones || "").split("\n").filter(Boolean).map((op) => (
                <option key={op} value={op.trim()}>{op.trim()}</option>
              ))}
            </select>
          ) : campo.tipo === "casilla" ? (
            <input
              type="checkbox"
              id={campo.nombre}
              name={campo.nombre}
              required={campo.obligatorio}
              className={`mt-1 ${FOCUS_RING}`}
            />
          ) : (
            <input
              type={TIPO_INPUT[campo.tipo] || "text"}
              id={campo.nombre}
              name={campo.nombre}
              required={campo.obligatorio}
              className={`mt-1 w-full rounded-md border-[0.5px] border-marca-grafito/30 px-3 py-2 ${FOCUS_RING}`}
            />
          )}
        </div>
      ))}

      {avisoDatos && <p className="text-xs text-marca-grafito">{avisoDatos}</p>}

      {estado === "error" && (
        <p className="text-sm font-medium text-acento-medusa" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={estado === "enviando"}
        className={`w-full rounded-md bg-marca-oscuro px-6 py-3 font-medium text-white hover:bg-marca-oscuro/90 disabled:opacity-60 ${FOCUS_RING}`}
      >
        {estado === "enviando" ? "Enviando…" : "Enviar"}
      </button>
    </form>
  );
}
