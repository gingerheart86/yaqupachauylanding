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
catalogo: "TT-014"
disponible: true
---
```

- `titulo`, `tapa`, `sinopsis`: obligatorios.
- `edad`, `catalogo`: opcionales. `catalogo` solo si el protagonista
  es un individuo real del catálogo de foto-identificación.
- `guion`, `ilustraciones`, `editorial`: opcionales, con el crédito
  habitual como valor por defecto.
- `disponible`: si está a la venta en la tienda, por defecto sí.

Todavía no hay ninguna entrada: `/educacion/libros` sigue siendo un
placeholder con TODO (faltan las tapas en JPG, ver
docs/fase2-correcciones.md). La colección queda lista para cuando
lleguen.
