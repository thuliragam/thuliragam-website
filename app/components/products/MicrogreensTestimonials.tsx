import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Restaurant Owner",
    location: "Coimbatore",
    feedback:
      "The freshness and quality of Thuliragam microgreens have been outstanding. Our customers love them in salads and gourmet dishes.",
  },
  {
    name: "Health Enthusiast",
    location: "Coimbatore",
    feedback:
      "Fresh, nutritious, and delivered with excellent quality. They've become part of my daily diet.",
  },
  {
    name: "Home Cook",
    location: "Tamil Nadu",
    feedback:
      "The microgreens stay fresh and add wonderful flavor and color to our meals. Highly recommended.",
  },
];

export default function MicrogreensTestimonials() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-600">
            Testimonials
          </p>

          <h2 className="mt-4 text-4xl font-bold text-gray-900">
            What Our Customers Say
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-600">
            We are proud to serve customers who value freshness, quality, and
            naturally grown products.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.name + item.location}
              className="rounded-2xl border border-green-100 bg-green-50 p-8 shadow-sm transition hover:shadow-lg"
            >
              <div className="mb-5 flex gap-1 text-yellow-500">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-5 w-5 fill-current" />
                ))}
              </div>

              <p className="italic leading-7 text-gray-700">
                "{item.feedback}"
              </p>

              <div className="mt-6">
                <h3 className="font-semibold text-gray-900">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {item.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}