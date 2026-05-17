"use client";

import Image from "next/image";
import { trackAnalyticsEvent } from "@/lib/analytics";
import { buildWhatsAppLink, defaultWhatsAppMessage, whatsAppDisplayPhone } from "@/lib/whatsapp";

type HeroProps = {
  title: string;
  subtitle: string;
  features?: string[];
  imageSrc: string;
  imageAlt: string;
  ctaLabel?: string;
  ctaMessage?: string;
};

export default function Hero({
  title,
  subtitle,
  features = [],
  imageSrc,
  imageAlt,
  ctaLabel = "Get Quote on WhatsApp",
  ctaMessage = defaultWhatsAppMessage
}: HeroProps) {
  const href = buildWhatsAppLink(ctaMessage);

  return (
    <section className="section fancy-bg">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-3">
              <span className="badge">Tokyo Airport Transfer</span>
              <span className="badge flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.707 12.293a.999.999 0 00-1.414 0l-1.594 1.594c-.739-.22-2.118-.72-2.992-1.594s-1.374-2.253-1.594-2.992l1.594-1.594a.999.999 0 000-1.414l-4-4a.999.999 0 00-1.414 0L3.581 5.005c-.38.38-.594.902-.586 1.435.023 1.424.4 6.37 4.298 10.268s8.844 4.274 10.269 4.298h.028c.528 0 1.027-.208 1.405-.586l2.712-2.712a.999.999 0 000-1.414l-4-4z" />
                </svg>
                WhatsApp: {whatsAppDisplayPhone}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-ink/70 max-w-2xl">
              {subtitle}
            </p>
            {features.length > 0 && (
              <ul className="grid gap-3 md:grid-cols-2 text-ink/80">
                {features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <span className="inline-flex h-2.5 w-2.5 rounded-full bg-ember" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex flex-wrap gap-4">
              <a
                href={href}
                className="inline-flex items-center justify-center rounded-full bg-ember px-6 py-3 text-white shadow-lift transition hover:translate-y-[-2px]"
                target="_blank"
                rel="noreferrer"
                onClick={() => trackAnalyticsEvent("whatsapp_click", { location: "hero_cta" })}
              >
                {ctaLabel}
              </a>
              <span className="badge">Email: jpairport.com@gmail.com</span>
            </div>
          </div>
          <div className="relative reveal">
            <div className="absolute -inset-6 rounded-[32px] bg-dusk/70 blur-2xl" />
            <div className="relative overflow-hidden rounded-[32px] border border-clay/60 shadow-soft">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={720}
                height={520}
                className="h-[360px] w-full object-cover md:h-[420px] image-warm"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
