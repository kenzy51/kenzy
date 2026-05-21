// src/pages/studio/[[...index]].tsx
import Head from "next/head";
import { NextStudio } from "next-sanity/studio";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

const config = defineConfig({
  name: "default",
  title: "Kanat Nazarov Admin Studio",
  projectId: "8jboegtt",
  dataset: "production",
  basePath: "/studio", 
  plugins: [structureTool()],
  schema: {
    types: [
      {
        name: "post",
        title: "Blog Post",
        type: "document",
        fields: [
          { name: "title", title: "Title", type: "string" },
          {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: { source: "title", maxLength: 96 }
          },
          { name: "date", title: "Publication Date", type: "date" },
          { name: "excerpt", title: "Meta Excerpt Description", type: "text" },
          {
            name: "keywords",
            title: "Target SEO Keywords",
            type: "array",
            of: [{ type: "string" }]
          },
          { name: "image", title: "Cover Image", type: "image", options: { hotspot: true } },
          { name: "body", title: "Body Content", type: "array", of: [{ type: "block" }] }
        ]
      }
    ]
  }
});

export default function StudioPage() {
  return (
    <>
      <Head>
        <title>Kanat Nazarov | Management Studio</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="min-h-screen bg-neutral-950">
        <NextStudio config={config} />
      </div>
    </>
  );
}