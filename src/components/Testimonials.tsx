"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const reviews = [
    {
      quote: "Avhad Enterprises rebuilt our legacy middle-office pipelines in under four months. The efficiency gains alone saved us $1.4M in operational overhead in the first fiscal year. Their technical strategy is completely unparalleled.",
      author: "Marcus Vance",
      role: "Chief Technology Officer",
      company: "Spherion Strategy Nodes",
      rating: 5
    },
    {
      quote: "The programmatic SEO and headless Next.js infrastructure engineered by Avhad Enterprises multiplied our organic enterprise leads by 4.2X. They operate as a deep strategic advisor, not a typical marketing agency.",
      author: "Sarah Jenkins",
      role: "VP of Marketing",
      company: "Quantix Tech Corp",
      rating: 5
    },
    {
      quote: "Their understanding of SOC-2 compliance, microservices latency, and containerized scale allowed us to launch our fintech core system ahead of schedule. A masterpiece of software engineering.",
      author: "David Chen",
      role: "Director of Product & Engineering",
      company: "Nova Finance Group",
      rating: 5
    }
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section id="insights" className="testimonials-section">
      <div className="section-header reveal-fade-up">
        <span className="editorial-label">[ 10 — COGNITIVE FEEDBACK ]</span>
        <h2 className="section-title">Executive Endorsements.</h2>
      </div>

      <div className="testimonial-container premium-card reveal-fade-up">
        <div className="testimonial-quote-box">
          <Quote className="quote-icon" size={64} />
          
          <div className="testimonial-slider-track">
            {reviews.map((rev, idx) => (
              <div 
                key={idx} 
                className={`testimonial-slide ${activeIndex === idx ? "active" : ""}`}
              >
                <div className="rating-stars">
                  {Array.from({ length: rev.rating }).map((_, sIdx) => (
                    <Star key={sIdx} size={16} fill="var(--accent-highlight)" color="var(--accent-highlight)" />
                  ))}
                </div>
                
                <p className="testimonial-quote">"{rev.quote}"</p>
                
                <div className="testimonial-author">
                  <div className="author-initials">
                    {rev.author.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <h4 className="author-name">{rev.author}</h4>
                    <p className="author-designation">{rev.role} — <span className="author-company">{rev.company}</span></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slide Controls */}
        <div className="testimonial-controls">
          <button onClick={handlePrev} className="control-btn" aria-label="Previous Testimonial">
            <ChevronLeft size={20} />
          </button>
          <span className="control-indicator">
            {activeIndex + 1} / {reviews.length}
          </span>
          <button onClick={handleNext} className="control-btn" aria-label="Next Testimonial">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
