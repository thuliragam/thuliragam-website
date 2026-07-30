export interface GalleryImage {
  id: number;
  title: string;
  image: string;
  category: string;
}

export const galleryImages: GalleryImage[] = [
  // =========================
  // MICROGREENS
  // =========================
  {
    id: 1,
    title: "Alfalfa",
    image: "/images/products/alfalfa.jpg",
    category: "Microgreens",
  },
  {
    id: 2,
    title: "Amaranthus",
    image: "/images/products/amaranthus.jpg",
    category: "Microgreens",
  },
  {
    id: 3,
    title: "Basil",
    image: "/images/products/basil.jpg",
    category: "Microgreens",
  },
  {
    id: 4,
    title: "Beetroot",
    image: "/images/products/beetroot.jpg",
    category: "Microgreens",
  },
  {
    id: 5,
    title: "Broccoli",
    image: "/images/products/broccoli.jpg",
    category: "Microgreens",
  },
  {
    id: 6,
    title: "Bok Choy",
    image: "/images/products/bok-choy.jpg",
    category: "Microgreens",
  },
  {
    id: 7,
    title: "Chickpea",
    image: "/images/products/chickpea.jpg",
    category: "Microgreens",
  },
  {
    id: 8,
    title: "Coriander",
    image: "/images/products/coriander.jpg",
    category: "Microgreens",
  },

  // =========================
  // HERBAL POWDERS
  // =========================
  {
    id: 9,
    title: "Amla Powder",
    image: "/images/products/amla.jpg",
    category: "Herbal Powders",
  },
  {
    id: 10,
    title: "Beetroot Powder",
    image: "/images/products/beetroot-powder.jpg",
    category: "Herbal Powders",
  },
  {
    id: 11,
    title: "Coriander Powder",
    image: "/images/products/coriander-powder.jpg",
    category: "Herbal Powders",
  },

  // =========================
  // NATURAL SPICES
  // =========================
  {
    id: 12,
    title: "Black Pepper",
    image: "/images/products/black-pepper.jpg",
    category: "Natural Spices",
  },
  {
    id: 13,
    title: "Chilli",
    image: "/images/products/chilli.jpg",
    category: "Natural Spices",
  },
  {
    id: 14,
    title: "Curry Leaf",
    image: "/images/products/curry-leaf.jpg",
    category: "Natural Spices",
  },
];