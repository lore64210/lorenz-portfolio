# Estado del refactor — lorenz-portfolio

Fecha: 2026-11-20

## Convenciones adoptadas

- **Componente con archivos propios = carpeta.** Cada componente que necesita estilos o constantes vive en
  `components/<área>/<Componente>/` con `<Componente>.js`, `<Componente>.scss` y `constants.js` cuando aplica.
- **Estilos fuera del JSX.** No queda ningún `style={{ ... }}`. Los valores dinámicos viajan como CSS custom
  properties que se setean por ref (`element.style.setProperty(...)`) y el archivo SCSS decide cómo se pintan.
- **Constantes en archivos de constantes.** Los valores de dominio, timings, breakpoints, links, CV y defaults
  viven en `src/constants/` o en el `constants.js` de cada componente.
- **Estilos globales mínimos.** `src/styles/preview.scss` solo contiene tokens (`:root`), reset, tipografía base,
  utilidades compartidas (`.container`, `.btn`, `.eyebrow`, `.text-link`, `.back-link`, `.section`) y reglas de snap.

## Estructura resultante

```
src/
├─ app/
│  ├─ [lang]/
│  │  ├─ layout.js
│  │  ├─ dictionaries.js
│  │  ├─ dictionaries/{es,en}.json      # solo projects-content
│  │  ├─ (general)/page.js + balls|maze|path-finder|terrain
│  │  └─ (about)/about/page.js
│  ├─ robots.js  sitemap.js
├─ components/
│  ├─ redesign/<Componente>/<Componente>.{js,scss} + constants.js
│  ├─ motion/<Componente>/<Componente>.{js,scss} + constants.js
│  ├─ dancer/
│  │  ├─ DancerCanvas/{DancerCanvas.js,dancer.scss,constants.js}
│  │  ├─ dancerScene.js
│  │  └─ pixelateShader.js
│  └─ miniprojects/
│     ├─ ballsEcosystem|maze|pathFinder|terrain/<...>.{js,scss} + constants.js
│     ├─ P5Container/{P5Container.js,constants.js}
│     ├─ slider/{slider.js,slider.scss,constants.js}
│     ├─ checkbox/{checkbox.js,checkbox.scss}
│     ├─ miniprojects.scss
│     └─ classes/{graphs,maze}
├─ constants/{site,i18n,cv,layout}.js
├─ content/{preview,site}.js + catarsis-collage.json
├─ hooks/{useIsMobile,useWindowSize}.js
├─ lib/locale.js
├─ styles/preview.scss
└─ proxy.js
```

## Código muerto eliminado

- 16 componentes legacy (~860 líneas): `header/*`, `projectCard`, `projectTemplate`, `accordeon*`, `blob`,
  `profilePic`, `aboutContainer`, `withAnimation`, `projectImage`, `playgroundProjectCard`,
  `geneticTravelingSalesman`.
- 13 archivos SCSS legacy (~1.330 líneas): entrypoints `globals|home|project|about.scss`, partials
  `desktop/_d_*`, `mobile/_m_*` y `_vars.scss`.
- 7 assets (~1,2 MB): `next.svg`, `vercel.svg`, `historia-humo.png` y los 4 PNG de perfil viejos.
- Claves muertas de `dictionaries/{es,en}.json` (~45 % de cada archivo).
- Redirect `/traveling-salesman` (apuntaba a una ruta inexistente) y ruta legacy `/[lang]/preview`.
- Algoritmos de grafo sin uso (`depthFirstSearch`, `findPath`, `dijkstra`), métodos y exports sin referencias.
- 6 reglas CSS de clases que ya no existen (`.hero-image`, `.about-image`, `.contact-image`,
  `.about-page-image`, `.playground-subsection`, `.project-media-reveal`) y 2 `@keyframes` huérfanos.

## Bugs corregidos

1. `useWindowSize` usaba `screen.width/height` (tamaño del monitor) en vez de `window.innerWidth/innerHeight`.
2. `P5Container` tenía dependencias incompletas y no redimensionaba el canvas; ahora usa refs para callbacks y
   reacciona a cambios de tamaño.
3. `Maze`/`MazeCell` importaban `CELL_AMOUNT` desde la página (dependencia circular) y `path-finder` usaba una
   grilla distinta a la del grafo. Ahora la clase recibe el tamaño por constructor.
4. `Maze.getCell` recorría todos los vértices con `JSON.stringify`; ahora usa un índice `Map` (`x:y`).
5. A* elegía siempre `openSet[0]` sin ordenar; ahora ordena por `f(n) = g(n) + h(n)`.
6. El locale por defecto era `en` en el proxy y `es` en las páginas; ahora ambos usan `DEFAULT_LOCALE = "es"`.
7. El nombre de descarga del CV no coincidía con el archivo servido; ahora es idéntico.
8. Email y nombre hardcodeados en header/footer/contacto; ahora salen de `constants/site.js`.
9. `aria-label` en español fijo en un sitio bilingüe; ahora usan copy del idioma.
10. `ProjectsSection` asumía exactamente 4 proyectos con índices fijos; ahora renderiza desde `projectItems`.
11. `terrain.js` exportaba una arrow function anónima; ahora es un componente nombrado.

## Verificación

```bash
npm run build      # compila y prerenderiza las 7 rutas
npm audit          # 0 vulnerabilidades
```

Chequeos adicionales usados durante el refactor:

- Grafo de imports desde las entradas de Next: 0 archivos JS inalcanzables.
- Cruce clases SCSS vs JSX/JS: 0 clases sin uso.
- Cruce exports vs imports: 0 exports sin uso (salvo `proxy`/`config`, convención de Next).
- Smoke test con `next start`: `/es`, `/en`, `/es/about`, `/es/balls`, `/es/maze`, `/es/path-finder`,
  `/es/terrain` responden sin errores de consola; el canvas 3D llega a `is-ready`; los canvas de p5 se crean
  con el tamaño correcto; el checkbox de path-finder y los links de idioma funcionan.

Nota: en el navegador de revisión de OpenCode `requestAnimationFrame` e `IntersectionObserver` no se ejecutan
(la pestaña no recibe foco real), así que las animaciones de entrada y el loop de p5 no se pudieron validar
visualmente ahí. La lógica de esas animaciones no cambió; solo se movió el CSS a los archivos de cada componente.
