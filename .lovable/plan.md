# Versión estática del portafolio para GitHub Pages

## Resultado del análisis

La arquitectura actual es compatible, en principio, con una versión estática del portafolio: la única ruta pública es `/`, los datos están en el código y no hay inicio de sesión, consultas a una base de datos, funciones de servidor ni llamadas a una API para mostrar contenido. Se verificará el HTML generado sin servidor de aplicación.

Versiones instaladas: TanStack Start 1.168.60, TanStack Router 1.170.41, React 19.2, Vite 8.1.5, Nitro 3.0.260603-beta y `@lovable.dev/vite-tanstack-config` 2.27.1. No se actualizarán ni sustituirán paquetes.

La configuración de Lovable admite opciones de prerenderizado de TanStack Start y un preset explícito de Nitro. El Nitro instalado reconoce `github_pages` y genera una salida estática, incluido `.nojekyll`. En Lovable, la integración fija su propio destino de publicación: por eso GitHub Pages se activará mediante un modo de construcción separado, sin modificar la publicación normal de Lovable.

## Límites y recursos que requieren atención

Todavía no se ha generado ni probado la versión estática. Los envoltorios de SSR y CSRF requieren servidor: quedarán intactos para Lovable, pero Pages no los ejecuta. Las interacciones del portafolio no llaman a funciones de servidor.

Las tres capturas usan `/__l5e/assets-v1/...` y su acceso anónimo en el sitio publicado devuelve HTTP 403. Se exportarán los bytes originales desde la vista previa autorizada y se incluirán copias locales; se preservarán los punteros originales. Actions no necesitará tokens de Lovable. Si no se puede exportar una captura, se informará antes de sustituirla.

Google Fonts y enlaces externos seguirán dependiendo de Internet. El reporte opcional de errores de Lovable no tendrá efecto fuera de su plataforma si sus helpers no están presentes. No se eliminará la integración.

## Archivos que se modificarán

| Archivo | Cambio previsto |
| --- | --- |
| `vite.config.ts` | Activar preset, base y prerenderizado únicamente para la construcción de Pages. Conservar `defineConfig` de Lovable y `server.entry`. |
| `package.json` | Añadir `build:pages`; mantener los comandos y versiones actuales. |
| `src/router.tsx` | Usar la base del destino, `/` en Lovable y `/Portafolio/` en Pages. |
| `src/routes/__root.tsx` | Resolver favicon y enlaces de regreso con la base correcta; mantener el diseño y los mensajes traducidos. |
| `src/components/project-card.tsx` | Obtener las mismas imágenes desde un módulo que elige entre punteros de Lovable y copias locales de Pages. No cambiar textos, componentes visuales ni enlaces de proyectos. |
| `src/lib/error-page.ts` | Permitir generar un 404 estático traducible con enlace a `/Portafolio/`, sin alterar el comportamiento predeterminado del error de servidor en Lovable. |
| `.github/workflows/deploy.yml` | Sustituir los pasos de ejemplo por pruebas, construcción, validación y despliegue de Pages. |
| `src/test/app-routing.test.tsx` | Añadir comprobaciones de que la ruta principal se resuelve bajo ambas bases. |
| `README.md` | Añadir instrucciones de Pages sin retirar la información de Lovable. |
| `AGENTS.md`, `roadmap.md` | Registrar la separación entre destinos y las comprobaciones realizadas. |

## Archivos que se crearán

- `src/lib/deployment.ts`: base y destino comunes para recursos y enlaces; configuración de construcción, no preferencias guardadas del visitante.
- `src/lib/project-media.ts`: selección centralizada de URLs de las capturas según el destino.
- `public/pages-media/robo.webp`, `festin.webp`, `conac.webp`: copias idénticas de las tres capturas actuales, sin credenciales ni cambios visuales.
- `scripts/build-pages.ts`: coordinar la construcción específica y la preparación del 404.
- `scripts/verify-pages.ts`: validar estructura del artefacto y referencias locales antes de publicarlo.
- `src/test/deployment.test.ts`: comprobar las bases y su uso en enlaces y recursos.

`index.html`, `404.html`, `.nojekyll`, CSS y JavaScript compilados serán **archivos generados**, no nuevas páginas fuente ni archivos que el workflow escriba en `main`. No se editarán `src/routeTree.gen.ts`, `.lovable/project.json`, `src/server.ts`, `src/start.ts`, los punteros `.asset.json`, el diccionario de contenido ni los estilos generales. No se añadirán otros frameworks ni plugins duplicados.

## Configuración técnica del prerenderizado

`build:pages` establecerá `BUILD_TARGET=github-pages` y `VITE_DEPLOY_TARGET=github-pages` solo durante esa construcción. La configuración de Lovable seguirá recibiendo sus opciones mediante `defineConfig`; no se reemplazará por una configuración Vite independiente.

Opciones previstas para el destino Pages:

