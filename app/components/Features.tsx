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
      className="bg-white"
    >
      <SectionTitle
        badge="🌿 WHY THULIRAGAM"
        title="Nature's Finest,"
        highlight="Delivered Fresh"
        description="Every product is grown and prepared with care to ensure maximum freshness, nutrition, and quality."
      />

      <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

        <FadeUp delay={0.1}>
          <FeatureCard
            icon={<Leaf size={34} />}
            title="100% Natural"
            description="Pure products made from carefully selected natural ingredients without artificial additives."
          />
        </FadeUp>

        <FadeUp delay={0.2}>
          <FeatureCard
            icon={<Sprout size={34} />}
            title="Farm Fresh"
            description="Harvested daily to preserve freshness, nutrients, and exceptional taste."
          />
        </FadeUp>

        <FadeUp delay={0.3}>
          <FeatureCard
            icon={<ShieldCheck size={34} />}
            title="Hygienically Packed"
            description="Processed and packed in a clean environment following strict quality standards."
          />
        </FadeUp>

        <FadeUp delay={0.4}>
          <FeatureCard
            icon={<HeartPulse size={34} />}
            title="Healthy Living"
            description="Nutritious food products that support a healthier lifestyle for you and your family."
          />
        </FadeUp>

      </div>

      {/* Bottom Banner */}

      <FadeUp delay={0.5}>
        <div className="mt-20 rounded-[32px] bg-gradient-to-r from-green-700 to-green-600 p-10 text-center shadow-xl">

          <h3 className="text-3xl font-bold text-white">
            Freshness in Every Bite.
          </h3>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-green-100">
            From premium microgreens to herbal powders, natural spices,
            and dehydrated vegetables, Thuliragam is committed to
            delivering nutritious products that help you live healthier
            every day.
          </p>

        </div>
      </FadeUp>

    </SectionContainer>
  );
}