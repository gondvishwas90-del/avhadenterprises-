"use client";

import { useState, useEffect } from "react";
import {
  X,
  Sparkles,
  Tag,
  MousePointerClick,
  TrendingUp,
  HelpCircle,
  Bell,
  CheckCircle2,
  Lock,
  Globe,
  MapPin,
  Info,
  Layers3,
  ArrowLeft,
  Settings,
  ChevronRight,
  Check
} from "lucide-react";

export default function GoogleAdsShowcase() {
  // Sidebar active step stage (Step 1, Step 2, Review)
  const [activeTab, setActiveTab] = useState<"step1" | "step2" | "review">("step1");
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Form & showcase states preset for Nashik Dairy Products client
  const [campaignName, setCampaignName] = useState<string>("Search - Nashik Dairy Products - Nashik");
  const [selectedGoal, setSelectedGoal] = useState<"leads" | "sales" | null>("leads");
  const [campaignType, setCampaignType] = useState<"search" | "pmax" | null>(null);
  const [biddingStrategy, setBiddingStrategy] = useState<"conversions" | "clicks" | null>(null);
  const [dailyBudget, setDailyBudget] = useState<number>(120);

  const handleGoalSelect = (goal: "leads" | "sales") => {
    setSelectedGoal((prev) => (prev === goal ? null : goal));
    setCampaignType(null);
  };

  // Auto-advance steps step-by-step when hovering anywhere over the container
  useEffect(() => {
    if (!isHovered) return;

    const steps: Array<"step1" | "step2" | "review"> = ["step1", "step2", "review"];

    const timer = setInterval(() => {
      setActiveTab((current) => {
        const currentIndex = steps.indexOf(current);
        const nextIndex = (currentIndex + 1) % steps.length;
        return steps[nextIndex];
      });
    }, 2800);

    return () => clearInterval(timer);
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
            Explore our high-performance Google Ads workflow. Hover anywhere over the container below to see the automated step-by-step campaign setup in action.
          </p>
        </div>

        {/* ELEGANT AUTHENTIC GOOGLE ADS APPLICATION CONTAINER */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="rounded-2xl border border-[#dadce0] bg-white text-zinc-900 shadow-[0_20px_70px_rgba(0,0,0,0.75)] overflow-hidden font-sans select-none transition-all duration-300 relative"
        >
          
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
                  onMouseEnter={() => setActiveTab("step1")}
                  onClick={() => setActiveTab("step1")}
                  className="flex items-center gap-3 cursor-pointer group py-1"
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all flex-shrink-0 z-10 ${
                    activeTab === "step1"
                      ? "bg-[#1a73e8] text-white shadow-sm"
                      : activeTab === "step2" || activeTab === "review"
                      ? "bg-[#e8f0fe] text-[#1a73e8] border border-[#1a73e8]"
                      : "bg-white border-2 border-[#5f6368] text-[#5f6368]"
                  }`}>
                    {activeTab === "step2" || activeTab === "review" ? <Check className="w-4 h-4 stroke-[3]" /> : "1"}
                  </div>
                  
                  <div className={`text-xs sm:text-[13px] transition-colors ${
                    activeTab === "step1" ? "font-bold text-[#1a73e8]" : "font-semibold text-[#202124] group-hover:text-[#1a73e8]"
                  }`}>
                    Goal & Type
                  </div>
                </div>

                {/* STEP 2 */}
                <div
                  onMouseEnter={() => setActiveTab("step2")}
                  onClick={() => setActiveTab("step2")}
                  className="flex items-center gap-3 cursor-pointer group py-1"
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all flex-shrink-0 z-10 ${
                    activeTab === "step2"
                      ? "bg-[#1a73e8] text-white shadow-sm"
                      : activeTab === "review"
                      ? "bg-[#e8f0fe] text-[#1a73e8] border border-[#1a73e8]"
                      : "bg-white border-2 border-[#5f6368] text-[#5f6368]"
                  }`}>
                    {activeTab === "review" ? <Check className="w-4 h-4 stroke-[3]" /> : "2"}
                  </div>
                  
                  <div className={`text-xs sm:text-[13px] transition-colors ${
                    activeTab === "step2" ? "font-bold text-[#1a73e8]" : "font-semibold text-[#202124] group-hover:text-[#1a73e8]"
                  }`}>
                    Budget & Bidding
                  </div>
                </div>

                {/* STEP 3 */}
                <div
                  onMouseEnter={() => setActiveTab("review")}
                  onClick={() => setActiveTab("review")}
                  className="flex items-center gap-3 cursor-pointer group py-1"
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all flex-shrink-0 z-10 ${
                    activeTab === "review"
                      ? "bg-[#1a73e8] text-white shadow-sm"
                      : "bg-white border-2 border-[#5f6368] text-[#5f6368]"
                  }`}>
                    3
                  </div>
                  
                  <div className={`text-xs sm:text-[13px] transition-colors ${
                    activeTab === "review" ? "font-bold text-[#1a73e8]" : "font-semibold text-[#202124] group-hover:text-[#1a73e8]"
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
                        type="text"
                        value={campaignName}
                        onChange={(e) => setCampaignName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-[#dadce0] focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 outline-none text-xs sm:text-sm font-medium text-[#202124] bg-white transition shadow-sm"
                        placeholder="Search - Nashik Dairy Products - Nashik"
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
                          onClick={() => handleGoalSelect("leads")}
                          className={`p-4 rounded-xl transition-all duration-200 cursor-pointer relative flex items-start gap-3.5 border-2 ${
                            selectedGoal === "leads"
                              ? "border-[#1a73e8] bg-[#f8faff] shadow-sm opacity-100"
                              : "border-[#dadce0] bg-white hover:border-[#bdc1c6] opacity-75 hover:opacity-100"
                          }`}
                        >
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                            selectedGoal === "leads" ? "bg-[#e8f0fe] text-[#1a73e8]" : "bg-[#f1f3f4] text-[#5f6368]"
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
                          className={`p-4 rounded-xl transition-all duration-200 cursor-pointer relative flex items-start gap-3.5 border-2 ${
                            selectedGoal === "sales"
                              ? "border-[#1a73e8] bg-[#f8faff] shadow-sm opacity-100"
                              : "border-[#dadce0] bg-white hover:border-[#bdc1c6] opacity-75 hover:opacity-100"
                          }`}
                        >
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                            selectedGoal === "sales" ? "bg-[#e8f0fe] text-[#1a73e8]" : "bg-[#f1f3f4] text-[#5f6368]"
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
                          onClick={() => setCampaignType((prev) => (prev === "search" ? null : "search"))}
                          className={`p-4 rounded-xl transition-all duration-200 cursor-pointer relative flex items-start gap-3.5 border-2 ${
                            campaignType === "search"
                              ? "border-[#1a73e8] bg-[#f8faff] shadow-sm opacity-100"
                              : "border-[#dadce0] bg-white hover:border-[#bdc1c6] opacity-75 hover:opacity-100"
                          }`}
                        >
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                            campaignType === "search" ? "bg-[#e8f0fe] text-[#1a73e8]" : "bg-[#f1f3f4] text-[#5f6368]"
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
                          className={`p-4 rounded-xl transition-all duration-200 cursor-pointer relative flex items-start gap-3.5 border-2 ${
                            campaignType === "pmax"
                              ? "border-[#1a73e8] bg-[#f8faff] shadow-sm opacity-100"
                              : "border-[#dadce0] bg-white hover:border-[#bdc1c6] opacity-75 hover:opacity-100"
                          }`}
                        >
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                            campaignType === "pmax" ? "bg-[#e8f0fe] text-[#1a73e8]" : "bg-[#f1f3f4] text-[#5f6368]"
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
                          onClick={() => setBiddingStrategy((prev) => (prev === "conversions" ? null : "conversions"))}
                          className={`p-4 rounded-xl transition-all duration-200 cursor-pointer relative flex items-start gap-3.5 border-2 ${
                            biddingStrategy === "conversions"
                              ? "border-[#1a73e8] bg-[#f8faff] shadow-sm opacity-100"
                              : "border-[#dadce0] bg-white hover:border-[#bdc1c6] opacity-75 hover:opacity-100"
                          }`}
                        >
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                            biddingStrategy === "conversions" ? "bg-[#e8f0fe] text-[#1a73e8]" : "bg-[#f1f3f4] text-[#5f6368]"
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
                          className={`p-4 rounded-xl transition-all duration-200 cursor-pointer relative flex items-start gap-3.5 border-2 ${
                            biddingStrategy === "clicks"
                              ? "border-[#1a73e8] bg-[#f8faff] shadow-sm opacity-100"
                              : "border-[#dadce0] bg-white hover:border-[#bdc1c6] opacity-75 hover:opacity-100"
                          }`}
                        >
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                            biddingStrategy === "clicks" ? "bg-[#e8f0fe] text-[#1a73e8]" : "bg-[#f1f3f4] text-[#5f6368]"
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
                          <span className="text-xs sm:text-sm font-mono font-bold text-[#1a73e8]">
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
                          className="w-full accent-[#1a73e8] cursor-pointer h-2 bg-[#dadce0] rounded-full appearance-none"
                        />

                        <div className="flex justify-between text-xs pt-0.5 text-[#5f6368]">
                          <div>
                            <div className="font-bold text-[#202124]">$25/day</div>
                            <div className="text-[11px]">Starter</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-[#1a73e8]">$120/day</div>
                            <div className="text-[11px] font-semibold text-[#1a73e8]">Recommended</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-[#202124]">$500/day</div>
                            <div className="text-[11px]">Enterprise</div>
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

                {/* STEP 3: REVIEW STEP (CENTER ALIGNED ONLY) */}
                {activeTab === "review" && (
                  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3 animate-fadeIn my-auto min-h-[350px] w-full">
                    <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto stroke-[2.5]" />
                    <h3 className="text-3xl sm:text-4xl font-black !text-[#000000] tracking-tight" style={{ color: "#000000" }}>Done</h3>
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
