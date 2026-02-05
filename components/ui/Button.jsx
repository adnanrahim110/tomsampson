"use client";

import { cn } from "@/libs/cn";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

const variants = {
  primary:
    "bg-primary-700 text-cream border-2 border-primary-700 hover:bg-primary-800 hover:border-primary-800 shadow-md shadow-primary-900/10",
  secondary:
    "bg-parchment text-secondary-800 border-2 border-secondary-300 hover:bg-paper hover:border-secondary-400",
  outline:
    "bg-transparent border-2 border-primary-600 text-primary-700 hover:bg-primary-50 hover:border-primary-700",
  ghost:
    "bg-transparent text-primary-700 hover:text-primary-800 border-b-2 border-transparent hover:border-primary-400 rounded-none !px-0",
};

const sizes = {
  sm: "px-5 py-2.5 text-sm gap-2 tracking-wide",
  md: "px-7 py-3.5 text-base gap-2 tracking-wide",
  lg: "px-9 py-4 text-lg gap-3 tracking-wide",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className,
  showArrow = false,
  disabled = false,
  type = "button",
  onClick,
  ...props
}) {
  const baseClasses = cn(
    "relative inline-flex items-center justify-center font-crimson font-semibold transition-all duration-300 ease-out",
    "focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-cream",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "uppercase text-sm",
    variants[variant],
    sizes[size],
    className,
  );

  const content = (
    <>
      <span>{children}</span>
      {showArrow && (
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  );

  const MotionComponent = href ? motion.create(Link) : motion.button;

  return (
    <MotionComponent
      href={href}
      type={!href ? type : undefined}
      disabled={disabled}
      onClick={onClick}
      className={cn(baseClasses, "group")}
      whileHover={{ y: -1 }}
      whileTap={{ y: 0 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {content}
    </MotionComponent>
  );
}
