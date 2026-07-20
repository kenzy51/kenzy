import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { Check, Copy, Github, Linkedin, Globe } from "lucide-react";
import { sanityClient, urlFor } from "@/lib/sanity";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import Container from "@/shared/ui/container/Container";

// Import a performant syntax highlighter to properly render code snippets
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// Dark theme that cleanly integrates with a pure black background design
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

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
          <div className="w-full overflow-x-auto text-sm">
            <SyntaxHighlighter
              language={language.toLowerCase()}
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                padding: "1.5rem",
                background: "rgba(0, 0, 0, 0.4)",
                fontSize: "0.875rem",
                lineHeight: "1.625",
              }}
            >
              {codeString}
            </SyntaxHighlighter>
          </div>
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
    code: ({ children }) => (
      <code className="px-1.5 py-0.5 rounded bg-neutral-900 text-cyan-400 border border-neutral-800 font-mono text-sm">
        {children}
      </code>
    ),
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

  const ui = {
    en: { 
      backBtn: "← BACK_TO_LOGS", 
      terminateBtn: "← TERMINATE_VIEW",
      aboutAuthor: "About the Author",
      authorBio: "Product-minded Full-Stack Engineer specializing in high-performance web applications, scalable multi-tenant SaaS systems, and low-latency AI integrations."
    },
    ru: { 
      backBtn: "← НАЗАД К СТАТЬЯМ", 
      terminateBtn: "← ЗАКРЫТЬ ПРОСМОТР",
      aboutAuthor: "Об авторе",
      authorBio: "Продуктовый Full-Stack инженер, специализирующийся на высокопроизводительных веб-приложениях, масштабируемой архитектуре multi-tenant SaaS и AI-интеграциях с низкой задержкой."
    }
  }[currentLang] || { backBtn: "← BACK_TO_LOGS", terminateBtn: "← TERMINATE_VIEW", aboutAuthor: "About the Author", authorBio: "" };

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
                url: productionDomain,
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

            {/* 🔥 NEW: Author Info Card Block */}
            <div className="mt-20 p-6 rounded-xl border border-neutral-800/60 bg-neutral-900/30 backdrop-blur-sm flex flex-col sm:flex-row items-center sm:items-start gap-5 shadow-xl">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-neutral-700 shrink-0 shadow-md">
                <Image
                  src="/images/author.jpg" 
                  alt="Kanat Nazarov"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div>
                    <h4 className="text-lg font-bold text-white tracking-tight">
                      Kanat Nazarov
                    </h4>
                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                      Systems & Full-Stack Engineer
                    </span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-end gap-3 text-neutral-400 mt-1 sm:mt-0">
                    <a href="https://github.com/kanatnazarovdev" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                      <Github size={16} />
                    </a>
                    <a href="https://linkedin.com/in/kanatnazarov/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                      <Linkedin size={16} />
                    </a>
                    <a href="https://kanatnazarov.com" className="hover:text-white transition-colors">
                      <Globe size={16} />
                    </a>
                  </div>
                </div>
                <p className="text-sm text-neutral-400 font-light leading-relaxed">
                  {ui.authorBio}
                </p>
              </div>
            </div>

            <footer className="mt-16 pt-8 border-t border-neutral-900 text-xs font-mono text-neutral-500 flex flex-col sm:flex-row justify-between items-center gap-4">
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
  const posts = await sanityClient.fetch(
    `*[_type == "post" && category->slug.current == "tech" && defined(slug.current)]{ "slug": slug.current, language }`,
  );

  const paths = posts.map((post: { slug: string; language: string }) => ({
    params: { slug: post.slug },
    locale: post.language || "en", 
  }));

  return {
    paths,
    fallback: "blocking",
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