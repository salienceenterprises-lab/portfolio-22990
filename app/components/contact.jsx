"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaGithub, FaLinkedin, FaGlobe, FaMapMarkerAlt, FaDownload, FaPaperPlane } from "react-icons/fa";

const DISPLAY = '"Cormorant Garamond", Georgia, serif';
const HEADING = '"Cairo", system-ui, sans-serif';
const BODY    = '"Inter", system-ui, sans-serif';
const SAND    = "#C8A05C";
const GOLD    = "#E4C47A";
const DARK    = "#0E0C08";
const CREAM   = "#F4EDD9";
const BRONZE  = "#8B5A2B";
const WARM    = "#1C1710";

const GEOM_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpath d='M40 0 L80 40 L40 80 L0 40 Z' fill='none' stroke='rgba(200%2C160%2C92%2C0.06)' stroke-width='0.5'/%3E%3Cpath d='M40 20 L60 40 L40 60 L20 40 Z' fill='none' stroke='rgba(200%2C160%2C92%2C0.04)' stroke-width='0.5'/%3E%3C/svg%3E")`;

export default function PortfolioContact({ data }) {
  const [form, setForm]     = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); // "sending" | "sent" | "error"

  const hasContact = !!(data?.email || data?.github || data?.linkedin || data?.twitter || data?.website || data?.web3forms_key);
  if (!hasContact) return null;

  const WEB3FORMS_KEY = data?.web3forms_key || process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";

  const socials = [
    { icon: <FaEnvelope />,    label: "Email",    value: data?.email,    href: `mailto:${data?.email}` },
    { icon: <FaGithub />,      label: "GitHub",   value: data?.github ? "@" + data.github.split("/").pop() : null, href: data?.github },
    { icon: <FaLinkedin />,    label: "LinkedIn", value: data?.linkedin ? "LinkedIn" : null, href: data?.linkedin },
    { icon: <FaGlobe />,       label: "Website",  value: data?.website,  href: data?.website },
    { icon: <FaMapMarkerAlt />,label: "Location", value: data?.location, href: null },
  ].filter((s) => s.value);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!WEB3FORMS_KEY) { setStatus("error"); return; }
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: WEB3FORMS_KEY, ...form }),
      });
      const json = await res.json();
      setStatus(json.success ? "sent" : "error");
      if (json.success) setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = {
    width: "100%", background: "rgba(244,237,217,0.04)", border: "1px solid rgba(200,160,92,0.18)",
    color: CREAM, fontFamily: BODY, fontSize: "13px", padding: "12px 16px",
    outline: "none", boxSizing: "border-box", transition: "border-color 0.2s",
  };

  return (
    <section id="contact" style={{ background: DARK, backgroundImage: GEOM_BG, padding: "8rem 2rem 9rem", position: "relative", overflow: "hidden" }}>
      <style>{`.dunes-root input::placeholder, .dunes-root textarea::placeholder { color: rgba(244,237,217,0.2); font-family: ${BODY}; } @media(max-width:767px){#contact{padding:4rem 1.25rem 9rem!important;}}`}</style>
      {/* Ghost number */}
      <div style={{ position: "absolute", right: "2%", top: "50%", transform: "translateY(-50%)", fontFamily: DISPLAY, fontSize: "22vw", fontWeight: 300, color: "rgba(200,160,92,0.03)", lineHeight: 1, pointerEvents: "none", userSelect: "none", fontStyle: "italic" }}>07</div>

      {/* Warm glow */}
      <div style={{ position: "absolute", left: "20%", top: "30%", width: "40vw", height: "40vh", background: "radial-gradient(ellipse, rgba(200,160,92,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: "4rem" }}>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: "1px", background: `linear-gradient(90deg, ${SAND}, transparent)`, marginBottom: "1.5rem", transformOrigin: "left", maxWidth: "120px" }} />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
            <span style={{ fontFamily: HEADING, fontSize: "10px", fontWeight: 500, color: `${SAND}80`, letterSpacing: "0.35em", textTransform: "uppercase" }}>07</span>
            <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 400, color: CREAM, margin: 0, letterSpacing: "0.04em", fontStyle: "italic" }}>Get In Touch</h2>
          </motion.div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "5rem", alignItems: "start" }} className="dn-contact-grid">
          <style>{`@media(max-width:767px){.dn-contact-grid{display:block!important;}.dn-contact-grid>*:first-child{margin-bottom:3rem;}}`}</style>

          {/* Left — info */}
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <p style={{ fontFamily: BODY, fontSize: "14px", color: "rgba(244,237,217,0.45)", lineHeight: 1.9, marginBottom: "2.5rem" }}>
              {data?.contactMessage || "Open to new opportunities, collaborations, and conversations. Send a message and I'll get back to you."}
            </p>

            {/* Social links */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {socials.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "13px 0", borderBottom: "1px solid rgba(200,160,92,0.08)" }}>
                  <span style={{ color: `${SAND}80`, fontSize: "13px", flexShrink: 0 }}>{s.icon}</span>
                  <div>
                    <div style={{ fontFamily: HEADING, fontSize: "8px", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(244,237,217,0.25)", marginBottom: "3px" }}>{s.label}</div>
                    {s.href ? (
                      <a href={s.href} target="_blank" rel="noopener noreferrer"
                        style={{ fontFamily: BODY, fontSize: "13px", color: "rgba(244,237,217,0.55)", textDecoration: "none", transition: "color 0.2s" }}
                        onMouseEnter={(e) => e.currentTarget.style.color = SAND}
                        onMouseLeave={(e) => e.currentTarget.style.color = "rgba(244,237,217,0.55)"}
                      >{s.value}</a>
                    ) : (
                      <span style={{ fontFamily: BODY, fontSize: "13px", color: "rgba(244,237,217,0.55)" }}>{s.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Resume download */}
            {(data?.resumeBase64 || data?.resume || data?.resumeUrl) && (
              <a
                href={data.resumeBase64 ? `data:application/pdf;base64,${data.resumeBase64}` : (data.resume || data.resumeUrl)}
                download="Resume.pdf"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "10px", marginTop: "2rem",
                  fontFamily: HEADING, fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase",
                  color: SAND, textDecoration: "none",
                  border: `1px solid rgba(200,160,92,0.3)`, padding: "10px 24px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(200,160,92,0.1)"; e.currentTarget.style.borderColor = SAND; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(200,160,92,0.3)"; }}
              >
                <FaDownload style={{ fontSize: "10px" }} /> Download Résumé
              </a>
            )}
          </motion.div>

          {/* Right — form */}
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
            <div style={{ background: "rgba(244,237,217,0.025)", border: "1px solid rgba(200,160,92,0.12)", borderTop: `2px solid ${SAND}`, padding: "2.25rem" }}>
              <div style={{ fontFamily: HEADING, fontSize: "9px", fontWeight: 600, letterSpacing: "0.35em", textTransform: "uppercase", color: `${SAND}70`, marginBottom: "1.75rem", paddingBottom: "1rem", borderBottom: "1px solid rgba(200,160,92,0.1)" }}>
                Send a Message
              </div>

              {status === "sent" ? (
                <div style={{ textAlign: "center", padding: "3rem 0" }}>
                  <div style={{ width: "12px", height: "12px", background: SAND, transform: "rotate(45deg)", margin: "0 auto 1.5rem" }} />
                  <p style={{ fontFamily: DISPLAY, fontSize: "22px", fontStyle: "italic", color: CREAM, marginBottom: "0.5rem" }}>Message Sent</p>
                  <p style={{ fontFamily: BODY, fontSize: "13px", color: "rgba(244,237,217,0.4)" }}>I'll be in touch soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: "1rem" }}>
                    <label style={{ display: "block", fontFamily: HEADING, fontSize: "8px", fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(244,237,217,0.3)", marginBottom: "6px" }}>Name</label>
                    <input
                      name="name" value={form.name} onChange={handleChange} required
                      placeholder="Your name"
                      style={{ ...inputStyle }}
                      onFocus={(e) => e.currentTarget.style.borderColor = `${SAND}60`}
                      onBlur={(e) => e.currentTarget.style.borderColor = "rgba(200,160,92,0.18)"}
                    />
                  </div>
                  <div style={{ marginBottom: "1rem" }}>
                    <label style={{ display: "block", fontFamily: HEADING, fontSize: "8px", fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(244,237,217,0.3)", marginBottom: "6px" }}>Email</label>
                    <input
                      name="email" type="email" value={form.email} onChange={handleChange} required
                      placeholder="your@email.com"
                      style={{ ...inputStyle }}
                      onFocus={(e) => e.currentTarget.style.borderColor = `${SAND}60`}
                      onBlur={(e) => e.currentTarget.style.borderColor = "rgba(200,160,92,0.18)"}
                    />
                  </div>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <label style={{ display: "block", fontFamily: HEADING, fontSize: "8px", fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(244,237,217,0.3)", marginBottom: "6px" }}>Message</label>
                    <textarea
                      name="message" value={form.message} onChange={handleChange} required rows={5}
                      placeholder="Your message..."
                      style={{ ...inputStyle, resize: "vertical", minHeight: "120px" }}
                      onFocus={(e) => e.currentTarget.style.borderColor = `${SAND}60`}
                      onBlur={(e) => e.currentTarget.style.borderColor = "rgba(200,160,92,0.18)"}
                    />
                  </div>

                  {status === "error" && (
                    <p style={{ fontFamily: BODY, fontSize: "12px", color: "#C06060", marginBottom: "1rem" }}>Something went wrong. Please try again.</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    style={{
                      display: "flex", alignItems: "center", gap: "10px", cursor: status === "sending" ? "not-allowed" : "pointer",
                      padding: "13px 36px", background: SAND, border: `1px solid ${SAND}`,
                      color: DARK, fontFamily: HEADING, fontSize: "11px", fontWeight: 700,
                      letterSpacing: "0.22em", textTransform: "uppercase", transition: "all 0.3s ease",
                      opacity: status === "sending" ? 0.7 : 1,
                    }}
                    onMouseEnter={(e) => { if (status !== "sending") { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = SAND; }}}
                    onMouseLeave={(e) => { e.currentTarget.style.background = SAND; e.currentTarget.style.color = DARK; }}
                  >
                    <FaPaperPlane style={{ fontSize: "10px" }} />
                    {status === "sending" ? "Sending…" : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
