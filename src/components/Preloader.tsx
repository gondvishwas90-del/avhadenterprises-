"use client";

import { useEffect, useState, useRef } from "react";

interface PreloaderProps {
  onComplete: () => void;
}

export interface Rectangle3D {
  z: number;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isWarping, setIsWarping] = useState(false);
  const [isFadeOut, setIsFadeOut] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const isWarpingRef = useRef(false);
  const isFadeOutRef = useRef(false);
  const onCompleteRef = useRef(onComplete);

  // Sync onCompleteRef in case it changes
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Sync state ref for animation thread access
  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  // Loading progress generator (3 seconds duration)
  useEffect(() => {
    const startTime = Date.now();
    const duration = 3000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const computedProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(Math.floor(computedProgress));

      if (computedProgress >= 100) {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  // Lock background scroll during loading and warping phases
  useEffect(() => {
    if (!isFadeOut) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0); // Keep scroll position locked to top
    } else {
      document.body.style.overflow = "";
      window.scrollTo(0, 0); // Force scroll position to top when starting reveal
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFadeOut]);

  // Handle tunnel canvas rendering loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    const resizeCanvas = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Geometry parameters based on device responsiveness
    let numRects = 22; // Desktop default (18-22 visible range)
    let baseWidth = 800;
    let baseHeight = 600;

    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) {
        numRects = 18; // Mobile: 40% reduction
        baseWidth = 400;
        baseHeight = 300;
      } else if (window.innerWidth < 1024) {
        numRects = 20; // Tablet: 20% reduction
        baseWidth = 600;
        baseHeight = 450;
      }
    }

    const maxZ = 1900; // Far clipping plane matching vanishing scale
    const stepZ = maxZ / numRects;
    const rects: Rectangle3D[] = [];

    // Distribute rectangles evenly along the Z axis
    for (let i = 0; i < numRects; i++) {
      rects.push({ z: i * stepZ });
    }

    const warpDistance = 1500;
    
    // Quintic Hermite ease-in-ease-out curve
    const quinticEase = (t: number) => {
      return t < 0.5 
        ? 16 * Math.pow(t, 5) 
        : 1 - 16 * Math.pow(1 - t, 5);
    };

    let lastTime = performance.now();
    let transitionTime = 0;
    const transitionDuration = 3000; // 3.0 seconds automatic transition duration

    const loop = () => {
      const time = performance.now();
      // Clamp deltaTime to a maximum of 32ms to prevent frame skips/timing spikes
      const deltaTime = Math.min(time - lastTime, 32);
      lastTime = time;

      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const cx = w / 2;
      const cy = h / 2;

      // Draw pure black background (#000000)
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, w, h);

      if (progressRef.current < 100) {
        animationFrameRef.current = requestAnimationFrame(loop);
        return;
      }

      if (!isWarpingRef.current) {
        isWarpingRef.current = true;
        setIsWarping(true);
      }

      // Progress t (0 to 1) driven automatically by elapsed time
      transitionTime += deltaTime;
      const t = Math.min(transitionTime / transitionDuration, 1);
      
      let cameraZ = 0;
      let fadeIn = 1;
      let tunnelOpacity = 1;
      let scaleMultiplier = 1;

      // 0% to 20%: Tunnel appears (fades in), camera remains idle
      if (t < 0.2) {
        cameraZ = 0;
        fadeIn = t / 0.2;
      } 
      // 20% to 100%: Forward movement & acceleration begins
      else {
        const tPrime = (t - 0.2) / 0.8; // Map [0.2, 1] to [0, 1]
        const easeFactor = quinticEase(tPrime);
        cameraZ = easeFactor * warpDistance;
        fadeIn = 1;
      }

      // 90% to 100%: Tunnel dissolves and expands (opens up) into Hero background
      if (t >= 0.9) {
        tunnelOpacity = 1 - (t - 0.9) / 0.1;
        const expandFactor = (t - 0.9) / 0.1; // 0 to 1
        scaleMultiplier = 1.0 + Math.pow(expandFactor, 3) * 6; // Exponential expansion
      }

      // Complete transition
      if (t >= 1 && !isFadeOutRef.current) {
        isFadeOutRef.current = true;
        setIsFadeOut(true);
        setTimeout(() => {
          setIsHidden(true);
          window.scrollTo(0, 0); // Force scroll position to the very top (Hero section)
          onCompleteRef.current();
        }, 800);
        return;
      }

      // Focal length of 100 creates the exact perspective scale (nearest width 800px, vanishing width 40px)
      const focalLength = 100;

      // Apply static global rotation of exactly -6 degrees around screen center
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-6 * Math.PI / 180);
      ctx.translate(-cx, -cy);

      // Clean vector styles, no blur/bloom shadows
      ctx.shadowBlur = 0;
      ctx.shadowColor = "transparent";

      for (let i = numRects - 1; i >= 0; i--) {
        const rect = rects[i];
        let relZ = rect.z - cameraZ;

        if (relZ <= 0) {
          relZ = (relZ % maxZ) + maxZ;
        }

        const scale = focalLength / (focalLength + relZ);
        const sw = baseWidth * scale * scaleMultiplier;
        const sh = baseHeight * scale * scaleMultiplier;
        const sx = cx - sw / 2;
        const sy = cy - sh / 2;

        // Fades out naturally into the vanishing point (depthRatio)
        const depthRatio = 1 - relZ / maxZ;
        
        // Nearest lines opacity: 100%, Far opacity: 20%
        const opacity = 0.2 + 0.8 * depthRatio;
        
        // Line Style: Nearest stroke: 2px, Middle: 1.5px, Far: 1px, Deep: 0.75px
        ctx.lineWidth = 0.75 + 1.25 * scale;

        let closeFade = 1;
        if (relZ < 150) {
          closeFade = Math.max(0, relZ / 150);
        }

        // Clean white stroke color #FFFFFF
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * closeFade * tunnelOpacity * fadeIn})`;
        
        // Draw top and bottom horizontal lines (each rotated by -6 degrees)
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx + sw, sy);
        ctx.moveTo(sx, sy + sh);
        ctx.lineTo(sx + sw, sy + sh);
        ctx.stroke();
      }

      ctx.restore(); // Restore context to default (no rotation) for subsequent rendering

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  if (isHidden) return null;

  return (
    <div className={`preloader-overlay ${isFadeOut ? "preloader-fade-out" : ""}`}>
      <canvas ref={canvasRef} className="preloader-tunnel-canvas" />
      <div className="editorial-noise-overlay"></div>

      {/* Loading HUD */}
      <div className={`preloader-hud ${isWarping ? "hud-fade-out" : ""}`}>
        <div className="preloader-content">
          <div className="preloader-logo-svg">
            <svg width="220" height="220" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 42 135 A 80 80 0 1 1 158 135" fill="none" stroke="#00e5ff" strokeWidth="2.2" />
              <circle cx="42" cy="135" r="4.5" fill="#00e5ff" />
              <circle cx="158" cy="135" r="4.5" fill="#00e5ff" />

              <polygon points="35,85 92,50 92,60 52,85" fill="white" />
              <line x1="50" y1="85" x2="82" y2="70" stroke="#00e5ff" strokeWidth="3.5" strokeLinecap="round" />
              <circle cx="82" cy="70" r="4.5" fill="#00e5ff" />
              <polygon points="35,85 60,85 92,68 92,120" fill="white" />

              <rect x="108" y="50" width="12" height="70" fill="white" />
              <polygon points="120,50 165,50 142,72 120,72" fill="white" />
              <path d="M 120,75 L 145,75 L 167,85 L 145,95 L 120,95 L 120,89 L 140,89 L 140,81 L 120,81 Z" fill="white" />
              <line x1="120" y1="85" x2="136" y2="85" stroke="#00e5ff" strokeWidth="3.5" strokeLinecap="round" />
              <circle cx="136" cy="85" r="4.5" fill="#00e5ff" />
              <polygon points="120,120 165,120 142,98 120,98" fill="white" />

              <text
                x="100"
                y="170"
                fill="#ffffff"
                fontSize="12.5"
                fontFamily="var(--font-family-sans)"
                fontWeight="900"
                letterSpacing="0.14em"
                textAnchor="middle"
              >
                AVHAD ENTERPRISES
              </text>
            </svg>
          </div>

          <div className="preloader-progress-bg">
            <div
              className="preloader-progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="preloader-status-text">
            <span>{progress}%</span> Loaded
          </div>
        </div>
      </div>
    </div>
  );
}
