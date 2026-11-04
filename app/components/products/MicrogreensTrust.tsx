
import { Droplets, Sprout, ShieldCheck, Leaf } from "lucide-react";

const trustItems = [
  {
    icon: Droplets,
    title: "Water-Based Growing",
    description: "Grown using water and carefully selected cocopeat.",
  },
  {
    icon: Sprout,
    title: "No Synthetic Fertilizers",
    description: "Our growing process does not use synthetic fertilizers.",
  },
  {
    icon: ShieldCheck,
    title: "No Synthetic Pesticides",
    description: "No synthetic pesticide sprays or chemical pest-control products.",
  },
  {
    icon: Leaf,
    title: "Freshly Harvested",
    description: "Carefully harvested and packed with attention to freshness.",
  },
];

export default function MicrogreensTrust() {
  return (
    <section className="bg-green-950 px-6 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 font-semibold uppercase tracking-[0.25em] text-yellow-300">
            The Thuliragam Promise
          </p>

          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Grown Naturally.
            <span className="block text-yellow-300">
              Grown with Care.
            </span>
          </h2>

          <p className="mt-5 leading-8 text-green-100">
            Every batch of our microgreens is grown with care,
            using water and cocopeat, without synthetic pesticides
            or synthetic fertilizers.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-green-800 bg-green-900/60 p-7 text-center transition duration-300 hover:-translate-y-2 hover:border-yellow-300"
              >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-800">
                  <Icon className="h-8 w-8 text-yellow-300" />
                </div>

                <h3 className="text-lg font-bold text-white">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-green-100">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex flex-col items-center gap-2 rounded-xl border border-yellow-300/40 bg-green-900 px-6 py-4">
            <ShieldCheck className="h-7 w-7 text-yellow-300" />

            <p className="font-semibold text-white">
              FSSAI Registered Food Business
            </p>

            <p className="text-sm tracking-wider text-yellow-200">
              Registration No. 22426017000960
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
