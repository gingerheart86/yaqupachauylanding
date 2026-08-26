# Panel completo — bloques 1 a 9

═══════════════════════════════════════════
BLOQUE 1 — Páginas únicas editables
═══════════════════════════════════════════

Cada página tiene que leer su texto de un MDX en `content/paginas/`, no tenerlo
en el JSX. Migrar el texto actual sin reescribirlo.

Archivos: `la-ong.mdx`, `home-institucional.mdx`, `donaciones.mdx`,
`reportar-avistamiento.mdx`, `contacto.mdx`, `identificacion.mdx`

```yaml
  - name: "paginas"
    label: "Páginas"
    files:
      - name: "la-ong"
        label: "Nosotros — La ONG"
        file: "content/paginas/la-ong.mdx"
        fields:
          - { name: "titulo", label: "Título", widget: "string" }
          - { name: "resumen", label: "Bajada", widget: "text" }
          - { name: "imagen", label: "Imagen principal", widget: "image", required: false, hint: "Menos de 2 MB." }
          - { name: "alt", label: "Descripción de la imagen", widget: "string", required: false }
          - { name: "body", label: "Contenido", widget: "markdown" }

      - name: "home-institucional"
        label: "Portada — Sección institucional"
        file: "content/paginas/home-institucional.mdx"
        fields:
          - { name: "titulo", label: "Título de la sección", widget: "string" }
          - { name: "body", label: "Texto", widget: "markdown", hint: "Va sobre la textura, conviene que sea breve." }

      - name: "donaciones"
        label: "Colaborá — Donaciones"
        file: "content/paginas/donaciones.mdx"
        fields:
          - { name: "titulo", label: "Título", widget: "string" }
          - { name: "intro", label: "Introducción", widget: "text", hint: "A qué se destinan los fondos." }
          - { name: "body", label: "Datos para donar", widget: "markdown", hint: "Revisá los números de cuenta dos veces antes de guardar." }

      - name: "reportar-avistamiento"
        label: "Colaborá — Reportar un avistamiento"
        file: "content/paginas/reportar-avistamiento.mdx"
        fields:
          - { name: "titulo", label: "Título", widget: "string" }
          - { name: "body", label: "Texto explicativo", widget: "markdown", hint: "Importancia de los registros oportunistas para el monitoreo y la ciencia ciudadana." }
          - { name: "aclaracion_varamiento", label: "Aclaración sobre varamientos", widget: "text", hint: "Un avistamiento es de animales vivos. Si está muerto o varado, es un varamiento." }

      - name: "identificacion"
        label: "Colaborá — Guía de identificación"
        file: "content/paginas/identificacion.mdx"
        fields:
          - { name: "titulo", label: "Título", widget: "string" }
          - { name: "intro", label: "Introducción", widget: "text" }
          - { name: "cierre_educativo", label: "Cierre educativo", widget: "markdown", hint: "Qué es un cetáceo, diferencia entre misticetos y odontocetos." }

      - name: "contacto"
        label: "Colaborá — Contacto"
        file: "content/paginas/contacto.mdx"
        fields:
          - { name: "titulo", label: "Título", widget: "string" }
          - { name: "body", label: "Contenido", widget: "markdown" }
```

**Los enlaces de reporte NO son editables desde el panel.** Van como constantes
en un solo archivo del código. Un espacio de más al pegar los rompe y nadie se
entera hasta que alguien no puede reportar un varamiento.

```
Survey123 tonina:  https://survey123.arcgis.com/share/ceb52d2974a04d0f85beae2fd3705f8c
Telegram ballena:  https://t.me/+JdOjrySrBzFkYTJh
Varamiento:        https://wa.me/59898490889
Survey123 otras:   PENDIENTE
```

═══════════════════════════════════════════
BLOQUE 2 — Integrantes desde el panel
═══════════════════════════════════════════

La grilla de `/nosotros/integrantes` lee de `content/integrantes/`, no del JSX.
Migrar las integrantes actuales, un archivo por persona.

