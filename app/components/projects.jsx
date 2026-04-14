"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

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

export default function PortfolioProjects({ data }) {
  const items = data?.projects;
  if (!items || !Array.isArray(items) || items.length === 0) return null;

  const [hovered, setHovered] = useState(null);

  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
  const card    = { hidden: { opacity: 0, y: 36 }, visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } } };

  return (
    <section id="projects" style={{ background: DARK, backgroundImage: GEOM_BG, padding: "8rem 2rem", position: "relative", overflow: "hidden" }}>
      <style>{`@media(max-width:768px){#projects{padding:4rem 1.25rem!important;} .dn-proj-grid{grid-template-columns:1fr!important;}}`}</style>
      {/* Ghost number */}
      <div style={{ position: "absolute", left: "2%", top: "50%", transform: "translateY(-50%)", fontFamily: DISPLAY, fontSize: "22vw", fontWeight: 300, color: "rgba(200,160,92,0.03)", lineHeight: 1, pointerEvents: "none", userSelect: "none", fontStyle: "italic" }}>04</div>

      {/* Warm glow */}
      <div style={{ position: "absolute", right: "20%", top: "30%", width: "40vw", height: "40vh", background: "radial-gradient(ellipse, rgba(200,160,92,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: "4rem" }}>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: "1px", background: `linear-gradient(90deg, ${SAND}, transparent)`, marginBottom: "1.5rem", transformOrigin: "left", maxWidth: "120px" }} />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
            <span style={{ fontFamily: HEADING, fontSize: "10px", fontWeight: 500, color: `${SAND}80`, letterSpacing: "0.35em", textTransform: "uppercase" }}>04</span>
            <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 400, color: CREAM, margin: 0, letterSpacing: "0.04em", fontStyle: "italic" }}>Projects</h2>
          </motion.div>
        </div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
          className="dn-proj-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
          {items.map((project, i) => {
            const title  = project.title || project.name;
            const desc   = project.description;
            const tags   = Array.isArray(project.stack) ? project.stack : Array.isArray(project.tech) ? project.tech : Array.isArray(project.technologies) ? project.technologies : Array.isArray(project.tags) ? project.tags : [];
            const github = project.github || project.repo || project.repository;
            const live   = project.live || project.url || project.link || project.demo;
            const accent = i % 2 === 0 ? SAND : GOLD;

            return (
              <motion.div key={i} variants={card}>
                <div
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    background: hovered === i ? "rgba(200,160,92,0.05)" : "rgba(244,237,217,0.025)",
                    border: `1px solid ${hovered === i ? `${accent}40` : "rgba(244,237,217,0.06)"}`,
                    borderTop: `2px solid ${hovered === i ? accent : `${accent}60`}`,
                    height: "100%", display: "flex", flexDirection: "column",
                    transition: "all 0.35s ease",
                    position: "relative", overflow: "hidden",
                  }}
                >
                  {/* Project image */}
                  {project.imageBase64 && (
                    <div style={{ width: "100%", paddingTop: "52%", position: "relative", overflow: "hidden", flexShrink: 0 }}>
                      <img
                        src={project.imageBase64}
                        alt={title}
                        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block", filter: "brightness(0.85) saturate(0.8)", transition: "transform 0.5s ease" }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.04)"}
                        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                      />
                    </div>
                  )}

                  <div style={{ padding: "1.75rem", flex: 1, display: "flex", flexDirection: "column" }}>
                    {/* Number badge */}
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                      <span style={{ fontFamily: HEADING, fontSize: "9px", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: `${accent}60` }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {/* Corner diamond */}
                      <div style={{ width: "8px", height: "8px", background: `${accent}40`, transform: "rotate(45deg)", flexShrink: 0 }} />
                    </div>

                    <h3 style={{ fontFamily: DISPLAY, fontSize: "clamp(1rem,2vw,1.3rem)", fontWeight: 500, color: CREAM, margin: "0 0 0.75rem", letterSpacing: "0.03em", fontStyle: "italic", lineHeight: 1.3 }}>
                      {title}
                    </h3>

                    {desc && (
                      <p style={{ fontFamily: BODY, fontSize: "13px", color: "rgba(244,237,217,0.45)", lineHeight: 1.8, margin: "0 0 1.25rem", flex: 1 }}>
                        {desc}
                      </p>
                    )}

                    {tags.length > 0 && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "1.25rem" }}>
                        {tags.map((t, j) => {
                          const label = typeof t === "string" ? t : t?.name || t?.label || String(t);
                          return (
                            <span key={j} style={{ fontFamily: BODY, fontSize: "10px", padding: "3px 10px", border: "1px solid rgba(200,160,92,0.2)", color: `${SAND}80`, letterSpacing: "0.02em" }}>{label}</span>
                          );
                        })}
                      </div>
                    )}

                    {(github || live) && (
                      <div style={{ display: "flex", gap: "14px", marginTop: "auto", paddingTop: "1rem", borderTop: "1px solid rgba(244,237,217,0.06)" }}>
                        {github && (
                          <a href={github} target="_blank" rel="noopener noreferrer"
                            style={{ display: "flex", alignItems: "center", gap: "7px", fontFamily: HEADING, fontSize: "10px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(244,237,217,0.4)", textDecoration: "none", transition: "color 0.2s" }}
                            onMouseEnter={(e) => e.currentTarget.style.color = CREAM}
                            onMouseLeave={(e) => e.currentTarget.style.color = "rgba(244,237,217,0.4)"}
                          >
                            <FaGithub style={{ fontSize: "12px" }} /> Code
                          </a>
                        )}
                        {live && (
                          <a href={live} target="_blank" rel="noopener noreferrer"
                            style={{ display: "flex", alignItems: "center", gap: "7px", fontFamily: HEADING, fontSize: "10px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: `${SAND}80`, textDecoration: "none", transition: "color 0.2s" }}
                            onMouseEnter={(e) => e.currentTarget.style.color = SAND}
                            onMouseLeave={(e) => e.currentTarget.style.color = `${SAND}80`}
                          >
                            <FaExternalLinkAlt style={{ fontSize: "10px" }} /> Live
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
