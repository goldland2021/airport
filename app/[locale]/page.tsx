import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Vehicles from "@/components/Vehicles";
import Booking from "@/components/Booking";
import WaitingTimeBanner from "@/components/WaitingTimeBanner";
import { getDictionary, locales, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

const pageLabels = {
  en: {
    eyebrow: "Instant Quote",
    quoteTitle: "Book Your Transfer Now",
    quoteCopy: "Fill in your trip details and get an instant quote on WhatsApp.",
    directNote: "Opens in WhatsApp after submission to chat directly with the driver.",
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
    quoteTitle: "送迎を今すぐ予約",
    quoteCopy: "旅程情報を入力すると、WhatsAppですぐに見積もりできます。",
    directNote: "送信後、WhatsAppでドライバーと直接やり取りできます。",
    waitTitle: "無料待機時間ポリシー",
    pickupNote: "お迎えは実際のフライト到着時刻から、お送りは予約時刻から待機時間を計算します。",
    delayNote: "フライト遅延時もご安心ください。到着時刻に合わせてドライバーが調整します。",
    promiseTitle: "サービスのお約束",
    promises: [
      ["時間厳守", "ドライバーが早めに到着し、指定場所でお待ちします。"],
      ["明朗料金", "固定料金で、隠れた追加費用はありません。"],
      ["英語対応", "英語対応ドライバーでスムーズに連絡できます。"],
      ["迅速返信", "WhatsAppで素早く返信、24時間対応します。"]
    ]
  },
  zh: {
    eyebrow: "快速报价",
    quoteTitle: "立即预约接送服务",
    quoteCopy: "填写行程信息，通过 WhatsApp 快速获取报价。",
    directNote: "提交后会打开 WhatsApp，方便直接和司机沟通。",
    waitTitle: "免费等待时间政策",
    pickupNote: "接机等待时间从航班实际落地算起，送机从预约时间算起。",
    delayNote: "航班延误不用担心，司机会根据实际落地时间调整接机。",
    promiseTitle: "我们的服务承诺",
    promises: [
      ["准时到达", "司机会提前到达，在约定地点等待。"],
      ["价格透明", "固定报价，无隐藏费用。"],
      ["英文司机", "专业英文司机，沟通顺畅。"],
      ["即时回复", "WhatsApp 快速响应，24小时服务。"]
    ]
  }
};

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

export default function HomePage({ params }: { params: { locale: Locale } }) {
  const locale = locales.includes(params.locale) ? params.locale : "en";
  const dict = getDictionary(locale);
  const labels = pageLabels[locale];

  return (
    <main>
      <Hero
        title={dict.hero.title}
        subtitle={dict.hero.subtitle}
        features={dict.hero.features}
        imageSrc="/images/tokyo-airport-transfer.jpg"
        imageAlt={dict.hero.imageAlt}
        ctaLabel={dict.hero.cta}
      />

      <section className="section bg-gradient-to-b from-white to-sand">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 grid gap-5 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-ember/10 px-4 py-2">
                  <span className="text-sm font-semibold text-ember">{labels.eyebrow}</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{labels.quoteTitle}</h2>
              </div>
              <p className="max-w-2xl text-base leading-7 text-ink/70 md:text-lg">{labels.quoteCopy}</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.18fr_0.82fr] lg:items-start">
              <div className="rounded-2xl border border-ember/20 bg-white p-4 shadow-lift sm:p-6 md:p-8">
                <Booking
                  variant="embedded"
                  title={dict.booking.title}
                  subtitle={dict.booking.subtitle}
                  fields={dict.booking.fields}
                  placeholders={dict.booking.placeholders}
                  buttonLabel={dict.booking.button}
                  messageHeader={dict.booking.messageHeader}
                />
                <p className="mt-5 border-t border-clay/40 pt-4 text-center text-xs text-ink/60 sm:text-sm">
                  {labels.directNote}
                </p>
              </div>

              <div className="space-y-6">
                <div className="rounded-2xl border border-clay/60 bg-white p-4 shadow-soft sm:p-6">
                  <h3 className="mb-4 text-lg font-semibold">{labels.waitTitle}</h3>
                  <WaitingTimeBanner locale={locale} />
                  <div className="mt-4 rounded-xl bg-ember/5 p-4">
                    <p className="text-sm leading-6 text-ink/70">{labels.pickupNote}</p>
                    <p className="mt-2 text-sm leading-6 text-ink/70">{labels.delayNote}</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-clay/60 bg-white p-4 shadow-soft sm:p-6">
                  <h3 className="mb-4 text-lg font-semibold">{labels.promiseTitle}</h3>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                    {labels.promises.map(([title, copy]) => (
                      <div key={title} className="rounded-xl border border-clay/40 bg-sand/50 p-4">
                        <p className="font-medium">{title}</p>
                        <p className="mt-1 text-sm leading-6 text-ink/60">{copy}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Pricing
        title={dict.pricing.title}
        subtitle={dict.pricing.subtitle}
        items={dict.pricing.items}
        itemNote={dict.pricing.itemNote}
      />
      <Vehicles
        title={dict.vehicles.title}
        subtitle={dict.vehicles.subtitle}
        vehicles={dict.vehicles.items}
      />
    </main>
  );
}
