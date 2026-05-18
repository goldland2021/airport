import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import QuoteBookingSection from "@/components/QuoteBookingSection";
import SeoContent from "@/components/SeoContent";
import Vehicles from "@/components/Vehicles";
import WaitingTimeBanner from "@/components/WaitingTimeBanner";
import { cityPageSlugs, isCitySlug, type CitySlug } from "@/lib/city-routes";
import { getCityPageContent } from "@/lib/city-pages";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import { breadcrumbHomeName, breadcrumbJsonLd, buildPageMetadata, faqJsonLd, serviceJsonLd } from "@/lib/seo";

type CityParams = Promise<{ locale: string; city: string }>;
type CityPageSlug = Exclude<CitySlug, "tokyo">;

export function generateStaticParams() {
  return locales.flatMap((locale) => cityPageSlugs.map((city) => ({ locale, city })));
}

function getValidCity(value: string): CityPageSlug {
  if (!isCitySlug(value) || value === "tokyo") notFound();
  return value;
}

export async function generateMetadata({ params }: { params: CityParams }): Promise<Metadata> {
  const { locale: requestedLocale, city: requestedCity } = await params;
  const locale = isLocale(requestedLocale) ? requestedLocale : "en";
  const city = getValidCity(requestedCity);
  const content = getCityPageContent(locale, city);

  return buildPageMetadata({
    locale,
    path: content.path,
    title: content.meta.title,
    description: content.meta.description,
    keywords: content.meta.keywords,
    image: content.meta.image
  });
}

export default async function CityPage({ params }: { params: CityParams }) {
  const { locale: requestedLocale, city: requestedCity } = await params;
  const locale: Locale = isLocale(requestedLocale) ? requestedLocale : "en";
  const city = getValidCity(requestedCity);
  const dict = getDictionary(locale);
  const content = getCityPageContent(locale, city);
  const booking = {
    ...dict.booking,
    title: content.booking.title,
    subtitle: content.booking.subtitle,
    placeholders: {
      ...dict.booking.placeholders,
      ...content.booking.placeholders
    },
    messageHeader: content.booking.messageHeader
  };

  return (
    <main>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd(content.seo.faqs))
        }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd(locale, [
              { name: breadcrumbHomeName(locale) },
              { name: content.hero.title, path: content.path }
            ])
          )
        }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd(locale, content.hero.title, content.meta.description, content.path))
        }}
      />
      <Hero
        title={content.hero.title}
        subtitle={content.hero.subtitle}
        features={content.hero.features}
        imageSrc={content.hero.imageSrc}
        imageAlt={content.hero.imageAlt}
        ctaLabel={dict.hero.cta}
        locale={locale}
        citySlug={city}
      />

      <QuoteBookingSection
        locale={locale}
        title={content.quote.title}
        subtitle={content.quote.subtitle}
        directNote={content.quote.directNote}
        booking={booking}
        routeAirports={content.routeAirports}
        cityName={content.cityName}
        citySearchName={content.citySearchName}
        defaultAirportId={content.defaultAirportId}
      />

      <section className="section grid-dots">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div>
                <WaitingTimeBanner locale={locale} />
                <div className="mt-4 rounded-lg bg-white/80 p-4">
                  <p className="text-sm leading-6 text-ink/70">{content.waiting.pickupNote}</p>
                  <p className="mt-2 text-sm leading-6 text-ink/70">{content.waiting.delayNote}</p>
                </div>
              </div>

              <div className="rounded-lg border border-clay/60 bg-white/95 p-4 shadow-soft sm:p-6">
                <h3 className="mb-4 text-lg font-semibold">{content.waiting.promiseTitle}</h3>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  {content.waiting.promises.map(([title, copy]) => (
                    <div key={title} className="rounded-lg border border-clay/40 bg-sand/50 p-4">
                      <p className="font-medium">{title}</p>
                      <p className="mt-1 text-sm leading-6 text-ink/60">{copy}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SeoContent locale={locale} content={content.seo} />

      <Vehicles
        title={dict.vehicles.title}
        subtitle={dict.vehicles.subtitle}
        vehicles={dict.vehicles.items}
      />
    </main>
  );
}
