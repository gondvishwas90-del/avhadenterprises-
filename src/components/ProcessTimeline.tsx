"use client";

import { useEffect, useRef, useState } from "react";

export default function ProcessTimeline() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);

  const steps = [
    {
      num: "01",
      name: "Discover",
      tagline: "System Audit & Requirement Elicitation",
      desc: "We perform a forensic audit of your technical architecture, database schemas, and commercial workflows to map performance bottlenecks and discover structural constraints."
    },
    {
      num: "02",
      name: "Strategy",
      tagline: "Architecture Blueprinting & Economics",
      desc: "Our senior architects design a blueprint specifying database engines, cloud hosting targets, data migrations, API structures, and direct EBITDA impact calculations."
    },
    {
      num: "03",
      name: "Design",
      tagline: "High-Fidelity Prototyping & UX Systems",
      desc: "We build fully responsive, premium visual prototypes. We formulate a styling framework that guarantees brand consistency across all digital interfaces."
    },
    {
      num: "04",
      name: "Development",
      tagline: "Custom Engineering & Rigorous Testing",
      desc: "Our engineering squad develops clean, server-side rendered codebases using modern Next.js structures, type-safe APIs, and containerized deployment packages."
    },
    {
      num: "05",
      name: "Growth",
      tagline: "Optimization Loops & Performance Scale",
      desc: "Post-deployment, we run optimization algorithms (CRO metrics, SEO indexes, database cache systems) to expand coverage and ensure compound operational scaling."
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (stepRefs.current.length === 0) return;
      
      const viewportHeight = window.innerHeight;
      const triggerPoint = viewportHeight * 0.4; // Trigger when step is 40% down the screen

      let currentActive = 0;
      stepRefs.current.forEach((ref, idx) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        if (rect.top <= triggerPoint) {
          currentActive = idx;
        }
      });

      setActiveStep(currentActive);
    };

    window.addEventListener("scroll", handleScroll);
    // Trigger once on mount
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="process" className="timeline-section" ref={containerRef}>
      <div className="timeline-layout">
        {/* Left Sticky Panel */}
        <div className="timeline-sticky-panel">
          <span className="editorial-label">[ 06 — OPERATIONAL METRICS ]</span>
          <h2 className="timeline-sticky-title">The Engineering Lifecycle</h2>
          
          <div className="timeline-indicators">
            {steps.map((step, idx) => (
              <div 
                key={idx} 
                className={`timeline-indicator-item ${activeStep === idx ? "active" : ""}`}
                onClick={() => {
                  stepRefs.current[idx]?.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
              >
                <span className="indicator-number">{step.num}</span>
                <span className="indicator-label">{step.name}</span>
              </div>
            ))}
          </div>

          <div className="timeline-progress-bar-bg">
            <div 
              className="timeline-progress-bar-fill" 
              style={{ height: `${((activeStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Right Scroll Panel */}
        <div className="timeline-scroll-panel">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`timeline-step-card premium-card ${activeStep === idx ? "focused" : ""}`}
              ref={(el) => { stepRefs.current[idx] = el; }}
            >
              <div className="step-card-header">
                <span className="step-card-num">{step.num}</span>
                <span className="step-card-name-mobile">{step.name}</span>
              </div>
              <h3 className="step-card-tagline">{step.tagline}</h3>
              <p className="step-card-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
