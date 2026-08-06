# Fase 2 — Revisiones sobre la primera implementación

Complementa a `fase2-sistema-visual.md`. La paleta y Montserrat quedaron bien; lo que falta es identidad visual y contenido institucional en la portada.

---

## 1. Por qué todavía no se parece a los libros

La paleta sola no alcanza. La identidad de Yez está en tres cosas, y ninguna es un color:

1. **Los garabatos blancos** — mandalas, estrellas de mar, espirales, salpicaduras. Aparecen en la tapa de *Muescagrande*, en la doble página de las medusas y en la infografía del ciclo de vida. Es el elemento más reutilizable de toda su obra.
2. **El lettering manuscrito** de los títulos.
3. **La textura de acuarela** de los fondos.

Los garabatos son la prioridad: convertidos en SVG y usados como separadores de sección, marcas de agua sobre bandas oscuras y detalles en tarjetas, dan identidad sin necesidad de una ilustración completa en cada lugar.

**Requieren un asset que todavía no existe.** Ver sección 6.

---

## 2. Hero con video

**Los archivos ya están comprimidos y listos.** Van en `public/video/`:

| Archivo | Peso | Uso |
|---|---|---|
| `hero-toninas-1280.webm` | 1.6 MB | fuente principal |
| `hero-toninas-1280.mp4` | 1.6 MB | respaldo (Safari) |
| `hero-poster.jpg` | 79 KB | poster y fallback de mobile |

Origen: toma en Valizas, 13 s, ya sin pista de audio, 25 fps, 1280 px, con `faststart`. **No reexportar ni recomprimir** — se pasó de 36 MB a 1.6 MB y cualquier reexport desde una app de video probablemente lo devuelva a varios MB.

El video es propiedad de Yaqu Pacha Uruguay: los derechos fueron adquiridos a Manuel Gianoni. Crédito opcional.

### Implementación

```jsx
"use client";
import { useEffect, useState } from "react";

export function HeroVideo() {
  const [reproducir, setReproducir] = useState(false);

  useEffect(() => {
    const anchoOk = window.matchMedia("(min-width: 768px)").matches;
    const sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReproducir(anchoOk && !sinMovimiento);
  }, []);

  return (
    <div className="relative h-[70vh] min-h-[420px] w-full overflow-hidden bg-mar-800">
      {reproducir ? (
        <video
          autoPlay muted loop playsInline
          poster="/video/hero-poster.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/video/hero-toninas-1280.webm" type="video/webm" />
          <source src="/video/hero-toninas-1280.mp4" type="video/mp4" />
        </video>
      ) : (
        <img
          src="/video/hero-poster.jpg"
          alt="Tonina emergiendo frente a la costa de Valizas"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {/* contenido del hero acá */}
    </div>
  );
}
```

Puntos que no se pueden omitir:

- **`playsInline`** — sin esto iOS abre el video a pantalla completa.
- **`muted`** — sin esto los navegadores bloquean el autoplay.
- **En mobile no se carga el video**, se muestra el poster. El chequeo va en `useEffect`, no en el render, para no romper la hidratación.
- **`prefers-reduced-motion`** respetado: imagen fija.
- El `bg-mar-800` del contenedor evita el destello blanco mientras carga.
- No usar `next/image` para el poster acá — es fondo de video, no imagen de contenido.

### El texto no puede ir arriba

**El cielo del video está casi blanco** (luminancia 220 sobre 255). Texto blanco en la parte superior no se lee. El agua está en 130, bastante más oscura.

Dos medidas, ambas necesarias:

1. **Anclar el contenido abajo**, sobre el agua, no centrado ni arriba.
2. **Capa de respaldo** entre el video y el texto:

```jsx
<div className="absolute inset-0 bg-gradient-to-t from-mar-900/85 via-mar-900/40 to-transparent" />
```

Es un degradado desde abajo, no desde arriba: oscurece el agua donde va el texto y deja el cielo limpio.

**No quemar el oscurecido en el archivo de video.** En CSS se ajusta en dos minutos y funciona en todos los tamaños de pantalla; en el archivo, cada cambio obliga a reexportar y recomprimir.

---

## 3. Cambios de contenido en la portada

**Quitar** la frase "Si cuidamos las toninas cuidamos la costa".

**Agregar una sección institucional** que reúna en un solo bloque lo que hoy está disperso: quiénes somos, qué hacemos, el objetivo, y un poco de la historia de Yaqu Pacha Uruguay. Con fotos del equipo y de campo, no solo texto.

Va en la portada, después del hero. No confundir con `/proyectos/antecedentes`, que es la historia del Proyecto Toninas y sigue donde está.

**Agregar un bloque de proyectos.** Hoy la portada da a entender que la organización hace una sola cosa. Son cuatro proyectos:

- Proyecto Toninas
- Gephyreus (regional)
- Red Nacional de Varamientos
- Identidad Franca

**Toninas va primero y con más peso visual** — es el principal. Los otros tres abajo, en formato más compacto. La jerarquía se expresa acá, en el tamaño y el orden, nunca en la estructura de rutas: todos los proyectos usan el mismo componente y la misma profundidad de URL, para que el quinto entre sin rehacer nada.

---

## 4. "Toninas, centinelas de la costa"

Se pide que aparezca en la tipografía manuscrita de las tapas.

**Esa tipografía no es una fuente: es dibujo de Yez.** No se puede escribir texto nuevo con ella y no hay que buscar una fuente parecida — el resultado queda peor que no intentarlo.

Dos opciones:

1. **Usar el logo de Proyecto Toninas**, que ya incluye "~ CENTINELAS DE LA COSTA ~" con las ondas. Disponible ya, archivo `PROYECTO_TONINAS_LOGO_original_sin_fondo-01.png`.
2. **Pedirle a Yez un PNG o SVG** con la frase en su manuscrita. Queda mejor pero depende de ella.

