"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

import FadeUp from "./FadeUp";
import SectionContainer from "./SectionContainer";
import SectionTitle from "./SectionTitle";
import Button from "./Button";

const products = [
  {
    title: "Microgreens",
    description:
      "Fresh, nutrient-rich microgreens harvested daily for maximum nutrition.",
    image: "/images/microgreens.jpg",
    link: "/products/microgreens",
  },
  {
    title: "Herbal Powders",
    description:
      "Pure herbal powders made from naturally dried and carefully processed herbs.",
    image: "/images/herbal-powder.jpg",
    link: "/products/herbal-powders",
  },
  {
    title: "Natural Spices",
    description:
      "Authentic spices prepared to preserve their natural aroma and flavor.",
    image: "/images/spices.jpg",
    link: "/products/natural-spices",
  },
  {
    title: "Dehydrated Vegetables",
    description:
      "Naturally dehydrated vegetables with excellent taste and a longer shelf life.",
    image: "/images/vegetables.jpg",
    link: "/products/dehydrated-vegetables",
  },
];

export default function FeaturedProducts() {
  return (
    <SectionContainer
      id="products"
      className="bg-white"
    >
      <SectionTitle
        badge="🥗 OUR PRODUCTS"
        title="Healthy Products"
        highlight="for Everyday Life"
        description="Discover our carefully crafted range of natural food products designed to support a healthy lifestyle."
      />

      <div className="mt-20 grid items-stretch gap-8 md:grid-cols-2 xl:grid-cols-4">
        {products.map((product, index) => (
          <FadeUp
            key={product.title}
            delay={index * 0.1}
            className="h-full"
          >
            <div className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

              {/* Image */}
              <div className="overflow-hidden rounded-t-3xl">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={600}
                  height={400}
                  className="h-64 w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-7">

                <h3 className="h-[72px] text-2xl font-bold text-green-900">
                  {product.title}
                </h3>

                <p className="mt-4 flex-1 leading-7 text-gray-600">
                  {product.description}
                </p>

                <div className="mt-6">
                  <Button
                    href={product.link}
                    variant="outline"
                  >
                    Learn More
                    <ArrowRight
                      className="ml-2"
                      size={18}
                    />
                  </Button>
                </div>

              </div>

            </div>
          </FadeUp>
        ))}
      </div>
    </SectionContainer>
  );
}