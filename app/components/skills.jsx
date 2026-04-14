"use client";
import React from "react";
import { motion } from "framer-motion";

const DISPLAY = '"Cormorant Garamond", Georgia, serif';
const HEADING = '"Cairo", system-ui, sans-serif';
const BODY    = '"Inter", system-ui, sans-serif';
const SAND    = "#C8A05C";
const GOLD    = "#E4C47A";
const CREAM   = "#F4EDD9";
const BRONZE  = "#8B5A2B";
const LIGHT   = "#FAF5EC";

const PARCHMENT = "#F2E8D0";

export default function PortfolioSkills({ data }) {
  const skills = data?.skills;
  if (!skills || (Array.isArray(skills) && skills.length === 0) || (typeof skills === "object" && !Array.isArray(skills) && Object.keys(skills).length === 0)) return null;

  // Normalize: handle grouped {category, items[]} array OR flat string array
  const groups = (() => {
    if (
      Array.isArray(skills) && skills.length > 0 &&
      typeof skills[0] === "object" && skills[0] !== null &&
      (skills[0].items || skills[0].category || skills[0].skills)
    ) {
      return skills.map((g) => ({
        category: g.category || g.name || "Skills",
        items: Array.isArray(g.items) ? g.items : Array.isArray(g.skills) ? g.skills : [],
      })).filter((g) => g.items.length > 0);
    }
    return null; // flat
  })();
  const isGrouped = !!groups;

  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
  const item    = { hidden: { opacity: 0, scale: 0.88 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } } };

  // Tier colors — warm parchment palette
  const GROUP_ACCENTS = [SAND, BRONZE, "#A07040", "#C4922A", GOLD];

  return (
    <section id="skills" style={{ background: LIGHT, padding: "8rem 2rem", position: "relative", overflow: "hidden" }}>
      <style>{`@media(max-width:768px){#skills{padding:4rem 1.25rem!important;} .dn-skills-grid{grid-template-columns:1fr!important;}}`}</style>
      {/* Geometric bg */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpath d='M40 0 L80 40 L40 80 L0 40 Z' fill='none' stroke='rgba(200%2C160%2C92%2C0.07)' stroke-width='0.5'/%3E%3C/svg%3E")`, pointerEvents: "none" }} />
      {/* Ghost number */}
      <div style={{ position: "absolute", right: "2%", top: "50%", transform: "translateY(-50%)", fontFamily: DISPLAY, fontSize: "22vw", fontWeight: 300, color: "rgba(200,160,92,0.05)", lineHeight: 1, pointerEvents: "none", userSelect: "none", fontStyle: "italic" }}>05</div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: "4rem" }}>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: "1px", background: `linear-gradient(90deg, ${SAND}, transparent)`, marginBottom: "1.5rem", transformOrigin: "left", maxWidth: "120px" }} />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
            <span style={{ fontFamily: HEADING, fontSize: "10px", fontWeight: 500, color: `${SAND}80`, letterSpacing: "0.35em", textTransform: "uppercase" }}>05</span>
            <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 400, color: "#1A1208", margin: 0, letterSpacing: "0.04em", fontStyle: "italic" }}>Skills</h2>
          </motion.div>
        </div>

        {isGrouped ? (
          /* Grouped layout — category cards */
          <div className="dn-skills-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.5rem" }}>
            {groups.map((group, gi) => {
              const groupName  = group.category;
              const groupSkills = group.items;
              const accent = GROUP_ACCENTS[gi % GROUP_ACCENTS.length];
              const list   = Array.isArray(groupSkills) ? groupSkills : [groupSkills];
              return (
                <motion.div key={gi}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: gi * 0.07 }}
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid rgba(200,160,92,0.15)",
                    borderTop: `3px solid ${accent}`,
                    padding: "1.5rem",
                    boxShadow: "0 2px 20px rgba(61,43,31,0.04)",
                    position: "relative",
                  }}
                >
                  {/* Diamond accent */}
                  <div style={{ position: "absolute", top: "-5px", right: "20px", width: "10px", height: "10px", background: accent, transform: "rotate(45deg)" }} />

                  <p style={{ fontFamily: HEADING, fontSize: "9px", fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: `${accent}CC`, marginBottom: "1rem", marginTop: 0 }}>
                    {groupName}
                  </p>
                  <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                    {list.map((skill, si) => {
                      const label = typeof skill === "string" ? skill : skill?.name || skill?.label || String(skill);
                      return (
                        <motion.span key={si} variants={item}
                          style={{
                            fontFamily: BODY, fontSize: "12px", fontWeight: 400,
                            padding: "5px 14px",
                            border: `1px solid ${accent}35`,
                            background: `${accent}08`,
                            color: "#5A3A20",
                            letterSpacing: "0.02em",
                          }}>{label}</motion.span>
                      );
                    })}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* Flat layout — ornamental pill cloud */
          <div>
            {/* Decorative rule */}
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}
              style={{ height: "1px", background: `linear-gradient(90deg, transparent, ${SAND}60, transparent)`, marginBottom: "3rem", transformOrigin: "center" }} />

            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-30px" }}
              style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
              {(Array.isArray(skills) ? skills : []).map((skill, i) => {
                const accent = GROUP_ACCENTS[i % GROUP_ACCENTS.length];
                const label = typeof skill === "string" ? skill : skill?.name || skill?.label || String(skill);
                return (
                  <motion.span key={i} variants={item}
                    style={{
                      fontFamily: BODY, fontSize: "13px", fontWeight: 400,
                      padding: "7px 20px",
                      border: `1px solid ${accent}40`,
                      background: `${accent}08`,
                      color: "#3D2B1F",
                      letterSpacing: "0.03em",
                      transition: "all 0.25s ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = `${accent}18`; e.currentTarget.style.borderColor = `${accent}70`; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = `${accent}08`; e.currentTarget.style.borderColor = `${accent}40`; }}
                  >{label}</motion.span>
                );
              })}
            </motion.div>

            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }}
              style={{ height: "1px", background: `linear-gradient(90deg, transparent, ${SAND}60, transparent)`, marginTop: "3rem", transformOrigin: "center" }} />
          </div>
        )}
      </div>
    </section>
  );
}
