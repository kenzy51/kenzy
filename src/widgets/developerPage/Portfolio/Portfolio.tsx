"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import ButtonLink from "@/shared/ui/buttons/buttonLink";

// Skills
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

import useMediaQuery from "@/shared/hooks/useMediaQuery";
import { CardType } from "./constants";
import BulletList from "@/shared/ui/components/BulletList";

const Portfolio = () => {
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const [activeTab, setActiveTab] = useState<"problem" | "solution" | "outcome">("problem");

  useEffect(() => {
    if (selectedCard) {
      setActiveTab("problem");
    }
  }, [selectedCard]);

  const RenderedContent = () => {
    if (!selectedCard) return null;
    switch (activeTab) {
      case "problem":
        return <div className="text-sm md:text-base text-gray-300 whitespace-pre-line leading-relaxed">{selectedCard.problem}</div>;
      case "solution":
        return <div className="text-sm md:text-base text-gray-300 whitespace-pre-line leading-relaxed">{selectedCard.solution}</div>;
      case "outcome":
        return <BulletList text={selectedCard.outcome || ""} />;
    }
  };

  return (
    <div id="portfolio" className="relative py-24 px-4 sm:px-8 md:px-12 lg:px-20 bg-black overflow-hidden">
      {/* Cinematic ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <p className="text-cyan-400 font-mono tracking-widest uppercase text-sm mb-3">Selected Implementations</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            Architecture Showcase
          </h2>
        </div>

        <PortfolioGrid onSelectCard={setSelectedCard} />

        <AnimatePresence>
          {selectedCard && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg p-4 sm:p-6"
              onClick={() => setSelectedCard(null)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="relative w-full max-w-4xl bg-neutral-950 border border-neutral-800 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] p-6 md:p-10 text-white max-h-[85vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-5 right-5 text-neutral-400 hover:text-white text-3xl transition-colors duration-200"
                  onClick={() => setSelectedCard(null)}
                >
                  ×
                </button>

                <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-6 pr-8 text-white">{selectedCard.title}</h2>

                <div className="flex border-b border-neutral-800 mb-6 overflow-x-auto gap-2">
                  {["problem", "solution", "outcome"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab as any)}
                      className={`px-4 py-3 text-sm md:text-base font-medium whitespace-nowrap transition-all relative ${
                        activeTab === tab ? "text-cyan-400" : "text-neutral-400 hover:text-neutral-200"
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      {activeTab === tab && (
                        <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="prose prose-invert max-w-none mb-8">
                  <RenderedContent />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-neutral-900 mt-12">
                  {selectedCard?.technologies && (
                    <div className="flex flex-wrap gap-3">
                      {selectedCard.technologies.map((tech, index) => (
                        <div key={index} className="w-9 h-9 p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                          <Image src={tech} alt="tech-stack icon" className="object-contain w-full h-full" />
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedCard?.link && (
                    <div className="shrink-0">
                      <ButtonLink link={selectedCard.link} />
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
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
      solution: `I engineered a unified web engine utilizing Next.js 16 (App Router) and Tailwind CSS v4 to orchestrate state-of-the-art conversational pipelines. I constructed a secure backend middleware utilizing NestJS, Redis, and WebSockets to host 'Jessica,' an advanced autonomous intake AI agent. Implemented Deepgram Nova-2 streaming speech-to-text configurations alongside Groq-hosted Llama 3.3 models to yield human-parity voice interactions with an ultra-low <800ms Time to First Token (TTFT). Designed clean data schemas that deliver comprehensive dashboard utilities featuring real-time conversational voice playback, synchronized audio element controls, dynamic transcripts parsing raw prompting inputs, and a custom multi-tenant chatbot canvas.`,
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
      solution: `I engineered a hyper-optimized web platform from the ground up utilizing Next.js, TypeScript, and Tailwind CSS v4, keeping technical SEO performance and modern search engine optimization at the core of the infrastructure. Architected a deep, semantic JSON-LD Schema markup framework to feed rich data structures directly to AI-driven search models (SGE) and local Google discovery vectors. Leveraged strict Edge-Caching, on-demand Server-Side Rendering (SSR), and advanced Next.js Image Component configurations to satisfy all Core Web Vitals parameters, pushing performance scores to a flawless 100/100 on mobile devices.`,
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
        <motion.div
          key={card.id}
          whileHover={{ y: -6 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={() => onSelectCard(card)}
          className="group relative flex flex-col justify-between h-[420px] rounded-2xl overflow-hidden bg-gradient-to-br from-neutral-900/40 to-neutral-950/80 border border-neutral-800/60 hover:border-cyan-500/40 shadow-xl cursor-pointer transition-all duration-300"
        >
          {/* Card background media layer */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-transparent z-10 transition-opacity duration-300 group-hover:opacity-90" />
            {card.url ? (
              <Image
                src={card.url}
                alt={card.title}
                fill
                className="object-cover opacity-35 scale-100 transition-transform duration-500 ease-out group-hover:scale-105"
                sizes="(max-w-7xl) 33vw"
              />
            ) : (
              <div className="w-full h-full bg-neutral-900" />
            )}
          </div>

          {/* Top tag display */}
          <div className="relative z-20 p-6 flex justify-end">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 bg-neutral-900/80 border border-neutral-800 px-2.5 py-1 rounded-full backdrop-blur-md">
              Case Study
            </span>
          </div>

          {/* Bottom typography and metrics content block */}
          <div className="relative z-20 p-6 mt-auto">
            <h3 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-cyan-400 transition-colors duration-200">
              {card.title}
            </h3>
            <p className="text-sm text-neutral-400 line-clamp-2 leading-relaxed mb-5 font-light">
              {card.description}
            </p>

            {/* Bottom inline engineering tech badges */}
            {card.technologies && (
              <div className="flex items-center gap-2 overflow-hidden pt-2 border-t border-neutral-900/60">
                {card.technologies.slice(0, 5).map((tech, idx) => (
                  <div
                    key={idx}
                    className="w-7 h-7 p-1 rounded-md bg-neutral-900/60 border border-neutral-800/40 backdrop-blur-sm flex items-center justify-center shrink-0"
                  >
                    <Image src={tech} alt="technology tag icon" className="object-contain w-full h-full" />
                  </div>
                ))}
                {card.technologies.length > 5 && (
                  <span className="text-[11px] font-mono text-neutral-500 ml-1">
                    +{card.technologies.length - 5}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Absolute sleek neon perimeter interactive light element */}
          <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-cyan-500/0 via-cyan-400/0 to-cyan-500/0 group-hover:from-cyan-500/10 group-hover:via-cyan-400 group-hover:to-cyan-500/10 transition-all duration-500" />
        </motion.div>
      ))}
    </div>
  );
}

export default Portfolio;