
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

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

export default function BlogExplorer({ posts }: { posts: BlogPost[] }) {
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

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-10">
        <label className="mb-3 block text-sm font-semibold text-emerald-950">
          Search articles
        </label>

        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search microgreens, nutrition, recipes..."
          className="w-full rounded-2xl border border-emerald-200 bg-white px-5 py-4 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
        />
      </div>

      <div className="mb-10">
        <p className="mb-4 text-sm font-bold uppercase tracking-wider text-emerald-900">
          Explore Categories
        </p>

        <div className="flex flex-wrap gap-3">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                category === item
                  ? "bg-emerald-800 text-white"
                  : "border border-emerald-200 bg-white text-emerald-900 hover:bg-emerald-50"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-emerald-950">
          Latest Articles
        </h2>
        <p className="text-sm text-gray-500">
          {filteredPosts.length} article(s)
        </p>
      </div>

      {filteredPosts.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              {post.cover_image && (
                <img
                  src={post.cover_image}
                  alt={post.cover_image_alt || post.title}
                  className="h-56 w-full object-cover"
                />
              )}

              <div className="p-6">
                <p className="text-sm font-semibold text-emerald-700">
                  {post.category}
                </p>

                <h3 className="mt-3 text-xl font-bold text-emerald-950">
                  {post.title}
                </h3>

                <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                  {post.excerpt || "Discover more from Thuliragam."}
                </p>

                {post.published_at && (
                  <p className="mt-4 text-xs text-gray-400">
                    {new Date(post.published_at).toLocaleDateString(
                      "en-IN",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </p>
                )}

                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-5 inline-block font-semibold text-emerald-800 hover:text-emerald-600"
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl bg-white px-6 py-16 text-center">
          <h3 className="text-xl font-bold text-emerald-950">
            No articles found
          </h3>
          <p className="mt-3 text-gray-600">
            Try another search or select a different category.
          </p>
          <button
            onClick={() => {
              setSearch("");
              setCategory("All");
            }}
            className="mt-5 rounded-full bg-emerald-800 px-6 py-3 font-semibold text-white"
          >
            Clear Filters
          </button>
        </div>
      )}
    </section>
  );
}
