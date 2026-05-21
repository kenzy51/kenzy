"use client";

import React from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import Image from "next/image";

// Skill Asset Mappings
import antd from "../../../../../public/images/skills/antd.png";
import react from "../../../../../public/images/skills/react.png";
import redux from "../../../../../public/images/skills/redux-icon.webp";
import nest from "../../../../../public/images/skills/nest.png";
import postgres from "../../../../../public/images/skills/postgres.png";
import git from "../../../../../public/images/skills/git.png";
import next from "../../../../../public/images/skills/next.png";
import ts from "../../../../../public/images/skills/ts.png";
import framer from "../../../../../public/images/skills/framer.png";
import jira from "../../../../../public/images/skills/jira.png";
import mui from "../../../../../public/images/skills/mui.png";
import mongo from "../../../../../public/images/skills/mongodb.svg";
import fsd from "../../../../../public/images/skills/fsdPattern.jpg";
import redis from "../../../../../public/images/skills/redis.svg";
import angular from "../../../../../public/images/skills/angular.svg";
import websockets from "../../../../../public/images/skills/websockets.svg";

const companiesData = [
  {
    title: "Founder & Principal Systems Engineer",
    company: "Fusion AI Agency",
    duration: "March 2025 - Present",
    description: [
      "Architected and deployed 'Jessica,' a proprietary autonomous AI Voice agent for clinical environments, integrating Deepgram (Nova-2) and Groq (Llama 3.3) to achieve a <800ms Time to First Token (TTFT) for organic, human-parity patient intake streams.",
      "Engineered a high-performance Next.js 15/16 multi-tenant growth engine utilizing App Router and Tailwind CSS v4; leveraged Server-Side Rendering (SSR) and Edge Caching to secure perfect 100/100 Lighthouse metrics and elevate mobile conversion rates by 40%.",
      "Designed an advanced Technical SEO framework leveraging dynamic JSON-LD schemas and semantic HTML tailored for AI-Driven Search (SGE), yielding a 900% increase in organic reach and Top-3 positions for high-intent keywords for strategic partner clinics.",
      "Eliminated third-party CRM dependency by building a secure, custom middleware and lead-tracking data architecture, seamlessly mapping user lifecycles from Next.js frontends to autonomous AI text/voice follow-up pipelines.",
    ],
    icons: [next, nest, postgres, redis, git],
  },
  {
    title: "AI & Growth Systems Engineer",
    company: "Tribeca Dental Studio",
    duration: "June 2025 - Present",
    description: [
      "Transitioned multi-specialty clinical operations from legacy front-desk workflows to an automated, AI-first patient generation system, deploying custom outbound AI voice agents to book high-margin procedures 24/7.",
      "Designed and optimized dedicated web funnels focusing on programmatic 'Click-to-Call' interfaces and hyper-localized technical SEO, securing a #1 Google ranking for 'Nightlase Treatment Tribeca' and drastically dropping CAC.",
      "Developed secure, HIPAA-compliant API bridges connecting Next.js dental landing pages directly to internal practice management scheduling databases, reclaiming 20+ hours of weekly manual administrative triage.",
      "Architected end-to-end performance marketing infrastructure across Meta (FB/IG) Lead Forms and Google Search Ads, engineering predictive bidding strategies and creative asset variations to maximize high-intent commercial web traffic.",
    ],
    icons: [next, ts, git],
  },
  {
    title: "CEO & Full Stack Developer (Community Initiative)",
    company: "Fusion Web Works / Union KG",
    duration: "March 2025 - Present",
    description: [
      "Spearheaded the design and product roadmap of 'Union KG,' an open-access digital infrastructure ecosystem providing AI-driven resource navigation and location-aware knowledge graphs to over 20,000 Kyrgyz immigrants in the US.",
      "Built a real-time Retrieval-Augmented Generation (RAG) assistant utilizing NestJS, Vercel AI SDK, and Google Gemini models to seamlessly parse shifting 2026 immigration and residency compliance updates.",
      "Implemented high-speed server state configurations via Next.js React Server Components (RSC), NestJS, and PostgreSQL, incorporating a robust Cache-Aside pattern via Redis to seamlessly manage thousands of active websocket streams.",
      "Engineered an ultra-low latency streaming chat UI in React 19 using Zustand and specialized useRef hook layouts, providing fluid real-time visual reasoning representations for complex database search actions.",
    ],
    icons: [next, react, nest, postgres, redis, git, mongo],
  },
  {
    title: "Frontend Engineer",
    company: "StreamTech",
    duration: "March 2023 - March 2025",
    description: [
      "Engineered the core frontend systems of a tier-1 Central Asian sports betting platform supporting over 500,000 monthly active users and digesting dense, real-time WebSocket data updates for thousands of concurrent live match odds.",
      "Enforced rigid architectural consistency by introducing Feature-Sliced Design (FSD) patterns, dividing complex business rules into a structured 7-layer hierarchy to slice onboarding overhead and technical debt by 40%.",
      "Orchestrated a zero-downtime framework migration from React 14 to React 18, applying Concurrent Mode and Suspense strategies to preserve fluid interactive speeds during catastrophic traffic bursts.",
      "Spearheaded enterprise dashboard UI modules utilizing FSD 'Entities' to capture comprehensive user risk profiling, maintaining state integrity across high-concurrency interfaces with TanStack Table and Redux Toolkit/MobX.",
      "Governed an internal strictly-typed TypeScript component system, ensuring 100% adherence to corporate style guidelines and cutting the development cycle of feature iterations by 40%.",
    ],
    icons: [react, ts, fsd, redux, git, websockets],
  },
  {
    title: "Frontend Engineer",
    company: "DATAXWAY",
    duration: "February 2022 - February 2023",
    description: [
      "Directed complete performance profile analyses across multiple extensive web systems, employing granular code-splitting and asset minification to slash Time to Interactive (TTI) benchmarks by 30%.",
      "Collaborated intimately with internal engineering squads to lock in strict API contracts and automated JSON schema validation rules, expediting feature sprint shipments by 20%.",
      "Constructed reusable structural components ensuring universal cross-browser delivery and 100% adherence to WCAG 2.1 accessibility benchmarks to broaden the consumer funnel.",
      "Maintained data flow across fast-paced Agile sprints using Redux Toolkit, managing complex global application states and binding real-time UI components cleanly with underlying RESTful endpoints.",
    ],
    icons: [react, redux, git, ts, framer, angular],
  },
  {
    title: "Full-Stack Developer",
    company: "Discovery Studio",
    duration: "February 2021 - February 2022",
    description: [
      "Engineered a cross-platform mobile festival application using React Native and Expo, integrating live event tracking systems, interactive vector map layouts, and local push schedules.",
      "Enforced client-side persistence mechanisms via React Native AsyncStorage and Redux, protecting full application utility for attendees during periods of zero internet connectivity.",
      "Built a secure e-commerce marketplace backend using NestJS and MongoDB, writing optimized CRUD endpoints and ironclad JWT-based authentication guards to process dynamic digital inventories.",
      "Optimized legacy enterprise-level Angular modules inside a cohesive MEAN stack layout, identifying and fixing production edge-case regressions to maintain complete feature parity.",
    ],
    icons: [react, antd, nest, postgres, git, jira, angular],
  }
];

