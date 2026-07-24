import React from "react";
import TunnelAnimation from "@/components/TunnelAnimation";
import Link from "next/link";

export const metadata = {
  title: "Warp Tunnel Animation - Interactive Showcase",
  description: "A premium 3D HTML5 Canvas space-time warp tunnel animation built with Next.js and React.",
};

export default function TunnelPage() {
  return (
    <div className="relative w-full h-screen">
      {/* Back button */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-md bg-slate-950/40 border border-white/10 text-slate-300 hover:text-white hover:border-white/20 transition-all font-sans text-xs tracking-wider uppercase shadow-lg select-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Back to Portal
        </Link>
      </div>

      <TunnelAnimation />
    </div>
  );
}
