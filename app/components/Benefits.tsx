
"use client";

import {
  ShieldPlus,
  HeartPulse,
  Brain,
  Dumbbell,
  Sparkles,
  Salad,
  Leaf,
} from "lucide-react";

import FadeUp from "./FadeUp";
import SectionContainer from "./SectionContainer";
import SectionTitle from "./SectionTitle";

const benefits = [
  {
    icon: ShieldPlus,
    number: "01",
    title: "Boosts Immunity",
    description:
      "Packed with natural nutrients that support your immune system.",
  },
  {
    icon: HeartPulse,
    number: "02",
    title: "Heart Friendly",
    description:
      "A healthy diet supports overall heart wellness.",
  },
  {
    icon: Brain,
    number: "03",
    title: "Supports Mental Wellness",
    description:
      "Nutritious foods help maintain focus and overall well-being.",
  },
  {
    icon: Dumbbell,
    number: "04",
    title: "Natural Energy",
    description:
      "Feel energized with wholesome, nutrient-rich foods.",
  },
  {
    icon: Sparkles,
    number: "05",
    title: "Rich in Antioxidants",
    description:
      "Naturally contains antioxidants found in plant-based foods.",
  },
  {
    icon: Salad,
    number: "06",
    title: "Healthy Lifestyle",
    description:
      "A simple addition to your everyday balanced diet.",
  },
];

export default function Benefits() {
  return (
    <SectionContainer
      id="benefits"
      className="bg-[#FBFBF3]"
    >
      <SectionTitle
        badge="THE GOODNESS OF MICROGREENS"
        title="Small Greens,"
        highlight="Everyday Wellness"
        description="Discover how microgreens can become a colourful, nutrient-rich addition to your everyday meals and balanced lifestyle."
      />

      {/* BENEFIT CARDS */}
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

        {benefits.map((item, index) => {
          const Icon = item.icon;

          return (
            <FadeUp key={item.number} delay={index * 0.08}>
              <article className="group relative flex h-full min-h-[205px] flex-col overflow-hidden rounded-[24px] border border-white/10 bg-[#063D20] p-6 shadow-[0_10px_30px_rgba(6,61,32,0.09)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_18px_40px_rgba(6,61,32,0.18)] sm:p-7">

                {/* Decorative number */}
                <span className="pointer-events-none absolute -right-1 -top-5 text-7xl font-black text-white/[0.045]">
                  {item.number}
                </span>

                {/* Icon */}
                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-[#B9E65A] text-[#063D20] transition-transform duration-300 group-hover:rotate-6">
                  <Icon size={25} strokeWidth={1.8} />
                </div>

                {/* Content */}
                <div className="relative mt-5">
                  <h3 className="text-lg font-bold leading-snug text-white sm:text-xl">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-white/65">
                    {item.description}
                  </p>
                </div>

                {/* Accent */}
                <div className="relative mt-auto pt-5">
                  <div className="h-1 w-10 rounded-full bg-[#B9E65A] transition-all duration-300 group-hover:w-16" />
                </div>
              </article>
            </FadeUp>
          );
        })}

      </div>

      {/* BOTTOM BRAND MESSAGE */}
      <FadeUp delay={0.5}>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 rounded-[24px] border border-[#075B25]/10 bg-[#E8FFF1] px-6 py-7 text-center sm:flex-row sm:text-left">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#B9E65A] text-[#063D20]">
            <Leaf size={25} />
          </div>

          <div>
            <h3 className="text-lg font-bold text-[#063D20]">
              Good Food. Greener Choices.
            </h3>

            <p className="mt-1 text-sm leading-6 text-[#355B45]">
              Add the freshness and variety of microgreens to your everyday meals.
            </p>
          </div>

        </div>
      </FadeUp>
    </SectionContainer>
  );
}
