"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { BlogPost } from "@/lib/blog";

interface BlogListProps {
  posts: BlogPost[];
}

export function BlogList({ posts }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    posts.forEach((post) => {
      post.tags.forEach((tag) => tagsSet.add(tag));
    });
    return Array.from(tagsSet);
  }, [posts]);

  // Filter posts based on search query and selected tag
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.rawMarkdown.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTag = !selectedTag || post.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [posts, searchQuery, selectedTag]);

  return (
    <div className="space-y-12">
      {/* Search and Filters Bar */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-brand-orange-100/60 shadow-sm">
        {/* Search Input */}
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-orange-800/50 w-5 h-5" />
          <input
            type="text"
            placeholder="Search articles by title, tags or content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-brand-orange-100 hover:border-brand-orange-300 focus:border-brand-orange-500 focus:ring-2 focus:ring-brand-orange-200 rounded-2xl outline-none transition-all text-sm text-brand-orange-950 placeholder-brand-orange-900/40"
          />
        </div>

        {/* Tag Filters */}
        <div className="flex flex-wrap gap-2 justify-center md:justify-end w-full md:w-auto">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${selectedTag === null
                ? "bg-brand-orange-500 text-white shadow-md shadow-brand-orange-500/20 scale-105"
                : "bg-brand-orange-50 text-brand-orange-800 hover:bg-brand-orange-100"
              }`}
          >
            All Posts
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${tag === selectedTag
                  ? "bg-brand-orange-500 text-white shadow-md shadow-brand-orange-500/20 scale-105"
                  : "bg-brand-orange-50 text-brand-orange-800 hover:bg-brand-orange-100"
                }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of posts */}
      {filteredPosts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 bg-white/40 border border-dashed border-brand-orange-200 rounded-3xl"
        >
          <p className="text-brand-orange-950/60 font-semibold text-lg">No articles found matching your criteria.</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedTag(null);
            }}
            className="mt-4 text-sm font-bold text-brand-orange-500 hover:text-brand-orange-600 underline"
          >
            Reset filters
          </button>
        </motion.div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, idx) => (
              <motion.article
                key={post.slug}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group flex flex-col bg-white rounded-3xl border border-brand-orange-100 hover:border-brand-orange-300/60 hover:shadow-[0_20px_50px_rgba(242,92,5,0.06)] overflow-hidden transition-all duration-300 h-full"
              >
                {/* Image Cover */}
                <Link href={`/blog/${post.slug}`} className="relative block aspect-[21/9] overflow-hidden bg-brand-orange-50">
                  {post.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-tr from-brand-orange-100 to-brand-orange-50 flex items-center justify-center text-brand-orange-300 font-black font-serif text-3xl italic">
                      PM
                    </div>
                  )}
                  {/* Floating Date */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-brand-orange-100 flex items-center gap-1.5 text-[11px] font-bold text-brand-orange-950">
                    <Calendar className="w-3.5 h-3.5 text-brand-orange-500" />
                    <span>
                      {new Date(post.publishDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </Link>

                {/* Content Area */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div className="space-y-4">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-lg bg-brand-orange-50 text-[10px] font-bold text-brand-orange-700 tracking-wide"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-extrabold text-brand-orange-950 group-hover:text-brand-orange-500 transition-colors line-clamp-2 tracking-tight">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>

                    {/* Snippet / Description */}
                    <p className="text-sm text-brand-orange-950/70 line-clamp-3 leading-relaxed">
                      {post.metaDescription || "Read more about this article focusing on modern digital marketing and search optimization strategies."}
                    </p>
                  </div>

                  {/* Footer Meta */}
                  <div className="flex items-center justify-between pt-6 mt-6 border-t border-brand-orange-50 text-[11px] font-semibold text-brand-orange-900/60">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readingTime}</span>
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="flex items-center gap-1 text-brand-orange-500 hover:text-brand-orange-600 font-bold group/link transition-colors"
                    >
                      <span>Read Post</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
