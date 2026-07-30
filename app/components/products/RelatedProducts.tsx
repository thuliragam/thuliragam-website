import Link from "next/link";
import Image from "next/image";

import { Product, products } from "@/app/lib/products";

type Props = {
  currentProduct: Product;
};

export default function RelatedProducts({
  currentProduct,
}: Props) {
  const relatedProducts = products
    .filter(
      (product) =>
        product.category === currentProduct.category &&
        product.id !== currentProduct.id
    )
    .slice(0, 3);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <h2 className="mb-10 text-3xl font-bold text-green-900">
        You May Also Like
      </h2>

      <div className="grid gap-8 md:grid-cols-3">
        {relatedProducts.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="group overflow-hidden rounded-3xl border border-green-100 bg-white shadow-md transition hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="relative h-56">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>

            <div className="p-5">
              <h3 className="text-xl font-semibold text-green-900">
                {product.name}
              </h3>

              <p className="mt-2 text-sm text-gray-600">
                {product.shortDescription}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}