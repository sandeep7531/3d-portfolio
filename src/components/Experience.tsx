"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { experience } from "@/data/resume";

export default function Experience() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="mb-12 flex items-end justify-between gap-6 flex-wrap">
        <div>
          <p className="font-mono text-xs tracking-widest text-emerald-400 mb-3">
            03 / WORK EXPERIENCE
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold max-w-xl">
            Four roles. One line of measurable impact.
          </h2>
        </div>
        <p className="max-w-sm text-sm text-neutral-500">
          Chronological, most recent first — every role shipped a quantified outcome, not just a feature list.
        </p>
      </div>

      <div className="border-l border-neutral-800 ml-3 space-y-4">
        {experience.map((job, i) => {
          const open = openIndex === i;
          return (
            <motion.div
              key={job.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="relative pl-8"
            >
              <span
                className={`absolute left-[-5px] top-6 h-[9px] w-[9px] rounded-full ring-4 ring-neutral-950 transition-colors ${
                  open ? "bg-emerald-400" : "bg-neutral-600"
                }`}
              />
              <div
                className={`rounded-lg border transition-colors ${
                  open
                    ? "border-emerald-400/40 bg-neutral-900/80"
                    : "border-neutral-800 bg-neutral-900/40 hover:border-neutral-600"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(open ? -1 : i)}
                  aria-expanded={open}
                  className="w-full flex flex-wrap items-center gap-x-4 gap-y-1 p-5 md:p-6 text-left"
                >
                  <span className="flex-1 min-w-[200px]">
                    <span className="block font-display text-lg md:text-xl font-semibold">
                      {job.company}
                    </span>
                    <span className="block text-sm text-emerald-300/90 mt-0.5">
                      {job.role}
                    </span>
                  </span>
                  <span className="font-mono text-xs text-neutral-500">
                    {job.start} — {job.end}
                  </span>
                  <motion.span
                    animate={{ rotate: open ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className={`ml-auto shrink-0 ${open ? "text-emerald-300" : "text-neutral-500"}`}
                  >
                    <Plus size={18} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      key="details"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 md:px-6 pb-6 grid md:grid-cols-[1fr_auto] gap-8">
                        <div>
                          <p className="text-xs text-neutral-500 mb-4">{job.context}</p>
                          <ul className="space-y-2.5">
                            {job.bullets.map((b, bi) => (
                              <li
                                key={bi}
                                className="flex gap-3 text-sm text-neutral-300 leading-relaxed"
                              >
                                <span className="text-emerald-400 mt-1 shrink-0">›</span>
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="flex flex-wrap gap-1.5 mt-5">
                            {job.tech.map((t) => (
                              <span
                                key={t}
                                className="font-mono text-[10px] px-2 py-1 rounded border border-neutral-800 bg-neutral-950/60 text-neutral-400"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex md:flex-col gap-3 md:w-40 shrink-0">
                          {job.metrics.map((m) => (
                            <div
                              key={m.label}
                              className="rounded-md border border-neutral-800 bg-neutral-950/60 px-4 py-3 font-mono"
                            >
                              <div className="text-lg font-semibold text-amber-300">{m.value}</div>
                              <div className="text-[10px] text-neutral-500 uppercase tracking-wide leading-tight mt-0.5">
                                {m.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}