import { products } from "@/app/lib/products";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  return (
    <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}