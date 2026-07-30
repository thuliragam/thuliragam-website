import {
  Sprout,
  Droplets,
  Sun,
  Settings,
  Package,
} from "lucide-react";

const steps = [
  {
    icon: Sprout,
    title: "Carefully Selected Ingredients",
    description:
      "Fresh herbs and vegetables are selected to ensure quality and consistency.",
  },
  {
    icon: Droplets,
    title: "Cleaning",
    description:
      "Ingredients are thoroughly cleaned using hygienic practices before processing.",
  },
  {
    icon: Sun,
    title: "Gentle Drying",
    description:
      "Ingredients are dried under controlled conditions to help preserve their natural qualities.",
  },
  {
    icon: Settings,
    title: "Grinding & Sieving",
    description:
      "The dried ingredients are finely ground and sieved for a smooth, uniform texture.",
  },
  {
    icon: Package,
    title: "Quality Packing",
    description:
      "The finished powders are packed hygienically to help maintain freshness and quality.",
  },
];

export default function HerbalProcessing() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-600">
            Our Process
          </p>

          <h2 className="mt-4 text-4xl font-bold text-gray-900">
            From Nature to Your Kitchen
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-600">
            Every batch is processed with care, cleanliness, and attention to
            quality to deliver premium herbal powders.
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