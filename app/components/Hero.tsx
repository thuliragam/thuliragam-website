
"use client";

import FadeUp from "./FadeUp";
import Link from "next/link";
import { ArrowRight, Sprout } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-[#E8FFF1] via-[#F4FFF9] to-[#E5F9EE] text-[#073D24]"
    >
      {/* BACKGROUND DECORATION */}
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-[#B9EACB]/30 blur-[100px]" />

      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#C5F1D5]/30 blur-[100px]" />

      <div className="relative mx-auto grid min-h-[480px] max-w-[1300px] items-center gap-8 px-6 py-12 sm:px-10 lg:grid-cols-2 lg:gap-10 lg:px-12 lg:py-14">

        {/* LEFT IMAGE */}
        <FadeUp>
          <div className="relative order-1 mx-auto w-full max-w-[550px] lg:mx-0">

            <div className="absolute -inset-4 rounded-[35px] bg-[#63C98B]/15 blur-2xl" />

            <img
              src="/images/hero.jpg"
              alt="Fresh Thuliragam microgreens"
              className="relative h-[270px] w-full rounded-[25px] object-cover shadow-[0_25px_55px_rgba(10,90,45,0.18)] sm:h-[340px] lg:h-[390px]"
            />

          </div>
        </FadeUp>

        {/* RIGHT CONTENT */}
        <div className="relative z-10 order-2 lg:pl-2">

          {/* BADGE */}
          <FadeUp>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#D5FBE5] px-4 py-2">
              <Sprout size={15} className="text-[#078A3E]" />

              <span className="text-[11px] font-bold tracking-wide text-[#087A38]">
                Fresh • Natural • Healthy
              </span>
            </div>
          </FadeUp>

          {/* HEADING */}
          <FadeUp delay={0.15}>
            <h1 className="max-w-[650px] text-[42px] font-extrabold leading-[1.12] tracking-[-0.04em] text-[#073D24] sm:text-5xl lg:text-[52px] xl:text-[58px]">

              Bringing

              <span className="block text-[#08A94B]">
                Nature's
              </span>

              <span className="block text-[#08A94B]">
                Goodness
              </span>

              <span className="block">
                To Every Home
              </span>

            </h1>
          </FadeUp>

          {/* DESCRIPTION */}
          <FadeUp delay={0.3}>
            <p className="mt-5 max-w-[470px] text-sm leading-7 text-[#385B47] sm:text-base">
              Discover the freshness of microgreens with Thuliragam —
              Grow Healthier Tomorrow.
            </p>
          </FadeUp>

          {/* BUTTONS */}
          <FadeUp delay={0.4}>
            <div className="mt-7 flex flex-wrap items-center gap-3">

              <Link
                href="/products/microgreens"
                className="group inline-flex items-center gap-2 rounded-full bg-[#008B3D] px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#006F30] hover:shadow-lg"
              >
                Explore Microgreens

                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/#contact"
                className="inline-flex items-center rounded-full border border-[#079447] px-6 py-3.5 text-sm font-bold text-[#087A38] transition-all duration-300 hover:-translate-y-1 hover:bg-[#D8F7E4]"
              >
                Enquire Now
              </Link>

            </div>
          </FadeUp>

        </div>
      </div>
    </section>
  );
}
