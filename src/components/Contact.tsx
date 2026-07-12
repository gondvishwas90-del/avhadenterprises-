"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, Globe } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    scope: "engineering",
    budget: "50k-100k",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setIsSubmitted(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="contact-section">
      <div className="grid-2">
        
        {/* Left Side: Office Nodes */}
        <div className="contact-info reveal-fade-up">
          <span className="editorial-label">[ 12 — STRATEGIC INITIATION ]</span>
          <h2 className="section-title">Commence the Partnership.</h2>
          <p className="contact-lead">
            Partner with our senior architects to design and engineer your next-generation digital infrastructure.
          </p>

          <div className="info-cards-list">
            <div className="info-item-card premium-card">
              <Globe className="info-icon" size={20} />
              <div>
                <h4>Global Office Hubs</h4>
                <p className="office-node"><span>EMEA Node:</span> London, UK</p>
                <p className="office-node"><span>APAC Node:</span> Singapore</p>
                <p className="office-node"><span>Americas Node:</span> San Francisco, USA</p>
              </div>
            </div>

            <div className="info-item-card premium-card">
              <Mail className="info-icon" size={20} />
              <div>
                <h4>Corporate Communications</h4>
                <p><a href="mailto:strategy@avhadenterprises.com">strategy@avhadenterprises.com</a></p>
                <p><a href="mailto:engineering@avhadenterprises.com">engineering@avhadenterprises.com</a></p>
              </div>
            </div>

            <div className="info-item-card premium-card">
              <Phone className="info-icon" size={20} />
              <div>
                <h4>Direct Advisory Line</h4>
                <p><a href="tel:+18005550199">+1 (800) 555-0199</a></p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="contact-form-wrapper reveal-fade-up">
          {isSubmitted ? (
            <div className="form-success-card premium-card">
              <CheckCircle2 size={48} className="success-icon" />
              <h3>Project Brief Transmitted</h3>
              <p>
                Thank you, {formData.name}. Our strategic advisory team will review your {formData.scope} scope outline and reach out within 12 business hours.
              </p>
              <button 
                className="btn-secondary" 
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: "", email: "", company: "", scope: "engineering", budget: "50k-100k", message: "" });
                }}
              >
                Submit Another Brief
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form premium-card">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name *</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    placeholder="Enter name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Corporate Email *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="company">Company Name</label>
                <input 
                  type="text" 
                  id="company" 
                  name="company" 
                  placeholder="e.g. Acme Corporation"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="scope">Project Scope</label>
                  <select 
                    id="scope" 
                    name="scope" 
                    value={formData.scope}
                    onChange={handleChange}
                  >
                    <option value="engineering">Software Engineering</option>
                    <option value="seo-growth">Programmatic SEO & Growth</option>
                    <option value="automation">Workflow Automation / RPA</option>
                    <option value="ai-solutions">Artificial Intelligence Integration</option>
                    <option value="consulting">Enterprise Architecture Strategy</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="budget">Estimated Budget Tier</label>
                  <select 
                    id="budget" 
                    name="budget" 
                    value={formData.budget}
                    onChange={handleChange}
                  >
                    <option value="under-50k">$25,000 — $50,000</option>
                    <option value="50k-100k">$50,000 — $100,000</option>
                    <option value="100k-250k">$100,000 — $250,000</option>
                    <option value="over-250k">$250,000 +</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Brief Project Description</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={4}
                  placeholder="Tell us about the operational challenges or systems you wish to scale..."
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button type="submit" className="btn-primary form-submit-btn">
                Transmit Strategy Brief <Send size={16} />
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
