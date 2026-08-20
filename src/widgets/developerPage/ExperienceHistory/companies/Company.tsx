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
    title: "Senior Lead Web Developer & Technical Architect",
    company: "Fusion AI Agency / Enterprise Contracts",
    duration: "Jan 2020 - Present",
    description: [
      "Engineered end-to-end full-stack website migrations from legacy platforms to Next.js 15 App Router and Tailwind CSS integrated with headless Sanity CMS.",
      "Designed custom Sanity Studio content models, schema structures, and complex GROQ queries for dynamic profile and service endpoints.",
      "Configured dynamic metadata loops, alternate language tags, and automated XML sitemaps within Next.js to preserve organic search traffic during enterprise transitions.",
      "Architected state management (Zustand, Context API) and RESTful/GraphQL API integrations, enforcing WCAG accessibility compliance and achieving zero-CLS layouts with sub-800ms response times."
    ],
    icons: [next, nest, postgres, redis, git],
  },
  {
    title: "Co-Founder & Principal Software Engineer",
    company: "Get Fusion Chat",
    duration: "Aug 2024 - Present",
    description: [
      "Co-founded and architected a multi-tenant web application utilizing React, Next.js, TypeScript, Python, and PostgreSQL.",
      "Engineered modular UI components and editor workflows with Next.js Server Components and dynamic asset imports (next/dynamic), cutting bundle overhead by 77%.",
      "Integrated automated CI/CD pipelines via GitHub Actions and deployed low-latency production applications on Vercel and cloud infrastructure.",
      "Mentored engineering staff, established code review standards, and drove architectural discussions across cross-functional product teams."
    ],
    icons: [mongo, redis, next, react, nest, git, ts],
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