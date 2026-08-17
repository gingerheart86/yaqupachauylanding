# Fase 3 — Arquitectura, contenido y features

Repo: `gingerheart86/yaqupachauylanding` · Requiere fases 1 y 2 completas.

Reemplaza al documento `fases2y3-contenido-y-features.md`, cuya arquitectura estaba mal: asumía que el sitio giraba en torno a las toninas y trataba al catálogo como sección de primer nivel.

---

## 1. El principio de la arquitectura

Yaqu Pacha Uruguay trabaja con **cuatro especies** y **cuatro proyectos**. Proyecto Toninas es el más importante, pero no es el único, y la estructura no puede asumir que lo sea.

La regla que ordena todo:

> **La estructura trata a todos los proyectos igual. La jerarquía se expresa en el peso visual, no en las rutas.**

Todos los proyectos tienen la misma profundidad de URL y usan el mismo componente. Que Proyecto Toninas sea el principal se comunica en la portada y en el orden y tamaño dentro de `/proyectos` — nunca dándole una ruta privilegiada. Así entra el quinto proyecto sin rehacer nada.

### Especies y proyectos son ejes distintos

| | Habla de | Público | Rol |
|---|---|---|---|
| `/especies/[especie]` | el animal | general | entrada por buscadores |
| `/proyectos/[proyecto]` | el trabajo | institucional, científico | qué hacemos y con quién |

No se mapean 1 a 1: la Red Nacional de Varamientos abarca las cuatro especies, Gephyreus es regional, y la franciscana no tiene proyecto propio. **Mantener esa línea es la disciplina central de esta fase** — si la página de especie empieza a contar la historia del proyecto, las dos se vuelven redundantes.

### Mapa

| Eje | Rutas |
|---|---|
| Especies | `/especies` + tonina, ballena-franca, franciscana, orca |
| Proyectos | `/proyectos` + toninas, gephyreus, varamientos, identidad-franca |
| Transversal | `/avistamientos`, `/publicaciones`, `/nosotras`, `/contacto`, `/noticias` |
| Transaccional | `/tienda`, `/donaciones` |
| Bajo Toninas | catálogo de aletas, biblioteca de sonidos, libros |
| Bajo Identidad Franca | catálogo de callosidades, biblioteca de sonidos |

**Navegación principal:** Especies · Proyectos · Avistamientos · Libros · Tienda · Nosotras

> **Nota (ver `fase3-navegacion-portada.md`):** este mapa de rutas y este menú quedaron reemplazados por la nueva estructura de navegación por función (Nosotros / Especies / Investigación / Educación ambiental / Colaborá / YaquTienda). El resto de este documento — catálogos, sonidos, mapa, libros, tienda, donaciones, noticias, bilingüe, criterios de imágenes — sigue vigente.

Catálogos y sonidos **no van en el menú**. Se llegan desde la página del proyecto y desde la de la especie. Ponerlos arriba le daría a un producto de un proyecto el mismo peso que a los ejes.

---

## 2. Catálogos de individuos

**El patrón se repite.** Proyecto Toninas e Identidad Franca producen cada uno un catálogo. Construirlo parametrizado por proyecto cuesta casi lo mismo que hacerlo a medida y evita rehacerlo entero la segunda vez.

Rutas: `/proyectos/[proyecto]/catalogo` y `/proyectos/[proyecto]/catalogo/[codigo]`, generadas con `generateStaticParams`.

**El método de identificación cambia según la especie** y esto es lo que rompe un diseño ingenuo: las toninas se identifican por las muescas del borde de la aleta dorsal; las ballenas francas, por el patrón de callosidades de la cabeza. El componente no puede asumir "foto de aleta".

```json
{
  "codigo": "TT-014",
  "nombre": "Muescagrande",
  "especie": "tonina",
  "proyecto": "toninas",
  "fotos": [
    { "src": "/catalogo/toninas/tt-014-izq.webp", "vista": "aleta dorsal, lado izquierdo" }
  ],
  "primerAvistamiento": "2007-03-18",
  "sexo": "hembra",
  "estado": "vivo",
  "libro": "muescagrande-la-tonina"
}
```

- Un JSON por proyecto: `content/catalogos/toninas.json`, `content/catalogos/identidad-franca.json`.
- `codigo`, `nombre`, `especie`, `proyecto`, `fotos` y `primerAvistamiento`: obligatorios.
- `sexo` y `estado`: opcionales. Si faltan, la ficha no muestra el campo — nunca "desconocido".
- `fotos` es array de objetos con `vista` descriptiva, que además sirve de `alt`.
- `primerAvistamiento` es la fecha del primer avistamiento del animal, no la de alta en el catálogo.
- `libro` solo en Muescagrande, Puramuesca y Diagonal.

**Fotos:** máximo 800 px de lado largo, WebP, con marca de agua. Originales en alta fuera del repo. No implementar bloqueo de clic derecho ni overlays: no funcionan, molestan y rompen accesibilidad.

**Enlace cruzado con los libros:** la ficha de los tres individuos que son personajes enlaza al libro, y el libro a la ficha. Es lo más distintivo que va a tener el sitio y no lo tiene nadie más.

