import type { MetadataRoute } from "next";
import { verticals } from "./lib/verticals";

const base = "https://machiselect.jp";

export default function sitemap(): MetadataRoute.Sitemap {
  const updatedAt = new Date("2026-07-24");
  return [
    { url: base, lastModified: updatedAt, priority: 1 },
    { url: `${base}/editorial-policy`, lastModified: updatedAt, priority: 0.5 },
    { url: `${base}/privacy`, lastModified: updatedAt, priority: 0.3 },
    { url: `${base}/disclosure`, lastModified: updatedAt, priority: 0.3 },
    ...verticals.map((vertical) => ({ url: `${base}/compare/${vertical.slug}`, lastModified: updatedAt, priority: 0.8 })),
  ];
}
