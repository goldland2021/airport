import Image from "next/image";

type Vehicle = {
  name: string;
  passengers: string;
  image: string;
  alt: string;
};

type VehiclesProps = {
  title?: string;
  subtitle?: string;
  vehicles: Vehicle[];
};

export default function Vehicles({
  title = "Vehicles",
  subtitle = "Spacious, clean vehicles suited for solo travelers, families, and groups.",
  vehicles
}: VehiclesProps) {
  return (
    <section className="section bg-sand">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">{subtitle}</p>
        </div>
        <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-6 md:grid-cols-3">
          {vehicles.map((vehicle) => (
            <div key={vehicle.name} className="card overflow-hidden">
              <Image
                src={vehicle.image}
                alt={vehicle.alt}
                width={520}
                height={360}
                className="h-36 sm:h-44 w-full object-cover image-warm"
              />
              <div className="p-4 sm:p-5">
                <h3 className="text-lg sm:text-xl font-semibold">{vehicle.name}</h3>
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-ink/70">{vehicle.passengers}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}