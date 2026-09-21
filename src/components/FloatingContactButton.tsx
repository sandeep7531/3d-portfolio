"use client";

import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

export default function FloatingContactButton() {
  const handleClick = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      aria-label="Scroll to contact section"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.4 }}
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-emerald-400/30 bg-neutral-900/90 py-3 pl-4 pr-4 text-sm font-medium text-neutral-100 shadow-lg shadow-black/40 backdrop-blur-md transition-all hover:border-emerald-400/60 hover:shadow-[0_0_24px_rgba(52,211,153,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 md:bottom-8 md:right-8"
    >
      <MessageSquare
        size={18}
        className="shrink-0 text-emerald-400 transition-transform duration-200 group-hover:scale-110"
      />
      <span className="hidden sm:inline">Contact Me</span>
    </motion.button>
  );
}
