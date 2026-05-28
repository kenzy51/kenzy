// src/pages/lifestyle/index.tsx
import { sanityClient } from "@/lib/sanity";
import Link from "next/link";
import { GetStaticProps } from "next";

export default function LifestyleIndex({
  lifestylePosts,
}: {
  lifestylePosts: any[];
}) {
  return (
    <div className="bg-[#FAF7F2] min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-5xl font-bold mb-16">Lifestyle Insights</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {lifestylePosts.map((post) => (
            <Link
              key={post.id}
              href={`/lifestyle/${post.slug}`}
              className="block border p-6 hover:bg-white transition"
            >
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p className="text-sm mt-2">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const query = `*[_type == "post" && category->slug.current in ["performance", "nutrition", "sonic-architecture"]] | order(date desc) {
    "id": _id, title, excerpt, "slug": slug.current
  }`;
  const lifestylePosts = await sanityClient.fetch(query);
  return { props: { lifestylePosts }, revalidate: 60 };
};
