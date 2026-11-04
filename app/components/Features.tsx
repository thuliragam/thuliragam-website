
"use client";

import {
  Leaf,
  Sprout,
  ShieldCheck,
  HeartPulse,
} from "lucide-react";

import FadeUp from "./FadeUp";
import FeatureCard from "./FeatureCard";
import SectionContainer from "./SectionContainer";
import SectionTitle from "./SectionTitle";

export default function Features() {
  return (
    <SectionContainer
      id="features"
      className="bg-[#F6F3E9]"
    >
      <SectionTitle
        badge="WHY THULIRAGAM MICROGREENS"
        title="Small Greens,"
        highlight="Big Nutrition"
        description="Discover the goodness of fresh microgreens — young, vibrant greens grown with care to bring freshness, flavour and plant-based nutrition to your everyday meals."
      />

      {/* Microgreens feature cards */}
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-20 xl:grid-cols-4">

        <FadeUp delay={0.1}>
          <FeatureCard
            icon={<Leaf size={30} strokeWidth={1.6} />}
            title="Fresh & Vibrant"
            description="Enjoy young greens with vibrant colours, fresh textures and distinctive natural flavours."
          />
        </FadeUp>

        <FadeUp delay={0.2}>
          <FeatureCard
            icon={<Sprout size={30} strokeWidth={1.6} />}
            title="Grown with Care"
            description="Every microgreen variety is cultivated with attention to its growing stage and quality."
          />
        </FadeUp>

        <FadeUp delay={0.3}>
          <FeatureCard
            icon={<ShieldCheck size={30} strokeWidth={1.6} />}
            title="Carefully Handled"
            description="Handled and packed with care to maintain freshness and quality from harvest to delivery."
          />
        </FadeUp>

        <FadeUp delay={0.4}>
          <FeatureCard
            icon={<HeartPulse size={30} strokeWidth={1.6} />}
            title="Everyday Nutrition"
            description="Add a colourful, nutrient-rich touch to salads, sandwiches, smoothies and everyday meals."
          />
        </FadeUp>

      </div>

      {/* Premium microgreens brand banner */}
      <FadeUp delay={0.5}>
        <div className="relative mt-16 overflow-hidden rounded-[1.5rem] border border-[#C5A568]/25 bg-[#006B35] px-6 py-10 text-center shadow-[0_24px_60px_rgba(0,107,53,0.18)] sm:mt-20 sm:rounded-[2rem] sm:px-12 sm:py-14">

          <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#78966D]/20 blur-[80px]" />

          <div className="relative mx-auto max-w-3xl">

            <p className="text-xs font-medium uppercase tracking-[0.32em] text-[#D5BD86]">
              Freshness Begins with Nature
            </p>

            <h3 className="mt-5 text-3xl font-medium leading-tight tracking-tight text-[#F6F3E9] sm:text-4xl lg:text-5xl">
              A Little Green. A Lot of Goodness.
            </h3>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#D8E2D7] sm:text-base sm:leading-8">
              At Thuliragam, we grow fresh microgreens with care,
              bringing together nature's colours, flavours and
              goodness. Make every meal a little greener with
              the freshness of young greens.
            </p>

            <div className="mx-auto mt-8 h-px w-16 bg-[#C5A568]" />

          </div>
        </div>
      </FadeUp>

    </SectionContainer>
  );
}
