// Siluetas de Yez por especie - docs/fase2-assets-yez.md seccion 2.
export const SILUETAS = {
  tonina: { src: "/decor/silueta-tonina.png", width: 900, height: 362 },
  franciscana: { src: "/decor/silueta-franciscana.png", width: 900, height: 261 },
  orca: { src: "/decor/silueta-orca.png", width: 900, height: 466 },
  "ballena-franca": {
    src: "/decor/silueta-ballena-franca.png",
    width: 900,
    height: 357,
  },
};

// Resuelve la silueta a partir del nombre de especie tal como se
// guarda en el catalogo (individuo.especie, ej. "Tonina") - para que
// la tarjeta del catalogo elija la silueta segun el dato de la ficha
// en vez de tenerla escrita a mano por proyecto.
// components/catalogo/TarjetaIndividuo.js.
export function siluetaPorEspecie(nombreEspecieEs) {
  const especie = ESPECIES.find((e) => e.nombre.es === nombreEspecieEs);
  return especie ? SILUETAS[especie.slug] ?? null : null;
}

export const ESPECIES = [
  {
    slug: "tonina",
    nombre: { es: "Tonina", en: "Tonina" },
    cientifico: "Tursiops truncatus gephyreus",
  },
  {
    slug: "ballena-franca",
    nombre: { es: "Ballena franca austral", en: "Southern right whale" },
    cientifico: "Eubalaena australis",
  },
  {
    slug: "franciscana",
    nombre: { es: "Franciscana", en: "Franciscana" },
    cientifico: "Pontoporia blainvillei",
  },
  {
    slug: "orca",
    nombre: { es: "Orca", en: "Orca" },
    cientifico: "Orcinus orca",
  },
];
