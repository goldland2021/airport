type GaMetricValue = {
  value?: string | null;
};

type GaDimensionValue = {
  value?: string | null;
};

type GaRow = {
  dimensionValues?: GaDimensionValue[];
  metricValues?: GaMetricValue[];
};

type GaReport = {
  rows?: GaRow[];
  totals?: { metricValues?: GaMetricValue[] }[];
};

export type CountryStat = {
  country: string;
  activeUsers: number;
};

export type EventStat = {
  eventName: string;
  label: string;
  count: number;
};

export type DailyStat = {
  date: string;
  activeUsers: number;
  sessions: number;
};

export type AnalyticsSummary = {
  configured: boolean;
  message?: string;
  propertyId?: string;
  dateRangeLabel: string;
  totals: {
    activeUsers: number;
    newUsers: number;
    sessions: number;
    pageViews: number;
  };
  countries: CountryStat[];
  events: EventStat[];
  daily: DailyStat[];
};

const trackedEventLabels: Record<string, string> = {
  whatsapp_click: "WhatsApp button clicks",
  whatsapp_inquiry_submit: "Booking form inquiries",
  route_quote_confirm: "Map quote confirmations"
};

function configuredResponse(message: string): AnalyticsSummary {
  return {
    configured: false,
    message,
    dateRangeLabel: "Last 30 days",
    totals: {
      activeUsers: 0,
      newUsers: 0,
      sessions: 0,
      pageViews: 0
    },
    countries: [],
    events: Object.entries(trackedEventLabels).map(([eventName, label]) => ({
      eventName,
      label,
      count: 0
    })),
    daily: []
  };
}

function getMissingConfigNames(propertyId: string, hasCredentials: boolean) {
  const missing: string[] = [];

  if (!propertyId) missing.push("GA_PROPERTY_ID");
  if (!hasCredentials) missing.push("GA_CLIENT_EMAIL", "GA_PRIVATE_KEY");

  return missing;
}

function hasCredentialConfig() {
  if (process.env.GA_SERVICE_ACCOUNT_JSON || process.env.GOOGLE_ANALYTICS_SERVICE_ACCOUNT_JSON) {
    return true;
  }

  const clientEmail =
    process.env.GA_CLIENT_EMAIL || process.env.GOOGLE_ANALYTICS_CLIENT_EMAIL || "";
  const privateKey =
    process.env.GA_PRIVATE_KEY || process.env.GOOGLE_ANALYTICS_PRIVATE_KEY || "";

  return Boolean(clientEmail && privateKey);
}

function formatAnalyticsError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error || "");

  if (!message || message === "undefined undefined: undefined") {
    return [
      "GA4 Data API 暂时无法读取数据。",
      "请检查 GA_PROPERTY_ID 是否是数字 Property ID，服务账号是否已加入 GA4 property 并拥有 Viewer 权限，GA_PRIVATE_KEY 是否完整包含换行符。"
    ].join(" ");
  }

  return message;
}

function getMetric(row: GaRow | undefined, index: number) {
  return Number(row?.metricValues?.[index]?.value ?? 0);
}

function formatDate(value: string) {
  if (value.length !== 8) return value;
  return `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`;
}

function getPropertyId() {
  return (process.env.GA_PROPERTY_ID || process.env.GOOGLE_ANALYTICS_PROPERTY_ID || "").replace(
    /^properties\//,
    ""
  );
}

function getCredentials() {
  const jsonValue =
    process.env.GA_SERVICE_ACCOUNT_JSON || process.env.GOOGLE_ANALYTICS_SERVICE_ACCOUNT_JSON || "";

  if (jsonValue) {
    try {
      const parsed = JSON.parse(jsonValue) as {
        client_email?: string;
        private_key?: string;
      };
      if (parsed.client_email && parsed.private_key) {
        return {
          client_email: parsed.client_email,
          private_key: parsed.private_key.replace(/\\n/g, "\n")
        };
      }
    } catch {
      return null;
    }
  }

  const clientEmail =
    process.env.GA_CLIENT_EMAIL || process.env.GOOGLE_ANALYTICS_CLIENT_EMAIL || "";
  const privateKey =
    process.env.GA_PRIVATE_KEY || process.env.GOOGLE_ANALYTICS_PRIVATE_KEY || "";

  if (!clientEmail || !privateKey) return null;

  return {
    client_email: clientEmail,
    private_key: privateKey.replace(/\\n/g, "\n")
  };
}

