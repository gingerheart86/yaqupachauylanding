# Fase 2 — Correcciones visuales

## 1. La tarjeta de Proyecto Toninas usaba una foto de logos como fondo

En la portada, la tarjeta usaba como imagen de fondo una foto de logos institucionales (Ministerio de Relaciones Exteriores, Intendencia de Maldonado, CIEDUR, CEUTA, UDE, AUCI). Encima iba texto blanco ilegible, y se leía de fondo "...de Coordinación de las Convenciones de Río en Uruguay (ECC...".

Una tarjeta de proyecto no puede tener de fondo una grilla de sponsors.

**Solución:** fondo `mar.800` sólido con la silueta de la especie en blanco encima, alineada a la derecha, opacidad 25-35%.

| Proyecto | Silueta |
|---|---|
| Proyecto Toninas | `silueta-tonina.png` |
| Identidad Franca | `silueta-ballena-franca.png` |
| Gephyreus | `silueta-tonina.png` |
| Grupo de Trabajo en Varamientos | sin silueta — abarca las cuatro especies |

**No usar `textura-guarda.webp` en estas tarjetas:** es turquesa claro (luminancia 194) y el texto blanco no se leería.

Los logos institucionales van en el componente `GrillaLogos`, dentro de la página de cada proyecto — nunca como fondo.

## 2. Jerarquía entre las tarjetas de proyecto

Las cuatro tenían el mismo tamaño y las secundarias quedaban demasiado chicas.

En grilla de dos columnas: **Toninas ocupa el ancho completo** de la primera fila, con más altura; los otros tres debajo, más compactos. En mobile, apiladas con Toninas primero y más alta. Mismo componente con una prop de destaque.

## 3. Fotos del equipo fuera de la portada

Quitarlas de la portada. Van en `/nosotros/integrantes`.

La sección institucional de la portada mantiene el texto y el video, sin retratos individuales.

Van a sumarse más integrantes, así que esa página necesita una grilla que escale sin rediseño: mismo componente de tarjeta, foto en proporción fija, nombre y rol.

## 4. Textura como fondo de la sección institucional

`textura-guarda.webp` va **solo** ahí. No en navbar, no en footer, no en tarjetas.

Con luminancia 194:
- Texto oscuro siempre: `#1F3D42` o `marca.grafito` (`#40575C`). Blanco no llega a contraste.
- Links en `marca.oscuro` (`#00758A`), no cian pleno.
- WCAG AA: 4.5:1 mínimo.

`background-size: cover`, `background-position: center`.

## 5. Garabatos y lettering

**Garabatos** — `garabatos.png` trae varios elementos juntos: dos mandalas, estrellas de mar y espirales. **Separarlos en archivos individuales**; si no, mostrar una estrellita obliga a cargar los 134 KB completos.

| Dónde | Elemento | Tamaño | Opacidad | Posición |
|---|---|---|---|---|
| Separador entre secciones de la portada | espiral con estrellas | 240 px | 100% | centrado, margen vertical 48 px |
| Fondo de la sección de Proyecto Toninas | mandala | 320 px | 12% | esquina sup. derecha, recortado por el borde |
| Tarjetas de libro | estrella de mar | 32 px | 100% | esquina sup. izquierda |
| Encabezado de `/educacion/libros` | mandala | 280 px | 15% | esquina inf. izquierda |

Todos con `aria-hidden="true"`. Nunca detrás de texto con opacidad mayor a 20%.

**Lettering** — usar `logo-proyecto-toninas-blanco.png`, que ya incluye "PROYECTO TONINAS" y "~ CENTINELAS DE LA COSTA ~". No buscar una tipografía parecida a la manuscrita de Yez.

Va sobre el video del hero, 320-400 px de ancho, centrado. Si no se distingue del agua turquesa, agregar `drop-shadow` suave.

## 6. Footer del mismo color que el navbar

Unificar, ambos lisos. Definir un token único y usarlo en los dos. Con footer oscuro, usar `logo-yaqupacha-blanco.png`.

## 7. Materiales educativos: versión liviana

En `/educacion/materiales`, el PDF de impresión del mapa pesa 7,7 MB. Está bien para imprimir, pero es mucho para alguien en el celular.

Ofrecer dos versiones de cada material pesado: el PDF de impresión y uno liviano de pantalla (1-2 MB). Que el botón diga cuál es cuál y muestre el peso: "Ver en pantalla · PDF 1,4 MB" / "Descargar para imprimir · PDF 7,7 MB".

## Checklist

- [ ] Ninguna tarjeta de proyecto usa la foto de logos de fondo
- [ ] Texto legible en las cuatro tarjetas
- [ ] Toninas visiblemente más grande que las otras tres
- [ ] Sin fotos del equipo en la portada
- [ ] Textura solo en la sección institucional
- [ ] Garabatos visibles en los cuatro lugares de la tabla
- [ ] Logo blanco de Proyecto Toninas sobre el hero
- [ ] Navbar y footer del mismo color
- [ ] Materiales pesados con versión liviana
- [ ] Lighthouse Accessibility > 95
