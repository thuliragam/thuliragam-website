import {
  Leaf,
  ShieldCheck,
  Sparkles,
  PackageCheck,
  ChefHat,
  BadgeCheck,
} from "lucide-react";

const benefits = [
  {
    icon: Leaf,
    title: "Naturally Sourced",
    description:
      "Prepared from carefully selected spices sourced for quality and freshness.",
  },
  {
    icon: ShieldCheck,
    title: "Pure & Authentic",
    description:
      "Made without artificial colors or unnecessary additives.",
  },
  {
    icon: Sparkles,
    title: "Rich Aroma",
    description:
      "Processed to help retain the natural aroma and flavor of every spice.",
  },
  {
    icon: PackageCheck,
    title: "Hygienically Packed",
    description:
      "Packed using food-safe practices to maintain freshness and quality.",
  },
  {
    icon: ChefHat,
    title: "Perfect for Every Kitchen",
    description:
      "Suitable for home cooking, restaurants, catering, and food businesses.",
  },
  {
    icon: BadgeCheck,
    title: "Consistent Quality",
    description:
      "Every batch is prepared with attention to cleanliness and consistency.",
  },
];

export default function SpicesBenefits() {
  return (
    <section className="bg-green-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-600">
            Why Choose Us
          </p>

          <h2 className="mt-4 text-4xl font-bold text-gray-900">
            Why Choose Thuliragam Natural Spices?
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-600">
            We bring carefully selected spices to your kitchen with a focus on
            purity, freshness, hygiene, and consistent quality.
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