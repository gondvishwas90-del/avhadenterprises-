"use client";

import { useEffect, useRef, useState } from "react";

interface RiveComponent {
  name: string;
  rotation: number;
}

export default function OperationsAutomation() {
  const RiveInstanceRef = useRef<any>(null);
  const [riveComps, setRiveComps] = useState<RiveComponent[]>([]);

  const handleRotationChange = (name: string, value: number) => {
    const artboard = RiveInstanceRef.current?.artboard;
    if (artboard && typeof artboard.transformComponent === "function") {
      try {
        const comp = artboard.transformComponent(name);
        if (comp) {
          comp.rotation = (value * Math.PI) / 180;
          setRiveComps(prev =>
            prev.map(c => (c.name === name ? { ...c, rotation: value } : c))
          );
        }
      } catch (e) {}
    }
  };

  const rotateTowardsMePreset = () => {
    const presetValues: Record<string, number> = {
      Pcl: 30,    // Tilt screen lid forward towards viewer
      pcc: 25,    // Rotate chassis to turn more towards viewer
      PCr7: 25,
      PCt: 25,
      PCxj: 25
    };
    
    const artboard = RiveInstanceRef.current?.artboard;
    if (artboard && typeof artboard.transformComponent === "function") {
      riveComps.forEach(comp => {
        try {
          const c = artboard.transformComponent(comp.name);
          if (c) {
            const rotDeg = presetValues[comp.name] ?? 25;
            c.rotation = (rotDeg * Math.PI) / 180;
          }
        } catch(e) {}
      });
      
      setRiveComps(prev => prev.map(comp => ({
        ...comp,
        rotation: presetValues[comp.name] ?? 25
      })));
    }
  };

  // Initialize Rive canvas animation for Operations Automation
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
      const canvas = document.getElementById("automationRiveCanvas") as HTMLCanvasElement;
      if (!canvas) return;

      // Cleanup previous instance before instantiating
      if (RiveInstanceRef.current) {
        try {
          RiveInstanceRef.current.cleanup();
        } catch (e) { }
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
          useOffscreenRenderer: true,
          layout: new (window as any).rive.Layout({
            fit: (window as any).rive.Fit.Contain,
            alignment: (window as any).rive.Alignment.Center
          }),
          onLoad: () => {
            try {
              RiveInstanceRef.current.resizeDrawingSurfaceToCanvas();
              (window as any).riveInstance = RiveInstanceRef.current;
              console.log("Rive instance loaded and exposed to window.riveInstance");
              
              const artboard = RiveInstanceRef.current.artboard;
              
              // Find and initialize list of PC components and rotate them towards viewer by default
              const PC_BONE_NAMES = ["Pcl", "pcc", "PCr7", "PCt", "PCxj"];
              const defaultPresetValues: Record<string, number> = {
                Pcl: 30,    // Tilt screen lid forward towards viewer
                pcc: 25,    // Rotate chassis to turn more towards viewer
                PCr7: 25,
                PCt: 25,
                PCxj: 25
              };
              const foundComps: RiveComponent[] = [];
              if (artboard && typeof artboard.transformComponent === "function") {
                PC_BONE_NAMES.forEach(name => {
                  try {
                    const comp = artboard.transformComponent(name);
                    if (comp) {
                      // Apply default preset rotation to face towards user
                      const rotDeg = defaultPresetValues[name] ?? 25;
                      comp.rotation = (rotDeg * Math.PI) / 180;
                      foundComps.push({
                        name,
                        rotation: rotDeg
                      });
                    }
                  } catch (e) {}
                });
              }
              setRiveComps(foundComps);
            } catch (e: any) {
              console.error("Error in Rive onLoad:", e);
            }
          }
        });
      } catch (err) {
        console.error("Rive Canvas load error:", err);
      }
    };

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      console.warn("WebGL context lost on automation canvas.");
      if (RiveInstanceRef.current) {
        try {
          RiveInstanceRef.current.cleanup();
        } catch (e) {}
        RiveInstanceRef.current = null;
      }
    };

    const handleContextRestored = () => {
      console.log("WebGL context restored on automation canvas. Re-initializing...");
      initRive();
    };

    const canvas = document.getElementById("automationRiveCanvas");
    if (canvas) {
      canvas.addEventListener("webglcontextlost", handleContextLost);
      canvas.addEventListener("webglcontextrestored", handleContextRestored);
    }

    loadRiveScript(() => {
      initRive();
    });

    const handleResize = () => {
      const canvas = document.getElementById("automationRiveCanvas") as HTMLCanvasElement;
      if (canvas && RiveInstanceRef.current) {
        const rect = canvas.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio, 2);
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        try {
          RiveInstanceRef.current.resizeDrawingSurfaceToCanvas();
        } catch (e) { }
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      const canvas = document.getElementById("automationRiveCanvas");
      if (canvas) {
        canvas.removeEventListener("webglcontextlost", handleContextLost);
        canvas.removeEventListener("webglcontextrestored", handleContextRestored);
      }
      if (RiveInstanceRef.current) {
        try {
          RiveInstanceRef.current.cleanup();
        } catch (e) { }
        RiveInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <section className="automation-showcase-section" id="automation-solutions">
      <div className="automation-grid">

        {/* Left Column: Headline and Content Copy */}
        <div className="automation-content-col">
          <h2 className="automation-title">
            Don't let manual operations weigh you down.
          </h2>

          <div className="automation-copy-wrapper">
            <h4 className="automation-eyebrow">Intelligent Workflow Automation</h4>
            <p className="automation-description">
              The efficiency of a custom automated workforce built directly into your business processes.
            </p>
          </div>

          <a href="#contact" className="automation-cta-btn">
            AUTOMATE WORKFLOWS <span className="explore-arrow">&gt;</span>
          </a>
        </div>

        {/* Right Column: Rive Interactive Canvas */}
        <div className="automation-visual-col">
          <div className="automation-canvas-container">
            <canvas id="automationRiveCanvas" style={{ width: "100%", height: "100%", display: "block" }}></canvas>

            {/* HTML Overlay covering the legacy Razorpay Credit Line popup with our custom service card */}
            <div className="automation-overlay-card">
              <div className="automation-overlay-header">
                <span className="automation-overlay-dot"></span>
                <span className="automation-overlay-title">AI WORKFLOW ACTIVE</span>
                <span className="automation-overlay-close">×</span>
              </div>
              <div className="automation-overlay-body">
                <span className="automation-overlay-check">✓</span>
                <span className="automation-overlay-text">Salesforce Sync Complete</span>
              </div>
            </div>

            {/* Interactive panel to adjust laptop rotation */}
            {riveComps.length > 0 && (
              <div className="automation-control-panel">
                <h5>Rotate Laptop Elements</h5>
                {riveComps.map((comp) => (
                  <div key={comp.name} className="control-item">
                    <label>
                      <span>{comp.name === "Pcl" ? "PC Lid (Pcl)" : comp.name === "pcc" ? "PC Chassis (pcc)" : comp.name}</span>
                      <span>{comp.rotation}°</span>
                    </label>
                    <input
                      type="range"
                      min="-180"
                      max="180"
                      value={comp.rotation}
                      onChange={(e) => handleRotationChange(comp.name, Number(e.target.value))}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  className="preset-btn"
                  onClick={rotateTowardsMePreset}
                >
                  Rotate Towards Me
                </button>
              </div>
            )}

            <style>{`
              .automation-control-panel {
                position: absolute;
                bottom: 20px;
                right: 20px;
                background: rgba(10, 10, 10, 0.7);
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                padding: 16px;
                width: 240px;
                z-index: 10;
                color: #fff;
                font-family: inherit;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
                display: flex;
                flex-direction: column;
                gap: 12px;
              }
              .automation-control-panel h5 {
                font-size: 0.75rem;
                font-weight: 800;
                text-transform: uppercase;
                letter-spacing: 0.08em;
                margin: 0;
                color: #00ff00;
                border-bottom: 1px solid rgba(255, 255, 255, 0.15);
                padding-bottom: 6px;
              }
              .control-item {
                display: flex;
                flex-direction: column;
                gap: 4px;
              }
              .control-item label {
                display: flex;
                justify-content: space-between;
                font-size: 0.65rem;
                color: rgba(255, 255, 255, 0.7);
                font-weight: 600;
              }
              .control-item input[type="range"] {
                width: 100%;
                accent-color: #00ff00;
                background: rgba(255, 255, 255, 0.1);
                height: 4px;
                border-radius: 2px;
                cursor: pointer;
              }
              .preset-btn {
                background: linear-gradient(135deg, #00ff00, #00aa00);
                border: none;
                color: #000;
                font-size: 0.7rem;
                font-weight: 700;
                padding: 6px 10px;
                border-radius: 4px;
                cursor: pointer;
                transition: transform 0.15s, filter 0.15s;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                margin-top: 4px;
              }
              .preset-btn:hover {
                transform: translateY(-1px);
                filter: brightness(1.1);
              }
              .preset-btn:active {
                transform: translateY(0);
              }
            `}</style>
          </div>
        </div>

      </div>
    </section>
  );
}
