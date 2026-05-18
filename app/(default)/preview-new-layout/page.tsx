"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import Booking from "@/components/Booking";
import WaitingTimeBanner from "@/components/WaitingTimeBanner";
import Pricing from "@/components/Pricing";
import Vehicles from "@/components/Vehicles";

export default function PreviewNewLayoutPage() {
  const [locale, setLocale] = useState<"zh" | "en" | "ja">("zh");
  
  const dict = {
    zh: {
      hero: {
        title: "東京機場接送",
        subtitle: "成田機場與羽田機場專車接送。",
        features: [
          "24小時服務",
          "英文司機",
          "到達口舉牌接機",
          "透明固定價格",
          "接機免費等候90分鐘（從飛機降落算起）",
          "送機免費等候30分鐘"
        ],
        cta: "WhatsApp 獲取報價",
        imageAlt: "東京機場接送專車服務"
      },
      services: {
        title: "機場接送服務",
        subtitle: "固定價格，舉牌接機，安心省心。",
        items: [
          "成田機場 → 東京酒店",
          "羽田機場 → 東京酒店",
          "東京 → 成田機場",
          "東京 → 羽田機場"
        ],
        itemNote: "點對點直達，準時安心。"
      },
      booking: {
        title: "預約接送",
        subtitle: "發送行程資訊，WhatsApp 迅速報價。",
        fields: {
          airport: "機場",
          flight: "航班號",
          hotel: "酒店",
          passengers: "人數",
          luggage: "行李"
        },
        placeholders: {
          airport: "成田 或 羽田",
          flight: "JL123",
          hotel: "新宿酒店",
          passengers: "2",
          luggage: "3 個行李箱"
        },
        button: "透過 WhatsApp 發送",
        messageHeader: "您好，我需要機場接送"
      },
      pricing: {
        title: "價格參考",
        subtitle: "透明固定價格，無隱藏費用。",
        items: [
          { route: "成田 → 東京", price: "$120 起" },
          { route: "羽田 → 東京", price: "$80 起" }
        ],
        itemNote: "包含接機舉牌服務。"
      }
    },
    en: {
      hero: {
        title: "Tokyo Airport Transfer",
        subtitle: "Private airport pickup from Narita Airport and Haneda Airport.",
        features: [
          "24 hour service",
          "English speaking driver",
          "Meet and greet at arrival gate",
          "Fixed transparent pricing",
          "Pickup: 90 min free waiting (from flight landing)",
          "Drop-off: 30 min free waiting"
        ],
        cta: "Get Quote on WhatsApp",
        imageAlt: "Tokyo airport transfer luxury pickup"
      },
      services: {
        title: "Airport Transfer Services",
        subtitle: "Reliable, private transport with fixed pricing and meet-and-greet service.",
        items: [
          "Narita Airport → Tokyo Hotel",
          "Haneda Airport → Tokyo Hotel",
          "Tokyo → Narita Airport",
          "Tokyo → Haneda Airport"
        ],
        itemNote: "Door-to-door, on time, and stress free."
      },
      booking: {
        title: "Book Your Transfer",
        subtitle: "Send your trip details and get a fast quote on WhatsApp.",
        fields: {
          airport: "Airport",
          flight: "Flight number",
          hotel: "Hotel",
          passengers: "Passengers",
          luggage: "Luggage"
        },
        placeholders: {
          airport: "Narita or Haneda",
          flight: "JL123",
          hotel: "Shinjuku Hotel",
          passengers: "2",
          luggage: "3 suitcases"
        },
        button: "Send on WhatsApp",
        messageHeader: "Hello I need airport transfer"
      },
      pricing: {
        title: "Price Guide",
        subtitle: "Fixed transparent pricing with no surprise fees.",
        items: [
          { route: "Narita → Tokyo", price: "from $120+" },
          { route: "Haneda → Tokyo", price: "from $80+" }
        ],
        itemNote: "Includes meet and greet."
      }
    },
    ja: {
      hero: {
        title: "東京空港送迎",
        subtitle: "成田空港・羽田空港からのプライベート送迎。",
        features: [
          "24時間対応",
          "英語対応ドライバー",
          "到着ゲートでお出迎え",
          "明朗な固定料金",
          "空港お迎え: 90分無料待機（飛行機着陸時から）",
          "空港お見送り: 30分無料待機"
        ],
        cta: "WhatsAppで見積もり",
        imageAlt: "東京 空港送迎のプライベートピックアップ"
      },
      services: {
        title: "空港送迎サービス",
        subtitle: "固定料金とミート＆グリート付きの安心プライベート送迎。",
        items: [
          "成田空港 → 東京ホテル",
          "羽田空港 → 東京ホテル",
          "東京 → 成田空港",
          "東京 → 羽田空港"
        ],
        itemNote: "ドアツードアで安心してご利用いただけます。"
      },
      booking: {
        title: "送迎を予約する",
        subtitle: "詳細を送って、WhatsAppで素早く見積もりを受け取れます。",
        fields: {
          airport: "空港",
          flight: "便名",
          hotel: "ホテル",
          passengers: "人数",
          luggage: "荷物"
        },
        placeholders: {
          airport: "成田 or 羽田",
          flight: "JL123",
          hotel: "新宿のホテル",
          passengers: "2",
          luggage: "スーツケース3個"
        },
        button: "WhatsAppで送信",
        messageHeader: "空港送迎をお願いします"
      },
      pricing: {
        title: "料金目安",
        subtitle: "追加料金なしの明朗価格。",
        items: [
          { route: "成田 → 東京", price: "$120 から" },
          { route: "羽田 → 東京", price: "$80 から" }
        ],
        itemNote: "ミート＆グリート込み。"
      }
    }
  };

  const currentDict = dict[locale];

  return (
    <div className="min-h-screen bg-sand">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">新佈局預覽</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setLocale("zh")}
              className={`px-4 py-2 rounded-lg ${locale === "zh" ? "bg-ember text-white" : "bg-white border"}`}
            >
              中文
            </button>
            <button
              onClick={() => setLocale("en")}
              className={`px-4 py-2 rounded-lg ${locale === "en" ? "bg-ember text-white" : "bg-white border"}`}
            >
              English
            </button>
            <button
              onClick={() => setLocale("ja")}
              className={`px-4 py-2 rounded-lg ${locale === "ja" ? "bg-ember text-white" : "bg-white border"}`}
            >
              日本語
            </button>
          </div>
        </div>

        <div className="mb-8 p-4 bg-white rounded-lg border">
          <h2 className="text-xl font-semibold mb-2">佈局說明</h2>
          <p className="text-ink/70">
            已將&quot;預約接送&quot;表單調整到第二行，放在&quot;東京機場接送&quot;標題下面。
            表單現在更加突出，用戶無需滾動就能看到並立即預訂。
          </p>
        </div>

        {/* 模擬實際頁面佈局 */}
        <div className="border-2 border-dashed border-ember/30 rounded-2xl p-2">
          <main>
            {/* 第一行：Hero區域 */}
            <section className="mb-8">
              <h3 className="text-lg font-semibold mb-2 text-ink/60">第一行: Hero區域</h3>
              <Hero
                title={currentDict.hero.title}
                subtitle={currentDict.hero.subtitle}
                features={currentDict.hero.features}
                imageSrc="/images/tokyo-airport-transfer.jpg"
                imageAlt={currentDict.hero.imageAlt}
                ctaLabel={currentDict.hero.cta}
              />
            </section>

            {/* 第二行：快速預約區域 - 單列布局，手機友好 */}
            <section className="mb-8">
              <h3 className="text-lg font-semibold mb-2 text-ink/60">第二行: 快速預約區域（單列布局）</h3>
              
              <div className="bg-gradient-to-b from-white to-sand rounded-2xl p-6">
                <div className="max-w-4xl mx-auto">
                  {/* 快速預約標題 */}
                  <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-ember/10 rounded-full mb-4">
                      <span className="text-ember">⚡</span>
                      <span className="text-sm font-semibold text-ember">
                        {locale === "zh" ? "快速報價" :
                         locale === "ja" ? "すぐに見積もり" :
                         "Instant Quote"}
                      </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                      {locale === "zh" ? "立即預約接送服務" : 
                       locale === "ja" ? "すぐに送迎を予約" : 
                       "Book Your Transfer Now"}
                    </h2>
                    <p className="text-lg text-ink/70 mt-3 max-w-2xl mx-auto">
                      {locale === "zh" ? "填寫行程資訊，立即獲取WhatsApp報價" :
                       locale === "ja" ? "旅程の詳細を入力して、WhatsAppですぐに見積もり" :
                       "Fill in your trip details and get instant quote on WhatsApp"}
                    </p>
                  </div>
                  
                  {/* 預約接送表單 - 放在最前面 */}
                  <div className="mb-12">
                    <div className="card p-6 md:p-8 shadow-lift border-2 border-ember/20">
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold">{currentDict.booking.title}</h3>
                        <p className="text-ink/70 mt-2">{currentDict.booking.subtitle}</p>
                      </div>
                      
                      <Booking
                        title=""
                        subtitle=""
                        fields={currentDict.booking.fields}
                        placeholders={currentDict.booking.placeholders}
                        buttonLabel={currentDict.booking.button}
                        messageHeader={currentDict.booking.messageHeader}
                      />
                    </div>
                  </div>
                  
                  {/* 服務承諾和等候時間政策 */}
                  <div className="space-y-8">
                    {/* 等候時間政策橫幅 */}
                    <div className="card p-6">
                      <h3 className="text-xl font-semibold mb-4">
                        {locale === "zh" ? "免費等候時間政策" :
                         locale === "ja" ? "無料待機時間ポリシー" :
                         "Free Waiting Time Policy"}
                      </h3>
                      <WaitingTimeBanner locale={locale} />
                    </div>
                    
                    {/* 服務特性卡片 */}
                    <div className="card p-6">
                      <h3 className="text-xl font-semibold mb-6">
                        {locale === "zh" ? "我們的服務承諾" :
                         locale === "ja" ? "サービス保証" :
                         "Our Service Promise"}
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3 p-4 bg-white border border-clay/40 rounded-xl">
                          <div className="w-10 h-10 rounded-full bg-ember/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-ember text-lg">⏱️</span>
                          </div>
                          <div>
                            <p className="font-medium">
                              {locale === "zh" ? "準時到達" :
                               locale === "ja" ? "時間厳守" :
                               "On-time Arrival"}
                            </p>
                            <p className="text-sm text-ink/60 mt-1">
                              {locale === "zh" ? "司機提前到達等候" :
                               locale === "ja" ? "ドライバーが事前に到着" :
                               "Driver arrives early"}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3 p-4 bg-white border border-clay/40 rounded-xl">
                          <div className="w-10 h-10 rounded-full bg-ember/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-ember text-lg">💰</span>
                          </div>
                          <div>
                            <p className="font-medium">
                              {locale === "zh" ? "透明價格" :
                               locale === "ja" ? "透明な価格" :
                               "Transparent Pricing"}
                            </p>
                            <p className="text-sm text-ink/60 mt-1">
                              {locale === "zh" ? "無隱藏費用" :
                               locale === "ja" ? "隠れた費用なし" :
                               "No hidden fees"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </section>

            {/* 第三行及以後：其他內容 */}
            <section className="space-y-8">
              <h3 className="text-lg font-semibold mb-2 text-ink/60">第三行及以後: 其他內容</h3>
              
              <Pricing
                title={currentDict.pricing.title}
                subtitle={currentDict.pricing.subtitle}
                items={currentDict.pricing.items}
                itemNote={currentDict.pricing.itemNote}
              />
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold mb-4">車型展示</h4>
                  <div className="card p-6">
                    <p className="text-ink/70">車輛圖片和描述...</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4">用戶評價</h4>
                  <div className="card p-6">
                    <p className="text-ink/70">客戶評價內容...</p>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>

        <div className="mt-8 p-6 bg-white rounded-xl border">
          <h3 className="text-xl font-semibold mb-4">佈局改進總結</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">✅ 改進前的問題</h4>
              <ul className="space-y-2 text-sm text-ink/70">
                <li>• 預約表單在頁面很靠下的位置</li>
                <li>• 用戶需要滾動才能找到預訂入口</li>
                <li>• 轉化率可能較低</li>
                <li>• 不夠突出重要功能</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🚀 改進後的優勢</h4>
              <ul className="space-y-2 text-sm text-ink/70">
                <li>• 預約表單在第二行，非常顯眼</li>
                <li>• 用戶無需滾動即可立即預訂</li>
                <li>• 提高轉化率和用戶體驗</li>
                <li>• 表單區域視覺突出，吸引注意力</li>
                <li>• 與服務政策並列，建立信任</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-ember/5 rounded-lg">
            <h4 className="font-semibold mb-2">📱 移動端優化</h4>
            <p className="text-sm text-ink/70">
              新佈局在移動設備上會自動調整，表單會顯示在服務政策下方，
              但仍然在很靠前的位置，確保移動用戶也能輕鬆找到預訂入口。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
