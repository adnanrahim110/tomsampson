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
      <section className="relative bg-linear-to-b from-primary-50/50 via-white to-primary-50/50 editorial-spacing-md">
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[300px]">
            {galleryImages.map((image, index) => {
              const pattern = index % 6;
              const isLarge = pattern === 0;
              const isTall = pattern === 3 || pattern === 2;
              const isWide = pattern === 4;

              return (
                <motion.div
                  key={image.id}
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
                  whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
                  className={`group relative cursor-pointer overflow-hidden ${
                    isLarge
                      ? "col-span-2 row-span-2"
                      : isTall
                        ? "row-span-2"
                        : isWide
                          ? "col-span-2"
                          : ""
                  }`}
                  onClick={() => openLightbox(index)}
                >
                  <div className="relative w-full h-full border border-secondary-200 hover:border-primary-500 transition-all duration-300">
                    <span className="absolute -top-px -left-px w-4 h-4 border-l-2 border-t-2 border-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                    <span className="absolute -top-px -right-px w-4 h-4 border-r-2 border-t-2 border-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                    <span className="absolute -bottom-px -left-px w-4 h-4 border-l-2 border-b-2 border-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                    <span className="absolute -bottom-px -right-px w-4 h-4 border-r-2 border-b-2 border-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes={
                        isLarge
                          ? "(max-width: 768px) 100vw, 50vw"
                          : "(max-width: 768px) 50vw, 25vw"
                      }
                    />

                    <div className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/20 transition-all duration-300" />

                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="font-crimson text-sm text-white italic truncate">
                        {image.alt || `Image ${index + 1}`}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <DividerLine variant="ornament" className="mt-16 mx-auto max-w-sm" />
        </div>
      </section>

      {selectedImage !== null && (
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={prefersReducedMotion ? {} : { opacity: 0 }}
          className="fixed inset-0 z-100 bg-secondary-950/98 flex items-center justify-center h-screen"
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
            className="relative flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-cream p-4 md:p-6">
              <div className="relative h-[75vh] w-auto">
                <Image
                  src={galleryImages[selectedImage].src}
                  alt={galleryImages[selectedImage].alt}
                  width={1200}
                  height={900}
                  className="h-full w-auto object-contain"
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
