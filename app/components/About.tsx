"use client";

import Image from "next/image";
import { Leaf, Target, Eye, Sprout } from "lucide-react";

import FadeUp from "./FadeUp";
import SectionContainer from "./SectionContainer";
import SectionTitle from "./SectionTitle";
import StatCard from "./StatCard";

export default function About() {
  return (
    <SectionContainer
      id="about"
      className="bg-[#F7FCF8]"
    >
      <SectionTitle
        badge="🌿 ABOUT THULIRAGAM"
        title="Growing Nature,"
        highlight="Sharing Health"
        description="At Thuliragam, we believe healthy living starts with nature. We are dedicated to producing fresh microgreens, herbal powders, natural spices, and dehydrated vegetables with the highest quality standards."
      />

      <div className="mt-20 grid items-center gap-16 lg:grid-cols-2">

        {/* Image */}

        <FadeUp>

          <div className="relative">

            <div className="absolute -inset-4 rounded-[35px] bg-gradient-to-r from-green-200 to-green-100 blur-2xl opacity-60"></div>

            <Image
              src="/images/about.jpg"
              alt="About Thuliragam"
              width={650}
              height={650}
              className="relative rounded-[35px] shadow-2xl"
            />

          </div>

        </FadeUp>

        {/* Content */}

        <div>

          <FadeUp>

            <h3 className="text-4xl font-bold text-green-900">
              Freshness You Can Trust
            </h3>

          </FadeUp>

          <FadeUp delay={0.2}>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Every product from Thuliragam is prepared with dedication,
              ensuring freshness, nutrition, hygiene, and sustainability.
              Our mission is to make healthy food accessible while
              promoting natural living.
            </p>

          </FadeUp>

          {/* Mission */}

          <FadeUp delay={0.3}>

            <div className="mt-10 rounded-3xl bg-white p-6 shadow-lg">

              <div className="flex items-center gap-4">

                <div className="rounded-full bg-green-100 p-3">
                  <Target className="text-green-700" size={28} />
                </div>

                <div>

                  <h4 className="text-xl font-bold text-green-900">
                    Our Mission
                  </h4>

                  <p className="mt-2 text-gray-600">
                    Deliver premium natural food products while
                    encouraging healthier lifestyles.
                  </p>

                </div>

              </div>

            </div>

          </FadeUp>

          {/* Vision */}

          <FadeUp delay={0.4}>

            <div className="mt-6 rounded-3xl bg-white p-6 shadow-lg">

              <div className="flex items-center gap-4">

                <div className="rounded-full bg-green-100 p-3">
                  <Eye className="text-green-700" size={28} />
                </div>

                <div>

                  <h4 className="text-xl font-bold text-green-900">
                    Our Vision
                  </h4>

                  <p className="mt-2 text-gray-600">
                    Become a trusted brand for natural, healthy,
                    and sustainable food products across India.
                  </p>

                </div>

              </div>

            </div>

          </FadeUp>

        </div>

      </div>

      {/* Statistics */}

      <div className="mt-24 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

        <FadeUp delay={0.1}>
          <StatCard
            icon={<Leaf size={28} />}
            value="100%"
            label="Natural Products"
          />
        </FadeUp>

        <FadeUp delay={0.2}>
          <StatCard
            icon={<Sprout size={28} />}
            value="Fresh"
            label="Harvest Every Day"
          />
        </FadeUp>

        <FadeUp delay={0.3}>
          <StatCard
            icon={<Target size={28} />}
            value="Quality"
            label="Quality Focused"
          />
        </FadeUp>

        <FadeUp delay={0.4}>
          <StatCard
            icon={<Eye size={28} />}
            value="Future"
            label="Growing Every Day"
          />
        </FadeUp>

      </div>
    </SectionContainer>
  );
}