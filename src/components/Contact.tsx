"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, Phone, Send } from "lucide-react";
import { profile } from "@/data/resume";

const inputCls =
  "w-full rounded-md border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-neutral-100 placeholder:text-neutral-600 focus:border-emerald-400/60 focus:outline-none focus:ring-1 focus:ring-emerald-400/40 transition-colors";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [sender, setSender] = useState({ name: "", mobile: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      mobile: String(data.get("mobile") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
      company: String(data.get("company") ?? ""), // honeypot — real users never fill this
    };

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Request failed with ${res.status}`);

      setSender({ name: payload.name.trim(), mobile: payload.mobile.trim() });
      setStatus("sent");
      form.reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
    }
  };

  return (
    <footer id="contact" className="border-t border-neutral-800 bg-neutral-900/40 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="font-mono text-xs tracking-widest text-emerald-400 mb-5"
        >
          CONTACT
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="font-display text-3xl md:text-5xl font-semibold text-balance max-w-2xl"
        >
          Looking for a senior frontend &amp; AI app engineer who ships measurable outcomes?
        </motion.h2>

        <div className="mt-12 grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-3"
          >
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center justify-between gap-4 rounded-lg border border-neutral-800 bg-neutral-950/50 px-5 py-4 hover:border-emerald-400/50 transition-colors group"
            >
              <span className="flex items-center gap-3 font-mono text-sm text-neutral-300">
                <Mail size={16} className="text-emerald-400 shrink-0" />
                {profile.email}
              </span>
              <ArrowUpRight size={16} className="text-neutral-600 group-hover:text-emerald-300 transition-colors" />
            </a>
            <a
              href={`tel:${profile.phoneHref}`}
              className="flex items-center justify-between gap-4 rounded-lg border border-neutral-800 bg-neutral-950/50 px-5 py-4 hover:border-emerald-400/50 transition-colors group"
            >
              <span className="flex items-center gap-3 font-mono text-sm text-neutral-300">
                <Phone size={16} className="text-emerald-400 shrink-0" />
                {profile.phone}
              </span>
              <ArrowUpRight size={16} className="text-neutral-600 group-hover:text-emerald-300 transition-colors" />
            </a>
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-4 rounded-lg border border-neutral-800 bg-neutral-950/50 px-5 py-4 hover:border-emerald-400/50 transition-colors group"
            >
              <span className="flex items-center gap-3 font-mono text-sm text-neutral-300">
                <Linkedin size={16} className="text-emerald-400 shrink-0" />
                {profile.linkedin}
              </span>
              <ArrowUpRight size={16} className="text-neutral-600 group-hover:text-emerald-300 transition-colors" />
            </a>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-4 rounded-lg border border-neutral-800 bg-neutral-950/50 px-5 py-4 hover:border-emerald-400/50 transition-colors group"
            >
              <span className="flex items-center gap-3 font-mono text-sm text-neutral-300">
                <Github size={16} className="text-emerald-400 shrink-0" />
                {profile.github}
              </span>
              <ArrowUpRight size={16} className="text-neutral-600 group-hover:text-emerald-300 transition-colors" />
            </a>
          </motion.div>
<motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="space-y-4"
          >
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />
            <div className="grid sm:grid-cols-2 gap-4">
              <input required type="text" name="name" placeholder="Your name" className={inputCls} />
              <input required type="tel" name="mobile" placeholder="Your mobile number" className={inputCls} />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Your email (optional)"
              className={inputCls}
            />
            <textarea
              required
              name="message"
              rows={5}
              placeholder="Tell me about the role or project..."
              className={inputCls}
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center gap-2 rounded-md bg-emerald-400 text-neutral-950 font-medium text-sm px-5 py-3 hover:brightness-110 hover:shadow-[0_0_20px_rgba(52,211,153,0.35)] transition disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send size={15} /> {status === "sending" ? "Sending…" : "Send message"}
            </button>
            {status === "sent" && (
              <p className="font-mono text-sm text-emerald-300">
                ✓ Thanks{sender.name ? ` ${sender.name}` : ""} — message received. I&apos;ll reach
                out at {sender.mobile} shortly.
              </p>
            )}
            {status === "error" && (
              <p className="font-mono text-sm text-red-400">
                ✕ Something went wrong — please try again or email me directly at{" "}
                <a
                  href={`mailto:${profile.email}`}
                  className="underline hover:text-emerald-300"
                >
                  {profile.email}
                </a>
                .
              </p>
            )}
          </motion.form>
        </div>
      </div>

      <div className="border-t border-neutral-800">
        <div className="mx-auto max-w-6xl px-6 py-6 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-neutral-500">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>Built with Next.js · Tailwind · Framer Motion</span>
          <span>{profile.location}</span>
        </div>
      </div>
    </footer>
  );
}