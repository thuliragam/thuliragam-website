
"use client";

import { useEffect, useState } from "react";
import { Star, Quote, MessageCircle } from "lucide-react";

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
    <SectionContainer
      id="testimonials"
      className="bg-[#FBFBF3]"
    >
      <SectionTitle
        badge="⭐ TESTIMONIALS"
        title="Words That"
        highlight="Grow Our Journey"
        description="Every happy customer inspires us to bring more freshness, goodness, and care to every home."
      />

      {loading ? (
        <p className="mt-10 text-center text-[#063D20]/60">
          Loading customer reviews...
        </p>
      ) : (
        <>
          {testimonials.length > 0 && (
            <div className="mt-10 grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <FadeUp key={testimonial.id} delay={index * 0.12}>
                  <article className="group relative flex h-full min-h-[270px] flex-col overflow-hidden rounded-[26px] border border-[#ffffff]/10 bg-[#063D20] p-6 shadow-[0_12px_35px_rgba(6,61,32,0.12)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(6,61,32,0.22)] sm:p-7">

                    {/* Decorative quote */}
                    <div className="absolute -right-3 -top-5 opacity-[0.08] transition-transform duration-500 group-hover:scale-110">
                      <Quote
                        size={112}
                        className="text-[#B9E65A]"
                        strokeWidth={1.5}
                      />
                    </div>

                    {/* Rating */}
                    <div className="relative z-10 mb-5 flex items-center gap-1">
                      {Array.from({
                        length: Math.max(0, Math.min(5, testimonial.rating)),
                      }).map((_, i) => (
                        <Star
                          key={i}
                          size={17}
                          className="fill-[#B9E65A] text-[#B9E65A]"
                        />
                      ))}
                      <span className="ml-2 text-xs font-semibold tracking-wider text-[#B9E65A]/80">
                        {testimonial.rating}.0 / 5
                      </span>
                    </div>

                    {/* Review */}
                    <div className="relative z-10 flex-1">
                      <p className="text-[15px] leading-7 text-white/85">
                        “{testimonial.review}”
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="my-6 h-px w-full bg-white/15" />

                    {/* Customer details */}
                    <div className="relative z-10 flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#B9E65A]/40 bg-[#B9E65A] text-lg font-bold text-[#063D20]">
                        {testimonial.name.charAt(0).toUpperCase()}
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-bold tracking-wide text-white">
                          {testimonial.name}
                        </h3>
                        <p className="mt-1 truncate text-xs text-[#B9E65A]/80">
                          {testimonial.role}
                        </p>
                      </div>

                      <div className="ml-auto">
                        <MessageCircle
                          size={19}
                          className="text-[#B9E65A]/60"
                        />
                      </div>
                    </div>
                  </article>
                </FadeUp>
              ))}
            </div>
          )}

          {!testimonials.length && (
            <div className="mt-10 rounded-3xl border border-[#075B25]/10 bg-white px-6 py-12 text-center">
              <MessageCircle
                size={34}
                className="mx-auto mb-3 text-[#00A844]"
              />
              <p className="font-medium text-[#063D20]">
                Customer reviews will be added soon.
              </p>
              <p className="mt-1 text-sm text-[#063D20]/55">
                We look forward to sharing their experiences with you.
              </p>
            </div>
          )}
        </>
      )}
    </SectionContainer>
  );
}
