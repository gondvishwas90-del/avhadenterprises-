"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

const navLinks = [
  { 
    name: "Home", 
    href: "#home", 
    sub: "( 首頁 )", 
    thumbLeft: "/case_study_1.png", 
    thumbRight: "/case_study_2.png" 
  },
  { 
    name: "About", 
    href: "#about", 
    sub: "( 關於我們 )", 
    thumbLeft: "/case_study_3.png", 
    thumbRight: "/showcase_1.png" 
  },
  { 
    name: "Why Us", 
    href: "#why-choose-us", 
    sub: "( 核心價值 )", 
    thumbLeft: "/showcase_2.png", 
    thumbRight: "/showcase_3.png" 
  },
  { 
    name: "Process", 
    href: "#process", 
    sub: "( 流程系統 )", 
    thumbLeft: "/showcase_4.png", 
    thumbRight: "/case_study_1.png" 
  },
  { 
    name: "Portfolio", 
    href: "#s3-gallery", 
    sub: "( 設計案例 )", 
    thumbLeft: "/case_study_2.png", 
    thumbRight: "/case_study_3.png" 
  },
  { 
    name: "Contact", 
    href: "#contact", 
    sub: "( 聯絡我們 )", 
    thumbLeft: "/showcase_1.png", 
    thumbRight: "/showcase_2.png" 
  }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    let lastY = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY >= 300);
      setIsScrollingDown(currentY > lastY && currentY > 20);
      lastY = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ── MORPHING CAPSULE CONTAINER (Always active) ── */}
      <div
        className={`ns-nav-container active ${
          isScrollingDown && !isMenuOpen ? "collapsed" : ""
        } ${isMenuOpen ? "menu-open" : ""}`}
      >
        {/* Capsule controls (Envelope, Logo, Hamburger) */}
        <div className="ns-nav-content">
          {/* Left Icon: Mail Envelope */}
          <a
            className="ns-icon"
            href="#contact"
            aria-label="Contact Us"
            onClick={() => isMenuOpen && setIsMenuOpen(false)}
          >
            <svg viewBox="0 0 24 24" className="ns-mail-svg">
              <path
                d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <polyline points="22,6 12,13 2,6" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </a>

          {/* Center Logo */}
          <a
            className="ns-logo"
            href="#home"
            aria-label="AVHAD Home"
            onClick={() => isMenuOpen && setIsMenuOpen(false)}
          >
            <span className="logo-word">AVHAD</span>
          </a>

          {/* Right Hamburger Toggle button */}
          <button
            className="ns-icon ns-hamburger"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Navigation Menu"
            aria-expanded={isMenuOpen}
          >
            <svg className="ns-ham-svg" viewBox="0 0 24 24">
              <line className="ns-ham-l1" x1="5" y1="9" x2="19" y2="9" stroke="currentColor" strokeWidth="2" />
              <line className="ns-ham-l2" x1="5" y1="15" x2="19" y2="15" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>

        {/* Fullscreen Overlay Menu Dropdown */}
        <div className="ns-dropdown" aria-hidden={!isMenuOpen}>
          <div className="ns-dropdown__inner">
            <div className="ns-menu-stage">
              <div className="ns-menu-rows">
                {navLinks.map((link, idx) => {
                  const isHovered = hoveredIdx === idx;
                  return (
                    <a
                      key={link.name}
                      className="ns-showcase-row ns-dropdown__item"
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      onMouseEnter={() => setHoveredIdx(idx)}
                      onMouseLeave={() => setHoveredIdx(null)}
                    >
                      <span className="ns-showcase-row__index" data-text={link.sub}></span>

                      {/* Left thumbnail image */}
                      <span className={`ns-showcase-row__thumb is-left ${isHovered ? "visible" : ""}`}>
                        <img
                          src={link.thumbLeft}
                          alt=""
                          style={{
                            transform: `scale(${isHovered ? 1.0 : 1.3})`,
                            transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
                          }}
                        />
                      </span>

                      {/* Title display */}
                      <span className="ns-showcase-row__title">
                        <span
                          className="ns-showcase-row__title-track"
                          style={{
                            transform: `translate3d(0, ${isHovered ? -104 : 0}%, 0)`,
                            transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)"
                          }}
                        >
                          <span className="ns-showcase-row__title-layer is-primary" data-text={link.name}>
                            {link.name}
                          </span>
                          <span className="ns-showcase-row__title-layer is-accent" aria-hidden="true" data-text={link.name}>
                            {link.name}
                          </span>
                        </span>
                      </span>

                      {/* Right thumbnail image */}
                      <span className={`ns-showcase-row__thumb is-right ${isHovered ? "visible" : ""}`}>
                        <img
                          src={link.thumbRight}
                          alt=""
                          style={{
                            transform: `scale(${isHovered ? 1.0 : 1.3})`,
                            transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
                          }}
                        />
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
