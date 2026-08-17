# Nueva estructura de navegación y portada

Reemplaza la estructura de navegación definida en `fase3-arquitectura-y-contenido.md` sección 1. **El resto de ese documento sigue vigente** — catálogos, bilingüe, tienda, criterios de imágenes.

Referencia mirada: crru.org.uk (Cetacean Research & Rescue Unit, Escocia). Organización con estructura muy similar: investigación de cetáceos, rescate de varamientos, educación y financiamiento por donaciones.

---

## 1. Cambio de criterio

La estructura anterior organizaba por **tipo de objeto**: Especies, Proyectos, Avistamientos, Libros, Tienda, Nosotras.

La nueva organiza por **lo que la organización hace**. Es más clara para el público general: alguien busca "educación ambiental" antes que "proyectos".

**Consecuencia asumida:** los proyectos dejan de ser un eje de primer nivel y pasan a estar dentro de Investigación, a dos clics. Es una decisión tomada a conciencia, no un descuido. La regla de fondo se mantiene: Proyecto Toninas es el principal pero no el único, y su jerarquía se expresa en el peso visual dentro de `/investigacion`, nunca en una ruta privilegiada.

---

## 2. Menú

| Nivel 1 | Submenú | Ruta |
|---|---|---|
| **Nosotros** | La ONG | `/nosotros/ong` |
| | Integrantes | `/nosotros/integrantes` |
| **Especies** | Tonina | `/especies/tonina` |
| | Ballena franca austral | `/especies/ballena-franca` |
| | Franciscana | `/especies/franciscana` |
| | Orca | `/especies/orca` |
| **Investigación** | Proyecto Toninas | `/investigacion/toninas` |
| | Gephyreus | `/investigacion/gephyreus` |
| | Grupo de Trabajo en Varamientos | `/investigacion/varamientos` |
| | Identidad Franca | `/investigacion/identidad-franca` |
| | Publicaciones científicas | `/investigacion/publicaciones` |
| **Educación ambiental** | Colección de libros | `/educacion/libros` |
| | Intervenciones de teatro | `/educacion/teatro` |
| | Visitas a centros educativos | `/educacion/visitas` |
| | Prensa y divulgación | `/educacion/prensa` |
| **Colaborá** | Contacto | `/colabora/contacto` |
| | Donaciones | `/colabora/donaciones` |
| **YaquTienda** | — | `/tienda` |

Fuera del menú principal, en la barra superior: los dos botones de reporte. Y `/noticias`, `/avistamientos`.

### Redirecciones obligatorias

Cambian muchas rutas existentes. Todas las viejas deben redirigir con `permanent: true`:

| Vieja | Nueva |
|---|---|
| `/nosotras` | `/nosotros/integrantes` |
| `/especies` | `/especies` (pasa a índice de cuatro) |
| `/proyectos` | `/investigacion` |
| `/proyectos/toninas` | `/investigacion/toninas` |
| `/proyectos/gephyreus` | `/investigacion/gephyreus` |
| `/proyectos/antecedentes` | `/investigacion/toninas/antecedentes` |
| `/publicaciones` | `/investigacion/publicaciones` |
| `/prensa-y-divulgacion` | `/educacion/prensa` |
| `/contacto` | `/colabora/contacto` |

`/especies` es la que más tráfico recibe: verificar que no dé 404 bajo ninguna circunstancia.

---

## 3. Barra superior con los dos reportes

Franja delgada arriba del navbar, presente en **todas** las páginas, no solo la portada. Esto reemplaza la idea anterior de ponerlos en una banda bajo el hero.

| Botón | Destino | Color |
|---|---|---|
| **Reportar un avistamiento** | formulario Survey123 | `marca` (cian) |
| **Reportar un varamiento** | `https://wa.me/59898490889` | tono de alerta — `acento.medusa` o un ámbar |

Los dos con ícono. Colores distintos porque son urgencias distintas: un avistamiento se reporta con calma, un varamiento requiere respuesta inmediata.