```yaml
  - name: "integrantes"
    label: "Integrantes"
    folder: "content/integrantes"
    create: true
    identifier_field: "nombre"
    fields:
      - { name: "nombre", label: "Nombre", widget: "string" }
      - { name: "rol", label: "Rol", widget: "string" }
      - { name: "foto", label: "Foto", widget: "image", hint: "Cuadrada si es posible, menos de 2 MB." }
      - { name: "alt", label: "Descripción de la foto", widget: "string", required: false }
      - { name: "bio", label: "Reseña", widget: "text", required: false }
      - { name: "formacion", label: "Formación", widget: "string", required: false }
      - { name: "orcid", label: "ORCID", widget: "string", required: false, hint: "Solo el identificador, sin la URL." }
      - { name: "activa", label: "Activa en el equipo", widget: "boolean", default: true, hint: "Desmarcada, desaparece de la grilla pero la ficha se conserva." }
      - { name: "orden", label: "Orden", widget: "number", default: 0 }
```

La grilla tiene que escalar sin rediseño: foto en proporción fija, y una tarjeta
sin foto no debe romper el diseño.

═══════════════════════════════════════════
BLOQUE 3 — Especies y proyectos desde el panel
═══════════════════════════════════════════

```yaml
  - name: "especies"
    label: "Especies"
    folder: "content/especies"
    create: true
    identifier_field: "nombre_comun"
    fields:
      - { name: "nombre_comun", label: "Nombre común", widget: "string" }
      - { name: "nombre_cientifico", label: "Nombre científico", widget: "string", hint: "Se muestra en cursiva automáticamente." }
      - { name: "silueta", label: "Silueta", widget: "image", hint: "De public/decor/." }
      - { name: "imagen", label: "Imagen principal", widget: "image", required: false }
      - { name: "alt", label: "Descripción de la imagen", widget: "string", required: false }
      - { name: "resumen", label: "Bajada", widget: "text" }
      - { name: "body", label: "Contenido", widget: "markdown", hint: "Escribir siempre las cifras como estimaciones: 'se estimó en', 'las estimaciones rondan'. Nunca 'hay' ni 'quedan'." }
      - { name: "orden", label: "Orden", widget: "number", default: 0 }

  - name: "proyectos"
    label: "Proyectos"
    folder: "content/proyectos"
    create: true
    identifier_field: "nombre"
    fields:
      - { name: "nombre", label: "Nombre", widget: "string" }
      - { name: "resumen", label: "Bajada", widget: "text" }
      - { name: "silueta", label: "Silueta", widget: "image", required: false }
      - { name: "body", label: "Contenido", widget: "markdown" }
      - name: "registro"
        label: "Registro visual"
        widget: "select"
        options: ["alto", "sobrio"]
        default: "sobrio"
        hint: "Alto solo para Proyecto Toninas, que es exclusivo de Yaqu Pacha. Los proyectos compartidos van sobrios."
      - { name: "destacado", label: "Destacado en portada", widget: "boolean", default: false }
      - { name: "orden", label: "Orden", widget: "number", default: 0 }
```

═══════════════════════════════════════════
BLOQUE 4 — Publicaciones con Crossref
═══════════════════════════════════════════

Cargar solo el DOI y traer el resto de Crossref, el registro oficial de los DOI.
Gratis, sin cuenta, y es infraestructura pública de la comunidad científica.

**Route Handler** `app/api/doi/route.js`:

```
GET https://api.crossref.org/works/{doi}
```

Extraer de `message`: `title[0]`, `author` (array con `given`/`family`),
`container-title[0]`, `volume`, `page`, `published.date-parts[0][0]`, `license`.

Header requerido por cortesía:
```
User-Agent: YaquPachaUruguay/1.0 (mailto:CORREO_DEL_EQUIPO)
```

Manejar DOI inexistente, sin conexión y respuesta lenta. Si falla, permitir carga
manual — nunca dejar el formulario colgado.

