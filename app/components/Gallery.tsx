
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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
    <SectionContainer id="gallery" className="bg-green-50">
      <SectionTitle
        badge="📷 GALLERY"
        title="A Glimpse of"
        highlight="Thuliragam"
        description="Explore our journey from growing fresh microgreens to harvesting and hygienic packaging."
      />

      {loading ? (
        <p className="mt-16 text-center text-emerald-800">
          Loading our gallery...
        </p>
      ) : (
        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((item, index) => (
            <FadeUp key={item.id} delay={index * 0.1}>
              <div className="group overflow-hidden rounded-3xl bg-white shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl">
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    fill
                    unoptimized={item.image_url.startsWith("http")}
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="absolute bottom-6 left-6 translate-y-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <h3 className="text-2xl font-bold text-white">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      )}

      {!loading && gallery.length === 0 && (
        <p className="mt-10 text-center text-gray-500">
          Gallery photos will be added soon.
        </p>
      )}
    </SectionContainer>
  );
}
