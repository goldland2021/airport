import Footer from "@/components/Footer";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getDictionary, locales, type Locale } from "@/lib/i18n";
import { buildPageMetadata, serviceJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: { locale: Locale };
}) {
  const locale = locales.includes(params.locale) ? params.locale : "en";
  const dict = getDictionary(locale);

  return buildPageMetadata({
    locale,
    title: dict.meta.homeTitle,
    description: dict.meta.homeDescription,
    keywords: dict.meta.keywords
  });
}

export default function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const locale = locales.includes(params.locale) ? params.locale : "en";
  const dict = getDictionary(locale);

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd(locale, dict.hero.title, dict.meta.homeDescription))
        }}
      />
      {children}
      <Footer />
      <WhatsAppButton />
      <LanguageSwitcher />
    </>
  );
}
