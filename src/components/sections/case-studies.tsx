"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { caseStudies } from "@/data";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

function RevealOnScroll({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function CaseStudies() {
  // Show only first 4 case studies on homepage
  const displayedCases = caseStudies.slice(0, 4);

  return (
    <section id="projects" className="relative overflow-hidden">
      {/* Background Subtle Gradient Overlay */}
      <div className="absolute inset-0  pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">

        {/* Header Section */}
        <RevealOnScroll className="w-full mb-16 sm:mb-24 text-center">
          <h2 className="text-3xl sm:text-5xl lg:text-5xl font-black text-brand-orange-800 tracking-tight leading-none mb-6">
            Case Studies
          </h2>

          <p className="text-base sm:text-lg lg:text-xl font-medium text-brand-orange-900/80 leading-relaxed">
            Some Live projects in AI SEO, Google Ads and Meta Ads, Social Media Marketing and Email Marketing.
          </p>
        </RevealOnScroll>

        {/* Projects Grid with Staggered Offset on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-20 md:gap-y-0 pb-20 md:pb-10">
          {displayedCases.map((project, index) => {
            const isStaggered = index % 2 === 1;

            return (
              <div
                key={project.id}
                className={`w-full ${isStaggered ? "md:translate-y-28 lg:translate-y-36 md:mb-[-140px]" : "md:mb-12"
                  }`}
              >
                <RevealOnScroll delay={0.1}>
                  <div className="group block">
                    {/* Image Container - Aspect 16:9 with Custom Shadow & Border */}
                    <div className="relative aspect-[1.91/1] rounded-3xl border border-brand-orange-100 shadow-md group-hover:shadow-lg transition-all duration-300 overflow-hidden mb-6 w-full ">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        priority={index < 2}
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />


                      {/* Dark overlay on hover */}
                      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </div>

                    {/* Content Details */}
                    <div className="px-2">
                      {/* Category Label */}
                      <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-brand-orange-600 block mb-2.5">
                        {project.category}
                      </span>

                      <div className="flex items-center gap-10 sm:gap-16 pt-5">
                        {project.stats.map((stat, statIdx) => (
                          <div key={statIdx} className="flex flex-col">
                            <span className="text-2xl sm:text-3xl font-black text-brand-orange-600 mb-1 group-hover:translate-x-0.5 transition-transform duration-300">
                              <AnimatedCounter value={stat.value} />
                            </span>
                            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-orange-900/60">
                              {stat.label}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Project Title */}
                      <h3 className="text-2xl sm:text-3xl font-black text-brand-orange-900 mb-3 group-hover:text-brand-orange-600 transition-colors duration-300 tracking-tight leading-snug">
                        {project.title}
                      </h3>

                      {/* Project Description */}
                      <p className="text-sm sm:text-base font-medium text-brand-orange-900/80 leading-relaxed mb-6">
                        {project.description}
                      </p>

                    </div>
                  </div>
                </RevealOnScroll>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
