"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaEnvelope, FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";

const DISPLAY = '"Cormorant Garamond", Georgia, serif';
const HEADING = '"Cairo", system-ui, sans-serif';
const BODY    = '"Inter", system-ui, sans-serif';
const SAND    = "#C8A05C";
const GOLD    = "#E4C47A";
const DARK    = "#0E0C08";
const CREAM   = "#F4EDD9";
const BRONZE  = "#8B5A2B";
const LIGHT   = "#FAF5EC";

// Geometric divider ornament SVG (inline)
const Ornament = ({ color = SAND }) => (
  <svg width="120" height="16" viewBox="0 0 120 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="0" y1="8" x2="50" y2="8" stroke={color} strokeWidth="0.75" strokeOpacity="0.5" />
    <rect x="54" y="4" width="8" height="8" fill={color} fillOpacity="0.7" transform="rotate(45 58 8)" />
    <rect x="54" y="4" width="8" height="8" fill="none" stroke={color} strokeWidth="0.75" strokeOpacity="0.4" transform="rotate(45 58 8) scale(1.6) translate(-20 -4.8)" />
    <line x1="70" y1="8" x2="120" y2="8" stroke={color} strokeWidth="0.75" strokeOpacity="0.5" />
  </svg>
);

export default function PortfolioAbout({ data }) {
  if (!data) return null;

  const infoRows = [
    { label: "Location", value: data.location,  icon: <FaMapMarkerAlt />, link: null },
    { label: "Email",    value: data.email,      icon: <FaEnvelope />,    link: `mailto:${data.email}` },
    { label: "GitHub",   value: data.github ? "@" + data.github.split("/").pop() : null, icon: <FaGithub />, link: data.github },
    { label: "LinkedIn", value: data.linkedin ? "LinkedIn" : null, icon: <FaLinkedin />, link: data.linkedin },
    { label: "Website",  value: data.website,   icon: <FaGlobe />,       link: data.website },
  ].filter((r) => r.value);

  return (
    <section id="about" style={{ background: LIGHT, padding: "8rem 2rem", position: "relative", overflow: "hidden" }}>
      {/* Geometric pattern — light on light */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpath d='M40 0 L80 40 L40 80 L0 40 Z' fill='none' stroke='rgba(200%2C160%2C92%2C0.07)' stroke-width='0.5'/%3E%3C/svg%3E")`, pointerEvents: "none" }} />
      {/* Ghost number */}
      <div style={{ position: "absolute", right: "2%", top: "50%", transform: "translateY(-50%)", fontFamily: DISPLAY, fontSize: "22vw", fontWeight: 300, color: "rgba(200,160,92,0.05)", lineHeight: 1, pointerEvents: "none", userSelect: "none", fontStyle: "italic" }}>01</div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Section header */}
        <div style={{ marginBottom: "4rem" }}>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
              <span style={{ fontFamily: HEADING, fontSize: "10px", fontWeight: 500, color: `${SAND}90`, letterSpacing: "0.35em", textTransform: "uppercase" }}>01</span>
              <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, color: "#1A1208", margin: 0, letterSpacing: "0.04em", fontStyle: "italic" }}>About</h2>
            </div>
            <Ornament />
          </motion.div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }} className="dn-two-col">
          <style>{`@media(max-width:767px){.dn-two-col{display:block!important;}.dn-two-col>*:first-child{margin-bottom:3rem;}}`}</style>

          {/* Bio + Skills */}
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <div style={{ borderLeft: `2px solid ${SAND}60`, paddingLeft: "1.75rem", marginBottom: "2.5rem" }}>
              <p style={{ fontFamily: BODY, fontSize: "clamp(0.95rem, 1.6vw, 1.05rem)", fontWeight: 300, color: "#3D2B1F", lineHeight: 1.9, margin: 0 }}>
                {data.bio}
              </p>
            </div>

            {data.skills?.length > 0 && (() => {
              const flatSkills = data.skills.flatMap((s) =>
                typeof s === "object" && s !== null && Array.isArray(s.items) ? s.items
                : typeof s === "object" && s !== null && Array.isArray(s.skills) ? s.skills
                : [s]
              ).filter(Boolean);
              if (!flatSkills.length) return null;
              return (
                <div>
                  <p style={{ fontFamily: HEADING, fontSize: "9px", fontWeight: 600, letterSpacing: "0.35em", textTransform: "uppercase", color: `${BRONZE}80`, marginBottom: "1rem" }}>Skills at a Glance</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {flatSkills.slice(0, 8).map((skill, i) => {
                      const label = typeof skill === "string" ? skill : skill?.name || skill?.label || String(skill);
                      return (
                        <span key={i} style={{
                          padding: "5px 16px", fontFamily: BODY, fontSize: "12px", fontWeight: 400,
                          border: `1px solid ${i % 2 === 0 ? "rgba(200,160,92,0.4)" : "rgba(139,90,43,0.3)"}`,
                          color: i % 2 === 0 ? BRONZE : "#6B4028",
                          background: i % 2 === 0 ? "rgba(200,160,92,0.06)" : "rgba(139,90,43,0.04)",
                          letterSpacing: "0.02em",
                        }}>{label}</span>
                      );
                    })}
                    {flatSkills.length > 8 && (
                      <span style={{ padding: "5px 16px", border: "1px solid rgba(61,43,31,0.15)", color: "rgba(61,43,31,0.35)", fontFamily: BODY, fontSize: "12px" }}>+{flatSkills.length - 8}</span>
                    )}
                  </div>
                </div>
              );
            })()}
          </motion.div>

          {/* Contact info card */}
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ background: "#FFFFFF", border: "1px solid rgba(200,160,92,0.2)", borderTop: `3px solid ${SAND}`, padding: "2.25rem", boxShadow: "0 4px 32px rgba(61,43,31,0.06)" }}>
            <div style={{ fontFamily: HEADING, fontSize: "9px", fontWeight: 600, letterSpacing: "0.35em", textTransform: "uppercase", color: `${SAND}80`, marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "1px solid rgba(200,160,92,0.15)" }}>
              Contact & Links
            </div>
            {infoRows.map((row, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "14px", padding: "11px 0", borderBottom: i < infoRows.length - 1 ? "1px solid rgba(200,160,92,0.1)" : "none" }}>
                <span style={{ color: `${SAND}90`, fontSize: "12px", marginTop: "2px", flexShrink: 0 }}>{row.icon}</span>
                <div>
                  <div style={{ fontFamily: HEADING, fontSize: "8px", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(61,43,31,0.35)", marginBottom: "3px" }}>{row.label}</div>
                  {row.link ? (
                    <a href={row.link} target="_blank" rel="noopener noreferrer"
                      style={{ fontFamily: BODY, fontSize: "13px", color: "#3D2B1F", textDecoration: "none", transition: "color 0.2s" }}
                      onMouseEnter={(e) => e.currentTarget.style.color = BRONZE}
                      onMouseLeave={(e) => e.currentTarget.style.color = "#3D2B1F"}
                    >{row.value}</a>
                  ) : (
                    <span style={{ fontFamily: BODY, fontSize: "13px", color: "#3D2B1F" }}>{row.value}</span>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
