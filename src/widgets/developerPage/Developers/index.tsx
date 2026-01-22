// components/Developer/Developer.tsx or wherever it is
import { motion } from "framer-motion";
import Container from "@/shared/ui/container/Container";
import React from "react";
import Image from "next/image";
import Head from "next/head"; // ← Add this
import github from "../../../../public/images/githubW.svg";
import linkedin from "../../../../public/images/socIcons/linkedin.webp";
import styles from "./developer.module.scss";
import { useTranslations } from "next-intl";
import me from "./non2.jpeg";

const Developer = () => {
  const t = useTranslations();

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Kanat Nazarov",
              jobTitle: "Full-Stack Developer",
              worksFor: {
                "@type": "Organization",
                name: "Freelance / Open to opportunities",
              },
              url: "https://kenzy.vercel.app",
              sameAs: [
                "https://github.com/kenzy51",
                "https://www.linkedin.com/in/kanat-nazarov-a8b55533a/",
              ],
              address: {
                addressLocality: "New York City",
                addressRegion: "NY",
                addressCountry: "US",
              },
              knowsAbout: [
                "Next.js",
                "React",
                "NestJS",
                "TypeScript",
                "MongoDB",
                "Full-Stack Development",
              ],
            }),
          }}
        />
        <title>Kanat Nazarov | Full-Stack Developer & Software Engineer</title>
        <meta
          name="description"
          content="Kanat Nazarov — Full-Stack Developer in New York City with 5+ years experience in Next.js, React, NestJS, TypeScript, and MongoDB. Building scalable web applications and community platforms."
        />
        <meta
          name="keywords"
          content="Kanat Nazarov, full stack developer, software engineer New York, frontend engineer, Next.js developer, React developer, NestJS developer, Kyrgyz developer USA"
        />
        <meta
          property="og:title"
          content="Kanat Nazarov | Full-Stack Developer"
        />
        <meta
          property="og:description"
          content="Full-Stack Developer specializing in Next.js, React, and NestJS."
        />
        <meta
          property="og:image"
          content="https://kenzy.vercel.app/og-developer.jpg"
        />{" "}
        {/* Add this image */}
        <meta property="og:url" content="https://kenzy.vercel.app/developer" />
        <meta property="og:type" content="profile" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Kanat Nazarov | Full-Stack Developer"
        />
        <meta
          name="twitter:description"
          content="Full-Stack Developer in | Next.js, React, NestJS"
        />
      </Head>

      <div className={styles.wrapper} id="bio">
        <Container>
          <motion.div
            className={styles.about}
            initial="hidden"
            animate="visible"
          >
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
              <motion.h1
                className={styles.aboutTitle}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
                }}
              >
                Kanat Nazarov | Full-Stack Developer & Software Engineer
              </motion.h1>

              <p className="text-lg md:text-xl leading-relaxed text-gray-400 mt-6">
                I'm a <strong>full-stack developer</strong> with 5+ years of
                professional experience building modern, scalable web
                applications. I specialize in <strong>Next.js</strong>,{" "}
                <strong>React</strong>, <strong>TypeScript</strong>, and{" "}
                <strong>NestJS</strong>, delivering performant and user-focused
                solutions from frontend to backend.
              </p>

              <p className="text-lg md:text-xl leading-relaxed text-gray-400 mt-4">
                My work spans SaaS platforms, enterprise dashboards, fintech
                tools, and community applications — including a full-stack
                diaspora platform connecting thousands of Central Asians in the
                USA.
              </p>

              <p className="text-lg md:text-xl leading-relaxed text-gray-400 mt-4">
                Currently focused on <strong>frontend engineering</strong> and{" "}
                <strong>full-stack development</strong> in, I love creating
                clean, accessible, and visually engaging experiences that scale.
              </p>

              <p className="text-lg md:text-xl leading-relaxed text-gray-400 mt-4">
                Outside coding, I play piano and guitar, compose music, and
                explore the intersection of technology and creativity in New
                York.
              </p>
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
                    alt="Kanat Nazarov - Full-Stack Developer"
                    style={{ width: "100%" }}
                    priority
                  />
                  <div className="flex items-center gap-4 mt-4">
                    <div>
                      <p className="text-white font-bold text-xl">
                        Kanat Nazarov
                      </p>
                      <p className="text-sm text-gray-400">
                        Full-Stack Developer
                      </p>
                    </div>
                    <div className={styles.icons}>
                      <a
                        href="https://github.com/kenzy51"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                      >
                        <Image
                          alt="GitHub - Kanat Nazarov"
                          src={github}
                          width={30}
                        />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/kanat-nazarov-a8b55533a/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                      >
                        <Image
                          alt="LinkedIn - Kanat Nazarov"
                          src={linkedin}
                          width={30}
                        />
                      </a>
                      <a
                        href="https://drive.google.com/file/d/1InOj7W1f1rj8ItFg0YT4uLcdUJAUHGnS/view?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                      >
                        <strong className="text-white">CV</strong>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </div>
    </>
  );
};

export default Developer;
