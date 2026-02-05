"use client";

import Button from "@/components/ui/Button";
import MagneticElement from "@/components/ui/MagneticElement";
import {
  Book3D,
  ChapterHeading,
  DividerLine,
  DropCap,
  EditorialCard,
} from "@/components/ui/editorial";
import { bookInfo } from "@/constants";
import {
  AlertTriangle,
  BookOpen,
  DollarSign,
  Lightbulb,
  Target,
  Users,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

export default function DetailedBookInfo() {
  const prefersReducedMotion = useReducedMotion();

  const topicIcons = {
    "Family Decisions": Users,
    "Financial Pressures": DollarSign,
    "Personal Sacrifices": Target,
    "Training Setup": Lightbulb,
    "Common Pitfalls": AlertTriangle,
    "Expert Insights": BookOpen,
  };

  const descriptionParagraphs = bookInfo.fullDescription.split("\n\n");

  return (
    <section className="relative bg-paper paper-texture">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[8%] top-0 bottom-0 w-px bg-secondary-200/30" />
        <div className="absolute right-[8%] top-0 bottom-0 w-px bg-secondary-200/30" />
      </div>

      <div className="editorial-spacing-md">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, x: -40 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 flex justify-center lg:sticky lg:top-32"
            >
              <div className="relative">
                <Book3D
                  size="lg"
                  coverImage={bookInfo.coverImage}
                  title={bookInfo.title}
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
                <ChapterHeading
                  number="II"
                  title={bookInfo.title}
                  subtitle={bookInfo.subtitle}
                />
              </motion.div>

              {descriptionParagraphs[0] && (
                <motion.div
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                  whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="mb-8"
                >
                  <DropCap>{descriptionParagraphs[0]}</DropCap>
                </motion.div>
              )}

              <div className="space-y-6 mb-10">
                {descriptionParagraphs.slice(1).map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                    whileInView={
                      prefersReducedMotion ? {} : { opacity: 1, y: 0 }
                    }
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-lg text-secondary-700 leading-relaxed"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <MagneticElement strength={0.15}>
                  <Button href={bookInfo.buyLink} size="lg">
                    Purchase Book
                  </Button>
                </MagneticElement>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="editorial-spacing-md bg-parchment paper-texture relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-secondary-300" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-secondary-300" />

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-[8%] top-0 bottom-0 w-px bg-secondary-200/30" />
          <div className="absolute right-[8%] top-0 bottom-0 w-px bg-secondary-200/30" />
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 relative">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-4 lg:sticky lg:top-32 text-center lg:text-left"
            >
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                <span className="w-12 h-px bg-secondary-300" />
                <span className="font-crimson text-xs tracking-[0.35em] uppercase text-secondary-500">
                  What You Will Learn
                </span>
                <span className="w-12 h-px bg-secondary-300" />
              </div>

              <h2 className="font-crimson text-3xl md:text-4xl font-bold text-secondary-900">
                Key Topics
              </h2>

              <p className="mt-4 text-secondary-600 leading-relaxed">
                {bookInfo.keyTopics.length} themes that shape the realities of a
                professional tennis journey.
              </p>

              <DividerLine
                variant="ornament"
                className="mt-8 mx-auto lg:mx-0 max-w-xs"
              />
            </motion.div>

            <div className="lg:col-span-8">
              <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
                {bookInfo.keyTopics.map((topic, index) => {
                  const Icon = topicIcons[topic.title] || BookOpen;
                  const topicNumber = String(index + 1).padStart(2, "0");

                  return (
                    <motion.div
                      key={topic.title}
                      initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
                      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                    >
                      <EditorialCard
                        variant="elevated"
                        pageCurl
                        className="group h-full transition-all duration-300 border-secondary-200 hover:border-primary-300 hover:shadow-xl hover:shadow-secondary-300/30 hover:-translate-y-1"
                      >
                        <div className="relative p-8 h-full">
                          <span className="absolute left-0 top-0 bottom-0 w-1 bg-primary-500/40 transition-colors duration-300 group-hover:bg-primary-500/70" />

                          <span
                            aria-hidden="true"
                            className="absolute right-6 top-6 font-crimson text-6xl text-secondary-200/60 leading-none select-none transition-colors duration-300 group-hover:text-secondary-200/80"
                          >
                            {topicNumber}
                          </span>

                          <div className="pl-5">
                            <div className="flex items-start gap-5 pr-12">
                              <div className="shrink-0">
                                <div className="w-12 h-12 rotate-45 border border-secondary-300 bg-paper flex items-center justify-center transition-all duration-300 group-hover:border-primary-400 group-hover:bg-parchment">
                                  <Icon className="-rotate-45 w-5 h-5 text-primary-600" />
                                </div>
                              </div>

                              <div className="min-w-0">
                                <p className="font-crimson text-xs tracking-[0.35em] uppercase text-secondary-500">
                                  Topic {topicNumber}
                                </p>
                                <h3 className="mt-2 font-crimson text-2xl font-semibold text-secondary-900 leading-tight">
                                  {topic.title}
                                </h3>
                              </div>
                            </div>

                            <DividerLine
                              variant="stitched"
                              className="my-6 md:my-6 opacity-40"
                            />

                            <p className="text-secondary-700 leading-relaxed">
                              {topic.description}
                            </p>
                          </div>
                        </div>
                      </EditorialCard>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
