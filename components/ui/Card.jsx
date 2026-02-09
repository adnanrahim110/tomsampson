"use client";

import { cn } from "@/libs/cn";
import { motion, useReducedMotion } from "motion/react";

export default function Card({
  children,
  className,
  hover = true,
  padding = "md",
  ...props
}) {
  const prefersReducedMotion = useReducedMotion();

  const paddingSizes = {
    none: "",
    sm: "p-4",
    md: "p-6 md:p-8",
    lg: "p-8 md:p-10",
  };

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={hover && !prefersReducedMotion ? { y: -4 } : {}}
      className={cn(
        "bg-white border border-secondary-200",
        "transition-all duration-300",
        hover && "hover:border-primary-400 hover:bg-primary-50/30",
        paddingSizes[padding],
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
