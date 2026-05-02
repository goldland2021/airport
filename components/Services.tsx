type ServicesProps = {
  title?: string;
  subtitle?: string;
  services: string[];
  itemNote?: string;
  locale?: string;
};

export default function Services({
  title = "Airport Transfer Services",
  subtitle = "Reliable, private transport with fixed pricing and meet-and-greet service.",
  services,
  itemNote = "Door-to-door, on time, and stress free.",
  locale = "en"
}: ServicesProps) {
  const waitingNote =
    locale === "zh"
      ? "接机免费等待90分钟，送机免费等待30分钟"
      : locale === "ja"
        ? "お迎え90分無料待機、お送り30分無料待機"
        : "90 min free waiting for pickup, 30 min for drop-off";

  return (
    <section className="section">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">{subtitle}</p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <div key={service} className="card p-6">
              <p className="text-lg font-medium">{service}</p>
              <p className="mt-2 text-sm text-ink/60">{itemNote}</p>
              <p className="mt-1 text-xs text-ember font-medium">{waitingNote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
