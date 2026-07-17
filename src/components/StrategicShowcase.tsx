"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";

const leftItems = [
  { en: "Core-Site", zh: "(CORE WEBSITE)", image: "/showcase_1.png" },
  { en: "Gen-AI Visual", zh: "(GENERATIVE AI VISION)", image: "/showcase_2.png" },
  { en: "Motion Flow", zh: "(DYNAMIC FLOW)", image: "/showcase_3.png" },
  { en: "WebGL Realm", zh: "(WEBGL REALM)", image: "/showcase_4.png" },
  { en: "3D Matrix", zh: "(3D MATRIX)", image: "/showcase_1.png" },
  { en: "Interaction", zh: "(INTERACTION)", image: "/showcase_2.png" },
  { en: "Pixel Perfect", zh: "(PIXEL PERFECT)", image: "/showcase_3.png" },
  { en: "Logic Build", zh: "(LOGIC BUILD)", image: "/showcase_4.png" },
  { en: "Fluid UI", zh: "(FLUID UI)", image: "/showcase_1.png" },
  { en: "Aero Design", zh: "(AERO DESIGN)", image: "/showcase_2.png" },
  { en: "Pure Code", zh: "(PURE CODE)", image: "/showcase_3.png" },
  { en: "Digital Art", zh: "(DIGITAL ART)", image: "/showcase_4.png" }
];

const rightItems = [
  { en: "Strategy", zh: "(STRATEGY)" },
  { en: "Design", zh: "(DESIGN)" },
  { en: "Tech", zh: "(TECHNOLOGY)" },
  { en: "Creative", zh: "(CREATIVE)" },
  { en: "Motion", zh: "(MOTION)" },
  { en: "Brand", zh: "(BRAND)" },
  { en: "Future", zh: "(FUTURE)" },
  { en: "Vision", zh: "(VISION)" },
  { en: "System", zh: "(SYSTEM)" },
  { en: "Labs", zh: "(LABS)" },
  { en: "Core", zh: "(CORE)" },
  { en: "Craft", zh: "(CRAFT)" }
];