```yaml
  - name: "publicaciones"
    label: "Publicaciones científicas"
    folder: "content/publicaciones"
    create: true
    identifier_field: "titulo"
    fields:
      - { name: "doi", label: "DOI", widget: "string", required: false, hint: "Solo el identificador. Ej: 10.1016/j.biocon.2026.111865" }
      - { name: "titulo", label: "Título", widget: "string" }
      - { name: "autores", label: "Autores", widget: "text", hint: "Como van en la cita. Poner en negrita a quienes son del equipo." }
      - { name: "revista", label: "Revista", widget: "string" }
      - { name: "anio", label: "Año", widget: "number", value_type: "int" }
      - { name: "volumen", label: "Volumen", widget: "string", required: false }
      - { name: "paginas", label: "Páginas o número de artículo", widget: "string", required: false }
      - name: "especie"
        label: "Especie"
        widget: "select"
        multiple: true
        required: false
        options: ["Tonina", "Ballena franca austral", "Franciscana", "Orca", "Varias", "Otra"]
      - name: "proyecto"
        label: "Proyecto asociado"
        widget: "select"
        required: false
        options: ["Proyecto Toninas", "Gephyreus", "Grupo de Trabajo en Varamientos", "Identidad Franca", "Ninguno"]
      - { name: "autoria_yaqu", label: "Con autoría de Yaqu Pacha", widget: "boolean", default: true }
      - { name: "acceso_abierto", label: "Acceso abierto", widget: "boolean", default: false }
      - { name: "resumen_es", label: "Resumen en español", widget: "text", required: false, hint: "Dos o tres líneas en lenguaje llano. No es el abstract traducido." }
```

Botón "Traer datos del DOI" junto al campo DOI. Si el widget personalizado
resulta complicado, alternativa: un script de terminal que reciba el DOI e
imprima el frontmatter. Los datos traídos siempre son editables antes de guardar.

Página `/investigacion/publicaciones`: agrupadas por año descendente, filtros por
especie, proyecto y autoría, DOI como enlace, etiqueta de acceso abierto, y el
`resumen_es` desplegable.

El campo DOI es opcional: tesis, informes técnicos y capítulos de libro no tienen.

Probar con `10.1016/j.biocon.2026.111865` — tiene 29 autores.

═══════════════════════════════════════════
BLOQUE 5 — Catálogo de individuos
═══════════════════════════════════════════

```yaml
  - name: "catalogo"
    label: "Catálogo de individuos"
    folder: "content/catalogo"
    create: true
    identifier_field: "nombre"
    slug: "{{codigo}}"
    fields:
      - { name: "codigo", label: "Código de catálogo", widget: "string", hint: "Ej: TT-014" }
      - { name: "nombre", label: "Nombre", widget: "string" }
      - name: "proyecto"
        label: "Proyecto"
        widget: "select"
        options: ["Proyecto Toninas", "Identidad Franca"]
        default: "Proyecto Toninas"
      - name: "especie"
        label: "Especie"
        widget: "select"
        options: ["Tonina", "Ballena franca austral"]
        default: "Tonina"
      - name: "fotos"
        label: "Fotos"
        widget: "list"
        fields:
          - { name: "src", label: "Foto", widget: "image", hint: "Máximo 800 px, con marca de agua." }
          - { name: "vista", label: "Qué se ve", widget: "string", hint: "Ej: aleta dorsal, lado izquierdo." }
      - { name: "descripcion", label: "Descripción", widget: "text", required: false }
      - { name: "primer_avistamiento", label: "Primer avistamiento", widget: "datetime", format: "YYYY-MM-DD", hint: "Fecha del primer registro del animal, no del alta en el catálogo." }
      - { name: "ultimo_avistamiento", label: "Último avistamiento", widget: "datetime", format: "YYYY-MM-DD", required: false }
      - name: "sexo"
        label: "Sexo"
        widget: "select"
        required: false
        options: ["Hembra", "Macho"]
        hint: "Vacío si no se conoce. No se muestra si está vacío."
      - { name: "muerto", label: "Registrado muerto", widget: "boolean", default: false, hint: "Marcar SOLO si se encontró el animal muerto. Dejar de verse no es evidencia de muerte." }
      - { name: "arcgis_id", label: "ID en la capa de ArcGIS", widget: "string", required: false }
      - { name: "libro", label: "Libro donde aparece", widget: "string", required: false, hint: "Slug del libro. Ej: muescagrande-la-tonina" }
      - { name: "publicado", label: "Visible en el sitio", widget: "boolean", default: true, hint: "Desmarcar mientras se confirma la identificación." }
```

