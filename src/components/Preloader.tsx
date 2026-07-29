"use client";

import { useEffect, useState, useRef } from "react";

interface PreloaderProps {
  onComplete: () => void;
}

export interface Rectangle3D {
  z: number;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [isWarping, setIsWarping] = useState(false);
  const [isFadeOut, setIsFadeOut] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const curtainRef = useRef<SVGPathElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);

  const animationFrameRef = useRef<number | null>(null);
  const isWarpingRef = useRef(false);
  const isFadeOutRef = useRef(false);
  const onCompleteRef = useRef(onComplete);

  // Sync onCompleteRef in case it changes
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

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
    let loopStartTime = performance.now();
    let transitionTime = 0;
    const transitionDuration = 3000; // 3.0 seconds automatic transition duration

    // Liquid Curtain exit morphing parameters
    let curtainStartTime = 0;
    const curtainDuration = 850;

    const animateCurtain = (timestamp: number) => {
      if (!curtainStartTime) curtainStartTime = timestamp;
      const elapsed = timestamp - curtainStartTime;
      const progressT = Math.min(elapsed / curtainDuration, 1);

      // Cubic ease-in-out curve
      const easeT =
        progressT < 0.5
          ? 4 * progressT * progressT * progressT
          : 1 - Math.pow(-2 * progressT + 2, 3) / 2;

      const yCorners = 100 * (1 - easeT);
      // Center lags behind corners to create downward bulge
      const lag = 25 * Math.sin(progressT * Math.PI);
      const yCenter = Math.min(100, 100 * (1 - easeT) + lag);

      if (curtainRef.current) {
        curtainRef.current.setAttribute(
          "d",
          `M 0 0 L 100 0 L 100 ${yCorners} Q 50 ${yCenter} 0 ${yCorners} Z`
        );
      }

      if (progressT < 1) {
        requestAnimationFrame(animateCurtain);
      } else {
        setIsHidden(true);
        window.scrollTo(0, 0);
        onCompleteRef.current();
      }
    };

    // Isolated Progress Loading Loop
    let loadingStartTime = performance.now();
    const loadingDuration = 3000;

    const animateLoading = (timestamp: number) => {
      const elapsed = timestamp - loadingStartTime;
      const progressPercent = Math.min((elapsed / loadingDuration) * 100, 100);

      // Update HUD elements directly in DOM
      if (progressFillRef.current) {
        progressFillRef.current.style.width = `${progressPercent}%`;
      }


      if (progressPercent < 100) {
        animationFrameRef.current = requestAnimationFrame(animateLoading);
      } else {
        // loading complete: trigger HUD fade-out state
        setIsWarping(true);
        isWarpingRef.current = true;

        // Initialize and trigger canvas rendering loop
        loopStartTime = performance.now();
        lastTime = performance.now();
        animationFrameRef.current = requestAnimationFrame(loop);
      }
    };

    const loop = () => {
      const time = performance.now();
      // Clamp deltaTime to a maximum of 32ms to prevent frame skips/timing spikes
      const deltaTime = Math.min(time - lastTime, 32);
      lastTime = time;

      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const cx = w / 2;
      const cy = h / 2;

      // Draw background
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, w, h);

      // Progress t (0 to 1) driven automatically by elapsed time
      const elapsedWarp = time - loopStartTime;
      const t = Math.min(elapsedWarp / transitionDuration, 1);

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
        const tPrime = (t - 0.2) / 0.8;
        const easeFactor = quinticEase(tPrime);
        cameraZ = easeFactor * warpDistance;
        fadeIn = 1;
      }

      // 90% to 100%: Tunnel dissolves and expands (opens up) into Hero background
      if (t >= 0.9) {
        tunnelOpacity = 1 - (t - 0.9) / 0.1;
        const expandFactor = (t - 0.9) / 0.1;
        scaleMultiplier = 1.0 + Math.pow(expandFactor, 3) * 6;
      }

      // Complete transition
      if (t >= 1 && !isFadeOutRef.current) {
        isFadeOutRef.current = true;
        setIsFadeOut(true);
        // Start high-performance liquid curtain sweep reveal
        requestAnimationFrame(animateCurtain);
        return;
      }

      // Focal length of 100 creates perspective scale
      const focalLength = 100;



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

        const depthRatio = 1 - relZ / maxZ;
        const opacity = 0.2 + 0.8 * depthRatio;

        // Original lines style: Nearest stroke: 2px, Middle: 1.5px, Far: 1px, Deep: 0.75px
        ctx.lineWidth = 0.75 + 1.25 * scale;

        let closeFade = 1;
        if (relZ < 150) {
          closeFade = Math.max(0, relZ / 150);
        }

        // Clean white stroke color #FFFFFF
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * closeFade * tunnelOpacity * fadeIn})`;

        // Draw horizontal lines
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx + sw, sy);
        ctx.moveTo(sx, sy + sh);
        ctx.lineTo(sx + sw, sy + sh);
        ctx.stroke();
      }



      animationFrameRef.current = requestAnimationFrame(loop);
    };

    // Trigger isolated loading animation
    animationFrameRef.current = requestAnimationFrame(animateLoading);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  if (isHidden) return null;

  return (
    <div className="preloader-overlay">
      {/* SVG Liquid Curtain Overlay */}
      <svg className="preloader-curtain" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path ref={curtainRef} fill="#000000" d="M 0 0 L 100 0 L 100 100 Q 50 100 0 100 Z" />
      </svg>

      <canvas ref={canvasRef} className="preloader-tunnel-canvas" />
      <div className="editorial-noise-overlay"></div>

      {/* Loading HUD */}
      <div className={`preloader-hud ${isWarping ? "hud-fade-out" : ""}`}>
        <div className="preloader-content">
          <div className="preloader-title-wrap">
            {"AVHAD ENTERPRISES".split("").map((char, index) => (
              <span
                key={index}
                className="preloader-title-letter"
                style={{
                  animationDelay: `${index * 0.04}s`,
                  marginRight: char === " " ? "0.22em" : "0",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>

          <div className="preloader-progress-bg">
            <div
              ref={progressFillRef}
              className="preloader-progress-fill"
              style={{ width: "0%" }}
            ></div>
          </div>


        </div>
      </div>
    </div>
  );
}
