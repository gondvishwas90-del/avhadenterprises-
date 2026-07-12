"use client";

import { useState } from "react";
import { 
  Layers, BarChart2, Compass, Code, 
  Workflow, Cpu, Users, Cloud, ArrowUpRight 
} from "lucide-react";

export default function Expertise() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const expertises = [
    {
      icon: <Layers size={28} />,
      title: "Digital Foundations",
      bullets: ["Enterprise Architecture", "Headless CMS Solutions", "Web Performance Tuning"],
      desc: "Architecting core platform foundations engineered for speed, redundancy, and next-generation search optimization."
    },
    {
      icon: <BarChart2 size={28} />,
      title: "Growth Marketing",
      bullets: ["SEO Engineering", "Conversion Architecture", "Data Loop Ingestion"],
      desc: "Structuring programmatic SEO and scientific CRO models that systematically lower CAC and multiply organic traffic."
    },
    {
      icon: <Compass size={28} />,
      title: "Brand Strategy",
      bullets: ["Market Positioning", "Identity Systems", "Premium UX Mapping"],
      desc: "Creating positioning models that turn technology firms into category authorities and justify premium enterprise pricing."
    },
    {
      icon: <Code size={28} />,
      title: "Software Engineering",
      bullets: ["Microservices", "React & Node Scale", "High-Load API Pipelines"],
      desc: "Engineering custom backend engines and responsive frontend interfaces built using robust modern structures."
    },
    {
      icon: <Workflow size={28} />,
      title: "Automation",
      bullets: ["RPA Pipeline Design", "Middle-Office Automation", "Custom Integrations"],
      desc: "Eliminating human-labor bottlenecks with self-healing integrations and scheduled RPA operations."
    },
    {
      icon: <Cpu size={28} />,
      title: "AI Solutions",
      bullets: ["LLM Fine-tuning", "Retrieval Augmented Gen", "Predictive Analytics Models"],
      desc: "Integrating generative intelligence and vector searches directly into CRM tools and internal knowledge silos."
    },
    {
      icon: <Users size={28} />,
      title: "CRM Systems",
      bullets: ["Salesforce Architecture", "HubSpot Implementations", "Custom Database Sync"],
      desc: "Unifying commercial pipelines and user support centers around a singular, high-integrity data core."
    },
    {
      icon: <Cloud size={28} />,
      title: "Cloud Infrastructure",
      bullets: ["Kubernetes Deployment", "AWS / Azure Hybrid Cloud", "Serverless Scale"],
      desc: "Orchestrating containerized systems, automated CI/CD pipelines, and active security defenses."
    }
  ];

  return (
    <section id="services" className="expertise-section">
      <div className="section-header reveal-fade-up">
        <span className="editorial-label">[ 04 — CORE CAPABILITIES ]</span>
        <h2 className="section-title">Our Strategic Focus Areas.</h2>
        <p className="section-subtitle">
          From fundamental code engineering to sophisticated brand architectures, we deliver global digital transformations.
        </p>
      </div>

      <div className="expertise-grid reveal-fade-up">
        {expertises.map((exp, idx) => {
          const isHovered = hoveredIndex === idx;
          const isAnyHovered = hoveredIndex !== null;
          
          return (
            <div
              key={idx}
              className={`expertise-card premium-card ${isHovered ? "expanded" : ""} ${isAnyHovered && !isHovered ? "shrunk" : ""}`}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="expertise-card-header">
                <div className="exp-icon-box">{exp.icon}</div>
                <ArrowUpRight className="exp-arrow" size={18} />
              </div>
              
              <h3 className="expertise-card-title">{exp.title}</h3>
              <p className="expertise-card-desc">{exp.desc}</p>
              
              <div className="expertise-bullets-wrap">
                <ul className="expertise-bullets">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx}>
                      <span className="bullet-indicator">↳</span> {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
