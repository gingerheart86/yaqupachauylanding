# Noticias

Cada nota es un archivo `.mdx` en esta carpeta. El nombre del archivo (sin
`.mdx`) es el slug de la ruta: `content/noticias/mi-nota.mdx` → `/noticias/mi-nota`.

## Frontmatter

```md
---
titulo: "Título de la nota"
fecha: "2026-08-17"
resumen: "Una o dos líneas para la tarjeta y la meta description."
imagen: "/noticias/mi-nota.webp"
categoria: "Investigación"
destacada: true
---

Cuerpo de la nota en Markdown/MDX.
```

- `titulo`, `fecha` y `resumen`: obligatorios. `fecha` en formato `YYYY-MM-DD`.
- `imagen`: opcional, ruta dentro de `public/`.
- `categoria`: opcional, texto libre (ej. "Investigación", "Divulgación").
- `destacada`: opcional, booleano. Como mucho una nota destacada por vez
  tiene sentido visual — se muestra más grande en `/noticias` y primera
  en la portada.

Las imágenes van en `public/noticias/`, procesadas según los criterios de
`docs/fase3-arquitectura-y-contenido.md` (WebP, máximo 1600px de ancho para
fotos de contenido).

No hay notas todavía. Agregar un archivo acá es suficiente para que aparezca
en `/noticias` y, si corresponde, entre las últimas tres de la portada — no
hace falta tocar código.
