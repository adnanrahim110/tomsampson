"use client";

import useInViewport from "@/components/hooks/useInViewport";
import { usePointer } from "@/components/providers/PointerProvider";
import { DividerLine } from "@/components/ui/editorial";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef } from "react";

export default function QuoteBreak({ quote, attribution, context }) {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const isInView = useInViewport(sectionRef, {
    rootMargin: "200px 0px",
    threshold: 0.1,
  });
  const pointer = usePointer();
  const fallbackPointerX = useMotionValue(0);
  const pointerX =
    prefersReducedMotion || !isInView
      ? fallbackPointerX
      : (pointer?.normX ?? fallbackPointerX);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const quoteY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const quoteScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const quoteOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 0.3, 0.3, 0],
  );

  const springConfig = { damping: 50, stiffness: 100 };
  const quoteRotate = useSpring(
    useTransform(pointerX, (latest) => latest * 10),
    springConfig,
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-parchment paper-texture editorial-spacing-md overflow-hidden"
    >
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-crimson text-[40rem] leading-none text-secondary-200 pointer-events-none select-none"
        style={
          prefersReducedMotion || !isInView
            ? {}
            : {
                y: quoteY,
                scale: quoteScale,
                opacity: quoteOpacity,
                rotate: quoteRotate,
              }
        }
      >
        "
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 relative">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <DividerLine variant="ornament" className="mb-12 !mt-0" />

          <blockquote className="font-crimson text-3xl md:text-4xl lg:text-5xl italic text-secondary-800 leading-snug">
            "{quote}"
          </blockquote>

          {attribution && (
            <footer className="mt-10">
              <cite className="not-italic">
                <span className="block font-crimson text-lg font-semibold text-secondary-900">
                  {attribution}
                </span>
                {context && (
                  <span className="block mt-1 font-open text-sm tracking-wide text-secondary-500">
                    {context}
                  </span>
                )}
              </cite>
            </footer>
          )}

          <DividerLine variant="ornament" className="mt-12 !mb-0" />
        </motion.div>
      </div>
    </section>
  );
}
