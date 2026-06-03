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
  const { locale, asPath } = useRouter();
  const currentLang = locale || "en";

  const content = {
    en: {
      title: "Lifestyle & Performance Matrix",
      description:
        "Calculated biohacking, architectural sound design, and physiological precision logs engineered by Kanat Nazarov.",
      logTag: "Human Execution Log // 2026",
      read: "MIN READ",
      heading: "Recent System Logs",
    },
    ru: {
      title: "Образ жизни и эффективность",
      description:
        "Расчетный биохакинг, архитектурный звуковой дизайн и логи физиологической точности от Каната Назарова.",
      logTag: "Лог выполнения человека // 2026",
      read: "МИН ЧТЕНИЯ",
      heading: "Последние системные логи",
    },
  };

  const t = content[currentLang as keyof typeof content] || content.en;
  const canonicalUrl = `https://kanatnazarov.com/${currentLang}${asPath === "/" ? "" : asPath}`;

  // 📊 Динамическая генерация структуры JSON-LD для Google Carousel и Rich Snippets
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

  return (
    <>
      <Head>
        {/* 🔒 Роботы и Каноникал */}
        <title>{t.title} | Kanat Nazarov</title>
        <meta name="description" content={t.description} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={canonicalUrl} />

        {/* 🌎 Мультиязычные альтернативы */}
        <link rel="alternate" hrefLang="en" href="https://kanatnazarov.com/en/lifestyle" />
        <link rel="alternate" hrefLang="ru" href="https://kanatnazarov.com/ru/lifestyle" />
        <link rel="alternate" hrefLang="x-default" href="https://kanatnazarov.com/en/lifestyle" />

        {/* 📊 Open Graph */}
        <meta property="og:title" content={`${t.title} | Kanat Nazarov`} />
        <meta property="og:description" content={t.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://kanatnazarov.com/images/lifestyle.png" />
        <meta property="og:site_name" content="Kanat Nazarov Portfolio" />
        <meta name="twitter:card" content="summary_large_image" />

        {/* 🧠 Внедрение структурированных данных */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>

      <div className="relative z-[49] min-h-screen bg-[#FAF7F2] text-[#1C1A17] antialiased">
        <section className="relative w-full overflow-hidden border-b border-[#1C1D21] min-h-[60vh] flex items-center justify-center py-20">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/lifestyle.png"
              alt={`${t.title} Hero Background`}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[#111215]/80 backdrop-blur-[2px]" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
            <span className="text-[9px] md:text-[10px] font-bold tracking-[0.4em] uppercase text-[#7D8A7F] mb-4 block">
              {t.logTag}
            </span>
            <h1 className="text-4xl md:text-7xl font-light tracking-[0.02em] uppercase mb-6 text-[#FAF7F2] leading-tight">
              {t.title}
            </h1>
            <div className="w-12 h-[1px] bg-[#3B533E] mx-auto" />
          </div>
        </section>

        {/* Скрытый h2 для строгого семантического робот-анализа структуры страницы */}
        <h2 className="sr-only">{t.heading}</h2>

        <main className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {lifestylePosts.map((entry) => (
              <article
                key={entry.id}
                className="group flex flex-col bg-white border border-[#EFEBE3] p-5 hover:border-[#3B533E]/30 transition-all duration-500"
              >
                <div className="aspect-[16/11] w-full bg-[#FAF7F2] mb-6 border border-[#EFEBE3]/50 overflow-hidden relative">
                  {entry.image && (
                    <Image
                      src={urlFor(entry.image).width(600).height(400).url()}
                      alt={`Cover image for ${entry.title}`}
                      fill
                      sizes="(max-w-7xl) 33vw, 100vw"
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  )}
                </div>

                <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-[#3B533E] mb-3 block">
                  {entry.category}
                </span>

                {/* 🎯 Смена с h3 на h2 для корректного дерева разметки (h1 -> h2) */}
                <h2 className="text-[20px] uppercase font-bold tracking-tight text-[#000000] mb-4 group-hover:text-[#3B533E] transition-colors">
                  <Link href={`/lifestyle/${entry.slug}`}>{entry.title}</Link>
                </h2>

                <p className="text-[#5A564E] text-sm leading-relaxed mb-8 flex-grow">
                  {entry.excerpt}
                </p>

                <div className="border-t border-[#EFEBE3] pt-4 flex justify-between items-center text-[9px] font-bold tracking-[0.2em] uppercase text-[#9A958C]">
                  <span>
                    <time dateTime={new Date(entry.date).toISOString()}>
                      {new Date(entry.date).toLocaleDateString(currentLang)}
                    </time>
                    <span className="mx-2">•</span>
                    {entry.readTime || 1} {t.read}
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