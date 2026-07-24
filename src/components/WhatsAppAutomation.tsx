"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Sparkles, 
  Bot, 
  Send,
  Database,
  Cpu,
  GitBranch,
  Wifi,
  Battery,
  Cloud,
  MessageSquare,
  Calendar
} from "lucide-react";

export default function WhatsAppAutomation() {
  const [step, setStep] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [activeNotification, setActiveNotification] = useState<number | null>(null);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const handleMouseLeave = () => {
    setIsHovered(false);
    resetTimeline();
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    startTimeline();
  };

  const resetTimeline = () => {
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
    setStep(0);
    setActiveNotification(null);
  };

  const startTimeline = () => {
    resetTimeline();

    // Step 1: AI Typing Indicator (0ms)
    setStep(1);

    // Step 2: AI replies with options (900ms)
    const t1 = setTimeout(() => {
      setStep(2);
    }, 900);

    // Step 3: Customer automatically selects "AI Automation" option (2400ms)
    const t2 = setTimeout(() => {
      setStep(3);
    }, 2400);

    // Step 4: AI Typing second response (3200ms)
    const t3 = setTimeout(() => {
      setStep(4);
    }, 3200);

    // Step 5: AI replies "Great! Can I have your company name?" (3900ms)
    const t4 = setTimeout(() => {
      setStep(5);
    }, 3900);

    // Step 6: Customer replies: "ABC Industries" (4700ms)
    const t5 = setTimeout(() => {
      setStep(6);
    }, 4700);

    // Staggered Push Notifications sliding in from the top of the screen (5200ms+)
    // Notification 0: Salesforce (5200ms - 6200ms)
    const tNotify0 = setTimeout(() => {
      setActiveNotification(0);
    }, 5200);

    const tNotify0Hide = setTimeout(() => {
      setActiveNotification(null);
    }, 6600);

    // Notification 1: Slack (6800ms - 7800ms)
    const tNotify1 = setTimeout(() => {
      setActiveNotification(1);
    }, 6800);

    const tNotify1Hide = setTimeout(() => {
      setActiveNotification(null);
    }, 8200);

    // Notification 2: Calendar (8400ms - 9400ms)
    const tNotify2 = setTimeout(() => {
      setActiveNotification(2);
    }, 8400);

    const tNotify2Hide = setTimeout(() => {
      setActiveNotification(null);
    }, 9800);

    // Loop ends / restarts (11000ms)
    const tComplete = setTimeout(() => {
      resetTimeline();
    }, 11200);

    timeoutsRef.current.push(
      t1, t2, t3, t4, t5, 
      tNotify0, tNotify0Hide, 
      tNotify1, tNotify1Hide, 
      tNotify2, tNotify2Hide, 
      tComplete
    );
  };

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((t) => clearTimeout(t));
    };
  }, []);

  return (
    <section className="wa-showcase-section" id="whatsapp-automation">
      <div className="wa-backdrop-glow"></div>
      
      <div 
        className={`wa-layout-wrapper ${isHovered ? "is-hovered" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="wa-showcase-grid">
          
          {/* LEFT COLUMN: Premium Benefit-driven Editorial Copy */}
          <div className="wa-copy-column">
            
            <div className="wa-lower-badge">
              <Sparkles size={12} className="wa-sparkle-blue" />
              <span>STRIKE-LEVEL DIALOGUE AGENT</span>
            </div>

            <h2 className="wa-showcase-title">
              WhatsApp <br />
              <span className="text-gradient-cyan">Automation System</span>
            </h2>

            <p className="wa-showcase-desc">
              Connect your customer conversations directly to CRM execution pipelines, calendar bookings, database tracking, and communication servers using autonomous conversational workflows.
            </p>

            <div className="wa-bullets-stack">
              <div className="wa-bullet-item">
                <div className="wa-bullet-bullet"><Cpu size={12} /></div>
                <div className="wa-bullet-info">
                  <span className="wa-bullet-title">Intelligent Intent Analysis</span>
                  <p className="wa-bullet-text">Matches queries to workflows on the fly.</p>
                </div>
              </div>

              <div className="wa-bullet-item">
                <div className="wa-bullet-bullet"><Database size={12} /></div>
                <div className="wa-bullet-info">
                  <span className="wa-bullet-title">Instant CRM Sync</span>
                  <p className="wa-bullet-text">Automatically creates leads and sets custom database states.</p>
                </div>
              </div>

              <div className="wa-bullet-item">
                <div className="wa-bullet-bullet"><GitBranch size={12} /></div>
                <div className="wa-bullet-info">
                  <span className="wa-bullet-title">Multi-Service Webhooks</span>
                  <p className="wa-bullet-text">Triggers Slack alerts, emails, and calendar events concurrently.</p>
                </div>
              </div>
            </div>

            <div className="wa-action-row">
              <a href="#contact" className="wa-explore-btn">
                DEPLOY SYSTEM <span className="explore-arrow">&gt;</span>
              </a>
            </div>

          </div>

          {/* RIGHT COLUMN: Realistic WhatsApp Smartphone Mockup */}
          <div className="wa-visual-column">
            <div className="wa-visual-ambient-glow"></div>
            
            {/* Concentric radar mesh background */}
            <div className="wa-radar-container">
              <div className="wa-radar-circle rc1"></div>
              <div className="wa-radar-circle rc2"></div>
              <div className="wa-radar-circle rc3"></div>
            </div>

            {/* Smartphone Hardware Frame */}
            <div className="wa-phone-frame">
              
              {/* Phone Speaker & Camera Notch */}
              <div className="wa-phone-notch"></div>

              {/* Top Status Bar UI */}
              <div className="wa-phone-status-bar">
                <span className="status-time">9:41 AM</span>
                <div className="status-icons">
                  <Wifi size={12} className="text-gray-400" />
                  <Battery size={14} className="text-gray-400" />
                </div>
              </div>

              {/* Chat Header Area */}
              <div className="wa-chat-header">
                <div className="wa-header-avatar">
                  <Bot size={15} className="wa-bot-icon" />
                  <div className="wa-avatar-badge"></div>
                </div>
                <div className="wa-header-meta">
                  <span className="wa-header-name">WhatsApp Automation System</span>
                  <span className="wa-header-subtitle">online</span>
                </div>
                <div className="wa-header-actions">
                  <div className="wa-header-verified-tag">Verified</div>
                </div>
              </div>

              {/* Floating push notification window (Salesforce, Slack, Google Calendar) */}
              <div className={`wa-push-notification ${activeNotification !== null ? "notification-visible" : ""}`}>
                {activeNotification === 0 && (
                  <div className="notification-inner">
                    <div className="notify-icon-box bg-blue-600">
                      <Cloud size={14} className="text-white" />
                    </div>
                    <div className="notify-meta">
                      <span className="notify-title">Salesforce CRM</span>
                      <p className="notify-text">Lead Created: ABC Industries (WhatsApp)</p>
                    </div>
                  </div>
                )}
                {activeNotification === 1 && (
                  <div className="notification-inner">
                    <div className="notify-icon-box bg-purple-600">
                      <MessageSquare size={14} className="text-white" />
                    </div>
                    <div className="notify-meta">
                      <span className="notify-title">Slack Pipeline</span>
                      <p className="notify-text">#sales-pipeline: Verified Lead ABC Industries matched.</p>
                    </div>
                  </div>
                )}
                {activeNotification === 2 && (
                  <div className="notification-inner">
                    <div className="notify-icon-box bg-emerald-600">
                      <Calendar size={14} className="text-white" />
                    </div>
                    <div className="notify-meta">
                      <span className="notify-title">Google Calendar</span>
                      <p className="notify-text"> AE Sales Meeting scheduled with ABC Industries</p>
                    </div>
                  </div>
                )}
              </div>

              {/* WhatsApp Chat Body Wallpaper container */}
              <div className="wa-chat-body">
                
                {/* Initial Customer Message: Always Visible */}
                <div className="wa-msg-row row-right">
                  <div className="wa-msg-bubble bubble-right">
                    <p className="msg-text">Hi, I need pricing for your services.</p>
                    <span className="msg-time">10:42 AM ✓✓</span>
                  </div>
                </div>

                {/* Step 1: AI Typing */}
                {step === 1 && (
                  <div className="wa-msg-row row-left animate-fade-in">
                    <div className="wa-msg-bubble bubble-left typing-bubble">
                      <div className="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2+: AI Reply 1 */}
                {step >= 2 && (
                  <div className="wa-msg-row row-left animate-slide-up">
                    <div className="wa-msg-bubble bubble-left">
                      <p className="msg-text">Hello! I&apos;d be happy to help. Which service are you interested in?</p>
                      
                      {/* Interactive selection options styled as whatsapp response template pills */}
                      <div className="wa-msg-options">
                        <div className={`wa-option-btn ${step === 2 ? "option-pulse" : ""} ${step >= 3 ? "option-dimmed" : ""}`}>
                          Website Development
                        </div>
                        <div className={`wa-option-btn ${step === 2 ? "option-pulse" : ""} ${step >= 3 ? "option-dimmed" : ""}`}>
                          Software Development
                        </div>
                        <div className={`wa-option-btn option-selected ${step === 2 ? "option-highlight" : ""}`}>
                          AI Automation
                        </div>
                      </div>
                      <span className="msg-time">10:42 AM</span>
                    </div>
                  </div>
                )}

                {/* Step 3+: Customer response */}
                {step >= 3 && (
                  <div className="wa-msg-row row-right animate-slide-up">
                    <div className="wa-msg-bubble bubble-right bubble-selected-reply">
                      <p className="msg-text">AI Automation</p>
                      <span className="msg-time">10:42 AM ✓✓</span>
                    </div>
                  </div>
                )}

                {/* Step 4: AI Second Typing */}
                {step === 4 && (
                  <div className="wa-msg-row row-left animate-fade-in">
                    <div className="wa-msg-bubble bubble-left typing-bubble">
                      <div className="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 5+: AI Second Reply */}
                {step >= 5 && (
                  <div className="wa-msg-row row-left animate-slide-up">
                    <div className="wa-msg-bubble bubble-left">
                      <p className="msg-text">Great! Can I have your company name?</p>
                      <span className="msg-time">10:43 AM</span>
                    </div>
                  </div>
                )}

                {/* Step 6: Customer Second Reply */}
                {step >= 6 && (
                  <div className="wa-msg-row row-right animate-slide-up">
                    <div className="wa-msg-bubble bubble-right">
                      <p className="msg-text">ABC Industries</p>
                      <span className="msg-time">10:43 AM ✓✓</span>
                    </div>
                  </div>
                )}

              </div>

              {/* Chat Input Bar Footer (WhatsApp Style) */}
              <div className="wa-chat-footer">
                <div className="wa-input-placeholder">
                  <span>Message</span>
                </div>
                <div className="wa-send-btn">
                  <Send size={11} className="text-gray-400" />
                </div>
              </div>

              {/* Phone Home Bar notch */}
              <div className="wa-phone-home-bar"></div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