export default function StrategicShowcase() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLImageElement>(null);

  const [activeImage, setActiveImage] = useState(leftItems[0].image);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    const sticky = stickyRef.current;
    const wrapper = wrapperRef.current;
    const leftCol = leftColRef.current;
    const rightCol = rightColRef.current;
    if (!track || !sticky || !wrapper || !leftCol || !rightCol) return;

    // Cache metrics to prevent layout thrashing
    let trackHeight = track.offsetHeight;
    let windowHeight = window.innerHeight;
    let wrapperHeight = wrapper.offsetHeight;
    let leftWidth = leftCol.offsetWidth;
    let rightWidth = rightCol.offsetWidth;

    // Left and right items text arrays
    const leftTexts = Array.from(leftCol.querySelectorAll(".animated-text")) as HTMLElement[];
    const rightTexts = Array.from(rightCol.querySelectorAll(".animated-text")) as HTMLElement[];

    // Calculate maximum widths for X bounds
    const maxLeftTextWidth = Math.max(...leftTexts.map((t) => t.offsetWidth));
    const maxRightTextWidth = Math.max(...rightTexts.map((t) => t.offsetWidth));

    let rangeL = { min: 0, max: Math.max(0, leftWidth - maxLeftTextWidth) };
    let rangeR = { min: 0, max: Math.max(0, rightWidth - maxRightTextWidth) };

    const handleResize = () => {
      trackHeight = track.offsetHeight;
      windowHeight = window.innerHeight;
      wrapperHeight = wrapper.offsetHeight;
      leftWidth = leftCol.offsetWidth;
      rightWidth = rightCol.offsetWidth;
      rangeL = { min: 0, max: Math.max(0, leftWidth - maxLeftTextWidth) };
      rangeR = { min: 0, max: Math.max(0, rightWidth - maxRightTextWidth) };
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Animation values
    let targetProgress = 0;
    let currentProgress = 0;
    const WAVE_NUM = 12; // Frequency of sine wave
    const WAVE_SPD = 0.8; // Phase speed

    const waveX = (index: number, progress: number, range: { min: number; max: number }) => {
      const phase = WAVE_NUM * index + WAVE_SPD * progress * Math.PI * 2 - Math.PI / 2;
      // Map sin (-1 to 1) to range.min to range.max
      return range.min + ((Math.sin(phase) + 1) / 2) * (range.max - range.min);
    };

    const closestToCenterIndex = (progress: number, total: number) => {
      if (total === 0) return 0;
      const index = Math.round(progress * (total - 1));
      return Math.max(0, Math.min(total - 1, index));
    };

    let animationFrameId: number;
    let lastFocused = -1;

    const tick = () => {
      const rect = track.getBoundingClientRect();
      const scrollable = rect.height - windowHeight;
      if (scrollable > 0) {
        // Calculate progress from 0 to 1 inside the scroll boundary
        const rawProgress = -rect.top / scrollable;
        targetProgress = Math.max(0, Math.min(rawProgress, 1));
      }

      // Smooth interpolation
      currentProgress += (targetProgress - currentProgress) * 0.1;

      // Vertical translation of wrapper relative to horizontal center line
      const verticalOffset = -wrapperHeight * currentProgress;
      wrapper.style.transform = `translate3d(0px, ${verticalOffset}px, 0px)`;

      // Determine which element is currently focused (closest to vertical center line)
      const totalItems = leftTexts.length;
      const focusedIndex = closestToCenterIndex(currentProgress, totalItems);

      // Render horizontal wave translation
      leftTexts.forEach((t, i) => {
        const xVal = waveX(i, currentProgress, rangeL);
        t.style.transform = `translate3d(${xVal}px, 0px, 0px)`;
        const isFocused = i === focusedIndex;
        if (isFocused !== t.classList.contains("focused")) {
          t.classList.toggle("focused", isFocused);
        }
      });

      rightTexts.forEach((t, i) => {
        const xVal = -waveX(i, currentProgress, rangeR);
        t.style.transform = `translate3d(${xVal}px, 0px, 0px)`;
        const isFocused = i === focusedIndex;
        if (isFocused !== t.classList.contains("focused")) {
          t.classList.toggle("focused", isFocused);
        }
      });

      // Update focused index and transition center image
      if (focusedIndex !== lastFocused) {
        setActiveIndex(focusedIndex);
        const imageSrc = leftItems[focusedIndex]?.image;
        if (imageSrc) {
          setActiveImage(imageSrc);
        }
        lastFocused = focusedIndex;
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section ref={trackRef} className="strategic-showcase-track">
      <div ref={stickyRef} className="strategic-showcase-sticky">
        {/* Editorial Subtitle headers */}
        <div className="showcase-top-overlay">
          <h3 className="showcase-chapter-heading">
            (UPHOLDING THE CORE OF AESTHETICS, DEFINING THE DIGITAL LANDING POINT)
          </h3>
        </div>

        {/* Side subheadings overlays matching Nudot style */}
        <div className="showcase-side-overlays">
          <div className="side-overlay-left">
            <span>BRAND IDENTITY</span>
            <span>VISUAL STRATEGY</span>
            <span>CORE CREATIVITY</span>
          </div>
          <div className="side-overlay-right">
            <span>MOTION DESIGN</span>
            <span>MICRO INTERACTIONS</span>
            <span>TYPE SYSTEM</span>
            <span>CREATIVE DIRECTION</span>
            <span>DESIGN LANGUAGE</span>
          </div>
        </div>

        {/* Horizontal slice grid line */}
        <div className="showcase-horizon-line"></div>

        {/* Absolute center visual card */}
        <div className="showcase-center-wrapper">
          <div className="showcase-card-border-glow"></div>
          <div className="showcase-center-card">
            <div className="card-glass-noise"></div>
            {leftItems.map((item, idx) => (
              <img
                key={idx}
                src={item.image}
                alt=""
                className={`showcase-transition-image ${activeImage === item.image && activeIndex === idx ? "active" : ""}`}
              />
            ))}
          </div>
          {/* Centered Overlay Label matching Nudot style */}
          <div className="showcase-center-label">
            (Brand <span className="highlight">Strategy</span> Expert)
          </div>
        </div>

        {/* Dual columns wave wrapper */}
        <div ref={wrapperRef} className="showcase-dual-wave-wrapper">
          <div ref={leftColRef} className="wave-column wave-column-left">
            {leftItems.map((item, index) => (
              <div key={index} className="animated-text" data-image={item.image}>
                <span className="flip-wrap">
                  <span className="at-en">{item.en}</span>
                  <span className="at-zh">{item.zh}</span>
                </span>
              </div>
            ))}
          </div>

          <div ref={rightColRef} className="wave-column wave-column-right">
            {rightItems.map((item, index) => (
              <div key={index} className="animated-text">
                <span className="flip-wrap">
                  <span className="at-en">{item.en}</span>
                  <span className="at-zh">{item.zh}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Left Dotted Logo (Forms "A" for Avhad Enterprises) */}
        <div className="showcase-dotted-logo">
          <svg width="60" height="75" viewBox="0 0 60 75" fill="none">
            {/* Left column of N */}
            <circle cx="12" cy="12" r="4.5" fill="white" className="dot-node dot-1" />
            <circle cx="12" cy="25" r="4.5" fill="white" className="dot-node dot-2" />
            <circle cx="12" cy="38" r="4.5" fill="white" className="dot-node dot-3" />
            <circle cx="12" cy="51" r="4.5" fill="white" className="dot-node dot-4" />
            <circle cx="12" cy="64" r="4.5" fill="white" className="dot-node dot-5" />

            {/* Diagonal of N */}
            <circle cx="24" cy="25" r="4.5" fill="white" className="dot-node dot-6" />
            <circle cx="36" cy="38" r="4.5" fill="white" className="dot-node dot-7" />
            <circle cx="48" cy="51" r="4.5" fill="white" className="dot-node dot-8" />

            {/* Right column of N */}
            <circle cx="48" cy="12" r="4.5" fill="white" className="dot-node dot-9" />
            <circle cx="48" cy="25" r="4.5" fill="white" className="dot-node dot-10" />
            <circle cx="48" cy="38" r="4.5" fill="white" className="dot-node dot-11" />
            <circle cx="48" cy="51" r="4.5" fill="white" className="dot-node dot-12" />
            <circle cx="48" cy="64" r="4.5" fill="white" className="dot-node dot-13" />
          </svg>
        </div>

        {/* Dotted Crawling Sine Indicator (Right Side) */}
        <div className="showcase-dotted-indicator">
          <span className="indicator-label">DATA STREAM</span>
          <svg width="120" height="16" viewBox="0 0 120 16" fill="none">
            <path
              d="M 5,8 Q 20,2 35,8 T 65,8 T 95,8 T 115,8"
              stroke="white"
              strokeWidth="2"
              strokeDasharray="2 6"
              className="crawling-dot-path"
            />
          </svg>
        </div>

        {/* Scroll Indicator (Bottom Center) */}
        <div className="showcase-scroll-indicator">
          <div className="scroll-arrow-block">
            <div className="arrow-glow"></div>
            <div className="double-chevron">
              <span className="chevron-segment"></span>
              <span className="chevron-segment"></span>
            </div>
            <span className="scroll-arrow-text">DOWN</span>
          </div>
        </div>
      </div>
    </section>
  );
}
