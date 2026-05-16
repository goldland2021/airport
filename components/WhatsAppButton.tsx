"use client";

import { buildWhatsAppLink, defaultWhatsAppMessage, whatsAppDisplayPhone } from "@/lib/whatsapp";
import { trackAnalyticsEvent } from "@/lib/analytics";

export default function WhatsAppButton() {
  const href = buildWhatsAppLink(defaultWhatsAppMessage);

  return (
    <a
      href={href}
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-ember px-5 py-3 text-sm font-semibold text-white shadow-lift transition hover:translate-y-[-2px]"
      target="_blank"
      rel="noreferrer"
      aria-label={`Chat on WhatsApp ${whatsAppDisplayPhone}`}
      title={`WhatsApp ${whatsAppDisplayPhone}`}
      onClick={() => trackAnalyticsEvent("whatsapp_click", { location: "floating_button" })}
    >
      WhatsApp
    </a>
  );
}
