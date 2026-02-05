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

      <div className="editorial-spacing-md bg-parchment relative">
        <div className="absolute inset-x-0 top-0 h-px bg-secondary-300" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-secondary-300" />

        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="font-crimson text-xs tracking-[0.3em] uppercase text-secondary-500">
              What You Will Learn
            </span>
            <h2 className="font-crimson text-3xl md:text-4xl font-bold text-secondary-900 mt-4">
              Key Topics
            </h2>
            <DividerLine variant="ornament" className="mt-6 mx-auto max-w-xs" />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookInfo.keyTopics.map((topic, index) => {
              const Icon = topicIcons[topic.title] || BookOpen;
              return (
                <motion.div
                  key={topic.title}
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
                  whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <EditorialCard
                    title={topic.title}
                    icon={Icon}
                    showPageCurl={false}
                  >
                    <p className="text-secondary-600">{topic.description}</p>
                  </EditorialCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
