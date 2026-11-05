
"use client";

import {
  Sprout,
  Droplets,
  Scissors,
  PackageCheck,
  Truck,
  ArrowUpRight,
  Leaf,
} from "lucide-react";

import FadeUp from "./FadeUp";
import SectionContainer from "./SectionContainer";
import SectionTitle from "./SectionTitle";

const steps = [
  {
    icon: <Sprout size={29} />,
    number: "01",
    title: "Seed Selection",
    subtitle: "THE BEGINNING",
    description:
      "Premium-quality seeds are carefully selected to ensure healthy and nutritious crops.",
  },
  {
    icon: <Droplets size={29} />,
    number: "02",
    title: "Growing",
    subtitle: "NURTURED WITH CARE",
    description:
      "Microgreens are grown in a clean, controlled environment using sustainable methods.",
  },
  {
    icon: <Scissors size={29} />,
    number: "03",
    title: "Harvesting",
    subtitle: "THE FRESHEST MOMENT",
    description:
      "Each crop is harvested at its peak freshness to retain maximum nutrition and flavor.",
  },
  {
    icon: <PackageCheck size={29} />,
    number: "04",
    title: "Hygienic Packing",
    subtitle: "SEALED WITH CARE",
    description:
      "Products are carefully cleaned, packed, and quality checked before dispatch.",
  },
  {
    icon: <Truck size={29} />,
    number: "05",
    title: "Fresh Delivery",
    subtitle: "FRESH TO YOUR DOOR",
    description:
      "Fresh and healthy products are delivered to customers with care and reliability.",
  },
];

export default function Process() {
  return (
    <SectionContainer
      id="process"
      className="bg-[#FBFBF3] !py-9 lg:!py-7"
    >
      {/* AMBIENT BACKGROUND */}
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#B9E65A]/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#00A844]/10 blur-[100px]" />

      <div className="relative z-10">
        <SectionTitle
          badge="🌱 THE THULIRAGAM JOURNEY"
          title="From Seed"
          highlight="to Your Table"
          description="Every Thuliragam product follows a careful journey to ensure freshness, nutrition, and quality."
        />
      </div>

      {/* EDITORIAL PROCESS TIMELINE */}
      <div className="relative z-10 mx-auto mt-10 grid max-w-7xl gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-5 lg:gap-3">

        {steps.map((step, index) => {
          const featured = true;

          return (
            <FadeUp key={step.number} delay={index * 0.09}>
              <div
                className="group relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-[26px] border border-[#176B3C] bg-gradient-to-br from-[#063D20] via-[#075B25] to-[#064B2A] p-5 text-white shadow-[0_15px_35px_rgba(6,61,32,0.16)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_45px_rgba(6,61,32,0.25)] sm:p-6"
              >
                {/* LARGE BACKGROUND NUMBER */}
                <span
                  className={`pointer-events-none absolute -right-1 top-1 text-[88px] font-black leading-none tracking-tighter transition-transform duration-500 group-hover:-translate-y-2 group-hover:translate-x-1 ${
                    featured
                      ? "text-white/[0.07]"
                      : "text-[#075B25]/[0.045]"
                  }`}
                >
                  {step.number}
                </span>

                {/* DECORATIVE LEAF */}
                {featured && (
                  <Leaf
                    size={115}
                    strokeWidth={0.7}
                    className="pointer-events-none absolute -bottom-7 -right-7 rotate-[-30deg] text-[#B9E65A]/10"
                  />
                )}

                {/* TOP LABEL */}
                <div className="relative z-10 flex items-center justify-between">
                  <span
                    className={`text-[10px] font-extrabold tracking-[0.2em] ${
                      featured ? "text-[#B9E65A]" : "text-[#76965B]"
                    }`}
                  >
                    {step.subtitle}
                  </span>

                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold ${
                      featured
                        ? "bg-[#B9E65A] text-[#063D20]"
                        : "bg-[#EAF5DC] text-[#075B25]"
                    }`}
                  >
                    {step.number}
                  </span>
                </div>

                {/* ICON */}
                <div
                  className={`relative z-10 mt-7 flex h-[66px] w-[66px] items-center justify-center rounded-[21px] transition-all duration-500 group-hover:rotate-[-6deg] group-hover:scale-110 ${
                    featured
                      ? "bg-[#B9E65A] text-[#063D20] shadow-lg shadow-black/10"
                      : "bg-[#EAF5DC] text-[#087C37] group-hover:bg-[#B9E65A] group-hover:text-[#063D20]"
                  }`}
                >
                  {step.icon}
                </div>

                {/* CONTENT */}
                <div className="relative z-10 mt-6">
                  <h3
                    className={`text-xl font-extrabold leading-tight tracking-tight ${
                      featured ? "text-white" : "text-[#063D20]"
                    }`}
                  >
                    {step.title}
                  </h3>

                  <p
                    className={`mt-3 text-[13px] leading-[1.8] ${
                      featured ? "text-white/75" : "text-[#687568]"
                    }`}
                  >
                    {step.description}
                  </p>
                </div>

                {/* BOTTOM ACCENT */}
                <div className="relative z-10 mt-auto flex items-center justify-between pt-6">
                  <span
                    className={`h-[3px] w-10 rounded-full transition-all duration-500 group-hover:w-16 ${
                      featured ? "bg-[#B9E65A]" : "bg-[#00A844]"
                    }`}
                  />

                  <ArrowUpRight
                    size={19}
                    className={`transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 ${
                      featured ? "text-[#B9E65A]" : "text-[#83B85B]"
                    }`}
                  />
                </div>
              </div>
            </FadeUp>
          );
        })}
      </div>

      {/* FOOTER ACCENT */}
      <div className="relative z-10 mt-7 flex items-center justify-center gap-3">
        <span className="h-px w-12 bg-[#C8DDB6]" />
        <Leaf size={16} className="text-[#87B84E]" />
        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#52734B]">
          Grown with care. Delivered fresh.
        </span>
        <span className="h-px w-12 bg-[#C8DDB6]" />
      </div>
    </SectionContainer>
  );
}
