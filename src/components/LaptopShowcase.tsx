"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Activity,
  ShieldCheck,
  Cpu,
  Zap,
  ArrowUpRight,
  Layers,
  Sparkles
} from "lucide-react";

/**
 * ============================================================================
 * 🛠️ SHOWCASE CONFIGURATION SCHEMA
 * 100% Granular & Particle-Level Editable Settings.
 * Modify any string, metric, particle count, or color hue directly here.
 * ============================================================================
 */
export const SHOWCASE_CONFIG = {
  // 1. Avhad Section Header Copy (Dark Canvas)
  section: {
    badge: "[ 03 — FEATURED PRODUCTION ARCHITECTURE ]",
    titleStart: "Real Projects,",
    titleHighlight: "Measurable Digital Impact",
    subtitle: "An in-depth, live-rendered exploration of our high-velocity web systems running in production.",
    glowColor: "rgba(255, 107, 74, 0.14)", // Avhad brand strategy orange/coral ambient aura
  },

  // 2. Motion & Physics Timings
  timing: {
    scrollDurationSeconds: 10,     // Time to smoothly scroll to bottom on hover
    returnDurationSeconds: 1.4,    // Time to snap smoothly back to top on mouse leave
    maxTiltAngle: 3.5,             // Max 3D tilt degrees on mouse movement
  },

  // 3. Light-Theme Web Platform Content (Inside Laptop Screen)
  brand: {
    name: "NexusCore",
    statusBadge: "Autonomous System v4.8 • Operational",
    headlineStart: "High-Velocity Architecture",
    headlineGradient: "Engineered for Global Scale",
    subheadline: "Sub-millisecond latency, self-healing agent pipelines, and enterprise-grade cryptographic security built for industry leaders.",
    primaryCta: "Deploy Infrastructure",
    secondaryCta: "View Telemetry",
  },

  // 4. Light-Theme Telemetry & Quantitative Metrics
  telemetry: {
    chartTitle: "Cluster Throughput & Event Telemetry",
    chartSub: "Real-time stream (60s sliding window)",
    stat1: { label: "P99 Latency", value: "8.4ms", trend: "+42% faster" },
    stat2: { label: "Active Nodes", value: "32,480", trend: "100% healthy" },
    stat3: { label: "Efficiency Lift", value: "340%", trend: "vs legacy infra" },
  },

  // 5. Light-Theme Bento Capabilities Grid
  features: [
    {
      icon: "Cpu",
      title: "Neural Orchestration",
      description: "Automated agent load balancing with sub-second failover and dynamic resource allocation.",
      tag: "AI Pipeline"
    },
    {
      icon: "Layers",
      title: "Distributed Edge Mesh",
      description: "Globally clustered multi-region routing delivering sub-15ms TTFB anywhere on earth.",
      tag: "Cloud Mesh"
    },
    {
      icon: "ShieldCheck",
      title: "Cryptographic Guardrails",
      description: "Zero-trust SOC2 Type II verified governance with real-time anomaly isolation.",
      tag: "Security"
    }
  ],

  // 6. Light-Theme Enterprise Proof & Testimonial
  proof: {
    quote: "“Avhad transformed our legacy monolith into a world-class autonomous engine. Our conversion jumped 3.8x within 90 days.”",
    author: "Elena Rostova",
    role: "VP of Engineering, Apex Global",
    companies: ["APEX CORP", "SYNAPSE", "VALENCE", "QUANTUM"]
  }
};

