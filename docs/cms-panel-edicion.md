# Panel de edición — CMS sobre Git

**Sveltia CMS.** Usa el mismo formato de configuración que Decap, que tiene mantenimiento irregular. Sveltia es compatible, más moderno y maneja mejor las imágenes.

Un panel en `/admin` con editor visual. Cada guardado se convierte en un commit de MDX en el repo, y el commit dispara el deploy de Vercel. Sin base de datos, sin servicio externo, sin costo.

**Una sola usuaria:** la administradora del repo, autenticada con su cuenta de GitHub. No configurar flujo editorial ni proveedores de identidad externos. Si más adelante hay que sumar editoras, se agrega Netlify Identity sobre esta misma base.

**Nunca compartir credenciales de GitHub.** La cuenta dueña del repo puede borrarlo entero y, siendo una cuenta personal, da acceso a todos los repos privados de esa persona.

---

## Bloque 1 — Instalación del panel

```bash
mkdir -p public/admin
```

`public/admin/index.html`:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex" />
    <title>Panel de edición — Yaqu Pacha Uruguay</title>
  </head>
  <body>
    <script src="https://unpkg.com/@sveltia/cms/dist/sveltia-cms.js"></script>
  </body>
</html>
```

El `noindex` es obligatorio: sin él Google indexa el panel de administración.

Excluir `/admin` del `sitemap.js` y agregarlo a `robots.js` como `disallow`.

## Bloque 2 — Autenticación OAuth en Vercel

Sveltia trae un backend pensado para Netlify. En Vercel hace falta un proxy propio.

1. En GitHub: Settings → Developer settings → OAuth Apps → New OAuth App
   - Homepage URL: `https://yaqupachauy.org`
   - Authorization callback URL: `https://yaqupachauy.org/api/auth/callback`
2. Guardar `GITHUB_CLIENT_ID` y `GITHUB_CLIENT_SECRET` como variables de entorno en Vercel. **Nunca commitearlas.** Verificar que `.env*` esté en `.gitignore`.
3. Crear dos Route Handlers en `app/api/auth/`:
   - `route.js` — redirige a GitHub para autorizar
   - `callback/route.js` — recibe el código, lo intercambia por token y lo devuelve al CMS

En `public/admin/config.yml`:

```yaml
backend:
  name: github
  repo: gingerheart86/yaqupachauylanding
  branch: main
  base_url: https://yaqupachauy.org
  auth_endpoint: api/auth
```

## Bloque 3 — Colecciones

`public/admin/config.yml`, completo. **Esta parte es la que cuesta cambiar después:** una vez que hay contenido cargado, renombrar un campo obliga a editar todos los archivos.

