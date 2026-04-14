"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";

const DISPLAY = '"Cormorant Garamond", Georgia, serif';
const HEADING = '"Cairo", system-ui, sans-serif';
const BODY    = '"Inter", system-ui, sans-serif';
const SAND    = "#C8A05C";
const GOLD    = "#E4C47A";
const DARK    = "#0E0C08";
const CREAM   = "#F4EDD9";
const BRONZE  = "#8B5A2B";
const WARM    = "#1C1710";

const GEOM_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpath d='M40 0 L80 40 L40 80 L0 40 Z' fill='none' stroke='rgba(200%2C160%2C92%2C0.06)' stroke-width='0.5'/%3E%3C/svg%3E")`;

const ACCENTS = [SAND, BRONZE, "#A07040", GOLD, "#C4922A"];

export default function PortfolioCommunity({ data }) {
  const items = data?.community;
  if (!items || !Array.isArray(items) || items.length === 0) return null;

  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
  const card    = { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };

  return (
    <section id="community" style={{ background: WARM, backgroundImage: GEOM_BG, padding: "8rem 2rem", position: "relative", overflow: "hidden" }}>
      <style>{`@media(max-width:768px){#community{padding:4rem 1.25rem!important;} .dn-comm-grid{grid-template-columns:1fr!important;}}`}</style>
      {/* Ghost number */}
      <div style={{ position: "absolute", left: "2%", top: "50%", transform: "translateY(-50%)", fontFamily: DISPLAY, fontSize: "22vw", fontWeight: 300, color: "rgba(200,160,92,0.04)", lineHeight: 1, pointerEvents: "none", userSelect: "none", fontStyle: "italic" }}>06</div>

      {/* Warm glow */}
      <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: "50vw", height: "50vh", background: "radial-gradient(ellipse, rgba(200,160,92,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: "4rem" }}>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: "1px", background: `linear-gradient(90deg, ${SAND}, transparent)`, marginBottom: "1.5rem", transformOrigin: "left", maxWidth: "120px" }} />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
            <span style={{ fontFamily: HEADING, fontSize: "10px", fontWeight: 500, color: `${SAND}80`, letterSpacing: "0.35em", textTransform: "uppercase" }}>06</span>
            <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 400, color: CREAM, margin: 0, letterSpacing: "0.04em", fontStyle: "italic" }}>Community</h2>
          </motion.div>
        </div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
          className="dn-comm-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {items.map((comm, i) => {
            const accent = ACCENTS[i % ACCENTS.length];
            const title  = comm.role || comm.title || comm.name || comm.organization;
            const org    = comm.organization || comm.club || comm.group || comm.company;
            const period = comm.period || comm.duration || comm.year || comm.date;
            const desc   = comm.description;
            const link   = comm.link || comm.url || comm.website;

            return (
              <motion.div key={i} variants={card}>
                <div style={{
                  background: "rgba(244,237,217,0.025)",
                  border: `1px solid rgba(200,160,92,0.1)`,
                  borderLeft: `3px solid ${accent}80`,
                  padding: "1.75rem",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  transition: "all 0.3s ease",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(200,160,92,0.04)"; e.currentTarget.style.borderLeftColor = accent; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(244,237,217,0.025)"; e.currentTarget.style.borderLeftColor = `${accent}80`; }}
                >
                  {/* Diamond corner mark */}
                  <div style={{ position: "absolute", top: "16px", right: "16px", width: "8px", height: "8px", background: `${accent}50`, transform: "rotate(45deg)" }} />

                  {period && (
                    <span style={{ display: "inline-block", marginBottom: "0.75rem", fontFamily: HEADING, fontSize: "9px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: `${accent}90` }}>
                      {period}
                    </span>
                  )}

                  <h3 style={{ fontFamily: DISPLAY, fontSize: "clamp(1rem,1.8vw,1.25rem)", fontWeight: 500, color: CREAM, margin: "0 0 4px", letterSpacing: "0.03em", fontStyle: "italic", lineHeight: 1.3 }}>
                    {title}
                  </h3>

                  {org && title !== org && (
                    <p style={{ fontFamily: HEADING, fontSize: "11px", fontWeight: 500, color: `${accent}CC`, margin: "0 0 1rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                      {org}
                    </p>
                  )}

                  {desc && (
                    <p style={{ fontFamily: BODY, fontSize: "13px", color: "rgba(244,237,217,0.45)", lineHeight: 1.8, margin: "0 0 1.25rem", flex: 1 }}>
                      {desc}
                    </p>
                  )}

                  {link && (
                    <a href={link} target="_blank" rel="noopener noreferrer"
                      style={{ display: "inline-flex", alignItems: "center", gap: "7px", fontFamily: HEADING, fontSize: "10px", fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: `${accent}90`, textDecoration: "none", marginTop: "auto", transition: "color 0.2s" }}
                      onMouseEnter={(e) => e.currentTarget.style.color = accent}
                      onMouseLeave={(e) => e.currentTarget.style.color = `${accent}90`}
                    >
                      <FaExternalLinkAlt style={{ fontSize: "9px" }} /> Visit
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
