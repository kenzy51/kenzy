"use client";

import Container from "@/shared/ui/container/Container";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./skills.module.scss";
import Image from "next/image";
import elips from "../../../../public/images/gradients/grad.png";
import { Slider } from "@/shared/ui/slider/Slider";
import { useInView } from "react-intersection-observer";
import { useTranslations } from "next-intl";
import useMediaQuery from "@/shared/hooks/useMediaQuery";

type SkillCategory = "all" | "frontend" | "backend";

const Skills = () => {
  const [categories, setCategories] = useState<SkillCategory>("all");
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const t = useTranslations();
  const isTablet = useMediaQuery("md");

  // Filter list options mapping
  const filterOptions: { id: SkillCategory; label: string }[] = [
    { id: "all", label: "ALL FRAMEWORKS" },
    { id: "frontend", label: "FRONTEND / UI" },
    { id: "backend", label: "BACKEND / DEVOP" },
  ];

  return (
    <div className="relative py-24 px-4 sm:px-8 md:px-12 lg:px-20 bg-black overflow-hidden" id="skills">
      {/* Premium subtle ambient illumination backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/[0.02] blur-[160px] rounded-full pointer-events-none z-0" />

      <Container>
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center" ref={ref}>
          
          {/* Section Header Content */}
          <div className="text-center mb-12 sm:mb-16">
            <motion.p 
              className="text-cyan-400 font-mono tracking-widest uppercase text-xs sm:text-sm mb-3"
              initial={{ opacity: 0, y: -10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              Engineered Stack
            </motion.p>
            
            <motion.h2 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Technical Core
            </motion.h2>

            <motion.span 
              className="text-xs font-mono text-neutral-500 uppercase tracking-widest block mt-2 animate-pulse"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.6 }}
            >
              ← Drag or swipe to explore parameters →
            </motion.span>
          </div>

          {/* High-End Custom Layout Motion Navigation Bar */}
          <motion.div 
            className="p-1.5 bg-neutral-950/80 border border-neutral-800/80 rounded-full flex items-center gap-1 backdrop-blur-xl mb-16 shadow-2xl max-w-full overflow-x-auto no-scrollbar"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {filterOptions.map((item) => {
              const isActive = categories === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCategories(item.id)}
                  className={`relative px-4 sm:px-6 py-2.5 rounded-full text-xs font-mono tracking-wider font-bold transition-colors duration-300 whitespace-nowrap z-10 outline-none ${
                    isActive ? "text-black" : "text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSkillTabPill"
                      className="absolute inset-0 bg-white rounded-full z-[-1] shadow-[0_4px_12px_rgba(255,255,255,0.15)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </button>
              );
            })}
          </motion.div>
        </div>
      </Container>

      {/* Dynamic Skill Pipeline Grid Display */}
      <motion.div 
        className="w-full relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Slider status={categories} />
      </motion.div>

      {/* Embedded Radial Shadow Layer */}
      <Image 
        src={elips} 
        className={`${styles.gradient} mix-blend-screen opacity-20 absolute pointer-events-none bottom-0 left-0 right-0 w-full z-0`} 
        alt="" 
        priority
      />
    </div>
  );
};

export default Skills;