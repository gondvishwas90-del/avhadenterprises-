"use client";

import { useEffect, useRef } from "react";

export default function BusinessBankingSection() {
  const RiveInstanceRef = useRef<any>(null);

  // Initialize Rive canvas animation for Business Banking (Tab 6 asset)
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
      const canvas = document.getElementById("bankingRiveCanvas") as HTMLCanvasElement;
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
          src: "https://cdn.prod.website-files.com/6965e6515fb6b18e928e6d0f/69a7fae012ab294a01b0a699_af3d5e385b0cbdbb16fae0013a8aa054_payroll_fix.riv",
          canvas: canvas,
          autoplay: true,
          stateMachines: "State Machine 1",
          artboard: "Artboard",
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
      const canvas = document.getElementById("bankingRiveCanvas") as HTMLCanvasElement;
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
    <section className="banking-showcase-section" id="banking-solutions">
      <div className="banking-grid">
        
        {/* Left Column: Headline and Content Copy */}
        <div className="banking-content-col">
          <h2 className="banking-title">
            Don't let banking weigh you down.
          </h2>
          
          <div className="banking-copy-wrapper">
            <h4 className="banking-eyebrow">Agentic Business Banking</h4>
            <p className="banking-description">
              The expertise of a world-class finance team built into your account
            </p>
          </div>

          <a href="#contact" className="banking-cta-btn">
            READ MORE <span className="explore-arrow">&gt;</span>
          </a>
        </div>

        {/* Right Column: Rive Interactive Canvas */}
        <div className="banking-visual-col">
          <div className="banking-canvas-container">
            <canvas id="bankingRiveCanvas" style={{ width: "100%", height: "100%", display: "block" }}></canvas>
          </div>
        </div>

      </div>
    </section>
  );
}
