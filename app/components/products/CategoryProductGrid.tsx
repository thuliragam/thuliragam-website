
"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, Leaf, Sparkles } from "lucide-react";

export interface Product {
  name: string;
  image: string;
  description: string;
  harvestDays?: string;
  price50g?: number;
  status?:
    | "Germinating"
    | "Growing"
    | "Ready to Harvest"
    | "Request Microgreens";
  taste?: string;
  texture?: string;
  uses?: string;
  nutrition?: string;
}

interface CategoryProductGridProps {
  products: Product[];
}

const statusStyles: Record<string, string> = {
  Germinating: "bg-[#FFF0B8] text-[#815000]",
  Growing: "bg-[#D7F23B] text-[#174A22]",
  "Ready to Harvest": "bg-[#00A844] text-white",
  "Request Microgreens": "bg-[#F3FFCC] text-[#315B20]",
};

const statusDots: Record<string, string> = {
  Germinating: "bg-[#F59E0B]",
  Growing: "bg-[#00A844]",
  "Ready to Harvest": "bg-[#D7F23B]",
  "Request Microgreens": "bg-[#789C37]",
};

const cardStyles = [
  "border-[#A9D69A] bg-[#EDFFE5]",
  "border-[#D5E77B] bg-[#F7FFDA]",
  "border-[#83D9A3] bg-[#E0FFF0]",
  "border-[#E5D68B] bg-[#FFF9D9]",
];

