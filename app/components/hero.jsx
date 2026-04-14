"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaEnvelope, FaDownload, FaArrowDown } from "react-icons/fa";

const DISPLAY = '"Cormorant Garamond", Georgia, serif';
const HEADING = '"Cairo", system-ui, sans-serif';
const BODY    = '"Inter", system-ui, sans-serif';
const SAND    = "#C8A05C";
const GOLD    = "#E4C47A";
const DARK    = "#0E0C08";
const CREAM   = "#F4EDD9";

// Islamic geometric diamond lattice SVG tile
const GEOM_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpath d='M40 0 L80 40 L40 80 L0 40 Z' fill='none' stroke='rgba(200%2C160%2C92%2C0.08)' stroke-width='0.75'/%3E%3Cpath d='M40 20 L60 40 L40 60 L20 40 Z' fill='none' stroke='rgba(200%2C160%2C92%2C0.05)' stroke-width='0.5'/%3E%3Ccircle cx='40' cy='40' r='1.5' fill='rgba(200%2C160%2C92%2C0.1)'/%3E%3Ccircle cx='0' cy='0' r='1.5' fill='rgba(200%2C160%2C92%2C0.06)'/%3E%3Ccircle cx='80' cy='0' r='1.5' fill='rgba(200%2C160%2C92%2C0.06)'/%3E%3Ccircle cx='0' cy='80' r='1.5' fill='rgba(200%2C160%2C92%2C0.06)'/%3E%3Ccircle cx='80' cy='80' r='1.5' fill='rgba(200%2C160%2C92%2C0.06)'/%3E%3C/svg%3E")`;

