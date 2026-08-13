# Fase 3 — Bloque 1: reestructura de rutas y ruteo bilingüe

Requiere fase 1 completa. Se puede hacer en paralelo con lo que quede de fase 2 — no dependen entre sí.

**Este bloque va primero sí o sí.** El sitio pasa de 10 páginas a más de 25 y suma un segundo idioma. Agregar el bilingüe después obliga a rehacer el ruteo entero.

**No incluye contenido.** Las páginas nuevas se crean con estructura y un `TODO` visible. El contenido llega en bloques posteriores.

```bash
git checkout -b estructura-rutas
```

---

## 1. El principio

Yaqu Pacha Uruguay trabaja con **cuatro especies** y **cuatro proyectos**. Proyecto Toninas es el más importante pero no el único.

> **La estructura trata a todos los proyectos igual. La jerarquía se expresa en el peso visual, no en las rutas.**

Todos los proyectos tienen la misma profundidad de URL y usan el mismo componente. Que Toninas sea el principal se comunica en la portada y en el orden y tamaño dentro de `/proyectos` — nunca con una ruta privilegiada. Así entra el quinto proyecto sin rehacer nada.

### Especies y proyectos son ejes distintos

| | Habla de | Público |
|---|---|---|
| `/especies/[especie]` | el animal | general, entra por buscadores |
| `/proyectos/[proyecto]` | el trabajo | institucional, científico |

No se mapean 1 a 1: el Grupo de Trabajo en Varamientos abarca las cuatro especies, Gephyreus es regional, y la franciscana no tiene proyecto propio. **Mantener esa línea es la disciplina central** — si la página de especie cuenta la historia del proyecto, las dos se vuelven redundantes.

---

## 2. Mapa de rutas

Todas bajo prefijo de idioma: `/es/...` y `/en/...`

| Ruta | Estado |
|---|---|
| `/` | existe — portada |
| `/especies` | **cambia**: de página única a índice de cuatro |
| `/especies/tonina` | nueva — migrar acá el contenido actual de `/especies` |
| `/especies/ballena-franca` | nueva |
| `/especies/franciscana` | nueva |
| `/especies/orca` | nueva |
| `/proyectos` | existe — índice |
| `/proyectos/toninas` | existe |
| `/proyectos/gephyreus` | existe |
| `/proyectos/varamientos` | nueva — Grupo de Trabajo en Varamientos |
| `/proyectos/identidad-franca` | nueva |
| `/proyectos/antecedentes` | existe — historia del Proyecto Toninas |
| `/avistamientos` | nueva |
| `/publicaciones` | existe |
| `/nosotras` | existe |
| `/contacto` | existe |
| `/prensa-y-divulgacion` | existe |
| `/libros` | nueva |
| `/tienda` | nueva |
| `/donaciones` | nueva |

**Navegación principal:** Especies · Proyectos · Avistamientos · Libros · Tienda · Nosotras

Catálogos y bibliotecas de sonidos **no van en el menú** — cuelgan de cada proyecto y se llegan también desde la especie.

### Redirecciones obligatorias

`/especies` es la página que más tráfico recibe. Su URL actual **tiene que seguir funcionando**. Configurar en `next.config.js` las redirecciones de las rutas viejas sin prefijo de idioma hacia `/es/...`, con `permanent: true`.

---

## 3. Bilingüe selectivo

Español e inglés. **No todo se traduce**, porque cada página en dos idiomas es mantenimiento permanente y un sitio bilingüe a medias se ve peor que uno solo en español.

| En los dos idiomas | Solo en español |
|---|---|
| Especies | Libros |
| Proyectos | Tienda |
| Publicaciones | Donaciones |
| Nosotras | Noticias |
| Avistamientos | |

Las secciones no traducidas no aparecen en el menú de la versión en inglés. **Nunca dejar una página en inglés que muestre contenido en español.**

### Implementación

- i18n routing de App Router con `generateStaticParams` por idioma.
- Textos en `content/i18n/{es,en}.json`, no incrustados en componentes.
- `hreflang` recíproco entre las dos versiones de cada página. Sin esto Google puede penalizar por contenido duplicado.
- `sitemap.js` incluye ambos idiomas.
- Selector de idioma visible en el navbar.
- Los metadatos de SEO también se traducen.

### Glosario — fijarlo antes de traducir

| Español | Inglés |
|---|---|
| tonina / delfín nariz de botella de Lahille | Lahille's bottlenose dolphin |
| franciscana | franciscana / La Plata dolphin |
| ballena franca austral | southern right whale |
| orca | orca / killer whale |
| avistamiento | sighting |
| varamiento | stranding |
| aleta dorsal | dorsal fin |
| callosidades | callosities |
| catálogo de individuos | photo-identification catalogue |
| muesca | notch |
| ciencia ciudadana | citizen science |

Nombres científicos en cursiva, no se traducen. Los nombres propios tampoco: Proyecto Toninas, Identidad Franca, Grupo de Trabajo en Varamientos y Yaqutienda quedan en español en ambas versiones, con aclaración entre paréntesis la primera vez en inglés.

---

## 4. Componentes que este bloque necesita

**`PaginaEspecie`** — plantilla común a las cuatro: encabezado con nombre común y científico, imagen principal, secciones de contenido, proyectos asociados, bloque de reporte.

**`PaginaProyecto`** — plantilla común a los cuatro. Contempla que un proyecto pueda tener catálogo, sonidos, libros o socios, y que pueda no tener ninguno.

**`BloqueReporte`** — reutilizable, aparece en portada, especies y varamientos. **No duplicar el texto en cada página:** si cambia el número, se cambia en un solo lugar.

```
Avistamientos → formulario Survey123
Varamientos → https://wa.me/59898490889
```

Mostrar siempre el número **098 490 889** visible, no solo el ícono de WhatsApp: alguien sin la app tiene que poder marcarlo.

**`GrillaLogos`** — para los socios de proyectos compartidos. Fondo neutro, espaciado generoso, sin decoración, logos en escala consistente.

---

## 5. Checklist

- [ ] `npm run build` sin errores
- [ ] Las rutas nuevas responden en `/es/` y `/en/`
- [ ] `/especies` y las demás URLs viejas redirigen, no dan 404
- [ ] `hreflang` recíproco en cada par de páginas
- [ ] `sitemap.xml` con ambos idiomas
- [ ] El selector de idioma funciona y no rompe la ruta actual
- [ ] Ninguna página en inglés muestra texto en español
- [ ] Las páginas sin contenido tienen `TODO` visible, no quedan en blanco

---

## 6. Fuera de alcance

- Contenido de las páginas nuevas — bloques posteriores
- Catálogos, sonidos, mapa, tienda, donaciones
- Ajustes visuales de fase 2
- Traducir el contenido real: en este bloque solo se traduce la navegación y las etiquetas de interfaz
