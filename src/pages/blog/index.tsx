// pages/blog/index.tsx
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import readingTime from 'reading-time';
// @ts-ignore
export default function Blog({ posts }) {
  return (
    <div className="max-w-5xl mx-auto py-16 px-6">
      <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center">
        Blog & Insights
      </h1>

      {posts.length === 0 ? (
        <p className="text-center text-xl text-gray-500">
          No posts yet — check back soon!
        </p>
      ) : (
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post:any) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <div className="group block p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all hover:border-blue-500 bg-white dark:bg-gray-900 cursor-pointer">
                <h2 className="text-2xl font-semibold mb-3 group-hover:text-blue-600">
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <time>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export async function getStaticProps() {
const postsDirectory = path.join(process.cwd(), 'src/content/blog');// @ts-ignore

  let fileNames = [];

  try {
    fileNames = fs.readdirSync(postsDirectory).filter((name) => name.endsWith('.mdx'));
  } catch (err) {
    console.error('Error reading blog directory:', err);
  }
// @ts-ignore

  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const stats = readingTime(content);

    return {
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      readTime: stats.text,
    };
// @ts-ignore

  }).sort((a, b) => new Date(b.date) - new Date(a.date));

  return {
    props: { posts },
    revalidate: 60, // ISR: revalidate every 60 seconds (optional)
  };
}