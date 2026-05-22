"use client";

import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { sanityClient, urlFor } from "@/lib/sanity";
import { GetStaticProps } from "next";

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
        className="min-h-screen bg-[#0A0A0A] text-white relative pt-32 pb-32 px-4 sm:px-8 md:px-16 lg:px-24"
        style={{ fontFamily: "var(--font-brandon), 'Brandon Grotesque', sans-serif" }}
      >
        <div className="max-w-6xl mx-auto relative z-10">
        
          <header className="mb-24 text-left max-w-3xl border-b border-neutral-900 pb-10">
            <p className="text-cyan-400 font-mono tracking-[0.2em] uppercase text-xs mb-3 font-bold">
              Tech Stack & Project Retrospectives
            </p>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white uppercase leading-tight mb-4">
              Engineering <br />& Growth
            </h1>
            <p className="text-neutral-400 text-base sm:text-lg font-normal leading-relaxed tracking-wide">
              Practical guides and case studies on building fast web applications, optimizing full-stack codebases, and implementing real-world AI tools that drive actual business results.
            </p>
          </header>

          {!posts || posts.length === 0 ? (
            <div className="text-left py-16 border-t border-neutral-900 font-mono text-sm tracking-wider text-neutral-500">
              No articles found. Deploy a post via your studio dashboard to view.
            </div>
          ) : (
            /* GRID REFACTOR:
              - Clean 3-column structural layout for rapid scanning.
              - Eliminates bulky border cards in favor of minimalist typography space.
            */
            <div className="grid gap-x-8 gap-y-16 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start">
              {posts.map((post, index) => (
                <article key={post.slug} className="group">
                  <Link href={`/blog/${post.slug}`} className="block space-y-4">
                    
                    {/* Clean Image Frame Wrapper Layout */}
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

                    {/* Metadata & Typography Blocks */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-neutral-500 uppercase">
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </time>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>

                      {/* Headings leverage premium geometric text scaling profiles */}
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
  const query = `*[_type == "post" && defined(slug.current)] | order(date desc) {
    "slug": slug.current,
    title,
    date,
    excerpt,
    image,
    keywords,
    "readTime": select(
      round(string::length(pt::text(body)) / 5 / 200) <= 1 => "1 min read",
      string(round(string::length(pt::text(body)) / 5 / 200)) + " min read"
    )
  }`;

  let messages = {};
  
  try {
    // Dynamic localization routing handler blocks
    const localeToLoad = locale || "en";
    const importedMessages = await import(`../../messages/${localeToLoad}.json`);
    messages = importedMessages.default || importedMessages;
  } catch (msgErr) {
    console.warn("Translation schema mapping skipped or non-existent path reference:", msgErr);
  }

  try {
    const posts = await sanityClient.fetch(query);
    
    return {
      props: {
        posts: posts || [],
        messages,
      },
      revalidate: 60,
    };
  } catch (err) {
    console.error("Sanity index delivery compilation crash fallback active:", err);
    
    return { 
      props: { 
        posts: [],
        messages,
      },
      revalidate: 10
    };
  }
};