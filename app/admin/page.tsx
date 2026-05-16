import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminSessionCookieName, verifyAdminSessionToken } from "@/lib/admin-auth";
import { gaMeasurementId } from "@/lib/analytics";
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
    ["Active users", stats.totals.activeUsers],
    ["New users", stats.totals.newUsers],
    ["Sessions", stats.totals.sessions],
    ["Page views", stats.totals.pageViews]
  ] as const;

  return (
    <main className="min-h-screen bg-sand px-4 py-8 text-ink">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-4 border-b border-clay/60 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold text-ember">Airport Admin</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">网站统计后台</h1>
            <p className="mt-2 text-sm text-ink/60">
              当前 GA4 Measurement ID: {gaMeasurementId}
              {stats.propertyId ? ` · Property ${stats.propertyId}` : ""}
            </p>
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
              <p>在 Vercel 项目环境变量中添加：</p>
              <p className="font-mono">ADMIN_USERNAME</p>
              <p className="font-mono">ADMIN_PASSWORD</p>
              <p className="font-mono">ADMIN_SESSION_SECRET</p>
              <p className="font-mono">GA_PROPERTY_ID</p>
              <p className="font-mono">GA_CLIENT_EMAIL</p>
              <p className="font-mono">GA_PRIVATE_KEY</p>
            </div>
          </section>
        ) : null}

        <section className="grid gap-4 md:grid-cols-4">
          {cards.map(([label, value]) => (
            <article key={label} className="rounded-lg border border-clay/60 bg-white p-5 shadow-soft">
              <p className="text-sm text-ink/55">{label}</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight">{formatNumber(value)}</p>
              <p className="mt-2 text-xs text-ink/45">{stats.dateRangeLabel}</p>
            </article>
          ))}
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <article className="rounded-lg border border-clay/60 bg-white p-5 shadow-soft">
            <h2 className="text-lg font-semibold">访问国家</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-clay/60 text-ink/55">
                  <tr>
                    <th className="py-2 font-medium">国家</th>
                    <th className="py-2 text-right font-medium">访问人数</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.countries.length ? (
                    stats.countries.map((country) => (
                      <tr key={country.country} className="border-b border-clay/30 last:border-0">
                        <td className="py-3">{country.country}</td>
                        <td className="py-3 text-right font-semibold">{formatNumber(country.activeUsers)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="py-6 text-ink/50" colSpan={2}>
                        暂无国家数据。
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </article>

          <article className="rounded-lg border border-clay/60 bg-white p-5 shadow-soft">
            <h2 className="text-lg font-semibold">询价事件</h2>
            <div className="mt-4 grid gap-3">
              {stats.events.map((event) => (
                <div key={event.eventName} className="rounded-lg border border-clay/40 bg-sand/40 p-4">
                  <p className="text-sm text-ink/55">{event.label}</p>
                  <p className="mt-1 text-2xl font-semibold">{formatNumber(event.count)}</p>
                  <p className="mt-1 font-mono text-xs text-ink/40">{event.eventName}</p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-6 rounded-lg border border-clay/60 bg-white p-5 shadow-soft">
          <h2 className="text-lg font-semibold">最近14天趋势</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-clay/60 text-ink/55">
                <tr>
                  <th className="py-2 font-medium">日期</th>
                  <th className="py-2 text-right font-medium">访问人数</th>
                  <th className="py-2 text-right font-medium">Sessions</th>
                </tr>
              </thead>
              <tbody>
                {stats.daily.length ? (
                  stats.daily.map((day) => (
                    <tr key={day.date} className="border-b border-clay/30 last:border-0">
                      <td className="py-3">{day.date}</td>
                      <td className="py-3 text-right font-semibold">{formatNumber(day.activeUsers)}</td>
                      <td className="py-3 text-right font-semibold">{formatNumber(day.sessions)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="py-6 text-ink/50" colSpan={3}>
                      暂无趋势数据。
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
