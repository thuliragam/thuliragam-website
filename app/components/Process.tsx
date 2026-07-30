"use client";

import {
  Sprout,
  Droplets,
  Scissors,
  PackageCheck,
  Truck,
} from "lucide-react";

import FadeUp from "./FadeUp";
import SectionContainer from "./SectionContainer";
import SectionTitle from "./SectionTitle";

const steps = [
  {
    icon: <Sprout size={32} />,
    title: "Seed Selection",
    description:
      "Premium-quality seeds are carefully selected to ensure healthy and nutritious crops.",
  },
  {
    icon: <Droplets size={32} />,
    title: "Growing",
    description:
      "Microgreens are grown in a clean, controlled environment using sustainable methods.",
  },
  {
    icon: <Scissors size={32} />,
    title: "Harvesting",
    description:
      "Each crop is harvested at its peak freshness to retain maximum nutrition and flavor.",
  },
  {
    icon: <PackageCheck size={32} />,
    title: "Hygienic Packing",
    description:
      "Products are carefully cleaned, packed, and quality checked before dispatch.",
  },
  {
    icon: <Truck size={32} />,
    title: "Fresh Delivery",
    description:
      "Fresh and healthy products are delivered to customers with care and reliability.",
  },
];

export default function Process() {
  return (
    <SectionContainer
      id="process"
      className="bg-green-50"
    >
      <SectionTitle
        badge="🌱 OUR PROCESS"
        title="From Seed"
        highlight="to Your Table"
        description="Every Thuliragam product follows a careful journey to ensure freshness, nutrition, and quality."
      />

      <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-5">
        {steps.map((step, index) => (
          <FadeUp
            key={step.title}
            delay={index * 0.1}
          >
            <div className="group relative rounded-3xl bg-white p-8 text-center shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-700 transition-colors group-hover:bg-green-700 group-hover:text-white">
                {step.icon}
              </div>

              <div className="absolute left-6 top-6 flex h-9 w-9 items-center justify-center rounded-full bg-green-700 text-sm font-bold text-white">
                {index + 1}
              </div>

              <h3 className="mt-6 text-xl font-bold text-green-900">
                {step.title}
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                {step.description}
              </p>
            </div>
          </FadeUp>
        ))}
      </div>
    </SectionContainer>
  );
}