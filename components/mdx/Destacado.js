// <Destacado>texto</Destacado> - para una frase que necesita resaltarse
// dentro del cuerpo, ej. una cifra o conclusion importante.
export function Destacado({ children }) {
  return (
    <p className="my-8 border-l-4 border-marca pl-4 text-lg font-semibold text-mar-800">
      {children}
    </p>
  );
}
