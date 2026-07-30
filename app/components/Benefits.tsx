import {
  ShieldPlus,
  HeartPulse,
  Brain,
  Dumbbell,
  Sparkles,
  Salad,
} from "lucide-react";

const benefits = [
  {
    icon: ShieldPlus,
    title: "Boosts Immunity",
    description:
      "Packed with natural nutrients that support your immune system.",
  },
  {
    icon: HeartPulse,
    title: "Heart Friendly",
    description:
      "A healthy diet supports overall heart wellness.",
  },
  {
    icon: Brain,
    title: "Supports Mental Wellness",
    description:
      "Nutritious foods help maintain focus and overall well-being.",
  },
  {
    icon: Dumbbell,
    title: "Natural Energy",
    description:
      "Feel energized with wholesome, nutrient-rich foods.",
  },
  {
    icon: Sparkles,
    title: "Rich in Antioxidants",
    description:
      "Naturally contains antioxidants found in plant-based foods.",
  },
  {
    icon: Salad,
    title: "Healthy Lifestyle",
    description:
      "A simple addition to your everyday balanced diet.",
  },
];

export default function Benefits() {
  return (
    <section 
    id="benefits"
    className="py-24 bg-[#F7FCF8]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-16">

          <p className="text-green-700 uppercase tracking-[3px] font-semibold">
            Why Choose Thuliragam
          </p>

          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-green-900">
            Health Benefits
          </h2>

          <p className="mt-5 text-gray-600 max-w-3xl mx-auto leading-8">
            Discover how our naturally grown products can become an essential
            part of your healthy lifestyle while supporting everyday wellness.
          </p>

        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {benefits.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="bg-white border border-green-100 rounded-3xl p-8 shadow-md hover:shadow-2xl hover:-translate-y-3 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">

                  <Icon className="w-8 h-8 text-green-700" />

                </div>

                <h3 className="text-xl font-bold text-green-900 mb-4">
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-7">
                  {item.description}
                </p>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}