---

## 3. Sonidos

Mismo patrón, mismo componente parametrizado: `/proyectos/[proyecto]/sonidos`.

**Decidido: YouTube.** No es una biblioteca extensa sino un puñado de sonidos demostrativos — un silbido, un tren de clics, ejemplos de vocalización. Para ese volumen, YouTube resuelve alojamiento y ancho de banda sin costo ni infraestructura.

- Un JSON por proyecto: `content/sonidos/toninas.json`, con `titulo`, `descripcion`, `youtubeId` y `fuente`.
- El campo `fuente` existe desde el primer día aunque hoy siempre valga `"youtube"`. Si algún día hay archivos propios, se migra cambiando el JSON, no reescribiendo el componente.
- **Carga diferida obligatoria.** El embed de YouTube pesa más de 1 MB. Mostrar una miniatura estática y cargar el iframe recién al hacer clic. Nunca varios iframes cargando a la vez.
- Cada sonido con su explicación: qué vocalización es, en qué contexto se registró.

---

## 4. Mapa de avistamientos

`/avistamientos`, transversal a todas las especies.

**Contenido:** reportes del formulario Survey123, avistamientos históricos, y registros en tiempo real durante salidas.

**Decidido:**
- Coordenadas exactas.
- El sitio consume una **capa pública separada** de la capa de trabajo interna, aunque al principio muestren lo mismo. Si alguna vez hay que restringir precisión, se ajusta esa capa y el sitio no se toca.
- Página propia, nunca embebido en portada.
- `loading="lazy"` en el iframe. El visor de ArcGIS carga varios MB y en la portada arruinaría el rendimiento ganado en fase 1.

**Antes de publicar:** el Survey123 pide celular y correo del reportante. **Esos campos no pueden estar en la capa pública bajo ninguna circunstancia.** Verificar el compartido en ArcGIS Online antes, no después.

También: fallback claro si ArcGIS no carga, y explicación en dos líneas de qué se está viendo y cómo reportar.

La Red Nacional de Varamientos puede necesitar su propio canal de aviso. Si se implementa, va enlazado desde `/proyectos/varamientos` y desde acá.

---

## 5. Páginas de especie

Cuatro: tonina, ballena franca, franciscana, orca. Estructura común:

Qué especie es · dónde y cuándo se la ve en Uruguay · qué se sabe de ella acá · qué proyectos la estudian · qué hacer si la ves.

**El nombre común completo de la tonina es "tonina o delfín nariz de botella de Lahille"** (*Tursiops truncatus gephyreus*). Los textos SEO de la fase 1 decían "el delfín costero de Uruguay", que con cuatro especies implica una exclusividad que no corresponde — corregir.

**Oportunidad estacional:** la ballena franca austral pasa por la costa uruguaya aproximadamente entre julio y noviembre y el interés de búsqueda se dispara. Publicar esa página **antes** de que arranque la temporada.

`/especies` pasa de página única a índice de cuatro fichas. La URL actual tiene que seguir funcionando: es la que más tráfico va a recibir.

Falta definir el material de origen de ballena franca, franciscana y orca.

---

## 6. Libros

Cinco títulos, vinculados a Proyecto Toninas: *Clara conoce a Muescagrande*, *Muescagrande la Tonina*, *El Sonido de las Toninas*, *Clara y el Catalejo*, y *La Expedición* (sin salir).

Rutas `/libros` y `/libros/[slug]`, enlazadas desde `/proyectos/toninas`.

Cada ficha: tapa, sinopsis, edad recomendada, créditos y enlace a la ficha del catálogo cuando el protagonista es un individuo real.

**Créditos obligatorios:** guion de Silvia Soler, ilustraciones de Yez, editorial Krakatoa.

Los libros se venden a través de la tienda (sección 7), ya que las autoras venden directamente.

---

## 7. Yaqutienda

**Sin pasarela de pago.** Catálogo de artículos, carrito local, y un pedido que llega por mail para aprobar y coordinar cobro por fuera.

- `/tienda` — grilla de artículos desde `content/tienda.json`: nombre, descripción, precio, fotos, stock disponible o no.
- Carrito en `localStorage`. No requiere cuenta ni login.
- Al confirmar: formulario con nombre, contacto y comentario, que envía el pedido por mail. Vale un Route Handler de Next con un servicio de mail, o un servicio de formularios externo.
- Mensaje explícito de que el pedido **queda sujeto a confirmación** y que el pago se coordina después. Que nadie crea que compró.
- Los libros son artículos de la tienda como cualquier otro.

Sin stock en tiempo real ni reservas: si algo se agota, se edita el JSON.

Chequear si corresponde algún aviso de datos personales por el formulario.

---

## 8. Donaciones

`/donaciones`, página estática con los datos de las cuentas bancarias y el enlace de PayPal, más una explicación de a qué se destinan los fondos.

**Publicar números de cuenta en una web tiene un riesgo concreto:** es un blanco clásico de suplantación — alguien clona la página con otros números. Mitigaciones baratas: que los datos estén solo en esta página del dominio oficial, y que las redes sociales remitan siempre acá en vez de repetir los números.

