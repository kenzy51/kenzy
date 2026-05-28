// app/lifestyle/[slug]/page.tsx

import { sanityClient } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { Metadata } from "next";

// 1. Fetching Logic
async function getPost(slug: string) {
  return sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      image,
      body,
      date,
      "excerpt": excerpt,
      "next": *[_type == "post" && date > ^.date] | order(date asc)[0]{ "slug": slug.current, title },
      "previous": *[_type == "post" && date < ^.date] | order(date desc)[0]{ "slug": slug.current, title }
    }`,
    { slug }
  );
}

// 2. Metadata Generator
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  return {
    title: post ? `${post.title} | Kanat's Insights` : "Not Found",
    description: post?.excerpt,
  };
}

// 3. Components for PortableText
const portableTextComponents = {
  block: {
    normal: ({ children }: any) => <p className="mb-8 leading-relaxed text-[#5A564E] font-sans text-sm">{children}</p>,
    h2: ({ children }: any) => <h2 className="text-2xl font-bold text-[#1C1A17] mt-12 mb-6 tracking-tight">{children}</h2>,
  },
};

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return <div className="py-24 text-center">Post not found</div>;

  return (
    <article className="bg-[#FAF7F2] min-h-screen pt-24 pb-32 selection:bg-[#EFE9DC]">
      {/* Title Block */}
      <div className="max-w-3xl mx-auto px-6 text-center mb-16">
        <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#3B533E] mb-4 block">
          {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
        <h1 className="text-4xl md:text-5xl font-light tracking-tight text-[#1C1A17] uppercase mb-6">
          {post.title}
        </h1>
      </div>

      {/* Hero Image */}
      {post.image && (
        <div className="max-w-5xl mx-auto px-6 mb-16">
          <div className="aspect-[16/9] w-full relative bg-[#EFE9DC]">
            <Image src={urlFor(post.image).url()} alt={post.title} fill className="object-cover" />
          </div>
        </div>
      )}

      {/* Body Content */}
      <div className="max-w-2xl mx-auto px-6">
        <div className="prose max-w-none">
          <PortableText value={post.body} components={portableTextComponents} />
        </div>

        {/* Footer Navigation */}
        <div className="mt-20 pt-12 border-t border-[#EFEBE3] flex justify-between text-[9px] font-bold tracking-[0.2em] uppercase">
          {post.previous ? (
            <Link href={`/lifestyle/${post.previous.slug}`} className="hover:text-[#3B533E] transition-colors">← Previous</Link>
          ) : <div />}
          <Link href="/lifestyle" className="hover:text-[#3B533E] transition-colors">All Insights</Link>
          {post.next ? (
            <Link href={`/lifestyle/${post.next.slug}`} className="hover:text-[#3B533E] transition-colors">Next →</Link>
          ) : <div />}
        </div>
      </div>
    </article>
  );
}