"use client";

import { useRef, useEffect, useState } from "react";
import type { MouseEvent } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, FileCode2 } from "lucide-react";
import { profile } from "@/data/resume";
import type { CursorTarget } from "./HeroCanvas";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

const treeLines = [
  { indent: 0, text: "<App>", comment: "" },
  { indent: 1, text: "<SDK.PaymentsGateway />", comment: "Razorpay" },
  { indent: 1, text: "<SDK.BankLink />", comment: "Plaid" },
  { indent: 1, text: "<Feature flag=\"ai-workflows\" />", comment: "" },
  { indent: 1, text: "<DesignSystem source=\"figma\" />", comment: "" },
  { indent: 0, text: "</App>", comment: "" },
];

function Magnetic({
  children,
  className,
  strength = 0.35,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 15, mass: 0.2 });
  const y = useSpring(0, { stiffness: 200, damping: 15, mass: 0.2 });
  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className={className}
      onMouseMove={(e: MouseEvent<HTMLDivElement>) => {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        x.set(dx * strength);
        y.set(dy * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

function HeroInner() {
  const sectionRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<CursorTarget>({ x: 0, y: 0, active: false });

  const [mounted, setMounted] = useState(false);

  // Auto-download resume on first visit per session
  useEffect(() => {
    setMounted(true);
    const hasDownloaded = sessionStorage.getItem("resumeDownloaded");
    if (!hasDownloaded) {
      const link = document.createElement("a");
      link.href = "/resume.pdf"; // Path inside public folder
      link.download = "Sandeep_Rai_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      sessionStorage.setItem("resumeDownloaded", "true");
    }
  }, []);

  // Smooth spring-following spotlight glow
  const glowX = useMotionValue(-1200);
  const glowY = useMotionValue(-1200);
  const glowSpringX = useSpring(glowX, { stiffness: 55, damping: 18, mass: 0.4 });
  const glowSpringY = useSpring(glowY, { stiffness: 55, damping: 18, mass: 0.4 });

  // 3D code-card tilt + scale
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const tiltX = useSpring(rotX, { stiffness: 160, damping: 16, mass: 0.25 });
  const tiltY = useSpring(rotY, { stiffness: 160, damping: 16, mass: 0.25 });
  const cardScale = useSpring(1, { stiffness: 220, damping: 18 });

  // Moving sheen across the card
  const glareRawX = useMotionValue(0.5);
  const glareRawY = useMotionValue(0.5);
  const glareX = useTransform(glareRawX, [0, 1], [0, 100]);
  const glareY = useTransform(glareRawY, [0, 1], [0, 100]);
  const glare = useMotionTemplate`radial-gradient(320px circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.10), transparent 60%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    sectionRef.current!.style.setProperty("--mx", `${px}px`);
    sectionRef.current!.style.setProperty("--my", `${py}px`);
    glowX.set(px - 320);
    glowY.set(py - 320);
    cursorRef.current.x = (px / rect.width) * 2 - 1;
    cursorRef.current.y = (py / rect.height) * 2 - 1;
    cursorRef.current.active = true;
  };

  const handleCardMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const nx = (px / rect.width) * 2 - 1;
    const ny = (py / rect.height) * 2 - 1;
    rotY.set(nx * 10);
    rotX.set(-ny * 10);
    glareRawX.set(nx / 2 + 0.5);
    glareRawY.set(ny / 2 + 0.5);
  };

  const resetCard = () => {
    rotX.set(0);
    rotY.set(0);
    cardScale.set(1);
  };

  return (
    <section
      id="top"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative isolate overflow-hidden bg-grid bg-noise pt-36 pb-20 md:pt-44 md:pb-28"
    >
      {/* WebGL particle / wireframe canvas */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-90">
        {mounted && <HeroCanvas cursor={cursorRef} />}
      </div>

      {/* CSS-var cursor spotlight ring */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(560px circle at var(--mx, 30%) var(--my, 42%), rgba(34,197,94,0.13), transparent 62%)",
        }}
      />

      {/* Smooth spring glow blob */}
      <motion.div
        aria-hidden
        style={{ x: glowSpringX, y: glowSpringY }}
        className="pointer-events-none absolute left-0 top-0 z-0 h-[40rem] w-[40rem] rounded-full opacity-50"
      >
        <div className="h-full w-full rounded-full bg-green-500/15 blur-[90px]" />
      </motion.div>

      {/* Decorative static auras */}
      <div className="pointer-events-none absolute -top-40 right-[-10%] z-0 h-96 w-96 rounded-full bg-emerald-400/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-20%] left-[-10%] z-0 h-80 w-80 rounded-full bg-teal-500/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 grid items-start gap-12 md:grid-cols-[1.1fr_0.9fr]">
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
            <span className="mt-2 block text-2xl font-medium text-neutral-300 sm:text-3xl md:text-4xl">
              {profile.role}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-neutral-400 md:text-lg"
          >
            {profile.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            {/*__BUTTONS__*/}
            <Magnetic>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-md border border-emerald-500/30 bg-emerald-900/80 px-5 py-3 text-sm font-medium text-emerald-100 transition-colors hover:border-emerald-400 hover:bg-emerald-800 hover:text-white"
              >
                Contact Me <ArrowUpRight size={16} />
              </a>
            </Magnetic>

            <Magnetic strength={0.25}>
              <a
                href="#agents"
                className="inline-flex items-center gap-2 rounded-md border border-neutral-800 px-5 py-3 font-mono text-sm transition-colors hover:border-emerald-400/60 hover:text-emerald-300"
              >
                <FileCode2 size={16} /> AGENTS.md
              </a>
            </Magnetic>

            <Magnetic strength={0.5}>
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-md border border-neutral-800 transition-colors hover:border-emerald-400/60 hover:text-emerald-300"
              >
                <Github size={16} />
              </a>
            </Magnetic>

            <Magnetic strength={0.5}>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-md border border-neutral-800 transition-colors hover:border-emerald-400/60 hover:text-emerald-300"
              >
                <Linkedin size={16} />
              </a>
            </Magnetic>

            <Magnetic strength={0.5}>
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-md border border-neutral-800 transition-colors hover:border-emerald-400/60 hover:text-emerald-300"
              >
                <Mail size={16} />
              </a>
            </Magnetic>
          </motion.div>
        </div>

        {/* 3D tiltable code card — outer supplies entrance, inner does the tilt */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative"
          style={{ perspective: 1100 }}
        >
          <motion.div
            onMouseMove={handleCardMove}
            onMouseEnter={() => cardScale.set(1.03)}
            onMouseLeave={resetCard}
            style={{
              rotateX: tiltX,
              rotateY: tiltY,
              scale: cardScale,
              transformStyle: "preserve-3d",
            }}
            className="group relative overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/70 shadow-2xl shadow-black/40 backdrop-blur-sm"
          >
            <div className="flex items-center gap-1.5 border-b border-neutral-800 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
              <span
                className="ml-3 font-mono text-[11px] text-neutral-500"
                style={{ transform: "translateZ(30px)" }}
              >
                sdk.tsx
              </span>
            </div>

            <div
              className="p-5 font-mono text-[13px] leading-7"
              style={{ transform: "translateZ(20px)" }}
            >
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
                    <span className="text-[11px] text-neutral-600">
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

            {/* Cursor-following sheen */}
            <motion.div
              aria-hidden
              style={{ background: glare, opacity: 0.5 }}
              className="pointer-events-none absolute inset-0 z-10 mix-blend-soft-light"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default function Hero() {
  return <HeroInner />;
}