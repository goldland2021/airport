type ReviewsProps = {
  title?: string;
  subtitle?: string;
  reviews: string[];
};

export default function Reviews({
  title = "Traveler Reviews",
  subtitle = "Consistent five-star feedback from international travelers.",
  reviews
}: ReviewsProps) {
  return (
    <section className="section">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">{subtitle}</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {reviews.map((review, index) => (
            <div key={review} className="card p-6">
              <p className="text-ember text-lg" aria-label="5 star review">
                ★★★★★
              </p>
              <p className="mt-3 text-ink/80">{review}</p>
              <p className="mt-4 text-xs text-ink/50">Review {index + 1}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
