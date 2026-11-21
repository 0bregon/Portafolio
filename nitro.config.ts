import { defineNitroConfig } from "nitro/config";

// TanStack owns page prerendering; the github_pages preset otherwise crawls
// / and /404.html again, outside the project's /Portafolio/ router base.
export default defineNitroConfig(process.env["BUILD_TARGET"] === "github-pages" ? {
  prerender: { crawlLinks: false },
  hooks: { "prerender:routes": routes => { routes.clear(); } },
} : {});