**Criterio del campo `muerto`:** un individuo se considera vivo mientras no se lo
haya encontrado muerto. No usar estados intermedios.

La ficha de un individuo muerto **sigue publicada**. Se distingue con una etiqueta
"Registrado muerto", **no bajando la opacidad** — si el texto pierde contraste
deja de ser legible. **No mostrar causa de muerte.**

Ojo con la diferencia respecto de integrantes: ahí `activa: false` oculta;
acá `muerto: true` no oculta nada.

**El campo `ultimo_avistamiento` es provisorio.** Se actualiza para cada individuo
por temporada y editar 70 fichas a mano es inviable. Cuando exista el enlace con
la capa de ArcGIS, esta fecha debe salir del dato. Para carga masiva conviene
editar los archivos directamente; el panel edita los mismos archivos.

`arcgis_id` queda preparado aunque el mapa no exista: tenerlo desde ahora evita
migrar todas las fichas después.

Páginas: `/investigacion/[proyecto]/catalogo` (grilla) y
`/investigacion/[proyecto]/catalogo/[codigo]` (ficha, con `generateStaticParams`).
**El mismo componente parametrizado para los dos proyectos** — Identidad Franca
va a tener catálogo de callosidades y no debe requerir código nuevo.

Enlace cruzado con libros en los dos sentidos: Muescagrande, Puramuesca y Diagonal.

Fotos: máximo 800 px, WebP, con marca de agua. Originales en alta fuera del repo.
No implementar bloqueo de clic derecho ni capas encima: no funcionan y rompen
accesibilidad.

═══════════════════════════════════════════
BLOQUE 6 — Guía de identificación
═══════════════════════════════════════════

Ruta `/colabora/identificacion`, enlazada desde la página de reportar avistamiento
con el texto "No sé qué vi, ayudame a identificarlo".

**Va en la web, no en Telegram.** Alguien parado en la playa no va a instalar
Telegram y volver. Cada paso pierde gente.

Componente cliente con el árbol en `content/guia-identificacion.json`, separado
del código para poder corregirlo sin tocar componentes. Sin backend ni llamadas
externas: **tiene que funcionar con mala señal**.

**Primera pregunta, de contexto:** ¿desde la costa o desde una embarcación? Filtra
el árbol entero. Desde la costa solo se ofrecen las especies plausibles; si se
ofrecen las siete de delfín a alguien en la rambla, se generan reportes de delfín
de Fraser que son toninas.

**Segunda:** ¿viste soplidos o chorros? Separa misticetos de odontocetos sin
nombrar las categorías.

**"No sé" en todas las preguntas**, y nunca es callejón sin salida.

**Pantalla final,** con o sin identificación:
- Si identificó: nombre de la especie, silueta, y **enlace a `/especies/[especie]`
  si esa página existe**. Más el botón al formulario correspondiente.
- Si no identificó: "Reportalo igual con una foto. Un registro con foto sin
  identificar es más útil que uno identificado por error."

Botón "Reportar sin identificar" visible en **todas** las pantallas.

Cierre educativo desplegable, editable desde `content/paginas/identificacion.mdx`:
qué es un cetáceo, misticetos y odontocetos, y por qué el cachalote aparecía en la
rama del chorro.

**El árbol completo está en docs/guia-identificacion.md y requiere revisión
biológica antes de publicarse.** No publicar sin esa revisión.

Opcional, más adelante: el mismo árbol como bot de Telegram, para quienes ya
reportan por ahí — el grupo de ballena franca es de Telegram. Mismo contenido,
otro canal. No es parte de este bloque.

