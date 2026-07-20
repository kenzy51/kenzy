"use client";

import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { sanityClient, urlFor } from "@/lib/sanity";
import { GetStaticProps } from "next";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export interface SanityPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readTime: string;
  image: any;
  keywords: string[];
}

interface BlogProps {
  posts: SanityPost[];
}

export default function Blog({ posts }: BlogProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!posts || posts.length === 0) return;

    // Контекст GSAP для безопасной очистки эффектов
    const ctx = gsap.context(() => {
      // 1. Анимация появления хедера
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power4.out" }
      );

      // 2. Каскадное появление карточек статей (Stagger)
      const articles = gridRef.current?.querySelectorAll("article");
      if (articles && articles.length > 0) {
        gsap.fromTo(
          articles,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.12, // Задержка между появлением каждой карточки
            delay: 0.15,
          }
        );
      }
    });

    return () => ctx.revert();
  }, [posts]);

  // 3. Интерактивный 3D-Tilt эффект при движении мыши по обложке
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Расчет углов наклона (макс 8 градусов для сдержанного стиля)
    const rotateX = -(y / (rect.height / 2)) * 8;
    const rotateY = (x / (rect.width / 2)) * 8;

    gsap.to(el, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  // Сброс наклона при уходе мыши
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  return (
    <>
      <Head>
        <title>Engineering Blog & Full-Stack Insights | Kanat Nazarov</title>
        <meta
          name="description"
          content="Practical tutorials and project retrospectives on Next.js, React, NestJS, and building fast web applications by Kanat Nazarov."
        />
        <meta
          name="keywords"
          content="Kanat Nazarov blog, Next.js architecture blog, conversational AI engineer, full stack developer tutorials, technical SGE optimization"
        />
        <link rel="canonical" href="https://kanatnazarov.com/blog" />
      </Head>

      <div
        className="min-h-screen bg-[#0A0A0A] text-white relative pt-32 pb-32 px-4 sm:px-8 md:px-16 lg:px-24 overflow-hidden"
        style={{
          fontFamily: "var(--font-brandon), 'Brandon Grotesque', sans-serif",
        }}
      >
        <div className="max-w-6xl mx-auto relative z-10">
          <header 
            ref={headerRef} 
            className="mb-24 text-left max-w-3xl border-b border-neutral-900 pb-10 opacity-0"
          >
            <p className="text-cyan-400 font-mono tracking-[0.2em] uppercase text-xs mb-3 font-bold">
              Tech Stack & Project Retrospectives
            </p>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white uppercase leading-tight mb-4">
              Engineering <br />& Growth
            </h1>
            <p className="text-neutral-400 text-base sm:text-lg font-normal leading-relaxed tracking-wide">
              Practical guides and case studies on building fast web
              applications, optimizing full-stack codebases, and implementing
              real-world AI tools that drive actual business results.
            </p>
          </header>

          {!posts || posts.length === 0 ? (
            <div className="text-left py-16 border-t border-neutral-900 font-mono text-sm tracking-wider text-neutral-500">
              No articles found. Deploy a post via your studio dashboard to
              view.
            </div>
          ) : (
            <div 
              ref={gridRef}
              className="grid gap-x-8 gap-y-16 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start"
            >
              {posts.map((post, index) => (
                <article key={post.slug} className="group opacity-0">
                  <Link href={`/blog/${post.slug}`} className="block space-y-4">
                    
                    {/* Контейнер обложки с 3D-эффектом и аппаратным ускорением */}
                    <div 
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                      className="w-full relative aspect-[16/10] bg-[#121212] overflow-hidden rounded-lg border border-neutral-900 transition-colors duration-300 group-hover:border-neutral-800 shadow-xl will-change-transform select-none"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {post.image ? (
                        <Image
                          src={urlFor(post.image).width(600).height(375).url()}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 scale-100 group-hover:scale-[1.04]"
                          sizes="(max-w-md) 100vw, 33vw"
                          priority={index < 3}
                        />
                      ) : (
                        <div className="w-full h-full bg-neutral-950 flex items-center justify-center font-mono text-xs text-neutral-800">
                          IMAGE_PLACEHOLDER
                        </div>
                      )}
                    </div>

                    {/* Метаданные и Типографика */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-neutral-500 uppercase">
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </time>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>

                      <h2 className="text-xl font-bold tracking-tight text-white uppercase group-hover:text-cyan-400 transition-colors duration-200">
                        {post.title}
                      </h2>

                      <p className="text-neutral-400 font-normal text-sm leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<BlogProps> = async ({ locale }) => {
  const currentLocale = locale || "en";

  const query = `*[_type == "post" && category->slug.current == "tech" && language == $lang] | order(date desc) {
    "slug": slug.current,
    title,
    date,
    excerpt,
    "category": category->title,
    image,
    "readTime": select(
      round(string::length(pt::text(body)) / 5 / 200) <= 1 => "1 min read",
      string(round(string::length(pt::text(body)) / 5 / 200)) + " min read"
    )
  }`;

  try {
    const posts = await sanityClient.fetch(query, { lang: currentLocale });
    
    return {
      props: {
        posts: posts || [],
      },
      revalidate: 60,
    };
  } catch (err) {
    console.error("Sanity fetch error in blog index:", err);
    return { props: { posts: [] }, revalidate: 10 };
  }
};