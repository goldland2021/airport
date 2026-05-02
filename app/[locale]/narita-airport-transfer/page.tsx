import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Vehicles from "@/components/Vehicles";
import Booking from "@/components/Booking";
import { getDictionary, locales, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const locale = locales.includes(params.locale) ? params.locale : "en";
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

export default function NaritaPage({ params }: { params: { locale: Locale } }) {
  const locale = locales.includes(params.locale) ? params.locale : "en";
  const dict = getDictionary(locale);

  return (
    <main>
      <Hero
        title={dict.narita.heroTitle}
        subtitle={dict.narita.heroSubtitle}
        imageSrc="/images/narita-airport.jpg"
        imageAlt="Narita airport transfer to Tokyo"
        ctaLabel={dict.hero.cta}
      />
      <section className="section">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h2 className="section-title">{dict.narita.sectionTitle}</h2>
            <p className="section-subtitle">{dict.narita.travelTime}</p>
          </div>
        </div>
      </section>
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
