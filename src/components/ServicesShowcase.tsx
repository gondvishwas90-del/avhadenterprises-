"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

export default function ServicesShowcase() {
  const [activeFace, setActiveFace] = useState(0); // 0 to 5
  const containerRef = useRef<HTMLDivElement>(null);
  const isClickScrolling = useRef(false);

  // Map active index to CSS 3D Rotations
  const getRotationStyle = () => {
    switch (activeFace) {
      case 0: return "rotateY(0deg) rotateX(0deg)"; // Front (Brand Identity)
      case 1: return "rotateY(-90deg) rotateX(0deg)"; // Right (Web Design)
      case 2: return "rotateY(-180deg) rotateX(0deg)"; // Back (Interactive Dev)
      case 3: return "rotateY(90deg) rotateX(0deg)"; // Left (AI Motion)
      case 4: return "rotateY(0deg) rotateX(-90deg)"; // Top (Creative Content)
      case 5: return "rotateY(0deg) rotateX(90deg)"; // Bottom (Strategic Planning)
      default: return "rotateY(0deg) rotateX(0deg)";
    }
  };

  const faces = [
    {
      title: "BRAND IDENTITY",
      meta: "(Brand Identity Design)",
      icon: (
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="2" width="20" height="20" strokeDasharray="2,2" />
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4" strokeDasharray="1,1" />
          <path d="M12 7l-4 6v3h8v-3l-4-6z" fill="rgba(255,255,255,0.05)" />
          <circle cx="12" cy="13" r="1.5" />
          <line x1="12" y1="14.5" x2="12" y2="16" />
        </svg>
      )
    },
    {
      title: "WEB DESIGN",
      meta: "(Web Design & Layout)",
      icon: (
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="9" strokeDasharray="2,2" />
          <circle cx="9" cy="9.5" r="1.2" fill="currentColor" />
          <circle cx="15" cy="9.5" r="1.2" fill="currentColor" />
          <path d="M8 14.5c1.5 2 4.5 2 6 0" strokeLinecap="round" />
          <rect x="2" y="2" width="20" height="20" strokeDasharray="4,4" opacity="0.4" />
        </svg>
      )
    },
    {
      title: "INTERACTIVE DEV",
      meta: "(Advanced Web Development)",
      icon: (
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="4" width="18" height="16" rx="2" strokeDasharray="2,1" />
          <path d="M8 10l-3 2 3 2M16 10l3 2-3 2M13 9l-2 6" />
          <line x1="3" y1="7" x2="21" y2="7" />
        </svg>
      )
    },
    {
      title: "AI MOTION",
      meta: "(AI Motion & Visuals)",
      icon: (
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2z" fill="rgba(255,255,255,0.05)" />
          <circle cx="12" cy="12" r="2" />
          <rect x="2" y="2" width="20" height="20" strokeDasharray="2,2" opacity="0.3" />
        </svg>
      )
    },
    {
      title: "CREATIVE CONTENT",
      meta: "(Brand Content Creation)",
      icon: (
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polygon points="8,5 19,12 8,19" fill="rgba(255,255,255,0.05)" />
          <rect x="2" y="2" width="20" height="20" strokeDasharray="3,3" />
          <line x1="8" y1="12" x2="15" y2="12" strokeDasharray="1,1" />
        </svg>
      )
    },
    {
      title: "STRATEGIC PLANNING",
      meta: "(Brand Core Identity)",
      icon: (
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="rgba(255,255,255,0.05)" strokeDasharray="2,2" />
          <circle cx="12" cy="9" r="1.5" />
        </svg>
      )
    }
  ];

  // Scroll listener to update active face based on scroll progress of the sticky wrapper
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || isClickScrolling.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const totalHeight = rect.height;
      const scrolled = -rect.top;
      const scrollableHeight = totalHeight - window.innerHeight;

      if (scrolled >= 0 && scrolled <= scrollableHeight) {
        const progress = scrolled / scrollableHeight;
        // Map 0-1 progress to 6 faces (0 to 5)
        const index = Math.min(5, Math.max(0, Math.floor(progress * 6)));
        setActiveFace(index);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Set active face and programmatically scroll viewport to the target offset
  const handleNavClick = (index: number) => {
    if (!containerRef.current) return;
    setActiveFace(index);

    isClickScrolling.current = true;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollContainerTop = window.scrollY + rect.top;
    const totalHeight = rect.height;
    const scrollableHeight = totalHeight - window.innerHeight;

    // Calculate target scroll position corresponding to this index
    const targetScrollY = scrollContainerTop + (index / 5) * scrollableHeight;

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth"
    });

    // Reset lock after animation finishes to prevent override by manual scroll handler
    setTimeout(() => {
      isClickScrolling.current = false;
    }, 1200);
  };

  return (
    <div ref={containerRef} className="services-scroll-container">
      <section className="nudot-services-section">

        {/* Giant Background Marquee */}
        <div className="services-dot-matrix-bg">
          <div className="bg-marquee-track">
            <span>AVHAD SERVICES ☺ AVHAD SERVICES ☺ AVHAD SERVICES ☺&nbsp;</span>
            <span>AVHAD SERVICES ☺ AVHAD SERVICES ☺ AVHAD SERVICES ☺&nbsp;</span>
            <span>AVHAD SERVICES ☺ AVHAD SERVICES ☺ AVHAD SERVICES ☺&nbsp;</span>
          </div>
        </div>

        {/* 3D CSS Cube Showcase Wrapper */}
        <div className="services-cube-wrapper">
          <div className="cube-scene">
            <div className="services-3d-cube" style={{ transform: getRotationStyle() }}>
              {/* Front Face: Brand Identity */}
              <div className="cube-face face-front">
                <div className="face-content">
                  <span className="face-header">{faces[0].title}</span>
                  <div className="face-illustration">{faces[0].icon}</div>
                  <span className="face-footer">{faces[0].meta}</span>
                </div>
              </div>

              {/* Right Face: Web Design */}
              <div className="cube-face face-right">
                <div className="face-content">
                  <span className="face-header">{faces[1].title}</span>
                  <div className="face-illustration">{faces[1].icon}</div>
                  <span className="face-footer">{faces[1].meta}</span>
                </div>
              </div>

              {/* Back Face: Interactive Dev */}
              <div className="cube-face face-back">
                <div className="face-content">
                  <span className="face-header">{faces[2].title}</span>
                  <div className="face-illustration">{faces[2].icon}</div>
                  <span className="face-footer">{faces[2].meta}</span>
                </div>
              </div>

              {/* Left Face: AI Motion */}
              <div className="cube-face face-left">
                <div className="face-content">
                  <span className="face-header">{faces[3].title}</span>
                  <div className="face-illustration">{faces[3].icon}</div>
                  <span className="face-footer">{faces[3].meta}</span>
                </div>
              </div>

              {/* Top Face: Creative Content */}
              <div className="cube-face face-top">
                <div className="face-content">
                  <span className="face-header">{faces[4].title}</span>
                  <div className="face-illustration">{faces[4].icon}</div>
                  <span className="face-footer">{faces[4].meta}</span>
                </div>
              </div>

              {/* Bottom Face: Strategic Planning */}
              <div className="cube-face face-bottom">
                <div className="face-content">
                  <span className="face-header">{faces[5].title}</span>
                  <div className="face-illustration">{faces[5].icon}</div>
                  <span className="face-footer">{faces[5].meta}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Controls Panel */}
        <div className="services-controls-wrapper">
          {/* Navigation Icon Row */}
          <div className="services-icon-navigation">
            {faces.map((face, index) => (
              <button
                key={index}
                onClick={() => handleNavClick(index)}
                className={`icon-nav-btn ${activeFace === index ? "active" : ""}`}
                aria-label={`Show ${face.title}`}
              >
                <div className="btn-icon-wrapper">
                  {face.icon}
                </div>
              </button>
            ))}
          </div>

          {/* Index Page/Slide Indicator Box */}
          <div className="services-slide-indicator">
            <span>{activeFace + 1}</span>
          </div>
        </div>

      </section>
    </div>
  );
}