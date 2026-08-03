# Fases 2 y 3 — Sistema visual, contenido y features

Repo: `gingerheart86/yaqupachauylanding` · Sitio: yaqupachauy.org

Documento de decisiones y planificación. **No es un brief ejecutable todavía** — la fase 2 depende de assets que aún no están y la fase 3 tiene preguntas abiertas marcadas al final. La fase 1 (`fase1-migracion-next15.md`) sí se puede ejecutar sin esperar nada de acá.

---

## Estado de decisiones

| Tema | Estado | Definición |
|---|---|---|
| Framework | ✅ decidido | Next 15 + App Router (fase 1) |
| Tailwind 4 | ⏸️ a evaluar | Se decide al empezar fase 2 |
| Orientación SEO | ✅ decidido | Toninas / delfines / Uruguay, público general |
| Noticias | ✅ decidido | MDX en el repo |
| Catálogo de individuos | ✅ decidido | JSON estático en el repo |
| Esquema del catálogo | ✅ decidido | Ver 3.1 |
| Protección de fotos | ✅ decidido | Marca de agua + resolución limitada. No bloquear descarga |
| Coordenadas del mapa | ✅ decidido | Exactas, en capa pública separada de la interna |
| Ubicación del mapa | ✅ decidido | Página propia, lazy load, no embebido en portada |
| Estética del rediseño | ⏳ pendiente | Depende de los assets de la ilustradora |
| Páginas ballena franca y orca | ⏳ pendiente | Falta definir material de origen |
| Sección de libros | ⏳ pendiente | Ver preguntas abiertas |

---

# FASE 2 — Sistema visual

**Bloqueada por:** assets de la ilustradora, o al menos las tapas de los cuatro libros publicados más un par de referencias de estilo.

**Objetivo:** que el sitio deje de verse como una plantilla de Tailwind y tenga identidad propia, derivada del trabajo de la ilustradora de los libros infantiles.

## 2.1 Punto de partida cromático

De los logos institucionales salieron estos valores:

| Color | Hex |
|---|---|
| Turquesa | `#00CCB1` |
| Azul marino | `#17357E` |
| Teal | `#308298` |
| Gris oscuro | `#1A1A1A` |

Fueron extraídos de los archivos de logo, no de un manual de marca. Si Yaqu Pacha e.V. tiene manual, esos valores mandan y hay que pedirlo. Si no lo hay, estos sirven de base.

Falta cruzarlos con la paleta de la ilustradora. Lo probable es que su trabajo tenga colores más cálidos o más saturados que el azul institucional, y ahí hay que decidir conscientemente: o la ilustración manda y el azul queda como acento, o al revés. Esa decisión define todo el resto y no se puede tomar sin ver su trabajo.

## 2.2 Lo que hay que producir en fase 2

- Paleta completa en `tailwind.config.js` con nombres semánticos, no `cyan-600` sueltos por el código.
- Tipografía: una display con carácter y una de texto. Hoy es la fuente del sistema, que es la ausencia de decisión.
- Componentes base reutilizables: sección, tarjeta, botón, encabezado de página. Hoy cada página repite las mismas clases a mano y por eso el sitio se ve inconsistente entre secciones.
- Tratamiento del hero de portada. Hoy es una foto con texto en gradiente encima, que es la solución más genérica posible.
- Estados de foco visibles para navegación con teclado.
- Decisión sobre Tailwind 4.

## 2.3 Restricción a respetar

El sitio es de una organización científica. La ilustración infantil aporta calidez y es un diferencial enorme, pero no puede hacer que `/publicaciones` o `/especies` pierdan seriedad. La regla práctica: la ilustración manda en portada, libros y educación; en las páginas científicas aparece apenas como acento.

---

# FASE 3 — Contenido y features

Dos de estos son features con datos, no páginas de texto. Son el trabajo pesado.

## 3.1 Catálogo de individuos identificados

**Fuente de datos:** JSON estático en el repo. Menos de 100 individuos, actualizado una o dos veces al año después de procesar la temporada. Sin base de datos.

**Esquema:**

```json
{
  "catalogo": "TT-014",
  "nombre": "Muescagrande",
  "fotos": ["/catalogo/tt-014-izq.webp", "/catalogo/tt-014-der.webp"],
  "primerAvistamiento": "2007-03-18",
  "sexo": "hembra",
  "estado": "vivo",
  "libro": "muescagrande-la-tonina"
}
```

- `catalogo`, `nombre`, `fotos` y `primerAvistamiento`: obligatorios.
- `sexo` y `estado`: opcionales. Si faltan, la ficha no muestra el campo — nunca mostrar "desconocido" ni dejar la etiqueta vacía.
- `fotos` es array aunque hoy haya una sola foto por individuo. Es la única decisión del esquema cara de revertir.
- `libro`: solo en Muescagrande, Puramuesca y Diagonal.
- `primerAvistamiento` es la fecha del primer avistamiento del animal, no la de alta en el catálogo. La etiqueta en pantalla debe decirlo así.

**Rutas:**
- `/catalogo` — grilla de todos los individuos, ordenada por código.
- `/catalogo/[catalogo]` — ficha individual, generada estática con `generateStaticParams`.

**Fotos:** máximo 800 px de lado largo, WebP, con marca de agua. Los originales en alta se guardan fuera del repo. No implementar bloqueo de clic derecho ni overlays: no funcionan, molestan y rompen accesibilidad.

**Enlace cruzado con los libros:** la ficha de los tres individuos que son personajes enlaza a la página del libro, y la página del libro enlaza de vuelta a la ficha. Es el puente entre la parte científica y la de divulgación, y es lo más distintivo que va a tener el sitio.

## 3.2 Mapa de avistamientos en vivo