```yaml
media_folder: "public/uploads"
public_folder: "/uploads"

collections:
  - name: "noticias"
    label: "Noticias"
    folder: "content/noticias"
    create: true
    slug: "{{year}}-{{month}}-{{slug}}"
    extension: "mdx"
    fields:
      - { name: "titulo", label: "Título", widget: "string" }
      - { name: "fecha", label: "Fecha", widget: "datetime", format: "YYYY-MM-DD" }
      - name: "categoria"
        label: "Categoría"
        widget: "select"
        options: ["Institucional", "Ciencia", "Educación ambiental", "Prensa"]
      - { name: "resumen", label: "Resumen", widget: "text", hint: "Dos o tres líneas. Aparece en el listado y al compartir en redes." }
      - { name: "imagen", label: "Imagen principal", widget: "image", required: false, hint: "Menos de 2 MB." }
      - { name: "alt", label: "Descripción de la imagen", widget: "string", required: false, hint: "Para quienes usan lector de pantalla. Describí qué se ve." }
      - { name: "destacada", label: "Destacada en portada", widget: "boolean", default: false }
      - { name: "body", label: "Contenido", widget: "markdown" }

  - name: "materiales"
    label: "Materiales educativos"
    folder: "content/materiales"
    create: true
    fields:
      - { name: "titulo", label: "Título", widget: "string" }
      - { name: "descripcion", label: "Descripción", widget: "text" }
      - { name: "miniatura", label: "Miniatura", widget: "image" }
      - { name: "archivo_pantalla", label: "PDF liviano (pantalla)", widget: "file" }
      - { name: "archivo_impresion", label: "PDF de impresión", widget: "file", required: false }
      - { name: "credito", label: "Crédito", widget: "string", required: false }
      - { name: "orden", label: "Orden", widget: "number", default: 0 }

  - name: "integrantes"
    label: "Integrantes"
    folder: "content/integrantes"
    create: true
    fields:
      - { name: "nombre", label: "Nombre", widget: "string" }
      - { name: "rol", label: "Rol", widget: "string" }
      - { name: "foto", label: "Foto", widget: "image" }
      - { name: "bio", label: "Reseña", widget: "text", required: false }
      - { name: "orden", label: "Orden", widget: "number", default: 0 }

  - name: "libros"
    label: "Libros"
    folder: "content/libros"
    create: true
    fields:
      - { name: "titulo", label: "Título", widget: "string" }
      - { name: "tapa", label: "Tapa", widget: "image" }
      - { name: "sinopsis", label: "Sinopsis", widget: "text" }
      - { name: "edad", label: "Edad recomendada", widget: "string", required: false }
      - { name: "guion", label: "Guion", widget: "string", default: "Silvia Soler" }
      - { name: "ilustraciones", label: "Ilustraciones", widget: "string", default: "Yez" }
      - { name: "editorial", label: "Editorial", widget: "string", default: "Krakatoa" }
      - { name: "catalogo", label: "Individuo del catálogo", widget: "string", required: false, hint: "Código si el protagonista es un individuo real. Ej: TT-014" }
      - { name: "disponible", label: "Disponible para la venta", widget: "boolean", default: true }
```

**No incluir en el panel:** especies, proyectos, publicaciones ni catálogos de individuos. Llevan citas, cifras con intervalos de confianza y terminología que debe escribirse como estimación. Ese contenido se edita por código, con revisión previa.

## Bloque 4 — Archivo de noticias

Independiente del CMS y necesario igual: sin esto no se pueden leer las notas viejas.

- `/noticias` — listado paginado, 10 por página
- Filtro por categoría y por año
- `/noticias/[slug]` — URL propia y permanente. **Nunca cambiar un slug publicado:** rompe los enlaces compartidos
- Feed RSS en `/noticias/feed.xml`
- Las noticias entran en el `sitemap.js`
- En la portada, las tres últimas
- Al pie de cada nota, enlaces a la anterior y la siguiente

Migrar las noticias que ya existan como MDX a esta estructura, sin cambiar sus slugs.

## Bloque 5 — Control de peso de imágenes

Punto débil del esquema: alguien sube una foto de 8 MB del celular y va al repo tal cual.

1. Configurar Sveltia para redimensionar al subir, máximo 1600 px de lado largo
2. Usar `next/image` en el renderizado
3. El `hint` del campo ya avisa el límite de 2 MB

## Verificación

- [ ] `/admin` carga y pide autenticación
- [ ] El login con GitHub funciona en producción, no solo en local
- [ ] `/admin` tiene `noindex`, está fuera del sitemap y en disallow de robots
- [ ] Las variables de entorno están en Vercel y no en el repo
- [ ] `.env*` está en `.gitignore`
- [ ] Crear una noticia desde el panel genera el commit y dispara el deploy
- [ ] Editar y borrar también funcionan
- [ ] Las imágenes subidas desde el panel se ven bien en la nota
- [ ] El listado pagina bien con más de 10 notas
- [ ] Los slugs viejos siguen funcionando
- [ ] El RSS valida
- [ ] `npm run build` sin errores
