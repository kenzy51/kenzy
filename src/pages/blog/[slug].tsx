import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { sanityClient, urlFor } from "@/lib/sanity";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import Container from "@/shared/ui/container/Container";

interface PostProps {
  post: {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    keywords: string[];
    image: any;
    body: any;
    readTime: string;
    author?: string;
    language: string;
  };
}

const makeCustomComponents = (): PortableTextComponents => ({
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      return (
        <div className="my-10 rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || "Architecture visualization block"}
            width={1200}
            height={675}
            sizes="(max-w-4xl) 100vw"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>
      );
    },
    code: ({ value }) => {
      const [copied, setCopied] = useState(false);
      const language = value.language || "typescript";
      const codeString = value.code || "";

      const executeCopy = () => {
        navigator.clipboard.writeText(codeString);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      };

      return (
        <div className="relative my-10 rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800/80 shadow-2xl font-mono text-sm">
          <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-900/60 border-b border-neutral-800/80 text-xs text-neutral-400">
            <span className="uppercase tracking-wider font-semibold">
              {language}
            </span>
            <button
              onClick={executeCopy}
              className="flex items-center gap-1.5 hover:text-white transition-colors duration-200"
            >
              {copied ? (
                <>
                  <Check size={13} className="text-cyan-400" />
                  <span className="text-cyan-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-6 overflow-x-auto text-neutral-300 leading-relaxed text-sm bg-black/40">
            <code>{codeString}</code>
          </pre>
        </div>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-12 mb-4 font-sans">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mt-8 mb-3 font-sans">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-neutral-300 font-light leading-relaxed mb-6 text-[18px] md:text-[20px]">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-cyan-400 pl-5 italic text-neutral-400 my-8 bg-neutral-950/40 py-1 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 my-6 space-y-2 text-neutral-300 font-light text-base md:text-lg">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 my-6 space-y-3 text-neutral-300 font-light text-base md:text-lg">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="marker:text-cyan-500">{children}</li>
    ),
    number: ({ children }) => (
      <li className="marker:text-cyan-400 marker:font-mono marker:text-sm">
        {children}
      </li>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const isExternal = !value.href.startsWith("/");
      return (
        <a
          href={value.href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 decoration-cyan-500/30 transition-colors font-medium"
        >
          {children}
        </a>
      );
    },
  },
});

export default function Post({ post }: PostProps) {
  const components = makeCustomComponents();
  const { locale, asPath } = useRouter();
  const currentLang = locale || "en";

  if (!post) {
    return (
      <div className="text-center py-32 text-neutral-500 font-mono text-base bg-black min-h-screen">
        Execution Fallback: Target Context Reference Missing.
      </div>
    );
  }

  const productionDomain = "https://kanatnazarov.com";
  const canonicalUrl = `${productionDomain}${currentLang === 'en' ? '' : '/' + currentLang}${asPath}`;

  // Локализация интерфейсных строк самого шаблона статьи
  const ui = {
    en: { backBtn: "← BACK_TO_LOGS", terminateBtn: "← TERMINATE_VIEW" },
    ru: { backBtn: "← НАЗАД К СТАТЬЯМ", terminateBtn: "← ЗАКРЫТЬ ПРОСМОТР" }
  }[currentLang] || { backBtn: "← BACK_TO_LOGS", terminateBtn: "← TERMINATE_VIEW" };

  return (
    <>
      <Head>
        <title>{post.title} | Kanat Nazarov</title>
        <meta name="description" content={post.excerpt} />
        {post.keywords && <meta name="keywords" content={post.keywords.join(", ")} />}
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={canonicalUrl} />
        {post.image && (
          <meta property="og:image" content={urlFor(post.image).width(1200).height(630).url()} />
        )}

        <meta name="twitter:card" content="summary_large_image" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TechArticle",
              headline: post.title,
              description: post.excerpt,
              keywords: post.keywords ? post.keywords.join(", ") : "",
              datePublished: post.date,
              url: canonicalUrl,
              author: {
                "@type": "Person",
                name: post.author || "Kanat Nazarov",
                url: productionDomain, // 🔥 ИСПРАВЛЕНО: убран vercel.app
              },
            }),
          }}
        />
      </Head>

      <div className="min-h-screen bg-black text-neutral-100 py-16 md:py-24 mt-12">
        <Container>
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center text-sm font-mono text-neutral-400 hover:text-cyan-400 mb-12 transition-colors group"
            >
              {ui.backBtn}
            </Link>

            <header className="mb-14">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-white leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-neutral-400 uppercase tracking-wider">
                <time>
                  {new Date(post.date).toLocaleDateString(currentLang, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span className="text-neutral-700">•</span>
                <span className="text-neutral-300">{post.readTime}</span>
                <span className="text-neutral-700">•</span>
                <span className="text-neutral-400 font-bold">
                  {post.author || "KANAT NAZAROV"}
                </span>
              </div>
            </header>

            {post.image && (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-neutral-900 my-10 shadow-xl">
                <Image
                  src={urlFor(post.image).url()}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <div className="mt-10">
              <PortableText value={post.body} components={components} />
            </div>

            <footer className="mt-24 pt-8 border-t border-neutral-900 text-xs font-mono text-neutral-500 flex flex-col sm:flex-row justify-between items-center gap-4">
              <Link href="/blog" className="hover:text-cyan-400 transition-colors">
                {ui.terminateBtn}
              </Link>
              <span>
                © {new Date().getFullYear()} KANAT NAZAROV • SYSTEMS SYSTEM
              </span>
            </footer>
          </div>
        </Container>
      </div>
    </>
  );
}
export const getStaticPaths: GetStaticPaths = async () => {
  // Вытаскиваем слаги только тех постов, которые привязаны к техническому блогу ('tech')
  const posts = await sanityClient.fetch(
    `*[_type == "post" && category->slug.current == "tech" && defined(slug.current)]{ "slug": slug.current, language }`,
  );

  // Генерируем пути строго сопоставляя слаг с его родной локалью из Sanity
  const paths = posts.map((post: { slug: string; language: string }) => ({
    params: { slug: post.slug },
    locale: post.language || "en", 
  }));

  return {
    paths,
    fallback: "blocking", // На случай динамического добавления новых постов без пересборки
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const currentLocale = locale || "en";

  const query = `*[_type == "post" && category->slug.current == "tech" && slug.current == $slug && language == $lang][0]{
    "slug": slug.current,
    title,
    date,
    excerpt,
    keywords,
    image,
    body,
    language,
    "author": author->name,
    "readTime": select(
      round(string::length(pt::text(body)) / 5 / 200) <= 1 => "1 min read",
      string(round(string::length(pt::text(body)) / 5 / 200)) + " min read"
    )
  }`;

  const post = await sanityClient.fetch(query, { 
    slug: params?.slug, 
    lang: currentLocale 
  });

  // Если статья для данной локали не найдена, отдаем штатную 404 страницу Next.js
  // Это предотвращает падение компилятора при сборке мультиязычных роутов
  if (!post) {
    return {
      notFound: true,
      revalidate: 60,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};