import { execFileSync, spawn } from "node:child_process";
import { existsSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { renderErrorPage } from "../src/lib/error-page";
import { pagesBase } from "../src/lib/deployment";
import { verifyPages } from "./verify-pages";

// Build tooling runs in Bun/Node on CI, never in the published Worker.
if (process.env["LOVABLE_SANDBOX"] === "1" || process.env["DEV_SERVER__PROJECT_PATH"]) {
  throw new Error("Run build:pages locally or in GitHub Actions. Lovable builds retain the Lovable hosting preset.");
}

// Nitro's static presets cannot build TanStack's SSR entry, so build a Node server
// once, render /Portafolio/ through it, and publish only the static result.
execFileSync("bun", ["run", "build"], {
  stdio: "inherit",
  env: { ...process.env, BUILD_TARGET: "github-pages", VITE_DEPLOY_TARGET: "github-pages", NITRO_PRESET: "node-server" },
});

const output = resolve(".output/public");
const port = "4789";
const server = spawn("node", [".output/server/index.mjs"], { env: { ...process.env, PORT: port, HOST: "127.0.0.1" }, stdio: "inherit" });
try {
  let html = "";
  for (let attempt = 0; attempt < 60 && !html; attempt++) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}${pagesBase}`);
      if (response.status !== 200) throw new Error(`Prerender returned HTTP ${response.status}; static deployment stopped.`);
      html = await response.text();
    } catch (error) {
      if (error instanceof Error && error.message.startsWith("Prerender")) throw error;
      await new Promise(done => setTimeout(done, 500));
    }
  }
  if (!html) throw new Error("Server did not start; static deployment stopped.");
  writeFileSync(resolve(output, "index.html"), html);
} finally {
  server.kill();
}

if (!existsSync(resolve(output, "index.html"))) throw new Error("index.html was not generated.");
writeFileSync(resolve(output, "404.html"), renderErrorPage({ kind: "notFound", basePath: pagesBase }));
writeFileSync(resolve(output, ".nojekyll"), "");
verifyPages(output);
process.exit(0);
