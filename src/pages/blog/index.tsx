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
  const postsDirectory = path.join(process.cwd(), 'src/content/blog');
  let fileNames: string[] = [];

  try {
    // We check both .md and .mdx to be safe
    fileNames = fs.readdirSync(postsDirectory).filter((name) => 
      name.endsWith('.mdx') || name.endsWith('.md')
    );
  } catch (err) {
    console.error('Error reading blog directory:', err);
    return { props: { posts: [] } };
  }

  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.(mdx|md)$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const stats = readingTime(content);

    return {
      slug,
      title: data.title || "Untitled Post",
      date: data.date || new Date().toISOString(),
      // FIX: Ensure excerpt is never undefined. 
      // It uses the frontmatter excerpt, or falls back to an empty string.
      excerpt: data.excerpt ?? "", 
      readTime: stats.text,
    };
  }).sort((a, b) => {
    // Proper date sorting for TypeScript
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return {
    props: { posts },
    revalidate: 60,
  };
}