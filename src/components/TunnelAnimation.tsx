"use client";

import React, { useEffect, useRef, useState } from "react";

type ShapeType = "circle" | "square" | "hexagon" | "octagon" | "triangle";
type ThemeType = "cyberpunk" | "matrix" | "cosmic" | "aurora" | "monochrome";

interface TunnelAnimationProps {
  initialShape?: ShapeType;
  initialTheme?: ThemeType;
  initialSpeed?: number;
  interactive?: boolean;
}

const THEMES: Record<ThemeType, string[]> = {
  cyberpunk: ["#ff0055", "#00ffcc", "#0066ff", "#ff9900", "#ff00ff"],
  matrix: ["#00ff00", "#00aa00", "#003300", "#88ff88", "#00ff66"],
  cosmic: ["#7928ca", "#ff0080", "#3b82f6", "#1d4ed8", "#ec4899"],
  aurora: ["#059669", "#10b981", "#34d399", "#60a5fa", "#3b82f6"],
  monochrome: ["#ffffff", "#aaaaaa", "#666666", "#333333", "#e5e7eb"],
};

export default function TunnelAnimation({
  initialShape = "hexagon",
  initialTheme = "cyberpunk",
  initialSpeed = 4,
  interactive = true,
}: TunnelAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Animation settings state (interactive UI)
  const [shape, setShape] = useState<ShapeType>(initialShape);
  const [theme, setTheme] = useState<ThemeType>(initialTheme);
  const [speed, setSpeed] = useState<number>(initialSpeed);
  const [rotationSpeed, setRotationSpeed] = useState<number>(1);
  const [particleCount, setParticleCount] = useState<number>(120);
  const [mouseInfluence, setMouseInfluence] = useState<boolean>(interactive);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [bloom, setBloom] = useState<boolean>(true);

  // Keep refs of values needed in the anim loop to avoid recreation / closure staling
  const stateRef = useRef({
    shape,
    theme,
    speed,
    rotationSpeed,
    particleCount,
    mouseInfluence,
    showGrid,
    bloom,
    mouseX: 0,
    mouseY: 0,
    targetMouseX: 0,
    targetMouseY: 0,
  });

  // Sync state changes with ref
  useEffect(() => {
    stateRef.current = {
      ...stateRef.current,
      shape,
      theme,
      speed,
      rotationSpeed,
      particleCount,
      mouseInfluence,
      showGrid,
      bloom,
    };
  }, [shape, theme, speed, rotationSpeed, particleCount, mouseInfluence, showGrid, bloom]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Dynamic resize handler
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Mouse move tracking
    const handleMouseMove = (e: MouseEvent) => {
      if (!stateRef.current.mouseInfluence) return;
      // Normalize to -0.5 to 0.5
      stateRef.current.targetMouseX = (e.clientX / window.innerWidth) - 0.5;
      stateRef.current.targetMouseY = (e.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // 3D Math parameters
    const fov = 400; // Perspective focal length
    const maxDepth = 1000; // Far clipping plane

    // Initialize rings
    const ringSpacing = 40;
    const ringCount = Math.floor(maxDepth / ringSpacing);
    const rings = Array.from({ length: ringCount }, (_, i) => {
      return {
        z: maxDepth - i * ringSpacing,
        angle: (i * Math.PI) / 8,
        colorIndex: i % 5,
        pulseOffset: Math.random() * Math.PI * 2,
      };
    });

    // Initialize particles (stars)
    interface Particle {
      x: number;
      y: number;
      z: number;
      size: number;
      color: string;
      speedZ: number;
    }
    let particles: Particle[] = [];
    const createParticles = (count: number) => {
      const colors = THEMES[stateRef.current.theme];
      particles = Array.from({ length: count }, () => {
        const theta = Math.random() * Math.PI * 2;
        const radius = 50 + Math.random() * 300; // spread away from center
        return {
          x: Math.cos(theta) * radius,
          y: Math.sin(theta) * radius,
          z: Math.random() * maxDepth,
          size: 0.5 + Math.random() * 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          speedZ: 1 + Math.random() * 2,
        };
      });
    };
    createParticles(particleCount);

    // Watch for particle count change to re-init
    let prevParticleCount = particleCount;
    let prevTheme = theme;

    // Drawing helpers
    const drawPolygon = (
      context: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      radius: number,
      sides: number,
      angle: number
    ) => {
      if (sides < 3) return;
      context.beginPath();
      for (let i = 0; i < sides; i++) {
        const currentAngle = angle + (i * 2 * Math.PI) / sides;
        const x = cx + Math.cos(currentAngle) * radius;
        const y = cy + Math.sin(currentAngle) * radius;
        if (i === 0) {
          context.moveTo(x, y);
        } else {
          context.lineTo(x, y);
        }
      }
      context.closePath();
    };

    let time = 0;

    // Loop
    const render = () => {
      time += 0.01;
      const current = stateRef.current;

      // Handle configuration resets inside frame to keep it reactive
      if (current.particleCount !== prevParticleCount || current.theme !== prevTheme) {
        createParticles(current.particleCount);
        prevParticleCount = current.particleCount;
        prevTheme = current.theme;
      }

      // Smooth mouse lerping
      current.mouseX += (current.targetMouseX - current.mouseX) * 0.08;
      current.mouseY += (current.targetMouseY - current.mouseY) * 0.08;

      // Setup backdrop clearing
      ctx.fillStyle = "rgba(10, 10, 15, 0.25)"; // Trail effect
      ctx.fillRect(0, 0, width, height);

      // Tunnel center is dynamic based on mouse coords
      const centerX = width / 2 + current.mouseX * width * 0.6;
      const centerY = height / 2 + current.mouseY * height * 0.6;

      const colors = THEMES[current.theme];

      // 1. Draw particles
      particles.forEach((p) => {
        // Move towards viewer
        p.z -= current.speed * p.speedZ;

        // Reset if behind camera
        if (p.z <= 0) {
          p.z = maxDepth;
          const theta = Math.random() * Math.PI * 2;
          const radius = 50 + Math.random() * 400;
          p.x = Math.cos(theta) * radius;
          p.y = Math.sin(theta) * radius;
          p.color = colors[Math.floor(Math.random() * colors.length)];
        }

        // Project
        const scale = fov / p.z;
        // Apply camera offset (shift in opposite direction of tunnel center)
        const px = centerX + (p.x - current.mouseX * 200) * scale;
        const py = centerY + (p.y - current.mouseY * 200) * scale;

        // Draw if within bounds
        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const alpha = (1 - p.z / maxDepth) * 0.8;
          ctx.fillStyle = p.color;
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.arc(px, py, p.size * (scale * 0.5 + 0.5), 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1.0; // Reset alpha

      // Sort rings from back to front for proper rendering depth (painters algorithm)
      rings.sort((a, b) => b.z - a.z);

      // 2. Draw rings
      rings.forEach((ring) => {
        // Move ring closer
        ring.z -= current.speed;
        ring.angle += (current.rotationSpeed * 0.005) * (1 - ring.z / maxDepth * 0.5);

        // Reset ring to far depth
        if (ring.z <= 5) {
          ring.z = maxDepth;
        }

        const scale = fov / ring.z;
        const radius = 180 * scale;

        // Calculate opacity based on depth (fades in from far, fades out near camera)
        let alpha = 1;
        if (ring.z > maxDepth * 0.8) {
          // Fade in at distance
          alpha = (maxDepth - ring.z) / (maxDepth * 0.2);
        } else if (ring.z < 100) {
          // Fade out close to screen
          alpha = ring.z / 100;
        }

        if (alpha <= 0) return;

        const ringColor = colors[ring.colorIndex % colors.length];

        ctx.save();
        ctx.globalAlpha = alpha;

        // Neon Glow effect (costs performance, made optional/controllable)
        if (current.bloom) {
          ctx.shadowBlur = 12 * (scale * 0.3 + 0.7);
          ctx.shadowColor = ringColor;
        }

        ctx.strokeStyle = ringColor;
        ctx.lineWidth = Math.max(1, 2.5 * scale);

        // Calculate offset based on depth to create a curved tunnel path
        const rx = centerX;
        const ry = centerY;

        // Determine shape and draw
        if (current.shape === "circle") {
          ctx.beginPath();
          ctx.arc(rx, ry, radius, 0, Math.PI * 2);
          ctx.stroke();
        } else {
          let sides = 6;
          if (current.shape === "square") sides = 4;
          else if (current.shape === "hexagon") sides = 6;
          else if (current.shape === "octagon") sides = 8;
          else if (current.shape === "triangle") sides = 3;

          drawPolygon(ctx, rx, ry, radius, sides, ring.angle);
          ctx.stroke();
        }

        // Draw concentric depth guide lines
        if (current.showGrid && ring.z % 200 < 5) {
          ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
          ctx.shadowBlur = 0;
          ctx.beginPath();
          ctx.arc(rx, ry, radius * 1.5, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.restore();
      });

      // Draw subtle focal glow center
      const centerGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 150);
      centerGlow.addColorStop(0, "rgba(10, 10, 20, 0.85)");
      centerGlow.addColorStop(0.5, "rgba(5, 5, 10, 0.4)");
      centerGlow.addColorStop(1, "transparent");
      ctx.fillStyle = centerGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 150, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    // Run animation
    render();

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [theme]); // Re-run effect only on major theme resets to rebuild colors safely

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#050508] select-none font-sans"
    >
      {/* Background canvas */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full block cursor-crosshair"
      />

      {/* Futuristic floating control center */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:left-6 md:-translate-x-0 max-w-[90%] md:max-w-md w-full z-10 backdrop-blur-xl bg-slate-950/40 border border-white/10 rounded-2xl p-5 shadow-2xl transition-all duration-300 hover:border-white/20">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <div>
              <h3 className="text-white text-md font-semibold tracking-wider uppercase bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">
                Warp Core Controller
              </h3>
              <p className="text-xs text-slate-400/80">HTML5 Canvas 3D Space-Time Portal</p>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
              <span className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase">Active</span>
            </div>
          </div>

          {/* Configuration Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            {/* Shape Select */}
            <div className="flex flex-col gap-1">
              <label className="text-slate-400 font-medium">Portal Shape</label>
              <select
                value={shape}
                onChange={(e) => setShape(e.target.value as ShapeType)}
                className="bg-slate-900/60 border border-white/10 text-white rounded-lg px-2.5 py-1.5 cursor-pointer outline-none focus:border-cyan-500 hover:bg-slate-900 transition-colors"
              >
                <option value="hexagon">Hexagon</option>
                <option value="octagon">Octagon</option>
                <option value="circle">Circular</option>
                <option value="square">Square</option>
                <option value="triangle">Triangle</option>
              </select>
            </div>

            {/* Theme Select */}
            <div className="flex flex-col gap-1">
              <label className="text-slate-400 font-medium">Cosmic Theme</label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value as ThemeType)}
                className="bg-slate-900/60 border border-white/10 text-white rounded-lg px-2.5 py-1.5 cursor-pointer outline-none focus:border-cyan-500 hover:bg-slate-900 transition-colors"
              >
                <option value="cyberpunk">Cyberpunk Neon</option>
                <option value="cosmic">Cosmic Nebula</option>
                <option value="matrix">Green Matrix</option>
                <option value="aurora">Emerald Aurora</option>
                <option value="monochrome">Dark Matter</option>
              </select>
            </div>
          </div>

          {/* Sliders */}
          <div className="flex flex-col gap-3.5">
            {/* Warp Speed Slider */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Flight Speed (Warp Factor)</span>
                <span className="text-cyan-400 font-semibold">{speed}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="15"
                step="0.5"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Rotation Speed Slider */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Torsional Rotation</span>
                <span className="text-cyan-400 font-semibold">{rotationSpeed}x</span>
              </div>
              <input
                type="range"
                min="-5"
                max="5"
                step="0.5"
                value={rotationSpeed}
                onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
                className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>
          </div>

          {/* Switches/Toggles */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 pt-1 border-t border-white/5">
            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={mouseInfluence}
                onChange={(e) => setMouseInfluence(e.target.checked)}
                className="rounded border-white/10 text-cyan-500 focus:ring-0 focus:ring-offset-0 bg-slate-950/60 w-3.5 h-3.5"
              />
              Mouse Control
            </label>

            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={bloom}
                onChange={(e) => setBloom(e.target.checked)}
                className="rounded border-white/10 text-cyan-500 focus:ring-0 focus:ring-offset-0 bg-slate-950/60 w-3.5 h-3.5"
              />
              Neon Glow (Bloom)
            </label>

            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showGrid}
                onChange={(e) => setShowGrid(e.target.checked)}
                className="rounded border-white/10 text-cyan-500 focus:ring-0 focus:ring-offset-0 bg-slate-950/60 w-3.5 h-3.5"
              />
              Concentric Grids
            </label>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Dust Density:</span>
              <button
                onClick={() => setParticleCount((prev) => (prev === 60 ? 120 : prev === 120 ? 250 : 60))}
                className="text-[10px] bg-slate-900/80 border border-white/10 hover:border-cyan-500 text-cyan-400 rounded-md px-1.5 py-0.5 font-mono uppercase"
              >
                {particleCount === 60 ? "Low" : particleCount === 120 ? "Med" : "High"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic overlays for high aesthetics */}
      <div className="absolute inset-0 pointer-events-none border-[12px] border-slate-950/50 mix-blend-overlay"></div>
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-slate-950 to-transparent pointer-events-none opacity-80"></div>
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none opacity-80"></div>
    </div>
  );
}
