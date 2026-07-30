"use client";

import Image from "next/image";
import { Leaf, ShieldCheck, Sprout } from "lucide-react";

import FadeUp from "./FadeUp";
import Button from "./Button";
import FallingLeaves from "./FallingLeaves";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-100"
    >
      <FallingLeaves />

      {/* Background Glow */}
      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-green-200/30 blur-3xl" />
      <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-green-300/20 blur-3xl" />

<div className="relative mx-auto flex min-h-[85vh] max-w-7xl items-center px-6 pt-6 pb-12 lg:px-8">
<div className="grid lg:grid-cols-2 items-start gap-12">


          {/* LEFT */}

          <div>

            <FadeUp>

              <span className="inline-flex rounded-full bg-green-100 px-5 py-2 text-sm font-semibold text-green-700">
                🌱 Fresh • Natural • Healthy
              </span>

            </FadeUp>

            <FadeUp delay={0.2}>

              <h1 className="mt-8 text-5xl font-extrabold leading-tight text-green-950 md:text-6xl">

                Bringing

                <span className="block text-green-600">
                  Nature's Goodness
                </span>

                To Every Home

              </h1>

            </FadeUp>

            <FadeUp delay={0.4}>

              <p className="mt-8 max-w-xl text-lg leading-8 text-gray-600">

                Discover premium-quality microgreens,
                herbal powders, natural spices,
                and dehydrated vegetables grown and
                prepared with freshness, hygiene,
                and sustainability.

              </p>

            </FadeUp>

            <FadeUp delay={0.6}>

              <div className="mt-10 flex flex-wrap gap-5">

                <Button href="#products">
                  Explore Products
                </Button>

                <Button
                  href="#contact"
                  variant="outline"
                >
                  Contact Us
                </Button>

              </div>

            </FadeUp>

            {/* Feature Cards */}

            <FadeUp delay={0.8}>

              <div className="mt-14 grid grid-cols-3 gap-5">

                <div className="rounded-2xl bg-white p-5 text-center shadow-lg">

                  <Leaf
                    className="mx-auto text-green-700"
                    size={34}
                  />

                  <p className="mt-3 text-sm font-semibold text-green-900">
                    100% Natural
                  </p>

                </div>

                <div className="rounded-2xl bg-white p-5 text-center shadow-lg">

                  <Sprout
                    className="mx-auto text-green-700"
                    size={34}
                  />

                  <p className="mt-3 text-sm font-semibold text-green-900">
                    Fresh Daily
                  </p>

                </div>

                <div className="rounded-2xl bg-white p-5 text-center shadow-lg">

                  <ShieldCheck
                    className="mx-auto text-green-700"
                    size={34}
                  />

                  <p className="mt-3 text-sm font-semibold text-green-900">
                    Hygienic
                  </p>

                </div>

              </div>

            </FadeUp>

          </div>

          {/* RIGHT */}

          <FadeUp delay={0.5}>

<div className="relative flex justify-center">
                    <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-r from-green-300 to-green-100 opacity-40 blur-2xl" />

              <Image
                src="/images/hero.jpg"
                alt="Fresh Microgreens"
                width={650}
                height={700}
                priority
                className="relative rounded-[40px] shadow-2xl"
              />

            </div>

          </FadeUp>

        </div>

      </div>
    </section>
  );
}