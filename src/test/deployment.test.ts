import { describe, expect, it } from "vitest";
import { assetPath, normalizeBase, pagesBase } from "@/lib/deployment";
import { projectImage } from "@/lib/project-media";
import { renderErrorPage } from "@/lib/error-page";
import { verifyPages } from "../../scripts/verify-pages";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

describe("Independent GitHub Pages deployment", () => {
  it("uses /Portafolio/ for local Pages resources", () => {
    expect(pagesBase).toBe("/Portafolio/");
    expect(assetPath("favicon.ico", pagesBase)).toBe("/Portafolio/favicon.ico");
    expect(assetPath("/pages-media/robo.webp", pagesBase)).toBe("/Portafolio/pages-media/robo.webp");
  });
  it("preserves root-relative resources on Lovable", () => {
    expect(normalizeBase("/")).toBe("/");
    expect(assetPath("favicon.ico", "/")).toBe("/favicon.ico");
    expect(projectImage("robo", false, "/")).toBe("/__l5e/assets-v1/be31f491-c498-40d0-aeb0-548af31cd0f0/portfolio-robo.webp");
  });
  it("uses all three local project captures on Pages", () => {
    expect(["robo", "festin", "conac"].map(id => projectImage(id as "robo" | "festin" | "conac", true, pagesBase)))
      .toEqual(["/Portafolio/pages-media/robo.webp", "/Portafolio/pages-media/festin.webp", "/Portafolio/pages-media/conac.webp"]);
  });
  it("returns from the Pages 404 to /Portafolio/ rather than the account root", () => {
    const document = new DOMParser().parseFromString(renderErrorPage({ kind: "notFound", basePath: pagesBase }), "text/html");
    expect(document.querySelector("#home")?.getAttribute("href")).toBe("/Portafolio/");
    expect(document.querySelector("#retry")).toBeNull();
  });
  it("preserves the default server error recovery on Lovable", () => {
    const document = new DOMParser().parseFromString(renderErrorPage(), "text/html");
    expect(document.querySelector("#home")?.getAttribute("href")).toBe("/");
    expect(document.querySelector("#retry")).not.toBeNull();
  });
  it("rejects a static artifact whose resource points outside /Portafolio/", () => {
    const directory = mkdtempSync(join(tmpdir(), "pages-validation-"));
    try {
      mkdirSync(join(directory, "pages-media"));
      for (const file of ["404.html", ".nojekyll", "favicon.ico", "robots.txt", "pages-media/robo.webp", "pages-media/festin.webp", "pages-media/conac.webp", "app.js", "app.css"]) writeFileSync(join(directory, file), "");
      writeFileSync(join(directory, "index.html"), '<link href="/app.css" />');
      expect(() => verifyPages(directory)).toThrow("Root-relative reference outside /Portafolio/");
    } finally { rmSync(directory, { recursive: true, force: true }); }
  });
  it("requires a complete prerendered artifact and rejects missing linked resources", () => {
    const directory = mkdtempSync(join(tmpdir(), "pages-complete-"));
    try {
      mkdirSync(join(directory, "pages-media"));
      for (const file of ["404.html", ".nojekyll", "favicon.ico", "robots.txt", "pages-media/robo.webp", "pages-media/festin.webp", "pages-media/conac.webp", "app.js", "app.css"]) writeFileSync(join(directory, file), "");
      const html = '<h1>Mariel</h1><section id="projects"></section><link href="/Portafolio/app.css" />' +
        ["robo", "festin", "conac"].map(id => `<img src="/Portafolio/pages-media/${id}.webp" />`).join("");
      writeFileSync(join(directory, "index.html"), html);
      expect(() => verifyPages(directory)).not.toThrow();
      rmSync(join(directory, "app.css"));
      writeFileSync(join(directory, "other.css"), "");
      expect(() => verifyPages(directory)).toThrow("Missing local resource: /Portafolio/app.css");
    } finally { rmSync(directory, { recursive: true, force: true }); }
  });
});