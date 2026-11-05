
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Leaf,
  BookOpen,
  Sprout,
} from "lucide-react";

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

  // Structured data
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

  // Reading time
  const wordCount = article.content
    .replace(/<[^>]*>/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  // Related articles and article navigation
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

  const newerArticle =
    currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  const olderArticle =
    currentIndex >= 0 && currentIndex < allPosts.length - 1
      ? allPosts[currentIndex + 1]
      : null;

  const relatedPosts = relatedData || [];

  const formattedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <main className="min-h-screen bg-[#FBFBF3]">

      {/* SEO STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c"),
        }}
      />

      <ReadingProgress />

      {/* ARTICLE HERO */}
      <section className="relative isolate overflow-hidden bg-[#063D20] px-5 pb-16 pt-10 text-white sm:px-8 sm:pb-20 sm:pt-14">

        {/* Background decorations */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(#B9E65A 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full border border-[#B9E65A]/15" />

        <div className="pointer-events-none absolute -bottom-36 -left-24 h-96 w-96 rounded-full border border-[#B9E65A]/10" />

        <div className="relative z-10 mx-auto max-w-5xl">

          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/65 transition hover:text-[#B9E65A]"
          >
            <ArrowLeft size={17} />
            Back to Journal
          </Link>

          {/* Article heading */}
          <header className="mx-auto mt-12 max-w-4xl text-center">

            <div className="inline-flex items-center gap-2 rounded-full border border-[#B9E65A]/30 bg-white/[0.06] px-5 py-2">
              <Leaf size={14} className="text-[#B9E65A]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B9E65A] sm:text-xs">
                {article.category}
              </span>
            </div>

            <h1 className="mt-7 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-6xl">
              {article.title}
            </h1>

            {article.excerpt && (
              <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
                {article.excerpt}
              </p>
            )}

            {/* Article metadata */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-medium text-white/60 sm:text-sm">

              {formattedDate && (
                <span className="flex items-center gap-2">
                  <CalendarDays size={16} className="text-[#B9E65A]" />
                  {formattedDate}
                </span>
              )}

              <span className="flex items-center gap-2">
                <Clock3 size={16} className="text-[#B9E65A]" />
                {readingTime} min read
              </span>

              <span className="flex items-center gap-2">
                <BookOpen size={16} className="text-[#B9E65A]" />
                Thuliragam Journal
              </span>

            </div>
          </header>
        </div>
      </section>

      {/* COVER IMAGE */}
      {article.cover_image && (
        <section className="relative z-20 mx-auto -mt-7 max-w-6xl px-5 sm:-mt-10 sm:px-8">
          <div className="overflow-hidden rounded-[24px] border-4 border-white bg-[#E8FFF1] shadow-[0_25px_65px_rgba(6,61,32,0.15)] sm:rounded-[32px]">
            <img
              src={article.cover_image}
              alt={article.cover_image_alt || article.title}
              className="max-h-[600px] w-full object-cover"
            />
          </div>
        </section>
      )}

      {/* ARTICLE BODY */}
      <article className="mx-auto max-w-5xl px-5 pb-16 pt-12 sm:px-8 sm:pt-16">

        {/* TABLE OF CONTENTS */}
        <div className="mb-10">
          <TableOfContents />
        </div>

        {/* ARTICLE CONTENT */}
        <div
          className="blog-content mx-auto max-w-3xl text-[#294B37]"
          dangerouslySetInnerHTML={{
            __html: article.content || "",
          }}
        />

        {/* AUTHOR PROFILE */}
        <section className="mx-auto mt-16 max-w-3xl overflow-hidden rounded-[26px] border border-[#075B25]/10 bg-white shadow-[0_12px_35px_rgba(6,61,32,0.06)]">

          <div className="h-1.5 bg-gradient-to-r from-[#063D20] via-[#00A844] to-[#B9E65A]" />

          <div className="p-6 sm:p-8">

            <div className="flex items-center gap-4">

              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#063D20] text-[#B9E65A]">
                <Sprout size={32} />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#00A844]">
                  Written by
                </p>

                <h3 className="mt-1 text-xl font-bold text-[#063D20]">
                  Thuliragam Team
                </h3>

                <p className="mt-1 text-sm text-[#355B45]/65">
                  Grow Healthier Tomorrow
                </p>
              </div>

            </div>

            <p className="mt-5 text-sm leading-7 text-[#355B45]">
              At Thuliragam, we share knowledge about microgreens,
              nutrition, healthy food habits, growing techniques and
              natural wellness to help everyone grow healthier.
            </p>

          </div>
        </section>

        {/* SOCIAL SHARING */}
        <section className="mx-auto mt-10 max-w-3xl rounded-[22px] border border-[#075B25]/10 bg-[#E8FFF1] p-6">
          <p className="mb-4 text-sm font-bold text-[#063D20]">
            Enjoyed this article? Share it with others.
          </p>

          <ShareButtons title={article.title} />
        </section>

        {/* PREVIOUS AND NEXT ARTICLES */}
        <section className="mx-auto my-14 grid max-w-3xl gap-4 sm:grid-cols-2">

          <div className="group rounded-[22px] border border-[#075B25]/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

            {olderArticle ? (
              <Link href={`/blog/${olderArticle.slug}`}>

                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00A844]">
                  <ArrowLeft size={15} />
                  Older Article
                </p>

                <p className="mt-3 font-bold leading-6 text-[#063D20] transition group-hover:text-[#00A844]">
                  {olderArticle.title}
                </p>

              </Link>
            ) : (
              <p className="text-sm text-[#355B45]/50">
                No older articles
              </p>
            )}

          </div>

          <div className="group rounded-[22px] border border-[#075B25]/10 bg-white p-6 text-right transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

            {newerArticle ? (
              <Link href={`/blog/${newerArticle.slug}`}>

                <p className="flex items-center justify-end gap-2 text-xs font-bold uppercase tracking-wider text-[#00A844]">
                  Newer Article
                  <ArrowRight size={15} />
                </p>

                <p className="mt-3 font-bold leading-6 text-[#063D20] transition group-hover:text-[#00A844]">
                  {newerArticle.title}
                </p>

              </Link>
            ) : (
              <p className="text-sm text-[#355B45]/50">
                No newer articles
              </p>
            )}

          </div>
        </section>

        {/* RELATED ARTICLES */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 border-t border-[#075B25]/15 pt-14">

            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#00A844]">
                Continue Exploring
              </p>

              <h2 className="mt-3 text-3xl font-extrabold text-[#063D20] sm:text-4xl">
                Related Articles
              </h2>

              <p className="mt-3 text-sm text-[#355B45]">
                Discover more ideas from the Thuliragam Journal.
              </p>
            </div>

            <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {relatedPosts.map((item: any) => (
                <Link
                  key={item.id}
                  href={`/blog/${item.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-[#075B25]/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                >

                  {item.cover_image ? (
                    <div className="aspect-[16/10] overflow-hidden bg-[#E8FFF1]">
                      <img
                        src={item.cover_image}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="flex aspect-[16/10] items-center justify-center bg-[#063D20]">
                      <Leaf
                        size={40}
                        className="text-[#B9E65A]"
                      />
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-6">

                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#00A844]">
                      {item.category}
                    </p>

                    <h3 className="mt-3 font-bold leading-6 text-[#063D20] transition-colors group-hover:text-[#00A844]">
                      {item.title}
                    </h3>

                    <p className="mt-3 line-clamp-2 flex-1 text-sm leading-6 text-[#355B45]">
                      {item.excerpt || "Explore more from Thuliragam."}
                    </p>

                    <p className="mt-5 flex items-center gap-2 text-sm font-bold text-[#075B25]">
                      Read Article
                      <ArrowUpRight
                        size={16}
                        className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                      />
                    </p>

                  </div>
                </Link>
              ))}

            </div>
          </section>
        )}

        {/* ALL BLOGS BUTTON */}
        <div className="mt-16 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full bg-[#063D20] px-8 py-4 text-sm font-bold text-[#B9E65A] shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#075B25] hover:shadow-lg"
          >
            <ArrowLeft size={17} />
            Explore All Articles
          </Link>
        </div>

      </article>

      {/* ARTICLE TYPOGRAPHY */}
      <style>{`
        .blog-content {
          font-size: 17px;
          line-height: 1.95;
          overflow-wrap: anywhere;
        }

        .blog-content h1 {
          font-size: 34px;
          font-weight: 800;
          color: #063D20;
          line-height: 1.25;
          margin: 42px 0 20px;
        }

        .blog-content h2 {
          font-size: 28px;
          font-weight: 800;
          color: #063D20;
          line-height: 1.3;
          margin: 42px 0 18px;
        }

        .blog-content h3 {
          font-size: 22px;
          font-weight: 700;
          color: #075B25;
          line-height: 1.4;
          margin: 32px 0 14px;
        }

        .blog-content h4 {
          font-size: 19px;
          font-weight: 700;
          color: #075B25;
          margin: 26px 0 12px;
        }

        .blog-content p {
          margin: 20px 0;
        }

        .blog-content a {
          color: #008F3D;
          font-weight: 600;
          text-decoration: underline;
          text-underline-offset: 4px;
        }

        .blog-content a:hover {
          color: #063D20;
        }

        .blog-content strong,
        .blog-content b {
          color: #063D20;
          font-weight: 700;
        }

        .blog-content ul,
        .blog-content ol {
          padding-left: 28px;
          margin: 22px 0;
        }

        .blog-content ul {
          list-style: disc;
        }

        .blog-content ol {
          list-style: decimal;
        }

        .blog-content li {
          padding-left: 5px;
          margin: 9px 0;
        }

        .blog-content blockquote {
          margin: 30px 0;
          padding: 22px 26px;
          border-left: 4px solid #B9E65A;
          border-radius: 0 16px 16px 0;
          background: #E8FFF1;
          color: #063D20;
          font-size: 18px;
          font-weight: 500;
        }

        .blog-content img,
        .blog-content video {
          max-width: 100%;
          height: auto;
          border-radius: 18px;
          margin: 30px auto;
        }

        .blog-content iframe {
          width: 100%;
          aspect-ratio: 16 / 9;
          border: 0;
          border-radius: 18px;
          margin: 30px 0;
        }

        .blog-content table {
          display: block;
          width: 100%;
          overflow-x: auto;
          border-collapse: collapse;
          margin: 28px 0;
        }

        .blog-content th,
        .blog-content td {
          border: 1px solid #dce9dc;
          padding: 12px 15px;
          text-align: left;
        }

        .blog-content th {
          background: #063D20;
          color: white;
        }

        @media (max-width: 640px) {
          .blog-content {
            font-size: 16px;
            line-height: 1.85;
          }

          .blog-content h1 {
            font-size: 28px;
          }

          .blog-content h2 {
            font-size: 24px;
          }

          .blog-content h3 {
            font-size: 20px;
          }
        }
      `}</style>

      <BackToTop />
    </main>
  );
}
