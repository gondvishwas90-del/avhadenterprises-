"use client";

import { useEffect, useState, useRef } from "react";

interface AppMenuItem {
  title: string;
  icon: React.ReactNode;
}

interface BottomTab {
  name: string;
  active: boolean;
  icon: React.ReactNode;
}

export default function InventoryTrackingSection() {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        const scrolledInView = windowHeight - rect.top;
        setScrollY(scrolledInView);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const phoneTranslateY = Math.max(-140, -50 + (scrollY * -0.16));

  const menuItems: AppMenuItem[] = [
    {
      title: "Add/Return",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
      )
    },
    {
      title: "Remove Inventory",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
      )
    },
    {
      title: "Relocate",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      )
    },
    {
      title: "Cycle Count",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 11 12 14 22 4"></polyline>
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
        </svg>
      )
    },
    {
      title: "Schedule new task",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      )
    }
  ];

  const bottomTabs: BottomTab[] = [
    {
      name: "Actions",
      active: true,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="9" y1="9" x2="15" y2="9"></line>
          <line x1="9" y1="13" x2="15" y2="13"></line>
          <line x1="9" y1="17" x2="15" y2="17"></line>
        </svg>
      )
    },
    {
      name: "Inventory",
      active: false,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <rect x="3" y="3" width="18" height="8" rx="2"></rect>
        </svg>
      )
    },
    {
      name: "Orders",
      active: false,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="15" height="13"></rect>
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
          <circle cx="5.5" cy="18.5" r="2.5"></circle>
          <circle cx="18.5" cy="18.5" r="2.5"></circle>
        </svg>
      )
    },
    {
      name: "Access",
      active: false,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      )
    },
    {
      name: "Settings",
      active: false,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      )
    }
  ];

  return (
    <section className="inventory-section" id="inventory" ref={sectionRef}>

      {/* Ambient aurora glows */}
      <div className="inventory-glow-radial"></div>

      <div className="inventory-container">

        {/* Main section title fold */}
        <div className="inventory-header">
          <span className="inventory-eyebrow">ASSETS MANAGEMENT</span>
          <h2 className="inventory-title">
            Take Control of <br />
            Your <span className="highlight-blue">Infrastructure</span>
          </h2>
          <p className="inventory-subtitle">
            Unlock full visibility and control of your global strategy nodes, assets tracking, and automated enterprise logic networks.
          </p>
        </div>

        {/* 2-Column Split Grid below the title */}
        <div className="inventory-split-grid">

          {/* Left Column: Parallax Phone and Radar Waves */}
          <div className="inventory-left-visual">
            <div className="phone-radar-waves">
              <div className="radar-wave wave-1"></div>
              <div className="radar-wave wave-2"></div>
              <div className="radar-wave wave-3"></div>
            </div>

            <div
              className="phone-frame-container"
              style={{
                transform: `translateY(${phoneTranslateY}px) perspective(1000px) rotateX(10deg)`
              }}
            >
              <div className="phone-screen">

                {/* Status Bar */}
                <div className="phone-status-bar">
                  <span className="status-time">13:13</span>
                  <div className="status-icons">
                    <svg className="status-icon" width="14" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="1" y="16" width="3" height="6" rx="0.5" />
                      <rect x="6" y="12" width="3" height="10" rx="0.5" />
                      <rect x="11" y="8" width="3" height="14" rx="0.5" />
                      <rect x="16" y="4" width="3" height="18" rx="0.5" />
                    </svg>
                    <svg className="status-icon" width="14" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                      <path d="M8.53 16.1a6 6 0 0 1 6.95 0" />
                      <line x1="12" y1="20" x2="12" y2="20" strokeLinecap="round" />
                    </svg>
                    <svg className="status-icon" width="16" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="1" y="6" width="18" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
                      <rect x="4" y="9" width="12" height="6" rx="1" />
                      <rect x="20" y="10" width="2" height="4" rx="0.5" />
                    </svg>
                  </div>
                </div>

                {/* Navbar */}
                <div className="phone-app-navbar">
                  <button className="navbar-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="3" y1="12" x2="21" y2="12"></line>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                  </button>
                  <span className="navbar-title">Actions</span>
                  <button className="navbar-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </button>
                </div>

                {/* App Content with Actions lists */}
                <div className="phone-app-content">
                  {/* Top Locator Details */}
                  <div className="node-detail-card">
                    <div className="node-card-header">
                      <div className="node-target-dot">
                        <div className="dot-inner"></div>
                        <div className="dot-radar"></div>
                      </div>
                      <span className="node-label">Atlanta — Warehouse 60001</span>
                    </div>
                    <svg className="node-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </div>

                  {/* List of Menu Actions */}
                  <div className="phone-app-menu-list">
                    {menuItems.map((item, idx) => (
                      <div key={idx} className="phone-menu-item-card">
                        <div className="menu-item-left">
                          <div className="menu-item-icon-box">
                            {item.icon}
                          </div>
                          <span className="menu-item-title">{item.title}</span>
                        </div>
                        <svg className="menu-item-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Phone bottom navigation tab bar */}
                <div className="phone-bottom-nav">
                  {bottomTabs.map((tab, idx) => (
                    <div key={idx} className={`phone-nav-tab ${tab.active ? "active" : ""}`}>
                      <div className="tab-icon-wrap">
                        {tab.icon}
                      </div>
                      <span className="tab-label">{tab.name}</span>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>

          {/* Right Column: Title and divider text column */}
          <div className="inventory-right-text-col">
            <div className="inventory-divider-line"></div>
            <h3 className="inventory-right-title">
              Transform the way you manage inventory
            </h3>
            <p className="inventory-right-desc">
              With Avhad Control, check inventory, manage asset pickup and delivery, schedule final-mile, while maintaining high quality standards all in one platform.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
