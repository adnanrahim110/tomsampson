"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";

export default function CourtBackground({
  className = "",
  opacity = 0.08,
  parallaxSpeed = 0.3,
}) {
  const { scrollYProgress } = useScroll();

  const y = useTransform(scrollYProgress, [0, 1], [0, 300 * parallaxSpeed]);

  return (
    <motion.div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ y }}
    >
      <Image
        src="/imgs/effects/court.png"
        alt=""
        fill
        className="object-cover"
        style={{ opacity }}
      />
    </motion.div>
  );
}
