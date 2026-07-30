"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { products } from "@/app/lib/products";
import ProductCard from "./ProductCard";

const categories = [
  "All",
  "Microgreens",
  "Herbal Powders",
  "Natural Spices",
  "Dehydrated Vegetables",
] as const;

export default function ProductCatalog() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        category === "All" || product.category === category;

      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.shortDescription
          .toLowerCase()
          .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  return (
    <>
      {/* Search */}

      <div className="mx-auto mt-16 max-w-xl">
        <div className="flex items-center rounded-2xl border border-green-200 bg-white px-4 shadow-sm">
          <Search className="text-green-700" size={20} />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent px-4 py-4 outline-none"
          />
        </div>
      </div>

      {/* Categories */}

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className={`rounded-full px-5 py-2 font-medium transition ${
              category === item
                ? "bg-green-700 text-white"
                : "bg-green-100 text-green-700 hover:bg-green-200"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Products */}

      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="mt-16 text-center text-gray-500">
          No products found.
        </div>
      )}
    </>
  );
}