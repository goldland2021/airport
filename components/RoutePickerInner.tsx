"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { calculateAirportFareEstimate } from "@/lib/airport-pricing";
import { trackAnalyticsEvent } from "@/lib/analytics";
import { AIRPORTS, type LatLng, findNearestTollZone } from "@/lib/toll-routes";
import { geocodeAddressGoogleMaps, getDrivingRouteGoogleMaps } from "@/lib/google-maps-routing";
import { buildWhatsAppLink } from "@/lib/whatsapp";

/** 必须在模块作用域保持同一引用；每次 render 传新数组会触发脚本重复加载并导致地图异常 */
const GOOGLE_MAPS_LIBRARIES: "geometry"[] = ["geometry"];

declare global {
  interface Window {
    gm_authFailure?: () => void;
  }
}

const mapOptions: google.maps.MapOptions = {
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
  gestureHandling: "greedy"
};

interface RouteResult {
  airportId: string;
  airportName: string;
  direction: "pickup" | "dropoff";
  distanceKm: number;
  durationMin: number;
  tollYen: number;
  destLat: number;
  destLng: number;
  destName: string;
  estimateLowYen: number;
  estimateHighYen: number;
}

interface RoutePickerInnerProps {
  locale: "en" | "ja" | "zh";
  onRouteCalculated: (result: RouteResult | null) => void;
}

const UI = {
  en: {
    pickup: "Airport to hotel",
    dropoff: "Hotel to airport",
    airport: "Airport",
    narita: "Narita Airport (NRT)",
    haneda: "Haneda Airport (HND)",
    address: "Hotel, Airbnb, or address",
    hint: "Example: Shinjuku Washington Hotel",
    search: "Get estimate",
    distance: "Distance",
    time: "Drive time",
    toll: "Toll estimate",
    total: "Estimated private transfer",
    included: "Usually includes",
    includedItems: ["Private door-to-door ride", "Toll estimate", "Flight delay tracking", "90 min airport pickup waiting"],
    note: "This is a planning estimate. The final fixed quote is confirmed by WhatsApp after vehicle size, luggage, and pickup time are checked.",
    drag: "Fine-tune the red marker if the pin is not exactly on your hotel.",
    empty: "Enter a hotel name or address to see a reference fare before you message us.",
    searching: "Searching...",
    notFound: "We could not find that place. Try adding Tokyo, the ward name, or the hotel postcode.",
    confirm: "Confirm on WhatsApp",
    mapLoading: "Loading map...",
    mapKeyMissing:
      "Google Maps is not configured. Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to .env.local and restart the dev server.",
    mapLoadFailed:
      "Google Maps script could not load. If the browser console shows net::ERR_CONNECTION_TIMED_OUT for maps.googleapis.com, your network cannot reach Google (common with firewalls or regions where Google is blocked)—try another network or a system-wide VPN, then hard-refresh. If the request reaches Google but still fails, enable Maps JavaScript API, Geocoding API, Directions API, link billing, and fix HTTP referrer restrictions.",
    mapAuthFailed:
      "Google rejected this map key (common: Maps JavaScript API not enabled, billing not linked, or HTTP referrer restrictions do not match this URL). In Google Cloud Console, enable the APIs and add http://localhost:3000/* for local dev."
  },
  ja: {
    pickup: "Airport to hotel",
    dropoff: "Hotel to airport",
    airport: "Airport",
    narita: "Narita Airport (NRT)",
    haneda: "Haneda Airport (HND)",
    address: "Hotel or address",
    hint: "Example: Shinjuku Washington Hotel",
    search: "Get estimate",
    distance: "Distance",
    time: "Drive time",
    toll: "Toll estimate",
    total: "Estimated private transfer",
    included: "Usually includes",
    includedItems: ["Private door-to-door ride", "Toll estimate", "Flight delay tracking", "90 min airport pickup waiting"],
    note: "Final fixed price is confirmed on WhatsApp after vehicle size, luggage, and pickup time are checked.",
    drag: "Fine-tune the red marker if needed.",
    empty: "Enter a hotel name or address to see a reference fare.",
    searching: "Searching...",
    notFound: "We could not find that place. Please try a more specific address.",
    confirm: "Confirm on WhatsApp",
    mapLoading: "Loading map...",
    mapKeyMissing:
      "Google Maps is not configured. Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to .env.local and restart the dev server.",
    mapLoadFailed:
      "Google マップのスクリプトを読み込めませんでした。コンソールに maps.googleapis.com への net::ERR_CONNECTION_TIMED_OUT がある場合は、ネットワークが Google に到達できていません（企業 FW や地域制限など）。別回線やシステム全体の VPN を試し、強制再読み込みしてください。接続できるのに失敗する場合は API 有効化・課金・HTTP リファラを確認してください。",
    mapAuthFailed:
      "Google マップのキーが拒否されました。Maps JavaScript API の有効化、課金アカウントの紐付け、HTTP リファラ（例: http://localhost:3000/*）をご確認ください。"
  },
  zh: {
    pickup: "Airport to hotel",
    dropoff: "Hotel to airport",
    airport: "Airport",
    narita: "Narita Airport (NRT)",
    haneda: "Haneda Airport (HND)",
    address: "Hotel or address",
    hint: "Example: Shinjuku Washington Hotel",
    search: "Get estimate",
    distance: "Distance",
    time: "Drive time",
    toll: "Toll estimate",
    total: "Estimated private transfer",
    included: "Usually includes",
    includedItems: ["Private door-to-door ride", "Toll estimate", "Flight delay tracking", "90 min airport pickup waiting"],
    note: "Final fixed price is confirmed on WhatsApp after vehicle size, luggage, and pickup time are checked.",
    drag: "Fine-tune the red marker if needed.",
    empty: "Enter a hotel name or address to see a reference fare.",
    searching: "Searching...",
    notFound: "We could not find that place. Please try a more specific address.",
    confirm: "Confirm on WhatsApp",
    mapLoading: "Loading map...",
    mapKeyMissing:
      "Google Maps is not configured. Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to .env.local and restart the dev server.",
    mapLoadFailed:
      "无法加载 Google 地图脚本。若控制台里对 maps.googleapis.com 的请求出现 net::ERR_CONNECTION_TIMED_OUT，说明当前网络连不上 Google 服务器（国内直连、公司防火墙或未覆盖浏览器的代理都很常见），可尝试更换网络、使用系统级代理/VPN 后硬刷新。若能连通但仍报错，再检查是否启用 Maps JavaScript API、Geocoding、Directions、已绑定结算，以及密钥的 HTTP 引荐来源是否包含当前页面地址。",
    mapAuthFailed:
      "Google 拒绝了当前地图密钥。常见原因：未启用「Maps JavaScript API」、项目未绑定结算账号、或密钥的「HTTP 引荐来源网址」不包含当前页面地址。本地开发请为该密钥添加 http://localhost:3000/*（端口需一致），保存后等待约 1～5 分钟再刷新。"
  }
};

