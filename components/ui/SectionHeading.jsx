"use client";

import { cn } from "@/libs/cn";
import { motion, useReducedMotion } from "motion/react";

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
  className,
  titleClassName,
  subtitleClassName,
  accentColor = "primary",
}) {
  const prefersReducedMotion = useReducedMotion();

  const alignmentClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  };

  const accentColors = {
    primary: "bg-primary-500",
    secondary: "bg-secondary-500",
  };

  return (
    <div
      className={cn(
        "max-w-3xl mb-12 md:mb-16",
        alignmentClasses[align],
        className,
      )}
    >
      <motion.div
        initial={prefersReducedMotion ? {} : { width: 0 }}
        whileInView={
          prefersReducedMotion ? {} : { width: align === "center" ? 80 : 60 }
        }
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "h-1 rounded-full mb-6",
          accentColors[accentColor],
          align === "center" && "mx-auto",
          align === "right" && "ml-auto",
        )}
      />
      <motion.h2
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
        whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={cn(
          "font-crimson text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-900",
          titleClassName,
        )}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={cn(
            "mt-4 text-lg md:text-xl text-secondary-600 font-open-sans",
            subtitleClassName,
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
