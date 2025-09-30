// pages/api/contact.ts
import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    company: String,
    message: String,
  },
  { timestamps: true }
);
// @ts-ignore
const Lead = mongoose.models.Lead || mongoose.model("Lead", LeadSchema);

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI as string);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  try {
    await connectDB();

    const { name, email, company, message } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "Name and Email are required" });
    }

    const lead = new Lead({ name, email, company, message });
    await lead.save();

    return res.status(200).json({ success: true, lead });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
}
