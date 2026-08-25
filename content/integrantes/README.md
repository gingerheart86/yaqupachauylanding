# Integrantes

Colección gestionada desde el panel de edición (`/admin`, colección
"Integrantes"). Cada entrada es un archivo `.md` acá, con frontmatter
y sin cuerpo.

## Frontmatter

```md
---
nombre: "Nombre Apellido"
rol: "Rol dentro del equipo"
foto: /uploads/nombre.webp
bio: "Reseña breve."
orden: 0
---
```

- `nombre`, `rol`, `foto`: obligatorios.
- `bio`, `orden`: opcionales.

**Nota sobre `/nosotros/integrantes`:** la página actual sigue
mostrando a las 3 integrantes desde un array fijo en
`app/[locale]/nosotros/integrantes/page.js`, con reseña en español e
inglés y enlaces a redes por persona — cosas que este esquema (pensado
para que cualquiera pueda sumar gente sin tocar código) no cubre.
Forzar esas tres fichas a este formato les hubiera hecho perder el
inglés y los enlaces sin que el doc lo pidiera explícitamente. La
colección ya existe y está lista para usarse; conectarla a la página
en reemplazo del array fijo es un paso aparte, a decidir con el equipo
qué hacer con lo que el esquema nuevo no contempla.
