import Hero from "@/components/Hero";
import Vehicles from "@/components/Vehicles";
import QuoteBookingSection from "@/components/QuoteBookingSection";
import WaitingTimeBanner from "@/components/WaitingTimeBanner";
import SeoContent from "@/components/SeoContent";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { breadcrumbHomeName, breadcrumbJsonLd, faqJsonLd, buildPageMetadata, serviceJsonLd } from "@/lib/seo";
import { homeSeoContent } from "@/lib/seo-content";

type LocaleParams = Promise<{ locale: string }>;

const pageLabels = {
  en: {
    eyebrow: "Instant Quote",
    quoteTitle: "Book Your Transfer Now",
    quoteCopy: "Fill in your trip details and get an instant quote on WhatsApp.",
    directNote:
      "Opens in WhatsApp after submission so you can chat directly with the driver. Optional name-sign meet-and-greet at the arrival gate: +2,000 JPY. Please mention it if you want this service.",
    waitTitle: "Free Waiting Time Policy",
    pickupNote: "Waiting time starts from flight landing for pickup, or scheduled time for drop-off.",
    delayNote: "No worries about flight delays. The driver adjusts based on the actual landing time.",
    promiseTitle: "Our Service Promise",
    promises: [
      ["On-time Arrival", "Driver arrives early and waits at the agreed meeting point."],
      ["Transparent Pricing", "Fixed pricing with no hidden fees."],
      ["English Driver", "Professional English-speaking driver for smooth communication."],
      ["Instant Reply", "Quick response on WhatsApp, 24/7 service."]
    ]
  },
  ja: {
    eyebrow: "すぐに見積もり",
    quoteTitle: "今すぐ送迎を予約",
    quoteCopy: "旅程情報を入力すると、WhatsAppですぐに見積もりできます。",
    directNote:
      "送信後、WhatsAppでドライバーと直接やり取りできます。到着ゲートでのネームプレートお迎えはオプション（+2,000円）です。ご希望の場合はメッセージでお知らせください。",
    waitTitle: "無料待機時間ポリシー",
    pickupNote: "お迎えは実際のフライト到着時刻から、お送りは予約時刻から待機時間を計算します。",
    delayNote: "フライト遅延時もご安心ください。到着時刻に合わせてドライバーが調整します。",
    promiseTitle: "サービスのお約束",
    promises: [
      ["時間厳守", "ドライバーが早めに到着し、指定場所でお待ちします。"],
      ["明朗料金", "固定料金で、隠れた追加費用はありません。"],
      ["英語対応", "英語対応ドライバーでスムーズに連絡できます。"],
      ["迅速な返信", "WhatsAppですばやく返信し、24時間対応します。"]
    ]
  },
  zh: {
    eyebrow: "快速報價",
    quoteTitle: "立即預約接送服務",
    quoteCopy: "填寫行程資訊，透過 WhatsApp 快速獲取報價。",
    directNote:
      "提交後會打開 WhatsApp，方便直接和司機溝通。到達口舉牌接機為可選服務，需要時另加 2,000 日元，請在溝通時說明。",
    waitTitle: "免費等候時間政策",
    pickupNote: "接機等待時間從航班實際落地算起，送機從預約時間算起。",
    delayNote: "航班延誤不用擔心，司機會根據實際落地時間調整接機。",
    promiseTitle: "我們的服務承諾",
    promises: [
      ["準時到達", "司機會提前到達，在約定地點等待。"],
      ["價格透明", "固定報價，無隱藏費用。"],
      ["英文司機", "專業英文司機，溝通順暢。"],
      ["即時回覆", "WhatsApp 快速回應，24小時服務。"]
    ]
  }
};

export async function generateMetadata({
  params
}: {
  params: LocaleParams;
}) {
  const { locale: requestedLocale } = await params;
  const locale = isLocale(requestedLocale) ? requestedLocale : "en";
  const dict = getDictionary(locale);

  return buildPageMetadata({
    locale,
    title: dict.meta.homeTitle,
    description: dict.meta.homeDescription,
    keywords: dict.meta.keywords
  });
}

export default async function HomePage({ params }: { params: LocaleParams }) {
  const { locale: requestedLocale } = await params;
  const locale = isLocale(requestedLocale) ? requestedLocale : "en";
  const dict = getDictionary(locale);
  const labels = pageLabels[locale];
  const seoContent = homeSeoContent[locale] ?? homeSeoContent.en;

  return (
    <main>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd(seoContent.faqs))
        }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(locale, [{ name: breadcrumbHomeName(locale) }]))
        }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd(locale, dict.hero.title, dict.meta.homeDescription))
        }}
      />
      <Hero
        title={dict.hero.title}
        subtitle={dict.hero.subtitle}
        features={dict.hero.features}
        imageSrc="/images/tokyo-airport-transfer.jpg"
        imageAlt={dict.hero.imageAlt}
        ctaLabel={dict.hero.cta}
        locale={locale}
        citySlug="tokyo"
      />

      <QuoteBookingSection
        locale={locale}
        title={labels.quoteTitle}
        subtitle={labels.quoteCopy}
        directNote={labels.directNote}
        booking={dict.booking}
      />

      <section className="section grid-dots">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div>
                <WaitingTimeBanner locale={locale} />
                <div className="mt-4 rounded-lg bg-white/80 p-4">
                  <p className="text-sm leading-6 text-ink/70">{labels.pickupNote}</p>
                  <p className="mt-2 text-sm leading-6 text-ink/70">{labels.delayNote}</p>
                </div>
              </div>

              <div className="rounded-lg border border-clay/60 bg-white/95 p-4 shadow-soft sm:p-6">
                <h3 className="mb-4 text-lg font-semibold">{labels.promiseTitle}</h3>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  {labels.promises.map(([title, copy]) => (
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

      <SeoContent locale={locale} />

      <Vehicles
        title={dict.vehicles.title}
        subtitle={dict.vehicles.subtitle}
        vehicles={dict.vehicles.items}
      />
    </main>
  );
}