═══════════════════════════════════════════
BLOQUE 7 — Materiales educativos
═══════════════════════════════════════════

Agregar a la lista de materiales descargables:

**Ficha de la franciscana — Expo Tramas Infinitas.** Ficha elaborada por la
Dra. Julia Rouaux para la exposición itinerante "Tramas Infinitas".

Mantener el crédito visible en la página, no solo en el nombre del archivo.

═══════════════════════════════════════════
VERIFICACIÓN
═══════════════════════════════════════════

- [ ] Todas las colecciones aparecen en el panel
- [ ] Cada página lee su MDX, no el JSX
- [ ] Editar desde el panel genera commit y se ve el cambio
- [ ] Los enlaces de reporte siguen como constantes en código
- [ ] `/api/doi` devuelve bien los 29 autores del DOI de prueba
- [ ] Un DOI inexistente no rompe el formulario
- [ ] Se puede cargar una publicación sin DOI
- [ ] `muerto: true` muestra etiqueta y NO oculta la ficha
- [ ] El contraste se mantiene en fichas de individuos muertos
- [ ] `publicado: false` saca la ficha de la grilla y de las rutas
- [ ] Sexo vacío no muestra el campo
- [ ] El catálogo usa el mismo componente para los dos proyectos
- [ ] La guía funciona sin conexión después de cargada
- [ ] La guía enlaza a las páginas de especie que existen
- [ ] `npm run build` sin errores
- [ ] Lighthouse Accessibility > 95

═══════════════════════════════════════════
BLOQUE 8 — Verificar que la migración a MDX no perdió contenido
═══════════════════════════════════════════

Los bloques 1, 2 y 3 mueven texto que hoy está escrito en el JSX hacia archivos
MDX. **Es el punto donde más fácil se pierde contenido sin que nadie lo note**,
sobre todo en páginas largas como las de proyectos.

Un párrafo que desaparece no rompe el build ni da error: la página simplemente
queda más corta, y si nadie la conocía de memoria, nadie se entera.

## Verificación obligatoria, página por página

Para cada página migrada — la-ong, home-institucional, donaciones,
reportar-avistamiento, contacto, identificacion, las cuatro de especie, los
cuatro proyectos y la grilla de integrantes:

1. **Comparar contra la versión anterior del archivo en git**, no contra la
   memoria ni contra el render. Usar `git show <commit-anterior>:<ruta>` para
   ver el JSX original.
2. **Contar párrafos y encabezados** en el original y en el MDX. Tienen que
   coincidir.
3. **Verificar que sobrevivieron:** enlaces internos y externos, listas,
   negritas y cursivas, notas al pie, citas bibliográficas, y los nombres
   científicos que iban en cursiva.
4. **Revisar los atributos `alt`** de las imágenes: se pierden fácil al mover
   texto entre formatos.

## Elementos que no son texto plano

Varias páginas tienen componentes embebidos: grillas de logos institucionales,
siluetas, bloques de reporte, tablas. **Esos no se convierten a Markdown.**

Cuando una página los tenga, el MDX contiene el texto y el componente sigue
renderizando el resto alrededor. No intentar reemplazar un componente por su
equivalente en Markdown — se pierde funcionalidad y formato.

## Informe

Al terminar, listar explícitamente:

- Qué páginas se migraron
- Cuáles tenían componentes que quedaron fuera del MDX
- Cualquier diferencia encontrada entre el original y el resultado, aunque se
  haya corregido

Si alguna página no se pudo migrar limpiamente, decirlo en vez de dejarla a
medias.

## Checklist

- [ ] Cada página migrada comparada contra su versión en git
- [ ] Coincide la cantidad de párrafos y encabezados
- [ ] Enlaces, listas y formato conservados
- [ ] Nombres científicos siguen en cursiva
- [ ] Atributos `alt` de todas las imágenes conservados
- [ ] Los componentes embebidos siguen renderizando
- [ ] Informe entregado

