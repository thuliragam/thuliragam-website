
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
      className="relative bg-[#FBFBF3] !py-7 lg:!py-5"
    >
      {/* SECTION TITLE */}
      <div className="relative z-10">
        <SectionTitle
          vibrant
          badge="GROWN WITH CARE"
          title="Small Greens,"
          highlight="Big Possibilities"
          description="Explore the world of microgreens, from tiny seeds to fresh harvests."
        />
      </div>

      {/* FEATURED PRODUCT */}
      <div className="relative z-10 mx-auto mt-7 max-w-6xl lg:mt-9">

        {products.map((product, index) => (
          <FadeUp key={product.title} delay={index * 0.12}>
            <article className="group grid overflow-hidden rounded-[30px] border border-[#D9E8CC] bg-[#063D20] shadow-[0_20px_60px_rgba(6,61,32,0.13)] transition-all duration-500 hover:shadow-[0_28px_70px_rgba(6,61,32,0.22)] md:grid-cols-[0.88fr_1.12fr]">

              {/* LEFT: EDITORIAL PHOTOGRAPH */}
              <div className="relative min-h-[270px] overflow-hidden sm:min-h-[350px] lg:min-h-[410px]">

                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  priority={false}
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />

                {/* IMAGE OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#021C10]/95 via-[#063D20]/35 to-[#063D20]/10" />

<div className="absolute inset-0 bg-gradient-to-r from-[#021C10]/20 via-transparent to-transparent" />

                {/* TOP BADGE */}
                <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#063D20]/80 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#D9F99D] shadow-lg backdrop-blur-md">
                  <Sprout size={15} />
                  Grown with care
                </div>

                <div className="absolute bottom-6 left-6 right-6 z-10 sm:bottom-8 sm:left-8">

  <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-[#D8FF85] drop-shadow-md">
    FROM SEED TO HARVEST
  </p>

  <h3 className="mt-3 max-w-sm font-serif text-3xl font-bold leading-tight text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.8)] sm:text-4xl lg:text-[42px]">
    Freshness
    <span className="block italic text-[#C7F36B] drop-shadow-[0_3px_12px_rgba(0,0,0,0.8)]">
      begins with nature.
    </span>
  </h3>

  <div className="mt-5 h-[3px] w-14 rounded-full bg-[#B9E65A] shadow-[0_0_12px_rgba(185,230,90,0.6)]" />

</div>

                {/* IMAGE DECORATION */}
                <div className="pointer-events-none absolute bottom-6 right-6 opacity-30">
                  <Leaf size={58} strokeWidth={0.8} className="rotate-[-30deg] text-[#B9E65A]" />
                </div>
              </div>

              {/* RIGHT: PRODUCT INFORMATION */}
              <div className="relative flex flex-col justify-center overflow-hidden p-6 sm:p-8 lg:p-9">

                {/* DECORATIVE BACKGROUND */}
                <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full border border-[#B9E65A]/10" />
                <div className="pointer-events-none absolute -right-12 -top-16 h-44 w-44 rounded-full bg-[#B9E65A]/[0.05] blur-2xl" />

                {/* BRAND ICON */}
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#B9E65A]/30 bg-[#B9E65A]/15 text-[#B9E65A]">
                  <Leaf size={24} />
                </div>

                {/* TITLE */}
                <div className="relative z-10 mt-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#B9E65A]">
                    THULIRAGAM COLLECTION
                  </p>

                  <h3 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-[42px]">
                    {product.title}
                  </h3>

                  <p className="mt-3 max-w-lg text-sm leading-7 text-white/70">
                    {product.description}
                  </p>
                </div>

                {/* PRODUCT HIGHLIGHTS */}
                <div className="relative z-10 mt-5 grid grid-cols-2 gap-3">

                  {productHighlights.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.title}
                        className="group/item flex min-h-[76px] items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.055] p-3 transition-all duration-300 hover:border-[#B9E65A]/40 hover:bg-[#B9E65A]/10"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#B9E65A] text-[#063D20] transition-transform duration-300 group-hover/item:rotate-[-8deg]">
                          <Icon size={18} />
                        </div>

                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-white sm:text-sm">
                            {item.title}
                          </h4>

                          <p className="mt-1 text-[10px] leading-4 text-white/55 sm:text-xs sm:leading-5">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}

                </div>

                {/* CTA */}
                <div className="relative z-10 mt-6">
                  <Button href={product.link}>
                    Explore Microgreens
                    <ArrowRight className="ml-2" size={18} />
                  </Button>
                </div>

                {/* CATALOGUE NOTE */}
                <p className="relative z-10 mt-3 text-[11px] leading-5 text-white/50">
                  Explore varieties, growing information, availability,
                  and product details.
                </p>

              </div>
            </article>
          </FadeUp>
        ))}
      </div>

      {/* CATALOGUE INFORMATION */}
      <FadeUp delay={0.2}>
        <div className="relative z-10 mx-auto mt-5 flex max-w-6xl flex-wrap items-center justify-center gap-3 rounded-2xl border border-[#DCEBCF] bg-white px-5 py-3.5 shadow-sm">

          <ShoppingBasket
            size={21}
            className="shrink-0 text-[#00A844]"
          />

          <p className="text-center text-xs leading-5 text-[#52665A] sm:text-sm">
            Looking for variety-specific pricing, including 50 g packs?

            <span className="ml-1 font-bold text-[#075B25]">
              Explore our product catalogue for details.
            </span>
          </p>

        </div>
      </FadeUp>

    </SectionContainer>
  );
}
