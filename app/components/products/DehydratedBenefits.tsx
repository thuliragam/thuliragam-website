import {
  Leaf,
  ShieldCheck,
  Sparkles,
  PackageCheck,
  Clock3,
  BadgeCheck,
} from "lucide-react";

const benefits = [
  {
    icon: Leaf,
    title: "Made from Fresh Vegetables",
    description:
      "Prepared using carefully selected fresh vegetables to deliver consistent quality.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Processing",
    description:
      "Processed under hygienic conditions with attention to quality at every stage.",
  },
  {
    icon: Sparkles,
    title: "Naturally Flavorful",
    description:
      "Designed to help retain the natural taste, color, and characteristics of the vegetables.",
  },
  {
    icon: Clock3,
    title: "Convenient to Use",
    description:
      "Easy to store and quick to use, making meal preparation more convenient.",
  },
  {
    icon: PackageCheck,
    title: "Hygienically Packed",
    description:
      "Packed in food-grade packaging to help maintain freshness and quality.",
  },
  {
    icon: BadgeCheck,
    title: "Reliable Quality",
    description:
      "Every batch is prepared with care for consistent quality and customer satisfaction.",
  },
];

export default function DehydratedBenefits() {
  return (
    <section className="bg-green-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-600">
            Why Choose Us
          </p>

          <h2 className="mt-4 text-4xl font-bold text-gray-900">
            Why Choose Thuliragam Dehydrated Vegetables?
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-600">
            We prepare premium dehydrated vegetables using hygienic processing
            methods to deliver convenience, quality, and freshness.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="rounded-2xl bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-5 inline-flex rounded-full bg-green-100 p-4">
                  <Icon className="h-8 w-8 text-green-600" />
                </div>

                <h3 className="mb-3 text-xl font-semibold text-gray-900">
                  {benefit.title}
                </h3>

                <p className="leading-7 text-gray-600">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}