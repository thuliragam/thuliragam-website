import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-[#F7FBF5]">
      <div className="max-w-7xl mx-auto px-8 py-20 grid md:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
        <div>
          <p className="text-green-700 font-semibold uppercase tracking-widest">
            Fresh • Healthy • Natural
          </p>

          <h1 className="text-6xl font-bold text-green-900 mt-6 leading-tight">
            Nature's
            <br />
            Freshest
            <br />
            Nutrition
          </h1>

          <p className="mt-6 text-xl text-gray-600">
            Freshly grown microgreens, herbal powders and natural products for
            a healthier tomorrow.
          </p>

          <div className="mt-10 flex gap-5">
            <button className="bg-green-700 text-white px-8 py-4 rounded-full font-semibold hover:bg-green-800">
              Explore Products
            </button>

            <button className="border-2 border-green-700 text-green-700 px-8 py-4 rounded-full font-semibold hover:bg-green-700 hover:text-white">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <Image
            src="/logo.png"
            alt="Thuliragam"
            width={500}
            height={500}
            className="rounded-3xl shadow-2xl"
          />
        </div>

      </div>
    </section>
  );
}