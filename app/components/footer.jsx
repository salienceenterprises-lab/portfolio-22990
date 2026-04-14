"use client";
import React from "react";

const DISPLAY = '"Cormorant Garamond", Georgia, serif';
const HEADING = '"Cairo", system-ui, sans-serif';
const BODY    = '"Inter", system-ui, sans-serif';
const SAND    = "#C8A05C";
const CREAM   = "#F4EDD9";
const DARK    = "#0E0C08";

export default function PortfolioFooter({ data }) {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: DARK, borderTop: "1px solid rgba(200,160,92,0.1)", padding: "2.5rem 2rem" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>

        {/* Brand mark */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "8px", height: "8px", background: SAND, transform: "rotate(45deg)", flexShrink: 0 }} />
          <span style={{ fontFamily: DISPLAY, fontSize: "18px", fontWeight: 500, color: `${CREAM}70`, letterSpacing: "0.06em", fontStyle: "italic" }}>
            {data?.name?.split(" ")[0] || "Portfolio"}
          </span>
          {/* Dunes badge */}
          <span style={{ fontFamily: HEADING, fontSize: "8px", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: `${SAND}60`, border: `1px solid rgba(200,160,92,0.2)`, padding: "2px 8px" }}>Dunes</span>
        </div>

        {/* Center ornament */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "24px", height: "1px", background: `rgba(200,160,92,0.25)` }} />
          <div style={{ width: "5px", height: "5px", background: `rgba(200,160,92,0.35)`, transform: "rotate(45deg)" }} />
          <div style={{ width: "24px", height: "1px", background: `rgba(200,160,92,0.25)` }} />
        </div>

        {/* Copyright + Salience */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px" }}>
          <p style={{ fontFamily: BODY, fontSize: "11px", color: "rgba(244,237,217,0.2)", margin: 0, letterSpacing: "0.04em" }}>
            &copy; {year} {data?.name || "Portfolio"}
          </p>
          <p style={{ fontFamily: HEADING, fontSize: "9px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(244,237,217,0.12)", margin: 0 }}>
            Built with <span style={{ color: `${SAND}50` }}>Salience</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
