import {
  ShoppingBasket,
  Droplets,
  Sun,
  Settings,
  Package,
} from "lucide-react";

const steps = [
  {
    icon: ShoppingBasket,
    title: "Carefully Selected Spices",
    description:
      "Premium-quality spices are carefully sourced and selected for freshness, aroma, and consistency.",
  },
  {
    icon: Droplets,
    title: "Cleaning",
    description:
      "Raw spices are cleaned thoroughly to remove dust and impurities before processing.",
  },
  {
    icon: Sun,
    title: "Controlled Drying",
    description:
      "Ingredients are dried under controlled conditions to help preserve their natural flavor, color, and aroma.",
  },
  {
    icon: Settings,
    title: "Grinding & Blending",
    description:
      "Spices are finely ground and blended with care to achieve a uniform texture and authentic taste.",
  },
  {
    icon: Package,
    title: "Quality Packaging",
    description:
      "Finished products are hygienically packed to help maintain freshness and long-lasting quality.",
  },
];

export default function SpicesProcessing() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-600">
            Our Process
          </p>

          <h2 className="mt-4 text-4xl font-bold text-gray-900">
            From Farm to Flavor
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-600">
            Every spice is processed with care, hygiene, and attention to
            quality to deliver authentic taste and aroma.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="rounded-2xl border border-green-100 bg-green-50 p-6 text-center transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white">
                  <Icon className="h-8 w-8 text-green-600" />
                </div>

                <h3 className="mb-3 text-lg font-semibold text-gray-900">
                  {step.title}
                </h3>

                <p className="text-sm leading-6 text-gray-600">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}