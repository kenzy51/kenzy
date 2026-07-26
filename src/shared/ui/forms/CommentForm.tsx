import { useState } from "react";

interface Comment {
  _id: string;
  name: string;
  comment: string;
  _createdAt?: string;
}

// Add comments to PostProps interface
interface PostProps {
  post: {
    _id: string;
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    keywords: string[];
    image: any;
    body: any;
    readTime: string;
    language: string;
    comments?: Comment[];
    authorData?: any;
  };
}

// Dark/Cyber Styled Comment Form
export const TechCommentForm = ({ postId }: { postId: string }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    const formElement = e.currentTarget;

    try {
      const response = await fetch("/api/createComment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId,
          name: formData.get("name"),
          comment: formData.get("comment"),
        }),
      });

      if (response.ok) {
        setStatus({ type: "success", msg: "Comment submitted for approval." });
        formElement.reset();
      } else {
        setStatus({ type: "error", msg: "Error submitting comment. Please try again." });
      }
    } catch (error) {
      console.error(error);
      setStatus({ type: "error", msg: "Server error occurred." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-16 p-6 sm:p-8 rounded-xl border border-neutral-800 bg-neutral-900/40 backdrop-blur-sm"
    >
      <h3 className="text-xs font-mono uppercase tracking-[0.2em] mb-6 text-cyan-400 font-bold flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        Leave a comment
      </h3>

      <div className="space-y-4">
        <input
          name="name"
          placeholder="Your Name / Handle"
          className="w-full p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-cyan-500/50 transition-colors font-mono"
          required
        />
        <textarea
          name="comment"
          placeholder="Write your comment or question..."
          rows={4}
          className="w-full p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-cyan-500/50 transition-colors font-mono"
          required
        />
      </div>

      {status && (
        <div
          className={`mt-4 p-3 rounded-md text-xs font-mono ${
            status.type === "success"
              ? "bg-cyan-950/50 border border-cyan-800 text-cyan-300"
              : "bg-red-950/50 border border-red-800 text-red-300"
          }`}
        >
          {status.msg}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 text-xs font-mono font-bold uppercase tracking-widest bg-cyan-500 text-black px-6 py-3 rounded-lg hover:bg-cyan-400 disabled:opacity-50 transition-all shadow-lg shadow-cyan-500/10"
      >
        {loading ? "Submitting..." : "Submit Comment"}
      </button>
    </form>
  );
};