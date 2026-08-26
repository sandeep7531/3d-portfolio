"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { agentsMdContent } from "@/data/resume";

export default function AgentsBlock() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(agentsMdContent);
    } catch {
      // Fallback for restricted contexts
      const ta = document.createElement("textarea");
      ta.value = agentsMdContent;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="agents"
      className="mx-auto max-w-6xl px-6 pb-24 md:pb-32 scroll-mt-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/80 shadow-2xl shadow-black/40"
      >
        <div className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-emerald-400/10 blur-[100px]" />

        <div className="relative">
          <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-neutral-800">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
              <span className="font-mono text-[11px] text-neutral-400 ml-3">
                /public/AGENTS.md
              </span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="/AGENTS.md"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[11px] px-3 py-1.5 rounded-md border border-neutral-800 text-neutral-400 hover:border-emerald-400/50 hover:text-emerald-300 transition-colors"
              >
                open raw
              </a>
              <button
                onClick={handleCopy}
                className={`inline-flex items-center gap-2 font-mono text-[11px] px-3 py-1.5 rounded-md border transition-all ${
                  copied
                    ? "border-emerald-400 text-emerald-300"
                    : "border-neutral-800 text-neutral-300 hover:border-emerald-400/50 hover:text-emerald-300"
                }`}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "copied!" : "copy AGENTS.md"}
              </button>
            </div>
          </div>

          <div className="px-5 py-5 md:px-7 md:py-7 font-mono text-[12.5px] leading-6 text-neutral-300 overflow-x-auto scrollbar-thin whitespace-pre">
            {agentsMdContent}
          </div>
        </div>
      </motion.div>
    </section>
  );
}