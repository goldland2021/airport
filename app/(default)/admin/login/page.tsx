import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminSessionCookieName, verifyAdminSessionToken } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: {
    index: false,
    follow: false
  }
};

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const cookieStore = await cookies();
  const session = verifyAdminSessionToken(cookieStore.get(adminSessionCookieName)?.value);
  const { error } = await searchParams;

  if (session) redirect("/admin");

  return (
    <main className="min-h-screen bg-sand px-4 py-12 text-ink">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-md items-center">
        <div className="w-full rounded-lg border border-clay/60 bg-white p-6 shadow-soft">
          <div className="mb-8">
            <p className="text-sm font-semibold text-ember">Airport Admin</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">後台登入</h1>
            <p className="mt-2 text-sm leading-6 text-ink/60">
              管理員登入後可以查看網站訪問人數、國家來源和詢價點擊統計。
            </p>
          </div>

          {error ? (
            <div className="mb-5 rounded-lg border border-ember/30 bg-ember/5 px-4 py-3 text-sm text-ember">
              用戶名或密碼不正確。
            </div>
          ) : null}

          <form action="/api/admin/login" method="post" className="grid gap-4">
            <label className="grid gap-2 text-sm font-medium">
              管理員
              <input
                name="username"
                autoComplete="username"
                className="h-12 rounded-lg border border-clay/60 px-4 text-base focus:border-ember focus:outline-none focus:ring-2 focus:ring-ember/30"
                placeholder="admin"
                required
              />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              密碼
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                className="h-12 rounded-lg border border-clay/60 px-4 text-base focus:border-ember focus:outline-none focus:ring-2 focus:ring-ember/30"
                required
              />
            </label>
            <button
              type="submit"
              className="mt-2 h-12 rounded-lg bg-ink px-5 text-sm font-semibold text-white transition hover:bg-ink/90"
            >
              登入後台
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
