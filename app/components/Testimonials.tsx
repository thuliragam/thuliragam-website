
"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";

import { supabase } from "@/lib/supabase/client";
import FadeUp from "./FadeUp";
import SectionContainer from "./SectionContainer";
import SectionTitle from "./SectionTitle";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  review: string;
  rating: number;
  display_order: number;
};

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadTestimonials() {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (!mounted) return;

      if (error) {
        console.error("TESTIMONIAL FETCH ERROR:", error);
      } else {
        setTestimonials(data || []);
      }

      setLoading(false);
    }

    loadTestimonials();

    const channel = supabase
      .channel("testimonials-live-updates")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "testimonials",
        },
        () => loadTestimonials()
      )
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <SectionContainer id="testimonials" className="bg-white">
      <SectionTitle
        badge="⭐ TESTIMONIALS"
        title="What Our"
        highlight="Customers Say"
        description="Customer satisfaction inspires us to continue delivering fresh, natural, and high-quality products."
      />

      {loading ? (
        <p className="mt-12 text-center text-gray-500">
          Loading customer reviews...
        </p>
      ) : (
        <div className="mt-20 grid items-stretch gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <FadeUp key={testimonial.id} delay={index * 0.15}>
              <div className="flex h-full flex-col rounded-3xl border border-green-100 bg-white p-8 shadow-lg transition-all hover:-translate-y-2 hover:border-green-300 hover:shadow-2xl">
                <div className="mb-6 flex">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="flex-1 leading-8 text-gray-600">
                  "{testimonial.review}"
                </p>

                <div className="mt-8 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-700 text-xl font-bold text-white">
                    {testimonial.name.charAt(0)}
                  </div>

                  <div>
                    <h3 className="font-bold text-green-900">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}

          {!testimonials.length && (
            <p className="col-span-full text-center text-gray-500">
              Customer reviews will be added soon.
            </p>
          )}
        </div>
      )}
    </SectionContainer>
  );
}
