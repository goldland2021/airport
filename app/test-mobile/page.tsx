"use client";

import { useState } from "react";
import Booking from "@/components/Booking";
import WaitingTimeBanner from "@/components/WaitingTimeBanner";
import Pricing from "@/components/Pricing";
import Vehicles from "@/components/Vehicles";

export default function TestMobilePage() {
  const [screenWidth, setScreenWidth] = useState(375); // iPhone 12宽度
  
  const screenSizes = [
    { name: "手机小 (iPhone SE)", width: 375 },
    { name: "手机中 (iPhone 12)", width: 390 },
    { name: "手机大 (Pixel 5)", width: 393 },
    { name: "平板小", width: 768 },
    { name: "平板大", width: 1024 },
    { name: "桌面", width: 1280 }
  ];

  const dict = {
    booking: {
      title: "预约接送",
      subtitle: "发送行程信息，WhatsApp 迅速报价。",
      fields: {
        airport: "机场",
        flight: "航班号",
        hotel: "酒店",
        passengers: "人数",
        luggage: "行李"
      },
      placeholders: {
        airport: "成田 或 羽田",
        flight: "JL123",
        hotel: "新宿酒店",
        passengers: "2",
        luggage: "3 个行李箱"
      },
      button: "通过 WhatsApp 发送",
      messageHeader: "您好，我需要机场接送"
    },
    pricing: {
      items: [
        { route: "成田 → 东京", price: "$120 起" },
        { route: "羽田 → 东京", price: "$80 起" }
      ],
      itemNote: "包含接机举牌服务。"
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
        <h1 className="text-3xl font-bold mb-6">手机响应式测试</h1>
        
        {/* 屏幕尺寸选择器 */}
        <div className="mb-8 p-4 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">选择测试屏幕尺寸</h2>
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
              自定义宽度: {screenWidth}px
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

        {/* 模拟手机屏幕 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold">模拟屏幕预览</h2>
            <span className="text-sm text-gray-600">{screenWidth}px 宽度</span>
          </div>
          
          <div className="relative mx-auto border-8 border-gray-800 rounded-[2rem] bg-white overflow-hidden shadow-2xl"
               style={{ width: `${screenWidth}px`, maxWidth: "100%" }}>
            {/* 手机状态栏 */}
            <div className="h-6 bg-gray-800 flex items-center justify-between px-4">
              <div className="text-white text-xs">9:41</div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
              </div>
            </div>
            
            {/* 手机内容区域 */}
            <div className="overflow-y-auto" style={{ height: "600px" }}>
              <div className="p-4">
                {/* 快速预约标题 */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full mb-3">
                    <span className="text-amber-600">⚡</span>
                    <span className="text-sm font-semibold text-amber-600">
                      快速报价
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold">立即预约接送服务</h2>
                  <p className="text-gray-600 mt-2">
                    填写行程信息，立即获取WhatsApp报价
                  </p>
                </div>
                
                {/* 预约表单卡片 */}
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
                
                {/* 等候时间政策 */}
                <div className="mb-6 p-4 border rounded-xl">
                  <h3 className="text-lg font-semibold mb-3">免费等候时间政策</h3>
                  <WaitingTimeBanner locale="zh" />
                </div>
                
                {/* 服务承诺 */}
                <div className="mb-6 p-4 border rounded-xl">
                  <h3 className="text-lg font-semibold mb-4">我们的服务承诺</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                        <span className="text-amber-600">⏱️</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">准时到达</p>
                        <p className="text-xs text-gray-600 mt-0.5">司机提前到达等候</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                        <span className="text-amber-600">💰</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">透明价格</p>
                        <p className="text-xs text-gray-600 mt-0.5">无隐藏费用</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* 价格参考 */}
                <div className="mb-6">
                  <Pricing
                    title="价格参考"
                    subtitle="透明固定价格，无隐藏费用。"
                    items={dict.pricing.items}
                    itemNote={dict.pricing.itemNote}
                  />
                </div>
                
                {/* 车型展示 */}
                <div>
                  <Vehicles
                    title="车型"
                    subtitle="适合个人、家庭与多人出行。"
                    vehicles={dict.vehicles.items}
                  />
                </div>
              </div>
            </div>
            
            {/* 手机底部导航栏 */}
            <div className="h-12 bg-gray-800"></div>
          </div>
        </div>

        {/* 修复说明 */}
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">已修复的响应式问题</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-green-600">✅ 已修复的问题</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span><strong>输入框宽度</strong>: 添加了 <code>w-full</code> 类，确保100%宽度</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span><strong>表单内边距</strong>: 使用响应式 <code>p-4 sm:p-6 md:p-8</code></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span><strong>卡片外边距</strong>: 手机端负外边距，确保不超出屏幕</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span><strong>字体大小</strong>: 响应式文本 <code>text-xs sm:text-sm</code></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span><strong>间距调整</strong>: 手机端更紧凑的间距</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">📱 手机优化要点</h3>
              <ul className="space-y-2 text-sm">
                <li>• 输入框宽度自适应屏幕</li>
                <li>• 触摸友好的大按钮和输入框</li>
                <li>• 适当的字体大小确保可读性</li>
                <li>• 足够的间距避免误触</li>
                <li>• 焦点状态清晰可见</li>
                <li>• 表单在视图中完整显示</li>
              </ul>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-sm mb-1">测试建议</h4>
                <p className="text-xs text-gray-700">
                  拖动滑块测试不同屏幕尺寸，确保在320px-768px的手机屏幕上表单都能正常显示。
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-amber-50 rounded-lg">
            <h3 className="font-semibold mb-2">🔧 技术修复详情</h3>
            <div className="text-sm space-y-1">
              <p><code>{'className="h-12 w-full rounded-xl border..."'}</code> - 添加 w-full 确保宽度</p>
              <p><code>{'className="card p-4 sm:p-6 md:p-8"'}</code> - 响应式内边距</p>
              <p><code>{'className="mx-[-0.5rem] sm:mx-0"'}</code> - 手机端负外边距补偿</p>
              <p><code>{'className="text-xs sm:text-sm"'}</code> - 响应式字体大小</p>
              <p><code>{'className="gap-3 sm:gap-4"'}</code> - 响应式间距</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}