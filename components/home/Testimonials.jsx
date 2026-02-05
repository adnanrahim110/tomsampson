"use client";

import useInViewport from "@/components/hooks/useInViewport";
import { DividerLine, EditorialCard } from "@/components/ui/editorial";
import { testimonials } from "@/constants";
import { cn } from "@/libs/cn";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import dynamic from "next/dynamic";
import { useRef } from "react";

const dividerClassName = "my-6 md:my-4 opacity-20";

function TestimonialsPlaceholder() {
  const items = testimonials.slice(0, 3);

  return (
    <div className="relative">
      <div className="hidden md:flex absolute -left-2 top-1/2 -translate-y-1/2 z-10">
        <button
          type="button"
          disabled
          className="w-12 h-12 border border-secondary-300 bg-paper opacity-60 flex items-center justify-center cursor-not-allowed"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-5 h-5 text-secondary-500" />
        </button>
      </div>
      <div className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10">
        <button
          type="button"
          disabled
          className="w-12 h-12 border border-secondary-300 bg-paper opacity-60 flex items-center justify-center cursor-not-allowed"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-5 h-5 text-secondary-500" />
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pb-16">
        {items.map((testimonial, index) => (
          <EditorialCard
            key={testimonial.id}
            variant="elevated"
            pageCurl
            className={cn(
              "h-full transition-all duration-500",
              index === 0 && "border-primary-300",
            )}
          >
            <div className="p-8">
              <span className="block font-crimson text-6xl text-primary-300 leading-none mb-4">
                "
              </span>

              <blockquote className="font-crimson text-xl text-secondary-700 leading-relaxed italic">
                {testimonial.quote}
              </blockquote>

              <DividerLine variant="simple" className={dividerClassName} />

              <footer className="flex items-center gap-4">
                <div className="w-12 h-12 bg-parchment border border-secondary-200 flex items-center justify-center">
                  <span className="font-crimson text-xl font-semibold text-primary-600">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <cite className="not-italic">
                    <span className="block font-crimson font-semibold text-secondary-900">
                      {testimonial.author}
                    </span>
                    <span className="block text-sm text-secondary-500">
                      {testimonial.role}
                    </span>
                  </cite>
                </div>
              </footer>
            </div>
          </EditorialCard>
        ))}
      </div>

      <div className="flex items-center justify-center gap-3">
        <span className="w-3 h-3 bg-primary-500 rotate-45" />
        <span className="w-2 h-2 bg-secondary-300 rotate-45" />
        <span className="w-2 h-2 bg-secondary-300 rotate-45" />
        <span className="w-2 h-2 bg-secondary-300 rotate-45" />
        <span className="w-2 h-2 bg-secondary-300 rotate-45" />
      </div>
    </div>
  );
}

const TestimonialsCarousel = dynamic(() => import("./TestimonialsCarousel"), {
  ssr: false,
  loading: () => <TestimonialsPlaceholder />,
});

export default function Testimonials() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const isInView = useInViewport(sectionRef, {
    rootMargin: "400px 0px",
    threshold: 0.1,
  });
  const enableLoopAnimations = isInView && !prefersReducedMotion;

  return (
    <section
      ref={sectionRef}
      className="relative bg-cream paper-texture editorial-spacing-md overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[8%] top-0 bottom-0 w-px bg-secondary-200/30" />
        <div className="absolute right-[8%] top-0 bottom-0 w-px bg-secondary-200/30" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block font-crimson text-xs tracking-[0.4em] uppercase text-secondary-500 mb-4">
            Praise for the Book
          </span>
          <h2 className="font-crimson text-4xl md:text-5xl font-bold text-secondary-900">
            Reader Reviews
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <span className="w-16 h-px bg-primary-400" />
            <span className="w-2 h-2 bg-primary-500 rotate-45" />
            <span className="w-16 h-px bg-primary-400" />
          </div>
        </motion.div>

        {isInView ? (
          <TestimonialsCarousel
            testimonials={testimonials}
            prefersReducedMotion={prefersReducedMotion}
            autoplayEnabled={enableLoopAnimations}
            dividerClassName={dividerClassName}
          />
        ) : (
          <TestimonialsPlaceholder />
        )}
      </div>
    </section>
  );
}
