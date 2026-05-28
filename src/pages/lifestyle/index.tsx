import React from "react";
import Link from "next/link";
import { sanityClient, urlFor } from "@/lib/sanity";
import { GetStaticProps } from "next";
import Image from "next/image";
import Head from "next/head"; // ADD THIS
// Define the shape of your posts
interface Post {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  image: any; // Add this
}

interface LifestyleProps {
  lifestylePosts: Post[];
}

export default function LifestyleJournal({ lifestylePosts }: LifestyleProps) {
  return (
    <>
      <Head>
        <title>Lifestyle & Performance | Kanat Nazarov</title>
        <meta
          name="description"
          content="Calculated biohacking, architectural sound design, and physiological precision logs by Kanat Nazarov."
        />
        <meta
          property="og:title"
          content="Lifestyle & Performance | Kanat Nazarov"
        />
        <meta
          property="og:description"
          content="Explore logs on biohacking, sound design, and physiological precision."
        />
        <meta property="og:type" content="website" />
      </Head>
      <div className="relative z-[49] min-h-screen bg-[#FAF7F2] text-[#1C1A17] antialiased selection:bg-[#EFE9DC] selection:text-[#3B533E]">
        <section className="w-full bg-[#111215] text-[#FAF7F2]  border-b border-[#1C1D21] pt-24 pb-12">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <span className="text-[9px] font-bold tracking-[0.4em] uppercase text-[#7D8A7F] mb-6 block">
              Human Execution Log // 2026
            </span>
            <h1 className="text-5xl md:text-7xl font-light tracking-[0.02em] uppercase mb-8">
              Lifestyle.
            </h1>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#9A9DA3] font-medium leading-relaxed max-w-lg mx-auto">
              Calculated biohacking, architectural sound design, and
              physiological precision.
            </p>
          </div>
        </section>

        {/* 3. EDITORIAL GRID - IMPROVED STYLING */}
        <main className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {lifestylePosts.map((entry) => (
              <article
                key={entry.id}
                className="group flex flex-col bg-white border border-[#EFEBE3] p-5 hover:border-[#3B533E]/30 transition-all duration-500"
              >
                <div className="aspect-[16/11] w-full bg-[#FAF7F2] mb-6 border border-[#EFEBE3]/50 overflow-hidden">
                  {entry.image ? (
                    <Image
                      src={urlFor(entry.image).width(600).height(400).url()}
                      alt={entry.title}
                      width={600}
                      height={400}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-[9px] tracking-[0.3em] uppercase font-bold text-[#C7C3BB]">
                        {entry.category === "Lifestyle & Performance"
                          ? "💿 ACOUSTIC LOG"
                          : `⚡ BIO-DATA ACTIVE`}
                      </span>
                    </div>
                  )}
                </div>

                {/* Entry Meta */}
                <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-[#3B533E] mb-3 block">
                  {entry.category}
                </span>

                {/* Title */}
                <h3 className="text-lg font-bold tracking-tight text-[#000000] leading-tight mb-4 group-hover:text-[#3B533E] transition-colors">
                  <Link href={`/lifestyle/${entry.slug}`}>{entry.title}</Link>
                </h3>

                {/* Excerpt */}
                <p className="text-[#5A564E] text-xs leading-relaxed font-normal mb-8 flex-grow">
                  {entry.excerpt}
                </p>

                {/* Card Footer */}
                <div className="border-t border-[#EFEBE3] pt-4 flex justify-between items-center text-[9px] font-bold tracking-[0.2em] uppercase text-[#9A958C]">
                  <span>{new Date(entry.date).toLocaleDateString()}</span>
                  <Link
                    href={`/lifestyle/${entry.slug}`}
                    className="text-[#1C1A17] flex items-center hover:translate-x-1 transition-transform"
                  >
                    LOG →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </main>
      </div>
    </>
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
    image 
  }`;

  const lifestylePosts = await sanityClient.fetch(query, { lang });

  return {
    props: {
      lifestylePosts: lifestylePosts || [],
    },
    revalidate: 60,
  };
};
