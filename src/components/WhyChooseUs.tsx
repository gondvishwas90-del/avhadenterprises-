"use client";

import { Shield, Cpu, Target, Globe, Workflow, Award } from "lucide-react";

export default function WhyChooseUs() {
  const points = [
    {
      num: "01",
      icon: <Shield className="card-icon" size={24} />,
      title: "Architectural Integrity",
      desc: "We construct secure, bulletproof digital foundations engineered for maximum fault tolerance and speed."
    },
    {
      num: "02",
      icon: <Cpu className="card-icon" size={24} />,
      title: "AI & Automation First",
      desc: "Injecting machine intelligence and workflow engines to automate high-friction operational pipelines."
    },
    {
      num: "03",
      icon: <Target className="card-icon" size={24} />,
      title: "Strategic Alignment",
      desc: "Every line of code and architectural design directly feeds into your long-term EBITDA and growth goals."
    },
    {
      num: "04",
      icon: <Globe className="card-icon" size={24} />,
      title: "Global Scalability",
      desc: "Building systems from day one that support cross-border execution, multi-region compliance, and latency-free scaling."
    },
    {
      num: "05",
      icon: <Workflow className="card-icon" size={24} />,
      title: "End-to-End Orchestration",
      desc: "From blueprint advisory to production engineering, we own the lifecycle so you avoid integration friction."
    },
    {
      num: "06",
      icon: <Award className="card-icon" size={24} />,
      title: "Domain Domain Experts",
      desc: "A team of senior architects and business executives with decades of experience at Fortune 500 tech firms."
    }
  ];

  return (
    <section id="why-us" className="why-us-section">
      <div className="section-header reveal-fade-up">
        <span className="editorial-label">[ 03 — DECISION MATRIX ]</span>
        <h2 className="section-title">Designed for Enterprise Complexity.</h2>
        <p className="section-subtitle">
          We bring high-end design, advanced technologies, and deep operational consulting to companies that cannot afford failure.
        </p>
      </div>

      <div className="grid-3 reveal-fade-up">
        {points.map((point, idx) => (
          <div key={idx} className="why-card premium-card">
            <div className="why-card-top">
              <span className="why-card-number">{point.num}</span>
              <div className="why-card-icon-box">{point.icon}</div>
            </div>
            <h3 className="why-card-title">{point.title}</h3>
            <p className="why-card-desc">{point.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
