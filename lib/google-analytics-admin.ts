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

export type AnalyticsSummary = {
  configured: boolean;
  message?: string;
  propertyId?: string;
  dateRangeLabel: string;
  totals: {
    pageViews: number;
    whatsappClicks: number;
  };
};

function configuredResponse(message: string): AnalyticsSummary {
  return {
    configured: false,
    message,
    dateRangeLabel: "Last 30 days",
    totals: {
      pageViews: 0,
      whatsappClicks: 0
    }
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

    const [totalsReport, eventReport] = await Promise.all([
      client.runReport({
        property,
        dateRanges,
        metrics: [{ name: "screenPageViews" }]
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
              values: ["whatsapp_click"]
            }
          }
        }
      })
    ]);

    const totals = (totalsReport[0] as GaReport).rows?.[0];
    const eventRows = (eventReport[0] as GaReport).rows ?? [];

    const eventCounts = new Map(
      eventRows.map((row) => [row.dimensionValues?.[0]?.value ?? "", getMetric(row, 0)])
    );
    const whatsappClicks = eventCounts.get("whatsapp_click") ?? 0;

    return {
      configured: true,
      propertyId,
      dateRangeLabel: `Last ${days} days`,
      totals: {
        pageViews: getMetric(totals, 0),
        whatsappClicks
      }
    };
  } catch (error) {
    return configuredResponse(formatAnalyticsError(error));
  }
}
