"use client";
import React from "react";
import portfolioData from "../profile.json";
import PortfolioNav from "./components/nav";
import PortfolioHero from "./components/hero";
import PortfolioAbout from "./components/about";
import PortfolioEducation from "./components/education";
import PortfolioExperience from "./components/experience";
import PortfolioProjects from "./components/projects";
import PortfolioSkills from "./components/skills";
import PortfolioCommunity from "./components/community";
import PortfolioContact from "./components/contact";
import PortfolioFooter from "./components/footer";

export default function DeployedPortfolio() {
  const data = portfolioData;
  if (!data) return <div style={{ color: "#F4EDD9", padding: "40px", background: "#0E0C08" }}>Loading…</div>;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Cairo:wght@300;400;500;600;700&family=Inter:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; scroll-padding-top: 72px; }
        @keyframes dn-shimmer { 0%{background-position:200% center;} 100%{background-position:-200% center;} }
        @keyframes dn-fade-up { from{opacity:0;transform:translateY(24px);} to{opacity:1;transform:translateY(0);} }
        @keyframes dn-line-grow { from{transform:scaleX(0);transform-origin:left;} to{transform:scaleX(1);transform-origin:left;} }
        @keyframes dn-float { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-8px);} }
        @keyframes dn-spin-slow { from{transform:rotate(0deg);} to{transform:rotate(360deg);} }
        /* Responsive nav */
        .dn-desktop-links { display: flex; align-items: center; gap: 2rem; }
        .dn-hamburger { display: none; }
        @media (max-width: 767px) {
          .dn-desktop-links { display: none !important; }
          .dn-hamburger { display: flex !important; }
          .dn-nav-inner { padding: 0 1.25rem !important; }
          .dn-hero-photo { display: none !important; }
          .dn-two-col, .dn-contact-grid { display: block !important; }
          .dn-two-col > *, .dn-contact-grid > * { margin-bottom: 2.5rem; }
        }
      `}</style>
      <div style={{ minHeight: "100vh", background: "#0E0C08", color: "#F4EDD9" }}>
        <PortfolioNav data={data} />
        <PortfolioHero data={data} />
        <PortfolioAbout data={data} />
        <PortfolioEducation data={data} />
        <PortfolioExperience data={data} />
        <PortfolioProjects data={data} />
        <PortfolioSkills data={data} />
        <PortfolioCommunity data={data} />
        <PortfolioContact data={data} />
        <PortfolioFooter data={data} />
      </div>
    </>
  );
}
