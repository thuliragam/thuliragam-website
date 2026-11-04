
"use client";

import FadeUp from "./FadeUp";
import Button from "./Button";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-[#e8fff0] via-[#f8fffb] to-[#e2f8e9]"
    >
      {/* Soft botanical background effects */}
      <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-green-300/20 blur-[100px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-emerald-200/20 blur-[100px]" />

      {/* Floating botanical leaves */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <span className="floating-leaf leaf-one">🍃</span>
        <span className="floating-leaf leaf-two">🌿</span>
        <span className="floating-leaf leaf-three">🍃</span>
        <span className="floating-leaf leaf-four">🌱</span>
        <span className="floating-leaf leaf-five">🍃</span>
      </div>

      <style jsx>{`
        .floating-leaf {
          position: absolute;
          display: block;
          opacity: 0.35;
          animation: leafFloat 7s ease-in-out infinite;
        }

        .leaf-one {
          top: 12%;
          left: 8%;
          font-size: 34px;
        }

        .leaf-two {
          top: 25%;
          right: 8%;
          font-size: 38px;
          animation-delay: 1s;
        }

        .leaf-three {
          bottom: 15%;
          left: 45%;
          font-size: 28px;
          animation-delay: 2s;
        }

        .leaf-four {
          top: 65%;
          left: 5%;
          font-size: 30px;
          animation-delay: 3s;
        }

        .leaf-five {
          bottom: 12%;
          right: 12%;
          font-size: 36px;
          animation-delay: 1.5s;
        }

        @keyframes leafFloat {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-25px) rotate(15deg);
          }
        }
      `}</style>

      <div className="relative mx-auto grid min-h-[540px] max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:gap-14 lg:py-16">

        {/* LEFT CONTENT */}
        <div className="relative z-10 order-2 lg:order-1">
          <FadeUp>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full bg-[#d9fbe6] px-5 py-2 text-sm font-semibold text-[#087c39]">
              <span>🌱</span>
              Fresh • Natural • Healthy
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <h1 className="max-w-xl text-5xl font-extrabold leading-[1.12] tracking-tight text-[#07351e] sm:text-6xl lg:text-6xl xl:text-7xl">
              Bringing
              <span className="block text-[#08a844]">
                Nature's
              </span>
              <span className="block text-[#08a844]">
                Goodness
              </span>
              <span className="block">
                To Every Home
              </span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.3}>
            <p className="mt-6 max-w-lg text-base leading-8 text-[#355b45] sm:text-lg">
              Discover the freshness of microgreens with
              Thuliragam — Grow Healthier Tomorrow.
            </p>
          </FadeUp>

          <FadeUp delay={0.45}>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="#products">
                Explore Microgreens
              </Button>

              <Button href="#contact" variant="outline">
                Enquire Now
              </Button>
            </div>
          </FadeUp>
        </div>

        
        {/* RIGHT IMAGE */}
        <FadeUp delay={0.2}>
<div className="relative order-1 flex h-full items-center lg:order-2 lg:-translate-y-12">            <div className="absolute -inset-4 rounded-[40px] bg-green-200/30 blur-2xl" />

            <img
              src="/images/hero.jpg"
              alt="Fresh and colourful Thuliragam microgreens"
              className="relative h-[300px] w-full rounded-[32px] object-cover shadow-[0_25px_60px_rgba(10,80,40,0.20)] sm:h-[380px] lg:h-[390px]"
            />
          </div>
        </FadeUp>

      </div>
    </section>
  );
}
