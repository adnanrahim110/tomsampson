"use client";

import useInViewport from "@/components/hooks/useInViewport";
import Button from "@/components/ui/Button";
import MagneticElement from "@/components/ui/MagneticElement";
import { ctaContent } from "@/constants";
import { cn } from "@/libs/cn";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useRef } from "react";

export default function CTA({
  heading = ctaContent.heading,
  subheading = ctaContent.subheading,
  buttonText = ctaContent.buttonText,
  buttonLink = ctaContent.buttonLink,
  className,
}) {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const isInView = useInViewport(sectionRef, {
    rootMargin: "300px 0px",
    threshold: 0.1,
  });
  const enableLoopAnimations = isInView && !prefersReducedMotion;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const ballY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const ballY2 = useTransform(scrollYProgress, [0, 1], [20, -50]);

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative editorial-spacing-md overflow-hidden",
        "bg-primary-700 paper-texture paper-texture-dark",
        className,
      )}
    >
      {/* Parallax background texture */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <Image
          src="/imgs/effects/court.png"
          alt=""
          fill
          className="object-cover opacity-[0.06]"
          sizes="100vw"
        />
      </motion.div>

      {/* Floating tennis balls */}
      <motion.div
        className="absolute right-[10%] top-[20%] w-16 h-16 pointer-events-none hidden lg:block"
        style={{ y: ballY }}
      >
        <motion.div
          className="will-change-transform"
          animate={
            enableLoopAnimations
              ? { y: [0, -15, 0], rotate: [0, 25, 0] }
              : { y: 0, rotate: 0 }
          }
          transition={
            enableLoopAnimations
              ? { repeat: Infinity, duration: 5, ease: "easeInOut" }
              : {}
          }
        >
          <Image
            src="/imgs/effects/ball.png"
            alt=""
            width={64}
            height={64}
            className="opacity-30 drop-shadow-xl"
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute left-[8%] bottom-[25%] w-10 h-10 pointer-events-none hidden lg:block"
        style={{ y: ballY2 }}
      >
        <motion.div
          className="will-change-transform"
          animate={enableLoopAnimations ? { y: [0, -10, 0] } : { y: 0 }}
          transition={
            enableLoopAnimations
              ? {
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                  delay: 1,
                }
              : {}
          }
        >
          <Image
            src="/imgs/effects/ball.png"
            alt=""
            width={40}
            height={40}
            className="opacity-25 drop-shadow-xl"
          />
        </motion.div>
      </motion.div>

      {/* Corner ornaments */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-cream/20" />
        <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-cream/20" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-cream/20" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-cream/20" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-12 lg:px-16 text-center">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-4 mb-10"
        >
          <span className="w-16 h-px bg-cream/30" />
          <span className="font-crimson text-xs tracking-[0.4em] uppercase text-cream/60">
            Get the Book
          </span>
          <span className="w-16 h-px bg-cream/30" />
        </motion.div>

        <motion.h2
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-crimson text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-4 leading-tight"
        >
          {heading}
        </motion.h2>

        <motion.p
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-crimson text-xl md:text-2xl italic text-primary-100/80 mb-12 max-w-3xl mx-auto"
        >
          {subheading}
        </motion.p>

        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <MagneticElement strength={0.2}>
            <Button
              href={buttonLink}
              variant="secondary"
              size="lg"
              className="bg-cream text-primary-800 hover:bg-paper border-none shadow-xl"
            >
              {buttonText}
            </Button>
          </MagneticElement>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center justify-center gap-4 mt-12"
        >
          <span className="w-12 h-px bg-cream/30" />
          <span className="text-cream/40 text-2xl">❧</span>
          <span className="w-12 h-px bg-cream/30" />
        </motion.div>
      </div>
    </section>
  );
}
