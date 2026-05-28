// src/pages/lifestyle/[slug].tsx
import { sanityClient, urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { GetStaticPaths, GetStaticProps } from "next";

// Update this to match the EXACT slug in your Sanity Studio
const LIFESTYLE_CATS = ["lifestyle-performance"];
export default function PostPage({ post }: { post: any }) {
  if (!post) return null;
  return (
    <article className="bg-[#FAF7F2] min-h-screen pt-24 pb-32">
      <div className="max-w-3xl mx-auto px-6 text-center mb-16">
        <h1 className="text-4xl uppercase font-bold text-[#1C1A17]">
          {post.title}
        </h1>
      </div>
      {post.image && (
        <div className="max-w-5xl mx-auto px-6 mb-16">
          <Image
            src={urlFor(post.image).url()}
            alt={post.title}
            width={1200}
            height={600}
            className="object-cover"
          />
        </div>
      )}
      <div className="max-w-4xl mx-auto px-6 prose text-[#5A564E]">
        <PortableText value={post.body} />
        <div className="mt-20 pt-12 border-t flex justify-between uppercase text-[10px] font-bold">
          {post.previous ? (
            <Link href={`/lifestyle/${post.previous.slug}`}>← Prev</Link>
          ) : (
            <div />
          )}
          <Link href="/lifestyle">All Insights</Link>
          {post.next ? (
            <Link href={`/lifestyle/${post.next.slug}`}>Next →</Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </article>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await sanityClient.fetch(
    `*[_type == "post" && defined(slug.current) && category->title == "Lifestyle & Performance"].slug.current`,
  );
  return {
    paths: slugs.map((slug: string) => ({ params: { slug } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug && category->title == "Lifestyle & Performance"][0]{
    title, image, body, date,
    // ... rest of your next/previous logic
  }`,
    { slug: params?.slug },
  );
  if (!post) return { notFound: true };
  return { props: { post }, revalidate: 60 };
};
