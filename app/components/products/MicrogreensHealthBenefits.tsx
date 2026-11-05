
"use client";

import {
  HeartPulse,
  ShieldCheck,
  Leaf,
  Dumbbell,
  Sparkles,
  Apple,
} from "lucide-react";

import { motion, useReducedMotion } from "framer-motion";

const benefits = [
  {
    icon: HeartPulse,
    number: "01",
    title: "Supports Heart Health",
    description:
      "Microgreens contain nutrients and antioxidants that support a balanced and heart-healthy lifestyle.",
  },
  {
    icon: ShieldCheck,
    number: "02",
    title: "Boosts Immunity",
    description:
      "Naturally rich in vitamins and minerals that help support the body's immune system.",
  },
  {
    icon: Leaf,
    number: "03",
    title: "Rich in Nutrients",
    description:
      "Harvested young to provide concentrated vitamins, minerals, and antioxidants.",
  },
  {
    icon: Dumbbell,
    number: "04",
    title: "Supports an Active Lifestyle",
    description:
      "A nutritious addition to daily meals for those who value health and wellness.",
  },
  {
    icon: Sparkles,
    number: "05",
    title: "Fresh & Hygienic",
    description:
      "Grown with care, harvested fresh, and hygienically packed to maintain quality.",
  },
  {
    icon: Apple,
    number: "06",
    title: "Easy to Enjoy",
    description:
      "Perfect for salads, sandwiches, wraps, smoothies, soups, and many healthy recipes.",
  },
];

export default function MicrogreensHealthBenefits() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#F3F0E7] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* INTRODUCTION */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{
            duration: reduceMotion ? 0 : 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative overflow-hidden rounded-[2rem] bg-[#123D2D] px-7 py-12 text-white sm:px-12 sm:py-16"
        >
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-lime-300/10 blur-3xl" />

          <div className="relative z-10 max-w-3xl">
            <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#D9F36A]">
              <span className="h-px w-8 bg-[#D9F36A]" />
              Nutrition & Wellness
            </p>

            <h2 className="text-4xl font-bold leading-[1.12] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              Small Greens.
              <span className="block text-[#D9F36A]">
                Remarkable Nutrition.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-[#E0E9DC] sm:text-base sm:leading-8">
              Microgreens are young edible greens harvested at their peak
              freshness. They add vibrant flavour, colour, and nutrition
              to everyday meals.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <span className="h-1 w-12 rounded-full bg-[#D9F36A]" />
              <span className="h-1 w-5 rounded-full bg-white/40" />
              <span className="h-1 w-2 rounded-full bg-white/20" />
            </div>
          </div>
        </motion.div>

        {/* BENEFITS GRID */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <motion.article
                key={benefit.title}
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 80,
                        scale: 0.94,
                      }
                }
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                viewport={{
                  once: false,
                  amount: 0.1,
                }}
                transition={{
                  duration: reduceMotion ? 0 : 0.9,
                  delay: reduceMotion ? 0 : (index % 3) * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative overflow-hidden rounded-2xl border border-[#E2E0D4] bg-[#FAF8F1] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#A8B78C] hover:shadow-[0_15px_35px_rgba(18,61,45,0.09)] sm:p-8"
              >
                {/* CARD NUMBER */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold tracking-[0.2em] text-[#9AA48F]">
                    {benefit.number}
                  </span>

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E9EEDC] transition-colors duration-300 group-hover:bg-[#D9F36A]">
                    <Icon
                      className="h-6 w-6 text-[#315B36]"
                      strokeWidth={1.6}
                    />
                  </div>
                </div>

                {/* BENEFIT TITLE */}
                <h3 className="mt-7 text-xl font-bold leading-snug tracking-tight text-[#183D2B]">
                  {benefit.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="mt-3 text-sm leading-7 text-[#667365]">
                  {benefit.description}
                </p>

                {/* DECORATIVE DETAIL */}
                <div className="mt-7 h-px w-full bg-[#E3E1D6]" />

                <div className="mt-4 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#78934A]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#819078]">
                    Microgreens Nutrition
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
