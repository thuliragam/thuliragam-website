"use client";

import { Star } from "lucide-react";

import FadeUp from "./FadeUp";
import SectionContainer from "./SectionContainer";
import SectionTitle from "./SectionTitle";

const testimonials = [
  {
    name: "Maanikam V.K",
    role: "Health Enthusiast",
    review:
      "The microgreens were incredibly fresh and delicious. You can really taste the quality and care that goes into every harvest.",
  },
  {
    name: "Karthigairani A",
    role: "Home Chef",
    review:
      "The natural spices have an amazing aroma and authentic flavor. My family loved the freshness compared to regular store products.",
  },
  {
    name: "Sairajah B",
    role: "Fitness Coach",
    review:
      "Thuliragam's herbal powders are pure, fresh, and easy to use. A great addition to a healthy daily routine.",
  },
];

export default function Testimonials() {
  return (
    <SectionContainer
      id="testimonials"
      className="bg-white"
    >
      <SectionTitle
        badge="⭐ TESTIMONIALS"
        title="What Our"
        highlight="Customers Say"
        description="Customer satisfaction inspires us to continue delivering fresh, natural, and high-quality products."
      />

      <div className="mt-20 grid gap-8 lg:grid-cols-3">

        {testimonials.map((testimonial, index) => (
          <FadeUp
            key={testimonial.name}
            delay={index * 0.15}
          >
            <div className="rounded-3xl border border-green-100 bg-white p-8 shadow-lg transition-all hover:-translate-y-2 hover:border-green-300 hover:shadow-2xl">

              <div className="mb-6 flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="leading-8 text-gray-600">
                "{testimonial.review}"
              </p>

              <div className="mt-8 flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-700 text-xl font-bold text-white">
                  {testimonial.name.charAt(0)}
                </div>

                <div>

                  <h3 className="font-bold text-green-900">
                    {testimonial.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {testimonial.role}
                  </p>

                </div>

              </div>

            </div>
          </FadeUp>
        ))}

      </div>
    </SectionContainer>
  );
}