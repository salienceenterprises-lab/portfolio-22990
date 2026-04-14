"use client";
import React from "react";
import { motion } from "framer-motion";

const DISPLAY = '"Cormorant Garamond", Georgia, serif';
const HEADING = '"Cairo", system-ui, sans-serif';
const BODY    = '"Inter", system-ui, sans-serif';
const SAND    = "#C8A05C";
const GOLD    = "#E4C47A";
const DARK    = "#0E0C08";
const WARM    = "#1C1710";
const CREAM   = "#F4EDD9";
const BRONZE  = "#8B5A2B";

// Geometric diamond bg
const GEOM_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpath d='M40 0 L80 40 L40 80 L0 40 Z' fill='none' stroke='rgba(200%2C160%2C92%2C0.06)' stroke-width='0.5'/%3E%3Cpath d='M40 20 L60 40 L40 60 L20 40 Z' fill='none' stroke='rgba(200%2C160%2C92%2C0.04)' stroke-width='0.5'/%3E%3C/svg%3E")`;

export default function PortfolioExperience({ data }) {
  const items = data?.experience;
  if (!items || !Array.isArray(items) || items.length === 0) return null;

  return (
    <section id="experience" style={{ background: WARM, backgroundImage: GEOM_BG, padding: "8rem 2rem", position: "relative", overflow: "hidden" }}>
      <style>{`@media(max-width:768px){#experience{padding:4rem 1.25rem!important;} .dn-exp-timeline{padding-left:2rem!important;} .dn-exp-dot{left:-2.35rem!important;}}`}</style>
      {/* Ghost number */}
      <div style={{ position: "absolute", right: "2%", top: "50%", transform: "translateY(-50%)", fontFamily: DISPLAY, fontSize: "22vw", fontWeight: 300, color: "rgba(200,160,92,0.04)", lineHeight: 1, pointerEvents: "none", userSelect: "none", fontStyle: "italic" }}>03</div>

      {/* Warm golden glow */}
      <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: "50vw", height: "50vh", background: "radial-gradient(ellipse, rgba(200,160,92,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: "4rem" }}>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: "1px", background: `linear-gradient(90deg, ${SAND}, transparent)`, marginBottom: "1.5rem", transformOrigin: "left", maxWidth: "120px" }} />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
            <span style={{ fontFamily: HEADING, fontSize: "10px", fontWeight: 500, color: `${SAND}80`, letterSpacing: "0.35em", textTransform: "uppercase" }}>03</span>
            <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 400, color: CREAM, margin: 0, letterSpacing: "0.04em", fontStyle: "italic" }}>Experience</h2>
          </motion.div>
        </div>

        <div style={{ position: "relative" }}>
          {/* Vertical spine */}
          <motion.div initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "1px", background: `linear-gradient(180deg, ${SAND}, ${GOLD}60, transparent)`, transformOrigin: "top" }} />

          <div className="dn-exp-timeline" style={{ paddingLeft: "3rem" }}>
            {items.map((exp, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
                style={{ position: "relative", paddingBottom: i < items.length - 1 ? "4rem" : "0" }}
              >
                {/* Diamond dot on spine */}
                <div className="dn-exp-dot" style={{ position: "absolute", left: "-3.4rem", top: "4px", width: "12px", height: "12px", background: i % 2 === 0 ? SAND : GOLD, transform: "rotate(45deg)" }} />

                <div style={{ fontFamily: HEADING, fontSize: "9px", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: i % 2 === 0 ? `${SAND}CC` : `${GOLD}CC`, marginBottom: "0.5rem" }}>
                  {exp.period || exp.duration || exp.startDate}
                </div>
                <h3 style={{ fontFamily: DISPLAY, fontSize: "clamp(1.1rem,2vw,1.5rem)", fontWeight: 500, color: CREAM, margin: "0 0 4px", letterSpacing: "0.03em", fontStyle: "italic" }}>
                  {exp.role || exp.title || exp.position}
                </h3>
                <p style={{ fontFamily: HEADING, fontSize: "12px", fontWeight: 500, color: `${SAND}CC`, margin: "0 0 1rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  {exp.company || exp.organization}
                </p>
                {exp.description && (
                  <p style={{ fontFamily: BODY, fontSize: "13.5px", color: "rgba(244,237,217,0.5)", lineHeight: 1.85, margin: "0 0 1rem", maxWidth: "640px" }}>{exp.description}</p>
                )}
                {(exp.highlights || exp.responsibilities || exp.bullets)?.length > 0 && (
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1rem", display: "flex", flexDirection: "column", gap: "6px", maxWidth: "640px" }}>
                    {(exp.highlights || exp.responsibilities || exp.bullets).map((r, j) => (
                      <li key={j} style={{ display: "flex", gap: "12px", fontFamily: BODY, fontSize: "13px", color: "rgba(244,237,217,0.45)", lineHeight: 1.7 }}>
                        <span style={{ color: `${SAND}70`, flexShrink: 0, marginTop: "6px", fontSize: "6px" }}>◆</span>{r}
                      </li>
                    ))}
                  </ul>
                )}
                {(Array.isArray(exp.stack) ? exp.stack : Array.isArray(exp.tech) ? exp.tech : Array.isArray(exp.tags) ? exp.tags : []).length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "0.75rem" }}>
                    {(Array.isArray(exp.stack) ? exp.stack : Array.isArray(exp.tech) ? exp.tech : Array.isArray(exp.tags) ? exp.tags : []).map((t, j) => {
                      const label = typeof t === "string" ? t : t?.name || t?.label || String(t);
                      return (
                        <span key={j} style={{ fontFamily: BODY, fontSize: "10px", padding: "3px 12px", border: "1px solid rgba(244,237,217,0.1)", color: "rgba(244,237,217,0.4)", letterSpacing: "0.02em" }}>{label}</span>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
