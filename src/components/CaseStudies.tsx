"use client";

import { useEffect, useRef } from "react";

const cases = [
  {
    title: "SaaS Analytics Transformation",
    category: "Growth & Automation",
    img: "/case_study_1.png",
    link: "#"
  },
  {
    title: "Enterprise Database Restructuring",
    category: "Cloud Infrastructure",
    img: "/case_study_2.png",
    link: "#"
  },
  {
    title: "Logistics Dashboard Integration",
    category: "Software Engineering",
    img: "/case_study_3.png",
    link: "#"
  },
  {
    title: "AI Operations & Automated Core",
    category: "Agentic Engineering",
    img: "/showcase_1.png",
    link: "#"
  },
  {
    title: "High-Performance D2C Ecosystem",
    category: "Digital Architecture",
    img: "/showcase_2.png",
    link: "#"
  },
  {
    title: "Fluid Web Interfaces & Coding",
    category: "Creative Craft",
    img: "/showcase_3.png",
    link: "#"
  }
];

const speeds = [12, 18, 10, 20, 15, 22]; // Parallax speed percentage offsets for each item

export default function CaseStudies() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const track = trackRef.current;
    const sticky = stickyRef.current;
    const title = titleRef.current;
    if (!track || !sticky || !title) return;

    let windowHeight = window.innerHeight;

    const handleResize = () => {
      windowHeight = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    let activeFrameId = 0;

    const tick = () => {
      const trackRect = track.getBoundingClientRect();
      const scrollable = trackRect.height - windowHeight;

      if (scrollable > 0) {
        // Track overall progress of the section
        const progress = -trackRect.top / scrollable;
        const clampedProgress = Math.max(0, Math.min(1, progress));

        // Background title exit zoom-blur dissolve
        if (trackRect.top <= 0) {
          const exitProgress = Math.max(0, Math.min(1, (clampedProgress - 0.15) / 0.45)); // starts at 15% scroll, ends at 60%
          const scale = 1 - 0.3 * exitProgress;
          const opacity = 1 - exitProgress;
          const blur = exitProgress * 12;

          title.style.transform = `scale3d(${scale}, ${scale}, 1)`;
          title.style.opacity = `${opacity}`;
          title.style.filter = `blur(${blur}px)`;
        } else {
          title.style.transform = "scale3d(1, 1, 1)";
          title.style.opacity = "1";
          title.style.filter = "none";
        }
      }

      // Parallax updates for each grid card item
      itemsRef.current.forEach((item, idx) => {
        if (!item) return;

        const itemRect = item.getBoundingClientRect();

        // Trigger reveal when item crosses 90% of screen height
        if (itemRect.top < windowHeight * 0.9) {
          item.classList.add("revealed");
        }

        // Parallax scroll scrubbing
        const itemProgress = (windowHeight - itemRect.top) / (windowHeight + itemRect.height);
        const clampedItemProgress = Math.max(0, Math.min(1, itemProgress));

        const speed = speeds[idx % speeds.length];
        const yPercent = (clampedItemProgress - 0.5) * speed * 2;

        const img = item.querySelector(".pg-parallax-img") as HTMLElement;
        if (img) {
          img.style.transform = `translate3d(0px, ${yPercent}%, 0px)`;
        }
      });

      activeFrameId = requestAnimationFrame(tick);
    };

    // Start loop
    tick();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(activeFrameId);
    };
  }, []);

  return (
    <section ref={trackRef} className="s3-gallery-section" id="s3-gallery">
      <div ref={stickyRef} className="gallery-header">
        <h2 className="gallery-header-label">( REDEFINING THE VISUAL THINKING OF THE BRAND )</h2>
        <div ref={titleRef} className="gallery-header-title">
          <span className="gh-line">ARCHIVE OF</span>
          <span className="gh-line">THE SELECTED WORKS</span>
          <span className="gh-line">BY AVHAD</span>
        </div>
        <p className="text1vw">Digital Vision Energy Release Point</p>
      </div>

      <div className="pg-gallery">
        {cases.map((cs, idx) => (
          <div
            key={idx}
            className={`pg-item pg-item-${idx + 1}`}
            ref={(el) => {
              itemsRef.current[idx] = el;
            }}
          >
            <a
              href={cs.link}
              data-cursor="VIEW"
              aria-label={`View ${cs.title}`}
              style={{ position: "absolute", inset: 0, zIndex: 5 }}
            ></a>

            <div className="pg-img-wrap">
              <div className="pg-img-scale-wrap">
                <img src={cs.img} alt={cs.title} className="pg-parallax-img" />
              </div>
            </div>

            <div className="pg-hover-copy">
              <span className="pg-hover-copy__eyebrow">{cs.category}</span>
              <div className="pg-hover-copy__body">
                <div className="pg-hover-copy__title-wrap">
                  <span className="pg-hover-copy__title">{cs.title}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
