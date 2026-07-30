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
        badge="🤝 TRUST & QUALITY"
        title="Committed to"
        highlight="Excellence"
        description="At Thuliragam, every product reflects our dedication to freshness, quality, sustainability, and customer satisfaction."
      />

      <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

        <FadeUp delay={0.1}>
          <FeatureCard
            icon={<Leaf size={32} />}
            title="100% Natural"
            description="Prepared using carefully selected natural ingredients without artificial additives."
          />
        </FadeUp>

        <FadeUp delay={0.2}>
          <FeatureCard
            icon={<ShieldCheck size={32} />}
            title="Quality Assured"
            description="Every product is processed with strict hygiene and quality control standards."
          />
        </FadeUp>

        <FadeUp delay={0.3}>
          <FeatureCard
            icon={<Award size={32} />}
            title="Premium Quality"
            description="We focus on delivering products with superior freshness, taste, and nutritional value."
          />
        </FadeUp>

        <FadeUp delay={0.4}>
          <FeatureCard
            icon={<Truck size={32} />}
            title="Reliable Delivery"
            description="Packed carefully and delivered with freshness, care, and consistency."
          />
        </FadeUp>

      </div>

      <FadeUp delay={0.5}>
        <div className="mt-20 rounded-3xl bg-gradient-to-r from-green-700 to-green-600 p-10 text-center shadow-xl">

          <h3 className="text-4xl font-bold text-white">
            Freshness in Every Bite.
          </h3>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-green-100">
            Our commitment is simple—provide healthy, natural, and premium food
            products that you and your family can enjoy with confidence every day.
          </p>

        </div>
      </FadeUp>

    </SectionContainer>
  );
}