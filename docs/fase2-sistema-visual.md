# Fase 2 — Sistema visual

Repo: `gingerheart86/yaqupachauylanding` · Requiere fase 1 completa.

**Objetivo:** reemplazar los colores genéricos de Tailwind por un sistema visual propio, derivado de las ilustraciones de Yez para los libros infantiles y de la identidad institucional de Yaqu Pacha.

**No incluye contenido nuevo.** Nada de catálogo, libros, noticias ni mapa — eso es fase 3. Al terminar, el sitio tiene las mismas 10 páginas con el mismo texto, pero con identidad propia.

```bash
git checkout -b sistema-visual
```

---

## 1. El principio del sistema

Hay dos paletas y **cumplen funciones distintas**. Esta es la regla que ordena todo lo demás:

- **La paleta de la ilustración es la atmósfera.** Fondos de sección, bandas, superficies. Es desaturada y cálida.
- **El cian institucional es la interacción.** Links, botones, ítem activo del menú, estados de foco. Nada más.

El cian `#0093AC` es muy saturado; las ilustraciones son todas apagadas. Si el cian se usa como fondo o decoración, aplasta la ilustración. Reservado a lo interactivo, se lee como "acá se hace clic" y convive bien.

Corolario práctico: **si un color no comunica que algo es clicable, no puede ser cian.**

---

## 2. Paleta

Reemplazar el `theme.extend` vacío de `tailwind.config.js`.

```js
colors: {
  marca: {
    DEFAULT: "#0093AC",
    oscuro:  "#00758A",
    claro:   "#5AB7C7",
    grafito: "#40575C",
  },
  toninas: {
    DEFAULT: "#2B7B8F",
    claro:   "#6AA6B9",
  },
  mar: {
    900: "#0F4F6E",
    800: "#126287",
    600: "#1B7396",
    400: "#4E7892",
    200: "#86B3D6",
    100: "#C2D7E9",
  },
  costa: {
    900: "#3F4A3C",
    700: "#636759",
    500: "#79A197",
    300: "#BBCB9A",
    100: "#EDF1EC",
  },
  arena: {
    500: "#C9B79A",
    200: "#E8DFD0",
  },
  acento: {
    limon:  "#F2EFA1",
    medusa: "#D98CA8",
    menta:  "#95F6CB",
  },
}
```

Origen de los valores: `marca` y `marca.grafito` del logo de Yaqu Pacha Uruguay; `toninas` del logo de Proyecto Toninas; `mar`, `costa`, `arena` y `acento` extraídos de las ilustraciones de Yez (`LIBROS-01`, `LIBROS-08`, `LIBROS-11`, `LIBROS-18`).

**Reglas de uso:**

| Color | Para qué | Nunca |
|---|---|---|
| `marca` | links, botones primarios, nav activo, foco | fondos grandes, decoración |
| `marca.grafito` | texto secundario, "URUGUAY" del logo | texto de cuerpo |
| `toninas` | acentos de Proyecto Toninas | mezclado con `marca` en el mismo elemento |
| `mar.800` | fondo del hero y bandas oscuras | texto |
| `costa.100` | fondo de secciones claras | |
| `acento.limon` | eyebrows y detalles sobre fondo oscuro | sobre fondo claro (no contrasta) |
| `acento.menta` | infografías educativas | UI general |

Texto de cuerpo: `#1F3D42` sobre claro, blanco sobre `mar.800`. No usar `slate-*` ni `gray-*` de Tailwind en ningún lado.

---

## 3. Tipografía

**Montserrat.** No es una elección de diseño nueva: es la fuente que ya usa la presentación institucional de Yaqu Pacha Uruguay (109 de 111 corridas de texto). Adoptarla alinea el sitio con el material impreso.

```js
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-montserrat",
  display: "swap",
});
```

Pesos: 400 cuerpo, 500 subtítulos, 600 títulos. No usar 700 ni superiores — la marca no los usa.

El lettering manuscrito de las tapas es de Yez y no es una fuente. **No intentar imitarlo con una tipografía similar.** Si se necesita ese efecto en algún título, se pide un PNG a Yez.

---

## 4. Componentes base

Hoy cada página repite las mismas clases de Tailwind a mano, y por eso las secciones no se parecen entre sí. Crear en `components/ui/`:

