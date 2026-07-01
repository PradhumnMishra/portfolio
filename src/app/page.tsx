import { Navigation } from "@/components/ui/Navigation";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { ExperienceEducation } from "@/components/sections/ExperienceEducation";
import { Skills } from "@/components/sections/Skills";
import { CaseStudies } from "@/components/sections/case-studies";
import { ContactFooter } from "@/components/sections/ContactFooter";

export default function Home() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Pradhumn Mishra",
    "jobTitle": "AI Digital Marketer & Trainer",
    "url": "https://pradhumnmishra.online",
    "image": "https://pradhumnmishra.online/pm.png",
    "sameAs": [
      "https://www.linkedin.com/in/pradhumn-mishra/",
      "https://x.com/pradhum37808659",
      "https://www.instagram.com/pradhuman0312/",
      "https://www.facebook.com/pradum789/"
    ],
    "description": "AI Digital Marketer & Trainer specializing in AI SEO, GEO, Google Ads, and Meta Ads with over 4 years of experience driving brand revenue.",
    "worksFor": {
      "@type": "Organization",
      "name": "Appwars Technologies"
    }
  };

  return (
    <main className="w-full min-h-screen overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Navigation />
      <Hero />
      <About />
      <CaseStudies />
      <Skills />
      <ExperienceEducation />
      <ContactFooter />
    </main>
  );
}
