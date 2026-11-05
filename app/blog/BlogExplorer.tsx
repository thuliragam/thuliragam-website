
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  ArrowUpRight,
  CalendarDays,
  Leaf,
  BookOpen,
  X,
} from "lucide-react";

type BlogPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image: string | null;
  cover_image_alt: string | null;
  category: string;
  published_at: string | null;
};

export default function BlogExplorer({
  posts,
}: {
  posts: BlogPost[];
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    "Microgreens Knowledge",
    "Nutrition",
    "Recipes",
    "Growing Tips",
    "Lifestyle",
  ];

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        category === "All" || post.category === category;

      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        post.title.toLowerCase().includes(searchText) ||
        (post.excerpt || "").toLowerCase().includes(searchText) ||
        post.category.toLowerCase().includes(searchText);

      return matchesCategory && matchesSearch;
    });
  }, [posts, search, category]);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <section className="bg-[#FBFBF3] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">

      <div className="mx-auto max-w-7xl">

        {/* SEARCH */}
        <div className="mx-auto max-w-3xl">
          <label
            htmlFor="blog-search"
            className="mb-3 block text-sm font-bold text-[#063D20]"
          >
            Find something inspiring
          </label>

          <div className="group flex items-center gap-3 rounded-2xl border border-[#075B25]/15 bg-white px-5 py-4 shadow-[0_8px_25px_rgba(6,61,32,0.04)] transition-all duration-300 focus-within:border-[#00A844] focus-within:shadow-[0_8px_30px_rgba(0,168,68,0.10)]">

            <Search
              size={21}
              className="shrink-0 text-[#00A844]"
            />

            <input
              id="blog-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search microgreens, nutrition, recipes..."
              className="w-full bg-transparent text-sm text-[#063D20] outline-none placeholder:text-[#063D20]/35"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="rounded-full p-1 text-[#355B45] transition hover:bg-[#E8FFF1]"
              >
                <X size={17} />
              </button>
            )}
          </div>
        </div>

        {/* CATEGORY FILTERS */}
        <div className="mt-12">

          <div className="mb-5 flex items-center gap-3">
            <Leaf size={17} className="text-[#00A844]" />
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#063D20]">
              Explore Categories
            </p>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-3">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`shrink-0 rounded-full border px-5 py-3 text-sm font-semibold transition-all duration-300 ${
                  category === item
                    ? "border-[#063D20] bg-[#063D20] text-[#B9E65A] shadow-md"
                    : "border-[#075B25]/15 bg-white text-[#355B45] hover:border-[#00A844] hover:bg-[#E8FFF1] hover:text-[#063D20]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* ARTICLE HEADING */}
        <div className="mt-12 flex flex-col justify-between gap-4 border-b border-[#075B25]/15 pb-5 sm:flex-row sm:items-end">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#00A844]">
              Fresh From Our Journal
            </p>

            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#063D20] sm:text-3xl">
              Latest Articles
            </h2>
          </div>

          <p className="text-sm font-medium text-[#355B45]">
            <span className="font-bold text-[#063D20]">
              {filteredPosts.length}
            </span>{" "}
            {filteredPosts.length === 1 ? "article" : "articles"} found
          </p>
        </div>

        {/* ARTICLE GRID */}
        {filteredPosts.length > 0 ? (
          <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-[#075B25]/10 bg-white shadow-[0_10px_30px_rgba(6,61,32,0.05)] transition-all duration-300 hover:-translate-y-2 hover:border-[#B9E65A] hover:shadow-[0_20px_45px_rgba(6,61,32,0.12)]"
              >

                {/* IMAGE */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="relative block aspect-[16/10] overflow-hidden bg-[#E8FFF1]"
                >
                  {post.cover_image ? (
                    <img
                      src={post.cover_image}
                      alt={post.cover_image_alt || post.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#063D20]">
                      <Leaf
                        size={55}
                        className="text-[#B9E65A]"
                        strokeWidth={1}
                      />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#063D20]/50 via-transparent to-transparent opacity-60" />

                  <div className="absolute bottom-4 left-4">
                    <span className="rounded-full border border-white/20 bg-[#063D20]/85 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-[#B9E65A] backdrop-blur-md">
                      {post.category}
                    </span>
                  </div>
                </Link>

                {/* ARTICLE CONTENT */}
                <div className="flex flex-1 flex-col p-6 sm:p-7">

                  {post.published_at && (
                    <div className="flex items-center gap-2 text-xs font-medium text-[#355B45]/60">
                      <CalendarDays
                        size={14}
                        className="text-[#00A844]"
                      />
                      {formatDate(post.published_at)}
                    </div>
                  )}

                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="mt-4 text-xl font-bold leading-snug text-[#063D20] transition-colors duration-300 group-hover:text-[#00A844]">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="mt-3 line-clamp-3 flex-1 text-sm leading-7 text-[#355B45]">
                    {post.excerpt || "Discover more from Thuliragam."}
                  </p>

                  <div className="mt-6 border-t border-[#075B25]/10 pt-5">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#075B25] transition-colors hover:text-[#00A844]"
                    >
                      Read Article
                      <ArrowUpRight
                        size={17}
                        className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                      />
                    </Link>
                  </div>
                </div>
              </article>
            ))}

          </div>
        ) : (

          /* EMPTY STATE */
          <div className="mt-10 rounded-[28px] border border-[#075B25]/10 bg-white px-6 py-16 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E8FFF1] text-[#075B25]">
              <BookOpen size={30} />
            </div>

            <h3 className="mt-6 text-2xl font-bold text-[#063D20]">
              No articles found
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#355B45]">
              We couldn't find anything matching your search.
              Try another keyword or explore a different category.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="mt-7 rounded-full bg-[#063D20] px-7 py-3 text-sm font-bold text-[#B9E65A] transition-all duration-300 hover:-translate-y-1 hover:bg-[#075B25]"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* BOTTOM EDITORIAL MESSAGE */}
        <div className="mt-16 rounded-[26px] bg-[#063D20] px-6 py-9 text-center sm:px-10">
          <Leaf
            size={25}
            className="mx-auto text-[#B9E65A]"
          />

          <h3 className="mt-4 text-xl font-bold text-white sm:text-2xl">
            Keep Growing. Keep Discovering.
          </h3>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/65">
            Explore the world of microgreens, discover new ideas
            and bring a little more goodness into your everyday life.
          </p>
        </div>

      </div>
    </section>
  );
}
