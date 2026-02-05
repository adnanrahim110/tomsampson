"use client";

import { motion, useReducedMotion } from "motion/react";

export default function TextReveal({
  children,
  className = "",
  delay = 0,
  staggerChildren = 0.03,
  type = "words", // "words" | "chars" | "lines"
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <span className={className}>{children}</span>;
  }

  const text = typeof children === "string" ? children : "";

  let elements = [];

  if (type === "chars") {
    elements = text.split("").map((char, i) => (
      <motion.span
        key={i}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        className="inline-block"
        style={{ whiteSpace: char === " " ? "pre" : "normal" }}
      >
        {char}
      </motion.span>
    ));
  } else if (type === "words") {
    elements = text.split(" ").map((word, i) => (
      <motion.span
        key={i}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        className="inline-block mr-[0.25em]"
      >
        {word}
      </motion.span>
    ));
  } else {
    elements = text.split("\n").map((line, i) => (
      <motion.span
        key={i}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}
        className="block"
      >
        {line}
      </motion.span>
    ));
  }

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren,
            delayChildren: delay,
          },
        },
      }}
    >
      {elements}
    </motion.span>
  );
}
