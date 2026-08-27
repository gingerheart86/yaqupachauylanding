# Correcciones encontradas en la revisión local

## 1. Publicaciones: quitar filtro de autoría

Sacar el filtro "Autoría de Yaqu Pacha" de `/investigacion/publicaciones`.
**Mantener el campo `autoria_yaqu` en el schema** — sirve para destacar visualmente
esas entradas, solo se quita el filtro de la interfaz.

## 2. Carrusel de imágenes prolijo

Componente `<Carrusel>` reutilizable, embebible en MDX, para reemplazar el actual
de Proyecto Toninas.

Requisitos:
- Altura fija, `object-fit: cover`. Que no salte el layout al cambiar de imagen.
- Navegación con flechas y con teclado (izquierda/derecha).
- Indicadores de posición.
- Deslizable en mobile.
- Epígrafe y crédito por imagen.
- `alt` obligatorio en cada una.
- Carga diferida de las que no están visibles.
- Sin autoplay.
- Si hay una sola imagen, renderiza como `<Foto>` sin controles.

Uso: `<Carrusel imagenes={[...]} />` o con hijos `<Foto>`.

## 3. Libros en grilla

`/educacion/libros`:
- Párrafo introductorio arriba, editable desde el panel — campo `intro` en
  `content/paginas/libros.mdx`.
- Grilla de 5 columnas en desktop: tapa, título y descripción corta.
- Responsive: 5 → 3 → 2 → 1 según ancho.
- Tapas en proporción fija; que una tapa faltante no rompa la grilla.
- Cada tarjeta enlaza a la ficha del libro.

## 4. Prensa y divulgación

Rehacer `/educacion/prensa` con el mismo criterio que publicaciones:
- Agrupado por año, del más reciente al más viejo.
- **Miniaturas en vez de links pelados.** Cada entrada con imagen, título, medio
  y fecha.
- Si una entrada no tiene imagen, una miniatura genérica según el tipo — nota,
  video, radio — no un hueco.
- Filtro por año y por tipo de medio.

Colección en el panel:

```yaml
  - name: "prensa"
    label: "Prensa y divulgación"
    folder: "content/prensa"
    create: true
    identifier_field: "titulo"
    fields:
      - { name: "titulo", label: "Título", widget: "string" }
      - { name: "medio", label: "Medio", widget: "string", hint: "Ej: la diaria, Canal 5, Radio Uruguay." }
      - { name: "fecha", label: "Fecha", widget: "datetime", format: "YYYY-MM-DD" }
      - name: "tipo"
        label: "Tipo"
        widget: "select"
        options: ["Nota", "Video", "Radio", "Podcast", "Otro"]
      - { name: "url", label: "Enlace", widget: "string" }
      - { name: "miniatura", label: "Miniatura", widget: "image", required: false }
      - { name: "alt", label: "Descripción de la miniatura", widget: "string", required: false }
      - { name: "resumen", label: "Resumen", widget: "text", required: false }
```

## 5. Dónde vive el catálogo

**El catálogo NO cuelga de especies.** La ruta canónica es
`/investigacion/[proyecto]/catalogo`, porque es un producto de un proyecto:
Proyecto Toninas tiene el de aletas, Identidad Franca va a tener el de
callosidades. Una especie puede no tener catálogo, y un proyecto puede abarcar
varias especies.

**Lo que falta es el descubrimiento.** Agregar en `/especies/tonina` un bloque
destacado — no un link al pie — que lleve a `/investigacion/toninas/catalogo`.
Mismo criterio para ballena franca cuando exista su catálogo.

Verificar que el catálogo esté enlazado desde: la página de especie, la página
del proyecto, y la ficha de los libros cuyos protagonistas son individuos reales.

## 6. Formulario de voluntariado

Reconstruir como formulario propio, no embeber el de Google: un iframe de Google
Forms carga scripts de terceros, no respeta el diseño del sitio y rompe la
coherencia visual.

**Los campos del formulario están pendientes** — el equipo los va a proveer a
partir del formulario actual (`https://forms.gle/NT2VNtnA7VurywrB7`). No inventar
campos.

Cuando estén: formulario nativo que envía por mail, con las mismas validaciones y
un aviso de qué se hace con los datos.

Mientras tanto, dejar la ruta creada con un enlace al formulario de Google.

## 7. Mapa de avistamientos y botones de acción

### El mapa

Página `/avistamientos` con el web map de ArcGIS: respuestas del formulario de
ciencia ciudadana más los avistamientos propios.

- `loading="lazy"` en el iframe. El visor de ArcGIS pesa varios MB.
- Nunca embebido en la portada: en su página propia.
- Fallback visible si no carga, no un rectángulo en blanco.
- Dos líneas explicando qué se está viendo y cómo reportar.

**Antes de publicar: verificar que la capa pública no exponga celular ni correo
de quien reporta.** El Survey123 los pide.

### Botones de la barra superior

Tres, no cuatro. Con cuatro llamados a la acción se anulan entre sí:

| Botón | Destino | Tono |
|---|---|---|
| Reportar un avistamiento | `/colabora/reportar-avistamiento` | `marca` (cian) |
| Reportar un varamiento | `https://wa.me/59898490889` | alerta |
| Mapa de avistamientos | `/avistamientos` | neutro |

**Sumate como voluntaria** va en el menú principal, dentro de Colaborá. No es una
urgencia como los reportes ni una consulta frecuente como el mapa: es una decisión
que alguien toma después de leer sobre la organización.

### Portada

Reemplazar la tarjeta de "sumate como voluntaria" por **"Accedé al mapa de
avistamientos"**, con imagen de fondo.

## Verificación

- [ ] El filtro de autoría ya no aparece, el campo sigue en el schema
- [ ] El carrusel no salta al cambiar de imagen y anda con teclado
- [ ] La grilla de libros responde bien de 5 a 1 columna
- [ ] Prensa agrupa por año y muestra miniaturas
- [ ] Una entrada de prensa sin imagen no deja un hueco
- [ ] El catálogo sigue bajo `/investigacion/[proyecto]/catalogo`
- [ ] Hay un bloque destacado hacia el catálogo en `/especies/tonina`
- [ ] La barra superior tiene tres botones, no cuatro
- [ ] El voluntariado quedó en Colaborá
- [ ] El mapa carga diferido y tiene fallback
- [ ] `npm run build` sin errores
