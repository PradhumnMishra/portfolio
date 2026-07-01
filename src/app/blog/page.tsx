import type { Metadata } from "next";
import { Navigation } from "@/components/ui/Navigation";
import { ContactFooter } from "@/components/sections/ContactFooter";
import { BlogList } from "@/components/blog/BlogList";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog & Insights | Pradhumn Mishra - AI Digital Marketer & Trainer",
  description: "Stay ahead in digital marketing with expert insights on AI SEO, GEO, Paid Ads (Google/Meta), and Search Experience Optimization.",
  keywords: ["Digital Marketing Blog", "AI SEO Blog", "GEO Optimization Tips", "Google Ads Insights", "Growth Marketing Articles", "Pradhumn Mishra Insights"],
  openGraph: {
    title: "Blog & Insights | Pradhumn Mishra - AI Digital Marketer & Trainer",
    description: "Stay ahead in digital marketing with expert insights on AI SEO, GEO, Paid Ads (Google/Meta), and Search Experience Optimization.",
    type: "website",
  },
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

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
      }
    ]
  };

  return (
    <main className="w-full min-h-screen overflow-x-hidden pt-28 bg-[#ffffff] relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Dynamic Background Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange-100/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-brand-orange-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Navigation */}
      <Navigation />

      {/* Main Container */}
      <div className="container mx-auto px-4 md:px-6 max-w-6xl py-12">
        {/* Header Block */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange-100 text-brand-orange-800 text-[11px] font-extrabold tracking-wider uppercase animate-pulse">
            <span>Marketing Insights</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-brand-orange-950 tracking-tight leading-none">
            Digital Marketing <br />
            <span className="italic font-serif text-brand-orange-500 font-normal">Blogs</span>
          </h1>
          <p className="text-lg text-brand-orange-950/70 font-medium leading-relaxed max-w-2xl pt-2">
            Stay ahead in digital marketing with expert insights on AI SEO, GEO, Paid Ads (Google/Meta), and Search Experience Optimization.
          </p>
        </div>

        {/* Dynamic List Component */}
        <BlogList posts={posts} />
      </div>

      {/* Footer */}
      <ContactFooter />
    </main>
  );
}
