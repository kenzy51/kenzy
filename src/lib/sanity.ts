// src/lib/sanity.ts
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { createImageUrlBuilder } from '@sanity/image-url';

export const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "8jboegtt", // Your actual Project ID
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",   // Your active dataset name
  apiVersion: "2024-03-19",
  useCdn: process.env.NODE_ENV === "production",
};

// Initialize the client to execute GROQ pipeline queries
export const sanityClient = createClient(config);

// Image asset builder configuration
const builder = imageUrlBuilder(sanityClient);
export const urlFor = (source: any) => createImageUrlBuilder(sanityClient).image(source);