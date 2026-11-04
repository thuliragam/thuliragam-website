export interface Product {
  name: string;
  image: string;
  description: string;
  harvestDays?: string;
  price50g?: number;
}

export const microgreens: Product[] = [
  {
    name: "Sunflower",
    image: "/images/products/sunflower.jpg",
    description: "Nutty flavour • Crunchy texture • Fresh green shoots",
    harvestDays: "8–12 days",
    price50g: 60,
  },
  {
    name: "Turnip",
    image: "/images/products/turnip.jpg",
    description: "Fresh flavour • Tender leaves • Colourful stems",
    harvestDays: "7–12 days",
    price50g: 50,
  },
  {
    name: "Pink Radish",
    image: "/images/products/pink-radish.jpg",
    description: "Peppery flavour • Pink stems • Crisp texture",
    harvestDays: "6–10 days",
    price50g: 60,
  },
  {
    name: "White Radish",
    image: "/images/products/white-radish.jpg",
    description: "Fresh peppery flavour • Tender shoots • Crisp texture",
    harvestDays: "6–10 days",
    price50g: 60,
  },
  {
    name: "Mustard",
    image: "/images/products/mustard.jpg",
    description: "Bold peppery flavour • Fresh green leaves",
    harvestDays: "6–10 days",
    price50g: 50,
  },
  {
    name: "Pak Choi",
    image: "/images/products/pak-choi.jpg",
    description: "Mild flavour • Tender leaves • Delicate texture",
    harvestDays: "8–14 days",
    price50g: 60,
  },
  {
    name: "Pea Shoots",
    image: "/images/products/pea-shoot.jpg",
    description: "Naturally sweet flavour • Tender shoots • Delicate tendrils",
    harvestDays: "8–14 days",
    price50g: 50,
  },
  {
    name: "Wheat",
    image: "/images/products/wheat.jpg",
    description: "Fresh green shoots • Vibrant colour • Grown with care",
    harvestDays: "7–12 days",
    price50g: 50,
  },
  {
    name: "Red Amaranthus",
    image: "/images/products/amaranth-red.jpg",
    description: "Vibrant red tones • Tender leaves • Colourful presentation",
    harvestDays: "10–18 days",
    price50g: 70,
  },
  {
    name: "Green Amaranthus",
    image: "/images/products/amaranth-green.jpg",
    description: "Fresh green leaves • Tender texture • Mild flavour",
    harvestDays: "10–18 days",
    price50g: 60,
  },
  {
  name: "Cauliflower",
  image: "/images/products/cauliflower.jpg",
  description: "Fresh green shoots • Tender texture • Mild flavour",
  harvestDays: "8–14 days",
  price50g: 60,
},
  {
    name: "Red Cabbage",
    image: "/images/products/red-cabbage.jpg",
    description: "Purple tones • Tender leaves • Fresh flavour",
    harvestDays: "8–14 days",
    price50g: 60,
  },
  {
    name: "Chinese Cabbage",
    image: "/images/products/chinese-cabbage.jpg",
    description: "Mild flavour • Delicate leaves • Fresh green colour",
    harvestDays: "7–12 days",
    price50g: 55,
  },
  {
    name: "Yellow American Mustard",
    image: "/images/products/yellow-american-mustard.jpg",
    description: "Distinctive mustard flavour • Tender green shoots",
    harvestDays: "6–10 days",
    price50g: 50,
  },
  {
    name: "Arugula (Rocket)",
    image: "/images/products/arugula.jpg",
    description: "Peppery flavour • Distinctive leaves • Gourmet favourite",
    harvestDays: "8–14 days",
    price50g: 70,
  },
  {
    name: "Purple Kohlrabi",
    image: "/images/products/purple-kohlrabi.jpg",
    description: "Purple stems • Tender green leaves • Mild flavour",
    harvestDays: "8–14 days",
    price50g: 70,
  },
];

export const herbalPowders: Product[] = [
  {
    name: "Curry Leaf Powder",
    image: "/images/products/curry-leaf-powder.jpg",
    description: "Iron Rich • Traditional Wellness • Freshly Ground",
  },
  {
    name: "Amla Powder",
    image: "/images/products/amla-powder.jpg",
    description: "High in Vitamin C • Supports Immunity • Natural Antioxidant",
  },
  {
    name: "Moringa Powder",
    image: "/images/products/moringa-powder.jpg",
    description: "Rich in Iron • Calcium Rich • Daily Superfood",
  },
  {
    name: "Microgreen Powder",
    image: "/images/products/microgreen-powder.jpg",
    description: "Nutrient Dense • Daily Wellness • Naturally Dried",
  },
];

export const naturalSpices: Product[] = [
  {
    name: "Turmeric Powder",
    image: "/images/products/turmeric.jpg",
    description: "Pure turmeric powder with rich colour and aroma.",
  },
  {
    name: "Red Chilli Powder",
    image: "/images/products/chilli.jpg",
    description: "Premium red chilli powder for authentic taste.",
  },
  {
    name: "Coriander Powder",
    image: "/images/products/coriander-powder.jpg",
    description: "Freshly ground coriander powder with natural aroma.",
  },
  {
    name: "Black Pepper",
    image: "/images/products/black-pepper.jpg",
    description: "Premium whole black pepper with rich flavour.",
  },
];

export const dehydratedVegetables: Product[] = [
  {
    name: "Tomato",
    image: "/images/products/dehydrated-tomato.jpg",
    description: "Naturally dehydrated tomatoes retaining flavour and nutrition.",
  },
  {
    name: "Onion",
    image: "/images/products/dehydrated-onion.jpg",
    description: "Premium dehydrated onion flakes for convenient cooking.",
  },
  {
    name: "Carrot",
    image: "/images/products/dehydrated-carrot.jpg",
    description: "Fresh dehydrated carrots with natural sweetness.",
  },
  {
    name: "Beetroot",
    image: "/images/products/dehydrated-beetroot.jpg",
    description: "Naturally dehydrated beetroot with vibrant colour and flavour.",
  },
];