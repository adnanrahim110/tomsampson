"use client";

import useInViewport from "@/components/hooks/useInViewport";
import Button from "@/components/ui/Button";
import { Book3D, ChapterHeading, DividerLine } from "@/components/ui/editorial";
import MagneticElement from "@/components/ui/MagneticElement";
import { bookInfo } from "@/constants";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useRef } from "react";

export default function AboutBook() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const isInView = useInViewport(sectionRef, {
    rootMargin: "200px 0px",
    threshold: 0.1,
  });
  const enableLoopAnimations = isInView && !prefersReducedMotion;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const bookY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const ballRightY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const ballLeftY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const chapters = [
    {
      number: "I",
      title: "The Decision",
      desc: "When families choose the tennis path",
    },
    {
      number: "II",
      title: "The Investment",
      desc: "Financial realities and sacrifices",
    },
    { number: "III", title: "The Training", desc: "Finding the optimal setup" },
    { number: "IV", title: "The Pitfalls", desc: "Common mistakes to avoid" },
    {
      number: "V",
      title: "The Promise",
      desc: "Expert wisdom for the journey",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-secondary-900 paper-texture paper-texture-dark editorial-spacing-md overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 relative">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 40 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={prefersReducedMotion ? {} : { y: bookY }}
            className="lg:col-span-5 flex justify-center lg:justify-start lg:sticky lg:top-32"
          >
            <div className="relative">
              <Book3D
                title={bookInfo.title}
                spineText="Tom Sampson"
                thickness={40}
                className="w-64 md:w-72 lg:w-80"
              />
            </div>
          </motion.div>

          <div className="lg:col-span-7">
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block font-open text-xs tracking-[0.3em] uppercase text-primary-400 mb-4">
                Now Available
              </span>
              <h2 className="font-crimson text-4xl md:text-5xl lg:text-6xl font-bold text-cream leading-tight mb-4">
                {bookInfo.title}
              </h2>
              <p className="font-crimson text-xl md:text-2xl italic text-secondary-300 mb-8">
                {bookInfo.subtitle}
              </p>
            </motion.div>

            <DividerLine variant="stitched" className="opacity-30" />

            <motion.p
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-secondary-300 leading-relaxed mb-12"
            >
              {bookInfo.shortDescription}
            </motion.p>

            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <MagneticElement strength={0.15}>
                <Button href={bookInfo.buyLink} size="lg">
                  Order Your Copy
                </Button>
              </MagneticElement>
              <Button
                href="/book"
                variant="outline"
                showArrow
                className="border-secondary-600 text-secondary-300 hover:border-primary-500 hover:text-primary-400"
              >
                Read an Excerpt
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
