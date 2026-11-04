
"use client";

import Image from "next/image";

export interface Product {
  name: string;
  image: string;
  description: string;
  harvestDays?: string;
  price50g?: number;
  status?: "Germinating" | "Growing" | "Ready to Harvest" | "Out of Stock";
  taste?: string;
  texture?: string;
  uses?: string;
  nutrition?: string;
}

interface CategoryProductGridProps {
  products: Product[];
}

const statusStyles: Record<string, string> = {
  Germinating: "bg-amber-50 text-amber-800 border-amber-200",
  Growing: "bg-emerald-50 text-emerald-800 border-emerald-200",
  "Ready to Harvest": "bg-green-100 text-green-900 border-green-300",
  "Out of Stock": "bg-red-50 text-red-800 border-red-200",
};

export default function CategoryProductGrid({
  products,
}: CategoryProductGridProps) {
  return (
    <section className="relative mt-12 overflow-hidden rounded-[2rem] bg-gradient-to-b from-emerald-50 via-[#F7FFF9] to-white px-4 py-12 sm:px-8 sm:py-16 lg:px-10">

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-10 h-56 w-56 rounded-full bg-emerald-200/40 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-10 h-64 w-64 rounded-full bg-lime-200/40 blur-3xl"
      />

      <div className="relative z-10">

        {/* SECTION HEADING */}
        <header className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-emerald-200 bg-white px-5 py-2 text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-800 shadow-sm">
            Thuliragam Microgreens
          </span>

          <h2 className="mt-6 text-4xl font-black tracking-tight text-[#064E3B] sm:text-5xl lg:text-6xl">
            Fresh Greens,{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-lime-600 bg-clip-text text-transparent">
              Fresh Possibilities
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#486457] sm:text-lg">
            Explore our 16 microgreen varieties, discover their flavours,
            and find the right greens for your everyday meals.
          </p>

          <div className="mx-auto mt-7 flex justify-center gap-2">
            <span className="h-1.5 w-10 rounded-full bg-emerald-300" />
            <span className="h-1.5 w-16 rounded-full bg-emerald-500" />
            <span className="h-1.5 w-10 rounded-full bg-lime-400" />
          </div>
        </header>

        {/* PRODUCT GRID */}
        <div className="mt-12 grid items-stretch gap-7 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 xl:grid-cols-4">

          {products.map((product) => (
            <article
              key={product.name}
              className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[1.75rem] border border-emerald-100 bg-white shadow-[0_8px_30px_rgba(6,78,59,0.07)] transition-all duration-500 hover:-translate-y-2 hover:border-emerald-300 hover:shadow-[0_22px_50px_rgba(5,150,105,0.16)] motion-reduce:transform-none motion-reduce:transition-none"
            >

              {/* IMAGE */}
              <div className="relative h-60 shrink-0 overflow-hidden bg-emerald-50 sm:h-64">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#064E3B]/25 to-transparent" />

                {/* PRODUCT STATUS - KEEP */}
                {product.status && (
                  <div
                    className={`absolute left-4 top-4 rounded-full border px-3 py-2 text-[10px] font-extrabold uppercase tracking-wider shadow-sm ${
                      statusStyles[product.status] ??
                      "border-gray-200 bg-white text-gray-700"
                    }`}
                  >
                    <span className="mr-2 inline-block h-2 w-2 rounded-full bg-current" />
                    {product.status}
                  </div>
                )}
              </div>

              {/* CARD CONTENT */}
              <div className="flex flex-1 flex-col p-5 sm:p-6">

                {/* COLLECTION LABEL */}
                <div className="mb-3 flex min-h-4 items-center gap-2">
                  <span className="h-1 w-7 shrink-0 rounded-full bg-emerald-400 transition-all duration-300 group-hover:w-12 group-hover:bg-lime-500" />

                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-700">
                    Thuliragam Collection
                  </span>
                </div>

                {/* PRODUCT NAME */}
                <h3 className="min-h-[3.5rem] text-xl font-extrabold text-[#064E3B] transition-colors group-hover:text-emerald-600">
                  {product.name}
                </h3>

                {/* DESCRIPTION */}
                <div className="min-h-[4.5rem]">
                  <p className="text-sm leading-6 text-[#607568]">
                    {product.description}
                  </p>
                </div>

                {/* TASTE AND TEXTURE */}
                <div className="mt-4 min-h-[4.5rem]">
                  {(product.taste || product.texture) && (
                    <div className="space-y-2 rounded-xl bg-emerald-50/80 p-3">
                      {product.taste && (
                        <p className="text-sm leading-5 text-[#486457]">
                          <span className="font-bold text-[#064E3B]">
                            Taste:{" "}
                          </span>
                          {product.taste}
                        </p>
                      )}

                      {product.texture && (
                        <p className="text-sm leading-5 text-[#486457]">
                          <span className="font-bold text-[#064E3B]">
                            Texture:{" "}
                          </span>
                          {product.texture}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* USES */}
                <div className="mt-4 min-h-[3.5rem]">
                  {product.uses && (
                    <p className="text-sm leading-6 text-[#607568]">
                      <span className="font-bold text-[#064E3B]">
                        Try in:{" "}
                      </span>
                      {product.uses}
                    </p>
                  )}
                </div>

                {/* NUTRITION */}
                <div className="min-h-[3.5rem]">
                  {product.nutrition && (
                    <p className="text-sm leading-6 text-[#607568]">
                      <span className="font-bold text-[#064E3B]">
                        Nutrition:{" "}
                      </span>
                      {product.nutrition}
                    </p>
                  )}
                </div>

                {/* HARVEST TIME */}
                <div className="mt-auto pt-4">
                  {product.harvestDays && (
                    <div className="min-h-[4.5rem] rounded-xl border border-emerald-100 bg-[#F0FDF4] px-4 py-3">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                        Estimated harvest time
                      </p>

                      <p className="mt-1 text-sm font-extrabold text-[#064E3B]">
                        {product.harvestDays} after sowing
                      </p>
                    </div>
                  )}
                </div>

                {/* PRICE */}
                <div className="mt-4">
                  {product.price50g !== undefined && (
                    <div className="flex min-h-[5.2rem] flex-col justify-center rounded-2xl bg-gradient-to-r from-emerald-600 to-green-700 p-4 text-white shadow-md shadow-emerald-900/10">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-100">
                        Price per 50 g
                      </p>

                      <p className="mt-1 text-3xl font-black">
                        ₹{product.price50g.toLocaleString("en-IN")}
                      </p>
                    </div>
                  )}
                </div>

                {/* NO CART OR ACTION BUTTON */}

              </div>
            </article>
          ))}

        </div>
      </div>
    </section>
  );
}
