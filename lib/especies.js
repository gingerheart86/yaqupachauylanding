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
