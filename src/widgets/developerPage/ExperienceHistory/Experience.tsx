"use client";

import Container from "@/shared/ui/container/Container";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./experience.module.scss";
import Image from "next/image";
import elips from "../../../../public/images/gradients/grad.png";
import { useInView } from "react-intersection-observer";
import Company from "./companies/Company";
import { useTranslations } from "next-intl";
import useMediaQuery from "@/shared/hooks/useMediaQuery";

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
  });
  const t = useTranslations();
  const isSmall = useMediaQuery("sm");

  return (
    <div className="relative py-24 px-4 sm:px-8 md:px-12 lg:px-20 bg-black overflow-hidden" id="experience">
      {/* Cinematic ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/[0.02] blur-[150px] rounded-full pointer-events-none z-0" />

      <Container>
        <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
          {/* Section Header Content */}
          <div className="mb-16 md:mb-24 text-center sm:text-left">
            <motion.p
              className="text-cyan-400 font-mono tracking-widest uppercase text-xs sm:text-sm mb-3"
              initial={{ opacity: 0, y: -10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              Professional History
            </motion.p>
            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white"
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Engineering Timeline
            </motion.h2>
          </div>

          {/* Core Timeline Grid Component */}
          <Company />
        </div>
      </Container>

      {/* Embedded Ambient Radial Background */}
      <Image 
        src={elips} 
        className={`${styles.gradient} mix-blend-screen opacity-15 absolute pointer-events-none bottom-0 left-0 right-0 w-full z-0`} 
        alt="" 
        priority
      />
    </div>
  );
};

export default Experience;