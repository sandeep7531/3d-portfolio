"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { metrics, brands } from "@/data/resume";

function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState("");

  const match = value.match(/^([\d.]+)(.*)$/);
  const target = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : value;

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => {
        setDisplay(
          Number.isInteger(target)
            ? Math.round(v).toString()
            : v.toFixed(1)
        );
      },
    });
    return () => controls.stop();
  }, [inView, target]);

  return (
    <span ref={ref} className="font-display text-4xl md:text-5xl font-semibold text-emerald-300">
      {display}
      {suffix}
    </span>
  );
}

export default function Metrics() {
  return (
    <section className="border-y border-neutral-800 bg-neutral-900/60">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <p className="font-mono text-xs tracking-widest text-emerald-400 mb-3">
          02 / PROOF IN NUMBERS
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-12 max-w-md">
          Shipped. Measured. Repeated.
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <Counter value={m.value} />
              <p className="mt-2 font-mono text-xs text-neutral-400 leading-snug">
                {m.label}
              </p>
              {m.note && (
                <p className="font-mono text-[10px] text-neutral-600 mt-1">
                  {m.note}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 flex flex-wrap items-center gap-2.5 border-t border-neutral-800 pt-8"
        >
          <span className="font-mono text-[10px] tracking-widest text-neutral-600 mr-2">
            PAST BRANDS &amp; COMPANIES:
          </span>
          {brands.map((b) => (
            <span
              key={b}
              className="font-mono text-[11px] px-3 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-emerald-400/40 hover:text-emerald-300 transition-colors"
            >
              {b}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}