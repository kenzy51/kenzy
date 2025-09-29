import Container from "@/shared/ui/container/Container";
import React from "react";
import Image from "next/image";
import me from "./non.png";
import github from "../../../../public/images/githubW.svg";
import linkedin from "../../../../public/images/socIcons/linkedin.webp";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import styles from "./developer.module.scss";

const Developer = () => {
  const t = useTranslations();

  return (
    <div className={styles.wrapper} id="bio">
      <Container>
        <motion.div className={styles.about} initial="hidden" animate="visible">
          <motion.div
            className={styles.text}
            variants={{
              hidden: { opacity: 0, x: -80 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.8, delay: 0.1 },
              },
            }}
          >
            <br />
            <motion.h2
              className={styles.aboutTitle}
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
              }}
            >
              hello world!{" "}
            </motion.h2>
            <h6 style={{ fontSize: "20px" }}>
              I’m a developer passionate about building accessible, performant,
              and visually engaging user interfaces. My favorite work sits at
              the intersection of design and engineering — creating web
              experiences that not only look elegant but are crafted with
              attention to scalability, usability, and clean architecture.
              <br />
              <br />
              Currently, I focus on frontend engineering with React, Next.js,
              and TypeScript, while also bringing full-stack experience in
              NestJS, PostgreSQL, and MongoDB when projects call for end-to-end
              solutions. My portfolio includes SaaS platforms, enterprise
              dashboards, and consumer-facing applications — from a multi-branch
              catering management system to high-traffic fintech and logistics
              tools.
              <br />
              <br />
              In the past, I’ve collaborated across diverse environments — from
              fast-moving start-ups to structured teams with Agile processes.
              Along the way, I’ve driven initiatives like React version
              migrations, performance optimizations, and UI component libraries,
              helping products scale smoothly while improving developer
              experience.
              <br />
              <br />
              Outside of code, I’m usually playing piano or guitar, composing
              music, exploring NYC, or brainstorming at the crossroads of music
              and technology, where I see endless opportunities to create new
              kinds of digital experiences.
            </h6>
          </motion.div>

          <motion.div
            className={styles.imageWrapper}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { duration: 0.6, delay: 0.5 },
              },
            }}
          >
            <div className="sticky top-[35%] right-6 max-w-[380px] z-10">
              <div className="rounded-2xl overflow-hidden bg-white/10 backdrop-blur-lg border border-white/20 p-4">
                <Image
                  src={me}
                  alt="Developer"
                  style={{ width: "100%" }}
                  priority
                />
                <div className="flex items-center gap-4">
                  <div>
                    <p className="mt-2 text-white font-bold text-xl">
                      Kanat Nazarov
                    </p>
                    <p className="text-sm text-gray-300">Frontend Dev</p>
                    <i className="text-sm text-gray-300">
                      5 years at web development
                    </i>
                  </div>
                  <div className={styles.icons}>
                    <a
                      href="https://github.com/kenzy51"
                      target="_blank"
                      className={styles.link}
                    >
                      <Image alt="Github" src={github} width={30} />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/kanat-nazarov-a8b55533a/"
                      target="_blank"
                      className={styles.link}
                    >
                      <Image alt="LinkedIn" src={linkedin} width={30} />
                    </a>{" "}
                    <a
                      href="https://drive.google.com/file/d/1_cf0scTwCvFotT9oEWp1LDER1cWcRk6z/view?usp=sharing"
                      target="_blank"
                      className={styles.link}
                    >
                      <strong>CV</strong>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
};

export default Developer;
