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
    title: "Lead Full-Stack & Systems Infrastructure Engineer",
    company: "Fusion AI Agency",
    duration: "March 2025 - Present",
    description: [
      "Architected and deployed autonomous enterprise AI Voice agents for strategic clinical networks (including Tribeca Dental Studio), integrating Deepgram (Nova-2) and Groq (Llama 3.3) to secure a <800ms Time to First Token (TTFT) for human-parity voice triage pipelines.",
      "Engineered high-performance, multi-tenant SPA applications, dynamic e-commerce pipelines, and custom reservation engines for premium commercial clients (including AI Soul Spa Salon) utilizing Next.js 15/16 and Tailwind CSS v4.",
      "Eliminated heavy reliance on third-party CRMs by developing a secure, custom middleware and high-velocity lead-tracking data architecture that seamlessly mapped user lifecycles into automated text and voice engagement funnels.",
      "Designed an advanced Technical SEO framework leveraging dynamic JSON-LD schemas and semantic HTML tailored for AI-Driven Search (SGE), driving a 900% increase in organic traffic and Top-3 web positions for competitive commercial keywords."
    ],
    icons: [next, nest, postgres, redis, git],
  },
  {
    title: "Founding Full-Stack & Core Platform Engineer",
    company: "GetFusionChat (AI Startup Ecosystem)",
    duration: "August 2021 - March 2025",
    description: [
      "Co-founded and architected a production-grade multi-tenant enterprise AI communication and analytical SaaS platform from a blank editor field to a fully operational, horizontally scaling cloud network.",
      "Designed a highly resilient multi-tenant document schema inside MongoDB combined with an isolated Redis caching tier to isolate stateful conversation blocks per workspace, dropping primary read operations overhead by 65%.",
      "Engineered high-velocity automated data ingestion and Graph RAG pipelines in Python to transform unstructured clinical and business logs into tightly indexed, context-aware vector knowledge models.",
      "Built a custom distributed Token Bucket Rate Limiter inside Redis to strictly safeguard underlying LLM and third-party endpoints against transactional spikes and prevent system resource starvation.",
      "Leveraged advanced agentic execution environments including Claude Code CLI and Cursor to accelerate development loops, boilerplate scaffolding, and automated unit testing (Jest), doubling shipment velocity."
    ],
    icons: [mongo, redis, next, react, nest, git, ts],
  },
  {
    title: "Frontend Software Engineer",
    company: "StreamTech",
    duration: "March 2023 - March 2025",
    description: [
      "Engineered the core frontend systems of a tier-1 Central Asian sports betting platform supporting over 500,000 monthly active users and digesting dense, real-time WebSocket data updates for thousands of concurrent live match odds.",
      "Enforced rigid architectural consistency by introducing Feature-Sliced Design (FSD) patterns, dividing complex business rules into a structured 7-layer hierarchy to slice onboarding overhead and technical debt by 40%.",
      "Orchestrated a zero-downtime framework migration from React 14 to React 18, applying Concurrent Mode and Suspense strategies to preserve fluid interactive speeds during catastrophic traffic bursts.",
      "Spearheaded enterprise dashboard UI modules utilizing FSD 'Entities' to capture comprehensive user risk profiling, maintaining state integrity across high-concurrency interfaces with TanStack Table and Redux Toolkit/MobX."
    ],
    icons: [react, ts, fsd, redux, git, websockets],
  },
  {
    title: "Frontend Developer",
    company: "DATAXWAY",
    duration: "February 2022 - February 2023",
    description: [
      "Directed complete performance profile analyses across multiple extensive web systems, employing granular code-splitting and asset minification to slash Time to Interactive (TTI) benchmarks by 30%.",
      "Collaborated intimately with internal engineering squads to lock in strict API contracts and automated JSON schema validation rules, expediting feature sprint shipments by 20%.",
      "Maintained data flow across fast-paced Agile sprints using Redux Toolkit, managing complex global application states and binding real-time UI components cleanly with underlying RESTful endpoints."
    ],
    icons: [react, redux, git, ts, framer, angular],
  },
  {
    title: "Full-Stack Developer",
    company: "Discovery Studio",
    duration: "August 2021 - February 2022",
    description: [
      "Engineered a cross-platform mobile festival application using React Native and Expo, integrating live event tracking systems, interactive vector map layouts, and local push schedules.",
      "Enforced client-side persistence mechanisms via React Native AsyncStorage and Redux, protecting full application utility for attendees during periods of zero internet connectivity.",
      "Built optimized CRUD endpoints and ironclad JWT-based authentication guards inside a cohesive MEAN stack layout to manage legacy enterprise modules and production data flows."
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
        <div className="lg:col-span-4 space-y-1">
          <span className="text-xs font-mono text-cyan-400 font-bold tracking-widest block uppercase">
            {duration}
          </span>
          <h3 className="text-xl font-bold tracking-tight text-white uppercase group-hover:text-cyan-400 transition-colors duration-200">
            {title}
          </h3>
          <p className="text-sm font-medium text-neutral-400 tracking-wider uppercase">{company}</p>
        </div>

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
    <div className="relative space-y-4 md:space-y-0 mt-8">
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