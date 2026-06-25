"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { aboutContent } from "@/data/index";
import { useState, useEffect } from "react";
import { 
  Sparkles, 
  Briefcase, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  GraduationCap, 
  Zap, 
  Award, 
  Globe 
} from "lucide-react";

const LOGOS = [
  { src: "/appwars.svg", alt: "Appwars" },
  { src: "/giftalove.svg", alt: "Giftalove" },
  { src: "/hikemytraffic.svg", alt: "HikeMyTraffic" },
  { src: "/makaz.svg", alt: "Makaz" },
  { src: "/digipims.svg", alt: "Digipims" },
  { src: "/idealsmtp.svg", alt: "idealsmtp" },
  { src: "/isearchsolutions.svg", alt: "isearchsolutions" },
  { src: "/rakhi.in.svg", alt: "Rakhi.in" },
  { src: "/rakhibazaar.svg", alt: "rakhibazaar" },
  { src: "/tpm.svg", alt: "tpm" },
];

// Parser helper for about content
function parseAboutContent(rawContent: string) {
  if (!rawContent) return {
    introParagraphs: [],
    currentRoleParagraphs: [],
    recentProjectsParagraphs: [],
    keyResults: [],
    skills: [],
    closingParagraphs: [],
    ctaText: ""
  };

  const lines = rawContent.split("\n").map(l => l.trim()).filter(Boolean);
  
  let introParagraphs: string[] = [];
  let currentRoleParagraphs: string[] = [];
  let recentProjectsParagraphs: string[] = [];
  let keyResults: string[] = [];
  let skills: string[] = [];
  let closingParagraphs: string[] = [];
  let ctaText = "";

  lines.forEach(line => {
    if (line.startsWith("Key results:")) {
      const resultsText = line.replace("Key results:", "").trim();
      keyResults = resultsText
        .split("→")
        .map(r => r.trim())
        .filter(Boolean);
    } else if (line.startsWith("Skills:")) {
      const skillsText = line.replace("Skills:", "").trim();
      skills = skillsText
        .split("·")
        .map(s => s.trim())
        .filter(Boolean);
    } else if (line.startsWith("What I'm doing now:") || line.includes("Digital Marketing Trainer") || line.includes("Alongside training")) {
      currentRoleParagraphs.push(line);
    } else if (line.startsWith("Recent projects:") || line.includes("At Makaz") || line.includes("At I Search")) {
      recentProjectsParagraphs.push(line);
    } else if (line.includes("If you're looking for someone")) {
      ctaText = line;
    } else if (line.includes("Digital marketing is changing fast")) {
      closingParagraphs.push(line);
    } else {
      introParagraphs.push(line);
    }
  });

  return {
    introParagraphs,
    currentRoleParagraphs,
    recentProjectsParagraphs,
    keyResults,
    skills,
    closingParagraphs,
    ctaText
  };
}

