import type { MetadataRoute } from "next";

const marketingRoutes = ["", "/systems", "/process", "/work", "/contact", "/privacy", "/terms", "/accessibility"];

export default function sitemap(): MetadataRoute.Sitemap {
  return marketingRoutes.map((route, index) => ({
    url: `https://onlev.site${route}`,
    lastModified: new Date("2026-08-22"),
    changeFrequency: index === 0 ? "weekly" : "monthly",
    priority: index === 0 ? 1 : route === "/systems" || route === "/work" ? 0.9 : 0.7,
  }));
}