function formatYen(amount: number) {
  return `JPY ${Math.round(amount).toLocaleString("en-US")}`;
}

function formatDuration(minutes: number) {
  if (minutes < 60) return `${minutes} min`;
  return `${Math.floor(minutes / 60)} hr ${minutes % 60} min`;
}

const blueDotIcon: google.maps.Icon = {
  url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
};

const redDotIcon: google.maps.Icon = {
  url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
};

export default function RoutePickerInner({ locale, onRouteCalculated }: RoutePickerInnerProps) {
  const t = UI[locale];
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

  const mapLanguage = useMemo(() => (locale === "zh" ? "zh-CN" : locale === "ja" ? "ja" : "en"), [locale]);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "route-picker-google-maps",
    googleMapsApiKey: apiKey,
    version: "weekly",
    libraries: GOOGLE_MAPS_LIBRARIES,
    language: mapLanguage,
    region: "JP"
  });

  const mapRef = useRef<google.maps.Map | null>(null);
  const routePolylineRef = useRef<google.maps.Polyline | null>(null);
  const routeRequestIdRef = useRef(0);
  const [mapAuthFailed, setMapAuthFailed] = useState(false);

  useEffect(() => {
    const prev = window.gm_authFailure;
    window.gm_authFailure = () => {
      setMapAuthFailed(true);
      prev?.();
    };
    return () => {
      window.gm_authFailure = prev;
    };
  }, []);

  const [direction, setDirection] = useState<"pickup" | "dropoff">("pickup");
  const [airportId, setAirportId] = useState<string>("narita");
  const [address, setAddress] = useState("");
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");
  const [routeResult, setRouteResult] = useState<RouteResult | null>(null);
  const [destLatLng, setDestLatLng] = useState<LatLng | null>(null);
  const [routePath, setRoutePath] = useState<google.maps.LatLngLiteral[] | null>(null);
  const latestSelectionRef = useRef({ airportId, direction });

  const airportPos = AIRPORTS[airportId]?.latlng ?? AIRPORTS.narita.latlng;
  const airportName = t[airportId as "narita" | "haneda"];
  const airportCenter = useMemo(
    () => ({ lat: airportPos.lat, lng: airportPos.lng }),
    [airportPos.lat, airportPos.lng]
  );

  useEffect(() => {
    latestSelectionRef.current = { airportId, direction };
  }, [airportId, direction]);

  const removeRoutePolyline = useCallback(() => {
    routePolylineRef.current?.setMap(null);
    routePolylineRef.current = null;
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!isLoaded || !map || destLatLng) return;

    const id = requestAnimationFrame(() => {
      map.panTo(airportCenter);
      map.setZoom(10);
    });
    return () => cancelAnimationFrame(id);
  }, [isLoaded, airportCenter, destLatLng]);

  const clearRenderedRoute = useCallback(() => {
    routeRequestIdRef.current += 1;
    removeRoutePolyline();
    setError("");
    setRouteResult(null);
    onRouteCalculated(null);
    setRoutePath(null);
  }, [onRouteCalculated, removeRoutePolyline]);

  useEffect(() => {
    const map = mapRef.current;
    removeRoutePolyline();

    if (!isLoaded || !map || !routePath || routePath.length === 0) return;

    const polyline = new google.maps.Polyline({
      path: routePath,
      strokeColor: "#c46b3b",
      strokeOpacity: 0.85,
      strokeWeight: 4,
      zIndex: 1
    });

    polyline.setMap(map);
    routePolylineRef.current = polyline;

    return () => {
      polyline.setMap(null);
      if (routePolylineRef.current === polyline) {
        routePolylineRef.current = null;
      }
    };
  }, [isLoaded, removeRoutePolyline, routePath]);

  const calculateAndRender = useCallback(
    async (
      dest: LatLng,
      selection: { airportId?: string; direction?: "pickup" | "dropoff"; addressText?: string } = {}
    ) => {
      if (!isLoaded) return;

      const requestId = ++routeRequestIdRef.current;
      const selectedAirportId = selection.airportId ?? latestSelectionRef.current.airportId;
      const selectedDirection = selection.direction ?? latestSelectionRef.current.direction;
      const selectedAirportPos = AIRPORTS[selectedAirportId]?.latlng ?? AIRPORTS.narita.latlng;

      setError("");
      setDestLatLng(dest);
      setRouteResult(null);
      onRouteCalculated(null);
      removeRoutePolyline();
      setRoutePath(null);

      const { tollYen } = findNearestTollZone(dest, selectedAirportId);
      const origin: google.maps.LatLngLiteral =
        selectedDirection === "pickup"
          ? { lat: selectedAirportPos.lat, lng: selectedAirportPos.lng }
          : { lat: dest.lat, lng: dest.lng };
      const destination: google.maps.LatLngLiteral =
        selectedDirection === "pickup"
          ? { lat: dest.lat, lng: dest.lng }
          : { lat: selectedAirportPos.lat, lng: selectedAirportPos.lng };

      const route = await getDrivingRouteGoogleMaps(origin, destination);

      if (requestId !== routeRequestIdRef.current) return;

      if (!route || route.path.length === 0) {
        setError(t.notFound);
        setRouteResult(null);
        onRouteCalculated(null);
        removeRoutePolyline();
        setRoutePath(null);
        return;
      }

      const fare = calculateAirportFareEstimate({
        airportId: selectedAirportId,
        direction: selectedDirection,
        destination: dest,
        routeDistanceKm: route.distanceKm,
        tollYen,
        addressText: selection.addressText ?? address
      });

      if (requestId !== routeRequestIdRef.current) return;

      setRoutePath(route.path);

      const map = mapRef.current;
      if (map) {
        const b = new google.maps.LatLngBounds();
        route.path.forEach((p) => b.extend(p));
        b.extend({ lat: selectedAirportPos.lat, lng: selectedAirportPos.lng });
        b.extend({ lat: dest.lat, lng: dest.lng });
        map.fitBounds(b, 60);
      }

      const result: RouteResult = {
        airportId: selectedAirportId,
        airportName: t[selectedAirportId as "narita" | "haneda"],
        direction: selectedDirection,
        distanceKm: route.distanceKm,
        durationMin: route.durationMin,
        tollYen,
        destLat: dest.lat,
        destLng: dest.lng,
        destName: address.trim() || selection.addressText || "",
        estimateLowYen: fare.low,
        estimateHighYen: fare.high
      };

      if (requestId !== routeRequestIdRef.current) return;

      setRouteResult(result);
      onRouteCalculated(result);
    },
    [address, isLoaded, onRouteCalculated, removeRoutePolyline, t]
  );

  const handleDirectionChange = (nextDirection: "pickup" | "dropoff") => {
    if (nextDirection === direction) return;
    latestSelectionRef.current = { airportId, direction: nextDirection };
    setDirection(nextDirection);
    clearRenderedRoute();

    if (destLatLng && isLoaded) {
      void calculateAndRender(destLatLng, { direction: nextDirection });
    }
  };

  const handleAirportChange = (nextAirportId: string) => {
    if (nextAirportId === airportId) return;
    latestSelectionRef.current = { airportId: nextAirportId, direction };
    setAirportId(nextAirportId);
    clearRenderedRoute();

    if (destLatLng && isLoaded) {
      void calculateAndRender(destLatLng, { airportId: nextAirportId });
    }
  };

  const handleSearch = async () => {
    if (!address.trim() || !isLoaded) return;

    setSearching(true);
    setError("");
    const query = /japan|tokyo|chiba|kanagawa/i.test(address) ? address : `${address}, Tokyo, Japan`;
    const geo = await geocodeAddressGoogleMaps(query);

    if (geo) {
      await calculateAndRender(geo, { addressText: geo.formattedAddress });
    } else {
      setError(t.notFound);
      setRouteResult(null);
      onRouteCalculated(null);
      setRoutePath(null);
    }

    setSearching(false);
  };

  const whatsAppHref = useMemo(() => {
    if (!routeResult) return "";

    const routeLabel =
      direction === "pickup"
        ? `${airportName} to ${address || "my hotel"}`
        : `${address || "my hotel"} to ${airportName}`;

    return buildWhatsAppLink(
      [
        "Hello, I would like to confirm a Tokyo airport transfer quote.",
        "",
        `Route: ${routeLabel}`,
        `Estimated fare shown: ${formatYen(routeResult.estimateLowYen)} - ${formatYen(routeResult.estimateHighYen)}`,
        `Distance: ${routeResult.distanceKm} km`,
        `Estimated drive time: ${formatDuration(routeResult.durationMin)}`,
        `Toll estimate: ${formatYen(routeResult.tollYen)}`,
        "",
        "Passenger count:",
        "Luggage:",
        "Flight number:",
        "Pickup date and time:"
      ].join("\n")
    );
  }, [address, airportName, direction, routeResult]);

  const mapBlock = (() => {
    if (!apiKey) {
      return (
        <div className="flex h-[320px] items-center justify-center rounded-lg border border-ember/30 bg-ember/5 px-4 text-center text-sm text-ink/70">
          {t.mapKeyMissing}
        </div>
      );
    }
    if (loadError) {
      const msg = loadError instanceof Error ? loadError.message : String(loadError);
      return (
        <div className="flex h-[320px] flex-col items-center justify-center gap-2 rounded-lg border border-ember/30 bg-ember/5 px-4 text-center text-sm text-ink/70">
          <p>{t.mapLoadFailed}</p>
          {msg ? <p className="max-w-md font-mono text-xs text-ink/50">{msg}</p> : null}
        </div>
      );
    }
    if (mapAuthFailed) {
      return (
        <div className="flex h-[320px] items-center justify-center rounded-lg border border-ember/30 bg-ember/5 px-4 text-center text-sm leading-6 text-ink/70">
          {t.mapAuthFailed}
        </div>
      );
    }
    if (!isLoaded) {
      return (
        <div className="flex h-[320px] items-center justify-center rounded-lg border border-clay/60 bg-sand/30">
          <p className="text-sm text-ink/50">{t.mapLoading}</p>
        </div>
      );
    }
    return (
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "320px" }}
        center={airportCenter}
        zoom={10}
        options={mapOptions}
        onLoad={(map) => {
          mapRef.current = map;
        }}
        onUnmount={() => {
          removeRoutePolyline();
          mapRef.current = null;
        }}
      >
        <Marker key={airportId} position={airportCenter} title={airportName} icon={blueDotIcon} zIndex={200} />
        {destLatLng && (
          <Marker
            position={{ lat: destLatLng.lat, lng: destLatLng.lng }}
            draggable
            icon={redDotIcon}
            zIndex={500}
            onDragEnd={(e) => {
              const ll = e.latLng;
              if (!ll) return;
              calculateAndRender({ lat: ll.lat(), lng: ll.lng() });
            }}
          />
        )}
      </GoogleMap>
    );
  })();

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => handleDirectionChange("pickup")}
          className={`h-11 rounded-lg px-4 text-sm font-semibold transition ${
            direction === "pickup"
              ? "bg-ink text-white shadow-lift"
              : "border border-clay/60 bg-white text-ink/70 hover:bg-sand"
          }`}
        >
          {t.pickup}
        </button>
        <button
          type="button"
          onClick={() => handleDirectionChange("dropoff")}
          className={`h-11 rounded-lg px-4 text-sm font-semibold transition ${
            direction === "dropoff"
              ? "bg-ink text-white shadow-lift"
              : "border border-clay/60 bg-white text-ink/70 hover:bg-sand"
          }`}
        >
          {t.dropoff}
        </button>
      </div>

      <div className="grid gap-3 lg:grid-cols-[0.82fr_1.18fr]">
        <label className="grid gap-2 text-sm font-medium text-ink">
          {t.airport}
          <select
            value={airportId}
            onChange={(event) => handleAirportChange(event.target.value)}
            className="h-12 w-full rounded-lg border border-clay/60 bg-white px-4 text-base font-normal focus:border-ember focus:outline-none focus:ring-2 focus:ring-ember/30"
          >
            <option value="narita">{t.narita}</option>
            <option value="haneda">{t.haneda}</option>
          </select>
        </label>

        <label className="grid gap-2 text-sm font-medium text-ink">
          {t.address}
          <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
            <input
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") handleSearch();
              }}
              placeholder={t.hint}
              className="h-12 min-w-0 rounded-lg border border-clay/60 px-4 text-base font-normal focus:border-ember focus:outline-none focus:ring-2 focus:ring-ember/30"
            />
            <button
              type="button"
              onClick={handleSearch}
              disabled={searching || !address.trim() || !isLoaded || !apiKey}
              className="h-12 rounded-lg bg-ember px-5 text-sm font-semibold text-white transition hover:bg-ember/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {searching ? t.searching : t.search}
            </button>
          </div>
        </label>
      </div>

      {error && (
        <div className="rounded-lg border border-ember/30 bg-ember/5 px-4 py-3 text-sm text-ink/70">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-lg border border-clay/60 bg-sand/30">{mapBlock}</div>

      {routeResult ? (
        <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-lg border border-ember/20 bg-ember/5 p-5">
            <p className="text-sm font-semibold text-ember">{t.total}</p>
            <p className="mt-2 text-3xl font-bold tracking-tight text-ink">
              {formatYen(routeResult.estimateLowYen)} - {formatYen(routeResult.estimateHighYen)}
            </p>
            <p className="mt-3 text-sm leading-6 text-ink/65">{t.note}</p>
            <a
              href={whatsAppHref}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-lg bg-ink px-4 text-sm font-semibold text-white transition hover:bg-ink/90"
              onClick={() =>
                trackAnalyticsEvent("route_quote_confirm", {
                  route_airport: routeResult.airportId,
                  route_direction: routeResult.direction,
                  estimate_low_yen: routeResult.estimateLowYen,
                  estimate_high_yen: routeResult.estimateHighYen
                })
              }
            >
              {t.confirm}
            </a>
          </div>

          <div className="rounded-lg border border-clay/60 bg-white p-5 shadow-soft">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-xs font-medium text-ink/50">{t.distance}</p>
                <p className="mt-1 text-lg font-semibold text-ink">{routeResult.distanceKm} km</p>
              </div>
              <div>
                <p className="text-xs font-medium text-ink/50">{t.time}</p>
                <p className="mt-1 text-lg font-semibold text-ink">{formatDuration(routeResult.durationMin)}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-ink/50">{t.toll}</p>
                <p className="mt-1 text-lg font-semibold text-ink">{formatYen(routeResult.tollYen)}</p>
              </div>
            </div>

            <div className="mt-5 border-t border-clay/50 pt-4">
              <p className="text-sm font-semibold text-ink">{t.included}</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {t.includedItems.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-ink/70">
                    <span className="h-1.5 w-1.5 rounded-full bg-ember" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-clay/60 bg-white px-4 py-5 text-center text-sm text-ink/55">
          {t.empty}
        </div>
      )}

      <p className="text-xs leading-5 text-ink/50">{t.drag}</p>
    </div>
  );
}
