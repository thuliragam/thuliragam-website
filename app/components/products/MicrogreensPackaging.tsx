import {
  PackageCheck,
  Refrigerator,
  Truck,
  ShieldCheck,
} from "lucide-react";

const packagingFeatures = [
  {
    icon: PackageCheck,
    title: "Food-Grade Packaging",
    description:
      "Packed in clean, food-grade containers to help preserve freshness and quality.",
  },
  {
    icon: Refrigerator,
    title: "Fresh Daily Harvest",
    description:
      "Harvested and packed on the same day whenever possible to deliver peak freshness.",
  },
  {
    icon: Truck,
    title: "Careful Delivery",
    description:
      "Handled with care to ensure your microgreens reach you in excellent condition.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assurance",
    description:
      "Every batch is handled with hygiene and care before it reaches our customers.",
  },
];

export default function MicrogreensPackaging() {
  return (
    <section className="bg-green-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-600">
            Packaging & Freshness
          </p>

          <h2 className="mt-4 text-4xl font-bold text-gray-900">
            Freshness You Can Trust
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-600">
            From harvest to delivery, we take every step to maintain the quality,
            freshness, and hygiene of our premium microgreens.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {packagingFeatures.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-5 inline-flex rounded-full bg-green-100 p-4">
                  <Icon className="h-8 w-8 text-green-600" />
                </div>

                <h3 className="mb-3 text-xl font-semibold text-gray-900">
                  {item.title}
                </h3>

                <p className="leading-7 text-gray-600">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}