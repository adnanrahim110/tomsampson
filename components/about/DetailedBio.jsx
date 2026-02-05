"use client";

import {
  ChapterHeading,
  DividerLine,
  DropCap,
  PullQuote,
} from "@/components/ui/editorial";
import { authorBio } from "@/constants";
import { Award, MapPin, Trophy, Users } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

export default function DetailedBio() {
  const prefersReducedMotion = useReducedMotion();

  const highlights = [
    {
      icon: Trophy,
      title: "ATP Experience",
      description: "Trained with three ATP Top 10 players",
    },
    {
      icon: MapPin,
      title: "Global Career",
      description: "Career spanning multiple continents",
    },
    {
      icon: Award,
      title: "Tennis Director",
      description: "Highest international qualification",
    },
    {
      icon: Users,
      title: "LTA Senior Coach",
      description: "Developing next-gen players",
    },
  ];

  const bioParagraphs = authorBio.fullBio.split("\n\n");

  return (
    <section className="relative bg-paper paper-texture editorial-spacing-md">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[8%] top-0 bottom-0 w-px bg-secondary-200/30" />
        <div className="absolute right-[8%] top-0 bottom-0 w-px bg-secondary-200/30" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7 lg:order-1">
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <ChapterHeading
                number="I"
                title="The Journey"
                subtitle="From player to coach to author"
              />
            </motion.div>

            {bioParagraphs[0] && (
              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <DropCap>{bioParagraphs[0]}</DropCap>
              </motion.div>
            )}

            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="my-12"
            >
              <PullQuote attribution={authorBio.name}>
                Tennis taught me that success isn't just about winning—it's
                about the decisions you make along the way.
              </PullQuote>
            </motion.div>

            <div className="space-y-6">
              {bioParagraphs.slice(1).map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                  whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-lg text-secondary-700 leading-relaxed"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            <DividerLine variant="ornament" className="my-16" />

            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="font-crimson text-xs tracking-[0.3em] uppercase text-secondary-500 mb-8">
                Key Achievements
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {authorBio.achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement}
                    initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
                    whileInView={
                      prefersReducedMotion ? {} : { opacity: 1, x: 0 }
                    }
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                    className="flex items-start gap-3 p-4 bg-parchment border border-secondary-200"
                  >
                    <span className="shrink-0 mt-0.5 w-6 h-6 border border-primary-400 text-primary-600 flex items-center justify-center font-crimson text-sm">
                      {index + 1}
                    </span>
                    <span className="text-secondary-700">{achievement}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 lg:order-2">
            <div className="lg:sticky lg:top-20 space-y-8">
              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0, x: 30 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="absolute -inset-3 border border-secondary-300" />
                <div className="relative bg-parchment p-3">
                  <div className="relative aspect-3/4">
                    <Image
                      src="/imgs/author/1.jpg"
                      alt="Tom Sampson"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 400px"
                    />
                  </div>
                </div>
                <p className="mt-4 text-center font-crimson text-sm italic text-secondary-500">
                  Tom Sampson, Tennis Director & Author
                </p>
              </motion.div>

              <div className="grid grid-cols-2 gap-4">
                {highlights.map((highlight, index) => {
                  const Icon = highlight.icon;
                  return (
                    <motion.div
                      key={highlight.title}
                      initial={
                        prefersReducedMotion ? {} : { opacity: 0, y: 20 }
                      }
                      whileInView={
                        prefersReducedMotion ? {} : { opacity: 1, y: 0 }
                      }
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                      className="p-5 bg-cream border border-secondary-200 hover:border-primary-400 transition-colors duration-300 group"
                    >
                      <span className="inline-flex p-2 bg-parchment border border-secondary-200 text-primary-600 mb-3 group-hover:bg-primary-600 group-hover:text-cream group-hover:border-primary-600 transition-all duration-300">
                        <Icon className="w-5 h-5" />
                      </span>
                      <h4 className="font-crimson font-semibold text-secondary-900 mb-1">
                        {highlight.title}
                      </h4>
                      <p className="text-sm text-secondary-500">
                        {highlight.description}
                      </p>
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
