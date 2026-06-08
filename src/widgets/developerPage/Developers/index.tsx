"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "@/shared/ui/container/Container";
import Image from "next/image";
import github from "../../../../public/images/githubW.svg";
import linkedin from "../../../../public/images/socIcons/linkedin.webp";
import { useTranslations } from "next-intl";
import me from "./KanatNazarov.jpg";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Developer = () => {
  const t = useTranslations();
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [progress, setProgress] = useState(0);
  const [hasLoadedBefore, setHasLoadedBefore] = useState<boolean | null>(null);

  useEffect(() => {
    const isVisited = sessionStorage.getItem("kanat_nazarov_loaded");
    if (isVisited === "true") {
      setHasLoadedBefore(true);
    } else {
      setHasLoadedBefore(false);
    }
  }, []);

  useGSAP(
    () => {
      if (hasLoadedBefore === null) return;

      const masterTimeline = gsap.timeline({
        defaults: { ease: "power4.inOut" },
      });

      if (!hasLoadedBefore) {
        // === ВАРИАНТ А: ПЕРВЫЙ ЗАХОД (ПОЛНЫЙ ЦИКЛ) ===
        const progressObj = { value: 0 };

        // Изначально выставляем маску видимости, чтобы видео отрендерилось под лоадером
        gsap.set(".main-content-wrapper", { visibility: "visible" });

        masterTimeline.to(progressObj, {
          value: 100,
          duration: 1.5,
          ease: "power2.out",
          onUpdate: () => {
            const currentProgress = Math.floor(progressObj.value);
            setProgress(currentProgress);
            gsap.set(".loader-bar-fill", { width: `${currentProgress}%` });

            // ⚡️ ИНЖЕНЕРНЫЙ ХАК: Принудительно запускаем видео на 30% загрузки прелоадера,
            // чтобы у браузера было время раскодировать его в фоне под черной шторкой
            if (
              currentProgress > 30 &&
              videoRef.current &&
              videoRef.current.paused
            ) {
              videoRef.current.play().catch(() => {});
            }
          },
          onComplete: () => {
            sessionStorage.setItem("kanat_nazarov_loaded", "true");
          },
        });

        masterTimeline.fromTo(
          ".loader-text",
          { opacity: 0, y: 10, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power3.out",
          },
          "0.2",
        );

        masterTimeline.to(".preloader-screen", {
          yPercent: -100,
          duration: 1.2,
          ease: "power4.inOut",
        });

        masterTimeline.to(
          ".loader-content-wrap",
          {
            opacity: 0,
            y: -30,
            duration: 0.6,
            ease: "power3.in",
          },
          "-=0.9",
        );

        // Появление контента
        masterTimeline
          .fromTo(
            ".hero-video",
            { scale: 1.08, filter: "brightness(0.2)" },
            {
              scale: 1,
              filter: "brightness(0.75)",
              duration: 1.8,
              ease: "power3.out",
            },
            "-=0.4",
          )
          .fromTo(
            ".hero-text-item",
            { opacity: 0, x: -40, filter: "blur(4px)" },
            {
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
              duration: 1.2,
              stagger: 0.12,
              ease: "power4.out",
            },
            "-=1.4",
          )
          .fromTo(
            ".hero-scroll-btn",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
            "-=0.6",
          );
      } else {
        // === ВАРИАНТ Б: ПОВТОРНЫЙ ПЕРЕХОД ===
        gsap.set(".main-content-wrapper", { visibility: "visible" });

        if (videoRef.current) {
          videoRef.current.play().catch(() => {});
        }

        masterTimeline
          .fromTo(
            ".hero-video",
            { filter: "brightness(0.2)" },
            { filter: "brightness(0.75)", duration: 1.2, ease: "power3.out" },
          )
          .fromTo(
            ".hero-text-item",
            { opacity: 0, x: -20 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              stagger: 0.08,
              ease: "power3.out",
            },
            "-=0.8",
          )
          .fromTo(
            ".hero-scroll-btn",
            { opacity: 0 },
            { opacity: 1, duration: 0.5 },
            "-=0.4",
          );
      }

      // Скролл-анимации Bio-блока
      gsap.from(".bio-content-item", {
        scrollTrigger: {
          trigger: ".bio-trigger-element",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });

      gsap.from(".bio-card", {
        scrollTrigger: {
          trigger: ".bio-card",
          start: "top 85%",
        },
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: "power4.out",
      });
    },
    { scope: mainContainerRef, dependencies: [hasLoadedBefore] },
  );

  const handleScrollToBio = () => {
    gsap.to(window, {
      duration: 1.2,
      scrollTo: "#bio",
      ease: "power4.inOut",
    });
  };

  return (
    <div
      ref={mainContainerRef}
      className="bg-black w-full min-h-screen select-none relative"
    >
      {/* 1. ПОСТОЯННЫЙ ЭКРАН-ЗАГЛУШКА ДЛЯ ГИДРАТАЦИИ */}
      {hasLoadedBefore === null && (
        <div className="fixed inset-0 w-full h-screen bg-[#0a0a0a] z-[99999] flex flex-col justify-between p-10 sm:p-16" />
      )}

      {/* 2. АКТИВНЫЙ ПРЕЛОАДЕР */}
      {hasLoadedBefore === false && (
        <div className="preloader-screen fixed inset-0 w-full h-screen bg-[#0a0a0a] z-[9999] flex flex-col justify-between p-10 sm:p-16 pointer-events-none overflow-hidden">
          <div className="w-full flex justify-between items-center opacity-40 font-mono text-[9px] tracking-[0.2em] text-neutral-500 uppercase">
            <span>Systems Initialize</span>
            <span>©2026</span>
          </div>

          <div className="loader-content-wrap flex flex-col items-center justify-center text-center self-center my-auto space-y-4">
            <h2 className="loader-text text-white font-light text-[40px] sm:text-[50px] md:text-[60px] tracking-[0.4em] uppercase font-sans">
              Kanat Nazarov{" "}
              <span className="text-neutral-500 font-mono font-extralight mx-1">
                Presents
              </span>
            </h2>
          </div>

          <div className="w-full max-w-md mx-auto flex flex-col gap-3 items-center">
            <div className="w-full h-[1px] bg-neutral-950 relative overflow-hidden">
              <div className="loader-bar-fill absolute left-0 top-0 h-full w-0 bg-gradient-to-r from-cyan-600 to-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
            </div>
            <div className="flex items-center justify-center font-mono text-[10px] tracking-[0.25em] text-cyan-500/80">
              <span>{progress}%</span>
            </div>
          </div>
        </div>
      )}

      {/* 3. ОСНОВНОЙ КОНТЕНТ СТРАНИЦЫ */}
      {/* Изначально ставим opacity-0, но сохраняем visibility, чтобы видео загружалось на фоне прелоадера */}
      <div className="main-content-wrapper style={{ visibility: hasLoadedBefore === null ? 'hidden' : 'visible' }}">
        {/* 🌌 HERO SECTION */}
        <section className="relative w-full h-screen bg-black flex items-center justify-start overflow-hidden z-10">
          <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none">
            {hasLoadedBefore !== null && (
              <video
                ref={videoRef}
                loop
                muted
                playsInline
                autoPlay
                preload="auto"
                style={{ pointerEvents: "none" }}
                id="hero-bg-video"
                className="hero-video w-full h-full object-cover opacity-90 filter brightness-[0.75] contrast-[1.05]"
              >
                <source src="/videos/kanat2.webm" type="video/mp4" />
              </video>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-[1]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-[1]" />
          </div>

          <Container className="relative z-10 w-full px-6 sm:px-12 md:px-16 lg:px-24 flex flex-col items-start text-left">
            <div className="space-y-4 max-w-2xl sm:max-w-3xl select-text">
              <span className="hero-text-item text-cyan-400 font-mono tracking-[0.3em] uppercase text-xs sm:text-sm font-semibold block">
                Code. Systems. Audio. Strategy.
              </span>

              <h1 className="hero-text-item text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white uppercase font-sans leading-[0.95]">
                Kanat <br /> Nazarov
              </h1>

              <div className="hero-text-item h-[2px] w-16 bg-cyan-500/60 my-6" />

              <p className="hero-text-item text-xs sm:text-sm md:text-base font-light text-neutral-300 tracking-[0.15em] uppercase max-w-xl leading-relaxed">
                Full-Stack Engineer & Digital Creator. Building high-impact
                software from architectural logic to cinematic experiences.
              </p>
            </div>

            <div
              onClick={handleScrollToBio}
              className="hero-scroll-btn absolute bottom-10 left-6 sm:left-12 md:left-16 lg:left-24 flex flex-col items-start gap-2 cursor-pointer z-50"
            >
              <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-neutral-400">
                Scroll to Explore
              </span>
              <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-500/50 to-transparent animate-pulse" />
            </div>
          </Container>
        </section>

        {/* 📑 BIOGRAPHY & PROFILE CONTAINER */}
        <div
          className="bio-trigger-element relative py-24 lg:py-36 px-4 sm:px-8 md:px-12 lg:px-20 bg-black border-t border-neutral-900"
          id="bio"
        >
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/[0.01] blur-[150px] rounded-full pointer-events-none" />

          <Container>
            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-16 items-start max-w-7xl mx-auto relative z-10">
              {/* PORTRAIT CARD */}
              <div className="w-full flex justify-center lg:justify-end order-2 lg:col-span-5 xl:col-span-4">
                <div className="lg:sticky lg:top-36 w-full max-w-[350px]">
                  <div className="bio-card relative group rounded-2xl overflow-hidden bg-gradient-to-b from-neutral-900/40 to-neutral-950/80 border border-neutral-800/60 p-5 shadow-2xl transition-all duration-300 hover:border-cyan-500/20">
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

              {/* TEXT BIOGRAPHY */}
              <div className="space-y-8 order-1 lg:col-span-7 xl:col-span-8">
                <div className="bio-content-item space-y-2">
                  <span className="text-cyan-400 font-mono tracking-widest uppercase text-xs font-bold block">
                    Core Expertise
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase">
                    Engineering Systemic Scalability
                  </h2>
                </div>

                <div className="bio-content-item w-12 h-[1px] bg-cyan-500/30" />

                <div className="space-y-6 text-neutral-300 font-light text-base sm:text-lg leading-relaxed tracking-wide">
                  <p className="bio-content-item">
                    I am a <strong>Full-Stack Engineer</strong> and{" "}
                    <strong>Digital Creator</strong> specializing in
                    constructing modern, high-concurrency web ecosystems. My
                    core workflow centers on optimizing production applications
                    built with <strong>Next.js</strong>,{" "}
                    <strong>React 19</strong>, <strong>TypeScript</strong>, and
                    robust <strong>NestJS</strong> backends.
                  </p>
                  <p className="bio-content-item">
                    My architectural implementations span scalable enterprise
                    SaaS CRMs, multi-tenant local automation engines, and
                    real-time streaming pipelines. This includes engineering
                    autonomous conversational AI voice streams with sub-second
                    latencies and designing optimized retrieval-augmented
                    generation (RAG) datasets supporting open-access diaspora
                    networks.
                  </p>
                  <p className="bio-content-item">
                    Operating directly at the intersection of infrastructure
                    development and organic brand visibility, I configure deep
                    semantic site frameworks, custom programmatic caching
                    strategies, and structured JSON-LD architectures that
                    achieve exceptional search rankings and high-intent
                    commercial web capture profiles.
                  </p>
                  <p className="bio-content-item text-neutral-400 italic font-normal text-sm sm:text-base border-l border-neutral-800 pl-4 mt-8">
                    Outside of backend engineering and web optimization, I write
                    and compose music across piano and guitar, blending
                    algorithmic logic with sonic creativity.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Developer;