export default function CategoryProductGrid({
  products,
}: CategoryProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const productDetails = selectedProduct
    ? [
        { label: "Taste", value: selectedProduct.taste },
        { label: "Texture", value: selectedProduct.texture },
        { label: "Best Enjoyed In", value: selectedProduct.uses },
        { label: "Harvest Duration", value: selectedProduct.harvestDays },
        { label: "Nutrition", value: selectedProduct.nutrition },
      ].filter((item) => item.value)
    : [];

  return (
    <section className="relative overflow-hidden bg-[#F8FAEC] py-12 sm:py-16">

      {/* Decorative Background */}
      <div className="pointer-events-none absolute -left-28 top-20 h-72 w-72 rounded-full bg-[#D7F23B]/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 bottom-10 h-80 w-80 rounded-full bg-[#00A844]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8">

        {/* SECTION HEADING */}
        <div className="mb-10 text-center">
          <p className="mb-3 flex items-center justify-center gap-3 text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#00A844] sm:text-xs">
            <span className="h-[2px] w-7 rounded-full bg-[#D7F23B]" />
            <Sparkles className="h-4 w-4 text-[#A3C900]" />
            Grown with Care · Harvested Fresh
            <Sparkles className="h-4 w-4 text-[#A3C900]" />
            <span className="h-[2px] w-7 rounded-full bg-[#D7F23B]" />
          </p>

          <h2 className="text-3xl font-black tracking-[-0.045em] text-[#064D2B] sm:text-4xl lg:text-5xl">
            Explore Our{" "}
            <span className="relative inline-block text-[#00A844]">
              Microgreens
              <span className="absolute -bottom-1 left-0 h-2 w-full rounded-full bg-[#D7F23B]/80" />
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#536B51] sm:text-base">
            Discover our collection of fresh microgreens, each offering
            its own flavour, texture and natural goodness.
          </p>

          <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-[#00A844] via-[#8BD32B] to-[#D7F23B]" />
        </div>

        {/* PRODUCT COUNT */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#00A844]" />
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#064D2B]">
              Our Collection
            </p>
          </div>

          <p className="rounded-full border border-[#D7F23B] bg-[#F3FFCC] px-4 py-2 text-xs font-extrabold text-[#315B20]">
            {products.length} Varieties
          </p>
        </div>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product, index) => (
            <motion.article
              key={`${product.name}-${index}`}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.6,
                delay: (index % 4) * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`group relative flex flex-col overflow-hidden rounded-[1.5rem] border shadow-[0_8px_25px_rgba(6,77,43,0.08)] transition-all duration-500 hover:-translate-y-2 hover:border-[#00A844] hover:shadow-[0_20px_40px_rgba(6,77,43,0.16)] ${
                cardStyles[index % cardStyles.length]
              }`}
            >
              {/* LIME TOP ACCENT */}
              <div className="absolute left-0 top-0 z-10 h-1.5 w-full bg-gradient-to-r from-[#00A844] via-[#B6E62E] to-[#D7F23B]" />

              {/* PRODUCT IMAGE */}
              <div className="relative h-48 overflow-hidden bg-[#DDF3D1] sm:h-52">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#063D20]/45 via-transparent to-[#063D20]/10" />

                {/* STATUS */}
                {product.status && (
                  <div
                    className={`absolute left-3 top-4 inline-flex items-center gap-2 rounded-full border border-white/50 px-3 py-2 text-[9px] font-extrabold uppercase tracking-wider shadow-lg backdrop-blur-sm sm:text-[10px] ${
                      statusStyles[product.status] ||
                      "bg-white text-[#064D2B]"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        statusDots[product.status] || "bg-[#00A844]"
                      }`}
                    />
                    {product.status}
                  </div>
                )}

                {/* PRODUCT NUMBER */}
                <div className="absolute bottom-3 right-3 rounded-xl border border-[#D7F23B]/70 bg-[#064D2B] px-3 py-1.5 text-xs font-black tracking-wider text-[#D7F23B] shadow-lg">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </div>

              {/* CARD INFORMATION */}
              <div className="flex flex-1 flex-col p-5">
                <div>
                  <h3 className="text-xl font-extrabold tracking-tight text-[#064D2B] transition-colors group-hover:text-[#00A844]">
                    {product.name}
                  </h3>

                  <p className="mt-2 min-h-[48px] text-sm leading-6 text-[#536B51]">
                    {product.description}
                  </p>
                </div>

                {/* QUICK INFORMATION */}
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#BBD9A9]/70 pt-4">
                  {product.harvestDays && (
                    <div>
                      <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#75935C]">
                        Harvest
                      </p>
                      <p className="mt-1 text-sm font-bold text-[#174A22]">
                        {product.harvestDays}
                      </p>
                    </div>
                  )}

                  {product.taste && (
                    <div>
                      <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#75935C]">
                        Taste
                      </p>
                      <p className="mt-1 text-sm font-bold text-[#174A22]">
                        {product.taste}
                      </p>
                    </div>
                  )}
                </div>

                {/* PRICE */}
                <div className="mt-5 flex items-center justify-between rounded-xl border border-[#C9E76A] bg-[#DFF58A] px-4 py-3 shadow-sm transition-colors group-hover:bg-[#D7F23B]">
                  <div>
                    <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#58752B]">
                      Starting From
                    </p>

                    {product.price50g !== undefined ? (
                      <p className="mt-0.5 text-xl font-black text-[#064D2B]">
                        ₹{product.price50g}
                        <span className="ml-1 text-[10px] font-bold text-[#53722C]">
                          / 50g
                        </span>
                      </p>
                    ) : (
                      <p className="mt-1 text-sm font-bold text-[#315B20]">
                        Contact for price
                      </p>
                    )}
                  </div>

                  <Leaf className="h-5 w-5 text-[#4D8A23]" />
                </div>

                {/* VIEW DETAILS BUTTON */}
                <button
                  type="button"
                  onClick={() => setSelectedProduct(product)}
                  className="mt-4 flex w-full items-center justify-between rounded-xl bg-[#064D2B] px-4 py-3 text-sm font-extrabold text-[#D7F23B] shadow-md transition-all duration-300 hover:bg-[#00A844] hover:text-white hover:shadow-lg"
                >
                  View Full Details
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* PRODUCT DETAILS POPUP */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            key="product-details-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelectedProduct(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#041E10]/85 p-4 backdrop-blur-md sm:p-6"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="product-detail-title"
              initial={{ opacity: 0, y: 35, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
              className="relative my-auto w-full max-w-4xl overflow-hidden rounded-[1.5rem] border border-[#D7F23B]/40 bg-[#F8FAEC] shadow-2xl"
            >
              {/* CLOSE BUTTON */}
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                aria-label="Close product details"
                className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-[#D7F23B] text-[#064D2B] shadow-lg transition hover:rotate-90 hover:bg-[#00A844] hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid md:grid-cols-2">
                {/* LARGE PRODUCT IMAGE */}
                <div className="relative min-h-[240px] bg-[#DDF3D1] sm:min-h-[350px]">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#063D20]/55 to-transparent" />

                  {selectedProduct.status && (
                    <div
                      className={`absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-extrabold uppercase tracking-wider shadow-lg ${
                        statusStyles[selectedProduct.status] ||
                        "bg-white text-[#064D2B]"
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          statusDots[selectedProduct.status] ||
                          "bg-[#00A844]"
                        }`}
                      />
                      {selectedProduct.status}
                    </div>
                  )}
                </div>

                {/* FULL PRODUCT DETAILS */}
                <div className="max-h-[75vh] overflow-y-auto p-6 sm:p-9">
                  <p className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#00A844]">
                    <Leaf className="h-4 w-4" />
                    THULIRAGAM · MICROGREENS
                  </p>

                  <h2
                    id="product-detail-title"
                    className="mt-3 text-3xl font-black tracking-tight text-[#064D2B] sm:text-4xl"
                  >
                    {selectedProduct.name}
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-[#536B51]">
                    {selectedProduct.description}
                  </p>

                  <div className="my-6 h-1 w-14 rounded-full bg-[#D7F23B]" />

                  <p className="mb-4 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#00A844]">
                    Product Information
                  </p>

                  <div className="space-y-4">
                    {productDetails.map((item) => (
                      <div
                        key={item.label}
                        className="rounded-xl border border-[#D9E9B7] bg-[#F0F9D9] px-4 py-3"
                      >
                        <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#75935C]">
                          {item.label}
                        </p>

                        <p className="mt-1.5 text-sm font-semibold leading-6 text-[#174A22]">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* PRICE */}
                  <div className="mt-5 rounded-xl border border-[#C9E76A] bg-[#DFF58A] p-4">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#58752B]">
                      Price
                    </p>

                    {selectedProduct.price50g !== undefined ? (
                      <p className="mt-1 text-2xl font-black text-[#064D2B]">
                        ₹{selectedProduct.price50g}
                        <span className="ml-2 text-xs font-bold text-[#53722C]">
                          / 50g
                        </span>
                      </p>
                    ) : (
                      <p className="mt-1 text-sm font-bold text-[#315B20]">
                        Contact us for pricing
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedProduct(null)}
                    className="mt-5 w-full rounded-xl bg-[#064D2B] px-5 py-3.5 text-sm font-extrabold text-[#D7F23B] transition-colors hover:bg-[#00A844] hover:text-white"
                  >
                    Continue Exploring
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
