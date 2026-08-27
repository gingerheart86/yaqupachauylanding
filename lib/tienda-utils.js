// Separado de lib/tienda.js porque ese archivo usa fs/path (solo
// servidor) y esta funcion la necesitan tambien los componentes
// cliente del carrito - importar cualquier cosa de un archivo con fs
// rompe el bundle de cliente aunque no se use esa parte.
export function formatearPrecio(precio) {
  return new Intl.NumberFormat("es-UY").format(precio);
}
