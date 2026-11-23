import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { pagesBase } from "../src/lib/deployment";

function allFiles(directory: string): string[] {
  return readdirSync(directory).flatMap(name => {
    const path = resolve(directory, name);
    return statSync(path).isDirectory() ? allFiles(path) : [path];
  });
}

export function verifyPages(directory = ".output/public"): void {
  const root = resolve(directory);
  const required = ["index.html", "404.html", ".nojekyll", "favicon.ico", "robots.txt", ...["piensa", "festin", "conac"].map(id => `pages-media/${id}.webp`)];
  for (const file of required) {
    if (!existsSync(resolve(root, file))) throw new Error(`Missing Pages file: ${file}`);
  }
  const files = allFiles(root);
  if (!files.some(file => file.endsWith(".js")) || !files.some(file => file.endsWith(".css"))) {
    throw new Error("Pages output must contain compiled JavaScript and CSS.");
  }
  for (const file of files.filter(file => /\.(html|css|js)$/.test(file))) {
    const text = readFileSync(file, "utf8");
    const references = file.endsWith(".html")
      ? [...text.matchAll(/(?:src|href)=["']([^"']+)["']/g)].map(match => match[1])
      : file.endsWith(".css")
        ? [...text.matchAll(/url\(\s*["']?([^"')\s]+)["']?\s*\)/g)].map(match => match[1])
        : [...text.matchAll(/(?:from\s*|import\s*\(\s*|import\s*)["'](\.{0,2}\/[^"']+)["']/g)].map(match => match[1]);
    for (const reference of references) {
      if (!reference || /^(?:https?:|data:|blob:|mailto:|tel:|#)/.test(reference)) continue;
      const path = decodeURIComponent(reference.split(/[?#]/)[0] || "");
      if (!path) continue;
      if (path.startsWith("/") && !path.startsWith(pagesBase)) throw new Error(`Root-relative reference outside ${pagesBase}: ${reference}`);
      const local = path.startsWith(pagesBase) ? resolve(root, path.slice(pagesBase.length)) : resolve(dirname(file), path);
      if (local !== root && !local.startsWith(`${root}/`)) throw new Error(`Reference escapes artifact: ${reference}`);
      if (!existsSync(local)) throw new Error(`Missing local resource: ${reference} (in ${file})`);
    }
  }
  const index = readFileSync(resolve(root, "index.html"), "utf8");
  if (!index.includes("Mariel") || !index.includes('id="projects"')) throw new Error("index.html is not the prerendered portfolio.");
  for (const id of ["piensa", "festin", "conac"]) {
    if (!index.includes(`${pagesBase}pages-media/${id}.webp`)) throw new Error(`Missing prerendered project image: ${id}`);
  }
  console.log(`Verified ${files.length} static files in ${directory}.`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) verifyPages(process.argv[2]);