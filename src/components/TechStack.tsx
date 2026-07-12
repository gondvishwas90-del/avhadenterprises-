"use client";

import { useState } from "react";
import { Code2, Cpu, Globe, Database, Terminal, Cloud, Network, Server } from "lucide-react";

export default function TechStack() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const technologies = [
    {
      name: "React",
      icon: <Code2 size={32} className="tech-icon" />,
      tagline: "Dynamic UI Layer",
      usage: "High-performance frontend systems and reusable interface libraries.",
      stat: "99.8% Core Web Vitals"
    },
    {
      name: "Next.js",
      icon: <Globe size={32} className="tech-icon" />,
      tagline: "Server-Side Rendering",
      usage: "Instant loads, server components, and programmatic SEO indexing.",
      stat: "Sub-100ms LCP"
    },
    {
      name: "Node.js",
      icon: <Terminal size={32} className="tech-icon" />,
      tagline: "Backend Execution",
      usage: "Asynchronous, event-driven middle-office API microservices.",
      stat: "10k+ Req/Sec Capability"
    },
    {
      name: "AWS",
      icon: <Cloud size={32} className="tech-icon" />,
      tagline: "Infrastructure Scale",
      usage: "Auto-scaling server nodes, cloud storage, and database orchestration.",
      stat: "99.99% Guaranteed SLA"
    },
    {
      name: "Azure",
      icon: <Server size={32} className="tech-icon" />,
      tagline: "Hybrid Cloud Security",
      usage: "Active directory setups and secure corporate cloud nodes.",
      stat: "SOC-2 Certified Nodes"
    },
    {
      name: "Docker",
      icon: <Database size={32} className="tech-icon" />,
      tagline: "Containerization",
      usage: "Isolated software environments that build and deploy seamlessly.",
      stat: "Zero Dev-Prod Drift"
    },
    {
      name: "Artificial Intelligence",
      icon: <Cpu size={32} className="tech-icon" />,
      tagline: "Cognitive Nodes",
      usage: "Large Language Model tuning and automated retrieval search engines.",
      stat: "10X Search Efficacy"
    },
    {
      name: "Workflow Automation",
      icon: <Network size={32} className="tech-icon" />,
      tagline: "RPA Integration Core",
      usage: "Scheduled middle-office bots and system sync automation.",
      stat: "90% Cost Elimination"
    }
  ];

  return (
    <section id="tech-stack" className="tech-stack-section">
      <div className="section-header reveal-fade-up">
        <span className="editorial-label">[ 08 — ARCHITECTURE MATRIX ]</span>
        <h2 className="section-title">The Strategic Tech Stack.</h2>
        <p className="section-subtitle">
          We leverage premium, enterprise-grade frameworks to build secure and highly scalable digital ecosystems.
        </p>
      </div>

      <div className="tech-grid reveal-fade-up">
        {technologies.map((tech, idx) => (
          <div
            key={idx}
            className={`tech-card premium-card ${hoveredIdx === idx ? "hovered" : ""}`}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <div className="tech-card-front">
              <div className="tech-icon-container">{tech.icon}</div>
              <h3 className="tech-name">{tech.name}</h3>
              <p className="tech-tagline">{tech.tagline}</p>
            </div>
            
            <div className="tech-card-back">
              <h4>System Details</h4>
              <p>{tech.usage}</p>
              <div className="tech-stat-badge">{tech.stat}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
