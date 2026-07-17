"use client";

import { useEffect, useRef } from "react";

interface CardItem {
  id: string;
  canvasId: string;
  riveUrl: string;
  artboard: string;
  title: string;
  desc: string;
}

export default function D2CShowcaseSection() {
  const RiveInstancesRef = useRef<{ [key: string]: any }>({});

  const cardItems: CardItem[] = [
    {
      id: "omnichannel",
      canvasId: "d2cCanvasOmnichannel",
      riveUrl: "https://cdn.prod.website-files.com/6965e6515fb6b18e928e6d0f/69ad3943994d447651431735_d2c_omnichannel.riv",
      artboard: "D2C_Omnichannel",
      title: "Omnichannel Payments",
      desc: "One unified view of your online and offline sales so you understand customers, not just channels."
    },
    {
      id: "self-healing",
      canvasId: "d2cCanvasSelfHealing",
      riveUrl: "https://cdn.prod.website-files.com/6965e6515fb6b18e928e6d0f/69ad39431a69d7718b6f5351_9f9fee54daf961f290548be76651cc9f_d2c_self_healing.riv",
      artboard: "D2C_Self Healing",
      title: "Self Healing POS",
      desc: "Built-in diagnostics that prevent device failures by auto-connecting when network drops and extending battery life."
    },
    {
      id: "command-centre",
      canvasId: "d2cCanvasPos",
      riveUrl: "https://cdn.prod.website-files.com/6965e6515fb6b18e928e6d0f/69ad39439271d1728aa54737_d2c_pos.riv",
      artboard: "D2C_POS",
      title: "POS Command Centre",
      desc: "A centralised dashboard to monitor device health, transaction performance, and issue diagnostics across your POS fleet in real time."
    }
  ];

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

    const initAllRive = () => {
      cardItems.forEach((card) => {
        const canvas = document.getElementById(card.canvasId) as HTMLCanvasElement;
        if (!canvas) return;

        // Cleanup previous instance before instantiating
        if (RiveInstancesRef.current[card.id]) {
          try {
            RiveInstancesRef.current[card.id].cleanup();
          } catch (e) {}
          delete RiveInstancesRef.current[card.id];
        }

        // Set dimensions relative to screen resolution
        const rect = canvas.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio, 2);
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        try {
          RiveInstancesRef.current[card.id] = new (window as any).rive.Rive({
            src: card.riveUrl,
            canvas: canvas,
            autoplay: true,
            stateMachines: "State Machine 1",
            artboard: card.artboard,
            layout: new (window as any).rive.Layout({
              fit: (window as any).rive.Fit.Contain,
              alignment: (window as any).rive.Alignment.Center
            }),
            onLoad: () => {
              try {
                RiveInstancesRef.current[card.id].resizeDrawingSurfaceToCanvas();
              } catch (e) {}
            }
          });
        } catch (err) {
          console.error(`Rive Canvas load error for ${card.id}:`, err);
        }
      });
    };

    loadRiveScript(() => {
      initAllRive();
    });

    const handleResize = () => {
      cardItems.forEach((card) => {
        const canvas = document.getElementById(card.canvasId) as HTMLCanvasElement;
        const instance = RiveInstancesRef.current[card.id];
        if (canvas && instance) {
          const rect = canvas.getBoundingClientRect();
          const dpr = Math.min(window.devicePixelRatio, 2);
          canvas.width = rect.width * dpr;
          canvas.height = rect.height * dpr;
          try {
            instance.resizeDrawingSurfaceToCanvas();
          } catch (e) {}
        }
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cardItems.forEach((card) => {
        if (RiveInstancesRef.current[card.id]) {
          try {
            RiveInstancesRef.current[card.id].cleanup();
          } catch (e) {}
          delete RiveInstancesRef.current[card.id];
        }
      });
    };
  }, []);

  return (
    <section className="d2c-showcase-section" id="d2c-solutions">
      
      {/* Background radial lighting */}
      <div className="d2c-radial-glow-left"></div>
      <div className="d2c-radial-glow-right"></div>

      <div className="d2c-container">
        
        {/* Section title & eyebrow info */}
        <div className="d2c-header">
          <span className="d2c-eyebrow">[ D2C CAPABILITIES ]</span>
          <h2 className="d2c-main-title">Omnichannel POS solutions.</h2>
        </div>

        {/* 3-Column Grid */}
        <div className="d2c-grid">
          {cardItems.map((card) => (
            <div key={card.id} className="d2c-card">
              
              {/* Canvas visual top frame */}
              <div className="d2c-canvas-wrap">
                <canvas id={card.canvasId} style={{ width: "100%", height: "100%", display: "block" }}></canvas>
              </div>

              {/* Card copy information */}
              <div className="d2c-card-info">
                <h3 className="d2c-card-title">{card.title}</h3>
                <p className="d2c-card-desc">{card.desc}</p>
                <a href="#contact" className="d2c-cta-btn">
                  READ MORE <span className="explore-arrow">&gt;</span>
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
