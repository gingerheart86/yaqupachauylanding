# Materiales educativos

Colección gestionada desde el panel de edición (`/admin`, colección
"Materiales educativos"). Cada entrada es un archivo `.md` acá, con
frontmatter y sin cuerpo.

## Frontmatter

```md
---
titulo: "Título del material"
descripcion: "Una o dos líneas."
miniatura: /uploads/mi-miniatura.webp
archivo_pantalla: /uploads/mi-archivo-liviano.pdf
archivo_impresion: /uploads/mi-archivo-full.pdf
credito: "Yez"
orden: 0
---
```

- `titulo`, `descripcion`, `miniatura`, `archivo_pantalla`: obligatorios.
- `archivo_impresion`: opcional — solo si además del PDF liviano para
  pantalla existe una versión de mayor resolución para imprimir.
- `credito`, `orden`: opcionales.

**Nota sobre `/educacion/materiales`:** al momento de crear esta colección,
la página todavía lee de un array fijo en
`app/[locale]/educacion/materiales/page.js` en vez de esta carpeta.
Conectar la página a esta colección es un paso pendiente — hacerlo a
las apuradas hubiera significado forzar el contenido actual (bilingüe
en algunos casos, con más de un archivo por recurso) dentro de este
esquema sin pensarlo. Mientras tanto, esta colección existe y es
usable desde el panel para materiales nuevos.
