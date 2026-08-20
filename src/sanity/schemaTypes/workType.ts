// schemas/work.ts
import { defineField, defineType } from "sanity";

export const workType = defineType({
  name: "work",
  title: "Case Study / Work",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Project Title",
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
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "AI & Automation", value: "AI & Automation" },
          { title: "Web Systems", value: "Web Systems" },
          { title: "SaaS & Growth", value: "SaaS & Growth" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured Project",
      type: "boolean",
      description: "Toggle to highlight this project in your portfolio grids.",
      initialValue: false,
    }),
    defineField({
      name: "liveUrl",
      title: "Live Production URL",
      type: "url",
      description: "Direct link to the active website or platform.",
    }),
    defineField({
      name: "githubUrl",
      title: "GitHub Repository URL",
      type: "url",
      description: "Link to public source code (optional).",
    }),
    defineField({
      name: "description",
      title: "Short Summary",
      type: "text",
      description: "Brief overview for project cards (120-180 characters).",
      validation: (Rule) => Rule.max(200).required(),
    }),
    defineField({
      name: "tags",
      title: "Tech Stack Tags",
      type: "array",
      of: [{ type: "string" }],
      description: "Add tags like 'Next.js', 'TypeScript', 'NestJS', 'OpenAI'.",
    }),
    defineField({
      name: "image",
      title: "Cover / Thumbnail Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "language",
      title: "Language",
      type: "string",
      options: {
        list: [
          { title: "English", value: "en" },
          { title: "Russian", value: "ru" }        ],
      },
      initialValue: "en",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "translationOf",
      title: "Translation of",
      type: "reference",
      to: [{ type: "work" }],
      description: "Select the primary English entry if this is a translated case study.",
    }),
    defineField({
      name: "body",
      title: "Detailed Case Study Content",
      type: "array",
      of: [
        { type: "block" },
        { type: "code" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alternative Text (SEO)",
              type: "string",
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
        },
      ],
    }),
  ],
});