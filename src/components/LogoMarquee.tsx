"use client";

export default function LogoMarquee() {
  const logos = [
    { name: "Spherion Strategy", text: "SPHERION" },
    { name: "Quantix Digital", text: "QUANTIX" },
    { name: "Apex Integration", text: "APEX" },
    { name: "Nova Consulting", text: "NOVA" },
    { name: "Aether Systems", text: "AETHER" },
    { name: "Vortex Enterprise", text: "VORTEX" }
  ];

  // Duplicate list to make infinite scroll smooth
  const doubleLogos = [...logos, ...logos, ...logos];

  return (
    <section className="marquee-section">
      <div className="marquee-intro">
        <span className="editorial-label">[ Trusted by Leading Enterprises ]</span>
      </div>
      <div className="marquee-container">
        <div className="marquee-content">
          {doubleLogos.map((logo, idx) => (
            <div key={idx} className="marquee-logo-card">
              <span className="marquee-logo-icon">▲</span>
              <span className="marquee-logo-text">{logo.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
