import { CheckCircle2 } from "lucide-react";

const benefits = [
  "Naturally Grown",
  "Harvested Fresh Daily",
  "Rich in Vitamins & Minerals",
  "No Harmful Chemicals",
  "Hygienically Packed",
  "Perfect for Healthy Lifestyle",
];

export default function MicrogreensBenefits() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-green-600 font-semibold uppercase tracking-wider">
            Why Choose Us
          </span>

          <h2 className="mt-3 text-4xl font-bold text-gray-900">
            Why Choose Thuliragam Microgreens?
          </h2>

          <p className="mt-5 text-lg text-gray-600 max-w-3xl mx-auto">
            Every tray of microgreens is cultivated with care to ensure
            exceptional freshness, nutrition, and quality for you and your
            family.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm hover:shadow-lg transition"
            >
              <CheckCircle2 className="w-10 h-10 text-green-600 mb-4" />

              <h3 className="text-xl font-semibold text-gray-900">
                {item}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}