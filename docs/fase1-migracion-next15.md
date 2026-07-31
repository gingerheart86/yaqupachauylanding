# Fase 1 – Migración a Next 15 + App Router

Repo: `gingerheart86/yaqupachauylanding` · Sitio: yaqupachauy.org · Deploy: Vercel

**Estado actual:** Next 12.2.5, React 18.2, Tailwind 3.1.8, Pages Router. 8 páginas, ~1.600 líneas. Último commit julio 2023.

**Alcance de esta fase:** actualizar la base técnica sin tocar diseño ni contenido. Nada de paleta nueva, nada de textos nuevos, nada de secciones nuevas – eso es fase 2 y 3. Al terminar, el sitio se tiene que ver *igual* que ahora, pero sobre Next 15, con las imágenes optimizadas, el SEO funcionando y los bugs corregidos.

---

## 0. Antes de arrancar

```bash
git checkout -b migracion-next15
npm install && npm run build   # confirmar que el build actual pasa
```

No mergear a `main` hasta que el checklist final esté completo. Vercel va a generar preview deploys de la rama: usarlos para verificar.

---

## 1. Dependencias

| Paquete | De | A | Nota |
|---|---|---|---|
| `next` | 12.2.5 | ^15 | |
| `react` / `react-dom` | 18.2 | ^19 | |
| `eslint-config-next` | 12.2.5 | ^15 | |
| `@headlessui/react` | ^1.6.6 | ^2 | v1 no soporta React 19 |
| `@heroicons/react` | ^2.0.10 | ^2.2 | |
| `tailwindcss` | ^3.1.8 | ^3.4 | **NO pasar a Tailwind 4 en esta fase** |
| `react-image-gallery` | ^1.2.9 | verificar | ver abajo |

**Tailwind 4** cambia la configuración de JS a CSS. Es un refactor aparte y meterlo acá multiplica las variables en juego. Se evalúa en fase 2, cuando toque el sistema visual.

**`react-image-gallery`** puede no declarar React 19 en sus peer deps. Si rompe la instalación: no forzar con `--legacy-peer-deps` como solución permanente. Se usa en un solo lugar (`components/imagegallery.client.js`, galería de fotos del proyecto) y en fase 2 el diseño de esa galería cambia igual, así que la opción limpia es reemplazarla por un carrusel propio de ~40 líneas. Si preferís no tocarlo ahora, dejá la versión vieja anclada y anotalo como deuda.

---

## 2. Mapa de rutas: `pages/` → `app/`

| Actual | Nuevo |
|---|---|
| `pages/_app.js` + `components/layout.js` | `app/layout.js` |
| `pages/index.jsx` | `app/page.js` |
| `pages/nosotras.js` | `app/nosotras/page.js` |
| `pages/especies.js` | `app/especies/page.js` |
| `pages/publicaciones.js` | `app/publicaciones/page.js` |
| `pages/prensa-y-divulgacion.js` | `app/prensa-y-divulgacion/page.js` |
| `pages/contacto.js` | `app/contacto/page.js` |
| `pages/proyectos/index.js` | `app/proyectos/page.js` |
| `pages/proyectos/antecedentes.js` | `app/proyectos/antecedentes/page.js` |
| `pages/proyectos/toninas.js` | `app/proyectos/toninas/page.js` |
| `pages/proyectos/gephyreus.js` | `app/proyectos/gephyreus/page.js` |
| `pages/api/hello.js` | **borrar** (sobra del boilerplate) |

Las URLs no cambian. Al terminar, borrar la carpeta `pages/` completa.

### Server vs client components

- Todas las páginas son estáticas → server components, sin directiva.
- `components/navbar.client.js` → **`"use client"`** (usa Headless UI y hooks).
- `components/imagegallery.client.js` → **`"use client"`**.
- `components/footer.client.js` → puede quedar server component. Solo tiene SVGs y `new Date().getFullYear()`, que en server component se evalúa en build time – aceptable para un año de copyright, pero si preferís que sea exacto sin rebuild, dejalo client.

Aprovechá para renombrar los archivos sacando el sufijo `.client` – ya no significa nada en App Router y confunde.

---

## 3. Cambios de API obligatorios

### 3.1 `<Link>` ya no acepta `<a>` hijo