- `Section` — ancho contenido, padding vertical consistente, prop `fondo` con variantes `claro` (blanco), `costa` (`costa.100`), `mar` (`mar.800`, texto claro).
- `PageHeader` — título y bajada, mismo tratamiento en las 10 páginas.
- `Card` — borde `0.5px`, radio `8px`, para grillas de contenido.
- `Button` — variantes `primario` (fondo `marca`, texto blanco) y `secundario` (borde `marca`, texto `marca`).
- `Eyebrow` — texto chico en mayúsculas con `letter-spacing`, sobre el título.

Después refactorizar las 10 páginas para usarlos. Este paso es la mitad del trabajo de la fase 2 y es lo que hace que el sitio se vea coherente.

---

## 5. Portada

Rehacer el hero:

- Fondo `mar.800` sólido, o una ilustración de Yez a ancho completo con el color como respaldo.
- Eyebrow "Centinelas de la costa" en `acento.limon`.
- `h1` en blanco, un solo `h1` por página (hoy la portada tiene cuatro).
- Bajada en `mar.100`.
- Botón primario "Reportar un avistamiento" y link secundario.

**Navegación:** Especies · Proyectos · Avistamientos · Libros · Tienda · Nosotras. En fase 2 varias de esas rutas todavía no existen — dejar el navbar preparado con las que sí, sin inventar links rotos. La reestructura completa es fase 3.

**La portada expresa la jerarquía entre proyectos, la estructura no.** Yaqu Pacha tiene cuatro proyectos y Toninas es el principal pero no el único: la portada lidera con Toninas, y el resto aparece con menos peso visual. Nunca darle a un proyecto una ruta o un componente privilegiado.

**Las ilustraciones interiores de los libros son dobles páginas apaisadas, proporción 2:1.** Esa es exactamente la proporción de una banda de sección a ancho completo, así que entran sin recortar. Usarlas como separadores entre secciones es la forma más directa de traer la estética de los libros al sitio.

---

## 6. Logo de Proyecto Toninas

Existe un segundo logo — Proyecto Toninas, "Centinelas de la Costa", con la tonina saltando — que el sitio **no usa en ningún lado**, aunque sí usa la frase como texto suelto.

Es más expresivo que el logotipo institucional y encaja con la orientación de comunicación elegida. Incorporarlo en las páginas de `/proyectos`. El logo de Yaqu Pacha Uruguay sigue siendo el del navbar y el footer.

Archivo: `PROYECTO_TONINAS_LOGO_original_sin_fondo-01.png`. Convertir a SVG si se consigue el vectorial; si no, PNG a 600 px de ancho.

---

## 7. Accesibilidad

- Estados de foco visibles en todo lo interactivo: `ring-2 ring-marca ring-offset-2`. Hoy no hay ninguno.
- Verificar contraste: `acento.limon` sobre `mar.800` pasa; sobre blanco **no** — no usarlo ahí.
- El texto sobre ilustraciones necesita una capa de respaldo. No confiar en que la foto sea oscura donde va el texto.

---

## 8. Tailwind 4

Decidir al empezar. Tailwind 4 mueve la configuración de JS a CSS, así que si se migra conviene hacerlo **antes** de escribir la paleta, no después. Si hay dudas, quedarse en 3.4: la paleta funciona igual y no bloquea nada.

---

## 9. Checklist

- [ ] `npm run build` sin errores
- [ ] Ningún `cyan-*`, `teal-*`, `slate-*` ni `gray-*` de Tailwind en el código
- [ ] El cian `marca` aparece solo en elementos interactivos
- [ ] Montserrat cargando por `next/font`, sin FOUT
- [ ] Las 10 páginas usan los componentes base
- [ ] Un solo `h1` por página
- [ ] Foco visible navegando con Tab
- [ ] Lighthouse Accessibility > 95
- [ ] Mobile: el hero se lee bien a 380 px de ancho

---

## Créditos

De las tapas: guion de **Silvia Soler**, ilustraciones de **Yez**, editorial **Krakatoa**. Cuando se usen ilustraciones en el sitio, la autoría de Yez tiene que estar acreditada de forma visible — al pie de la sección o en la página de libros, no escondida en el código.
