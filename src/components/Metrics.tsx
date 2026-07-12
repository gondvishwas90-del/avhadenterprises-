"use client";

import { useEffect, useState, useRef } from "react";

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

function AnimatedCounter({ end, duration = 2000, suffix = "", prefix = "" }: CounterProps) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function (easeOutQuad)
      const easedProgress = progress * (2 - progress);
      
      setCount(Math.floor(easedProgress * (end - startValue) + startValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, end, duration]);

  return (
    <div ref={elementRef} className="metric-number">
      {prefix}
      {count}
      {suffix}
    </div>
  );
}

export default function Metrics() {
  const metricItems = [
    { label: "Years of Excellence", end: 6, suffix: "+" },
    { label: "Success Rate", end: 98, suffix: "%" },
    { label: "Enterprise Projects", end: 20, suffix: "+" },
    { label: "Industries Transformed", end: 15, suffix: "+" },
    { label: "Average Client Growth", end: 250, suffix: "%" }
  ];

  return (
    <section id="metrics" className="metrics-section reveal-fade-up">
      <div className="metrics-grid">
        {metricItems.map((item, idx) => (
          <div key={idx} className="metric-card premium-card">
            <AnimatedCounter end={item.end} suffix={item.suffix} />
            <div className="metric-label">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
