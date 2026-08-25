import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: ["/", "/systems", "/process", "/work", "/contact", "/privacy", "/terms", "/accessibility"], disallow: ["/showroom/"] },
    ],
    sitemap: "https://onlev.site/sitemap.xml",
    host: "https://onlev.site",
  };
}
