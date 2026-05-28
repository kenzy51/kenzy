import React from 'react';
import Link from 'next/link';
import { sanityClient } from "@/lib/sanity";
import { GetStaticProps } from "next";

// Define the shape of your posts
interface Post {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  slug: string;
  date: string;
}

interface LifestyleProps {
  lifestylePosts: Post[];
}

export default function LifestyleJournal({ lifestylePosts }: LifestyleProps) {
  return (
    <div className="relative z-[9999] min-h-screen bg-[#FAF7F2] text-[#1C1A17] antialiased selection:bg-[#EFE9DC] selection:text-[#3B533E]">
      
      {/* 1. ELITE EDITORIAL HEADER */}
      <header className="sticky top-0 bg-[#FAF7F2]/90 backdrop-blur-md z-[10000] border-b border-[#EFEBE3]">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <Link href="/lifestyle" className="group">
            <span className="text-xl tracking-[0.2em] font-black uppercase text-[#1C1A17]">
              KANAT <span className="text-[#3B533E] font-bold tracking-[0.1em] lowercase bg-[#EFE9DC] px-2 py-0.5 rounded ml-1">insights</span>
            </span>
          </Link>
          <Link href="/" className="text-[9px] font-bold tracking-widest uppercase border border-[#1C1A17] px-5 py-2.5 hover:bg-[#1C1A17] hover:text-[#FAF7F2] transition-all">
            Dev Portfolio
          </Link>
        </div>
      </header>

      {/* 2. CINEMATIC HERO BLOCK */}
      <section className="w-full bg-[#111215] text-[#FAF7F2] py-24 border-b border-[#1C1D21]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="text-[9px] font-bold tracking-[0.4em] uppercase text-[#7D8A7F] mb-6 block">Human Execution Log // 2026</span>
          <h1 className="text-5xl md:text-7xl font-light tracking-[0.02em] uppercase mb-8">Lifestyle.</h1>
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#9A9DA3] font-medium leading-relaxed max-w-lg mx-auto">
            Calculated biohacking, architectural sound design, and physiological precision.
          </p>
        </div>
      </section>

      {/* 3. EDITORIAL GRID - IMPROVED STYLING */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {lifestylePosts.map((entry) => (
            <article key={entry.id} className="group flex flex-col bg-white border border-[#EFEBE3] p-5 hover:border-[#3B533E]/30 transition-all duration-500">
              
              {/* Image Placeholder with Category Tint */}
              <div className="aspect-[16/11] w-full bg-[#FAF7F2] mb-6 border border-[#EFEBE3]/50 flex items-center justify-center">
                <span className="text-[9px] tracking-[0.3em] uppercase font-bold text-[#C7C3BB]">
                  {entry.category === 'Sonic Architecture' ? '💿 ACOUSTIC LOG' : `⚡ BIO-DATA ACTIVE`}
                </span>
              </div>

              {/* Entry Meta */}
              <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-[#3B533E] mb-3 block">
                {entry.category}
              </span>

              {/* Title */}
              <h3 className="text-lg font-bold tracking-tight text-[#1C1A17] leading-tight mb-4 group-hover:text-[#3B533E] transition-colors">
                <Link href={`/lifestyle/${entry.slug}`}>{entry.title}</Link>
              </h3>

              {/* Excerpt */}
              <p className="text-[#5A564E] text-xs leading-relaxed font-normal mb-8 flex-grow">
                {entry.excerpt}
              </p>

              {/* Card Footer */}
              <div className="border-t border-[#EFEBE3] pt-4 flex justify-between items-center text-[9px] font-bold tracking-[0.2em] uppercase text-[#9A958C]">
                <span>{new Date(entry.date).toLocaleDateString()}</span>
                <Link href={`/lifestyle/${entry.slug}`} className="text-[#1C1A17] flex items-center hover:translate-x-1 transition-transform">
                  LOG →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const query = `*[_type == "post" && category->slug.current in ["performance", "nutrition", "sonic-architecture"]] | order(date desc) {
    "id": _id,
    "category": category->title,
    title,
    excerpt,
    "slug": slug.current,
    "date": date
  }`;
  const lifestylePosts = await sanityClient.fetch(query);
  return { props: { lifestylePosts }, revalidate: 60 };
};