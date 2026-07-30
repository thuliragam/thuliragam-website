"use client";

import Link from "next/link";
import {
  Sprout,
  Leaf,
  Wheat,
  Apple,
} from "lucide-react";

const categories = [
  {
    title: "Microgreens",
    description: "Freshly harvested nutrient-rich microgreens.",
    href: "/products/microgreens",
    icon: Sprout,
  },
  {
    title: "Herbal Powders",
    description: "Naturally dried herbal powders.",
    href: "/products/herbal-powders",
    icon: Leaf,
  },
  {
    title: "Natural Spices",
    description: "Authentic spices with rich aroma.",
    href: "/products/natural-spices",
    icon: Wheat,
  },
  {
    title: "Dehydrated Vegetables",
    description: "Farm-fresh vegetables preserved naturally.",
    href: "/products/dehydrated-vegetables",
    icon: Apple,
  },
];

export default function ProductCategories() {
  return (
    <section className="mt-16">
      <h2 className="mb-10 text-center text-3xl font-bold text-green-900">
        Explore by Category
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <Link
              key={category.title}
              href={category.href}
              className="group rounded-3xl border border-green-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-green-300 hover:shadow-xl"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 transition group-hover:bg-green-700">
                <Icon
                  size={32}
                  className="text-green-700 transition group-hover:text-white"
                />
              </div>

              <h3 className="mt-6 text-xl font-bold text-green-900">
                {category.title}
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                {category.description}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}