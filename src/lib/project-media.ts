import piensaAsset from "@/assets/piensa.webp.asset.json";
import festinAsset from "@/assets/festin.webp.asset.json";
import conacAsset from "@/assets/conac.webp.asset.json";
import { appBase, assetPath, isPages } from "./deployment";

export function projectImage(id: "piensa" | "festin" | "conac", pages = isPages, base = appBase): string {
  if (pages) return assetPath(`pages-media/${id}.webp`, base);
  return { piensa: piensaAsset, festin: festinAsset, conac: conacAsset }[id].url;
}