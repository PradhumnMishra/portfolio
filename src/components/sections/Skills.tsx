"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { tools, certifications } from "@/data";
import Image from "next/image";
import { Award, ZoomIn } from "lucide-react";

export function Skills() {
  const [selectedCert, setSelectedCert] = useState<typeof certifications[number] | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCert(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="skills" className="md:py-10">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        {/* Skills Tag Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-5xl font-black text-brand-orange-800 tracking-tighter mb-8">
            My Skills
          </h2>
          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 max-w-4xl mx-auto">
            {[
              "AI SEO Optimization",
              "GEO",
              "AEO",
              "Campaign Planning & Optimization",
              "Lead Generation",
              "SEO Content Writing",
              "Email Marketing",
              "WhatsApp Marketing",
              "Social Media Marketing",
              "Funnel Building",
              "Communication & Collaboration",
              "Creative Problem Solving",
            ].map((skill, index) => (
              <span
                key={index}
                className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 border border-brand-orange-100 rounded-xl sm:rounded-2xl text-xs sm:text-sm md:text-base font-semibold text-brand-orange-900 bg-white/70 backdrop-blur-sm shadow-sm hover:scale-105 transition-all duration-300 hover:border-brand-orange-400/40 hover:text-brand-orange-600 whitespace-nowrap"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-16 md:gap-24">
          {/* Tools Grid */}
          <div>
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-5xl font-black text-brand-orange-800 tracking-tight">
                Tools
              </h2>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
              {tools.map((tool, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.04 }}
                  className="flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm p-4 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-brand-orange-100/50 hover:border-brand-orange-300/40 hover:shadow-md transition-all duration-300 h-28"
                >
                  {typeof tool.icon === "string" ? (
                    <div className="relative w-8 h-8 mb-3 flex items-center justify-center shrink-0">
                      <Image
                        src={tool.icon}
                        alt={tool.name}
                        width={32}
                        height={32}
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <tool.icon size={32} style={{ color: tool.color }} className="mb-3 shrink-0" />
                  )}
                  <span className="text-[10px] sm:text-xs font-bold text-brand-orange-900 text-center leading-snug line-clamp-2 px-1">
                    {tool.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="pt-2">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-5xl font-black text-brand-orange-800 tracking-tight">
                Certifications
              </h2>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {certifications.map((cert, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white/70 backdrop-blur-sm rounded-3xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.02)] border border-brand-orange-100 flex flex-col hover:shadow-[0_8px_30px_rgba(242,92,5,0.06)] hover:border-brand-orange-500/25 transition-all duration-300 group"
                >
                  {/* Certificate Image Frame */}
                  {cert.image && (
                    <div 
                      onClick={() => setSelectedCert(cert)}
                      className="relative aspect-[16/10] w-full overflow-hidden bg-brand-orange-50 border-b border-gray-100 cursor-zoom-in group/cert-img"
                    >
                      
                      {/* Main fitted image */}
                      <Image
                        src={cert.image}
                        alt={cert.name}
                        fill
                        className="object-contain p-2 transition-transform duration-700 ease-out group-hover/cert-img:scale-[1.02]"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      {/* Hover Overlay with Zoom Icon */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-white/90 text-gray-900 p-3 rounded-full shadow-lg backdrop-blur-sm transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          <ZoomIn size={20} className="text-brand-orange-500" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Card Content */}
                  <div className="p-6 sm:p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-brand-orange-500/10 text-brand-orange-500 p-2 rounded-lg shrink-0">
                        <Award size={20} className="text-brand-orange-800" />
                      </div>
                      <span className="text-[11px] sm:text-xs text-brand-orange-800 uppercase font-bold tracking-widest leading-none">
                        {cert.provider} &bull; {cert.year}
                      </span>
                    </div>

                    <h4 className="text-lg sm:text-xl font-bold text-brand-orange-900 mb-2.5 leading-snug group-hover:text-brand-orange-600 transition-colors duration-300">
                      {cert.name}
                    </h4>
                    
                    <p className="text-gray-500 text-sm leading-relaxed font-medium flex-grow">
                      {cert.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Zoom Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-3xl w-full border border-brand-orange-100 flex flex-col relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center transition-colors cursor-pointer text-2xl font-bold font-sans"
                aria-label="Close modal"
              >
                &times;
              </button>

              <div className="relative aspect-[16/10] w-full bg-brand-orange-50">
                <Image
                  src={selectedCert.image}
                  alt={selectedCert.name}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  priority
                />
              </div>
              <div className="p-6 bg-white border-t border-brand-orange-100">
                <span className="text-xs text-brand-orange-500 font-bold uppercase tracking-wider">
                  {selectedCert.provider} &bull; {selectedCert.year}
                </span>
                <h4 className="text-xl font-bold text-brand-orange-950 mt-1">
                  {selectedCert.name}
                </h4>
                <p className="text-gray-500 text-sm mt-2 leading-relaxed font-medium">
                  {selectedCert.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
