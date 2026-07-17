"use client";

import { useEffect, useRef } from "react";

export default function StudioTechSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Play video programmatically on mount to guarantee autoplay behaves correctly
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Autoplay blocked or video error:", err);
      });
    }
  }, []);

  return (
    <section className="studiotech-globe-section" id="global-footprint">
      <div className="studiotech-grid">
        
        {/* Left Column: Pre-rendered 3D Globe Loop with seamless bleed overlays */}
        <div className="company-intro-video-frame">
          <video
            ref={videoRef}
            aria-hidden="true"
            className="globe-video"
            disablePictureInPicture
            loop
            muted
            playsInline
            preload="auto"
            poster="https://promo-tech-store.vercel.app/awwwards/assets/videos/company-intro-poster.jpg"
            src="https://promo-tech-store.vercel.app/awwwards/assets/videos/company-intro-8s.mp4"
            tabIndex={-1}
          />
          {/* Exact overlay gradient blending with vertical/horizontal vectors and left blur */}
          <div aria-hidden="true" className="company-intro-video-fade"></div>
        </div>

        {/* Right Column: Premium Strategic Copy */}
        <div className="studiotech-content">
          <div className="studiotech-header-row">
            <p className="studiotech-eyebrow">ABOUT US</p>
            <a href="#about" className="studiotech-discover-link">
              DISCOVER THE COMPANY 
              <svg aria-hidden="true" className="link-arrow-svg" fill="none" viewBox="0 0 24 24">
                <path
                  d="M7 17 17 7M9 7h8v8"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.7"
                />
              </svg>
            </a>
          </div>

          <h2 className="studiotech-title">
            For over 15 years, Avhad Enterprises has brought technology where it is needed. Worldwide.
          </h2>

          <div className="studiotech-description">
            <p>
              Avhad Enterprises supports companies globally in architecting, engineering, and deploying custom software solutions, enterprise automation frameworks, and high-performance digital ecosystems. With a specialized technical team and a consolidated network of strategy nodes, we deliver fast, reliable solutions for complex digital transformation programs, legacy integrations, and next-generation AI adoption. The goal is to eliminate operational downtime and help every enterprise scale without limits.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
