import {
  Home,
  ShoppingBag,
  UtensilsCrossed,
  Hotel,
  Factory,
  Truck,
} from "lucide-react";

const customers = [
  {
    icon: Home,
    title: "Homes & Families",
    description:
      "Fresh and authentic spices for everyday home cooking and traditional recipes.",
  },
  {
    icon: ShoppingBag,
    title: "Retail & Organic Stores",
    description:
      "Retail-ready spice packs suitable for supermarkets, grocery stores, and organic shops.",
  },
  {
    icon: UtensilsCrossed,
    title: "Restaurants & Cafés",
    description:
      "Consistent quality spices that enhance flavor in professional kitchens.",
  },
  {
    icon: Hotel,
    title: "Hotels & Catering",
    description:
      "Reliable supply of premium spices for hotels, catering services, and banquet kitchens.",
  },
  {
    icon: Factory,
    title: "Food Manufacturers",
    description:
      "Bulk spice solutions for food processing units and packaged food manufacturers.",
  },
  {
    icon: Truck,
    title: "Wholesale & Distributors",
    description:
      "Large-volume supply options for wholesalers and distribution partners.",
  },
];

export default function SpicesWhoWeServe() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-600">
            Who We Serve
          </p>

          <h2 className="mt-4 text-4xl font-bold text-gray-900">
            Serving Homes, Businesses & Food Professionals
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-600">
            Thuliragam Natural Spices are trusted by households, retailers,
            hospitality businesses, and food industry professionals looking for
            authentic quality and reliable supply.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {customers.map((customer) => {
            const Icon = customer.icon;

            return (
              <div
                key={customer.title}
                className="rounded-2xl border border-green-100 bg-green-50 p-8 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-5 inline-flex rounded-full bg-white p-4">
                  <Icon className="h-8 w-8 text-green-600" />
                </div>

                <h3 className="mb-3 text-xl font-semibold text-gray-900">
                  {customer.title}
                </h3>

                <p className="leading-7 text-gray-600">
                  {customer.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}