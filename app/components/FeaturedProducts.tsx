
"use client";

import Image from "next/image";
import {
  ArrowRight,
  Sprout,
  Leaf,
  HeartPulse,
  CalendarDays,
  ShoppingBasket,
} from "lucide-react";

import FadeUp from "./FadeUp";
import SectionContainer from "./SectionContainer";
import SectionTitle from "./SectionTitle";
import Button from "./Button";

const products = [
  {
    title: "Fresh Microgreens",
    description:
      "Discover fresh, vibrant microgreens grown with care. Explore our varieties, growing journey, availability, and expected harvest dates.",
    image: "/images/microgreens.jpg",
    link: "/products/microgreens",
  },
];

const productHighlights = [
  {
    icon: Sprout,
    title: "Growing journey",
    description: "Follow the stages from seed to harvest.",
  },
  {
    icon: HeartPulse,
    title: "Vitamins & benefits",
    description: "Learn about the nutrition of each variety.",
  },
  {
    icon: Leaf,
    title: "Taste & texture",
    description: "Discover the flavour and texture of different greens.",
  },
  {
    icon: CalendarDays,
    title: "Harvest & availability",
    description: "Explore growing timelines and harvest readiness.",
  },
];

export default function FeaturedProducts() {
  return (
    <SectionContainer
      id="products"
      className="bg-[#F0FDF4]"
    >
      <SectionTitle
        vibrant
        badge="GROWN WITH CARE"
        title="Small Greens,"
        highlight="Big Possibilities"
        description="Explore the world of microgreens, from tiny seeds to fresh harvests."
      />

      {/* Featured product */}
      <div className="mx-auto mt-12 max-w-6xl sm:mt-16">
        {products.map((product, index) => (
          <FadeUp
            key={product.title}
            delay={index * 0.15}
            className="h-full"
          >
            <article className="group grid overflow-hidden rounded-[1.75rem] border border-emerald-100 bg-white shadow-[0_12px_40px_rgba(5,150,105,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(5,150,105,0.15)] md:grid-cols-2">

              {/* Product photograph */}
              <div className="relative min-h-[280px] overflow-hidden bg-emerald-100 sm:min-h-[380px] lg:min-h-[440px]">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#064E3B]/55 via-transparent to-transparent" />

                <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/95 px-4 py-2 text-xs font-semibold text-emerald-900 shadow-sm backdrop-blur">
                  <Sprout size={17} className="text-emerald-600" />
                  GROWN WITH CARE
                </div>

                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-100">
                    FROM SEED TO HARVEST
                  </p>
                  <p className="mt-2 text-2xl font-semibold leading-snug text-white sm:text-3xl">
                    Freshness begins with nature.
                  </p>
                </div>
              </div>

              {/* Product information */}
              <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-700">
                  <Leaf size={25} />
                </div>

                <p className="mt-6 text-xs font-bold uppercase tracking-[0.28em] text-emerald-700">
                  THULIRAGAM
                </p>

                <h3 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-[#064E3B] sm:text-4xl">
                  {product.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-[#52665A] sm:text-base sm:leading-8">
                  {product.description}
                </p>

                {/* Information customers can explore */}
                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  {productHighlights.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.title}
                        className="flex items-start gap-3 rounded-xl border border-emerald-100 bg-[#F7FDF8] p-3 transition-colors duration-300 hover:bg-emerald-50"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                          <Icon size={19} />
                        </div>

                        <div>
                          <h4 className="text-sm font-bold text-[#064E3B]">
                            {item.title}
                          </h4>
                          <p className="mt-1 text-xs leading-5 text-[#627468]">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Existing product link */}
                <div className="mt-8">
                  <Button href={product.link}>
                    Explore Microgreens
                    <ArrowRight className="ml-2" size={18} />
                  </Button>
                </div>

                <p className="mt-4 text-xs leading-6 text-gray-500">
                  Explore varieties, growing information, availability,
                  and product details.
                </p>
              </div>
            </article>
          </FadeUp>
        ))}
      </div>

      {/* Product information footer */}
      <FadeUp delay={0.25}>
        <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center justify-center gap-3 rounded-2xl border border-emerald-200 bg-white/80 px-5 py-5 text-center sm:flex-row sm:gap-4">
          <ShoppingBasket
            size={22}
            className="shrink-0 text-emerald-700"
          />

          <p className="text-sm leading-6 text-[#52665A]">
            Looking for variety-specific pricing, including 50 g packs?
            <span className="font-semibold text-[#047857]">
              {" "}Explore our product catalogue for details.
            </span>
          </p>
        </div>
      </FadeUp>
    </SectionContainer>
  );
}
