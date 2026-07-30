import {
  Home,
  ShoppingBag,
  HeartPulse,
  UtensilsCrossed,
  Hotel,
  Building2,
} from "lucide-react";

const customers = [
  {
    icon: Home,
    title: "Homes & Families",
    description:
      "Perfect for everyday cooking and adding natural ingredients to daily meals.",
  },
  {
    icon: ShoppingBag,
    title: "Organic & Retail Stores",
    description:
      "Available in retail-ready packaging suitable for supermarkets and organic stores.",
  },
  {
    icon: HeartPulse,
    title: "Health & Wellness Centres",
    description:
      "A great choice for wellness-focused businesses looking for quality herbal products.",
  },
  {
    icon: UtensilsCrossed,
    title: "Restaurants & Cafés",
    description:
      "Suitable for recipes, beverages, and health-focused menu offerings.",
  },
  {
    icon: Hotel,
    title: "Hotels & Resorts",
    description:
      "Reliable supply of premium herbal powders for hospitality kitchens.",
  },
  {
    icon: Building2,
    title: "Bulk & Wholesale Buyers",
    description:
      "Bulk supply options available for distributors, manufacturers, and commercial buyers.",
  },
];

export default function HerbalWhoWeServe() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-600">
            Who We Serve
          </p>

          <h2 className="mt-4 text-4xl font-bold text-gray-900">
            Trusted by Diverse Customers
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-600">
            We proudly supply premium herbal powders to homes, retailers,
            hospitality businesses, wellness centres, and commercial buyers.
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