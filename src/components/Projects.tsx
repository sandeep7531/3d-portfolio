"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/resume";

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="mb-12 flex items-end justify-between gap-6 flex-wrap">
        <div>
          <p className="font-mono text-xs tracking-widest text-emerald-400 mb-3">
            05 / SELECTED PROJECTS
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold max-w-xl">
            Shipped end to end, from architecture to metrics.
          </h2>
        </div>
        <p className="max-w-sm text-sm text-neutral-500">
          A few highlights — each one was architected, built, and measured in production.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {projects.map((p, i) => (
          <motion.article
            key={p.name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: (i % 2) * 0.08 }}
            className="group rounded-lg border border-neutral-800 bg-neutral-900/60 p-6 flex flex-col justify-between hover:border-emerald-400/50 hover:shadow-[0_0_30px_rgba(52,211,153,0.06)] transition-all"
          >
            <div>
              <h3 className="font-display text-lg font-semibold mb-2">{p.name}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed mb-5">
                {p.description}
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="font-mono text-[10px] px-2 py-1 rounded border border-neutral-800 bg-neutral-950/60 text-neutral-400"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-amber-300">
                {p.metrics.map((m) => (
                  <span key={m}>▲ {m}</span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}