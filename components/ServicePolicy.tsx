type ServicePolicyProps = {
  title?: string;
  subtitle?: string;
  compact?: boolean;
};

export default function ServicePolicy({
  title = "服务政策",
  subtitle = "透明、公平的服务条款",
  compact = false
}: ServicePolicyProps) {
  if (compact) {
    return (
      <div className="rounded-xl border border-clay/60 bg-white/90 p-4">
        <h3 className="font-semibold text-ink mb-2">{title}</h3>
        <ul className="space-y-2 text-sm text-ink/80">
          <li className="flex items-start gap-2">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-ember mt-1 flex-shrink-0" />
            <span><strong>接机:</strong> 免费等候90分钟（从飞机降落时间算起）</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-ember mt-1 flex-shrink-0" />
            <span><strong>送机:</strong> 免费等候30分钟</span>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <section className="section">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">{subtitle}</p>
          
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-ember/10 flex items-center justify-center">
                  <span className="text-2xl">🛬</span>
                </div>
                <h3 className="text-xl font-semibold">接机服务</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="inline-flex h-2 w-2 rounded-full bg-ember mt-2 flex-shrink-0" />
                  <span><strong>免费等候时间:</strong> 90分钟</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-flex h-2 w-2 rounded-full bg-ember mt-2 flex-shrink-0" />
                  <span><strong>计时起点:</strong> 飞机降落时间</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-flex h-2 w-2 rounded-full bg-ember mt-2 flex-shrink-0" />
                  <span><strong>可选服务:</strong> 到达口举牌接机，另加 2,000 日元（需在预约时说明）</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-flex h-2 w-2 rounded-full bg-ember mt-2 flex-shrink-0" />
                  <span>选择举牌服务时，司机在行李提取区举牌等候</span>
                </li>
              </ul>
            </div>
            
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-ember/10 flex items-center justify-center">
                  <span className="text-2xl">🛫</span>
                </div>
                <h3 className="text-xl font-semibold">送机服务</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="inline-flex h-2 w-2 rounded-full bg-ember mt-2 flex-shrink-0" />
                  <span><strong>免费等候时间:</strong> 30分钟</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-flex h-2 w-2 rounded-full bg-ember mt-2 flex-shrink-0" />
                  <span><strong>计时起点:</strong> 约定接载时间</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-flex h-2 w-2 rounded-full bg-ember mt-2 flex-shrink-0" />
                  <span><strong>包含服务:</strong> 酒店/地址上门接载</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-flex h-2 w-2 rounded-full bg-ember mt-2 flex-shrink-0" />
                  <span>准时到达指定地点，协助行李装载</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 card p-6">
            <h3 className="text-lg font-semibold mb-4">重要说明</h3>
            <ul className="space-y-3 text-sm text-ink/80">
              <li className="flex items-start gap-3">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-ember/60 mt-1 flex-shrink-0" />
                <span>等候时间从上述计时起点开始计算，超时将收取额外等候费用</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-ember/60 mt-1 flex-shrink-0" />
                <span>航班延误无需担心，司机会根据实际降落时间调整等候</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-ember/60 mt-1 flex-shrink-0" />
                <span>建议提前通过WhatsApp告知航班号，以便司机跟踪航班状态</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-ember/60 mt-1 flex-shrink-0" />
                <span>所有价格均为固定价格，包含税费，无隐藏费用</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}