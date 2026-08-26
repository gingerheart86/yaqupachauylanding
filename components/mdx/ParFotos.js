// <ParFotos> - envuelve dos <Foto> para mostrarlas lado a lado (2 columnas
// en pantallas chicas y grandes por igual, como en franciscana y gephyreus
// en el JSX original). Los <Foto> hijos se renderizan tal cual, solo se les
// saca el margen vertical propio para que la grilla quede pareja.
// leyenda: epigrafe compartido debajo de las dos, para cuando el original
// tenia un solo pie de foto para el par (en vez de uno por imagen).
export function ParFotos({ children, leyenda }) {
  return (
    <div className="my-8">
      <div className="grid grid-cols-2 gap-4 [&_figure]:my-0 [&_figcaption]:hidden">
        {children}
      </div>
      {leyenda && (
        <p className="mt-2 text-sm text-marca-grafito text-center">{leyenda}</p>
      )}
    </div>
  );
}
