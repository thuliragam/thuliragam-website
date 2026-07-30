import {
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";

const features = [
  {
    icon: PackageCheck,
    title: "Food-Grade Packaging",
    description:
      "Packed in premium food-grade pouches designed to help preserve freshness and quality.",
  },
  {
    icon: ShieldCheck,
    title: "Hygienically Sealed",
    description:
      "Every pack is securely sealed to help protect against moisture and maintain product integrity.",
  },
  {
    icon: Sparkles,
    title: "Fresh Aroma Protection",
    description:
      "Packaging is selected to help retain the natural aroma, color, and flavor of every spice.",
  },
  {
    icon: Truck,
    title: "Retail & Bulk Supply",
    description:
      "Available in multiple pack sizes for homes, retailers, restaurants, and wholesale buyers.",
  },
];

export default function SpicesPackaging() {
  return (
    <section className="bg-green-50 py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-600">
            Packaging & Quality
          </p>

          <h2 className="mt-4 text-4xl font-bold text-gray-900">
            Sealed for Freshness
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-600">
            Every pack is carefully prepared to help preserve the authentic
            aroma, flavor, and quality of our natural spices from production to
            your kitchen.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-5 inline-flex rounded-full bg-green-100 p-4">
                  <Icon className="h-8 w-8 text-green-600" />
                </div>

                <h3 className="mb-3 text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>

                <p className="leading-7 text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}