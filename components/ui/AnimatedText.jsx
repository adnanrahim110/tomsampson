"use client";

import { cn } from "@/libs/cn";
import { motion, useReducedMotion } from "motion/react";

export default function AnimatedText({
  text,
  className,
  as = "p",
  animation = "words", // "words" | "characters" | "lines"
  staggerDelay = 0.03,
  initialDelay = 0,
  ...props
}) {
  const prefersReducedMotion = useReducedMotion();
  const Tag = as;

  if (prefersReducedMotion) {
    return (
      <Tag className={className} {...props}>
        {text}
      </Tag>
    );
  }

  const renderContent = () => {
    if (animation === "characters") {
      const characters = text.split("");
      return characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: initialDelay + index * staggerDelay,
            ease: "easeOut",
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ));
    }

    if (animation === "words") {
      const words = text.split(" ");
      return words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: initialDelay + index * staggerDelay,
            ease: "easeOut",
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ));
    }

    // Lines animation - split by newlines
    const lines = text.split("\n");
    return lines.map((line, index) => (
      <motion.span
        key={index}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
          delay: initialDelay + index * 0.1,
          ease: "easeOut",
        }}
        className="block"
      >
        {line}
      </motion.span>
    ));
  };

  return (
    <Tag className={cn("overflow-hidden", className)} {...props}>
      {renderContent()}
    </Tag>
  );
}
