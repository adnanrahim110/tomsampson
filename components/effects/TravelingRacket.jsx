"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TravelingRacket({ heroRef, destinationRef }) {
  const racketRef = useRef(null);
  const racketInnerRef = useRef(null);
  const isInHeroRef = useRef(true);
  const floatTweenRef = useRef(null);

  useEffect(() => {
    const racket = racketRef.current;
    const racketInner = racketInnerRef.current;
    const hero = heroRef?.current;
    const destination = destinationRef?.current;

    if (!racket || !racketInner || !hero || !destination) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const travelConfig = {
        startMarginX: 32,
        startMarginY: -250,
        destinationViewportY: 0.7,
        destinationOffsetX: 0,
        destinationOffsetY: -30,
        startRotation: 25,
        endRotation: 25,
        startScale: 1,
        endScale: 0.7,
        heroTiltUntilProgress: 0.25,
      };

      racket.style.visibility = "hidden";
      isInHeroRef.current = false;

      gsap.set(racket, {
        position: "fixed",
        top: 0,
        left: 0,
        xPercent: -100,
        yPercent: 0,
        rotation: travelConfig.startRotation,
        scale: travelConfig.startScale,
        transformOrigin: "100% 0%",
        zIndex: 1,
        force3D: true,
      });

      gsap.set(racketInner, {
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
        force3D: true,
      });

      const setX = gsap.quickSetter(racket, "x", "px");
      const setY = gsap.quickSetter(racket, "y", "px");
      const setRotation = gsap.quickSetter(racket, "rotation", "deg");
      const setScaleX = gsap.quickSetter(racket, "scaleX");
      const setScaleY = gsap.quickSetter(racket, "scaleY");
      const setScale = (value) => {
        setScaleX(value);
        setScaleY(value);
      };

      const rotateXTo = gsap.quickTo(racketInner, "rotateX", {
        duration: 0.6,
        ease: "power3.out",
      });
      const rotateYTo = gsap.quickTo(racketInner, "rotateY", {
        duration: 0.6,
        ease: "power3.out",
      });

      const getRacketSize = () => {
        const rect = racket.getBoundingClientRect();
        return { width: rect.width, height: rect.height };
      };

      const getHeroDocBottomInViewAtStart = (scrollStart) => {
        const rect = hero.getBoundingClientRect();
        const heroDocBottom = rect.bottom + window.scrollY;
        const viewportDocBottomAtStart = scrollStart + window.innerHeight;
        return Math.min(heroDocBottom, viewportDocBottomAtStart);
      };

      const getHeroDocRightInView = () => {
        const rect = hero.getBoundingClientRect();
        const heroDocRight = rect.right + window.scrollX;
        const viewportDocRight = window.scrollX + window.innerWidth;
        return Math.min(heroDocRight, viewportDocRight);
      };

      if (prefersReducedMotion) {
        const racketSize = getRacketSize();
        const startX = window.innerWidth - travelConfig.startMarginX;
        const startY =
          window.innerHeight - travelConfig.startMarginY - racketSize.height;

        setX(startX);
        setY(startY);
        setRotation(travelConfig.startRotation);
        setScale(travelConfig.startScale);
        racket.style.visibility = "visible";

        return () => {
          if (floatTweenRef.current) {
            floatTweenRef.current.kill();
            floatTweenRef.current = null;
          }

          rotateXTo.kill();
          rotateYTo.kill();
          gsap.set(racketInner, { clearProps: "rotateX,rotateY,y" });
          racket.style.visibility = "hidden";
        };
      }

      let startDoc = { x: 0, y: 0 };
      let endDoc = { x: 0, y: 0 };
      let startAt = { x: 0, y: 0 };
      let endAt = { x: 0, y: 0 };
      let arrivalScrollY = 0;

      const getStartDocPoint = (scrollStart) => {
        const racketSize = getRacketSize();
        const docRight = getHeroDocRightInView();
        const docBottom = getHeroDocBottomInViewAtStart(scrollStart);

        return {
          x: docRight - travelConfig.startMarginX,
          y: docBottom - travelConfig.startMarginY - racketSize.height,
        };
      };

      const getDestinationDocPoint = () => {
        const rect = destination.getBoundingClientRect();
        return { x: rect.right + window.scrollX, y: rect.top + window.scrollY };
      };

      const setInHero = (nextIsInHero) => {
        if (isInHeroRef.current === nextIsInHero) return;
        isInHeroRef.current = nextIsInHero;

        if (!nextIsInHero) {
          rotateXTo(0);
          rotateYTo(0);
        }

        if (floatTweenRef.current) {
          floatTweenRef.current.kill();
          floatTweenRef.current = null;
          gsap.set(racketInner, { y: 0 });
        }

        if (nextIsInHero && !prefersReducedMotion) {
          floatTweenRef.current = gsap.to(racketInner, {
            y: -15,
            duration: 2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        }
      };

      const handleMouseMove = (e) => {
        if (!isInHeroRef.current || prefersReducedMotion) return;

        const targetX = (e.clientX / window.innerWidth) * 2 - 1;
        const targetY = (e.clientY / window.innerHeight) * 2 - 1;

        rotateXTo(targetY * -15);
        rotateYTo(targetX * 15);
      };

      const update = (self) => {
        const currentScrollY = self.scroll();
        const travelProgress = gsap.utils.clamp(
          0,
          1,
          (currentScrollY - self.start) /
            Math.max(1, arrivalScrollY - self.start),
        );
        const hasArrived = currentScrollY >= arrivalScrollY;

        const currentX = hasArrived
          ? endDoc.x - window.scrollX + travelConfig.destinationOffsetX
          : gsap.utils.interpolate(startAt.x, endAt.x, travelProgress);
        const currentY = hasArrived
          ? endDoc.y - currentScrollY + travelConfig.destinationOffsetY
          : gsap.utils.interpolate(startAt.y, endAt.y, travelProgress);

        setX(currentX);
        setY(currentY);
        setRotation(
          gsap.utils.interpolate(
            travelConfig.startRotation,
            travelConfig.endRotation,
            travelProgress,
          ),
        );
        setScale(
          gsap.utils.interpolate(
            travelConfig.startScale,
            travelConfig.endScale,
            travelProgress,
          ),
        );

        setInHero(travelProgress < travelConfig.heroTiltUntilProgress);

        if (racket.style.visibility !== "visible") {
          racket.style.visibility = "visible";
        }
      };

      const aboutSection = destination.closest("section") ?? destination;

      const scrollTrigger = ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        endTrigger: aboutSection,
        end: "bottom top",
        invalidateOnRefresh: true,
        onRefresh: (self) => {
          startDoc = getStartDocPoint(self.start);
          endDoc = getDestinationDocPoint();
          arrivalScrollY =
            endDoc.y - window.innerHeight * travelConfig.destinationViewportY;
          arrivalScrollY = Math.max(self.start + 1, arrivalScrollY);

          startAt = {
            x: startDoc.x - window.scrollX,
            y: startDoc.y - self.start,
          };
          endAt = {
            x: endDoc.x - window.scrollX + travelConfig.destinationOffsetX,
            y: endDoc.y - arrivalScrollY + travelConfig.destinationOffsetY,
          };

          update(self);
        },
        onUpdate: update,
      });

      window.addEventListener("mousemove", handleMouseMove, { passive: true });

      ScrollTrigger.refresh();

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);

        scrollTrigger.kill();

        if (floatTweenRef.current) {
          floatTweenRef.current.kill();
          floatTweenRef.current = null;
        }

        rotateXTo.kill();
        rotateYTo.kill();

        gsap.set(racketInner, { clearProps: "rotateX,rotateY,y" });
        racket.style.visibility = "hidden";
      };
    });

    return () => mm.revert();
  }, [heroRef, destinationRef]);

  return (
    <div
      ref={racketRef}
      className="hidden md:block pointer-events-none will-change-transform"
      style={{ visibility: "hidden" }}
    >
      <div
        ref={racketInnerRef}
        className="relative"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute inset-0 blur-2xl opacity-25 bg-primary-400 rounded-full scale-75" />

        <Image
          src="/imgs/effects/racket.png"
          alt=""
          width={200}
          height={300}
          className="drop-shadow-2xl"
          priority
        />
      </div>
    </div>
  );
}
