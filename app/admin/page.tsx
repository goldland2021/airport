import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminSessionCookieName, verifyAdminSessionToken } from "@/lib/admin-auth";
import { getAnalyticsSummary } from "@/lib/google-analytics-admin";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: {
    index: false,
    follow: false
  }
};

function formatNumber(value: number) {
  return value.toLocaleString("en-US");
}

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const session = verifyAdminSessionToken(cookieStore.get(adminSessionCookieName)?.value);

  if (!session) redirect("/admin/login");

  const stats = await getAnalyticsSummary(30);

  const cards = [
    {
      label: "网站被访问次数",
      value: stats.totals.pageViews,
      note: "访客打开网站页面的总次数"
    },
    {
      label: "WhatsApp 联系客服次数",
      value: stats.totals.whatsappClicks,
      note: "访客点击 WhatsApp 按钮的次数"
    }
  ] as const;

  return (
    <main className="min-h-screen bg-sand px-4 py-8 text-ink">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8 flex flex-col gap-4 border-b border-clay/60 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold text-ember">Airport Admin</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">简单统计后台</h1>
            <p className="mt-2 text-sm text-ink/60">{stats.dateRangeLabel}</p>
          </div>
          <form action="/api/admin/logout" method="post">
            <button
              type="submit"
              className="h-10 rounded-lg border border-clay/70 bg-white px-4 text-sm font-semibold transition hover:border-ember hover:text-ember"
            >
              退出登录
            </button>
          </form>
        </header>

        {!stats.configured ? (
          <section className="mb-6 rounded-lg border border-ember/30 bg-white p-5 shadow-soft">
            <h2 className="text-lg font-semibold text-ember">统计读取还需要配置</h2>
            <p className="mt-2 text-sm leading-6 text-ink/65">{stats.message}</p>
            <div className="mt-4 rounded-lg bg-sand/70 p-4 text-sm leading-7 text-ink/70">
              <p>需要在 Vercel 项目环境变量中配置 GA4 后，后台才会显示真实数据：</p>
              <p className="font-mono">ADMIN_USERNAME</p>
              <p className="font-mono">ADMIN_PASSWORD</p>
              <p className="font-mono">ADMIN_SESSION_SECRET</p>
              <p className="font-mono">GA_PROPERTY_ID</p>
              <p className="font-mono">GA_CLIENT_EMAIL</p>
              <p className="font-mono">GA_PRIVATE_KEY</p>
            </div>
          </section>
        ) : null}

        <section className="grid gap-4 md:grid-cols-2">
          {cards.map((card) => (
            <article key={card.label} className="rounded-lg border border-clay/60 bg-white p-6 shadow-soft">
              <p className="text-sm font-medium text-ink/55">{card.label}</p>
              <p className="mt-3 text-5xl font-semibold tracking-tight">{formatNumber(card.value)}</p>
              <p className="mt-3 text-sm text-ink/50">{card.note}</p>
            </article>
          ))}
        </section>

        <section className="mt-6 rounded-lg border border-clay/60 bg-white p-5 text-sm leading-6 text-ink/60 shadow-soft">
          <p>目前后台只保留这两个核心数据，方便你每天快速查看网站有没有人来、有没有人点击 WhatsApp 联系客服。</p>
          {stats.propertyId ? <p className="mt-2">GA4 Property: {stats.propertyId}</p> : null}
        </section>
      </div>
    </main>
  );
}
