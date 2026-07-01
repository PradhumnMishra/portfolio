"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { usePathname } from "next/navigation";

const socials = [
  { name: "Facebook", href: "https://www.facebook.com/pradum789/", icon: FaFacebookF },
  { name: "Instagram", href: "https://www.instagram.com/pradhuman0312/", icon: FaInstagram },
  { name: "Twitter", href: "https://x.com/pradhum37808659", icon: FaTwitter },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/pradhumn-mishra/", icon: FaLinkedinIn },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";

  const links = [
    { name: "Home.", href: isHome ? "#" : "/" },
    { name: "About.", href: isHome ? "#about" : "/#about" },
    { name: "Skills.", href: isHome ? "#skills" : "/#skills" },
    { name: "Experience.", href: isHome ? "#experience" : "/#experience" },
    { name: "Projects.", href: isHome ? "#projects" : "/#projects" },
    { name: "Blog.", href: "/blog" },
    { name: "Contact.", href: isHome ? "#contact" : "/#contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || mobileMenuOpen
          ? "bg-white/90 backdrop-blur-md shadow-sm py-4"
          : "bg-transparent py-6"
          }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center max-w-6xl">
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 w-full justify-between">
            <ul className="flex items-center gap-8">
              {links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-brand-orange-800 font-bold hover:text-brand-orange-600 transition-colors text-sm tracking-wide"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-3">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-brand-orange-800 hover:text-brand-orange-600 hover:scale-110 transition-all duration-200"
                    aria-label={social.name}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
 
          {/* Mobile Menu Toggle & Socials */}
          <div className="flex md:hidden items-center justify-between w-full">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center justify-center p-2 rounded-xl text-brand-orange-950 bg-brand-orange-100 hover:bg-brand-orange-100 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="flex items-center gap-2">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-brand-orange-800 hover:text-brand-orange-600 hover:scale-110 transition-all duration-200"
                    aria-label={social.name}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </motion.nav>
 
      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[72px] bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-lg z-40 md:hidden overflow-hidden"
          >
            <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
              <ul className="grid grid-cols-2 gap-y-4 gap-x-4">
                {links.map((link) => (
                  <li key={link.name} className="text-center">
                    <a
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-base font-black text-brand-orange-900 hover:text-brand-orange-600 transition-colors py-2"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