export default function LaptopShowcase() {
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [inView, setInView] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const screenContainerRef = useRef<HTMLDivElement>(null);
  const screenContentRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [maxScrollOffset, setMaxScrollOffset] = useState(0);

  // Measure dynamic scroll distance to bring the entire footer into full view
  useEffect(() => {
    const updateScrollOffset = () => {
      if (screenContentRef.current && screenContainerRef.current) {
        const contentH = screenContentRef.current.scrollHeight;
        const containerH = screenContainerRef.current.clientHeight;
        const scrollable = Math.max(0, contentH - containerH);
        setMaxScrollOffset(scrollable);
      }
    };

    updateScrollOffset();
    const timer = setTimeout(updateScrollOffset, 300);
    window.addEventListener("resize", updateScrollOffset);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateScrollOffset);
    };
  }, []);

  // 3D Gyroscopic Cursor Tilt Physics
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || window.innerWidth < 1024) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normalizedX = (x / rect.width - 0.5) * 2;
    const normalizedY = (y / rect.height - 0.5) * 2;

    const tiltX = -normalizedY * SHOWCASE_CONFIG.timing.maxTiltAngle;
    const tiltY = normalizedX * SHOWCASE_CONFIG.timing.maxTiltAngle;

    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  // Viewport Observer for Mobile/Touch Trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.4 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Track progress indicator for micro UX feedback
  useEffect(() => {
    let start: number | null = null;
    const duration = isHovered
      ? SHOWCASE_CONFIG.timing.scrollDurationSeconds * 1000
      : SHOWCASE_CONFIG.timing.returnDurationSeconds * 1000;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);

      if (isHovered) {
        setScrollProgress(progress);
      } else {
        setScrollProgress(1 - progress);
      }

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(step);
      }
    };

    animationFrameRef.current = requestAnimationFrame(step);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isHovered]);

  const activeScroll = isHovered || (typeof window !== "undefined" && window.innerWidth < 768 && inView);

  return (
    <section className="relative w-full py-24 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-transparent border-t border-white/[0.04] select-none">

      {/* Dynamic Background Aura matching Avhad brand palette */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[950px] h-[450px] md:h-[700px] rounded-full blur-[150px] pointer-events-none transition-opacity duration-1000 opacity-45"
        style={{ background: SHOWCASE_CONFIG.section.glowColor }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,107,74,0.06),rgba(255,255,255,0))] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto flex flex-col items-center">

        {/* ========================================================================= */}
        {/* 🏷️ AVHAD EDITORIAL SECTION HEADER */}
        {/* ========================================================================= */}
        <div className="flex flex-col items-center text-center max-w-3xl mb-12 md:mb-16">

          {/* Monospace Editorial Badge */}
          <div className="font-mono text-xs tracking-[0.22em] text-white/50 uppercase mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B4A] animate-pulse" />
            <span>{SHOWCASE_CONFIG.section.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-5 font-display uppercase leading-[1.1]">
            {SHOWCASE_CONFIG.section.titleStart} <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B4A] via-[#FF8A65] to-[#F4B860]">
              {SHOWCASE_CONFIG.section.titleHighlight}
            </span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 font-light leading-relaxed max-w-2xl">
            {SHOWCASE_CONFIG.section.subtitle}
          </p>

          {/* Interactive Micro Guide Pill */}
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-zinc-400 backdrop-blur-md shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6B4A] animate-pulse" />
            <span>
              {isHovered
                ? `Auto-Scroll Active • ${Math.round(scrollProgress * 100)}% Explored`
                : "Hover over Laptop to Explore Full System ↓"}
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 💻 ISOLATED PHOTOREALISTIC MACBOOK PRO MOCKUP (SEAMLESS DARK CANVAS) */}
        {/* ========================================================================= */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative w-full max-w-[1060px] transition-transform ease-out cursor-pointer group"
          style={{
            perspective: "1400px",
            transformStyle: "preserve-3d",
          }}
        >
          {/* 3D Gyroscopic Tilt Wrapper */}
          <div
            className="relative w-full transition-transform duration-300 ease-out"
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Seamless Transparent MacBook Frame Image */}
            <div className="relative w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/mockup/macbook_transparent.png"
                alt="Photorealistic MacBook Pro Mockup"
                className="w-full h-auto block select-none pointer-events-none drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)]"
              />

              {/* ========================================================================= */}
              {/* ☀️ PIXEL-MAPPED LIVE LIGHT-THEME SCREEN VIEWPORT (FLUSH INSIDE DISPLAY) */}
              {/* ========================================================================= */}
              <div
                ref={screenContainerRef}
                className="absolute overflow-hidden bg-white text-slate-900 select-text shadow-inner"
                style={{
                  top: "15.8%",
                  left: "23.6%",
                  width: "52.8%",
                  height: "43.0%",
                  borderRadius: "7px 7px 0 0",
                }}
              >
                {/* Top Camera Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-2.5 bg-[#0c0c0e] rounded-b-md z-30 flex items-center justify-center pointer-events-none shadow-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1e293b] border border-white/20" />
                </div>

                {/* Subtle Optical Diagonal Glass Glare */}
                <div
                  className="absolute inset-0 pointer-events-none z-20 bg-gradient-to-tr from-white/[0.08] via-transparent to-black/[0.03] opacity-60"
                />

                {/* Scrolling Web Canvas */}
                <div
                  ref={screenContentRef}
                  className="relative w-full will-change-transform bg-white pb-14 text-left"
                  style={{
                    transform: activeScroll ? `translateY(-${maxScrollOffset}px)` : "translateY(0px)",
                    transition: activeScroll
                      ? `transform ${SHOWCASE_CONFIG.timing.scrollDurationSeconds}s cubic-bezier(0.25, 1, 0.5, 1)`
                      : `transform ${SHOWCASE_CONFIG.timing.returnDurationSeconds}s ease-out`
                  }}
                >

                  {/* --- 1. LIGHT-THEME STICKY NAVBAR --- */}
                  <div className="w-full h-10 bg-white/90 backdrop-blur-xl border-b border-slate-200/90 px-3.5 flex items-center justify-between sticky top-0 z-10 shadow-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-md bg-gradient-to-tr from-[#FF6B4A] to-[#FF8A65] flex items-center justify-center text-white font-bold text-[9px] shadow-sm">
                        N
                      </div>
                      <span className="font-display font-bold text-[11px] text-slate-900 tracking-tight">
                        {SHOWCASE_CONFIG.brand.name}
                      </span>
                    </div>

                    <div className="hidden sm:flex items-center gap-3.5 text-[10px] text-slate-600 font-semibold">
                      <span className="hover:text-slate-900 transition-colors">Platform</span>
                      <span className="hover:text-slate-900 transition-colors">Architecture</span>
                      <span className="hover:text-slate-900 transition-colors">Telemetry</span>
                      <span className="hover:text-slate-900 transition-colors">Security</span>
                    </div>

                    <button className="px-2 py-0.5 rounded-full bg-slate-900 text-white text-[9px] font-semibold hover:bg-black transition-all shadow-sm">
                      Console ↗
                    </button>
                  </div>

                  {/* --- 2. LIGHT-THEME HERO SECTION --- */}
                  <div className="relative pt-7 pb-8 px-4 text-center flex flex-col items-center bg-gradient-to-b from-slate-50/80 via-white to-white">

                    {/* Status Badge */}
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-50 border border-orange-200/70 text-[8px] font-mono text-[#FF6B4A] font-semibold mb-3 shadow-xs">
                      <Zap className="w-2 h-2 text-[#FF6B4A]" />
                      <span>{SHOWCASE_CONFIG.brand.statusBadge}</span>
                    </div>

                    <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight font-display mb-2 max-w-sm leading-tight">
                      {SHOWCASE_CONFIG.brand.headlineStart} <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-900 to-[#FF6B4A]">
                        {SHOWCASE_CONFIG.brand.headlineGradient}
                      </span>
                    </h1>

                    <p className="text-[9px] sm:text-[10px] text-slate-600 max-w-xs mb-4 leading-relaxed font-normal">
                      {SHOWCASE_CONFIG.brand.subheadline}
                    </p>

                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1 rounded-lg bg-slate-900 font-semibold text-[9px] text-white shadow-md hover:bg-black transition-all flex items-center gap-1">
                        <span>{SHOWCASE_CONFIG.brand.primaryCta}</span>
                        <ArrowUpRight className="w-2.5 h-2.5" />
                      </button>
                      <button className="px-3 py-1 rounded-lg bg-white border border-slate-200 font-semibold text-[9px] text-slate-700 hover:bg-slate-50 transition-all shadow-xs">
                        {SHOWCASE_CONFIG.brand.secondaryCta}
                      </button>
                    </div>
                  </div>

                  {/* --- 3. LIGHT-THEME LIVE TELEMETRY DASHBOARD --- */}
                  <div className="px-4 py-2">
                    <div className="w-full rounded-xl bg-white border border-slate-200 p-3.5 relative overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)]">

                      {/* Dashboard Header & Status */}
                      <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 mb-3">
                        <div className="flex items-center gap-1.5">
                          <Activity className="w-3 h-3 text-emerald-600" />
                          <span className="text-[10px] font-bold text-slate-900">
                            {SHOWCASE_CONFIG.telemetry.chartTitle}
                          </span>
                        </div>
                        <span className="text-[8px] font-mono text-slate-400">
                          {SHOWCASE_CONFIG.telemetry.chartSub}
                        </span>
                      </div>

                      {/* Animated SVG Telemetry Wave */}
                      <div className="w-full h-16 relative mb-3">
                        <svg className="w-full h-full" viewBox="0 0 500 100" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="lightChartGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#FF6B4A" stopOpacity="0.25" />
                              <stop offset="100%" stopColor="#FF6B4A" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M0,70 Q70,20 140,50 T280,30 T420,60 T500,20 L500,100 L0,100 Z"
                            fill="url(#lightChartGrad)"
                          />
                          <path
                            d="M0,70 Q70,20 140,50 T280,30 T420,60 T500,20"
                            fill="none"
                            stroke="#FF6B4A"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>

                        {/* Pulsing Target Node */}
                        <div className="absolute top-[28%] left-[56%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                          <span className="animate-ping absolute w-3 h-3 rounded-full bg-orange-400 opacity-75" />
                          <span className="w-2 h-2 rounded-full bg-white border-2 border-[#FF6B4A] shadow-md" />
                        </div>
                      </div>

                      {/* Metric Indicators Grid */}
                      <div className="grid grid-cols-3 gap-2">
                        <div className="p-2 rounded-lg bg-slate-50/80 border border-slate-200/80 text-left">
                          <div className="text-[8px] font-mono text-slate-500 mb-0.5">{SHOWCASE_CONFIG.telemetry.stat1.label}</div>
                          <div className="text-[11px] sm:text-xs font-bold text-slate-900 font-display">{SHOWCASE_CONFIG.telemetry.stat1.value}</div>
                          <div className="text-[7px] font-mono font-semibold text-emerald-600">{SHOWCASE_CONFIG.telemetry.stat1.trend}</div>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-50/80 border border-slate-200/80 text-left">
                          <div className="text-[8px] font-mono text-slate-500 mb-0.5">{SHOWCASE_CONFIG.telemetry.stat2.label}</div>
                          <div className="text-[11px] sm:text-xs font-bold text-slate-900 font-display">{SHOWCASE_CONFIG.telemetry.stat2.value}</div>
                          <div className="text-[7px] font-mono font-semibold text-blue-600">{SHOWCASE_CONFIG.telemetry.stat2.trend}</div>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-50/80 border border-slate-200/80 text-left">
                          <div className="text-[8px] font-mono text-slate-500 mb-0.5">{SHOWCASE_CONFIG.telemetry.stat3.label}</div>
                          <div className="text-[11px] sm:text-xs font-bold text-[#FF6B4A] font-display">{SHOWCASE_CONFIG.telemetry.stat3.value}</div>
                          <div className="text-[7px] font-mono font-semibold text-orange-600">{SHOWCASE_CONFIG.telemetry.stat3.trend}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* --- 4. LIGHT-THEME BENTO ARCHITECTURAL CAPABILITIES --- */}
                  <div className="px-4 py-5">
                    <div className="text-center mb-3">
                      <span className="text-[8px] font-mono uppercase tracking-widest text-[#FF6B4A] font-bold">Core Architecture</span>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">Autonomous Cluster Features</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {SHOWCASE_CONFIG.features.map((feat, idx) => (
                        <div key={idx} className="p-2.5 rounded-lg bg-white border border-slate-200 hover:border-[#FF6B4A]/60 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between text-left group/card">
                          <div>
                            <div className="w-5 h-5 rounded-md bg-orange-50 border border-orange-200/60 flex items-center justify-center text-[#FF6B4A] mb-1.5 group-hover/card:scale-105 transition-transform">
                              {idx === 0 && <Cpu className="w-3 h-3" />}
                              {idx === 1 && <Layers className="w-3 h-3" />}
                              {idx === 2 && <ShieldCheck className="w-3 h-3" />}
                            </div>
                            <h4 className="text-[10px] font-bold text-slate-900 mb-0.5">{feat.title}</h4>
                            <p className="text-[9px] text-slate-600 leading-snug">{feat.description}</p>
                          </div>
                          <span className="mt-2 text-[7px] font-mono text-[#FF6B4A] font-semibold uppercase tracking-wider">{feat.tag}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* --- 5. LIGHT-THEME ENTERPRISE PROOF & TESTIMONIAL --- */}
                  <div className="px-4 py-5 bg-slate-50/60 border-t border-slate-100">
                    <div className="p-3 rounded-xl bg-white border border-slate-200 text-center max-w-xs mx-auto shadow-xs">
                      <p className="text-[10px] italic text-slate-700 leading-relaxed mb-2">
                        {SHOWCASE_CONFIG.proof.quote}
                      </p>
                      <div className="font-bold text-[10px] text-slate-900">{SHOWCASE_CONFIG.proof.author}</div>
                      <div className="text-[8px] text-slate-500">{SHOWCASE_CONFIG.proof.role}</div>
                    </div>
                  </div>

                  {/* --- 6. LIGHT-THEME HIGH-CONTRAST INTERACTIVE FOOTER --- */}
                  <div className="px-4 py-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[9px] text-slate-600 bg-slate-50">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3.5 h-3.5 rounded-md bg-[#FF6B4A] flex items-center justify-center text-white font-bold text-[7px]">
                        N
                      </div>
                      <span className="font-semibold text-slate-800">
                        © {new Date().getFullYear()} {SHOWCASE_CONFIG.brand.name} Systems Inc. All rights reserved.
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-[#FF6B4A] transition-colors cursor-pointer font-medium">Privacy</a>
                      <a href="#security" onClick={(e) => e.preventDefault()} className="hover:text-[#FF6B4A] transition-colors cursor-pointer font-medium">Security</a>
                      <a href="#docs" onClick={(e) => e.preventDefault()} className="hover:text-[#FF6B4A] transition-colors cursor-pointer font-medium">API Docs</a>
                      <button
                        onClick={() => {
                          setIsHovered(false);
                          if (screenContentRef.current) {
                            screenContentRef.current.style.transform = "translateY(0px)";
                          }
                        }}
                        className="px-1.5 py-0.5 rounded-md bg-white border border-slate-200 hover:border-[#FF6B4A] text-slate-700 text-[9px] font-semibold transition-all shadow-xs"
                      >
                        Top ↑
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Diffused Strategy Ambient Ground Reflection */}
            <div className="w-[90%] mx-auto h-10 bg-[#FF6B4A]/12 blur-3xl -mt-6 rounded-full pointer-events-none" />
          </div>
        </div>

      </div>
    </section>
  );
}
