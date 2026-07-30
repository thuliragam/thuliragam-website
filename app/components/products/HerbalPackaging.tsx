import {
  PackageCheck,
  ShieldCheck,
  Leaf,
  Truck,
} from "lucide-react";

const features = [
  {
    icon: PackageCheck,
    title: "Food-Grade Packaging",
    description:
      "Packed in high-quality food-grade pouches designed to help preserve freshness and product quality.",
  },
  {
    icon: ShieldCheck,
    title: "Hygienically Sealed",
    description:
      "Each pack is carefully sealed to protect against moisture and external contaminants.",
  },
  {
    icon: Leaf,
    title: "Freshness Retention",
    description:
      "Our packaging is selected to help maintain the aroma, color, and natural characteristics of the powders.",
  },
  {
    icon: Truck,
    title: "Retail & Bulk Supply",
    description:
      "Available in convenient retail packs as well as larger quantities for commercial customers.",
  },
];

export default function HerbalPackaging() {
  return (
    <section className="bg-green-50 py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-600">
            Packaging & Quality
          </p>

          <h2 className="mt-4 text-4xl font-bold text-gray-900">
            Freshness You Can Trust
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-600">
            Every herbal powder is packed with care to help preserve quality,
            freshness, and convenience from production to delivery.
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