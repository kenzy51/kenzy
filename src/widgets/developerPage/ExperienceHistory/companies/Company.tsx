import React from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import Image from "next/image";
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
import styles from "./company.module.scss";

const companiesData = [
  {
    title: "Software & Digital Automation Engineer",
    company: "Tribeca Dental Studio",
    duration: "June 2025 - Present",
    description: [
      "Engineered high-converting patient acquisition funnels using Next.js 16 and Tailwind CSS v4, leveraging SSR to achieve a 35% increase in mobile consultation bookings.",
      "Architected a custom integration between Next.js and GoHighLevel (GHL) API, automating the lead journey and reducing manual data entry by 15+ hours weekly.",
      "Developed a sophisticated automation pipeline that syncs GHL data with an AI Agent to execute autonomous outbound calls for appointment scheduling and lead qualification.",
      "Built HIPAA-compliant GHL 'Snapshots' with automated SMS follow-ups and missed-call text-back sequences, resulting in a 25% reduction in no-show rates.",
      "Optimized technical SEO and SGE (AI-search) visibility through JSON-LD Schema markup, achieving top-3 rankings for high-value keywords like 'Invisalign NYC'.",
      "Implemented a 900% growth in organic visibility by aligning site architecture with AI-driven search algorithms and local discovery patterns.",
      "Integrated GTM and GHL conversion tracking for A/B testing, increasing the 'Click-to-Call' conversion rate by 40% for high-ticket cosmetic procedures.",
    ],
    icons: [next, nest, git],
  },
  {
    title: "CEO & Full Stack Developer",
    company: "Fusion Web Works",
    duration: "March 2025 - Present",
    description: [
      "Architected 'Union KG,' a full-stack diaspora ecosystem utilizing Next.js 15+ and NestJS, optimized to handle 10k+ concurrent users with sub-second latency.",
      "Engineered a high-performance AI Assistant using NestJS and Vercel AI SDK; implemented Data Stream Protocol for sub-100ms responses with real-time reasoning visualization.",
      "Built a RAG (Retrieval-Augmented Generation) pipeline using Google Gemini models and community-specific datasets to provide context-aware answers on 2026 regulations.",
      "Developed a robust backend architecture with NestJS and PostgreSQL, integrating a Redis-based caching layer (Cache-Aside pattern) to achieve high-speed data retrieval.",
      "Implemented advanced UI state management in React 19 using Zustand and useRef, ensuring a seamless, high-performance conversational UX for complex AI interactions.",
      "Spearheaded multi-environment CI/CD workflows using Vite-based mode handling and Vercel, ensuring secure deployments and 99.9% application availability.",
      "Optimized full-stack performance by leveraging React Server Components (RSC) and Tailwind CSS v4, achieving 95+ Lighthouse scores for Core Web Vitals.",
    ],
    icons: [next, react, nest, postgres, redis, git, mongo],
  },
  {
    title: "Frontend Engineer",
    company: "StreamTech",
    duration: "March 2023 - March 2025",
    description: [
      "Engineered the core frontend for a premier sports betting platform, supporting 500k+ MAU and handling high-frequency real-time data streams for live odds updates.",
      "Architected the codebase using Feature-Sliced Design (FSD) patterns, standardizing a 7-layer hierarchy to decouple business logic and improve team velocity by 40%.",
      "Orchestrated a large-scale migration from React 14 to React 18, leveraging Concurrent Mode and Suspense to ensure zero-downtime during peak traffic events.",
      "Spearheaded development of Enterprise CRM and Admin Dashboards, utilizing FSD 'Entities' to manage complex user risk profiles and high-concurrency data.",
      "Implemented sophisticated server-state management using TanStack Query and MobX/Redux, optimizing data fetching for thousands of simultaneous WebSocket connections.",
      "Developed a strictly-typed TypeScript UI Library, ensuring 100% design system adherence and significantly reducing technical debt across enterprise projects.",
    ],
    icons: [react, ts, fsd, redux, git, websockets],
  },
  {
    title: "Frontend Engineer",
    company: "DataXWay- Saint Petersburg & Bishkek (Remote/Hybrid)",
    duration: "February 2022 - February 2023",
    description: [
      "Executed a comprehensive performance audit and optimization for large-scale web applications, achieving a 30% reduction in TTI (Time to Interactive) via code-splitting and asset compression.",
      "Partnered with backend teams to define robust API contracts and JSON schemas, accelerating feature delivery cycles by 20% through standardized documentation.",
      "Engineered and audited UI components for 100% cross-browser compatibility and WCAG 2.1 accessibility compliance, significantly expanding the accessible user base.",
      "Managed complex application states using Redux Toolkit and MobX, ensuring high-performance data flow between RESTful APIs and real-time UI components.",
      "Actively participated in a high-intensity Agile environment, contributing to sprint planning and code reviews to maintain high engineering standards.",
    ],
    icons: [react, redux, git, ts, framer,angular],
  },
  {
    title: "Full Stack Developer",
    company: "Discovery Studio",
    duration: "Feb 2021 - Febrary 2022",
    description: [
      "Developed proprietary UI library with React, React Native, Next.js, Tailwind CSS, and Ant Design.",
      "Developed a marketplace platform for price comparisons across e-commerce sites, integrating NestJS APIs with MongoDB for scalable data handling.",
      "Implemented advanced data parsing using Playwright.",
      "Collaborated with UX/UI designers and enforced SOLID, DRY, KISS, and YAGNI principles.",
      "Delivered Shamal, a high-impact mobile app with a growing user base developed on React Native",
    ],
    icons: [react, antd, nest, postgres, git, jira,angular],
  },
];

interface CompanyProps {
  title: string;
  company: string;
  duration: string;
  index: number;
  description?: string[];
  icons?: any[];
}

const classNameBlock =
  "backdrop-blur-xl bg-[rgba(44,44,44,0.5)] border border-[rgba(246,246,249,0.08)] rounded-lg p-6 text-white transition-all duration-300 ease-in-out hover:scale-[1.01] hover:bg-[rgba(60,60,60,0.6)] hover:shadow-lg hover:shadow-[rgba(0,0,0,0.4)]";

const SingleCompany: React.FC<CompanyProps> = ({
  title,
  company,
  duration,
  description,
  index,
  icons,
}) => {
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      className={styles.mainWrapper}
      variants={{
        hidden: { opacity: 0, y: -80 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, delay: 0.15 * index },
        },
      }}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <div className={styles.wrapper}>
        <div className={styles.leftBlock}>
          <h2>{title}</h2>
          <p>{company}</p>
        </div>
        <div className={styles.rightBlock}>{duration}</div>
      </div>

      <div className={classNameBlock}>
        {Array.isArray(description) ? (
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            {description.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-300">{description}</p>
        )}

        <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-5 mt-4 sm:mt-6">
          {icons?.map((icon, i) => (
            <div
              key={i}
              className="p-2 sm:p-3 rounded-xl border border-[rgba(246,246,249,0.08)] bg-[rgba(60,60,60,0.35)] backdrop-blur-md shadow-md hover:scale-110 hover:shadow-lg hover:shadow-[rgba(0,0,0,0.35)] transition-all duration-300"
            >
              <Image
                src={icon}
                alt="tech-icon"
                width={32}
                height={32}
                className="sm:w-9 sm:h-9 rounded-md object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.border}></div>
    </motion.div>
  );
};

const Company: React.FC = () => {
  return (
    <div>
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
