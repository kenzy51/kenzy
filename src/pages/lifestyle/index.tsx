import React from "react";
import Link from "next/link";
import { sanityClient, urlFor } from "@/lib/sanity";
import { GetStaticProps } from "next";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";

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
  const { locale } = useRouter();

  // Localized content object
  const content = {
    en: {
      title: "Lifestyle & Performance",
      description:
        "Calculated biohacking, architectural sound design, and physiological precision logs by Kanat Nazarov.",
      logTag: "Human Execution Log // 2026",
      read: "MIN READ",
    },
    ru: {
      title: "Образ жизни и эффективность",
      description:
        "Расчетный биохакинг, архитектурный звуковой дизайн и логи физиологической точности от Каната Назарова.",
      logTag: "Лог выполнения человека // 2026",
      read: "МИН ЧТЕНИЯ",
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  return (
    <>
      <Head>
        <title>{t.title} | Kanat Nazarov</title>
        <meta name="description" content={t.description} />
        <meta property="og:title" content={t.title} />
        <meta property="og:description" content={t.description} />
        <meta property="og:type" content="website" />
        <link
          rel="alternate"
          hrefLang="en"
          href="https://yourdomain.com/lifestyle"
        />
        <link
          rel="alternate"
          hrefLang="ru"
          href="https://yourdomain.com/ru/lifestyle"
        />
      </Head>

      <div className="relative z-[49] min-h-screen bg-[#FAF7F2] text-[#1C1A17] antialiased">
        <section className="relative w-full overflow-hidden border-b border-[#1C1D21] min-h-[60vh] flex items-center justify-center py-20">
          {/* Background Image Container */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/kanat2.png"
              alt="Hero Background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-[#111215]/80 backdrop-blur-[2px]" />
          </div>

          {/* Content Layer */}
          <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
            <span className="text-[9px] md:text-[10px] font-bold tracking-[0.4em] uppercase text-[#7D8A7F] mb-4 block">
              {t.logTag}
            </span>
            <h1 className="text-4xl md:text-7xl font-light tracking-[0.02em] uppercase mb-6 text-[#FAF7F2] leading-tight">
              {t.title}
            </h1>
            {/* Subtle decorative line */}
            <div className="w-12 h-[1px] bg-[#3B533E] mx-auto" />
          </div>
        </section>

        <main className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {lifestylePosts.map((entry) => (
              <article
                key={entry.id}
                className="group flex flex-col bg-white border border-[#EFEBE3] p-5 hover:border-[#3B533E]/30 transition-all duration-500"
              >
                <div className="aspect-[16/11] w-full bg-[#FAF7F2] mb-6 border border-[#EFEBE3]/50 overflow-hidden">
                  {entry.image && (
                    <Image
                      src={urlFor(entry.image).width(600).height(400).url()}
                      alt={entry.title}
                      width={600}
                      height={400}
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>

                <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-[#3B533E] mb-3 block">
                  {entry.category}
                </span>

                <h3 className="text-[20px] uppercase font-bold tracking-tight text-[#000000] mb-4 group-hover:text-[#3B533E] transition-colors">
                  <Link href={`/lifestyle/${entry.slug}`}>{entry.title}</Link>
                </h3>

                <p className="text-[#5A564E] text-s leading-relaxed mb-8 flex-grow">
                  {entry.excerpt}
                </p>

                <div className="border-t border-[#EFEBE3] pt-4 flex justify-between items-center text-[9px] font-bold tracking-[0.2em] uppercase text-[#9A958C]">
                  <span>
                    {new Date(entry.date).toLocaleDateString(locale)}
                    <span className="mx-2">•</span>
                    {entry.readTime} {t.read}
                  </span>
                  <Link
                    href={`/lifestyle/${entry.slug}`}
                    className="text-[#1C1A17] hover:translate-x-1 transition-transform"
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
    image,
    "readTime": round(length(pt::text(body)) / 5 / 200)
  }`;

  const lifestylePosts = await sanityClient.fetch(query, { lang });

  return {
    props: {
      lifestylePosts: lifestylePosts || [],
    },
    revalidate: 60,
  };
};
