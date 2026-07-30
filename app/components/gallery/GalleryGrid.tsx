"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import { galleryImages } from "@/app/lib/gallery";

const filters = [
  "All",
  "Microgreens",
  "Herbal Powders",
  "Natural Spices",
];

export default function GalleryGrid() {
  const [active, setActive] = useState("All");
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const filtered =
    active === "All"
      ? galleryImages
      : galleryImages.filter((item) => item.category === active);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActive(filter)}
              className={`rounded-full px-5 py-2 transition ${
                active === filter
                  ? "bg-green-600 text-white"
                  : "bg-green-100 text-green-700 hover:bg-green-200"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((item, i) => (
            <div
              key={item.id}
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
              className="cursor-pointer overflow-hidden rounded-2xl bg-white shadow transition hover:-translate-y-1 hover:shadow-xl"
            >
            <div className="relative aspect-square">
  <img
    src={item.image}
    alt={item.title}
    className="h-full w-full object-cover"
  />
</div>

              <div className="p-4">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-green-600">
                  {item.category}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={index}
          slides={filtered.map((item) => ({
            src: item.image,
          }))}
        />

      </div>
    </section>
  );
}