const wordVariants = {
  hidden: { clipPath: "inset(0 0 100% 0)", y: 20 },
  visible: (i) => ({
    clipPath: "inset(0 0 0% 0)", y: 0,
    transition: { duration: 0.75, delay: 0.5 + i * 0.16, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function PortfolioHero({ data }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const fadeOut   = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const hasPhoto = !!(data?.heroImageBase64 || data?.profile_photo);
  const nameParts = (data?.name || "Portfolio").split(" ");

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: "smooth" });
  };

  return (
    <section ref={ref} id="hero" style={{
      minHeight: "100vh", background: DARK,
      backgroundImage: GEOM_BG,
      display: "flex", alignItems: "center",
      position: "relative", overflow: "hidden",
      paddingTop: "72px",
    }}>
      <style>{`
        .dn-cta-primary {
          display:inline-flex; align-items:center; gap:10px; cursor:pointer;
          padding:13px 38px; background:${SAND}; border:1px solid ${SAND};
          color:${DARK}; font-family:${HEADING}; font-size:11px; font-weight:700;
          letter-spacing:0.22em; text-transform:uppercase; text-decoration:none;
          transition:all 0.3s ease;
        }
        .dn-cta-primary:hover { background:transparent; color:${SAND}; }
        .dn-cta-secondary {
          display:inline-flex; align-items:center; gap:10px; cursor:pointer;
          padding:12px 32px; background:transparent; border:1px solid rgba(244,237,217,0.2);
          color:rgba(244,237,217,0.55); font-family:${HEADING}; font-size:11px; font-weight:500;
          letter-spacing:0.2em; text-transform:uppercase; text-decoration:none;
          transition:all 0.3s ease;
        }
        .dn-cta-secondary:hover { border-color:${CREAM}; color:${CREAM}; }
        .dn-scroll-btn { background:none; border:none; cursor:pointer; display:flex; flex-direction:column; align-items:center; gap:8px; }
        @media (max-width: 768px) {
          .dn-hero-grid { grid-template-columns: 1fr !important; gap: 2rem !important; padding: 3rem 1.25rem 4rem !important; }
          .dn-cta-primary, .dn-cta-secondary { width: 100%; justify-content: center; }
          #hero { padding-bottom: 7rem !important; }
        }
      `}</style>

      {/* Radial warm glow */}
      <div style={{ position: "absolute", bottom: "20%", left: "50%", transform: "translateX(-50%)", width: "60vw", height: "40vh", background: "radial-gradient(ellipse, rgba(200,160,92,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Dune wave bottom */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, pointerEvents: "none" }}>
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "90px" }}>
          <path d="M0,45 C200,80 400,15 600,50 C800,80 1000,15 1200,45 C1320,65 1400,35 1440,45 L1440 90 L0 90 Z"
            fill="rgba(200,160,92,0.04)" />
          <path d="M0,60 C240,35 480,80 720,55 C960,30 1200,75 1440,55 L1440 90 L0 90 Z"
            fill="rgba(200,160,92,0.03)" />
        </svg>
      </div>

      {/* Ghost watermark */}
      <div style={{
        position: "absolute", right: hasPhoto ? "44%" : "2%", bottom: "8%",
        fontFamily: DISPLAY, fontSize: "clamp(12rem, 26vw, 20rem)", fontWeight: 300,
        color: "rgba(200,160,92,0.03)", lineHeight: 1, fontStyle: "italic",
        pointerEvents: "none", userSelect: "none", letterSpacing: "-0.04em",
      }}>
        {data?.name?.split(" ")[0]?.slice(0, 3).toUpperCase() || "DUN"}
      </div>

      {/* Content */}
      <motion.div style={{ y: parallaxY, opacity: fadeOut, width: "100%", position: "relative", zIndex: 2 }}>
        <div className="dn-hero-grid" style={{
          maxWidth: "1280px", margin: "0 auto", padding: "5rem 2rem 6rem",
          display: "grid",
          gridTemplateColumns: hasPhoto ? "1fr 400px" : "1fr",
          gap: "5rem", alignItems: "center",
        }}>

          {/* Left — text */}
          <div>
            {/* Decorative ornament line */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "2rem", transformOrigin: "left" }}>
              <div style={{ width: "8px", height: "8px", background: SAND, transform: "rotate(45deg)", flexShrink: 0 }} />
              <div style={{ flex: 1, maxWidth: "60px", height: "1px", background: `linear-gradient(90deg, ${SAND}, ${SAND}40)` }} />
              <span style={{ fontFamily: HEADING, fontSize: "10px", fontWeight: 500, letterSpacing: "0.4em", textTransform: "uppercase", color: `${SAND}CC` }}>
                {data?.title || "Portfolio"}
              </span>
              <div style={{ flex: 1, maxWidth: "60px", height: "1px", background: `linear-gradient(270deg, ${SAND}, ${SAND}40)` }} />
              <div style={{ width: "8px", height: "8px", background: SAND, transform: "rotate(45deg)", flexShrink: 0 }} />
            </motion.div>

            {/* Name — billboard reveal */}
            <div style={{ marginBottom: "2rem" }}>
              {nameParts.map((word, i) => (
                <div key={i} style={{ overflow: "hidden", lineHeight: 0.9 }}>
                  <motion.div
                    custom={i}
                    variants={wordVariants}
                    initial="hidden"
                    animate="visible"
                    style={{
                      fontFamily: DISPLAY,
                      fontSize: "clamp(3.5rem, 10vw, 8rem)",
                      fontWeight: 300,
                      letterSpacing: "0.03em",
                      color: CREAM,
                      display: "block",
                      lineHeight: 0.9,
                      fontStyle: "italic",
                    }}
                  >
                    {word}
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Gold shimmer accent line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.6 + nameParts.length * 0.16 + 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{
                height: "1px",
                background: `linear-gradient(90deg, ${GOLD}, ${SAND}80, transparent)`,
                marginBottom: "2rem", maxWidth: "300px", transformOrigin: "left",
              }}
            />

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.3 }}
              style={{ fontFamily: BODY, fontSize: "clamp(0.9rem, 1.6vw, 1rem)", fontWeight: 300, color: "rgba(244,237,217,0.5)", lineHeight: 1.85, maxWidth: "480px", marginBottom: "3rem" }}
            >
              {data?.sloganHeroSection || (data?.bio ? data.bio.slice(0, 130) + "…" : "")}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.5 }}
              style={{ display: "flex", flexWrap: "wrap", gap: "14px", alignItems: "center" }}
            >
              <button onClick={() => scrollTo("contact")} className="dn-cta-primary">
                <FaEnvelope style={{ fontSize: "10px" }} /> Get In Touch
              </button>
              <button onClick={() => scrollTo("about")} className="dn-cta-secondary">
                View Profile
              </button>
              {(data?.resumeBase64 || data?.resume || data?.resumeUrl) && (
                <a href={data.resumeBase64 ? `data:application/pdf;base64,${data.resumeBase64}` : (data.resume || data.resumeUrl)}
                  download="Resume.pdf" className="dn-cta-secondary">
                  <FaDownload style={{ fontSize: "10px" }} /> Résumé
                </a>
              )}
            </motion.div>
          </div>

          {/* Right — photo */}
          {hasPhoto && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: "relative" }}
              className="dn-hero-photo"
            >
              {/* Decorative diamond frame offset */}
              <div style={{ position: "absolute", top: "16px", left: "16px", right: "-16px", bottom: "-16px", border: `1px solid ${SAND}40`, zIndex: 0 }} />
              {/* Inner diamond corner accents */}
              <div style={{ position: "absolute", top: "-6px", left: "-6px", width: "24px", height: "24px", borderTop: `2px solid ${SAND}`, borderLeft: `2px solid ${SAND}`, zIndex: 2 }} />
              <div style={{ position: "absolute", top: "-6px", right: "-6px", width: "24px", height: "24px", borderTop: `2px solid ${SAND}`, borderRight: `2px solid ${SAND}`, zIndex: 2 }} />
              <div style={{ position: "absolute", bottom: "-6px", left: "-6px", width: "24px", height: "24px", borderBottom: `2px solid ${SAND}`, borderLeft: `2px solid ${SAND}`, zIndex: 2 }} />
              <div style={{ position: "absolute", bottom: "-6px", right: "-6px", width: "24px", height: "24px", borderBottom: `2px solid ${SAND}`, borderRight: `2px solid ${SAND}`, zIndex: 2 }} />

              <div style={{ position: "relative", zIndex: 1, overflow: "hidden" }}>
                <img
                  src={data.heroImageBase64 || data.profile_photo} alt={data.name}
                  style={{ width: "100%", display: "block", objectFit: "cover", objectPosition: "center top", aspectRatio: "3/4", filter: "brightness(0.92) saturate(0.85)" }}
                />
                {/* Name plate */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(14,12,8,0.9)", borderTop: `1px solid ${SAND}40`, padding: "16px 20px" }}>
                  <div style={{ fontFamily: DISPLAY, fontSize: "20px", fontWeight: 400, letterSpacing: "0.08em", color: CREAM, fontStyle: "italic" }}>{data.name}</div>
                  {data?.title && <div style={{ fontFamily: HEADING, fontSize: "10px", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: SAND, marginTop: "4px" }}>{data.title}</div>}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
        style={{ position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)", zIndex: 10 }}>
        <button className="dn-scroll-btn" onClick={() => scrollTo("about")}>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}>
            <FaArrowDown style={{ color: `${SAND}60`, fontSize: "13px" }} />
          </motion.div>
        </button>
      </motion.div>
    </section>
  );
}
