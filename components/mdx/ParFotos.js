// <ParFotos> - envuelve dos <Foto> para mostrarlas lado a lado. <Foto>
// por su cuenta renderiza w-full h-auto (conserva la proporcion natural
// de cada imagen a proposito - ver el comentario en Foto.js), lo que
// esta bien para una foto sola pero deja celdas de alturas distintas
// cuando dos fotos con proporciones muy distintas quedan lado a lado
// (el caso de las dos fotos de franciscana en La Esmeralda). Se
// corrige aca, no en Foto, para no perder ese comportamiento en el
// resto del sitio donde una sola foto por vez es lo correcto.
//
// El recorte a proporcion fija es opt-in via "proporcion" (ej. "3/2"),
// no el comportamiento por defecto: <ParFotos> tambien se usa en
// gephyreus.mdx para un logo junto a un afiche con texto (proporciones
// 465x318 y 819x1024, nada parecido entre si) - forzar un recorte
// parejo ahi cortaria contenido real del afiche, asi que ese uso
// sigue con las proporciones naturales de cada imagen.
//
// Antes de sm: siempre se apilan en una columna, sin recorte - el
// problema de altura dispareja solo existe cuando estan lado a lado.
// Tailwind necesita ver la clase completa como string literal en el
// codigo para generar el CSS (JIT) - una interpolacion tipo
// `aspect-[${proporcion}]` no funciona, por eso el mapa en vez de
// armar la clase con el valor de la prop directamente.
const PROPORCIONES = {
  "3/2": "sm:[&_img]:aspect-[3/2] sm:[&_img]:object-cover sm:[&_img]:object-center",
  "4/3": "sm:[&_img]:aspect-[4/3] sm:[&_img]:object-cover sm:[&_img]:object-center",
};

export function ParFotos({ children, leyenda, proporcion }) {
  const estiloRecorte = PROPORCIONES[proporcion] ?? "";
  return (
    <div className="my-8">
      <div
        className={`grid grid-cols-1 gap-4 sm:grid-cols-2 [&_figure]:my-0 [&_figcaption]:hidden ${estiloRecorte}`}
      >
        {children}
      </div>
      {leyenda && (
        <p className="mt-2 text-sm text-marca-grafito text-center">{leyenda}</p>
      )}
    </div>
  );
}
