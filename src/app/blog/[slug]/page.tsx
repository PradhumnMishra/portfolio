import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User, Share2 } from "lucide-react";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { Navigation } from "@/components/ui/Navigation";
import { ContactFooter } from "@/components/sections/ContactFooter";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | Pradhumn Mishra",
    };
  }

  return {
    title: post.metaTitle || `${post.title} | Pradhumn Mishra`,
    description: post.metaDescription || `Read "${post.title}" by Pradhumn Mishra.`,
    openGraph: {
      title: post.metaTitle || `${post.title} | Pradhumn Mishra`,
      description: post.metaDescription || `Read "${post.title}" by Pradhumn Mishra.`,
      type: "article",
      publishedTime: post.publishDate,
      authors: ["Pradhumn Mishra"],
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://pradhumnmishra.online"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://pradhumnmishra.online/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://pradhumnmishra.online/blog/${post.slug}`
      }
    ]
  };

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.metaDescription || `Read "${post.title}" by Pradhumn Mishra.`,
    "datePublished": post.publishDate,
    "dateModified": post.publishDate,
    "author": {
      "@type": "Person",
      "name": "Pradhumn Mishra",
      "url": "https://pradhumnmishra.online"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Pradhumn Mishra",
      "logo": {
        "@type": "ImageObject",
        "url": "https://pradhumnmishra.online/pm.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://pradhumnmishra.online/blog/${post.slug}`
    },
    "image": post.image || "https://pradhumnmishra.online/pm.png"
  };

  return (
    <main className="w-full min-h-screen overflow-x-hidden pt-28 bg-[#ffffff] relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      {/* Decorative gradients */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-brand-orange-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-brand-orange-100/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Navigation */}
      <Navigation />

      <div className="container mx-auto px-4 md:px-6 max-w-4xl py-12">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-bold text-brand-orange-800 hover:text-brand-orange-600 transition-colors group mb-8"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Blog</span>
        </Link>

        {/* Article Container */}
        <article className="space-y-8">
          {/* Header Metadata */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-xl bg-brand-orange-50 border border-brand-orange-100/50 text-[11px] font-extrabold text-brand-orange-700 uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-brand-orange-950 tracking-tight leading-tight">
              {post.title}
            </h1>

            {/* Author / Date info bar */}
            <div className="flex flex-wrap items-center gap-y-3 gap-x-6 pt-2 pb-6 border-b border-brand-orange-100 text-xs font-semibold text-brand-orange-900/60">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-full bg-brand-orange-500/10 flex items-center justify-center text-brand-orange-500 font-bold text-[10px]">
                  <img src="/pm.png" alt="Pradhumn Mishra" className="w-full h-full object-cover rounded-full" />

                </div>
                <span className="text-brand-orange-950 font-bold">Pradhumn Mishra</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-brand-orange-500" />
                <span>
                  {new Date(post.publishDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-brand-orange-500" />
                <span>{post.readingTime}</span>
              </div>
            </div>
          </div>

          {/* Banner Image */}
          {post.image && (
            <div className="relative aspect-[21/9] w-full rounded-3xl overflow-hidden border border-brand-orange-100 bg-brand-orange-50 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Blog body content */}
          <div
            className="blog-content py-4"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          {/* Author Bio Box */}
          <div className="mt-16 p-8 rounded-3xl bg-brand-orange-50/40 border border-brand-orange-100 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-16 h-16 rounded-full bg-brand-orange-500/10 flex-shrink-0 flex items-center justify-center text-brand-orange-500 font-black text-2xl font-serif italic border border-brand-orange-200">
              <img src="/pm.png" alt="Pradhumn Mishra" className="w-full h-full object-cover rounded-full" />
            </div>
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-[10px] uppercase font-black text-brand-orange-850 tracking-wider">About the Author</span>
              <h4 className="text-lg font-bold text-brand-orange-950">Pradhumn Mishra</h4>
              <p className="text-sm text-brand-orange-950/70 leading-relaxed">
                Pradhumn is an experienced AI Digital Marketer & Trainer with over 4 years of expertise. He scales brand visibility using modern AI SEO, GEO strategies, and optimizes multi-channel campaigns on Google and Meta Ads.
              </p>
            </div>
          </div>
        </article>
      </div>

      {/* Footer */}
      <ContactFooter />
    </main>
  );
}
