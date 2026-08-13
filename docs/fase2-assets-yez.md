# Fase 2 — Assets de Yez: integración al sistema visual

Complementa a `fase2-sistema-visual.md` y `fase2-revisiones.md`. **Desbloquea todo lo que estaba pendiente** de esos dos documentos.

Los archivos van en `public/decor/`. Peso total: 616 KB.

---

## 1. Inventario

| Archivo | Tamaño | Uso |
|---|---|---|
| `silueta-tonina.png` | 900×362, 13 KB | ficha de especie tonina |
| `silueta-franciscana.png` | 900×261, 10 KB | ficha de especie franciscana |
| `silueta-orca.png` | 900×466, 16 KB | ficha de especie orca |
| `silueta-ballena-franca.png` | 900×357, 14 KB | ficha de especie ballena franca |
| `garabatos.png` | 1179×519, 134 KB | mandalas, estrellas y espirales |
| `logo-proyecto-toninas-blanco.png` | 800×658, 63 KB | sobre el hero |
| `logo-yaqupacha-blanco.png` | 800×279, 30 KB | sobre fondos oscuros o con textura |
| `logo-krakatoa-blanco.png` | 800×719, 83 KB | créditos de libros |
| `textura-guarda.webp` | 1600×727, 163 KB | fondo de sección |

Todo blanco sobre transparente, salvo la textura.

**Notas sobre el material original:**
- Los tres `mandalas-0X.svg` **no eran vectores**: cada uno tenía el mismo PNG de 1181×1181 incrustado en base64, con distinto recorte y rotación. Se extrajo el PNG una sola vez. No usar los SVG — son 189 KB cada uno con la misma imagen adentro.
- `fondo_guarda.png` pesaba 4,2 MB. Comprimida a 163 KB.
- Las siluetas venían con margen transparente sobrante; recortadas al contenido.

---

## 2. Las siluetas resuelven el problema de las especies

Cada especie tiene ahora un elemento visual propio, del mismo lenguaje gráfico. **Esto elimina la dependencia de conseguir una foto espectacular para cada una** — que era el pendiente de contenido marcado en `fase2-revisiones.md`.

Uso:
- En el encabezado de cada `/especies/[especie]`, sobre banda `mar.800`, a buen tamaño.
- En el índice `/especies`, como identificador de cada una de las cuatro tarjetas.
- Como marca de agua de fondo, con opacidad baja, en secciones de esa especie.

Al ser blancas sobre transparente, se recolorean con `filter` o se usan como máscara CSS si hace falta otro color. Sobre fondo claro, aplicar el color con `mask-image` en lugar de mostrarlas en blanco.

**Todas necesitan `alt` descriptivo** — "Silueta de tonina", etc. — o `aria-hidden` si son puramente decorativas.

---

## 3. Garabatos

El archivo trae varios elementos sueltos: dos mandalas, estrellas de mar y espirales.

**Separarlos en archivos individuales** al implementar, recortando cada elemento. Un solo PNG con todo obliga a cargar los 134 KB completos para mostrar una estrellita.

Uso según los tres registros de `fase2-revisiones.md` sección 6:

| Registro | Cómo |
|---|---|
| Alto — portada, Toninas, libros | visibles, como separadores de sección y detalles |
| Neutro — especies, avistamientos, nosotras, tienda | sutiles, opacidad 10-20%, como marca de agua |
| Sobrio — proyectos compartidos, publicaciones | no usar |

Siempre con `aria-hidden="true"`: son decorativos y no aportan información.

Nunca detrás de texto con opacidad alta — compiten con la lectura.

---

## 4. Logo blanco sobre el hero

`logo-proyecto-toninas-blanco.png` incluye "PROYECTO TONINAS" y "~ CENTINELAS DE LA COSTA ~".

**Esto resuelve el punto 4 de `fase2-revisiones.md`.** Ya no hace falta pedirle a Yez el lettering suelto de la frase ni buscar una tipografía parecida: el logo trae la frase con su tratamiento propio.

Va sobre el video del hero. Al ser blanco puro sobre agua turquesa, verificar que se distinga — puede necesitar una sombra suave (`drop-shadow`) o la capa de respaldo de la sección 2 de aquel documento.

---

## 5. Textura: fondo de sección, no de barra

**Decidido: `textura-guarda.webp` NO va en navbar ni footer.**

Dos razones. La primera es de marca: el logo de Yaqu Pacha en cian sobre textura turquesa se pierde — son colores vecinos. Existe `logo-yaqupacha-blanco.png` y con él sí funcionaría, pero obliga a que todo lo que va encima sea blanco u oscuro, nunca cian, y eso complica el navbar donde el cian marca lo clicable.

La segunda es de uso: navbar y footer aparecen en todas las páginas todo el tiempo. Una textura ahí cansa. Además es una acuarela con carácter, y en una franja de 60 px de alto se desaprovecha.

**Navbar y footer quedan lisos.**

### Dónde sí va

- **Sección institucional de la portada** — le da calidez sin necesidad de ilustración completa.
- **Tarjetas de especie** en el índice `/especies`, con las siluetas blancas encima. La combinación funciona sola: textura turquesa de fondo, silueta blanca al frente.
- **`/libros`** — registro alto, donde más pega la estética de los libros.

### Reglas de contraste

Luminancia 194: es un fondo claro. Sobre la textura:

- **Texto oscuro siempre.** `#1F3D42` o `marca.grafito` (`#40575C`). Texto blanco no llega a contraste suficiente.
- **Links en `marca.oscuro` (`#00758A`)**, no en el cian pleno, que compite con el turquesa del fondo.
- **Logos en blanco** solo si van sobre las zonas más saturadas de la textura; si no, usar la versión en color.
- Verificar WCAG AA: 4.5:1 mínimo para texto de cuerpo.

Implementación: `background-size: cover` con `background-position: center`. En secciones muy altas puede convenir `repeat` en lugar de estirar, para que no se pixele.

---

## 6. Créditos

Todo este material es de **Yez**. La autoría tiene que estar acreditada de forma visible en el sitio — al pie de la sección de libros o en una página de créditos —, no solo en los nombres de archivo.

---

## 7. Qué queda desbloqueado

De `fase2-revisiones.md` sección 8, ya no está bloqueado nada:

- ✅ Garabatos como separadores y detalles
- ✅ Lettering — resuelto con el logo blanco de Proyecto Toninas
- ✅ Imagen propia para cada especie — resuelto con las siluetas

Sigue pendiente solo por contenido: textos de la sección institucional, fotos del equipo, y logos de los socios de proyectos compartidos.