Conviene chequear qué corresponde declarar en Uruguay para una ONG que recibe donaciones por estos canales.

---

## 9. Noticias

MDX en `content/noticias/*.mdx` con frontmatter de título, fecha, resumen e imagen. Rutas `/noticias` y `/noticias/[slug]`.

Solo tiene sentido si se alimenta. Tres entradas abandonadas hace dos años dan peor impresión que no tener la sección.

---

## 10. Orden sugerido

Cada bloque es entregable por separado. No hacer todo de una.

1. Reestructura de rutas: ruteo bilingüe `/es` y `/en`, `/especies` a índice, cuatro proyectos, redirecciones. **El bilingüe va acá o no va** — sumarlo después obliga a rehacer el ruteo.
2. Enlace al formulario de avistamientos en portada, especies y contacto. Es lo más barato y de mayor impacto de toda la fase.
3. Páginas de especie y de proyecto con el contenido que ya existe.
4. Catálogo parametrizado, con toninas como primer caso.
5. Libros.
6. Mapa de avistamientos.
7. Tienda y donaciones.
8. Sonidos.
9. Noticias, si hay compromiso de publicar.

---

## 11. Bilingüe selectivo

**Decidido: español e inglés, con traducción asistida y glosario.** El ruteo se implementa en el bloque 1, antes de sumar páginas — hacerlo después obliga a rehacer todo.

### Qué se traduce y qué no

El costo real no es técnico, es de mantenimiento: cada página en dos idiomas es trabajo permanente del equipo. Un sitio bilingüe a medias, con la mitad en inglés desactualizada, se ve peor que uno solo en español. Por eso se traduce solo lo que tiene público internacional:

| En los dos idiomas | Solo en español |
|---|---|
| Especies | Libros infantiles |
| Proyectos | Tienda |
| Publicaciones | Donaciones |
| Nosotras | Noticias |
| Catálogos | |

Las secciones que no se traducen simplemente no aparecen en el menú de la versión en inglés. No dejar páginas en inglés que muestren contenido en español.

### Implementación

- Rutas `/es/...` y `/en/...` con el i18n routing de App Router y `generateStaticParams` por idioma.
- Textos en `content/i18n/{es,en}.json`, no incrustados en los componentes.
- `hreflang` recíproco entre las dos versiones de cada página. Sin esto, Google puede penalizar por contenido duplicado.
- `sitemap.js` incluye ambos idiomas.
- El selector de idioma va en el navbar, visible.
- Los metadatos de SEO también se traducen: los títulos y descripciones de la fase 1 son solo la versión en español.

### Traducción

Traducción automática como primer borrador, **revisada por el equipo** y guardada como archivos reales. No usar widgets de traducción en vivo en el navegador: no se indexan, así que no aportan nada al SEO, y los navegadores ya ofrecen esa función.

**Fijar el glosario antes de traducir nada.** Sin él, los mismos términos se corrigen veinte veces:

| Español | Inglés |
|---|---|
| tonina / delfín nariz de botella de Lahille | Lahille's bottlenose dolphin |
| ballena franca austral | southern right whale |
| franciscana | franciscana / La Plata dolphin |
| orca | orca / killer whale |
| avistamiento | sighting |
| varamiento | stranding |
| aleta dorsal | dorsal fin |
| callosidades | callosities |
| catálogo de individuos | photo-identification catalogue |
| marca / muesca | notch |
| ciencia ciudadana | citizen science |

Ampliar a medida que aparezcan términos nuevos. Los nombres científicos van en cursiva y no se traducen.

Los nombres propios tampoco: Proyecto Toninas, Identidad Franca, Red Nacional de Varamientos y Yaqutienda se mantienen en español en ambas versiones, con una aclaración entre paréntesis la primera vez que aparecen en inglés.

---

## Criterios de imágenes

| Uso | Ancho máximo | Formato |
|---|---|---|
| Hero / fondo | 2400 px | WebP |
| Contenido | 1600 px | WebP |
| Catálogos | 800 px | WebP + marca de agua |
| Tapas de libros y artículos | 1000 px | WebP |

```bash
npx sharp-cli --input "originales/*.jpg" --output "public/procesadas" resize 1600 --withoutEnlargement -f webp -q 82
```

Toda imagen nueva necesita `alt` descriptivo.

---

## Pendientes

1. Material de origen de ballena franca, franciscana y orca. **Franciscana parcialmente resuelto:** hay fotos y un documento de "incorporaciones" para esa especie — ver la carpeta de assets compartida por la organización.
2. Método de identificación de franciscana y orca, si llegan a tener catálogo.
3. Canal de aviso de varamientos: ¿formulario propio o el mismo de avistamientos? — **Resuelto en `fase3-navegacion-portada.md`:** WhatsApp a `+598 98 490 889`.
4. Permiso escrito de Yez para usar sus ilustraciones más allá de las tapas, y cómo se la acredita.
5. Quién revisa las traducciones al inglés y con qué frecuencia se sincronizan las dos versiones.
