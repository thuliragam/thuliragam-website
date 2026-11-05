
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Leaf, Images } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

import FadeUp from "./FadeUp";
import SectionContainer from "./SectionContainer";
import SectionTitle from "./SectionTitle";

type GalleryImage = {
  id: number;
  title: string;
  image_url: string;
  display_order: number;
};

export default function Gallery() {
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadGallery() {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("*")
        .order("display_order", { ascending: true });

      if (!mounted) return;

      if (error) {
        console.error("GALLERY FETCH ERROR:", error);
      } else {
        setGallery(data || []);
      }

      setLoading(false);
    }

    loadGallery();

    const channel = supabase
      .channel("gallery-live-updates")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "gallery_images",
        },
        () => loadGallery()
      )
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <SectionContainer
      id="gallery"
      className="bg-[#FBFBF3] !py-12 lg:!py-10"
    >
      {/* SECTION TITLE */}
      <SectionTitle
        badge="OUR WORLD IN PICTURES"
        title="A Glimpse of"
        highlight="Thuliragam"
        description="Explore our journey from growing fresh microgreens to harvesting and hygienic packaging."
      />

      {/* GALLERY */}
      {loading ? (
        <div className="mt-14 flex items-center justify-center gap-3 text-[#075B25]">
          <Leaf size={20} className="animate-pulse" />
          <p className="text-sm font-medium">
            Loading our gallery...
          </p>
        </div>
      ) : gallery.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[190px]">

          {gallery.map((item, index) => {
            const isFeatured = index === 0;
            const isSideImage = index === 1 || index === 2;

            const layoutClass = isFeatured
              ? "sm:col-span-2 lg:col-span-7 lg:row-span-2 lg:min-h-[395px]"
              : isSideImage
              ? "lg:col-span-5 lg:min-h-[190px]"
              : "lg:col-span-4 lg:min-h-[190px]";

            return (
              <FadeUp
                key={item.id}
                delay={Math.min(index * 0.08, 0.4)}
                className={layoutClass}
              >
                <article className="group relative h-[280px] w-full overflow-hidden rounded-[26px] border border-[#D9E8CC] bg-[#063D20] shadow-[0_12px_35px_rgba(6,61,32,0.10)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(6,61,32,0.20)] sm:h-[320px] lg:h-full">

                  {/* IMAGE */}
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    fill
                    unoptimized={item.image_url.startsWith("http")}
                    sizes={
                      isFeatured
                        ? "(max-width: 768px) 100vw, 60vw"
                        : "(max-width: 768px) 100vw, 40vw"
                    }
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                  />

                  {/* PERMANENT IMAGE OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#021C10]/95 via-[#063D20]/20 to-[#063D20]/10 transition-all duration-500 group-hover:from-[#021C10]/90" />

                  {/* TOP LABEL */}
                  <div className="absolute left-5 top-5 flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#B9E65A]/30 bg-[#063D20]/80 text-[#B9E65A] shadow-lg backdrop-blur-md">
                      <Leaf size={19} />
                    </div>

                    <span className="rounded-full border border-white/20 bg-[#063D20]/75 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-[#D9F99D] backdrop-blur-md">
                      THULIRAGAM
                    </span>
                  </div>

                  {/* IMAGE NUMBER */}
                  <div className="absolute right-5 top-5 font-serif text-4xl font-bold text-white/35 transition-colors group-hover:text-[#B9E65A]">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* IMAGE TITLE */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">

                    <div className="mb-3 h-[3px] w-10 rounded-full bg-[#B9E65A] transition-all duration-500 group-hover:w-20" />

                    <div className="flex items-end justify-between gap-3">

                      <div>
                        <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.25em] text-[#B9E65A]">
                          {isFeatured
                            ? "THE THULIRAGAM JOURNEY"
                            : "GROWN WITH CARE"}
                        </p>

                        <h3 className={`font-bold leading-tight text-white drop-shadow-lg ${
                          isFeatured
                            ? "text-2xl sm:text-3xl lg:text-4xl"
                            : "text-xl sm:text-2xl"
                        }`}>
                          {item.title}
                        </h3>
                      </div>

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition-all duration-300 group-hover:border-[#B9E65A] group-hover:bg-[#B9E65A] group-hover:text-[#063D20]">
                        <ArrowUpRight size={20} />
                      </div>

                    </div>
                  </div>

                </article>
              </FadeUp>
            );
          })}

        </div>
      ) : (
        <div className="mt-12 flex flex-col items-center justify-center rounded-3xl border border-dashed border-[#B9D6B3] bg-white/70 px-6 py-16 text-center">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EAF6D8] text-[#075B25]">
            <Images size={30} />
          </div>

          <p className="mt-5 text-lg font-bold text-[#063D20]">
            Gallery photos will be added soon.
          </p>

        </div>
      )}

    </SectionContainer>
  );
}