═══════════════════════════════════════════
BLOQUE 9 — Yaqutienda
═══════════════════════════════════════════

Catálogo de artículos con carrito local. **Sin pasarela de pago:** el pedido se
arma en el sitio y se envía por WhatsApp con el detalle ya escrito.

## Colección en config.yml

```yaml
  - name: "tienda"
    label: "Yaqutienda"
    folder: "content/tienda"
    create: true
    identifier_field: "nombre"
    fields:
      - { name: "nombre", label: "Nombre del artículo", widget: "string" }
      - { name: "precio", label: "Precio", widget: "number", value_type: "int", hint: "En pesos uruguayos, sin puntos ni símbolo." }
      - name: "fotos"
        label: "Fotos"
        widget: "list"
        fields:
          - { name: "src", label: "Foto", widget: "image", hint: "Menos de 2 MB." }
          - { name: "alt", label: "Descripción de la foto", widget: "string" }
      - { name: "descripcion", label: "Descripción", widget: "text", required: false }
      - name: "categoria
        label: "Categoría"
        widget: "select"
        options: ["Libros", "Indumentaria", "Accesorios", "Otros"]
      - name: "variantes"
        label: "Variantes"
        widget: "list"
        required: false
        hint: "Talles, colores. Dejar vacío si el artículo no tiene variantes."
        field: { name: "opcion", label: "Opción", widget: "string" }
      - { name: "disponible", label: "Disponible", widget: "boolean", default: true, hint: "Desmarcado, sigue visible pero no se puede agregar al carrito." }
      - { name: "orden", label: "Orden", widget: "number", default: 0 }
```

Los libros son artículos de la tienda como cualquier otro. La ficha de
`/educacion/libros/[slug]` enlaza al artículo correspondiente.

## Carrito

- Estado en `localStorage`. Sin cuenta, sin login, sin backend.
- Contador de artículos visible en el navbar.
- Poder cambiar cantidades y eliminar del carrito.
- Un artículo con `disponible: false` se muestra en la grilla con la etiqueta
  "Sin stock" y el botón deshabilitado.

## Botón "Realizar pedido"

**No existe una URL del carrito para compartir:** el carrito vive en el navegador
de la persona. Lo que se comparte es el pedido escrito como texto.

Al apretar, se arma un mensaje de WhatsApp con el detalle:

```
Hola, quiero hacer este pedido de la Yaqutienda:

· Muescagrande la Tonina — 1 — $450
· Buzo Proyecto Toninas talle M — 2 — $1.800

Total: $2.250
```

Se genera con `https://wa.me/NUMERO?text=` y el texto codificado con
`encodeURIComponent`.

**Instagram no admite mensajes precargados.** Su enlace directo abre la
conversación vacía. Ofrecerlo como alternativa secundaria, con el pedido visible
en pantalla para que la persona lo copie.

**Antes de abrir WhatsApp, mostrar el resumen del pedido en el sitio.** Si el
mensaje se trunca o la persona cancela, tiene el detalle a la vista para copiarlo.

Número de WhatsApp: **pendiente**, va como constante en código, no editable desde
el panel.

## Aclaración imprescindible

Con destaque visual, no como texto al pie:

> Este pedido **no es una compra confirmada**. Vamos a responderte para coordinar
> la entrega y la forma de pago.

Nadie debe creer que compró.

## Página

`/tienda` — grilla de artículos con foto, nombre y precio. Filtro por categoría.

Precios en pesos uruguayos, formateados con separador de miles.

## Verificación

- [ ] Agregar y quitar del carrito funciona y persiste al recargar
- [ ] El contador del navbar refleja el carrito
- [ ] Un artículo sin stock no se puede agregar
- [ ] El mensaje de WhatsApp llega con el pedido completo y legible
- [ ] Los caracteres especiales y saltos de línea se codifican bien
- [ ] El resumen se ve en el sitio antes de abrir WhatsApp
- [ ] La aclaración de que no es una compra está visible
- [ ] El total calcula bien con variantes y cantidades
- [ ] `npm run build` sin errores
