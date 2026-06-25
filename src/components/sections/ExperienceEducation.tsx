"use client";

import { motion } from "framer-motion";
import { experience, education } from "@/data";
import { Briefcase, GraduationCap } from "lucide-react";

export function ExperienceEducation() {
  return (
    <section id="experience" className="py-10 bg-transparent">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          
          {/* Experience Timeline */}
          <div>
            <h2 className="text-3xl sm:text-5xl font-black text-brand-orange-800 tracking-tighter mb-10">
              Working Experience.
            </h2>
            <div className="relative border-l-1 border-brand-orange-100 ml-4">
              {experience.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="mb-10 ml-8 relative"
                >
                  <span className="absolute -left-[53px] top-1 flex items-center justify-center w-10 h-10 bg-brand-orange-50 rounded-full z-10 shadow-sm">
                    <Briefcase size={20} className="text-brand-orange-900" />
                  </span>
                  <div className="flex flex-col mb-2">
                    <span className="text-xs font-bold text-brand-orange-950/50 uppercase tracking-wider mb-1">{item.year}</span>
                    <h3 className="text-xl font-bold text-brand-orange-900 leading-tight">{item.title}</h3>
                    <h4 className="text-brand-orange-600 font-bold text-sm mt-0.5">{item.company}</h4>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed font-medium">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-3xl sm:text-5xl font-black text-brand-orange-800 tracking-tighter mb-10">
              Education.
            </h2>
            <div className="space-y-6">
              {education.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-brand-orange-100 flex items-start hover:shadow-md transition-shadow"
                >
                  <div className="bg-brand-orange-50 p-3 rounded-xl mr-4 shrink-0 text-brand-orange-900">
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-brand-orange-900 mb-1 leading-snug">{item.university}</h3>
                    <h4 className="text-gray-600 font-semibold text-sm mb-2">{item.degree}</h4>
                    <span className="text-xs font-bold text-brand-orange-800 inline-block mb-3 px-3 py-1 bg-brand-orange-50/85 rounded-full">
                      {item.year}
                    </span>
                    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed font-medium">
                      {item.details}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
