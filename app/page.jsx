"use client";

import { TravelingRacket } from "@/components/effects";
import AboutAuthor from "@/components/home/AboutAuthor";
import AboutBook from "@/components/home/AboutBook";
import Hero from "@/components/home/Hero";
import QuoteBreak from "@/components/home/QuoteBreak";
import Testimonials from "@/components/home/Testimonials";
import ContactForm from "@/components/shared/ContactForm";
import CTA from "@/components/shared/CTA";
import { useRef } from "react";

export default function Home() {
  const heroRef = useRef(null);
  const aboutHeadingRef = useRef(null);

  return (
    <>
      <TravelingRacket heroRef={heroRef} destinationRef={aboutHeadingRef} />
      <Hero ref={heroRef} />
      <AboutAuthor headingRef={aboutHeadingRef} />
      <QuoteBreak
        quote="The journey to professional tennis is not just about talent—it's about the decisions families make along the way."
        attribution="Tom Sampson"
        context="From 'A Handful of Promise'"
      />
      <AboutBook />
      <Testimonials />
      <CTA />
      <ContactForm />
    </>
  );
}
