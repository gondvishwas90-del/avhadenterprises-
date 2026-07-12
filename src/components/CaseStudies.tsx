"use client";

import { ArrowUpRight } from "lucide-react";

export default function CaseStudies() {
  const cases = [
    {
      title: "SaaS Analytics Transformation",
      category: "Growth & Automation",
      metric: "+320% Leads",
      metricLabel: "Inbound Pipeline Growth",
      img: "/case_study_1.png",
      link: "#"
    },
    {
      title: "Enterprise Database Restructuring",
      category: "Cloud Infrastructure",
      metric: "3X Revenue",
      metricLabel: "Operational Efficiency Gain",
      img: "/case_study_2.png",
      link: "#"
    },
    {
      title: "Logistics Dashboard Integration",
      category: "Software Engineering",
      metric: "+180% Traffic",
      metricLabel: "User Engagement Lift",
      img: "/case_study_3.png",
      link: "#"
    }
  ];

  return (
    <section id="case-studies" className="case-studies-section">
      <div className="section-header reveal-fade-up">
        <span className="editorial-label">[ 07 — CLIENT IMPACT SHIFT ]</span>
        <h2 className="section-title">Selected Case Studies.</h2>
        <p className="section-subtitle">
          Real strategic transformations and engineered outcomes delivered to our global enterprise partners.
        </p>
      </div>

      <div className="case-grid reveal-fade-up">
        {cases.map((cs, idx) => (
          <div key={idx} className="case-card">
            <div className="case-image-wrapper">
              <img src={cs.img} alt={cs.title} className="case-image" />
              
              {/* Metric Hover Overlay */}
              <div className="case-metric-overlay">
                <div className="case-overlay-glow"></div>
                <div className="overlay-content">
                  <span className="overlay-metric">{cs.metric}</span>
                  <span className="overlay-metric-label">{cs.metricLabel}</span>
                </div>
              </div>
            </div>
            
            <div className="case-info">
              <div className="case-meta">
                <span className="case-category">{cs.category}</span>
                <span className="case-number">0{idx + 1}</span>
              </div>
              <h3 className="case-title">{cs.title}</h3>
              <a href={cs.link} className="case-link btn-secondary">
                View Case Study <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