interface CompanyProps {
  title: string;
  company: string;
  duration: string;
  index: number;
  description?: string[];
  icons?: any[];
}

const SingleCompany: React.FC<CompanyProps> = ({
  title,
  company,
  duration,
  description,
  index,
  icons,
}) => {
  const [ref, inView] = useInView({ 
    triggerOnce: true,
    threshold: 0.1 
  });

  return (
    <motion.div
      ref={ref}
      className="relative pl-0 md:pl-8 pb-12 last:pb-0"
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, delay: 0.1 * index, ease: "easeOut" },
        },
      }}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <div className="absolute left-0 top-0 bottom-0 w-px bg-neutral-800/80 hidden md:block">
        <motion.div 
          className="absolute top-2 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-cyan-500 border-2 border-black shadow-[0_0_10px_rgba(6,182,212,0.5)]"
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: 0.2 + 0.1 * index, type: "spring" }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Timeline Metadata Block */}
        <div className="lg:col-span-4 space-y-1">
          <span className="text-xs font-mono text-cyan-400 font-bold tracking-widest block uppercase">
            {duration}
          </span>
          <h3 className="text-xl font-bold tracking-tight text-white uppercase group-hover:text-cyan-400 transition-colors duration-200">
            {title}
          </h3>
          <p className="text-sm font-medium text-neutral-400 tracking-wider uppercase">{company}</p>
        </div>

        {/* Timeline Sub-Card Information Architecture */}
        <div className="lg:col-span-8 group relative rounded-xl bg-gradient-to-br from-neutral-900/30 to-neutral-950/60 border border-neutral-800/50 p-6 backdrop-blur-xl transition-all duration-300 hover:border-neutral-700/60 hover:shadow-2xl hover:shadow-black/40">
          
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />

          {Array.isArray(description) ? (
            <ul className="space-y-4 text-sm sm:text-base text-neutral-300 font-light leading-relaxed tracking-wide">
              {description.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-neutral-600 shrink-0 group-hover:bg-cyan-500 transition-colors duration-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed tracking-wide">{description}</p>
          )}

          {icons && icons.length > 0 && (
            <div className="flex flex-wrap gap-2.5 mt-6 pt-5 border-t border-neutral-900/60">
              {icons.map((icon, i) => (
                <div
                  key={i}
                  className="w-8 h-8 p-1.5 rounded-lg bg-neutral-950/80 border border-neutral-800/60 flex items-center justify-center shadow-md transition-all duration-300 hover:border-cyan-500/40 hover:scale-110"
                >
                  <Image
                    src={icon}
                    alt="stack hardware tag icon"
                    className="w-full h-full object-contain filter brightness-95"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Company: React.FC = () => {
  return (
    // Applied a unified context wrapper layer to cleanly hook into Brandon Grotesque
    <div 
      className="relative space-y-4 md:space-y-0 mt-8" 
    >
      {companiesData.map((company, index) => (
        <SingleCompany
          key={index}
          title={company.title}
          company={company.company}
          duration={company.duration}
          index={index}
          description={company.description}
          icons={company.icons}
        />
      ))}
    </div>
  );
};

export default Company;