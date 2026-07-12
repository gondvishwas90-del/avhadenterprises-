"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Solutions", href: "#solutions" },
    { name: "Process", href: "#process" },
    { name: "Case Studies", href: "#case-studies" },
    { name: "About", href: "#about" },
    { name: "Insights", href: "#insights" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <>
      <header className={`navbar-wrapper ${isScrolled ? "scrolled" : ""} ${!isVisible ? "navbar-hidden" : ""}`}>
        <div className="navbar-container">
          <a href="#home" className="logo">
            AVHAD<span>ENTERPRISES</span>
          </a>

          <nav className="nav-menu">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="nav-link">
                {link.name}
              </a>
            ))}
          </nav>

          <div className="nav-right">
            <a href="#contact" className="btn-primary start-project-btn">
              Start a Project <ArrowRight className="arrow-icon" size={16} />
            </a>

            <button 
              className="mobile-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-menu-drawer ${isMobileMenuOpen ? "open" : ""}`}>
        <nav className="mobile-nav-links">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="mobile-nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact" 
            className="btn-primary mobile-cta"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Start a Project <ArrowRight size={16} />
          </a>
        </nav>
      </div>
    </>
  );
}
