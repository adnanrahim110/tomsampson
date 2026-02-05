"use client";

import { FloatingBalls } from "@/components/effects";
import Button from "@/components/ui/Button";
import { Book3D } from "@/components/ui/editorial";
import MagneticElement from "@/components/ui/MagneticElement";
import { authorBio, bookInfo } from "@/constants";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { forwardRef } from "react";

const Hero = forwardRef(function Hero(props, ref) {
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(
    scrollYProgress,
    [0, 0.6],
    prefersReducedMotion ? [0, 0] : [0, 80],
  );

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden bg-cream paper-texture"
    >
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
        className="absolute inset-0 pointer-events-none"
      >
        <FloatingBalls
          balls={[
            {
              size: 35,
              initialX: "6%",
              initialY: "30%",
              scrollSpeed: 0.25,
              floatDuration: 5,
              delay: 0,
              cursorInfluence: 0.8,
            },
            {
              size: 28,
              initialX: "94%",
              initialY: "25%",
              scrollSpeed: 0.35,
              floatDuration: 4,
              delay: 0.5,
              cursorInfluence: 0.6,
            },
            {
              size: 22,
              initialX: "40%",
              initialY: "15%",
              scrollSpeed: 0.4,
              floatDuration: 3.5,
              delay: 1,
              cursorInfluence: 0.7,
            },
          ]}
        />
      </motion.div>

      <motion.div
        style={
          prefersReducedMotion ? {} : { opacity: contentOpacity, y: contentY }
        }
        className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pt-38 pb-20"
      >
        <div className="grid lg:grid-cols-[320px_auto] gap-8 lg:gap-40 items-center min-h-[70vh]">
          <div className="w-64 sm:w-72 lg:w-80">
            <Book3D
              coverImage={bookInfo.coverImage}
              title={bookInfo.title}
              spineText={authorBio.name}
              thickness={35}
              imagePriority
              size="lg"
            />
          </div>

          <div className=" relative">
            <motion.h1
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-crimson text-5xl sm:text-6xl lg:text-7xl xl:text-[4.5rem] font-bold text-secondary-900 leading-[0.9] tracking-tight mb-6"
            >
              <span className="inline">
                {bookInfo.title.split(" ").slice(0, 2).join(" ")}
              </span>
              <span className="inline text-primary-600">
                {" "}
                {bookInfo.title.split(" ").slice(2).join(" ")}
              </span>
            </motion.h1>

            <motion.div
              initial={prefersReducedMotion ? {} : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex items-center gap-4 mb-5 origin-left"
            >
              <span className="w-16 h-0.5 bg-primary-500" />
              <span className="font-crimson text-primary-400 text-2xl">✦</span>
              <span className="w-8 h-0.5 bg-primary-300" />
            </motion.div>

            <motion.p
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="font-crimson text-xl sm:text-2xl italic text-secondary-600 mb-2"
            >
              {bookInfo.subtitle}
            </motion.p>

            <motion.p
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-base sm:text-lg text-secondary-800 leading-relaxed mb-10 max-w-lg"
            >
              {bookInfo.shortDescription}
            </motion.p>

            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <MagneticElement strength={0.15}>
                <Button href={bookInfo.buyLink} size="lg">
                  Order Your Copy
                </Button>
              </MagneticElement>
              <MagneticElement strength={0.15}>
                <Button
                  href="/book"
                  variant="outline"
                  size="lg"
                  showArrow
                  className="backdrop-blur-xs"
                >
                  Read an Excerpt
                </Button>
              </MagneticElement>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-12 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-secondary-200">
                <Image
                  src="/imgs/author/2.jpg"
                  alt={authorBio.name}
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <p className="font-crimson text-sm font-semibold text-secondary-800">
                  {authorBio.name}
                </p>
                <p className="text-xs text-secondary-500">{authorBio.title}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 40]) }}
      >
        <Image
          src="/imgs/effects/net.png"
          alt=""
          fill
          className="object-cover opacity-[0.08]"
          sizes="100vw"
        />
      </motion.div>
    </section>
  );
});

export default Hero;
