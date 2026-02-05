"use client";

import { DividerLine, EditorialCard } from "@/components/ui/editorial";
import { cn } from "@/libs/cn";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useRef } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const swiperModules = [Autoplay, Pagination, Navigation];
const swiperBreakpoints = {
  768: {
    slidesPerView: 2,
    centeredSlides: false,
  },
  1024: {
    slidesPerView: 3,
    centeredSlides: false,
  },
};

export default function TestimonialsCarousel({
  testimonials = [],
  prefersReducedMotion = false,
  autoplayEnabled = true,
  dividerClassName = "my-6 md:my-3 opacity-50",
}) {
  const swiperRef = useRef(null);

  const autoplayConfig = useMemo(() => {
    if (!autoplayEnabled || prefersReducedMotion) return false;
    return {
      delay: 6000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    };
  }, [autoplayEnabled, prefersReducedMotion]);

  return (
    <div className="relative">
      <div className="hidden md:flex absolute -left-2 top-1/2 -translate-y-1/2 z-10">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="w-12 h-12 border border-secondary-300 bg-paper hover:bg-parchment hover:border-primary-400 transition-all duration-300 flex items-center justify-center group"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-5 h-5 text-secondary-500 group-hover:text-primary-600 transition-colors" />
        </button>
      </div>
      <div className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10">
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="w-12 h-12 border border-secondary-300 bg-paper hover:bg-parchment hover:border-primary-400 transition-all duration-300 flex items-center justify-center group"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-5 h-5 text-secondary-500 group-hover:text-primary-600 transition-colors" />
        </button>
      </div>

      <Swiper
        modules={swiperModules}
        spaceBetween={32}
        slidesPerView={1}
        centeredSlides={true}
        loop={true}
        autoplay={autoplayConfig}
        pagination={{
          clickable: true,
          bulletClass:
            "swiper-pagination-bullet !w-2 !h-2 !bg-secondary-300 !opacity-100 !rounded-none !rotate-45",
          bulletActiveClass: "!bg-primary-500 !w-3 !h-3",
        }}
        breakpoints={swiperBreakpoints}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="pb-16!"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={testimonial.id}>
            {({ isActive }) => (
              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <EditorialCard
                  variant="elevated"
                  pageCurl
                  className={cn(
                    "h-full transition-all duration-500",
                    isActive && "border-primary-300",
                  )}
                >
                  <div className="p-8">
                    <span className="block font-crimson text-6xl text-primary-300 leading-none mb-4">
                      "
                    </span>

                    <blockquote className="font-crimson text-xl text-secondary-700 leading-relaxed italic">
                      {testimonial.quote}
                    </blockquote>

                    <DividerLine
                      variant="simple"
                      className={dividerClassName}
                    />

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
              </motion.div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
