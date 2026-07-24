"use client";

import React, { useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";
import { gsap } from "gsap";

export default function Hero({ revealed }: { revealed: boolean }) {
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const mediaFrameRef = useRef<HTMLDivElement>(null);
  const mediaImgRef = useRef<HTMLImageElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // Staggered cinematic entrance animation
  useEffect(() => {
    if (!revealed) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 1.2 }
      });

      // 1. Badge slide and fade
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, delay: 0.2 }
      );

      // 2. Headline lines reveal (slide-up)
      const lines = titleRef.current?.querySelectorAll(".title-line");
      if (lines && lines.length > 0) {
        tl.fromTo(
          lines,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, stagger: 0.15 },
          "<+0.2"
        );
      } else {
        tl.fromTo(
          titleRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0 },
          "<+0.2"
        );
      }

      // 3. Description reveal
      tl.fromTo(
        descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0 },
        "<+0.3"
      );

      // 4. CTA buttons reveal
      const ctaButtons = ctaRef.current?.querySelectorAll("a");
      if (ctaButtons && ctaButtons.length > 0) {
        tl.fromTo(
          ctaButtons,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, stagger: 0.1 },
          "<+0.2"
        );
      }

      // 5. Media frame clip-path slide reveal
      tl.to(
        mediaFrameRef.current,
        {
          opacity: 1,
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 1.6,
          ease: "power4.inOut"
        },
        "<+0.1"
      );

      // 6. Scroll indicator fade in
      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.0 },
        "<+0.8"
      );

      // 7. Slow float idle animation for the image inside the frame
      gsap.to(mediaImgRef.current, {
        x: "random(-6, 6)",
        y: "random(-6, 6)",
        scale: 1.04,
        rotation: "random(-0.5, 0.5)",
        duration: 8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        repeatRefresh: true
      });

    });

    return () => ctx.revert();
  }, [revealed]);

  return (
    <section id="home" className="hero-section">
      <div className="hero-editorial-column">
        {/* Badge */}
        <div ref={badgeRef} className="hero-badge" style={{ opacity: 0 }}>
          <Sparkles size={12} className="sparkle-icon" />
          <span>[ 01 — THE DIGITAL ARCHITECTURE ]</span>
        </div>

        {/* Title */}
        <h1 ref={titleRef} className="hero-title">
          <span className="title-line" style={{ display: "block", opacity: 0 }}>We architect</span>
          <span className="title-line hero-serif-italic" style={{ display: "block", opacity: 0 }}>high-performance</span>
          <span className="title-line" style={{ display: "block", opacity: 0 }}>digital systems.</span>
        </h1>

        {/* Subtitle / Description */}
        <p ref={descRef} className="hero-desc" style={{ opacity: 0 }}>
          We partner with ambitious enterprises to orchestrate premium software solutions,
          intelligent automation platforms, and global growth strategies that redefine industries.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="hero-cta-group">
          <a href="#contact" className="hero-btn-primary" style={{ opacity: 0 }}>
            Start Project <span className="arrow">→</span>
          </a>
          <a href="#about" className="hero-btn-secondary" style={{ opacity: 0 }}>
            Read Story
          </a>
        </div>
      </div>

      <div className="hero-media-column">
        {/* Frame with initial clip-path mask */}
        <div ref={mediaFrameRef} className="hero-media-frame" style={{ opacity: 0 }}>
          <img
            ref={mediaImgRef}
            src="/showcase_2.png"
            alt="Avhad Enterprises Digital Portfolio Preview"
            className="hero-media-img"
          />
        </div>
      </div>

      {/* Scroll indicator prompt */}
      <div ref={scrollIndicatorRef} className="hero-scroll-indicator" style={{ opacity: 0 }}>
        <div className="mouse-wheel"></div>
        <span>Scroll to Explore</span>
      </div>
    </section>
  );
}
