"use client";

import {
  CheckCircle2,
  Leaf,
  ShieldCheck,
  Truck,
  HeartHandshake,
  Sparkles,
} from "lucide-react";

import FadeUp from "./FadeUp";
import SectionContainer from "./SectionContainer";
import SectionTitle from "./SectionTitle";

const features = [
  {
    icon: <Leaf size={26} />,
    title: "Farm Fresh Ingredients",
    description:
      "Freshly harvested microgreens and carefully selected natural ingredients.",
  },
  {
    icon: <ShieldCheck size={26} />,
    title: "Quality Assured",
    description:
      "Every product is prepared with strict hygiene and quality standards.",
  },
  {
    icon: <Truck size={26} />,
    title: "Fresh Delivery",
    description:
      "Packed carefully to preserve freshness and delivered with care.",
  },
  {
    icon: <HeartHandshake size={26} />,
    title: "Customer First",
    description:
      "Your health and satisfaction are at the heart of everything we do.",
  },
];

export default function WhyChoose() {
  return (
    <SectionContainer
      id="why-choose"
      className="bg-white"
    >
      <SectionTitle
        badge="💚 WHY CHOOSE US"
        title="Why People Choose"
        highlight="Thuliragam"
        description="We combine nature, nutrition, freshness, and quality to deliver healthy food products you can trust."
      />

      <div className="mt-20 grid gap-10 lg:grid-cols-2">

        <FadeUp>

          <div className="rounded-3xl bg-gradient-to-br from-green-700 to-green-600 p-10 text-white shadow-2xl">

            <div className="flex items-center gap-3">
              <Sparkles className="text-yellow-300" />
              <h3 className="text-3xl font-bold">
                Our Promise
              </h3>
            </div>

            <p className="mt-6 text-lg leading-8 text-green-100">
              We are committed to providing fresh, natural, and nutritious
              products that promote a healthier lifestyle while supporting
              sustainable farming practices.
            </p>

            <div className="mt-10 space-y-5">

              {[
                "100% Natural Products",
                "Freshly Harvested",
                "Hygienically Processed",
                "No Artificial Additives",
                "Customer Satisfaction",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2
                    className="text-green-200"
                    size={22}
                  />

                  <span className="text-lg">
                    {item}
                  </span>
                </div>
              ))}

            </div>

          </div>

        </FadeUp>

        <div className="grid gap-6">

          {features.map((feature, index) => (
            <FadeUp
              key={feature.title}
              delay={index * 0.1}
            >
              <div className="rounded-3xl border border-green-100 bg-white p-7 shadow-lg transition-all hover:-translate-y-1 hover:border-green-300 hover:shadow-xl">

                <div className="flex items-start gap-5">

                  <div className="rounded-2xl bg-green-100 p-4 text-green-700">
                    {feature.icon}
                  </div>

                  <div>

                    <h3 className="text-xl font-bold text-green-900">
                      {feature.title}
                    </h3>

                    <p className="mt-2 leading-7 text-gray-600">
                      {feature.description}
                    </p>

                  </div>

                </div>

              </div>
            </FadeUp>
          ))}

        </div>

      </div>

    </SectionContainer>
  );
}