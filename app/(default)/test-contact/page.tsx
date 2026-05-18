import Hero from "@/components/Hero";
import Booking from "@/components/Booking";
import ContactInfo from "@/components/ContactInfo";
import Footer from "@/components/Footer";
import { whatsAppDisplayPhone, whatsAppPhoneNumber } from "@/lib/whatsapp";

export default function TestContactPage() {
  return (
    <div className="min-h-screen bg-sand">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">聯絡方式測試頁面</h1>
        
        <div className="grid gap-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Hero組件中的聯絡方式</h2>
            <Hero
              title="測試標題"
              subtitle="測試副標題"
              features={["功能1", "功能2", "功能3", "功能4"]}
              imageSrc="/images/tokyo-airport-transfer.jpg"
              imageAlt="測試圖片"
            />
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">2. 獨立的ContactInfo組件</h2>
            <div className="grid gap-4 max-w-2xl">
              <ContactInfo />
              <ContactInfo compact />
              <ContactInfo showPhone={false} />
              <ContactInfo showName={false} />
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Booking組件中的聯絡方式</h2>
            <Booking />
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Footer中的聯絡方式</h2>
            <Footer />
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">5. WhatsApp連結測試</h2>
            <div className="space-y-4">
              <p className="text-ink/70">點擊以下連結測試WhatsApp功能：</p>
              <div className="space-y-2">
                <a 
                  href={`https://wa.me/${whatsAppPhoneNumber}?text=Hello%20I%20need%20airport%20transfer`}
                  className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  target="_blank"
                  rel="noreferrer"
                >
                  測試預設消息連結
                </a>
                <p className="text-sm text-ink/50">
                  連結格式: https://wa.me/{whatsAppPhoneNumber}?text=編碼後的消息
                </p>
                <p className="text-sm text-ink/50">
                  電話號碼: {whatsAppDisplayPhone} → WhatsApp格式: {whatsAppPhoneNumber}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
