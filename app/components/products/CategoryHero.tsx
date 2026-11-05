
"use client";

import Image from "next/image";
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

  const reveal = {
    hidden: {
      opacity: 0,
      y: 35,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.section
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{
        once: false,
        amount: 0.2,
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      variants={reveal}
      className="relative isolate overflow-hidden rounded-[1.75rem] bg-[#123D2D] text-white shadow-xl"
    >
      <div className="grid items-center gap-8 px-6 py-9 sm:px-10 sm:py-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-14 lg:py-14">

        {/* LEFT CONTENT */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{
            duration: reduceMotion ? 0 : 0.8,
            delay: 0.15,
          }}
          className="relative z-10"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-lime-200/30 bg-white/10 px-4 py-2">
            <span className="text-lime-300">✦</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-lime-100 sm:text-xs">
              THULIRAGAM · FRESH FROM NATURE
            </span>
          </div>

          <h1 className="max-w-xl text-3xl font-black leading-[1.12] tracking-tight sm:text-4xl lg:text-5xl">
            {title}
          </h1>

          <p className="mt-5 max-w-lg text-sm leading-7 text-emerald-100/90 sm:text-base">
            {description}
          </p>

          <div className="mt-7 h-1 w-16 rounded-full bg-[#D9F36A]" />
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{
            duration: reduceMotion ? 0 : 1,
            delay: 0.2,
          }}
          className="relative"
        >
          <div className="relative h-[230px] overflow-hidden rounded-2xl border border-white/15 shadow-2xl sm:h-[300px] lg:h-[350px]">
            <Image
              src="/images/microgreens.jpg"
              alt="Fresh microgreens grown by Thuliragam"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#123D2D]/30 via-transparent to-transparent" />
          </div>

          <div className="absolute -bottom-4 -left-3 rounded-xl bg-[#D9F36A] px-5 py-3 text-[#173D2D] shadow-lg sm:-left-5">
            <p className="text-xs font-black uppercase tracking-wider">
              Naturally Fresh
            </p>
            <p className="mt-1 text-[10px] font-medium">
              Goodness in Every Green
            </p>
          </div>
        </motion.div>

      </div>

      {/* BACKGROUND DECORATION */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-lime-400/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-24 left-1/4 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />

    </motion.section>
  );
}
