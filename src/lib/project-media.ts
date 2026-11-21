import roboAsset from "@/assets/robo.webp.asset.json";
import festinAsset from "@/assets/festin.webp.asset.json";
import conacAsset from "@/assets/conac.webp.asset.json";
import { appBase, assetPath, isPages } from "./deployment";

export function projectImage(id: "robo" | "festin" | "conac", pages = isPages, base = appBase): string {
  if (pages) return assetPath(`pages-media/${id}.webp`, base);
  return { robo: roboAsset, festin: festinAsset, conac: conacAsset }[id].url;
}