**Mostrar el número 098 490 889 visible**, no solo el ícono de WhatsApp: alguien sin la app tiene que poder marcarlo.

En mobile, la franja se colapsa pero los dos botones tienen que seguir accesibles — son la función más urgente del sitio.

---

## 4. Portada: orden de secciones

1. **Hero con video** — `hero-costa.webm/mp4`, logo blanco de Proyecto Toninas encima, frase y botón principal.
2. **Dos tarjetas destacadas** anchas, media pantalla cada una, con foto de fondo y texto encima. Contenido a definir; candidatos: reportar un avistamiento y sumarse como voluntaria.
3. **Sección institucional** — quiénes somos, qué hacemos, objetivo, historia breve. Fondo con `textura-guarda.webp`, texto oscuro. Incluye el video institucional. **Sin fotos del equipo** — esas van a `/nosotros/integrantes`.
4. **Dos proyectos**, no cuatro. Proyecto Toninas destacado y uno más. Enlace a `/investigacion` para ver todos. Fondo `mar.800` con silueta blanca, nunca la foto de logos institucionales.
5. **Tres noticias** — las últimas tres, con imagen, título y fecha. Enlace a `/noticias`.
6. **Banda ilustrada** antes del footer — ver sección 5.
7. **Footer** — mismo color que el navbar.

Poner dos proyectos y tres noticias resuelve la competencia entre ambos bloques: ninguno tapa al otro y la portada no se hace interminable.

---

## 5. Banda ilustrada antes del footer

La referencia usa una ilustración monocromática de costa que cierra la página antes del footer. Se puede hacer con material propio, sin copiar nada: **las siluetas de Yez más los garabatos** dan para una banda de costa o de agua.

Especificación: banda a ancho completo, 120-200 px de alto, monocromática en `mar.900` o blanco según el color del footer, con las cuatro siluetas a distintas escalas y algunos garabatos. `aria-hidden="true"`.

Si Yez puede dibujar una banda de costa propia, mejor todavía — pero con lo que hay ya se puede armar.

---

## 6. Educación ambiental: dos secciones sin contenido

De los cuatro contenidos de esta rama, dos **no existen en ningún material disponible**:

- `/educacion/teatro` — intervenciones de teatro
- `/educacion/visitas` — visitas a centros educativos

Crear las rutas con estructura y un `TODO` visible, pero **no enlazarlas desde el menú hasta que tengan contenido**. Un submenú que lleva a una página vacía es peor que un submenú más corto.

`/educacion/libros` y `/educacion/prensa` sí tienen material.

---

## 7. Qué no cambia

De `fase3-arquitectura-y-contenido.md` siguen vigentes: el ruteo bilingüe con el glosario, los catálogos parametrizados por proyecto, los sonidos en YouTube, la tienda sin pasarela, las donaciones con datos bancarios y PayPal, y los criterios de imágenes.

De `fase2-assets-yez.md` y `fase2-revisiones.md` sigue vigente todo. **Corrección sobre el estado de los assets:** al momento de escribir este documento se pensaba que los assets de Yez (`public/decor/`) todavía no estaban integrados — eso ya no es así. Las siluetas de las cuatro especies, los garabatos separados, los tres logos blancos y la textura ya están en el repo (rama `estructura-rutas`, integrados a partir de los originales de alta calidad). No hay nada bloqueado por assets faltantes en este bloque.

---

## Checklist

- [ ] Las seis ramas del menú responden, con sus submenús
- [ ] Todas las rutas viejas redirigen, ninguna da 404
- [ ] Los dos botones de reporte visibles en todas las páginas, también en mobile
- [ ] El número 098 490 889 legible como texto
- [ ] Portada con dos proyectos y tres noticias
- [ ] Sin fotos del equipo en la portada
- [ ] Teatro y visitas creadas pero no enlazadas
- [ ] Navbar y footer del mismo color
- [ ] Lighthouse Accessibility > 95
