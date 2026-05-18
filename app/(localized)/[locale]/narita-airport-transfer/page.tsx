import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Vehicles from "@/components/Vehicles";
import Booking from "@/components/Booking";
import AirportTransferGuide from "@/components/AirportTransferGuide";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { breadcrumbHomeName, breadcrumbJsonLd, buildPageMetadata, serviceJsonLd } from "@/lib/seo";

type LocaleParams = Promise<{ locale: string }>;

export async function generateMetadata({
  params
}: {
  params: LocaleParams;
}): Promise<Metadata> {
  const { locale: requestedLocale } = await params;
  const locale = isLocale(requestedLocale) ? requestedLocale : "en";
  const dict = getDictionary(locale);

  return buildPageMetadata({
    locale,
    path: "/narita-airport-transfer",
    title: dict.meta.naritaTitle,
    description: dict.meta.naritaDescription,
    keywords: dict.meta.keywords,
    image: "/images/narita-airport.jpg"
  });
}

export default async function NaritaPage({ params }: { params: LocaleParams }) {
  const { locale: requestedLocale } = await params;
  const locale = isLocale(requestedLocale) ? requestedLocale : "en";
  const dict = getDictionary(locale);

  return (
    <main>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd(locale, [
              { name: breadcrumbHomeName(locale) },
              { name: dict.narita.sectionTitle, path: "/narita-airport-transfer" }
            ])
          )
        }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceJsonLd(locale, dict.narita.sectionTitle, dict.meta.naritaDescription, "/narita-airport-transfer")
          )
        }}
      />
      <Hero
        title={dict.narita.heroTitle}
        subtitle={dict.narita.heroSubtitle}
        imageSrc="/images/narita-airport.jpg"
        imageAlt="Narita airport transfer to Tokyo"
        ctaLabel={dict.hero.cta}
        locale={locale}
        citySlug="tokyo"
      />
      <section className="section">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h2 className="section-title">{dict.narita.sectionTitle}</h2>
            <p className="section-subtitle">{dict.narita.travelTime}</p>
          </div>
        </div>
      </section>
      <AirportTransferGuide airport="narita" locale={locale} />
      <Vehicles
        title={dict.vehicles.title}
        subtitle={dict.vehicles.subtitle}
        vehicles={dict.vehicles.items}
      />
      <Booking
        title={dict.booking.title}
        subtitle={dict.booking.subtitle}
        fields={dict.booking.fields}
        placeholders={dict.booking.placeholders}
        buttonLabel={dict.booking.button}
        messageHeader={dict.booking.messageHeader}
      />
    </main>
  );
}