**Contenido:** reportes del formulario Survey123 de ciencia ciudadana, avistamientos históricos del proyecto, y registros en tiempo real durante las salidas de campo.

**Decisiones tomadas:**
- Coordenadas exactas.
- La capa que consume el sitio es una **capa pública separada** de la capa de trabajo interna. Aunque al principio muestren lo mismo. Si en algún momento hay que restringir precisión, se ajusta esa capa sola y el sitio no se toca.
- Página propia (`/avistamientos`), nunca embebido en la portada.
- `loading="lazy"` en el iframe. El visor de ArcGIS carga varios MB de JavaScript y en la portada arruinaría el rendimiento que se ganó en la fase 1.

**A resolver al implementar:**
- Qué campos del formulario son públicos. El Survey123 pide celular y correo del reportante: **esos campos no pueden estar en la capa pública bajo ninguna circunstancia.** Verificar el compartido en ArcGIS Online antes de publicar, no después.
- Consumo de créditos de ArcGIS Online si el mapa recibe tráfico real.
- Fallback si ArcGIS no carga: un mensaje claro, no un iframe en blanco.
- La página debe explicar en dos líneas qué se está viendo y cómo reportar, con link al formulario.

## 3.3 Páginas de ballena franca austral y orca

Hay investigación propia sobre ambas y las páginas cumplen además función de divulgación.

**Oportunidad estacional:** la ballena franca austral pasa por la costa uruguaya aproximadamente entre julio y noviembre, y el interés de búsqueda se dispara en esos meses. Conviene que la página esté publicada **antes** de que arranque la temporada, no durante.

**Estructura sugerida, espejo de `/especies`:** qué especie es, dónde y cuándo se la ve en Uruguay, qué se sabe de ella acá, qué investiga Yaqu Pacha, qué hacer si la ves.

**Pendiente:** definir el material de origen. Si hay publicaciones o informes, las páginas se redactan a partir de eso. Si hay que escribirlas desde cero es otro tiempo.

**Reorganización:** con tres especies, `/especies` deja de ser una página y pasa a ser un índice con tres fichas: tonina, ballena franca, orca. La URL actual `/especies` debe seguir funcionando.

## 3.4 Sección de libros

Cuatro títulos publicados: *Clara conoce a Muescagrande*, *Muescagrande la Tonina*, *El Sonido de las Toninas*, *Clara y el Catalejo*. Más *La Expedición*, todavía sin salir.

Hoy el sitio no los menciona en ningún lado, pese a que existe una app entera para gestionar sus ventas.

**Estructura:** `/libros` como índice y `/libros/[slug]` por título, con tapa, sinopsis, edad recomendada, ilustradora, y enlace a las fichas del catálogo cuando el protagonista es un individuo real.

**Pendiente:** ver preguntas abiertas.

## 3.5 Noticias

MDX en el repo, en `content/noticias/*.mdx`, con frontmatter de título, fecha, resumen e imagen. Ruta `/noticias` y `/noticias/[slug]`.

Solo tiene sentido si se va a alimentar. Tres entradas abandonadas desde hace dos años dan peor impresión que no tener la sección. Si no hay compromiso de publicar con alguna regularidad, es preferible saltearla.

## 3.6 Enlace al formulario de avistamientos

El formulario de ciencia ciudadana existe y funciona, pero el sitio no lo enlaza desde ningún lado. Alguien que ve una tonina en la costa y busca "delfines Uruguay" llega a la web y no tiene dónde reportarlo.

Debe estar visible en la portada, en `/especies`, en `/avistamientos` y en `/contacto`. Es de las cosas más baratas de implementar y de mayor impacto de toda la fase 3.

---

## Criterios de imágenes

Aplican a todo lo que se sume de acá en adelante.

| Uso | Ancho máximo | Formato |
|---|---|---|
| Foto de fondo / hero | 2400 px | WebP |
| Foto de contenido | 1600 px | WebP |
| Fotos del catálogo | 800 px | WebP + marca de agua |
| Tapas de libros | 1000 px | WebP |
| Logos e iconos | SVG si existe, si no PNG al doble del tamaño de uso | |

Script para procesar una carpeta completa:

```bash
npm install -D sharp-cli
npx sharp-cli --input "originales/*.jpg" --output "public/procesadas" resize 1600 --withoutEnlargement -f webp -q 82
```

Regla general: si una imagen se muestra a 200 px, no puede pesar 300 KB. Hoy `logo2.png` mide 3543 px de ancho para mostrarse a 144.

Toda imagen nueva necesita `alt` descriptivo. En el sitio actual están todos vacíos.

---

## Preguntas abiertas

Ninguna bloquea la fase 1.

1. **Ilustradora.** ¿Hay permiso para usar su trabajo como base gráfica del sitio, más allá de las tapas? Conviene dejarlo por escrito antes de construir la identidad visual encima. Y definir cómo se la acredita.

2. **Libros: ¿venta o vidriera?** ¿La sección solo los muestra, o lleva a comprarlos? Si lleva a comprar: ¿a qué? ¿Un formulario de pedido, un WhatsApp, un listado de librerías? La app de ventas actual es de gestión interna y no sirve como tienda pública. Esto define si `/libros` es contenido simple o si hay que construir algo más.

3. **Manual de marca.** ¿Yaqu Pacha e.V. tiene uno? Cambia el punto de partida de la fase 2.

4. **Material de ballena franca y orca.** ¿Existe escrito o hay que redactarlo?

5. **Noticias.** ¿Hay compromiso real de publicar? Si no, se saltea.

6. **Idioma.** ¿En algún momento va una versión en inglés? Yaqu Pacha e.V. es alemana y las publicaciones son internacionales. Si la respuesta es "quizás", conviene estructurar las rutas pensando en eso desde ahora; agregarlo después obliga a rehacer el ruteo.
