"use client";

import { motion } from "framer-motion";
import { stackGroups } from "@/data/resume";

export default function Stack() {
  return (
    <section id="stack" className="border-y border-neutral-800 bg-neutral-900/40">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="mb-12 flex items-end justify-between gap-6 flex-wrap">
          <div>
            <p className="font-mono text-xs tracking-widest text-emerald-400 mb-3">
              04 / TECH STACK
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold max-w-xl">
              Tools I reach for, grouped by what they do.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-neutral-500">
            Production-proven across fintech, proptech, and AI-driven products.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {stackGroups.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: gi * 0.05 }}
              className="rounded-lg border border-neutral-800 bg-neutral-900/60 p-6 hover:border-neutral-600 transition-colors"
            >
              <h3 className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-4 pb-3 border-b border-neutral-800">
                <span className="text-emerald-400">
                  {String(gi + 1).padStart(2, "0")} /
                </span>{" "}
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="text-[13px] px-3 py-1.5 rounded-md border border-neutral-800 bg-neutral-950/50 text-neutral-300 hover:border-emerald-400/50 hover:text-emerald-300 transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}