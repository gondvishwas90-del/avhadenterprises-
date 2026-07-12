"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "What exactly does Avhad Enterprises do?",
      a: "Avhad Enterprises is a global strategy, technology consulting, and digital transformation company. We engineer custom enterprise software, build headless search architectures, design automated middle-office pipelines, and provide strategic positioning design to help companies achieve exponential operational growth."
    },
    {
      q: "How does your custom software engineering process work?",
      a: "We work from a strict architectural blueprint. After a forensic audit of your technical infrastructure, our senior engineers write type-safe React/Next.js frontends and Node.js microservices. Every project is fully containerized, optimized for speed, and follows rigid security and SOC-2 guidelines."
    },
    {
      q: "Can you integrate with our legacy databases, SAP, or Salesforce?",
      a: "Yes. We specialize in building custom API middleware adapters and self-healing cron synchronization nodes that connect legacy systems (SAP, Oracle, mainframe databases) to modern SaaS dashboards and CRMs like Salesforce and HubSpot, ensuring zero data loss."
    },
    {
      q: "Do you support cross-border projects and global operations?",
      a: "Absolutely. We build localized, multi-region compliant digital ecosystems. Our systems are engineered to support multi-currency, multi-language translation pipelines, and automated localized SEO indexing out of the box."
    },
    {
      q: "What is your typical engagement model and timeline?",
      a: "Our engagements typically begin with a 2-4 week forensic audit and strategy blueprinting phase. Complete deep-engineering implementations and system rollouts take between 8 to 16 weeks, accompanied by weekly delivery cycles and automated test walkthroughs."
    }
  ];

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="faq-section">
      <div className="section-header reveal-fade-up">
        <span className="editorial-label">[ 11 — KNOWLEDGE INDEX ]</span>
        <h2 className="section-title">Frequently Answered Queries.</h2>
        <p className="section-subtitle">
          Explore answers to structural questions regarding our development pipelines, legacy integration abilities, and consultation cycles.
        </p>
      </div>

      <div className="faq-accordion reveal-fade-up">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className={`faq-item ${isOpen ? "open" : ""}`}>
              <button className="faq-question-btn" onClick={() => toggleFAQ(idx)}>
                <span className="faq-question-text">{faq.q}</span>
                <span className="faq-toggle-icon">
                  {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                </span>
              </button>
              
              <div className="faq-answer-wrapper">
                <div className="faq-answer-content">
                  <p>{faq.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
