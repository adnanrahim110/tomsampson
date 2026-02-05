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

  return (
    <section
      ref={containerRef}
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-cream paper-texture pt-38",
        compact ? "min-h-[55vh]" : "min-h-[75vh]",
        className,
      )}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[8%] top-0 bottom-0 w-px bg-secondary-200/40" />
        <div className="absolute right-[8%] top-0 bottom-0 w-px bg-secondary-200/40" />
        <div className="absolute left-0 right-0 bottom-0 h-px bg-secondary-200/40" />
      </div>

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
          <span className="w-16 h-px bg-primary-400" />
          <span className="w-2 h-2 bg-primary-500 rotate-45" />
          <span className="w-16 h-px bg-primary-400" />
        </motion.div>

        <motion.h1
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-crimson text-5xl md:text-6xl lg:text-7xl font-bold text-secondary-900 mb-6 tracking-tight"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-crimson text-xl md:text-2xl italic text-secondary-600 max-w-2xl mx-auto"
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
          <span className="w-12 h-px bg-secondary-300" />
          <span className="text-secondary-400 text-xl">❧</span>
          <span className="w-12 h-px bg-secondary-300" />
        </motion.div>
      </motion.div>
    </section>
  );
}
