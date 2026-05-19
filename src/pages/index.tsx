"use client";

import { motion } from "framer-motion";
import Container from "@/shared/ui/container/Container";
import React from "react";
import Image from "next/image";
import Head from "next/head";
import github from "../../public/images/githubW.svg";
import linkedin from "../../public/images/socIcons/linkedin.webp";
import styles from "./developer.module.scss";
import { useTranslations } from "next-intl";
import me from "./KanatNazarov.jpg";

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
              alternateName: "Kenzy",
              jobTitle: "Senior Full-Stack Developer & Systems Engineer",
              worksFor: [
                {
                  "@type": "Organization",
                  name: "Tribeca Dental Studio",
                },
                {
                  "@type": "Organization",
                  name: "Fusion AI Agency",
                }
              ],
              url: "https://kanatnazarov.vercel.app",
              sameAs: [
                "https://github.com/kenzy51",
                "https://www.linkedin.com/in/kanat-nazar",
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "New York City",
                addressRegion: "NY",
                addressCountry: "US",
              },
              knowsAbout: [
                "Next.js",
                "React 19",
                "NestJS",
                "TypeScript",
                "PostgreSQL",
                "Redis Caching",
                "Conversational AI Infrastructure",
                "Technical SEO & SGE Optimization",
                "Full-Stack Software Engineering"
              ],
            }),
          }}
        />
        <title>Kanat Nazarov | Senior Full-Stack Developer & Systems Engineer</title>
        <meta
          name="description"
          content="Kanat Nazarov — Senior Full-Stack Developer based in New York City with extensive expertise in Next.js, React, NestJS, TypeScript, and AI-driven growth systems."
        />
        <meta
          name="keywords"
          content="Kanat Nazarov, Kenzy, full stack developer NYC, software engineer New York, AI growth engineer, Next.js developer, React 19, NestJS, TypeScript architect, SGE SEO expert"
        />
        <meta
          property="og:title"
          content="Kanat Nazarov | Senior Full-Stack Developer & Systems Engineer"
        />
        <meta
          property="og:description"
          content="Engineering enterprise SaaS platforms, high-performance web applications, and autonomous AI conversational engines."
        />
        <meta
          property="og:image"
          content="https://kanatnazarov.vercel.app/og-developer.jpg"
        />
        <meta property="og:url" content="https://kanatnazarov.vercel.app/developer" />
        <meta property="og:type" content="profile" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Kanat Nazarov | Senior Full-Stack Developer"
        />
        <meta
          name="twitter:description"
          content="Architecting ultra-low latency full-stack systems with Next.js, NestJS, and TypeScript."
        />
        <meta name="twitter:image" content="https://kanatnazarov.vercel.app/og-developer.jpg" />
      </Head>

      <div className="relative py-20 px-4 sm:px-8 md:px-12 lg:px-20 bg-black overflow-hidden" id="bio">
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/[0.03] blur-[180px] rounded-full pointer-events-none" />

        <Container>
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start max-w-7xl mx-auto relative z-10"
            initial="hidden"
            animate="visible"
          >
            {/* Left Content Column */}
            <motion.div
              className="lg:col-span-7 xl:col-span-8 space-y-6"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" },
                },
              }}
            >
              <p className="text-cyan-400 font-mono tracking-widest uppercase text-xs sm:text-sm">Systems & Architecture</p>
              
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight text-white leading-none">
                Kanat Nazarov
              </h1>
              <p className="text-lg sm:text-xl font-medium text-neutral-400 font-mono">
                Senior Full-Stack Developer & Digital Growth Engineer
              </p>

              <div className="w-12 h-[1px] bg-cyan-500/50 my-6" />

              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-neutral-300 font-light">
                I am a <strong>Senior Full-Stack Developer</strong> and systems architect specializing in constructing modern, high-concurrency web ecosystems. My day-to-day work centers on optimizing production applications built on <strong>Next.js (App Router)</strong>, <strong>React 19</strong>, <strong>TypeScript</strong>, and <strong>NestJS</strong> backends.
              </p>

              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-neutral-300 font-light">
                My architectural implementations span scalable enterprise SaaS CRMs, multi-tenant local automation engines, and real-time streaming architectures. This includes building autonomous conversational AI voice streams with sub-second latencies and engineered retrieval-augmented generation (RAG) datasets supporting open-access diaspora networks for over 20,000 active users.
              </p>

              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-neutral-300 font-light">
                Operating directly at the intersection of technical engineering and organic visibility, I specialize in configuring deep semantic site frameworks, custom programmatic caching strategies, and structured JSON-LD architectures that achieve top search rankings and high-intent commercial web capture profiles.
              </p>

              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-neutral-400 font-light italic">
                Outside of backend engineering and web optimization, I write and compose music across piano and guitar, blending algorithmic logic with sonic creativity.
              </p>
            </motion.div>

            {/* Right Sticky Card Column */}
            <motion.div
              className="lg:col-span-5 xl:col-span-4 w-full flex justify-center lg:justify-end"
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.6, delay: 0.2, ease: "easeOut" },
                },
              }}
            >
              <div className="lg:sticky lg:top-32 w-full max-w-[360px]">
                <div className="relative group rounded-2xl overflow-hidden bg-gradient-to-b from-neutral-900/60 to-neutral-950/90 border border-neutral-800/80 p-5 shadow-2xl transition-all duration-300 hover:border-cyan-500/30">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neutral-700/30 to-transparent" />
                  
                  <div className="relative rounded-xl overflow-hidden aspect-[4/5] w-full mb-5 bg-neutral-900 border border-neutral-800/50">
                    <Image
                      src={me}
                      alt="Kanat Nazarov - Profile Portrait"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      priority
                      sizes="(max-w-[360px]) 100vw"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-white font-bold text-lg tracking-tight transition-colors duration-200 group-hover:text-cyan-400">
                        Kanat Nazarov
                      </p>
                      <p className="text-xs font-mono text-neutral-400 mt-0.5">
                        New York City, NY
                      </p>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <a
                        href="https://github.com/kenzy51"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center transition-all duration-200 hover:bg-neutral-800 hover:border-neutral-700 hover:scale-105"
                      >
                        <Image alt="GitHub Repository Access" src={github} className="w-4 h-4 object-contain brightness-90" />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/kanat-nazar"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center transition-all duration-200 hover:bg-neutral-800 hover:border-neutral-700 hover:scale-105"
                      >
                        <Image alt="LinkedIn Professional Verification" src={linkedin} className="w-4 h-4 object-contain brightness-90" />
                      </a>
                      <a
                        href="https://drive.google.com/file/d/1InOj7W1f1rj8ItFg0YT4uLcdUJAUHGnS/view?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-8 px-3 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-xs font-mono tracking-wider font-bold text-neutral-300 transition-all duration-200 hover:bg-neutral-800 hover:border-neutral-700 hover:text-white hover:scale-105"
                      >
                        CV
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