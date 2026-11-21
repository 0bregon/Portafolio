export const pagesBase = "/Portafolio/";

export function normalizeBase(base: string): string {
  return `/${base.split("/").filter(Boolean).join("/")}${base.split("/").filter(Boolean).length ? "/" : ""}`;
}

export function assetPath(path: string, base: string): string {
  return `${normalizeBase(base)}${path.replace(/^\/+/, "")}`;
}

export const appBase = normalizeBase(import.meta.env?.BASE_URL || "/");
export const isPages = import.meta.env?.["VITE_DEPLOY_TARGET"] === "github-pages";