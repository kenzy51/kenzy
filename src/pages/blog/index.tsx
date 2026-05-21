// pages/blog/index.tsx
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
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
        <title>Engineering Blog & Technical Insights | Kanat Nazarov</title>
        <meta 
          name="description" 
          content="Deep dives into Next.js architectures, low-latency conversational AI pipelines, technical SEO, and full-stack software engineering by Kanat Nazarov." 
        />
        <meta name="keywords" content="Kanat Nazarov blog, Next.js architecture blog, conversational AI engineer, full stack developer tutorials, technical SGE optimization" />
        <link rel="canonical" href="https://kanatnazarov.com/blog" />
      </Head>

      <div className="min-h-screen bg-black text-white relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/[0.015] blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <header className="mb-20 text-center">
            <p className="text-cyan-400 font-mono tracking-widest uppercase text-xs sm:text-sm mb-3">
              Logs & Technical Blueprints
            </p>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-white">
              Blog & Insights
            </h1>
            <p className="text-neutral-400 text-base md:text-lg font-light max-w-xl mx-auto leading-relaxed">
              Production retrospectives exploring full-stack engineering, infrastructure orchestration, and semantic design systems.
            </p>
          </header>

          {!posts || posts.length === 0 ? (
            <div className="text-center py-24 border border-dashed border-neutral-900 rounded-2xl bg-neutral-950/20 backdrop-blur">
              <p className="text-xl text-neutral-600 font-mono tracking-wider">
                EXECUTION_FALLBACK: NO_ARTICLES_SYNCHRONIZED
              </p>
              <p className="text-xs text-neutral-500 font-mono mt-2">
                Deploy a post via your studio dashboard at /studio to initialize data.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-stretch">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group block h-full">
                  <Card className="h-full flex flex-col bg-gradient-to-b from-neutral-900/40 to-neutral-950/90 border-neutral-800/60 hover:border-cyan-500/30 transition-all duration-300 rounded-xl overflow-hidden shadow-2xl">
                    
                    <div className="w-full relative h-48 bg-neutral-950 overflow-hidden border-b border-neutral-900/40">
                      {post.image ? (
                        <Image
                          src={urlFor(post.image).width(600).height(350).url()}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                          sizes="(max-w-md) 100vw, 33vw"
                          priority
                        />
                      ) : (
                        <div className="w-full h-full bg-neutral-950 flex items-center justify-center font-mono text-xs text-neutral-700">
                          IMAGE_STBY_ASSET
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col flex-1 p-6 justify-between">
                      <div className="space-y-3">
                        <CardHeader className="p-0 space-y-0">
                          <CardTitle className="text-lg font-bold leading-snug group-hover:text-cyan-400 transition-colors duration-200 text-white line-clamp-2">
                            {post.title}
                          </CardTitle>
                        </CardHeader>
                        
                        <CardContent className="p-0">
                          <p className="text-neutral-400 font-light line-clamp-3 text-sm leading-relaxed">
                            {post.excerpt}
                          </p>
                        </CardContent>
                      </div>

                      <CardFooter className="p-0 pt-5 mt-6 flex items-center text-[11px] font-mono font-medium text-neutral-500 uppercase tracking-wider border-t border-neutral-900/60">
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </time>
                        <span className="mx-2 text-neutral-800">•</span>
                        <span className="text-neutral-400">{post.readTime}</span>
                      </CardFooter>
                    </div>
                  </Card>
                </Link>
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
    // FIX: Dynamically import your translation dictionary JSON files
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