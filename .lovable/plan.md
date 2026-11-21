# Versión estática del portafolio para GitHub Pages

## Resultado del análisis

La arquitectura actual es compatible, en principio, con una versión estática del portafolio: la única ruta pública es `/`, los datos están en el código y no hay inicio de sesión, consultas a una base de datos, funciones de servidor ni llamadas a una API para mostrar contenido. La compatibilidad definitiva se comprobará con el HTML generado y una prueba servida sin servidor de aplicación.

Versiones instaladas: TanStack Start 1.168.60, TanStack Router 1.170.41, React 19.2, Vite 8.1.5, Nitro 3.0.260603-beta y `@lovable.dev/vite-tanstack-config` 2.27.1. Aunque el proyecto nació con Vite 7, actualmente utiliza Vite 8; no hace falta sustituir ni actualizar estos paquetes para probar el prerenderizado.

La configuración de Lovable admite opciones de prerenderizado de TanStack Start y un preset explícito de Nitro. El Nitro instalado reconoce `github_pages` y genera una salida estática, incluido `.nojekyll`. En Lovable, la integración fija su propio destino de publicación: por eso GitHub Pages se activará mediante un modo de construcción separado, sin modificar la publicación normal de Lovable.

## Funciones y recursos que requieren atención antes de cambiar nada

- El selector ES/EN, menú móvil, enlaces, animaciones y presentación funcionan en el navegador: se conservarán.
- Los envoltorios de errores de SSR y el middleware CSRF requieren un servidor cuando se ejecutan. No se eliminarán: seguirán disponibles en Lovable, pero GitHub Pages no ejecuta estos mecanismos. Para visitas a direcciones inexistentes se preparará un `404.html` estático con regreso al portafolio.
- Las tres capturas actuales usan direcciones relativas de Lovable (`/__l5e/assets-v1/...`), que GitHub Pages no proporciona. El acceso anónimo a esas tres direcciones en el sitio publicado devuelve HTTP 403. Se exportarán los bytes originales desde el acceso autorizado de la vista previa y se guardarán copias locales para Pages; los punteros originales y su uso en Lovable se conservarán. GitHub Actions no necesitará tokens de Lovable ni descargar imágenes privadas.
- Las fuentes de Google seguirán siendo externas, como ahora. Los destinos de GitHub, LinkedIn y demos permanecerán intactos; publicar el portafolio no traslada esas aplicaciones.
- El reporte de errores se conservará; fuera de Lovable sus llamadas opcionales no tendrán efecto si la plataforma no está presente.

## Cambios propuestos

1. **Construcción separada para Pages.** Añadir un comando específico y configurar `nitro: { preset: "github_pages" }` exclusivamente para ese destino, manteniendo `@lovable.dev/vite-tanstack-config`, los plugins actuales y la entrada de servidor.
2. **Prerenderizado explícito.** Renderizar la única página pública en la construcción estática, con descubrimiento automático desactivado. No añadir páginas duplicadas para los idiomas; español seguirá siendo el idioma inicial.
3. **Base `/Portafolio/`.** Coordinar la base de recursos de Vite, la configuración de TanStack Start y el `basepath` de TanStack Router. Ajustar favicon, regreso al inicio y recursos locales para que no apunten al dominio raíz. Los enlaces internos por anclas y los externos se conservarán.
4. **Imágenes y error estático.** Empaquetar las capturas auténticas y generar el documento 404 sin depender de los servicios de Lovable en GitHub Pages. Verificar el directorio de salida real, evitando publicar una carpeta anidada que provoque `/Portafolio/Portafolio/`.
5. **GitHub Actions.** Reemplazar únicamente el workflow de ejemplo actual por instalación reproducible con Bun, pruebas, construcción estática, comprobación de archivos y publicación del artefacto mediante las acciones oficiales de Pages. Publicar desde `main`, permitir ejecución manual y separar permisos de lectura/construcción de los de publicación (`pages: write`, `id-token: write`).
6. **Verificación.** Comprobar `index.html`, `404.html`, `.nojekyll`, JavaScript, CSS, favicon e imágenes; detectar referencias locales faltantes. Probar el resultado bajo `/Portafolio/` en escritorio y móvil: carga inicial, imágenes, ES/EN, menú, anclas, enlaces externos y regreso desde 404. Confirmar que la vista previa normal de Lovable continúa funcionando.
7. **Instrucciones de publicación.** Documentar el directorio del artefacto y la selección de **Settings → Pages → Source: GitHub Actions** en `0bregon/Portafolio`. No conectar ni sustituir automáticamente el repositorio sincronizado de Lovable.

## Límites de la verificación

Todavía no se ha construido ni publicado la versión estática. La comprobación del directorio generado se realizará al implementar el plan; la verificación de una ejecución real de GitHub Actions dependerá del acceso al repositorio y de que Pages esté habilitado. Si el prerenderizado de estas versiones falla, se informará del error y se mantendrá la arquitectura existente: no se convertirá el proyecto en otra aplicación ni se eliminarán funcionalidades.

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

La construcción ejecutará SSR **una vez** para producir HTML; después React hidratará la página y mantendrá las interacciones. La ruta fuente seguirá siendo `/`: el prefijo se configura en el router, no se crea otra ruta `/Portafolio`. La lista explícita evita rastrear enlaces a otros proyectos. El prerenderizador instalado elimina el prefijo del nombre de archivo al escribir el documento; se verificará que el `index.html` quede en la raíz del artefacto publicado.

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

## Referencias

- [Nitro: preset y publicación en GitHub Pages](https://nitro.build/deploy/providers/github-pages)
- [Lovable: self-hosting](https://docs.lovable.dev/tips-tricks/self-hosting)