# Versión estática del portafolio para GitHub Pages

## Resultado del análisis

La arquitectura actual es compatible, en principio, con una versión estática del portafolio: la única ruta pública es `/`, los datos están en el código y no hay inicio de sesión, consultas a una base de datos, funciones de servidor ni llamadas a una API para mostrar contenido. La compatibilidad definitiva se comprobará con el HTML generado y una prueba servida sin servidor de aplicación.

Versiones instaladas: TanStack Start 1.168.60, TanStack Router 1.170.41, React 19.2, Vite 8.1.5, Nitro 3.0.260603-beta y `@lovable.dev/vite-tanstack-config` 2.27.1. Aunque el proyecto nació con Vite 7, actualmente utiliza Vite 8; no hace falta sustituir ni actualizar estos paquetes para probar el prerenderizado.

La configuración de Lovable admite opciones de prerenderizado de TanStack Start y un preset explícito de Nitro. El Nitro instalado reconoce `github_pages` y genera una salida estática, incluido `.nojekyll`. En Lovable, la integración fija su propio destino de publicación: por eso GitHub Pages se activará mediante un modo de construcción separado, sin modificar la publicación normal de Lovable.

## Funciones y recursos que requieren atención antes de cambiar nada

- El selector ES/EN, menú móvil, enlaces, animaciones y presentación funcionan en el navegador: se conservarán.
- Los envoltorios de errores de SSR y el middleware CSRF requieren un servidor cuando se ejecutan. No se eliminarán: seguirán disponibles en Lovable, pero GitHub Pages no ejecuta estos mecanismos. Para visitas a direcciones inexistentes se preparará un `404.html` estático con regreso al portafolio.
- Las tres capturas actuales usan direcciones relativas de Lovable (`/__l5e/assets-v1/...`), que GitHub Pages no proporciona. Se incluirán copias de las mismas imágenes en el resultado estático, conservando los punteros originales y su uso en Lovable. No se regenerarán ni sustituirán las capturas.
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

## Referencias

- [Nitro: preset y publicación en GitHub Pages](https://nitro.build/deploy/providers/github-pages)
- [Lovable: self-hosting](https://docs.lovable.dev/tips-tricks/self-hosting)