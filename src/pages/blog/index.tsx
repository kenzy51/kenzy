import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { sanityClient, urlFor } from "@/lib/sanity";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";

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
  const { locale, asPath } = useRouter();
  const currentLang = locale || "en";

  // Динамические мета-данные для исключения дублирования в Google
  const content = {
    en: {
      title: "Engineering Blog & Full-Stack Insights | Kanat Nazarov",
      description: "Practical tutorials and project retrospectives on Next.js, React, NestJS, and building fast web applications by Kanat Nazarov.",
      tag: "Tech Stack & Project Retrospectives",
      heading: "Engineering \n& Growth",
      subheading: "Practical guides and case studies on building fast web applications, optimizing full-stack codebases, and implementing real-world AI tools that drive actual business results.",
      noPosts: "No articles found. Deploy a post via your studio dashboard to view.",
      readTimeSuffix: "MIN READ"
    },
    ru: {
      title: "Инженерный блог и Full-Stack инсайты | Канат Назаров",
      description: "Практические руководства и ретроспективы проектов по Next.js, React, NestJS и созданию быстрых веб-приложений от Каната Назарова.",
      tag: "Технологический стек и ретроспективы",
      heading: "Инженерия \nи Рост",
      subheading: "Практические руководства и кейсы по созданию быстрых веб-приложений, оптимизации фулстек-кодовой базы и внедрению ИИ-инструментов, приносящих реальные результаты бизнесу.",
      noPosts: "Статьи не найдены. Опубликуйте пост через панель управления Sanity Studio.",
      readTimeSuffix: "МИН ЧТЕНИЯ"
    }
  };

  const t = content[currentLang as keyof typeof content] || content.en;
  const productionDomain = "https://kanatnazarov.com";
  const canonicalUrl = `${productionDomain}${currentLang === 'en' ? '' : '/' + currentLang}${asPath === '/' ? '' : asPath}`;

  return (
    <>
      <Head>
        {/* 🔒 Жесткая привязка мета-тегов к роуту без утечек Vercel */}
        <title>{t.title}</title>
        <meta name="description" content={t.description} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Языковые альтернативы */}
        <link rel="alternate" hrefLang="en" href={`${productionDomain}/en/blog`} />
        <link rel="alternate" hrefLang="ru" href={`${productionDomain}/ru/blog`} />
        <link rel="alternate" hrefLang="x-default" href={`${productionDomain}/en/blog`} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Kanat Nazarov" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={t.title} />
        <meta property="og:description" content={t.description} />
        <meta property="og:image" content={`${productionDomain}/og-image.jpg`} />
        
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div
        className="min-h-screen bg-[#0A0A0A] text-white relative pt-32 pb-32 px-4 sm:px-8 md:px-16 lg:px-24"
        style={{
          fontFamily: "var(--font-brandon), 'Brandon Grotesque', sans-serif",
        }}
      >
        <div className="max-w-6xl mx-auto relative z-10">
          <header className="mb-24 text-left max-w-3xl border-b border-neutral-900 pb-10">
            <p className="text-cyan-400 font-mono tracking-[0.2em] uppercase text-xs mb-3 font-bold">
              {t.tag}
            </p>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white uppercase leading-tight mb-4 whitespace-pre-line">
              {t.heading}
            </h1>
            <p className="text-neutral-400 text-base sm:text-lg font-normal leading-relaxed tracking-wide">
              {t.subheading}
            </p>
          </header>

          {!posts || posts.length === 0 ? (
            <div className="text-left py-16 border-t border-neutral-900 font-mono text-sm tracking-wider text-neutral-500">
              {t.noPosts}
            </div>
          ) : (
            <div className="grid gap-x-8 gap-y-16 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start">
              {posts.map((post, index) => (
                <article key={post.slug} className="group">
                  <Link href={`/blog/${post.slug}`} className="block space-y-4">
                    <div className="w-full relative aspect-[16/10] bg-[#121212] overflow-hidden rounded-lg border border-neutral-900 transition-all duration-300 group-hover:border-neutral-800">
                      {post.image ? (
                        <Image
                          src={urlFor(post.image).width(600).height(375).url()}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 scale-100 group-hover:scale-[1.02]"
                          sizes="(max-w-md) 100vw, 33vw"
                          priority={index < 3}
                        />
                      ) : (
                        <div className="w-full h-full bg-neutral-950 flex items-center justify-center font-mono text-xs text-neutral-800">
                          IMAGE_PLACEHOLDER
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-neutral-500 uppercase">
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString(currentLang, {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </time>
                        <span>•</span>
                        <span>{post.readTime || "1"} {t.readTimeSuffix}</span>
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
  // 🔥 Настраиваем строгий серверный фильтр по языку контента (language == $lang)
  const lang = locale || "en";

  const query = `*[_type == "post" && (category->slug.current == "engineering" || !defined(category)) && language == $lang] | order(date desc) {
    "slug": slug.current,
    title,
    date,
    excerpt,
    "category": category->title,
    image,
    "readTime": coalesce(round(length(pt::text(body)) / 5 / 200), 1)
  }`;

  try {
    const posts = await sanityClient.fetch(query, { lang });
    return {
      props: {
        posts: posts || [],
      },
      revalidate: 60,
    };
  } catch (err) {
    console.error("Sanity language fetch error:", err);
    return { props: { posts: [] }, revalidate: 10 };
  }
};