"use client";

import { useState } from "react";
import { XCircle, CheckCircle2, ArrowRight } from "lucide-react";

export default function Challenges() {
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const items = [
    {
      category: "Operations",
      painTitle: "Siloed Operations & Human Lag",
      painPoints: [
        "Manual calculations and data entry lead to high error margins.",
        "Disjointed systems slow down middle-office execution.",
        "EBITDA drain due to repetitive administrative labor."
      ],
      solutionTitle: "Orchestrated Operational Intelligence",
      solutionPoints: [
        "Self-healing API sync connects ERP, CRM, and financial hubs.",
        "Automated RPA pipelines eliminate manual data processing.",
        "Operations scale 10X without increasing headcount."
      ]
    },
    {
      category: "Growth & Search",
      painTitle: "Exorbitant Ad Spend & Static Funnels",
      painPoints: [
        "Unstable organic ranking makes customer acquisition highly volatile.",
        "Ad spend inflation drives up CAC and limits margins.",
        "Static websites fail to convert premium enterprise buyers."
      ],
      solutionTitle: "Programmatic Search Engines",
      solutionPoints: [
        "SEO Engineering builds 1,000+ targeted high-intent pages.",
        "Systematic CRO audits double conversion rate structures.",
        "Organic positioning generates high-value outbound leads."
      ]
    },
    {
      category: "Technology Core",
      painTitle: "Legacy Technical Debt & Security Risks",
      painPoints: [
        "Monolithic codebase slows down code deployments to weeks.",
        "Vulnerable, outdated scripts threaten enterprise compliance.",
        "Server crashes under peak traffic demand."
      ],
      solutionTitle: "Next-Gen Headless & Cloud Architectures",
      solutionPoints: [
        "Headless Next.js frontends render instantly.",
        "Fully containerized Docker/Kubernetes cluster scaling.",
        "ISO/SOC-2 compliant infrastructure guarantees safety."
      ]
    }
  ];

  return (
    <section id="solutions" className="challenges-section">
      <div className="section-header reveal-fade-up">
        <span className="editorial-label">[ 05 — GAP ANALYSIS ]</span>
        <h2 className="section-title">The Strategic Transformation.</h2>
        <p className="section-subtitle">
          How we identify operational vulnerabilities and build high-performance technical countermeasures.
        </p>
      </div>

      <div className="challenges-container reveal-fade-up">
        {/* Category selector */}
        <div className="challenges-tabs">
          {items.map((item, idx) => (
            <button
              key={idx}
              className={`challenge-tab-btn ${activeCategory === idx ? "active" : ""}`}
              onClick={() => setActiveCategory(idx)}
            >
              <span className="tab-index">0{idx + 1}</span>
              <span className="tab-label">{item.category}</span>
            </button>
          ))}
        </div>

        {/* Comparison Board */}
        <div className="comparison-board">
          {/* Pain Block (Left) */}
          <div className="board-half pain-half">
            <div className="board-badge pain-badge">
              <XCircle size={14} /> Critical Vulnerabilities
            </div>
            <h3 className="board-half-title">{items[activeCategory].painTitle}</h3>
            <ul className="board-points">
              {items[activeCategory].painPoints.map((point, pIdx) => (
                <li key={pIdx}>
                  <span className="point-icon-pain">✕</span>
                  <span className="point-text">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Separation Connector */}
          <div className="board-divider">
            <div className="divider-line"></div>
            <div className="divider-circle">
              <ArrowRight size={18} />
            </div>
            <div className="divider-line"></div>
          </div>

          {/* Solution Block (Right) */}
          <div className="board-half solution-half">
            <div className="board-badge solution-badge">
              <CheckCircle2 size={14} /> Engineered Countermeasure
            </div>
            <h3 className="board-half-title">{items[activeCategory].solutionTitle}</h3>
            <ul className="board-points">
              {items[activeCategory].solutionPoints.map((point, sIdx) => (
                <li key={sIdx}>
                  <span className="point-icon-sol">✓</span>
                  <span className="point-text">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
