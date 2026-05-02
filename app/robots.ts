import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/test-contact", "/test-mobile", "/test-waiting-time", "/preview-new-layout"]
    },
    sitemap: `${siteUrl}/sitemap.xml`
  };
}
