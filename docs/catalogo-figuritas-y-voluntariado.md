# Correcciones y catálogo

═══════════════════════════════════════════
CORRECCIÓN AL SCHEMA DEL CATÁLOGO
═══════════════════════════════════════════

El formato real del código es **URU#001**, no TT-014. Corregir el ejemplo del
`hint` y el slug (`uru-001-muescagrande`).

Agregar campos que faltaban:

```yaml
      - { name: "lugar", label: "Lugar de identificación", widget: "string", hint: "Ej: La Coronilla, Rocha - Uruguay" }
      - { name: "stamp", label: "Estampilla", widget: "image", required: false, hint: "Ilustración de la aleta en línea, fondo transparente." }
      - { name: "historia", label: "Historia", widget: "markdown", hint: "El relato del individuo. Se muestra al abrir la ficha." }
```

═══════════════════════════════════════════
BLOQUE A — Catálogo como álbum de figuritas
═══════════════════════════════════════════

**El catálogo no es una herramienta científica: es divulgación para público
general.** Tiene que ser divertido de recorrer. La estética ya existe y es la de
las postales: estampilla dibujada, código tipo URU#001, matasellos, nombre en
lettering.

Ruta: `/investigacion/toninas/catalogo` (no cambia).

## Comportamiento de cada tarjeta

Tres niveles, en este orden:

1. **Frente:** foto de la aleta con marca de agua.
2. **Girar** (clic en la flecha): la estampilla ilustrada, el código URU#XXX, el
   nombre y el lugar.
3. **Clic debajo del nombre:** se abre un modal con la historia completa.

El giro con animación 3D, no un cambio brusco. Que funcione también con teclado
(Enter o Espacio) y que el foco quede en la cara visible.

## Estética de álbum

- Grilla de tarjetas con proporción de figurita, no de foto suelta.
- El código con tipografía de máquina de escribir o similar, como en la postal.
- Contador arriba: "5 toninas identificadas" — que crezca a medida que se suman.
- Al abrir el modal, transición suave, no un salto.

**Un límite:** la lógica de álbum no puede volverse coleccionismo competitivo.
No hay figuritas "raras", ni faltantes, ni nada que sugiera que un individuo vale
más que otro. Son animales silvestres de una población amenazada, y la ficha de
un individuo muerto no puede leerse como una carta que salió repetida.

## Individuos muertos

Etiqueta "Registrado muerto", **sin bajar la opacidad** de la tarjeta. Ver el
criterio ya definido: un individuo se considera vivo mientras no se lo haya
encontrado muerto.

Muescagrande es el caso a mirar: último registro en 2017, vista por la comunidad
hasta 2019. **Sigue como viva**, porque nunca apareció muerta.

## Assets disponibles

Extraídos de las postales, listos para `public/catalogo/toninas/`:

| Individuo | Foto de aleta | Estampilla |
|---|---|---|
| URU#001 Muescagrande | `aleta-uru-001-muescagrande.webp` | `stamp-uru-001-muescagrande.png` |
| URU#006 Puramuesca | `aleta-uru-006-puramuesca.webp` | `stamp-uru-006-puramuesca.png` |
| URU#009 Opuesta | `aleta-uru-009-opuesta.webp` | `stamp-uru-009-opuesta.png` |
| URU#019 Diagonal | `aleta-uru-019-diagonal.webp` | `stamp-uru-019-diagonal.png` |
| URU#056 Dedo 2 | `aleta-uru-056-dedo-2.webp` | `stamp-uru-056-dedo-2.png` |

Las estampillas son PNG con fondo transparente. Las fotos ya traen marca de agua
de Proyecto Toninas.

## Datos de las cinco fichas

**URU#001 Muescagrande** — La Coronilla, Rocha. Hembra. Primer avistamiento
3/1/2006. Último registro verano 2017.
> «Muescagrande» es una hembra que logramos fotografiar e identificar el 3 de enero de 2006 en el Pesquero de La Coronilla, Rocha. Su marca es la más grande y particular de todas las toninas conocidas en Uruguay.
>
> La elegimos como protagonista de la colección de cuentos "Clara y las toninas" por ser un símbolo de la costa de Rocha. Muescagrande es conocida por pescadores, surfistas, guardavidas y gente de playa que la han distinguido por su marca durante más de 60 años. Nuestro último registro fue en el verano de 2017, aunque ha sido vista por la comunidad costera hasta el 2019. Hoy no perdemos la esperanza de volver a verla recorriendo nuestras playas.

**URU#006 Puramuesca** — La Coronilla, Rocha. Hembra. Primer avistamiento
10/1/2006.
> «Puramuesca» es una hembra adulta que vimos por primera vez el 10 de enero de 2006 en La Coronilla, Rocha. La reconocimos por la cantidad de muescas en su aleta dorsal. En aquel momento estaba acompañada de una cría y de otras hembras.
>
> Hoy en día, es ella quien acompaña a las hembras más jóvenes de los grupos que han dado a luz a sus crías. Puramuesca, además, simboliza la conectividad y el movimiento entre el sur de Brasil y Uruguay, prueba viviente del vínculo entre ambos países. Esto nos demuestra la importancia de la colaboración internacional en la investigación y conservación de estos increíbles animales.

