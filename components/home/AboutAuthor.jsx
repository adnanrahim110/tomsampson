"use client";

import Button from "@/components/ui/Button";
import {
  ChapterHeading,
  DropCap,
  PullQuote,
  StatBlock,
} from "@/components/ui/editorial";
import { authorBio } from "@/constants";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { forwardRef } from "react";

const AboutAuthor = forwardRef(function AboutAuthor({ headingRef }, ref) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative bg-paper paper-texture editorial-spacing-lg">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[8%] top-0 bottom-0 w-px bg-secondary-200/30" />
        <div className="absolute right-[8%] top-0 bottom-0 w-px bg-secondary-200/30" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -30 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4 lg:sticky lg:top-32"
          >
            <div className="relative">
              <div className="absolute -inset-3 border border-secondary-300" />

              <div className="relative bg-parchment p-3">
                <div className="relative aspect-3/4">
                  <Image
                    src="/imgs/author/2.jpg"
                    alt="Tom Sampson"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 350px"
                  />
                </div>
              </div>

              <div className="mt-4 text-center">
                <p className="font-crimson text-sm italic text-secondary-500">
                  {authorBio.name}, {new Date().getFullYear() - 20}
                </p>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-8">
            <div className="relative">
              <span
                aria-hidden="true"
                ref={headingRef}
                className="absolute right-0 top-0 w-px h-px opacity-0 pointer-events-none"
              />
              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <ChapterHeading
                  number="I"
                  title="The Author"
                  subtitle={authorBio.title}
                />
              </motion.div>
            </div>

            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-12"
            >
              <DropCap>{authorBio.shortBio}</DropCap>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="my-16 border-l-0"
            >
              <PullQuote attribution={authorBio.name}>
                Every match, every student, every moment on the court has been a
                step toward understanding what it truly means to succeed.
              </PullQuote>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-secondary-200"
            >
              {authorBio.stats.map((stat, index) => (
                <StatBlock
                  key={stat.label}
                  value={stat.value.replace(/\D/g, "")}
                  suffix={stat.value.match(/\D+$/)?.[0] || ""}
                  label={stat.label}
                />
              ))}
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12"
            >
              <Button href="/about" variant="ghost" showArrow>
                Continue Reading
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default AboutAuthor;
