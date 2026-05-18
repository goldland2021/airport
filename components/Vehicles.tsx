"use client";

import { useState } from "react";
import Image from "next/image";

type Vehicle = {
  name: string;
  passengers: string;
  image: string;
  alt: string;
  galleryImages?: string[];
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
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  return (
    <section className="section bg-sand">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">{subtitle}</p>
        </div>
        <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-6 md:grid-cols-3">
          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.name}
              vehicle={vehicle}
              onOpen={vehicle.galleryImages?.length ? () => setSelectedVehicle(vehicle) : undefined}
            />
          ))}
        </div>
      </div>

      {selectedVehicle?.galleryImages?.length ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={selectedVehicle.name}
          onClick={() => setSelectedVehicle(null)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-lg bg-white shadow-lift"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close"
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-2xl leading-none text-ink shadow-soft transition hover:bg-white"
              onClick={() => setSelectedVehicle(null)}
            >
              ×
            </button>
            <div className="grid gap-3 p-3 sm:grid-cols-2">
              {selectedVehicle.galleryImages.map((image, index) => (
                <Image
                  key={image}
                  src={image}
                  alt={`${selectedVehicle.name} photo ${index + 1}`}
                  width={900}
                  height={650}
                  className="h-[320px] w-full rounded-lg object-cover sm:h-[520px]"
                />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function VehicleCard({
  vehicle,
  onOpen
}: {
  vehicle: Vehicle;
  onOpen?: () => void;
}) {
  const content = (
    <>
      <Image
        src={vehicle.image}
        alt={vehicle.alt}
        width={520}
        height={360}
        className="h-36 w-full object-cover image-warm sm:h-44"
      />
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold sm:text-xl">{vehicle.name}</h3>
          {vehicle.galleryImages?.length ? (
            <span className="shrink-0 rounded-full bg-ember/10 px-2.5 py-1 text-xs font-semibold text-ember">
              {vehicle.galleryImages.length} photos
            </span>
          ) : null}
        </div>
        <p className="mt-1 text-xs text-ink/70 sm:mt-2 sm:text-sm">{vehicle.passengers}</p>
      </div>
    </>
  );

  if (!onOpen) {
    return <div className="card overflow-hidden">{content}</div>;
  }

  return (
    <button
      type="button"
      className="card overflow-hidden text-left transition hover:-translate-y-0.5 hover:shadow-lift focus:outline-none focus:ring-2 focus:ring-ember/40"
      onClick={onOpen}
    >
      {content}
    </button>
  );
}