Mientras no esté el asset, usar el logo.

---

## 5. Ajustes de estilo

Los títulos de las secciones del navbar no están centrados en sus contenedores. Revisar alineación y padding de los ítems del menú, en desktop y mobile.

---

## 6. Registros visuales: qué tan ilustrado va cada sección

**La intensidad visual la marca la titularidad del contenido, no la especie ni su importancia.**

Proyecto Toninas es exclusivo de Yaqu Pacha Uruguay: ahí el lenguaje visual propio se despliega sin restricciones. Gephyreus, la Red Nacional de Varamientos e Identidad Franca son proyectos de los que Yaqu Pacha **forma parte**, con socios e identidad propia — aplicarles la estética de Yez sería apropiarse visualmente de algo compartido.

Las páginas de especie quedan en registro neutro. Eso permite que la orca, que hoy no tiene proyecto detrás, tenga su espacio sin quedar en desventaja frente a la tonina.

| Registro | Dónde | Cómo se ve |
|---|---|---|
| **Alto** | portada, Proyecto Toninas, libros, material educativo | ilustración a ancho completo, garabatos visibles, lettering |
| **Neutro** | las cuatro especies, avistamientos, nosotras, tienda | paleta y tipografía institucional, garabatos sutiles como separadores |
| **Sobrio** | Gephyreus, Varamientos, Identidad Franca, publicaciones | solo paleta y tipografía, sin decoración |

La regla escala sola: si la orca consigue proyecto propio, su página sube de registro. Si Yaqu Pacha lidera un proyecto nuevo, ya se sabe dónde ubicarlo.

**Distinción clave:** el vocabulario decorativo (garabatos, texturas) pertenece a Yaqu Pacha y puede aparecer atenuado en todo el sitio. Las ilustraciones específicas de Yez — escenas con toninas, dobles páginas de los libros — van solo donde corresponden por contenido. No poner una tonina ilustrada en la página de ballena franca.

En `/publicaciones` la decoración sobra: es un listado de artículos científicos y los garabatos le restan seriedad.

### Componente de logos institucionales

Los proyectos compartidos necesitan mostrar a sus socios. La página de Gephyreus ya tiene un afiche con una decena de instituciones (FURG, UDESC, ICMBio, UNIVALI, UFSC, GEMARS, ECOMEGA y otras).

Hace falta un componente de grilla de logos: fondo neutro, espaciado generoso, sin decoración alrededor, con los logos en escala consistente. Es lo que hace que una página se lea como institucional y no como material de divulgación.

### Pendiente de contenido

Ballena franca, franciscana y orca van a necesitar cada una una imagen fuerte propia. No hace falta que sea ilustración — fotografía de campo bien tratada alcanza. Pero si esas páginas quedan solo con texto mientras la de toninas tiene una doble página de Yez, la diferencia se nota aunque el registro sea el correcto.


Un solo pedido con dos cosas:

1. **Los garabatos sueltos** — mandalas, estrellas, espirales, salpicaduras — en PNG con fondo transparente, o vectorial si los tiene. Casi seguro están en capa aparte de su archivo original, porque los reutiliza sobre fondos distintos en cada libro.
2. **"Toninas, centinelas de la costa"** en su lettering manuscrito, PNG transparente o SVG.

No intentar recortarlos de los JPG de las tapas: están superpuestos a la ilustración y el recorte sale sucio.

Cuando lleguen: convertir a SVG si es posible, guardar en `components/decor/` y usarlos como separadores de sección y detalles. Con opacidad baja sobre fondos oscuros, sin competir con el texto.

---

## 7. Assets a pedirle a Yez

Un solo pedido con dos cosas:

1. **Los garabatos sueltos** — mandalas, estrellas, espirales, salpicaduras — en PNG con fondo transparente, o vectorial si los tiene. Casi seguro están en capa aparte de su archivo original, porque los reutiliza sobre fondos distintos en cada libro.
2. **"Toninas, centinelas de la costa"** en su lettering manuscrito, PNG transparente o SVG.

No intentar recortarlos de los JPG de las tapas: están superpuestos a la ilustración y el recorte sale sucio.

Cuando lleguen: convertir a SVG si es posible, guardar en `components/decor/` y usarlos como separadores de sección y detalles. Con opacidad baja sobre fondos oscuros, sin competir con el texto.

---

## 8. Qué se puede hacer ya y qué está bloqueado

**Se puede avanzar ahora, sin esperar nada:**

1. Hero con video — los archivos están listos (sección 2).
2. Quitar "Si cuidamos las toninas cuidamos la costa".
3. Sección institucional en la portada (sección 3).
4. Bloque de los cuatro proyectos en la portada (sección 3).
5. Alineación de los ítems del navbar (sección 5).
6. Aplicar los tres registros visuales a las páginas existentes (sección 6).
7. Componente de grilla de logos institucionales (sección 6).
8. Usar el logo de Proyecto Toninas para "Centinelas de la costa" (sección 4).

**Bloqueado hasta que lleguen los assets de Yez:**

- Garabatos como separadores y detalles (sección 7).
- Lettering manuscrito, si se prefiere sobre el logo (sección 4).

Dejar previsto el lugar donde van los garabatos, pero **no simular el efecto con formas de Tailwind ni buscar una tipografía parecida a la manuscrita.** Es preferible que falte a que quede una imitación.

**Bloqueado por contenido, no por diseño:**

- Textos de la sección institucional y fotos del equipo.
- Imagen fuerte para ballena franca, franciscana y orca.
- Logos de los socios de los proyectos compartidos.

---
