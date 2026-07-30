"use client";

import Image from "next/image";

import FadeUp from "./FadeUp";
import SectionContainer from "./SectionContainer";
import SectionTitle from "./SectionTitle";

const gallery = [
  {
    title: "Microgreens",
    image: "/images/gallery/microgreens.jpg",
  },
  {
    title: "Harvesting",
    image: "/images/gallery/harvesting.jpg",
  },
  {
    title: "Packing Process",
    image: "/images/gallery/packing.jpg",
  },
  {
    title: "Herbal Powders",
    image: "/images/gallery/herbal-powders.jpg",
  },
  {
    title: "Natural Spices",
    image: "/images/gallery/spices.jpg",
  },
  {
    title: "Dehydrated Vegetables",
    image: "/images/gallery/dehydrated.jpg",
  },
];

export default function Gallery() {
  return (
    <SectionContainer
      id="gallery"
      className="bg-green-50"
    >
      <SectionTitle
        badge="📷 GALLERY"
        title="A Glimpse of"
        highlight="Thuliragam"
        description="Explore our journey from growing fresh microgreens to preparing healthy food products with care and quality."
      />

      <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {gallery.map((item, index) => (
          <FadeUp
            key={item.title}
            delay={index * 0.1}
          >
            <div className="group overflow-hidden rounded-3xl bg-white shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl">

              <div className="relative h-72 overflow-hidden">

                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="absolute bottom-6 left-6 translate-y-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">

                  <h3 className="text-2xl font-bold text-white">
                    {item.title}
                  </h3>

                </div>

              </div>

            </div>
          </FadeUp>
        ))}
      </div>
    </SectionContainer>
  );
}