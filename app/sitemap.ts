import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://local-service-finder.vercel.app";
  const updatedAt = new Date("2026-08-10");
  return [
    { url: base,                  lastModified: updatedAt, priority: 1.0 },
    { url: `${base}/privacy`,     lastModified: updatedAt, priority: 0.3 },
    { url: `${base}/disclosure`,  lastModified: updatedAt, priority: 0.3 },
  ];
}
