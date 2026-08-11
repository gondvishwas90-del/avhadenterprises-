"use client";

import { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Tag,
  MousePointerClick,
  TrendingUp,
  CheckCircle2,
  Globe,
  MapPin,
  Layers3,
  Check,
  ArrowRight,
  ArrowLeft,
  ShieldCheck
} from "lucide-react";

export default function GoogleAdsShowcase() {
  // Sidebar active step stage (Step 1, Step 2, Review)
  const [activeTab, setActiveTab] = useState<"step1" | "step2" | "review">("step1");
  const [reviewStage, setReviewStage] = useState<"review_summary" | "published">("review_summary");
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Form & showcase states starting clean/unselected until hovered
  const [campaignName, setCampaignName] = useState<string>("");
  const [selectedGoal, setSelectedGoal] = useState<"leads" | "sales" | null>(null);
  const [campaignType, setCampaignType] = useState<"search" | "pmax" | null>(null);
  const [biddingStrategy, setBiddingStrategy] = useState<"conversions" | "clicks" | null>(null);
  const [dailyBudget, setDailyBudget] = useState<number>(25);

  // Mouse cursor animation states
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({ x: 80, y: 15 });
  const [isClicking, setIsClicking] = useState<boolean>(false);
  const [cursorVisible, setCursorVisible] = useState<boolean>(false);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

  // Element DOM Refs for dynamic bounding-box cursor targeting
  const containerRef = useRef<HTMLDivElement | null>(null);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const leadsGoalRef = useRef<HTMLDivElement | null>(null);
  const searchTypeRef = useRef<HTMLDivElement | null>(null);
  const step1TabRef = useRef<HTMLDivElement | null>(null);
  const step2TabRef = useRef<HTMLDivElement | null>(null);
  const step3TabRef = useRef<HTMLDivElement | null>(null);
  const conversionsCardRef = useRef<HTMLDivElement | null>(null);
  const recommendedBudgetRef = useRef<HTMLDivElement | null>(null);
  const publishBtnRef = useRef<HTMLButtonElement | null>(null);

  const activeTimeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const activeIntervalsRef = useRef<NodeJS.Timeout[]>([]);

  // Automatically focus input and keep caret at the end of text when typing
  useEffect(() => {
    if (isInputFocused && nameInputRef.current) {
      nameInputRef.current.focus();
      const len = campaignName.length;
      nameInputRef.current.setSelectionRange(len, len);
    }
  }, [isInputFocused, campaignName]);

  const clearAllTimers = () => {
    activeTimeoutsRef.current.forEach(clearTimeout);
    activeTimeoutsRef.current = [];
    activeIntervalsRef.current.forEach(clearInterval);
    activeIntervalsRef.current = [];
  };

  // Helper to compute target percentage coordinates relative to container
  const getTargetCoords = (targetEl: HTMLElement | null, offsetXPercent = 0.5, offsetYPercent = 0.5) => {
    if (!containerRef.current || !targetEl) return null;
    const containerRect = containerRef.current.getBoundingClientRect();
    const targetRect = targetEl.getBoundingClientRect();

    const targetXPixel = targetRect.left - containerRect.left + (targetRect.width * offsetXPercent);
    const targetYPixel = targetRect.top - containerRect.top + (targetRect.height * offsetYPercent);

    return {
      x: (targetXPixel / containerRect.width) * 100,
      y: (targetYPixel / containerRect.height) * 100
    };
  };

  const handleGoalSelect = (goal: "leads" | "sales") => {
    setSelectedGoal((prev) => (prev === goal ? null : goal));
    setCampaignType(null);
  };

  // Hover-driven interactive demo animation loop
  useEffect(() => {
    if (!isHovered) {
      clearAllTimers();
      setCursorVisible(false);
      setIsClicking(false);
      setIsInputFocused(false);
      // Reset to clean unselected baseline view when not hovered
      setActiveTab("step1");
      setReviewStage("review_summary");
      setCampaignName("");
      setSelectedGoal(null);
      setCampaignType(null);
      setBiddingStrategy(null);
      setDailyBudget(25);
      return;
    }

    // When hovered, trigger the step-by-step interactive sequence
    const runDemoLoop = () => {
      clearAllTimers();

      // 0. Reset to baseline starting state for demo
      setActiveTab("step1");
      setReviewStage("review_summary");
      setCampaignName("");
      setSelectedGoal(null);
      setCampaignType(null);
      setBiddingStrategy(null);
      setDailyBudget(25);
      setCursorVisible(true);
      setCursorPos({ x: 85, y: 12 });
      setIsClicking(false);
      setIsInputFocused(false);

      const addTimeout = (fn: () => void, delay: number) => {
        const id = setTimeout(fn, delay);
        activeTimeoutsRef.current.push(id);
        return id;
      };

      // 1. Move to Campaign Name Input & Click to Focus
      addTimeout(() => {
        const coords = getTargetCoords(nameInputRef.current, 0.25, 0.5);
        if (coords) setCursorPos(coords);
        else setCursorPos({ x: 35, y: 15 });
      }, 500);

      addTimeout(() => {
        setIsClicking(true);
        setIsInputFocused(true);
      }, 1100);

      addTimeout(() => {
        setIsClicking(false);
      }, 1300);

      // 2. Typewriter animation for "Nashik Dairy Products"
      addTimeout(() => {
        const fullText = "Nashik Dairy Products";
        let currentIndex = 0;

        const typeInterval = setInterval(() => {
          currentIndex++;
          setCampaignName(fullText.slice(0, currentIndex));
          if (currentIndex >= fullText.length) {
            clearInterval(typeInterval);
            setIsInputFocused(false);
          }
        }, 55);

        activeIntervalsRef.current.push(typeInterval);
      }, 1400);

      // 3. Move to Leads Goal Card & Click
      addTimeout(() => {
        const coords = getTargetCoords(leadsGoalRef.current, 0.3, 0.4);
        if (coords) setCursorPos(coords);
        else setCursorPos({ x: 35, y: 35 });
      }, 2800);

      addTimeout(() => {
        setIsClicking(true);
        setSelectedGoal("leads");
      }, 3400);

      addTimeout(() => {
        setIsClicking(false);
      }, 3600);

      // 4. Move to Search Campaign Type Card & Click
      addTimeout(() => {
        const coords = getTargetCoords(searchTypeRef.current, 0.3, 0.4);
        if (coords) setCursorPos(coords);
        else setCursorPos({ x: 35, y: 62 });
      }, 3900);

      addTimeout(() => {
        setIsClicking(true);
        setCampaignType("search");
      }, 4500);

      addTimeout(() => {
        setIsClicking(false);
      }, 4700);

      // 5. Move to Step 2 (Budget & Bidding) in Sidebar & Click
      addTimeout(() => {
        const coords = getTargetCoords(step2TabRef.current, 0.3, 0.5);
        if (coords) setCursorPos(coords);
        else setCursorPos({ x: 7, y: 22 });
      }, 5000);

      addTimeout(() => {
        setIsClicking(true);
        setActiveTab("step2");
      }, 5600);

      addTimeout(() => {
        setIsClicking(false);
      }, 5800);

      // 6. Move to Maximize Conversions Card & Click
      addTimeout(() => {
        const coords = getTargetCoords(conversionsCardRef.current, 0.3, 0.4);
        if (coords) setCursorPos(coords);
        else setCursorPos({ x: 35, y: 30 });
      }, 6100);

      addTimeout(() => {
        setIsClicking(true);
        setBiddingStrategy("conversions");
      }, 6700);

      addTimeout(() => {
        setIsClicking(false);
      }, 6900);

      // 7. Move Directly to $120/day Recommended Budget Option & Tap
      addTimeout(() => {
        const coords = getTargetCoords(recommendedBudgetRef.current, 0.5, 0.5);
        if (coords) setCursorPos(coords);
        else setCursorPos({ x: 50, y: 56 });
      }, 7200);

      addTimeout(() => {
        setIsClicking(true);
        setDailyBudget(120);
      }, 7800);

      addTimeout(() => {
        setIsClicking(false);
      }, 8100);

      // 8. Move to Step 3 (Review & Publish) in Sidebar & Click to open Review Summary Screen
      addTimeout(() => {
        const coords = getTargetCoords(step3TabRef.current, 0.3, 0.5);
        if (coords) setCursorPos(coords);
        else setCursorPos({ x: 7, y: 30 });
      }, 8900);

      addTimeout(() => {
        setIsClicking(true);
        setActiveTab("review");
        setReviewStage("review_summary");
      }, 9500);

      addTimeout(() => {
        setIsClicking(false);
      }, 9700);

      // 9. Move to "Publish campaign" Button in Review Summary Screen
      addTimeout(() => {
        const coords = getTargetCoords(publishBtnRef.current, 0.5, 0.5);
        if (coords) setCursorPos(coords);
        else setCursorPos({ x: 82, y: 88 });
      }, 10200);

      // 10. Click "Publish campaign" Button
      addTimeout(() => {
        setIsClicking(true);
      }, 10900);

      addTimeout(() => {
        setIsClicking(false);
        setReviewStage("published");
      }, 11100);

      // 11. Move Cursor to Center over Done checkmark screen
      addTimeout(() => {
        setCursorPos({ x: 50, y: 48 });
      }, 11400);

      // 12. Repeat animation loop if user continues hovering
      addTimeout(() => {
        if (isHovered) {
          runDemoLoop();
        }
      }, 15500);
    };

    runDemoLoop();

    return () => {
      clearAllTimers();
    };
  }, [isHovered]);

  return (
    <section id="google-ads-engine" className="relative py-20 md:py-28 bg-[#000000] text-white font-sans overflow-hidden">
      {/* Background Ambient Glow Accents */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,229,255,0.08),transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(255,107,74,0.06)_0%,transparent_70%)] pointer-events-none blur-3xl" />

      <div className="max-w-7xl xl:max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/30 text-xs font-mono tracking-widest uppercase shadow-[0_0_15px_rgba(0,229,255,0.15)]">
            <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-pulse" />
            [ 05 — GOOGLE ADS GROWTH ENGINE ]
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Google Ads <span className="font-serif italic font-normal text-[#F4B860]">Campaign Suite</span>
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Hover over the card below to watch our interactive workflow select campaign goals, type client details, set budget targets, review campaign settings, and publish Google Ads campaigns.
          </p>
        </div>

        {/* ELEGANT AUTHENTIC GOOGLE ADS APPLICATION CONTAINER */}
        <div
          ref={containerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="rounded-2xl border border-[#dadce0] bg-white text-zinc-900 shadow-[0_20px_70px_rgba(0,0,0,0.75)] overflow-hidden font-sans select-none transition-all duration-300 relative"
        >

          {/* REALISTIC PURE WHITE WINDOWS OS ARROW MOUSE CURSOR (NO HIGHLIGHTING / NO SHADOW / NO GLOW) */}
          {cursorVisible && (
            <div
              className="absolute pointer-events-none z-50 transition-all duration-700 ease-out flex items-start"
              style={{
                left: `${cursorPos.x}%`,
                top: `${cursorPos.y}%`,
                transform: `translate(0px, 0px) scale(${isClicking ? 0.85 : 1})`,
              }}
            >
              {/* Authentic Standard Pure White Windows Pointer Arrow */}
              <svg
                className="w-[17px] h-[23px]"
                viewBox="0 0 17 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 0V22.5L5.5 17L9.5 23L13.5 21.5L9.5 15.5L16.5 15.5Z"
                  fill="#FFFFFF"
                  stroke="#000000"
                  strokeWidth="1.2"
                  strokeLinejoin="miter"
                />
              </svg>
            </div>
          )}

          {/* GOOGLE ADS MAIN HEADER BAR */}
          <div className="bg-white border-b border-[#dadce0] px-4 sm:px-6 py-3 flex items-center justify-between gap-4 text-xs">

            {/* Left Branding & Breadcrumbs aligned with Sidebar */}
            <div className="flex items-center gap-0 min-w-0">
              <div className="w-[180px] sm:w-[200px] flex-shrink-0 flex items-center gap-2 font-medium text-[#202124] border-r border-[#dadce0] pr-3 sm:pr-4 py-0.5">
                <div className="flex items-center gap-0.5">
                  <span className="w-2.5 h-3.5 bg-[#ea4335] rounded-tl-sm rounded-br-sm transform -rotate-12" />
                  <span className="w-2.5 h-3.5 bg-[#fbbc04] rounded-tr-sm rounded-bl-sm transform rotate-12 -ml-1" />
                  <span className="w-2.5 h-3.5 bg-[#4285f4] rounded-sm -ml-1" />
                </div>
                <span className="font-semibold text-sm sm:text-base text-[#202124] tracking-tight">Google Ads</span>
              </div>

              <div className="text-[#5f6368] font-medium text-xs sm:text-sm flex items-center gap-1.5 pl-4 sm:pl-6 truncate">
                <span>New campaign</span>
                <span className="text-[#9aa0a6]">•</span>
                <span className="text-[#202124] font-semibold truncate">Search Campaign</span>
              </div>
            </div>

            {/* Right Account Controls */}
            <div className="flex items-center gap-2.5 text-[#5f6368] flex-shrink-0">
              <div className="hidden sm:flex items-center gap-2 bg-[#f1f3f4] border border-[#dadce0] rounded-full px-3.5 py-1 text-[11px] text-[#202124] font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Nashik Dairy Products (942-810-4491)</span>
              </div>

              <div className="w-8 h-8 rounded-full bg-[#1a73e8] text-white font-bold text-xs flex items-center justify-center shadow-sm">
                ND
              </div>
            </div>

          </div>

          {/* MAIN APPLICATION WORKSPACE CONTAINER */}
          <div className="flex flex-row bg-white overflow-hidden min-h-[500px]">

            {/* LEFT NAVIGATION SIDEBAR (AUTHENTIC GOOGLE MATERIAL STEPPER) */}
            <div className="w-[180px] sm:w-[200px] flex-shrink-0 bg-white border-r border-[#dadce0] p-4 sm:p-5 flex flex-col justify-start">

              {/* VERTICAL STEPPER TIMELINE */}
              <div className="space-y-5 relative">

                {/* STEP 1 */}
                <div
                  ref={step1TabRef}
                  onClick={() => setActiveTab("step1")}
                  className="flex items-center gap-3 cursor-pointer group py-1"
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all flex-shrink-0 z-10 ${activeTab === "step1"
                    ? "bg-[#1a73e8] text-white shadow-sm"
                    : activeTab === "step2" || activeTab === "review"
                      ? "bg-[#e8f0fe] text-[#1a73e8] border border-[#1a73e8]"
                      : "bg-white border-2 border-[#5f6368] text-[#5f6368]"
                    }`}>
                    {activeTab === "step2" || activeTab === "review" ? <Check className="w-4 h-4 stroke-[3]" /> : "1"}
                  </div>

                  <div className={`text-xs sm:text-[13px] transition-colors ${activeTab === "step1" ? "font-bold text-[#1a73e8]" : "font-semibold text-[#202124] group-hover:text-[#1a73e8]"
                    }`}>
                    Goal & Type
                  </div>
                </div>

                {/* STEP 2 */}
                <div
                  ref={step2TabRef}
                  onClick={() => setActiveTab("step2")}
                  className="flex items-center gap-3 cursor-pointer group py-1"
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all flex-shrink-0 z-10 ${activeTab === "step2"
                    ? "bg-[#1a73e8] text-white shadow-sm"
                    : activeTab === "review"
                      ? "bg-[#e8f0fe] text-[#1a73e8] border border-[#1a73e8]"
                      : "bg-white border-2 border-[#5f6368] text-[#5f6368]"
                    }`}>
                    {activeTab === "review" ? <Check className="w-4 h-4 stroke-[3]" /> : "2"}
                  </div>

                  <div className={`text-xs sm:text-[13px] transition-colors ${activeTab === "step2" ? "font-bold text-[#1a73e8]" : "font-semibold text-[#202124] group-hover:text-[#1a73e8]"
                    }`}>
                    Budget & Bidding
                  </div>
                </div>

                {/* STEP 3 */}
                <div
                  ref={step3TabRef}
                  onClick={() => {
                    setActiveTab("review");
                    setReviewStage("review_summary");
                  }}
                  className="flex items-center gap-3 cursor-pointer group py-1"
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all flex-shrink-0 z-10 ${activeTab === "review"
                    ? "bg-[#1a73e8] text-white shadow-sm"
                    : "bg-white border-2 border-[#5f6368] text-[#5f6368]"
                    }`}>
                    3
                  </div>

                  <div className={`text-xs sm:text-[13px] transition-colors ${activeTab === "review" ? "font-bold text-[#1a73e8]" : "font-semibold text-[#202124] group-hover:text-[#1a73e8]"
                    }`}>
                    Review & Publish
                  </div>
                </div>

              </div>

            </div>

            {/* RIGHT MAIN WORKSPACE AREA */}
            <div className="flex-1 min-w-0 py-6 sm:py-8 px-5 sm:px-8 flex flex-col justify-between text-zinc-900 min-h-[480px]">
              <div className="max-w-5xl w-full space-y-7">

                {/* STEP 1: OBJECTIVE & TYPE */}
                {activeTab === "step1" && (
                  <div className="flex flex-col gap-8 w-full animate-fadeIn">

                    {/* CAMPAIGN NAME SECTION */}
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-[#202124] block">Campaign Name</label>
                      <input
                        ref={nameInputRef}
                        type="text"
                        value={campaignName}
                        onChange={(e) => setCampaignName(e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-lg border outline-none text-xs sm:text-sm font-medium text-[#202124] bg-white transition shadow-sm ${isInputFocused
                          ? "border-[#1a73e8] ring-2 ring-[#1a73e8]/20"
                          : "border-[#dadce0] focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20"
                          }`}
                        placeholder="Type Campaign Name..."
                      />
                    </div>

                    {/* GOAL SELECTION SECTION */}
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm font-bold text-[#202124]">1. Select a campaign goal</div>
                        <div className="text-xs text-[#5f6368] mt-0.5">Choose what you want this campaign to achieve for your business.</div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Goal: Leads */}
                        <div
                          ref={leadsGoalRef}
                          onClick={() => handleGoalSelect("leads")}
                          className={`p-4 rounded-xl transition-all duration-200 cursor-pointer relative flex items-start gap-3.5 border-2 ${selectedGoal === "leads"
                            ? "border-[#1a73e8] bg-[#f8faff] shadow-sm opacity-100 scale-[1.02]"
                            : "border-[#dadce0] bg-white hover:border-[#bdc1c6] opacity-75 hover:opacity-100"
                            }`}
                        >
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${selectedGoal === "leads" ? "bg-[#e8f0fe] text-[#1a73e8]" : "bg-[#f1f3f4] text-[#5f6368]"
                            }`}>
                            <Tag className="w-4.5 h-4.5" />
                          </div>

                          <div className="space-y-0.5 min-w-0 flex-1">
                            <div className="text-xs sm:text-[13px] font-bold text-[#202124]">
                              Leads
                            </div>
                            <div className="text-[11px] text-[#5f6368] leading-relaxed font-normal">
                              Get qualified inquiries and phone calls for daily milk subscription & paneer orders.
                            </div>
                          </div>
                        </div>

                        {/* Goal: Sales */}
                        <div
                          onClick={() => handleGoalSelect("sales")}
                          className={`p-4 rounded-xl transition-all duration-200 cursor-pointer relative flex items-start gap-3.5 border-2 ${selectedGoal === "sales"
                            ? "border-[#1a73e8] bg-[#f8faff] shadow-sm opacity-100 scale-[1.02]"
                            : "border-[#dadce0] bg-white hover:border-[#bdc1c6] opacity-75 hover:opacity-100"
                            }`}
                        >
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${selectedGoal === "sales" ? "bg-[#e8f0fe] text-[#1a73e8]" : "bg-[#f1f3f4] text-[#5f6368]"
                            }`}>
                            <TrendingUp className="w-4.5 h-4.5" />
                          </div>

                          <div className="space-y-0.5 min-w-0 flex-1">
                            <div className="text-xs sm:text-[13px] font-bold text-[#202124]">
                              Sales
                            </div>
                            <div className="text-[11px] text-[#5f6368] leading-relaxed font-normal">
                              Drive online store orders directly for subscription packages and fresh dairy items.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* CAMPAIGN TYPE SECTION */}
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm font-bold text-[#202124]">2. Select a campaign type</div>
                        <div className="text-xs text-[#5f6368] mt-0.5">Select how you want your ads to reach target customers on Google.</div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Type: Search */}
                        <div
                          ref={searchTypeRef}
                          onClick={() => setCampaignType((prev) => (prev === "search" ? null : "search"))}
                          className={`p-4 rounded-xl transition-all duration-200 cursor-pointer relative flex items-start gap-3.5 border-2 ${campaignType === "search"
                            ? "border-[#1a73e8] bg-[#f8faff] shadow-sm opacity-100 scale-[1.02]"
                            : "border-[#dadce0] bg-white hover:border-[#bdc1c6] opacity-75 hover:opacity-100"
                            }`}
                        >
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${campaignType === "search" ? "bg-[#e8f0fe] text-[#1a73e8]" : "bg-[#f1f3f4] text-[#5f6368]"
                            }`}>
                            <MousePointerClick className="w-4.5 h-4.5" />
                          </div>

                          <div className="space-y-0.5 min-w-0 flex-1">
                            <div className="text-xs sm:text-[13px] font-bold text-[#202124]">
                              Search
                            </div>
                            <div className="text-[11px] text-[#5f6368] leading-relaxed font-normal">
                              Get in front of high-intent customers searching for "fresh A2 milk near me".
                            </div>
                          </div>
                        </div>

                        {/* Type: Performance Max */}
                        <div
                          onClick={() => setCampaignType((prev) => (prev === "pmax" ? null : "pmax"))}
                          className={`p-4 rounded-xl transition-all duration-200 cursor-pointer relative flex items-start gap-3.5 border-2 ${campaignType === "pmax"
                            ? "border-[#1a73e8] bg-[#f8faff] shadow-sm opacity-100 scale-[1.02]"
                            : "border-[#dadce0] bg-white hover:border-[#bdc1c6] opacity-75 hover:opacity-100"
                            }`}
                        >
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${campaignType === "pmax" ? "bg-[#e8f0fe] text-[#1a73e8]" : "bg-[#f1f3f4] text-[#5f6368]"
                            }`}>
                            <Layers3 className="w-4.5 h-4.5" />
                          </div>

                          <div className="space-y-0.5 min-w-0 flex-1">
                            <div className="text-xs sm:text-[13px] font-bold text-[#202124]">
                              Performance Max
                            </div>
                            <div className="text-[11px] text-[#5f6368] leading-relaxed font-normal">
                              Reach audiences across Search, YouTube, Gmail, Maps, and Display networks.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                )}

                {/* STEP 2: BUDGET & BIDDING */}
                {activeTab === "step2" && (
                  <div className="flex flex-col gap-8 w-full animate-fadeIn">

                    {/* BIDDING STRATEGY SECTION */}
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm font-bold text-[#202124]">1. Bidding Strategy</div>
                        <div className="text-xs text-[#5f6368] mt-0.5">Select how Google Ads optimizes bidding for your daily budget.</div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Maximize Conversions */}
                        <div
                          ref={conversionsCardRef}
                          onClick={() => setBiddingStrategy((prev) => (prev === "conversions" ? null : "conversions"))}
                          className={`p-4 rounded-xl transition-all duration-200 cursor-pointer relative flex items-start gap-3.5 border-2 ${biddingStrategy === "conversions"
                            ? "border-[#1a73e8] bg-[#f8faff] shadow-sm opacity-100 scale-[1.02]"
                            : "border-[#dadce0] bg-white hover:border-[#bdc1c6] opacity-75 hover:opacity-100"
                            }`}
                        >
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${biddingStrategy === "conversions" ? "bg-[#e8f0fe] text-[#1a73e8]" : "bg-[#f1f3f4] text-[#5f6368]"
                            }`}>
                            <Tag className="w-4.5 h-4.5" />
                          </div>

                          <div className="space-y-0.5 min-w-0 flex-1">
                            <div className="text-xs sm:text-[13px] font-bold text-[#202124]">
                              Maximize Conversions
                            </div>
                            <div className="text-[11px] text-[#5f6368] leading-relaxed font-normal">
                              Automatically set bids to get the highest volume of leads within your budget.
                            </div>
                          </div>
                        </div>

                        {/* Maximize Clicks */}
                        <div
                          onClick={() => setBiddingStrategy((prev) => (prev === "clicks" ? null : "clicks"))}
                          className={`p-4 rounded-xl transition-all duration-200 cursor-pointer relative flex items-start gap-3.5 border-2 ${biddingStrategy === "clicks"
                            ? "border-[#1a73e8] bg-[#f8faff] shadow-sm opacity-100 scale-[1.02]"
                            : "border-[#dadce0] bg-white hover:border-[#bdc1c6] opacity-75 hover:opacity-100"
                            }`}
                        >
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${biddingStrategy === "clicks" ? "bg-[#e8f0fe] text-[#1a73e8]" : "bg-[#f1f3f4] text-[#5f6368]"
                            }`}>
                            <MousePointerClick className="w-4.5 h-4.5" />
                          </div>

                          <div className="space-y-0.5 min-w-0 flex-1">
                            <div className="text-xs sm:text-[13px] font-bold text-[#202124]">
                              Maximize Clicks
                            </div>
                            <div className="text-[11px] text-[#5f6368] leading-relaxed font-normal">
                              Focus on driving maximum traffic volume to build brand awareness.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* DAILY BUDGET SECTION */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-4 flex-wrap">
                        <div>
                          <div className="text-sm font-bold text-[#202124]">2. Set your average daily budget</div>
                          <div className="text-xs text-[#5f6368] mt-0.5">The average amount you want to spend each day.</div>
                        </div>

                        <span className="bg-[#e8f0fe] text-[#1a73e8] font-semibold text-xs px-3 py-1 rounded-full inline-flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Recommended for Nashik region</span>
                        </span>
                      </div>

                      <div className="bg-white border border-[#dadce0] rounded-xl p-4 sm:p-5 space-y-3.5 shadow-sm">
                        <div className="flex items-center justify-between border-b border-[#dadce0] pb-2.5">
                          <span className="text-xs font-mono font-bold text-[#5f6368] tracking-wider uppercase">AVERAGE DAILY BUDGET</span>
                          <span className="text-xs sm:text-sm font-mono font-bold text-[#1a73e8] animate-pulse">
                            ${dailyBudget}.00 / day (₹{dailyBudget * 85}/day)
                          </span>
                        </div>

                        <input
                          type="range"
                          min="25"
                          max="500"
                          step="5"
                          value={dailyBudget}
                          onChange={(e) => setDailyBudget(Number(e.target.value))}
                          className="w-full accent-[#1a73e8] cursor-pointer h-2 bg-[#dadce0] rounded-full appearance-none transition-all"
                        />

                        {/* Interactive Budget Presets Grid */}
                        <div className="grid grid-cols-3 gap-2 text-xs pt-1">
                          <div
                            onClick={() => setDailyBudget(25)}
                            className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${dailyBudget === 25
                              ? "bg-[#e8f0fe] border-[#1a73e8] text-[#1a73e8] shadow-sm"
                              : "bg-white border-[#dadce0] text-[#5f6368] hover:border-[#bdc1c6]"
                              }`}
                          >
                            <div className="font-bold text-[#202124]">$25/day</div>
                            <div className="text-[11px] text-[#5f6368]">Starter</div>
                          </div>

                          <div
                            ref={recommendedBudgetRef}
                            onClick={() => setDailyBudget(120)}
                            className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${dailyBudget === 120
                              ? "bg-[#e8f0fe] border-[#1a73e8] text-[#1a73e8] shadow-sm ring-2 ring-[#1a73e8]/20"
                              : "bg-white border-[#dadce0] text-[#5f6368] hover:border-[#1a73e8]"
                              }`}
                          >
                            <div className="font-bold text-[#1a73e8] text-xs sm:text-sm">$120/day</div>
                            <div className="text-[11px] font-bold text-[#1a73e8] flex items-center justify-center gap-1">
                              <Sparkles className="w-3 h-3 inline" />
                              <span>Recommended</span>
                            </div>
                          </div>

                          <div
                            onClick={() => setDailyBudget(500)}
                            className={`p-2.5 rounded-lg border text-right transition-all cursor-pointer ${dailyBudget === 500
                              ? "bg-[#e8f0fe] border-[#1a73e8] text-[#1a73e8] shadow-sm"
                              : "bg-white border-[#dadce0] text-[#5f6368] hover:border-[#bdc1c6]"
                              }`}
                          >
                            <div className="font-bold text-[#202124]">$500/day</div>
                            <div className="text-[11px] text-[#5f6368]">Enterprise</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* LOCATION & LANGUAGE TARGETING CARDS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Location */}
                      <div className="p-4.5 rounded-xl border border-[#dadce0] bg-white space-y-2 shadow-sm">
                        <div className="flex items-center gap-2 text-xs font-bold text-[#202124]">
                          <MapPin className="w-4 h-4 text-[#1a73e8]" />
                          <span>Location Radius</span>
                        </div>
                        <div className="w-full px-3 py-1.5 bg-[#f8f9fa] border border-[#dadce0] text-xs font-mono font-medium text-[#202124] rounded-lg shadow-inner truncate">
                          Nashik, Maharashtra (25km Radius Focus)
                        </div>
                      </div>

                      {/* Language */}
                      <div className="p-4.5 rounded-xl border border-[#dadce0] bg-white space-y-2 shadow-sm">
                        <div className="flex items-center gap-2 text-xs font-bold text-[#202124]">
                          <Globe className="w-4 h-4 text-[#1a73e8]" />
                          <span>Audience Languages</span>
                        </div>
                        <div className="flex gap-1.5 flex-wrap">
                          <span className="px-2.5 py-1 rounded-md bg-[#f8f9fa] border border-[#dadce0] font-mono text-xs font-medium text-[#202124]">English</span>
                          <span className="px-2.5 py-1 rounded-md bg-[#f8f9fa] border border-[#dadce0] font-mono text-xs font-medium text-[#202124]">Marathi</span>
                          <span className="px-2.5 py-1 rounded-md bg-[#f8f9fa] border border-[#dadce0] font-mono text-xs font-medium text-[#202124]">Hindi</span>
                        </div>
                      </div>
                    </div>

                  </div>
                )}

                {/* STEP 3: REVIEW & PUBLISH STEP */}
                {activeTab === "review" && (
                  <div className="flex flex-col gap-6 w-full animate-fadeIn">

                    {reviewStage === "review_summary" ? (
                      /* ELEGANT GOOGLE ADS CAMPAIGN REVIEW DASHBOARD */
                      <div className="flex flex-col gap-6 w-full">

                        {/* Header Validation Banner */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#dadce0] pb-4">
                          <div>
                            <h3 className="text-base sm:text-lg font-bold text-[#202124]">Review your campaign settings</h3>
                            <p className="text-xs text-[#5f6368] mt-0.5">Verify your objective, bidding, budget, and targeting before publishing.</p>
                          </div>
                          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-xs self-start sm:self-auto">
                            <ShieldCheck className="w-4 h-4 text-emerald-600" />
                            <span>No issues found — Campaign ready to publish</span>
                          </div>
                        </div>

                        {/* Summary Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                          {/* Card 1: Overview */}
                          <div className="p-4.5 rounded-xl border border-[#dadce0] bg-gradient-to-b from-white to-[#f8faff] space-y-3.5 shadow-sm">
                            <div className="text-[11px] font-bold text-[#5f6368] uppercase tracking-wider border-b border-[#dadce0] pb-2 flex items-center justify-between">
                              <span>CAMPAIGN OVERVIEW</span>
                              <Tag className="w-3.5 h-3.5 text-[#1a73e8]" />
                            </div>
                            <div className="space-y-2.5 text-xs">
                              <div>
                                <span className="text-[#5f6368] block text-[11px] font-medium">Campaign Name:</span>
                                <span className="font-bold text-[#202124] text-sm block mt-0.5">{campaignName || "Nashik Dairy Products"}</span>
                              </div>
                              <div>
                                <span className="text-[#5f6368] block text-[11px] font-medium">Goal & Type:</span>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                  <span className="font-bold text-[#1a73e8] bg-[#e8f0fe] px-2 py-0.5 rounded text-[11px] uppercase">{selectedGoal || "Leads"}</span>
                                  <span className="font-semibold text-[#202124] text-[11px] uppercase">• {campaignType || "Search"}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Card 2: Budget & Bidding */}
                          <div className="p-4.5 rounded-xl border border-[#dadce0] bg-gradient-to-b from-white to-[#f8faff] space-y-3.5 shadow-sm">
                            <div className="text-[11px] font-bold text-[#5f6368] uppercase tracking-wider border-b border-[#dadce0] pb-2 flex items-center justify-between">
                              <span>BUDGET & BIDDING</span>
                              <TrendingUp className="w-3.5 h-3.5 text-[#1a73e8]" />
                            </div>
                            <div className="space-y-2.5 text-xs">
                              <div>
                                <span className="text-[#5f6368] block text-[11px] font-medium">Daily Budget Target:</span>
                                <span className="font-extrabold text-[#1a73e8] text-base block mt-0.5">${dailyBudget}.00 / day</span>
                                <span className="text-[11px] text-[#5f6368] block">(₹{dailyBudget * 85}/day)</span>
                              </div>
                              <div>
                                <span className="text-[#5f6368] block text-[11px] font-medium">Bidding Strategy:</span>
                                <span className="font-semibold text-[#202124] text-[11px] block mt-0.5">{biddingStrategy === "conversions" ? "Maximize Conversions" : "Maximize Clicks"}</span>
                              </div>
                            </div>
                          </div>

                          {/* Card 3: Targeting */}
                          <div className="p-4.5 rounded-xl border border-[#dadce0] bg-gradient-to-b from-white to-[#f8faff] space-y-3.5 shadow-sm">
                            <div className="text-[11px] font-bold text-[#5f6368] uppercase tracking-wider border-b border-[#dadce0] pb-2 flex items-center justify-between">
                              <span>TARGETING & REACH</span>
                              <Globe className="w-3.5 h-3.5 text-[#1a73e8]" />
                            </div>
                            <div className="space-y-2.5 text-xs">
                              <div>
                                <span className="text-[#5f6368] block text-[11px] font-medium">Target Location:</span>
                                <span className="font-semibold text-[#202124] text-[11px] block mt-0.5">Nashik, MH (25km Focus)</span>
                              </div>
                              <div>
                                <span className="text-[#5f6368] block text-[11px] font-medium">Languages:</span>
                                <span className="font-semibold text-[#202124] text-[11px] block mt-0.5">English, Marathi, Hindi</span>
                              </div>
                            </div>
                          </div>

                        </div>

                        {/* AUTHENTIC ROUNDED CORNER SQUARE BUTTON FOOTER */}
                        <div className="flex items-center justify-between pt-5 border-t border-[#dadce0] mt-4">
                          <button
                            onClick={() => setActiveTab("step2")}
                            className="px-4.5 py-2.5 rounded-xl border border-[#dadce0] bg-[#f8f9fa] hover:bg-[#e8f0fe] hover:border-[#1a73e8]/40 hover:text-[#1a73e8] text-[#5f6368] font-semibold text-xs transition-all flex items-center gap-2 shadow-xs group"
                          >
                            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
                            <span>Back to Budget</span>
                          </button>

                          <button
                            ref={publishBtnRef}
                            onClick={() => setReviewStage("published")}
                            className="relative px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#1a73e8] via-[#1b6cd8] to-[#1557b0] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md hover:shadow-lg border border-white/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer group"
                          >
                            <Sparkles className="w-4 h-4 text-white animate-pulse" />
                            <span className="tracking-wide">Publish campaign</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </button>
                        </div>

                      </div>
                    ) : (
                      /* PUBLISHED DONE SUCCESS SCREEN (ONLY GREEN CHECKMARK & BOLD "DONE" AS BEFORE) */
                      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3 animate-fadeIn my-auto min-h-[350px] w-full">
                        <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto stroke-[2.5] animate-bounce" />
                        <h3 className="text-3xl sm:text-4xl font-black !text-[#000000] tracking-tight" style={{ color: "#000000" }}>Done</h3>
                      </div>
                    )}

                  </div>
                )}

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
