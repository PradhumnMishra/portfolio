"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageSquare, Phone, Send, Loader2, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { FaLinkedinIn, FaTwitter, FaGithub } from "react-icons/fa";

export function ContactFooter() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "AI SEO & Generative Search",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Allow custom handling or standard mock submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("loading");
    // Mock API request
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
      setFormData({ name: "", email: "", service: "AI SEO & Generative Search", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-2 md:py-10 bg-transparent text-brand-orange-950 relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-orange-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-orange-300/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 max-w-5xl relative z-10">

        {/* Section Header */}
        <div className="text-center mb-5 flex flex-col items-center">
          <h3 className="text-3xl sm:text-5xl font-black text-brand-orange-950 tracking-tighter">
            Let&apos;s Create Something <span className="italic font-serif opacity-90 text-brand-orange-600">Great</span>
          </h3>
        </div>

        {/* Contact Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 lg:gap-16 items-start mb-20">

          {/* Info Side (Col span 5) */}
          <div className="lg:col-span-5 space-y-6">


            {/* Quick CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
              {/* Email Card */}
              <a
                href="mailto:pradhuman0312@gmail.com"
                className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-brand-orange-100 hover:border-brand-orange-50/40 hover:bg-brand-orange-50/30 shadow-sm transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-orange-500/10 flex items-center justify-center text-brand-orange-500 group-hover:scale-110 transition-transform">
                  <Mail size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider">Email Me</span>
                  <span className="block text-sm font-bold truncate text-brand-orange-950">pradhuman0312@gmail.com</span>
                </div>
                <ArrowUpRight size={18} className="text-gray-400 group-hover:text-brand-orange-950 transition-colors" />
              </a>

              {/* WhatsApp Card */}
              <a
                href="https://api.whatsapp.com/send?phone=918810463203&text=Hi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-brand-orange-100 hover:border-green-500/40 hover:bg-gray-50/50 shadow-sm transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform">
                  <MessageSquare size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider">WhatsApp</span>
                  <span className="block text-sm font-bold truncate text-brand-orange-950">Chat Live</span>
                </div>
                <ArrowUpRight size={18} className="text-gray-400 group-hover:text-brand-orange-950 transition-colors" />
              </a>

              {/* Phone Direct Card */}
              <a
                href="tel:+918810463203"
                className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-brand-orange-100 hover:border-brand-orange-500/40 hover:bg-brand-orange-50/30 shadow-sm transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-orange-500/10 flex items-center justify-center text-brand-orange-500 group-hover:scale-110 transition-transform">
                  <Phone size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider">Call Direct</span>
                  <span className="block text-sm font-bold truncate text-brand-orange-950">+91 8810463203</span>
                </div>
                <ArrowUpRight size={18} className="text-gray-400 group-hover:text-brand-orange-950 transition-colors" />
              </a>

            </div>
          </div>


        </div>

        {/* Divider */}
        <hr className="border-gray-200 mb-12" />

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          {/* Logo and Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <p className="text-gray-600 text-xs mt-1 font-medium">Digital Marketer & Trainer</p>
          </div>

          {/* Copyright */}
          <p className="text-gray-600 text-xs font-semibold">
            &copy; {new Date().getFullYear()} PM. All rights reserved.
          </p>

        </div>

      </div>
    </section>
  );
}
