import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WaitingTimeBanner from "@/components/WaitingTimeBanner";
import ServicePolicy from "@/components/ServicePolicy";
import Booking from "@/components/Booking";

export default function TestWaitingTimePage() {
  const services = [
    "成田機場 → 東京酒店",
    "羽田機場 → 東京酒店", 
    "東京 → 成田機場",
    "東京 → 羽田機場"
  ];

  return (
    <div className="min-h-screen bg-sand">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">等候時間政策測試頁面</h1>
        
        <div className="grid gap-12">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Hero組件中的等候時間特性</h2>
            <Hero
              title="東京機場接送"
              subtitle="成田機場與羽田機場專車接送。"
              features={[
                "24小時服務",
                "英文司機", 
                "到達口舉牌接機",
                "透明固定價格",
                "接機免費等候90分鐘（從飛機降落算起）",
                "送機免費等候30分鐘"
              ]}
              imageSrc="/images/tokyo-airport-transfer.jpg"
              imageAlt="東京機場接送"
            />
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Services組件中的等候時間說明</h2>
            <Services
              title="機場接送服務"
              subtitle="固定價格，舉牌接機，安心省心。"
              services={services}
              itemNote="點對點直達，準時安心。"
              locale="zh"
            />
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">3. 等候時間政策橫幅</h2>
            <div className="grid gap-4">
              <WaitingTimeBanner locale="zh" />
              <WaitingTimeBanner locale="en" />
              <WaitingTimeBanner locale="ja" />
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">4. 完整的服務政策組件</h2>
            <ServicePolicy />
            <div className="mt-8 max-w-md">
              <ServicePolicy compact />
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">5. 預訂表單與等候時間提示</h2>
            <div className="mb-8">
              <WaitingTimeBanner locale="zh" />
            </div>
            <Booking />
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">6. 多語言測試</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <h3 className="text-lg font-semibold mb-3">中文版本</h3>
                <div className="space-y-4">
                  <div className="text-sm p-3 bg-white rounded-lg border">
                    <p className="font-medium">接機服務</p>
                    <p className="text-ember">免費等候90分鐘（從飛機降落算起）</p>
                  </div>
                  <div className="text-sm p-3 bg-white rounded-lg border">
                    <p className="font-medium">送機服務</p>
                    <p className="text-ember">免費等候30分鐘</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">English Version</h3>
                <div className="space-y-4">
                  <div className="text-sm p-3 bg-white rounded-lg border">
                    <p className="font-medium">Airport Pickup</p>
                    <p className="text-ember">90 min free waiting (from flight landing)</p>
                  </div>
                  <div className="text-sm p-3 bg-white rounded-lg border">
                    <p className="font-medium">Airport Drop-off</p>
                    <p className="text-ember">30 min free waiting</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">日本語版</h3>
                <div className="space-y-4">
                  <div className="text-sm p-3 bg-white rounded-lg border">
                    <p className="font-medium">空港お迎え</p>
                    <p className="text-ember">90分無料待機（飛行機着陸時から）</p>
                  </div>
                  <div className="text-sm p-3 bg-white rounded-lg border">
                    <p className="font-medium">空港お見送り</p>
                    <p className="text-ember">30分無料待機</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">7. 實施總結</h2>
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-3">已添加等候時間政策的位置：</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="inline-flex h-2 w-2 rounded-full bg-ember" />
                  <span><strong>Hero區域特性列表</strong> - 所有語言版本</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-flex h-2 w-2 rounded-full bg-ember" />
                  <span><strong>Services組件</strong> - 根據服務類型顯示相應等候時間</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-flex h-2 w-2 rounded-full bg-ember" />
                  <span><strong>等候時間橫幅</strong> - 預訂表單前顯眼位置</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-flex h-2 w-2 rounded-full bg-ember" />
                  <span><strong>完整服務政策頁面</strong> - 詳細說明條款</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-flex h-2 w-2 rounded-full bg-ember" />
                  <span><strong>多語言支持</strong> - 中文、英文、日文完整翻譯</span>
                </li>
              </ul>
              
              <div className="mt-6 p-4 bg-ember/5 rounded-lg">
                <h4 className="font-semibold mb-2">政策內容：</h4>
                <ul className="space-y-1 text-sm">
                  <li>• 接機服務：免費等候90分鐘（從飛機降落時間算起）</li>
                  <li>• 送機服務：免費等候30分鐘</li>
                  <li>• 透明公平：超時將收取額外等候費用</li>
                  <li>• 航班延誤無憂：司機會根據實際降落時間調整</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
