
"use client";

import {
  CheckCircle2,
  Leaf,
  ShieldCheck,
  Truck,
  HeartHandshake,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

import FadeUp from "./FadeUp";
import SectionContainer from "./SectionContainer";
import SectionTitle from "./SectionTitle";

const features = [
  {
    icon: <Leaf size={27} strokeWidth={1.7} />,
    title: "Farm Fresh Ingredients",
    description:
      "Freshly harvested microgreens and carefully selected natural ingredients.",
  },
  {
    icon: <ShieldCheck size={27} strokeWidth={1.7} />,
    title: "Quality Assured",
    description:
      "Every product is prepared with strict hygiene and quality standards.",
  },
  {
    icon: <Truck size={27} strokeWidth={1.7} />,
    title: "Fresh Delivery",
    description:
      "Packed carefully to preserve freshness and delivered with care.",
  },
  {
    icon: <HeartHandshake size={27} strokeWidth={1.7} />,
    title: "Customer First",
    description:
      "Your health and satisfaction are at the heart of everything we do.",
  },
];

const promises = [
  "100% Natural Products",
  "Freshly Harvested",
  "Hygienically Processed",
  "No Artificial Additives",
  "Customer Satisfaction",
];

export default function WhyChoose() {
  return (
    <SectionContainer
      id="why-choose"
      className="relative overflow-hidden bg-[#FBFBF3]"
    >
      {/* BACKGROUND DECORATION */}
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#B9E65A]/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#00A844]/10 blur-[100px]" />

      {/* SECTION HEADING */}
      <div className="relative z-10">
        <SectionTitle
          badge="🌿 WHY CHOOSE US"
          title="Why People Choose"
          highlight="Thuliragam"
          description="We combine nature, nutrition, freshness, and quality to deliver healthy food products you can trust."
        />
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 mx-auto mt-14 grid max-w-7xl items-stretch gap-7 lg:grid-cols-2 lg:gap-8">

        {/* OUR PROMISE */}
        <FadeUp>
          <div className="group relative flex h-full min-h-[470px] flex-col overflow-hidden rounded-[30px] border border-[#B9E65A]/20 bg-gradient-to-br from-[#063D20] via-[#075B25] to-[#006B35] p-7 text-white shadow-[0_20px_55px_rgba(6,61,32,0.18)] transition-all duration-500 hover:shadow-[0_25px_65px_rgba(6,61,32,0.25)] sm:p-10">

            {/* DECORATIVE GLOW */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#B9E65A]/10 blur-[70px]" />

            <Leaf
              size={170}
              strokeWidth={0.6}
              className="pointer-events-none absolute -right-8 -top-8 rotate-[-30deg] text-[#B9E65A]/10 transition-transform duration-700 group-hover:rotate-[-15deg]"
            />

            {/* TITLE */}
            <div className="relative z-10 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#B9E65A]/30 bg-[#B9E65A]/15 text-[#B9E65A]">
                <Sparkles size={23} />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B9E65A]">
                  THE THULIRAGAM PROMISE
                </p>

                <h3 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">
                  Our <span className="text-[#B9E65A]">Promise</span>
                </h3>
              </div>
            </div>

            {/* DESCRIPTION */}
            <p className="relative z-10 mt-7 max-w-lg text-sm leading-7 text-white/80 sm:text-base sm:leading-8">
              We are committed to providing fresh, natural, and nutritious
              products that promote a healthier lifestyle while supporting
              sustainable farming practices.
            </p>

            {/* PROMISE LIST */}
            <div className="relative z-10 mt-8 space-y-4">
              {promises.map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-3 transition-transform duration-300 hover:translate-x-1"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#B9E65A] text-[#063D20]">
                    <CheckCircle2 size={17} strokeWidth={2.5} />
                  </div>

                  <span className="text-sm font-semibold tracking-wide text-white sm:text-base">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* BOTTOM BRAND ACCENT */}
            <div className="relative z-10 mt-auto flex items-center justify-between border-t border-white/15 pt-6 mt-9">
              <span className="text-xs font-semibold tracking-[0.2em] text-[#B9E65A]">
                THULIRAGAM
              </span>

              <span className="text-xs font-medium text-white/60">
                Grow Healthier Tomorrow
              </span>
            </div>
          </div>
        </FadeUp>

        {/* FEATURE CARDS */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">

          {features.map((feature, index) => (
            <FadeUp
              key={feature.title}
              delay={index * 0.1}
            >
              <div className="group relative flex h-full min-h-[112px] items-center gap-5 overflow-hidden rounded-[23px] border border-[#DCEBCF] bg-white p-5 shadow-[0_5px_20px_rgba(6,61,32,0.045)] transition-all duration-500 hover:-translate-y-1 hover:border-[#B9E65A] hover:shadow-[0_15px_35px_rgba(6,61,32,0.10)] sm:p-6">

                {/* ICON */}
                <div className="flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-[19px] bg-[#EAF7D9] text-[#087C37] transition-all duration-300 group-hover:bg-[#B9E65A] group-hover:text-[#063D20] group-hover:scale-105">
                  {feature.icon}
                </div>

                {/* CONTENT */}
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-bold tracking-tight text-[#063D20] transition-colors group-hover:text-[#008F3D] sm:text-lg">
                    {feature.title}
                  </h3>

                  <p className="mt-1.5 text-sm leading-6 text-[#667266]">
                    {feature.description}
                  </p>
                </div>

                {/* ARROW */}
                <ArrowUpRight
                  size={19}
                  className="shrink-0 self-start text-[#9BCB68] transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#008F3D]"
                />

              </div>
            </FadeUp>
          ))}
        </div>
      </div>

    </SectionContainer>
  );
}
