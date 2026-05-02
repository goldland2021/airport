"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales } from "@/lib/i18n";

const labels: Record<string, string> = {
  en: "EN",
  ja: "JP",
  zh: "中"
};

export default function LanguageSwitcher() {
  const pathname = usePathname() || "/";
  const basePath = pathname.replace(/^\/(en|ja|zh)(?=\/|$)/, "");

  return (
    <div className="fixed top-5 right-5 z-50 flex items-center gap-2 rounded-full border border-clay/60 bg-white/90 p-1 shadow-soft">
      {locales.map((locale) => {
        const href = `/${locale}${basePath || ""}`;
        const label = labels[locale] ?? locale.toUpperCase();

        return (
          <Link
            key={locale}
            href={href}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-clay/60 text-xs font-semibold text-ink/80 transition hover:bg-sand"
            aria-label={`Switch language to ${locale}`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
