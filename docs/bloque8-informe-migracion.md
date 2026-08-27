# Bloque 8 — Informe de verificación de la migración a MDX

Verificación de los Bloques 1, 2 y 3 (docs/panel-completo.md) contra la versión en
JSX anterior a la migración, commit `ec63769` (el commit justo antes de "Bloque 1:
páginas únicas editables desde el panel", en la rama `panel-edicion`).

## Páginas migradas

| Página | Origen | Párrafos/encabezados original → MDX | Resultado |
|---|---|---|---|
| `la-ong.mdx` | `nosotros/ong` | ES 2p/0h → 2p/0h · EN 2p/0h → 2p/0h | Coincide exacto |
| `reportar-avistamiento.mdx` | `colabora/reportar-avistamiento` | Solo el párrafo descriptivo y la aclaración de varamiento se migraron | Parcial, a propósito (ver más abajo) |
| `contacto.mdx` | `colabora/contacto` | Dirección y correo | Migrados como campos, no como body |
| `especies/tonina.mdx` | `especies/tonina` | ES 3p/1h → 3p/1h · EN 3p/1h → 3p/1h | Coincide exacto |
| `especies/franciscana.mdx` | `especies/franciscana` | ES: 14p + 3 figuras + 1 par de fotos (18 elementos) → 17 bloques (el par se unificó en un solo `<ParFotos>`) | Coincide, ver nota |
| `proyectos/toninas.mdx` | `investigacion/toninas` | 1p + 1 figura → 1 párrafo + 1 `<Foto>` | Coincide |
| `proyectos/gephyreus.mdx` | `investigacion/gephyreus` | 1p + 1 figura par + 1 iframe → 1 párrafo + 1 `<ParFotos>` + 1 `<VideoYoutube>` | Coincide |
| `proyectos/varamientos.mdx` | `investigacion/varamientos` | ES 8p + 4 figuras → 12 bloques | Coincide |
| Integrantes (3 fichas) | array fijo en `nosotros/integrantes/page.js` | Reseña bilingüe + redes por persona | Coincide, campos extendidos (ver Bloque 2) |

**No son migraciones** (no existía contenido previo, se creó de cero o se dejó
como placeholder honesto): `home-institucional.mdx` (sección nunca construida,
semilla tomada de `nosotros/ong`), `donaciones.mdx`, `identificacion.mdx`.

## Componentes que quedaron fuera del MDX (embebidos en el JSX)

- **`VideoInstitucional`** (la-ong, portada) — componente con estado (play/poster), no tiene sentido como markdown.
- **`logo_sinf.png`** (la-ong) — logo institucional fijo.
- **`Gallery`** (`investigacion/toninas`) — galería de fotos hardcodeada (`components/imagegallery.js`), con imágenes propias no ligadas al contenido editable. No se tocó.
- **`Garabato`** decorativo (`investigacion/toninas`) — puramente visual.
- **`BloqueReporte`** (`investigacion/varamientos`) — se queda como JSX después de la `<Section>`, no dentro de la prosa migrada, porque no es texto sino un bloque de llamada a la acción con sus propias constantes.
- **Primer párrafo en negrita + enlace con teléfono** de `reportar-avistamiento` — ligado a `lib/contacto.js` (el `TELEFONO_VARAMIENTOS` se centraliza ahí, no en el MDX).
- **Íconos `MapPinIcon`/`EnvelopeIcon`** de `contacto` — la dirección y el correo pasaron a campos de frontmatter (`direccion`, `email`) en vez de a un body markdown, para no perder el layout de ícono + texto por línea.
- **Logo del proyecto Toninas** (`/logo-toninas.png`) y encabezado — hero fijo de la página, no contenido.

## Diferencias encontradas entre el original y el resultado

1. **`content/proyectos/toninas.mdx`**: el original tenía una frase con un error
   gramatical — "...y del Convenio sobre Diversidad Biológica (CDB)este
   proyecto." Se corrigió agregando la palabra faltante: "(CDB) de este
   proyecto." Es una corrección, no una reescritura de contenido.
2. **`content/paginas/la-ong.mdx`**: en un primer intento de escritura, el
   párrafo en inglés quedó incompleto (solo el segundo párrafo, faltaba el
   primero). Se detectó al releer el archivo antes de hacer commit, y se
   corrigió — nunca llegó a estar en un commit incompleto.
3. **`especies/franciscana.mdx`**: el par de fotos de La Esmeralda tenía en el
   original un epígrafe compartido como párrafo separado después de la grilla
   de imágenes. En el MDX ese epígrafe se convirtió en la prop `leyenda` de
   `<ParFotos>` en vez de un párrafo de texto plano aparte — mismo contenido
   visible, estructura distinta.
4. **`investigacion/publicaciones`** (Bloque 4, no Bloque 1-3 pero relacionado):
   se sacaron las frases sueltas "Peer-reviewed journal." / "Revista
   arbitrada." que estaban parametrizadas por idioma en la lista vieja — el
   nuevo schema de publicaciones no tiene ese campo. No es pérdida de datos
   bibliográficos, sí una pequeña simplificación de redacción.

## Páginas con contenido pendiente, no migradas a medias

- **`/colabora/identificacion`**: la guía interactiva está construida y
  probada (Bloque 6), pero **no se activó** en producción — sigue mostrando
  el aviso de contenido pendiente. `content/guia-identificacion.json` es un
  placeholder sin revisión biológica; activar la guía es cambiar dos líneas
  en `page.js` una vez que el árbol real esté cargado y revisado.
- **`/colabora/donaciones`**: schema listo (`content/paginas/donaciones.mdx`),
  sin contenido real — nunca existió texto que migrar.

## Verificación de alt, enlaces, listas, cursivas y citas

- Nombres científicos en cursiva (`*Tursiops truncatus gephyreus*`,
  `*Pontoporia blainvillei*`, etc.) se preservaron en los 5 archivos que los
  tenían, verificado visualmente en las capturas de cada Bloque.
- Enlaces externos (`yaqupacha.de/es/proyecto-la-plata-delfin`) se preservaron
  como markdown `[texto](url)` en `varamientos.mdx`.
- Todas las imágenes migradas a `<Foto>` tienen `alt` no vacío — el
  componente muestra un aviso visible si falta, verificado que ninguna lo
  dispara hoy.
- No había notas al pie en ninguna de las páginas migradas.

## Checklist

- [x] Cada página migrada comparada contra su versión en git (`ec63769`)
- [x] Coincide la cantidad de párrafos y encabezados (con las dos diferencias
      documentadas arriba, ambas intencionales y explicadas)
- [x] Enlaces, listas y formato conservados
- [x] Nombres científicos siguen en cursiva
- [x] Atributos `alt` de todas las imágenes conservados (y con aviso si faltan)
- [x] Los componentes embebidos siguen renderizando
- [x] Informe entregado
