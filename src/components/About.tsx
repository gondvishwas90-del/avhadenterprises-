"use client";

import { useState } from "react";
import { Compass, Eye, ShieldCheck, ArrowUpRight } from "lucide-react";

export default function About() {
  const [activeTab, setActiveTab] = useState<"mission" | "vision" | "approach">("mission");

  const tabs = {
    mission: {
      title: "Our Mission",
      content: "To orchestrate digital growth and enterprise architecture for businesses globally. We construct high-integrity technology frameworks that drive operational clarity, security, and compound scale.",
      icon: <Compass className="tab-icon" size={24} />
    },
    vision: {
      title: "Our Vision",
      content: "To be the premier architect of global digital ecosystems. We envision a future where technology is seamlessly integrated, processes are self-optimizing, and enterprises operate with absolute agility.",
      icon: <Eye className="tab-icon" size={24} />
    },
    approach: {
      title: "Our Approach",
      content: "We reject generic methodologies. By combining deep strategic advisory with custom engineering, we build solutions tailored specifically to legacy integration, AI adoption, and scalable infrastructure.",
      icon: <ShieldCheck className="tab-icon" size={24} />
    }
  };

  return (
    <section id="about" className="about-section">
      <div className="grid-2">
        <div className="about-content reveal-fade-up">
          <span className="editorial-label">[ 02 — EXECUTIVE STATEMENT ]</span>
          <h2 className="section-title">Architecting the future of global commerce.</h2>
          <p className="about-lead">
            Avhad Enterprises stands at the intersection of business strategy and deep technological consulting. 
            We do not just advise; we execute digital transformation programs that change how organizations compete.
          </p>

          <div className="about-tabs-nav">
            {(Object.keys(tabs) as Array<keyof typeof tabs>).map((tabKey) => (
              <button
                key={tabKey}
                onClick={() => setActiveTab(tabKey)}
                className={`tab-btn ${activeTab === tabKey ? "active" : ""}`}
              >
                {tabs[tabKey].icon}
                <span>{tabs[tabKey].title}</span>
              </button>
            ))}
          </div>

          <div className="tab-content-panel">
            <p className="tab-text">{tabs[activeTab].content}</p>
            <div className="tab-philosophy">
              <span className="philosophy-quote">"True intelligence lies in solving complex problems with simple, elegant architectures."</span>
            </div>
          </div>
        </div>

        <div className="about-visual-wrapper reveal-fade-up">
          <div className="about-image-frame image-mask-reveal">
            <img 
              src="/about_strategy.png" 
              alt="Avhad Enterprises Global Strategy & Digital Infrastructure Visual" 
              className="about-image"
            />
            <div className="image-overlay-glow"></div>
          </div>
          <div className="about-caption-card premium-card">
            <h4>Global Excellence</h4>
            <p>Deploying strategy nodes across EMEA, APAC, and the Americas.</p>
            <a href="#contact" className="caption-link">
              Read Our Strategy Brief <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
