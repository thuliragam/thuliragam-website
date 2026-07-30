import {
  microgreens,
  herbalPowders,
  naturalSpices,
  dehydratedVegetables,
} from "@/app/lib/products";

import ProductCard from "./ProductCard";

const products = [
  ...microgreens.map((item) => ({
    id: `microgreen-${item.name}`,
    category: "Microgreens",
    title: item.name,
    description: item.description,
    image: item.image,
    link: "/products/microgreens",
  })),

  ...herbalPowders.map((item) => ({
    id: `herbal-${item.name}`,
    category: "Herbal Powders",
    title: item.name,
    description: item.description,
    image: item.image,
    link: "/products/herbal-powders",
  })),

  ...naturalSpices.map((item) => ({
    id: `spice-${item.name}`,
    category: "Natural Spices",
    title: item.name,
    description: item.description,
    image: item.image,
    link: "/products/natural-spices",
  })),

  ...dehydratedVegetables.map((item) => ({
    id: `vegetable-${item.name}`,
    category: "Dehydrated Vegetables",
    title: item.name,
    description: item.description,
    image: item.image,
    link: "/products/dehydrated-vegetables",
  })),
];

export default function ProductGrid() {
  return (
    <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          title={product.title}
          description={product.description}
          image={product.image}
          link={product.link}
        />
      ))}
    </div>
  );
}