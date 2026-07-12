"use client";

import { ArrowRight, Calendar, Sparkles } from "lucide-react";

export default function Hero({ revealed }: { revealed: boolean }) {
  return (
    <section id="home" className={`hero-section ${revealed ? "reveal-active" : ""}`}>
      <div className="ambient-glow-1"></div>
      <div className="ambient-glow-2"></div>
      
      <div className="hero-content">
        <span className="editorial-label reveal-item">
          <Sparkles size={14} className="sparkle-icon" /> [ 01 — WHO WE ARE ]
        </span>
        
        <h1 className="hero-title reveal-item">
          Engineering<br />
          <span className="gradient-text">Digital</span><br />
          Ecosystems
        </h1>
        
        <p className="hero-subtitle reveal-item">
          We partner with ambitious enterprises to orchestrate premium software solutions, 
          intelligent automation platforms, and global growth strategies that redefine industries.
        </p>
        
        <div className="hero-actions reveal-item">
          <a href="#contact" className="btn-primary">
            Start Project <ArrowRight size={18} />
          </a>
          <a href="#contact" className="btn-secondary">
            Book Strategy Call <Calendar size={18} />
          </a>
        </div>
      </div>
      
      <div className="hero-scroll-indicator reveal-item">
        <div className="mouse-wheel"></div>
        <span>Scroll to Explore</span>
      </div>
    </section>
  );
}
