"use client";

import { cn } from "@/libs/cn";
import { motion } from "motion/react";

export default function StatBlock({ value, label, suffix = "", className }) {
  return (
    <motion.div
      className={cn("text-center", className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="font-crimson text-5xl md:text-6xl lg:text-7xl font-bold text-primary-700 leading-none">
        {value}
        {suffix && <span className="text-3xl md:text-4xl">{suffix}</span>}
      </div>
      <div className="mt-3 w-12 h-px bg-primary-400 mx-auto" />
      <p className="mt-4 font-open text-sm tracking-widest uppercase text-secondary-500">
        {label}
      </p>
    </motion.div>
  );
}
