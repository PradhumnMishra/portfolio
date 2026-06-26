"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Search, GraduationCap, TrendingUp, Share2 } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";



const GREETINGS = ["Hello", "नमस्ते"];

const floatingBadges = [
  {
    text: "SEO",
    icon: Search,
    className: "top-[10%] left-[2%] xs:left-[6%] sm:left-[8%] md:left-[0%] lg:left-[-5%]",
    delay: 0.6,
  },
  {
    text: "Training",
    icon: GraduationCap,
    className: "bottom-[24%] left-[2%] xs:left-[4%] sm:left-[6%] md:left-[-12%] lg:left-[-18%]",
    delay: 0.8,
  },
  {
    text: "Google & Meta Ads",
    icon: TrendingUp,
    className: "top-[18%] right-[2%] xs:right-[6%] sm:right-[8%] md:right-[0%] lg:right-[-5%]",
    delay: 0.7,
  },
  {
    text: "Social Media Marketing",
    shortText: "SMM",
    icon: Share2,
    className: "bottom-[18%] right-[2%] xs:right-[4%] sm:right-[6%] md:right-[-10%] lg:right-[-15%]",
    delay: 0.9,
  },
];

const stats = [
  { value: "4", label: "Years Professional Experience" },
  { value: "10M", label: "Ad Revenue Driven" },
  { value: "100", label: "Qualified Leads Daily" },
  { value: "10", label: "Brands Scaled" },
  { value: "100", label: "Students Trained" },
  { value: "5", label: "Client Recommendation" },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

function FloatingBadge({
  text,
  shortText,
  icon: Icon,
  className,
  delay,
}: {
  text: string;
  shortText?: string;
  icon: React.ComponentType<{ className?: string }>;
  className: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 0 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -8, 0], // Smooth continuous hover float
      }}
      transition={{
        opacity: { delay, duration: 0.5 },
        scale: { delay, type: "spring" },
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay * 0.5,
        },
      }}
      className={`absolute ${className} flex bg-white/70 backdrop-blur-md text-gray-900 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-2xl sm:rounded-full font-bold shadow-xl border border-white/30 items-center gap-1.5 sm:gap-2 z-20 text-[9px] xs:text-[10px] sm:text-xs md:text-sm lg:text-base whitespace-nowrap hover:scale-105 transition-transform`}
    >
      <div className="flex items-center justify-center w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full bg-brand-orange-500/10 text-brand-orange-500 shrink-0">
        <Icon className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
      </div>
      <span>
        {shortText ? (
          <>
            <span className="hidden sm:inline">{text}</span>
            <span className="inline sm:hidden">{shortText}</span>
          </>
        ) : (
          text
        )}
      </span>
    </motion.div>
  );
}
function StatCard({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-brand-orange-600 tracking-tight leading-none">
        <AnimatedCounter value={value} />
      </span>

      <span className="text-[9px] sm:text-[10px] md:text-[11px] font-semibold text-brand-orange-900 mt-2 tracking-wide max-w-[200px] leading-snug text-center">
        {label}
      </span>
    </div>
  );
}

export function Hero() {
  const [greetingIndex, setGreetingIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % GREETINGS.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden pt-20 md:pt-28 flex flex-col items-center justify-between">

      <div className="container relative z-10 flex flex-col items-center flex-grow px-4 mx-auto text-center md:px-6">

        {/* Greeting */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.8 }}
          className="relative inline-flex items-center justify-center mb-4"
        >
          <div className="relative flex items-center justify-center h-9 min-w-[100px] rounded-full border border-brand-orange-200/50 px-6 text-sm font-medium backdrop-blur-sm md:text-base shadow-sm">
            <AnimatePresence mode="wait">
              <motion.span
                key={greetingIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute text-brand-orange-600 font-bold"
              >
                {GREETINGS[greetingIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-6 md:mb-8"
        >
          <h1 className="leading-tight tracking-tight">
            <span className="text-4xl sm:text-4xl md:text-6xl lg:text-7xl font-medium text-brand-orange-800">
              I&apos;m
            </span>{" "}
            <span className="text-4xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-brand-orange-400">
              Pradhumn Mishra
            </span>

            <br className="hidden sm:block" />

            <span className="text-3xl sm:text-3xl font-medium md:text-6xl lg:text-7xl block sm:inline mt-1 sm:mt-0 text-brand-orange-800">
              AI Digital Marketer & Trainer
            </span>
          </h1>
        </motion.div>

        {/* Sub-header and CTAs */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 max-w-2xl mx-auto"
        >

        </motion.div>

        {/* Main Section */}
        <div className="relative flex items-end justify-center w-full max-w-6xl min-h-[340px] sm:min-h-[450px] lg:min-h-[600px] flex-grow">

          {/* Left Testimonial */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute left-4 top-1/4 hidden lg:block w-[280px] text-left z-20"
          >
            <span className="text-6xl text-brand-orange-300 font-serif leading-none block">
              “
            </span>

            <p className="text-brand-orange-950 mt-2 font-semibold leading-relaxed text-sm">
              It was a pleasure to work with Pradhumn, and I can confidently say
              he is an exceptional marketer and brand strategist.
              <br />
              <span className="text-xs font-bold text-brand-orange-900 mt-2 block">Sumit Kumar, Founder of WebOrbitSolutions</span>
            </p>
          </motion.div>

          {/* Experience */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute right-4 bottom-2/4 hidden lg:flex w-[200px] flex-col items-center text-center z-20"
          >
            <h3 className="mb-2 text-5xl font-black tracking-tight text-brand-orange-900">
              <AnimatedCounter value="4" /> Years
            </h3>

            <p className="text-xs font-bold leading-snug text-brand-orange-950 uppercase tracking-wider">
              in SEO, Google Ads, SMM & Email Marketing and Traning.
            </p>
          </motion.div>

          {/* Image Area */}
          <div className="relative flex items-end justify-center w-full max-w-[700px] h-[400px] sm:h-[420px] md:h-[500px] lg:h-[600px]">

            {/* Main Image */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative z-10 w-full h-full max-h-full flex items-end justify-center"
              style={{
                filter: "drop-shadow(0 20px 30px rgba(242, 92, 5, 0.08))",
              }}
            >
              <div className="relative w-full h-[400px] sm:h-[420px] md:h-[500px] lg:h-[600px] flex items-end justify-center">
                <Image
                  src="/pradhumn-mishra.png"
                  alt="Pradhumn Mishra"
                  width={600}
                  height={600}
                  priority
                  className="object-contain object-bottom max-h-full w-auto"
                />
              </div>
            </motion.div>

            {/* Floating Badges */}
            {floatingBadges.map((badge) => (
              <FloatingBadge key={badge.text} {...badge} />
            ))}
          </div>
        </div>
      </div>

      <div className="relative w-full py-8 backdrop-blur-md border-t border-b border-brand-orange-100/50 shadow-sm md:py-10">
        <div className="container max-w-6xl px-4 mx-auto">
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-x-4 gap-y-6 md:gap-6 text-center">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
