
"use client";

import Image from "next/image";
import { Leaf, Target, Eye, Sprout, ArrowUpRight } from "lucide-react";

import FadeUp from "./FadeUp";
import SectionContainer from "./SectionContainer";
import SectionTitle from "./SectionTitle";

const highlights = [
  {
    icon: <Leaf size={23} />,
    value: "16+",
    label: "Microgreen Varieties",
  },
  {
    icon: <Sprout size={23} />,
    value: "Diverse",
    label: "Colours & Flavours",
  },
  {
    icon: <Target size={23} />,
    value: "Focused",
    label: "Microgreens Only",
  },
  {
    icon: <Eye size={23} />,
    value: "Growing",
    label: "A Greener Food Culture",
  },
];

export default function About() {
  return (
    <SectionContainer
      id="about"
      className="bg-[#FBFBF3]"
    >
      <SectionTitle
        badge="ABOUT THULIRAGAM"
        title="A World of Greens,"
        highlight="One Purpose"
        description="Thuliragam is a microgreens-focused venture built around the possibilities of young edible plants. We bring diverse varieties closer to everyday kitchens and inspire people to explore a greener way of eating."
      />

      <div className="mt-10 grid items-center gap-9 lg:grid-cols-2 lg:gap-14">

        {/* ABOUT IMAGE */}
        <FadeUp>
          <div className="group relative mx-auto w-full max-w-[560px]">

            <div className="absolute -inset-3 rounded-[30px] bg-[#B9E65A]/20 blur-2xl" />

            <div className="relative overflow-hidden rounded-[26px] border border-[#075B25]/10 bg-white shadow-[0_20px_50px_rgba(6,61,32,0.13)]">

              <Image
                src="/images/about.jpg"
                alt="Microgreens cultivated at Thuliragam"
                width={650}
                height={650}
                className="aspect-[5/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#063D20]/85 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B9E65A]">
                  Our Passion
                </p>

                <p className="mt-2 max-w-sm text-2xl font-bold leading-tight text-white sm:text-3xl">
                  Celebrating the little greens that make a difference.
                </p>
              </div>
            </div>

            {/* Floating label */}
            <div className="absolute -bottom-4 -right-2 hidden rounded-2xl border border-[#075B25]/10 bg-white px-5 py-4 shadow-xl sm:block">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#00A844]">
                Our Focus
              </p>
              <p className="mt-1 text-sm font-bold text-[#063D20]">
                The World of Microgreens
              </p>
            </div>
          </div>
        </FadeUp>

        {/* ABOUT CONTENT */}
        <div className="lg:pl-2">

          <FadeUp>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#00A844]">
              Who We Are
            </p>

            <h3 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-[#063D20] sm:text-4xl lg:text-[42px]">
              More Than
              <span className="mt-1 block text-[#00A844]">
                Just Little Greens.
              </span>
            </h3>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p className="mt-5 text-sm leading-7 text-[#355B45] sm:text-base sm:leading-8">
              We believe that good food begins with curiosity.
              From familiar favourites to distinctive microgreen
              varieties, Thuliragam brings together a colourful
              world of young edible plants. Our journey is about
              encouraging people to discover new flavours,
              experiment with ingredients and make room for
              microgreens in their daily food choices.
            </p>
          </FadeUp>

          {/* MISSION */}
          <FadeUp delay={0.2}>
            <div className="mt-6 rounded-[22px] border border-[#075B25]/10 bg-white p-5 shadow-[0_8px_24px_rgba(6,61,32,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-start gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E8FFF1] text-[#075B25]">
                  <Target size={25} />
                </div>

                <div>
                  <h4 className="text-lg font-bold text-[#063D20]">
                    Our Mission
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-[#355B45]">
                    Introduce the versatility of microgreens to
                    more households and make them an exciting
                    ingredient in everyday cooking.
                  </p>
                </div>

              </div>
            </div>
          </FadeUp>

          {/* VISION */}
          <FadeUp delay={0.3}>
            <div className="mt-4 rounded-[22px] border border-[#B9E65A]/30 bg-[#063D20] p-5 shadow-[0_8px_24px_rgba(6,61,32,0.10)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-start gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#B9E65A] text-[#063D20]">
                  <Eye size={25} />
                </div>

                <div>
                  <h4 className="text-lg font-bold text-white">
                    Our Vision
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-white/70">
                    Build a recognised Indian microgreens brand
                    that connects modern food culture with the
                    possibilities of growing young greens.
                  </p>
                </div>

              </div>
            </div>
          </FadeUp>

        </div>
      </div>

      {/* BRAND HIGHLIGHTS */}
      <div className="mt-12 border-t border-[#075B25]/15 pt-8">

        <FadeUp>
          <div className="mb-7 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-[#B9E65A]" />
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#075B25]">
              Our World of Microgreens
            </p>
            <div className="h-px w-8 bg-[#B9E65A]" />
          </div>
        </FadeUp>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {highlights.map((item, index) => (
            <FadeUp key={item.label} delay={index * 0.08}>
              <div className="group flex h-full items-center gap-3 rounded-2xl border border-[#075B25]/10 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#B9E65A] hover:shadow-md sm:p-5">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8FFF1] text-[#075B25] transition-colors group-hover:bg-[#B9E65A]">
                  {item.icon}
                </div>

                <div className="min-w-0">
                  <p className="text-base font-extrabold text-[#063D20] sm:text-lg">
                    {item.value}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#355B45]">
                    {item.label}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

    </SectionContainer>
  );
}
