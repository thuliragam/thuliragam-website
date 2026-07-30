import { Product } from "@/app/lib/products";

type Props = {
  currentProduct: Product;
};

export default function RelatedProducts({ currentProduct }: Props) {
  void currentProduct;
  return null;
}