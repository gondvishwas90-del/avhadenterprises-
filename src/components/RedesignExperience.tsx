"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sparkles, ChevronRight, Check, Shield, Zap, TrendingUp, Grid, Menu, Plus, ArrowUp } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TIMELINE_STEPS = [
  { time: "0.2s", label: "Typography Elevates" },
  { time: "0.3s", label: "Spacing Breathes" },
  { time: "0.4s", label: "Buttons Morph & Glow" },
  { time: "0.5s", label: "Images Upgrade to 3D" },
  { time: "0.6s", label: "Micro-animations Trigger" },
  { time: "0.7s", label: "Dashboard Emerges" },
  { time: "0.8s", label: "Delivery Completed" }
];

export default function RedesignExperience() {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverStep, setHoverStep] = useState(0);
  const [revealPos, setRevealPos] = useState({ x: 50, y: 50 }); // percentage based default
  const containerRef = useRef<HTMLDivElement>(null);
  const pulseIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // States
  const [themeColor, setThemeColor] = useState<"cyan" | "emerald" | "amber">("cyan");
  const [activeWordIndex, setActiveWordIndex] = useState<number | null>(null);

  // Derived State
  const userRotation = isHovered
    ? {
        x: (revealPos.y - 50) * 0.5,
        y: (revealPos.x - 50) * 0.5,
      }
    : { x: 0, y: 0 };

  // Mouse move handler for updating coordinates
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setRevealPos({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRevealPos({ x: 50, y: 50 });
  };

  // Timeline step descriptions trigger (kept for secondary scroll feedback)
  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = [];
    if (isHovered) {
      timeouts.push(setTimeout(() => setHoverStep(1), 100));
      timeouts.push(setTimeout(() => setHoverStep(2), 200));
      timeouts.push(setTimeout(() => setHoverStep(3), 300));
      timeouts.push(setTimeout(() => setHoverStep(4), 400));
      timeouts.push(setTimeout(() => setHoverStep(5), 500));
      timeouts.push(setTimeout(() => setHoverStep(6), 600));
      timeouts.push(setTimeout(() => setHoverStep(7), 700));
    } else {
      setHoverStep(0);
    }
    return () => {
      timeouts.forEach((t) => clearTimeout(t));
    };
  }, [isHovered]);

  // Telemetry coordinates idle drift (draws visitor attention)
  useEffect(() => {
    if (!isHovered) {
      let angle = 0;
      pulseIntervalRef.current = setInterval(() => {
        angle += 0.05;
        const x = 50 + Math.cos(angle) * 10;
        const y = 45 + Math.sin(angle) * 8;
        setRevealPos({ x, y });
      }, 50);
    } else {
      if (pulseIntervalRef.current) {
        clearInterval(pulseIntervalRef.current);
      }
    }
    return () => {
      if (pulseIntervalRef.current) {
        clearInterval(pulseIntervalRef.current);
      }
    };
  }, [isHovered]);

  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // GSAP Hover-triggered timeline for 3D Volumetric Explode
  useEffect(() => {
    const ordinaryLayer = document.querySelector(".layer-ordinary");
    const premiumLayer = document.querySelector(".layer-premium");
    const planeBack = document.querySelector(".plane-back");
    const planeMiddle = document.querySelector(".plane-middle");
    const planeFront = document.querySelector(".plane-front");
    const lasers = document.querySelectorAll(".laser-guide-line");
    const textChars = document.querySelectorAll(".reveal-text-char");
    const hudOverlay = document.querySelector(".pr-hud-overlay");
    const marquee = document.querySelector(".marquee-bar");

    if (isHovered) {
      if (tlRef.current) tlRef.current.kill();

      const tl = gsap.timeline();
      tlRef.current = tl;

      // 1. Fade out ordinary layout
      tl.to(ordinaryLayer, {
        opacity: 0,
        y: 20,
        duration: 0.4,
        ease: "power2.out"
      });

      // 2. Reveal premium layout
      tl.fromTo(premiumLayer,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 },
        "<+0.1"
      );

      // 3. Separate layers along Z axis (Explode)
      tl.to(planeBack, {
        transform: "translateZ(-25px)",
        duration: 0.6,
        ease: "power2.out"
      }, "<");

      tl.to(planeMiddle, {
        transform: "translateZ(0px)",
        duration: 0.6,
        ease: "power2.out"
      }, "<");

      tl.to(planeFront, {
        transform: "translateZ(25px)",
        duration: 0.6,
        ease: "power2.out"
      }, "<");

      // 4. Connect guide lines (lasers)
      tl.fromTo(lasers,
        { opacity: 0, scaleZ: 0 },
        { opacity: 0.6, scaleZ: 1, duration: 0.5, ease: "power2.out" },
        "<+0.2"
      );

      // 5. Reveal dynamic heading text masks
      tl.fromTo(textChars,
        { y: "110%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.4, stagger: 0.03, ease: "power3.out" },
        "<+0.1"
      );

      // 6. Telemetry HUD panel and marquee reveal
      tl.fromTo(hudOverlay,
        { opacity: 0, x: 10 },
        { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" },
        "<+0.2"
      );

      tl.fromTo(marquee,
        { opacity: 0, scaleY: 0 },
        { opacity: 1, scaleY: 1, duration: 0.4, ease: "power2.out" },
        "<"
      );
    } else {
      if (tlRef.current) tlRef.current.kill();

      const tl = gsap.timeline();
      tlRef.current = tl;

      // Retract planes back to flat
      tl.to([planeBack, planeMiddle, planeFront], {
        transform: "translateZ(0px)",
        duration: 0.4,
        ease: "power2.out"
      });

      // Hide lasers, HUD, and marquee
      tl.to([lasers, hudOverlay, marquee], {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out"
      }, "<");

      // Reset text chars
      tl.to(textChars, {
        y: "110%",
        opacity: 0,
        duration: 0.3
      }, "<");

      // Fade out premium, fade in ordinary
      tl.to(premiumLayer, {
        opacity: 0,
        duration: 0.3
      }, "<");

      tl.to(ordinaryLayer, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      }, "<+0.1");
    }

    return () => {
      if (tlRef.current) tlRef.current.kill();
    };
  }, [isHovered]);

  return (
    <section className="pr-section" id="premium-redesign">
      <div className="pr-backdrop-glow"></div>

      {/* Decorative organic leaf blur backdrops */}
      <div className="pr-deco-leaf l1"></div>
      <div className="pr-deco-leaf l2"></div>

      <div className="pr-container">
        {/* Section Header */}
        <div className="pr-header reveal-fade-up">
          <div className="pr-badge">
            <Sparkles size={12} className="pr-sparkle" />
            <span>STATE CHANGE ENGINE</span>
          </div>
          <h2 className="pr-title">
            Nothing is a Process. <br />
            <span className="text-cyan-glow">Everything is a State Change.</span>
          </h2>
          <p className="pr-subtitle">
            Hover over the phone screen to experience the magical transformation of a mobile business
            website from ordinary static components to a premium, high-conversion design.
          </p>

        </div>

        {/* The Interactive Phone Container */}
        <div className="pr-mockup-wrap">
          <div
            ref={containerRef}
            className={`pr-phone-shell ${isHovered ? "phone-active" : ""} step-${hoverStep} theme-${themeColor}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              ["--reveal-x" as any]: `${revealPos.x}%`,
              ["--reveal-y" as any]: `${revealPos.y}%`,
              ["--reveal-radius" as any]: isHovered ? "150%" : "0%",
              transform: isHovered 
                ? `translateY(-8px) rotateX(${userRotation.x}deg) rotateY(${userRotation.y}deg)` 
                : "translateY(0px) rotateX(0deg) rotateY(0deg)"
            }}
          >
            {/* Phone Hardware Shell */}
            <div className="pr-phone-hardware">
              <div className="pr-phone-notch"></div>
              <div className="pr-phone-buttons left-btn"></div>
              <div className="pr-phone-buttons right-btn"></div>
            </div>

            {/* Smartphone Display Screen */}
            <div className="pr-phone-screen">

              {/* Top Status Bar UI */}
              <div className="pr-screen-status-bar">
                <span className="status-time">9:41 AM</span>
                <div className="pr-screen-signals">
                  <div className="signal-dot filled"></div>
                  <div className="signal-dot filled"></div>
                  <div className="signal-dot filled"></div>
                  <div className="signal-dot"></div>
                  <span className="network-type">5G</span>
                </div>
              </div>

              {/* LAYER 1: The Ordinary Web Site (Base Layer) */}
              <div className="app-layer layer-ordinary">
                <div className="ord-header">
                  <span className="ord-logo">avhad enterprises</span>
                  <span className="ord-loc"><Menu size={14} /></span>
                </div>

                <div className="ord-content">
                  {/* Hero text */}
                  <div className="ord-hero">
                    <span className="ord-tag">Agency Site</span>
                    <h3 className="ord-hero-title">Business solutions & growth</h3>
                    <p className="ord-hero-desc">We build applications and help companies structure custom software development pipelines.</p>
                    <button className="ord-hero-btn">Learn More</button>
                  </div>

                  {/* Wireframe Placeholder Image */}
                  <div className="ord-image-placeholder">
                    <span>Static Image (Placeholder)</span>
                  </div>

                  {/* Service Cards Grid */}
                  <div className="ord-services">
                    <div className="ord-service-card">
                      <div className="ord-card-title">Web Development</div>
                      <p className="ord-card-desc">Boring form-based web layouts.</p>
                    </div>
                    <div className="ord-service-card">
                      <div className="ord-card-title">AI Automation</div>
                      <p className="ord-card-desc">Basic logic automation hooks.</p>
                    </div>
                  </div>
                </div>

                <div className="ord-footer">
                  <span>© 2026 Avhad. Ordinary Version.</span>
                </div>
              </div>

              {/* LAYER 2: The Premium Web Site (Overlay Masked Layer with preserve-3d) */}
              <div className="app-layer layer-premium">

                {/* 3D Exploded Planes Wrapper */}
                <div className="planes-container-3d">

                  {/* Connecting Laser Guidelines */}
                  <div className="laser-guide-line corner-tl"></div>
                  <div className="laser-guide-line corner-tr"></div>
                  <div className="laser-guide-line corner-bl"></div>
                  <div className="laser-guide-line corner-br"></div>

                  {/* PLANE 1: Back (Glows & Mesh Backdrop) */}
                  <div className="plane-3d plane-back">
                    <div className="mesh-grid-backdrop"></div>
                    <div className="ambient-glow cyan-spot"></div>
                    <div className="ambient-glow magenta-spot"></div>
                  </div>

                  {/* PLANE 2: Middle (Core brand widgets & typography) */}
                  <div className="plane-3d plane-middle">
                    <div className="claude-container">
                      <div className="prem-header">
                        <div className="prem-logo-area">
                          <svg viewBox="0 0 24 24" className="claude-flower-icon" fill="currentColor">
                            <rect x="3" y="3" width="7" height="7" rx="1" />
                            <rect x="14" y="3" width="7" height="7" rx="1" />
                            <rect x="3" y="14" width="7" height="7" rx="1" />
                            <rect x="14" y="14" width="7" height="7" rx="1" />
                          </svg>
                          <span className="prem-logo-text font-serif">aether.ops</span>
                        </div>
                        <div className="prem-header-right">
                          <span className="prem-status-dot"></span>
                          <span className="prem-status-text">active</span>
                        </div>
                      </div>

                      <div className="claude-chat-history">
                        {/* Premium Hero Copy */}
                        <div className="prem-hero-brand">
                          <div className="prem-badge-accent font-serif">( NEXT-GEN SYSTEM )</div>
                          <h3 className="prem-hero-title font-serif">
                            Capital, <br />
                            <span className="accent-glow-text">Optimized.</span>
                          </h3>
                          <p className="prem-hero-desc">
                            Automate treasury flows, configure corporate liquidity, and issue payment rails.
                          </p>
                        </div>

                        {/* Financial dashboard cards */}
                        <div className="claude-product-card">
                          <div className="product-item">
                            <div className="product-num">Y</div>
                            <span className="product-name font-serif">Treasury Yield (5.4% APY)</span>
                          </div>
                          <div className="product-item">
                            <div className="product-num">F</div>
                            <span className="product-name font-serif">Weekly Volume (₹48.6 Lakhs)</span>
                          </div>
                        </div>

                        {/* CTA button */}
                        <button className="prem-hero-btn">
                          <span className="btn-txt">Launch Platform</span>
                          <ChevronRight size={10} strokeWidth={3} className="ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* PLANE 3: Front (Active Interface & Telemetry Controls) */}
                  <div className="plane-3d plane-front">

                    {/* Bottom Command Search Bar */}
                    <div className="claude-input-bar">
                      <div className="input-actions-left">
                        <Plus size={10} className="header-icon" />
                      </div>
                      <span className="input-placeholder">Search capital operations...</span>
                      <button className={`input-send-btn ${themeColor}`}>
                        <ArrowUp size={10} strokeWidth={3} fill="currentColor" />
                      </button>
                    </div>

                    {/* Interactive Keywords selector */}
                    <div className="interactive-keywords-grid">
                      <div className="keyword-col">
                        <div
                          className={`keyword-item ${activeWordIndex === 0 ? "active" : ""}`}
                          onMouseEnter={() => setActiveWordIndex(0)}
                          onMouseLeave={() => setActiveWordIndex(null)}
                        >
                          [ Smart Treasury ]
                        </div>
                        <div
                          className={`keyword-item ${activeWordIndex === 1 ? "active" : ""}`}
                          onMouseEnter={() => setActiveWordIndex(1)}
                          onMouseLeave={() => setActiveWordIndex(null)}
                        >
                          [ Payouts API ]
                        </div>
                      </div>
                      <div className="keyword-col right-align">
                        <div
                          className={`keyword-item ${activeWordIndex === 2 ? "active" : ""}`}
                          onMouseEnter={() => setActiveWordIndex(2)}
                          onMouseLeave={() => setActiveWordIndex(null)}
                        >
                          [ Capital Rails ]
                        </div>
                        <div
                          className={`keyword-item ${activeWordIndex === 3 ? "active" : ""}`}
                          onMouseEnter={() => setActiveWordIndex(3)}
                          onMouseLeave={() => setActiveWordIndex(null)}
                        >
                          [ Liquid Yields ]
                        </div>
                      </div>
                    </div>

                    {/* Theme selector portal */}
                    <div className="client-demo-controls">
                      <span className="ctrl-label">( Theme Core )</span>
                      <div className="color-selectors">
                        <button
                          onClick={(e) => { e.stopPropagation(); setThemeColor("cyan"); }}
                          className={`color-dot cyan ${themeColor === "cyan" ? "active" : ""}`}
                        />
                        <button
                          onClick={(e) => { e.stopPropagation(); setThemeColor("emerald"); }}
                          className={`color-dot emerald ${themeColor === "emerald" ? "active" : ""}`}
                        />
                        <button
                          onClick={(e) => { e.stopPropagation(); setThemeColor("amber"); }}
                          className={`color-dot amber ${themeColor === "amber" ? "active" : ""}`}
                        />
                      </div>
                    </div>
                  </div>

                </div>

              </div>

              {/* 0.7s: Sleek performance dashboard overlay */}
              <div className="pr-hud-overlay">
                <div className="hud-header">
                  <TrendingUp size={10} className="hud-icon" />
                  <span>CORE TELEMETRY</span>
                </div>
                <div className="hud-metrics">
                  <div className="hud-metric-item">
                    <span className="metric-lbl">Active Layers</span>
                    <span className="metric-val text-green">3 planes</span>
                  </div>
                  <div className="hud-metric-item">
                    <span className="metric-lbl">Angle X/Y</span>
                    <span className="metric-val text-green">
                      {userRotation.x.toFixed(0)}&deg; / {userRotation.y.toFixed(0)}&deg;
                    </span>
                  </div>
                  <div className="hud-metric-item">
                    <span className="metric-lbl">Status</span>
                    <span className="metric-val text-cyan">
                      EXPLODED
                    </span>
                  </div>
                  <div className="hud-metric-item">
                    <span className="metric-lbl">Rendering</span>
                    <span className="metric-val text-cyan">60fps</span>
                  </div>
                </div>
              </div>

            </div> {/* Close pr-phone-screen */}
            
            {/* Reflective glass sheen layer */}
            <div className="phone-glass-reflection"></div>

            {/* Bottom Home Indicator Bar */}
            <div className="pr-phone-home-indicator"></div>
          </div> {/* Close pr-phone-shell */}

          {/* System 2: Living Workspace Underneath/Behind the Phone */}
          <div 
            className="workspace-underlay"
            style={{
              transform: isHovered
                ? `rotateX(${userRotation.x * 0.45}deg) rotateY(${userRotation.y * 0.45}deg)`
                : "rotateX(0deg) rotateY(0deg)"
            }}
          >
            {/* Dynamic Grid Background with Spotlight */}
            <div className="workspace-grid-bg"></div>

            {/* SVG Interactive Laser Connection Lines */}
            <svg className="workspace-svg-canvas">
              <defs>
                <linearGradient id="laser-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="50%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
                <linearGradient id="chart-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
                <linearGradient id="chart-area-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
              </defs>
              
              {/* Lines from center coordinates towards cards */}
              {/* Left Card connections */}
              <path d="M 160,325 Q 100,280 -120,100" className="workspace-connection-line" />
              <path d="M 160,325 Q 100,280 -120,100" className="workspace-connection-glow" />
              <circle cx="-120" cy="100" r="3" className="workspace-node-junction j-left" />
              
              {/* Right Card connections */}
              <path d="M 160,325 Q 220,340 460,340" className="workspace-connection-line" />
              <path d="M 160,325 Q 220,340 460,340" className="workspace-connection-glow" />
              <circle cx="460" cy="340" r="3" className="workspace-node-junction j-right" />
              
              {/* Bottom Card connections */}
              <path d="M 160,325 Q 120,400 -80,480" className="workspace-connection-line" />
              <path d="M 160,325 Q 120,400 -80,480" className="workspace-connection-glow" />
              <circle cx="-80" cy="480" r="3" className="workspace-node-junction j-bottom" />
            </svg>

            {/* Left Card: AI Optimization Logs */}
            <div className="workspace-card c-left">
              <div className="ws-card-header">
                <span>Core.AI Ops</span>
                <span className="ws-node-dot" />
              </div>
              <div className="ws-card-title">aether.run</div>
              <div className="ws-terminal-body">
                <div>&gt; <span className="ws-term-trigger">SYSTEM_INIT</span> <span className="ws-term-success">OK</span></div>
                <div>&gt; YIELD_LOCK ... <span className="ws-term-cyan">5.4%</span></div>
                <div>&gt; LEDGER_CHECK <span className="ws-term-success">COMPLETED</span></div>
                <div>&gt; OPTIMIZING_LIQ ... <span className="ws-term-cyan">₹48.6L</span></div>
              </div>
            </div>

            {/* Right Card: Treasury Analytics (SVG Chart) */}
            <div className="workspace-card c-right">
              <div className="ws-card-header">
                <span>Treasury Index</span>
                <span className="ws-node-dot" />
              </div>
              <div className="ws-card-title">₹48,60,000.00</div>
              <div className="ws-card-desc">Weekly Volume optimization logs</div>
              <div className="ws-chart-wrap">
                <svg className="ws-chart-svg">
                  {/* Grid Lines */}
                  <line x1="0%" y1="20" x2="100%" y2="20" className="ws-chart-grid" />
                  <line x1="0%" y1="40" x2="100%" y2="40" className="ws-chart-grid" />
                  {/* Area fill */}
                  <path d="M 0,55 L 30,45 L 70,50 L 110,25 L 150,30 L 190,15 L 210,15 L 210,60 L 0,60 Z" className="ws-chart-area" />
                  {/* Chart path line */}
                  <path d="M 0,55 L 30,45 L 70,50 L 110,25 L 150,30 L 190,15 L 210,15" className="ws-chart-line" />
                  {/* Active node dot */}
                  <circle cx="210" cy="15" r="4.5" className="ws-chart-dot" />
                </svg>
              </div>
            </div>

            {/* Bottom Card: Compliance Status */}
            <div className="workspace-card c-bottom">
              <div className="ws-card-header">
                <span>Compliance Core</span>
                <span className="ws-node-dot" />
              </div>
              
              {/* Concentric rotating security shield badge */}
              <div className="ws-security-badge-wrap">
                <svg className="ws-security-svg" viewBox="0 0 50 50">
                  <circle cx="25" cy="25" r="22" className="ws-sec-ring-outer" />
                  <circle cx="25" cy="25" r="18" className="ws-sec-ring-inner" />
                  <path d="M 25,14 L 33,17 L 33,28 C 33,34 29,38 25,40 C 21,38 17,34 17,28 L 17,17 Z" className="ws-sec-shield" />
                </svg>
              </div>

              <div className="ws-checklist">
                <div className="ws-check-item">
                  <div className="ws-check-box" />
                  <span>PCI Level 1 Standard</span>
                </div>
                <div className="ws-check-item">
                  <div className="ws-check-box" />
                  <span>AES-256 Vault Link</span>
                </div>
              </div>
            </div>

          </div>
        </div> {/* Close pr-mockup-wrap */}

        {/* Hover timeline step description panel below the phone */}
        <div className="pr-timeline-widget">
          <div className="pr-timeline-widget-scroll">
            <div className="timeline-track-container">
              {/* Horizontal line track */}
              <div className="timeline-progress-bar">
                <div 
                  className="timeline-progress-fill" 
                  style={{ width: `${Math.min(100, Math.max(0, ((hoverStep - 1) / 6) * 100))}%` }}
                />
              </div>
              
              {/* Interactive steps */}
              {TIMELINE_STEPS.map((step, idx) => {
                const stepNum = idx + 1;
                const isActive = hoverStep >= stepNum;
                const isCompleted = hoverStep > stepNum;
                
                return (
                  <div 
                    key={idx} 
                    className={`timeline-step-item ${isActive ? "active" : ""} ${isCompleted ? "completed" : ""}`}
                  >
                    <div className="timeline-node">
                      <div className="timeline-node-inner" />
                    </div>
                    <div className="timeline-step-content">
                      <span className="timeline-time">{step.time}</span>
                      <span className="timeline-label">{step.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
