# Libros

Colección gestionada desde el panel de edición (`/admin`, colección
"Libros"). Cada entrada es un archivo `.md` acá, con frontmatter y sin
cuerpo.

## Frontmatter

```md
---
titulo: "Título del libro"
tapa: /uploads/tapa.webp
sinopsis: "Resumen del libro."
edad: "A partir de 6 años"
guion: "Silvia Soler"
ilustraciones: "Yez"
editorial: "Krakatoa"
catalogo: "URU#001"
disponible: true
---
```

- `titulo`, `tapa`, `sinopsis`: obligatorios.
- `edad`, `catalogo`: opcionales. `catalogo` solo si el protagonista
  es un individuo real del catálogo de foto-identificación.
- `guion`, `ilustraciones`, `editorial`: opcionales, con el crédito
  habitual como valor por defecto.
- `disponible`: si está a la venta en la tienda, por defecto sí.

`/educacion/libros` ya lee de acá (`lib/libros.js`): grilla de 5
columnas en desktop que baja a 1 en mobile, y cada tarjeta enlaza a
`/educacion/libros/[slug]`. Todavía no hay ninguna entrada real - la
grilla muestra "Todavía no hay libros cargados" mientras tanto.
