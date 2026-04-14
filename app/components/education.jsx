"use client";
import React from "react";
import { motion } from "framer-motion";

const DISPLAY = '"Cormorant Garamond", Georgia, serif';
const HEADING = '"Cairo", system-ui, sans-serif';
const BODY    = '"Inter", system-ui, sans-serif';
const SAND    = "#C8A05C";
const GOLD    = "#E4C47A";
const DARK    = "#0E0C08";
const CREAM   = "#F4EDD9";
const BRONZE  = "#8B5A2B";

// Cycling accent colors for cards
const ACCENTS = [SAND, BRONZE, "#A07040", SAND, "#C4922A"];

export default function PortfolioEducation({ data }) {
  const items = data?.education;
  if (!items || !Array.isArray(items) || items.length === 0) return null;

  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
  const card    = { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };

  return (
    <section id="education" style={{ background: "#F7F0E4", padding: "8rem 2rem", position: "relative", overflow: "hidden" }}>
      {/* Geometric bg */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpath d='M40 0 L80 40 L40 80 L0 40 Z' fill='none' stroke='rgba(200%2C160%2C92%2C0.07)' stroke-width='0.5'/%3E%3C/svg%3E")`, pointerEvents: "none" }} />
      {/* Ghost number */}
      <div style={{ position: "absolute", left: "2%", top: "50%", transform: "translateY(-50%)", fontFamily: DISPLAY, fontSize: "22vw", fontWeight: 300, color: "rgba(200,160,92,0.05)", lineHeight: 1, pointerEvents: "none", userSelect: "none", fontStyle: "italic" }}>02</div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: "4rem" }}>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: "1px", background: `linear-gradient(90deg, ${SAND}, transparent)`, marginBottom: "1.5rem", transformOrigin: "left", maxWidth: "120px" }} />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
            <span style={{ fontFamily: HEADING, fontSize: "10px", fontWeight: 500, color: `${SAND}80`, letterSpacing: "0.35em", textTransform: "uppercase" }}>02</span>
            <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 400, color: "#1A1208", margin: 0, letterSpacing: "0.04em", fontStyle: "italic" }}>Education</h2>
          </motion.div>
        </div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1.5rem" }}>
          {items.map((edu, i) => {
            const accent = ACCENTS[i % ACCENTS.length];
            return (
              <motion.div key={i} variants={card}>
                <div style={{
                  background: "#FFFFFF",
                  borderTop: `3px solid ${accent}`,
                  border: "1px solid rgba(200,160,92,0.15)",
                  borderTopColor: accent,
                  borderTopWidth: "3px",
                  padding: "1.75rem", height: "100%",
                  boxShadow: "0 2px 20px rgba(61,43,31,0.04)",
                  transition: "all 0.3s ease",
                  position: "relative",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 40px rgba(61,43,31,0.1)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 2px 20px rgba(61,43,31,0.04)"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  {/* Diamond corner */}
                  <div style={{ position: "absolute", top: "-5px", right: "20px", width: "10px", height: "10px", background: accent, transform: "rotate(45deg)" }} />

                  <span style={{ display: "inline-block", marginBottom: "1rem", fontFamily: HEADING, fontSize: "9px", fontWeight: 600, letterSpacing: "0.2em", padding: "3px 12px", border: `1px solid ${accent}50`, color: accent, textTransform: "uppercase" }}>
                    {edu.period || edu.year || edu.graduationYear || "—"}
                  </span>
                  <h3 style={{ fontFamily: DISPLAY, fontSize: "19px", fontWeight: 500, color: "#1A1208", margin: "0 0 6px", letterSpacing: "0.03em", lineHeight: 1.3, fontStyle: "italic" }}>
                    {edu.degree || edu.field || edu.program}
                  </h3>
                  <p style={{ fontFamily: HEADING, fontSize: "12px", fontWeight: 500, color: `${accent}CC`, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    {edu.institution || edu.school}
                  </p>
                  {edu.location && <p style={{ fontFamily: BODY, fontSize: "11px", color: `${BRONZE}80`, margin: "0 0 10px" }}>{edu.location}</p>}
                  {edu.description && <p style={{ fontFamily: BODY, fontSize: "13px", color: "#5A4030", lineHeight: 1.75, margin: "0 0 0.5rem" }}>{edu.description}</p>}
                  {(edu.achievements || edu.highlights)?.length > 0 && (
                    <ul style={{ listStyle: "none", padding: 0, margin: "0.5rem 0 0", display: "flex", flexDirection: "column", gap: "5px" }}>
                      {(edu.achievements || edu.highlights).map((a, j) => (
                        <li key={j} style={{ display: "flex", gap: "10px", fontFamily: BODY, fontSize: "12px", color: "#5A4030", lineHeight: 1.7 }}>
                          <span style={{ color: accent, flexShrink: 0, marginTop: "5px", fontSize: "6px" }}>✦</span>{a}
                        </li>
                      ))}
                    </ul>
                  )}
                  {edu.gpa && <p style={{ fontFamily: BODY, fontSize: "11px", color: `${BRONZE}80`, marginTop: "10px" }}>GPA: {edu.gpa}</p>}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
