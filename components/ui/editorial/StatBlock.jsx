"use client";

import { cn } from "@/libs/cn";
import { motion } from "motion/react";

export default function StatBlock({
  value,
  label,
  suffix = "",
  className,
  variant = "default",
}) {
  const isDark = variant === "dark";

  return (
    <motion.div
      className={cn("text-center", className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div
        className={cn(
          "font-crimson text-5xl md:text-6xl lg:text-7xl font-bold leading-none",
          isDark ? "text-white" : "text-primary-600",
        )}
      >
        {value}
        {suffix && <span className="text-3xl md:text-4xl">{suffix}</span>}
      </div>
      <div
        className={cn(
          "mt-3 w-12 h-0.5 mx-auto",
          isDark ? "bg-white/50" : "bg-primary-500",
        )}
      />
      <p
        className={cn(
          "mt-4 font-open text-sm tracking-widest uppercase",
          isDark ? "text-white/70" : "text-secondary-600",
        )}
      >
        {label}
      </p>
    </motion.div>
  );
}
