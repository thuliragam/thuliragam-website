"use client";

import { motion, useReducedMotion } from "framer-motion";

interface CategoryHeroProps {
  title: string;
  description: string;
}

export default function CategoryHero({
  title,
  description,
}: CategoryHeroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden rounded-[2rem] border border-emerald-300/50 bg-gradient-to-br from-[#047857] via-[#059669] to-[#65A30D] px-6 py-14 text-white shadow-[0_24px_70px_rgba(5,150,105,0.22)] sm:px-10 sm:py-20 lg:px-16 lg:py-24">
      {/* Decorative background shapes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-lime-300/25 blur-3xl sm:h-80 sm:w-80"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-emerald-200/20 blur-3xl"
      />

      {/* Decorative leaf symbols */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-8 top-8 select-none text-5xl opacity-30 sm:right-16 sm:top-12 sm:text-7xl"
      >
        🌿
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-8 right-10 select-none text-4xl opacity-25 sm:bottom-12 sm:right-24 sm:text-6xl"
      >
        🍃
      </div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.7, ease: "easeOut" }}
        className="relative z-10 max-w-3xl"
      >
        {/* Brand label */}
        <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/15 px-4 py-2.5 shadow-sm backdrop-blur-md">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-lime-300 text-sm text-emerald-950">
            ✦
          </span>

          <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-white sm:text-xs">
            Thuliragam · Fresh from Nature
          </span>
        </div>

        {/* Main heading */}
        <h1 className="max-w-3xl text-4xl font-black leading-[1.1] tracking-[-0.04em] text-white drop-shadow-sm sm:text-5xl md:text-6xl lg:text-7xl">
          {title}
          <span className="mt-3 block text-lime-200">
            Small Greens. Big Possibilities.
          </span>
        </h1>

        {/* Description */}
        <p className="mt-7 max-w-2xl text-base leading-8 text-emerald-50 sm:text-lg sm:leading-9">
          {description}
        </p>

        {/* Decorative divider */}
        <div className="mt-8 flex items-center gap-2">
          <span className="h-1.5 w-12 rounded-full bg-lime-200" />
          <span className="h-1.5 w-7 rounded-full bg-white/80" />
          <span className="h-1.5 w-4 rounded-full bg-white/50" />
        </div>

        {/* Supporting message */}
        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold text-white/95">
          <span className="inline-flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-lime-200">
              ✓
            </span>
            Freshly grown
          </span>

          <span className="inline-flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-lime-200">
              ✓
            </span>
            Harvested with care
          </span>
        </div>
      </motion.div>
    </section>
  );
}