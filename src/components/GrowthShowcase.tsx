"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp, Sparkles, ArrowRight, Zap, Target, Search } from "lucide-react";

export default function GrowthShowcase() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Auto-pulse state for the unlock button to draw user attention
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => !p);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="growth-showcase-section" id="growth-engine">
      <div className="growth-container">

        {/* Tier 1: Section Header */}
        <div className="growth-header">
          <div className="growth-header-left">
            <span className="growth-index">04/</span>
            <h2 className="growth-heading">For Hyper-Growth Brands</h2>
          </div>
        </div>

        {/* Tier 2: Split Visual Showcase */}
        <div className="growth-showcase-grid">

          {/* Left Column: Context Card */}
          <div className="growth-context-col">
            <p className="growth-pitch">
              "Because standard pipelines don't scale. Avhad builds automated digital ecosystems that turn user touchpoints into compounding growth loops."
            </p>
            <h3 className="growth-showcase-title">
              Unlock exponential loops for your brand.
            </h3>
          </div>

          {/* Right Column: Interactive Conversions Slider, Button, and Glass Envelope */}
          <div className="growth-visual-col">
            <div className={`dashboard-wrapper ${isUnlocked ? "unlocked-state" : ""}`}>

              {/* Dynamic Radial glow backdrops */}
              <div className={`dashboard-glow ${isUnlocked ? "glow-active" : "glow-locked"}`}></div>

              {/* Frosted Envelope Sleeve */}
              <div className="envelope-container">

                {/* Envelope Back Plate */}
                <div className="envelope-back"></div>

                {/* Nested Stacked Cards */}
                <div className={`envelope-card card-cyan ${isUnlocked ? "card-unlocked-0" : ""}`}>
                  <div className="card-mini-header">
                    <span className="card-mini-num">01</span>
                    <span className="card-mini-name">STRATEGY</span>
                  </div>
                  <div className="card-mini-body">
                    <div className="mini-icon-circle"><Target size={11} color="#00e5ff" /></div>
                    <div className="mini-title">Digital Strategy</div>
                  </div>
                </div>

                <div className={`envelope-card card-green ${isUnlocked ? "card-unlocked-1" : ""}`}>
                  <div className="card-mini-header">
                    <span className="card-mini-num">02</span>
                    <span className="card-mini-name">SEO</span>
                  </div>
                  <div className="card-mini-body">
                    <div className="mini-icon-circle"><Search size={11} color="#00ff88" /></div>
                    <div className="mini-title">SEO & Content</div>
                  </div>
                </div>

                <div className={`envelope-card card-gold ${isUnlocked ? "card-unlocked-2" : ""}`}>
                  <div className="card-mini-header">
                    <span className="card-mini-num">03</span>
                    <span className="card-mini-name">ADS</span>
                  </div>
                  <div className="card-mini-body">
                    <div className="mini-icon-circle"><TrendingUp size={11} color="#ffb300" /></div>
                    <div className="mini-title">Performance Ads</div>
                  </div>
                </div>

                <div className={`envelope-card card-purple ${isUnlocked ? "card-unlocked-3" : ""}`}>
                  <div className="card-mini-header">
                    <span className="card-mini-num">04</span>
                    <span className="card-mini-name">BRAND</span>
                  </div>
                  <div className="card-mini-body">
                    <div className="mini-icon-circle"><Sparkles size={11} color="#d500f9" /></div>
                    <div className="mini-title">Brand Dev</div>
                  </div>
                </div>

                {/* Frosted Envelope Pocket Front Lip */}
                <div className="envelope-pocket-front">
                  <div className="pocket-lip-line"></div>
                  <div className="pocket-brand">AVHAD SERVICES SLEEVE</div>
                </div>

              </div>

              {/* Conversions Slider */}
              <div className="conversions-slider-container">
                <div className="slider-label">CONVERSIONS</div>
                <div className="slider-track">
                  <div
                    className="slider-bar"
                    style={{ width: isUnlocked ? "100%" : "40%" }}
                  ></div>
                  <div
                    className="slider-handle"
                    style={{ left: isUnlocked ? "100%" : "40%" }}
                  ></div>
                </div>
              </div>

              {/* Unlock Button */}
              <div className="btn-row">
                <button
                  type="button"
                  className={`unlock-btn-pill ${isUnlocked ? "pill-active" : ""} ${pulse && !isUnlocked ? "pill-pulse" : ""}`}
                  onClick={() => setIsUnlocked(!isUnlocked)}
                >
                  <span className="btn-label">{isUnlocked ? "Lock State" : "Unlock Growth"}</span>
                  <div className="switch-container">
                    <div className={`switch-dot ${isUnlocked ? "switch-active" : ""}`}></div>
                  </div>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Premium Embedded Stylesheet */}
      <style>{`
        .growth-showcase-section {
          background-color: #000000;
          color: #ffffff;
          padding: 8rem 2rem;
          position: relative;
          overflow: hidden;
          font-family: inherit;
        }

        .growth-container {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 6rem;
        }

        /* Tier 1: Header styling */
        .growth-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 2.5rem;
          gap: 4rem;
        }

        .growth-header-left {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .growth-index {
          font-size: 2.5rem;
          font-weight: 800;
          color: #00e5ff;
          font-family: monospace;
          letter-spacing: -0.05em;
        }

        .growth-heading {
          font-size: 2rem;
          font-weight: 800;
          letter-spacing: -0.03em;
        }

        .growth-header-right {
          max-width: 500px;
        }

        .growth-pitch {
          font-size: 0.95rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.6);
          font-style: italic;
        }

        /* Tier 2: Grid and Columns styling */
        .growth-showcase-grid {
          display: grid;
          grid-template-columns: 45% 55%;
          align-items: center;
          gap: 5rem;
        }

        .growth-context-col {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .growth-showcase-title {
          font-size: 3rem;
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.04em;
        }

        /* Right Column layout styling */
        .growth-visual-col {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .dashboard-wrapper {
          position: relative;
          width: 100%;
          max-width: 860px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }

        .dashboard-glow {
          position: absolute;
          width: 420px;
          height: 420px;
          border-radius: 50%;
          filter: blur(90px);
          opacity: 0.45;
          transition: background 0.8s ease;
          z-index: 1;
          top: -20px;
        }

        .glow-locked {
          background: radial-gradient(circle, #005fff, transparent 70%);
        }

        .glow-active {
          background: radial-gradient(circle, #00ff88, transparent 70%);
        }

        .envelope-container {
          position: relative;
          width: 480px;
          height: 380px;
          z-index: 2;
          perspective: 1200px;
          transform-style: preserve-3d;
        }

        .envelope-back {
          position: absolute;
          inset: 0;
          background: rgba(8, 8, 8, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 16px;
          z-index: 1;
        }

        .envelope-card {
          position: absolute;
          width: 260px;
          height: 173px;
          border-radius: 12px;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 0.8s, z-index 0.8s;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: linear-gradient(135deg, #121212, #060606);
          left: 50%;
          margin-left: -130px;
          bottom: 10px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }

        /* Initial Nested/Tucked styles */
        .card-cyan {
          z-index: 2;
          transform: translate3d(0, -90px, 0) rotate(-2deg);
        }

        .card-green {
          z-index: 3;
          transform: translate3d(3px, -92px, 0) rotate(1deg);
        }

        .card-gold {
          z-index: 4;
          transform: translate3d(-3px, -94px, 0) rotate(-1.5deg);
        }

        .card-purple {
          z-index: 5;
          transform: translate3d(2px, -96px, 0) rotate(2.5deg);
        }

        /* Unlocked Fanning Out math positions (Organic Scattered 3D Spatial Deck) */
        .envelope-card.card-unlocked-0 {
          z-index: 5;
          transform: translate3d(-215px, -240px, -70px) rotateY(28deg) rotateZ(-3deg);
          border-color: rgba(0, 229, 255, 0.35);
          box-shadow: -12px 18px 30px rgba(0, 229, 255, 0.12);
        }
        .envelope-card.card-unlocked-0:hover {
          z-index: 30 !important;
          transform: translate3d(-215px, -240px, 40px) rotateY(0deg) rotateZ(0deg) scale(1.05) !important;
          border-color: #00e5ff !important;
          box-shadow: 0 20px 40px rgba(0, 229, 255, 0.35) !important;
        }

        .envelope-card.card-unlocked-1 {
          z-index: 6;
          transform: translate3d(-70px, -290px, -15px) rotateY(8deg) rotateZ(1deg);
          border-color: rgba(0, 255, 136, 0.35);
          box-shadow: -5px 18px 30px rgba(0, 255, 136, 0.12);
        }
        .envelope-card.card-unlocked-1:hover {
          z-index: 30 !important;
          transform: translate3d(-70px, -290px, 40px) rotateY(0deg) rotateZ(0deg) scale(1.05) !important;
          border-color: #00ff88 !important;
          box-shadow: 0 20px 40px rgba(0, 255, 136, 0.35) !important;
        }

        .envelope-card.card-unlocked-2 {
          z-index: 7;
          transform: translate3d(75px, -275px, -25px) rotateY(-12deg) rotateZ(-2.5deg);
          border-color: rgba(255, 179, 0, 0.35);
          box-shadow: 6px 18px 30px rgba(255, 179, 0, 0.12);
        }
        .envelope-card.card-unlocked-2:hover {
          z-index: 30 !important;
          transform: translate3d(75px, -275px, 40px) rotateY(0deg) rotateZ(0deg) scale(1.05) !important;
          border-color: #ffb300 !important;
          box-shadow: 0 20px 40px rgba(255, 179, 0, 0.35) !important;
        }

        .envelope-card.card-unlocked-3 {
          z-index: 8;
          transform: translate3d(220px, -250px, -60px) rotateY(-25deg) rotateZ(4deg);
          border-color: rgba(213, 0, 249, 0.35);
          box-shadow: 12px 18px 30px rgba(213, 0, 249, 0.12);
        }
        .envelope-card.card-unlocked-3:hover {
          z-index: 30 !important;
          transform: translate3d(220px, -250px, 40px) rotateY(0deg) rotateZ(0deg) scale(1.05) !important;
          border-color: #d500f9 !important;
          box-shadow: 0 20px 40px rgba(213, 0, 249, 0.35) !important;
        }

        /* Mini card contents */
        .card-mini-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .card-mini-num {
          font-size: 0.5rem;
          font-family: monospace;
          color: rgba(255, 255, 255, 0.3);
        }

        .card-mini-name {
          font-size: 0.5rem;
          font-weight: 900;
          letter-spacing: 0.05em;
          color: rgba(255, 255, 255, 0.4);
        }

        .card-mini-body {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          align-items: flex-start;
        }

        .mini-icon-circle {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mini-title {
          font-size: 0.65rem;
          font-weight: 750;
          letter-spacing: -0.01em;
        }

        /* Frosted Envelope Pocket Front Lip */
        .envelope-pocket-front {
          position: absolute;
          inset: 0;
          background: rgba(14, 14, 14, 0.55);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          z-index: 10;
          pointer-events: none;
          clip-path: polygon(0% 30%, 35% 30%, 50% 50%, 65% 30%, 100% 30%, 100% 100%, 0% 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 1.5rem;
        }

        .pocket-lip-line {
          position: absolute;
          left: 0;
          top: 30%;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.15), rgba(255,255,255,0.02));
          display: none; /* Handled by clip path border visuals */
        }

        .pocket-brand {
          font-size: 0.55rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          color: rgba(255, 255, 255, 0.25);
          text-align: center;
        }

        /* Success bubble floating element */
        .telemetry-badge-bubble {
          position: absolute;
          top: -20px;
          right: -30px;
          background: #00ff88;
          color: #000000;
          border-radius: 30px;
          padding: 0.4rem 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          z-index: 11;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.5s ease 0.2s, transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.2s;
          box-shadow: 0 10px 20px rgba(0, 255, 136, 0.25);
        }

        .telemetry-badge-bubble.bubble-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .telemetry-badge-bubble span {
          font-size: 0.55rem;
          font-weight: 900;
          letter-spacing: 0.02em;
        }

        .bubble-icon {
          animation: bubbleBounce 1.5s ease-in-out infinite alternate;
        }

        @keyframes bubbleBounce {
          from { transform: translateY(0); }
          to { transform: translateY(-2px); }
        }

        /* Conversions Progress Slider styling */
        .conversions-slider-container {
          width: 100%;
          max-width: 480px;
          display: flex;
          align-items: center;
          gap: 1.25rem;
          margin-top: 1rem;
        }

        .slider-label {
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.4);
          white-space: nowrap;
        }

        .slider-track {
          flex-grow: 1;
          height: 2px;
          background: rgba(255, 255, 255, 0.15);
          position: relative;
          border-radius: 1px;
        }

        .slider-bar {
          height: 100%;
          background: #ffffff;
          position: absolute;
          left: 0;
          top: 0;
          transition: width 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .slider-handle {
          width: 6px;
          height: 6px;
          background: #ffffff;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          transition: left 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          box-shadow: 0 0 10px #ffffff;
        }

        .unlocked-state .conversions-slider-container .slider-bar,
        .unlocked-state .conversions-slider-container .slider-handle {
          background: #00ff88;
          box-shadow: 0 0 10px #00ff88;
        }

        /* Unlock Pill Button */
        .btn-row {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .unlock-btn-pill {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          background: #ffffff;
          color: #000000;
          border: none;
          font-size: 0.85rem;
          font-weight: 750;
          padding: 0.8rem 1rem 0.8rem 2rem;
          border-radius: 99px;
          cursor: pointer;
          width: 210px;
          transition: transform 0.2s, box-shadow 0.3s;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
        }

        .unlock-btn-pill:hover {
          transform: scale(1.02);
        }

        .unlock-btn-pill.pill-pulse {
          box-shadow: 0 8px 24px rgba(0, 229, 255, 0.2), 0 0 0 0 rgba(0, 229, 255, 0.4);
          animation: btnPulse 2s infinite;
        }

        @keyframes btnPulse {
          0% { box-shadow: 0 8px 24px rgba(0, 229, 255, 0.2), 0 0 0 0 rgba(0, 229, 255, 0.5); }
          70% { box-shadow: 0 8px 24px rgba(0, 229, 255, 0.2), 0 0 0 12px rgba(0, 229, 255, 0); }
          100% { box-shadow: 0 8px 24px rgba(0, 229, 255, 0.2), 0 0 0 0 rgba(0, 229, 255, 0); }
        }

        .unlock-btn-pill.pill-active {
          box-shadow: 0 8px 24px rgba(0, 255, 136, 0.15);
        }

        .switch-container {
          width: 32px;
          height: 18px;
          background: rgba(0, 0, 0, 0.1);
          border-radius: 99px;
          position: relative;
        }

        .switch-dot {
          width: 12px;
          height: 12px;
          background: #000000;
          border-radius: 50%;
          position: absolute;
          top: 3px;
          left: 3px;
          transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), background-color 0.3s;
        }

        .switch-active {
          transform: translateX(14px);
          background-color: #00ff88;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .growth-showcase-grid {
            grid-template-columns: 1fr;
            gap: 4rem;
          }
          .growth-showcase-title {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 768px) {
          .growth-header {
            flex-direction: column;
            gap: 1.5rem;
          }
          .growth-showcase-title {
            font-size: 2.25rem;
          }
          .growth-showcase-section {
            padding: 5rem 1.5rem;
          }
        }
      `}</style>

    </section>
  );
}
