import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { GetStaticProps } from "next";
import { groq } from "next-sanity";
import Container from "../../shared/ui/container/Container";
import { sanityClient } from "@/lib/sanity";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source: any) {
  return builder.image(source);
}

export interface Project {
  _id: string;
  title: string;
  slug: { current: string } | string;
  category: "AI & Automation" | "Web Systems" | "SaaS & Growth";
  featured: boolean;
  liveUrl?: string;
  githubUrl?: string;
  description: string;
  tags: string[];
  image: any;
  language: string;
}

interface WorksPageProps {
  projects: Project[];
}

const CATEGORIES = ["All", "AI & Automation", "Web Systems", "SaaS & Growth"] as const;

export default function WorksPage({ projects }: WorksPageProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <>
      <Head>
        <title>Works & Case Studies | Kanat Nazarov</title>
        <meta
          name="description"
          content="Selected portfolio of high-performance web systems, autonomous AI conversational pipelines, and full-stack software architectures built by Kanat Nazarov."
        />
      </Head>

      <div
        className="min-h-screen bg-black text-white pt-32 pb-24"
        style={{
          fontFamily: "var(--font-brandon), 'Brandon Grotesque', sans-serif",
        }}
      >
        <Container>
          {/* Header Title Section */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-cyan-500"></span>
              <span className="text-cyan-400 text-xs font-bold uppercase tracking-[0.25em]">
                Engineered Solutions
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white mb-6">
              Selected{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Works
              </span>
            </h1>
            <p className="text-neutral-400 max-w-2xl text-base sm:text-lg leading-relaxed">
              Architecting sub-second digital platforms, autonomous AI voice and chat agents, and robust full-stack software ecosystems designed for scale.
            </p>
          </section>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-3 mb-12 border-b border-neutral-900 pb-6">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`text-xs uppercase font-bold tracking-[0.2em] px-4 py-2 rounded-md transition-all duration-300 border ${
                  activeCategory === category
                    ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                    : "bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Project Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => {
              // Extract slug safely whether it's an object { current: string } or string
              const projectSlug = typeof project.slug === "object" ? project.slug.current : project.slug;

              return (
                <article
                  key={project._id}
                  className="group relative flex flex-col justify-between bg-neutral-950/60 border border-neutral-800/80 rounded-xl overflow-hidden hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
                >
                  <div>
                    {/* Card Image Banner Container */}
                    <Link href={`/works/${projectSlug}`} className="block relative w-full h-52 bg-neutral-900 border-b border-neutral-800 overflow-hidden">
                      {project.image ? (
                        <Image
                          src={urlFor(project.image).width(800).height(500).url()}
                          alt={project.image.alt || project.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-neutral-700 text-xs uppercase tracking-widest font-bold">
                          [{project.title}]
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent z-10 opacity-80" />
                    </Link>

                    {/* Card Content */}
                    <div className="p-6">
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400 bg-cyan-950/50 border border-cyan-800/50 px-2.5 py-1 rounded">
                          {project.category}
                        </span>
                        {project.featured && (
                          <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded">
                            Featured
                          </span>
                        )}
                      </div>

                      <Link href={`/works/${projectSlug}`}>
                        <h2 className="text-xl font-bold uppercase tracking-wide text-white mb-3 group-hover:text-cyan-400 transition-colors">
                          {project.title}
                        </h2>
                      </Link>

                      <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer: Tech Stack Tags & Action Links */}
                  <div className="px-6 pb-6 pt-0 mt-auto">
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-medium text-neutral-400 bg-neutral-900 px-2.5 py-1 rounded border border-neutral-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between gap-3 pt-4 border-t border-neutral-900">
                      {/* See More Link */}
                      <Link
                        href={`/works/${projectSlug}`}
                        className="inline-flex items-center gap-1.5 text-xs uppercase font-bold tracking-[0.15em] text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        See More
                        <svg
                          className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </Link>

                      <div className="flex items-center gap-3">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs uppercase font-bold tracking-[0.15em] text-neutral-400 hover:text-white transition-colors"
                          >
                            Live
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs uppercase font-bold tracking-[0.15em] text-neutral-400 hover:text-white transition-colors"
                          >
                            Code
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Bottom Call to Action */}
          <section className="mt-24 p-8 sm:p-12 rounded-2xl bg-gradient-to-b from-neutral-950 to-neutral-900/50 border border-neutral-800/80 text-center relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white mb-4">
              Have a Project or System to Scale?
            </h3>
            <p className="text-neutral-400 max-w-xl mx-auto text-sm sm:text-base mb-8">
              Available for full-stack engineering contracts, AI pipeline integrations, and custom software architecture.
            </p>
            <Link
              href="/#contact"
              className="inline-block text-xs uppercase font-bold tracking-[0.25em] bg-cyan-500 text-black px-8 py-4 rounded hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
            >
              Get In Touch
            </Link>
          </section>
        </Container>
      </div>
    </>
  );
}

// 🚀 GROQ Data Fetching via getStaticProps with ISR (Revalidation)
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const currentLang = locale || "en";

  const worksQuery = groq`
    *[_type == "work" && language == $lang] | order(featured desc, _createdAt desc){
      _id,
      title,
      "slug": slug.current,
      category,
      featured,
      liveUrl,
      githubUrl,
      description,
      tags,
      image,
      language
    }
  `;

  const projects = await sanityClient.fetch(worksQuery, { lang: currentLang });

  return {
    props: {
      projects: projects || [],
    },
    revalidate: 60,
  };
};