Next 13+ rompió esto. En `navbar.client.js` hay dos casos:

**Caso simple** (menú desktop y panel de proyectos):
```jsx
// antes
<Link href={resource.href}><a className="...">{resource.name}</a></Link>
// después
<Link href={resource.href} className="...">{resource.name}</Link>
```

**Caso complicado** (menú mobile), hoy es `<Link>` envolviendo un `<Disclosure.Button as="a">`:
```jsx
// después
<DisclosureButton as={Link} href={item.href} className="...">
  {item.name}
</DisclosureButton>
```
Headless UI v2 soporta `as={Link}` correctamente. Ojo que **v2 renombró los subcomponentes**: `Disclosure.Button` → `DisclosureButton`, `Popover.Panel` → `PopoverPanel`, etc. Los imports cambian.

### 3.2 Headless UI v2: transiciones

El `<Transition as={Fragment}>` con las seis props `enter/enterFrom/enterTo/leave/leaveFrom/leaveTo` alrededor del `Popover.Panel` se simplifica en v2 con el prop `transition` en el panel más clases `data-[closed]:`. Migralo, son menos líneas y menos frágil.

### 3.3 `<Head>` → Metadata API

Sacar el `<Head>` de `components/layout.js`. En `app/layout.js`:

```js
export const metadata = {
  metadataBase: new URL("https://yaqupachauy.org"),
  title: {
    default: "Yaqu Pacha Uruguay",
    template: "%s | Yaqu Pacha Uruguay",
  },
  description: "...",
  openGraph: { type: "website", locale: "es_UY", siteName: "Yaqu Pacha Uruguay", images: ["/og.jpg"] },
};
```

Y un `export const metadata` con `title` y `description` propios en **cada** `page.js`. Hoy las 8 páginas comparten el título "Yaqu Pacha Uy", lo cual es lo peor posible para buscadores.

Los textos de `title` y `description` de cada página están redactados en la sección 6.7. Usalos tal cual.

### 3.4 Fuentes

Hoy `globals.css` declara un stack de fuentes de sistema. Pasarlo a `next/font` en `app/layout.js`. Qué tipografía va se decide en fase 2; por ahora dejá una neutral cargada correctamente y no cambies el aspecto.

---

## 4. Bugs a corregir

### 4.1 Rutas de imagen relativas – ROTO EN PRODUCCIÓN

Varios `src` no empiezan con `/`, así que se resuelven relativos a la ruta actual. En páginas anidadas eso da 404:

| Archivo | `src` actual | Resuelve a | Estado |
|---|---|---|---|
| `pages/proyectos/gephyreus.js` | `pic2.webp` | `/proyectos/pic2.webp` | **roto** |
| `pages/proyectos/gephyreus.js` | `pic3.jpg` | `/proyectos/pic3.jpg` | **roto** |
| `pages/proyectos/index.js` | `pic2.webp`, `pic3.jpg` | `/proyectos/...` | **roto** |
| `pages/index.jsx` | `logo_sinf.png` | `/logo_sinf.png` | anda por casualidad |
| `pages/nosotras.js` | `./Paula.png`, `./caro.jpeg`, `./checho.jpeg` | `/...` | anda por casualidad |

Todas tienen que empezar con `/`. Verificá visualmente las páginas de proyectos después de arreglarlo – puede que haya imágenes que nadie ve hace tres años.

### 4.2 Modo oscuro rompe el sitio

`styles/globals.css` termina con:

```css
@media (prefers-color-scheme: dark) {
  html { color-scheme: dark; }
  body { color: white; background: black; }
}
```

Sobra del boilerplate de `create-next-app`. El sitio no tiene tema oscuro, así que en cualquier celular con modo oscuro activado el fondo se va a negro debajo de secciones que asumen fondo claro. **Borrar el bloque entero.**

### 4.3 Estado activo del navbar

Hoy se guarda en `useState` y se muta el objeto adentro del `.map` (`item.current = true`), lo cual además es mutación directa de estado. Se pierde en cada recarga y no refleja la URL real.

Reemplazar todo el `useState` + `setActiveNavigation` por:

```js
"use client";
import { usePathname } from "next/navigation";
// ...
const pathname = usePathname();
const isActive = (href) => href === "/" ? pathname === "/" : pathname.startsWith(href);
```

