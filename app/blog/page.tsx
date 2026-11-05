
import { supabase } from "@/lib/supabase/client";
import BlogExplorer from "./BlogExplorer";

import {
  Leaf,
  Sparkles,
  BookOpen,
  ArrowDown,
} from "lucide-react";

export const metadata = {
  title: "Thuliragam Blog | Grow Healthier Tomorrow",
  description:
    "Explore microgreens knowledge, nutrition, recipes, growing tips and healthy lifestyle ideas from Thuliragam.",
};

export default async function BlogPage() {
  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select(
      "id, title, slug, excerpt, cover_image, cover_image_alt, category, published_at"
    )
    .eq("status", "published")
    .order("published_at", { ascending: false });

  return (
    <main className="min-h-screen bg-[#FBFBF3]">

      {/* PREMIUM BOTANICAL EDITORIAL HERO */}
      <section className="relative isolate overflow-hidden bg-[#063D20] px-6 py-20 text-white sm:py-24 lg:py-28">

        {/* Background dotted pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(#B9E65A 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Decorative circles */}
        <div className="pointer-events-none absolute -right-20 -top-24 h-[420px] w-[420px] rounded-full border border-[#B9E65A]/20" />

        <div className="pointer-events-none absolute -right-5 -top-10 h-[300px] w-[300px] rounded-full border border-[#B9E65A]/15" />

        <div className="pointer-events-none absolute -bottom-36 -left-28 h-[400px] w-[400px] rounded-full border border-[#B9E65A]/15" />

        {/* Left botanical illustration */}
        <div className="pointer-events-none absolute left-[7%] top-1/2 hidden -translate-y-1/2 opacity-25 lg:block">
          <svg viewBox="0 0 180 240" width="180" fill="none">
            <path
              d="M90 225 C85 160 95 95 90 20"
              stroke="#B9E65A"
              strokeWidth="2"
            />
            <path
              d="M90 170 C35 165 18 125 25 90 C65 92 94 125 90 170Z"
              stroke="#B9E65A"
              strokeWidth="2"
            />
            <path
              d="M91 130 C145 122 163 84 153 50 C116 57 90 91 91 130Z"
              stroke="#B9E65A"
              strokeWidth="2"
            />
            <path
              d="M90 88 C50 80 42 48 52 25 C80 32 95 55 90 88Z"
              stroke="#B9E65A"
              strokeWidth="2"
            />
            <path
              d="M90 170 L25 90 M91 130 L153 50 M90 88 L52 25"
              stroke="#B9E65A"
              strokeWidth="1"
            />
          </svg>
        </div>

        {/* Right botanical illustration */}
        <div className="pointer-events-none absolute right-[7%] top-1/2 hidden -translate-y-1/2 rotate-12 opacity-25 lg:block">
          <svg viewBox="0 0 180 240" width="180" fill="none">
            <path
              d="M90 225 C85 160 95 95 90 20"
              stroke="#B9E65A"
              strokeWidth="2"
            />
            <path
              d="M90 170 C35 165 18 125 25 90 C65 92 94 125 90 170Z"
              stroke="#B9E65A"
              strokeWidth="2"
            />
            <path
              d="M91 130 C145 122 163 84 153 50 C116 57 90 91 91 130Z"
              stroke="#B9E65A"
              strokeWidth="2"
            />
            <path
              d="M90 88 C50 80 42 48 52 25 C80 32 95 55 90 88Z"
              stroke="#B9E65A"
              strokeWidth="2"
            />
            <path
              d="M90 170 L25 90 M91 130 L153 50 M90 88 L52 25"
              stroke="#B9E65A"
              strokeWidth="1"
            />
          </svg>
        </div>

        {/* Main hero content */}
        <div className="relative z-10 mx-auto max-w-4xl text-center">

          {/* Brand label */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#B9E65A]/30 bg-white/[0.07] px-5 py-2 backdrop-blur-sm">
            <Leaf size={15} className="text-[#B9E65A]" />

            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#B9E65A] sm:text-xs">
              Thuliragam Journal
            </span>
          </div>

          {/* Main heading */}
          <h1 className="mt-7 text-5xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
            Grow Your

            <span className="block text-[#B9E65A]">
              Knowledge.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/75 sm:text-base sm:leading-8">
            A little inspiration for a greener life. Explore
            microgreens, nutrition, delicious recipes and the
            art of growing better.
          </p>

          {/* Decorative divider */}
          <div className="mx-auto mt-9 flex items-center justify-center gap-3">
            <div className="h-px w-10 bg-[#B9E65A]/50" />

            <SproutIcon />

            <div className="h-px w-10 bg-[#B9E65A]/50" />
          </div>

          {/* Editorial topic cards */}
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-3 sm:gap-4">

            <div className="rounded-2xl border border-white/15 bg-white/[0.07] px-3 py-4 backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/10">
              <Leaf
                className="mx-auto text-[#B9E65A]"
                size={23}
              />

              <p className="mt-3 text-xs font-bold text-white sm:text-sm">
                Microgreens
              </p>

              <p className="mt-1 text-[10px] text-white/50">
                Explore nature
              </p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/[0.07] px-3 py-4 backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/10">
              <Sparkles
                className="mx-auto text-[#B9E65A]"
                size={23}
              />

              <p className="mt-3 text-xs font-bold text-white sm:text-sm">
                Nutrition
              </p>

              <p className="mt-1 text-[10px] text-white/50">
                Discover goodness
              </p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/[0.07] px-3 py-4 backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/10">
              <BookOpen
                className="mx-auto text-[#B9E65A]"
                size={23}
              />

              <p className="mt-3 text-xs font-bold text-white sm:text-sm">
                Recipes & Tips
              </p>

              <p className="mt-1 text-[10px] text-white/50">
                Get inspired
              </p>
            </div>

          </div>

          {/* Explore button */}
          <a
            href="#articles"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#B9E65A] px-7 py-3.5 text-sm font-bold text-[#063D20] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl"
          >
            Explore Articles
            <ArrowDown size={17} />
          </a>

        </div>

        {/* Bottom editorial strip */}
        <div className="relative z-10 mx-auto mt-16 flex max-w-5xl flex-wrap items-center justify-center gap-x-7 gap-y-3 border-t border-white/15 pt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 sm:text-xs">
          <span>Grow</span>
          <span className="text-[#B9E65A]">✳</span>
          <span>Discover</span>
          <span className="text-[#B9E65A]">✳</span>
          <span>Learn</span>
          <span className="text-[#B9E65A]">✳</span>
          <span>Live Better</span>
        </div>

        {/* Bottom accent */}
        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-[#B9E65A]/70 to-transparent" />

      </section>

      {/* BLOG ARTICLES */}
      {error ? (
        <div className="px-6 py-20 text-center text-[#355B45]">
          Blogs are temporarily unavailable. Please try again later.
        </div>
      ) : (
        <div id="articles" className="scroll-mt-24">
          <BlogExplorer posts={posts || []} />
        </div>
      )}

    </main>
  );
}

/* Small decorative sprout icon */
function SproutIcon() {
  return (
    <Leaf
      size={19}
      className="text-[#B9E65A]"
      strokeWidth={1.8}
    />
  );
}
