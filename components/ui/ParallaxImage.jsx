"use client";

import { cn } from "@/libs/cn";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useRef } from "react";

export default function ParallaxImage({
  src,
  alt,
  className,
  containerClassName,
  speed = 0.5,
  fill = false,
  width,
  height,
  priority = false,
  ...props
}) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [`${-speed * 100}px`, `${speed * 100}px`],
  );

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", containerClassName)}
    >
      <motion.div style={{ y }} className="h-full w-full">
        {fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            className={cn("object-cover", className)}
            {...props}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            className={cn("object-cover", className)}
            {...props}
          />
        )}
      </motion.div>
    </div>
  );
}