Y mover los arrays `navigation` y `resources` fuera del componente, como constantes.

### 4.4 Keys faltantes

En los `.map` del navbar el `<>` externo no tiene key (la key está en el `<Link>` interno, que no es el elemento raíz iterado). Usar `<Fragment key={item.name}>`.

---

## 5. Imágenes: 17 MB → objetivo < 3 MB

### 5.1 Borrar (sin referencias en el código)

| Archivo | Peso |
|---|---|
| `public/log.jpg` | 695 KB |
| `public/Vero.png` | 413 KB |
| `public/YP-Logo_Uruguay_4c_high.tif` | 220 KB |
| `public/proytoninas/2.jpeg` | 91 KB |
| `public/vercel.svg` | – |

Confirmá antes de borrar `Vero.png` (mide exactamente lo mismo que `Paula.png`, puede ser una foto del equipo que se dejó de usar por error).

### 5.2 Recomprimir

| Archivo | Actual | Se muestra a | Acción |
|---|---|---|---|
| `proytoninas/5.jpg` | 3.9 MB, 4000×3000 | galería | máx 2000 px lado largo, WebP |
| `proytoninas/4.jpg` | 3.5 MB, 4000×3000 | galería | ídem |
| `toninas/4.jpg` | 2.5 MB, 3008×2000 | galería | ídem |
| `logo_sinf.png` | 197 KB, 3738×3200 | 224 px | reexportar a ~600 px |
| `logo2.png` | 296 KB, 3543×1052 | 144 px de ancho | reexportar a ~600 px |
| `dol1.jpg` | 416 KB, 3008×2000 | hero portada | máx 2400 px, WebP |

### 5.3 Iconos de redes sociales

`iglogo.png` (365 KB), `fblogo.png` (17 KB) y `twlogo.png` (15 KB) se usan en la portada. Pero `footer.client.js` **ya tiene esos mismos tres iconos como SVG inline**. Extraelos a `components/social-icons.js`, usalos en los dos lados y borrá los tres PNG. Son 400 KB por tres iconos que pesan cero.

Nota para fase 3: el icono de Twitter es el pajarito viejo y el link va a `twitter.com`. Habría que confirmar si la cuenta sigue activa.

### 5.4 `next/image`

Reemplazar todos los `<img>` por `<Image>`:
- Fotos de fondo a pantalla completa (hero de portada, banda de redes): `fill` + `sizes="100vw"` + `priority` solo en la de la portada.
- Imágenes de contenido: `width`/`height` explícitos.
- Logos del navbar y footer: `width`/`height` + `priority` en el del navbar.

Poner `alt` de verdad en todas – hoy están todas con `alt=""`. Es accesibilidad y también SEO.

### 5.5 Favicon

Hoy es el `favicon.ico` por defecto de Next. Generar uno del logo institucional y usar la convención de App Router (`app/icon.png`, `app/apple-icon.png`).

---

## 6. SEO base

- `app/sitemap.js` con las 10 rutas.
- `app/robots.js` permitiendo todo y apuntando al sitemap.
- Imagen Open Graph 1200×630 en `/public/og.jpg`. Puede ser un crop de `dol1.jpg` por ahora; la definitiva sale en fase 2.
- Un solo `<h1>` por página. Revisar: `pages/index.jsx` tiene **cuatro** `h1`, incluido uno que envuelve dos `<p>`. En la portada, dejá el `h1` de "Toninas / centinelas de la costa" y bajá el resto a `h2`.

---

## 6.5 Crédito del footer

Decidido: se mantiene el crédito a sansil, se suma a gingerheart y el texto pasa a español. En `footer.client.js`, la línea actual es:

```jsx
&copy; Yaqupacha Uruguay {new Date().getFullYear()}. Made with ❤️ by{" "}
<a href="https://twitter.com/sansildev" target={"__blank"}>sansil</a>
```

Queda:

```jsx
&copy; Yaqu Pacha Uruguay {new Date().getFullYear()}. Hecho con ❤️ por{" "}
<a href="https://twitter.com/sansildev" target="_blank" rel="noopener noreferrer">sansil</a>
{" "}y{" "}
<a href="https://github.com/gingerheart86" target="_blank" rel="noopener noreferrer">gingerheart</a>
```

