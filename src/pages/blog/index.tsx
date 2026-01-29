// pages/blog/index.tsx
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import readingTime from 'reading-time';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readTime: string;
}

interface BlogProps {
  posts: Post[];
}
export default function Blog({ posts }:BlogProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto py-20 px-6">
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            Blog & Insights
          </h1>
          <p className="text-gray-400 text-lg">Thoughts on engineering, performance, and design.</p>
        </header>

        {posts.length === 0 ? (
          <p className="text-center text-xl text-zinc-500">
            No posts yet — check back soon!
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: any) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group transition-transform duration-200 hover:-translate-y-1">
                <Card className="h-full bg-zinc-950 border-zinc-800 transition-colors group-hover:border-zinc-700 overflow-hidden">
                  <CardHeader className="space-y-2">
                    <CardTitle className="text-xl font-bold leading-snug group-hover:text-blue-400 transition-colors text-white">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-zinc-400 line-clamp-3 text-sm leading-relaxed">
                      {post.excerpt}
                    </p>
                  </CardContent>

                  <CardFooter className="flex items-center text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    <time>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
                    <span className="mx-2 text-zinc-700">•</span>
                    <span>{post.readTime}</span>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
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