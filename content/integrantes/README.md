# Integrantes

Colección gestionada desde el panel de edición (`/admin`, colección
"Integrantes"). Cada entrada es un archivo `.md` acá, con frontmatter
y sin cuerpo. La grilla de `/nosotros/integrantes` lee de acá
(`lib/integrantes.js`) — Bloque 2 de docs/panel-completo.md.

## Frontmatter

```md
---
nombre: "Nombre Apellido"
rol: "Rol dentro del equipo"
foto: /uploads/nombre.webp
alt: "Descripción de la foto"
bio: "Reseña breve (ES)."
bio_en: "Reseña breve (EN)."
formacion: "Título y universidad"
orcid: "0000-0000-0000-0000"
twitter: "https://twitter.com/usuario"
linkedin: "https://linkedin.com/in/usuario"
activa: true
orden: 0
---
```

- `nombre`, `foto`: obligatorios.
- `bio_en`, `twitter`, `linkedin`: no estaban en el schema original del
  doc (Bloque 2 solo tenía `bio` en un idioma, sin redes) — se
  agregaron para no perder el inglés ni los enlaces a redes que ya
  tenían las tres integrantes migradas. Todos opcionales.
- `activa: false` saca a la persona de la grilla sin borrar el archivo.
- El resto (`rol`, `alt`, `formacion`, `orcid`, `orden`) son opcionales.

Las tres integrantes que antes vivían en un array fijo en
`app/[locale]/nosotros/integrantes/page.js` ya están migradas acá
(`paula-laporta.md`, `carolina-menchaca.md`, `cecilia-laporta.md`), con
la misma reseña bilingüe y los mismos enlaces (algunos siguen siendo
`"#"` porque nunca se cargó la URL real — no se inventó ninguna).
