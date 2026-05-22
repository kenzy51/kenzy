"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import ButtonLink from "@/shared/ui/buttons/buttonLink";
import BulletList from "@/shared/ui/components/BulletList";
import { Card } from "./Card";
import { CardType } from "./constants";

// Skills Icons
import antd from "../../../../public/images/skills/antd.png";
import react from "../../../../public/images/skills/react.png";
import redux from "../../../../public/images/skills/redux-icon.webp";
import nest from "../../../../public/images/skills/nest.png";
import postgres from "../../../../public/images/skills/postgres.png";
import git from "../../../../public/images/skills/git.png";
import next from "../../../../public/images/skills/next.png";
import framer from "../../../../public/images/skills/framer.png";
import jira from "../../../../public/images/skills/jira.png";
import ts from "../../../../public/images/skills/ts.png";
import mui from "../../../../public/images/skills/mui.png";
import mongo from "../../../../public/images/skills/mongodb.svg";

const Portfolio = () => {
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const [activeTab, setActiveTab] = useState<"problem" | "solution" | "outcome">("problem");

  // Handle locking/unlocking background scroll reliably
  useEffect(() => {
    if (selectedCard) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    // Strict cleanup when component changes or unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedCard]);

  const handleCloseModal = () => {
    setSelectedCard(null);
    setActiveTab("problem"); // Reset state instantly on close
  };

  const RenderedContent = () => {
    if (!selectedCard) return null;
    switch (activeTab) {
      case "problem":
        return <div className="text-sm md:text-base text-neutral-300 whitespace-pre-line leading-relaxed">{selectedCard.problem}</div>;
      case "solution":
        return <div className="text-sm md:text-base text-neutral-300 whitespace-pre-line leading-relaxed">{selectedCard.solution}</div>;
      case "outcome":
        return <BulletList text={selectedCard.outcome || ""} />;
    }
  };

  return (
    <div id="portfolio" className="relative py-24 px-4 sm:px-8 md:px-12 lg:px-20 bg-black overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <p className="text-cyan-400 font-mono tracking-widest uppercase text-sm mb-3">Selected Implementations</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            Architecture Showcase
          </h2>
        </div>

        <PortfolioGrid onSelectCard={(card) => {
          setActiveTab("problem"); // Reset to problem tab whenever a card opens
          setSelectedCard(card);
        }} />

        {/* Pure Native React Modal (No Animations to jam up click cycles) */}
        {selectedCard && (
          <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/85 backdrop-blur-md p-0 sm:p-6"
            onClick={(e) => {
              if (e.target === e.currentTarget) handleCloseModal();
            }}
          >
            <div
              className="relative w-full sm:max-w-4xl bg-neutral-950 border-t sm:border border-neutral-800 rounded-t-2xl sm:rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.9)] p-6 md:p-10 text-white max-h-[85vh] sm:max-h-[80vh] flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Section */}
              <div className="flex justify-between items-start mb-4 pr-8">
                <h2 className="text-xl md:text-3xl font-bold tracking-tight text-white">{selectedCard.title}</h2>
                <button
                  type="button"
                  className="absolute top-5 right-5 text-neutral-400 hover:text-white text-2xl p-2 cursor-pointer z-30"
                  onClick={handleCloseModal}
                >
                  ✕
                </button>
              </div>

              {/* Tabs Navigation */}
              <div className="flex border-b border-neutral-800 mb-6 overflow-x-auto gap-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {(["problem", "solution", "outcome"] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setActiveTab(tab);
                    }}
                    className={`px-4 py-3 text-sm md:text-base font-medium whitespace-nowrap transition-colors relative cursor-pointer z-20 ${
                      activeTab === tab 
                        ? "text-cyan-400 font-semibold border-b-2 border-cyan-400" 
                        : "text-neutral-400 hover:text-neutral-200"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Scrollable Content View */}
              <div className="overflow-y-auto flex-1 pr-2 border-b border-neutral-900/60 pb-6 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.1)_transparent]">
                <div className="prose prose-invert max-w-none">
                  <RenderedContent />
                </div>
              </div>

              {/* Sticky Action Footer */}
              <div className="flex flex-row items-center justify-between gap-4 pt-6 bg-neutral-950 mt-auto">
                {selectedCard?.technologies && (
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {selectedCard.technologies.map((tech, index) => (
                      <div key={index} className="w-8 h-8 sm:w-9 sm:h-9 p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0">
                        <Image src={tech} alt="tech icon" className="object-contain w-full h-full" />
                      </div>
                    ))}
                  </div>
                )}

                {selectedCard?.link && (
                  <div className="shrink-0 transition-all duration-200 [&_a]:bg-neutral-900 [&_a]:text-white [&_a:hover]:bg-white! [&_a:hover]:text-black! [&_a:hover]:border-white! [&_a:hover]:opacity-100! [&_a]:opacity-100! [&_a]:border [&_a]:border-neutral-700">
                    <ButtonLink link={selectedCard.link} />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function PortfolioGrid({ onSelectCard }: { onSelectCard: (card: CardType) => void }) {
  const t = useTranslations();
  const descSrm = "A catering SaaS for multi-branch restaurants with tools for managing employees, events, and catering orders at each location.";

  const cards: CardType[] = [
    {
      url: "/images/portfolio/fusionai.png", 
      title: "Fusion AI Agency Platform",
      technologies: [next, nest, postgres, git], 
      description: "Autonomous multi-tenant conversational AI infrastructure driving organic lead triage systems.",
      link: "https://www.fusionaiagency.com/",
      problem: `Traditional medical and enterprise service channels suffer high customer churn and inflated CAC due to delayed front-desk triage, unoptimized lead flows, and zero automated voice/text follow-up frameworks. Fragmented third-party software structures add engineering overhead and leak sensitive client analytical tracking records.`,
      solution: `I engineered a unified web engine utilizing Next.js (App Router) and Tailwind CSS to orchestrate state-of-the-art conversational pipelines. I constructed a secure backend middleware utilizing NestJS, Redis, and WebSockets to host 'Jessica,' an advanced autonomous intake AI agent. Implemented Deepgram Nova-2 streaming speech-to-text configurations alongside Groq-hosted Llama 3.3 models to yield human-parity voice interactions with an ultra-low <800ms Time to First Token (TTFT). Designed clean data schemas that deliver comprehensive dashboard utilities featuring real-time conversational voice playback, synchronized audio element controls, dynamic transcripts parsing raw prompting inputs, and a custom multi-tenant chatbot canvas.`,
      outcome: `• Deployed production platform processing dynamic voice-to-text data feeds under sub-second speeds\n• Empowered seamless system navigation with integrated full text transcripts and synchronized voice playbacks\n• Built multi-tenant, standalone client dashboard systems lowering dependencies on generic third-party CRMs\n• Achieved peak UI performance metrics via React Server Components (RSC) and atomic CSS token optimization`,
      id: 12,
    },
    {
      url: "/images/portfolio/tds4kids.png", 
      title: "Tribeca Dental Studio - Pediatrics Platform",
      technologies: [next, ts, react, git],
      description: "High-performance pediatric dentistry application architected for Next-Gen Local Search and AI discovery patterns.",
      link: "https://pediatrics.tribecadentalstudio.com/",
      problem: `Multi-specialty pediatric medical spaces face highly competitive geographic keyword auctions and shifting regional discovery behaviors. Legacy site structures lack optimized content trees, mobile speed responsiveness, and specific semantic search indexing, causing poor local discovery rankings and high bounce rates on high-intent parent search actions.`,
      solution: `I engineered a hyper-optimized web platform from the ground up utilizing Next.js, TypeScript, and Tailwind CSS, keeping technical SEO performance and modern search engine optimization at the core of the infrastructure. Architected a deep, semantic JSON-LD Schema markup framework to feed rich data structures directly to AI-driven search models (SGE) and local Google discovery vectors. Leveraged strict Edge-Caching, on-demand Server-Side Rendering (SSR), and advanced Next.js Image Component configurations to satisfy all Core Web Vitals parameters, pushing performance scores to a flawless 100/100 on mobile devices.`,
      outcome: `• Successfully launched dedicated mobile-responsive pediatric infrastructure scaling web conversions by 40%\n• Secured top rankings for high-value localized organic phrases like 'Invisalign NYC' and 'Tribeca Pediatric Dentist'\n• Elevated AI-Search (SGE) visibility and rich snippets generation via dynamic schema injection\n• Maintained maximum local authority by restructuring technical site architectures and crawl patterns`,
      id: 13,
    },
    {
      url: "/images/portfolio/kyrgyzproject.png",
      title: "Kyrgyz Diaspora Platform",
      technologies: [next, nest, mongo, react],
      description: "Full-stack platform connecting Kyrgyz diaspora in USA with events, resources, and community support.",
      link: "https://kyrgyz-diaspora.vercel.app",
      problem: "Kyrgyz immigrants in NYC and USA struggled to find community events (Nooruz, cultural gatherings), consular resources, and support. Information was scattered across WhatsApp groups and Facebook — no centralized platform existed.",
      solution: `I built a full-stack community platform from the ground up using Next.js for a fast, SEO-friendly frontend and NestJS with MongoDB on the backend. I implemented secure JWT authentication to protect user accounts, designed an intuitive event creation system where each event is tied to its creator, and added full multilingual support in English, Russian, and Kyrgyz to make it truly accessible to the diaspora. The app includes a resources section for consular and practical help, plus a public support form open to everyone. Everything is fully responsive, so it works beautifully on mobile — ensuring Kyrgyz people in NYC and across the USA can stay connected no matter what device they're using.`,
      outcome: `• Live platform used by real community members\n• Central hub for events and cultural connection\n• Secure, scalable architecture with real-world impact\n• Demonstrates end-to-end full-stack development`,
      id: 11,
    },
    {
      url: "/images/portfolio/saas.png",
      title: "SaaS CRM System",
      technologies: [mui, nest, mongo, redux, react, git],
      description: descSrm,
      problem: "Multi-branch restaurants were struggling to manage operations across different locations. Employee scheduling, catering orders, and event coordination were fragmented, often tracked in spreadsheets or disconnected tools. Managers had no unified dashboard for performance analytics, which caused inefficiencies and delays.",
      solution: `I built a full-stack SaaS platform that centralized restaurant operations into one system. \nThe frontend was developed with React, Redux, and MUI to deliver a responsive, intuitive interface. \nOn the backend, I used NestJS with PostgreSQL and MongoDB to handle relational data and flexible content storage. \nThe system included role-based employee management, event scheduling with resource allocation, customizable catering orders, \nand real-time analytics dashboards, giving managers a single source of truth across all branches.`,
      outcome: ` \nReduced scheduling and order management overhead by ~40%\nImproved operational visibility across 20+ restaurant branches\nEnabled 5,000+ staff and managers to coordinate seamlessly in one platform\nProvided scalable foundation for future modules like inventory and billing\n    `,
      id: 14,
    },
    {
      url: "/images/portfolio/jalgroupNew.png",
      title: "Jal Group Asia",
      technologies: [antd, next, mongo, redux, react, git, jira],
      description: t("jalGroup"),
      problem: " The client’s existing site was static and hard to maintain. They needed a dynamic site to support frequent updates, campaigns, and content changes without developer intervention.",
      solution: `I rebuilt their site using Next.js with CMS integration. Implemented dynamic routing, on-demand content fetching, image optimization, and SEO best practices. Also added admin interfaces so non-technical users could update content.`,
      outcome: ` \nContent updates now take minutes instead of developer cycles\nImproved SEO rankings and page speed\nLower maintenance burden for the client\n    `,
      link: "https://jalgroupasia.kg/",
      id: 1,
    },
    {
      url: "/images/portfolio/barca.png",
      title: "Barca experience KG",
      link: "https://experience.barcelona.kg/",
      description: t("barca"),
      technologies: [antd, nest, postgres, redux, react, jira, git],
      problem: `The Barcelona Academy in Bishkek needed both a public-facing website to showcase programs/events and an internal CRM to manage students, registrations, and communications.\nThe team had mostly junior developers who required technical guidance, and there was no structured system for code quality, reviews, or delivery.`,
      solution: `Acted as senior developer and team lead, mentoring juniors and conducting code reviews to maintain high standards.\n\nDesigned and implemented a CRM system using NestJS + MongoDB to handle student data, registrations, and staff workflows.\n\nBuilt the frontend with React + Ant Design, ensuring a professional and responsive UI.\n\nIntegrated role-based access control for staff/admin, and set up clear Git workflows with CI/CD to improve collaboration.`,
      outcome: `Launched a production-ready academy website and CRM used daily by staff.\n         Juniors gained skills and confidence from mentorship, improving team velocity.\n          Academy staff saved significant time by consolidating student management into one platform.\n\nDelivered a scalable system ready for future modules (payments, attendance tracking, reporting).`,
      id: 2,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
      {cards.map((card) => (
        <Card key={card.id} card={card} onSelect={() => onSelectCard(card)} />
      ))}
    </div>
  );
}

export default Portfolio;