"use client";

import Image from "next/image";

interface Product {
  name: string;
  image: string;
  description: string;
}

interface CategoryProductGridProps {
  products: Product[];
}

export default function CategoryProductGrid({
  products,
}: CategoryProductGridProps) {
  return (
    <section className="mt-16">
      <h2 className="text-center text-4xl font-bold text-green-900">
        Our Products
      </h2>

      <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600">
        Freshly grown, naturally healthy, and harvested with care for maximum nutrition.
      </p>

      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.name}
            className="group overflow-hidden rounded-3xl border border-green-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="relative h-64 overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition duration-500 group-hover:scale-110"
              />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-green-900">
                {product.name}
              </h3>

              <p className="mt-3 min-h-[48px] text-sm leading-6 text-gray-600">
                {product.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}