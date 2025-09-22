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
import framer from "../../../../../public/images/skills/framer.png";
import jira from "../../../../../public/images/skills/jira.png";
import mui from "../../../../../public/images/skills/mui.png";
import mongo from "../../../../../public/images/skills/mongodb.svg";
import styles from "./company.module.scss";

const companiesData = [
  {
    title: "CEO & Full Stack Developer",
    company: "Fusion Web Works",
    duration: "March 2025 - present",
    description: [
      "Spearheaded architecture, development, deployment, and client communication for a full-scale web project.",
      "Built application with Next.js (SSR & SSG), integrated API routes, middleware, and advanced routing.",
      "Implemented SEO & performance optimizations (lazy loading, schema markup, Next/Image).",
      "Developed CMS & Admin panel with role-based access, inline editing, and React Hook Form + Zod validation.",
      "Led client communication, requirements gathering, and iterative feedback cycles.",
    ],
    icons: [next, react, framer, redux, git,jira,nest,mongo],
  },
  {
    title: "Frontend Engineer",
    company: "StreamTech",
    duration: "March 2023 to Mar 2025",
    description: [
      "Contributed to a real-time betting platform, delivering scalable, high-performance features used by thousands of active users.",
      "Migrated codebase from React 14 → React 18, unlocking concurrent features and improving rendering speed by 20%.",
      "Optimized platform performance with lazy loading, code splitting, memoization, and virtualization, reducing page load time by ~30%.",
      "Built a scalable UI component library with TypeScript, improving developer productivity and reducing code duplication by 40%.",
      "Refactored legacy code to functional components with hooks, enhancing maintainability and cutting bug rates in refactored modules.",
      "Collaborated closely with backend engineers, QA, and designers in an Agile environment to ensure reliable real-time data delivery and seamless user experience.",
    ],
    icons: [react, redux, mui, framer, git,jira],
  },
  {
    title: "Frontend Engineer",
    company: "DataXWay",
    duration: "Feb 2022 - Feb 2023",
    description: [
      "Developed responsive web apps with React, Next.js, and TypeScript.",
      "Built reusable UI components using MUI and Tailwind CSS.",
      "Integrated REST APIs and optimized state management with Redux Toolkit + React Query.",
      "Enhanced UX with Framer Motion animations.",
      "Improved page load times by 30% and increased engagement by 20%.",
    ],
    icons: [react, next, mui, redux,jira],
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
    icons: [react, antd, nest, postgres, git,jira],
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
