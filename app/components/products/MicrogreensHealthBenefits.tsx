import {
  HeartPulse,
  ShieldCheck,
  Leaf,
  Dumbbell,
  Sparkles,
  Apple,
} from "lucide-react";

const benefits = [
  {
    icon: HeartPulse,
    title: "Supports Heart Health",
    description:
      "Microgreens contain nutrients and antioxidants that support a balanced and heart-healthy lifestyle.",
  },
  {
    icon: ShieldCheck,
    title: "Boosts Immunity",
    description:
      "Naturally rich in vitamins and minerals that help support the body's immune system.",
  },
  {
    icon: Leaf,
    title: "Rich in Nutrients",
    description:
      "Harvested young to provide concentrated vitamins, minerals, and antioxidants.",
  },
  {
    icon: Dumbbell,
    title: "Supports an Active Lifestyle",
    description:
      "A nutritious addition to daily meals for those who value health and wellness.",
  },
  {
    icon: Sparkles,
    title: "Fresh & Hygienic",
    description:
      "Grown with care, harvested fresh, and hygienically packed to maintain quality.",
  },
  {
    icon: Apple,
    title: "Easy to Enjoy",
    description:
      "Perfect for salads, sandwiches, wraps, smoothies, soups, and many healthy recipes.",
  },
];

export default function MicrogreensHealthBenefits() {
  return (
    <section className="py-20 bg-green-50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-green-600">
            Health Benefits
          </p>

          <h2 className="mt-3 text-4xl font-bold text-gray-900">
            Why Include Microgreens in Your Daily Diet?
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-600">
            Microgreens are young edible greens harvested at their peak freshness.
            They add vibrant flavor, color, and nutrition to everyday meals.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="rounded-2xl border border-green-100 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
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