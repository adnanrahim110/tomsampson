"use client";

import { ChapterHeading, DividerLine } from "@/components/ui/editorial";
import { galleryImages } from "@/constants";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

export default function Gallery({
  title = "Gallery",
  subtitle = "Moments from the journey",
  chapterNumber = "III",
}) {
  const prefersReducedMotion = useReducedMotion();
  const [selectedImage, setSelectedImage] = useState(null);

  const openLightbox = (index) => {
    setSelectedImage(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "";
  };

  const goToNext = () => {
    setSelectedImage((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1,
    );
  };

  const goToPrev = () => {
    setSelectedImage((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1,
    );
  };

  return (
    <>
      <section className="relative bg-parchment editorial-spacing-md">
        <div className="absolute inset-x-0 top-0 h-px bg-secondary-300" />

        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <ChapterHeading
              number={chapterNumber}
              title={title}
              subtitle={subtitle}
              align="center"
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <div className="relative bg-cream p-3 border border-secondary-200 hover:border-primary-400 transition-all duration-300">
                  <span className="absolute -top-1 -left-1 w-3 h-3 border-l border-t border-primary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 border-r border-t border-primary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute -bottom-1 -left-1 w-3 h-3 border-l border-b border-primary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute -bottom-1 -right-1 w-3 h-3 border-r border-b border-primary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative aspect-4/3 overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />

                    <div className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/30 transition-all duration-300 flex items-center justify-center">
                      <span className="px-5 py-2 bg-cream/95 text-secondary-900 font-crimson text-sm tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        View
                      </span>
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-center font-crimson text-sm italic text-secondary-500">
                  {image.alt || `Image ${index + 1}`}
                </p>
              </motion.div>
            ))}
          </div>

          <DividerLine variant="ornament" className="mt-16 mx-auto max-w-sm" />
        </div>
      </section>

      {selectedImage !== null && (
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={prefersReducedMotion ? {} : { opacity: 0 }}
          className="fixed inset-0 z-100 bg-secondary-950/98 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2 text-cream/70 hover:text-cream border border-cream/30 hover:border-cream/60 transition-all z-10"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrev();
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-3 text-cream/70 hover:text-cream border border-cream/30 hover:border-cream/60 transition-all z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-3 text-cream/70 hover:text-cream border border-cream/30 hover:border-cream/60 transition-all z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <motion.div
            key={selectedImage}
            initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-4xl max-h-[80vh] w-full mx-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-cream p-4 md:p-6">
              <div className="relative aspect-4/3 overflow-hidden">
                <Image
                  src={galleryImages[selectedImage].src}
                  alt={galleryImages[selectedImage].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 896px"
                />
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-cream/90 font-crimson text-lg italic">
                {galleryImages[selectedImage].alt}
              </p>
              <p className="text-cream/50 text-sm mt-2 font-crimson tracking-wider">
                {selectedImage + 1} of {galleryImages.length}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
