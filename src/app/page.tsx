"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BusinessEcosystem from "@/components/BusinessEcosystem";
import BuildFlow from "@/components/BuildFlow";
import LogoMarquee from "@/components/LogoMarquee";
import Metrics from "@/components/Metrics";
import About from "@/components/About";
import WhyChooseUs from "@/components/WhyChooseUs";
import Expertise from "@/components/Expertise";
import Challenges from "@/components/Challenges";
import ProcessTimeline from "@/components/ProcessTimeline";
import CaseStudies from "@/components/CaseStudies";
import TechStack from "@/components/TechStack";
import Industries from "@/components/Industries";
import Testimonials from "@/components/Testimonials";
import TrustMarquee from "@/components/TrustMarquee";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import dynamic from "next/dynamic";

const Agentation = dynamic(
  () => import("agentation").then((mod) => mod.Agentation),
  { ssr: false }
);

export default function Home() {
  const [isRevealed, setIsRevealed] = useState(false);

  // Cursor follow & Scroll Reveal systems
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Intersection Observer for scroll fades, blurs, and masks
    const reveals = document.querySelectorAll(".reveal-fade-up, .blur-reveal, .image-mask-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // Optional: unobserve once visible
            // observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before entering view
      }
    );

    reveals.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Preloader onComplete={() => setIsRevealed(true)} />
      {/* Background aesthetics */}
      <div className="grid-backdrop"></div>
      <div className="glow-canvas"></div>

      {/* Main portal layout */}
      <Navbar />

      <main>
        {/* Section 1: Hero Banner */}
        <Hero revealed={isRevealed} />

        {/* Section 1.5: Interactive Business Ecosystem */}
        <BusinessEcosystem />

        {/* Section 1.7: Avhad BuildFlow Studio */}
        <BuildFlow />

        {/* Section 2: Logo Ticker */}
        <LogoMarquee />

        {/* Section 3: Strategic Metrics */}
        <Metrics />

        {/* Section 4: About & Philosophy */}
        <About />

        {/* Section 5: Why Choose Us */}
        <WhyChooseUs />

        {/* Section 6: Expertise Grid */}
        <Expertise />

        {/* Section 7: Pain-Solution gaps */}
        <Challenges />

        {/* Section 8: Process Timeline */}
        <ProcessTimeline />

        {/* Section 9: Featured Case Studies */}
        <CaseStudies />

        {/* Section 10: Tech Stack Flip Grid */}
        <TechStack />

        {/* Section 11: Industries Matrix */}
        <Industries />

        {/* Section 12: Executive Testimonials */}
        <Testimonials />

        {/* Section 13: Trust Certifications marquee */}
        <TrustMarquee />

        {/* Section 14: Accoridion FAQs */}
        <FAQ />

        {/* Section 15: Strategic Inquiry Form */}
        <Contact />

        {/* Section 16: Centered Glow CTA */}
        <FinalCTA />
      </main>

      {/* Section 17: Comprehensive Footer */}
      <Footer />

      {process.env.NODE_ENV === "development" && <Agentation />}
    </>
  );
}
