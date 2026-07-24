"use client";

import { useEffect, useRef } from "react";

export default function AgenticShowcase() {
  const RiveInstanceRef = useRef<any>(null);

  // Intersection Observer to auto-hide the main website navbar when inside the Showcase section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          document.body.classList.add("in-showcase");
        } else {
          document.body.classList.remove("in-showcase");
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("solutions");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
      document.body.classList.remove("in-showcase");
    };
  }, []);

  // Initialize Rive canvas animation for Agentic Payments (Tab 1 asset)
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Load Rive script dynamically from CDN
    const loadRiveScript = (callback: () => void) => {
      if ((window as any).rive) {
        callback();
        return;
      }
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/@rive-app/canvas@2.26.6/rive.min.js";
      script.async = true;
      script.onload = () => {
        callback();
      };
      document.body.appendChild(script);
    };

    const initRive = () => {
      const canvas = document.getElementById("sprintRiveCanvas") as HTMLCanvasElement;
      if (!canvas) return;

      // Cleanup previous instance before instantiating
      if (RiveInstanceRef.current) {
        try {
          RiveInstanceRef.current.cleanup();
        } catch (e) {}
        RiveInstanceRef.current = null;
      }

      // Sync canvas dimensions with display size and device pixel ratio (Prevents squishing)
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      try {
        RiveInstanceRef.current = new (window as any).rive.Rive({
          src: "https://cdn.prod.website-files.com/6965e6515fb6b18e928e6d0f/69a829125a2caa0ff9d464df_73ee22dc50f364135f370e12bd391a4f_agentic_payments%20%281%29.riv",
          canvas: canvas,
          autoplay: true,
          stateMachines: "State Machine 1",
          artboard: "Artboard",
          useOffscreenRenderer: true,
          layout: new (window as any).rive.Layout({
            fit: (window as any).rive.Fit.Contain,
            alignment: (window as any).rive.Alignment.Center
          }),
          onLoad: () => {
            try {
              RiveInstanceRef.current.resizeDrawingSurfaceToCanvas();
            } catch (e) {}
          }
        });
      } catch (err) {
        console.error("Rive Canvas load error:", err);
      }
    };

    loadRiveScript(() => {
      initRive();
    });

    const handleResize = () => {
      const canvas = document.getElementById("sprintRiveCanvas") as HTMLCanvasElement;
      if (canvas && RiveInstanceRef.current) {
        const rect = canvas.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio, 2);
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        try {
          RiveInstanceRef.current.resizeDrawingSurfaceToCanvas();
        } catch (e) {}
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (RiveInstanceRef.current) {
        try {
          RiveInstanceRef.current.cleanup();
        } catch (e) {}
        RiveInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <section className="sprint-showcase-section" id="solutions">
      
      {/* Background Chalk Assets */}
      <svg className="sprint-bg-chalk-left" viewBox="0 0 600 600" width="550" height="550">
        <circle cx="300" cy="300" r="280" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="300" cy="300" r="200" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.8" />
        <ellipse cx="300" cy="300" rx="280" ry="70" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8" />
        <ellipse cx="300" cy="300" rx="280" ry="150" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8" />
        <ellipse cx="300" cy="300" rx="70" ry="280" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.8" />
        <ellipse cx="300" cy="300" rx="150" ry="280" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.8" />
        <line x1="20" y1="300" x2="580" y2="300" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8" />
        <line x1="300" y1="20" x2="300" y2="580" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8" />
      </svg>

      <svg className="sprint-bg-chalk-right" viewBox="0 0 600 600" width="500" height="500">
        <ellipse cx="300" cy="120" rx="180" ry="45" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.85" />
        <ellipse cx="300" cy="300" rx="180" ry="45" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.85" strokeDasharray="4 4" />
        <ellipse cx="300" cy="480" rx="180" ry="45" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.85" />
        <line x1="120" y1="120" x2="120" y2="480" stroke="rgba(255,255,255,0.03)" strokeWidth="0.85" />
        <line x1="480" y1="120" x2="480" y2="480" stroke="rgba(255,255,255,0.03)" strokeWidth="0.85" />
        <line x1="300" y1="300" x2="427" y2="332" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8" />
        <line x1="300" y1="300" x2="173" y2="268" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8" />
        <line x1="300" y1="300" x2="300" y2="480" stroke="rgba(255,255,255,0.02)" strokeWidth="0.8" />
      </svg>

      {/* 3-Column Core Workspace */}
      <div className="sprint-workspace">
        
        {/* Left Column: Vertical Strategy Copy */}
        <div className="sprint-col sprint-left-col">
          <span className="sprint-tab-index">01/A</span>
          <h2 className="sprint-title">Agentic Payments</h2>
          <p className="sprint-desc">AI-led shopping that lets customers browse, decide, and pay without exiting the conversation.</p>
          <a href="#contact" className="sprint-explore-link">
            EXPLORE <span className="explore-arrow">&gt;</span>
          </a>
        </div>

        {/* Center Column: Rive Interactive Canvas */}
        <div className="sprint-col sprint-center-col">
          <div className="sprint-interactive-canvas-container">
            <canvas id="sprintRiveCanvas" style={{ width: "100%", height: "100%", display: "block" }}></canvas>
          </div>
        </div>

        {/* Right Column: Key Metrics Copy */}
        <div className="sprint-col sprint-right-col">
          <h3 className="sprint-sec-title">Payments on In-App Chats</h3>
          <p className="sprint-sec-desc">Turn your chatbot into an agent that can complete purchases for your shoppers autonomously.</p>
          <a href="#contact" className="sprint-cta-btn" style={{ background: "#2563eb" }}>
            READ MORE &gt;
          </a>
        </div>

      </div>
    </section>
  );
}
