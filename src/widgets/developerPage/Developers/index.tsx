"use client";

import { motion } from "framer-motion";
import Container from "@/shared/ui/container/Container";
import React from "react";
import Image from "next/image";
import Head from "next/head";
import github from "../../../../public/images/githubW.svg";
import linkedin from "../../../../public/images/socIcons/linkedin.webp";
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
              jobTitle: "Growth Systems Engineer & Automation Architect",
              worksFor: [
                {
                  "@type": "Organization",
                  name: "Tribeca Dental Studio",
                },
                {
                  "@type": "Organization",
                  name: "Fusion AI Agency",
                },
              ],
              url: "https://kanatnazarov.com",
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
                "Full-Stack Software Engineering",
              ],
            }),
          }}
        />
        <title>
          Kanat Nazarov | Growth Systems Engineer & Automation Architect
        </title>
        <meta
          name="description"
          content="Kanat Nazarov — Growth Systems Engineer and Automation Architect based in New York City. Engineering ultra-low latency conversational AI engines and high-performance full-stack web ecosystems."
        />
        <meta
          name="keywords"
          content="Kanat Nazarov, Kenzy, Growth Systems Engineer, Automation Architect, full stack developer NYC, software engineer New York, Next.js developer, NestJS, TypeScript architect"
        />
        <meta
          property="og:title"
          content="Kanat Nazarov | Growth Systems Engineer"
        />
        <meta
          property="og:description"
          content="Engineering high-performance web ecosystems, multi-tenant SaaS architectures, and autonomous AI conversational streams."
        />
        <meta
          property="og:image"
          content="https://kanatnazarov.com/og-developer.jpg"
        />
        <meta property="og:url" content="https://kanatnazarov.com/developer" />
        <meta property="og:type" content="profile" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      {/* 🎥 CINEMATIC BRAND HERO SECTION */}
     {/* 🎥 CINEMATIC BRAND HERO SECTION */}
      <section className="relative w-full h-screen bg-black flex items-center justify-start overflow-hidden z-10">
        {/* Background Video Loop */}
        <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-90 filter brightness-[0.75] contrast-[1.05]"
          >
            <source src="/videos/kanat2.mov" type="video/mp4" />
          </video>
          {/* Градиенты для идеального контраста белого текста */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-[1]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-[1]" />
        </div>

        {/* Brand Typographic Left-Aligned Unit — Поднят z-index до z-50 */}
        <Container className="relative z-50 w-full px-6 sm:px-12 md:px-16 lg:px-24 flex flex-col items-start text-left">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            // 🔒 Жесткая фиксация стиля. Никакой скрипт не сможет перетереть это в opacity: 0
            style={{ opacity: 1, willChange: "transform, opacity" }}
            className="space-y-4 max-w-2xl sm:max-w-3xl select-text"
          >
            {/* Надзаголовок */}
            <span className="text-cyan-400 font-mono tracking-[0.3em] uppercase text-xs sm:text-sm font-semibold block">
              Code. Systems. Audio. Strategy.
            </span>

            {/* Имя (Защищено инлайновым стилем !important) */}
            <h1 
              style={{ opacity: '1 !important' }} 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white uppercase font-sans leading-[0.95]"
            >
              Kanat <br /> Nazarov
            </h1>

            <div className="h-[2px] w-16 bg-cyan-500/60 my-6" />

            {/* Описание (Защищено инлайновым стилем !important) */}
            <p 
              style={{ opacity: '1 !important' }} 
              className="text-xs sm:text-sm md:text-base font-light text-neutral-300 tracking-[0.15em] uppercase max-w-xl leading-relaxed"
            >
              Full-Stack Engineer & Digital Creator. Building high-impact software from architectural logic to cinematic experiences.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute bottom-10 left-6 sm:left-12 md:left-16 lg:left-24 flex flex-col items-start gap-2 cursor-pointer z-50"
            onClick={() =>
              document
                .getElementById("bio")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-neutral-400">
              Scroll to Explore
            </span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-500/50 to-transparent animate-pulse" />
          </motion.div>
        </Container>
      </section>
      <div
        className="relative py-24 lg:py-36 px-4 sm:px-8 md:px-12 lg:px-20 bg-black border-t border-neutral-900"
        id="bio"
      >
        {/* Subtle Cybernetic Background Glow */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/[0.01] blur-[150px] rounded-full pointer-events-none" />

        <Container>
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-16 items-start max-w-7xl mx-auto relative z-10">
            {/* PORTRAIT CARD HERO UNIT (order-2 on mobile, pins to right on desktop) */}
            <div className="w-full flex justify-center lg:justify-end order-2 lg:col-span-5 xl:col-span-4">
              <div className="lg:sticky lg:top-36 w-full max-w-[350px]">
                <div className="relative group rounded-2xl overflow-hidden bg-gradient-to-b from-neutral-900/40 to-neutral-950/80 border border-neutral-800/60 p-5 shadow-2xl transition-all duration-300 hover:border-cyan-500/20">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neutral-700/20 to-transparent" />

                  <div className="relative rounded-xl overflow-hidden aspect-[4/5] w-full mb-5 bg-neutral-900 border border-neutral-800/40">
                    <Image
                      src={me}
                      alt="Kanat Nazarov - Profile Portrait"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                      priority
                      sizes="(max-w-[350px]) 100vw"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-white font-bold text-base tracking-tight uppercase">
                        Kanat Nazarov
                      </p>
                      <p className="text-[10px] text-neutral-500 mt-0.5 tracking-wider font-mono uppercase">
                        New York City, NY
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href="https://github.com/kenzy51"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-neutral-900/80 border border-neutral-800/80 flex items-center justify-center transition-all hover:bg-neutral-800 hover:border-neutral-700"
                      >
                        <Image
                          alt="GitHub"
                          src={github}
                          className="w-4 h-4 opacity-70 hover:opacity-100"
                        />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/kanat-nazar"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-neutral-900/80 border border-neutral-800/80 flex items-center justify-center transition-all hover:bg-neutral-800 hover:border-neutral-700"
                      >
                        <Image
                          alt="LinkedIn"
                          src={linkedin}
                          className="w-4 h-4 opacity-70 hover:opacity-100"
                        />
                      </a>
                      <a
                        href="https://drive.google.com/file/d/1WsO4PQ5_DxbwlAMdbFjXmJKyiVI1uLBh/view?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-8 px-3 rounded-lg bg-neutral-900/80 border border-neutral-800/80 flex items-center justify-center text-[10px] font-mono font-bold text-neutral-400 transition-all hover:bg-neutral-800 hover:text-white"
                      >
                        CV
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* LEFT TEXT CONTENT TREE BLOCK (order-1 on mobile) */}
            <div className="space-y-8 order-1 lg:col-span-7 xl:col-span-8">
              <div className="space-y-2">
                <span className="text-cyan-400 font-mono tracking-widest uppercase text-xs font-bold block">
                  Core Expertise
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase">
                  Engineering Systemic Scalability
                </h2>
              </div>

              <div className="w-12 h-[1px] bg-cyan-500/30" />

              <div className="space-y-6 text-neutral-300 font-light text-base sm:text-lg leading-relaxed tracking-wide">
                <p>
                  I am a <strong>Growth Systems Engineer</strong> and{" "}
                  <strong>Automation Architect</strong> specializing in
                  constructing modern, high-concurrency web ecosystems. My core
                  workflow centers on optimizing production applications built
                  with <strong>Next.js</strong>, <strong>React 19</strong>,{" "}
                  <strong>TypeScript</strong>, and robust{" "}
                  <strong>NestJS</strong> backends.
                </p>

                <p>
                  My architectural implementations span scalable enterprise SaaS
                  CRMs, multi-tenant local automation engines, and real-time
                  streaming pipelines. This includes engineering autonomous
                  conversational AI voice streams with sub-second latencies and
                  designing optimized retrieval-augmented generation (RAG)
                  datasets supporting open-access diaspora networks.
                </p>

                <p>
                  Operating directly at the intersection of infrastructure
                  development and organic brand visibility, I configure deep
                  semantic site frameworks, custom programmatic caching
                  strategies, and structured JSON-LD architectures that achieve
                  exceptional search rankings and high-intent commercial web
                  capture profiles.
                </p>

                <p className="text-neutral-400 italic font-normal text-sm sm:text-base border-l border-neutral-800 pl-4 mt-8">
                  Outside of backend engineering and web optimization, I write
                  and compose music across piano and guitar, blending
                  algorithmic logic with sonic creativity.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Developer;