```ts
nitro: { preset: "github_pages" },
vite: { base: "/Portafolio/" },
tanstackStart: {
  server: { entry: "server" },
  router: { basepath: "/Portafolio" },
  pages: [{ path: "/Portafolio/" }],
  prerender: {
    enabled: true,
    autoStaticPathsDiscovery: false,
    crawlLinks: false,
    failOnError: true,
    concurrency: 1,
  },
}
```

SSR producirá el HTML una vez; después React lo hidratará. La ruta fuente seguirá siendo `/`, sin duplicarla. El prerenderizador instalado elimina el prefijo al escribir el documento; se comprobará que `index.html` quede en la raíz del artefacto.

La construcción normal de Lovable mantendrá base `/`, entrada de servidor y preset habitual, sin activar estas opciones de Pages. Las variables de Pages no se guardarán como secretos ni configuración global de Lovable.

## Recursos y comprobación de `/Portafolio/`

- Vite generará URLs de CSS y JavaScript con su `base`; no se corregirá el HTML con reemplazos globales posteriores.
- El código compartido utilizará `import.meta.env.BASE_URL`. Para Pages, una captura local se resolverá como `/Portafolio/pages-media/robo.webp`; el favicon como `/Portafolio/favicon.ico`. Para Lovable, permanecerán sus URLs actuales.
- El workflow publicará únicamente el directorio público estático de Nitro, previsto como `.output/public`. Si Nitro y TanStack dejan archivos en lugares distintos, el script ensamblará un artefacto único sin duplicar el prefijo; la ruta final se fijará tras comprobar la salida real.
- La validación exigirá `index.html`, `404.html`, `.nojekyll`, los tres WebP, favicon y los recursos referenciados; también comprobará chunks cargados después de hidratar. No basta con que exista `index.html`.
- Se probará con un servidor de archivos montado en `/Portafolio/`, sin SSR ni fallback automático a la página inicial. Se revisarán respuestas 404 de recursos, errores de consola, imágenes decodificadas, cambio ES/EN, menú móvil y anclas. Google Fonts y los enlaces externos conservarán su dependencia de Internet; esto no será una versión offline completa.

## Navegación y páginas de error

Las anclas `#about`, `#projects`, `#skills`, `#education`, `#experience`, `#contact` y `#top` continuarán en la misma página bajo `/Portafolio/`. TanStack Router tendrá el mismo prefijo que TanStack Start. Los enlaces de regreso usarán esa base, no `/` del dominio de GitHub.

GitHub Pages sirve `404.html` cuando se solicita una dirección inexistente. Se generará un documento independiente usando las traducciones existentes, español inicial, selector ES/EN y enlace al inicio correcto. No se añadirá `HashRouter`, un redireccionamiento SPA para ocultar todos los 404 ni una ruta ficticia en TanStack.

Los errores de React después de hidratar conservarán el componente de error actual. Los errores de servidor/CSRF no se pueden ejecutar en Pages: su código quedará intacto para Lovable. Un fallo durante el prerenderizado bloqueará el despliegue, no publicará una página incompleta.

## Workflow y sincronización

**Sí: cada `push` a `main` construirá y, si todas las comprobaciones pasan, publicará automáticamente.** También habrá ejecución manual. Las pull requests ejecutarán comprobaciones sin desplegar; un fallo conservará la última publicación válida.

El workflow usará Node compatible con Vite 8, Bun con versión fijada, `bun install --frozen-lockfile`, pruebas, `build:pages`, validación, `actions/upload-pages-artifact` y `actions/deploy-pages`. Se habilitará concurrencia para evitar publicaciones simultáneas y se usará el entorno `github-pages`. Necesita Actions y **Settings → Pages → Source: GitHub Actions** habilitados; las reglas del entorno pueden exigir aprobación.

**Los cambios no modificarán la conexión ni el mecanismo de sincronización de Lovable.** Actions no hará commits, pushes ni cambios de rama: publicará un artefacto, no reemplazará el código por archivos compilados ni utilizará una rama `gh-pages`. La publicación de Lovable seguirá siendo independiente: un despliegue en Pages no publica cambios en la URL de Lovable.

No puedo confirmar desde el código que el repositorio actualmente sincronizado sea `0bregon/Portafolio`; eso se comprueba en la sección Git de Lovable. Si ya es ese repositorio y la rama sincronizada es `main`, sus actualizaciones podrán disparar el workflow. Si es otro repositorio, este plan no cambiará la conexión ni prometerá sincronización automática entre dos repositorios.

## Funcionalidades conservadas y criterio de aceptación

Se conservarán el contenido, las siete secciones, diseño, estilos, animaciones, componentes, español inicial, cambio ES/EN, títulos y descripciones traducidos, menú móvil, anclas, imágenes auténticas, tecnologías, enlaces externos y ausencia de un currículum inventado. La conservación se verificará, no se dará por garantizada antes de generar y probar el artefacto.

La única diferencia prevista es la plataforma que atiende errores de direcciones y servidor, explicada arriba. No hay actualmente una funcionalidad de negocio dependiente del servidor que sea necesario eliminar. Si aparece un obstáculo no previsto, se detendrá esa modificación y se explicará antes de sustituir funcionalidades.
