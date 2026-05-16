"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { trackAnalyticsEvent } from "@/lib/analytics";
import { buildWhatsAppLink, defaultWhatsAppMessage } from "@/lib/whatsapp";
import type { RouteQuote } from "./RoutePicker";
import ContactInfo from "./ContactInfo";

type BookingProps = {
  title?: string;
  subtitle?: string;
  variant?: "section" | "embedded";
  fields?: {
    airport: string;
    flight: string;
    landingTime?: string;
    hotel: string;
    passengers: string;
    luggage: string;
  };
  placeholders?: {
    airport: string;
    flight: string;
    landingTime?: string;
    hotel: string;
    passengers: string;
    luggage: string;
  };
  buttonLabel?: string;
  messageHeader?: string;
  routeQuote?: RouteQuote | null;
};

function formatYen(amount: number) {
  return `JPY ${Math.round(amount).toLocaleString("en-US")}`;
}

function formatRouteDirection(direction: RouteQuote["direction"]) {
  return direction === "pickup" ? "Airport to hotel" : "Hotel to airport";
}

export default function Booking({
  title = "Book Your Transfer",
  subtitle = "Send your trip details and get a fast quote on WhatsApp.",
  variant = "section",
  fields = {
    airport: "Airport",
    flight: "Flight number",
    landingTime: "Landing time",
    hotel: "Hotel",
    passengers: "Passengers",
    luggage: "Luggage"
  },
  placeholders = {
    airport: "Narita or Haneda",
    flight: "JL123",
    landingTime: "May 3, 4:30 PM",
    hotel: "Shinjuku Hotel",
    passengers: "2",
    luggage: "3 suitcases"
  },
  buttonLabel = "Send on WhatsApp",
  messageHeader = defaultWhatsAppMessage,
  routeQuote = null
}: BookingProps) {
  const [airportInput, setAirportInput] = useState({ value: "", quoteKey: "" });
  const [flight, setFlight] = useState("");
  const [landingTime, setLandingTime] = useState("");
  const [hotelInput, setHotelInput] = useState({ value: "", quoteKey: "" });
  const [passengers, setPassengers] = useState("");
  const [luggage, setLuggage] = useState("");
  const landingTimeLabel = fields.landingTime ?? "Landing time";
  const landingTimePlaceholder = placeholders.landingTime ?? "May 3, 4:30 PM";
  const routeQuoteKey = routeQuote
    ? [
        routeQuote.airportId,
        routeQuote.direction,
        routeQuote.destLat,
        routeQuote.destLng,
        routeQuote.estimateLowYen,
        routeQuote.estimateHighYen
      ].join("|")
    : "";
  const routeDestination = routeQuote?.destName || (routeQuote ? `${routeQuote.destLat}, ${routeQuote.destLng}` : "");
  const airportValue =
    routeQuote && airportInput.quoteKey !== routeQuoteKey
      ? routeQuote.airportName
      : airportInput.value || routeQuote?.airportName || "";
  const hotelValue =
    routeQuote && hotelInput.quoteKey !== routeQuoteKey
      ? routeDestination
      : hotelInput.value || routeDestination;

  const message = useMemo(() => {
    const routeLines = routeQuote
      ? [
          "",
          "Map estimate:",
          `Route type: ${formatRouteDirection(routeQuote.direction)}`,
          `Airport: ${routeQuote.airportName}`,
          `Estimated fare: ${formatYen(routeQuote.estimateLowYen)} - ${formatYen(routeQuote.estimateHighYen)}`,
          `Distance: ${routeQuote.distanceKm} km`,
          `Estimated drive time: ${routeQuote.durationMin} min`,
          `Toll estimate: ${formatYen(routeQuote.tollYen)}`,
          `Map destination: ${routeQuote.destName || `${routeQuote.destLat}, ${routeQuote.destLng}`}`
        ]
      : [];

    return [
      messageHeader,
      "",
      `${fields.airport}: ${airportValue}`,
      `${fields.flight}: ${flight}`,
      `${landingTimeLabel}: ${landingTime}`,
      `${fields.hotel}: ${hotelValue}`,
      `${fields.passengers}: ${passengers}`,
      `${fields.luggage}: ${luggage}`,
      ...routeLines
    ].join("\n");
  }, [airportValue, flight, landingTime, landingTimeLabel, hotelValue, passengers, luggage, fields, messageHeader, routeQuote]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    trackAnalyticsEvent("whatsapp_inquiry_submit", {
      has_route_quote: Boolean(routeQuote),
      route_airport: routeQuote?.airportId,
      route_direction: routeQuote?.direction,
      estimate_low_yen: routeQuote?.estimateLowYen,
      estimate_high_yen: routeQuote?.estimateHighYen
    });
    const href = buildWhatsAppLink(message);
    window.open(href, "_blank", "noopener,noreferrer");
  };

  const content = (
    <>
        <div className="max-w-3xl">
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">{subtitle}</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-10 grid gap-4 rounded-2xl border border-clay/60 bg-white p-4 md:p-6 shadow-soft md:grid-cols-2"
        >
          {routeQuote ? (
            <div className="rounded-xl border border-ember/30 bg-ember/5 px-4 py-3 text-sm text-ink/75 md:col-span-2">
              <p className="font-semibold text-ember">
                Map estimate: {formatYen(routeQuote.estimateLowYen)} - {formatYen(routeQuote.estimateHighYen)}
              </p>
              <p className="mt-1 text-xs leading-5 text-ink/60">
                {routeQuote.distanceKm} km, about {routeQuote.durationMin} min. This estimate will be included in your WhatsApp message.
              </p>
            </div>
          ) : null}
          <label className="grid gap-2 text-sm">
            {fields.airport}
            <input
              className="h-12 w-full rounded-xl border border-clay/60 px-4 text-base focus:outline-none focus:ring-2 focus:ring-ember/30 focus:border-ember"
              placeholder={placeholders.airport}
              value={airportValue}
              onChange={(event) => setAirportInput({ value: event.target.value, quoteKey: routeQuoteKey })}
              required
            />
          </label>
          <label className="grid gap-2 text-sm">
            {fields.flight}
            <input
              className="h-12 w-full rounded-xl border border-clay/60 px-4 text-base focus:outline-none focus:ring-2 focus:ring-ember/30 focus:border-ember"
              placeholder={placeholders.flight}
              value={flight}
              onChange={(event) => setFlight(event.target.value)}
              required
            />
          </label>
          <label className="grid gap-2 text-sm">
            {landingTimeLabel}
            <input
              className="h-12 w-full rounded-xl border border-clay/60 px-4 text-base focus:outline-none focus:ring-2 focus:ring-ember/30 focus:border-ember"
              placeholder={landingTimePlaceholder}
              value={landingTime}
              onChange={(event) => setLandingTime(event.target.value)}
              required
            />
          </label>
          <label className="grid gap-2 text-sm">
            {fields.hotel}
            <input
              className="h-12 w-full rounded-xl border border-clay/60 px-4 text-base focus:outline-none focus:ring-2 focus:ring-ember/30 focus:border-ember"
              placeholder={placeholders.hotel}
              value={hotelValue}
              onChange={(event) => setHotelInput({ value: event.target.value, quoteKey: routeQuoteKey })}
              required
            />
          </label>
          <label className="grid gap-2 text-sm">
            {fields.passengers}
            <input
              className="h-12 w-full rounded-xl border border-clay/60 px-4 text-base focus:outline-none focus:ring-2 focus:ring-ember/30 focus:border-ember"
              placeholder={placeholders.passengers}
              value={passengers}
              onChange={(event) => setPassengers(event.target.value)}
              required
            />
          </label>
          <label className="grid gap-2 text-sm">
            {fields.luggage}
            <input
              className="h-12 w-full rounded-xl border border-clay/60 px-4 text-base focus:outline-none focus:ring-2 focus:ring-ember/30 focus:border-ember"
              placeholder={placeholders.luggage}
              value={luggage}
              onChange={(event) => setLuggage(event.target.value)}
              required
            />
          </label>
          <div className="flex items-end md:col-span-2">
            <button
              type="submit"
              className="h-12 w-full rounded-xl bg-ink text-white transition hover:bg-ink/90 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-ember/30"
            >
              {buttonLabel}
            </button>
          </div>
        </form>
        <div className="mt-8 max-w-md mx-auto">
          <ContactInfo compact />
          <p className="text-xs text-ink/50 mt-2 text-center">
            Send details via form or message directly on WhatsApp
          </p>
        </div>
    </>
  );

  if (variant === "embedded") {
    return <div>{content}</div>;
  }

  return (
    <section className="section bg-sand">
      <div className="container mx-auto px-4">
        {content}
      </div>
    </section>
  );
}
