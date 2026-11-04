
"use client";

import {
  ShieldCheck,
  Leaf,
  Award,
  Truck,
} from "lucide-react";

import FadeUp from "./FadeUp";
import FeatureCard from "./FeatureCard";
import SectionContainer from "./SectionContainer";
import SectionTitle from "./SectionTitle";

export default function Trust() {
  return (
    <SectionContainer
      id="trust"
      className="bg-white"
    >
      <SectionTitle
        badge="🌱 WHY THULIRAGAM"
        title="Nature's Finest,"
        highlight="Delivered Fresh"
        description="Every microgreen is grown and prepared with care to ensure freshness, nutrition, and quality."
      />

      {/* FEATURE CARDS */}
      <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

        <FadeUp delay={0.1}>
          <FeatureCard
            icon={<Leaf size={32} />}
            title="100% Natural"
            description="Fresh microgreens grown with care, without synthetic fertilizers or pesticides."
          />
        </FadeUp>

        <FadeUp delay={0.2}>
          <FeatureCard
            icon={<ShieldCheck size={32} />}
            title="Quality Assured"
            description="Every batch is handled with attention to hygiene, freshness, and quality."
          />
        </FadeUp>

        <FadeUp delay={0.3}>
          <FeatureCard
            icon={<Award size={32} />}
            title="Premium Quality"
            description="Carefully selected microgreen varieties harvested at the right growth stage."
          />
        </FadeUp>

        <FadeUp delay={0.4}>
          <FeatureCard
            icon={<Truck size={32} />}
            title="Fresh Delivery"
            description="Freshly harvested microgreens packed carefully and delivered with care."
          />
        </FadeUp>

      </div>

      {/* BRIGHT GREEN PROMISE SECTION */}
      <FadeUp delay={0.5}>
        <div className="relative mt-20 overflow-hidden rounded-3xl bg-gradient-to-r from-[#00A844] via-[#00C853] to-[#39E75F] p-10 text-center shadow-[0_20px_50px_rgba(0,168,68,0.20)] sm:p-14">

          {/* Decorative glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/20 blur-3xl" />

          <p className="relative text-sm font-bold uppercase tracking-[0.3em] text-[#063D20]">
            A Naturally Better Choice
          </p>

          <h3 className="relative mt-5 text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
            Freshness in Every Bite.
          </h3>

          <p className="relative mx-auto mt-6 max-w-3xl text-base leading-8 text-[#063D20] sm:text-lg">
            From freshly harvested microgreens to your everyday meals,
            Thuliragam brings nature's goodness and nutrition to every home.
          </p>

          <div className="relative mx-auto mt-8 h-1 w-20 rounded-full bg-white" />

        </div>
      </FadeUp>

    </SectionContainer>
  );
}
