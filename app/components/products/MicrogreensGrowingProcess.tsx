import {
  Sprout,
  Droplets,
  Leaf,
  Sun,
  Scissors,
  PackageCheck,
} from "lucide-react";

const steps = [
  {
    icon: Sprout,
    title: "Premium Seed Selection",
    description:
      "We carefully select high-quality, untreated seeds to ensure healthy and consistent growth.",
  },
  {
    icon: Droplets,
    title: "Soaking & Preparation",
    description:
      "Seeds are soaked under controlled conditions to encourage uniform germination.",
  },
  {
    icon: Leaf,
    title: "Natural Germination",
    description:
      "Seeds are germinated in a clean, controlled environment using sustainable growing practices.",
  },
  {
    icon: Sun,
    title: "Healthy Growth",
    description:
      "Microgreens are nurtured with the right balance of light, moisture, and airflow for optimal freshness.",
  },
  {
    icon: Scissors,
    title: "Fresh Harvest",
    description:
      "Harvested at the ideal stage to preserve maximum flavor, texture, and nutrition.",
  },
  {
    icon: PackageCheck,
    title: "Hygienic Packing",
    description:
      "Carefully packed using food-safe practices to maintain freshness and quality until delivery.",
  },
];

export default function MicrogreensGrowingProcess() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-600">
            Our Process
          </p>

          <h2 className="mt-4 text-4xl font-bold text-gray-900">
            From Seed to Fresh Harvest
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-600">
            Every tray of Thuliragam microgreens is cultivated with care,
            following a clean and hygienic process that delivers freshness,
            quality, and nutrition.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="rounded-2xl border border-green-100 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-5 inline-flex rounded-full bg-green-100 p-4">
                  <Icon className="h-8 w-8 text-green-600" />
                </div>

                <h3 className="mb-3 text-xl font-semibold text-gray-900">
                  {step.title}
                </h3>

                <p className="leading-7 text-gray-600">
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