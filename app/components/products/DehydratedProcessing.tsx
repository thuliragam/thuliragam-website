import {
  Carrot,
  Droplets,
  Sun,
  Settings,
  Package,
} from "lucide-react";

const steps = [
  {
    icon: Carrot,
    title: "Fresh Vegetable Selection",
    description:
      "Fresh vegetables are carefully selected to ensure consistent quality and freshness before processing.",
  },
  {
    icon: Droplets,
    title: "Cleaning & Preparation",
    description:
      "Vegetables are thoroughly cleaned, sorted, and prepared under hygienic conditions.",
  },
  {
    icon: Sun,
    title: "Controlled Dehydration",
    description:
      "Vegetables are dehydrated under controlled conditions to help retain their natural characteristics.",
  },
  {
    icon: Settings,
    title: "Quality Inspection",
    description:
      "Every batch is inspected to ensure consistent quality before packaging.",
  },
  {
    icon: Package,
    title: "Safe Packaging",
    description:
      "Finished products are hygienically packed in food-grade packaging to help maintain freshness.",
  },
];

export default function DehydratedProcessing() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-600">
            Our Process
          </p>

          <h2 className="mt-4 text-4xl font-bold text-gray-900">
            From Fresh Harvest to Convenient Ingredients
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-600">
            Our dehydrated vegetables are processed with care, cleanliness,
            and quality checks at every stage to deliver reliable products.
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