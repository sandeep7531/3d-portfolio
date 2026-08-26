"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, FileCode2 } from "lucide-react";
import { profile } from "@/data/resume";

const treeLines = [
  { indent: 0, text: "<App>", comment: "" },
  { indent: 1, text: "<SDK.PaymentsGateway />", comment: "Razorpay" },
  { indent: 1, text: "<SDK.BankLink />", comment: "Plaid" },
  { indent: 1, text: "<Feature flag=\"ai-workflows\" />", comment: "" },
  { indent: 1, text: "<DesignSystem source=\"figma\" />", comment: "" },
  { indent: 0, text: "</App>", comment: "" },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative pt-36 pb-20 md:pt-44 md:pb-28 bg-grid bg-noise overflow-hidden"
    >
      <div className="pointer-events-none absolute -top-40 right-[-10%] h-96 w-96 rounded-full bg-emerald-400/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-20%] left-[-10%] h-80 w-80 rounded-full bg-teal-500/10 blur-[120px]" />

      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-[1.1fr_0.9fr] gap-12 items-start">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/60 px-3 py-1 font-mono text-[11px] tracking-wide text-neutral-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            {profile.availability}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.05] text-balance"
          >
            {profile.name}
            <span className="block mt-2 text-neutral-300 text-2xl sm:text-3xl md:text-4xl font-medium">
              {profile.role}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 max-w-xl text-neutral-400 text-base md:text-lg leading-relaxed"
          >
            {profile.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-md bg-emerald-400 text-neutral-950 font-medium text-sm px-5 py-3 hover:brightness-110 hover:shadow-[0_0_20px_rgba(52,211,153,0.35)] transition"
            >
              Contact Me <ArrowUpRight size={16} />
            </a>
            <a
              href="#agents"
              className="inline-flex items-center gap-2 rounded-md border border-neutral-800 font-mono text-sm px-5 py-3 hover:border-emerald-400/60 hover:text-emerald-300 transition-colors"
            >
              <FileCode2 size={16} /> AGENTS.md
            </a>

            <div className="flex items-center gap-3 ml-1">
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="h-10 w-10 rounded-md border border-neutral-800 flex items-center justify-center hover:border-emerald-400/60 hover:text-emerald-300 transition-colors"
              >
                <Github size={16} />
              </a>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="h-10 w-10 rounded-md border border-neutral-800 flex items-center justify-center hover:border-emerald-400/60 hover:text-emerald-300 transition-colors"
              >
                <Linkedin size={16} />
              </a>
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="h-10 w-10 rounded-md border border-neutral-800 flex items-center justify-center hover:border-emerald-400/60 hover:text-emerald-300 transition-colors"
              >
                <Mail size={16} />
              </a>
            </div>
          </motion.div>
        </div>
<motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="rounded-lg border border-neutral-800 bg-neutral-900/70 overflow-hidden shadow-2xl shadow-black/40 backdrop-blur-sm"
        >
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-neutral-800">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
            <span className="font-mono text-[11px] text-neutral-500 ml-3">sdk.tsx</span>
          </div>
          <div className="p-5 font-mono text-[13px] leading-7">
            {treeLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.6 + i * 0.08 }}
                style={{ paddingLeft: line.indent * 18 }}
                className="flex items-center gap-3 whitespace-pre"
              >
                <span className="text-emerald-300">{line.text}</span>
                {line.comment && (
                  <span className="text-neutral-600 text-[11px]">
                    {`// ${line.comment}`}
                  </span>
                )}
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="mt-2 text-neutral-500 cursor-blink"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}