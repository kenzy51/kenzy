import { sanityClient, urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { GetStaticPaths, GetStaticProps } from "next";

export default function PostPage({ post }: { post: any }) {
  if (!post) return null;
  return (
    <article className="bg-[#FAF7F2] min-h-screen pb-32 pt-28">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <Link
          href="/lifestyle"
          className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#9A958C] hover:text-[#1C1A17] transition-colors"
        >
          ← Back to logs
        </Link>
      </div>

      {/* Hero Image */}
      {post.image && (
        <div className="max-w-5xl mx-auto px-6 mb-16">
          <Image
            src={urlFor(post.image).url()}
            alt={post.title}
            width={1200}
            height={600}
            className="object-cover w-full"
          />
        </div>
      )}

      {/* Header, Date, Read Time, and Author */}
      <div className="max-w-3xl mx-auto px-6 text-center mb-10">
        <h1 className="text-4xl uppercase font-bold text-[#1C1A17] mb-6">
          {post.title}
        </h1>

        <div className="flex flex-col items-center gap-4 text-[10px] uppercase font-bold tracking-[0.3em] text-[#9A958C]">
          <div className="flex items-center gap-4">
            <span>
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span>•</span>
            <span>{post.readTime} MIN READ</span>
          </div>

          {post.author && (
            <div className="flex items-center gap-2 mt-2">
              {post.author.image && (
                <Image
                  src={urlFor(post.author.image).width(40).height(40).url()}
                  alt={post.author.name}
                  width={30}
                  height={30}
                  className="rounded-full"
                />
              )}
              <span className="text-[#1C1A17]">BY {post.author.name}</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 prose prose-lg prose-p:text-base prose-p:font-medium prose-p:leading-8 text-[#5A564E]">
        <PortableText value={post.body} />

        {/* Navigation */}
        <div className="mt-20 pt-12 border-t border-[#EFEBE3] flex justify-between uppercase text-[10px] font-bold tracking-[0.2em]">
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

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const post = await sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title, image, body, date, language,
      author->{name, image},
      "readTime": round(length(pt::text(body)) / 5 / 200),
      "translationId": coalesce(translationOf->_id, _id),
      "sibling": *[_type == "post" && (translationOf._ref == coalesce(translationOf._ref, ^._id) || _id == translationOf._ref) && language != $locale][0] {
        "slug": slug.current
      }
    }`,
    { slug: params?.slug, locale },
  );

  if (!post) return { notFound: true };
  return { props: { post }, revalidate: 60 };
};
