"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { profile } from "@/data/resume";

const links = [
  { href: "#services", label: "Services", num: "01" },
  { href: "#experience", label: "Experience", num: "02" },
  { href: "#stack", label: "Skills", num: "03" },
  { href: "#projects", label: "Projects", num: "04" },
  { href: "#agents", label: "AGENTS.md" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 border-b ${
        scrolled
          ? "bg-neutral-950/80 backdrop-blur-xl border-neutral-800"
          : "bg-transparent border-transparent"
      }`}
    >
      <nav className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <a href="#top" className="font-mono text-sm font-medium tracking-tight">
          <span className="text-neutral-500">~/</span>
          {profile.name.toLowerCase().replace(/ /g, "-")}
          <span className="text-emerald-400">_</span>
        </a>

        <ul className="hidden lg:flex items-center gap-1 font-mono text-xs text-neutral-400">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="px-3 py-2 rounded-md hover:text-neutral-50 hover:bg-neutral-900 transition-colors"
              >
                {l.num ? (
                  <>
                    <span className="text-neutral-600">{l.num} / </span>
                    {l.label}
                  </>
                ) : (
                  <span className="text-emerald-400">{l.label}</span>
                )}
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="lg:hidden inline-flex items-center justify-center h-9 w-9 rounded-md border border-neutral-800 text-neutral-300 hover:text-neutral-50 hover:border-neutral-600 transition-colors"
        >
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-neutral-950/95 backdrop-blur-xl border-t border-neutral-800"
          >
            <ul className="px-6 py-4 space-y-1 font-mono text-sm">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block px-3 py-2.5 rounded-md text-neutral-300 hover:text-neutral-50 hover:bg-neutral-900 transition-colors"
                  >
                    {l.num ? (
                      <>
                        <span className="text-neutral-500">{l.num} / </span>
                        {l.label}
                      </>
                    ) : (
                      <span className="text-emerald-400">{l.label}</span>
                    )}
                  </a>
                </li>
              ))}
              <li className="pt-2 px-3 font-mono text-[11px] text-neutral-500">
                {profile.email}
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}