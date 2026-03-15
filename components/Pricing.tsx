type PricingItem = {
  route: string;
  price: string;
};

type PricingProps = {
  title?: string;
  subtitle?: string;
  items: PricingItem[];
  itemNote?: string;
};

export default function Pricing({
  title = "Price Guide",
  subtitle = "Fixed transparent pricing with no surprise fees.",
  items,
  itemNote = "Includes meet and greet."
}: PricingProps) {
  return (
    <section className="section grid-dots">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">{subtitle}</p>
        </div>
        <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-6 md:grid-cols-2">
          {items.map((item) => (
            <div key={item.route} className="card p-4 sm:p-6">
              <p className="text-base sm:text-lg font-medium">{item.route}</p>
              <p className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-semibold text-ember">{item.price}</p>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-ink/60">{itemNote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}