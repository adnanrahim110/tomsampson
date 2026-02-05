"use client";

import { cn } from "@/libs/cn";
import { motion, useReducedMotion } from "motion/react";

export default function SectionWrapper({
  children,
  className,
  containerClassName,
  id,
  as = "section",
  fullWidth = false,
  noPadding = false,
  ...props
}) {
  const prefersReducedMotion = useReducedMotion();
  const Component = motion[as] || motion.section;

  return (
    <Component
      id={id}
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 40 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(!noPadding && "py-16 md:py-24 lg:py-32", className)}
      {...props}
    >
      <div
        className={cn(
          !fullWidth && "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
          containerClassName,
        )}
      >
        {children}
      </div>
    </Component>
  );
}
