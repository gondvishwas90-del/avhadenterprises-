"use client";

import { ArrowRight, Calendar } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="final-cta-section">
      <div className="cta-glow-container">
        <div className="cta-radial-glow"></div>
      </div>
      
      <div className="cta-content-wrapper premium-card reveal-fade-up">
        <span className="editorial-label">[ 12 — GLOBAL INITIATION ]</span>
        <h2 className="cta-title">
          Let’s Build Something<br />
          <span className="gradient-text">Extraordinary</span>
        </h2>
        
        <p className="cta-desc">
          Accelerate your operational intelligence and capture organic search dominance. 
          Partner with our senior consulting squad and engineering architects today.
        </p>
        
        <div className="cta-actions">
          <a href="#contact" className="btn-primary">
            Start Project <ArrowRight size={18} />
          </a>
          <a href="#contact" className="btn-secondary">
            Book Strategy Call <Calendar size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
