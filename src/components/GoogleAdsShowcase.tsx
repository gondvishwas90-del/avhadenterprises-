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
  Check,
  CheckCircle2,
  Lock,
  Globe,
  MapPin,
  FileText,
  Info,
  ChevronRight,
  Layers3
} from "lucide-react";

export default function GoogleAdsShowcase() {
  // Sidebar active step stage (Step 1, Step 2, Review)
  const [activeTab, setActiveTab] = useState<"step1" | "step2" | "review">("step1");
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Form & showcase states preset for Nashik Dairy Products client
  const [campaignName, setCampaignName] = useState<string>("Search - Nashik Dairy Products - Nashik");
  const [selectedGoal, setSelectedGoal] = useState<"leads" | "sales">("leads");
  const [campaignType, setCampaignType] = useState<"search" | "pmax">("search");
  const [biddingStrategy, setBiddingStrategy] = useState<"conversions" | "clicks">("conversions");
  const [dailyBudget, setDailyBudget] = useState<number>(120);

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

        {/* ELEGANT AUTHENTIC GOOGLE ADS APPLICATION CONTAINER (HOVER AUTOMATED) */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="rounded-2xl border border-zinc-300 bg-white text-zinc-900 shadow-[0_20px_70px_rgba(0,0,0,0.75)] overflow-hidden font-sans select-none transition-all duration-300 relative"
        >
          
          {/* BROWSER TOP FRAME BAR */}
          <div className="bg-[#f1f3f4] border-b border-zinc-300 px-4 py-2 flex items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]" />
            </div>

            <div className="flex-1 max-w-md bg-white border border-zinc-300 rounded-md px-3 py-1 flex items-center gap-2 text-zinc-600 text-[11px] font-mono shadow-inner truncate">
              <Lock className="w-3 h-3 text-emerald-600 flex-shrink-0" />
              <span className="text-zinc-700 font-medium truncate">https://ads.google.com/aw/campaigns/new</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono bg-zinc-200 text-zinc-700 px-2 py-0.5 rounded font-semibold">GOOGLE ADS CONSOLE</span>
            </div>
          </div>

          {/* GOOGLE ADS APPLICATION HEADER BAR (ZERO AVHAD BRANDING) */}
          <div className="bg-white border-b border-[#dadce0] px-4 sm:px-6 py-3 flex items-center justify-between gap-4 text-xs">
            
            {/* Left Branding */}
            <div className="flex items-center gap-3">
              <button title="Close" className="text-zinc-500 hover:text-zinc-800 p-1 rounded-full hover:bg-zinc-100 transition">
                <X className="w-4 h-4" />
              </button>

              <div className="h-5 w-px bg-zinc-300" />

              <div className="flex items-center gap-2 font-medium text-zinc-700">
                <div className="flex items-center gap-0.5">
                  <span className="w-2.5 h-3.5 bg-[#ea4335] rounded-tl-sm rounded-br-sm transform -rotate-12" />
                  <span className="w-2.5 h-3.5 bg-[#fbbc04] rounded-tr-sm rounded-bl-sm transform rotate-12 -ml-1" />
                  <span className="w-2.5 h-3.5 bg-[#4285f4] rounded-sm -ml-1" />
                </div>
                <span className="font-semibold tracking-tight text-zinc-800 text-base">Google Ads</span>
              </div>

              <div className="h-5 w-px bg-zinc-300 hidden sm:block" />

              <div className="text-zinc-600 font-medium text-xs sm:text-sm hidden sm:block">
                New campaign
              </div>
            </div>

            {/* Right Account & Icons */}
            <div className="flex items-center gap-3 text-zinc-600">
              <button title="Help" className="p-1.5 rounded-full hover:bg-zinc-100 text-zinc-600 transition">
                <HelpCircle className="w-4.5 h-4.5" />
              </button>
              <button title="Notifications" className="p-1.5 rounded-full hover:bg-zinc-100 text-zinc-600 transition relative">
                <Bell className="w-4.5 h-4.5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#1a73e8] rounded-full" />
              </button>

              <div className="hidden sm:flex items-center gap-2 bg-zinc-100 border border-zinc-300 rounded-full px-3.5 py-1 text-[11px] text-zinc-700 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Nashik Dairy Products (942-810-4491)</span>
              </div>

              <div className="w-8 h-8 rounded-full bg-[#1a73e8] text-white font-bold text-xs flex items-center justify-center shadow-sm">
                ND
              </div>
            </div>

          </div>

          {/* MAIN APPLICATION WORKSPACE GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 bg-[#f8f9fa] overflow-hidden">
            
            {/* LEFT NAVIGATION SIDEBAR (HOVER INTERACTIVE) */}
            <div className="lg:col-span-3.5 xl:col-span-3 bg-white border-b lg:border-b-0 lg:border-r border-[#dadce0] p-4 sm:p-5 space-y-4 flex flex-col justify-start">
              
              <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 px-1 font-bold">
                CAMPAIGN CREATION STEPS
              </div>

              <div className="space-y-2 text-xs">
                {/* STEP 1 */}
                <button
                  onMouseEnter={() => setActiveTab("step1")}
                  onClick={() => setActiveTab("step1")}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 text-left ${
                    activeTab === "step1"
                      ? "bg-[#e8f0fe] text-[#1a73e8] font-bold border-l-4 border-[#1a73e8] shadow-sm"
                      : "text-zinc-700 hover:bg-zinc-100 font-medium"
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <Sparkles className={`w-4 h-4 mt-0.5 flex-shrink-0 ${activeTab === "step1" ? "text-[#1a73e8]" : "text-zinc-600"}`} />
                    <div>
                      <div className="text-xs font-bold leading-none">Step 1: Foundation</div>
                      <div className="text-[11px] text-zinc-600 mt-1 font-normal">Objective & Type</div>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${activeTab === "step1" ? "text-[#1a73e8]" : "text-zinc-400"}`} />
                </button>

                {/* STEP 2 */}
                <button
                  onMouseEnter={() => setActiveTab("step2")}
                  onClick={() => setActiveTab("step2")}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 text-left ${
                    activeTab === "step2"
                      ? "bg-[#e8f0fe] text-[#1a73e8] font-bold border-l-4 border-[#1a73e8] shadow-sm"
                      : "text-zinc-700 hover:bg-zinc-100 font-medium"
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <TrendingUp className={`w-4 h-4 mt-0.5 flex-shrink-0 ${activeTab === "step2" ? "text-[#1a73e8]" : "text-zinc-600"}`} />
                    <div>
                      <div className="text-xs font-bold leading-none">Step 2: Budget & Bidding</div>
                      <div className="text-[11px] text-zinc-600 mt-1 font-normal">Budget, Strategy & Target</div>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${activeTab === "step2" ? "text-[#1a73e8]" : "text-zinc-400"}`} />
                </button>

                <div className="my-2 border-t border-[#e8eaed]" />

                {/* REVIEW */}
                <button
                  onMouseEnter={() => setActiveTab("review")}
                  onClick={() => setActiveTab("review")}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 text-left ${
                    activeTab === "review"
                      ? "bg-[#e8f0fe] text-[#1a73e8] font-bold border-l-4 border-[#1a73e8] shadow-sm"
                      : "text-zinc-700 hover:bg-zinc-100 font-medium"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Info className={`w-4 h-4 ${activeTab === "review" ? "text-[#1a73e8]" : "text-zinc-600"}`} />
                    <span className="font-bold">Review & Publish</span>
                  </div>
                </button>
              </div>

            </div>

            {/* RIGHT MAIN WORKSPACE AREA */}
            <div className="lg:col-span-8.5 xl:col-span-9 p-4 sm:p-6 md:p-7 flex flex-col justify-start space-y-7 text-zinc-900 min-h-[480px]">
              
              {/* STEP 1: SET YOUR FOUNDATION (OBJECTIVE & TYPE) */}
              {activeTab === "step1" && (
                <div className="flex flex-col gap-6 sm:gap-7 w-full animate-fadeIn">
                  
                  {/* CAMPAIGN NAME INPUT */}
                  <div className="space-y-2">
                    <div className="text-xs font-extrabold text-[#000000] uppercase tracking-wider px-1">Campaign Identifier</div>
                    <input
                      type="text"
                      value={campaignName}
                      onChange={(e) => setCampaignName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#dadce0] focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 outline-none text-xs sm:text-sm font-semibold text-[#000000] bg-white transition shadow-sm"
                      placeholder="Search - Nashik Dairy Products - Nashik"
                    />
                  </div>

                  {/* GOAL SELECTION SECTION */}
                  <div className="space-y-2.5">
                    <div className="text-xs font-extrabold text-[#000000] uppercase tracking-wider px-1">1. Select Campaign Goal</div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      {/* Goal: Leads */}
                      <div
                        onClick={() => setSelectedGoal("leads")}
                        className={`p-4 sm:p-5 rounded-2xl transition cursor-pointer relative bg-white flex flex-col justify-between space-y-3 ${
                          selectedGoal === "leads"
                            ? "border-2 border-[#1a73e8] bg-[#f8faff] shadow-sm"
                            : "border border-[#dadce0] hover:border-zinc-400"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <Tag className={`w-5 h-5 ${selectedGoal === "leads" ? "text-[#1a73e8]" : "text-zinc-600"}`} />
                          {selectedGoal === "leads" ? (
                            <div className="w-5 h-5 rounded-full bg-[#1a73e8] text-white flex items-center justify-center shadow-sm">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full border border-[#dadce0]" />
                          )}
                        </div>

                        <div className="space-y-1">
                          <div className="text-xs sm:text-[13px] font-extrabold text-[#000000] leading-tight">Leads (Form Submissions & Direct Calls)</div>
                          <div className="text-[11px] text-[#3c4043] leading-relaxed font-medium">
                            Get qualified inquiries and order requests for daily milk delivery & fresh paneer.
                          </div>
                        </div>
                      </div>

                      {/* Goal: Sales */}
                      <div
                        onClick={() => setSelectedGoal("sales")}
                        className={`p-4 sm:p-5 rounded-2xl transition cursor-pointer relative bg-white flex flex-col justify-between space-y-3 ${
                          selectedGoal === "sales"
                            ? "border-2 border-[#1a73e8] bg-[#f8faff] shadow-sm"
                            : "border border-[#dadce0] hover:border-zinc-400"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <TrendingUp className={`w-5 h-5 ${selectedGoal === "sales" ? "text-[#1a73e8]" : "text-zinc-600"}`} />
                          {selectedGoal === "sales" ? (
                            <div className="w-5 h-5 rounded-full bg-[#1a73e8] text-white flex items-center justify-center shadow-sm">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full border border-[#dadce0]" />
                          )}
                        </div>

                        <div className="space-y-1">
                          <div className="text-xs sm:text-[13px] font-extrabold text-[#000000] leading-tight">Sales (Direct Purchase / Ecommerce)</div>
                          <div className="text-[11px] text-[#3c4043] leading-relaxed font-medium">
                            Drive online orders directly on your store for dairy subscription packages.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CAMPAIGN TYPE SECTION */}
                  <div className="space-y-2.5">
                    <div className="text-xs font-extrabold text-[#000000] uppercase tracking-wider px-1">2. Select Campaign Type</div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      {/* Type: Search */}
                      <div
                        onClick={() => setCampaignType("search")}
                        className={`p-4 sm:p-5 rounded-2xl transition cursor-pointer relative bg-white flex flex-col justify-between space-y-3 ${
                          campaignType === "search"
                            ? "border-2 border-[#1a73e8] bg-[#f8faff] shadow-sm"
                            : "border border-[#dadce0] hover:border-zinc-400"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <MousePointerClick className={`w-5 h-5 ${campaignType === "search" ? "text-[#1a73e8]" : "text-zinc-600"}`} />
                          {campaignType === "search" ? (
                            <div className="w-5 h-5 rounded-full bg-[#1a73e8] text-white flex items-center justify-center shadow-sm">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full border border-[#dadce0]" />
                          )}
                        </div>

                        <div className="space-y-1">
                          <div className="text-xs sm:text-[13px] font-extrabold text-[#000000] leading-tight">Search Campaign</div>
                          <div className="text-[11px] text-[#3c4043] leading-relaxed font-medium">
                            Show text ads when customers search for "fresh A2 milk near me" on Google.
                          </div>
                        </div>
                      </div>

                      {/* Type: Performance Max */}
                      <div
                        onClick={() => setCampaignType("pmax")}
                        className={`p-4 sm:p-5 rounded-2xl transition cursor-pointer relative bg-white flex flex-col justify-between space-y-3 ${
                          campaignType === "pmax"
                            ? "border-2 border-[#1a73e8] bg-[#f8faff] shadow-sm"
                            : "border border-[#dadce0] hover:border-zinc-400"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <Layers3 className={`w-5 h-5 ${campaignType === "pmax" ? "text-[#1a73e8]" : "text-zinc-600"}`} />
                          {campaignType === "pmax" ? (
                            <div className="w-5 h-5 rounded-full bg-[#1a73e8] text-white flex items-center justify-center shadow-sm">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full border border-[#dadce0]" />
                          )}
                        </div>

                        <div className="space-y-1">
                          <div className="text-xs sm:text-[13px] font-extrabold text-[#000000] leading-tight">Performance Max</div>
                          <div className="text-[11px] text-[#3c4043] leading-relaxed font-medium">
                            Automated ads across Search, YouTube, Display, Gmail, and Google Maps.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* STEP 2: CONFIGURE BUDGET, BIDDING & TARGETING */}
              {activeTab === "step2" && (
                <div className="flex flex-col gap-6 sm:gap-7 w-full animate-fadeIn">
                  
                  {/* BIDDING STRATEGY SECTION */}
                  <div className="space-y-2.5">
                    <div className="text-xs font-extrabold text-[#000000] uppercase tracking-wider px-1">1. Select Bidding Strategy</div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      {/* Maximize Conversions */}
                      <div
                        onClick={() => setBiddingStrategy("conversions")}
                        className={`p-4 sm:p-5 rounded-2xl transition cursor-pointer relative bg-white flex flex-col justify-between space-y-3 ${
                          biddingStrategy === "conversions"
                            ? "border-2 border-[#1a73e8] bg-[#f8faff] shadow-sm"
                            : "border border-[#dadce0] hover:border-zinc-400"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <Tag className={`w-5 h-5 ${biddingStrategy === "conversions" ? "text-[#1a73e8]" : "text-zinc-600"}`} />
                          {biddingStrategy === "conversions" ? (
                            <div className="w-5 h-5 rounded-full bg-[#1a73e8] text-white flex items-center justify-center shadow-sm">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full border border-[#dadce0]" />
                          )}
                        </div>

                        <div className="space-y-1">
                          <div className="text-xs sm:text-[13px] font-extrabold text-[#000000] leading-tight">Maximize Conversions</div>
                          <div className="text-[11px] text-[#3c4043] leading-relaxed font-medium">
                            Automatically set bids to get the most leads within your daily budget.
                          </div>
                        </div>
                      </div>

                      {/* Maximize Clicks */}
                      <div
                        onClick={() => setBiddingStrategy("clicks")}
                        className={`p-4 sm:p-5 rounded-2xl transition cursor-pointer relative bg-white flex flex-col justify-between space-y-3 ${
                          biddingStrategy === "clicks"
                            ? "border-2 border-[#1a73e8] bg-[#f8faff] shadow-sm"
                            : "border border-[#dadce0] hover:border-zinc-400"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <MousePointerClick className={`w-5 h-5 ${biddingStrategy === "clicks" ? "text-[#1a73e8]" : "text-zinc-600"}`} />
                          {biddingStrategy === "clicks" ? (
                            <div className="w-5 h-5 rounded-full bg-[#1a73e8] text-white flex items-center justify-center shadow-sm">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full border border-[#dadce0]" />
                          )}
                        </div>

                        <div className="space-y-1">
                          <div className="text-xs sm:text-[13px] font-extrabold text-[#000000] leading-tight">Maximize Clicks</div>
                          <div className="text-[11px] text-[#3c4043] leading-relaxed font-medium">
                            Focus on driving maximum traffic volume to build initial brand awareness.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* DAILY BUDGET SLIDER CONTAINER */}
                  <div className="space-y-2.5">
                    <div className="text-xs font-extrabold text-[#000000] uppercase tracking-wider px-1">2. Set Daily Budget & Target</div>

                    <div className="bg-white rounded-2xl border border-[#dadce0] p-4 sm:p-5 space-y-3.5 shadow-sm">
                      <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5">
                        <span className="text-xs font-mono font-bold text-[#000000] tracking-wider uppercase">AVERAGE DAILY BUDGET</span>
                        <span className="text-xs sm:text-sm font-mono font-extrabold text-[#1a73e8]">
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
                        className="w-full accent-[#1a73e8] cursor-pointer h-2 bg-[#e0e0e0] rounded-full appearance-none"
                      />

                      <div className="flex justify-between text-xs pt-0.5">
                        <div>
                          <div className="font-extrabold text-[#000000]">$25/day</div>
                          <div className="text-[11px] text-[#3c4043] font-medium">Starter</div>
                        </div>
                        <div className="text-center">
                          <div className="font-extrabold text-[#1a73e8]">$120/day</div>
                          <div className="text-[11px] text-[#1a73e8] font-semibold">Recommended</div>
                        </div>
                        <div className="text-right">
                          <div className="font-extrabold text-[#000000]">$500/day</div>
                          <div className="text-[11px] text-[#3c4043] font-medium">Enterprise</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* LOCATION RADIUS & AUDIENCE LANGUAGES INPUT CARDS */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {/* Location */}
                    <div className="p-4 sm:p-5 rounded-2xl border border-[#dadce0] bg-white space-y-2 shadow-sm">
                      <div className="flex items-center gap-2 text-xs font-extrabold text-[#000000]">
                        <MapPin className="w-4 h-4 text-[#1a73e8]" />
                        <span>Location Radius</span>
                      </div>
                      <div className="w-full px-3.5 py-1.5 bg-[#f8f9fa] border border-[#dadce0] text-xs font-mono font-medium text-[#000000] rounded-full shadow-inner truncate">
                        Nashik, Maharashtra (25km Radius Focus)
                      </div>
                    </div>

                    {/* Language */}
                    <div className="p-4 sm:p-5 rounded-2xl border border-[#dadce0] bg-white space-y-2 shadow-sm">
                      <div className="flex items-center gap-2 text-xs font-extrabold text-[#000000]">
                        <Globe className="w-4 h-4 text-[#1a73e8]" />
                        <span>Audience Languages</span>
                      </div>
                      <div className="flex gap-1.5 flex-wrap">
                        <span className="px-3 py-1 rounded-full bg-[#f8f9fa] border border-[#dadce0] font-mono text-xs font-medium text-[#000000] shadow-inner">English</span>
                        <span className="px-3 py-1 rounded-full bg-[#f8f9fa] border border-[#dadce0] font-mono text-xs font-medium text-[#000000] shadow-inner">Marathi</span>
                        <span className="px-3 py-1 rounded-full bg-[#f8f9fa] border border-[#dadce0] font-mono text-xs font-medium text-[#000000] shadow-inner">Hindi</span>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* REVIEW STEP */}
              {activeTab === "review" && (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3 animate-fadeIn my-auto">
                  <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto stroke-[2.5]" />
                  <h3 className="text-3xl sm:text-4xl font-black text-black tracking-tight" style={{ color: "#000000" }}>Done</h3>
                </div>
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
