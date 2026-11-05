
"use client";

import {
  Home,
  UtensilsCrossed,
  Hotel,
  ShoppingCart,
  Dumbbell,
  Salad,
  ArrowUpRight,
} from "lucide-react";

import { motion, useReducedMotion } from "framer-motion";

const customers = [
  {
    icon: Home,
    number: "01",
    title: "Homes & Families",
    description:
      "Fresh microgreens for everyday healthy meals and nutrition.",
  },
  {
    icon: UtensilsCrossed,
    number: "02",
    title: "Restaurants & Cafés",
    description:
      "Premium garnishes and fresh ingredients for modern cuisine.",
  },
  {
    icon: Hotel,
    number: "03",
    title: "Hotels & Resorts",
    description:
      "Consistent quality microgreens for fine dining and buffets.",
  },
  {
    icon: ShoppingCart,
    number: "04",
    title: "Retail Stores",
    description:
      "Freshly packed microgreens suitable for supermarkets and organic stores.",
  },
  {
    icon: Dumbbell,
    number: "05",
    title: "Gyms & Wellness Centres",
    description:
      "Nutrient-rich greens for health-conscious customers.",
  },
  {
    icon: Salad,
    number: "06",
    title: "Caterers & Events",
    description:
      "Beautiful fresh microgreens to elevate presentation and taste.",
  },
];

export default function MicrogreensWhoWeServe() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#123D2D] py-20 sm:py-24">

      {/* BACKGROUND DECORATION */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-lime-300/10 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">

        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">

          {/* LEFT EDITORIAL INTRO */}
          <motion.div
            initial={
              reduceMotion ? false : { opacity: 0, x: -70 }
            }
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: false,
              amount: 0.15,
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:sticky lg:top-24 lg:self-start"
          >

            <p className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#D9F36A]">
              <span className="h-px w-9 bg-[#D9F36A]" />
              Our Customers
            </p>

            <h2 className="max-w-lg text-4xl font-bold leading-[1.12] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
              Fresh Greens
              <span className="block text-[#D9F36A]">
                for Every Table.
              </span>
            </h2>

            <p className="mt-7 max-w-md text-sm leading-8 text-[#DCE8DC] sm:text-base">
              From everyday kitchens to professional culinary spaces,
              Thuliragam serves customers who value fresh microgreens
              and quality ingredients.
            </p>

            <div className="mt-9 flex items-center gap-3">
              <span className="h-1 w-12 rounded-full bg-[#D9F36A]" />
              <span className="h-1 w-5 rounded-full bg-white/40" />
              <span className="h-1 w-2 rounded-full bg-white/20" />
            </div>

            <p className="mt-10 text-[10px] font-bold uppercase tracking-[0.22em] text-[#B7C8B6]">
              Homes · Hospitality · Food Businesses
            </p>

          </motion.div>

          {/* RIGHT CUSTOMER LIST */}
          <div className="border-t border-white/20">

            {customers.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.title}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          x: 70,
                        }
                  }
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: false,
                    amount: 0.15,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.8,
                    delay: reduceMotion ? 0 : (index % 3) * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group grid grid-cols-[42px_44px_1fr_20px] items-center gap-3 border-b border-white/20 py-6 transition-colors duration-300 hover:bg-white/[0.04] sm:grid-cols-[48px_52px_1fr_24px] sm:gap-4 sm:py-7"
                >

                  {/* NUMBER */}
                  <span className="text-xs font-bold tracking-widest text-[#D9F36A]">
                    {item.number}
                  </span>

                  {/* ICON */}
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-all duration-300 group-hover:border-[#D9F36A]/50 group-hover:bg-[#D9F36A]">
                    <Icon
                      className="h-5 w-5 text-[#D9F36A] transition-colors group-hover:text-[#173D2D]"
                      strokeWidth={1.6}
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-white transition-colors group-hover:text-[#D9F36A] sm:text-lg">
                      {item.title}
                    </h3>

                    <p className="mt-1.5 text-xs leading-6 text-[#C1D0C1] sm:text-sm">
                      {item.description}
                    </p>
                  </div>

                  {/* DECORATIVE ARROW */}
                  <ArrowUpRight className="h-4 w-4 text-white/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#D9F36A]" />

                </motion.article>
              );
            })}

          </div>
        </div>
      </div>
    </section>
  );
}
