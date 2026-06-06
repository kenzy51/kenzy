"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { sanityClient, urlFor } from "@/lib/sanity";
import { GetStaticProps } from "next";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Post {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  image: any;
  readTime: number;
}

interface LifestyleProps {
  lifestylePosts: Post[];
}

export default function LifestyleJournal({ lifestylePosts }: LifestyleProps) {
  const { locale, asPath } = useRouter();
  const currentLang = locale || "en";
  const mainRef = useRef<HTMLDivElement>(null);

  const content = {
    en: {
      title: "Lifestyle & Performance Matrix",
      description: "Calculated biohacking, architectural sound design, and physiological precision logs engineered by Kanat Nazarov.",
      logTag: "Human Execution Log // 2026",
      read: "MIN READ",
      heading: "Recent System Logs",
      explore: "Explore the Journal",
    },
    ru: {
      title: "Образ жизни и эффективность",
      description: "Расчетный биохакинг, архитектурный звуковой дизайн и логи физиологической точности от Каната Назарова.",
      logTag: "Лог выполнения человека // 2026",
      read: "МИН ЧТЕНИЯ",
      heading: "Последние системные логи",
      explore: "Исследовать журнал",
    },
  };

  const t = content[currentLang as keyof typeof content] || content.en;
  const canonicalUrl = `https://kanatnazarov.com/${currentLang}${asPath === "/" ? "" : asPath}`;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": t.title,
    "description": t.description,
    "url": canonicalUrl,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": lifestylePosts.map((post, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `https://kanatnazarov.com/${currentLang}/lifestyle/${post.slug}`,
        "name": post.title
      }))
    }
  };

  // 🧠 GSAP Кинематографичные анимации
  useGSAP(() => {
    // 1. Появление Hero-секции при загрузке
    const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });
    
    heroTl
      .fromTo(".journal-hero-bg", 
        { scale: 1.05, filter: "brightness(0.3)" },
        { scale: 1, filter: "brightness(0.5)", duration: 2, ease: "power3.out" }
      )
      .fromTo(".journal-hero-reveal", 
        { opacity: 0, y: 35, filter: "blur(4px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.4, stagger: 0.15 },
        "-=1.4"
      );

    // 2. Появление карточек журнала по ходу мягкого скролла
    const articles = gsap.utils.toArray(".editorial-card");
    articles.forEach((card: any) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%", // Мягкое появление при подходе к нижней части экрана
            toggleActions: "play none none none"
          }
        }
      );
      // Бесконечная анимация движения неба
    gsap.fromTo(".journal-hero-sky-layer",
      { xPercent: -5, yPercent: -5 },
      {
        xPercent: 5,
        yPercent: 5,
        duration: 18, // Медленное, премиальное движение
        repeat: -1, // Бесконечно
        yoyo: true, // Двигаться туда-обратно
        ease: "sine.inOut" // Мягкая кривая плавности
      }
    );
    });

    // 3. Параллакс эффект для обложек (Эффект "живого" глянцевого журнала)
    const images = gsap.utils.toArray(".parallax-img-wrap img");
    images.forEach((img: any) => {
      gsap.fromTo(img,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true // Движение картинки синхронизировано со скоростью скролла
          }
        }
      );
    });

  }, { scope: mainRef });

  return (
    <div ref={mainRef}>
      <Head>
        <title>{t.title} | Kanat Nazarov</title>
        <meta name="description" content={t.description} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="en" href="https://kanatnazarov.com/en/lifestyle" />
        <link rel="alternate" hrefLang="ru" href="https://kanatnazarov.com/ru/lifestyle" />
        <link rel="alternate" hrefLang="x-default" href="https://kanatnazarov.com/en/lifestyle" />
        <meta property="og:title" content={`${t.title} | Kanat Nazarov`} />
        <meta property="og:description" content={t.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://kanatnazarov.com/images/lifestyle.png" />
        <meta property="og:site_name" content="Kanat Nazarov Portfolio" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      </Head>

      {/* 🏛️ EDITORIAL JOURNAL HERO */}
      <div className="relative z-[49] min-h-screen bg-[#FAF7F2] text-[#1C1A17] antialiased selection:bg-[#3B533E]/10 select-text">
      <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden">
          {/* --- ДОБАВЛЕННЫЙ СЛОЙ НЕБА С АНИМАЦИЕЙ ДВИЖЕНИЯ --- */}
          <div className="absolute inset-x-0 -top-16 z-[-1] overflow-hidden">
            <Image
              src="/images/lifestyle-sky.png" // Убедись, что этот файл существует в public/images/
              alt="Live Cinematic Sky"
              fill
              className="journal-hero-sky-layer object-cover will-change-transform scale-[1.2] opacity-80"
              sizes="100vw"
            />
          </div>

          <div className="absolute inset-0 z-0 overflow-hidden">
            <Image
              src="/images/lifestyle.png"
              alt={`${t.title} Hero Background`}
              fill
              className="journal-hero-bg object-cover will-change-transform"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-[#FAF7F2]" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center mt-12">
            <span className="journal-hero-reveal text-[10px] font-bold tracking-[0.45em] uppercase text-[#FAF7F2]/60 mb-6 block font-mono">
              {t.logTag}
            </span>
            <h1 className="journal-hero-reveal text-[clamp(32px,6vw,72px)] font-extralight tracking-tight uppercase mb-8 text-[#FAF7F2] leading-[1.1] max-w-4xl mx-auto">
              {t.title}
            </h1>
            <div className="journal-hero-reveal w-[1px] h-16 bg-[#FAF7F2]/30 mx-auto" />
          </div>
        </section>
        <h2 className="sr-only">{t.heading}</h2>

        {/* 📚 EDITORIAL ASYMMETRIC GRID (Шахматная ломаная журнальная сетка) */}
        <main className="max-w-6xl mx-auto px-6 py-28 sm:py-36">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-24 sm:gap-y-36">
            {lifestylePosts.map((entry, index) => {
              // Кастомная логика колонок для создания дорогого журнального ритма
              let gridClasses = "md:col-span-6"; // Дефолт (2 в ряд)
              if (index % 3 === 0) {
                gridClasses = "md:col-span-12 max-w-4xl mx-auto text-center md:mb-12"; // Каждый 3-й пост — акцентный по центру
              } else if (index % 3 === 1) {
                gridClasses = "md:col-span-7 md:pr-6"; // Смещение влево
              } else {
                gridClasses = "md:col-span-5 md:mt-24"; // Смещение вправо со сдвигом вниз
              }

              return (
                <article
                  key={entry.id}
                  className={`editorial-card group flex flex-col items-start ${gridClasses}`}
                >
                  {/* Контейнер картинки с внутренним параллаксом */}
                  <div className="parallax-img-wrap aspect-[16/10] w-full bg-[#FAF7F2] mb-8 overflow-hidden relative border border-[#EFEBE3]">
                    {entry.image && (
                      <Image
                        src={urlFor(entry.image).width(1200).height(800).url()}
                        alt={`Cover image for ${entry.title}`}
                        fill
                        sizes="(max-w-6xl) 100vw, 50vw"
                        className="object-cover w-full h-full scale-[1.1] will-change-transform"
                      />
                    )}
                    {/* Мягкий оверлей при наведении */}
                    <div className="absolute inset-0 bg-[#3B533E]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <div className={`w-full ${index % 3 === 0 ? "flex flex-col items-center" : "text-left"}`}>
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#3B533E] mb-4 block font-mono">
                      {entry.category}
                    </span>

                    <h2 className="text-[24px] sm:text-[28px] font-light tracking-tight text-[#1C1A17] mb-4 leading-tight max-w-2xl group-hover:text-[#3B533E] transition-colors duration-300">
                      <Link href={`/lifestyle/${entry.slug}`}>{entry.title}</Link>
                    </h2>

                    <p className="text-[#5A564E] text-[15px] leading-relaxed font-light mb-6 max-w-xl opacity-90">
                      {entry.excerpt}
                    </p>

                    <div className="w-full pt-4 border-t border-[#EFEBE3] flex justify-between items-center text-[10px] font-medium tracking-[0.2em] uppercase text-[#9A958C]">
                      <span>
                        <time dateTime={new Date(entry.date).toISOString()}>
                          {new Date(entry.date).toLocaleDateString(currentLang, { year: 'numeric', month: 'short', day: 'numeric' })}
                        </time>
                        <span className="mx-2.5 opacity-40">•</span>
                        {entry.readTime || 1} {t.read}
                      </span>
                      <Link
                        href={`/lifestyle/${entry.slug}`}
                        className="text-[#1C1A17] font-semibold tracking-[0.25em] hover:text-[#3B533E] group-hover:translate-x-1 transition-all duration-300 flex items-center gap-1"
                      >
                        READ LOG <span className="font-sans">→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const lang = locale || "en";

  const query = `*[_type == "post" && category->title == "Lifestyle & Performance" && language == $lang] | order(date desc) {
    "id": _id,
    "category": category->title,
    title,
    excerpt,
    "slug": slug.current,
    "date": date,
    image,
    "readTime": coalesce(round(length(pt::text(body)) / 5 / 200), 1)
  }`;

  const lifestylePosts = await sanityClient.fetch(query, { lang });

  return {
    props: {
      lifestylePosts: lifestylePosts || [],
    },
    revalidate: 60,
  };
};