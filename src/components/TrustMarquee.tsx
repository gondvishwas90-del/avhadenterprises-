"use client";

export default function TrustMarquee() {
  const partners = [
    "ISO 27001 COMPLIANT",
    "GOOGLE PREMIER PARTNER",
    "META REGIONAL PARTNER",
    "MICROSOFT SOLUTIONS ARCHITECTS",
    "AWS CONSULTING NETWORK",
    "SOC-2 COMPLIANT INFRASTRUCTURE"
  ];

  const doublePartners = [...partners, ...partners, ...partners];

  return (
    <section className="trust-marquee-section">
      <div className="trust-marquee-container">
        <div className="marquee-content speed-slow">
          {doublePartners.map((partner, idx) => (
            <div key={idx} className="trust-badge-item">
              <span className="trust-dot">✦</span>
              <span className="trust-text">{partner}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
