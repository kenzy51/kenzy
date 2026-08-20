import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Check, Copy, Github, ExternalLink, ArrowLeft } from "lucide-react";
import { sanityClient, urlFor } from "@/lib/sanity";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import Container from "@/shared/ui/container/Container";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const SyntaxHighlighter = dynamic(
  () => import("react-syntax-highlighter").then((mod) => mod.Prism),
  { ssr: false }
);
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface WorkProject {
  _id: string;
  title: string;
  slug: string;
  category: "AI & Automation" | "Web Systems" | "SaaS & Growth";
  featured?: boolean;
  liveUrl?: string;
  githubUrl?: string;
  description: string;
  tags?: string[];
  image?: any;
  language: string;
  body?: any;
}

const CodeBlock = ({ value }: { value: any }) => {
  const [copied, setCopied] = useState(false);
  const codeString = value?.code || (typeof value === "string" ? value : "");
  const language = value?.language || "typescript";
  const filename = value?.filename;

  if (!codeString) return null;

  const executeCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-8 rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800 font-mono text-sm">
      <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-900/80 border-b border-neutral-800 text-xs text-neutral-400">
        <span className="uppercase tracking-wider font-semibold text-cyan-400">
          {filename || language}
        </span>
        <button
          onClick={executeCopy}
          className="flex items-center gap-1.5 hover:text-white transition-colors"
        >
          {copied ? (
            <>
              <Check size={13} className="text-cyan-400" />
              <span className="text-cyan-400 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <div className="w-full overflow-x-auto">
        <SyntaxHighlighter
          language={language.toLowerCase()}
          style={vscDarkPlus || {}}
          customStyle={{
            margin: 0,
            padding: "1.25rem",
            background: "transparent",
            fontSize: "0.875rem",
            lineHeight: "1.6",
          }}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      return (
        <div className="my-10 rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || "Case Study Visualization"}
            width={1200}
            height={675}
            className="w-full h-auto object-cover"
            loading="lazy"
          />
          {value.caption && (
            <p className="text-center text-xs font-mono text-neutral-500 mt-2">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
    code: CodeBlock,
    codeBlock: CodeBlock,
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-12 mb-4 font-sans uppercase">
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
      <blockquote className="border-l-2 border-cyan-400 pl-5 italic text-neutral-400 my-8 bg-neutral-950/40 py-2 rounded-r-lg">
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
    bullet: ({ children }) => <li className="marker:text-cyan-500">{children}</li>,
    number: ({ children }) => (
      <li className="marker:text-cyan-400 marker:font-mono marker:text-sm">
        {children}
      </li>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href || "#";
      const isExternal = !href.startsWith("/");
      return (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 decoration-cyan-500/30 font-medium transition-colors"
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
};

export default function WorkCaseStudy({ work }: { work: WorkProject }) {
  const { locale, asPath } = useRouter();
  const currentLang = locale || "en";

  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!work) return;
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, [work]);

  if (!work) return null;

  const canonicalUrl = `https://kanatnazarov.com${currentLang === "en" ? "" : "/" + currentLang}${asPath}`;

  return (
    <>
      <Head>
        <title>{work.title} | Case Study — Kanat Nazarov</title>
        <meta name="description" content={work.description} />
        <link rel="canonical" href={canonicalUrl} />
      </Head>

      <div
        className="min-h-screen bg-black text-neutral-100 py-16 md:py-24 mt-12"
        style={{
          fontFamily: "var(--font-brandon), 'Brandon Grotesque', sans-serif",
        }}
      >
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link
              href="/works"
              className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-cyan-400 mb-12 transition-colors uppercase tracking-widest group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Back to Selected Works
            </Link>

            {/* Header Area */}
            <header ref={headerRef} className="mb-12 opacity-0">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400 bg-cyan-950/50 border border-cyan-800/50 px-3 py-1 rounded">
                  {work.category}
                </span>
                {work.featured && (
                  <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded">
                    Featured
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-white uppercase leading-tight">
                {work.title}
              </h1>

              <p className="text-lg sm:text-xl text-neutral-400 leading-relaxed max-w-3xl mb-8">
                {work.description}
              </p>

              {/* External Links */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-neutral-900">
                {work.liveUrl && (
                  <a
                    href={work.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-[0.2em] bg-cyan-500 text-black px-6 py-3 rounded hover:bg-cyan-400 transition-all"
                  >
                    Launch Live Demo
                    <ExternalLink size={14} />
                  </a>
                )}
                {work.githubUrl && (
                  <a
                    href={work.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-[0.2em] bg-neutral-900 text-neutral-300 border border-neutral-800 px-6 py-3 rounded hover:text-white transition-all"
                  >
                    Source Code
                    <Github size={14} />
                  </a>
                )}
              </div>
            </header>

            {/* Main Cover Image */}
            {work.image?.asset && (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-neutral-800/80 my-10 bg-neutral-950">
                <Image
                  src={urlFor(work.image).url()}
                  alt={work.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Tech Stack Banner */}
            {work.tags && work.tags.length > 0 && (
              <div className="p-6 rounded-xl border border-neutral-800/60 bg-neutral-950/80 my-10">
                <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-neutral-500 mb-3">
                  Technologies & Architecture Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {work.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono text-cyan-400 bg-neutral-900 px-3 py-1 rounded border border-neutral-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Rich Content Body */}
            {work.body && (
              <div className="mt-12 border-t border-neutral-900 pt-12">
                <PortableText value={work.body} components={components} />
              </div>
            )}

            {/* Footer Navigation */}
            <footer className="mt-20 pt-8 border-t border-neutral-900 text-xs font-mono text-neutral-500 flex justify-between items-center">
              <Link href="/works" className="hover:text-cyan-400 transition-colors">
                ← ALL CASE STUDIES
              </Link>
              <span>© {new Date().getFullYear()} KANAT NAZAROV</span>
            </footer>
          </div>
        </Container>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const works = await sanityClient.fetch(
    `*[_type == "work" && defined(slug.current)]{ "slug": slug.current, language }`
  );

  const paths = works.map((item: { slug: string; language?: string }) => ({
    params: { slug: item.slug },
    locale: item.language || "en",
  }));

  return { paths, fallback: "blocking" };
};
export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const currentLocale = locale || "en";

  // Standard, valid GROQ query
  const query = `*[_type == "work" && slug.current == $slug && (language == $lang || !defined(language))][0]{
    _id,
    title,
    "slug": slug.current,
    category,
    featured,
    liveUrl,
    githubUrl,
    description,
    tags,
    image,
    language,
    body
  }`;

  let work = await sanityClient.fetch(query, {
    slug: params?.slug,
    lang: currentLocale,
  });

  // Fallback: If no match with language filter, fetch strictly by slug
  if (!work) {
    const fallbackQuery = `*[_type == "work" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      category,
      featured,
      liveUrl,
      githubUrl,
      description,
      tags,
      image,
      language,
      body
    }`;

    work = await sanityClient.fetch(fallbackQuery, {
      slug: params?.slug,
    });
  }

  if (!work) {
    return { notFound: true, revalidate: 10 };
  }

  return { props: { work }, revalidate: 10 };
};