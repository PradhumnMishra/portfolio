import { Navigation } from "@/components/ui/Navigation";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { ExperienceEducation } from "@/components/sections/ExperienceEducation";
import { Skills } from "@/components/sections/Skills";
import { CaseStudies } from "@/components/sections/case-studies";
import { ContactFooter } from "@/components/sections/ContactFooter";

export default function Home() {
  return (
    <main className="w-full min-h-screen overflow-x-hidden">
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
