"use client";

import React, { useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import Developer from "@/widgets/developerPage/Developers";
import Skills from "@/widgets/developerPage/Skillset/Skills";
import Experience from "@/widgets/developerPage/ExperienceHistory/Experience";
import Portfolio from "@/widgets/developerPage/Portfolio/Portfolio";
import Script from "next/script";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Index() {
  const { locale, asPath } = useRouter();
  const currentLang = locale || "en";
  const pageWrapperRef = useRef<HTMLDivElement>(null);
  
  const productionDomain = "https://kanatnazarov.com";
  const currentPath = asPath === "/" ? "" : asPath;
  const canonicalUrl = `${productionDomain}${currentLang === 'en' ? '' : '/' + currentLang}${currentPath}`;

  const content = {
    en: {
      title: "Kanat Nazarov | Full-Stack Engineer & Digital Creator",
      description: "Kanat Nazarov — Full-Stack Engineer, Automation Architect, and Digital Creator based in New York City. Engineering ultra-low latency full-stack systems, autonomous AI pipelines, and high-impact digital experiences.",
    },
    ru: {
      title: "Канат Назаров | Full-Stack Инженер и Digital Создатель",
      description: "Канат Назаров — Full-Stack разработчик, архитектор автоматизаций и цифровой творец из Нью-Йорка. Проектирование высоконагруженных систем, автономных ИИ-агентов и креативного софта.",
    }
  };

  const t = content[currentLang as keyof typeof content] || content.en;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Kanat Nazarov",
    "alternateName": "Kenzy",
    "jobTitle": "Full-Stack Engineer & Digital Creator",
    "url": productionDomain,
    "image": `${productionDomain}/og-image.jpg`,
    "sameAs": [
      "https://github.com/kenzy51",
      "https://www.linkedin.com/in/kanatnazarov"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "New York City",
      "addressRegion": "NY",
      "addressCountry": "US"
    },
    "knowsAbout": [
      "Full-Stack Software Engineering",
      "Next.js & React 19 Architecture",
      "NestJS & TypeScript Systems",
      "Conversational AI Voice Infrastructure",
      "Technical SEO & SGE Optimization",
      "Systems Automation",
      "Audio Production & Sound Design"
    ]
  };

  // 🚀 ИНИЦИАЛИЗАЦИЯ PREMUM SMOOTH SCROLL (LENIS + GSAP)
  useGSAP(() => {
    const lenis = new Lenis({
      duration: 0.8,          // Время анимации доводки скролла (в секундах)
      // @ts-ignore
      ease: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Физическая кривая плавности (Exponential decay)
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,      // Плавный скролл колесиком мыши
      wheelMultiplier: 1,     // Множитель скорости скролла
      infinite: false,
    });

    // Синхронизируем Lenis с обновлениями GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Добавляем тикер GSAP, чтобы скролл обновлялся с частотой экрана (60fps/120fps/144fps)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // Переводим секунды тикера в миллисекунды для Lenis
    });

    // Отключаем лаги сглаживания при резких скачках
    gsap.ticker.lagSmoothing(0);

    // Очистка при размонтировании страницы (Best Practice для предотвращения утечек памяти)
    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, { scope: pageWrapperRef });

  return (
    <div ref={pageWrapperRef}>
      <Head>
        <title>{t.title}</title>
        <meta name="description" content={t.description} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={canonicalUrl} />

        <link rel="alternate" hrefLang="en" href="https://kanatnazarov.com/en" />
        <link rel="alternate" hrefLang="ru" href="https://kanatnazarov.com/ru" />
        <link rel="alternate" hrefLang="x-default" href="https://kanatnazarov.com/en" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Kanat Nazarov" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={t.title} />
        <meta property="og:description" content={t.description} />
        <meta property="og:image" content={`${productionDomain}/og-image.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.title} />
        <meta name="twitter:description" content={t.description} />
        <meta name="twitter:image" content={`${productionDomain}/og-image.jpg`} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
         <Script id="fusion-ai-config" strategy="afterInteractive">
          {`window.FusionAIChatConfig = { tenantSlug: "kanat" };`}
        </Script>
        
        <Script
          src="https://fusion-chat-production.vercel.app/embed.js"
          strategy="afterInteractive"
        />
      </Head>

      {/* Оборачиваем все блоки в семантический тег main */}
      <main>
        <Developer />
        <Skills />
        <Experience />
        <Portfolio />
      </main>
    </div>
  );
}

// SSR локализация остается без изменений
export async function getStaticProps(context: any) {
  const currentLocale = context.locale || "en";
  
  return {
    props: {
      messages: (await import(`../../messages/${currentLocale}`)).default,
    },
  };
}