**URU#009 Opuesta** — La Coronilla, Rocha. Primer avistamiento invierno 2003.
> «Opuesta» es reconocida por sus dos marcas blancas opuestas a ambos lados de la punta de la aleta dorsal. La fotografiamos por primera vez en el invierno de 2003, durante un día de lluvia, junto a investigadores brasileños en la playa de La Coronilla, Rocha. Años después la vimos en varias oportunidades recorriendo las costas de Rocha y fue observada, en diversas ocasiones, en aguas cercanas a Lagoa dos Patos por nuestros colegas brasileños.
>
> En los últimos años ha sido vista principalmente en La Paloma, Rocha. Desde la primavera de 2021 se la observa acompañada de un cría a la que fotógrafos locales llamaron Luna.

**URU#019 Diagonal** — La Coronilla, Rocha. Primer avistamiento 28/1/2006.
> A «Diagonal» la vimos por primera vez el 28 de enero de 2006 en el Pesquero de La Coronilla, Rocha. Es considerada una de las toninas residentes de la costa uruguaya, en particular de Rocha, pues la observamos durante todo el año.
>
> En los últimos tiempos la encontramos varias veces en Barra de Valizas y en zonas más al este del departamento. En muchas ocasiones la vimos junto a Muescagrande compartiendo los mismos grupos hasta el año 2017.

**URU#056 Dedo 2** — Barra de Valizas, Rocha. Primer avistamiento 19/1/2021.
> «Dedo 2» nos hizo recordar a "Dedo", una tonina que observamos entre 2006 y 2010 y la encontramos varada en Barra del Chuy en ese último verano, con sus dientes muy gastados. Su marca se asemeja a un dedo pulgar saliendo del borde posterior de la aleta y similar, aunque más grande, a la de "Dedo". Su presencia es intermitente, a veces por Barra de Valizas o La Coronilla, Rocha.
>
> La identificamos por primera vez el 19 de enero de 2021 y sabemos que frecuenta mayormente las aguas del sur de Brasil, apareciendo esporádicamente durante los veranos en aguas uruguayas.

**Enlace cruzado:** Muescagrande, Puramuesca y Diagonal son personajes de los
libros. La ficha enlaza al libro y el libro a la ficha.

## Descubrimiento desde la especie

En `/especies/tonina`, un bloque **destacado y visual** hacia el catálogo — no un
link al pie. Con una estampilla de muestra y el contador de individuos
identificados. Es por donde va a entrar la mayoría.

═══════════════════════════════════════════
BLOQUE B — Formulario de voluntariado
═══════════════════════════════════════════

Formulario propio, no embeber el de Google.

**Las respuestas se envían por mail a `yaqupachauy@gmail.com`.** Route Handler con
un servicio de mail; las credenciales como variables de entorno en Vercel, nunca
en el repo.

**Los campos son editables desde el panel.** Colección de tipo `files`:

```yaml
      - name: "voluntariado"
        label: "Colaborá — Voluntariado"
        file: "content/paginas/voluntariado.mdx"
        fields:
          - { name: "titulo", label: "Título", widget: "string" }
          - { name: "intro", label: "Introducción", widget: "markdown", hint: "Qué implica ser voluntaria, qué se espera, épocas del año." }
          - name: "campos"
            label: "Campos del formulario"
            widget: "list"
            fields:
              - { name: "nombre", label: "Nombre del campo", widget: "string", hint: "Ej: telefono. Sin espacios ni acentos." }
              - { name: "etiqueta", label: "Etiqueta visible", widget: "string" }
              - name: "tipo"
                label: "Tipo"
                widget: "select"
                options: ["texto", "texto largo", "email", "teléfono", "selección", "casilla"]
              - { name: "opciones", label: "Opciones", widget: "text", required: false, hint: "Solo para 'selección'. Una por línea." }
              - { name: "obligatorio", label: "Obligatorio", widget: "boolean", default: false }
          - { name: "mensaje_exito", label: "Mensaje al enviar", widget: "text" }
          - { name: "aviso_datos", label: "Aviso sobre los datos", widget: "text", hint: "Qué se hace con la información que deja la persona." }
```

El formulario se genera a partir de esa lista. Agregar un campo desde el panel lo
hace aparecer en el sitio.

**Los campos concretos están pendientes:** el equipo los va a sacar del formulario
actual (`https://forms.gle/NT2VNtnA7VurywrB7`). No inventarlos. Mientras tanto,
dejar la ruta con un enlace al formulario de Google.

Protección anti-spam: un campo oculto tipo honeypot alcanza. No usar captcha de
terceros.

## Verificación

- [ ] El código usa formato URU#001
- [ ] La tarjeta gira con clic y con teclado
- [ ] El modal abre, cierra con Escape y devuelve el foco
- [ ] Un individuo muerto muestra etiqueta sin perder contraste
- [ ] Muescagrande figura como viva
- [ ] El contador refleja las fichas publicadas
- [ ] El bloque destacado en `/especies/tonina` lleva al catálogo
- [ ] El enlace cruzado con libros funciona en los dos sentidos
- [ ] El formulario se genera desde los campos del panel
- [ ] El mail llega a yaqupachauy@gmail.com
- [ ] `npm run build` sin errores
