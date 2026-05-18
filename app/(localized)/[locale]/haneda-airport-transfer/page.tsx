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
    path: "/haneda-airport-transfer",
    title: dict.meta.hanedaTitle,
    description: dict.meta.hanedaDescription,
    keywords: dict.meta.keywords,
    image: "/images/haneda-airport.jpg"
  });
}

export default async function HanedaPage({ params }: { params: LocaleParams }) {
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
              { name: dict.haneda.sectionTitle, path: "/haneda-airport-transfer" }
            ])
          )
        }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceJsonLd(locale, dict.haneda.sectionTitle, dict.meta.hanedaDescription, "/haneda-airport-transfer")
          )
        }}
      />
      <Hero
        title={dict.haneda.heroTitle}
        subtitle={dict.haneda.heroSubtitle}
        imageSrc="/images/haneda-airport.jpg"
        imageAlt="Haneda airport transfer to Tokyo"
        ctaLabel={dict.hero.cta}
        locale={locale}
        citySlug="tokyo"
      />
      <section className="section">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h2 className="section-title">{dict.haneda.sectionTitle}</h2>
            <p className="section-subtitle">{dict.haneda.travelTime}</p>
          </div>
        </div>
      </section>
      <AirportTransferGuide airport="haneda" locale={locale} />
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
