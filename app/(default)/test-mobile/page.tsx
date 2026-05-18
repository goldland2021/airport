"use client";

import { useState } from "react";
import Booking from "@/components/Booking";
import WaitingTimeBanner from "@/components/WaitingTimeBanner";
import Pricing from "@/components/Pricing";
import Vehicles from "@/components/Vehicles";

export default function TestMobilePage() {
  const [screenWidth, setScreenWidth] = useState(375); // iPhone 12寬度
  
  const screenSizes = [
    { name: "手機小 (iPhone SE)", width: 375 },
    { name: "手機中 (iPhone 12)", width: 390 },
    { name: "手機大 (Pixel 5)", width: 393 },
    { name: "平板小", width: 768 },
    { name: "平板大", width: 1024 },
    { name: "桌面", width: 1280 }
  ];

  const dict = {
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
      items: [
        { route: "成田 → 東京", price: "$120 起" },
        { route: "羽田 → 東京", price: "$80 起" }
      ],
      itemNote: "包含接機舉牌服務。"
    },
    vehicles: {
      items: [
        {
          name: "Luxury Sedan",
          passengers: "3 passengers",
          image: "/images/sedan.jpg",
          alt: "Luxury sedan"
        },
        {
          name: "Toyota Alphard",
          passengers: "5 passengers",
          image: "/images/alphard.jpg",
          alt: "Toyota Alphard"
        },
        {
          name: "Toyota Hiace",
          passengers: "8 passengers",
          image: "/images/hiace.jpg",
          alt: "Toyota Hiace"
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">手機響應式測試</h1>
        
        {/* 屏幕尺寸選擇器 */}
        <div className="mb-8 p-4 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">選擇測試屏幕尺寸</h2>
          <div className="flex flex-wrap gap-2">
            {screenSizes.map((size) => (
              <button
                key={size.name}
                onClick={() => setScreenWidth(size.width)}
                className={`px-4 py-2 rounded-lg ${
                  screenWidth === size.width 
                    ? "bg-blue-600 text-white" 
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {size.name} ({size.width}px)
              </button>
            ))}
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">
              自定義寬度: {screenWidth}px
            </label>
            <input
              type="range"
              min="320"
              max="1920"
              value={screenWidth}
              onChange={(e) => setScreenWidth(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        {/* 模擬手機屏幕 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold">模擬屏幕預覽</h2>
            <span className="text-sm text-gray-600">{screenWidth}px 寬度</span>
          </div>
          
          <div className="relative mx-auto border-8 border-gray-800 rounded-[2rem] bg-white overflow-hidden shadow-2xl"
               style={{ width: `${screenWidth}px`, maxWidth: "100%" }}>
            {/* 手機狀態欄 */}
            <div className="h-6 bg-gray-800 flex items-center justify-between px-4">
              <div className="text-white text-xs">9:41</div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
              </div>
            </div>
            
            {/* 手機內容區域 */}
            <div className="overflow-y-auto" style={{ height: "600px" }}>
              <div className="p-4">
                {/* 快速預約標題 */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full mb-3">
                    <span className="text-amber-600">⚡</span>
                    <span className="text-sm font-semibold text-amber-600">
                      快速報價
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold">立即預約接送服務</h2>
                  <p className="text-gray-600 mt-2">
                    填寫行程資訊，立即獲取WhatsApp報價
                  </p>
                </div>
                
                {/* 預約表單卡片 */}
                <div className="mb-6 p-4 border-2 border-amber-200 rounded-xl shadow">
                  <Booking
                    title={dict.booking.title}
                    subtitle={dict.booking.subtitle}
                    fields={dict.booking.fields}
                    placeholders={dict.booking.placeholders}
                    buttonLabel={dict.booking.button}
                    messageHeader={dict.booking.messageHeader}
                  />
                </div>
                
                {/* 等候時間政策 */}
                <div className="mb-6 p-4 border rounded-xl">
                  <h3 className="text-lg font-semibold mb-3">免費等候時間政策</h3>
                  <WaitingTimeBanner locale="zh" />
                </div>
                
                {/* 服務承諾 */}
                <div className="mb-6 p-4 border rounded-xl">
                  <h3 className="text-lg font-semibold mb-4">我們的服務承諾</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                        <span className="text-amber-600">⏱️</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">準時到達</p>
                        <p className="text-xs text-gray-600 mt-0.5">司機提前到達等候</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                        <span className="text-amber-600">💰</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">透明價格</p>
                        <p className="text-xs text-gray-600 mt-0.5">無隱藏費用</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* 價格參考 */}
                <div className="mb-6">
                  <Pricing
                    title="價格參考"
                    subtitle="透明固定價格，無隱藏費用。"
                    items={dict.pricing.items}
                    itemNote={dict.pricing.itemNote}
                  />
                </div>
                
                {/* 車型展示 */}
                <div>
                  <Vehicles
                    title="車型"
                    subtitle="適合個人、家庭與多人出行。"
                    vehicles={dict.vehicles.items}
                  />
                </div>
              </div>
            </div>
            
            {/* 手機底部導航欄 */}
            <div className="h-12 bg-gray-800"></div>
          </div>
        </div>

        {/* 修復說明 */}
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">已修復的響應式問題</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-green-600">✅ 已修復的問題</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span><strong>輸入框寬度</strong>: 添加了 <code>w-full</code> 類，確保100%寬度</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span><strong>表單內邊距</strong>: 使用響應式 <code>p-4 sm:p-6 md:p-8</code></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span><strong>卡片外邊距</strong>: 手機端負外邊距，確保不超出屏幕</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span><strong>字體大小</strong>: 響應式文本 <code>text-xs sm:text-sm</code></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span><strong>間距調整</strong>: 手機端更緊湊的間距</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">📱 手機優化要點</h3>
              <ul className="space-y-2 text-sm">
                <li>• 輸入框寬度自適應屏幕</li>
                <li>• 觸摸友好的大按鈕和輸入框</li>
                <li>• 適當的字體大小確保可讀性</li>
                <li>• 足夠的間距避免誤觸</li>
                <li>• 焦點狀態清晰可見</li>
                <li>• 表單在視圖中完整顯示</li>
              </ul>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-sm mb-1">測試建議</h4>
                <p className="text-xs text-gray-700">
                  拖動滑塊測試不同屏幕尺寸，確保在320px-768px的手機屏幕上表單都能正常顯示。
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-amber-50 rounded-lg">
            <h3 className="font-semibold mb-2">🔧 技術修復詳情</h3>
            <div className="text-sm space-y-1">
              <p><code>{'className="h-12 w-full rounded-xl border..."'}</code> - 添加 w-full 確保寬度</p>
              <p><code>{'className="card p-4 sm:p-6 md:p-8"'}</code> - 響應式內邊距</p>
              <p><code>{'className="mx-[-0.5rem] sm:mx-0"'}</code> - 手機端負外邊距補償</p>
              <p><code>{'className="text-xs sm:text-sm"'}</code> - 響應式字體大小</p>
              <p><code>{'className="gap-3 sm:gap-4"'}</code> - 響應式間距</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}