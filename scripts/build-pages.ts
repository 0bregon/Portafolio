import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { renderErrorPage } from "../src/lib/error-page";
import { pagesBase } from "../src/lib/deployment";
import { verifyPages } from "./verify-pages";

// Build tooling runs in Bun/Node on CI, never in the published Worker.
// Lovable intentionally pins its own preset; do not bypass that guard here.
if (process.env["LOVABLE_SANDBOX"] === "1" || process.env["DEV_SERVER__PROJECT_PATH"]) {
  throw new Error("Run build:pages locally or in GitHub Actions. Lovable builds retain the Lovable hosting preset.");
}

execFileSync("bun", ["run", "build"], {
  stdio: "inherit",
  env: { ...process.env, BUILD_TARGET: "github-pages", VITE_DEPLOY_TARGET: "github-pages", NITRO_PRESET: "github_pages" },
});

const output = resolve(".output/public");
if (!existsSync(resolve(output, "index.html"))) {
  throw new Error("TanStack did not generate .output/public/index.html. Static deployment stopped; no fallback HTML will be published.");
}
mkdirSync(output, { recursive: true });
writeFileSync(resolve(output, "404.html"), renderErrorPage({ kind: "notFound", basePath: pagesBase }));
writeFileSync(resolve(output, ".nojekyll"), "");
verifyPages(output);