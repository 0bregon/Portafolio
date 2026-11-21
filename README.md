# Mariel Obregón

Implement exactly the screenshot and nothing else

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://mariel-obregon.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/bc49ed09-c75c-48f7-849b-ee051d31667e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## GitHub Pages: 0bregon/Portafolio

The portfolio has an independent static build for `https://0bregon.github.io/Portafolio/`.
TanStack Start, React, Nitro and Lovable's configuration remain in place. Normal
Lovable builds retain their original root path and server error handling.

```sh
bun install --frozen-lockfile
bun run test
bun run build:pages
```

Run the Pages build outside the Lovable sandbox (locally or in Actions). Lovable
intentionally pins its own hosting preset; the script refuses to bypass that guard.
Only the Pages build sets `BUILD_TARGET` and `VITE_DEPLOY_TARGET` to `github-pages`.
Do not set these variables globally in Lovable.

The deployable artifact is `.output/public`, with `index.html`, `404.html`,
`.nojekyll`, CSS, JavaScript, favicon and three original project screenshots.
Generated output is ignored by Git. Captures in `public/pages-media` are deliberate
offline copies for this target; existing Lovable asset pointers are not changed.
Google Fonts and external destinations still require Internet access.

The script checks the HTML and local resources before publication. Actions also
serves this artifact with a file-only server under `/Portafolio/` and uses Chromium
to check language switching, images, menus, anchors, metadata and actual 404s.
To run the same browser check locally, install Python Playwright and Chromium,
then run `python scripts/check-pages.py`. It does not use the application server.

In **0bregon/Portafolio → Settings → Pages**, select **GitHub Actions** as the
source. Enable Actions and allow Pages deployments in the `github-pages`
environment. Each successful push to `main` publishes automatically; pull
requests only validate. Failed checks do not replace the last successful site.
Manual runs are available in the Actions tab. Deployment is restricted to that
repository; this does not connect, disconnect or change Lovable's Git sync.

The workflow never commits generated files, pushes to Git or uses a `gh-pages`
branch. Confirm in Lovable's Git settings that the synced repository and branch
are `0bregon/Portafolio` and `main` if you want Lovable edits to trigger it.
Publishing to Pages does not publish changes to the separate Lovable URL.

Pages runs no application server. Client-side interactions are retained; server
error/CSRF middleware remains for Lovable only. Unknown URLs use a bilingual
static 404 with a link to `/Portafolio/`, not an SPA redirect workaround.
