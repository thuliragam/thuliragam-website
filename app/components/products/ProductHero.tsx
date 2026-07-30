import Link from "next/link";

export default function ProductHero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-green-900 via-green-800 to-green-700 px-8 py-20 text-white">
      {/* Background Blur Effects */}
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-lime-300/10 blur-3xl" />

      <div className="relative mx-auto max-w-4xl text-center">
        {/* Badge */}
        <span className="inline-block rounded-full bg-white/20 px-4 py-2 text-sm font-semibold tracking-wide">
          🌿 OUR PRODUCTS
        </span>

        {/* Heading */}
        <h1 className="mt-6 text-4xl font-extrabold leading-tight md:text-6xl">
          Naturally Fresh
          <br />
          Products
        </h1>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-green-100">
          Discover our premium collection of fresh microgreens, herbal
          powders, natural spices, and dehydrated vegetables — carefully
          grown and processed to deliver freshness in every bite.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="#catalog"
            className="rounded-xl bg-white px-8 py-4 font-semibold text-green-800 transition-all duration-300 hover:scale-105 hover:bg-green-50"
          >
            Browse Products
          </Link>

          <Link
            href="/#contact"
            className="rounded-xl border border-white px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-white hover:text-green-800"
          >
            Contact Us
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
          <div>
            <h3 className="text-3xl font-bold">20+</h3>
            <p className="mt-2 text-green-100">Products</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold">100%</h3>
            <p className="mt-2 text-green-100">Natural</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold">Fresh</h3>
            <p className="mt-2 text-green-100">Harvested Daily</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold">Premium</h3>
            <p className="mt-2 text-green-100">Quality</p>
          </div>
        </div>
      </div>
    </section>
  );
}