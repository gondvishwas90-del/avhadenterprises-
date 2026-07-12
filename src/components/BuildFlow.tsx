"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Globe,
  ArrowRight,
  Check,
  RotateCcw,
  Layers,
  ShieldCheck,
  Zap,
  Activity,
  Award,
  Search,
  Eye,
  TrendingUp,
  Cpu,
  Play,
  Pause,
  Mail,
  MessageSquare,
  Send,
  ExternalLink,
  Lock,
  ChevronRight
} from "lucide-react";

type DragState =
  | "idle"
  | "dropped"
  | "received"
  | "pipeline_studio"
  | "pipeline_teams"
  | "assembly"
  | "delivered"
  | "compiling"
  | "blueprint"
  | "building_3d"
  | "camera_transition"
  | "live_prototype";

export default function BuildFlow() {
  const [dragState, setDragState] = useState<DragState>("idle");
  const [websiteUrl, setWebsiteUrl] = useState("www.businesswebsite.com");
  const [inputUrl, setInputUrl] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [assemblyProgress, setAssemblyProgress] = useState(0);

  // Sub-step index trackers to handle delayed status switches in the lists
  const [studioStep, setStudioStep] = useState(0);
  const [teamStep, setTeamStep] = useState(0);
  const [assemblyStep, setAssemblyStep] = useState(0);

  // Live Prototype Interactive States
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMouseInside, setIsMouseInside] = useState(false);
  const [activeTab, setActiveTab] = useState<"strategy" | "tech" | "design">("strategy");
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(false);
  
  // Form states
  const [emailInput, setEmailInput] = useState("");
  const [msgInput, setMsgInput] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  const browserContentRef = useRef<HTMLDivElement>(null);

  // Triggered when website card is dropped or clicked
  const startWorkflow = (urlToUse?: string) => {
    if (dragState !== "idle") return;

    if (urlToUse) {
      setWebsiteUrl(urlToUse);
    } else if (inputUrl.trim()) {
      // Clean up URL format
      let formattedUrl = inputUrl.trim();
      formattedUrl = formattedUrl.replace(/^(https?:\/\/)?(www\.)?/, "");
      setWebsiteUrl(formattedUrl);
    }

    setDragState("dropped");
  };

  // State Machine Timers for Workflow Steps
  useEffect(() => {
    if (dragState === "dropped") {
      // Step 2: Website slides in and locks (0.8s slide duration)
      const timer = setTimeout(() => {
        setDragState("received");
      }, 800);
      return () => clearTimeout(timer);
    }

    if (dragState === "received") {
      // Step 2 Initializing Assessment (1.8s duration)
      const timer = setTimeout(() => {
        setDragState("pipeline_studio");
        setStudioStep(0);
      }, 1800);
      return () => clearTimeout(timer);
    }

    if (dragState === "pipeline_studio") {
      // Step 3: Studio starts working - 6 stages progress sequentially
      const intervals = [0, 1000, 2000, 3000, 4000, 5000];
      const timers = intervals.map((delay, index) =>
        setTimeout(() => {
          setStudioStep(index + 1);
        }, delay)
      );

      // Transition to Step 4 after all studio steps complete (6.5s)
      const transitionTimer = setTimeout(() => {
        setDragState("pipeline_teams");
        setTeamStep(0);
      }, 6500);

      return () => {
        timers.forEach((t) => clearTimeout(t));
        clearTimeout(transitionTimer);
      };
    }

    if (dragState === "pipeline_teams") {
      // Step 4: Each department completes its stage
      const intervals = [0, 900, 1800, 2700, 3600, 4500];
      const timers = intervals.map((delay, index) =>
        setTimeout(() => {
          setTeamStep(index + 1);
        }, delay)
      );

      // Transition to Step 5 (Assembly) after teams complete (5.8s)
      const transitionTimer = setTimeout(() => {
        setDragState("assembly");
        setAssemblyProgress(0);
        setAssemblyStep(0);
      }, 5800);

      return () => {
        timers.forEach((t) => clearTimeout(t));
        clearTimeout(transitionTimer);
      };
    }

    if (dragState === "assembly") {
      // Step 5: Digital Assembly
      // Progress bar goes from 0 to 100% in 6 seconds
      const interval = setInterval(() => {
        setAssemblyProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1;
        });
      }, 60);

      return () => clearInterval(interval);
    }

    // New 3D reveal sequence steps
    if (dragState === "delivered") {
      // Show transformation complete checklist, then auto-start sequence after 3.5s
      const timer = setTimeout(() => {
        setDragState("compiling");
      }, 3500);
      return () => clearTimeout(timer);
    }

    if (dragState === "compiling") {
      // Show dissolving blur, then wireframe blueprints after 2s
      const timer = setTimeout(() => {
        setDragState("blueprint");
      }, 2000);
      return () => clearTimeout(timer);
    }

    if (dragState === "blueprint") {
      // Holographic wireframe displays, then build structure after 2.5s
      const timer = setTimeout(() => {
        setDragState("building_3d");
      }, 2500);
      return () => clearTimeout(timer);
    }

    if (dragState === "building_3d") {
      // Structure extrudes in depth, then tilt camera after 2.8s
      const timer = setTimeout(() => {
        setDragState("camera_transition");
      }, 2800);
      return () => clearTimeout(timer);
    }

    if (dragState === "camera_transition") {
      // Camera turns back flat, browser interface fades in (2.2s duration)
      const timer = setTimeout(() => {
        setDragState("live_prototype");
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [dragState]);

  // Sync assembly checklist steps with the progress bar percentage
  useEffect(() => {
    if (dragState === "assembly") {
      if (assemblyProgress >= 100) setAssemblyStep(7);
      else if (assemblyProgress >= 90) setAssemblyStep(6);
      else if (assemblyProgress >= 75) setAssemblyStep(5);
      else if (assemblyProgress >= 60) setAssemblyStep(4);
      else if (assemblyProgress >= 45) setAssemblyStep(3);
      else if (assemblyProgress >= 30) setAssemblyStep(2);
      else if (assemblyProgress >= 15) setAssemblyStep(1);

      if (assemblyProgress === 100) {
        // Step 6: Transition to final Delivery screen
        const timer = setTimeout(() => {
          setDragState("delivered");
        }, 1200);
        return () => clearTimeout(timer);
      }
    }
  }, [assemblyProgress, dragState]);

  const handleReset = () => {
    setDragState("idle");
    setAssemblyProgress(0);
    setStudioStep(0);
    setTeamStep(0);
    setAssemblyStep(0);
    setInputUrl("");
    setVideoPlaying(false);
    setEmailInput("");
    setMsgInput("");
    setFormSubmitted(false);
    setFormError("");
  };

  // Drag and Drop Event Handlers
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("text/plain", websiteUrl);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (dragState === "idle") {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (dragState === "idle") {
      const droppedUrl = e.dataTransfer.getData("text/plain");
      startWorkflow(droppedUrl || undefined);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      startWorkflow();
    }
  };

  // Capture mouse coordinates relative to the mock browser window
  const handleBrowserMouseMove = (e: React.MouseEvent) => {
    if (!browserContentRef.current) return;
    const rect = browserContentRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // Handles mock website form submits
  const handleMockFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim() || !emailInput.includes("@")) {
      setFormError("Please enter a valid email address");
      return;
    }
    if (!msgInput.trim()) {
      setFormError("Message content cannot be blank");
      return;
    }
    setFormError("");
    setFormSubmitted(true);
  };

  // Checklist status icon selector
  const getStatusIcon = (status: "waiting" | "active" | "completed") => {
    if (status === "completed") {
      return <Check size={12} className="buildflow-icon-completed" />;
    }
    if (status === "active") {
      return <div className="buildflow-spinner"></div>;
    }
    return <span className="buildflow-dot-waiting"></span>;
  };

  // Determine if studio headers/footers/reset layers should show based on state
  const isFinalStates = dragState === "live_prototype";
  const isTransitioning = 
    dragState === "compiling" || 
    dragState === "blueprint" || 
    dragState === "building_3d" || 
    dragState === "camera_transition";

  return (
    <section id="buildflow" className="buildflow-section">
      <div className="ambient-glow-1"></div>
      
      <div className="buildflow-container">
        
        {/* Full Header only visible if studio isn't fully transformed into live_prototype */}
        {!isFinalStates && (
          <div style={{ marginBottom: "3rem" }}>
            <span className="buildflow-eyebrow">
              <Sparkles size={14} className="sparkle-icon" /> [ 01.7 — DIGITAL PRODUCTION STUDIO ]
            </span>
            <h2 className="buildflow-title" style={{ margin: 0 }}>
              Avhad BuildFlow
            </h2>
            <p className="buildflow-desc" style={{ marginTop: "1rem", marginBottom: 0 }}>
              Watch your website pass through Avhad's automated orchestration studio. 
              Experience our integrated workflow pipeline aligning strategy, design system alignment, 
              deep search engine preparation, and marketing automation in real time.
            </p>
          </div>
        )}

        {/* 3D Perspective Shell Wrapper */}
        <div className="buildflow-workspace-wrapper">
          
          {/* Header/Footer Tags that stay overlaying when Live browser appears */}
          {isFinalStates && (
            <>
              <div className="buildflow-studio-header-tag">
                Rendered by Avhad Studio
              </div>
              <div className="buildflow-studio-footer-tag">
                Live Prototype
              </div>
              <div className="buildflow-studio-reset-overlay">
                <button onClick={handleReset} className="buildflow-btn-reset-prototype">
                  <RotateCcw size={11} /> Reset Studio
                </button>
              </div>
            </>
          )}

          {/* Core Studio Mockup Window */}
          <div
            className={`buildflow-workspace-card ${
              dragState === "camera_transition" || dragState === "building_3d" ? "tilt-active" : ""
            }`}
            style={{
              width: "100%",
              maxWidth: isFinalStates ? "960px" : "880px",
              height: isFinalStates ? "620px" : "540px",
              transition: "max-width 1s ease, height 1s ease, transform 1.8s ease"
            }}
          >
            
            {/* Window header buttons panel (hidden when website is fully loaded) */}
            {!isFinalStates && (
              <div className="buildflow-window-header">
                <div className="buildflow-window-dots">
                  <span className="buildflow-dot red"></span>
                  <span className="buildflow-dot yellow"></span>
                  <span className="buildflow-dot green"></span>
                </div>
                <div className="buildflow-window-title">
                  {dragState === "idle" && "WORKSPACE INITIALIZATION"}
                  {dragState === "dropped" && "IMPORTING ASSET"}
                  {dragState === "received" && "STUDIO RECEIVED ASSET"}
                  {dragState === "pipeline_studio" && "DIGITAL ASSESSMENT ACTIVE"}
                  {dragState === "pipeline_teams" && "DEPARTMENT COLLABORATION STAGE"}
                  {dragState === "assembly" && "DIGITAL ASSEMBLY ACTIVE"}
                  {dragState === "delivered" && "TRANSFORMATION DEPLOYED"}
                  {isTransitioning && "COMPILING PIPELINE DEPLOYMENT"}
                </div>
                <div style={{ width: 42 }}></div>
              </div>
            )}

            {/* Render different stages based on State Machine */}
            
            {/* 1. standard Onboarding Grid (Before compiling) */}
            {!isTransitioning && !isFinalStates && dragState !== "delivered" && (
              <div className="buildflow-workspace-body">
                
                {/* Left side checklist status panel */}
                <div className="buildflow-side-dashboard">
                  <div className="buildflow-dashboard-header">
                    <span className="buildflow-dashboard-tag">
                      <Activity size={12} />
                      {dragState === "idle" && "System Standby"}
                      {dragState === "dropped" && "Importing..."}
                      {dragState === "received" && "Assessment queued"}
                      {dragState === "pipeline_studio" && "Assessment Stage"}
                      {dragState === "pipeline_teams" && "Collaborating"}
                      {dragState === "assembly" && "Assembly Stage"}
                    </span>
                    
                    <h3 className="buildflow-dashboard-title">
                      {dragState === "idle" && "Build Studio Active"}
                      {dragState === "dropped" && "Importing website..."}
                      {dragState === "received" && "Website Received"}
                      {dragState === "pipeline_studio" && "Assessment Pipeline"}
                      {dragState === "pipeline_teams" && "Studio Departments"}
                      {dragState === "assembly" && "Rebuilding Website"}
                    </h3>

                    {dragState === "idle" && (
                      <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", lineHeight: 1.4, marginTop: "0.5rem" }}>
                        Drag and drop the prepared website card on the right, or enter a URL below to launch Avhad's digital assessment workflow.
                      </p>
                    )}

                    {dragState === "received" && (
                      <p style={{ fontSize: "0.75rem", color: "var(--accent-primary)", fontWeight: 700, lineHeight: 1.4, marginTop: "0.5rem" }}>
                        Initializing Digital Assessment...
                      </p>
                    )}

                    {/* Step 3: Studio Checklist */}
                    {dragState === "pipeline_studio" && (
                      <div className="buildflow-pipeline-container">
                        {[
                          "Website Imported",
                          "Structure Analysis",
                          "Brand Review",
                          "UX Review",
                          "SEO Review",
                          "Performance Review"
                        ].map((name, idx) => {
                          let itemStatus: "waiting" | "active" | "completed" = "waiting";
                          if (studioStep > idx) itemStatus = "completed";
                          else if (studioStep === idx) itemStatus = "active";

                          return (
                            <div
                              key={name}
                              className={`buildflow-pipeline-item ${
                                itemStatus === "completed"
                                  ? "completed"
                                  : itemStatus === "active"
                                  ? "active"
                                  : "waiting"
                              }`}
                            >
                              <span className="buildflow-status-dot">
                                {getStatusIcon(itemStatus)}
                              </span>
                              <span className="buildflow-pipeline-name">{name}</span>
                              <span className="buildflow-pipeline-status">
                                {itemStatus === "completed" && "✓"}
                                {itemStatus === "active" && "⟳"}
                                {itemStatus === "waiting" && "waiting"}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Step 4: Collaboration Checklist */}
                    {dragState === "pipeline_teams" && (
                      <div className="buildflow-pipeline-container">
                        {[
                          "Information Architecture",
                          "Brand Strategy",
                          "UI/UX Optimization",
                          "SEO Foundation",
                          "Automation Planning",
                          "Performance Engineering"
                        ].map((name, idx) => {
                          let itemStatus: "waiting" | "active" | "completed" = "waiting";
                          if (teamStep > idx) itemStatus = "completed";
                          else if (teamStep === idx) itemStatus = "active";

                          return (
                            <div
                              key={name}
                              className={`buildflow-pipeline-item ${
                                itemStatus === "completed"
                                  ? "completed"
                                  : itemStatus === "active"
                                  ? "active"
                                  : "waiting"
                              }`}
                            >
                              <span className="buildflow-status-dot">
                                {getStatusIcon(itemStatus)}
                              </span>
                              <span className="buildflow-pipeline-name">{name}</span>
                              <span className="buildflow-pipeline-status">
                                {itemStatus === "completed" && "complete"}
                                {itemStatus === "active" && "active"}
                                {itemStatus === "waiting" && "waiting"}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Step 5: Assembly Checklist */}
                    {dragState === "assembly" && (
                      <div className="buildflow-pipeline-container">
                        {[
                          "Building Homepage",
                          "Rebuilding Navigation",
                          "Creating Design System",
                          "Optimizing Conversion Flow",
                          "Connecting CRM",
                          "Integrating Automation",
                          "Final Quality Review"
                        ].map((name, idx) => {
                          let itemStatus: "waiting" | "active" | "completed" = "waiting";
                          if (assemblyStep > idx) itemStatus = "completed";
                          else if (assemblyStep === idx) itemStatus = "active";

                          return (
                            <div
                              key={name}
                              className={`buildflow-pipeline-item ${
                                itemStatus === "completed"
                                  ? "completed"
                                  : itemStatus === "active"
                                  ? "active"
                                  : "waiting"
                              }`}
                            >
                              <span className="buildflow-status-dot">
                                {getStatusIcon(itemStatus)}
                              </span>
                              <span className="buildflow-pipeline-name">{name}</span>
                              <span className="buildflow-pipeline-status">
                                {itemStatus === "completed" && "✓"}
                                {itemStatus === "active" && "⟳"}
                                {itemStatus === "waiting" && "waiting"}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}

                  </div>

                  {/* Sidebar bottom info slot */}
                  <div className="buildflow-workspace-status-box">
                    <span className="buildflow-status-box-title">
                      <Cpu size={12} className="sparkle-icon" />
                      {dragState === "idle" && "Studio Awaiting"}
                      {dragState === "dropped" && "Asset Slide In"}
                      {dragState === "received" && "Studio Assessment"}
                      {dragState === "pipeline_studio" && "Reviewing Core Factors"}
                      {dragState === "pipeline_teams" && "Internal Sync"}
                      {dragState === "assembly" && "Assembly active"}
                    </span>
                    <p className="buildflow-status-box-desc">
                      {dragState === "idle" && "Ready to import site parameters. Drop the card to trigger."}
                      {dragState === "dropped" && "Injecting parameters into the studio sandbox node."}
                      {dragState === "received" && "Assessment started. Verifying DOM layouts and structures."}
                      {dragState === "pipeline_studio" && "Executing detailed scanning diagnostics on content."}
                      {dragState === "pipeline_teams" && "UX, branding, SEO and automation heads aligning details."}
                      {dragState === "assembly" && "Rebuilding component files, layouts and connecting webhooks."}
                    </p>
                  </div>
                </div>

                {/* Right side workspaces panel */}
                <div className="buildflow-studio-workspace">
                  
                  {dragState === "idle" && (
                    <div
                      className={`buildflow-drop-zone ${isDragOver ? "dragover" : ""}`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <Layers size={36} className="buildflow-dropzone-icon" />
                      <span className="buildflow-dropzone-text">
                        Drag & Drop Website Here
                      </span>
                      
                      {/* Clicking input fallback form */}
                      <form onSubmit={handleFormSubmit} onClick={(e) => e.stopPropagation()} className="buildflow-url-input-container">
                        <input
                          type="text"
                          placeholder="Type URL & press Enter"
                          value={inputUrl}
                          onChange={(e) => setInputUrl(e.target.value)}
                          className="buildflow-url-input"
                        />
                        <button type="submit" className="buildflow-btn-submit">
                          Go
                        </button>
                      </form>
                    </div>
                  )}

                  {/* Prepared draggable site card */}
                  {dragState === "idle" && (
                    <div
                      className="buildflow-card-wrapper"
                      draggable
                      onDragStart={handleDragStart}
                      onClick={() => startWorkflow()}
                      style={{
                        left: "calc(50% - 100px)",
                        bottom: "35px"
                      }}
                    >
                      <div className="buildflow-website-card">
                        <Globe size={14} style={{ color: "var(--accent-primary)" }} />
                        <span>{websiteUrl}</span>
                      </div>

                      {/* Looping gesture overlay */}
                      <div className="buildflow-drag-gesture">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M15 18H9.5a5.5 5.5 0 0 1-5.5-5.5v0A5.5 5.5 0 0 1 9.5 7h.5" />
                          <path d="M15 12V6a2 2 0 0 1 4 0v10a3 3 0 0 1-6 0v-4" />
                          <path d="m12 15-3-3 3-3" />
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Card sliding state */}
                  {(dragState === "dropped" || dragState === "received") && (
                    <div className="buildflow-active-workspace-content">
                      <div
                        className="buildflow-website-card"
                        style={{
                          transform: dragState === "dropped" ? "scale(0.9) translateY(40px)" : "scale(1.1)",
                          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                          borderColor: "var(--accent-primary)",
                          boxShadow: "0 0 30px rgba(255, 107, 74, 0.25)"
                        }}
                      >
                        <Globe size={14} style={{ color: "var(--accent-primary)" }} />
                        <span>{websiteUrl}</span>
                      </div>
                      <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", animation: "pulse-ring-glow 2s infinite" }}>
                        {dragState === "dropped" ? "Locking into studio slot..." : "Workspace Active — Initializing assessments..."}
                      </p>
                    </div>
                  )}

                  {/* Diagnostics list states */}
                  {(dragState === "pipeline_studio" || dragState === "pipeline_teams") && (
                    <div className="buildflow-active-workspace-content">
                      <div className="buildflow-website-card" style={{ scale: "1.05", borderStyle: "solid", borderColor: "rgba(255, 107, 74, 0.4)" }}>
                        <Globe size={14} style={{ color: "var(--accent-primary)" }} />
                        <span>{websiteUrl}</span>
                      </div>
                      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                        <div className="buildflow-spinner" style={{ width: 16, height: 16, borderLeftColor: "var(--accent-primary)" }}></div>
                        <span style={{ fontSize: "0.8rem", fontWeight: "bold" }}>
                          {dragState === "pipeline_studio" ? "Running assessments..." : "Collaborating with internal teams..."}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Assembly loading progress */}
                  {dragState === "assembly" && (
                    <div className="buildflow-active-workspace-content">
                      <div className="buildflow-assembly-box">
                        <div className="buildflow-assembly-title">
                          <span>Assembly Node</span>
                          <span style={{ color: "var(--accent-primary)" }}>{assemblyProgress}%</span>
                        </div>
                        <div className="buildflow-assembly-bar">
                          <div className="buildflow-assembly-progress" style={{ width: `${assemblyProgress}%` }}></div>
                        </div>
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "flex", flexDirection: "column", gap: "0.25rem", alignItems: "center" }}>
                        <span>Constructing files & layout templates</span>
                        <span style={{ color: "var(--accent-primary)" }}>
                          {assemblyProgress < 30 && "Building structure layers..."}
                          {assemblyProgress >= 30 && assemblyProgress < 60 && "Mapping styles & branding tokens..."}
                          {assemblyProgress >= 60 && assemblyProgress < 90 && "Optimizing layouts & database syncs..."}
                          {assemblyProgress >= 90 && "Running quality code lint tests..."}
                        </span>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            )}

            {/* 2. Step 6: Transformation Complete Screen */}
            {dragState === "delivered" && (
              <div className="buildflow-delivery-panel" style={{ height: "100%" }}>
                <div className="buildflow-delivery-badge">
                  <Award size={14} />
                  <span>Orchestration Complete</span>
                </div>
                
                <h3 className="buildflow-delivery-title">
                  Digital Transformation Complete
                </h3>

                <div className="buildflow-delivery-grid">
                  <span className="buildflow-delivery-pill"><Check size={12} /> Strategy</span>
                  <span className="buildflow-delivery-pill"><Check size={12} /> Design</span>
                  <span className="buildflow-delivery-pill"><Check size={12} /> Technology</span>
                  <span className="buildflow-delivery-pill"><Check size={12} /> Growth</span>
                  <span className="buildflow-delivery-pill"><Check size={12} /> Automation</span>
                  <span className="buildflow-delivery-pill" style={{ borderColor: "rgba(255, 107, 74, 0.2)" }}>
                    <Check size={12} style={{ color: "var(--accent-primary)" }} /> Scale
                  </span>
                </div>

                <p className="buildflow-delivery-statement">
                  The platform architecture has been synthesized and compiled inside our production studio.
                  <strong className="buildflow-delivery-statement-highlight">
                    From first impression to scalable digital ecosystem—this is how Avhad builds for growth.
                  </strong>
                </p>

                <p style={{ fontSize: "0.7rem", color: "var(--accent-primary)", marginTop: "1rem", letterSpacing: "0.05em", fontWeight: 700, textTransform: "uppercase", animation: "pulseSlow 1s infinite alternate" }}>
                  Preparing deployment sequence...
                </p>
              </div>
            )}

            {/* ================= NEW DEPLOYMENT SEQUENCE STAGES ================= */}

            {/* 3. Compiling Screen */}
            {dragState === "compiling" && (
              <div className="buildflow-compiling-panel">
                <div className="buildflow-spinner" style={{ width: 28, height: 28, borderLeftColor: "var(--accent-primary)", borderWidth: "3px" }}></div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800 }}>Compiling Digital Experience...</h3>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", maxWidth: "280px", lineHeight: "1.5" }}>
                  Generating source build bundles, linking strategic route maps, and drawing layout components.
                </p>
              </div>
            )}

            {/* 4. Blueprint (Stage 1) */}
            {dragState === "blueprint" && (
              <div className="buildflow-blueprint-canvas">
                <svg className="buildflow-blueprint-line-drawing">
                  <line x1="5%" y1="10%" x2="95%" y2="10%" />
                  <line x1="5%" y1="90%" x2="95%" y2="90%" />
                  <line x1="15%" y1="5%" x2="15%" y2="95%" />
                  <line x1="85%" y1="5%" x2="85%" y2="95%" />
                </svg>
                <div className="buildflow-blueprint-grid">
                  <div className="buildflow-blueprint-item" style={{ animationDelay: "0s" }}>
                    <span>Navigation Bar Node</span>
                    <span>h: 48px</span>
                  </div>
                  <div className="buildflow-blueprint-item" style={{ animationDelay: "0.2s", height: "80px" }}>
                    <span>Hero Section Frame</span>
                    <span>100vh</span>
                  </div>
                  <div className="buildflow-blueprint-item" style={{ animationDelay: "0.4s", height: "120px" }}>
                    <span>Features Columns Matrix</span>
                    <span>flex grid</span>
                  </div>
                  <div className="buildflow-blueprint-item" style={{ animationDelay: "0.6s" }}>
                    <span>Footer Blocks Slot</span>
                    <span>h: 120px</span>
                  </div>
                </div>
              </div>
            )}

            {/* 5. Building 3D Extrusion (Stage 2) */}
            {dragState === "building_3d" && (
              <div className="buildflow-structure-canvas">
                <div className="buildflow-structure-item" style={{ animationDelay: "0s", transform: "translateZ(10px)" }}>
                  <span>Navigation Header Card</span>
                  <span style={{ fontSize: "0.6rem", color: "var(--accent-primary)" }}>Unlocked (z: 15px)</span>
                </div>
                <div className="buildflow-structure-item" style={{ animationDelay: "0.2s", height: "90px", transform: "translateZ(30px)" }}>
                  <span>Hero Content Frame & Strategic Elements</span>
                  <span style={{ fontSize: "0.6rem", color: "var(--accent-primary)" }}>Extruding (z: 40px)</span>
                </div>
                <div className="buildflow-structure-item" style={{ animationDelay: "0.4s", height: "100px", transform: "translateZ(20px)" }}>
                  <span>Feature Service Nodes (Grid)</span>
                  <span style={{ fontSize: "0.6rem", color: "var(--accent-primary)" }}>Elevated (z: 25px)</span>
                </div>
                <div className="buildflow-structure-item" style={{ animationDelay: "0.6s", transform: "translateZ(5px)" }}>
                  <span>Interactive Systems Footer</span>
                  <span style={{ fontSize: "0.6rem", color: "var(--accent-primary)" }}>Locked (z: 5px)</span>
                </div>
              </div>
            )}

            {/* 6. Camera Rotation Placeholder (Stage 3) */}
            {dragState === "camera_transition" && (
              <div className="buildflow-compiling-panel">
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800 }}>Aligning Browser Interface...</h3>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  Rotating coordinate nodes into interactive canvas slot.
                </p>
                <div className="buildflow-spinner" style={{ width: 20, height: 20 }}></div>
              </div>
            )}

            {/* 7. Fully Interactive Browser Mockup (Stage 4 / Final Reveal) */}
            {dragState === "live_prototype" && (
              <div className="buildflow-live-browser">
                
                {/* Browser Header Bar */}
                <div className="buildflow-browser-header">
                  <div className="buildflow-window-dots">
                    <span className="buildflow-dot red" style={{ width: 8, height: 8 }}></span>
                    <span className="buildflow-dot yellow" style={{ width: 8, height: 8 }}></span>
                    <span className="buildflow-dot green" style={{ width: 8, height: 8 }}></span>
                  </div>
                  
                  <div className="buildflow-browser-address-bar">
                    <Lock size={10} style={{ color: "#10b981" }} />
                    <span>https://{websiteUrl}/live-prototype</span>
                  </div>
                  
                  <div style={{ display: "flex", gap: "0.4rem" }}>
                    <span style={{ fontSize: "0.65rem", padding: "0.1rem 0.4rem", background: "rgba(16, 185, 129, 0.15)", borderRadius: "4px", color: "#10b981", fontWeight: 800 }}>
                      ACTIVE
                    </span>
                  </div>
                </div>

                {/* Simulated Interactive Page Container */}
                <div
                  ref={browserContentRef}
                  className="buildflow-browser-content-wrapper"
                  onMouseMove={handleBrowserMouseMove}
                  onMouseEnter={() => setIsMouseInside(true)}
                  onMouseLeave={() => setIsMouseInside(false)}
                >
                  
                  {/* Local Mouse lighting and custom cursor */}
                  {isMouseInside && (
                    <>
                      <div className="mock-web-cursor" style={{ left: mousePos.x, top: mousePos.y }}></div>
                      <div className="mock-web-cursor-glow" style={{ left: mousePos.x, top: mousePos.y }}></div>
                    </>
                  )}

                  {/* Actual Mock Website Body */}
                  <div className="mock-web-body">
                    
                    {/* Simulated Navbar */}
                    <header className="mock-web-nav">
                      <div className="mock-web-logo">
                        AVHAD<span>STUDIO</span>
                      </div>
                      <nav className="mock-web-links">
                        <span className="mock-web-link active">Home</span>
                        <span className="mock-web-link">Strategy</span>
                        <span className="mock-web-link">Specs</span>
                        <span className="mock-web-link">Inquire</span>
                      </nav>
                    </header>

                    {/* Simulated Hero Banner */}
                    <div className="mock-web-hero">
                      <h4 className="mock-web-hero-title">
                        Transforming {websiteUrl.replace(".com", "")} Into A Scalable Growth Node.
                      </h4>
                      <p className="mock-web-hero-desc">
                        Deploying custom micro-service frameworks, automation pipelines, and high-performance SEO indices.
                      </p>
                      <button className="mock-web-hero-btn" onClick={() => alert("Deployment Assessment Confirmed!")}>
                        Explore Architecture <ArrowRight size={10} style={{ display: "inline", marginLeft: "0.2rem" }} />
                      </button>
                    </div>

                    {/* Interactive Tab Switcher */}
                    <div className="mock-web-tabs-section">
                      <h4 className="mock-web-section-title">Transformation Hub</h4>
                      <div className="mock-web-tabs-header">
                        <button
                          onClick={() => setActiveTab("strategy")}
                          className={`mock-web-tab-btn ${activeTab === "strategy" ? "active" : ""}`}
                        >
                          Strategy Node
                        </button>
                        <button
                          onClick={() => setActiveTab("tech")}
                          className={`mock-web-tab-btn ${activeTab === "tech" ? "active" : ""}`}
                        >
                          Technology Stack
                        </button>
                        <button
                          onClick={() => setActiveTab("design")}
                          className={`mock-web-tab-btn ${activeTab === "design" ? "active" : ""}`}
                        >
                          Core Experience
                        </button>
                      </div>
                      
                      <div className="mock-web-tab-content">
                        {activeTab === "strategy" && (
                          <p>
                            We analyze competitors and design bespoke routes mapping to your growth KPIs. 
                            Our systems align operational resources to increase lead pipeline flow by up to **42%**.
                          </p>
                        )}
                        {activeTab === "tech" && (
                          <p>
                            High-performance React/Next.js routes, serverless background hooks, 
                            optimized edge CDN endpoints, and database connection pools that reduce latency down to **0.8s**.
                          </p>
                        )}
                        {activeTab === "design" && (
                          <p>
                            Bespoke glassmorphic components, fluid mouse movement responses, 
                            magnetic button loops, and precise typography spacing delivering an award-winning first impression.
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Interactive Cards Matrix with 3D tilts */}
                    <div className="mock-web-grid">
                      <div className="mock-web-card">
                        <h5 className="mock-web-card-title">01 / Pipeline</h5>
                        <p className="mock-web-card-desc">Continuous automated workflow synchronizations.</p>
                      </div>
                      <div className="mock-web-card">
                        <h5 className="mock-web-card-title">02 / SEO Index</h5>
                        <p className="mock-web-card-desc">Sitemap maps structures and search ranks.</p>
                      </div>
                      <div className="mock-web-card">
                        <h5 className="mock-web-card-title">03 / Analytics</h5>
                        <p className="mock-web-card-desc">Live performance telemetry systems.</p>
                      </div>
                      <div className="mock-web-card">
                        <h5 className="mock-web-card-title">04 / CRM Integrations</h5>
                        <p className="mock-web-card-desc">Webhook captures client details instantly.</p>
                      </div>
                    </div>

                    {/* Interactive Slider */}
                    <div className="mock-web-slider-section">
                      <h4 className="mock-web-section-title">Telemetry Index</h4>
                      <div className="mock-web-slider-wrapper">
                        <div className="mock-web-slider-track" style={{ transform: `translateX(-${sliderIndex * 100}%)` }}>
                          
                          <div className="mock-web-slide">
                            <span className="mock-web-slide-value">+84.6%</span>
                            <span className="mock-web-slide-label">Conversion Rate Boost</span>
                            <span className="mock-web-slide-desc">Based on fast layout loads and checkout pipelines.</span>
                          </div>

                          <div className="mock-web-slide">
                            <span className="mock-web-slide-value">0.8s</span>
                            <span className="mock-web-slide-label">Average LCP Load Speed</span>
                            <span className="mock-web-slide-desc">Fully optimized modern images and render assets.</span>
                          </div>

                          <div className="mock-web-slide">
                            <span className="mock-web-slide-value">-65%</span>
                            <span className="mock-web-slide-label">Database Overhead Load</span>
                            <span className="mock-web-slide-desc">Using localized edge caching layers.</span>
                          </div>

                        </div>
                        
                        <div className="mock-web-slider-dots">
                          {[0, 1, 2].map((idx) => (
                            <span
                              key={idx}
                              onClick={() => setSliderIndex(idx)}
                              className={`mock-web-slider-dot ${sliderIndex === idx ? "active" : ""}`}
                            ></span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Accordion expand widget */}
                    <div className="mock-web-accordion-section">
                      <h4 className="mock-web-section-title">Orchestration FAQs</h4>
                      <div className="mock-web-accordion">
                        
                        {[
                          { q: "Is the CRM connection secure?", a: "Yes, every pipeline includes standard SSL headers and token authentication schemas." },
                          { q: "Does layout support mobile?", a: "Fully responsive layouts built with flexible grids adapt instantly to any size screen." },
                          { q: "Are optimizations automated?", a: "Yes, automated workflow pipelines trigger rebuilds when source updates compile." }
                        ].map((item, idx) => {
                          const isExpanded = activeAccordion === idx;
                          return (
                            <div key={idx} className="mock-web-accordion-item">
                              <div
                                onClick={() => setActiveAccordion(isExpanded ? null : idx)}
                                className="mock-web-accordion-header"
                              >
                                <span>{item.q}</span>
                                <ChevronRight size={12} style={{ transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
                              </div>
                              {isExpanded && (
                                <div className="mock-web-accordion-content">
                                  {item.a}
                                </div>
                              )}
                            </div>
                          );
                        })}

                      </div>
                    </div>

                    {/* Interactive Video Player Widget */}
                    <div className="mock-web-video-section">
                      <h4 className="mock-web-section-title">Studio Video Reel</h4>
                      <div className="mock-web-video-player" onClick={() => setVideoPlaying(!videoPlaying)}>
                        <div className="mock-web-video-bg" style={{ transform: videoPlaying ? "scale(1.1)" : "scale(1)" }}></div>
                        <div className="mock-web-video-overlay"></div>
                        <div className="mock-web-video-btn">
                          {videoPlaying ? <Pause size={18} /> : <Play size={18} style={{ fill: "currentColor" }} />}
                        </div>
                        <span className="mock-web-video-status">
                          {videoPlaying ? "Streaming Live..." : "Stopped (Click to Play)"}
                        </span>
                      </div>
                    </div>

                    {/* Interactive validation contact form */}
                    <div className="mock-web-form-section">
                      <h4 className="mock-web-section-title">Strategic Inquiry</h4>
                      {!formSubmitted ? (
                        <form onSubmit={handleMockFormSubmit} className="mock-web-form">
                          <input
                            type="email"
                            placeholder="Your email address"
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                            className="mock-web-form-input"
                          />
                          <input
                            type="text"
                            placeholder="Brief project details"
                            value={msgInput}
                            onChange={(e) => setMsgInput(e.target.value)}
                            className="mock-web-form-input"
                          />
                          {formError && <p style={{ color: "#ef4444", fontSize: "0.65rem", fontWeight: 700 }}>{formError}</p>}
                          <button type="submit" className="mock-web-form-submit">
                            <Send size={10} style={{ display: "inline", marginRight: "0.3rem" }} /> Send Request
                          </button>
                        </form>
                      ) : (
                        <div className="mock-web-form-success">
                          ✓ Inquiry Sent Successfully! Our strategic consultants will follow up.
                        </div>
                      )}
                    </div>

                  </div>
                </div>

              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
