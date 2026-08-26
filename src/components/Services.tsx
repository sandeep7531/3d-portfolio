"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { services } from "@/data/resume";

function ServiceCard({ service, index }: { service: (typeof services)[number]; index: number }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`rounded-lg border transition-colors duration-300 ${
        open
          ? "border-emerald-400/40 bg-neutral-900/80"
          : "border-neutral-800 bg-neutral-900/40 hover:border-neutral-600"
      }`}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-start gap-4 p-6 text-left"
      >
        <span className="font-mono text-xs text-neutral-500 mt-1.5 shrink-0">
          {service.index}
        </span>
        <span className="flex-1">
          <span className="block font-display text-lg font-semibold">
            {service.title}
          </span>
          <span
            className={`mt-2 block text-sm leading-relaxed ${
              open ? "text-neutral-300" : "text-neutral-500"
            }`}
          >
            {service.summary}
          </span>
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className={`mt-1.5 shrink-0 ${open ? "text-emerald-300" : "text-neutral-500"}`}
        >
          <ChevronDown size={18} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="scope"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pl-12">
              <div className="flex flex-wrap gap-2">
                {service.scope.map((item) => (
                  <span
                    key={item}
                    className="font-mono text-[11px] px-3 py-1.5 rounded-md border border-neutral-800 bg-neutral-950/60 text-neutral-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="mb-12 flex items-end justify-between gap-6 flex-wrap">
        <div>
          <p className="font-mono text-xs tracking-widest text-emerald-400 mb-3">
            01 / KEY CAPABILITIES
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold max-w-xl">
            Three ways I move the needle.
          </h2>
        </div>
        <p className="max-w-sm text-sm text-neutral-500">
          Tap a card to open the full scope — everything listed is something I&apos;ve shipped in production.
        </p>
      </div>

      <div className="space-y-4">
        {services.map((service, i) => (
          <ServiceCard key={service.index} service={service} index={i} />
        ))}
      </div>
    </section>
  );
}