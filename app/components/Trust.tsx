
"use client";

import {
  ShieldCheck,
  Leaf,
  Award,
  Truck,
  Sparkles,
} from "lucide-react";

import FadeUp from "./FadeUp";
import SectionContainer from "./SectionContainer";
import SectionTitle from "./SectionTitle";

const trustPoints = [
  {
    icon: <Leaf size={27} />,
    number: "01",
    title: "100% Natural",
    description:
      "Fresh microgreens grown with care, without synthetic fertilizers or pesticides.",
  },
  {
    icon: <ShieldCheck size={27} />,
    number: "02",
    title: "Quality Assured",
    description:
      "Every batch is handled with attention to hygiene, freshness, and quality.",
  },
  {
    icon: <Award size={27} />,
    number: "03",
    title: "Premium Quality",
    description:
      "Carefully selected microgreen varieties harvested at the right growth stage.",
  },
  {
    icon: <Truck size={27} />,
    number: "04",
    title: "Fresh Delivery",
    description:
      "Freshly harvested microgreens packed carefully and delivered with care.",
  },
];

export default function Trust() {
  return (
    <SectionContainer
      id="trust"
      className="bg-[#FBFBF3]"
    >
      <SectionTitle
        badge="🌱 WHY THULIRAGAM"
        title="Nature's Finest,"
        highlight="Delivered Fresh"
        description="Every microgreen is grown and prepared with care to ensure freshness, nutrition, and quality."
      />

      {/* TRUST CARDS */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {trustPoints.map((point, index) => (
          <FadeUp key={point.number} delay={index * 0.1}>
            <article className="group relative flex h-full min-h-[205px] flex-col overflow-hidden rounded-[24px] border border-white/10 bg-[#063D20] p-6 shadow-[0_10px_30px_rgba(6,61,32,0.10)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_18px_38px_rgba(6,61,32,0.20)]">

              {/* Background number */}
              <span className="absolute -right-1 -top-5 text-7xl font-black text-white/[0.045]">
                {point.number}
              </span>

              {/* Icon */}
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-[#B9E65A] text-[#063D20] transition-transform duration-300 group-hover:rotate-6">
                {point.icon}
              </div>

              <h3 className="relative mt-5 text-lg font-bold text-white">
                {point.title}
              </h3>

              <p className="relative mt-2 text-sm leading-6 text-white/65">
                {point.description}
              </p>

              <div className="mt-auto pt-5">
                <div className="h-1 w-10 rounded-full bg-[#B9E65A] transition-all duration-300 group-hover:w-16" />
              </div>
            </article>
          </FadeUp>
        ))}
      </div>

      {/* BRAND PROMISE */}
      <FadeUp delay={0.4}>
        <div className="relative mt-7 overflow-hidden rounded-[28px] bg-[#063D20] px-6 py-9 text-center shadow-[0_15px_40px_rgba(6,61,32,0.15)] sm:px-12 sm:py-10">

          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full border border-[#B9E65A]/15" />
          <div className="pointer-events-none absolute -right-2 -top-10 h-44 w-44 rounded-full border border-[#B9E65A]/15" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full border border-[#B9E65A]/10" />

          <div className="relative z-10">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#B9E65A]">
              <Sparkles size={21} className="text-[#063D20]" />
            </div>

            <p className="mt-4 text-xs font-bold uppercase tracking-[0.25em] text-[#B9E65A]">
              A Naturally Better Choice
            </p>

            <h3 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl md:text-4xl">
              Freshness in Every Bite.
            </h3>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
              From freshly harvested microgreens to your everyday meals,
              Thuliragam brings nature's goodness and nutrition to every home.
            </p>

            <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-[#B9E65A]" />
          </div>
        </div>
      </FadeUp>
    </SectionContainer>
  );
}
