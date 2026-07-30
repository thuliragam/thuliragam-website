import {
  Home,
  UtensilsCrossed,
  Hotel,
  ShoppingCart,
  Dumbbell,
  Salad,
} from "lucide-react";

const customers = [
  {
    icon: Home,
    title: "Homes & Families",
    description:
      "Fresh microgreens for everyday healthy meals and nutrition.",
  },
  {
    icon: UtensilsCrossed,
    title: "Restaurants & Cafés",
    description:
      "Premium garnishes and fresh ingredients for modern cuisine.",
  },
  {
    icon: Hotel,
    title: "Hotels & Resorts",
    description:
      "Consistent quality microgreens for fine dining and buffets.",
  },
  {
    icon: ShoppingCart,
    title: "Retail Stores",
    description:
      "Freshly packed microgreens suitable for supermarkets and organic stores.",
  },
  {
    icon: Dumbbell,
    title: "Gyms & Wellness Centres",
    description:
      "Nutrient-rich greens for health-conscious customers.",
  },
  {
    icon: Salad,
    title: "Caterers & Events",
    description:
      "Beautiful fresh microgreens to elevate presentation and taste.",
  },
];

export default function MicrogreensWhoWeServe() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-600">
            Who We Serve
          </p>

          <h2 className="mt-4 text-4xl font-bold text-gray-900">
            Fresh Microgreens for Every Need
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-600">
            We proudly supply fresh, premium-quality microgreens to a wide range
            of customers across Coimbatore and surrounding regions.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {customers.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-green-100 bg-green-50 p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-5 inline-flex rounded-full bg-white p-4">
                  <Icon className="h-8 w-8 text-green-600" />
                </div>

                <h3 className="mb-3 text-xl font-semibold text-gray-900">
                  {item.title}
                </h3>

                <p className="leading-7 text-gray-600">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}