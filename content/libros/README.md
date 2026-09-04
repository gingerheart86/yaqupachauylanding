# Libros

Colección gestionada desde el panel de edición (`/admin`, colección
"Libros"). Cada entrada es un archivo `.mdx` acá, con frontmatter y
sin cuerpo.

## Frontmatter

```md
---
titulo: "Título del libro"
tapa: /libros/tapa.webp
sinopsis: "Resumen del libro."
edad: "A partir de 6 años"
guion: "Silvia Soler"
ilustraciones: "Yez"
editorial: "Krakatoa"
catalogo:
  - { codigo: "URU#001" }
disponible: true
---
```

- `titulo`, `tapa`: obligatorios.
- `sinopsis`, `edad`: opcionales - vacíos hasta que se carguen desde
  el panel, no se inventan.
- `catalogo`: opcional, uno por cada protagonista que sea un
  individuo real del catálogo de foto-identificación (puede haber
  más de uno, ej. El Sonido de las Toninas tiene dos). El enlace
  funciona en los dos sentidos: la ficha del individuo
  (`/investigacion/[proyecto]/catalogo/[slug]`) busca acá qué libros
  lo mencionan (`getLibrosPorCodigoCatalogo` en `lib/libros.js`), no
  al revés.
- `guion`, `ilustraciones`, `editorial`: opcionales, con el crédito
  habitual como valor por defecto.
- `disponible`: si está publicado/a la venta. En `false` la ficha
  muestra "Próximamente" y no linkea a la tienda aunque exista un
  artículo con el mismo slug.

`/educacion/libros` lee de acá (`lib/libros.js`): grilla de 5
columnas en desktop que baja a 3, 2 y 1, y cada tarjeta enlaza a
`/educacion/libros/[slug]`. El botón "Comprar" del detalle solo
aparece si existe `content/tienda/[mismo-slug].mdx` - si no existe
todavía, no se renderiza ningún botón roto.
