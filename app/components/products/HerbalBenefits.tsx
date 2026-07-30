import {
  Leaf,
  ShieldCheck,
  Sparkles,
  PackageCheck,
  HeartPulse,
  BadgeCheck,
} from "lucide-react";

const benefits = [
  {
    icon: Leaf,
    title: "100% Natural",
    description:
      "Prepared from carefully selected herbs and vegetables without artificial additives.",
  },
  {
    icon: ShieldCheck,
    title: "Premium Quality",
    description:
      "Processed with care to maintain consistent quality and freshness.",
  },
  {
    icon: Sparkles,
    title: "Nutrient Rich",
    description:
      "Made from quality ingredients to support a healthy lifestyle.",
  },
  {
    icon: PackageCheck,
    title: "Hygienically Packed",
    description:
      "Packed using food-safe practices to help preserve freshness.",
  },
  {
    icon: HeartPulse,
    title: "Everyday Wellness",
    description:
      "A convenient way to include natural ingredients in your daily routine.",
  },
  {
    icon: BadgeCheck,
    title: "Quality You Can Trust",
    description:
      "Every batch is prepared with attention to cleanliness and consistency.",
  },
];

export default function HerbalBenefits() {
  return (
    <section className="bg-green-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-600">
            Why Choose Us
          </p>

          <h2 className="mt-4 text-4xl font-bold text-gray-900">
            Why Choose Thuliragam Herbal Powders?
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-600">
            Our herbal powders are made with carefully selected ingredients and
            processed with attention to quality, hygiene, and freshness.
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