export function About() {
  const [activeTab, setActiveTab] = useState<"story" | "current" | "projects">("story");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const data = parseAboutContent(aboutContent.planContent);

  // Parse Key Results into { metric, description }
  const parsedResults = data.keyResults.map(item => {
    const words = item.split(" ");
    const metric = words[0];
    const description = words.slice(1).join(" ");
    return { metric, description };
  });

  const tabs = [
    { id: "story", label: "My Story", icon: Sparkles },
    { id: "current", label: "Current Focus", icon: Briefcase },
    { id: "projects", label: "Track Record", icon: TrendingUp },
  ] as const;

  return (
    <section id="about" className="py-16 md:py-24 overflow-hidden bg-gradient-to-b from-transparent via-brand-orange-50/10 to-transparent">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">

        {/* Brands Slider */}
        <div className="w-full mx-auto mb-16 md:mb-24">
          <div className="max-w-3xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-4xl font-black text-brand-orange-800 text-center">
              Brands I&apos;ve Worked With
            </h2>
          </div>

          <div className="relative overflow-hidden w-full [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
            <motion.div
              className="flex items-center gap-12 md:gap-20 w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-12 md:gap-20 shrink-0"
                >
                  {LOGOS.map((logo, i) => (
                    <div
                      key={`${index}-${i}`}
                      className="relative h-8 md:h-10 lg:h-30 w-[120px] md:w-[150px] flex items-center justify-center"
                    >
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        fill
                        className="object-contain transition-all duration-300 filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* About Section Title */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-5xl font-black text-brand-orange-800 tracking-tight">
              About Me
            </h2>
            <div className="h-1.5 w-20 bg-brand-orange-500 mx-auto mt-4 rounded-full" />
          </motion.div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Visual Dashboard Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 w-full lg:sticky lg:top-24"
          >
            <div className="bg-white/70 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-brand-orange-100 shadow-[0_10px_30px_-10px_rgba(242,92,5,0.05)] hover:shadow-xl hover:border-brand-orange-200/50 transition-all duration-500 group">
              
              {/* Radar Graphic */}
              <div className="relative w-full aspect-square max-w-[280px] mx-auto mb-8 flex items-center justify-center">
                {/* Outer Ring */}
                <div className="absolute inset-0 border border-dashed border-brand-orange-200 rounded-full animate-[spin_40s_linear_infinite] group-hover:animate-[spin_20s_linear_infinite]" />
                
                {/* Middle Ring */}
                <div className="absolute inset-4 border border-dotted border-brand-orange-300 rounded-full animate-[spin_30s_linear_infinite_reverse] group-hover:animate-[spin_15s_linear_infinite_reverse]" />
                
                {/* Inner Ring */}
                <div className="absolute inset-10 border border-brand-orange-100 bg-brand-orange-50/20 rounded-full flex items-center justify-center shadow-inner" />

                {/* Central Glow & Icon */}
                <div className="absolute w-20 h-20 bg-brand-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-brand-orange-500/30 group-hover:scale-105 transition-transform duration-300">
                  <Zap className="w-10 h-10 text-white animate-pulse" />
                </div>

                {/* Floating Skill Badges */}
                <div className="absolute top-[8%] left-[8%] bg-white border border-brand-orange-100/80 px-3 py-1 rounded-full shadow-md text-xs font-bold text-brand-orange-950 flex items-center gap-1.5 animate-float-1">
                  <span className="w-1.5 h-1.5 bg-brand-orange-500 rounded-full animate-ping" />
                  SEO
                </div>

                <div className="absolute top-[12%] right-[4%] bg-white border border-brand-orange-100/80 px-3 py-1 rounded-full shadow-md text-xs font-bold text-brand-orange-950 flex items-center gap-1.5 animate-float-2">
                  <span className="w-1.5 h-1.5 bg-brand-orange-500 rounded-full" />
                  Ads
                </div>

                <div className="absolute bottom-[10%] left-[2%] bg-white border border-brand-orange-100/80 px-3 py-1 rounded-full shadow-md text-xs font-bold text-brand-orange-950 flex items-center gap-1.5 animate-float-3">
                  <span className="w-1.5 h-1.5 bg-brand-orange-500 rounded-full" />
                  GEO & AEO
                </div>

                <div className="absolute bottom-[8%] right-[8%] bg-white border border-brand-orange-100/80 px-3 py-1 rounded-full shadow-md text-xs font-bold text-brand-orange-950 flex items-center gap-1.5 animate-float-4">
                  <span className="w-1.5 h-1.5 bg-brand-orange-500 rounded-full animate-ping" />
                  Growth
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-extrabold text-brand-orange-950">
                  Growth Specialist
                </h3>
                <p className="text-sm font-semibold text-brand-orange-600 mt-1">
                  AI SEO & Performance Marketing
                </p>
              </div>

              {/* Highlights List */}
              <div className="space-y-3 sm:flex lg:flex-col pt-4 border-t border-brand-orange-100/60">
                <div className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-brand-orange-50/50 transition-colors duration-300">
                  <div className="bg-brand-orange-100 text-brand-orange-600 p-2 rounded-lg">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-brand-orange-950/60 uppercase tracking-wider">Experience</p>
                    <p className="text-sm font-extrabold text-brand-orange-950">4+ Years Professional</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-brand-orange-50/50 transition-colors duration-300">
                  <div className="bg-brand-orange-100 text-brand-orange-600 p-2 rounded-lg">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-brand-orange-950/60 uppercase tracking-wider">Education Role</p>
                    <p className="text-sm font-extrabold text-brand-orange-950">Active Marketing Trainer</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-brand-orange-50/50 transition-colors duration-300">
                  <div className="bg-brand-orange-100 text-brand-orange-600 p-2 rounded-lg">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-brand-orange-950/60 uppercase tracking-wider">Target Focus</p>
                    <p className="text-sm font-extrabold text-brand-orange-950">AI SEO, GEO & Ads Scaling</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Tabbed Narrative Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 w-full"
          >
            {/* Tabs Header */}
            <div className="flex p-1.5 bg-brand-orange-100/50 backdrop-blur-sm rounded-2xl border border-brand-orange-100/60 mb-6 relative z-10">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs sm:text-sm font-bold rounded-xl transition-all duration-300 relative ${
                      isActive ? "text-white" : "text-brand-orange-950/70 hover:text-brand-orange-900"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-about-tab"
                        className="absolute inset-0 bg-brand-orange-500 rounded-xl -z-10 shadow-md"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab content wrapper with custom styling */}
            <div className="bg-white/70 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-brand-orange-100 shadow-[0_10px_30px_-10px_rgba(242,92,5,0.02)] min-h-[420px] flex flex-col justify-between">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Active Tab Contents */}
                  {activeTab === "story" && (
                    <div className="space-y-4">
                      <h3 className="text-xl sm:text-2xl font-black text-brand-orange-900 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-brand-orange-500" />
                        Driving Business Growth
                      </h3>
                      {data.introParagraphs.map((para, i) => (
                        <p key={i} className="text-gray-600 text-sm sm:text-base leading-relaxed font-medium">
                          {para}
                        </p>
                      ))}
                      {data.closingParagraphs.map((para, i) => (
                        <p key={i} className="text-gray-600 text-sm sm:text-base leading-relaxed font-medium bg-brand-orange-50/40 p-4 rounded-2xl border border-brand-orange-100/50">
                          {para}
                        </p>
                      ))}
                    </div>
                  )}

                  {activeTab === "current" && (
                    <div className="space-y-4">
                      <h3 className="text-xl sm:text-2xl font-black text-brand-orange-900 flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-brand-orange-500" />
                        What I&apos;m Doing Now
                      </h3>
                      {data.currentRoleParagraphs.map((para, i) => (
                        <p key={i} className="text-gray-600 text-sm sm:text-base leading-relaxed font-medium">
                          {para}
                        </p>
                      ))}
                      
                      {/* Interactive seminar list/highlights */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-2">
                        <div className="border border-brand-orange-100 bg-white/50 p-4 rounded-2xl">
                          <p className="text-xs font-bold text-brand-orange-600 tracking-wide uppercase">Trainer Role</p>
                          <p className="text-base font-extrabold text-brand-orange-950 mt-1">100+ Students Trained</p>
                          <p className="text-xs font-medium text-gray-500 mt-1">Classroom & online practical masterclasses</p>
                        </div>
                        <div className="border border-brand-orange-100 bg-white/50 p-4 rounded-2xl">
                          <p className="text-xs font-bold text-brand-orange-600 tracking-wide uppercase">Seminars Conducted</p>
                          <p className="text-base font-extrabold text-brand-orange-950 mt-1">University Lectures</p>
                          <p className="text-xs font-medium text-gray-500 mt-1">IAMR, IMS Ghaziabad & GNOIT College</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "projects" && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-black text-brand-orange-900 flex items-center gap-2 mb-3">
                          <TrendingUp className="w-5 h-5 text-brand-orange-500" />
                          Track Record & Impact
                        </h3>
                        <div className="space-y-3">
                          {data.recentProjectsParagraphs.map((para, i) => (
                            <p key={i} className="text-gray-600 text-sm sm:text-base leading-relaxed font-medium">
                              {para}
                            </p>
                          ))}
                        </div>
                      </div>

                      {/* Key Results Stats Grid */}
                      <div>
                        <h4 className="text-xs font-black uppercase text-brand-orange-950/60 tracking-wider mb-4">Key Results & Achievements</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {parsedResults.map((result, i) => (
                            <div key={i} className="bg-brand-orange-50/30 border border-brand-orange-100 p-4 rounded-2xl flex items-start gap-3 hover:scale-[1.02] transition-transform duration-300">
                              <span className="bg-brand-orange-500/10 text-brand-orange-600 p-1.5 rounded-lg mt-0.5">
                                <CheckCircle2 className="w-4 h-4 shrink-0" />
                              </span>
                              <div>
                                <p className="text-lg font-black text-brand-orange-900 leading-tight">{result.metric}</p>
                                <p className="text-xs font-bold text-gray-600 mt-1 leading-snug">{result.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Call to Action Row */}
              {isClient && data.ctaText && (
                <div className="mt-8 pt-6 border-t border-brand-orange-100/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs sm:text-sm font-bold text-brand-orange-950/70 text-center sm:text-left max-w-md leading-relaxed">
                    {data.ctaText}
                  </p>
                  <a
                    href="#contact"
                    className="flex items-center gap-2 px-5 py-2.5 bg-brand-orange-500 text-white font-extrabold text-sm rounded-xl hover:bg-brand-orange-600 transition-all duration-300 shadow-md shadow-brand-orange-500/15 group shrink-0"
                  >
                    <span>Let&apos;s Connect</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              )}
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
