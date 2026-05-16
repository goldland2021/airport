"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gaMeasurementId, trackAnalyticsEvent } from "@/lib/analytics";

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname?.startsWith("/admin")) return;

    trackAnalyticsEvent("page_view", {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
      send_to: gaMeasurementId
    });
  }, [pathname]);

  return null;
}
