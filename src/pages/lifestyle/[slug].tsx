import { sanityClient, urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
const components = {
  types: {
    image: ({ value }: { value: any }) => {
      if (!value?.asset?._ref) return null;

      return (
        <div className="my-10 w-full flex justify-center">
          <div className="max-w-[240px] overflow-hidden">
            <Image
              src={urlFor(value).url()}
              alt={value.alt || "Post image"}
              width={800}
              height={500}
              className="object-cover w-full h-auto rounded-lg"
            />
          </div>
        </div>
      );
    },
  },
};
// Component: Form to leave comments
const CommentForm = ({ postId }: { postId: string }) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const response = await fetch("/api/createComment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId,
          name: formData.get("name"),
          comment: formData.get("comment"),
        }),
      });
      if (response.ok) {
        alert("Comment submitted for approval.");
        e.currentTarget.reset();
      } else {
        alert("Error submitting comment.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-16 p-8 border border-[#EFEBE3] bg-white"
    >
      <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-6">
        Leave a log note
      </h3>
      <input
        name="name"
        placeholder="Name"
        className="w-full p-2 mb-4 border bg-transparent"
        required
      />
      <textarea
        name="comment"
        placeholder="Comment"
        rows={4}
        className="w-full p-2 mb-4 border bg-transparent"
        required
      />
      <button
        type="submit"
        className="text-[9px] font-bold uppercase tracking-[0.2em] bg-black text-white px-6 py-3 hover:bg-[#3B533E] transition-colors"
      >
        Submit
      </button>
    </form>
  );
};

export default function PostPage({ post }: { post: any }) {
  if (!post) return null;

  return (
    <article className="bg-[#FAF7F2] min-h-screen pb-32 pt-28">
      {/* Dynamic SEO Metadata */}
      <Head>
        <title>{post.title} | Kanat Nazarov</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        {post.image && (
          <meta property="og:image" content={urlFor(post.image).url()} />
        )}
      </Head>

      <div className="max-w-4xl mx-auto px-6 mb-12">
        <Link
          href="/lifestyle"
          className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#9A958C] hover:text-[#1C1A17] transition-colors"
        >
          ← Back to logs
        </Link>
      </div>

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
          {post?.author && (
            <div className="flex items-center gap-2 mt-2">
              {/* Use a simple conditional check for the image string */}
              {post.author.imageUrl && (
                <Image
                  src={post.author.imageUrl}
                  alt={post.author.name || "Author"}
                  width={30}
                  height={30}
                  className="rounded-full"
                />
              )}
              {/* Ensure we only render a string, not an object */}
              <span className="text-[#1C1A17]">
                BY {post.author.name ?? "Anonymous"}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 prose-lg prose-p:text-base prose-p:font-medium prose-p:leading-8 text-[#5A564E]">
        <PortableText value={post.body} components={components} />

        {/* Comments Section */}
        {post.comments && post.comments.length > 0 && (
          <div className="mt-16">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-8 text-[#9A958C]">
              Community Logs ({post.comments.length})
            </h3>
            <div className="space-y-8">
              {post.comments.map((c: any) => (
                <div key={c._id} className="border-l-2 border-[#EFEBE3] pl-6">
                  <p className="text-sm italic text-[#5A564E]">"{c.comment}"</p>
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-black mt-2 block">
                    — {c.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <CommentForm postId={post._id} />

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
  const lang = locale || "en";

  const post = await sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      _id, title, excerpt, image, body, date, language,
      "author": author->{name, "imageUrl": image.asset->url}, 
      "comments": *[_type == "comment" && post._ref == ^._id && approved == true],
      "readTime": round(length(pt::text(body)) / 5 / 200),
      // Filter previous/next by category AND language
      "previous": *[_type == "post" && date < ^.date && category->title == "Lifestyle & Performance" && language == $lang] | order(date desc)[0]{"slug": slug.current},
      "next": *[_type == "post" && date > ^.date && category->title == "Lifestyle & Performance" && language == $lang] | order(date asc)[0]{"slug": slug.current}
    }`,
    { slug: params?.slug, lang },
  );

  if (!post) return { notFound: true };
  return { props: { post }, revalidate: 60 };
};
