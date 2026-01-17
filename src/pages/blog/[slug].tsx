// pages/blog/[slug].tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import readingTime from "reading-time";
import Image from "next/image";
import Link from "next/link";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { useState } from "react";
import { Check, Copy } from "lucide-react";

// ── Types (your existing ones) ──────────────────────────────────────────
interface FrontMatter {
  title: string;
  date: string;
  excerpt?: string;
  image?: string;
  tags?: string[];
  author?: string;
  [key: string]: unknown;
}

interface PostProps {
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
  frontMatter: FrontMatter;
  readTime: string;
}

// ── Custom MDX Components ───────────────────────────────────────────────

const mdxComponents = {
  img: (props: React.ImgHTMLAttributes<HTMLImageElement> & { src: string }) => {
    if (!props.src) return null;
    return (
      <div className="my-10 rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
        <Image
          {...props}
          src={props.src}
          alt={props.alt || "Blog image"}
          width={props.width ? Number(props.width) : 1200}
          height={props.height ? Number(props.height) : 675}
          sizes="(max-width: 768px) 100vw, 900px"
          quality={85}
          className="w-full h-auto object-cover"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAErgJ9aA9l9gAAAABJRU5ErkJggg=="
          loading="lazy"
        />
      </div>
    );
  },

  // VS Code-style code block
  pre: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
    const [copied, setCopied] = useState(false);
    const language = className?.match(/language-(\w+)/)?.[1] || "text";
    const codeString =
      (children as any)?.props?.children?.props?.children || "";

    const copyCode = () => {
      navigator.clipboard.writeText(codeString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div className="relative my-10 rounded-xl overflow-hidden bg-[#0d1117] border border-[#30363d] shadow-2xl">
        {/* Top bar (VS Code-like) */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-[#30363d] text-xs text-gray-400">
          <span>{language}</span>
          <button
            onClick={copyCode}
            className="flex items-center gap-1.5 text-gray-400 hover:text-gray-200 transition-colors"
            title="Copy code"
          >
            {copied ? (
              <>
                <Check size={14} className="text-green-400" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        <pre
          className={`p-6 pt-4 overflow-x-auto text-sm leading-6 font-mono text-gray-300 ${
            className || ""
          }`}
        >
          {children}
        </pre>
      </div>
    );
  },
};

export default function Post({ source, frontMatter, readTime }: PostProps) {
  if (!frontMatter?.title) {
    return (
      <div className="text-center py-20 text-xl text-gray-500 dark:text-gray-400">
        Post not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-100">
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-12 group text-lg font-medium transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to all posts
        </Link>

        {/* Header */}
        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            {frontMatter.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-gray-400 text-sm">
            <time dateTime={frontMatter.date}>
              {new Date(frontMatter.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>•</span>
            <span>{readTime}</span>
            {frontMatter.author && (
              <>
                <span>•</span>
                <span className="font-medium text-gray-300">
                  {frontMatter.author}
                </span>
              </>
            )}
          </div>

          {/* Tags */}
          {frontMatter.tags && frontMatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {frontMatter.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 bg-gray-800 text-blue-300 rounded-full text-sm font-medium border border-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Main content */}
        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-white prose-h2:text-3xl prose-h3:text-2xl prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-strong:text-white prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-5 prose-blockquote:italic prose-blockquote:text-gray-300">
         {/* @ts-ignore */}
          <MDXRemote {...source} components={mdxComponents} />
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-12 border-t border-gray-800 text-sm text-gray-400">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <Link
              href="/blog"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              ← Back to all posts
            </Link>
            <span>
              © {new Date().getFullYear()} Kanat Nazarov • Full-Stack Javascript
              Developer
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}

// getStaticPaths and getStaticProps stay exactly as you have themhem

// ── Static Generation ────────────────────────────────────────────────────

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), "src/content/blog");
  console.log("Looking for posts in:", postsDirectory);

  let fileNames: string[] = [];
  try {
    fileNames = fs
      .readdirSync(postsDirectory)
      .filter((name) => name.endsWith(".mdx"));
    console.log("Found MDX files:", fileNames);
  } catch (err) {
    console.error("Directory read error:", err);
  }

  const paths = fileNames.map((fileName) => ({
    params: { slug: fileName.replace(/\.mdx$/, "") },
  }));

  console.log("Generated paths:", paths);

  return {
    paths,
    fallback: "blocking" as const,
  };
}

interface GetStaticPropsContext {
  params: any;
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext): Promise<any | { notFound: true }> {
  console.log("Building post for slug:", params.slug);

  const fullPath = path.join(
    process.cwd(),
    "src/content/blog",
    `${params.slug}.mdx`
  );

  if (!fs.existsSync(fullPath)) {
    console.error("File missing:", fullPath);
    return { notFound: true };
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data: frontMatter, content } = matter(fileContents);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
        rehypeHighlight,
      ],
    },
  });

  const stats = readingTime(content);

  return {
    props: {
      source: mdxSource,
      frontMatter: frontMatter as FrontMatter,
      readTime: stats.text,
    },
    revalidate: 60,
  };
}
