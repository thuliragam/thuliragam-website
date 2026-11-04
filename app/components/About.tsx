
"use client";

import Image from "next/image";
import { Leaf, Target, Eye, Sprout } from "lucide-react";

import FadeUp from "./FadeUp";
import SectionContainer from "./SectionContainer";
import SectionTitle from "./SectionTitle";
import StatCard from "./StatCard";

export default function About() {
  return (
    <SectionContainer
      id="about"
      className="bg-[#F0FDF4]"
    >
      <SectionTitle
        badge="ABOUT THULIRAGAM"
        title="A World of Greens,"
        highlight="One Purpose"
        description="Thuliragam is a microgreens-focused venture built around the possibilities of young edible plants. We bring diverse varieties closer to everyday kitchens and inspire people to explore a greener way of eating."
      />

      <div className="mt-14 grid items-center gap-12 lg:mt-20 lg:grid-cols-2 lg:gap-16">

        {/* About image */}
        <FadeUp>
          <div className="group relative mx-auto w-full max-w-[620px]">
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-r from-emerald-200 to-green-100 opacity-70 blur-2xl" />

            <div className="relative overflow-hidden rounded-[1.6rem] border border-emerald-100 bg-white shadow-[0_20px_60px_rgba(16,185,129,0.15)]">
              <Image
                src="/images/about.jpg"
                alt="Microgreens cultivated at Thuliragam"
                width={650}
                height={650}
                className="aspect-square w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-green-950/65 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200">
                  Our Passion
                </p>

                <p className="mt-2 max-w-sm text-2xl font-semibold leading-snug text-white sm:text-3xl">
                  Celebrating the little greens that make a difference.
                </p>
              </div>
            </div>

            <div className="absolute -bottom-5 -right-3 hidden rounded-2xl border border-emerald-100 bg-white px-5 py-4 shadow-xl sm:block">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                Our Focus
              </p>

              <p className="mt-1 text-sm font-semibold text-green-950">
                The World of Microgreens
              </p>
            </div>
          </div>
        </FadeUp>

        {/* About content */}
        <div className="lg:pl-2">

          <FadeUp>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">
              Who We Are
            </p>

            <h3 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-green-950 sm:text-4xl lg:text-5xl">
              More Than
              <span className="mt-1 block font-normal text-emerald-600">
                Just Little Greens.
              </span>
            </h3>
          </FadeUp>

          <FadeUp delay={0.15}>
            <p className="mt-6 text-base leading-8 text-gray-600 sm:text-lg">
              We believe that good food begins with curiosity.
              From familiar favourites to distinctive microgreen
              varieties, Thuliragam brings together a colourful
              world of young edible plants. Our journey is about
              encouraging people to discover new flavours,
              experiment with ingredients and make room for
              microgreens in their daily food choices.
            </p>
          </FadeUp>

          {/* Mission card */}
          <FadeUp delay={0.25}>
            <div className="mt-9 rounded-2xl border border-emerald-100 bg-white p-6 shadow-[0_8px_24px_rgba(16,185,129,0.10)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(16,185,129,0.18)]">
              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <Target size={25} />
                </div>

                <div>
                  <h4 className="text-xl font-bold text-green-900">
                    Our Mission
                  </h4>

                  <p className="mt-2 leading-6 text-gray-600">
                    Introduce the versatility of microgreens to
                    more households and make them an exciting
                    ingredient in everyday cooking.
                  </p>
                </div>

              </div>
            </div>
          </FadeUp>

          {/* Vision card */}
          <FadeUp delay={0.35}>
            <div className="mt-5 rounded-2xl border border-emerald-100 bg-white p-6 shadow-[0_8px_24px_rgba(16,185,129,0.10)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(16,185,129,0.18)]">
              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <Eye size={25} />
                </div>

                <div>
                  <h4 className="text-xl font-bold text-green-900">
                    Our Vision
                  </h4>

                  <p className="mt-2 leading-6 text-gray-600">
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

      {/* Brand highlights */}
      <div className="mt-20 border-t border-emerald-200 pt-10 sm:mt-24 sm:pt-12">

        <FadeUp>
          <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">
            Our World of Microgreens
          </p>
        </FadeUp>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <FadeUp delay={0.1}>
            <StatCard
              icon={<Leaf size={25} />}
              value="16+"
              label="Microgreen Varieties"
            />
          </FadeUp>

          <FadeUp delay={0.2}>
            <StatCard
              icon={<Sprout size={25} />}
              value="Diverse"
              label="Colours & Flavours"
            />
          </FadeUp>

          <FadeUp delay={0.3}>
            <StatCard
              icon={<Target size={25} />}
              value="Focused"
              label="Microgreens Only"
            />
          </FadeUp>

          <FadeUp delay={0.4}>
            <StatCard
              icon={<Eye size={25} />}
              value="Growing"
              label="A Greener Food Culture"
            />
          </FadeUp>

        </div>
      </div>
    </SectionContainer>
  );
}
