// src/pages/api/createComment.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@sanity/client";

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: false, // Must be false to use the write token
  token: process.env.SANITY_API_WRITE_TOKEN, // Add this to your .env.local
  apiVersion: "2026-05-29",
};

const client = createClient(config);
// src/pages/api/createComment.ts
export default async function createComment(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const token = process.env.SANITY_API_WRITE_TOKEN;
  console.log("Token length:", token?.length);
  console.log("Dataset:", process.env.NEXT_PUBLIC_SANITY_DATASET);
  if (!token) {
    return res.status(500).json({ message: "Token missing from environment" });
  }
  // REMOVE: const { postId, name, comment } = JSON.parse(req.body);

  // USE THIS: Next.js already parsed it for you
  const { postId, name, comment } = req.body;

  try {
    await client.create({
      _type: "comment",
      post: { _type: "reference", _ref: postId },
      name,
      comment,
      approved: false,
    });
    return res.status(200).json({ message: "Comment submitted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: `Couldn't submit comment`, err });
  }
}
