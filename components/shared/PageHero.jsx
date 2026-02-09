"use client";

import { cn } from "@/libs/cn";
import { ChevronDown } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";

export default function PageHero({
  title,
  subtitle,
  className,
  showScrollIndicator = true,
  compact = false,
}) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(
    scrollYProgress,
    [0, 0.5],
    prefersReducedMotion ? [0, 0] : [0, 100],
  );

  // Floating elements data
  const floatingElements = [
    { size: 120, x: "10%", y: "20%", delay: 0, duration: 8 },
    { size: 80, x: "85%", y: "15%", delay: 1, duration: 10 },
    { size: 60, x: "75%", y: "70%", delay: 2, duration: 7 },
    { size: 100, x: "20%", y: "75%", delay: 0.5, duration: 9 },
    { size: 40, x: "50%", y: "10%", delay: 1.5, duration: 6 },
    { size: 50, x: "90%", y: "50%", delay: 2.5, duration: 8 },
  ];

  return (
    <section
      ref={containerRef}
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-linear-to-br from-primary-700 via-primary-600 to-primary-800",
        compact
          ? "pt-32 pb-16 md:pt-40 md:pb-20"
          : "pt-40 pb-24 md:pt-48 md:pb-32",
        className,
      )}
    >
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-400/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary-900/30 blur-3xl" />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary-500/20 blur-3xl" />
      </div>

      {!prefersReducedMotion &&
        floatingElements.map((el, index) => (
          <motion.div
            key={index}
            className="absolute pointer-events-none"
            style={{ left: el.x, top: el.y }}
            initial={{ y: 0, rotate: 0 }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: el.duration,
              repeat: Infinity,
              delay: el.delay,
              ease: "easeInOut",
            }}
          >
            <div
              className="border border-white/20 rotate-45"
              style={{ width: el.size, height: el.size }}
            />
          </motion.div>
        ))}

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[8%] top-0 bottom-0 w-px bg-white/10" />
        <div className="absolute right-[8%] top-0 bottom-0 w-px bg-white/10" />
        <div className="absolute left-0 right-0 bottom-0 h-px bg-white/10" />
      </div>

      {!prefersReducedMotion &&
        [1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={`dot-${i}`}
            className="absolute w-2 h-2 bg-white/30"
            style={{
              left: `${15 + i * 18}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}

      <motion.div
        style={prefersReducedMotion ? {} : { opacity, y }}
        className="relative z-10 text-center max-w-4xl mx-auto px-6 sm:px-12 lg:px-16"
      >
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <span className="w-16 h-px bg-white/60" />
          <span className="w-2.5 h-2.5 bg-white/80 rotate-45" />
          <span className="w-16 h-px bg-white/60" />
        </motion.div>

        <motion.h1
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-crimson text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-crimson text-xl md:text-2xl italic text-white/80 max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}

        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center justify-center gap-4 mt-10"
        >
          <span className="w-12 h-px bg-white/40" />
          <span className="text-white/70 text-xl">❧</span>
          <span className="w-12 h-px bg-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