export async function getAnalyticsSummary(days = 30): Promise<AnalyticsSummary> {
  const propertyId = getPropertyId();
  const credentialConfigExists = hasCredentialConfig();
  const credentials = getCredentials();

  if (!propertyId || !credentials) {
    const missing = getMissingConfigNames(propertyId, credentialConfigExists);

    return configuredResponse(
      missing.length
        ? `GA4 Data API 还没有连接完成。Vercel 环境变量缺少：${missing.join(", ")}。`
        : "GA4 Data API 凭证格式不正确。请检查 GA_CLIENT_EMAIL 和 GA_PRIVATE_KEY，或改用完整的 GA_SERVICE_ACCOUNT_JSON。"
    );
  }

  try {
    const { BetaAnalyticsDataClient } = await import("@google-analytics/data");
    const client = new BetaAnalyticsDataClient({ credentials });
    const property = `properties/${propertyId}`;
    const dateRanges = [{ startDate: `${days}daysAgo`, endDate: "today" }];

    const [totalsReport, countryReport, eventReport, dailyReport] = await Promise.all([
      client.runReport({
        property,
        dateRanges,
        metrics: [
          { name: "activeUsers" },
          { name: "newUsers" },
          { name: "sessions" },
          { name: "screenPageViews" }
        ]
      }),
      client.runReport({
        property,
        dateRanges,
        dimensions: [{ name: "country" }],
        metrics: [{ name: "activeUsers" }],
        orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
        limit: 12
      }),
      client.runReport({
        property,
        dateRanges,
        dimensions: [{ name: "eventName" }],
        metrics: [{ name: "eventCount" }],
        dimensionFilter: {
          filter: {
            fieldName: "eventName",
            inListFilter: {
              values: Object.keys(trackedEventLabels)
            }
          }
        }
      }),
      client.runReport({
        property,
        dateRanges: [{ startDate: "13daysAgo", endDate: "today" }],
        dimensions: [{ name: "date" }],
        metrics: [{ name: "activeUsers" }, { name: "sessions" }],
        orderBys: [{ dimension: { dimensionName: "date" } }]
      })
    ]);

    const totals = (totalsReport[0] as GaReport).rows?.[0];
    const countryRows = (countryReport[0] as GaReport).rows ?? [];
    const eventRows = (eventReport[0] as GaReport).rows ?? [];
    const dailyRows = (dailyReport[0] as GaReport).rows ?? [];

    const eventCounts = new Map(
      eventRows.map((row) => [row.dimensionValues?.[0]?.value ?? "", getMetric(row, 0)])
    );

    return {
      configured: true,
      propertyId,
      dateRangeLabel: `Last ${days} days`,
      totals: {
        activeUsers: getMetric(totals, 0),
        newUsers: getMetric(totals, 1),
        sessions: getMetric(totals, 2),
        pageViews: getMetric(totals, 3)
      },
      countries: countryRows.map((row) => ({
        country: row.dimensionValues?.[0]?.value || "Unknown",
        activeUsers: getMetric(row, 0)
      })),
      events: Object.entries(trackedEventLabels).map(([eventName, label]) => ({
        eventName,
        label,
        count: eventCounts.get(eventName) ?? 0
      })),
      daily: dailyRows.map((row) => ({
        date: formatDate(row.dimensionValues?.[0]?.value ?? ""),
        activeUsers: getMetric(row, 0),
        sessions: getMetric(row, 1)
      }))
    };
  } catch (error) {
    return configuredResponse(formatAnalyticsError(error));
  }
}
