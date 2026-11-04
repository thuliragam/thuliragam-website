
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { notFound } from "next/navigation";
import ShareButtons from "../ShareButtons";
import ReadingProgress from "../ReadingProgress";
import TableOfContents from "../TableOfContents";
import BackToTop from "../BackToTop";

type BlogPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  cover_image_alt: string | null;
  category: string;
  seo_title: string | null;
  seo_description: string | null;
  published_at: string | null;
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  const { data } = await supabase
    .from("blog_posts")
    .select("title, seo_title, seo_description, excerpt")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (!data) {
    return { title: "Blog Not Found | Thuliragam" };
  }

  return {
    title: data.seo_title || data.title,
    description:
      data.seo_description ||
      data.excerpt ||
      "Read more from Thuliragam.",
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;

  const { data: post, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error || !post) {
    notFound();
  }

  const article = post as BlogPost;
  const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: article.title,
  description: article.seo_description || article.excerpt || "",
  image: article.cover_image ? [article.cover_image] : [],
  author: {
    "@type": "Organization",
    name: "Thuliragam Team",
  },
  publisher: {
    "@type": "Organization",
    name: "Thuliragam",
  },
  datePublished: article.published_at || undefined,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `https://www.thuliragam.in/blog/${article.slug}`,
  },
};
  // Calculate estimated reading time
const wordCount = article.content
  .replace(/<[^>]*>/g, " ")
  .trim()
  .split(/\s+/)
  .filter(Boolean).length;

const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  // Load related posts and all published article dates.
  const [{ data: relatedData }, { data: allData }] = await Promise.all([
    supabase
      .from("blog_posts")
      .select("id, title, slug, excerpt, cover_image, category")
      .eq("status", "published")
      .eq("category", article.category)
      .neq("id", article.id)
      .order("published_at", { ascending: false })
      .limit(3),

    supabase
      .from("blog_posts")
      .select("id, title, slug, published_at")
      .eq("status", "published")
      .order("published_at", { ascending: false }),
  ]);

  const allPosts = allData || [];
  const currentIndex = allPosts.findIndex(
    (item) => Number(item.id) === article.id
  );

  // In a newest-first list, the next index is an older article.
  const newerArticle =
    currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  const olderArticle =
    currentIndex >= 0 && currentIndex < allPosts.length - 1
      ? allPosts[currentIndex + 1]
      : null;

  const relatedPosts = relatedData || [];

  return (
    <main className="min-h-screen bg-[#f7faf5]">
        <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c"),
  }}
/>
        <ReadingProgress />
      <article className="mx-auto max-w-4xl px-6 py-12">
        <Link
          href="/blog"
          className="font-semibold text-emerald-800 hover:text-emerald-600"
        >
          ← Back to Blogs
        </Link>

        <header className="mb-8 mt-8">
          <p className="font-semibold text-emerald-700">
            {article.category}
          </p>

          <h1 className="mt-4 text-3xl font-bold leading-tight text-emerald-950 sm:text-5xl">
            {article.title}
          </h1>

          {article.published_at && (
            <p className="mt-4 text-sm text-gray-500">
              {new Date(article.published_at).toLocaleDateString(
                "en-IN",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }
              )}
            </p>
          )}
          <p className="mt-2 text-sm font-medium text-emerald-700">
  📖 {readingTime} min read
</p>

          {article.excerpt && (
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {article.excerpt}
            </p>
          )}
        </header>

        {article.cover_image && (
          <img
            src={article.cover_image}
            alt={article.cover_image_alt || article.title}
            className="mb-10 max-h-[500px] w-full rounded-3xl object-cover"
          />
        )}

       <TableOfContents />

<div
  className="blog-content text-gray-800"
  dangerouslySetInnerHTML={{
    __html: article.content || "",
  }}
/>
{/* AUTHOR PROFILE */}
<div className="my-10 rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
  <div className="flex items-center gap-4">
    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-emerald-800 text-2xl font-bold text-white">
      T
    </div>

    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
        Written by
      </p>

      <h3 className="mt-1 text-xl font-bold text-emerald-950">
        Thuliragam Team
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        Growing a Healthier Tomorrow
      </p>
    </div>
  </div>

  <p className="mt-4 text-sm leading-7 text-gray-600">
    At Thuliragam, we share knowledge about microgreens,
    nutrition, healthy food habits, growing techniques and
    natural wellness to help everyone grow healthier.
  </p>
</div>
        {/* SOCIAL SHARING */}
        <ShareButtons title={article.title} />

        {/* PREVIOUS AND NEXT ARTICLES */}
        <section className="my-12 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            {olderArticle ? (
              <Link href={`/blog/${olderArticle.slug}`}>
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                  ← Older Article
                </p>
                <p className="mt-2 font-bold text-emerald-950">
                  {olderArticle.title}
                </p>
              </Link>
            ) : (
              <p className="text-sm text-gray-400">
                No older articles
              </p>
            )}
          </div>

          <div className="rounded-2xl bg-white p-5 text-right shadow-sm">
            {newerArticle ? (
              <Link href={`/blog/${newerArticle.slug}`}>
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                  Newer Article →
                </p>
                <p className="mt-2 font-bold text-emerald-950">
                  {newerArticle.title}
                </p>
              </Link>
            ) : (
              <p className="text-sm text-gray-400">
                No newer articles
              </p>
            )}
          </div>
        </section>

        {/* RELATED ARTICLES */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 border-t border-emerald-100 pt-12">
            <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">
              Explore More
            </p>

            <h2 className="mt-3 text-3xl font-bold text-emerald-950">
              Related Articles
            </h2>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((item: any) => (
                <Link
                  key={item.id}
                  href={`/blog/${item.slug}`}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  {item.cover_image && (
                    <img
                      src={item.cover_image}
                      alt={item.title}
                      className="h-40 w-full object-cover"
                    />
                  )}

                  <div className="p-5">
                    <p className="text-xs font-semibold text-emerald-700">
                      {item.category}
                    </p>

                    <h3 className="mt-2 font-bold text-emerald-950">
                      {item.title}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                      {item.excerpt || "Explore more from Thuliragam."}
                    </p>

                    <p className="mt-4 text-sm font-semibold text-emerald-800">
                      Read Article →
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-block rounded-full bg-emerald-800 px-8 py-3 font-semibold text-white hover:bg-emerald-700"
          >
            Explore All Blogs
          </Link>
        </div>
      </article>

      <style>{`
        .blog-content {
          font-size: 17px;
          line-height: 1.9;
          overflow-wrap: anywhere;
        }

        .blog-content h2 {
          font-size: 28px;
          font-weight: 700;
          color: #064e3b;
          margin: 32px 0 14px;
        }

        .blog-content h3 {
          font-size: 22px;
          font-weight: 700;
          color: #065f46;
          margin: 26px 0 12px;
        }

        .blog-content p {
          margin: 18px 0;
        }

        .blog-content ul,
        .blog-content ol {
          padding-left: 28px;
          margin: 18px 0;
        }

        .blog-content ul {
          list-style: disc;
        }

        .blog-content ol {
          list-style: decimal;
        }

        .blog-content img,
        .blog-content video {
          max-width: 100%;
          height: auto;
          border-radius: 14px;
          margin: 24px auto;
        }

        .blog-content iframe {
          width: 100%;
          aspect-ratio: 16 / 9;
          border: 0;
          border-radius: 14px;
          margin: 24px 0;
        }
      `}</style>
      <BackToTop />
    </main>
  );
}
