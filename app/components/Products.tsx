import Image from "next/image";
import Link from "next/link";

const products = [
  {
    name: "Microgreens",
    image: "/images/microgreens.jpg",
    desc: "Fresh nutrient-rich microgreens packed with vitamins, minerals, and natural goodness.",
    link: "/products/microgreens",
  },
  {
    name: "Herbal Powders",
    image: "/images/herbal-powder.jpg",
    desc: "Traditional herbal powders prepared from carefully selected natural ingredients.",
    link: "/products/herbal-powders",
  },
  {
    name: "Natural Spices",
    image: "/images/spices.jpg",
    desc: "Pure, aromatic spices that bring authentic flavour and freshness to every meal.",
    link: "/products/natural-spices",
  },
  {
    name: "Dehydrated Vegetables",
    image: "/images/vegetables.jpg",
    desc: "Naturally dehydrated vegetables that retain flavour, colour, and nutritional value.",
    link: "/products/dehydrated-vegetables",
  },
];

export default function Products() {
  return (
    <section
      id="products"
      className="py-24 bg-[#F7FCF8]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-16">

          <p className="text-green-700 uppercase tracking-[3px] font-semibold">
            Our Products
          </p>

          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-green-900">
            Fresh from Nature
          </h2>

          <p className="mt-5 text-gray-600 max-w-3xl mx-auto leading-8">
            Discover our carefully crafted range of fresh, natural, and
            healthy products designed to support your everyday wellness.
          </p>

        </div>

        {/* Product Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {products.map((product) => (

            <div
              key={product.name}
              className="bg-white rounded-3xl overflow-hidden border border-green-100 shadow-md hover:shadow-2xl hover:-translate-y-3 transition-all duration-300"
            >

              <Link href={product.link}>

                <div className="overflow-hidden">

                  <Image
                    src={product.image}
                    alt={product.name}
                    width={500}
                    height={350}
                    className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
                  />

                </div>

              </Link>

              <div className="p-8">

                <h3 className="text-2xl font-bold text-green-900">
                  {product.name}
                </h3>

                <p className="mt-4 text-gray-600 leading-7">
                  {product.desc}
                </p>

                <div className="mt-8 flex gap-3">

                  <Link
                    href={product.link}
                    className="bg-green-700 hover:bg-green-800 text-white px-5 py-3 rounded-full font-semibold transition"
                  >
                    Learn More
                  </Link>

                  <a
                    href="/#contact"
                    className="border border-green-700 text-green-700 hover:bg-green-700 hover:text-white px-5 py-3 rounded-full font-semibold transition"
                  >
                    Enquire
                  </a>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}