import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const LeadForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    navigator.vibrate([100, 50, 100]);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        navigator.vibrate([100, 50, 100]);
        setStatus("success");
        setFormData({ name: "", email: "", company: "", message: "" });
        toast.success("Your information was sucessfully submitted!");
      } else {
        setStatus("error");
      }
    } catch (err) {
      toast.error("Something went wrong!");
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh] min-w-[350px] max-w-[500px] w-[auto]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-white text-center">
          Fill the form{" "}
        </h2>

        <div>
          <label className="block text-sm text-gray-200 mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            placeholder="Your name"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-200 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            placeholder="Your email"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-200 mb-2">Company</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            placeholder="Company (optional)"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-200 mb-2">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            placeholder="Your message"
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="p-2 sm:p-3 rounded-xl border border-[rgba(255,255,255,0.4)] bg-[rgba(90,90,90,0.6)] backdrop-blur-md shadow-lg scale-105 shadow-[rgba(0,0,0,0.45)] transition-all duration-300 text-white cursor-pointer"
        >
          {status === "loading" ? "Sending..." : "Send Message"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default LeadForm;
