import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { localizedPath, siteUrl } from "@/lib/seo";

const routes = ["", "/narita-airport-transfer", "/haneda-airport-transfer", "/tokyo-private-driver"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${siteUrl}${localizedPath(locale, route)}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8
    }))
  );
}
