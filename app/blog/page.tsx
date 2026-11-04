
import { supabase } from "@/lib/supabase/client";
import BlogExplorer from "./BlogExplorer";

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
    <main className="min-h-screen bg-[#f7faf5]">
      <section className="bg-emerald-900 px-6 py-20 text-center text-white">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-200">
          Thuliragam Journal
        </p>

        <h1 className="text-4xl font-bold sm:text-5xl">
          Grow Your Knowledge
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-emerald-100">
          Discover microgreens, nutrition, recipes and simple ways to
          grow a healthier lifestyle.
        </p>
      </section>

      {error ? (
        <div className="px-6 py-20 text-center text-gray-600">
          Blogs are temporarily unavailable. Please try again later.
        </div>
      ) : (
        <BlogExplorer posts={posts || []} />
      )}
    </main>
  );
}
