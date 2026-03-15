import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Vehicles from "@/components/Vehicles";
import Booking from "@/components/Booking";
import WaitingTimeBanner from "@/components/WaitingTimeBanner";
import { getDictionary, locales, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const locale = locales.includes(params.locale) ? params.locale : "en";
  const dict = getDictionary(locale);

  return {
    title: dict.meta.homeTitle,
    description: dict.meta.homeDescription,
    keywords: dict.meta.keywords
  };
}

export default function HomePage({ params }: { params: { locale: Locale } }) {
  const locale = locales.includes(params.locale) ? params.locale : "en";
  const dict = getDictionary(locale);

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
      
      {/* 第二行：快速预约区域 - 单列布局，手机友好 */}
      <div className="section bg-gradient-to-b from-white to-sand">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* 快速预约标题 */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-ember/10 rounded-full mb-4">
                <span className="text-ember">⚡</span>
                <span className="text-sm font-semibold text-ember">
                  {locale === "zh" ? "快速报价" :
                   locale === "ja" ? "すぐに見積もり" :
                   "Instant Quote"}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                {locale === "zh" ? "立即预约接送服务" : 
                 locale === "ja" ? "すぐに送迎を予約" : 
                 "Book Your Transfer Now"}
              </h2>
              <p className="text-lg text-ink/70 mt-3 max-w-2xl mx-auto">
                {locale === "zh" ? "填写行程信息，立即获取WhatsApp报价" :
                 locale === "ja" ? "旅程の詳細を入力して、WhatsAppですぐに見積もり" :
                 "Fill in your trip details and get instant quote on WhatsApp"}
              </p>
            </div>
            
            {/* 预约接送表单 - 放在最前面 */}
            <div className="mb-12">
              <div className="card p-4 sm:p-6 md:p-8 shadow-lift border-2 border-ember/20 mx-[-0.5rem] sm:mx-0">
                <Booking
                  title={dict.booking.title}
                  subtitle={dict.booking.subtitle}
                  fields={dict.booking.fields}
                  placeholders={dict.booking.placeholders}
                  buttonLabel={dict.booking.button}
                  messageHeader={dict.booking.messageHeader}
                />
                
                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-clay/40">
                  <p className="text-xs sm:text-sm text-ink/60 text-center px-2">
                    {locale === "zh" ? "提交后将在WhatsApp中打开，直接与司机沟通" :
                     locale === "ja" ? "送信後、WhatsAppで開き、ドライバーと直接連絡" :
                     "Opens in WhatsApp after submission to chat directly with driver"}
                  </p>
                </div>
              </div>
            </div>
            
            {/* 服务承诺和等候时间政策 */}
            <div className="space-y-8">
              {/* 等候时间政策横幅 */}
              <div className="card p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                  {locale === "zh" ? "免费等候时间政策" :
                   locale === "ja" ? "無料待機時間ポリシー" :
                   "Free Waiting Time Policy"}
                </h3>
                <WaitingTimeBanner locale={locale} />
                <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-ember/5 rounded-lg">
                  <p className="text-xs sm:text-sm text-ink/70">
                    {locale === "zh" ? "• 等候时间从飞机降落时间（接机）或约定时间（送机）开始计算" :
                     locale === "ja" ? "• 待機時間は飛行機着陸時間（お迎え）または約束時間（お見送り）から計算" :
                     "• Waiting time starts from flight landing (pickup) or scheduled time (drop-off)"}
                  </p>
                  <p className="text-xs sm:text-sm text-ink/70 mt-1 sm:mt-2">
                    {locale === "zh" ? "• 航班延误无需担心，司机会根据实际降落时间调整" :
                     locale === "ja" ? "• フライト遅延も安心、ドライバーが実際の着陸時間に合わせて調整" :
                     "• No worries about flight delays, driver adjusts based on actual landing time"}
                  </p>
                </div>
              </div>
              
              {/* 服务特性卡片 */}
              <div className="card p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
                  {locale === "zh" ? "我们的服务承诺" :
                   locale === "ja" ? "サービス保証" :
                   "Our Service Promise"}
                </h3>
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-white border border-clay/40 rounded-lg sm:rounded-xl">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-ember/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-ember text-base sm:text-lg">⏱️</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm sm:text-base">
                        {locale === "zh" ? "准时到达" :
                         locale === "ja" ? "時間厳守" :
                         "On-time Arrival"}
                      </p>
                      <p className="text-xs sm:text-sm text-ink/60 mt-0.5 sm:mt-1">
                        {locale === "zh" ? "司机提前到达等候，绝不迟到" :
                         locale === "ja" ? "ドライバーが事前に到着、絶対に遅れない" :
                         "Driver arrives early, never late"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-white border border-clay/40 rounded-lg sm:rounded-xl">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-ember/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-ember text-base sm:text-lg">💰</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm sm:text-base">
                        {locale === "zh" ? "透明价格" :
                         locale === "ja" ? "透明な価格" :
                         "Transparent Pricing"}
                      </p>
                      <p className="text-xs sm:text-sm text-ink/60 mt-0.5 sm:mt-1">
                        {locale === "zh" ? "固定价格，无隐藏费用" :
                         locale === "ja" ? "固定料金、隠れた費用なし" :
                         "Fixed pricing, no hidden fees"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-white border border-clay/40 rounded-lg sm:rounded-xl">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-ember/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-ember text-base sm:text-lg">👨‍✈️</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm sm:text-base">
                        {locale === "zh" ? "英语司机" :
                         locale === "ja" ? "英語対応ドライバー" :
                         "English Driver"}
                      </p>
                      <p className="text-xs sm:text-sm text-ink/60 mt-0.5 sm:mt-1">
                        {locale === "zh" ? "专业英语司机，沟通无障碍" :
                         locale === "ja" ? "プロの英語対応ドライバー、スムーズなコミュニケーション" :
                         "Professional English-speaking driver, smooth communication"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-white border border-clay/40 rounded-lg sm:rounded-xl">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-ember/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-ember text-base sm:text-lg">📱</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm sm:text-base">
                        {locale === "zh" ? "即时回复" :
                         locale === "ja" ? "即時返信" :
                         "Instant Reply"}
                      </p>
                      <p className="text-xs sm:text-sm text-ink/60 mt-0.5 sm:mt-1">
                        {locale === "zh" ? "WhatsApp快速响应，24小时服务" :
                         locale === "ja" ? "WhatsAppで迅速対応、24時間サービス" :
                         "Quick response on WhatsApp, 24/7 service"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
      
      {/* 第三行及以后：其他内容 */}
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