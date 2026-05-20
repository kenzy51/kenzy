// schemas/post.ts
import { defineField, defineType } from "sanity";

export const postType= defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Publication Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Meta Description / Excerpt",
      type: "text",
      description: "Appears in Google Search Snippets. Keep it between 140-160 characters.",
      validation: (Rule) => Rule.max(160).required(),
    }),
    defineField({
      name: "keywords",
      title: "Target SEO Keywords",
      type: "array",
      of: [{ type: "string" }],
      description: "Add keywords like 'Low latency AI voice pipeline' or 'Next.js developer NYC'.",
    }),
    defineField({
      name: "image",
      title: "Main Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "body",
      title: "Content Body",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
    }),
  ],
});