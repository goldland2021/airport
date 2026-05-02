import type { Metadata } from "next";
import { locales, type Locale } from "./i18n";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.jpairport.com").replace(/\/$/, "");
export const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "Tokyo Airport Transfer";

export const localeNames: Record<Locale, string> = {
  en: "en_US",
  ja: "ja_JP",
  zh: "zh_CN"
};

export function localizedPath(locale: Locale, path = "") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${normalizedPath === "/" ? "" : normalizedPath}`;
}

export function buildAlternates(locale: Locale, path = "") {
  return {
    canonical: `${siteUrl}${localizedPath(locale, path)}`,
    languages: Object.fromEntries(
      locales.map((locale) => [locale, `${siteUrl}${localizedPath(locale, path)}`])
    )
  };
}

export function buildPageMetadata({
  locale,
  path = "",
  title,
  description,
  keywords,
  image = "/images/tokyo-airport-transfer.jpg"
}: {
  locale: Locale;
  path?: string;
  title: string;
  description: string;
  keywords: string[];
  image?: string;
}): Metadata {
  const url = `${siteUrl}${localizedPath(locale, path)}`;

  return {
    title,
    description,
    keywords,
    alternates: buildAlternates(locale, path),
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: localeNames[locale],
      type: "website",
      images: [
        {
          url: `${siteUrl}${image}`,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}${image}`]
    }
  };
}

export function serviceJsonLd(locale: Locale, title: string, description: string) {
  const currentUrl = `${siteUrl}${localizedPath(locale)}`;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#business`,
    name: siteName,
    url: currentUrl,
    image: `${siteUrl}/images/tokyo-airport-transfer.jpg`,
    telephone: "+81 80-9277-6072",
    priceRange: "$$",
    description,
    areaServed: [
      "Tokyo",
      "Narita Airport",
      "Haneda Airport",
      "Shinjuku",
      "Shibuya",
      "Ginza",
      "Tokyo Disney Resort"
    ],
    serviceType: title,
    availableLanguage: ["English", "Chinese", "Japanese"],
    sameAs: ["https://wa.me/818092776072"]
  };
}
