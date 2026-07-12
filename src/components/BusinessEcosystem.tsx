"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Globe,
  Smartphone,
  Target,
  Zap,
  TrendingUp,
  Palette,
  Sparkles,
  ShoppingBag,
  ArrowLeft,
  ArrowRight,
  Check
} from "lucide-react";

interface Service {
  title: string;
  num: string;
  desc: string;
  features: string[];
  icon: React.ReactNode;
  preview: React.ReactNode;
  destinationId: string;
}

export default function BusinessEcosystem() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [unlockedServices, setUnlockedServices] = useState<number[]>([0]); // Initial Website is unlocked
  const [isBuyActive, setIsBuyActive] = useState(false);
  const [flyingTile, setFlyingTile] = useState<{
    active: boolean;
    x: number;
    y: number;
    targetX: number;
    targetY: number;
    icon: React.ReactNode;
  } | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const services: Service[] = [
    {
      title: "Website Development",
      num: "01 / 08",
      desc: "High-performance websites that attract, engage and convert.",
      features: [
        "Modern & Responsive Design",
        "SEO Optimized",
        "Lightning Fast Performance",
        "Secure Architecture"
      ],
      icon: <Globe size={20} />,
      destinationId: "node-1",
      preview: (
        <div style={{ width: "90%", height: "82%", background: "#fff", borderRadius: "8px", overflow: "hidden", display: "flex", flexDirection: "column", border: "1px solid #cbd5e1" }}>
          <div style={{ background: "#f1f3f5", height: "8px", width: "100%", display: "flex", gap: "2px", padding: "2px 4px" }}>
            <div style={{ width: "2px", height: "2px", borderRadius: "50%", background: "#ef4444" }}></div>
            <div style={{ width: "2px", height: "2px", borderRadius: "50%", background: "#eab308" }}></div>
            <div style={{ width: "2px", height: "2px", borderRadius: "50%", background: "#22c55e" }}></div>
          </div>
          <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", padding: "6px", gap: "2px", background: "linear-gradient(135deg, #09090b 0%, #1e1b4b 100%)", color: "#fff" }}>
            <span style={{ fontSize: "0.28rem", fontWeight: "bold" }}>Building Digital Experiences</span>
            <div style={{ height: "1px", background: "rgba(255,255,255,0.1)" }}></div>
            <div style={{ flexGrow: 1, background: "rgba(255,255,255,0.03)", borderRadius: "3px" }}></div>
          </div>
        </div>
      )
    },
    {
      title: "App Development",
      num: "02 / 08",
      desc: "Custom iOS and Android native app platform solutions.",
      features: [
        "Native Swift & Kotlin Design",
        "Fluid Mobile User Interfaces",
        "Biometric Security Logins",
        "Offline-First Ingestions"
      ],
      icon: <Smartphone size={20} />,
      destinationId: "node-2",
      preview: (
        <div style={{ width: "65px", height: "95px", background: "#09090b", border: "2px solid #27272a", borderRadius: "8px", padding: "2px", display: "flex", flexDirection: "column", gap: "2px" }}>
          <div style={{ background: "#fff", flexGrow: 1, borderRadius: "6px", padding: "4px" }}>
            <span style={{ fontSize: "0.28rem", color: "#000", fontWeight: "bold" }}>App active</span>
            <div style={{ height: "30px", background: "#f1f3f5", borderRadius: "3px", marginTop: "3px" }}></div>
          </div>
        </div>
      )
    },
    {
      title: "E-commerce",
      num: "03 / 08",
      desc: "Frictionless checkout pipelines that grow sales.",
      features: [
        "1-Click Secure Pay Modules",
        "Global Invoicing Tax Compliance",
        "Real-Time Inventory Syncs",
        "Cart Recovery Notifications"
      ],
      icon: <ShoppingBag size={20} />,
      destinationId: "node-3",
      preview: (
        <div style={{ padding: "6px", background: "#fff", border: "1px solid #cbd5e1", width: "90%", height: "82%", borderRadius: "8px", color: "#111", display: "flex", flexDirection: "column", gap: "2px" }}>
          <span style={{ fontSize: "0.32rem", fontWeight: "bold" }}>Invoicing Summary</span>
          <div style={{ background: "#2563eb", height: "8px", borderRadius: "2px", marginTop: "4px" }}></div>
        </div>
      )
    },
    {
      title: "CRM Solutions",
      num: "04 / 08",
      desc: "Centralized client and contact pipelines tracking.",
      features: [
        "Pipeline Stage Automations",
        "Lead Scoring Engines",
        "Omnichannel Customer Inboxes",
        "Historical Activity Timelines"
      ],
      icon: <Target size={20} />,
      destinationId: "node-4",
      preview: (
        <div style={{ padding: "6px", background: "#fff", border: "1px solid #cbd5e1", width: "90%", height: "82%", borderRadius: "8px", color: "#111", display: "flex", flexDirection: "column", gap: "2px" }}>
          <span style={{ fontSize: "0.28rem", color: "#8e8e93" }}>CRM Hub</span>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px", flexGrow: 1 }}>
            <div style={{ background: "#2563eb", borderRadius: "2px" }}></div>
            <div style={{ background: "#f1f3f5", borderRadius: "2px" }}></div>
          </div>
        </div>
      )
    },
    {
      title: "Automation",
      num: "05 / 08",
      desc: "Trigger-action operational workflow integrations.",
      features: [
        "Webhook Log Ingestions",
        "Trigger Actions Mapper",
        "Real-time PDF Invoicing",
        "Automated Notifications Alerts"
      ],
      icon: <Zap size={20} />,
      destinationId: "node-6",
      preview: (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", width: "90%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
            <div style={{ padding: "2px 4px", background: "#fff", border: "1px solid #cbd5e1", borderRadius: "3px", fontSize: "0.32rem" }}>Trigger</div>
            <div style={{ width: "8px", height: "1px", background: "#cbd5e1" }}></div>
            <div style={{ padding: "2px 4px", background: "#2563eb", color: "#fff", borderRadius: "3px", fontSize: "0.32rem" }}>Sync</div>
          </div>
        </div>
      )
    },
    {
      title: "Growth Marketing",
      num: "06 / 08",
      desc: "Acquisition campaigns attribution maps.",
      features: [
        "A/B Campaigns Analytics",
        "Funnel Tracking Charts",
        "Revenue Attributions",
        "Audience Retargeting Nodes"
      ],
      icon: <TrendingUp size={20} />,
      destinationId: "node-5",
      preview: (
        <div style={{ padding: "6px", background: "#fff", border: "1px solid #cbd5e1", width: "90%", height: "82%", borderRadius: "8px", color: "#111", display: "flex", flexDirection: "column", gap: "2px" }}>
          <svg viewBox="0 0 100 25" style={{ width: "100%", height: "40px" }}>
            <path d="M 0,22 C 25,18 50,12 75,4 L 100,0 L 100,25 L 0,25 Z" fill="rgba(37,99,235,0.06)" stroke="#2563eb" strokeWidth="1.5" />
          </svg>
        </div>
      )
    },
    {
      title: "Branding & Design",
      num: "07 / 08",
      desc: "Corporate brand guidelines identity assets.",
      features: [
        "Unified Logo Typography",
        "Brand Color Palettes",
        "Social Guidelines Templates",
        "Brand Design Consistency"
      ],
      icon: <Palette size={20} />,
      destinationId: "node-7",
      preview: (
        <div style={{ display: "flex", flexDirection: "column", gap: "3px", width: "90%", color: "#111" }}>
          <div style={{ display: "flex", gap: "3px", justifyContent: "center" }}>
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#2563eb" }}></div>
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#18181b" }}></div>
          </div>
          <div style={{ border: "1px solid #e2e8f0", padding: "3px", borderRadius: "4px", background: "#fff", textAlign: "center", fontSize: "0.5rem", fontWeight: "bold" }}>
            BRAND
          </div>
        </div>
      )
    },
    {
      title: "AI Solutions",
      num: "08 / 08",
      desc: "Cognitive text LLM chatbot assistant nodes.",
      features: [
        "Custom LLM Agent Training",
        "Vector Semantic Databases",
        "Strict Data Security compliance",
        "Autonomous Decision Mappers"
      ],
      icon: <Sparkles size={20} />,
      destinationId: "node-8",
      preview: (
        <div style={{ padding: "6px", background: "#fff", border: "1px solid #cbd5e1", width: "90%", height: "82%", borderRadius: "8px", color: "#111", display: "flex", flexDirection: "column", gap: "2px" }}>
          <div style={{ background: "#f1f3f5", borderRadius: "4px", padding: "2px", fontSize: "0.28rem" }}>
            AI Engine running.
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (isBuyActive) return;
    setActiveIndex((prev) => (prev + 1) % services.length);
  };

  const handlePrev = () => {
    if (isBuyActive) return;
    setActiveIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  const selectIndex = (idx: number) => {
    if (isBuyActive) return;
    setActiveIndex(idx);
  };

  // Flying tile transition sequence
  const buyProduct = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isBuyActive) return;
    setIsBuyActive(true);

    const buttonRect = e.currentTarget.getBoundingClientRect();
    const destinationEl = document.getElementById(services[activeIndex].destinationId);

    if (!destinationEl) {
      setUnlockedServices(prev => prev.includes(activeIndex) ? prev : [...prev, activeIndex]);
      setIsBuyActive(false);
      return;
    }

    const destRect = destinationEl.getBoundingClientRect();

    setFlyingTile({
      active: true,
      x: buttonRect.left + buttonRect.width / 2 - 24,
      y: buttonRect.top + buttonRect.height / 2 - 24,
      targetX: destRect.left + destRect.width / 2 - 24,
      targetY: destRect.top + destRect.height / 2 - 24,
      icon: services[activeIndex].icon
    });

    // Phase 2: fly tile smoothly
    timerRef.current = setTimeout(() => {
      setFlyingTile(prev => {
        if (!prev) return null;
        return {
          ...prev,
          x: prev.targetX,
          y: prev.targetY
        };
      });

      // Phase 3: integrate and permanently enrich
      timerRef.current = setTimeout(() => {
        setUnlockedServices(prev => {
          const nextState = prev.includes(activeIndex) ? prev : [...prev, activeIndex];

          if (nextState.length < services.length) {
            const nextLocked = services.findIndex((_, idx) => !nextState.includes(idx));
            if (nextLocked !== -1) {
              setActiveIndex(nextLocked);
            }
          }
          return nextState;
        });

        setFlyingTile(null);
        setIsBuyActive(false);
      }, 500);
    }, 50);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const isUnlocked = (idx: number) => unlockedServices.includes(idx);
  const isEcosystemUnlocked = unlockedServices.length === services.length;

  return (
    <section ref={sectionRef} id="ecosystem" className="ecosystem-section">
      <div className="ecosystem-container">

        {/* COLUMN 1: Left Narrative Introduction */}
        <div className="ecosystem-left">
          <span className="ecosystem-eyebrow">Digital Ecosystems That Grow Businesses ●</span>
          <h2>
            You choose<br />
            the service.<br />
            <span className="text-blue">We build the<br />future around it.</span>
          </h2>
          <p>
            Every service you choose becomes part of a connected digital ecosystem
            designed to automate, optimize and scale your business operations.
          </p>

          <div className="ecosystem-value-list">
            <div className="ecosystem-value-item">
              <div className="ecosystem-value-icon-box">
                <Target size={16} />
              </div>
              <div className="ecosystem-value-details">
                <span className="ecosystem-value-title">Strategic by Design</span>
                <span className="ecosystem-value-desc">Solutions built around your business goals.</span>
              </div>
            </div>

            <div className="ecosystem-value-item">
              <div className="ecosystem-value-icon-box">
                <Zap size={16} />
              </div>
              <div className="ecosystem-value-details">
                <span className="ecosystem-value-title">Seamless Integration</span>
                <span className="ecosystem-value-desc">Everything connects. Nothing works in isolation.</span>
              </div>
            </div>

            <div className="ecosystem-value-item">
              <div className="ecosystem-value-icon-box">
                <TrendingUp size={16} />
              </div>
              <div className="ecosystem-value-details">
                <span className="ecosystem-value-title">Built for Scale</span>
                <span className="ecosystem-value-desc">Future-ready systems that grow with your business.</span>
              </div>
            </div>
          </div>

          <a href="#contact" className="ecosystem-left-cta">
            Explore All Services ➔
          </a>
        </div>

        {/* COLUMN 2: Center Service Slider Card */}
        <div className="ecosystem-card-wrapper">
          <button
            className="ecard-side-arrow prev"
            onClick={handlePrev}
            disabled={isBuyActive}
            aria-label="Previous service"
          >
            <ArrowLeft size={14} strokeWidth={3} />
          </button>

          <div ref={cardRef} className="ecosystem-card">
            <div className="ecard-header">
              <div className="ecard-icon-box">
                {services[activeIndex].icon}
              </div>
              <span className="ecard-number">{services[activeIndex].num}</span>
            </div>

            <div className="ecard-body">
              <h3>{services[activeIndex].title}</h3>
              <p className="ecard-desc">{services[activeIndex].desc}</p>

              <div className="ecard-features">
                {services[activeIndex].features.map((feat, idx) => (
                  <div key={idx} className="ecard-feature-item">
                    <span className="ecard-feature-check">✓</span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="ecard-preview-area">
              {services[activeIndex].preview}
            </div>

            <div>
              <button
                className="ecard-buy-btn"
                onClick={buyProduct}
                disabled={isBuyActive || isUnlocked(activeIndex)}
              >
                {isUnlocked(activeIndex) ? (
                  <>
                    <Check size={14} />
                    <span>Unlocked & Active</span>
                  </>
                ) : isBuyActive ? (
                  <span>Integrating Module...</span>
                ) : (
                  <>
                    <ShoppingBag size={14} />
                    <span>Buy Product</span>
                  </>
                )}
              </button>

              <div className="ecard-dots">
                {services.map((_, idx) => (
                  <div
                    key={idx}
                    className={`ecard-dot ${activeIndex === idx ? "active" : ""}`}
                    onClick={() => selectIndex(idx)}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          <button
            className="ecard-side-arrow next"
            onClick={handleNext}
            disabled={isBuyActive}
            aria-label="Next service"
          >
            <ArrowRight size={14} strokeWidth={3} />
          </button>
        </div>

        {/* COLUMN 3: Right Workstation Canvas (Awwwards 3D Vector Masterpiece) */}
        <div className="ecosystem-right">
          <div className="workspace-isometric-canvas">

            {/* Detailed Vector SVG Workspace Drawing */}
            <svg className="blueprint-sketch-svg" viewBox="0 0 600 480">

              {/* Gradients and drop shadow filter declarations */}
              <defs>
                <filter id="premium-shadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#1e3a8a" floodOpacity="0.04" />
                </filter>
                <linearGradient id="active-border" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.9" />
                </linearGradient>
                <linearGradient id="desk-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f8fafc" />
                  <stop offset="100%" stopColor="#f1f5f9" />
                </linearGradient>
                <linearGradient id="mug-grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#e2e8f0" />
                </linearGradient>
                <linearGradient id="pot-grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#fca5a5" />
                  <stop offset="100%" stopColor="#f87171" />
                </linearGradient>
                <linearGradient id="leaf-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
                <linearGradient id="warm-glow" x1="0.8" y1="0.2" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(253, 224, 71, 0.22)" />
                  <stop offset="100%" stopColor="rgba(253, 224, 71, 0)" />
                </linearGradient>
                <linearGradient id="screen-glow" x1="0" y1="0.5" x2="1" y2="0.5">
                  <stop offset="0%" stopColor="rgba(59, 130, 246, 0.12)" />
                  <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
                </linearGradient>
              </defs>

              {/* Perspective table top surface (volumetric slab) */}
              <path className="sketch-line" d="M 30,295 L 570,295 L 490,440 L 110,440 Z" fill="url(#desk-grad)" />
              <path className="sketch-line" d="M 110,440 L 490,440 L 490,446 L 110,446 Z" fill="#cbd5e1" />

              {/* Chair outlines (foreground overlay) */}
              <path className="sketch-line-fill" d="M 285,410 C 255,410 345,410 345,475 L 315,480 Z" />
              <path className="sketch-line" d="M 315,465 L 315,480" />

              {/* Plant pot details with layered green leaves */}
              <path d="M 144,260 L 164,260 L 160,278 L 148,278 Z" fill="url(#pot-grad)" stroke="#818cf8" strokeWidth="1.25" />
              <path d="M 154,260 C 145,245 140,230 148,215 C 156,230 156,245 154,260 Z" fill="url(#leaf-grad)" stroke="#059669" strokeWidth="0.75" />
              <path d="M 154,260 C 163,245 168,230 160,215 C 152,230 152,245 154,260 Z" fill="url(#leaf-grad)" stroke="#059669" strokeWidth="0.75" />
              <path d="M 154,260 C 150,240 152,220 154,205 C 156,220 158,240 154,260 Z" fill="url(#leaf-grad)" stroke="#059669" strokeWidth="0.75" />

              {/* Coffee mug details with rising steam lines */}
              <ellipse cx="120" cy="300" rx="7" ry="3" fill="#cbd5e1" stroke="#818cf8" strokeWidth="1.25" />
              <path d="M 113,300 L 113,312 C 113,315 127,315 127,312 L 127,300" fill="url(#mug-grad)" stroke="#818cf8" strokeWidth="1.25" />
              <path d="M 127,302 C 132,302 132,310 127,310" fill="none" stroke="#818cf8" strokeWidth="1.25" />

              {/* Animated wiggling steam vectors */}
              <path d="M 116,293 Q 114,285 120,277 Q 126,269 122,261" className="steam-line" />
              <path d="M 122,293 Q 120,285 124,279 Q 128,273 125,267" className="steam-line" style={{ animationDelay: "1.5s" }} />

              {/* Pencil Cup & wireframe mesh stick details */}
              <rect x="180" y="270" width="16" height="22" className="sketch-line" rx="1.5" />
              <path className="sketch-line" d="M 183,270 L 178,252" />
              <path className="sketch-line" d="M 191,270 L 194,250" />
              <path className="sketch-line" d="M 194,270 L 198,255" />

              {/* Laptop Screen deck and hinge drawing */}
              <path className="sketch-line-fill" d="M 215,185 L 365,185 L 365,275 L 215,275 Z" fill="#e2e8f0" />
              <path className="sketch-line-fill" d="M 205,275 L 375,275 L 390,320 L 190,320 Z" fill="#cbd5e1" />

              {/* Keyboard deck keys rows & spacebar */}
              <line x1="202" y1="284" x2="378" y2="284" className="sketch-line" />
              <line x1="198" y1="294" x2="382" y2="294" className="sketch-line" />
              <line x1="194" y1="304" x2="386" y2="304" className="sketch-line" />
              <rect x="260" y="308" width="60" height="6" className="sketch-line" rx="1.5" />
              <rect x="265" y="315" width="50" height="4" className="sketch-line" rx="1" />

              {/* Smartphone wood wedge stand */}
              <path className="sketch-line-fill" d="M 425,290 L 450,290 L 442,310 L 417,310 Z" fill="#e2e8f0" />
              <path className="sketch-line-fill" d="M 430,245 L 448,245 L 440,295 L 422,295 Z" fill="#cbd5e1" />

              {/* Notebook details */}
              <path className="sketch-line-fill" d="M 470,340 L 520,320 L 545,340 L 495,360 Z" fill="#e2e8f0" />
              <path className="sketch-line" d="M 470,346 L 520,326 M 470,352 L 520,332" />

              {/* Desk Lamp details with radial glow overlays */}
              <path className="sketch-line" d="M 495,300 L 515,220" />
              <path className="sketch-line" d="M 515,220 L 490,195" />
              <ellipse cx="495" cy="300" rx="16" ry="6" className="sketch-line" />
              <path className="sketch-line-fill" d="M 465,195 Q 480,170 505,190 Q 500,210 475,215 Z" fill="#e2e8f0" />

              {/* Radial cone of light glow */}
              <polygon points="460,215 300,290 320,380 475,215" fill="url(#warm-glow)" className="lamp-glow-cone" />
              <polygon points="215,275 190,320 390,320 365,275" fill="url(#screen-glow)" />

              {/* Dynamic Connection Data Streams */}
              <g className="workspace-data-streams">
                {/* Node 1: Website */}
                <path d="M 290,230 Q 250,120 221,38" className={`data-stream-line node-1-stream ${isUnlocked(0) ? "active" : ""}`} />
                {/* Node 2: App/Traffic */}
                <path d="M 290,230 Q 310,120 336,38" className={`data-stream-line node-2-stream ${isUnlocked(1) ? "active" : ""}`} />
                {/* Node 3: Leads */}
                <path d="M 290,230 Q 380,120 451,58" className={`data-stream-line node-3-stream ${isUnlocked(2) ? "active" : ""}`} />
                {/* Node 4: CRM Sync */}
                <path d="M 290,230 Q 400,160 511,133" className={`data-stream-line node-4-stream ${isUnlocked(3) ? "active" : ""}`} />
                {/* Node 5: Pipeline */}
                <path d="M 290,230 Q 400,240 506,243" className={`data-stream-line node-5-stream ${isUnlocked(5) ? "active" : ""}`} />
                {/* Node 6: Automate */}
                <path d="M 290,230 Q 250,330 226,408" className={`data-stream-line node-6-stream ${isUnlocked(4) ? "active" : ""}`} />
                {/* Node 7: Retention */}
                <path d="M 290,230 Q 150,330 91,368" className={`data-stream-line node-7-stream ${isUnlocked(6) ? "active" : ""}`} />
                {/* Node 8: Growth */}
                <path d="M 290,230 Q 150,180 81,188" className={`data-stream-line node-8-stream ${isUnlocked(7) ? "active" : ""}`} />
              </g>

              {/* Floating laser particle traversing between cards in space */}
              <circle r="3.5" fill="#3b82f6">
                <animateMotion dur="7s" repeatCount="indefinite" path="M 230,45 Q 300,35 370,45 Q 430,50 480,65 Q 520,110 530,170 Q 530,230 510,290 Q 430,350 320,380 Q 250,370 200,340 Q 150,260 170,160 Q 170,90 230,45" />
              </circle>

              {/* Vector SVG Active/Locked Cards (Awwwards design specifications) */}

              {/* Node 1: Website */}
              <g id="node-1" className={`svg-node-group ${isUnlocked(0) ? "active" : ""}`} onClick={() => selectIndex(0)}>
                <rect x="175" y="10" width="92" height="56" rx="10" fill="#ffffff" stroke={isUnlocked(0) ? "url(#active-border)" : "#e2e8f0"} strokeWidth="1.5" filter="url(#premium-shadow)" />
                <text x="183" y="24" fill={isUnlocked(0) ? "#2563eb" : "#94a3b8"} fontSize="6" fontWeight="800" letterSpacing="0.04em">01 WEBSITE</text>
                <text x="183" y="38" fill={isUnlocked(0) ? "#0f172a" : "#64748b"} fontSize="10" fontWeight="900" letterSpacing="-0.02em">{isUnlocked(0) ? "Launched" : "Offline"}</text>
                {/* Micro trend / status indicator */}
                {isUnlocked(0) ? (
                  <g>
                    <rect x="238" y="28" width="22" height="12" rx="4" fill="#e0f2fe" />
                    <text x="249" y="36.5" fill="#2563eb" fontSize="5.5" fontWeight="bold" textAnchor="middle">100%</text>
                  </g>
                ) : (
                  <rect x="183" y="44" width="30" height="2" rx="1" fill="#cbd5e1" />
                )}
                <circle cx="254" cy="20" r="5" fill={isUnlocked(0) ? "#3b82f6" : "#cbd5e1"} />
                {isUnlocked(0) && <path d="M 252,20 L 253.5,21.5 L 256,18.5" stroke="#fff" strokeWidth="1" fill="none" />}
              </g>

              {/* Node 2: App/Traffic */}
              <g id="node-2" className={`svg-node-group ${isUnlocked(1) ? "active" : ""}`} onClick={() => selectIndex(1)}>
                <rect x="290" y="10" width="92" height="56" rx="10" fill="#ffffff" stroke={isUnlocked(1) ? "url(#active-border)" : "#e2e8f0"} strokeWidth="1.5" filter="url(#premium-shadow)" />
                <text x="298" y="24" fill={isUnlocked(1) ? "#2563eb" : "#94a3b8"} fontSize="6" fontWeight="800" letterSpacing="0.04em">02 TRAFFIC</text>
                <text x="298" y="38" fill={isUnlocked(1) ? "#0f172a" : "#64748b"} fontSize="10" fontWeight="900" letterSpacing="-0.02em">{isUnlocked(1) ? "12,540" : "Locked"}</text>
                {isUnlocked(1) ? (
                  <g>
                    <path d="M 334,46 L 344,43 L 354,47 L 364,39" fill="none" stroke="#10b981" strokeWidth="1.25" strokeLinecap="round" className="active-sparkline" />
                    <rect x="298" y="43" width="22" height="8" rx="3" fill="#ecfdf5" />
                    <text x="309" y="49" fill="#10b981" fontSize="5" fontWeight="bold" textAnchor="middle">+180%</text>
                  </g>
                ) : (
                  <rect x="298" y="44" width="30" height="2" rx="1" fill="#cbd5e1" />
                )}
                <circle cx="369" cy="20" r="5" fill={isUnlocked(1) ? "#3b82f6" : "#cbd5e1"} />
                {isUnlocked(1) && <path d="M 367,20 L 368.5,21.5 L 371,18.5" stroke="#fff" strokeWidth="1" fill="none" />}
              </g>

              {/* Node 3: Leads */}
              <g id="node-3" className={`svg-node-group ${isUnlocked(2) ? "active" : ""}`} onClick={() => selectIndex(2)}>
                <rect x="405" y="30" width="92" height="56" rx="10" fill="#ffffff" stroke={isUnlocked(2) ? "url(#active-border)" : "#e2e8f0"} strokeWidth="1.5" filter="url(#premium-shadow)" />
                <text x="413" y="44" fill={isUnlocked(2) ? "#2563eb" : "#94a3b8"} fontSize="6" fontWeight="800" letterSpacing="0.04em">03 LEADS</text>
                <text x="413" y="58" fill={isUnlocked(2) ? "#0f172a" : "#64748b"} fontSize="10" fontWeight="900" letterSpacing="-0.02em">{isUnlocked(2) ? "8,620" : "Locked"}</text>
                {isUnlocked(2) ? (
                  <g>
                    <circle cx="454" cy="46" r="3" fill="none" stroke="#2563eb" strokeWidth="1" />
                    <circle cx="462" cy="46" r="3" fill="none" stroke="#2563eb" strokeWidth="1" />
                    <rect x="413" y="63" width="22" height="8" rx="3" fill="#ecfdf5" />
                    <text x="424" y="69" fill="#10b981" fontSize="5" fontWeight="bold" textAnchor="middle">+210%</text>
                  </g>
                ) : (
                  <rect x="413" y="64" width="30" height="2" rx="1" fill="#cbd5e1" />
                )}
                <circle cx="484" cy="40" r="5" fill={isUnlocked(2) ? "#3b82f6" : "#cbd5e1"} />
                {isUnlocked(2) && <path d="M 482,40 L 483.5,41.5 L 486,38.5" stroke="#fff" strokeWidth="1" fill="none" />}
              </g>

              {/* Node 4: CRM */}
              <g id="node-4" className={`svg-node-group ${isUnlocked(3) ? "active" : ""}`} onClick={() => selectIndex(3)}>
                <rect x="465" y="105" width="92" height="56" rx="10" fill="#ffffff" stroke={isUnlocked(3) ? "url(#active-border)" : "#e2e8f0"} strokeWidth="1.5" filter="url(#premium-shadow)" />
                <text x="473" y="119" fill={isUnlocked(3) ? "#2563eb" : "#94a3b8"} fontSize="6" fontWeight="800" letterSpacing="0.04em">04 CRM SYNC</text>
                <text x="473" y="133" fill={isUnlocked(3) ? "#0f172a" : "#64748b"} fontSize="10" fontWeight="900" letterSpacing="-0.02em">{isUnlocked(3) ? "6,241" : "Locked"}</text>
                {isUnlocked(3) ? (
                  <g>
                    <path d="M 522,122 L 532,132 M 532,122 L 522,132" stroke="#2563eb" strokeWidth="1" />
                    <rect x="473" y="138" width="22" height="8" rx="3" fill="#ecfdf5" />
                    <text x="484" y="144" fill="#10b981" fontSize="5" fontWeight="bold" textAnchor="middle">+160%</text>
                  </g>
                ) : (
                  <rect x="473" y="139" width="30" height="2" rx="1" fill="#cbd5e1" />
                )}
                <circle cx="544" cy="115" r="5" fill={isUnlocked(3) ? "#3b82f6" : "#cbd5e1"} />
                {isUnlocked(3) && <path d="M 542,115 L 543.5,116.5 L 546,113.5" stroke="#fff" strokeWidth="1" fill="none" />}
              </g>

              {/* Node 5: Pipeline */}
              <g id="node-5" className={`svg-node-group ${isUnlocked(5) ? "active" : ""}`} onClick={() => selectIndex(5)}>
                <rect x="460" y="215" width="92" height="56" rx="10" fill="#ffffff" stroke={isUnlocked(5) ? "url(#active-border)" : "#e2e8f0"} strokeWidth="1.5" filter="url(#premium-shadow)" />
                <text x="468" y="229" fill={isUnlocked(5) ? "#2563eb" : "#94a3b8"} fontSize="6" fontWeight="800" letterSpacing="0.04em">05 PIPELINE</text>
                <text x="468" y="243" fill={isUnlocked(5) ? "#0f172a" : "#64748b"} fontSize="10" fontWeight="900" letterSpacing="-0.02em">{isUnlocked(5) ? "$42,300" : "Locked"}</text>
                {isUnlocked(5) ? (
                  <g>
                    <rect x="514" y="238" width="2" height="8" fill="#10b981" />
                    <rect x="518" y="234" width="2" height="12" fill="#10b981" />
                    <rect x="522" y="230" width="2" height="16" fill="#10b981" />
                    <rect x="468" y="248" width="22" height="8" rx="3" fill="#ecfdf5" />
                    <text x="479" y="254" fill="#10b981" fontSize="5" fontWeight="bold" textAnchor="middle">+180%</text>
                  </g>
                ) : (
                  <rect x="468" y="249" width="30" height="2" rx="1" fill="#cbd5e1" />
                )}
                <circle cx="539" cy="225" r="5" fill={isUnlocked(5) ? "#3b82f6" : "#cbd5e1"} />
                {isUnlocked(5) && <path d="M 537,225 L 538.5,226.5 L 541,223.5" stroke="#fff" strokeWidth="1" fill="none" />}
              </g>

              {/* Node 6: Automation */}
              <g id="node-6" className={`svg-node-group ${isUnlocked(4) ? "active" : ""}`} onClick={() => selectIndex(4)}>
                <rect x="180" y="380" width="92" height="56" rx="10" fill="#ffffff" stroke={isUnlocked(4) ? "url(#active-border)" : "#e2e8f0"} strokeWidth="1.5" filter="url(#premium-shadow)" />
                <text x="188" y="394" fill={isUnlocked(4) ? "#2563eb" : "#94a3b8"} fontSize="6" fontWeight="800" letterSpacing="0.04em">06 AUTOMATE</text>
                <text x="188" y="408" fill={isUnlocked(4) ? "#0f172a" : "#64748b"} fontSize="10" fontWeight="900" letterSpacing="-0.02em">{isUnlocked(4) ? "24 Active" : "Locked"}</text>
                {isUnlocked(4) ? (
                  <g>
                    <path d="M 244,402 A 4,4 0 1,1 252,402" fill="none" stroke="#2563eb" strokeWidth="1.2" />
                    <rect x="188" y="413" width="22" height="8" rx="3" fill="#ecfdf5" />
                    <text x="199" y="419" fill="#10b981" fontSize="5" fontWeight="bold" textAnchor="middle">+185%</text>
                  </g>
                ) : (
                  <rect x="188" y="414" width="30" height="2" rx="1" fill="#cbd5e1" />
                )}
                <circle cx="259" cy="390" r="5" fill={isUnlocked(4) ? "#3b82f6" : "#cbd5e1"} />
                {isUnlocked(4) && <path d="M 257,390 L 258.5,391.5 L 261,388.5" stroke="#fff" strokeWidth="1" fill="none" />}
              </g>

              {/* Node 7: Retention */}
              <g id="node-7" className={`svg-node-group ${isUnlocked(6) ? "active" : ""}`} onClick={() => selectIndex(6)}>
                <rect x="45" y="340" width="92" height="56" rx="10" fill="#ffffff" stroke={isUnlocked(6) ? "url(#active-border)" : "#e2e8f0"} strokeWidth="1.5" filter="url(#premium-shadow)" />
                <text x="53" y="354" fill={isUnlocked(6) ? "#2563eb" : "#94a3b8"} fontSize="6" fontWeight="800" letterSpacing="0.04em">07 RETENTION</text>
                <text x="53" y="368" fill={isUnlocked(6) ? "#0f172a" : "#64748b"} fontSize="10" fontWeight="900" letterSpacing="-0.02em">{isUnlocked(6) ? "92%" : "Locked"}</text>
                {isUnlocked(6) ? (
                  <g>
                    <circle cx="106" cy="364" r="6" fill="none" stroke="#cbd5e1" strokeWidth="1.25" />
                    <circle cx="106" cy="364" r="6" fill="none" stroke="#10b981" strokeWidth="1.25" strokeDasharray="30" strokeDashoffset="8" />
                    <rect x="53" y="373" width="22" height="8" rx="3" fill="#ecfdf5" />
                    <text x="64" y="379" fill="#10b981" fontSize="5" fontWeight="bold" textAnchor="middle">+75%</text>
                  </g>
                ) : (
                  <rect x="53" y="374" width="30" height="2" rx="1" fill="#cbd5e1" />
                )}
                <circle cx="124" cy="350" r="5" fill={isUnlocked(6) ? "#3b82f6" : "#cbd5e1"} />
                {isUnlocked(6) && <path d="M 122,350 L 123.5,351.5 L 126,348.5" stroke="#fff" strokeWidth="1" fill="none" />}
              </g>

              {/* Node 8: Growth */}
              <g id="node-8" className={`svg-node-group ${isUnlocked(7) ? "active" : ""}`} onClick={() => selectIndex(7)}>
                <rect x="35" y="160" width="92" height="56" rx="10" fill="#ffffff" stroke={isUnlocked(7) ? "url(#active-border)" : "#e2e8f0"} strokeWidth="1.5" filter="url(#premium-shadow)" />
                <text x="43" y="174" fill={isUnlocked(7) ? "#2563eb" : "#94a3b8"} fontSize="6" fontWeight="800" letterSpacing="0.04em">08 GROWTH</text>
                <text x="43" y="188" fill={isUnlocked(7) ? "#0f172a" : "#64748b"} fontSize="10" fontWeight="900" letterSpacing="-0.02em">{isUnlocked(7) ? "$128,540" : "Locked"}</text>
                {isUnlocked(7) ? (
                  <g>
                    <path d="M 94,184 Q 106,178 116,183" fill="none" stroke="#10b981" strokeWidth="1.25" />
                    <rect x="43" y="193" width="22" height="8" rx="3" fill="#ecfdf5" />
                    <text x="54" y="199" fill="#10b981" fontSize="5" fontWeight="bold" textAnchor="middle">+260%</text>
                  </g>
                ) : (
                  <rect x="43" y="194" width="30" height="2" rx="1" fill="#cbd5e1" />
                )}
                <circle cx="114" cy="170" r="5" fill={isUnlocked(7) ? "#3b82f6" : "#cbd5e1"} />
                {isUnlocked(7) && <path d="M 112,170 L 113.5,171.5 L 116,168.5" stroke="#fff" strokeWidth="1" fill="none" />}
              </g>

              {/* Central trophy validation stamp */}
              {isEcosystemUnlocked && (
                <g className="cursor-default">
                  <circle cx="320" cy="120" r="30" fill="#ffffff" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 312,110 L 328,110 L 328,118 Q 328,128 320,128 Q 312,128 312,118 Z" fill="none" stroke="#2563eb" strokeWidth="1.2" />
                  <path d="M 320,128 L 320,132 M 315,132 L 325,132" stroke="#2563eb" strokeWidth="1.2" />
                  <text x="320" y="145" fill="#2563eb" fontSize="5.5" fontWeight="bold" textAnchor="middle">UNLOCKED</text>
                </g>
              )}

            </svg>

            {/* Active Laptop Display overlay */}
            <div className="desk-laptop-screen">
              {isUnlocked(0) ? (
                <div style={{ position: "relative", width: "100%", height: "100%", background: "linear-gradient(135deg, #09090b 0%, #03001e 50%, #7303c0 100%)", color: "#fff", display: "flex", flexDirection: "column", padding: "8px", gap: "2px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.26rem", opacity: 0.8 }}>
                    <span style={{ fontWeight: "bold" }}>AVHAD</span>
                    <span>Services</span>
                  </div>
                  <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "2px", zIndex: 4 }}>
                    <span style={{ fontSize: "0.38rem", fontWeight: "bold", lineHeight: 1.15, maxWidth: "130px" }}>Building Experiences That Drive Growth</span>
                    <div style={{ width: "38px", height: "11px", background: "#2563eb", borderRadius: "2px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.22rem" }}>Launch</div>
                  </div>
                  <div className="laptop-active-graphic"></div>
                </div>
              ) : (
                <div style={{ width: "100%", height: "100%", background: "#111", display: "flex", alignItems: "center", justifyContent: "center", color: "#7f1d1d", fontSize: "0.3rem" }}>
                  <span>Site Offline</span>
                </div>
              )}
            </div>

            {/* Active Smartphone Display overlay */}
            <div className="desk-smartphone-screen">
              {isUnlocked(1) ? (
                <div style={{ padding: "4px 2px", background: "#09090b", height: "100%", display: "flex", flexDirection: "column", gap: "1px", color: "#fff", alignItems: "center" }}>
                  <span style={{ fontSize: "0.2rem", color: "#8e8e93" }}>New Leads</span>
                  <span style={{ fontSize: "0.45rem", fontWeight: "bold", color: "#10b981", textShadow: "0 0 4px rgba(16,185,129,0.3)" }}>128</span>
                  <div style={{ background: "#2563eb", height: "2px", width: "80%", borderRadius: "1px", marginTop: "2px" }}></div>
                </div>
              ) : (
                <div style={{ width: "100%", height: "100%", background: "#000" }}></div>
              )}
            </div>

          </div>
        </div>

      </div>

      {/* Flying project module tile */}
      {flyingTile && flyingTile.active && (
        <div
          className="flying-project-tile flying"
          style={{
            transform: `translate3d(${flyingTile.x}px, ${flyingTile.y}px, 0)`
          }}
        >
          {flyingTile.icon}
        </div>
      )}
    </section>
  );
}
