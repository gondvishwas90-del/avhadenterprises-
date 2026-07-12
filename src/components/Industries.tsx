"use client";

import { 
  Activity, Landmark, GraduationCap, Factory, 
  ShoppingCart, Building2, Truck, GlassWater 
} from "lucide-react";

export default function Industries() {
  const sectors = [
    {
      num: "01",
      icon: <Activity size={24} />,
      name: "Healthcare",
      desc: "HIPAA-compliant platforms, patient portals, and automated diagnostic report routers."
    },
    {
      num: "02",
      icon: <Landmark size={24} />,
      name: "Finance & Fintech",
      desc: "Secure transaction pipelines, banking APIs, and high-frequency analytical dashboards."
    },
    {
      num: "03",
      icon: <GraduationCap size={24} />,
      name: "Education",
      desc: "LMS environments, virtual classrooms, and automated certification workflows."
    },
    {
      num: "04",
      icon: <Factory size={24} />,
      name: "Manufacturing",
      desc: "IoT device telemetry tracking, supply chain automation, and warehouse coordination."
    },
    {
      num: "05",
      icon: <ShoppingCart size={24} />,
      name: "Retail & E-commerce",
      desc: "Headless storefronts, custom ERP synchronization, and personalized conversion tunnels."
    },
    {
      num: "06",
      icon: <Building2 size={24} />,
      name: "Real Estate",
      desc: "Interactive property matrices, tenant hubs, and automated lease signing gateways."
    },
    {
      num: "07",
      icon: <Truck size={24} />,
      name: "Logistics",
      desc: "Automated route planning systems, custom fleet telemetry, and real-time package tracing."
    },
    {
      num: "08",
      icon: <GlassWater size={24} />,
      name: "Hospitality",
      desc: "Bespoke hotel reservation channels, staff schedules, and guest experience portals."
    }
  ];

  return (
    <section id="industries" className="industries-section">
      <div className="section-header reveal-fade-up">
        <span className="editorial-label">[ 09 — VERTICAL COVERAGE ]</span>
        <h2 className="section-title">Industries We Accelerate.</h2>
        <p className="section-subtitle">
          We construct strategy and custom software engines tailored to the compliance and operational guidelines of leading markets.
        </p>
      </div>

      <div className="industries-grid reveal-fade-up">
        {sectors.map((sector, idx) => (
          <div key={idx} className="industry-card premium-card">
            <div className="industry-card-header">
              <span className="ind-num">{sector.num}</span>
              <div className="ind-icon-box">{sector.icon}</div>
            </div>
            <h3 className="industry-name">{sector.name}</h3>
            <p className="industry-desc">{sector.desc}</p>
            <div className="industry-hover-line"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