Tres detalles de paso:
- `target={"__blank"}` está mal escrito (doble guión bajo), así que hoy no abre en pestaña nueva. El valor correcto es `"_blank"`.
- Todo `target="_blank"` necesita `rel="noopener noreferrer"`.
- El texto dice "Yaqupacha" junto; en el resto del sitio va separado, "Yaqu Pacha".

---

## 6.7 Textos de metadata por página

Orientación SEO: público general que busca **toninas / delfines / Uruguay**. No usar "ballenas" en ningún metadato – el sitio todavía no tiene contenido sobre ballenas y prometerlo penaliza.

El `title` de cada página se combina con el template `"%s | Yaqu Pacha Uruguay"` definido en `app/layout.js`. La portada usa el `default`, sin template.

| Ruta | `title` | `description` |
|---|---|---|
| `/` | `Toninas: los delfines de la costa uruguaya` *(default, con nombre de la organización)* | Investigación y conservación de las toninas, los delfines que habitan la costa de Uruguay. Proyecto Toninas: ciencia, educación ambiental y trabajo con las comunidades costeras. |
| `/especies` | `La tonina, el delfín de la costa uruguaya` | Qué es la tonina (*Tursiops truncatus gephyreus*), el delfín costero de Uruguay: dónde vive, cuántos quedan, cómo se comunica y por qué está en peligro. |
| `/proyectos` | `Nuestros proyectos` | Los proyectos de Yaqu Pacha Uruguay para estudiar y conservar a las toninas y su ambiente costero: monitoreo, investigación y educación ambiental. |
| `/proyectos/toninas` | `Toninas, centinelas de la costa` | El proyecto que estudia a las toninas en La Paloma, Cabo Polonio y Cerro Verde desde 2002, y trabaja en educación ambiental con las comunidades de la costa de Rocha. |
| `/proyectos/antecedentes` | `Antecedentes del Proyecto Toninas` | Más de veinte años estudiando a las toninas en la costa uruguaya: cómo empezó el Proyecto Toninas en 2002 y qué resultados dejó. |
| `/proyectos/gephyreus` | `Proyecto Gephyreus` | Trabajo regional con Brasil y Argentina para conservar al delfín de Lahille (*Tursiops truncatus gephyreus*) en el Atlántico Sur occidental. |
| `/nosotras` | `Nosotras` | El equipo de biólogas y biólogos que investiga a las toninas en la costa de Uruguay. |
| `/publicaciones` | `Publicaciones científicas` | Artículos científicos sobre las toninas de Uruguay: ecología, comportamiento, genética, estructura social y comunicación acústica. |
| `/prensa-y-divulgacion` | `Prensa y divulgación` | Notas de prensa, videos, charlas y materiales de divulgación sobre las toninas y la conservación de la costa uruguaya. |
| `/contacto` | `Contacto` | Escribinos para reportar un avistamiento de toninas, colaborar con el proyecto o consultar sobre nuestras actividades. |

La página con más potencial de tráfico es `/especies`: es la que responde literalmente "qué delfín es este que vi en la costa". Vale la pena que en fase 3 se le agregue una foto de identificación y una sección de preguntas frecuentes.

---

## 7. Checklist de verificación

- [ ] `npm run build` sin errores ni warnings de React
- [ ] Las 10 rutas cargan en el preview de Vercel
- [ ] Ninguna imagen 404 (revisar consola en las tres páginas de `/proyectos`)
- [ ] Celular en modo oscuro: el sitio se ve igual que en modo claro
- [ ] El item activo del navbar sobrevive un F5
- [ ] Menú mobile abre, navega y cierra
- [ ] Cada página tiene su propio `<title>` (verificar en la pestaña)
- [ ] Compartir un link en WhatsApp muestra preview con imagen
- [ ] Lighthouse mobile: Performance > 90, Accessibility > 90
- [ ] `public/` pesa menos de 3 MB

---

## 8. Fuera de alcance en esta fase

No hacer nada de esto todavía, aunque se cruce en el camino:

- Paleta institucional y sistema visual – **fase 2**
- Sección de libros infantiles, noticias, página sobre ballenas y link al formulario de avistamientos – **fase 3**
- Tailwind 4
- Reescribir textos de contenido
