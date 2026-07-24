import type { MetadataRoute } from "next";
import { verticals } from "./lib/verticals";
import { guides } from "./lib/guides";

const base = "https://machiselect.jp";

export default function sitemap(): MetadataRoute.Sitemap {
  const updatedAt = new Date("2026-07-24");
  return [
    { url: base, lastModified: updatedAt, priority: 1 },
    { url: `${base}/editorial-policy`, lastModified: updatedAt, priority: 0.5 },
    { url: `${base}/privacy`, lastModified: updatedAt, priority: 0.3 },
    { url: `${base}/disclosure`, lastModified: updatedAt, priority: 0.3 },
    { url: `${base}/guides`, lastModified: updatedAt, priority: 0.7 },
    ...guides.map((guide) => ({ url: `${base}/guides/${guide.slug}`, lastModified: new Date(guide.updatedAt), priority: 0.7 })),
    ...verticals.map((vertical) => ({ url: `${base}/compare/${vertical.slug}`, lastModified: updatedAt, priority: 0.8 })),
  ];
}
